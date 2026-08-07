import { motion } from "framer-motion";
import {
  Gauge,
  CheckCircle2,
  TrendingUp,
  FileText,
  Search,
  Brain,
  Layout,
} from "lucide-react";

import ATSScoreGauge from "../ats/ATSScoreGauge";

const metrics = [
  {
    key: "resumeQuality",
    label: "Resume Quality",
    icon: FileText,
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
    key: "formatting",
    label: "Formatting",
    icon: Layout,
  },
];

const getRating = (score) => {
  if (score >= 90) {
    return {
      label: "Excellent Match",
      badge: "Top Candidate",
    };
  }

  if (score >= 75) {
    return {
      label: "Good Match",
      badge: "Strong Candidate",
    };
  }

  if (score >= 60) {
    return {
      label: "Average Match",
      badge: "Needs Improvement",
    };
  }

  return {
    label: "Poor Match",
    badge: "High Risk",
  };
};

const getStatus = (value) => {
  if (value >= 85) {
    return {
      text: "Excellent",
      badge: "bg-emerald-100 text-emerald-700",
      bar: "bg-emerald-500",
    };
  }

  if (value >= 70) {
    return {
      text: "Good",
      badge: "bg-blue-100 text-blue-700",
      bar: "bg-blue-500",
    };
  }

  if (value >= 50) {
    return {
      text: "Average",
      badge: "bg-amber-100 text-amber-700",
      bar: "bg-amber-500",
    };
  }

  return {
    text: "Needs Improvement",
    badge: "bg-rose-100 text-rose-700",
    bar: "bg-rose-500",
  };
};

function ATSScoreCard({
  score = 0,
  breakdown = {},
}) {
  const rating = getRating(score);

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,.08)]"
    >
      {/* Header */}

      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-emerald-100">
          <Gauge
            size={26}
            className="text-blue-600"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            ATS Compatibility Score
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            AI Recruiter Assessment
          </p>
        </div>
      </div>

      {/* Hero */}

      <div className="mt-10 grid gap-10 lg:grid-cols-[280px_1fr]">

        {/* Left */}

        <div className="rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 p-6">

          <div className="flex justify-center">
            <ATSScoreGauge score={score} />
          </div>

          <div className="mt-5 text-center">

            <div className="text-5xl font-bold text-slate-900">
              {score}%
            </div>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              <CheckCircle2 size={16} />
              {rating.label}
            </div>

            <p className="mt-4 text-sm text-slate-600">
              {rating.badge}
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              This score reflects how well your resume
              matches the supplied job description.
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="space-y-7">

          {metrics.map((metric) => {

            const value = Math.round(
              breakdown[metric.key] ?? 0
            );

            const status = getStatus(value);

            const Icon = metric.icon;

            return (

              <div key={metric.key}>

                <div className="mb-3 flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-slate-100 p-2">
                      <Icon
                        size={18}
                        className="text-slate-700"
                      />
                    </div>

                    <span className="font-semibold text-slate-800">
                      {metric.label}
                    </span>

                  </div>

                  <span className="text-lg font-bold text-slate-900">
                    {value}%
                  </span>

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
                    className={`h-full rounded-full ${status.bar}`}
                  />

                </div>

                <div className="mt-3 flex items-center justify-between">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${status.badge}`}
                  >
                    {status.text}
                  </span>

                  <div className="flex items-center gap-2 text-xs text-slate-500">

                    <TrendingUp size={14} />

                    AI Assessment

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      </div>

      {/* Footer */}

      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5">

        <h3 className="font-semibold text-slate-900">
          Overall ATS Assessment
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Your resume demonstrates an overall compatibility score of{" "}
          <strong>{score}%</strong>. Continue improving the highlighted areas to
          maximize interview opportunities and recruiter visibility.
        </p>

      </div>

    </motion.section>
  );
}

export default ATSScoreCard;