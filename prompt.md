# MASTER PROMPT — LANDMARK Luxury Real Estate Website
## For: Cursor / Windsurf / GitHub Copilot / Claude Code / v0

---

## PASTE THIS ENTIRE PROMPT INTO YOUR AI IDE

---

You are a senior frontend engineer and creative director with 12+ years of experience building award-winning luxury brand websites. You specialize in Three.js, React Three Fiber, Framer Motion, and GSAP scroll animations. You write production-grade TypeScript, pixel-perfect CSS, and cinematic 3D experiences.

Build me a complete luxury real estate / construction company website called **LANDMARK** with the following exact specification. This is a single-scroll cinematic experience where the user watches a building being constructed as they scroll — from empty land to completed luxury landmark.

---

## TECH STACK (DO NOT DEVIATE)

```
- React 18 + TypeScript (strict mode)
- Three.js r165 + React Three Fiber (@react-three/fiber) + Drei (@react-three/drei)
- Framer Motion 11
- GSAP 3 + ScrollTrigger plugin
- @react-three/postprocessing (Bloom, Vignette)
- Vite 5 as build tool
- React Router v6
- React Hook Form + Zod (contact form)
- @fontsource/cormorant-garamond + @fontsource/dm-sans
```

**Setup command:**
```bash
npm create vite@latest landmark -- --template react-ts
cd landmark
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing framer-motion gsap @gsap/react react-router-dom react-hook-form zod @fontsource/cormorant-garamond @fontsource/dm-sans lucide-react
```

---

## DESIGN SYSTEM — IMPLEMENT EXACTLY

### CSS Custom Properties (globals.css)
```css
:root {
  --color-void: #080808;
  --color-charcoal: #141414;
  --color-gold: #C9A84C;
  --color-gold-light: #E8C97A;
  --color-platinum: #E8E4DC;
  --color-mist: #A8A49C;
  --color-steel: #2A2A2A;
  --color-glass: rgba(255, 255, 255, 0.04);
  --color-glow: rgba(201, 168, 76, 0.15);
  
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-ui: 'DM Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;
  
  --ease-luxury: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-luxury: cubic-bezier(0.7, 0, 0.84, 0);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  background: var(--color-void);
  color: var(--color-platinum);
  font-family: var(--font-ui);
  cursor: none; /* custom cursor */
  overflow-x: hidden;
}

/* Grain overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
  opacity: 0.08;
  pointer-events: none;
  z-index: 9999;
}
```

---

## COMPONENT: Custom Cursor

```tsx
// src/components/ui/Cursor.tsx
// Gold dot cursor that follows mouse with 80ms lag
// Expands to 40px ring on hoverable elements
// Implementation: useMotionValue + useSpring from Framer Motion
```

---

## COMPONENT: Navigation

```tsx
// src/components/navigation/Nav.tsx

// BEHAVIOR:
// - Initially: fully transparent, no background
// - On scroll > 80px: glass nav (backdrop-blur: 24px, border-bottom: 1px solid var(--color-steel))
// - Smooth transition with Framer Motion useScroll + useTransform

// STRUCTURE:
// [LEFT] LANDMARK — Cormorant Garamond 13px tracking-[0.3em] uppercase
// [CENTER] Nav links: Home · Projects · Philosophy · Process · Contact
//          DM Sans 11px, tracking-[0.15em], ALL CAPS, color: var(--color-mist)
//          Hover: color shifts to var(--color-platinum) with underline scale-x 0→1
// [RIGHT] "Begin Your Project" — pill button, border: 1px solid var(--color-gold)
//          hover: background fills var(--color-gold), text becomes var(--color-void)

// MOBILE: Hamburger → full screen overlay, var(--color-void) bg
//          Links stagger in: y: 40→0, opacity: 0→1, 0.1s stagger each

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};
```

---

## THREE.JS CANVAS — FULL SPECIFICATION

### SceneManager (src/components/three/SceneManager.tsx)

