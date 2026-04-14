# LANDMARK — Luxury Real Estate Website
## Product Requirements Document (PRD) v1.0

**Document Type:** Engineering + Design PRD  
**Stack:** React + Three.js + Framer Motion + GSAP ScrollTrigger  
**Status:** Ready for Development  
**Author:** Senior FE Architect  
**Date:** April 2026

---

## 1. EXECUTIVE SUMMARY

**LANDMARK** is a cinematic, scroll-driven luxury real estate website that simulates the full construction lifecycle — from empty land to completed landmark building. The experience replaces static portfolio pages with an emotionally charged narrative journey that positions the construction firm as a premium, visionary brand.

**Core Insight:** Clients don't buy buildings — they buy transformation. This website makes them feel that transformation before any conversation begins.

**Target Audience:** HNI (High Net Worth Individuals), luxury residential developers, urban real estate investors, C-suite executives seeking landmark commercial spaces.

**Business Goal:** Reduce sales cycle by creating instant emotional trust and perceived premium authority.

---

## 2. PRODUCT VISION

> "From barren land to timeless landmark — experienced in a single scroll."

The user doesn't browse a website. They witness a construction. Every pixel moves with intention. Every frame advances the story. By the time they reach the CTA, they've already lived inside the building.

---

## 3. DESIGN SYSTEM

### 3.1 Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-void` | `#080808` | Base background — near-black |
| `--color-charcoal` | `#141414` | Section backgrounds |
| `--color-gold` | `#C9A84C` | Primary accent, CTAs, highlights |
| `--color-gold-light` | `#E8C97A` | Hover states, glow effects |
| `--color-platinum` | `#E8E4DC` | Primary body text |
| `--color-mist` | `#A8A49C` | Secondary text, labels |
| `--color-steel` | `#2A2A2A` | Card borders, dividers |
| `--color-glass` | `rgba(255,255,255,0.04)` | Glassmorphism surfaces |
| `--color-glow` | `rgba(201,168,76,0.15)` | Gold ambient glow |

### 3.2 Typography

```css
/* Display — Luxury Serif */
--font-display: 'Cormorant Garamond', Georgia, serif;
/* Weights: 300 (Light), 400 (Regular), 600 (SemiBold) */
/* Used for: Hero titles, section headers, pull quotes */

/* UI — Refined Sans */
--font-ui: 'DM Sans', system-ui, sans-serif;
/* Weights: 300, 400, 500 */
/* Used for: Navigation, labels, body copy, stats */

/* Mono — Precision */
--font-mono: 'JetBrains Mono', monospace;
/* Weights: 400 */
/* Used for: Coordinates, counters, technical specs */
```

### 3.3 Motion Principles

- **Gravity Rule:** Elements fall into place — never fly in laterally
- **Breath Rule:** All idle animations breathe (scale: 1.000 → 1.003 → 1.000 over 4s)
- **30fps Cap:** Three.js render capped at 30fps for cinematic, not game-like, feel
- **Easing Standard:** `cubic-bezier(0.16, 1, 0.3, 1)` — expo ease-out throughout
- **No Bounce:** Zero spring physics — gravity is serious, not playful

### 3.4 Texture & Atmosphere

- Grain overlay: 8% opacity SVG noise texture fixed on body
- Vignette: radial gradient edges on each section
- Ambient particles: Three.js floating dust motes (count: 60, opacity: 0.15)

---

## 4. SITE ARCHITECTURE

### 4.1 Page Sections (Scroll Order)

```
[NAV]
  ↓
[01] HERO — Empty Land  
[02] FOUNDATION — Underground grid appears  
[03] SKELETON — Structure rises  
[04] ARCHITECTURE — Skin & glass applied  
[05] INTERIOR — Lifestyle reveal  
[06] FINAL REVEAL — Completed landmark  
[07] STATS — Trust metrics  
[08] PROJECTS — Portfolio grid  
[09] PROCESS — 4-step methodology  
[10] CTA — Contact / Start Project  
[FOOTER]
```

### 4.2 URL Structure

```
/ — Main experience (single scroll page)
/projects — Full portfolio (linked from Section 08)
/project/:slug — Individual project page
/contact — Standalone contact form
```

