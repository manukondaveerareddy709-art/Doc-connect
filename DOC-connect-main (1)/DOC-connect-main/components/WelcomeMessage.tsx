import React from 'react';

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
);

interface WelcomeMessageProps {
    mode: 'careers' | 'patients';
}

const CareersWelcome: React.FC = () => (
    <>
        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Your Next Career Move Awaits</h3>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Enter your specialty in the search bar above to begin your journey.</p>
        <ul className="mt-6 space-y-3 text-left max-w-sm mx-auto">
            <li className="flex items-start">
                <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-300">Discover relevant job openings with our intelligent AI.</span>
            </li>
            <li className="flex items-start">
                <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-300">Explore opportunities at top-tier (fictional) hospitals.</span>
            </li>
            <li className="flex items-start">
                <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-300">Get detailed insights into salary, experience, and more.</span>
            </li>
        </ul>
    </>
);

const PatientsWelcome: React.FC = () => (
    <>
        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Get Connected to the Right Care</h3>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Describe your symptoms in the search bar above to get started.</p>
        <ul className="mt-6 space-y-3 text-left max-w-sm mx-auto">
            <li className="flex items-start">
                <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-300">Our AI identifies the most relevant medical specialty.</span>
            </li>
            <li className="flex items-start">
                <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-300">View examples of (fictional) highly-rated specialists.</span>
            </li>
            <li className="flex items-start">
                <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-300">See real-world sources used by our AI to build trust.</span>
            </li>
        </ul>
    </>
);


export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ mode }) => {
  return (
    <div className="text-center py-10 px-6 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
        {mode === 'careers' ? <CareersWelcome /> : <PatientsWelcome />}
    </div>
  );
};
