import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { Phase } from '../../constants/phases';

interface SkeletonProps { phase: Phase; progress: number; }

export function SkeletonStructure({ phase, progress }: SkeletonProps) {
  const isVisible = phase.label !== 'LAND' && phase.label !== 'FOUNDATION';
  const groupRef = useRef<THREE.Group>(null);
  const floorsRef = useRef<THREE.Group[]>([]);
  const pillarsRef = useRef<THREE.Mesh[]>([]);
  const { camera } = useThree();

  const numFloors = 8;
  const floorHeight = 3.5;
  const buildingWidth = 16;
  const buildingDepth = 24;

  useFrame(() => {
    if (!isVisible) return;
    
    if (phase.label === 'SKELETON') {
      // Camera pans up to see structure rise
      const targetPos = new THREE.Vector3(20, 15, 30);
      camera.position.lerp(targetPos, 0.05);
      camera.lookAt(0, 10, 0);

      const pillarProgress = Math.min(1, Math.max(0, progress / 0.15));
      pillarsRef.current.forEach((pillar, i) => {
        const pop = Math.max(0, Math.min(1, pillarProgress * 1.5 - i * 0.1));
        pillar.scale.y = pop;
      });

      floorsRef.current.forEach((floor, i) => {
        const startPop = 0.25 + i * (0.6 / numFloors);
        const floorProg = Math.max(0, Math.min(1, (progress - startPop) / 0.1));
        floor.visible = floorProg > 0;
        floor.scale.setScalar(Math.max(0.001, floorProg));
      });
    } else {
      // For later phases, ensure it's fully built
      pillarsRef.current.forEach(p => p.scale.y = 1);
      floorsRef.current.forEach(f => {
        f.visible = true;
        f.scale.setScalar(1);
      });
      // Fade out wireframe opacity in architecture phase
      if (phase.label === 'ARCHITECTURE') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const materials = [groupRef.current?.children].flat(3).map(c => (c as any)?.material).filter(Boolean);
        materials.forEach(m => {
          if (m && typeof m.opacity === 'number') {
            m.opacity = THREE.MathUtils.lerp(1, 0, progress * 3);
            if (m.opacity < 0.01) m.opacity = 0;
          }
        });
      }
    }
  });

  if (!isVisible) return null;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {[ 
        [-buildingWidth/2 + 0.2, -buildingDepth/2 + 0.2],
        [buildingWidth/2 - 0.2, -buildingDepth/2 + 0.2],
        [-buildingWidth/2 + 0.2, buildingDepth/2 - 0.2],
        [buildingWidth/2 - 0.2, buildingDepth/2 - 0.2],
        [0, -buildingDepth/2 + 0.2],
        [0, buildingDepth/2 - 0.2]
      ].map((pos, i) => (
        <mesh 
          key={`pillar-${i}`} 
          position={[pos[0], (numFloors * floorHeight)/2, pos[1]]} 
          ref={el => el && (pillarsRef.current[i] = el)}
        >
          <boxGeometry args={[0.4, numFloors * floorHeight, 0.4]} />
          <meshBasicMaterial wireframe color="#285b9e" transparent opacity={0.8} />
        </mesh>
      ))}

      {Array.from({ length: numFloors }).map((_, i) => (
        <group key={`floor-${i}`} position={[0, i * floorHeight + floorHeight/2, 0]} ref={el => el && (floorsRef.current[i] = el)}>
          <mesh>
            <boxGeometry args={[buildingWidth, 0.4, buildingDepth]} />
            <meshBasicMaterial wireframe color="#285b9e" transparent opacity={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
