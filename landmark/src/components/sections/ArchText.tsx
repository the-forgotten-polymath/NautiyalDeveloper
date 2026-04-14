import { motion } from 'framer-motion';
import { fadeUpVariant, staggerContainer } from '../../constants/animation';

export function ArchText() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 10vw', pointerEvents: 'auto' }}>
      <motion.div variants={staggerContainer(0.15)} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }}>
        <motion.div variants={fadeUpVariant} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-gold)', letterSpacing: '0.15em', marginBottom: '24px' }}>
          PHASE · 03 · ARCHITECTURE
        </motion.div>
        
        <motion.h2 variants={fadeUpVariant} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 300, color: 'var(--color-platinum)', lineHeight: 1.1 }}>
          Where Architecture<br />
          Meets Emotion.
        </motion.h2>
        
        <motion.p variants={fadeUpVariant} style={{ fontFamily: 'var(--font-ui)', fontSize: '15px', fontWeight: 300, color: 'var(--color-mist)', lineHeight: 1.7, maxWidth: '400px', marginTop: '32px' }}>
          Form follows feeling here. Glass that captures sky. Stone that holds memory. Spaces designed to make inhabitants feel extraordinary.
        </motion.p>
        
        <motion.div variants={fadeUpVariant} style={{ marginTop: '48px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-platinum)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ color: 'var(--color-gold)' }}>→</span> Low-E Glass Curtain Wall
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ color: 'var(--color-gold)' }}>→</span> Composite Aluminum Cladding
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ color: 'var(--color-gold)' }}>→</span> Thermally Broken Frames
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
