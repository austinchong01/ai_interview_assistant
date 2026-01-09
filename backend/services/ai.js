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

       company_name, 
       company_description in 3 bullet points, 
       company_industry, 
       company_size, 
       company_stage, 

       job_name, 
       job_description in 3 bullet points, 
       job_qualifications as an array with elements "required" and "preferred", 
       job_experience_level, 
       job_salary, 
       job_team,
       job_location,

       how to be of impact in 3 bullet points and label this as "impact", 
       what the company currently needs in 3 bullet points and label this as "company_need", 
       3 potential technical interview questions as "technical_interview_questions",
       3 questions to ask the interviewer as "interviewer_questions",
       an array of 3 objects to highlight stories off of my resume that align with the job; 
       each with properties "title" and "description"; this entire object would be
       labeled as "stories",
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
