import {
  FileText,
  Search,
  Brain,
  TrendingUp,
} from "lucide-react";

import Card from "../common/Card";

function Stat({
  icon: Icon,
  title,
  value,
  color,
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
      >
        <Icon size={22} />
      </div>

      <div>

        <p className="text-sm text-slate-500">
          {title}
        </p>

        <h3 className="text-2xl font-bold text-slate-900">
          {value}
        </h3>

      </div>

    </div>
  );
}

function HeroSection({
  username = "User",
  score = 0,
  analyses = 0,
  keywords = 0,
  skills = 0,
}) {
  return (
    <Card className="p-8">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Resume Intelligence
          </p>

          <h1 className="mt-3 text-5xl font-bold text-slate-900">
            Good Morning 👋
          </h1>

          <h2 className="mt-2 text-3xl font-semibold text-slate-700">
            {username}
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-500">
            Track your ATS performance,
            improve recruiter visibility,
            and optimize your resume using
            AI-powered insights.
          </p>

        </div>

        <div className="rounded-full bg-slate-100 px-5 py-2 text-sm font-medium text-slate-600">
          {new Date().toLocaleDateString()}
        </div>

      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <Stat
          icon={TrendingUp}
          title="Resume Score"
          value={`${score}%`}
          color="bg-blue-100 text-blue-600"
        />

        <Stat
          icon={FileText}
          title="Analyses"
          value={analyses}
          color="bg-emerald-100 text-emerald-600"
        />

        <Stat
          icon={Search}
          title="Keyword Match"
          value={`${keywords}%`}
          color="bg-amber-100 text-amber-600"
        />

        <Stat
          icon={Brain}
          title="Skills"
          value={skills}
          color="bg-violet-100 text-violet-600"
        />

      </div>

    </Card>
  );
}

export default HeroSection;