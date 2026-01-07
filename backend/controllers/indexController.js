import { prompt } from "../services/ai.js";

async function form(req, res) {
  try {
    const { company, job, linkedin } = req.body;

    // send company website to AI
    // send job posting to AI

    // if (linkedin) //send linkedin to AI

    prompt(company, job, linkedin);
    
    res.json({test: "test success"});
  } catch (error) {
    console.error('Error fetching people:', error);
    res.status(500).send('Error fetching test');
  }
}

export { form };