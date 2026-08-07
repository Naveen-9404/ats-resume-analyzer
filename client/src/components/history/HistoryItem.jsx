import { motion } from "framer-motion";
import {
  CalendarDays,
  Download,
  Eye,
  Trash2,
  CheckCircle2,
  FileText,
  Award,
} from "lucide-react";

import { formatDate } from "../../utils/formatDate";

const getVerdict = (score = 0) => {
  if (score >= 90)
    return {
      label: "Excellent Match",
      badge: "bg-emerald-100 text-emerald-700",
    };

  if (score >= 75)
    return {
      label: "Good Match",
      badge: "bg-blue-100 text-blue-700",
    };

  if (score >= 60)
    return {
      label: "Average Match",
      badge: "bg-amber-100 text-amber-700",
    };

  return {
    label: "Needs Improvement",
    badge: "bg-rose-100 text-rose-700",
  };
};

function HistoryItem({
  item,
  onView,
  onDelete,
  onDownload,
}) {
  const verdict = getVerdict(
    item.atsScore || 0
  );

  return (
    <motion.article
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,.08)]"
    >
      {/* Top */}

      <div className="flex items-start justify-between">

        <div>

          <div className="text-4xl font-bold text-emerald-600">

            {item.atsScore || 0}%

          </div>

          <p className="mt-1 text-sm text-slate-500">

            ATS Score

          </p>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${verdict.badge}`}
        >
          {verdict.label}
        </span>

      </div>

      {/* File */}

      <div className="mt-6 flex items-start gap-3">

        <div className="rounded-xl bg-slate-100 p-3">

          <FileText
            size={20}
            className="text-slate-700"
          />

        </div>

        <div className="min-w-0 flex-1">

          <h3
            className="truncate font-semibold text-slate-900"
            title={item.fileName}
          >
            {item.fileName || "Resume"}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Resume Analysis Report
          </p>

        </div>

      </div>

      {/* Stats */}

      <div className="mt-6 grid grid-cols-2 gap-4">

        <div className="rounded-2xl bg-slate-50 p-4">

          <p className="text-xs uppercase tracking-wide text-slate-500">
            Matched Skills
          </p>

          <div className="mt-2 flex items-center gap-2">

            <CheckCircle2
              size={18}
              className="text-emerald-600"
            />

            <span className="text-lg font-bold">

              {item.matched?.length || 0}

            </span>

          </div>

        </div>

        <div className="rounded-2xl bg-slate-50 p-4">

          <p className="text-xs uppercase tracking-wide text-slate-500">
            Missing Skills
          </p>

          <div className="mt-2 flex items-center gap-2">

            <Award
              size={18}
              className="text-amber-600"
            />

            <span className="text-lg font-bold">

              {item.missing?.length || 0}

            </span>

          </div>

        </div>

      </div>

      {/* Date */}

      <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">

        <CalendarDays size={16} />

        {formatDate(item.uploadedAt)}

      </div>

      {/* Actions */}

      <div className="mt-7 grid grid-cols-3 gap-3">

        <Action
          label="View"
          icon={<Eye size={17} />}
          color="text-blue-600"
          onClick={() => onView(item)}
        />

        <Action
          label="Download"
          icon={<Download size={17} />}
          color="text-emerald-600"
          onClick={() => onDownload(item)}
        />

        <Action
          label="Delete"
          icon={<Trash2 size={17} />}
          color="text-rose-600"
          onClick={() => onDelete(item)}
        />

      </div>

    </motion.article>
  );
}

function Action({
  label,
  icon,
  color,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-semibold transition-all hover:scale-105 hover:bg-white ${color}`}
    >
      {icon}

      {label}
    </button>
  );
}

export default HistoryItem;