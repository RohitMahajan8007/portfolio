import ExperienceCarousel from '@/features/Experience/ExperienceCarousel';
import styles from './Work.module.scss';

const Work = () => {
  return (
    <main className={styles.workPage}>
      {/* Invisible screen reader header for SEO heading structure */}
      <h1 className="sr-only">Work Experience &amp; Professional Projects</h1>

      <div className={styles.pageInner}>
        <div className={styles.header}>
          <span className={styles.sub}>Portfolio</span>
          <h2 className={styles.title}>Work Experience</h2>
        </div>

        <ExperienceCarousel />
      </div>
    </main>
  );
};

export default Work;
