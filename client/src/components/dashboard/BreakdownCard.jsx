import { BarChart3 } from "lucide-react";

const metrics = [
  { label: "Keyword match", key: "keywordMatch" },
  { label: "Resume quality", key: "resumeQuality" },
  { label: "Skills match", key: "skillsMatch" },
  { label: "Formatting", key: "formatting" },
];

const BreakdownCard = ({ breakdown = {} }) => (
  <section className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-[0_15px_45px_rgba(0,0,0,.08)]">
    <div className="flex items-center gap-2">
      <BarChart3 size={18} className="text-blue-600" />
      <h3 className="font-bold text-slate-900">Score breakdown</h3>
    </div>
    <div className="mt-5 space-y-4">
      {metrics.map(({ label, key }) => {
        const rawValue = breakdown[key];
        const hasScore = typeof rawValue === "number" && !isNaN(rawValue);
        const displayValue = hasScore ? `${Math.round(rawValue)}%` : "N/A";
        const progressValue = hasScore
          ? Math.max(0, Math.min(100, Math.round(rawValue)))
          : 0;

        return (
          <div key={key}>
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="text-slate-600">{label}</span>
              <span className="font-semibold text-slate-900">
                {displayValue}
              </span>
            </div>
            <progress
              value={progressValue}
              max="100"
              className="h-2 w-full accent-blue-600"
            >
              {displayValue}
            </progress>
          </div>
        );
      })}
    </div>
  </section>
);

export default BreakdownCard;