```tsx
// The Three.js canvas is STICKY — position: sticky, top: 0
// It spans 100vh height and sits behind scroll content
// Scroll sections are absolutely positioned over the canvas
// Total scroll height: 700vh (gives room for all phase transitions)

// PHASE SYSTEM:
interface Phase {
  start: number; // normalized scroll 0-1
  end: number;
  label: string;
}

const PHASES = {
  LAND:         { start: 0.00, end: 0.08 },
  FOUNDATION:   { start: 0.08, end: 0.22 },
  SKELETON:     { start: 0.22, end: 0.42 },
  ARCHITECTURE: { start: 0.42, end: 0.60 },
  INTERIOR:     { start: 0.60, end: 0.78 },
  REVEAL:       { start: 0.78, end: 0.92 },
};

// useScrollPhase hook maps window scroll → phase progress 0-1
```

### Phase 1: Land Scene

```tsx
// LandScene.tsx — renders from scrollProgress 0 → 0.08

// GEOMETRY: PlaneGeometry(200, 200, 128, 128)
// SHADER: Custom vertex shader for wind displacement
//   - uTime uniform
//   - Sine wave displacement on Y axis
//   - Amplitude: 0.3, Frequency: 0.1

// VERTEX SHADER (wind.vert):
const windVertex = `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.y += sin(pos.x * 0.5 + uTime) * 0.15;
    pos.y += sin(pos.z * 0.3 + uTime * 0.8) * 0.2;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// MATERIAL: MeshStandardMaterial, color: #1a1a1a, roughness: 0.9
// FOG: FogExp2(0x080808, 0.02)
// LIGHTS:
//   AmbientLight(0x1a1a2e, 0.4)
//   DirectionalLight(0xffaa44, 0.3) — low angle, x:10, y:5, z:10

// CAMERA: position(0, 18, 35), lookAt(0, 0, 0), fov: 55
// PARTICLES: 60 Points, BufferGeometry, random positions in 40x40x10 volume
//   PointsMaterial: color gold, size: 0.08, opacity: 0.2, transparent: true

// GRID LINES: LineSegments on XZ plane, color: #1a2a3a, opacity: 0.15
//   10x10 grid, spacing: 5 units
```

### Phase 2: Foundation

```tsx
// FoundationGrid.tsx — activates at scrollProgress 0.08

// ANIMATION: Grid lines draw from center outward using DrawRange
//   geometry.setDrawRange(0, Math.floor(phaseProgress * totalVertices))

// Transition from Phase 1:
//   - Camera animates: y: 18→8, z: 35→25 (using lerp in useFrame)
//   - Land plane fades opacity: 1→0
//   - Foundation slab rises from y:-0.5 → y:0 (BoxGeometry 30x0.5x30)

// FOUNDATION SLAB: 
//   MeshStandardMaterial color: #1a1a1a, roughness: 0.95
//   16 anchor points (small cylinders, radius 0.15, height 1.2)
//   Color: #2a3a4a

// DEPTH LINES: 4 thin LineSegments descending from corners
//   Animate height from 0 → -8 as phase progresses
```

### Phase 3: Skeleton

```tsx
// SkeletonStructure.tsx — activates at scrollProgress 0.22

// BUILDING DIMENSIONS: 16 units wide, 24 units deep, 28 units tall
// FLOORS: 8 floors, each 3.5 units tall
// PILLARS: 6 columns (2x3 grid), BoxGeometry(0.4, 3.5, 0.4)
// BEAMS: Horizontal members connecting pillars

// ANIMATION SEQUENCE (phaseProgress 0→1):
//   0.00-0.15: 4 corner pillars rise (scaleY: 0→1, staggered 0.04 each)
//   0.15-0.25: Cross beams appear (scaleX: 0→1)
//   0.25-0.40: Floor 1 materializes (opacity: 0→1)
//   0.40-0.55: Floors 2-3 materialize
//   0.55-0.70: Floors 4-6 materialize  
//   0.70-0.85: Floors 7-8 materialize
//   0.85-1.00: Construction crane visible (simple L-shaped geometry)

