import { BarChart3 } from "lucide-react";
const QuickStats = ({ breakdown = {} }) => <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">{[["Keyword Match", breakdown.keywordMatch], ["Resume Quality", breakdown.resumeQuality], ["Completeness", breakdown.completeness]].map(([label, value]) => <div key={label} className="border border-gray-100 rounded-2xl p-4"><BarChart3 size={18} className="text-green-500 mb-2" /><p className="text-gray-500 text-sm">{label}</p><p className="font-bold text-xl">{value ?? 0}%</p></div>)}</div>;
export default QuickStats;
