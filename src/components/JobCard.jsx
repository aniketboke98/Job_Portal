import { Link } from "react-router-dom";

export default function JobCard({ job, onDelete, index = 0 }) {
  const industryColors = {
    "Information Technology": "bg-blue-100 text-blue-700 border-blue-200",
    "Finance & Banking": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "Design & Creative": "bg-pink-100 text-pink-700 border-pink-200",
    "Marketing & Advertising": "bg-amber-100 text-amber-700 border-amber-200",
    "Healthcare": "bg-red-100 text-red-700 border-red-200",
    "Education": "bg-violet-100 text-violet-700 border-violet-200",
  };

  const badgeClass =
    industryColors[job.industry] ||
    "bg-slate-100 text-slate-700 border-slate-200";

  const handleApply = () => {
    alert(`✅ You have successfully applied for "${job.title}"!\n\nWe will get back to you soon.`);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${job.title}"?`)) {
      onDelete(job.id);
    }
  };

  return (
    <div
      id={`job-card-${job.id}`}
      className={`animate-fade-in-up group relative rounded-2xl bg-white border border-slate-200 p-6 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Industry badge */}
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${badgeClass} mb-4`}
      >
        {job.industry}
      </span>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
        {job.title}
      </h3>

      {/* Details grid */}
      <div className="space-y-2.5 mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
          <span className="font-medium text-slate-700">{job.payscale}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>{job.experience} {job.experience === 1 ? "year" : "years"} experience</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Join by {new Date(job.joiningDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
        <Link
          to={`/jobs/${job.id}`}
          id={`view-job-${job.id}`}
          className="flex-1 min-w-[70px] text-center px-3 py-2 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-200"
        >
          View
        </Link>
        <Link
          to={`/jobs/${job.id}/edit`}
          id={`edit-job-${job.id}`}
          className="flex-1 min-w-[70px] text-center px-3 py-2 rounded-lg text-xs font-bold bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors duration-200"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          id={`delete-job-${job.id}`}
          className="flex-1 min-w-[70px] px-3 py-2 rounded-lg text-xs font-bold bg-red-50 text-red-700 hover:bg-red-100 transition-colors duration-200 cursor-pointer"
        >
          Delete
        </button>
        <button
          onClick={handleApply}
          id={`apply-job-${job.id}`}
          className="flex-1 min-w-[70px] px-3 py-2 rounded-lg text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors duration-200 cursor-pointer"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
