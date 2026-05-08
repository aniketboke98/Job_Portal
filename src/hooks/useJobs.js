import { useState, useEffect, useCallback } from "react";

const API_URL = "http://localhost:3000/jobs";

/**
 * Custom hook — full CRUD via JSON Server REST API.
 */
export default function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH all jobs on mount
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

  // CREATE
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

  // READ single
  const getJob = useCallback(
    (id) => jobs.find((j) => j.id === Number(id)),
    [jobs]
  );

  // UPDATE
  const updateJob = useCallback(async (id, updatedFields) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });
      const updated = await res.json();
      setJobs((prev) =>
        prev.map((j) => (j.id === Number(id) ? updated : j))
      );
    } catch (err) {
      console.error("Failed to update job:", err);
    }
  }, []);

  // DELETE
  const deleteJob = useCallback(async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setJobs((prev) => prev.filter((j) => j.id !== Number(id)));
    } catch (err) {
      console.error("Failed to delete job:", err);
    }
  }, []);

  return { jobs, loading, addJob, getJob, updateJob, deleteJob };
}
