import { motion } from "framer-motion";
import { FileWarning, Download, Briefcase } from "lucide-react";

function HistoricalPreview({ jobDescription = "", onDownload }) {
  const hasJobDescription = jobDescription && jobDescription.trim().length > 0;

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      {/* Job Description Card */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,.08)] flex flex-col"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-blue-50">
            <Briefcase size={28} className="text-indigo-600" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Target Role</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">Job Description</h2>
          </div>
        </div>
        <div className="mt-6 flex-1 rounded-3xl border border-slate-200 bg-slate-50 p-6 overflow-hidden relative">
          {hasJobDescription ? (
            <div className="prose prose-slate max-w-none text-sm text-slate-700 whitespace-pre-wrap max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {jobDescription}
            </div>
          ) : (
            <div className="flex h-full min-h-[12rem] flex-col items-center justify-center text-center">
              <Briefcase size={40} className="mb-4 text-slate-300" />
              <p className="text-slate-500">No job description was provided for this analysis.</p>
            </div>
          )}
        </div>
      </motion.section>

      {/* PDF Unavailable State */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center"
      >
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-200">
          <FileWarning size={40} className="text-slate-500" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">PDF Preview Unavailable</h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600">
          Original resume preview isn't available for saved analyses, but your complete ATS analysis is preserved.
        </p>
        
        {onDownload && (
          <button
            onClick={onDownload}
            className="mt-8 flex items-center justify-center gap-3 rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-1 hover:bg-slate-800 hover:shadow-xl"
          >
            <Download size={20} />
            Download PDF Report
          </button>
        )}
      </motion.section>
    </div>
  );
}

export default HistoricalPreview;
