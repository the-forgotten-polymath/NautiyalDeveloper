import { useScrollPhase } from '../../hooks/useScrollPhase';
import { LandScene } from './LandScene';
import { FoundationGrid } from './FoundationGrid';
import { SkeletonStructure } from './SkeletonStructure';
import { GlassFacade } from './GlassFacade';
import { RevealBuilding } from './RevealBuilding';

export function SceneManager({ targetRef }: { targetRef?: React.RefObject<HTMLDivElement | null> }) {
  const { currentPhase, phaseProgress, scrollYProgress } = useScrollPhase(targetRef);

  return (
    <>
      <LandScene phase={currentPhase} progress={phaseProgress} scrollYProgress={scrollYProgress} />
      <FoundationGrid phase={currentPhase} progress={phaseProgress} />
      <SkeletonStructure phase={currentPhase} progress={phaseProgress} />
      <GlassFacade phase={currentPhase} progress={phaseProgress} />
      <RevealBuilding phase={currentPhase} progress={phaseProgress} />
    </>
  );
}
