import { useEffect, useRef, useState } from 'react';
import styles from './PageLoader.module.scss';

const PageLoader = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [showText, setShowText] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      // Tilt maximum of 12 degrees
      setTilt({
        x: parseFloat((-y * 12).toFixed(2)),
        y: parseFloat((x * 12).toFixed(2)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let stars = [];
    const starCount = 300;
    let speed = 2; // Initial slow speed
    let targetSpeed = 2;
    let isWarping = false;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = (Math.random() - 0.5) * canvas.width;
        this.y = (Math.random() - 0.5) * canvas.height;
        this.z = Math.random() * canvas.width; // Depth
        this.px = 0;
        this.py = 0;
        // Random color streaks (cyan, purple, pink)
        const colors = ['#00f0ff', '#bd00ff', '#ff007a', '#ffffff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      updateAndDraw() {
        this.z -= speed;

        if (this.z <= 0) {
          this.reset();
          return;
        }

        // Project 3D onto 2D viewport
        const k = 128 / this.z;
        const px = this.x * k + canvas.width / 2;
        const py = this.y * k + canvas.height / 2;

        if (px < 0 || px > canvas.width || py < 0 || py > canvas.height) {
          this.reset();
          return;
        }

        // Draw streak from previous coordinate
        if (this.px !== 0) {
          ctx.strokeStyle = this.color;
          ctx.lineWidth = isWarping ? 2 : 0.8;
          ctx.beginPath();
          ctx.moveTo(this.px, this.py);
          ctx.lineTo(px, py);
          ctx.stroke();
        }

        this.px = px;
        this.py = py;
      }
    }

    // Initialize stars
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    // Set timeline triggers
    const timer1 = setTimeout(() => {
      // Begin warp acceleration
      isWarping = true;
      targetSpeed = 45;
      setShowText(false);
    }, 1200);

    const timer2 = setTimeout(() => {
      // Fade out canvas
      if (containerRef.current) {
        containerRef.current.style.transition = 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
        containerRef.current.style.opacity = '0';
      }
    }, 2200);

    const timer3 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3000);

    const animate = () => {
      // Interpolate speed
      speed += (targetSpeed - speed) * 0.08;

      // Draw faint semi-transparent background to create trail drag effect
      ctx.fillStyle = `rgba(0, 0, 0, ${isWarping ? 0.15 : 0.45})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => star.updateAndDraw());
      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className={styles.loaderContainer}>
      <canvas ref={canvasRef} className={styles.starCanvas} />
      
      {showText && (
        <div 
          className={styles.loaderDeck}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(40px)`,
          }}
        >
          <div className={styles.deckConsole}>
            {/* Tech Corners */}
            <div className={`${styles.corner} ${styles.topLeft}`} />
            <div className={`${styles.corner} ${styles.topRight}`} />
            <div className={`${styles.corner} ${styles.bottomLeft}`} />
            <div className={`${styles.corner} ${styles.bottomRight}`} />
            
            {/* Scanning Laser Line */}
            <div className={styles.scanline} />

            {/* Header Readout */}
            <div className={styles.consoleHeader}>
              <span className={styles.statusIndicator}>
                <span className={styles.blinkDot} />
                DECK ACTIVE
              </span>
              <span className={styles.systemCore}>RM_DECK_V1.1</span>
            </div>

            {/* Concentric 3D Rings */}
            <div className={styles.holoRingWrap}>
              <div className={styles.ringOuter} />
              <div className={styles.ringInner} />
              <div className={styles.ringCenter} />
            </div>

            {/* Welcome Text */}
            <h2 className={styles.holoText}>Welcome to Rohit Portfolio</h2>

            {/* Progress Section */}
            <div className={styles.progressSection}>
              <div className={styles.progressBarWrap}>
                <div className={styles.progressBar} />
              </div>
              <div className={styles.progressLabels}>
                <span className={styles.labelLeft}>ESTABLISHING SECURE CONNECTION...</span>
                <span className={styles.labelRight}>98%</span>
              </div>
            </div>

            {/* Console Footer */}
            <div className={styles.consoleFooter}>
              <span>SYS_LOC: SURAT_GJ_IN</span>
              <span>EST_LINK: OK</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageLoader;
