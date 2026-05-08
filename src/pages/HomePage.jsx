import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Hero Section */}
      <section id="hero" className="relative flex flex-col items-center justify-center text-center px-4 py-20 sm:py-32 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="relative z-10 max-w-3xl animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-sm font-semibold mb-8">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Your next career move starts here
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
            Find Your{" "}
            <span className="text-blue-600">
              Dream Job
            </span>{" "}
            Today
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-xl mx-auto mb-10 leading-relaxed">
            Browse top opportunities across industries, post job openings, and manage your listings — all in one friendly portal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/jobs" id="hero-browse-btn" className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Browse Jobs
            </Link>
            <Link to="/jobs/new" id="hero-post-btn" className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-slate-700 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5 transition-all duration-200 shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Post a Job
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="px-4 pb-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { value: "500+", label: "Active Jobs", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01", color: "text-blue-600", bg: "bg-blue-100" },
            { value: "120+", label: "Companies", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", color: "text-emerald-600", bg: "bg-emerald-100" },
            { value: "10K+", label: "Applications", icon: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8", color: "text-purple-600", bg: "bg-purple-100" },
          ].map((stat, i) => (
            <div key={stat.label} className="animate-fade-in-up rounded-2xl bg-white border border-slate-100 shadow-sm p-6 text-center hover:shadow-md transition-shadow duration-300" style={{ animationDelay: `${0.2 + i * 0.15}s` }}>
              <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl ${stat.bg} flex items-center justify-center`}>
                <svg className={`w-7 h-7 ${stat.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} /></svg>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
