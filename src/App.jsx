import { useState } from 'react';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { SmoothScrollProvider } from '@/app/providers/SmoothScrollProvider';
import AppRouter from '@/app/routes/AppRouter';
import PageLoader from '@/shared/components/Loader/PageLoader';
import '@/shared/styles/global.scss';

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        {loading && <PageLoader onComplete={() => setLoading(false)} />}
        {!loading && <AppRouter />}
      </SmoothScrollProvider>
    </ThemeProvider>
  );
};

export default App;
