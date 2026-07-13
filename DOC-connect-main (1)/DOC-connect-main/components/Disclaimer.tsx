import React from 'react';

interface DisclaimerProps {
    mode: 'careers' | 'patients';
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ mode }) => {
  const careersText = "DocConnect Careers is a prototype demonstration. The job openings, hospitals, salaries, and contact information generated are fictional. This platform does not represent real job listings.";
  const patientsText = "DocConnect AI is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. The specialists and institutions suggested are fictional. Always seek the advice of a qualified health provider with any questions you may have regarding a medical condition.";
    
  return (
    <div className="max-w-4xl mx-auto mt-16 text-center text-xs text-slate-400 dark:text-slate-500 px-4 py-8 border-t border-slate-200 dark:border-slate-700">
      <p className="font-bold">Important Disclaimer</p>
      <p className="mt-1">
        {mode === 'careers' ? careersText : patientsText}
      </p>
    </div>
  );
};
