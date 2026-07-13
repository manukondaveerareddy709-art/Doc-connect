import { GoogleGenAI, Type } from "@google/genai";
import type { JobOpening, DoctorInfo, GroundingChunk, InterviewPrep, PatientPrep } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using Omit because the ID will be added in the App component for local state management
type JobOpeningFromAPI = Omit<JobOpening, 'id'>;


export const findJobs = async (specialty: string): Promise<JobOpeningFromAPI[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find 5 fictional job openings for a medical professional specializing in "${specialty}".`,
      config: {
        systemInstruction: "You are an AI career assistant for medical professionals. Your role is to find relevant, fictional job openings based on a user's specialty. You must provide all requested details for each job in the specified format. Always respond in the requested JSON format. DO NOT use real job postings or contact details.",
        temperature: 0.8,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            jobs: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  jobTitle: { type: Type.STRING, description: "e.g., Attending Cardiologist, Pediatric Resident" },
                  specialty: { type: Type.STRING },
                  hospitalName: { type: Type.STRING },
                  location: { type: Type.STRING, description: "City, State" },
                  employmentType: { type: Type.STRING, enum: ['Full-time', 'Part-time', 'Contract', 'Residency'] },
                  salaryRange: { type: Type.STRING, description: "e.g., $250,000 - $300,000 per year" },
                  experienceRequired: { type: Type.STRING, description: "e.g., 3+ years, New graduates welcome" },
                  postedDate: { type: Type.STRING, description: "e.g., Posted 2 days ago" },
                  summary: { type: Type.STRING, description: "A compelling summary of the job." },
                  contactPerson: { type: Type.STRING, description: "Fictional hiring manager name." },
                  contactEmail: { type: Type.STRING, description: "Fictional contact email." }
                },
                required: ["jobTitle", "specialty", "hospitalName", "location", "employmentType", "salaryRange", "experienceRequired", "postedDate", "summary", "contactPerson", "contactEmail"]
              }
            }
          }
        },
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
      console.error("Gemini API returned an empty response.");
      return [];
    }
    
    // The response is a stringified JSON object with a "jobs" key
    const parsedData = JSON.parse(jsonText);

    if (!parsedData || !Array.isArray(parsedData.jobs)) {
      throw new Error("Invalid data format received from API. Expected an object with a 'jobs' array.");
    }
    
    return parsedData.jobs;

  } catch (error) {
    console.error("Error calling Gemini API or parsing response:", error);
    throw new Error("Failed to get job openings from the AI model.");
  }
};


interface FindDoctorsResult {
  specialty: string;
  doctors: Omit<DoctorInfo, 'id'>[];
  groundingChunks: GroundingChunk[];
}

export const findDoctors = async (problem: string): Promise<FindDoctorsResult> => {
  try {
    const contents = `Based on the health problem "${problem}", what medical specialty is most relevant? 
Then, find 3 fictional doctors of that specialty.
Respond with a single JSON object with two keys: "specialty" (a string), and "doctors" (an array of doctor objects).
Do not include any other text outside of this JSON object.
Each doctor object should have: "name", "specialty", "hospitalName", "location", "hospitalAddress" (full street address), "summary", "contactEmail", "education", "weeklyHoursSummary" (a concise string like "Mon, Wed, Fri | 9 AM - 5 PM"), and "availability".
The "availability" property must be a JSON object where keys are the days of the week (e.g., "Monday", "Wednesday", "Friday") and values are an array of available time slot strings in "HH:MM AM/PM" format (e.g., ["09:00 AM", "10:30 AM", "02:00 PM"]). Provide at least 3 available days for each doctor.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
          tools: [{googleSearch: {}}],
          systemInstruction: "You are an AI medical assistant. Your role is to identify a relevant medical specialty for a user's health problem and provide fictional examples of doctors in that specialty. You must use Google Search to ground your response. You must provide all requested details for each doctor in JSON format. Always respond in the requested JSON format. DO NOT use real doctor information. Your entire response must be a single JSON object and nothing else.",
          temperature: 0.7,
        }
    });


    const jsonText = response.text.trim();
    if (!jsonText) {
      console.error("Gemini API returned an empty response.");
      return { specialty: 'specialists', doctors: [], groundingChunks: [] };
    }
    
    const cleanJsonText = jsonText.replace(/^```json\s*/, '').replace(/```\s*$/, '');
    const parsedData = JSON.parse(cleanJsonText);

    if (!parsedData || !parsedData.specialty || !Array.isArray(parsedData.doctors)) {
      throw new Error("Invalid data format received from API.");
    }

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const filteredChunks = groundingChunks.filter((c: any) => c.web && c.web.uri) as GroundingChunk[];

    return {
        specialty: parsedData.specialty,
        doctors: parsedData.doctors,
        groundingChunks: filteredChunks,
    };

  } catch (error) {
    console.error("Error calling Gemini API or parsing response:", error);
    throw new Error("Failed to get doctor recommendations from the AI model.");
  }
};

export const getInterviewQuestions = async (jobTitle: string, hospitalName: string): Promise<InterviewPrep> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate interview preparation material for a medical professional applying for the role of "${jobTitle}" at "${hospitalName}".`,
            config: {
                systemInstruction: "You are an expert AI career coach for medical professionals. Your task is to generate insightful and relevant interview questions tailored to a specific job title and hospital. For each question, provide a helpful 'Pro Tip' on how to approach the answer. Always respond in the requested JSON format.",
                temperature: 0.8,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        intro: { type: Type.STRING, description: "A brief, encouraging introductory sentence." },
                        questions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    question: { type: Type.STRING, description: "A targeted interview question." },
                                    tip: { type: Type.STRING, description: "A 'Pro Tip' for answering the question effectively." }
                                },
                                required: ["question", "tip"]
                            }
                        }
                    },
                    required: ["intro", "questions"]
                },
            },
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error calling Gemini API for interview questions:", error);
        throw new Error("Failed to generate interview preparation material.");
    }
};

export const getPatientQuestions = async (healthConcern: string, specialty: string): Promise<PatientPrep> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `A patient is preparing for a visit with a ${specialty} regarding the following health concern: "${healthConcern}". Generate a list of important questions for them to ask.`,
            config: {
                systemInstruction: "You are a caring AI patient advocate. Your role is to empower patients by helping them prepare for their doctor's appointments. Generate a list of clear, important questions a patient should ask, based on their health concern and the doctor's specialty. For each question, explain why it's important to ask. Always respond in the requested JSON format.",
                temperature: 0.7,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        intro: { type: Type.STRING, description: "A brief, empowering introductory sentence about being prepared." },
                        questions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    question: { type: Type.STRING, description: "A question for the patient to ask their doctor." },
                                    importance: { type: Type.STRING, description: "An explanation of 'Why this is important'." }
                                },
                                required: ["question", "importance"]
                            }
                        }
                    },
                    required: ["intro", "questions"]
                },
            },
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error calling Gemini API for patient questions:", error);
        throw new Error("Failed to generate patient preparation material.");
    }
};