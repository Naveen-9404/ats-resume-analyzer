const SkillChip = ({ skill, variant = "matched" }) => <span className={variant === "matched" ? "rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-700" : "rounded-full bg-rose-100 px-3 py-1.5 text-sm font-medium text-rose-700"}>{skill}</span>;
export default SkillChip;
