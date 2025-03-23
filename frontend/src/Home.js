import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import doorFrame from './images/doorframe.png';
import leftDoor from './images/leftdoor.png';
import rightDoor from './images/rightdoor.png';
import backgroundImage from './images/background.jpg'; // Import your background image
import VirtualGallery from './VirtualGallery';

function Home() {
  const [isDoorsOpen, setIsDoorsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [showVirtualGallery, setShowVirtualGallery] = useState(false);
  const [galleryPaintings, setGalleryPaintings] = useState([]);
  const doorsRef = useRef(null);
  const navigate = useNavigate();

  // Hardcoded paintings data - replace URLs with your actual images
  const hardcodedPaintings = [
    {
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
      position: [0, 1.5, -4.9],
      rotation: [0, 0, 0],
      size: [2, 1.5],
      title: 'Starry Night',
      artist: 'Vincent van Gogh'
    },
    {
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/1200px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg',
      position: [-4.9, 1.5, -2],
      rotation: [0, Math.PI / 2, 0],
      size: [1.8, 1.3],
      title: 'Water Lilies',
      artist: 'Claude Monet'
    },
    {
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1200px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
      position: [4.9, 1.5, -2],
      rotation: [0, -Math.PI / 2, 0],
      size: [1.2, 1.8],
      title: 'Mona Lisa',
      artist: 'Leonardo da Vinci'
    },
    {
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/1200px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
      position: [-2.5, 1.5, -4.9],
      rotation: [0, 0, 0],
      size: [2, 1.2],
      title: 'The Creation of Adam',
      artist: 'Michelangelo'
    },
    {
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/The_Scream.jpg/800px-The_Scream.jpg',
      position: [2.5, 1.5, -4.9],
      rotation: [0, 0, 0],
      size: [1.2, 1.6],
      title: 'The Scream',
      artist: 'Edvard Munch'
    }
  ];

  const handleDoorsClick = () => {
    if (prompt.trim() === '') {
      // If no prompt, just open the doors but don't transition
      setIsDoorsOpen(!isDoorsOpen);
      return;
    }

    // Open the doors first if not already open
    if (!isDoorsOpen) {
      setIsDoorsOpen(true);
      // Wait for door opening animation to complete before transitioning
      setTimeout(() => {
        handleTransition();
      }, 1500);
    } else {
      // Doors are already open, start transition immediately
      handleTransition();
    }
  };

  const handleTransition = () => {
    setIsTransitioning(true);
    
    // Instead of navigating, prepare and show the 3D gallery
    setTimeout(() => {
      // Example paintings - replace this with your AI-generated content
      const dummyPaintings = generatePaintingsFromPrompt(prompt);
      setGalleryPaintings(dummyPaintings);
      setShowVirtualGallery(true);
      setIsTransitioning(false); // Reset transition state
    }, 2000);
  };

  
  // Function to close the virtual gallery
  const handleCloseGallery = () => {
    setShowVirtualGallery(false);
    setIsDoorsOpen(false);
  };
  
  // This function would be replaced by your AI generation logic
  const generatePaintingsFromPrompt = (prompt) => {
    // This is a placeholder - replace with actual AI image generation
    return [
      {
        imageUrl: '/api/placeholder/400/320',
        position: [0, 1.5, -4.9],
        rotation: [0, 0, 0],
        size: [2, 1.5],
        title: `${prompt} Masterpiece`,
        artist: 'AI Artist'
      },
      {
        imageUrl: '/api/placeholder/320/400',
        position: [-4.9, 1.5, -2],
        rotation: [0, Math.PI / 2, 0],
        size: [1.5, 2],
        title: `${prompt} Vision`,
        artist: 'AI Visionary'
      },
      {
        imageUrl: '/api/placeholder/400/300',
        position: [4.9, 1.5, -2],
        rotation: [0, -Math.PI / 2, 0],
        size: [2, 1.5],
        title: `${prompt} Creation`,
        artist: 'AI Creator'
      },
      {
        imageUrl: '/api/placeholder/350/350',
        position: [-2.5, 1.5, -4.9],
        rotation: [0, 0, 0],
        size: [1.5, 1.5],
        title: `${prompt} Imagination`,
        artist: 'AI Dreamer'
      },
      {
        imageUrl: '/api/placeholder/450/300',
        position: [2.5, 1.5, -4.9],
        rotation: [0, 0, 0],
        size: [2, 1.3],
        title: `${prompt} Wonder`,
        artist: 'AI Wonder'
      }
    ];
  };
  
  
  return (
    <div className="museum-home-page">
      <div className="museum-exterior"></div>
      
      <div className={`container ${isTransitioning ? 'fade-out' : ''}`}>
        <div className="content-wrapper">
          <div className="header">
            <h1 className="logo">curAItor</h1>
            <p className="tagline">Step into a personalized AI-generated art museum</p>
          </div>

          {/* Move the search container above the doors */}
          <div className="search-container">
            <input 
              type="text" 
              className="search-bar" 
              placeholder="Type what you would like to see in your museum then click the doors..." 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          {/* Shift the doors container down */}
          <div className={`doors-container ${isTransitioning ? 'enlarge' : ''}`} ref={doorsRef}>
            <img src={doorFrame} alt="Door Frame" className="door-frame"/>
            
            <div className="museum-preview"></div>
            
            <div className="double-doors" onClick={handleDoorsClick}>
              <motion.img 
                src={leftDoor} 
                alt="Left Door"
                className="door left-door"
                style={{ transformOrigin: 'left center' }}
                animate={{
                  rotateY: isDoorsOpen ? -110 : 0,
                  x: isDoorsOpen ? '40%' : '0'
                 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
              <motion.img 
                src={rightDoor} 
                alt="Right Door"
                className="door right-door"
                style={{ transformOrigin: 'right center' }}
                animate={{
                  rotateY: isDoorsOpen ? 110 : 0,
                  x: isDoorsOpen ? '-43%' : '0'
                }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </div>
            
            <div className="door-instructions">
              <p>Click the doors enter your personalized art museum</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`door-transition ${isTransitioning ? 'active' : ''}`}>
        <div className="inside-museum"></div>
      </div>

      {/* Render the Virtual Gallery when showVirtualGallery is true */}
      {showVirtualGallery && (
        <VirtualGallery 
          paintings={hardcodedPaintings} 
          onClose={handleCloseGallery} 
        />
      )}
  
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Helvetica Neue', Arial, sans-serif;
        }
        
        html, body {
          height: 100%;
          overflow: hidden;
        }
        
        .museum-home-page {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          background-image: url(${backgroundImage}); /* Add background image */
          background-size: cover; /* Ensure the background image covers the entire page */
          background-position: center; /* Center the background image */
        }
        
        .museum-exterior {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        
        .container {
          text-align: center;
          width: 100%;
          height: 100%;
          z-index: 1;
          transition: opacity 1.5s ease;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        .content-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          height: 100%;
          width: 100%;
          max-width: 1200px;
          padding: 5vh 2rem;
        }
        
        .container.fade-out {
          opacity: 0;
        }
        
        .header {
          margin-bottom: 2vh;
        }
        
        .logo {
          font-size: min(3.5rem, 10vw);
          font-weight: 700;
          color: #333;
          margin-bottom: min(1rem, 2vh);
          letter-spacing: -1px;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
        }
        
        .tagline {
          font-size: min(1.2rem, 4vw);
          color: #666;
        }
        
        /* Redesigned double-door entrance */
        .doors-container {
          position: relative;
          width: min(400px, 85vw);
          height: min(550px, 60vh);
          perspective: 1000px;
          cursor: pointer;
          transition: all 2s ease;
          z-index: 2;
          flex-grow: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 2vh 0;
        }
        
        .door-frame {
          position: absolute;
          width: 100%;
          height: 100%;
          background: url(${doorFrame}) no-repeat center;
          background-size: cover;
          z-index: -1;
          top: -60px; /* Move the doors up by adjusting the top property */
        }
        
        /* Double doors */
        .double-doors {
          position: absolute;
          width: 85%;
          height: 92%;
          top: -11px;
          left: -1%;
          transform: translateX(0%);
          display: flex;
          perspective: 1000px;
          top: -90px; /* Move the doors up by adjusting the top property */
        }
        
        .door {
          position: absolute;
          width: 120%;
          height: 120%;
          transform-style: preserve-3d;
          transition: transform 1.5s ease-in-out;
        }
        
        .left-door {
          border-radius: 0 0 0 4px;
        }
        
        .right-door {
          border-radius: 0 0 4px 0;
        }
        
        .door-instructions {
          position: absolute;
          bottom: -40px;
          width: 100%;
          text-align: center;
          color: black;  /* Text color set to black */
          font-family: Georgia, serif;
          font-size: min(1rem, 3.5vw);
          text-shadow: 1px 1px 2px rgba(240, 240, 240, 0.73);  /* Text shadow set to white */
          top: 360px;
        }

        
        .museum-preview {
          position: absolute;
          width: 75%;
          height: 80%;
          top: 60px;
          left: 50%;
          transform: translateX(-50%);
          background-image: url('/api/placeholder/300/480');
          background-size: cover;
          background-position: center;
          filter: brightness(0.7);
          z-index: -1;
        }
        
        .search-container {
          position: relative;
          width: 100%;
          max-width: min(600px, 90vw);
          margin-top: 5vh;
          margin-bottom: 5vh;
        }
        
        .search-bar {
          width: 100%;
          padding: min(15px, 4vw) min(20px, 5vw);
          font-size: 0.8rem; /* Change the font size */
          font-family: 'Roboto', sans-serif; /* Change the font family */
          border: none;
          border-radius: 30px;
          background-color: white;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          outline: none;
          transition: all 0.3s ease;
        }
        
        .search-bar:focus {
          box-shadow: 0 5px 20px rgba(106, 90, 205, 0.3);
        }
        
        .instructions {
          margin-top: min(15px, 2vh);
          color: #666;
          font-size: min(1rem, 3.5vw);
        }
        
        .door-transition {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          z-index: 10;
          opacity: 0;
          visibility: hidden;
          transition: opacity 2s ease;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        
        .door-transition.active {
          opacity: 1;
          visibility: visible;
        }
        
        .inside-museum {
          width: 0;
          height: 0;
          background: #6a5acd;
          border-radius: 50%;
          transition: all 2s ease;
        }
        
        .door-transition.active .inside-museum {
          width: 200vw;
          height: 200vh;
          border-radius: 50%;
        }
        
        /* Responsive adjustments */
        @media (max-height: 600px) {
          .doors-container {
            height: min(400px, 45vh);
          }
          
          .search-container {
            margin-bottom: 3vh;
          }
          
          .content-wrapper {
            padding: 2vh 1rem;
          }
        }
        
        @media (max-height: 450px) {
          .content-wrapper {
            flex-direction: row;
            flex-wrap: wrap;
            padding: 1vh 1rem;
          }
          
          .header {
            width: 100%;
            margin-bottom: 1vh;
          }
          
          .doors-container {
            width: min(300px, 40vw);
            height: min(350px, 70vh);
            margin: 0 2vw;
          }
          
          .search-container {
            width: min(50%, 400px);
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;

// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import doorImage from './images/door.png';

// function Home() {
//   const [isDoorsOpen, setIsDoorsOpen] = useState(false);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [prompt, setPrompt] = useState('');
//   const doorsRef = useRef(null);
//   const navigate = useNavigate();

//   const handleDoorsClick = () => {
//     if (prompt.trim() === '') {
//       // If no prompt, just open the doors but don't transition
//       setIsDoorsOpen(!isDoorsOpen);
//       return;
//     }

//     // Open the doors first if not already open
//     if (!isDoorsOpen) {
//       setIsDoorsOpen(true);
//       // Wait for door opening animation to complete before transitioning
//       setTimeout(() => {
//         handleTransition();
//       }, 1500);
//     } else {
//       // Doors are already open, start transition immediately
//       handleTransition();
//     }
//   };

//   const handleTransition = () => {
//     setIsTransitioning(true);
    
//     // Navigate to museum page after transition completes
//     setTimeout(() => {
//       navigate(`/museum?prompt=${encodeURIComponent(prompt)}`);
//     }, 2000);
//   };

//   return (
//     <div className="museum-home-page">
//       <div className="museum-exterior"></div>
      
//       <div className={`container ${isTransitioning ? 'fade-out' : ''}`}>
//         <div className="content-wrapper">
//           <div className="header">
//             <h1 className="logo">curAItor</h1>
//             <p className="tagline">Step into a personalized AI-generated art museum</p>
//           </div>
          
//           <div className={`doors-container ${isTransitioning ? 'enlarge' : ''}`} ref={doorsRef}>
//             <div className="door-frame">
//               <div className="pediment">
//                 <div className="ornate-detail"></div>
//               </div>
//               <div className="frame-columns">
//                 <div className="column left"></div>
//                 <div className="column right"></div>
//               </div>
//             </div>
            
//             <div className="museum-preview"></div>
            
//             <div className="double-doors" onClick={handleDoorsClick}>
//               <div className={`door left-door ${isDoorsOpen ? 'open' : ''}`}>
//                 <img 
//                   src={doorImage} 
//                   alt="Left Door"
//                   className={`door-image ${isDoorsOpen ? 'open' : ''}`} 
//                 />
//               </div>
//               <div className={`door right-door ${isDoorsOpen ? 'open' : ''}`}>
//                 <img 
//                   src={doorImage} 
//                   alt="Right Door"
//                   className={`door-image ${isDoorsOpen ? 'open' : ''}`} 
//                 />
//               </div>
//             </div>
            
//             <div className="door-instructions">
//               <p>Click to enter your personalized art museum</p>
//             </div>
//           </div>
          
//           <div className="search-container">
//             <input 
//               type="text" 
//               className="search-bar" 
//               placeholder="Enter what you'd like to see in your museum..." 
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//             />
//             <p className="instructions">Type your prompt above, then click the doors to enter</p>
//           </div>
//         </div>
//       </div>
      
//       <div className={`door-transition ${isTransitioning ? 'active' : ''}`}>
//         <div className="inside-museum"></div>
//       </div>

//       <style jsx>{`
//         /* Styles for the door animation */
//         .door-image {
//           width: 100%;
//           height: 100%;
//           transition: transform 1.5s ease-in-out;
//           object-fit: cover;
//         }

//         .door.left-door.open {
//           transform: translateX(-100%) rotateY(-90deg);
//         }

//         .door.right-door.open {
//           transform: translateX(100%) rotateY(90deg);
//         }

//         .museum-home-page {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           overflow: hidden;
//         }
        
//         .museum-exterior {
//           position: absolute;
//           width: 100%;
//           height: 100%;
//           background-color: #e8e6d9;
//           background-image: 
//             linear-gradient(90deg, rgba(191, 184, 165, 0.3) 0%, rgba(191, 184, 165, 0) 20%, rgba(191, 184, 165, 0) 80%, rgba(191, 184, 165, 0.3) 100%),
//             linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 100%);
//           z-index: -1;
//         }

//         .double-doors {
//           position: absolute;
//           width: 75%;
//           height: 80%;
//           top: 60px;
//           left: 50%;
//           transform: translateX(-50%);
//           display: flex;
//           justify-content: space-between;
//         }

//         .container {
//           text-align: center;
//           width: 100%;
//           height: 100%;
//           z-index: 1;
//           transition: opacity 1.5s ease;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//         }

//         .content-wrapper {
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//           align-items: center;
//           height: 100%;
//           width: 100%;
//           max-width: 1200px;
//           padding: 5vh 2rem;
//         }

//         .search-container {
//           position: relative;
//           width: 100%;
//           max-width: min(600px, 90vw);
//           margin-top: 5vh;
//           margin-bottom: 5vh;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default Home;

// VERSION WITH THE BROWN DOOR
// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Home() {
//   const [isDoorsOpen, setIsDoorsOpen] = useState(false);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [prompt, setPrompt] = useState('');
//   const doorsRef = useRef(null);
//   const navigate = useNavigate();

//   const handleDoorsClick = () => {
//     if (prompt.trim() === '') {
//       // If no prompt, just open the doors but don't transition
//       setIsDoorsOpen(!isDoorsOpen);
//       return;
//     }

//     // Open the doors first if not already open
//     if (!isDoorsOpen) {
//       setIsDoorsOpen(true);
//       // Wait for door opening animation to complete before transitioning
//       setTimeout(() => {
//         handleTransition();
//       }, 1500);
//     } else {
//       // Doors are already open, start transition immediately
//       handleTransition();
//     }
//   };

//   const handleTransition = () => {
//     setIsTransitioning(true);
    
//     // Navigate to museum page after transition completes
//     setTimeout(() => {
//       navigate(`/museum?prompt=${encodeURIComponent(prompt)}`);
//     }, 2000);
//   };

//   return (
//     <div className="museum-home-page">
//       <div className="museum-exterior"></div>
      
//       <div className={`container ${isTransitioning ? 'fade-out' : ''}`}>
//         <div className="content-wrapper">
//           <div className="header">
//             <h1 className="logo">curAItor</h1>
//             <p className="tagline">Step into a personalized AI-generated art museum</p>
//           </div>
          
//           <div className={`doors-container ${isTransitioning ? 'enlarge' : ''}`} ref={doorsRef}>
//             <div className="door-frame">
//               <div className="pediment">
//                 <div className="ornate-detail"></div>
//               </div>
//               <div className="frame-columns">
//                 <div className="column left"></div>
//                 <div className="column right"></div>
//               </div>
//             </div>
            
//             <div className="museum-preview"></div>
            
//             <div className="double-doors" onClick={handleDoorsClick}>
//               <div className={`door left-door ${isDoorsOpen ? 'open' : ''}`}>
//                 <div className="door-panel">
//                   <div className="door-window">
//                     <div className="window-decorative-iron"></div>
//                   </div>
//                   <div className="door-detail upper"></div>
//                   <div className="door-detail lower"></div>
//                 </div>
//               </div>
//               <div className={`door right-door ${isDoorsOpen ? 'open' : ''}`}>
//                 <div className="door-panel">
//                   <div className="door-window">
//                     <div className="window-decorative-iron"></div>
//                   </div>
//                   <div className="door-detail upper"></div>
//                   <div className="door-detail lower"></div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="door-instructions">
//               <p>Click to enter your personalized art museum</p>
//             </div>
//           </div>
          
//           <div className="search-container">
//             <input 
//               type="text" 
//               className="search-bar" 
//               placeholder="Enter what you want to see in your museum then click the doors to enter your curated collection." 
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//             />
//             <p className="instructions">Type your prompt above, then click the doors to enter</p>
//           </div>
//         </div>
//       </div>
      
//       <div className={`door-transition ${isTransitioning ? 'active' : ''}`}>
//         <div className="inside-museum"></div>
//       </div>

//       <style jsx>{`
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//           font-family: 'Helvetica Neue', Arial, sans-serif;
//         }
        
//         html, body {
//           height: 100%;
//           overflow: hidden;
//         }
        
//         .museum-home-page {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           overflow: hidden;
//         }
        
//         .museum-exterior {
//           position: absolute;
//           width: 100%;
//           height: 100%;
//           background-color: #e8e6d9;
//           background-image: 
//             linear-gradient(90deg, rgba(191, 184, 165, 0.3) 0%, rgba(191, 184, 165, 0) 20%, rgba(191, 184, 165, 0) 80%, rgba(191, 184, 165, 0.3) 100%),
//             linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 100%);
//           z-index: -1;
//         }
        
//         /* Column details for museum wall look */
//         .museum-exterior::before, .museum-exterior::after {
//           content: "";
//           position: absolute;
//           width: 100%;
//           height: 100%;
//           top: 0;
//           left: 0;
//           background-image: 
//             repeating-linear-gradient(90deg, 
//               rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, 
//               transparent 1px, transparent 60px),
//             repeating-linear-gradient(0deg, 
//               rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, 
//               transparent 1px, transparent 60px);
//           z-index: -1;
//         }
        
//         .container {
//           text-align: center;
//           width: 100%;
//           height: 100%;
//           z-index: 1;
//           transition: opacity 1.5s ease;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//         }
        
//         .content-wrapper {
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//           align-items: center;
//           height: 100%;
//           width: 100%;
//           max-width: 1200px;
//           padding: 5vh 2rem;
//         }
        
//         .container.fade-out {
//           opacity: 0;
//         }
        
//         .header {
//           margin-bottom: 2vh;
//         }
        
//         .logo {
//           font-size: min(3.5rem, 10vw);
//           font-weight: 700;
//           color: #333;
//           margin-bottom: min(1rem, 2vh);
//           letter-spacing: -1px;
//           text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
//         }
        
//         .tagline {
//           font-size: min(1.2rem, 4vw);
//           color: #666;
//         }
        
//         /* Redesigned double-door entrance */
//         .doors-container {
//           position: relative;
//           width: min(400px, 85vw);
//           height: min(550px, 60vh);
//           perspective: 1000px;
//           cursor: pointer;
//           transition: all 2s ease;
//           z-index: 2;
//           flex-grow: 1;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           margin: 2vh 0;
//         }
        
//         .door-frame {
//           position: absolute;
//           width: 100%;
//           height: 100%;
//           border: 10px solid #e1ddd1;
//           border-radius: 8px 8px 0 0;
//           box-shadow: 
//             inset 0 0 20px rgba(0,0,0,0.1),
//             0 10px 30px rgba(0,0,0,0.2);
//           z-index: -1;
//           background: linear-gradient(to bottom, #e1ddd1, #d6d2c3);
//           overflow: hidden;
//         }
        
//         /* Ornate pediment at the top */
//         .pediment {
//           position: absolute;
//           top: -5px;
//           left: 0;
//           width: 100%;
//           height: 60px;
//           background-color: #d6d2c3;
//           border-bottom: 2px solid #c5c0b3;
//           border-radius: 8px 8px 0 0;
//           overflow: hidden;
//         }
        
//         .ornate-detail {
//           position: absolute;
//           top: 15px;
//           left: 50%;
//           transform: translateX(-50%);
//           width: 70%;
//           height: 30px;
//           background-image: 
//             radial-gradient(circle at center, #c5c0b3 5px, transparent 5px),
//             linear-gradient(90deg, #c5c0b3, #d6d2c3, #c5c0b3);
//           background-size: 20px 20px, 100% 100%;
//           background-repeat: repeat-x, no-repeat;
//           background-position: center;
//         }
        
//         /* Columns on the sides of the door */
//         .frame-columns {
//           position: absolute;
//           top: 60px;
//           width: 100%;
//           height: calc(100% - 60px);
//           display: flex;
//           justify-content: space-between;
//         }
        
//         .column {
//           width: 20px;
//           height: 100%;
//           background: linear-gradient(90deg, 
//             #d6d2c3 0%, 
//             #e1ddd1 20%, 
//             #e8e6d9 50%, 
//             #e1ddd1 80%, 
//             #d6d2c3 100%);
//           background-size: 20px 100%;
//         }
        
//         .column.left {
//           margin-left: 10px;
//         }
        
//         .column.right {
//           margin-right: 10px;
//         }
        
//         /* Double doors */
//         .double-doors {
//           position: absolute;
//           width: 75%;
//           height: 80%;
//           top: 60px;
//           left: 50%;
//           transform: translateX(-50%);
//           display: flex;
//           perspective: 1000px;
//         }
        
//         .door {
//           position: relative;
//           width: 50%;
//           height: 100%;
//           transform-style: preserve-3d;
//           transition: transform 1.5s ease-in-out;
//           background-color: #8B4513;
//         }
        
//         .left-door {
//           transform-origin: left;
//           border-radius: 0 0 0 4px;
//         }
        
//         .right-door {
//           transform-origin: right;
//           border-radius: 0 0 4px 0;
//         }
        
//         .left-door.open {
//           transform: rotateY(-85deg);
//         }
        
//         .right-door.open {
//           transform: rotateY(85deg);
//         }
        
//         .door-panel {
//           position: absolute;
//           width: 100%;
//           height: 100%;
//           background-color: #8B4513;
//           background-image: linear-gradient(315deg, #8B4513 0%, #A0522D 74%);
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           padding: 10px;
//         }
        
//         /* Door windows with decorative iron details */
//         .door-window {
//           width: 70%;
//           height: 35%;
//           background-color: rgba(220, 220, 220, 0.7);
//           border: 5px solid #6B4226;
//           border-radius: 50%;
//           margin-top: 20px;
//           position: relative;
//           overflow: hidden;
//         }
        
//         .window-decorative-iron {
//           position: absolute;
//           width: 100%;
//           height: 100%;
//           background-image: 
//             radial-gradient(circle at center, transparent 40%, #333 40%, #333 45%, transparent 45%),
//             linear-gradient(0deg, #333 1px, transparent 1px),
//             linear-gradient(90deg, #333 1px, transparent 1px);
//           background-size: 100% 100%, 10px 10px, 10px 10px;
//           opacity: 0.7;
//         }
        
//         /* Decorative panels on doors */
//         .door-detail {
//           width: 80%;
//           height: 25%;
//           background-color: #6B4226;
//           margin-top: 20px;
//           border: 2px inset #5D3A22;
//           border-radius: 5px;
//           box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
//         }
        
//         .door-detail.lower {
//           margin-top: 10px;
//         }
        
//         .door-instructions {
//           position: absolute;
//           bottom: -40px;
//           width: 100%;
//           text-align: center;
//           color: #666;
//           font-size: min(1rem, 3.5vw);
//           text-shadow: 1px 1px 2px rgba(255,255,255,0.5);
//         }
        
//         .museum-preview {
//           position: absolute;
//           width: 75%;
//           height: 80%;
//           top: 60px;
//           left: 50%;
//           transform: translateX(-50%);
//           background-image: url('/api/placeholder/300/480');
//           background-size: cover;
//           background-position: center;
//           filter: brightness(0.7);
//           z-index: -1;
//         }
        
//         .search-container {
//           position: relative;
//           width: 100%;
//           max-width: min(600px, 90vw);
//           margin-top: 5vh;
//           margin-bottom: 5vh;
//         }
        
//         .search-bar {
//           width: 100%;
//           padding: min(15px, 4vw) min(20px, 5vw);
//           font-size: min(1.2rem, 4vw);
//           border: none;
//           border-radius: 30px;
//           background-color: white;
//           box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
//           outline: none;
//           transition: all 0.3s ease;
//         }
        
//         .search-bar:focus {
//           box-shadow: 0 5px 20px rgba(106, 90, 205, 0.3);
//         }
        
//         .instructions {
//           margin-top: min(15px, 2vh);
//           color: #666;
//           font-size: min(1rem, 3.5vw);
//         }
        
//         .door-transition {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: rgba(0,0,0,0.5);
//           z-index: 10;
//           opacity: 0;
//           visibility: hidden;
//           transition: opacity 2s ease;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           overflow: hidden;
//         }
        
//         .door-transition.active {
//           opacity: 1;
//           visibility: visible;
//         }
        
//         .inside-museum {
//           width: 0;
//           height: 0;
//           background: #6a5acd;
//           border-radius: 50%;
//           transition: all 2s ease;
//         }
        
//         .door-transition.active .inside-museum {
//           width: 200vw;
//           height: 200vh;
//           border-radius: 50%;
//         }
        
//         /* Responsive adjustments */
//         @media (max-height: 600px) {
//           .doors-container {
//             height: min(400px, 45vh);
//           }
          
//           .search-container {
//             margin-bottom: 3vh;
//           }
          
//           .content-wrapper {
//             padding: 2vh 1rem;
//           }
//         }
        
//         @media (max-height: 450px) {
//           .content-wrapper {
//             flex-direction: row;
//             flex-wrap: wrap;
//             padding: 1vh 1rem;
//           }
          
//           .header {
//             width: 100%;
//             margin-bottom: 1vh;
//           }
          
//           .doors-container {
//             width: min(300px, 40vw);
//             height: min(350px, 70vh);
//             margin: 0 2vw;
//           }
          
//           .search-container {
//             width: min(50%, 400px);
//             margin: 0;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default Home;