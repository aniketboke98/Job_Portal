import { useParams, useNavigate } from "react-router-dom";
import JobForm from "../components/JobForm";

export default function EditJobPage({ getJob, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = getJob(id);

  if (!job) {
    return (
      <div className="flex-1 flex items-center justify-center text-center px-4 py-20 animate-fade-in-up">
        <div className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm max-w-md w-full">
          <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Job Not Found</h2>
          <p className="text-slate-500 mb-6">The job you&apos;re trying to edit doesn&apos;t exist.</p>
          <button onClick={() => navigate("/jobs")} className="px-6 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-sm cursor-pointer">Back to Jobs</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <div className="mb-8 animate-fade-in-up text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
          Edit <span className="text-blue-600">Job</span>
        </h1>
        <p className="text-slate-600 font-medium">Update the details for <span className="text-slate-800 font-bold">{job.title}</span>.</p>
      </div>
      <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <JobForm existingJob={job} onSubmit={(data) => onUpdate(id, data)} />
      </div>
    </div>
  );
}
