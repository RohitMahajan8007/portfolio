import { useState, useEffect } from 'react';
import ThreeDPlanet from '@/shared/components/Home/ThreeDPlanet';
import About from '@/pages/About/index';
import Skills from '@/features/Skills/Skills';
import Projects from '@/features/Projects/Projects';
import Experience from '@/features/Experience/Experience';
import Contact from '@/features/Contact/Contact';
import styles from './Home.module.scss';

const Home = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const dx = (e.clientX - centerX) / centerX;
      const dy = (e.clientY - centerY) / centerY;

      setTilt({
        x: parseFloat((-dy * 8).toFixed(2)),
        y: parseFloat((dx * 8).toFixed(2)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={styles.homeWrapper}>
      {/* Background Hologrid */}
      <div className={styles.hologrid} />

      {/* Hero Section (3D Perspective Viewport) */}
      <section id="hero" className={styles.heroSection}>
        <div
          className={styles.tiltViewport}
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
        >
          {/* Hero Content */}
          <div className={styles.heroLeft}>
            <h1 className={styles.heroName}>ROHIT MAHAJAN</h1>
            <span className={styles.heroRole}>MERN Stack Developer</span>
            <p className={styles.heroSubtitle}>
              Building Scalable Web Applications
              <br />
              &amp; AI Powered Experiences.
            </p>

            {/* Integrated Info Readout Panel */}
            <div className={styles.heroContact}>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Email</span>
                <a href="mailto:rohitmahajan800737@gmail.com" className={styles.contactValue}>
                  rohitmahajan800737@gmail.com
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Phone</span>
                <a href="tel:+918007370204" className={styles.contactValue}>
                  +91 8007370204
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Location</span>
                <span className={styles.contactValue}>Surat, Gujarat, India</span>
              </div>
            </div>
          </div>

          {/* 3D Wireframe globe centerpiece */}
          <div className={styles.planetCenter}>
            <ThreeDPlanet />
          </div>

          <div className={styles.heroRight}>
            <div className={styles.hudStatsCard}>
              <div className={styles.hudHeader}>
                <span className={styles.hudDot} />
                <span className={styles.hudTitle}>SYS_METRICS_HUD</span>
              </div>
              <div className={styles.hudDivider} />
              
              <div className={styles.hudGrid}>
                <div className={styles.hudItem}>
                  <span className={styles.hudLabel}>STACK</span>
                  <span className={styles.hudValue}>MERN Full-Stack</span>
                </div>
                <div className={styles.hudItem}>
                  <span className={styles.hudLabel}>PROJECTS</span>
                  <span className={styles.hudValue}>15+ Engineered</span>
                </div>
                <div className={styles.hudItem}>
                  <span className={styles.hudLabel}>FOCUS</span>
                  <span className={styles.hudValue}>Generative AI</span>
                </div>
                <div className={styles.hudItem}>
                  <span className={styles.hudLabel}>AVAILABILITY</span>
                  <span className={styles.hudValue}>Deploy Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.sectionWrap}>
        <About />
      </section>

      {/* Skills Section */}
      <section id="skills" className={styles.sectionWrap}>
        <Skills />
      </section>

      {/* Projects Section */}
      <section id="projects" className={styles.sectionWrap}>
        <Projects />
      </section>

      {/* Experience Section */}
      <section id="experience" className={styles.sectionWrap}>
        <Experience />
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.sectionWrap}>
        <Contact />
      </section>
    </div>
  );
};

export default Home;
