
async function form(req, res) {
  try {
    const { company, job, linkedin } = req.body;

    // send company website to AI
    // send job posting to AI

    if (linkedin) //send linkedin to AI
    
    res.json({test: "test success"});
  } catch (error) {
    console.error('Error fetching people:', error);
    res.status(500).send('Error fetching test');
  }
}

module.exports = {
  form,
};