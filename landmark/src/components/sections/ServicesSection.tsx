import { motion } from 'framer-motion';
import { fadeUpVariant } from '../../constants/animation';

export function ServicesSection() {
  const services = [
    { 
      title: 'Architectural Design', 
      image: '/service_arch.png', 
      desc: 'Conceptualizing spaces that blend aesthetics with high-end functionality.' 
    },
    { 
      title: 'Structural Engineering', 
      image: '/service_struct.png', 
      desc: 'Mathematical precision ensuring integrity across every pillar and slab.' 
    },
    { 
      title: 'Construction Management', 
      image: '/service_const.png', 
      desc: 'Master craftsmanship executed with rigorous quality control standards.' 
    },
    { 
      title: 'Real Estate Valuation', 
      image: '/service_valuation.png', 
      desc: 'Expert market analysis and technical valuation for elite properties.' 
    }
  ];

  return (
    <div id="services" style={{ position: 'relative', background: 'var(--color-void)', zIndex: 10, padding: '120px 10vw', pointerEvents: 'auto' }}>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{
        visible: { transition: { staggerChildren: 0.1 } }
      }}>
        <motion.div variants={fadeUpVariant} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-gold)', letterSpacing: '0.15em', marginBottom: '24px', textAlign: 'center' }}>
          OUR EXPERTISE
        </motion.div>
        
        <motion.h2 variants={fadeUpVariant} style={{ fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: 300, color: 'var(--color-platinum)', marginBottom: '80px', textAlign: 'center' }}>
          Bespoke Solutions for<br />Modern Landmarks
        </motion.h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '32px' 
        }}>
          {services.map((service, i) => (
            <motion.div 
              key={i}
              variants={fadeUpVariant}
              whileHover={{ y: -10 }}
              style={{ 
                background: 'var(--color-charcoal)',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <img src={service.image} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--color-charcoal), transparent)' }} />
              </div>
              
              <div style={{ padding: '32px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--color-platinum)', marginBottom: '16px' }}>
                  {service.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: 'var(--color-mist)', lineHeight: 1.6 }}>
                  {service.desc}
                </p>
                <div style={{ marginTop: '24px', width: '32px', height: '1px', background: 'var(--color-gold)' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