---

## 5. COMPONENT SPECIFICATIONS

### 5.1 Navigation

**Behavior:**
- Initially: transparent, logo + nav links only
- On scroll > 80px: backdrop-blur glass nav with gold border-bottom appears
- Mobile: Hamburger → full-screen overlay with staggered link reveal

**Elements:**
- Logo: "LANDMARK" — Cormorant Garamond, letter-spacing 0.3em, 14px
- Links: DM Sans 400, 12px, ALL CAPS, letter-spacing 0.15em
- CTA pill: "Begin Your Project" — gold border, transparent bg, hover fills gold
- Nav items: Home, Projects, Philosophy, Process, Contact

---

### 5.2 SECTION 01 — Hero (Land)

**Visual Concept:** Aerial fog-covered plot of land at dawn. Camera is slightly tilted downward. The landscape has subtle wind — grass/fog shifts.

**Three.js Scene:**
```javascript
// Scene: LAND_SCENE
Components:
  - PlaneGeometry(200, 200, 64, 64) with custom vertex shader (wind displacement)
  - FogExp2(0x0a0a0a, 0.015)
  - AmbientLight(0x1a1a2e, 0.3)
  - DirectionalLight(0xffd4a0, 0.6) — low angle sunrise simulation
  - 60 particle dust motes (BufferGeometry Points)
  - Subtle grid lines on ground (LineSegments, opacity 0.1)

Camera: PerspectiveCamera(60°, fov), positioned Y:15, Z:30, looking at origin
Animation: Slow auto-orbit, deltaAngle 0.0002/frame
```

**Copy:**
```
[eyebrow — DM Sans 11px tracking-widest mist color]
ESTABLISHED · MEERUT · 2008

[headline — Cormorant 88px light platinum]
We Don't Build
Structures.

[accent line — Cormorant 88px italic gold]
We Build Legacies.

[subtext — DM Sans 16px mist, max-width 440px]
From the first stake in the ground to the final key — 
we engineer landmarks that outlast generations.

[CTAs]
[gold filled btn] "Begin Your Project"
[ghost btn]       "Explore Our Work"

[scroll indicator — animated line + text]
↓ Scroll to witness the build
```

**Framer Motion:**
- Hero text: staggerChildren 0.15s, each child `y: 40 → 0, opacity: 0→1`
- Entry delay after Three.js canvas loads: 600ms
- Scroll indicator: looping translateY -8px → 8px, 2s ease-in-out

---

### 5.3 SECTION 02 — Foundation

**Trigger:** ScrollProgress 0.05 → 0.20

**Three.js Transition — Land → Foundation:**
```javascript
// GSAP Timeline triggered at scrollProgress 0.05
tl.to(camera.position, { y: 5, z: 20, duration: 1.5, ease: "power2.inOut" })
  .to(groundMaterial.uniforms.opacity, { value: 0, duration: 0.8 })
  .add(() => buildFoundationGrid())  // Draws grid lines from center outward
```

**Foundation Grid Animation:**
- Orthographic top-down view
- Blueprint-style grid lines draw from center → edges (DrawRange animation)
- Color: `#1a2a3a` with gold accent nodes at intersections
- Depth markers appear as thin vertical lines at corners

**Copy (overlaid on animation):**
```
[section label — mono 11px gold]
PHASE · 01 · FOUNDATION

[headline — Cormorant 64px platinum]
Every Masterpiece
Begins Beneath
the Surface.

[body — DM Sans 15px mist]
We start where others won't look.
Soil analysis. Load calculations. 
Precision engineering from 
the first centimeter down.

[stat callout]
[gold number — mono] 100%
[label] Structural integrity guaranteed
```

---

### 5.4 SECTION 03 — Skeleton Rise

**Trigger:** ScrollProgress 0.20 → 0.40

**Three.js Animation — Structure Growth:**
```javascript
// BoxGeometry pillars animate scaleY from 0 → 1 based on scrollProgress
// Triggered sequentially with stagger (pillar1 → pillar2 → beams → floors)

const floors = [];
for (let i = 0; i < 8; i++) {
  const floor = createFloor(i);
  floor.scale.y = 0; // Start invisible
  floors.push(floor);
}

// useEffect: map scrollProgress 0.2→0.4 to floor reveal
// Each floor appears when progress crosses its threshold
```

