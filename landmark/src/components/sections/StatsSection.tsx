import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function StatCounter({ value, suffix, label, sub }: { value: number; suffix: string; label: string; sub: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const duration = 1500;
      const startTime = performance.now();
      
      const animateCount = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOut * value));
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      
      requestAnimationFrame(animateCount);
    }
  }, [isInView, value]);

  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ borderTop: '1px solid var(--color-gold)', paddingTop: '24px' }}
    >
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '56px', fontWeight: 300, color: 'var(--color-platinum)' }}>
        {count}
        <span style={{ fontSize: '32px', color: 'var(--color-gold)' }}>{suffix}</span>
      </div>
      <div style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-mist)', marginTop: '8px' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-ui)', fontSize: '12px', color: '#666', marginTop: '4px' }}>
        {sub}
      </div>
    </motion.div>
  );
}

export function StatsSection() {
  return (
    <div style={{ position: 'relative', background: 'var(--color-void)', zIndex: 10, padding: '120px 10vw', pointerEvents: 'auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', maxWidth: '1200px', margin: '0 auto' }}>
        <StatCounter value={140} suffix="+" label="PROJECTS FINISHED" sub="Across the region" />
        <StatCounter value={182} suffix="+" label="HAPPY CLIENTS" sub="Satisfied Homeowners" />
        <StatCounter value={43} suffix="+" label="PROFESSIONALS" sub="Expert Colleagues" />
        <StatCounter value={5} suffix="+" label="YEARS EXCELLENCE" sub="Industry Experience" />
      </div>
    </div>
  );
}
