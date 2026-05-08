import { useState, useMemo } from "react";
import JobCard from "../components/JobCard";

export default function JobListPage({ jobs, loading, onDelete }) {
  const [search, setSearch] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("All");

  const industries = useMemo(() => ["All", ...new Set(jobs.map((j) => j.industry))], [jobs]);

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchSearch = job.title.toLowerCase().includes(search.toLowerCase()) || job.industry.toLowerCase().includes(search.toLowerCase());
      const matchIndustry = filterIndustry === "All" || job.industry === filterIndustry;
      return matchSearch && matchIndustry;
    });
  }, [jobs, search, filterIndustry]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center animate-fade-in-up">
          <svg className="w-12 h-12 mx-auto mb-4 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-slate-600 font-medium">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
          Browse <span className="text-blue-600">Jobs</span>
        </h1>
        <p className="text-slate-600 font-medium">{filtered.length} {filtered.length === 1 ? "position" : "positions"} available</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <div className="relative flex-1">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" id="search-jobs" placeholder="Search by title or industry..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-300" />
        </div>
        <select id="filter-industry" value={filterIndustry} onChange={(e) => setFilterIndustry(e.target.value)} className="px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-300 cursor-pointer">
          {industries.map((ind) => (<option key={ind} value={ind}>{ind}</option>))}
        </select>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((job, i) => (<JobCard key={job.id} job={job} onDelete={onDelete} index={i} />))}
        </div>
      ) : (
        <div className="text-center py-20 animate-fade-in-up bg-white rounded-2xl border border-slate-100 shadow-sm">
          <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">No Jobs Found</h2>
          <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}
