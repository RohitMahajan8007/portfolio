import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AboutPage.module.scss';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const textSideRef = useRef(null);
  const photoSideRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Scale down tilt angle (max 15 degrees)
    setTilt({
      x: parseFloat(((centerY - y) / 8).toFixed(2)),
      y: parseFloat(((x - centerX) / 8).toFixed(2)),
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header comes from the top (y: -60)
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -60,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        },
      });

      // Bio console comes from the left
      gsap.from(textSideRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: textSideRef.current,
          start: 'top 80%',
        },
      });

      // Hologram comes from the right
      gsap.from(photoSideRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: photoSideRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={sectionRef} className={styles.aboutPage}>
      <div className={styles.pageInner}>
        
        {/* Animated Drop-down Header */}
        <div ref={headerRef} className={styles.header}>
          <span className={styles.sub}>Profile</span>
          <h2 className={styles.title}>About Rohit Mahajan</h2>
        </div>

        <div className={styles.gridContainer}>
          
          {/* Left Side: Cyber terminal info */}
          <div ref={textSideRef} className={styles.textSide}>
            <div className={styles.terminalHeader}>
              <span className={styles.pulseDot} />
              <span className={styles.terminalTitle}>System Console // Active: Rohit Mahajan</span>
            </div>

            <div className={styles.terminalBody}>
              <p className={styles.paragraph}>
                <span className={styles.codePrompt}>&gt; whoami</span>
                <br />
                Hi, I'm Rohit! Glad to have you here. I'm a passionate MERN Stack Developer and Software Engineer building scalable web applications and AI-powered experiences. Based in Surat, Gujarat, India, I enjoy solving complex engineering problems, designing clean systems, and turning visions into reliable digital tools.
                <br />
                <br />
                <span className={styles.codePrompt}>&gt; sys_capabilities</span>
                <br />
                I focus on writing clean code, building responsive interfaces, and developing secure backend architectures. I'm also deeply interested in the possibilities of agentic AI systems and Retrieval-Augmented Generation (RAG).
                <br />
                <br />
                <span className={styles.codePrompt}>&gt; life_philosophy</span>
                <br />
                Question, Design - question Design - Build / Experience. That's how I see life.
              </p>
            </div>

            {/* Social Links */}
            <div className={styles.socials} role="navigation" aria-label="Social media profiles">
              <a
                href="https://github.com/RohitMahajan8007"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub Profile"
              >
                <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/rohit-mahajan-681968236/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn Profile"
              >
                <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side: 3D Hologram Avatar Card */}
          <div ref={photoSideRef} className={styles.photoSide}>
            <div
              className={styles.holoBox}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
            >
              {/* Scanlines and holographic rings */}
              <div className={styles.scanline} />
              <div className={styles.holoCircle} />
              <img
                src="/rohitAbout.png"
                alt="Rohit Mahajan portrait hologram"
                className={styles.avatar}
                loading="eager"
              />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default About;
