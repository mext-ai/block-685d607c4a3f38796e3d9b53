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
  const lineRef = useRef<THREE.Line>(null);
  const particleRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (animated && particleRef.current) {
      // Animate light particle moving along the ray
      const t = (Math.sin(state.clock.elapsedTime * speed) + 1) / 2;
      const x = start[0] + (end[0] - start[0]) * t;
      const y = start[1] + (end[1] - start[1]) * t;
      const z = start[2] + (end[2] - start[2]) * t;
      
      particleRef.current.position.set(x, y, z);
    }
  });

  const points = React.useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ], [start, end]);

  return (
    <group>
      {/* Light ray line */}
      <line ref={lineRef}>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.flatMap(v => [v.x, v.y, v.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial attach="material" color={color} transparent opacity={0.6} />
      </line>
      
      {/* Moving light particle */}
      <mesh ref={particleRef} position={start}>
        <sphereGeometry args={[0.05]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.8}
        />
      </mesh>
      
      {/* Glow effect around the particle */}
      <mesh position={start}>
        <sphereGeometry args={[0.15]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.2}
        />
      </mesh>
    </group>
  );
};

export default LightRay;