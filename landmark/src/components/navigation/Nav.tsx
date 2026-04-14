import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export function Nav() {
  const [isGlass, setIsGlass] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 80 && !isGlass) {
      setIsGlass(true);
    } else if (latest <= 80 && isGlass) {
      setIsGlass(false);
    }
  });

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants as any}
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 48px',
        zIndex: 100,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: isGlass ? 'var(--color-glass)' : 'transparent',
        backdropFilter: isGlass ? 'blur(24px)' : 'none',
        borderBottom: isGlass ? '1px solid var(--color-steel)' : '1px solid transparent',
      }}
    >
      {/* Left: Logo */}
      <div 
        style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: '13px', 
          letterSpacing: '0.3em', 
          textTransform: 'uppercase',
          fontWeight: 600
        }}>
        NAUTIYAL DEVELOPERS
      </div>

      {/* Center: Links (Desktop) */}
      <div style={{ display: 'flex', gap: '32px' }} className="desktop-nav">
        {['Home', 'Projects', 'Philosophy', 'Process', 'Contact'].map((item) => (
          <a 
            href={`#${item.toLowerCase()}`} 
            key={item}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-mist)',
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }}
          >
            {item}
          </a>
        ))}
      </div>

      {/* Right: CTA */}
      <div>
        <button 
          style={{
            padding: '12px 24px',
            border: '1px solid var(--color-gold)',
            background: 'transparent',
            color: 'var(--color-platinum)',
            fontFamily: 'var(--font-ui)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            borderRadius: '100px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-gold)';
            e.currentTarget.style.color = 'var(--color-void)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--color-platinum)';
          }}
        >
          Begin Your Project
        </button>
      </div>
    </motion.nav>
  );
}
