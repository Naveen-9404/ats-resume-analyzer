import {
  LayoutDashboard,
  FileText,
  History,
  LogOut,
} from "lucide-react";

const menu = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    active: true,
  },
  {
    icon: FileText,
    label: "Analyze Resume",
  },
  {
    icon: History,
    label: "History",
  },
];

function Sidebar({ onLogout }) {
  return (
    <div className="flex h-screen flex-col bg-white">

      {/* Logo */}
      <div className="border-b border-slate-200 p-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-blue-600">
          VectorCV
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          AI Resume Intelligence
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-5">

        {menu.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            type="button"
            className={`mb-3 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left font-medium transition-all ${
              active
                ? "bg-blue-600 text-white shadow-lg"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}

      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 p-5">

        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 font-medium text-red-600 transition hover:bg-red-50"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>

      </div>

    </div>
  );
}

export default Sidebar;