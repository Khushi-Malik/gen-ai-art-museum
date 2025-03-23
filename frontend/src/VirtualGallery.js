import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import * as THREE from 'three';


// Gallery Room component
const Room = ({ paintings = [] }) => {
  // Create room geometry
  const roomWidth = 10;
  const roomHeight = 4;
  const roomDepth = 10;

  return (
    <group>
      {/* Floor */} <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}> <planeGeometry args={[roomWidth, roomDepth]} /> <meshStandardMaterial color="#D6C7B2" /> </mesh>

      {/* Walls and Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#FEFBF5" />
      </mesh>
      
      <mesh position={[0, 2, -5]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial color="#FBF8F0" />
      </mesh>

      <mesh rotation={[0, Math.PI / 2, 0]} position={[-5, 2, 0]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial color="#F9F4EB" />
      </mesh>

      <mesh rotation={[0, -Math.PI / 2, 0]} position={[5, 2, 0]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial color="#FAF5EC" />
      </mesh>

      {/* Lighting */}
      <ambientLight intensity={1.5} />
      <spotLight position={[0, 3.5, 0]} intensity={1.5} angle={Math.PI / 4} castShadow />
      
      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, roomHeight, 0]}>
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial color="#FEFBF5" />
      </mesh>
      
      {/* Back wall */}
      <mesh position={[0, roomHeight / 2, -roomDepth / 2]}>
        <planeGeometry args={[roomWidth, roomHeight]} />
        <meshStandardMaterial color="#FBF8F0" />
      </mesh>
      
      {/* Left wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-roomWidth / 2, roomHeight / 2, 0]}>
        <planeGeometry args={[roomDepth, roomHeight]} />
        <meshStandardMaterial color="#F9F4EB" />
      </mesh>
      
      {/* Right wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[roomWidth / 2, roomHeight / 2, 0]}>
        <planeGeometry args={[roomDepth, roomHeight]} />
        <meshStandardMaterial color="#FAF5EC" />
      </mesh>
      
      {/* Display paintings */}
      {paintings.map((painting, index) => (
        <Painting 
          key={index} 
          imageUrl={painting.imageUrl} 
          position={painting.position} 
          rotation={painting.rotation} 
          size={painting.size} 
          title={painting.title}
          artist={painting.artist}
        />
      ))}
      
      {/* Lighting */}
      <ambientLight intensity={1.5} />
      <spotLight position={[0, roomHeight - 0.5, 0]} intensity={1.5} angle={Math.PI / 4} castShadow />
    </group>
  );
};

// Individual Painting component
const Painting = ({ imageUrl, position, rotation, size = [1.5, 1], title, artist }) => {
  const [texture, setTexture] = useState(null);
  const [hovered, setHovered] = useState(false);
  
  // Load texture
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(imageUrl, (loadedTexture) => {
      setTexture(loadedTexture);
    });
  }, [imageUrl]);
  
  if (!texture) return null;
  
  // Adjust frame size based on texture aspect ratio
  const adjustedWidth = size[0];
  const adjustedHeight = size[1];
  const frameDepth = 0.05;
  
  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <mesh 
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[adjustedWidth + 0.1, adjustedHeight + 0.1, frameDepth]} />
        <meshStandardMaterial color={hovered ? "#120e0c" : "#4d3832"} />
      </mesh>
      
      {/* Canvas */}
      <mesh position={[0, 0, frameDepth / 2 + 0.01]}>
        <planeGeometry args={[adjustedWidth, adjustedHeight]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      
      {/* Painting info (only visible when hovered) */}
      {hovered && (
        <group position={[0, -adjustedHeight / 2 - 0.2, 0.1]}>
          <Text 
            position={[0, 0, 0]}
            fontSize={0.15}
            color="white"
            backgroundColor="#000000"
            padding={0.05}
            textAlign="center"
          >
            {`${title} - ${artist}`}
          </Text>
        </group>
      )}
    </group>
  );
};

