import React, { useState } from 'react';
import { Header } from './components/Header';
import { useTheme } from './hooks/useTheme';
import CareersPage from './pages/CareersPage';
import DoctorFinderPage from './pages/DoctorFinderPage';

type AppMode = 'careers' | 'patients';

const App: React.FC = () => {
  const [theme, setTheme] = useTheme();
  const [appMode, setAppMode] = useState<AppMode>('careers');

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme as any);
  };

  const handleModeChange = (newMode: AppMode) => {
    setAppMode(newMode);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-500">
      <Header 
        theme={theme} 
        onThemeChange={handleThemeChange}
        mode={appMode}
        onModeChange={handleModeChange}
      />
      {appMode === 'careers' ? <CareersPage /> : <DoctorFinderPage />}
    </div>
  );
};

export default App;
