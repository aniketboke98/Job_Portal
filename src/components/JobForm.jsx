import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const INDUSTRIES = [
  "Information Technology",
  "Finance & Banking",
  "Design & Creative",
  "Marketing & Advertising",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Retail",
  "Other",
];

export default function JobForm({ existingJob, onSubmit }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    industry: INDUSTRIES[0],
    payscale: "",
    experience: "",
    joiningDate: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingJob) {
      setFormData({
        title: existingJob.title,
        industry: existingJob.industry,
        payscale: existingJob.payscale,
        experience: existingJob.experience,
        joiningDate: existingJob.joiningDate,
      });
    }
  }, [existingJob]);

  const validate = () => {
    const e = {};
    if (!formData.title.trim()) e.title = "Job title is required";
    if (!formData.payscale.trim()) e.payscale = "Payscale is required";
    if (formData.experience === "" || Number(formData.experience) < 0) e.experience = "Valid experience is required";
    if (!formData.joiningDate) e.joiningDate = "Joining date is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...formData, experience: Number(formData.experience) });
    navigate("/jobs");
  };

  const ic = (field) =>
    `w-full px-4 py-3 rounded-xl bg-slate-800/60 border ${errors[field] ? "border-red-500/60" : "border-blue-500/20"} text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300`;

  return (
    <form onSubmit={handleSubmit} id="job-form" className="space-y-6 animate-fade-in-up">
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-slate-300 mb-2">Job Title *</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Senior React Developer" className={ic("title")} />
        {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="industry" className="block text-sm font-semibold text-slate-300 mb-2">Industry *</label>
        <select id="industry" name="industry" value={formData.industry} onChange={handleChange} className={`${ic("industry")} cursor-pointer`}>
          {INDUSTRIES.map((ind) => (<option key={ind} value={ind} className="bg-slate-900 text-white">{ind}</option>))}
        </select>
      </div>
      <div>
        <label htmlFor="payscale" className="block text-sm font-semibold text-slate-300 mb-2">Payscale *</label>
        <input type="text" id="payscale" name="payscale" value={formData.payscale} onChange={handleChange} placeholder="e.g. ₹8,00,000 - ₹12,00,000" className={ic("payscale")} />
        {errors.payscale && <p className="mt-1 text-xs text-red-400">{errors.payscale}</p>}
      </div>
      <div>
        <label htmlFor="experience" className="block text-sm font-semibold text-slate-300 mb-2">Experience Required (years) *</label>
        <input type="number" id="experience" name="experience" value={formData.experience} onChange={handleChange} min="0" max="50" placeholder="e.g. 3" className={ic("experience")} />
        {errors.experience && <p className="mt-1 text-xs text-red-400">{errors.experience}</p>}
      </div>
      <div>
        <label htmlFor="joiningDate" className="block text-sm font-semibold text-slate-300 mb-2">Expected Joining Date *</label>
        <input type="date" id="joiningDate" name="joiningDate" value={formData.joiningDate} onChange={handleChange} className={ic("joiningDate")} />
        {errors.joiningDate && <p className="mt-1 text-xs text-red-400">{errors.joiningDate}</p>}
      </div>
      <div className="flex gap-4 pt-4">
        <button type="submit" id="submit-job-btn" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-sky-500 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 cursor-pointer">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={existingJob ? "M5 13l4 4L19 7" : "M12 19l9 2-9-18-9 18 9-2zm0 0v-8"} /></svg>
          {existingJob ? "Update Job" : "Post Job"}
        </button>
        <button type="button" id="cancel-btn" onClick={() => navigate("/jobs")} className="flex-1 py-3 rounded-xl font-semibold text-slate-300 bg-slate-800/60 border border-blue-500/20 hover:bg-slate-700/60 transition-all duration-300 cursor-pointer">
          Cancel
        </button>
      </div>
    </form>
  );
}
