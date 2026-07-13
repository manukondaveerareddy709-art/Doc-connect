import React from 'react';

const SunIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
);
const MoonIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
);

const StethoscopeIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-2.28a1 1 0 00-.9-1.16C8.28 8.13 8 7.23 8 6.27V5a2 2 0 012-2h4a2 2 0 012 2v1.27c0 .96-.28 1.86-.9 2.57a1 1 0 00-.9 1.16V16a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945" />
    </svg>
);

type AppMode = 'careers' | 'patients';

interface HeaderProps {
  theme: 'light' | 'dark' | 'system';
  onThemeChange: (theme: 'light' | 'dark') => void;
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
}

const NavButton: React.FC<{
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
}> = ({ isActive, onClick, children }) => {
    const baseClasses = "px-3 py-1.5 text-sm font-semibold rounded-md transition-colors duration-200";
    const activeClasses = "bg-sky-600 text-white shadow";
    const inactiveClasses = "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700";
    return (
        <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
            {children}
        </button>
    );
};


export const Header: React.FC<HeaderProps> = ({ theme, onThemeChange, mode, onModeChange }) => {
  const currentTheme = theme === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme;
  
  return (
    <header className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg sticky top-0 z-40 border-b border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <StethoscopeIcon className="h-8 w-8 text-sky-600 dark:text-sky-400" />
            <span className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              DocConnect
            </span>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <NavButton isActive={mode === 'careers'} onClick={() => onModeChange('careers')}>
                    For Professionals
                </NavButton>
                <NavButton isActive={mode === 'patients'} onClick={() => onModeChange('patients')}>
                    For Patients
                </NavButton>
            </div>
            <button
              onClick={() => onThemeChange(currentTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700 transition-colors"
              aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {currentTheme === 'dark' ? (
                <SunIcon className="h-6 w-6" />
              ) : (
                <MoonIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
