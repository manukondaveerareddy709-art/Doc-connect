import React, { useState, useMemo } from 'react';
import type { JobOpening, DoctorInfo } from '../types';

const LocationIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.1.4-.223.654-.369.879-.505 1.879-1.18 2.775-2.055l.004-.004c.897-.875 1.76-1.923 2.48-3.13l.003-.005a8.384 8.384 0 00.997-2.421 10.332 10.332 0 00.276-2.91c0-3.142-2.558-5.7-5.7-5.7s-5.7 2.558-5.7 5.7c0 1.053.284 2.05.794 2.91.243.411.517.81.82 1.196l.006.008.004.004c.897.875 1.875 1.55 2.775 2.055a13.92 13.92 0 00.935.509c.083.046.165.088.24.128.031.017.06.033.089.048l.003.002zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
  </svg>
);
const BriefcaseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.57.172 1.07.485 1.486.901l.02.022a2.25 2.25 0 012.494 3.412l-2.618 6.109A2.75 2.75 0 0113.15 16h-6.3a2.75 2.75 0 01-2.434-1.362L1.8 8.528A2.25 2.25 0 014.293 5.116l.02-.022c.416-.416.916-.73 1.486-.902V3.75zm2.75 1.5c.414 0 .75.336.75.75v.5a.75.75 0 01-1.5 0v-.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
  </svg>
);
const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zM4.5 8.25a.75.75 0 000 1.5h11a.75.75 0 000-1.5h-11z" clipRule="evenodd" />
    </svg>
);
const BuildingOfficeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M5.5 16.5a.5.5 0 01.5-.5h8a.5.5 0 010 1H6a.5.5 0 01-.5-.5z" />
      <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h13A1.5 1.5 0 0118 3.5v9.428a1.5 1.5 0 01-.732 1.3-3.499 3.499 0 00-4.536 0A1.5 1.5 0 0112 15.528V15.5a.5.5 0 00-1 0v.028a1.5 1.5 0 01-.732-1.3 3.499 3.499 0 00-4.536 0A1.5 1.5 0 013 14.214V13a.5.5 0 00-1 0v1.214a1.5 1.5 0 01-.732-1.3V3.5zM6 10a1 1 0 011-1h1a1 1 0 110 2H7a1 1 0 01-1-1zm3 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm4-1a1 1 0 100 2h1a1 1 0 100-2h-1zM6 6a1 1 0 011-1h1a1 1 0 110 2H7a1 1 0 01-1-1zm3 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm4-1a1 1 0 100 2h1a1 1 0 100-2h-1z" clipRule="evenodd" />
    </svg>
);


interface JobCardProps {
  job: JobOpening;
  onViewDetails: (job: JobOpening) => void;
}

const InfoTag: React.FC<{ icon: React.ReactNode, text: string | React.ReactNode, truncate?: boolean }> = ({ icon, text, truncate = false }) => (
  <div className={`flex items-start text-sm text-slate-500 dark:text-slate-400 ${truncate ? 'w-full' : ''}`}>
    <div className="flex-shrink-0 mt-0.5">{icon}</div>
    <span className={`ml-1.5 ${truncate ? 'truncate' : ''}`}>{text}</span>
  </div>
);


export const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start">
          <p className="text-sm font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wide">{job.hospitalName}</p>
          <span className="text-xs font-semibold bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2.5 py-1 rounded-full">{job.postedDate}</span>
        </div>
        
        <h3 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{job.jobTitle}</h3>
        
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            <InfoTag icon={<LocationIcon className="w-5 h-5"/>} text={job.location} />
            <InfoTag icon={<BriefcaseIcon className="w-5 h-5"/>} text={job.employmentType} />
            <InfoTag icon={<CalendarIcon className="w-5 h-5"/>} text={job.experienceRequired} />
        </div>

        <div className="mt-4 border-t border-slate-200 dark:border-slate-700 pt-4">
            <p className="font-semibold text-lg text-slate-800 dark:text-slate-200">{job.salaryRange}</p>
        </div>
        
      </div>
      
      <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 grid grid-cols-2 gap-4">
        <button
            onClick={() => onViewDetails(job)}
            className="w-full text-center bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-300"
        >
            View Details
        </button>
        <button
            onClick={() => {
                // In a real app, this would link out to an application page
                alert(`You have successfully applied for the ${job.jobTitle} position! (This is a simulation)`);
            }}
            className="w-full text-center bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-sky-700 transition-colors duration-300"
        >
            Apply Now
        </button>
      </div>
    </div>
  );
};

