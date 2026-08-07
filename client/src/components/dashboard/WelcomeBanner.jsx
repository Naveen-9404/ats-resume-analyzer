import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const WelcomeBanner = ({ name = "there" }) => <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-7 text-white shadow-xl shadow-slate-900/10 sm:p-9"><div className="absolute -right-16 -top-16 size-56 rounded-full bg-emerald-400/20 blur-3xl" /><div className="relative"><div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-200"><Sparkles size={14} /> AI career workspace</div><h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Good to see you, {name}.</h1><p className="mt-2 max-w-xl text-slate-300">Upload a resume, match it to a role, and get the clarity to make every application stronger.</p></div></motion.section>;
export default WelcomeBanner;
