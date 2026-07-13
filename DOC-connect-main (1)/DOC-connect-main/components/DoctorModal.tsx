import React, { useState } from 'react';
import type { JobOpening, DoctorInfo, InterviewPrep, PatientPrep } from '../types';
import { getInterviewQuestions, getPatientQuestions } from '../services/geminiService';

const CloseIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const LightbulbIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6z" />
        <path fillRule="evenodd" d="M12.54 16.32a.75.75 0 01.932.516l.5 1.5a.75.75 0 01-1.464.488l-.5-1.5a.75.75 0 01.532-1.004zM4.028 16.836a.75.75 0 01.532 1.004l-.5 1.5a.75.75 0 01-1.464-.488l.5-1.5a.75.75 0 01.932-.516zM16.32 12.54a.75.75 0 011.004.532l1.5.5a.75.75 0 01-.488 1.464l-1.5-.5a.75.75 0 01-.516-1.004.75.75 0 01.004-.004zM1.17 7.46a.75.75 0 01.516-.932l1.5-.5a.75.75 0 01.488 1.464l-1.5.5a.75.75 0 01-1.004-.532z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M16.836 4.028a.75.75 0 011.004-.532l1.5.5a.75.75 0 11-.488 1.464l-1.5-.5a.75.75 0 01-.516-1.004zM3.164 4.028a.75.75 0 01.532.516l-.5 1.5a.75.75 0 01-1.464-.488l.5-1.5a.75.75 0 01.932-.516zM7.46 1.17a.75.75 0 01.932.516l.5 1.5a.75.75 0 01-1.464.488l-.5-1.5a.75.75 0 01.532-1.004zM13.072 1.686a.75.75 0 011.004-.532l1.5.5a.75.75 0 01-.488 1.464l-1.5-.5a.75.75 0 01-.516-1.004z" clipRule="evenodd" />
    </svg>
);
const ClipboardIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zM10 8a.75.75 0 01.75.75v.008a.75.75 0 01-1.5 0V8.75A.75.75 0 0110 8zm0 3a.75.75 0 01.75.75v.008a.75.75 0 01-1.5 0V11.75A.75.75 0 0110 11.75z" clipRule="evenodd" />
        <path d="M12.5 2.25a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5a.75.75 0 01.75-.75z" />
    </svg>
);

const AIPanelSpinner: React.FC = () => (
    <div className="flex items-center justify-center p-6">
        <svg className="animate-spin h-6 w-6 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="ml-3 text-slate-500 dark:text-slate-400">AI is thinking...</span>
    </div>
);


