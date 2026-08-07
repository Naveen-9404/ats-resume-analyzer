import { motion } from "framer-motion";
import {
  Brain,
  Code2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const fallbackSkills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "Python",
  "SQL",
  "Linux",
];

const getStatus = (value) => {
  if (value >= 85) {
    return {
      label: "Excellent",
      badge: "bg-emerald-100 text-emerald-700",
      bar: "bg-emerald-500",
    };
  }

  if (value >= 70) {
    return {
      label: "Strong",
      badge: "bg-blue-100 text-blue-700",
      bar: "bg-blue-500",
    };
  }

  if (value >= 50) {
    return {
      label: "Average",
      badge: "bg-amber-100 text-amber-700",
      bar: "bg-amber-500",
    };
  }

  return {
    label: "Missing",
    badge: "bg-rose-100 text-rose-700",
    bar: "bg-rose-500",
  };
};

function SkillCoverageCard({ skills = [] }) {
  const coverage =
    skills.length > 0
      ? skills
      : fallbackSkills.map((name) => ({
          name,
          value: 0,
        }));

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-violet-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,.08)]"
    >
      {/* Header */}

      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-50">
          <Brain
            size={28}
            className="text-violet-600"
          />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            AI Skill Intelligence
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Skill Coverage
          </h2>
        </div>
      </div>

      {/* Badge */}

      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
        <Sparkles size={16} />
        Technical Skill Analysis
      </div>

      {/* Skills */}

      <div className="mt-8 space-y-6">
        {coverage.map((item, index) => {
          const skill =
            typeof item === "string"
              ? {
                  name: item,
                  value: 0,
                }
              : item;

          const value = Math.round(skill.value ?? 0);

          const status = getStatus(value);

          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.05,
              }}
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-slate-100 p-2">
                    <Code2
                      size={18}
                      className="text-slate-700"
                    />
                  </div>

                  <span className="font-semibold text-slate-800">
                    {skill.name}
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
                  transition={{ duration: 1 }}
                  className={`h-full rounded-full ${status.bar}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}

      <div className="mt-8 rounded-2xl bg-slate-900 p-5 text-white">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={18} />

          <h3 className="font-semibold">
            AI Skill Assessment
          </h3>
        </div>

        <p className="mt-3 text-sm leading-6 text-slate-300">
          VectorCV evaluates your technical skills against the supplied job
          description and highlights strengths as well as areas that need
          improvement.
        </p>
      </div>
    </motion.section>
  );
}

export default SkillCoverageCard;