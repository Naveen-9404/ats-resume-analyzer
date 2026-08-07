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
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,.08)]"
    >
      <div className="mb-6 flex items-center gap-3">
        <History
          size={28}
          className="text-blue-600"
        />

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Resume History
          </h2>

          <p className="text-sm text-slate-500">
            Previously analyzed resumes
          </p>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center">
          <History
            size={44}
            className="mx-auto text-slate-400"
          />

          <p className="mt-4 text-slate-600">
            No resume analyses found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item, index) => (
            <div
              key={item._id || index}
              className="flex items-center justify-between rounded-2xl border border-slate-200 p-4"
            >
              <div>
                <h3 className="font-semibold text-slate-900">
                  {item.fileName || `Resume ${index + 1}`}
                </h3>

                <p className="text-sm text-slate-500">
                  ATS Score: {item.atsScore ?? 0}%
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onView(item)}
                  className="rounded-xl bg-blue-100 p-2 text-blue-700 hover:bg-blue-200"
                >
                  <Eye size={18} />
                </button>

                <button
                  onClick={() => onDownload(item)}
                  className="rounded-xl bg-emerald-100 p-2 text-emerald-700 hover:bg-emerald-200"
                >
                  <Download size={18} />
                </button>

                <button
                  onClick={() => onDelete(item)}
                  className="rounded-xl bg-red-100 p-2 text-red-700 hover:bg-red-200"
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