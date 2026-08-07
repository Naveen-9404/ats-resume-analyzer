const SkillsCard = ({ title, titleClass, children }) => <section className="rounded-3xl border border-white/70 bg-white/75 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl"><h3 className={`font-bold ${titleClass}`}>{title}</h3><div className="mt-5 flex flex-wrap gap-2">{children}</div></section>;
export default SkillsCard;
