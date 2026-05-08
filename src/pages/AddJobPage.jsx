import JobForm from "../components/JobForm";

export default function AddJobPage({ onAdd }) {
  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <div className="mb-8 animate-fade-in-up text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
          Post a <span className="text-blue-600">New Job</span>
        </h1>
        <p className="text-slate-600 font-medium">Fill in the details below to create a new listing.</p>
      </div>
      <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <JobForm onSubmit={onAdd} />
      </div>
    </div>
  );
}
