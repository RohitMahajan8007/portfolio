import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/app/layouts/MainLayout';
import Home from '@/pages/Home/index';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Fallback: direct all to home (Single Page Architecture) */}
          <Route path="*" element={<Home />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default AppRouter;
