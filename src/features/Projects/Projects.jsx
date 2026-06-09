import { useState } from 'react';
import styles from './Projects.module.scss';

const PROJECTS = [
  {
    id: 'perplexity-clone',
    num: '01',
    title: 'Perplexity Clone',
    subtitle: 'AI-Powered Search Engine',
    description:
      'A full-stack AI search engine and chat application inspired by Perplexity.ai. Integrates multiple LLMs (OpenAI, Gemini, Mistral) with Retrieval-Augmented Generation (RAG) for accurate responses.',
    tags: ['MERN Stack', 'OpenAI', 'Gemini', 'Mistral', 'RAG', 'JWT', 'Redux Toolkit', 'MongoDB'],
    liveUrl: 'https://perplexity-hiru.onrender.com/',
    githubUrl: 'https://github.com/RohitMahajan8007',
    color: '#00f0ff',
  },
  {
    id: 'web-monitor',
    num: '02',
    title: 'Web Monitor',
    subtitle: 'Real-Time Monitoring Dashboard',
    description:
      'A modern web monitoring dashboard providing clarity before chaos. Features real-time status trackers, responsive graphs, REST API integrations, and a premium glassmorphic UI.',
    tags: ['React.js', 'Dashboard', 'Monitoring', 'REST APIs', 'MongoDB', 'Responsive'],
    liveUrl: 'https://web-monitor-jlab.onrender.com/',
    githubUrl: 'https://github.com/RohitMahajan8007',
    color: '#bd00ff',
  },
];

const Projects = () => {
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
        x: parseFloat(((centerY - y) / 10).toFixed(2)),
        y: parseFloat(((x - centerX) / 10).toFixed(2)),
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
    <div className={styles.projectsSection}>
      <div className={styles.header}>
        <span className={styles.sub}>Releases</span>
        <h2 className={styles.title}>Featured Projects</h2>
      </div>

      <div className={styles.deck}>
        {PROJECTS.map((project, idx) => {
          const t = tilts[idx] || { x: 0, y: 0 };
          return (
            <article
              key={project.id}
              className={styles.card}
              onMouseMove={(e) => handleMouseMove(idx, e)}
              onMouseLeave={() => handleMouseLeave(idx)}
              style={{
                transform: `rotateX(${t.x}deg) rotateY(${t.y}deg)`,
                '--glow-color': project.color,
              }}
            >
              {/* Card numbering */}
              <span className={styles.cardNumber}>{project.num}</span>

              {/* Card content layers */}
              <div className={styles.cardContent}>
                <span className={styles.subtitle}>{project.subtitle}</span>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>

                {/* Tech tag list */}
                <div className={styles.tagsRow}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className={styles.actions}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnLive}
                  style={{ '--btn-color': project.color }}
                >
                  Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnGithub}
                >
                  GitHub
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
