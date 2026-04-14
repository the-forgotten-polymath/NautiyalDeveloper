import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeUpVariant, staggerContainer } from '../../constants/animation';

export function RevealSection({ targetRef }: { targetRef?: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Parallax and scale effects for the result image
  const imageY = useTransform(scrollYProgress, [0.8, 1], ['0%', '-10%']);
  const imageScale = useTransform(scrollYProgress, [0.8, 1], [1.2, 1]);
  const containerOpacity = useTransform(scrollYProgress, [0.78, 0.82], [0, 1]);

  return (
    <motion.div 
      style={{ 
        position: 'relative', 
        height: '100vh', 
        width: '100vw',
        overflow: 'hidden',
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        textAlign: 'center', 
        pointerEvents: 'auto',
        opacity: containerOpacity
      }}
    >
      {/* Parallax Background Image */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-20%', // Allow space for parallax
          backgroundImage: 'url(/result.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: imageY,
          scale: imageScale,
          zIndex: -1,
        }}
      />
      
      {/* Dark Overlay for Contrast */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(6,11,20,0.3) 0%, rgba(6,11,20,0.8) 100%)', zIndex: 0 }} />

      <motion.div 
        variants={staggerContainer(0.15)} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: false, amount: 0.5 }}
        style={{ position: 'relative', zIndex: 1, padding: '0 5vw' }}
      >
        <motion.div variants={fadeUpVariant} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-gold)', letterSpacing: '0.15em', marginBottom: '24px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
          THE RESULT
        </motion.div>
        
        <motion.h2 variants={fadeUpVariant} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(60px, 8vw, 120px)', fontWeight: 300, color: 'var(--color-platinum)', lineHeight: 1.0, textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}>
          From Vision<br />
          to Reality.
        </motion.h2>
        
        <motion.div variants={fadeUpVariant} style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(24px, 3vw, 40px)', color: 'var(--color-gold)', marginTop: '24px', textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}>
          Engineering Landmarks. Delivering Legacies.
        </motion.div>
        
        <motion.div variants={fadeUpVariant} style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '48px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => window.open('https://wa.me/919536756646', '_blank')}
            style={{ background: 'var(--color-gold)', color: 'var(--color-void)', border: 'none', minHeight: '56px', padding: '0 40px', fontFamily: 'var(--font-ui)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '12px', borderRadius: '100px', cursor: 'pointer' }}
          >
            Start Your Project →
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}


