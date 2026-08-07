import { Menu, ScanSearch, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const links = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Reviews", href: "#testimonials" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg">
            <ScanSearch size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Vector
              <span className="text-emerald-600">
                CV
              </span>
            </h1>

            <p className="text-[11px] font-medium text-slate-500">
              AI-Powered Career Intelligence
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}

        <div className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-slate-600 transition hover:text-slate-900"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Buttons */}

        <div className="hidden items-center gap-5 md:flex">
          <Link
            to="/login"
            className="text-sm font-semibold text-slate-700 transition hover:text-slate-950"
          >
            Log in
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:scale-105 hover:bg-slate-800"
          >
            Get Started Free
          </Link>
        </div>

        {/* Mobile */}

        <button
          onClick={() => setOpen(!open)}
          className="text-slate-700 md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="overflow-hidden border-t border-slate-200 bg-white px-6 md:hidden"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() =>
                  setOpen(false)
                }
                className="block py-4 text-sm font-medium text-slate-700"
              >
                {link.label}
              </a>
            ))}

            <div className="flex gap-5 py-5">
              <Link
                to="/login"
                className="font-semibold"
              >
                Log in
              </Link>

              <Link
                to="/register"
                className="font-semibold text-emerald-600"
              >
                Get Started Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;