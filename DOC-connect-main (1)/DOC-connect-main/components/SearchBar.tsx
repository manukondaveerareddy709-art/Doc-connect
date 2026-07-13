import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  label: string;
  placeholder: string;
  buttonText: string;
  loadingButtonText: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSubmit, isLoading, label, placeholder, buttonText, loadingButtonText }) => {
  return (
    <form onSubmit={onSubmit} className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
      <label htmlFor="search-input" className="block text-lg font-semibold mb-3 text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <input
        id="search-input"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 text-base bg-slate-100 dark:bg-slate-700 rounded-lg border-2 border-transparent focus:border-sky-500 focus:ring-sky-500 transition-colors duration-300 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !value.trim()}
        className="mt-4 w-full flex items-center justify-center bg-sky-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800 transition-all duration-300 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {loadingButtonText}
          </>
        ) : (
          buttonText
        )}
      </button>
    </form>
  );
};
