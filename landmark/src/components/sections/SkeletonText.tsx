import { motion } from 'framer-motion';
import { fadeUpVariant, staggerContainer } from '../../constants/animation';

export function SkeletonText() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 10vw', pointerEvents: 'auto' }}>
      <motion.div variants={staggerContainer(0.15)} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }}>
        <motion.div variants={fadeUpVariant} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-gold)', letterSpacing: '0.15em', marginBottom: '24px' }}>
          PHASE · 02 · STRUCTURE
        </motion.div>
        
        <motion.h2 variants={fadeUpVariant} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 300, color: 'var(--color-platinum)', lineHeight: 1.1 }}>
          Engineered to Stand<br />
          for Generations.
        </motion.h2>
        
        <motion.p variants={fadeUpVariant} style={{ fontFamily: 'var(--font-ui)', fontSize: '15px', fontWeight: 300, color: 'var(--color-mist)', lineHeight: 1.7, maxWidth: '400px', marginTop: '32px' }}>
          Steel that bends before it breaks. Concrete poured to millimeter precision. Structures that don't just meet code—they define it.
        </motion.p>
        
        <motion.div variants={fadeUpVariant} style={{ marginTop: '48px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-mist)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>[ ] ISO 9001:2015 Certified</div>
          <div>[ ] Seismic Zone V Compliant</div>
          <div>[ ] 100-Year Design Life</div>
        </motion.div>
      </motion.div>
    </div>
  );
}