// MATERIAL: WireframeGeometry + LineSegments
//   color: #1e3a5f, opacity: 0.8
//   OR MeshStandardMaterial wireframe: true

// PARTICLE EMITTER: "Construction dust"
//   Emits from top of rising pillars
//   Particles: 200 count, rise upward, fade out
//   Color: #888888, size: 0.05
```

### Phase 4: Architecture (Glass Facade)

```tsx  
// GlassFacade.tsx — activates at scrollProgress 0.42

// TRANSITION: Wireframe material cross-fades to solid MeshStandardMaterial
//   Animate material.wireframe: true→false using opacity blend trick

// SOLID BUILDING BODY:
//   BoxGeometry(16, 28, 24)
//   MeshStandardMaterial: color #1a1a1a, roughness: 0.8, metalness: 0.1

// GLASS PANELS: 24 individual panels (4 per face × 4 faces × partial)
//   Each: PlaneGeometry(3.5, 3.2)
//   MeshPhysicalMaterial:
//     transmission: 0.92
//     roughness: 0.08
//     thickness: 0.3
//     color: 0xaaddff
//     metalness: 0.1
//     envMapIntensity: 1.5

// PANEL ANIMATION: Slide in from exterior face (translateX/Z based on face direction)
//   Stagger: 0.04s per panel, GSAP timeline

// LIGHTING SHIFT:
//   DirectionalLight color animates: #6080aa → #ffcc88
//   Intensity: 0.3 → 0.9
//   useFrame: lerp colors based on phaseProgress

// BALCONIES: Simple extruded PlaneGeometry, slight metalness
// ALUMINUM FINS: Thin BoxGeometry(0.05, 2, 1.5) repeated on south facade
```

### Phase 5: Interior (CSS Crossfade)

```tsx
// Interior.tsx — activates at scrollProgress 0.60

// Three.js canvas: opacity animates 1→0 over 0.10 scroll progress
// CSS background-image crossfades in: high-res interior photo
// use Framer Motion to orchestrate the fade

// Interior photo grid: 2x2 asymmetric
//   Position: absolute over canvas
//   Images fade in with stagger: 0.15s each
//   Hover: scale(1.03), gold border-color transition

// Keep: Ambient particle field from Three.js (semi-transparent canvas stays)
// Camera in Three.js rotates slowly during this phase (auto-orbit)
```

### Phase 6: Final Reveal

```tsx
// RevealBuilding.tsx — activates at scrollProgress 0.78

// COMPLETE BUILDING: 
//   All geometry from phases 3-4 present
//   Environment map: Use pmndrs/drei <Environment preset="sunset" />
//   Or: useEnvironment({ files: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/venice_sunset_1k.hdr' })

// CAMERA ANIMATION:
//   Pull back from z:20 → z:55 as phase progresses
//   Slight upward tilt (y: 8 → 14)
//   Auto-orbit: slow continuous rotation deltaY += 0.001

// POST PROCESSING:
//   <EffectComposer>
//     <Bloom intensity={0.4} luminanceThreshold={0.6} luminanceSmoothing={0.8} />
//     <Vignette offset={0.3} darkness={0.5} />
//   </EffectComposer>

// LENS FLARE: Sun position in sky — use @react-three/drei <Sparkles> 
//   or custom billboard sprite with additive blending

// GOLDEN BOKEH PARTICLES:
//   Replace dust particles with emissive golden particles
//   count: 80, color: #C9A84C, emissiveIntensity: 2
//   Slow drift upward, gentle sine wave motion
```

---

## REACT SECTIONS — FULL SPECIFICATION

### App.tsx Structure

```tsx
// Main layout:
// - Three.js canvas: position fixed, inset 0, z-index 0
// - Scroll container: position relative, z-index 1, pointer-events: none
//   (each text section has pointer-events: auto)
// - Total scroll height: 700vh
// - Nav: position fixed, z-index 100
// - Cursor: position fixed, z-index 9998