**Scroll Mapping:**
```
scrollProgress 0.20 → Ground pillars rise (4 corners)
scrollProgress 0.25 → Cross beams appear (horizontal)
scrollProgress 0.30 → Floor 1 materializes
scrollProgress 0.33 → Floor 2 materializes
... (each 0.02 progress = 1 new floor)
scrollProgress 0.40 → All 8 floors visible, wireframe style
```

**Visual Style:** 
- Wireframe rendering mode: `THREE.WireframeGeometry` + `LineSegments`
- Color: steel blue `#1e3a5f` — blueprint aesthetic
- Subtle construction dust particles emit from rising columns

**Copy:**
```
[section label]
PHASE · 02 · STRUCTURE

[headline — Cormorant 64px]
Engineered to Stand
for Generations.

[body]
Steel that bends before it breaks.
Concrete poured to millimeter precision.
Structures that don't just meet code—
they define it.

[specs list — mono font]
[ ] ISO 9001:2015 Certified
[ ] Seismic Zone V Compliant  
[ ] 100-Year Design Life
```

---

### 5.5 SECTION 04 — Architecture & Skin

**Trigger:** ScrollProgress 0.40 → 0.60

**Three.js Transition:**
```javascript
// Wireframe → Solid transition
// Glass panels slide in (translateX from outside viewport edges)
// MeshPhysicalMaterial with transmission for glass effect

const glassMaterial = new THREE.MeshPhysicalMaterial({
  transmission: 0.95,
  roughness: 0.05,
  thickness: 0.5,
  envMapIntensity: 1.0,
  color: 0xaaccff
});

// Panels appear panel by panel, like curtain wall installation
// GSAP stagger: each panel 0.08s apart
```

**Lighting Evolution:**
- Section 01-03: Cold, foggy dawn (blue ambient)
- Section 04: Golden hour begins — `DirectionalLight` color shifts from `#6080aa` → `#ffcc88`
- Reflections activate on glass panels

**Copy:**
```
[section label]
PHASE · 03 · ARCHITECTURE

[headline — Cormorant 64px]
Where Architecture
Meets Emotion.

[body]
Form follows feeling here.
Glass that captures sky.
Stone that holds memory.
Spaces designed to make 
inhabitants feel extraordinary.

[material callouts — floating tags]
→ Low-E Glass Curtain Wall
→ Composite Aluminum Cladding
→ Thermally Broken Frames
```

---

### 5.6 SECTION 05 — Interior Reveal

**Trigger:** ScrollProgress 0.60 → 0.78

**Technique:** Cross-fade from exterior Three.js view → interior photography
- Three.js exterior fades opacity 1 → 0
- High-resolution interior image fades in (CSS background-attachment: fixed)
- Furniture items animate in with staggered Framer Motion reveals

**Interior Elements (Framer Motion):**
```jsx
// Each piece fades + slides up with delay
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
>
```

**Lifestyle Photography Grid:**
- 2x2 asymmetric grid
- Hover: scale 1.03, subtle gold border appears
- Caption: location + sq.ft. in mono font

**Copy:**
```
[section label]
PHASE · 04 · INTERIOR

[headline — Cormorant 64px]
Not Just Spaces.
Experiences Crafted
for Life.

[body]
Interiors that breathe with you.
Light that moves through the day.
Materials that age into beauty.
A home that earns its keep in memory.
```

---

### 5.7 SECTION 06 — Final Reveal

**Trigger:** ScrollProgress 0.78 → 0.90

**The Cinematic Moment:**
```javascript
// Camera pulls back from close → wide establishing shot
// Full completed building revealed in golden hour light
// Particle system shifts: dust → golden bokeh effect (emissive particles)
// Environment map loaded: HDR sunset sky

const pmremGenerator = new THREE.PMREMGenerator(renderer);
const envTexture = pmremGenerator.fromScene(new RGBELoader().load('sunset.hdr'));
scene.environment = envTexture.texture;

// Bloom post-processing activates:
const bloomPass = new UnrealBloomPass(resolution, 0.4, 0.4, 0.85);
composer.addPass(bloomPass);
```

