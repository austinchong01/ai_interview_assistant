import { form } from "../services/form";

function Form() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const result = await form.submit(data);
    if (result.success) console.log(result.data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center mt-100">
        <label htmlFor="company">Company URL:</label>
        <input type="text" id="company" name="company" required className="border w-50"/>

        <label htmlFor="job">Job Posting URL:</label>
        <input type="text" id="job" name="job" required className="border w-50"/>

        <label htmlFor="linkedin">LinkedIn: (optional)</label>
        <input type="text" id="linkedin" name="linkedin" className="border w-50"/>

        <button type="submit" className="border w-20">Submit</button>
      </form>
    </div>
  );
}

export default Form;
