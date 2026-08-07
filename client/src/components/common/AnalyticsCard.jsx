function AnalyticsCard({
  title,
  subtitle,
  icon,
  children,
  className = "",
}) {
  const Icon = icon;

  return (
    <div
      className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${className}`}
    >
      <div className="mb-6 flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
          {Icon && <Icon size={22} className="text-slate-700" />}
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {title}
          </h2>

          {subtitle && (
            <p className="text-sm text-slate-500">
              {subtitle}
            </p>
          )}
        </div>

      </div>

      {children}

    </div>
  );
}

export default AnalyticsCard;