**Copy — Maximum Impact:**
```
[small label — mono]
THE RESULT

[MASSIVE headline — Cormorant 96px+ light]
From Vision
to Reality.

[italic sub — Cormorant 48px italic gold]
We deliver more than buildings.
We deliver landmarks.

[description — DM Sans]
Every project we undertake becomes 
part of a city's identity.
A reference point. A benchmark.
An address people are proud to call home.

[primary CTA — large, gold filled]
"Start Your Project →"

[secondary]
"View All Projects"
```

---

### 5.8 SECTION 07 — Stats (Trust Metrics)

**Layout:** 4-column grid, large numbers with counter animation

**Stats:**
```
500+          15 Years       98%           100+
Projects      Experience     Client Trust  Professionals
Delivered     in Market      Rate          on Team
```

**Animation:**
- Counter: useRef + requestAnimationFrame, counts up over 1.5s when in view
- Each column: staggered fade-in from bottom, 0.15s apart
- Gold horizontal rule separates each stat block
- Background: very subtle grid texture (opacity 3%)

---

### 5.9 SECTION 08 — Projects Grid

**Layout:** 3-column masonry-style grid (col 1 tall, col 2 short, col 3 medium — alternating)

**Project Card:**
```jsx
<ProjectCard>
  <ImageContainer>  // overflow hidden
    <img />         // scale 1 → 1.05 on hover (300ms ease)
    <GoldOverlay /> // slides up from bottom on hover
    <CityTag />     // mono font, top-right
  </ImageContainer>
  <CardBody>
    <ProjectTitle /> // Cormorant 22px
    <MetaRow>        // bedrooms, area — mono 12px
    <ViewBtn />      // "View Project →" gold text
  </CardBody>
</ProjectCard>
```

**Featured Projects:**
1. Aravali Heights — Meerut — 4 BR — 380m²
2. The Ivory — Delhi NCR — 5 BR — 520m²
3. Kasturba Residences — Agra — 4 BR — 310m²
4. The Meridian — Noida — Commercial — 2400m²
5. Green Valley Villas — Dehradun — 4 BR — 440m²
6. Apex Tower — Meerut — Commercial — 5600m²

---

### 5.10 SECTION 09 — Process

**Layout:** Horizontal scroll on desktop, vertical on mobile

**4 Steps:**
```
[01] VISION WORKSHOP
We sit down with you — not a form, a conversation.
Goals, lifestyle, constraints, dreams.

[02] ARCHITECTURE & DESIGN  
From napkin sketch to BIM model.
You approve every wall before we pour.

[03] PRECISION BUILD
Daily progress reports. No surprises.
Every material sourced and approved.

[04] HANDOVER + LEGACY CARE
Walk-through with your architect.
5-year structural warranty.
Lifetime consultation access.
```

**Animation:** Each step reveals on scroll with a connecting animated line between them

---

### 5.11 SECTION 10 — CTA

**Visual:** Full-bleed dark section, subtle Three.js particle field in background

**Copy:**
```
[eyebrow]
READY TO BUILD YOUR LANDMARK?

[headline — Cormorant 72px]
Let's Begin
From the Ground Up.

[subtext]
Every landmark started with a single conversation.
We're ready when you are.

[Form fields — minimal, borderless]
Name _______________
Email _______________
Phone _______________
Project Type: [Residential] [Commercial] [Mixed Use]
Message _______________

[Submit — large gold button]
"Send My Vision →"

[Trust items below]
No obligations  ·  Response within 24hrs  ·  100% Confidential
```

---

## 6. TECHNICAL ARCHITECTURE

### 6.1 Tech Stack

```
Frontend Framework:    React 18 + TypeScript
3D Engine:             Three.js r165 + React Three Fiber (R3F) + Drei
Animation Library:     Framer Motion 11
Scroll Engine:         GSAP 3 + ScrollTrigger plugin
Post Processing:       @react-three/postprocessing
Environment Maps:      @pmndrs/drei (useEnvironment)
Font Loading:          @fontsource (Cormorant Garamond + DM Sans)
Build Tool:            Vite 5
Routing:               React Router v6
Form Handling:         React Hook Form + Zod validation
Deployment:            Vercel / Netlify
```

