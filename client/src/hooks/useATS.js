import { useState } from "react";

const initialAnalysis = { atsScore: null, breakdown: {}, matched: [], missing: [], aiSuggestions: "", preview: "" };

export const useATS = () => {
  const [analysis, setAnalysis] = useState(initialAnalysis);
  return { analysis, setAnalysis, hasAnalysis: analysis.atsScore !== null };
};
