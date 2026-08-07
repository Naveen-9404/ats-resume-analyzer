import { motion } from "framer-motion";
import {
  HeartPulse,
  CheckCircle2,
  Activity,
  FileText,
  Search,
  Brain,
} from "lucide-react";

const healthRows = [
  {
    key: "formatting",
    label: "Formatting",
    icon: FileText,
  },
  {
    key: "resumeQuality",
    label: "Resume Quality",
    icon: Activity,
  },
  {
    key: "keywordMatch",
    label: "Keyword Match",
    icon: Search,
  },
  {
    key: "skillsMatch",
    label: "Skills Match",
    icon: Brain,
  },
  {
    key: "overall",
    label: "Overall Health",
    icon: HeartPulse,
  },
];

const getStatus = (value) => {
  if (value >= 85) {
    return {
      label: "Excellent",
      badge: "bg-emerald-100 text-emerald-700",
      progress: "bg-emerald-500",
    };
  }

  if (value >= 70) {
    return {
      label: "Good",
      badge: "bg-blue-100 text-blue-700",
      progress: "bg-blue-500",
    };
  }

  if (value >= 50) {
    return {
      label: "Average",
      badge: "bg-amber-100 text-amber-700",
      progress: "bg-amber-500",
    };
  }

  return {
    label: "Needs Attention",
    badge: "bg-rose-100 text-rose-700",
    progress: "bg-rose-500",
  };
};

function ResumeHealthCard({ health = {} }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,.08)]"
    >
      {/* Header */}

      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-green-50">
          <HeartPulse
            size={28}
            className="text-emerald-600"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Resume Health
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            AI-powered quality assessment of your resume.
          </p>
        </div>
      </div>

      {/* Metrics */}

      <div className="mt-8 space-y-7">
        {healthRows.map((row) => {
          const value = Math.round(
            health[row.key] ?? 0
          );

          const status = getStatus(value);

          const Icon = row.icon;

          return (
            <div key={row.key}>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-slate-100 p-2">
                    <Icon
                      size={18}
                      className="text-slate-700"
                    />
                  </div>

                  <span className="font-semibold text-slate-800">
                    {row.label}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${status.badge}`}
                  >
                    {status.label}
                  </span>

                  <span className="text-lg font-bold text-slate-900">
                    {value}%
                  </span>
                </div>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${value}%`,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className={`h-full rounded-full ${status.progress}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-center gap-2">
          <CheckCircle2
            size={18}
            className="text-emerald-600"
          />

          <h3 className="font-semibold text-slate-900">
            Resume Health Summary
          </h3>
        </div>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Your resume has been evaluated across formatting,
          content quality, keyword relevance, and technical
          skills. Continue improving lower-scoring areas to
          maximize ATS compatibility and recruiter visibility.
        </p>
      </div>
    </motion.section>
  );
}

export default ResumeHealthCard;