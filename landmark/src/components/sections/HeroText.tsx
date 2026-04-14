import { motion } from 'framer-motion';
import { fadeUpVariant, staggerContainer } from '../../constants/animation';

export function HeroText() {
  return (
    <div style={{ position: 'relative', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 var(--section-padding)', pointerEvents: 'auto' }}>
      <motion.div variants={staggerContainer(0.15)} initial="hidden" animate="visible">
        <motion.div variants={fadeUpVariant} style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(9px, 2vw, 11px)', letterSpacing: '0.3em', color: 'var(--color-mist)', textTransform: 'uppercase', marginBottom: '24px' }}>
          ESTABLISHED · DEHRADUN · 2017
        </motion.div>
        
        <motion.h1 variants={fadeUpVariant} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 8vw, 88px)', fontWeight: 300, color: 'var(--color-platinum)', lineHeight: 1.1 }}>
          NAUTIYAL<br />
          DEVELOPER<br />
          <span style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>Building Legacies.</span>
        </motion.h1>
        
        <motion.p variants={fadeUpVariant} style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(14px, 1.5vw, 16px)', fontWeight: 300, color: 'var(--color-mist)', lineHeight: 1.7, maxWidth: '440px', marginTop: '32px' }}>
          From structural integrity to breathtaking aesthetics — we engineer landmarks that outlast generations in the heart of Dehradun.
        </motion.p>
        
        <motion.div variants={fadeUpVariant} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '48px' }}>
          <button 
            onClick={() => window.open('https://wa.me/919536756646', '_blank')}
            style={{ background: 'var(--color-gold)', color: 'var(--color-void)', border: 'none', minHeight: '48px', padding: '0 32px', fontFamily: 'var(--font-ui)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '11px', borderRadius: '100px', cursor: 'pointer' }}
          >
            Begin Your Project
          </button>
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ background: 'transparent', color: 'var(--color-platinum)', border: '1px solid var(--color-steel)', minHeight: '48px', padding: '0 32px', fontFamily: 'var(--font-ui)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '11px', borderRadius: '100px', cursor: 'pointer' }}
          >
            Explore Our Work
          </button>
        </motion.div>
        
        <motion.div variants={fadeUpVariant} style={{ position: 'absolute', bottom: '40px', left: 'var(--section-padding)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            ↓
          </motion.div>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', color: 'var(--color-mist)', letterSpacing: '0.2em' }}>Scroll to witness the build</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
