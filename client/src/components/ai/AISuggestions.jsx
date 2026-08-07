import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import RecommendationList from "./RecommendationList";
const toSuggestions = (text = "") =>
  text
    .split(/\n+|(?<=\.)\s+(?=[A-Z•-])/)
    .map((item) =>
      item.replace(/^[•-]\s*/, "").trim()
    )
    .filter(Boolean);
const AISuggestions = ({ content }) => { const suggestions = toSuggestions(content); return <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-3xl border border-white/70 bg-white/75 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl"><div className="flex items-center gap-2"><span className="grid size-9 place-items-center rounded-xl bg-violet-100 text-violet-700"><Sparkles size={18} /></span><div><h2 className="font-bold text-slate-900">AI suggestions</h2><p className="text-sm text-slate-500">Small changes with a big impact.</p></div></div><div className="mt-5"><RecommendationList suggestions={suggestions} /></div></motion.section>; };
export default AISuggestions;
