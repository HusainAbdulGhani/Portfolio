import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

export function Planet({ position, size, color, speed, distort }) {
  const ref = useRef();
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh position={position} ref={ref}>
        <sphereGeometry args={[size, 64, 64]} />
        <MeshDistortMaterial 
          color={color} 
          speed={speed * 4} 
          distort={distort} 
          roughness={0.2} 
          metalness={0.8} 
        />
      </mesh>
    </Float>
  );
}