import { motion } from 'framer-motion';
import { fadeUpVariant, staggerContainer } from '../../constants/animation';

export function FoundationText() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 var(--section-padding)', pointerEvents: 'auto' }}>
      <motion.div variants={staggerContainer(0.15)} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }}>
        <motion.div variants={fadeUpVariant} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-gold)', letterSpacing: '0.15em', marginBottom: '24px' }}>
          PHASE · 01 · FOUNDATION
        </motion.div>
        
        <motion.h2 variants={fadeUpVariant} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 300, color: 'var(--color-platinum)', lineHeight: 1.1 }}>
          Every Masterpiece<br />
          Begins Beneath<br />
          the Surface.
        </motion.h2>
        
        <motion.p variants={fadeUpVariant} style={{ fontFamily: 'var(--font-ui)', fontSize: '15px', fontWeight: 300, color: 'var(--color-mist)', lineHeight: 1.7, maxWidth: '400px', marginTop: '32px' }}>
          We start where others won't look. Soil analysis. Load calculations. Precision engineering from the first centimeter down.
        </motion.p>
        
        <motion.div variants={fadeUpVariant} style={{ marginTop: '48px', borderLeft: '1px solid var(--color-gold)', paddingLeft: '16px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '32px', color: 'var(--color-gold)' }}>100%</div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: '12px', color: 'var(--color-mist)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Structural integrity guaranteed</div>
        </motion.div>
      </motion.div>
    </div>
  );
}