// Camera Controls
const CameraControls = ({ initialPosition = [0, 1.7, 5] }) => {
  return (
    <>
      <PerspectiveCamera 
        makeDefault 
        position={initialPosition} 
        fov={60}
      />
      <OrbitControls 
        enableDamping
        dampingFactor={0.05}
        minDistance={1}
        maxDistance={10}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
};

// Main Virtual Gallery component
const VirtualGallery = ({ paintings = [], onClose }) => {
  return (
    <div className="virtual-gallery-container">
      <button className="close-button" onClick={onClose}>Exit Gallery</button>
      <Canvas shadows>
        <CameraControls />
        <Room paintings={paintings} />
      </Canvas>
      
      <style jsx>{`
        .virtual-gallery-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1000;
          background-color: #333;
        }
        
        .close-button {
          position: absolute;
          top: 20px;
          right: 20px;
          padding: 10px 20px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          z-index: 1001;
          font-family: Arial, sans-serif;
        }
        
        .close-button:hover {
          background: rgba(0, 0, 0, 0.9);
        }
      `}</style>
    </div>
  );
};

export default VirtualGallery;

// import React, { useEffect, useRef, useState } from 'react';
// import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
// import * as THREE from 'three';

// // Gallery Room component
// const Room = ({ paintings = [] }) => {
//   // Create room geometry
//   const roomWidth = 10;
//   const roomHeight = 4;
//   const roomDepth = 10;
  
//   return (
//     <group>
//       {/* Floor */}
//       <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
//         <planeGeometry args={[roomWidth, roomDepth]} />
//         <meshStandardMaterial color="#d3d3d3" />
//       </mesh>
      
//       {/* Ceiling */}
//       <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, roomHeight, 0]}>
//         <planeGeometry args={[roomWidth, roomDepth]} />
//         <meshStandardMaterial color="#f5f5f5" />
//       </mesh>
      
//       {/* Back wall */}
//       <mesh position={[0, roomHeight / 2, -roomDepth / 2]}>
//         <planeGeometry args={[roomWidth, roomHeight]} />
//         <meshStandardMaterial color="#f8f8f8" />
//       </mesh>
      
//       {/* Left wall */}
//       <mesh rotation={[0, Math.PI / 2, 0]} position={[-roomWidth / 2, roomHeight / 2, 0]}>
//         <planeGeometry args={[roomDepth, roomHeight]} />
//         <meshStandardMaterial color="#f0f0f0" />
//       </mesh>
      
//       {/* Right wall */}
//       <mesh rotation={[0, -Math.PI / 2, 0]} position={[roomWidth / 2, roomHeight / 2, 0]}>
//         <planeGeometry args={[roomDepth, roomHeight]} />
//         <meshStandardMaterial color="#f0f0f0" />
//       </mesh>
      
//       {/* Display paintings */}
//       {paintings.map((painting, index) => (
//         <Painting 
//           key={index} 
//           imageUrl={painting.imageUrl} 
//           position={painting.position} 
//           rotation={painting.rotation} 
//           size={painting.size} 
//           title={painting.title}
//           artist={painting.artist}
//         />
//       ))}
      
//       {/* Lighting */}
//       <ambientLight intensity={0.5} />
//       <spotLight position={[0, roomHeight - 0.5, 0]} intensity={0.8} angle={Math.PI / 4} castShadow />
//     </group>
//   );
// };

// // Individual Painting component
// const Painting = ({ imageUrl, position, rotation, size = [1.5, 1], title, artist }) => {
//   const [texture, setTexture] = useState(null);
//   const [hovered, setHovered] = useState(false);
//   const textRef = useRef();
  
//   // Load texture
//   useEffect(() => {
//     const loader = new THREE.TextureLoader();
//     loader.load(imageUrl, (loadedTexture) => {
//       setTexture(loadedTexture);
//     });
//   }, [imageUrl]);
  
//   if (!texture) return null;
  
//   // Adjust frame size based on texture aspect ratio
//   const adjustedWidth = size[0];
//   const adjustedHeight = size[1];
//   const frameDepth = 0.05;
  
//   return (
//     <group position={position} rotation={rotation}>
//       {/* Frame */}
//       <mesh 
//         onPointerOver={() => setHovered(true)} 
//         onPointerOut={() => setHovered(false)}
//       >
//         <boxGeometry args={[adjustedWidth + 0.1, adjustedHeight + 0.1, frameDepth]} />
//         <meshStandardMaterial color={hovered ? "#d4af37" : "#8b4513"} />
//       </mesh>
      
//       {/* Canvas */}
//       <mesh position={[0, 0, frameDepth / 2 + 0.01]}>
//         <planeGeometry args={[adjustedWidth, adjustedHeight]} />
//         <meshBasicMaterial map={texture} />
//       </mesh>
      
//       {/* Painting info (only visible when hovered) */}
//       {hovered && (
//         <group position={[0, -adjustedHeight / 2 - 0.2, frameDepth / 2]}>
//           <mesh>
//             <planeGeometry args={[adjustedWidth + 0.3, 0.3]} />
//             <meshBasicMaterial color="rgba(0,0,0,0.7)" transparent opacity={0.7} />
//           </mesh>
//           <Text 
//             position={[0, 0, 0.02]}
//             fontSize={0.1}
//             color="white"
//             text={`${title} - ${artist}`}
//           />
//         </group>
//       )}
//     </group>
//   );
// };

// // Text component for painting labels
// const Text = ({ text, position, fontSize = 0.1, color = 'white' }) => {
//   const { camera } = useThree();
//   const textRef = useRef();
  
//   useFrame(() => {
//     if (textRef.current) {
//       textRef.current.lookAt(camera.position);
//     }
//   });
  
//   return (
//     <group ref={textRef} position={position}>
//       <mesh>
//         <textGeometry args={[text, { font: 'Arial', size: fontSize, height: 0.01 }]} />
//         <meshBasicMaterial color={color} />
//       </mesh>
//     </group>
//   );
// };

// // Camera Controls
// const CameraControls = ({ initialPosition = [0, 1.7, 5] }) => {
//   const cameraRef = useRef();
  
//   return (
//     <>
//       <PerspectiveCamera 
//         ref={cameraRef} 
//         makeDefault 
//         position={initialPosition} 
//         fov={60}
//       />
//       <OrbitControls 
//         enableDamping
//         dampingFactor={0.05}
//         minDistance={1}
//         maxDistance={10}
//         minPolarAngle={Math.PI / 6}
//         maxPolarAngle={Math.PI / 2}
//       />
//     </>
//   );
// };

// // Main Virtual Gallery component
// const VirtualGallery = ({ paintings = [], onClose }) => {
//   return (
//     <div className="virtual-gallery-container">
//       <button className="close-button" onClick={onClose}>Exit Gallery</button>
//       <Canvas shadows>
//         <CameraControls />
//         <Room paintings={paintings} />
//       </Canvas>
      
//       <style jsx>{`
//         .virtual-gallery-container {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           z-index: 1000;
//         }
        
//         .close-button {
//           position: absolute;
//           top: 20px;
//           right: 20px;
//           padding: 10px 20px;
//           background: rgba(0, 0, 0, 0.7);
//           color: white;
//           border: none;
//           border-radius: 4px;
//           cursor: pointer;
//           z-index: 1001;
//         }
        
//         .close-button:hover {
//           background: rgba(0, 0, 0, 0.9);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default VirtualGallery;