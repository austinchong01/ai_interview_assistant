import { form } from "../services/form";

function Form() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = await form.submit(formData);
    if (result.success) console.log(result.data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center mt-100 p-8 border rounded-lg max-w-md mx-auto bg-blue-100 shadow"
      >
        <div className="flex flex-col gap-1 w-full bg-white">
          <label htmlFor="job" className="font-medium">
            Job Posting Description:
          </label>
          <textarea
            id="job"
            name="job"
            required
            className="border rounded p-2 w-full h-32 resize-none"
          />
        </div>

        <div className="flex flex-col gap-1 w-full bg-white">
          <label htmlFor="resume" className="font-medium">
            Resume (PDF):
          </label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept=".pdf"
            required
            className="file:mr-4 file:py-1 file:px-3 file:border file:rounded file:bg-gray-100 file:cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="border rounded-lg px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
