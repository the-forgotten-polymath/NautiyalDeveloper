import gsap from 'gsap';

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
