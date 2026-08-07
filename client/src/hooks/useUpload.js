import { useState } from "react";
import toast from "react-hot-toast";
import { analyzeResume } from "../services/resumeService";

export const useUpload = ({ onSuccess, submitAnalysis = analyzeResume }) => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const upload = async () => {
    if (!file) {
      toast.error("Please upload a resume first.");
      return;
    }
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);
    try {
      setIsUploading(true);
      const res = await submitAnalysis(formData);
      const analysis = res.data.data;
      onSuccess(analysis);
      toast.success("Your resume analysis is ready.");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return { file, setFile, jobDescription, setJobDescription, isUploading, upload };
};
