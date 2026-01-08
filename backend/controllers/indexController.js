import { prompt } from "../services/ai.js";
import fs from "fs/promises";
import path from "path";

async function form(req, res) {
  try {
    const job = req.body.job;
    const file = req.file;

    // Write buffer to temp file for Gemini
    const tempPath = path.join("/tmp", `resume-${Date.now()}.pdf`);
    await fs.writeFile(tempPath, file.buffer);

    const result = await prompt(job, tempPath);

    // Clean up temp file
    await fs.unlink(tempPath).catch(() => {});

    res.json({ result });
  } catch (error) {
    console.error("Error processing form:", error);
    res.status(500).json({ error: "Error processing form" });
  }
}

export default { form };