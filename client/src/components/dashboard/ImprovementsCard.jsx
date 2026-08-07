import { motion } from "framer-motion";
import {
  TriangleAlert,
  Sparkles,
  Target,
} from "lucide-react";

function ImprovementsCard({
  improvements = [],
}) {
  const hasImprovements =
    improvements.length > 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-amber-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,.08)]"
    >
      {/* Header */}

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-50">

          <Target
            size={28}
            className="text-amber-600"
          />

        </div>

        <div>

          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            AI Improvement Analysis
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Areas for Improvement
          </h2>

        </div>

      </div>

      {/* Badge */}

      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">

        <Sparkles size={16} />

        AI Suggested Improvements

      </div>

      {/* Improvements */}

      {hasImprovements ? (

        <div className="mt-8 flex max-h-72 flex-wrap gap-3 overflow-y-auto pr-2">

          {improvements.map((item, index) => (

            <motion.div
              key={`${item}-${index}`}
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
              className="flex items-center gap-2 rounded-full border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 px-4 py-2 text-sm font-medium text-amber-800 shadow-sm"
            >

              <TriangleAlert size={15} />

              {item}

            </motion.div>

          ))}

        </div>

      ) : (

        <div className="mt-8 rounded-3xl border border-dashed border-amber-200 bg-gradient-to-br from-amber-50 to-white p-8 text-center">

          <TriangleAlert
            size={42}
            className="mx-auto text-amber-500"
          />

          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            No Suggestions Yet
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Upload and analyze your resume to let
            VectorCV identify the sections,
            technical skills, and ATS factors
            that require improvement for a higher
            recruiter ranking.
          </p>

        </div>

      )}

      {/* Footer */}

      <div className="mt-8 rounded-2xl bg-slate-900 p-5 text-white">

        <h3 className="font-semibold">
          Career Recommendation
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-300">
          Addressing these improvement areas can
          significantly increase your ATS score,
          recruiter confidence, and interview
          opportunities for your target role.
        </p>

      </div>

    </motion.section>
  );
}

export default ImprovementsCard;