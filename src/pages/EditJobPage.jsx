import { useParams, useNavigate } from "react-router-dom";
import JobForm from "../components/JobForm";

export default function EditJobPage({ getJob, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = getJob(id);

  if (!job) {
    return (
      <div className="flex-1 flex items-center justify-center text-center px-4 py-20 animate-fade-in-up">
        <div>
          <svg className="w-16 h-16 mx-auto mb-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <h2 className="text-2xl font-bold text-white mb-2">Job Not Found</h2>
          <p className="text-slate-400 mb-6">The job you&apos;re trying to edit doesn&apos;t exist.</p>
          <button onClick={() => navigate("/jobs")} className="px-6 py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all duration-300 cursor-pointer">Back to Jobs</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Edit <span className="bg-gradient-to-r from-sky-400 to-blue-300 bg-clip-text text-transparent">Job</span>
        </h1>
        <p className="text-slate-400">Update the details for <span className="text-white font-medium">{job.title}</span>.</p>
      </div>
      <div className="rounded-2xl border border-blue-500/15 bg-slate-800/50 backdrop-blur-md p-6 sm:p-8">
        <JobForm existingJob={job} onSubmit={(data) => onUpdate(id, data)} />
      </div>
    </div>
  );
}
