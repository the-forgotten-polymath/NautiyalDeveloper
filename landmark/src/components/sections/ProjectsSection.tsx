import { motion } from 'framer-motion';
import { PROJECTS } from '../../constants/projects';

export function ProjectsSection() {
  return (
    <div id="projects" style={{ position: 'relative', background: 'var(--color-void)', zIndex: 10, padding: 'var(--section-padding-vertical) var(--section-padding)', pointerEvents: 'auto' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 300, color: 'var(--color-platinum)', marginBottom: '64px', textAlign: 'center' }}>
        Selected Works
      </h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', 
        gap: '32px',
        alignItems: 'start'
      }}>
        {PROJECTS.map((project, i) => {
          const isTall = i === 4 || i === 5;
          return (
            <motion.article 
              key={project.id}
              initial="rest"
              whileInView="rest"
              viewport={{ once: true }}
              whileHover="hover"
              style={{ cursor: 'pointer' }}
            >
              <motion.div
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: (i % 3) * 0.1 }}
              >
                <div style={{ position: 'relative', overflow: 'hidden', height: isTall ? 'clamp(320px, 40vh, 460px)' : '320px', borderRadius: '2px' }}>
                  <motion.img 
                    src={project.image}
                    alt={project.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    variants={{ hover: { scale: 1.05 }, rest: { scale: 1 } }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                  
                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: 0, left: 0, right: 0,
                      color: 'var(--color-void)', background: 'var(--color-gold)',
                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                      padding: '16px', fontFamily: 'var(--font-ui)', textTransform: 'uppercase', fontSize: '12px',
                      letterSpacing: '0.15em'
                    }}
                    variants={{
                      rest: { y: '100%' },
                      hover: { y: '0%', transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
                    }}
                  >
                    View Project →
                  </motion.div>
                  
                  <span style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(8,8,8,0.6)', color: 'var(--color-platinum)', padding: '4px 8px', fontFamily: 'var(--font-mono)', fontSize: '10px', borderRadius: '2px' }}>
                    {project.city.toUpperCase()}
                  </span>
                </div>
                
                <div style={{ marginTop: '24px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 300, color: 'var(--color-platinum)' }}>
                    {project.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '16px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-mist)', marginTop: '8px' }}>
                    {project.bedrooms && <span>{project.bedrooms} BR</span>}
                    <span>{project.area}m²</span>
                  </div>
                </div>
              </motion.div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
