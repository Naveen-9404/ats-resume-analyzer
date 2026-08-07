import { motion } from "framer-motion";
import {
  Rocket,
  Sparkles,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";

function RecommendationsCard({
  recommendations = [],
}) {
  const hasRecommendations =
    recommendations.length > 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-blue-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,.08)]"
    >
      {/* Header */}

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-50">

          <Rocket
            size={28}
            className="text-blue-600"
          />

        </div>

        <div>

          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            AI Career Roadmap
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Recommendations
          </h2>

        </div>

      </div>

      {/* Badge */}

      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

        <Sparkles size={16} />

        Personalized AI Suggestions

      </div>

      {/* Recommendations */}

      {hasRecommendations ? (

        <div className="mt-8 space-y-5">

          {recommendations.map(
            (recommendation, index) => (

              <motion.article
                key={`${recommendation}-${index}`}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                whileHover={{
                  y: -3,
                }}
                className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm"
              >

                <div className="flex items-start gap-5">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 font-bold text-white">

                    {index + 1}

                  </div>

                  <div className="flex-1">

                    <div className="flex items-center justify-between">

                      <h3 className="font-semibold text-slate-900">

                        Recommendation {index + 1}

                      </h3>

                      <ArrowUpRight
                        size={18}
                        className="text-slate-300"
                      />

                    </div>

                    <p className="mt-3 leading-7 text-slate-600">

                      {recommendation}

                    </p>

                  </div>

                </div>

              </motion.article>

            )
          )}

        </div>

      ) : (

        <div className="mt-8 rounded-3xl border border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-white p-8 text-center">

          <Lightbulb
            size={42}
            className="mx-auto text-blue-500"
          />

          <h3 className="mt-4 text-lg font-semibold text-slate-900">

            No Recommendations Yet

          </h3>

          <p className="mt-3 text-sm leading-6 text-slate-600">

            Upload and analyze your resume to receive
            personalized AI recommendations that improve
            ATS compatibility, recruiter confidence,
            and interview readiness.

          </p>

        </div>

      )}

      {/* Footer */}

      <div className="mt-8 rounded-2xl bg-slate-900 p-5 text-white">

        <h3 className="font-semibold">

          AI Career Coach

        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-300">

          These recommendations are prioritized by
          the VectorCV Intelligence Engine using ATS
          analysis, recruiter expectations, resume
          quality, and missing technical skills.
          Following them can significantly improve
          your resume's effectiveness.

        </p>

      </div>

    </motion.section>
  );
}

export default RecommendationsCard;