import { prompt } from "../services/ai.js";
import fs from "fs/promises";
import path from "path";

const dummyJSON = {
  company_name: "Nexus AI Labs",
  company_description:
    "Nexus AI Labs builds developer tools that simplify the integration of large language models into production applications. Our flagship product is an API gateway that handles prompt management, caching, rate limiting, and observability for LLM-powered features.",
  company_industry: "Developer Tools / AI Infrastructure",
  company_size: "45 employees",
  company_stage: "Series A ($18M raised)",

  job_name: "Software Engineer, Platform",
  job_description:
    "You'll work on our core API gateway, building features that help developers ship LLM-powered applications faster. This includes designing scalable request routing, implementing caching strategies, building dashboard interfaces, and improving our SDK libraries across multiple languages.",
  job_qualifications:
    "Bachelor's degree in CS/CE or equivalent experience. Proficiency in JavaScript/TypeScript and at least one backend language. Experience with REST APIs, databases, and basic DevOps. Familiarity with React for frontend work.",
  job_experience_level: "Entry-level / New Grad",
  job_salary: "$95,000 - $115,000 + equity",
  job_team: "Platform Team (6 engineers)",
  job_location: "Remote (US) or San Francisco, CA",

  impact:
    "As an early platform engineer, you'd directly shape the developer experience for thousands of users. Your code would handle millions of API requests daily, and your input on architecture decisions would influence the product roadmap. In a team of 6, there's no hiding—every contribution matters.",

  company_need:
    "They need engineers who can move fast without sacrificing code quality. With recent funding, they're scaling from handling enterprise pilots to general availability. Key gaps include improving SDK documentation, building better observability dashboards, and reducing API latency for high-volume customers.",

  technical_interview_questions: [
    "Design a caching layer for an LLM API gateway that needs to handle cache invalidation when prompts are semantically similar but not identical. What data structures and strategies would you use?",
    "We're seeing increased latency on our PostgreSQL queries as our request logs table grows. Walk me through how you'd diagnose and address this performance issue.",
    "Write a function that implements exponential backoff with jitter for retrying failed API requests. Explain your choices for the backoff parameters.",
  ],

  interviewer_questions: [
    "What does the onboarding process look like for new engineers, and how quickly do people typically ship their first meaningful feature?",
    "How does the platform team prioritize between building new features versus addressing technical debt and reliability improvements?",
    "What's an example of a technical decision the team made recently that you're particularly proud of or learned from?",
  ],

  highlight: [
    "Google Drive Clone: Demonstrates full-stack proficiency with React, Node.js, Express, and PostgreSQL. Shows you can architect and ship a complete production application with auth, file storage, and real-time features—exactly the stack Nexus uses.",
    "QA Wolf Playwright Assessment: Proves you can write reliable automated tests and understand web automation deeply. Their SDK team needs engineers who think about edge cases and developer experience.",
    "Data Annotation AI Validation Work: You've been evaluating LLM outputs for code quality and correctness—you understand the failure modes of AI systems firsthand, which is directly relevant to building tools that make LLMs more reliable in production.",
  ],

  analysis:
    "Strong alignment. Your full-stack JavaScript/TypeScript skills match their core stack, and your Google Drive clone demonstrates you can build production systems with the same technologies they use. The PostgreSQL experience is valuable for their data layer work. Your Odin Project self-study shows the independent learning ability startups need. Gap areas: you'd benefit from brushing up on API design patterns, caching strategies, and system design fundamentals before interviews. Your interest in AI and hands-on experience evaluating LLM outputs gives you useful context that many candidates lack.",
};

async function form(req, res) {
  try {
    const job = req.body.job;
    const file = req.file;

    // Write buffer to temp file for Gemini
    const tempPath = path.join("/tmp", `resume-${Date.now()}.pdf`);
    await fs.writeFile(tempPath, file.buffer);

    const result = await prompt(job, tempPath);
    // const result = dummyJSON;

    // Clean up temp file
    await fs.unlink(tempPath).catch(() => {});

    res.json({ result });
  } catch (error) {
    console.error("Error processing form:", error);
    res.status(500).json({ error: "Error processing form" });
  }
}

export default { form };
