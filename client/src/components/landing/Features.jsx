import {
  ArrowRight,
  FileDown,
  Gauge,
  HeartPulse,
  Lightbulb,
  ScanSearch,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

const features = [
  {
    icon: ScanSearch,
    title: "ATS Resume Analysis",
    description:
      "Analyze your resume against any job description and discover exactly where you stand before applying.",
  },
  {
    icon: Sparkles,
    title: "AI Career Intelligence",
    description:
      "Receive recruiter-grade insights, executive summaries, and personalized recommendations powered by AI.",
  },
  {
    icon: Gauge,
    title: "ATS Compatibility Score",
    description:
      "Measure resume quality with detailed ATS scoring, keyword coverage, and skills analysis.",
  },
  {
    icon: HeartPulse,
    title: "Resume Health",
    description:
      "Evaluate formatting, readability, experience, projects, and overall resume quality.",
  },
  {
    icon: FileDown,
    title: "Professional PDF Reports",
    description:
      "Download beautifully designed PDF reports with ATS metrics, recruiter verdicts, and AI recommendations.",
  },
  {
    icon: Lightbulb,
    title: "Smart Resume Suggestions",
    description:
      "Discover missing skills, optimize keywords, and improve your resume with actionable AI guidance.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[.2em] text-emerald-600">
            Why VectorCV
          </p>

          <h2 className="mt-5 text-5xl font-black tracking-tight text-slate-900">
            Everything You Need
            <br />
            To Build an Interview-Winning Resume
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            VectorCV combines ATS analysis,
            AI-powered career intelligence,
            recruiter insights,
            and professional reports
            into one intelligent platform.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map(
            (
              {
                icon: Icon,
                title,
                description,
              },
              index
            ) => (
              <motion.article
                key={title}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                viewport={{
                  once: true,
                }}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-all hover:border-emerald-200 hover:shadow-2xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 transition-all group-hover:bg-emerald-600">

                  <Icon
                    size={26}
                    className="text-emerald-600 transition-all group-hover:text-white"
                  />

                </div>

                <h3 className="mt-8 text-xl font-bold text-slate-900">
                  {title}
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                  {description}
                </p>

                <div className="mt-8 flex items-center gap-2 font-semibold text-emerald-600 transition-all group-hover:gap-3">

                  Learn More

                  <ArrowRight size={18} />

                </div>

              </motion.article>
            )
          )}

        </div>

      </div>
    </section>
  );
}

export default Features;