import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { Phase } from '../../constants/phases';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

interface RevealBuildingProps { phase: Phase; progress: number; }

export function RevealBuilding({ phase }: RevealBuildingProps) {
  const isVisible = phase.label === 'REVEAL';
  const { camera } = useThree();

  useFrame((state) => {
    if (!isVisible) return;
    
    // Camera pull back for massive cinematic scale in reveal
    const targetPos = new THREE.Vector3(50, 35, 75);
    camera.position.lerp(targetPos, 0.02);
    camera.lookAt(0, 5, 0);
    
    // Auto-orbit
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.03 + Math.PI/4) * 85;
    camera.position.z = Math.cos(state.clock.elapsedTime * 0.03 + Math.PI/4) * 85;
  });

  if (!isVisible) return null;

  return (
    <>
      <Environment preset="sunset" />
      <EffectComposer>
        <Bloom intensity={0.6} luminanceThreshold={0.5} luminanceSmoothing={0.9} />
        <Vignette offset={0.3} darkness={0.6} />
      </EffectComposer>
      <GoldenBokeh />
    </>
  );
}

function GoldenBokeh() {
  const pointsRef = useRef<THREE.Points>(null);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const particles = useMemo(() => {
    const temp = new Float32Array(80 * 3);
    for (let i = 0; i < 80; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 60;     // x
      temp[i * 3 + 1] = Math.random() * 40;         // y
      temp[i * 3 + 2] = (Math.random() - 0.5) * 60; // z
    }
    return temp;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 2;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={80} args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#C9A84C" size={0.2} transparent opacity={0.6} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}
