import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
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
  const meshRef = useRef<THREE.Mesh>(null);

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
            <Sphere args={[size]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#333" />
            </Sphere>
            <Sphere args={[size * 0.7]} position={[-size * 1.5, 0, 0]}>
              <meshStandardMaterial color="#ff0000" />
            </Sphere>
            <Sphere args={[size * 0.7]} position={[size * 1.5, 0, 0]}>
              <meshStandardMaterial color="#ff0000" />
            </Sphere>
          </group>
        );
      case 'H2O':
        return (
          <group ref={meshRef} position={position}>
            <Sphere args={[size * 0.8]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#ff0000" />
            </Sphere>
            <Sphere args={[size * 0.5]} position={[-size, size * 0.7, 0]}>
              <meshStandardMaterial color="#ffffff" />
            </Sphere>
            <Sphere args={[size * 0.5]} position={[size, size * 0.7, 0]}>
              <meshStandardMaterial color="#ffffff" />
            </Sphere>
          </group>
        );
      case 'O2':
        return (
          <group ref={meshRef} position={position}>
            <Sphere args={[size]} position={[-size * 0.7, 0, 0]}>
              <meshStandardMaterial color="#00ff00" />
            </Sphere>
            <Sphere args={[size]} position={[size * 0.7, 0, 0]}>
              <meshStandardMaterial color="#00ff00" />
            </Sphere>
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
                <Sphere key={i} args={[size * 0.6]} position={[x, 0, z]}>
                  <meshStandardMaterial color="#ffff00" />
                </Sphere>
              );
            })}
          </group>
        );
      default:
        return (
          <Sphere ref={meshRef} args={[size]} position={position}>
            <meshStandardMaterial color={color} />
          </Sphere>
        );
    }
  };

  return getMoleculeStructure();
};

export default Molecule;