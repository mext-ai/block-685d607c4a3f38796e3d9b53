import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LightRayProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  animated?: boolean;
  speed?: number;
}

const LightRay: React.FC<LightRayProps> = ({ 
  start, 
  end, 
  color = '#ffff00', 
  animated = true,
  speed = 2 
}) => {
  const particleRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (animated && particleRef.current && glowRef.current) {
      // Animate light particle moving along the ray
      const t = (Math.sin(state.clock.elapsedTime * speed) + 1) / 2;
      const x = start[0] + (end[0] - start[0]) * t;
      const y = start[1] + (end[1] - start[1]) * t;
      const z = start[2] + (end[2] - start[2]) * t;
      
      particleRef.current.position.set(x, y, z);
      glowRef.current.position.set(x, y, z);
    }
  });

  // Create a simple tube geometry for the light ray
  const rayGeometry = React.useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(...start),
      new THREE.Vector3(...end)
    ]);
    return new THREE.TubeGeometry(curve, 20, 0.02, 8, false);
  }, [start, end]);

  return (
    <group>
      {/* Light ray tube */}
      <mesh geometry={rayGeometry}>
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.6}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Moving light particle */}
      <mesh ref={particleRef} position={start}>
        <sphereGeometry args={[0.05]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.9}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Glow effect around the particle */}
      <mesh ref={glowRef} position={start}>
        <sphereGeometry args={[0.15]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.2}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );
};

export default LightRay;