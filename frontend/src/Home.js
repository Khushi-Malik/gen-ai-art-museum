import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import doorFrame from './images/doorframe.png';
import leftDoor from './images/leftdoor.png';
import rightDoor from './images/rightdoor.png';
import backgroundImage from './images/background.jpg';
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
  ];

  const handleDoorsClick = async () => {
    if (prompt.trim() === '') {
      // If no prompt, just open the doors but don't transition
      setIsDoorsOpen(!isDoorsOpen);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      console.log(generatePaintingsFromPrompt(data));

    // Open the doors first if not already open
    if (!isDoorsOpen) {
      setIsDoorsOpen(true);
      // Wait for door opening animation to complete before transitioning
      setTimeout(() => {
        handleTransition(data);
      }, 1500);
    } else {
      // Doors are already open, start transition immediately
      handleTransition(data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
  };

  const handleTransition = (data) => {
    setIsTransitioning(true);

    setTimeout(() => {
        const paintings = generatePaintingsFromPrompt(data);
        setGalleryPaintings(paintings);
        setShowVirtualGallery(true);
        setIsTransitioning(false);
      // Example paintings - replace this with your AI-generated content
      const paintings = generatePaintingsFromPrompt(data);
      setGalleryPaintings(paintings);
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
  const generatePaintingsFromPrompt = (data) => {
    if (!data || !data.image_url) return [];

  const generatePaintingsFromPrompt = (data) => {
    // This is a placeholder - replace with actual AI image generation
    return [
        {
          imageUrl: data.image_url,
          position: [0, 1.5, -4.9],
          rotation: [0, 0, 0],
          size: [2, 1.5],
          title: data.title,
          artist: data.artist,
        }
      {
        imageUrl: data.image_url,
        position: [0, 1.5, -4.9],
        rotation: [0, 0, 0],
        size: [2, 1.5],
        title: data.title,
        artist: data.artist,
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
                }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
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
          paintings={galleryPaintings} 
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
  font-family: 'Arial', sans-serif;
  font-size: min(3.5rem, 10vw);
  font-weight: 700;
  color: #f5f5f5; /* Gold color for a museum vibe */
  margin-bottom: min(1rem, 2vh);
  letter-spacing: -1px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5); /* Subtle shadow for better visibility */
}
        
        .tagline {
          font-family: 'Times New Roman', Times, serif;

          font-size: min(1.2rem, 4vw);
          color: black;
          text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.6); /* White shadow */
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
  width: 100%; /* Ensure the container spans the full width */
  height: 100%; /* Ensure the container spans the full height */
  display: flex;
  justify-content: center; /* Center the doors */
  align-items: center; /* Center the doors vertically */
  perspective: 1000px;
  top: -45px; /* Move the doors up by adjusting the top property */
}

.door {
  width: 29%; /* Each door takes up half the container width */
  height: 80%;
  transform-style: preserve-3d;
  transition: transform 1.5s ease-in-out;
}

.left-door {
  border-radius: 0 0 0 4px;
  transform-origin: right center; /* Ensure the left door rotates from the right edge */
}

.right-door {
  border-radius: 0 0 4px 0;
  transform-origin: left center; /* Ensure the right door rotates from the left edge */
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
          padding-top: 1vh; /* Add padding to shift the search bar up */
  margin-bottom: 10vh; /* Adjust margin-bottom as needed */
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
          background: #f8f8f8 ;
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


export default Home;