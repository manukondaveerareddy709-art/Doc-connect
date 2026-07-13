export interface JobOpening {
  id: string;
  jobTitle: string;
  specialty: string;
  hospitalName: string;
  location: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Residency';
  salaryRange: string;
  experienceRequired: string;
  postedDate: string; // e.g., "Posted 2 days ago"
  summary: string;
  contactPerson: string;
  contactEmail: string;
}

export interface DoctorInfo {
  id: string;
  name: string;
  specialty: string;
  hospitalName:string;
  location: string;
  hospitalAddress: string;
  summary: string;
  contactEmail: string;
  education: string;
  weeklyHoursSummary: string; // e.g., "Mon, Wed, Fri | 9 AM - 5 PM"
  availability: {
      [day: string]: string[];
  };
}

export interface GroundingChunk {
  web: {
    uri: string;
    title: string;
  };
}

export interface QuestionTip {
  question: string;
  tip: string;
}

export interface InterviewPrep {
  intro: string;
  questions: QuestionTip[];
}

export interface PatientPrep {
  intro: string;
  questions: {
    question: string;
    importance: string;
  }[];
}