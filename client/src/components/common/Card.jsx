function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;