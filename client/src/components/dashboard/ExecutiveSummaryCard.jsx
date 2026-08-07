import { motion } from "framer-motion";
import {
  FileText,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

function ExecutiveSummaryCard({
  summary = "",
}) {
  const hasSummary =
    summary.trim().length > 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,.08)]"
    >
      {/* Header */}

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-50">

          <FileText
            size={28}
            className="text-blue-600"
          />

        </div>

        <div>

          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            AI Executive Report
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Executive Summary
          </h2>

        </div>

      </div>

      {/* Badges */}

      <div className="mt-6 flex flex-wrap gap-3">

        <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

          <Sparkles size={16} />

          AI Generated

        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

          <CheckCircle2 size={16} />

          Recruiter Ready

        </div>

      </div>

      {/* Summary */}

      <div className="mt-8 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6">

        <p className="leading-8 text-slate-700">

          {hasSummary
            ? summary
            : "Upload and analyze a resume to receive an AI-generated executive summary highlighting ATS compatibility, recruiter appeal, strengths, and recommended improvements."}

        </p>

      </div>

      {/* Footer */}

      <div className="mt-8 rounded-2xl bg-slate-900 p-5 text-white">

        <h3 className="font-semibold">
          Recruiter Insight
        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-300">

          This executive summary provides a concise,
          recruiter-focused overview of your resume,
          helping you quickly understand its overall
          quality, ATS readiness, and the improvements
          needed before applying for your target role.

        </p>

      </div>

    </motion.section>
  );
}

export default ExecutiveSummaryCard;