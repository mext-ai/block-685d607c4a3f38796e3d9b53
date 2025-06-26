import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import Molecule from './Molecule';

interface ChloroplastProps {
  position: [number, number, number];
  showMolecules?: boolean;
  reactionStage?: number;
}

const Chloroplast: React.FC<ChloroplastProps> = ({ 
  position, 
  showMolecules = true,
  reactionStage = 0 
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation to show the 3D structure
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main chloroplast body - oval shape */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 16]} />
        <meshStandardMaterial 
          color="#4CAF50" 
          transparent 
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Thylakoid membranes - stacked disc structures */}
      {[...Array(5)].map((_, i) => (
        <group key={i} position={[0, (i - 2) * 0.4, 0]}>
          {/* Thylakoid disc */}
          <Cylinder args={[0.8, 0.8, 0.1, 32]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#2E7D32" transparent opacity={0.6} />
          </Cylinder>
          
          {/* Grana stack connection */}
          {i < 4 && (
            <Cylinder 
              args={[0.1, 0.1, 0.3, 8]} 
              position={[0.5, 0.2, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <meshStandardMaterial color="#1B5E20" />
            </Cylinder>
          )}
        </group>
      ))}

      {/* Show molecules based on reaction stage */}
      {showMolecules && (
        <group>
          {/* Input molecules - CO2 and H2O */}
          {reactionStage >= 1 && (
            <>
              <Molecule 
                position={[-2, 0.5, 0]} 
                color="#666" 
                type="CO2" 
                animated 
              />
              <Molecule 
                position={[-2, -0.5, 0]} 
                color="#0088ff" 
                type="H2O" 
                animated 
              />
            </>
          )}

          {/* Intermediate stage */}
          {reactionStage >= 2 && (
            <>
              <Molecule 
                position={[0, 0.8, 0]} 
                color="#ffff00" 
                type="glucose" 
                animated 
                size={0.2}
              />
            </>
          )}

          {/* Output molecules - O2 and Glucose */}
          {reactionStage >= 3 && (
            <>
              <Molecule 
                position={[2, 0.5, 0]} 
                color="#00ff00" 
                type="O2" 
                animated 
              />
              <Molecule 
                position={[2, -0.5, 0]} 
                color="#ffff00" 
                type="glucose" 
                animated 
              />
            </>
          )}
        </group>
      )}

      {/* Chlorophyll molecules - represented as small green spheres */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 0.6;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <Sphere key={i} args={[0.08]} position={[x, 0, z]}>
            <meshStandardMaterial 
              color="#00ff00" 
              emissive="#004400"
              emissiveIntensity={0.3}
            />
          </Sphere>
        );
      })}
    </group>
  );
};

export default Chloroplast;