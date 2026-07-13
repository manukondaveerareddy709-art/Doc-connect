import React, { useState, useCallback } from 'react';
import { SearchBar } from '../components/SearchBar';
import { JobCard } from '../components/DoctorCard';
import { JobModal } from '../components/DoctorModal';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Disclaimer } from '../components/Disclaimer';
import { WelcomeMessage } from '../components/WelcomeMessage';
import { findJobs } from '../services/geminiService';
import type { JobOpening } from '../types';

const CareersPage: React.FC = () => {
  const [specialty, setSpecialty] = useState('');
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!specialty.trim()) return;

    setIsLoading(true);
    setError(null);
    setJobs([]);

    try {
      const result = await findJobs(specialty);
      const jobsWithIds = result.map(job => ({
        ...job,
        id: crypto.randomUUID(),
      }));
      setJobs(jobsWithIds);
    } catch (err) {
      setError('Sorry, we encountered an issue finding job openings. Please try a different specialty.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [specialty]);

  const handleViewDetails = (job: JobOpening) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };
  
  return (
    <>
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
           <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Find Your Next Medical Career
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
              Enter your specialty, and our AI will uncover your next professional opportunity. Let's connect you with the future of healthcare.
            </p>
          </div>
          <SearchBar 
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            label="What's your medical specialty?"
            placeholder="e.g., 'Cardiology', 'Pediatric Residency', 'General Surgery'"
            buttonText="Find Jobs"
            loadingButtonText="Finding Opportunities..."
          />

          {error && <p className="text-center text-red-500 mt-6 bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">{error}</p>}
          
          <div className="mt-10">
            {isLoading ? (
              <LoadingSpinner mode="careers" />
            ) : jobs.length > 0 ? (
              <div>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 text-center mb-8">
                  Opportunities in <span className="text-sky-600 dark:text-sky-400 capitalize">{specialty}</span>
                </h2>
                <div className="grid grid-cols-1 gap-6 lg:gap-8">
                  {jobs.map((job) => (
                    <JobCard 
                      key={job.id} 
                      job={job}
                      onViewDetails={handleViewDetails} 
                    />
                  ))}
                </div>
              </div>
            ) : (
              <WelcomeMessage mode="careers" />
            )}
          </div>
        </div>
      </main>
      <Disclaimer mode="careers" />
      <JobModal job={selectedJob} onClose={handleCloseModal} />
    </>
  );
};

export default CareersPage;
