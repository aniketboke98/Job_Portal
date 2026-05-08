import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import JobListPage from "./pages/JobListPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import JobDetailsPage from "./pages/JobDetailsPage";

const API_URL = "http://localhost:3000/jobs";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const addJob = useCallback(async (job) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job),
      });
      const newJob = await res.json();
      setJobs((prev) => [...prev, newJob]);
      return newJob;
    } catch (err) {
      console.error("Failed to add job:", err);
    }
  }, []);

  const getJob = useCallback(
    (id) => jobs.find((j) => String(j.id) === String(id)),
    [jobs]
  );

  const updateJob = useCallback(async (id, updatedFields) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });
      const updated = await res.json();
      setJobs((prev) =>
        prev.map((j) => (String(j.id) === String(id) ? updated : j))
      );
    } catch (err) {
      console.error("Failed to update job:", err);
    }
  }, []);

  const deleteJob = useCallback(async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setJobs((prev) => prev.filter((j) => String(j.id) !== String(id)));
    } catch (err) {
      console.error("Failed to delete job:", err);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
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
