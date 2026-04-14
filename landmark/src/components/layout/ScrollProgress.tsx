import { motion, useScroll } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        backgroundColor: 'var(--color-gold)',
        transformOrigin: '0%',
        scaleX: scrollYProgress,
        zIndex: 10000,
      }}
    />
  );
}
