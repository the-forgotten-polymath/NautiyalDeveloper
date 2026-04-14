import { motion } from 'framer-motion';

export function ProcessSection() {
  const processes = [
    { num: '01', title: 'Consultation', desc: 'Understanding your vision, lifestyle requirements, and architectural aspirations.' },
    { num: '02', title: 'Design & Engineering', desc: 'Translating concepts into precision blueprints and 3D architectural models.' },
    { num: '03', title: 'Development', desc: 'Executing the build with master craftsmanship and rigorous quality control.' },
    { num: '04', title: 'Handover', desc: 'Final comprehensive inspections and delivering the keys to your new landmark.' }
  ];

  return (
    <div id="process" style={{ position: 'relative', background: 'var(--color-charcoal)', zIndex: 10, padding: '120px 10vw', pointerEvents: 'auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: 300, color: 'var(--color-platinum)' }}>
            Our Process
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '48px' }}>
            {processes.map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                style={{ borderTop: '1px solid var(--color-mist)', paddingTop: '24px' }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--color-gold)', marginBottom: '16px' }}>{p.num}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--color-platinum)', marginBottom: '16px' }}>{p.title}</h3>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: 'var(--color-mist)', lineHeight: 1.6 }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true }}
          style={{ width: '100%', overflow: 'hidden', borderRadius: '8px' }}
        >
          <img 
            src="/process_main.png" 
            alt="Authentic construction process" 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
          />
        </motion.div>
      </div>
    </div>
  );
}
