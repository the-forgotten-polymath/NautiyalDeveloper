import { motion } from 'framer-motion';

export function CTASection() {
  return (
    <div id="contact" style={{ 
      position: 'relative', 
      backgroundImage: 'linear-gradient(rgba(6,11,20,0.9), rgba(6,11,20,0.9)), url(https://nautiyaldeveloper.com/wp-content/uploads/2023/10/Untitled.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: 10, 
      padding: '120px 10vw 0', 
      pointerEvents: 'auto' 
    }}>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '120px 0', textAlign: 'center' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 300, color: 'var(--color-platinum)' }}
        >
          Ready to build your legacy?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
          style={{ fontFamily: 'var(--font-ui)', fontSize: '16px', color: 'var(--color-mist)', margin: '32px auto 48px', maxWidth: '500px', lineHeight: 1.6 }}
        >
          Contact our team to discuss your next residential or commercial project. We build in NCR, Dehradun, and across North India.
        </motion.p>
        <motion.button 
          onClick={() => window.open('https://wa.me/919536756646', '_blank')}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
          style={{ 
          background: 'var(--color-platinum)', color: 'var(--color-charcoal)', border: 'none', 
          height: '56px', padding: '0 40px', fontFamily: 'var(--font-ui)', 
          textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '12px', 
          borderRadius: '100px', cursor: 'pointer' 
        }}>
          Book Consultation via WhatsApp
        </motion.button>
      </div>
    </div>
  );
}