### 6.2 Three.js Scene Manager

```typescript
// SceneManager.ts — central controller
interface ScenePhase {
  id: 'land' | 'foundation' | 'skeleton' | 'architecture' | 'interior' | 'reveal';
  scrollStart: number;  // 0-1 normalized scroll progress
  scrollEnd: number;
  onEnter: () => void;
  onProgress: (progress: number) => void;  // 0-1 within this phase
  onExit: () => void;
}

// Hook: useScrollPhase
const { currentPhase, phaseProgress } = useScrollPhase(phases);
```

### 6.3 Scroll Architecture

```typescript
// useScroll from Framer Motion for React components
const { scrollYProgress } = useScroll();

// GSAP ScrollTrigger for Three.js scene transitions
ScrollTrigger.create({
  trigger: "#canvas-container",
  start: "top top",
  end: "bottom bottom",
  scrub: 1,  // smooth scrubbing
  onUpdate: (self) => {
    sceneManager.update(self.progress);
  }
});
```

### 6.4 Performance Strategy

| Strategy | Implementation |
|---|---|
| Canvas resolution | `Math.min(window.devicePixelRatio, 1.5)` |
| Geometry LOD | Switch to low-poly beyond camera distance 50 |
| Texture compression | KTX2 / Basis compressed textures |
| Lazy sections | IntersectionObserver, mount Three.js only when near viewport |
| Image optimization | next/image or vite-imagemin + WebP |
| Bundle size | Dynamic imports for Three.js addons |
| Target FPS | 30fps enforced via `clock.getDelta()` throttle |
| Mobile fallback | CSS animation fallback if WebGL unavailable |

### 6.5 Responsive Strategy

```
Desktop (1440px+): Full Three.js experience, all animations
Laptop (1024-1439px): Full experience, reduced particle count (40 → 20)
Tablet (768-1023px): Simplified Three.js, key animations retained
Mobile (< 768px): CSS-only animations, static 3D images, no canvas
```

---

## 7. FILE STRUCTURE

```
src/
├── components/
│   ├── navigation/
│   │   ├── Nav.tsx
│   │   └── MobileMenu.tsx
│   ├── sections/
│   │   ├── Hero.tsx          # Section 01
│   │   ├── Foundation.tsx    # Section 02
│   │   ├── Skeleton.tsx      # Section 03
│   │   ├── Architecture.tsx  # Section 04
│   │   ├── Interior.tsx      # Section 05
│   │   ├── FinalReveal.tsx   # Section 06
│   │   ├── Stats.tsx         # Section 07
│   │   ├── Projects.tsx      # Section 08
│   │   ├── Process.tsx       # Section 09
│   │   └── CTA.tsx           # Section 10
│   ├── three/
│   │   ├── LandScene.tsx
│   │   ├── FoundationGrid.tsx
│   │   ├── SkeletonStructure.tsx
│   │   ├── GlassFacade.tsx
│   │   ├── RevealBuilding.tsx
│   │   ├── ParticleField.tsx
│   │   └── SceneManager.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── StatCounter.tsx
│   │   ├── ProcessStep.tsx
│   │   └── ContactForm.tsx
│   └── layout/
│       ├── GrainOverlay.tsx
│       └── Cursor.tsx        # Custom gold cursor
├── hooks/
│   ├── useScrollPhase.ts
│   ├── useStatCounter.ts
│   ├── useWebGL.ts           # WebGL detection/fallback
│   └── useReducedMotion.ts   # Accessibility
├── shaders/
│   ├── wind.vert
│   ├── wind.frag
│   └── grain.frag
├── constants/
│   ├── colors.ts
│   ├── phases.ts
│   └── projects.ts
├── styles/
│   ├── globals.css
│   ├── tokens.css
│   └── animations.css
└── App.tsx
```

---

## 8. ANIMATION TIMELINE (DETAILED)

