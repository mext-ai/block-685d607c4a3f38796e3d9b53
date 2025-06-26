import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';
import Molecule from './Molecule';
import LightRay from './LightRay';
import Chloroplast from './Chloroplast';
import ControlPanel from './ControlPanel';
import InfoPanel from './InfoPanel';

interface BlockProps {
  title?: string;
  description?: string;
}

const Block: React.FC<BlockProps> = ({ title, description }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [showLightRays, setShowLightRays] = useState(true);
  const [showMolecules, setShowMolecules] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurrentStage((prev) => (prev + 1) % 5);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [autoPlay]);

  // Send completion event when user first interacts
  useEffect(() => {
    if (!hasInteracted && (currentStage > 0 || showLightRays !== true || showMolecules !== true)) {
      setHasInteracted(true);
      // Send completion event
      window.postMessage({ 
        type: 'BLOCK_COMPLETION', 
        blockId: '685d607c4a3f38796e3d9b53', 
        completed: true,
        data: { interactionType: 'photosynthesis_exploration' }
      }, '*');
      window.parent.postMessage({ 
        type: 'BLOCK_COMPLETION', 
        blockId: '685d607c4a3f38796e3d9b53', 
        completed: true,
        data: { interactionType: 'photosynthesis_exploration' }
      }, '*');
    }
  }, [currentStage, showLightRays, showMolecules, hasInteracted]);

  const PhotosynthesisScene = () => {
    return (
      <>
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />

        {/* Environment and background */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="sunset" />

        {/* Main chloroplast */}
        <Chloroplast 
          position={[0, 0, 0]} 
          showMolecules={showMolecules}
          reactionStage={currentStage}
        />

        {/* Light rays from sun */}
        {showLightRays && currentStage >= 1 && (
          <>
            <LightRay 
              start={[-8, 4, 2]} 
              end={[-1, 1, 0]} 
              color="#ffff00"
              speed={1.5}
            />
            <LightRay 
              start={[-8, 2, -2]} 
              end={[-1, -0.5, 0]} 
              color="#ffa500"
              speed={1.8}
            />
            <LightRay 
              start={[-8, 6, 0]} 
              end={[-1, 0.5, 1]} 
              color="#ffff88"
              speed={1.2}
            />
          </>
        )}

        {/* Floating molecules around the scene */}
        {showMolecules && (
          <>
            {/* CO2 molecules entering */}
            {currentStage >= 1 && (
              <>
                <Molecule position={[-4, 2, -3]} color="#666" type="CO2" animated />
                <Molecule position={[-3, -1, 3]} color="#666" type="CO2" animated />
                <Molecule position={[-5, 0, 1]} color="#666" type="CO2" animated />
              </>
            )}

            {/* H2O molecules */}
            {currentStage >= 2 && (
              <>
                <Molecule position={[-2, -2, -2]} color="#0088ff" type="H2O" animated />
                <Molecule position={[-3, 1, -1]} color="#0088ff" type="H2O" animated />
              </>
            )}

            {/* O2 molecules being released */}
            {currentStage >= 3 && (
              <>
                <Molecule position={[3, 1, 2]} color="#00ff00" type="O2" animated />
                <Molecule position={[4, -1, -1]} color="#00ff00" type="O2" animated />
                <Molecule position={[2, 2, -2]} color="#00ff00" type="O2" animated />
              </>
            )}

            {/* Glucose molecules */}
            {currentStage >= 4 && (
              <>
                <Molecule position={[3, -2, 1]} color="#ffff00" type="glucose" animated />
                <Molecule position={[4, 0, 2]} color="#ffff00" type="glucose" animated />
              </>
            )}
          </>
        )}

        {/* Sun representation */}
        {showLightRays && (
          <mesh position={[-10, 5, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial 
              color="#ffff00" 
              emissive="#ffaa00"
              emissiveIntensity={0.8}
            />
          </mesh>
        )}

        {/* Camera controls */}
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={20}
          target={[0, 0, 0]}
        />
      </>
    );
  };

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      position: 'relative',
      background: 'linear-gradient(to bottom, #87CEEB 0%, #98FB98 100%)',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [5, 3, 8], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
      >
        <PhotosynthesisScene />
      </Canvas>

      {/* Control Panel */}
      <ControlPanel
        currentStage={currentStage}
        onStageChange={setCurrentStage}
        showLightRays={showLightRays}
        onToggleLightRays={() => setShowLightRays(!showLightRays)}
        showMolecules={showMolecules}
        onToggleMolecules={() => setShowMolecules(!showMolecules)}
        autoPlay={autoPlay}
        onToggleAutoPlay={() => setAutoPlay(!autoPlay)}
      />

      {/* Information Panel */}
      <InfoPanel currentStage={currentStage} />

      {/* Instructions overlay */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '20px',
        fontSize: '12px',
        textAlign: 'center',
        zIndex: 1000
      }}>
        🖱️ Drag to rotate • 🔍 Scroll to zoom • Use controls to explore photosynthesis stages
      </div>
    </div>
  );
};

export default Block;