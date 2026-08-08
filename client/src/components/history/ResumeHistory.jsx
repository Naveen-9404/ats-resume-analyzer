import { motion } from "framer-motion";
import {
  History,
  Eye,
  Download,
  Trash2,
} from "lucide-react";

function ResumeHistory({
  history = [],
  onView,
  onDelete,
  onDownload,
}) {
  return (
    <motion.section
      id="resume-history"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,.08)]"
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
          <History size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Resume History
          </h2>

          <p className="text-sm text-slate-500">
            Previously analyzed resumes
          </p>
        </div>
      </div>

      {/* Empty State */}
      {history.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center">
          <History
            size={44}
            className="mx-auto text-slate-400"
          />

          <p className="mt-4 text-slate-600">
            No resume analyses found.
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Your analyzed resumes will appear here.
          </p>
        </div>
      ) : (
        /* History List */
        <div className="space-y-4">
          {history.map((item, index) => (
            <div
              key={item._id || index}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-blue-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Resume Information */}
              <div className="min-w-0">
                <h3 className="truncate font-semibold text-slate-900">
                  {item.fileName || `Resume ${index + 1}`}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  ATS Score:{" "}
                  <span className="font-semibold text-slate-700">
                    {item.atsScore ?? 0}%
                  </span>
                </p>

                {item.createdAt && (
                  <p className="mt-1 text-xs text-slate-400">
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => onView?.(item)}
                  title="View analysis"
                  className="rounded-xl bg-blue-100 p-2 text-blue-700 transition hover:bg-blue-200"
                >
                  <Eye size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => onDownload?.(item)}
                  title="Download report"
                  className="rounded-xl bg-emerald-100 p-2 text-emerald-700 transition hover:bg-emerald-200"
                >
                  <Download size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => onDelete?.(item)}
                  title="Delete analysis"
                  className="rounded-xl bg-red-100 p-2 text-red-700 transition hover:bg-red-200"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  );
}

export default ResumeHistory;