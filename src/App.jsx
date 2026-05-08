import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import JobListPage from "./pages/JobListPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import useJobs from "./hooks/useJobs";

function App() {
  const { jobs, loading, addJob, getJob, updateJob, deleteJob } = useJobs();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobListPage jobs={jobs} loading={loading} onDelete={deleteJob} />} />
          <Route path="/jobs/new" element={<AddJobPage onAdd={addJob} />} />
          <Route path="/jobs/:id" element={<JobDetailsPage getJob={getJob} onDelete={deleteJob} />} />
          <Route path="/jobs/:id/edit" element={<EditJobPage getJob={getJob} onUpdate={updateJob} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
