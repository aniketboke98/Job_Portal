import { Link } from "react-router-dom";

/**
 * Renders a single job as an attractive card with glassmorphism styling.
 * Provides View, Edit, Delete, and Apply actions.
 */
export default function JobCard({ job, onDelete, index = 0 }) {
  // Color map for industry badges
  const industryColors = {
    "Information Technology": "from-blue-500/20 to-cyan-500/20 text-cyan-300 border-cyan-500/30",
    "Finance & Banking": "from-emerald-500/20 to-green-500/20 text-emerald-300 border-emerald-500/30",
    "Design & Creative": "from-pink-500/20 to-rose-500/20 text-pink-300 border-pink-500/30",
    "Marketing & Advertising": "from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30",
    "Healthcare": "from-red-500/20 to-rose-500/20 text-red-300 border-red-500/30",
    "Education": "from-violet-500/20 to-purple-500/20 text-violet-300 border-violet-500/30",
  };

  const badgeClass =
    industryColors[job.industry] ||
    "from-primary-500/20 to-indigo-500/20 text-primary-300 border-primary-500/30";

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
      className={`animate-fade-in-up group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:bg-white/10 hover:border-primary-500/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-500/10`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Decorative gradient orb */}
      <div className="absolute -top-px -right-px w-24 h-24 bg-gradient-to-br from-primary-500/20 to-transparent rounded-tr-2xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Industry badge */}
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border bg-gradient-to-r ${badgeClass} mb-4`}
      >
        {job.industry}
      </span>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors duration-300">
        {job.title}
      </h3>

      {/* Details grid */}
      <div className="space-y-2.5 mb-5">
        <div className="flex items-center gap-2 text-sm text-surface-200">
          <svg className="w-4 h-4 text-accent-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
          <span className="font-medium text-white/90">{job.payscale}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-surface-200">
          <svg className="w-4 h-4 text-primary-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>{job.experience} {job.experience === 1 ? "year" : "years"} experience</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-surface-200">
          <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Join by {new Date(job.joiningDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
        <Link
          to={`/jobs/${job.id}`}
          id={`view-job-${job.id}`}
          className="flex-1 min-w-[70px] text-center px-3 py-2 rounded-lg text-xs font-semibold bg-primary-600/20 text-primary-300 border border-primary-500/30 hover:bg-primary-600/40 transition-all duration-300"
        >
          View
        </Link>
        <Link
          to={`/jobs/${job.id}/edit`}
          id={`edit-job-${job.id}`}
          className="flex-1 min-w-[70px] text-center px-3 py-2 rounded-lg text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/40 transition-all duration-300"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          id={`delete-job-${job.id}`}
          className="flex-1 min-w-[70px] px-3 py-2 rounded-lg text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/40 transition-all duration-300 cursor-pointer"
        >
          Delete
        </button>
        <button
          onClick={handleApply}
          id={`apply-job-${job.id}`}
          className="flex-1 min-w-[70px] px-3 py-2 rounded-lg text-xs font-semibold bg-accent-500/20 text-accent-400 border border-accent-500/30 hover:bg-accent-500/40 transition-all duration-300 cursor-pointer"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
