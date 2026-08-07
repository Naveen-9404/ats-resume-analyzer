import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-28">
      {/* Background Glow */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.18),_transparent_65%)]" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: .6,
          }}
          className="rounded-[40px] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl md:p-16"
        >

          <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
            Ready to Level Up Your Career?
          </span>

          <h2 className="mt-8 text-4xl font-black tracking-tight text-white sm:text-6xl">
            Build a Resume
            <br />

            Recruiters Want to Read.
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
            Upload your resume, compare it against any job description,
            receive ATS scores, recruiter insights,
            AI-powered recommendations,
            and download a professional report —
            all in just a few seconds.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">

            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-8 py-4 text-lg font-bold text-white shadow-xl transition hover:scale-105 hover:bg-emerald-600"
            >
              Analyze My Resume

              <ArrowRight size={20} />
            </Link>

            <Link
              to="/register"
              className="rounded-2xl border border-white/20 px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
            >
              Create Free Account
            </Link>

          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-300">

            <span className="flex items-center gap-2">
              <CheckCircle2
                size={18}
                className="text-emerald-400"
              />
              Free Forever
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2
                size={18}
                className="text-emerald-400"
              />
              AI-Powered Analysis
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2
                size={18}
                className="text-emerald-400"
              />
              ATS Optimized
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2
                size={18}
                className="text-emerald-400"
              />
              Professional PDF Reports
            </span>

          </div>

        </motion.div>

      </div>
    </section>
  );
}

export default CTA;