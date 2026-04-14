import { Canvas } from '@react-three/fiber';
import { SceneManager } from './SceneManager';

export function ThreeCanvas({ targetRef }: { targetRef?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div id="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }} performance={{ min: 0.5 }}>
        <color attach="background" args={['#060B14']} />
        <SceneManager targetRef={targetRef} />
      </Canvas>
    </div>
  );
}
