import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

const url = "https://apply.workable.com/tp-link-usa-corp/j/58E6207BBB/"
// const pageContent = await fetchPageContent(url);
export default async function prompt(company, job, linkedin) {
    console.log(company, job, linkedin)
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Summarize this job description in one paragraph: ${url}`,
  });
  console.log(response.text);
}
