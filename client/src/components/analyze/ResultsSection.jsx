import { motion } from "framer-motion";
import { Download } from "lucide-react";
import AISuggestions from "../ai/AISuggestions";
import ATSCard from "../ats/ATSCard";
import MatchedSkills from "../ats/MatchedSkills";
import MissingSkills from "../ats/MissingSkills";
import BreakdownCard from "../dashboard/BreakdownCard";
import SaveAnalysisCard from "./SaveAnalysisCard";
import ResumePreview from "../preview/ResumePreview";

const getSuggestionsContent = (analysis = {}) => {
  if (Array.isArray(analysis.recommendations) && analysis.recommendations.length > 0) {
    return analysis.recommendations.join("\n");
  }
  if (typeof analysis.aiSuggestions === "string" && analysis.aiSuggestions.trim()) {
    return analysis.aiSuggestions;
  }
  if (typeof analysis.summary === "string" && analysis.summary.trim()) {
    return analysis.summary;
  }
  return "";
};

const ResultsSection = ({
  analysis,
  isMember,
  onDownload,
  onSave,
  saving,
  resumeFile,
}) => (
  <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-sm font-semibold text-emerald-600">ANALYSIS COMPLETE</p>
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Your ATS report</h2>
      </div>
      <button
        onClick={onDownload}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
      >
        <Download size={17} />Download PDF
      </button>
    </div>
    <div className="mt-6 grid gap-5 lg:grid-cols-3">
      <ATSCard score={analysis.atsScore} />
      <MatchedSkills skills={analysis.matched} />
      <MissingSkills skills={analysis.missing} />
    </div>
    <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
      <AISuggestions content={getSuggestionsContent(analysis)} />
      <div className="space-y-5">
        <BreakdownCard breakdown={analysis.breakdown} />
        <SaveAnalysisCard isMember={isMember} onSave={onSave} saving={saving} />
      </div>
    </div>
    <div className="mt-5">
      <ResumePreview file={resumeFile} fileName={analysis.fileName} />
    </div>
  </motion.section>
);

export default ResultsSection;
