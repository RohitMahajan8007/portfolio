import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './WarpSidebar.module.scss';

const WarpSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathRef = useRef(null);
  const infoRef = useRef(null);

  const paths = {
    normal: 'M 0,0 L 0,1000 Q 40,500 0,0 Z',
    hover: 'M 0,0 L 0,1000 Q 120,500 0,0 Z',
    open: 'M 0,0 L 0,1000 Q 320,500 0,0 Z'
  };

  const handleMouseEnter = () => {
    if (isOpen) return;
    gsap.to(pathRef.current, {
      attr: { d: paths.hover },
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    if (isOpen) return;
    gsap.to(pathRef.current, {
      attr: { d: paths.normal },
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const toggleSidebar = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);

    gsap.to(pathRef.current, {
      attr: { d: nextState ? paths.open : paths.normal },
      duration: 0.6,
      ease: 'elastic.out(1, 0.6)'
    });

    if (nextState) {
      gsap.set(infoRef.current, { display: 'flex' });
      gsap.fromTo(infoRef.current, 
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.5, delay: 0.2, ease: 'power2.out' }
      );
    } else {
      gsap.to(infoRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(infoRef.current, { display: 'none' });
        }
      });
    }
  };

  return (
    <>
      {/* Warp Sidebar Trigger */}
      <div className={styles.sidebarTrigger}>
        <svg
          className={styles.triggerSvg}
          viewBox="0 0 400 1000"
          preserveAspectRatio="none"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={toggleSidebar}
        >
          <path
            ref={pathRef}
            d={paths.normal}
            fill="#ffffff"
            className={styles.warpPath}
          />
          <text
            x={isOpen ? 120 : 25}
            y="500"
            textAnchor="middle"
            dominantBaseline="central"
            className={styles.triggerText}
          >
            {isOpen ? '✕' : '.?.:'}
          </text>
        </svg>
      </div>

      {/* Info Sidebar Panel */}
      <div ref={infoRef} className={styles.infoPanel} style={{ display: 'none' }}>
        <h3 className={styles.panelTitle}>Rohit Mahajan</h3>
        <p className={styles.panelRole}>MERN Stack Developer</p>
        <div className={styles.panelDivider} />
        <div className={styles.infoList}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Email</span>
            <a href="mailto:rohitmahajan800737@gmail.com" className={styles.infoValue}>
              rohitmahajan800737@gmail.com
            </a>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Phone</span>
            <a href="tel:+918007370204" className={styles.infoValue}>
              +91 8007370204
            </a>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Location</span>
            <span className={styles.infoValue}>Surat, Gujarat, India</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default WarpSidebar;
