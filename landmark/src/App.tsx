import { useRef } from 'react';
import { Nav } from './components/navigation/Nav';
import { ThreeCanvas } from './components/three/ThreeCanvas';
import { HeroText } from './components/sections/HeroText';
import { FoundationText } from './components/sections/FoundationText';
import { SkeletonText } from './components/sections/SkeletonText';
import { ArchText } from './components/sections/ArchText';
import { InteriorSection } from './components/sections/InteriorSection';
import { RevealSection } from './components/sections/RevealSection';
import { StatsSection } from './components/sections/StatsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { MeetTheOwner } from './components/sections/MeetTheOwner';
import { ServicesSection } from './components/sections/ServicesSection';
import { ProcessSection } from './components/sections/ProcessSection';
import { CTASection } from './components/sections/CTASection';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { GrainOverlay } from './components/layout/GrainOverlay';
import { useScrollPhase } from './hooks/useScrollPhase';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentPhase } = useScrollPhase(containerRef);

  return (
    <>
      <GrainOverlay />
      <ScrollProgress />
      <Nav />
      {/* 3D Scene - Fixed while the build experience scrolls */}
      <ThreeCanvas targetRef={containerRef} />
      
      <main style={{ position: 'relative' }}>
        {/* BUILD EXPERIENCE SEQUENCE (700vh spacer) */}
        <section ref={containerRef} style={{ position: 'relative', height: '700vh' }}>
          <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100vw', overflow: 'hidden', pointerEvents: 'none' }}>
            {/* Conditional overlays based on active phase */}
            {currentPhase.label === 'LAND' && <HeroText />}
            {currentPhase.label === 'FOUNDATION' && <FoundationText />}
            {currentPhase.label === 'SKELETON' && <SkeletonText />}
            {currentPhase.label === 'ARCHITECTURE' && <ArchText />}
            {currentPhase.label === 'INTERIOR' && <InteriorSection targetRef={containerRef} />}
            {currentPhase.label === 'REVEAL' && <RevealSection targetRef={containerRef} />}
          </div>
        </section>

        {/* STATIC BRAND CONTENT (Flows naturally) */}
        <div style={{ position: 'relative', zIndex: 10, background: 'var(--color-void)', pointerEvents: 'auto' }}>
          <StatsSection />
          <ProjectsSection />
          <MeetTheOwner />
          <ServicesSection />
          <ProcessSection />
          <CTASection />
          <Footer />
        </div>
      </main>
    </>
  );
}

export default App;

