import {
  ArrowRight,
  CheckCircle2,
  Play,
  Sparkles,
  TrendingUp,
  BadgeCheck,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 sm:py-32">
      {/* Background Glow */}

      <div className="absolute inset-x-0 top-0 -z-20 h-[520px] bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.18),_transparent_65%)]" />

      <div className="absolute left-16 top-24 h-64 w-64 rounded-full bg-emerald-200/20 blur-3xl" />

      <div className="absolute right-10 bottom-0 h-72 w-72 rounded-full bg-sky-200/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2 lg:px-8">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
        >

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            <Sparkles size={15} />
            AI-Powered Career Intelligence
          </div>

          <h1 className="text-5xl font-black tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl">
            Turn Your Resume Into
            <br />

            <span className="text-emerald-600">
              Your Strongest
            </span>

            <br />

            Career Advantage.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
            VectorCV analyzes your resume against any job description,
            calculates ATS compatibility,
            discovers missing keywords,
            and generates recruiter-grade AI insights to maximize your interview success.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <Link
              to="/analyze"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-slate-800"
            >
              Analyze My Resume

              <ArrowRight size={18} />
            </Link>

            <button
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <Play
                size={17}
                fill="currentColor"
              />

              View Sample Report
            </button>

          </div>

          {/* Trust */}

          <div className="mt-10 flex flex-wrap gap-6 text-sm font-medium text-slate-600">

            <span className="flex items-center gap-2">
              <CheckCircle2
                size={17}
                className="text-emerald-500"
              />
              Free to Start
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2
                size={17}
                className="text-emerald-500"
              />
              AI Resume Analysis
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2
                size={17}
                className="text-emerald-500"
              />
              Professional PDF Reports
            </span>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, scale: .92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .7, delay: .2 }}
          className="relative"
        >

          {/* Floating Cards */}

          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute -left-10 top-6 rounded-2xl bg-white p-4 shadow-xl"
          >
            <p className="text-xs text-slate-500">
              ATS Score
            </p>

            <h3 className="text-2xl font-bold text-emerald-600">
              92%
            </h3>
          </motion.div>

          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute -right-10 top-20 rounded-2xl bg-white p-4 shadow-xl"
          >
            <BadgeCheck
              className="text-emerald-600"
              size={20}
            />

            <p className="mt-2 text-xs text-slate-500">
              Recruiter Verdict
            </p>

            <h4 className="font-bold">
              Excellent
            </h4>
          </motion.div>

          <motion.div
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="absolute -left-6 bottom-8 rounded-2xl bg-white p-4 shadow-xl"
          >
            <TrendingUp
              className="text-blue-600"
              size={20}
            />

            <p className="mt-2 text-xs text-slate-500">
              Keyword Match
            </p>

            <h3 className="font-bold">
              +28%
            </h3>
          </motion.div>

          {/* Main Card */}

          <div className="rounded-[32px] border border-white bg-white p-6 shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-100 pb-5">

              <div>

                <h3 className="text-lg font-bold text-slate-900">
                  VectorCV Analysis
                </h3>

                <p className="text-sm text-slate-500">
                  AI Resume Intelligence Report
                </p>

              </div>

              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                Completed
              </span>

            </div>

            <div className="mt-6 grid grid-cols-[120px_1fr] gap-6">

              <div className="grid aspect-square place-items-center rounded-3xl bg-emerald-50">

                <span className="text-4xl font-black text-emerald-600">
                  92%
                </span>

                <span className="text-xs font-semibold text-slate-500">
                  ATS Score
                </span>

              </div>

              <div className="space-y-4">

                <div>

                  <div className="mb-1 flex justify-between text-sm">

                    <span>Resume Quality</span>

                    <span>94%</span>

                  </div>

                  <progress
                    value="94"
                    max="100"
                    className="h-2.5 w-full"
                  />

                </div>

                <div>

                  <div className="mb-1 flex justify-between text-sm">

                    <span>Keyword Match</span>

                    <span>89%</span>

                  </div>

                  <progress
                    value="89"
                    max="100"
                    className="h-2.5 w-full"
                  />

                </div>

                <div>

                  <div className="mb-1 flex justify-between text-sm">

                    <span>Skills Match</span>

                    <span>91%</span>

                  </div>

                  <progress
                    value="91"
                    max="100"
                    className="h-2.5 w-full"
                  />

                </div>

              </div>

            </div>

            <div className="mt-6 rounded-2xl bg-slate-950 p-5 text-white">

              <div className="flex items-center gap-2">

                <FileText
                  size={18}
                  className="text-emerald-400"
                />

                <span className="font-semibold">
                  AI Insight
                </span>

              </div>

              <p className="mt-3 leading-7 text-slate-300">
                Your resume demonstrates strong frontend development skills.
                Add measurable achievements, backend technologies,
                and deployment experience to further improve ATS compatibility.
              </p>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}

export default Hero;