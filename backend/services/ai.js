import "dotenv/config";
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function prompt(job, resumePath) {
  const myfile = await ai.files.upload({
    file: resumePath,
    config: { mimeType: "application/pdf" },
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: createUserContent([
      createPartFromUri(myfile.uri, myfile.mimeType),
      `Given this job description, ${job}, and my resume, please output a JSON object of the following fields:

       company name, 
       company description, 
       company industry, 
       company size, 
       company stage, 

       job name, 
       job description, 
       job qualifications, 
       job experience level, 
       job salary, 
       job team,
       job location,

       how to be of impact as "impact", 
       what the company currently needs as "company_need", 
       3 potential technical interview questions as "technical_interview_questions",
       3 questions to ask the interviewer as "interviewer_questions",
       3 stories to highlight off my resume as "higlight",
       analysis of how my skills align with the role and company as "analysis"
      `,
    ]),
  });

  const jsonString = response.text
    .replace(/^```(?:json)?\n?/, "")
    .replace(/\n?```$/, "")
    .trim();

  return JSON.parse(jsonString);
}

export { prompt };
