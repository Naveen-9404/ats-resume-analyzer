import {
  Upload,
  FileSearch,
  Brain,
  FileDown,
} from "lucide-react";

import { motion } from "framer-motion";

const steps = [
  {
    icon: Upload,
    title: "Upload Resume",
    description:
      "Upload your resume in PDF format securely. VectorCV instantly extracts and understands your resume content.",
  },
  {
    icon: FileSearch,
    title: "Paste Job Description",
    description:
      "Add the target job description so our ATS engine can compare your resume with employer requirements.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description:
      "Receive ATS scores, keyword matching, recruiter insights, strengths, weaknesses, and personalized recommendations.",
  },
  {
    icon: FileDown,
    title: "Download Report",
    description:
      "Export a premium PDF report containing your ATS analysis and AI-powered career intelligence.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-slate-950 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[.2em] text-emerald-400">
            Simple Workflow
          </p>

          <h2 className="mt-5 text-5xl font-black">
            Four Steps To
            <br />
            A Better Resume
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            VectorCV transforms your resume into an
            ATS-optimized, recruiter-ready document
            within minutes.
          </p>
        </motion.div>

        <div className="relative mt-20">

          {/* Timeline */}

          <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 rounded-full bg-slate-700 lg:block" />

          <div className="space-y-14">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.12,
                  }}
                  className={`grid items-center gap-10 lg:grid-cols-2 ${
                    index % 2 === 1
                      ? "lg:[&>*:first-child]:order-2"
                      : ""
                  }`}
                >
                  <div
                    className={`${
                      index % 2 === 0
                        ? "lg:text-right"
                        : ""
                    }`}
                  >
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-xl">
                      <Icon size={30} />
                    </div>

                    <h3 className="mt-6 text-2xl font-bold">
                      {step.title}
                    </h3>

                    <p className="mt-4 leading-8 text-slate-400">
                      {step.description}
                    </p>
                  </div>

                  <div className="hidden lg:flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-slate-950 bg-emerald-500 text-xl font-bold shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                </motion.div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;