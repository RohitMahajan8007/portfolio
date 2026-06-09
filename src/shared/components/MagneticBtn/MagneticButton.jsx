import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './MagneticButton.module.scss';

const MagneticButton = ({
  children,
  className = '',
  tag: Tag = 'button',
  href,
  target,
  onClick,
  variant = 'primary',
  ...props
}) => {
  const btnRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    const inner = innerRef.current;
    if (!btn || !inner) return;

    const xTo  = gsap.quickTo(btn,   'x', { duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    const yTo  = gsap.quickTo(btn,   'y', { duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    const xiTo = gsap.quickTo(inner, 'x', { duration: 0.35, ease: 'power3.out' });
    const yiTo = gsap.quickTo(inner, 'y', { duration: 0.35, ease: 'power3.out' });

    const onMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      xTo((e.clientX - cx) * 0.35);
      yTo((e.clientY - cy) * 0.35);
      xiTo((e.clientX - cx) * 0.15);
      yiTo((e.clientY - cy) * 0.15);
    };

    const onLeave = () => {
      xTo(0); yTo(0); xiTo(0); yiTo(0);
    };

    btn.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);
    return () => {
      btn.removeEventListener('mousemove', onMove);
      btn.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const TagComponent = href ? 'a' : Tag;
  const tagProps = href ? { href, target, rel: target === '_blank' ? 'noopener noreferrer' : undefined } : { onClick };

  return (
    <TagComponent
      ref={btnRef}
      className={`${styles.btn} ${styles[variant]} ${className}`}
      {...tagProps}
      {...props}
    >
      <span ref={innerRef} className={styles.inner}>
        {children}
      </span>
      <span className={styles.shimmer} aria-hidden="true" />
    </TagComponent>
  );
};

export default MagneticButton;
