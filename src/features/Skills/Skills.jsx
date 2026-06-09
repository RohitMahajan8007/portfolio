import { useState } from 'react';
import styles from './Skills.module.scss';

const SKILL_CATEGORIES = [
  {
    id: 'frontend',
    label: 'Frontend Development',
    color: '#00f0ff',
    icon: '⚡',
    skills: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'SCSS', 'Redux Toolkit', 'Context API'],
  },
  {
    id: 'backend',
    label: 'Backend Architecture',
    color: '#bd00ff',
    icon: '🔧',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT', 'OAuth', 'WebSocket'],
  },
  {
    id: 'database',
    label: 'Database Systems',
    color: '#ff007a',
    icon: '🗄️',
    skills: ['MongoDB', 'Mongoose', 'Aggregation Queries', 'Schema Indexing'],
  },
  {
    id: 'ai',
    label: 'AI Integrations',
    color: '#00f0ff',
    icon: '🤖',
    skills: ['OpenAI API', 'RAG Structures', 'AI Chatbots', 'Gemini API', 'Mistral Models'],
  },
  {
    id: 'tools',
    label: 'DevTools & Cloud',
    color: '#bd00ff',
    icon: '🛠️',
    skills: ['Git', 'GitHub', 'Postman', 'Render Platform', 'Vercel Deploy'],
  },
];

const Skills = () => {
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
        x: parseFloat(((centerY - y) / 6).toFixed(2)),
        y: parseFloat(((x - centerX) / 6).toFixed(2)),
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
    <div className={styles.skillsSection}>
      <div className={styles.header}>
        <span className={styles.sub}>Stack</span>
        <h2 className={styles.title}>Skills &amp; Technologies</h2>
      </div>

      {/* 3D Tilting Cards Grid */}
      <div className={styles.grid}>
        {SKILL_CATEGORIES.map((cat, idx) => {
          const t = tilts[idx] || { x: 0, y: 0 };
          return (
            <article
              key={cat.id}
              className={styles.card}
              onMouseMove={(e) => handleMouseMove(idx, e)}
              onMouseLeave={() => handleMouseLeave(idx)}
              style={{
                transform: `rotateX(${t.x}deg) rotateY(${t.y}deg)`,
                '--glow-color': cat.color,
              }}
            >
              {/* Internal elements floating with translateZ */}
              <div className={styles.cardHead}>
                <span className={styles.cardIcon}>{cat.icon}</span>
                <div>
                  <h3 className={styles.cardTitle}>{cat.label}</h3>
                  <span className={styles.cardCount}>{cat.skills.length} parameters</span>
                </div>
              </div>

              <div className={styles.cardDivider} />

              <ul className={styles.skillList}>
                {cat.skills.map((skill) => (
                  <li key={skill} className={styles.skillItem}>
                    <span className={styles.skillDot} style={{ background: cat.color }} />
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
