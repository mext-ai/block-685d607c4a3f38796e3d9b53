import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MoleculeProps {
  position: [number, number, number];
  color: string;
  size?: number;
  type: 'CO2' | 'H2O' | 'O2' | 'glucose';
  animated?: boolean;
}

const Molecule: React.FC<MoleculeProps> = ({ 
  position, 
  color, 
  size = 0.3, 
  type, 
  animated = false 
}) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current && animated) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      // Add gentle floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const getMoleculeStructure = () => {
    switch (type) {
      case 'CO2':
        return (
          <group ref={meshRef} position={position}>
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[size]} />
              <meshStandardMaterial color="#333" />
            </mesh>
            <mesh position={[-size * 1.5, 0, 0]}>
              <sphereGeometry args={[size * 0.7]} />
              <meshStandardMaterial color="#ff0000" />
            </mesh>
            <mesh position={[size * 1.5, 0, 0]}>
              <sphereGeometry args={[size * 0.7]} />
              <meshStandardMaterial color="#ff0000" />
            </mesh>
          </group>
        );
      case 'H2O':
        return (
          <group ref={meshRef} position={position}>
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[size * 0.8]} />
              <meshStandardMaterial color="#ff0000" />
            </mesh>
            <mesh position={[-size, size * 0.7, 0]}>
              <sphereGeometry args={[size * 0.5]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[size, size * 0.7, 0]}>
              <sphereGeometry args={[size * 0.5]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
          </group>
        );
      case 'O2':
        return (
          <group ref={meshRef} position={position}>
            <mesh position={[-size * 0.7, 0, 0]}>
              <sphereGeometry args={[size]} />
              <meshStandardMaterial color="#00ff00" />
            </mesh>
            <mesh position={[size * 0.7, 0, 0]}>
              <sphereGeometry args={[size]} />
              <meshStandardMaterial color="#00ff00" />
            </mesh>
          </group>
        );
      case 'glucose':
        return (
          <group ref={meshRef} position={position}>
            {/* Simplified glucose ring structure */}
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const angle = (i / 6) * Math.PI * 2;
              const x = Math.cos(angle) * size * 1.5;
              const z = Math.sin(angle) * size * 1.5;
              return (
                <mesh key={i} position={[x, 0, z]}>
                  <sphereGeometry args={[size * 0.6]} />
                  <meshStandardMaterial color="#ffff00" />
                </mesh>
              );
            })}
          </group>
        );
      default:
        return (
          <group ref={meshRef} position={position}>
            <mesh>
              <sphereGeometry args={[size]} />
              <meshStandardMaterial color={color} />
            </mesh>
          </group>
        );
    }
  };

  return getMoleculeStructure();
};

export default Molecule;