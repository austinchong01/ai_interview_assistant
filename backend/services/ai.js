import "dotenv/config";
import { GoogleGenAI, createUserContent, createPartFromUri } from "@google/genai";

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
      `Given this job description, provide me the company name, company description, 
    company industry, company size, company stage, job name, job description, job qualifications, 
    job experience level, job salary, team of the role, and location.

    Please output a JSON object, each key-value pair corresponding to the desired fields 
    I specified: ${job}
    
    Now, given the attached resume, include fields of "how to be of impact" and "what the company currently needs", give these
    two fields a label of "impact" and "company_need". Now include 3 potential technical questions from the interview and 3
    questions to ask the interviewer, include answers based off the resume and job description. Finally, include a link from Reddit, 
    Glassdoor, and Blind about interview experiences from this company.

    Please output a separate JSON object, each key-value pair corresponding to the desired fields I specified.
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
