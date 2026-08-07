import { motion } from "framer-motion";
import {
  Gauge,
  HeartPulse,
  Search,
  Brain,
} from "lucide-react";

const cards = [
  {
    key: "atsScore",
    label: "ATS Score",
    icon: Gauge,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    key: "resumeHealth",
    label: "Resume Health",
    icon: HeartPulse,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    key: "keywordMatch",
    label: "Keyword Match",
    icon: Search,
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
  {
    key: "skillsMatch",
    label: "Skills Match",
    icon: Brain,
    color: "text-violet-600",
    bg: "bg-violet-100",
  },
];

const getStatus = (value) => {
  if (value >= 85) return "Excellent";
  if (value >= 70) return "Good";
  if (value >= 50) return "Average";
  return "Needs Work";
};

function StatsGrid({ values = {} }) {
  return (
    <section className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const value = Math.round(values[card.key] ?? 0);

        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -5 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.bg}`}
              >
                <Icon className={card.color} size={26} />
              </div>

              <span className="text-xs font-semibold text-slate-500">
                {getStatus(value)}
              </span>
            </div>

            <h3 className="mt-6 text-sm font-medium text-slate-500">
              {card.label}
            </h3>

            <p className="mt-2 text-4xl font-bold text-slate-900">
              {value}%
            </p>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-700"
                style={{
                  width: `${value}%`,
                }}
              />
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}

export default StatsGrid;