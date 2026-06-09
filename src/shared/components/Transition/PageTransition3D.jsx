import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import styles from './PageTransition3D.module.scss';

const PageTransition3D = () => {
  const location = useLocation();
  const leftShutterRef = useRef(null);
  const rightShutterRef = useRef(null);
  const containerRef = useRef(null);
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname === prevPath) return;

    const left = leftShutterRef.current;
    const right = rightShutterRef.current;
    const container = containerRef.current;
    if (!left || !right || !container) {
      setPrevPath(location.pathname);
      return;
    }

    const tl = gsap.timeline({
      onStart: () => {
        // block pointers during transition
        gsap.set(container, { pointerEvents: 'auto' });
      },
      onComplete: () => {
        // restore pointers
        gsap.set(container, { pointerEvents: 'none' });
      }
    });

    // Shutters swing closed (0deg is closed)
    tl.set(left, { rotateY: -90 })
      .set(right, { rotateY: 90 })
      .to([left, right], {
        rotateY: 0,
        duration: 0.5,
        ease: 'power3.inOut',
        stagger: 0.05
      });

    // Swap path state in background
    tl.call(() => {
      setPrevPath(location.pathname);
    });

    // Shutters swing open (back to angle)
    tl.to(left, {
      rotateY: -90,
      duration: 0.5,
      ease: 'power3.inOut'
    })
    .to(right, {
      rotateY: 90,
      duration: 0.5,
      ease: 'power3.inOut'
    }, '-=0.5');

  }, [location.pathname, prevPath]);

  return (
    <div ref={containerRef} className={styles.transitionContainer}>
      <div
        ref={leftShutterRef}
        className={`${styles.shutter} ${styles.left}`}
        style={{ transform: 'rotateY(-90deg)' }}
      >
        <div className={styles.shutterContent}>
          <div className={styles.shutterLogo}>RM</div>
        </div>
      </div>
      <div
        ref={rightShutterRef}
        className={`${styles.shutter} ${styles.right}`}
        style={{ transform: 'rotateY(90deg)' }}
      >
        <div className={styles.shutterContent}>
          <div className={styles.gridLines} />
        </div>
      </div>
    </div>
  );
};

export default PageTransition3D;
