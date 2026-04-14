import { motion } from 'framer-motion';
import { fadeUpVariant, staggerContainer } from '../../constants/animation';

export function MeetTheOwner() {
  return (
    <div id="philosophy" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', backgroundColor: 'var(--color-void)', pointerEvents: 'auto', padding: 'var(--section-padding-vertical) var(--section-padding)' }}>
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(40px, 8vw, 80px)', alignItems: 'center' }}>
        
        {/* Founder Image Column */}
        <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} style={{ position: 'relative' }}>
          <div style={{ width: '100%', aspectRatio: '3/4', background: 'var(--color-charcoal)', position: 'relative', overflow: 'hidden' }}>
            <img src="/nautiyal/ssss3.jpeg" alt="Er. Sanjay Nautiyal" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.1) brightness(0.9)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--color-void), transparent 50%)' }} />
          </div>
          {/* Accent decoration */}
          <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '60%', height: '60%', border: '1px solid var(--color-gold)', zIndex: -1 }} />
        </motion.div>

        {/* Content Column */}
        <motion.div variants={staggerContainer(0.15)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.div variants={fadeUpVariant} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-gold)', letterSpacing: '0.15em', marginBottom: '24px' }}>
            MEET THE FOUNDER / VISIONARY
          </motion.div>
          
          <motion.h2 variants={fadeUpVariant} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 4vw, 56px)', fontWeight: 300, color: 'var(--color-platinum)', lineHeight: 1.1, marginBottom: '16px' }}>
            Er. Sanjay Nautiyal
          </motion.h2>
          
          <motion.div variants={fadeUpVariant} style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: 'var(--color-gold-light)', fontStyle: 'italic', marginBottom: '40px' }}>
            Structural Engineer & Founder, Est. 2017
          </motion.div>

          <motion.p variants={fadeUpVariant} style={{ fontFamily: 'var(--font-ui)', fontSize: '15px', fontWeight: 300, color: 'var(--color-mist)', lineHeight: 1.8, marginBottom: '24px' }}>
            Based in the heart of Dehradun, Er. Sanjay Nautiyal established Nautiyal Developer with a singular vision: to bridge the gap between uncompromising structural integrity and breathtaking architectural design.
          </motion.p>

          <motion.p variants={fadeUpVariant} style={{ fontFamily: 'var(--font-ui)', fontSize: '15px', fontWeight: 300, color: 'var(--color-mist)', lineHeight: 1.8, marginBottom: '40px' }}>
            Specializing in elite residential construction, structural engineering, advanced building design, and real estate valuation, his expertise guarantees that every Nautiyal Developer landmark is as mathematically sound as it is visually spectacular.
          </motion.p>
          
          <motion.div variants={fadeUpVariant}>
             <button 
              onClick={() => window.open('https://wa.me/919536756646', '_blank')}
              style={{ 
                padding: '12px 32px',
                border: '1px solid var(--color-steel)',
                background: 'transparent',
                color: 'var(--color-platinum)',
                fontFamily: 'var(--font-ui)',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid var(--color-gold)';
                e.currentTarget.style.color = 'var(--color-gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid var(--color-steel)';
                e.currentTarget.style.color = 'var(--color-platinum)';
              }}
             >
                Start A Conversation
             </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