interface JobModalProps {
  job: JobOpening | null;
  onClose: () => void;
}
export const JobModal: React.FC<JobModalProps> = ({ job, onClose }) => {
  const [interviewPrep, setInterviewPrep] = useState<InterviewPrep | null>(null);
  const [isPrepLoading, setIsPrepLoading] = useState(false);
  const [prepError, setPrepError] = useState<string | null>(null);

  if (!job) return null;

  const handleGetInterviewPrep = async () => {
    if (!job) return;
    setIsPrepLoading(true);
    setPrepError(null);
    setInterviewPrep(null);
    try {
      const prep = await getInterviewQuestions(job.jobTitle, job.hospitalName);
      setInterviewPrep(prep);
    } catch (error) {
      setPrepError("Sorry, the AI coach couldn't generate tips right now. Please try again later.");
    } finally {
      setIsPrepLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="job-modal-title">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-6 sm:p-8 flex-shrink-0">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wide">{job.hospitalName}</p>
                    <h2 id="job-modal-title" className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{job.jobTitle}</h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">{job.location}</p>
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" aria-label="Close modal">
                    <CloseIcon className="h-7 w-7" />
                </button>
            </div>
        </div>

        <div className="px-6 sm:px-8 pb-6 space-y-6 overflow-y-auto">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Job Summary</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400 whitespace-pre-wrap">{job.summary}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Key Details</h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Salary Range</p>
                      <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{job.salaryRange}</p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Experience Required</p>
                      <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{job.experienceRequired}</p>
                  </div>
              </div>
            </div>
             <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Contact Information</h3>
              <div className="mt-2 bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{job.contactPerson}</p>
                  <a href={`mailto:${job.contactEmail}`} className="text-sky-600 dark:text-sky-400 hover:underline">{job.contactEmail}</a>
              </div>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Ace Your Interview</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Get personalized interview questions and tips from our AI to help you land this job.</p>
                <button onClick={handleGetInterviewPrep} disabled={isPrepLoading} className="mt-4 inline-flex items-center justify-center bg-amber-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed">
                    <LightbulbIcon className="w-5 h-5 mr-2"/>
                    AI Interview Coach
                </button>
                {isPrepLoading && <AIPanelSpinner />}
                {prepError && <p className="mt-4 text-sm text-red-500">{prepError}</p>}
                {interviewPrep && (
                    <div className="mt-4 space-y-4 p-4 bg-slate-100 dark:bg-slate-900/50 rounded-lg">
                        <p className="text-sm text-slate-600 dark:text-slate-300 italic">{interviewPrep.intro}</p>
                        {interviewPrep.questions.map((q, index) => (
                            <div key={index} className="border-t border-slate-200 dark:border-slate-700 pt-3">
                                <p className="font-semibold text-slate-800 dark:text-slate-200">{q.question}</p>
                                <p className="mt-1 text-xs text-amber-700 dark:text-amber-400"><span className="font-bold">Pro Tip:</span> {q.tip}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 px-6 sm:px-8 py-4 text-right mt-auto flex-shrink-0">
             <button onClick={() => { alert(`You have successfully applied for the ${job.jobTitle} position! (This is a simulation)`); onClose(); }} className="bg-sky-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-sky-700 transition-colors duration-300">
                Apply Now
            </button>
        </div>
      </div>
    </div>
  );
};


interface DoctorModalProps {
  doctor: DoctorInfo | null;
  onClose: () => void;
  healthConcern: string;
}
export const DoctorModal: React.FC<DoctorModalProps> = ({ doctor, onClose, healthConcern }) => {
  const [patientPrep, setPatientPrep] = useState<PatientPrep | null>(null);
  const [isPrepLoading, setIsPrepLoading] = useState(false);
  const [prepError, setPrepError] = useState<string | null>(null);

  if (!doctor) return null;

  const handleGetPatientPrep = async () => {
    if (!doctor) return;
    setIsPrepLoading(true);
    setPrepError(null);
    setPatientPrep(null);
    try {
        const prep = await getPatientQuestions(healthConcern, doctor.specialty);
        setPatientPrep(prep);
    } catch (error) {
        setPrepError("Sorry, the AI advocate couldn't generate questions right now. Please try again later.");
    } finally {
        setIsPrepLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="doctor-modal-title">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-6 sm:p-8 flex-shrink-0">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wide">{doctor.hospitalName}</p>
                    <h2 id="doctor-modal-title" className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{doctor.name}</h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">{doctor.location} - <span className="font-semibold">{doctor.specialty}</span></p>
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" aria-label="Close modal">
                    <CloseIcon className="h-7 w-7" />
                </button>
            </div>
        </div>

        <div className="px-6 sm:px-8 pb-6 space-y-6 overflow-y-auto">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Doctor Summary</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400 whitespace-pre-wrap">{doctor.summary}</p>
            </div>
             <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Hospital Address</h3>
               <div className="mt-2 bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{doctor.hospitalAddress}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Education</h3>
               <div className="mt-2 bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{doctor.education}</p>
              </div>
            </div>
             <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Contact Information</h3>
              <div className="mt-2 bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{doctor.name}</p>
                  <a href={`mailto:${doctor.contactEmail}`} className="text-sky-600 dark:text-sky-400 hover:underline">{doctor.contactEmail}</a>
              </div>
            </div>
             <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Be Prepared for Your Visit</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Our AI can help you create a list of important questions to ask your doctor based on your initial concern.</p>
                <button onClick={handleGetPatientPrep} disabled={isPrepLoading || !healthConcern} className="mt-4 inline-flex items-center justify-center bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed">
                    <ClipboardIcon className="w-5 h-5 mr-2"/>
                    Prepare for Your Visit
                </button>
                {!healthConcern && <p className="text-xs text-slate-400 mt-2">Enter a health concern in the search bar to enable this feature.</p>}
                {isPrepLoading && <AIPanelSpinner />}
                {prepError && <p className="mt-4 text-sm text-red-500">{prepError}</p>}
                {patientPrep && (
                    <div className="mt-4 space-y-4 p-4 bg-slate-100 dark:bg-slate-900/50 rounded-lg">
                        <p className="text-sm text-slate-600 dark:text-slate-300 italic">{patientPrep.intro}</p>
                        {patientPrep.questions.map((q, index) => (
                            <div key={index} className="border-t border-slate-200 dark:border-slate-700 pt-3">
                                <p className="font-semibold text-slate-800 dark:text-slate-200">{q.question}</p>
                                <p className="mt-1 text-xs text-teal-700 dark:text-teal-400"><span className="font-bold">Why it's important:</span> {q.importance}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

         <div className="bg-slate-50 dark:bg-slate-800/50 px-6 sm:px-8 py-4 text-right mt-auto flex-shrink-0">
             <a href={`mailto:${doctor.contactEmail}`} className="bg-sky-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-sky-700 transition-colors duration-300">
                Contact Now
            </a>
        </div>
      </div>
    </div>
  );
};