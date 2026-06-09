import Navbar from '@/features/Navbar/Navbar';
import ScrollProgress from '@/shared/components/ScrollProgress/ScrollProgress';
import CustomCursor from '@/shared/components/Cursor/CustomCursor';
import PageTransition3D from '@/shared/components/Transition/PageTransition3D';
import styles from './MainLayout.module.scss';

const MainLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <CustomCursor />
      <ScrollProgress />
      <PageTransition3D />
      <Navbar />
      <main id="main-content" className={styles.main}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
