import {
  LayoutDashboard,
  FileText,
  History,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const menu = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: FileText,
    label: "Analyze Resume",
    path: "/analyze",
  },
  {
    icon: History,
    label: "History",
    path: "/dashboard#history",
  },
];

function Sidebar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    if (path === "/dashboard#history") {
      navigate("/dashboard");

      setTimeout(() => {
        document
          .getElementById("resume-history")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);

      return;
    }

    navigate(path);
  };

  return (
    <aside className="flex h-full w-full flex-col bg-white">
      {/* Logo */}
      <div className="border-b border-slate-200 p-8">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="text-left"
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-600">
            VectorCV
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            AI Resume Intelligence
          </p>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-5">
        {menu.map(({ icon: Icon, label, path }) => {
          const isActive =
            path === "/dashboard"
              ? location.pathname === "/dashboard"
              : path === "/analyze"
                ? location.pathname === "/analyze"
                : false;

          return (
            <button
              key={label}
              type="button"
              onClick={() => handleNavigation(path)}
              className={`mb-3 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left font-medium transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          );
        })}
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
    </aside>
  );
}

export default Sidebar;