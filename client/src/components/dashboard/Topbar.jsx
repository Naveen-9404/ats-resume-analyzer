function Topbar({
  username = "User",
}) {
  return (
    <div className="mb-8 flex items-center justify-between">

      <div>

        <h1 className="text-4xl font-bold text-slate-900">
          Good Morning 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome back, {username}
        </p>

      </div>

    </div>
  );
}

export default Topbar;