const AppointmentScheduler: React.FC<{ doctor: DoctorInfo, onCancel: () => void }> = ({ doctor, onCancel }) => {
    const [patientName, setPatientName] = useState('');
    const [patientAge, setPatientAge] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [isConfirmed, setIsConfirmed] = useState(false);
    
    const { bookableDates, dayNames, availableWeekdays } = useMemo(() => {
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const availableWeekdays = doctor.availability ? Object.keys(doctor.availability) : [];

        const upcomingDates = Array.from({ length: 14 }, (_, i) => {
            const d = new Date();
            d.setHours(0, 0, 0, 0); // Normalize date to prevent timezone issues
            d.setDate(d.getDate() + i);
            return d;
        });

        const bookableDates = upcomingDates.map(date => {
            const dayName = dayNames[date.getDay()];
            return {
                date,
                isAvailable: availableWeekdays.includes(dayName)
            };
        });
        return { bookableDates, dayNames, availableWeekdays };
    }, [doctor.availability]);

    if (isConfirmed) {
        return (
            <div className="p-4 bg-green-100 dark:bg-green-900/50 border-t border-green-200 dark:border-green-700">
                <h4 className="font-bold text-green-800 dark:text-green-200">Appointment Confirmed!</h4>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    An appointment for <span className="font-semibold">{patientName}</span> (Age: {patientAge}) has been booked with {doctor.name} on <span className="font-semibold">{selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {selectedTime}</span>.
                </p>
                 <button onClick={onCancel} className="mt-3 text-xs text-slate-500 hover:underline">Close</button>
            </div>
        )
    }

    const selectedDayName = selectedDate ? dayNames[selectedDate.getDay()] : null;

    return (
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor={`name-${doctor.id}`} className="block text-xs font-medium text-slate-600 dark:text-slate-400">Patient Name</label>
                    <input type="text" id={`name-${doctor.id}`} value={patientName} onChange={e => setPatientName(e.target.value)} placeholder="Full Name" className="mt-1 w-full text-sm p-2 bg-slate-100 dark:bg-slate-700 rounded-md border-2 border-transparent focus:border-sky-500"/>
                </div>
                 <div>
                    <label htmlFor={`age-${doctor.id}`} className="block text-xs font-medium text-slate-600 dark:text-slate-400">Patient Age</label>
                    <input type="number" id={`age-${doctor.id}`} value={patientAge} onChange={e => setPatientAge(e.target.value)} placeholder="Age" className="mt-1 w-full text-sm p-2 bg-slate-100 dark:bg-slate-700 rounded-md border-2 border-transparent focus:border-sky-500"/>
                </div>
            </div>

            {(patientName && patientAge) && (
                 <div>
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">Select a Date</p>
                    <div className="grid grid-cols-4 gap-2">
                        {bookableDates.length > 0 ? bookableDates.map(({ date, isAvailable }) => (
                            <button 
                                key={date.toISOString()} 
                                onClick={() => { setSelectedDate(date); setSelectedTime(null); }} 
                                disabled={!isAvailable}
                                className={`p-1 text-xs rounded-md flex flex-col items-center justify-center h-12 transition-colors ${
                                    selectedDate?.getTime() === date.getTime() 
                                        ? 'bg-sky-600 text-white font-semibold ring-2 ring-sky-300' 
                                        : isAvailable 
                                            ? 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600' 
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-60'
                                }`}
                            >
                                <span className="font-bold">{date.toLocaleString('en-US', { month: 'short'})}</span>
                                <span className="text-lg">{date.getDate()}</span>
                            </button>
                        )) : <p className="text-xs text-slate-500 col-span-4">No available dates found in the next 14 days.</p>}
                    </div>
                </div>
            )}
           
            {selectedDate && selectedDayName && doctor.availability[selectedDayName] && (
                 <div>
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">Select a Time for {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                    <div className="flex flex-wrap gap-2">
                        {doctor.availability[selectedDayName].map(time => (
                             <button key={time} onClick={() => setSelectedTime(time)} className={`px-3 py-1 text-sm rounded-full ${selectedTime === time ? 'bg-sky-600 text-white font-semibold' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            <button
                onClick={() => setIsConfirmed(true)}
                disabled={!patientName || !patientAge || !selectedDate || !selectedTime}
                className="w-full text-center bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-sky-700 transition-colors duration-300 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
                Confirm Appointment
            </button>
        </div>
    )
}


interface DoctorCardProps {
  doctor: DoctorInfo;
  onViewDetails: (doctor: DoctorInfo) => void;
}
export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onViewDetails }) => {
  const [isBooking, setIsBooking] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
      <div className="p-6 flex-grow">
        <p className="text-sm font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wide">{doctor.hospitalName}</p>
        <h3 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{doctor.name}</h3>
        <p className="text-md text-slate-600 dark:text-slate-400">{doctor.specialty}</p>
        
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            <InfoTag icon={<LocationIcon className="w-5 h-5"/>} text={doctor.location} />
            <InfoTag icon={<CalendarIcon className="w-5 h-5"/>} text={doctor.weeklyHoursSummary} />
            <InfoTag 
                icon={<BuildingOfficeIcon className="w-5 h-5"/>} 
                text={<span className="leading-tight">{doctor.hospitalAddress}</span>} 
                truncate={false} 
            />
        </div>
        
      </div>

      {isBooking && <AppointmentScheduler doctor={doctor} onCancel={() => setIsBooking(false)} />}
      
      <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 grid grid-cols-2 gap-4">
        <button
            onClick={() => onViewDetails(doctor)}
            className="w-full text-center bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-300"
        >
            View Details
        </button>
        <button
            onClick={() => setIsBooking(!isBooking)}
            className="w-full text-center bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-sky-700 transition-colors duration-300"
        >
            {isBooking ? 'Cancel Booking' : 'Book Appointment'}
        </button>
      </div>
    </div>
  );
};