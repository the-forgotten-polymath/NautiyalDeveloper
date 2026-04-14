
export function Footer() {
  return (
    <footer style={{ position: 'relative', background: 'var(--color-void)', zIndex: 10, padding: '80px 10vw', pointerEvents: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '64px' }}>
        <div style={{ flex: '1 1 300px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--color-platinum)', marginBottom: '16px', letterSpacing: '0.1em' }}>
            NAUTIYAL DEVELOPER
          </div>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: 'var(--color-mist)', lineHeight: 1.6, maxWidth: '300px' }}>
            Engineering legacies with structural precision and architectural brilliance since 2017.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '64px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-gold)', letterSpacing: '0.2em', marginBottom: '24px', textTransform: 'uppercase' }}>CONTACT</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'var(--font-ui)', fontSize: '14px', color: 'var(--color-mist)' }}>
              <a href="tel:+919536756646" style={{ color: 'inherit', textDecoration: 'none' }}>+91 95367 56646</a>
              <a href="mailto:nautiyaldevelopers@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>nautiyaldevelopers@gmail.com</a>
              <span>Dehradun, Uttarakhand, India</span>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-gold)', letterSpacing: '0.2em', marginBottom: '24px', textTransform: 'uppercase' }}>EXPLORE</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'var(--font-ui)', fontSize: '14px', color: 'var(--color-mist)' }}>
              <a href="#projects" style={{ color: 'inherit', textDecoration: 'none' }}>Realized Visions</a>
              <a href="#philosophy" style={{ color: 'inherit', textDecoration: 'none' }}>Philosophy</a>
              <a href="#process" style={{ color: 'inherit', textDecoration: 'none' }}>Process</a>
              <a href="https://wa.me/919536756646" style={{ color: 'inherit', textDecoration: 'none' }}>WhatsApp Consultation</a>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '80px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', fontFamily: 'var(--font-ui)', fontSize: '12px', color: '#666' }}>
        <div>&copy; {new Date().getFullYear()} Nautiyal Developer. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
