import { motion } from "framer-motion";
import { CalendarDays, Sparkles } from "lucide-react";

function DashboardHeader({ username = "there" }) {
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date());

  return (
    <motion.header
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 px-8 py-8 text-white shadow-[0_20px_60px_rgba(15,23,42,.25)]"
    >
      {/* Background Glow */}
      <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

        {/* Left */}
        <div>

          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-blue-200">
            <Sparkles size={16} />
            AI-Powered Resume Intelligence
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight">
            Welcome back, {username} 👋
          </h1>

          <p className="mt-3 max-w-2xl text-slate-300">
            Analyze your resume, improve ATS compatibility,
            and maximize your interview opportunities with
            AI-powered insights.
          </p>

        </div>

        {/* Right */}
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 backdrop-blur-md">

          <CalendarDays
            size={18}
            className="text-blue-300"
          />

          <div>

            <p className="text-xs uppercase tracking-wider text-slate-300">
              Today
            </p>

            <p className="font-semibold">
              {today}
            </p>

          </div>

        </div>

      </div>
    </motion.header>
  );
}

export default DashboardHeader;