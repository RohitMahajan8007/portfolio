import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import MagneticButton from '@/shared/components/MagneticBtn/MagneticButton';
import styles from './Hero.module.scss';

const Hero = () => {
  const sectionRef   = useRef(null);
  const canvasRef    = useRef(null);
  const greetRef     = useRef(null);
  const nameRef      = useRef(null);
  const roleRef      = useRef(null);
  const headlineRef  = useRef(null);
  const btnsRef      = useRef(null);
  const scrollRef    = useRef(null);
  const floatRef     = useRef([]);

  // ── Canvas Particle System ──────────────────────────────────────────────────
  useEffect(() => {
    const canvas  = canvasRef.current;
    if (!canvas) return;
    const ctx     = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x   = Math.random() * canvas.width;
        this.y   = Math.random() * canvas.height;
        this.r   = Math.random() * 1.5 + 0.3;
        this.vx  = (Math.random() - 0.5) * 0.3;
        this.vy  = (Math.random() - 0.5) * 0.3;
        this.a   = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.6
          ? `rgba(124,58,237,${this.a})`
          : Math.random() > 0.5
          ? `rgba(59,130,246,${this.a})`
          : `rgba(248,250,252,${this.a})`;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Connection lines
    const drawConnections = () => {
      const maxDist = 100;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(124,58,237,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const count = Math.min(window.innerWidth < 768 ? 60 : 120, 150);
    particles = Array.from({ length: count }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => { p.update(); p.draw(); });
      drawConnections();
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // ── GSAP Entrance Animations ────────────────────────────────────────────────
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Split name for char animation
    const nameSplit = new SplitType(nameRef.current, { types: 'chars' });
    const headlineSplit = new SplitType(headlineRef.current, { types: 'words' });

    gsap.set([greetRef.current, roleRef.current, btnsRef.current, scrollRef.current], {
      opacity: 0, y: 40,
    });
    gsap.set(nameSplit.chars, { opacity: 0, y: 80, rotateX: -90 });
    gsap.set(headlineSplit.words, { opacity: 0, y: 30 });
    gsap.set(floatRef.current, { opacity: 0, scale: 0.8 });

    tl
      .to(greetRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .to(nameSplit.chars, {
        opacity: 1, y: 0, rotateX: 0,
        stagger: 0.03,
        duration: 0.7,
        ease: 'back.out(2)',
      }, '-=0.2')
      .to(roleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .to(headlineSplit.words, {
        opacity: 1, y: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power3.out',
      }, '-=0.3')
      .to(btnsRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
      .to(scrollRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
      .to(floatRef.current, {
        opacity: 1, scale: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.5)',
      }, '-=0.5');

    // Float animation for decorative elements
    floatRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        y: -20 - i * 8,
        duration: 3 + i * 0.7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.4,
      });
    });

    return () => tl.kill();
  }, []);

  // ── Mouse Parallax on Hero ──────────────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onMove = (e) => {
      const { clientX, clientY } = e;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (clientX - cx) / cx;
      const dy = (clientY - cy) / cy;

      floatRef.current.forEach((el, i) => {
        if (!el) return;
        const factor = (i + 1) * 12;
        gsap.to(el, {
          x: dx * factor,
          duration: 1.2,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    };

    section.addEventListener('mousemove', onMove);
    return () => section.removeEventListener('mousemove', onMove);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-section="hero"
      className={styles.hero}
      aria-label="Hero section"
    >
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      {/* Gradient Mesh BG */}
      <div className={styles.gradientMesh} aria-hidden="true" />

      {/* Grid Overlay */}
      <div className={styles.gridOverlay} aria-hidden="true" />

      {/* Floating Decorative Shapes */}
      <div ref={(el) => (floatRef.current[0] = el)} className={`${styles.float} ${styles.float1}`} aria-hidden="true" />
      <div ref={(el) => (floatRef.current[1] = el)} className={`${styles.float} ${styles.float2}`} aria-hidden="true" />
      <div ref={(el) => (floatRef.current[2] = el)} className={`${styles.float} ${styles.float3}`} aria-hidden="true" />
      <div ref={(el) => (floatRef.current[3] = el)} className={`${styles.float} ${styles.float4}`} aria-hidden="true" />

      {/* Content */}
      <div className={styles.content}>
        {/* Greeting */}
        <div ref={greetRef} className={styles.greet}>
          <span className={styles.greetDot} aria-hidden="true" />
          <span className={styles.greetText}>Available for opportunities</span>
        </div>

        {/* Hello line */}
        <p className={styles.helloLine}>Hello, I'm</p>

        {/* Name */}
        <h1 ref={nameRef} className={styles.name} aria-label="Rohit Mahajan">
          Rohit Mahajan
        </h1>

        {/* Role */}
        <div ref={roleRef} className={styles.roleWrap}>
          <span className={styles.roleTag} aria-hidden="true">&lt;</span>
          <span className={styles.role}>MERN Stack Developer</span>
          <span className={styles.roleTag} aria-hidden="true">/&gt;</span>
        </div>

        {/* Headline */}
        <p ref={headlineRef} className={styles.headline}>
          Building Scalable Web Applications &amp; AI Powered Experiences
        </p>

        {/* CTA Buttons */}
        <div ref={btnsRef} className={styles.btns}>
          <MagneticButton
            variant="primary"
            className={styles.btnPrimary}
            onClick={() => scrollToSection('projects')}
            data-cursor="VIEW"
            id="hero-view-projects"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            View Projects
          </MagneticButton>

          <MagneticButton
            variant="outline"
            className={styles.btnOutline}
            onClick={() => scrollToSection('contact')}
            data-cursor="CHAT"
            id="hero-contact"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Contact Me
          </MagneticButton>
        </div>

        {/* Stats Row */}
        <div className={styles.statsRow}>
          {[
            { value: '2+', label: 'Projects Built' },
            { value: '10+', label: 'Technologies' },
            { value: '6mo', label: 'Internship' },
          ].map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className={styles.scrollIndicator}
        onClick={() => scrollToSection('about')}
        role="button"
        tabIndex={0}
        aria-label="Scroll to About section"
      >
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
        <span className={styles.scrollLabel}>Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