```
SCROLL PROGRESS 0.00 → 0.05
  Three.js: Land scene renders, fog, wind
  Framer: Hero text stagger reveal
  
SCROLL PROGRESS 0.05 → 0.20  
  Three.js: Camera tilts down, foundation grid draws in
  Copy: Foundation section fades in at 0.10
  
SCROLL PROGRESS 0.20 → 0.40
  Three.js: Pillars rise (staggered), beams connect, floors stack
  Lighting: Subtle warm shift begins
  Copy: Skeleton section at 0.25
  
SCROLL PROGRESS 0.40 → 0.60
  Three.js: Wireframe dissolves → solid mesh, glass panels slide in
  Lighting: Golden hour intensifies
  Post-FX: Subtle bloom activates
  Copy: Architecture section at 0.45
  
SCROLL PROGRESS 0.60 → 0.78
  Three.js: Exterior fades, interior crossfade
  Framer: Interior image grid reveals, furniture stagger
  Copy: Interior section at 0.65
  
SCROLL PROGRESS 0.78 → 0.90
  Three.js: Full reveal, camera pull-back, HDR env loads
  Post-FX: Bloom peaks, lens flare on sun
  Copy: Final reveal — maximum impact CTA
  
SCROLL PROGRESS 0.90 → 1.00
  Three.js canvas fades out
  Stats, Projects, Process, CTA — CSS/Framer only
```

---

## 9. ACCESSIBILITY & SEO

### Accessibility
- `prefers-reduced-motion`: All Three.js and Framer animations disabled, static images shown
- `prefers-color-scheme`: Dark only (product decision)
- ARIA labels on all interactive canvas elements
- Tab focus management for custom cursor usage
- Alt text on all images, including interior photography

### SEO
```html
<title>LANDMARK — Luxury Construction & Architecture | Meerut, UP</title>
<meta name="description" content="Premium residential and commercial construction. 500+ projects, 15 years of excellence. Building landmarks across North India." />
<meta property="og:image" content="/og-landmark.jpg" />
<!-- Structured Data: LocalBusiness + ConstructionCompany schema -->
```

### Performance Targets
- LCP < 2.5s (hero image preloaded)
- CLS < 0.1 (canvas dimensions reserved)
- FID < 100ms
- Three.js canvas: only renders when in viewport

---

## 10. CONTENT REQUIREMENTS

### Photography Needed (Client to Provide)
- 6 completed project exteriors (hero shots, golden hour)
- 3-4 interior lifestyle photos per project
- Team photograph (optional, for About section)
- Aerial/drone shots of projects (ideal)

### Placeholder Sources for Development
- Exterior: Unsplash — search "luxury modern villa exterior"  
- Interior: Unsplash — search "luxury interior living room"
- Land/aerial: Unsplash — search "land aerial construction site"

### Icons
- Lucide React for UI icons
- Custom SVG for construction phase icons

---

## 11. DELIVERY MILESTONES

| Milestone | Deliverable | ETA |
|---|---|---|
| M1 | Design tokens + Nav + Hero (Three.js land scene) | Week 1 |
| M2 | Sections 02–04 (foundation → architecture) | Week 2 |
| M3 | Sections 05–06 (interior + final reveal) | Week 3 |
| M4 | Sections 07–10 (stats, projects, process, CTA) | Week 4 |
| M5 | Mobile optimization + performance audit | Week 5 |
| M6 | QA, accessibility audit, SEO, deployment | Week 6 |

---

## 12. DEFINITION OF DONE

- [ ] Three.js scene transitions smoothly across all 6 phases  
- [ ] 30fps sustained on MacBook Pro M2  
- [ ] 60fps on desktop (GPU-accelerated)  
- [ ] Mobile fallback renders correctly on iPhone 14+  
- [ ] All Framer Motion animations respect `prefers-reduced-motion`  
- [ ] Lighthouse Performance score ≥ 85  
- [ ] No layout shift on page load  
- [ ] Contact form submits successfully  
- [ ] All project cards link to individual project pages  
- [ ] Cross-browser tested: Chrome, Safari, Firefox, Edge  

---

*LANDMARK PRD v1.0 — Confidential — Internal Engineering Document*