function App() {
  return (
    <>
      <CustomCursor />
      <Nav />
      <ThreeCanvas />  {/* sticky/fixed behind everything */}
      <main>
        <HeroText />       {/* 100vh */}
        <FoundationText /> {/* 100vh */}
        <SkeletonText />   {/* 100vh */}
        <ArchText />       {/* 100vh */}
        <InteriorSection />{/* 100vh */}
        <RevealSection />  {/* 100vh */}
        <StatsSection />   {/* auto */}
        <ProjectsSection />{/* auto */}
        <ProcessSection /> {/* auto */}
        <CTASection />     {/* auto */}
        <Footer />
      </main>
    </>
  );
}
```

### Section 01: Hero Text Component

```tsx
const heroVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.6 } }
};

const itemVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }
};

// Typography:
// Eyebrow: DM Sans 11px, tracking-[0.3em], color: mist, ALL CAPS
//   "ESTABLISHED · MEERUT · 2008"
//
// Headline Line 1: Cormorant 88px weight-300, color: platinum
//   "We Don't Build"  
// Headline Line 2: Cormorant 88px weight-300, color: platinum
//   "Structures."
// Headline Line 3: Cormorant 88px weight-300, italic, color: gold
//   "We Build Legacies."
//
// Sub: DM Sans 16px, weight-300, color: mist, line-height: 1.7, max-width: 440px
// 
// Buttons: 
//   Primary: gold bg, void text, 48px height, 32px horizontal padding
//   Secondary: transparent, 1px solid steel, platinum text, same sizing
//
// Scroll indicator: animated arrow + "Scroll to witness the build"
//   DM Sans 11px mist, letter-spacing 0.2em
//   Arrow: translateY animation loop 0 → 8px → 0, 2s ease-in-out infinite
```

### Section 07: Stats Counter

```tsx
// useStatCounter hook:
// - Observes when element enters viewport (IntersectionObserver)
// - Counts from 0 to target over 1500ms using easeOut
// - Uses requestAnimationFrame for smooth counting

const stats = [
  { value: 500, suffix: '+', label: 'Projects Delivered', sub: 'across North India' },
  { value: 15, suffix: ' Yrs', label: 'Market Experience', sub: 'established 2008' },
  { value: 98, suffix: '%', label: 'Client Trust Rate', sub: 'recommend us' },
  { value: 100, suffix: '+', label: 'Professionals', sub: 'on our team' },
];

// Layout: 4 equal columns, gold top border on each
// Number: Cormorant 72px, weight-300, color: platinum
// Suffix: Cormorant 48px, gold color
// Label: DM Sans 13px, tracking-[0.15em], ALL CAPS, mist
// Sub: DM Sans 12px, color: #666
```

### Section 08: Projects Grid

```tsx
// 3-column CSS Grid (desktop), 1-col mobile
// Alternating heights: first row [400px, 280px, 360px], second [300px, 400px, 280px]

