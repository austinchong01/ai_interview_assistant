import { prompt } from "../services/ai.js";

async function form(req, res) {
  try {
    const { job } = req.body;

    const result = prompt(job);
    
    res.json({result});
  } catch (error) {
    console.error('Error fetching people:', error);
    res.status(500).send('Error fetching test');
  }
}

export default { form };