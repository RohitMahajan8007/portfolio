import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import styles from './About.module.scss';

gsap.registerPlugin(ScrollTrigger);

const SKILLS_PILLS = [
  'React.js', 'SCSS', 'Tailwind CSS', 'Redux Toolkit', 'Context API',
  'Node.js', 'Express.js', 'MongoDB', 'JWT', 'OAuth',
  'OpenAI API', 'RAG Applications', 'REST APIs', 'Mongoose',
];

const STATS = [
  { value: 2,    suffix: '+',  label: 'Projects Completed' },
  { value: 14,   suffix: '+',  label: 'Technologies Used' },
  { value: 6,    suffix: 'mo', label: 'Internship Duration' },
];

const About = () => {
  const sectionRef  = useRef(null);
  const tagRef      = useRef(null);
  const titleRef    = useRef(null);
  const bodyRef     = useRef(null);
  const pillsRef    = useRef([]);
  const statsRef    = useRef([]);
  const countRefs   = useRef([]);
  const imageBoxRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Tag
      gsap.from(tagRef.current, {
        opacity: 0, y: 20, duration: 0.6,
        scrollTrigger: { trigger: tagRef.current, start: 'top 85%' },
      });

      // Title chars
      const split = new SplitType(titleRef.current, { types: 'chars' });
      gsap.from(split.chars, {
        opacity: 0, y: 60, rotateX: -60,
        stagger: 0.02, duration: 0.6, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
      });

      // Body
      const bodySplit = new SplitType(bodyRef.current, { types: 'lines' });
      gsap.from(bodySplit.lines, {
        opacity: 0, y: 30,
        stagger: 0.08, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: bodyRef.current, start: 'top 80%' },
      });

      // Pills stagger
      gsap.from(pillsRef.current.filter(Boolean), {
        opacity: 0, scale: 0.8, y: 20,
        stagger: 0.04, duration: 0.5, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: pillsRef.current[0], start: 'top 85%' },
      });

      // Stats counters
      STATS.forEach((stat, i) => {
        const el = countRefs.current[i];
        if (!el) return;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: stat.value,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.v) + stat.suffix;
          },
          scrollTrigger: {
            trigger: statsRef.current[i],
            start: 'top 85%',
            once: true,
          },
        });
        gsap.from(statsRef.current[i], {
          opacity: 0, y: 40,
          duration: 0.7, ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: statsRef.current[i], start: 'top 85%' },
        });
      });

      // Image box
      gsap.from(imageBoxRef.current, {
        opacity: 0, x: 60, scale: 0.95,
        duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: imageBoxRef.current, start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      data-section="about"
      className={`${styles.about} section`}
      aria-label="About section"
    >
      <div className="container">
        <div className={styles.grid}>
          {/* Left */}
          <div className={styles.left}>
            <div ref={tagRef} className="section__tag">About Me</div>

            <h2 ref={titleRef} className={`section__title ${styles.title}`}>
              MERN Stack<br />
              <span>Developer</span>
            </h2>

            <p ref={bodyRef} className={`body-large ${styles.body}`}>
              MERN Stack Developer with hands-on experience in building scalable
              web applications using MongoDB, Express.js, React.js, and Node.js.
              Passionate about crafting AI-powered experiences and writing clean,
              maintainable code that scales.
            </p>

            {/* Internship Badge */}
            <div className={styles.internBadge}>
              <div className={styles.internIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              </div>
              <div>
                <div className={styles.internTitle}>Backend Developer Intern</div>
                <div className={styles.internCompany}>Bits And Volts Pvt. Ltd. · 6 months</div>
              </div>
            </div>

            {/* Skills Pills */}
            <div className={styles.pills}>
              {SKILLS_PILLS.map((skill, i) => (
                <span
                  key={skill}
                  ref={(el) => (pillsRef.current[i] = el)}
                  className={styles.pill}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className={styles.right}>
            {/* Visual Box */}
            <div ref={imageBoxRef} className={styles.imageBox}>
              <div className={styles.imageInner}>
                <div className={styles.avatarGlow} aria-hidden="true" />
                <div className={styles.avatarInitials} aria-label="Rohit Mahajan">
                  <span>RM</span>
                </div>
                <div className={styles.codeSnippet} aria-hidden="true">
                  <pre>{`const dev = {
  name: "Rohit Mahajan",
  stack: ["MERN", "AI"],
  available: true
};`}</pre>
                </div>
              </div>

              {/* Stats */}
              <div className={styles.statsGrid}>
                {STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    ref={(el) => (statsRef.current[i] = el)}
                    className={styles.statCard}
                  >
                    <span
                      ref={(el) => (countRefs.current[i] = el)}
                      className={styles.statValue}
                    >
                      {stat.value}{stat.suffix}
                    </span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