const ProjectCard = ({ project }) => {
  return (
    <motion.article
      whileHover="hover"
      initial="rest"
    >
      <motion.div
        className="image-container"
        variants={{ hover: { scale: 1.03 }, rest: { scale: 1 } }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src={project.image} alt={project.title} />
        
        {/* Gold overlay slides up on hover */}
        <motion.div
          className="gold-overlay"
          variants={{
            rest: { y: '100%' },
            hover: { y: '0%', transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
          }}
        >
          <span>View Project →</span>
        </motion.div>
        
        {/* City tag: top-right, mono font */}
        <span className="city-tag">{project.city}</span>
      </motion.div>
      
      <div className="card-body">
        <h3>{project.title}</h3>
        <div className="meta">
          <span>{project.bedrooms} BR</span>
          <span>{project.area}m²</span>
        </div>
      </div>
    </motion.article>
  );
};
```

### Section 09: Process Steps

```tsx
const processSteps = [
  {
    number: '01',
    title: 'Vision Workshop',
    desc: 'We sit down with you — not a form, a conversation. Goals, lifestyle, constraints, dreams. We listen before we design.',
    icon: 'Eye'
  },
  {
    number: '02', 
    title: 'Architecture & Design',
    desc: 'From napkin sketch to BIM model. You approve every wall before we pour. Revisions until it\'s right.',
    icon: 'PenTool'
  },
  {
    number: '03',
    title: 'Precision Build',
    desc: 'Daily progress reports. No surprises. Every material sourced, approved, and documented.',
    icon: 'Hammer'
  },
  {
    number: '04',
    title: 'Handover + Legacy',
    desc: 'Walk-through with your architect. 5-year structural warranty. Lifetime consultation access.',
    icon: 'Key'
  }
];

// Layout: Horizontal flex on desktop, vertical on mobile
// Connecting line: thin gold line between steps, SVG drawn with stroke-dashoffset animation
// Step number: mono font, 48px, gold
// Title: Cormorant 28px, platinum
// Description: DM Sans 14px, mist, line-height: 1.8
```

### Section 10: CTA + Contact Form

```tsx
// Form using React Hook Form + Zod
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  projectType: z.enum(['residential', 'commercial', 'mixed']),
  message: z.string().min(20),
});

// Input styling: 
//   No borders on sides/top — only bottom border: 1px solid var(--color-steel)
//   On focus: border-bottom color transitions to var(--color-gold)
//   Label: floats up on focus (CSS floating label pattern)
//   Background: transparent

// Submit button: 
//   Full width, 56px height
//   Background: var(--color-gold)
//   Text: "Send My Vision →" — Cormorant 20px, var(--color-void)
//   Hover: brightness(1.1), subtle scale(1.01)
//   Loading state: spinner replaces arrow

// Background: Three.js particle field (reuse ParticleField component, reduced density)
```

---

## ADDITIONAL COMPONENTS NEEDED

### GrainOverlay.tsx
```tsx
// Fixed overlay, z-index: 9999, pointer-events: none
// SVG feTurbulence noise, opacity: 0.06-0.08
// Subtle animation: baseFrequency shifts slightly over time
```

### ScrollProgress.tsx  
```tsx
// Thin gold line at very top of viewport (position: fixed, top: 0)
// Width tracks scroll progress
// Height: 2px
// z-index: 10000
```

### Footer
```tsx
// Minimal dark footer
// Logo + tagline left | Links center | Contact right
// Copyright: DM Sans 11px, mist, tracking-[0.1em]
// Gold top border: 1px solid var(--color-steel)
```

---

## PERFORMANCE REQUIREMENTS

```typescript
// THREE.JS OPTIMIZATION:
// 1. Cap pixel ratio
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

// 2. Throttle render loop (30fps target)
let lastTime = 0;
const FPS_CAP = 30;
function animate(time: number) {
  if (time - lastTime < 1000 / FPS_CAP) {
    requestAnimationFrame(animate);
    return;
  }
  lastTime = time;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

// 3. Pause rendering when canvas not visible
const observer = new IntersectionObserver(([entry]) => {
  shouldRender = entry.isIntersecting;
});

// 4. Dispose geometry on phase exit
useEffect(() => {
  return () => {
    geometry.dispose();
    material.dispose();
  };
}, []);

// MOBILE DETECTION:
const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 768;
if (isMobile) {
  // Skip Three.js entirely
  // Show static images with CSS animations only
  // Framer Motion still works for text reveals
}

// WEBGL DETECTION:
function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}
```

---

## ANIMATION CONSTANTS

```typescript
// src/constants/animation.ts

export const EASE_LUXURY = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_LUXURY = [0.7, 0, 0.84, 0] as const;

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_LUXURY, delay }
  })
};

export const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 1.2, ease: EASE_LUXURY, delay }
  })
};

export const staggerContainer = (stagger = 0.12) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger }
  }
});

// GSAP defaults
gsap.defaults({
  ease: 'power3.out',
  duration: 1.0
});
```

---

## CONTENT DATA

```typescript
// src/constants/projects.ts

