import { useParams, useNavigate, Link } from "react-router-dom";

export default function JobDetailsPage({ getJob, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = getJob(id);

  if (!job) {
    return (
      <div className="flex-1 flex items-center justify-center text-center px-4 py-20 animate-fade-in-up">
        <div className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm max-w-md w-full">
          <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Job Not Found</h2>
          <p className="text-slate-500 mb-6">This job posting may have been removed.</p>
          <button onClick={() => navigate("/jobs")} className="px-6 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-sm cursor-pointer">Back to Jobs</button>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    alert(`You have successfully applied for "${job.title}"!\n\nWe will get back to you soon.`);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${job.title}"?`)) {
      onDelete(job.id);
      navigate("/jobs");
    }
  };

  const details = [
    { label: "Industry", value: job.industry, iconPath: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Payscale", value: job.payscale, iconPath: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1", color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Experience Required", value: `${job.experience} ${job.experience === 1 ? "year" : "years"}`, iconPath: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Expected Joining Date", value: new Date(job.joiningDate).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" }), iconPath: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", color: "text-amber-500", bg: "bg-amber-50" },
  ];

  return (
    <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-8 animate-fade-in-up">
        <Link to="/jobs" className="hover:text-blue-600 transition-colors">Jobs</Link>
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        <span className="text-slate-800 font-semibold">{job.title}</span>
      </div>

      {/* Detail card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-10 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-4">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            {job.industry}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{job.title}</h1>
        </div>

        <div className="space-y-4 mb-10">
          {details.map((d) => (
            <div key={d.label} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:bg-slate-100">
              <div className={`p-3 rounded-lg ${d.bg}`}>
                <svg className={`w-6 h-6 ${d.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d.iconPath} /></svg>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-0.5">{d.label}</p>
                <p className="text-slate-900 font-bold text-lg">{d.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button onClick={handleApply} id="detail-apply-btn" className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-blue-600 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Apply Now
          </button>
          <Link to={`/jobs/${job.id}/edit`} id="detail-edit-btn" className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-amber-700 bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            Edit
          </Link>
          <button onClick={handleDelete} id="detail-delete-btn" className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 transition-colors duration-200 cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
