import React, { useState, useCallback } from 'react';
import { SearchBar } from '../components/SearchBar';
import { DoctorCard } from '../components/DoctorCard';
import { DoctorModal } from '../components/DoctorModal';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Disclaimer } from '../components/Disclaimer';
import { WelcomeMessage } from '../components/WelcomeMessage';
import { Sources } from '../components/Sources';
import { findDoctors } from '../services/geminiService';
import type { DoctorInfo, GroundingChunk } from '../types';

const DoctorFinderPage: React.FC = () => {
  const [problem, setProblem] = useState('');
  const [submittedProblem, setSubmittedProblem] = useState('');
  const [doctors, setDoctors] = useState<DoctorInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorInfo | null>(null);
  const [groundingChunks, setGroundingChunks] = useState<GroundingChunk[]>([]);
  const [specialty, setSpecialty] = useState<string>('specialists');
  
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem.trim()) return;

    setIsLoading(true);
    setError(null);
    setDoctors([]);
    setGroundingChunks([]);
    setSubmittedProblem(problem);

    try {
      const result = await findDoctors(problem);
      const doctorsWithIds = result.doctors.map(doc => ({
        ...doc,
        id: crypto.randomUUID(),
      }));
      setDoctors(doctorsWithIds);
      setGroundingChunks(result.groundingChunks);
      setSpecialty(result.specialty);
    } catch (err) {
      setError('Sorry, we encountered an issue finding specialists. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [problem]);

  const handleViewDetails = (doctor: DoctorInfo) => {
    setSelectedDoctor(doctor);
  };

  const handleCloseModal = () => {
    setSelectedDoctor(null);
  };
  
  return (
    <>
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              AI-Powered Specialist Finder
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
              Simply describe your health concerns, and our intelligent assistant will suggest the right type of specialist and provide fictional examples to help you get started.
            </p>
          </div>
          <SearchBar 
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            label="How are you feeling today?"
            placeholder="e.g., 'I have a sharp pain in my chest', 'My knee has been clicking'"
            buttonText="Find Specialists"
            loadingButtonText="Analyzing..."
          />

          {error && <p className="text-center text-red-500 mt-6 bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">{error}</p>}
          
          <div className="mt-10">
            {isLoading ? (
              <LoadingSpinner mode="patients" />
            ) : doctors.length > 0 ? (
              <div>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 text-center mb-8">
                  Recommended <span className="text-sky-600 dark:text-sky-400 capitalize">{specialty}</span> for you
                </h2>
                <div className="grid grid-cols-1 gap-6 lg:gap-8">
                  {doctors.map((doctor) => (
                    <DoctorCard 
                      key={doctor.id} 
                      doctor={doctor}
                      onViewDetails={handleViewDetails} 
                    />
                  ))}
                </div>
                <Sources sources={groundingChunks} />
              </div>
            ) : (
              <WelcomeMessage mode="patients" />
            )}
          </div>
        </div>
      </main>
      <Disclaimer mode="patients" />
      <DoctorModal 
        doctor={selectedDoctor} 
        onClose={handleCloseModal} 
        healthConcern={submittedProblem}
      />
    </>
  );
};

export default DoctorFinderPage;
