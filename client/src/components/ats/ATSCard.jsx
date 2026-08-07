import ATSScoreGauge from "./ATSScoreGauge";
import { motion } from "framer-motion";
const ATSCard = ({ score }) => <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center rounded-3xl border border-white/70 bg-white/75 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl"><p className="text-sm font-semibold text-slate-500">ATS compatibility</p><div className="mt-5"><ATSScoreGauge score={score} /></div><p className="mt-4 text-center text-sm text-slate-500">Your resume is well aligned with this role.</p></motion.section>;
export default ATSCard;
