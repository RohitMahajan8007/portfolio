import ExperienceCarousel from './ExperienceCarousel';
import styles from './Experience.module.scss';

const Experience = () => {
  return (
    <section id="experience" className={styles.experienceSection}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.sub}>Chronology</span>
          <h2 className={styles.title}>Professional History</h2>
        </div>
        
        <ExperienceCarousel />
      </div>
    </section>
  );
};

export default Experience;
