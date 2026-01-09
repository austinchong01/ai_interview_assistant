import { useState } from "react";
import { form } from "../services/form";

function Form() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const response = await form.submit(formData);

    if (response.success) {
      console.log(response.data.result);
      setResult(response.data.result);
    }
    setLoading(false);
  };

  // Loading page
  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Analyzing Your Application
            </h2>
            <p className="text-gray-600">
              Our AI is reviewing the job description and your resume...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Results page
  if (result) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Interview Prep Report
            </h1>
            <button
              onClick={() => setResult(null)}
              className="rounded-lg px-5 py-2 bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors cursor-pointer shadow-md"
            >
              Start Over
            </button>
          </div>

          {/* Company & Job Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Company Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                Company Overview
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Company</span>
                  <p className="font-medium text-gray-800">
                    {result["company_name"]}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Industry</span>
                  <p className="font-medium text-gray-800">
                    {result["company_industry"]}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Size</span>
                  <p className="font-medium text-gray-800">
                    {result["company_size"]}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Stage</span>
                  <p className="font-medium text-gray-800">
                    {result["company_stage"]}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Description</span>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {result["company_description"]}
                  </p>
                </div>
              </div>
            </div>

            {/* Job Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                Job Overview
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Position</span>
                  <p className="font-medium text-gray-800">
                    {result["job_name"]}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">
                    Experience Level
                  </span>
                  <p className="font-medium text-gray-800">
                    {result["job_experience_level"]}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Salary</span>
                  <p className="font-medium text-green-600">
                    {result["job_salary"]}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Location</span>
                  <p className="font-medium text-gray-800">
                    {result["job_location"]}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Team</span>
                  <p className="font-medium text-gray-800">
                    {result["job_team"]}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Description</span>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {result["job_description"]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Qualifications */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Job Qualifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Required</h3>
                <ul className="space-y-2">
                  {result["job_qualifications"]?.required?.map((qual, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span className="text-blue-500 mt-1">•</span>
                      {qual}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Preferred</h3>
                <ul className="space-y-2">
                  {(
                    result["job_qualifications"]?.preferred)?.map((qual, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span className="text-green-500 mt-1">•</span>
                      {qual}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Impact & Company Need */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md p-6 border border-blue-100">
              <h2 className="text-xl font-semibold text-blue-800 mb-3">
                🎯 How You Can Make an Impact
              </h2>
              <p className="text-gray-700 leading-relaxed">{result.impact}</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-md p-6 border border-amber-100">
              <h2 className="text-xl font-semibold text-amber-800 mb-3">
                💡 What the Company Needs
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {result.company_need}
              </p>
            </div>
          </div>

          {/* Technical Interview Questions */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              🔧 Potential Technical Interview Questions
            </h2>
            <div className="space-y-4">
              {result.technical_interview_questions?.map((question, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4">
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded mb-2">
                    Question {i + 1}
                  </span>
                  <p className="text-gray-700">{question}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Questions to Ask */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              ❓ Questions to Ask the Interviewer
            </h2>
            <div className="space-y-4">
              {result.interviewer_questions?.map((question, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4">
                  <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded mb-2">
                    Question {i + 1}
                  </span>
                  <p className="text-gray-700">{question}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stories to Highlight */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              ⭐ Stories to Highlight from Your Resume
            </h2>
            <div className="space-y-4">
              {result.stories?.map((story, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100"
                >
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {story.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    {story.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {story.keywords?.map((keyword, j) => (
                      <span
                        key={j}
                        className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Button */}
          <div className="text-center mt-10">
            <button
              onClick={() => setResult(null)}
              className="rounded-lg px-8 py-3 bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors cursor-pointer shadow-md"
            >
              Analyze Another Job
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default form page
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex gap-16 items-center max-w-5xl mx-auto p-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            AI Interview Assistant
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            This is an AI assistant that will help you prepare for your upcoming
            interviews. All you need to do is paste in the job description and
            attach your resume, and then an outlined document of the company,
            position, and analysis will be shown!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col gap-4 p-8 border border-gray-200 rounded-xl bg-white/80 backdrop-blur shadow-lg"
        >
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="job" className="font-medium text-gray-700">
              Job Posting Description:
            </label>
            <textarea
              id="job"
              name="job"
              required
              className="border border-gray-300 rounded-lg p-3 w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="resume" className="font-medium text-gray-700">
              Resume (PDF):
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf"
              required
              className="file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-blue-50 file:text-blue-700 file:font-medium file:cursor-pointer hover:file:bg-blue-100"
            />
          </div>

          <button
            type="submit"
            className="mt-2 rounded-lg px-6 py-3 bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors cursor-pointer shadow-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
