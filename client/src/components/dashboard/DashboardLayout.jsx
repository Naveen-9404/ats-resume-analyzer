import { Menu } from "lucide-react";
import { useState } from "react";

function DashboardLayout({ sidebar, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">

        {/* Desktop Sidebar */}
        <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white lg:block">
          {sidebar}
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />

            <aside className="fixed left-0 top-0 z-50 h-full w-72 bg-white shadow-2xl lg:hidden">
              {sidebar}
            </aside>
          </>
        )}

        {/* Main Content */}
        <div className="flex min-h-screen flex-1 flex-col">

          {/* Mobile Header */}
          <header className="flex items-center border-b border-slate-200 bg-white px-5 py-4 lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 transition hover:bg-slate-100"
            >
              <Menu size={22} />
            </button>

            <h1 className="ml-4 text-lg font-bold text-slate-800">
              VectorCV
            </h1>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
          </main>

        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;