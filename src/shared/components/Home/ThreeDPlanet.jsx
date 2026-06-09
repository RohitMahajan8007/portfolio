import { useEffect, useRef } from 'react';
import styles from './ThreeDPlanet.module.scss';

const ThreeDPlanet = () => {
  const canvasRef = useRef(null);
  const rotationRef = useRef({ x: 0, y: 0, targetX: 0.005, targetY: 0.005 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let points = [];
    const radius = 100;
    const latLines = 8; // Latitude circles
    const lonLines = 12; // Longitude lines

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth || 300;
      canvas.height = canvas.offsetHeight || 300;
    };

    // Generate vertices for the wireframe sphere
    const initSphere = () => {
      points = [];

      // Generate points on latitude rings
      for (let i = 1; i < latLines; i++) {
        const theta = (i * Math.PI) / latLines;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);

        for (let j = 0; j < lonLines; j++) {
          const phi = (j * 2 * Math.PI) / lonLines;
          const sinPhi = Math.sin(phi);
          const cosPhi = Math.cos(phi);

          const x = radius * sinTheta * cosPhi;
          const y = radius * sinTheta * sinPhi;
          const z = radius * cosTheta;

          points.push({ x, y, z, latIndex: i, lonIndex: j });
        }
      }
    };

    const rotatePoint = (pt, angleX, angleY) => {
      // Rotate around X axis
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      let y1 = pt.y * cosX - pt.z * sinX;
      let z1 = pt.z * cosX + pt.y * sinX;

      // Rotate around Y axis
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      let x2 = pt.x * cosY - z1 * sinY;
      let z2 = z1 * cosY + pt.x * sinY;

      return { x: x2, y: y1, z: z2 };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const cameraDistance = 300;

      // Slowly increment rotation angles
      rotationRef.current.x += rotationRef.current.targetX;
      rotationRef.current.y += rotationRef.current.targetY;

      // Rotate and project points
      const projected = points.map((pt) => {
        const rotated = rotatePoint(pt, rotationRef.current.x, rotationRef.current.y);
        // Perspective projection
        const scale = cameraDistance / (cameraDistance + rotated.z);
        const px = rotated.x * scale + centerX;
        const py = rotated.y * scale + centerY;
        return { px, py, z: rotated.z, latIndex: pt.latIndex, lonIndex: pt.lonIndex };
      });

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      // Draw lines along latitudes
      ctx.lineWidth = 0.6;
      for (let i = 1; i < latLines; i++) {
        ctx.strokeStyle = isLight 
          ? `rgba(0, 119, 182, ${0.25 + (i / latLines) * 0.15})`
          : `rgba(0, 240, 255, ${0.15 + (i / latLines) * 0.1})`;
        ctx.beginPath();
        const ringPoints = projected.filter((p) => p.latIndex === i);
        for (let j = 0; j < ringPoints.length; j++) {
          const p1 = ringPoints[j];
          const p2 = ringPoints[(j + 1) % ringPoints.length];
          // Simple depth sorting (don't draw lines connecting back-to-front badly)
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
        }
        ctx.stroke();
      }

      // Draw lines along longitudes
      ctx.strokeStyle = isLight ? 'rgba(114, 9, 183, 0.25)' : 'rgba(189, 0, 255, 0.18)';
      for (let j = 0; j < lonLines; j++) {
        ctx.beginPath();
        const lonPoints = projected.filter((p) => p.lonIndex === j);
        // Sort from top latitude to bottom latitude
        lonPoints.sort((a, b) => a.latIndex - b.latIndex);
        for (let i = 0; i < lonPoints.length - 1; i++) {
          const p1 = lonPoints[i];
          const p2 = lonPoints[i + 1];
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
        }
        ctx.stroke();
      }

      // Render intersections as glowing nodes
      projected.forEach((p) => {
        // Opacity depends on depth
        const opacity = Math.max(0.1, Math.min(1, 1 - (p.z + radius) / (radius * 2)));
        const baseOpacity = isLight ? opacity * 1.3 : opacity;
        ctx.fillStyle = isLight 
          ? `rgba(3, 4, 94, ${Math.min(1, baseOpacity)})`
          : `rgba(0, 240, 255, ${opacity})`;
        ctx.shadowColor = isLight ? '#03045e' : '#00f0ff';
        ctx.shadowBlur = isLight ? 1 : 4;
        ctx.beginPath();
        ctx.arc(p.px, p.py, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset glow
      });

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initSphere();
    animate();

    const handleMouseMove = (e) => {
      // Cursor displacement skews target speeds slightly
      const dx = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      const dy = (e.clientY - window.innerHeight / 2) / window.innerHeight;
      rotationRef.current.targetX = dy * 0.03 + 0.005;
      rotationRef.current.targetY = dx * 0.03 + 0.005;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.planetWrapper}>
      <canvas ref={canvasRef} className={styles.planetCanvas} />
    </div>
  );
};

export default ThreeDPlanet;
