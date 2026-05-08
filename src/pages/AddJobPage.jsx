import JobForm from "../components/JobForm";

export default function AddJobPage({ onAdd }) {
  return (
    <div className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Post a <span className="bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">New Job</span>
        </h1>
        <p className="text-slate-400">Fill in the details below to create a new listing.</p>
      </div>
      <div className="rounded-2xl border border-blue-500/15 bg-slate-800/50 backdrop-blur-md p-6 sm:p-8">
        <JobForm onSubmit={onAdd} />
      </div>
    </div>
  );
}
