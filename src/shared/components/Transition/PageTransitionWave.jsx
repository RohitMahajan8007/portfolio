import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import styles from './PageTransitionWave.module.scss';

const PageTransitionWave = () => {
  const location = useLocation();
  const containerRef = useRef(null);
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname === prevPath) return;

    const container = containerRef.current;
    if (!container) {
      setPrevPath(location.pathname);
      return;
    }

    // Trigger the sweeping animation
    const tl = gsap.timeline({
      onStart: () => {
        // We let the path update midway through the transition
        gsap.delayedCall(0.5, () => {
          setPrevPath(location.pathname);
        });
      }
    });

    tl.set(container, { x: '-100%' })
      .to(container, {
        x: '0%',
        duration: 0.5,
        ease: 'power3.in'
      })
      .to(container, {
        x: '100%',
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.2
      });

  }, [location.pathname, prevPath]);

  return (
    <div
      ref={containerRef}
      className={styles.waveContainer}
      style={{ transform: 'translateX(-100%)' }}
    >
      <svg className={styles.waveSvg} viewBox="0 0 1000 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="threadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <filter id="glowWave">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M 0,50 Q 250,30 500,50 T 1000,50"
          stroke="url(#threadGradient)"
          strokeWidth="3"
          fill="none"
          filter="url(#glowWave)"
          className={styles.wavePath1}
        />
        <path
          d="M 0,50 Q 250,70 500,50 T 1000,50"
          stroke="url(#threadGradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
          filter="url(#glowWave)"
          className={styles.wavePath2}
        />
      </svg>
    </div>
  );
};

export default PageTransitionWave;
