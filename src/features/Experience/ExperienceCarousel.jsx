import { useState } from 'react';
import styles from './ExperienceCarousel.module.scss';

const EXPERIENCES = [
  {
    role: 'Backend Developer Intern',
    company: 'Bits And Volts Pvt. Ltd.',
    duration: 'Nov 2025 – Apr 2026',
    type: 'Internship',
    bullets: [
      'Completed professional Backend Web Development Internship specializing in Node.js server architecture.',
      'Built a scalable real-time WebSocket chat system with rooms, typing indicators, and message persistence.',
      'Designed and developed RESTful community management APIs with role-based access control.',
      'Implemented user auth, profiles, and account settings using Node.js, Express, and JWT.',
      'Created buddy find matching algorithms and DB layers to pair peers with similar interests.'
    ],
    skills: ['Node.js', 'Express.js', 'MongoDB', 'WebSockets', 'REST APIs', 'JWT']
  },
  {
    role: 'Full-Stack & Generative AI Developer',
    company: 'Personal & Client Projects',
    duration: '2024 – Present',
    type: 'Freelance / Dev',
    bullets: [
      'Engineered multiple advanced MERN stack web applications and full-stack solutions.',
      'Built a full-stack AI-powered search and chat engine inspired by Perplexity.ai.',
      'Integrated multiple LLMs (OpenAI, Gemini, Mistral) with Retrieval-Augmented Generation (RAG) for smart context-aware queries.',
      'Configured state management using Redux Toolkit and structured MongoDB schemas.'
    ],
    skills: ['React.js', 'Node.js', 'MongoDB', 'RAG', 'OpenAI API', 'Gemini API']
  },
  {
    role: 'Real-Time Web Architect',
    company: 'Web Monitor Projects',
    duration: '2025',
    type: 'Independent Work',
    bullets: [
      'Engineered a glassmorphic dashboard for monitoring application status and server performance metrics.',
      'Integrated live REST API metrics, responsive charts, and real-time webhook warnings.',
      'Optimized query speeds and database indices to ensure fast loading under peak stress.'
    ],
    skills: ['React.js', 'Chart.js', 'Webhooks', 'REST APIs', 'MongoDB', 'CSS Modules']
  }
];

const ExperienceCarousel = () => {
  const [tilts, setTilts] = useState({});

  const handleMouseMove = (idx, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setTilts((prev) => ({
      ...prev,
      [idx]: {
        x: parseFloat(((centerY - y) / 12).toFixed(2)),
        y: parseFloat(((x - centerX) / 12).toFixed(2)),
      },
    }));
  };

  const handleMouseLeave = (idx) => {
    setTilts((prev) => ({
      ...prev,
      [idx]: { x: 0, y: 0 },
    }));
  };

  return (
    <div className={styles.timelineDeck}>
      {/* High-level summary console notice */}
      <div className={styles.consoleNotice}>
        <div className={styles.noticeHeader}>
          <span className={styles.blinkDot} />
          <span className={styles.noticeTitle}>INTEGRITY LOG // INTERNSHIP_SUMMARY</span>
        </div>
        <p className={styles.noticeText}>
          Successfully completed a professional <strong>Backend Developer Internship</strong> at Bits And Volts Pvt. Ltd., and engineered multiple advanced, responsive web applications specializing in <strong>MERN Stack</strong> architectures and <strong>Generative AI (Gen AI)</strong> integrations.
        </p>
      </div>

      {/* Vertical Timeline container */}
      <div className={styles.timelineContainer}>
        {/* Glowing vertical line */}
        <div className={styles.timelineLine} />

        {EXPERIENCES.map((exp, idx) => {
          const t = tilts[idx] || { x: 0, y: 0 };
          return (
            <div key={idx} className={styles.timelineItem}>
              {/* Timeline Connector node */}
              <div className={styles.timelineNode}>
                <div className={styles.nodeCore} />
                <div className={styles.nodeHalo} />
              </div>

              {/* 3D Tilting Experience Card */}
              <article
                className={styles.experienceCard}
                onMouseMove={(e) => handleMouseMove(idx, e)}
                onMouseLeave={() => handleMouseLeave(idx)}
                style={{
                  transform: `rotateX(${t.x}deg) rotateY(${t.y}deg)`,
                }}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.metaRow}>
                    <span className={styles.tagBadge}>{exp.type}</span>
                    <span className={styles.dateLabel}>{exp.duration}</span>
                  </div>
                  <h3 className={styles.roleLabel}>{exp.role}</h3>
                  <h4 className={styles.companyLabel}>{exp.company}</h4>
                </div>

                <div className={styles.bulletsWrap}>
                  <ul className={styles.bulletList}>
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className={styles.bulletItem}>
                        <span className={styles.bulletDot} />
                        <p className={styles.bulletText}>{bullet}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.techTagsRow}>
                  {exp.skills.map((skill) => (
                    <span key={skill} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExperienceCarousel;
