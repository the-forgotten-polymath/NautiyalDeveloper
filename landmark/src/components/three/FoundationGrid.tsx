import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { Phase } from '../../constants/phases';

interface FoundationGridProps {
  phase: Phase;
  progress: number;
}

export function FoundationGrid({ phase, progress }: FoundationGridProps) {
  const isVisible = phase.label !== 'LAND';
  const { camera } = useThree();
  
  const groupRef = useRef<THREE.Group>(null);
  const slabRef = useRef<THREE.Mesh>(null);

  const pileData = useMemo(() => {
    const data = [];
    const size = 30;
    const step = 6;
    for (let x = -size; x <= size; x += step) {
      for (let z = -size; z <= size; z += step) {
        data.push({
          x, z,
          delay: Math.random() * 0.6 + ((x + size + z + size) / (size * 4)) * 0.4
        });
      }
    }
    return data;
  }, []);

  useFrame((state) => {
    if (!isVisible) return;
    
    // Cinematic camera for Foundation
    if (phase.label === 'FOUNDATION') {
      const targetPos = new THREE.Vector3(30, 20, 35);
      camera.position.lerp(targetPos, 0.04);
      camera.lookAt(0, -2, 0);
      // Extra auto-rotation to make it dynamic
      camera.position.x = Math.sin(state.clock.elapsedTime * 0.05 + Math.PI/4) * 45;
      camera.position.z = Math.cos(state.clock.elapsedTime * 0.05 + Math.PI/4) * 45;
    }

    if (groupRef.current && phase.label === 'FOUNDATION') {
      const children = groupRef.current.children;
      pileData.forEach((pile, i) => {
        const p = THREE.MathUtils.clamp((progress - pile.delay) / 0.4, 0, 1);
        const y = THREE.MathUtils.lerp(-15, -0.5, p);
        const child = children[i];
        if (child) {
          child.position.y = y;
          child.scale.setScalar(THREE.MathUtils.lerp(0.01, 1, p));
        }
      });
    } else if (groupRef.current && phase.label !== 'FOUNDATION') {
      // In later phases lock them in place
      const children = groupRef.current.children;
      children.forEach((child) => {
        child.position.y = -0.5;
        child.scale.setScalar(1);
      });
    }

    if (slabRef.current) {
      if (phase.label === 'FOUNDATION') {
        const slabProgress = THREE.MathUtils.clamp((progress - 0.6) / 0.4, 0, 1);
        slabRef.current.scale.set(slabProgress, 1, slabProgress);
        const mat = slabRef.current.material as THREE.MeshStandardMaterial;
        mat.opacity = slabProgress;
      } else {
        slabRef.current.scale.set(1, 1, 1);
        (slabRef.current.material as THREE.MeshStandardMaterial).opacity = 1;
      }
    }
  });

  if (!isVisible) return null;

  return (
    <group position={[0, 0, 0]}>
       {/* Ambient glow from underneath the foundation */}
      <pointLight position={[0, -5, 0]} intensity={2.5} color="#E5A93D" distance={60} />

      {/* Main Luxury Slab */}
      <mesh ref={slabRef} position={[0, -0.1, 0]}>
        <boxGeometry args={[65, 0.4, 65]} />
        <meshStandardMaterial 
          color="#0b1320" 
          roughness={0.1} 
          metalness={0.8}
          transparent
          opacity={0}
        />
      </mesh>

      {/* Grid of metallic foundation piles pushing up */}
      <group ref={groupRef}>
        {pileData.map((pile, i) => (
          <group key={i} position={[pile.x, -15, pile.z]}>
            {/* The heavy concrete/steel pillar */}
            <mesh position={[0, -2, 0]}>
              <cylinderGeometry args={[0.8, 0.8, 4, 16]} />
              <meshStandardMaterial color="#1a2b44" roughness={0.7} metalness={0.4} />
            </mesh>
            {/* The gold locking ring / anchor node */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[1.2, 1.2, 0.3, 16]} />
              <meshStandardMaterial color="#E5A93D" roughness={0.2} metalness={0.9} />
            </mesh>
            {/* Glass core inside the anchor */}
            <mesh position={[0, 0.2, 0]}>
              <cylinderGeometry args={[0.6, 0.6, 0.4, 16]} />
              <meshStandardMaterial color="#FFCB70" emissive="#FFCB70" emissiveIntensity={0.5} transparent opacity={0.8} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
