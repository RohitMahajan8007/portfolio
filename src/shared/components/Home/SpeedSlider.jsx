import { useEffect, useRef, useState } from 'react';
import styles from './SpeedSlider.module.scss';

const SpeedSlider = ({ speed, onChange }) => {
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (clientY) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    // Calculate percentage from bottom to top (bottom = 0%, top = 100%)
    const percentage = Math.max(0, Math.min(1, (rect.bottom - clientY) / rect.height));
    const newSpeed = 1.0 + percentage * 14.0; // Scale from 1.0 to 15.0
    onChange(parseFloat(newSpeed.toFixed(1)));
  };

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e) => {
      handleDrag(e.clientY);
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging]);

  const percentage = (speed - 1.0) / 14.0;
  const bottomPercent = percentage * 100;

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderInner}>
        <div className={styles.sliderHeader}>
          <div className={styles.labelSub}>Faster</div>
          <div className={styles.valueDisplay}>{speed.toFixed(1)}</div>
        </div>

        <div
          ref={trackRef}
          className={styles.sliderTrack}
          onMouseDown={(e) => {
            setIsDragging(true);
            handleDrag(e.clientY);
          }}
        >
          <div className={styles.trackRail} />
          <div className={styles.trackFill} style={{ height: `${bottomPercent}%` }} />
          <div
            className={styles.trackHandle}
            style={{ bottom: `calc(${bottomPercent}% - 16px)` }}
          />
          {/* Tic marks */}
          <div className={styles.tic} style={{ bottom: '0%' }} />
          <div className={styles.tic} style={{ bottom: '25%' }} />
          <div className={styles.tic} style={{ bottom: '50%' }} />
          <div className={styles.tic} style={{ bottom: '75%' }} />
          <div className={styles.tic} style={{ bottom: '100%' }} />
        </div>

        <div className={styles.sliderFooter}>
          <div className={styles.labelSub}>Steady</div>
        </div>
      </div>
    </div>
  );
};

export default SpeedSlider;
