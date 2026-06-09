import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './CustomCursor.module.scss';

const CustomCursor = () => {
  const cursorDot = useRef(null);
  const cursorRing = useRef(null);
  const [label, setLabel] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dot = cursorDot.current;
    const ring = cursorRing.current;
    if (!dot || !ring) return;

    const xDot  = gsap.quickTo(dot,  'x', { duration: 0.1, ease: 'power3.out' });
    const yDot  = gsap.quickTo(dot,  'y', { duration: 0.1, ease: 'power3.out' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });

    const onMove = (e) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onEnterLink = (e) => {
      const el = e.currentTarget;
      const cursorLabel = el.dataset.cursor || '';
      setLabel(cursorLabel);
      gsap.to(ring, { scale: 2.2, opacity: 0.7, duration: 0.3 });
      gsap.to(dot, { scale: 0.4, duration: 0.3 });
    };

    const onLeaveLink = () => {
      setLabel('');
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.85, duration: 0.15 });
      gsap.to(dot, { scale: 1.3, duration: 0.15 });
    };
    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    const onEnterPage = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      setIsVisible(true);
    };
    const onLeavePage = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseenter', onEnterPage);
    document.documentElement.addEventListener('mouseleave', onLeavePage);

    const interactives = document.querySelectorAll('a, button, [data-cursor], [role="button"]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseenter', onEnterPage);
      document.documentElement.removeEventListener('mouseleave', onLeavePage);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterLink);
        el.removeEventListener('mouseleave', onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorDot} className={styles.cursorDot} aria-hidden="true" />
      <div ref={cursorRing} className={`${styles.cursorRing} ${label ? styles.hasLabel : ''}`} aria-hidden="true">
        {label && <span className={styles.cursorLabel}>{label}</span>}
      </div>
    </>
  );
};

export default CustomCursor;
