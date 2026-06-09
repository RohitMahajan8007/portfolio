import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

// ─── Text Reveal ─────────────────────────────────────────────────────────────
export const revealText = (el, options = {}) => {
  if (!el) return;
  const split = new SplitType(el, { types: 'chars,words' });
  return gsap.from(split.chars, {
    opacity: 0,
    y: 80,
    rotateX: -90,
    stagger: options.stagger || 0.02,
    duration: options.duration || 0.8,
    ease: 'back.out(1.7)',
    delay: options.delay || 0,
    ...options,
  });
};

// ─── Fade Up ─────────────────────────────────────────────────────────────────
export const fadeUp = (el, options = {}) => {
  if (!el) return;
  return gsap.from(el, {
    opacity: 0,
    y: 60,
    duration: options.duration || 0.9,
    ease: 'power3.out',
    delay: options.delay || 0,
    ...options,
  });
};

// ─── Stagger Fade Up ─────────────────────────────────────────────────────────
export const staggerFadeUp = (els, options = {}) => {
  if (!els || els.length === 0) return;
  return gsap.from(els, {
    opacity: 0,
    y: 50,
    stagger: options.stagger || 0.1,
    duration: options.duration || 0.7,
    ease: 'power3.out',
    delay: options.delay || 0,
    ...options,
  });
};

// ─── Reveal Mask (Clip Path) ─────────────────────────────────────────────────
export const revealMask = (el, options = {}) => {
  if (!el) return;
  return gsap.from(el, {
    clipPath: 'inset(0 100% 0 0)',
    duration: options.duration || 1.2,
    ease: 'power4.inOut',
    delay: options.delay || 0,
    ...options,
  });
};

// ─── Scale In ────────────────────────────────────────────────────────────────
export const scaleIn = (el, options = {}) => {
  if (!el) return;
  return gsap.from(el, {
    opacity: 0,
    scale: 0.85,
    duration: options.duration || 0.8,
    ease: 'back.out(1.4)',
    delay: options.delay || 0,
    ...options,
  });
};

// ─── Counter Animation ────────────────────────────────────────────────────────
export const counterAnim = (el, target, options = {}) => {
  if (!el) return;
  const obj = { value: 0 };
  return gsap.to(obj, {
    value: target,
    duration: options.duration || 2,
    ease: 'power2.out',
    delay: options.delay || 0,
    onUpdate: () => {
      el.textContent = Math.round(obj.value) + (options.suffix || '');
    },
    ...options,
  });
};

// ─── Parallax Section ─────────────────────────────────────────────────────────
export const parallaxSection = (el, options = {}) => {
  if (!el) return;
  return gsap.to(el, {
    y: options.distance || -100,
    ease: 'none',
    scrollTrigger: {
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: options.scrub || 1.5,
    },
  });
};

// ─── ScrollTrigger Fade ───────────────────────────────────────────────────────
export const scrollFadeUp = (el, options = {}) => {
  if (!el) return;
  return gsap.from(el, {
    opacity: 0,
    y: 60,
    duration: options.duration || 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: options.trigger || el,
      start: options.start || 'top 85%',
      end: options.end || 'bottom 20%',
      toggleActions: 'play none none reverse',
      ...options.scrollTrigger,
    },
  });
};

// ─── ScrollTrigger Text Reveal ────────────────────────────────────────────────
export const scrollRevealText = (el, options = {}) => {
  if (!el) return;
  const split = new SplitType(el, { types: 'chars,words,lines' });
  return gsap.from(split.chars, {
    opacity: 0,
    y: 60,
    rotateX: -60,
    stagger: 0.015,
    duration: 0.7,
    ease: 'back.out(1.2)',
    scrollTrigger: {
      trigger: options.trigger || el,
      start: options.start || 'top 80%',
      toggleActions: 'play none none reverse',
      ...options.scrollTrigger,
    },
  });
};

// ─── Magnetic Effect ──────────────────────────────────────────────────────────
export const magneticEffect = (el) => {
  if (!el) return;
  const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
  const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });

  const onMove = (e) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.35;
    const dy = (e.clientY - cy) * 0.35;
    xTo(dx);
    yTo(dy);
  };

  const onLeave = () => {
    xTo(0);
    yTo(0);
  };

  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', onLeave);

  return () => {
    el.removeEventListener('mousemove', onMove);
    el.removeEventListener('mouseleave', onLeave);
  };
};

// ─── Draw SVG Path (Timeline) ─────────────────────────────────────────────────
export const drawSVGPath = (el, options = {}) => {
  if (!el) return;
  const length = el.getTotalLength ? el.getTotalLength() : 500;
  gsap.set(el, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });
  return gsap.to(el, {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: options.trigger || el,
      start: options.start || 'top 80%',
      end: options.end || 'bottom 20%',
      scrub: 1,
      ...options.scrollTrigger,
    },
  });
};

// ─── 3D Card Tilt ────────────────────────────────────────────────────────────
export const card3DTilt = (el) => {
  if (!el) return;

  const onMove = (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 10;
    const rotateX = -((y - centerY) / centerY) * 10;

    gsap.to(el, {
      rotateX,
      rotateY,
      transformPerspective: 800,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const onLeave = () => {
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', onLeave);

  return () => {
    el.removeEventListener('mousemove', onMove);
    el.removeEventListener('mouseleave', onLeave);
  };
};
