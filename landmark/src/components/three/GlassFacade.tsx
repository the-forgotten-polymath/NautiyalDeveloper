import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { Phase } from '../../constants/phases';

interface GlassFacadeProps { phase: Phase; progress: number; }

export function GlassFacade({ phase, progress }: GlassFacadeProps) {
  const isVisible = phase.label === 'ARCHITECTURE' || phase.label === 'INTERIOR' || phase.label === 'REVEAL';
  const groupRef = useRef<THREE.Group>(null);
  const solidBuildingRef = useRef<THREE.Mesh>(null);
  const panelsRef = useRef<THREE.Mesh[]>([]);
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const { camera } = useThree();

  const buildingWidth = 16;
  const buildingDepth = 24;
  const buildingHeight = 28;

  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    transmission: 0.95,
    roughness: 0.1,
    thickness: 0.5,
    envMapIntensity: 1.0,
    color: '#aaccff',
    metalness: 0.2
  }), []);

  const panelsData = useMemo(() => {
    const data = [];
    const panelH = 3.5;
    for (let f = 0; f < 8; f++) {
      data.push({ x: 0, y: f * panelH + panelH/2, z: buildingDepth/2, rot: [0, 0, 0], w: buildingWidth, h: panelH });
      data.push({ x: 0, y: f * panelH + panelH/2, z: -buildingDepth/2, rot: [0, Math.PI, 0], w: buildingWidth, h: panelH });
      data.push({ x: -buildingWidth/2, y: f * panelH + panelH/2, z: 0, rot: [0, -Math.PI/2, 0], w: buildingDepth, h: panelH });
      data.push({ x: buildingWidth/2, y: f * panelH + panelH/2, z: 0, rot: [0, Math.PI/2, 0], w: buildingDepth, h: panelH });
    }
    return data;
  }, []);

  useFrame(() => {
    if (!isVisible) return;

    if (phase.label === 'ARCHITECTURE') {
      const targetPos = new THREE.Vector3(-30, 25, 45);
      camera.position.lerp(targetPos, 0.05);
      camera.lookAt(0, 10, 0);

      if (solidBuildingRef.current) {
        (solidBuildingRef.current.material as THREE.MeshStandardMaterial).opacity = Math.min(1, progress * 4);
      }

      panelsRef.current.forEach((panel, i) => {
        const startPop = i * (1 / panelsData.length) * 0.8;
        const popProg = Math.max(0, Math.min(1, (progress - startPop) * 5));
        panel.position.y = THREE.MathUtils.lerp(buildingHeight + 10, panel.userData.targetY, popProg);
        panel.visible = popProg > 0;
      });

      if (lightRef.current) {
        lightRef.current.color.lerpColors(new THREE.Color('#6080aa'), new THREE.Color('#ffcc88'), progress);
        lightRef.current.intensity = THREE.MathUtils.lerp(0.3, 1.2, progress);
      }
    } else {
      if (solidBuildingRef.current) (solidBuildingRef.current.material as THREE.MeshStandardMaterial).opacity = 1;
      panelsRef.current.forEach(p => {
        if (p) {
          p.visible = true;
          p.position.y = p.userData.targetY;
        }
      });
      
      if (phase.label === 'INTERIOR') {
          // Hide during interior to show crossfade, but handled by canvas opacity in App/Main
      }
    }
  });

  if (!isVisible) return null;

  return (
    <group ref={groupRef}>
      <directionalLight ref={lightRef} position={[20, 20, 10]} intensity={1.2} color="#ffcc88" />
      
      <mesh ref={solidBuildingRef} position={[0, buildingHeight/2, 0]}>
        <boxGeometry args={[buildingWidth - 0.5, buildingHeight - 0.5, buildingDepth - 0.5]} />
        <meshStandardMaterial color="#141414" roughness={0.8} metalness={0.1} transparent opacity={0} />
      </mesh>

      {panelsData.map((d, i) => (
        <mesh 
          key={`panel-${i}`} 
          ref={el => el && (panelsRef.current[i] = el)}
          position={[d.x, d.y + 10, d.z]}
          rotation={d.rot as [number, number, number]}
          userData={{ targetY: d.y }}
          visible={false}
          material={glassMaterial}
        >
          <planeGeometry args={[d.w, d.h]} />
        </mesh>
      ))}
    </group>
  );
}
