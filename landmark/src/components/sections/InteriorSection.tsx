import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeUpVariant, staggerContainer } from '../../constants/animation';

export function InteriorSection({ targetRef }: { targetRef?: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });
  const bgOpacity = useTransform(scrollYProgress, [0.55, 0.60, 0.75, 0.80], [0, 1, 1, 0]);

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: bgOpacity,
          zIndex: -1,
        }}
      />
      <div style={{ position: 'relative', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 var(--section-padding)', pointerEvents: 'auto', background: 'linear-gradient(to right, rgba(6,11,20,0.95) 0%, rgba(6,11,20,0.7) 40%, rgba(6,11,20,0) 100%)', backdropFilter: 'blur(4px)' }}>
        <motion.div variants={staggerContainer(0.15)} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }}>
          <motion.div variants={fadeUpVariant} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-gold)', letterSpacing: '0.15em', marginBottom: '24px' }}>
            PHASE · 04 · INTERIOR
          </motion.div>
          
          <motion.h2 variants={fadeUpVariant} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 300, color: 'var(--color-platinum)', lineHeight: 1.1 }}>
            Not Just Spaces.<br />
            Experiences Crafted<br />
            for Life.
          </motion.h2>
          
          <motion.p variants={fadeUpVariant} style={{ fontFamily: 'var(--font-ui)', fontSize: '15px', fontWeight: 300, color: 'var(--color-mist)', lineHeight: 1.7, maxWidth: '400px', marginTop: '32px' }}>
            Interiors that breathe with you. Light that moves through the day. Materials that age into beauty. A home that earns its keep in memory.
          </motion.p>
        </motion.div>
      </div>
    </>
  );
}
