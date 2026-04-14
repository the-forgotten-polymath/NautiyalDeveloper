import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { Phase } from '../../constants/phases';
import windVert from '../../shaders/wind.vert?raw';
import windFrag from '../../shaders/wind.frag?raw';

interface LandSceneProps {
  phase: Phase;
  progress: number;
  scrollYProgress: any;
}

export function LandScene({ phase, progress }: LandSceneProps) {
  const isVisible = phase.label === 'LAND' || phase.label === 'FOUNDATION';
  const planeRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  
  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: windVert,
        fragmentShader: windFrag,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color('#1a1a1a') },
          uOpacity: { value: 1.0 },
        },
        transparent: true,
        wireframe: false,
      }),
    []
  );

  useFrame((state) => {
    if (!isVisible) return;
    
    // Camera control for Land phase
    if (phase.label === 'LAND') {
      camera.position.lerp(new THREE.Vector3(0, 18, 35), 0.05);
      camera.lookAt(0, 0, 0);
      // auto-orbit
      camera.position.x = Math.sin(state.clock.elapsedTime * 0.05) * 35;
      camera.position.z = Math.cos(state.clock.elapsedTime * 0.05) * 35;
    }

    if (shaderMaterial) {
      shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
      if (phase.label === 'FOUNDATION') {
        shaderMaterial.uniforms.uOpacity.value = THREE.MathUtils.lerp(1, 0, progress * 2);
      } else {
        shaderMaterial.uniforms.uOpacity.value = 1;
      }
    }
  });

  if (!isVisible) return null;

  return (
    <group>
      <ambientLight intensity={0.4} color="#1a1a2e" />
      <directionalLight position={[10, 5, 10]} intensity={0.3} color="#ffaa44" />
      <fogExp2 attach="fog" args={['#060B14', 0.02]} />
      
      <mesh ref={planeRef} material={shaderMaterial} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[200, 200, 128, 128]} />
      </mesh>
      
      <ParticleField />
      <gridHelper args={[200, 40, '#1a2a3a', '#1a2a3a']} position={[0, -0.49, 0]} />
    </group>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const temp = new Float32Array(60 * 3);
    for (let i = 0; i < 60; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 40;
      temp[i * 3 + 1] = Math.random() * 10;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={60} args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#C9A84C" size={0.08} transparent opacity={0.2} />
    </points>
  );
}
