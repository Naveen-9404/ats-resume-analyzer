import React from "react";

const SkillsCard = ({
  title,
  titleClass,
  children,
  emptyMessage = "None detected",
}) => {
  const hasItems = React.Children.count(children) > 0;

  return (
    <section className="rounded-3xl border border-white/70 bg-white/75 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl">
      <h3 className={`font-bold ${titleClass}`}>{title}</h3>
      <div className="mt-5 flex flex-wrap gap-2">
        {hasItems ? (
          children
        ) : (
          <p className="text-sm text-slate-400 italic">
            {emptyMessage}
          </p>
        )}
      </div>
    </section>
  );
};

export default SkillsCard;