export const PROJECTS = [
  {
    id: 'aravali-heights',
    title: 'Aravali Heights',
    city: 'Meerut',
    type: 'residential',
    bedrooms: 4,
    area: 380,
    image: '/projects/aravali-heights.jpg',
    heroImage: '/projects/aravali-heights-hero.jpg',
    description: 'A vision of modern luxury nestled in the heart of Meerut.',
    year: 2023,
  },
  {
    id: 'the-ivory',
    title: 'The Ivory',
    city: 'Delhi NCR',
    type: 'residential',
    bedrooms: 5,
    area: 520,
    image: '/projects/ivory.jpg',
    year: 2023,
  },
  {
    id: 'kasturba-residences',
    title: 'Kasturba Residences',
    city: 'Agra',
    type: 'residential', 
    bedrooms: 4,
    area: 310,
    image: '/projects/kasturba.jpg',
    year: 2022,
  },
  {
    id: 'the-meridian',
    title: 'The Meridian',
    city: 'Noida',
    type: 'commercial',
    area: 2400,
    image: '/projects/meridian.jpg',
    year: 2022,
  },
  {
    id: 'green-valley',
    title: 'Green Valley Villas',
    city: 'Dehradun',
    type: 'residential',
    bedrooms: 4,
    area: 440,
    image: '/projects/green-valley.jpg',
    year: 2021,
  },
  {
    id: 'apex-tower',
    title: 'Apex Tower',
    city: 'Meerut',
    type: 'commercial',
    area: 5600,
    image: '/projects/apex-tower.jpg',
    year: 2021,
  },
];
```

---

## WHAT TO BUILD — SEQUENCED TASKS

Build in this exact order:

1. **Setup** — Vite project, install all packages, configure paths, set up globals.css with design tokens
2. **App.tsx** — Layout structure, sticky canvas + scroll container
3. **ThreeCanvas** — Basic R3F Canvas with camera, lights, fog
4. **SceneManager** — useScrollPhase hook, scroll progress tracking
5. **LandScene** — Wind shader plane, particles, grid lines
6. **Nav** — Transparent → glass transition, mobile menu
7. **HeroText** — Typography, Framer Motion stagger entrance
8. **CustomCursor** — Gold dot with spring physics
9. **FoundationGrid** — DrawRange animation, camera transition
10. **SkeletonStructure** — Pillars rise, floors stack, wireframe material
11. **GlassFacade** — Solid mesh + glass panels, lighting shift
12. **Interior** — CSS crossfade, photo grid, Framer reveals
13. **RevealBuilding** — Environment map, bloom, camera pullback
14. **StatsSection** — Counter animation, 4-column layout
15. **ProjectsGrid** — Masonry layout, hover effects
16. **ProcessSteps** — Connected line, icon + text
17. **CTASection** — Contact form, validation, submit state
18. **Footer** — Minimal, dark
19. **ScrollProgress** — Gold progress bar
20. **Performance** — Mobile detection, WebGL fallback, disposal cleanup
21. **Responsive** — Test all breakpoints
22. **Polish** — Grain overlay, vignette, final easing review

---

## IMPORTANT NOTES FOR AI IDE

- When I say "implement," write the FULL component code — no stubs, no todos
- Use TypeScript strictly — no `any` types
- Every animation must have a `prefers-reduced-motion` fallback
- Three.js geometry must be disposed in useEffect cleanup
- All images use `loading="lazy"` except hero
- Color values ONLY from CSS custom properties — never hardcoded hex in components
- Mobile breakpoint: 768px (md in standard Tailwind, but we're using plain CSS)
- No Tailwind — plain CSS Modules or styled-jsx per component
- Comments on every Three.js setup explaining WHY each parameter was chosen

Start with Task 1 and proceed sequentially. Ask me before making any architectural decisions that deviate from this spec.

---

*LANDMARK Master Build Prompt v1.0*
*Use with: Cursor, Windsurf, GitHub Copilot, Claude Code, Bolt, v0*