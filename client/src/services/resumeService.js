import API from "./api";

export const uploadResume = (formData) =>
  API.post("/api/v1/resume/upload", formData);

export const analyzeResume = (formData) =>
  API.post("/api/v1/resume/analyze", formData);

export const saveAnalysis = (formData) =>
  API.post("/api/v1/resume/upload", formData);

export const getResumeHistory = () =>
  API.get("/api/v1/resume/history");

export const deleteResume = (id) =>
  API.delete(`/api/v1/resume/${id}`);