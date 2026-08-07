import {
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";

import {
  BadgeCheck,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  FileText,
} from "lucide-react";

import { motion } from "framer-motion";

const scoreData = [
  { value: 42 },
  { value: 56 },
  { value: 68 },
  { value: 79 },
  { value: 92 },
];

function DashboardPreview() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[.18em] text-emerald-600">
            AI Dashboard
          </p>

          <h2 className="mt-4 text-5xl font-black tracking-tight text-slate-900">
            Everything You Need
            <br />
            In One Intelligent Dashboard
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            ATS score, resume health, recruiter verdict,
            AI recommendations and professional reports—
            all in one beautiful workspace.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: .97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="mt-16 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl"
        >

          {/* Browser Header */}

          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-8 py-5">

            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400"></span>
              <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
              <span className="h-3 w-3 rounded-full bg-green-400"></span>
            </div>

            <span className="font-semibold text-slate-600">
              VectorCV Dashboard
            </span>

            <BadgeCheck
              className="text-emerald-600"
              size={20}
            />

          </div>

          <div className="grid gap-6 p-8 lg:grid-cols-[1.15fr_.85fr]">

            {/* Left */}

            <div className="space-y-6">

              <div className="rounded-3xl bg-slate-950 p-7 text-white">

                <p className="text-sm text-slate-400">
                  ATS Compatibility Score
                </p>

                <div className="mt-5 flex items-end justify-between">

                  <div>

                    <h2 className="text-6xl font-black text-emerald-400">
                      92%
                    </h2>

                    <p className="mt-2 text-slate-400">
                      Excellent Match
                    </p>

                  </div>

                  <TrendingUp className="text-emerald-400" />

                </div>

                <div className="mt-8 h-24">

                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={scoreData}>

                      <defs>

                        <linearGradient
                          id="scoreGradient"
                          x1="0"
                          x2="0"
                          y1="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#10b981"
                            stopOpacity=".45"
                          />

                          <stop
                            offset="100%"
                            stopColor="#10b981"
                            stopOpacity="0"
                          />

                        </linearGradient>

                      </defs>

                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#10b981"
                        strokeWidth={3}
                        fill="url(#scoreGradient)"
                      />

                    </AreaChart>
                  </ResponsiveContainer>

                </div>

              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                <div className="rounded-2xl border border-slate-200 p-5">

                  <h3 className="font-semibold">
                    Resume Health
                  </h3>

                  <p className="mt-3 text-4xl font-bold text-blue-600">
                    94%
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Excellent formatting and readability.
                  </p>

                </div>

                <div className="rounded-2xl border border-slate-200 p-5">

                  <h3 className="font-semibold">
                    Recruiter Verdict
                  </h3>

                  <p className="mt-3 text-xl font-bold text-emerald-600">
                    Excellent Match
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Ready for interviews.
                  </p>

                </div>

              </div>

            </div>

            {/* Right */}

            <div className="space-y-6">

              <div className="rounded-2xl border border-slate-200 p-6">

                <div className="flex items-center gap-2">

                  <Sparkles
                    className="text-emerald-500"
                    size={20}
                  />

                  <h3 className="font-bold">
                    AI Recommendations
                  </h3>

                </div>

                <div className="mt-5 space-y-4">

                  {[
                    "Add measurable achievements to every project.",
                    "Include backend technologies such as Express.js.",
                    "Improve keyword coverage for ATS optimization.",
                    "Highlight deployment experience.",
                  ].map((item) => (

                    <div
                      key={item}
                      className="flex gap-3"
                    >

                      <CheckCircle2
                        size={18}
                        className="mt-1 text-emerald-500"
                      />

                      <p className="text-sm leading-7 text-slate-600">
                        {item}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

              <div className="rounded-2xl border border-slate-200 p-6">

                <div className="flex items-center gap-2">

                  <FileText
                    className="text-blue-600"
                    size={20}
                  />

                  <h3 className="font-bold">
                    Executive Summary
                  </h3>

                </div>

                <p className="mt-4 leading-7 text-slate-600">
                  VectorCV identifies your strongest skills,
                  evaluates ATS compatibility,
                  detects missing keywords,
                  and provides recruiter-level insights to
                  maximize interview success.
                </p>

              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}

export default DashboardPreview;