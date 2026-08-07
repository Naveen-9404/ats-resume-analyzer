import { motion } from "framer-motion";
import {
  BadgeCheck,
  Briefcase,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

function RecruiterVerdictCard({
  verdict = {},
}) {
  const rating =
    verdict.rating || "Not Available";

  const reason =
    verdict.reason ||
    "Analyze a resume to receive an AI recruiter assessment.";

  const probability =
    rating.toLowerCase() === "excellent match"
      ? 92
      : rating.toLowerCase() === "good match"
      ? 80
      : rating.toLowerCase() === "average match"
      ? 60
      : 35;

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,.08)]"
    >
      {/* Header */}

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">

          <BadgeCheck
            size={28}
            className="text-emerald-600"
          />

        </div>

        <div>

          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            AI Recruiter Verdict
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            {rating}
          </h2>

        </div>

      </div>

      {/* Statistics */}

      <div className="mt-8 grid grid-cols-2 gap-4">

        <div className="rounded-2xl bg-slate-50 p-5">

          <div className="flex items-center gap-2 text-slate-500">

            <Briefcase size={18} />

            <span className="text-sm">
              Interview Chance
            </span>

          </div>

          <p className="mt-3 text-3xl font-bold text-slate-900">
            {probability}%
          </p>

        </div>

        <div className="rounded-2xl bg-slate-50 p-5">

          <div className="flex items-center gap-2 text-slate-500">

            <TrendingUp size={18} />

            <span className="text-sm">
              Recruiter Confidence
            </span>

          </div>

          <div className="mt-3 flex items-center gap-2">

            <CheckCircle2
              className="text-emerald-600"
              size={18}
            />

            <span className="font-semibold text-emerald-700">
              High
            </span>

          </div>

        </div>

      </div>

      {/* Assessment */}

      <div className="mt-8 rounded-2xl bg-slate-50 p-5">

        <h3 className="font-semibold text-slate-900">
          Assessment
        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          {reason}
        </p>

      </div>

      {/* Footer */}

      <div className="mt-8 rounded-2xl bg-slate-900 p-5">

        <h3 className="font-semibold text-white">
          Recommendation
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-300">
          Continue improving your resume using the
          AI recommendations to maximize ATS score,
          recruiter confidence, and interview
          opportunities.
        </p>

      </div>

    </motion.section>
  );
}

export default RecruiterVerdictCard;