import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/app/providers/ThemeProvider';
import styles from './Navbar.module.scss';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const linksRef = useRef([]);
  const [activeSection, setActiveSection] = useState('hero');
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const { theme, toggleTheme } = useTheme();

  // Scroll to section helper
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId.replace('#', ''));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Intersection Observer to track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.25, // Active when 25% of the section is visible
        rootMargin: '-10% 0px -40% 0px' // adjust for nav bar height
      }
    );

    NAV_LINKS.forEach((link) => {
      const el = document.getElementById(link.href.replace('#', ''));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Update pill position based on active section
  useEffect(() => {
    const activeIdx = NAV_LINKS.findIndex((l) => l.href.replace('#', '') === activeSection);
    if (activeIdx !== -1) {
      const activeLink = linksRef.current[activeIdx];
      if (activeLink) {
        setPillStyle({
          left: activeLink.offsetLeft,
          width: activeLink.offsetWidth,
          opacity: 1,
        });
      }
    } else {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection]);

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Main Navigation">
      <div className={styles.navInner}>
        {/* Sliding Pill Background */}
        <div
          className={styles.slidingPill}
          style={{
            left: `${pillStyle.left}px`,
            width: `${pillStyle.width}px`,
            opacity: pillStyle.opacity,
          }}
        />

        {NAV_LINKS.map((link, idx) => (
          <a
            key={link.label}
            href={link.href}
            ref={(el) => (linksRef.current[idx] = el)}
            onClick={(e) => handleScrollTo(e, link.href)}
            className={`${styles.navLink} ${
              activeSection === link.href.replace('#', '') ? styles.active : ''
            }`}
          >
            {link.label}
          </a>
        ))}

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={styles.themeToggle}
          aria-label="Toggle Light/Dark Theme"
          data-cursor="TOGGLE"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
