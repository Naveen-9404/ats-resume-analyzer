import { motion } from "framer-motion";
import {
  Award,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

function StrengthsCard({
  strengths = [],
}) {
  const hasStrengths =
    strengths.length > 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-emerald-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,.08)]"
    >
      {/* Header */}

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-green-50">

          <Award
            size={28}
            className="text-emerald-600"
          />

        </div>

        <div>

          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            AI Strength Analysis
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Resume Strengths
          </h2>

        </div>

      </div>

      {/* Badge */}

      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

        <Sparkles size={16} />

        AI Identified Strengths

      </div>

      {/* Content */}

      {hasStrengths ? (

        <div className="mt-8 flex max-h-72 flex-wrap gap-3 overflow-y-auto pr-2">

          {strengths.map((strength, index) => (

            <motion.div
              key={`${strength}-${index}`}
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: index * 0.05,
              }}
              whileHover={{
                y: -3,
                scale: 1.03,
              }}
              className="flex items-center gap-2 rounded-full border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm"
            >

              <CheckCircle2 size={15} />

              {strength}

            </motion.div>

          ))}

        </div>

      ) : (

        <div className="mt-8 rounded-3xl border border-dashed border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-8 text-center">

          <CheckCircle2
            size={42}
            className="mx-auto text-emerald-500"
          />

          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            No Strengths Detected
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Upload and analyze your resume to let
            VectorCV identify your strongest
            technical skills, achievements, and
            recruiter-friendly qualities.
          </p>

        </div>

      )}

      {/* Footer */}

      <div className="mt-8 rounded-2xl bg-slate-900 p-5 text-white">

        <h3 className="font-semibold">
          Recruiter Insight
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-300">
          These strengths are extracted by the AI
          engine and represent the areas most
          likely to attract recruiter attention
          during the initial resume screening
          process.
        </p>

      </div>

    </motion.section>
  );
}

export default StrengthsCard;