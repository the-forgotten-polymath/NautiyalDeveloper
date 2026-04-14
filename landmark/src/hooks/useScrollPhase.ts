import { useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { PHASES } from '../constants/phases';
import type { Phase } from '../constants/phases';

export function useScrollPhase(target?: React.RefObject<any>) {
  const { scrollYProgress } = useScroll({
    target: target,
    offset: ["start start", "end end"]
  });
  const [currentPhase, setCurrentPhase] = useState<Phase>(PHASES.LAND);
  const [phaseProgress, setPhaseProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      for (const key of Object.keys(PHASES)) {
        const phase = PHASES[key as keyof typeof PHASES];
        // if latest is beyond the last phase end, cap it at the last phase.
        if (latest >= phase.start && latest <= phase.end) {
          setCurrentPhase(phase);
          const range = phase.end - phase.start;
          if (range > 0) {
            setPhaseProgress(Math.max(0, Math.min(1, (latest - phase.start) / range)));
          } else {
            setPhaseProgress(1);
          }
          break;
        }
      }
    });
  }, [scrollYProgress]);

  return { scrollYProgress, currentPhase, phaseProgress };
}
