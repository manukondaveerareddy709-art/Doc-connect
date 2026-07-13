import React from 'react';

interface HomePageProps {
  onNavigate: (page: 'login' | 'register') => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <main className="container mx-auto px-4 py-16 sm:py-24 text-center">
      <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        Welcome to <span className="text-sky-600 dark:text-sky-400">DocConnect AI</span>
      </h1>
      <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
        Your intelligent health assistant. Describe your symptoms, and we'll connect you with the right type of medical specialist.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => onNavigate('register')}
          className="w-full sm:w-auto bg-sky-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800 transition-all duration-300 transform hover:scale-105"
        >
          Get Started
        </button>
        <button
          onClick={() => onNavigate('login')}
          className="w-full sm:w-auto bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-3 px-8 rounded-lg text-lg hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-600 transition-all duration-300"
        >
          Login
        </button>
      </div>
    </main>
  );
};

export default HomePage;