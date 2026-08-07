import { motion } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  Circle,
} from "lucide-react";

import useAnalysisProgress from "../../hooks/useAnalysisProgress";

const steps = [
  "Resume uploaded",
  "Reading resume",
  "Extracting technical skills",
  "Matching job description",
  "Running ATS engine",
  "AI recruiter evaluation",
  "Preparing dashboard",
  "Generating PDF report",
];

const LoadingAnimation = ({
  loading = true,
}) => {
  const {
    currentStep,
    progress,
  } = useAnalysisProgress(loading);

  return (
    <div className="grid min-h-[520px] place-items-center rounded-3xl border border-white/70 bg-white/80 p-10 shadow-xl shadow-slate-900/5 backdrop-blur-xl">

      <div className="w-full max-w-xl">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-slate-900">
            VectorCV AI
          </h2>

          <p className="mt-2 text-slate-500">
            AI Career Intelligence
          </p>
        </motion.div>

        {/* Progress */}

        <div className="mt-10">

          <div className="mb-3 flex items-center justify-between">

            <span className="text-sm font-semibold text-slate-700">
              Analyzing your resume...
            </span>

            <span className="text-sm font-bold text-emerald-600">
              {progress}%
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200">

            <motion.div
              className="h-full rounded-full bg-emerald-500"
              animate={{
                width: `${progress}%`,
              }}
              transition={{
                duration: 0.5,
              }}
            />

          </div>

        </div>

        {/* Steps */}

        <div className="mt-10 space-y-4">

          {steps.map((step, index) => {

            let icon;

            if (index < currentStep) {

              icon = (
                <CheckCircle2
                  size={20}
                  className="text-emerald-500"
                />
              );

            }

            else if (index === currentStep) {

              icon = (
                <Loader2
                  size={20}
                  className="animate-spin text-blue-500"
                />
              );

            }

            else {

              icon = (
                <Circle
                  size={18}
                  className="text-slate-300"
                />
              );

            }

            return (

              <motion.div
                key={step}
                layout
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="flex items-center gap-4"
              >

                {icon}

                <span
                  className={`text-sm font-medium ${
                    index < currentStep
                      ? "text-slate-900"
                      : index === currentStep
                      ? "text-blue-600"
                      : "text-slate-400"
                  }`}
                >
                  {step}
                </span>

              </motion.div>

            );

          })}

        </div>

        {/* Footer */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.3,
          }}
          className="mt-10 text-center text-xs text-slate-400"
        >
          Estimated analysis time: 5–8 seconds
        </motion.p>

      </div>

    </div>
  );
};

export default LoadingAnimation;