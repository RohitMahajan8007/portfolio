import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ScrollProgress.module.scss';

gsap.registerPlugin(ScrollTrigger);

const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    gsap.to(bar, {
      scaleX: 1,
      ease: 'none',
      transformOrigin: 'left center',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    // Initial state
    gsap.set(bar, { scaleX: 0 });
  }, []);

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div ref={barRef} className={styles.bar} />
    </div>
  );
};

export default ScrollProgress;
