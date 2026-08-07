import {
  Code2,
  Globe2,
  ScanSearch,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          {/* Brand */}

          <div className="max-w-md">
            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-lg">
                <ScanSearch size={22} />
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  Vector
                  <span className="text-emerald-400">
                    CV
                  </span>
                </h2>

                <p className="text-xs text-slate-500">
                  AI-Powered Career Intelligence
                </p>
              </div>
            </Link>

            <p className="mt-6 leading-7 text-slate-400">
              VectorCV helps students and
              professionals build ATS-friendly
              resumes, receive AI-powered career
              insights, and improve interview
              readiness with intelligent resume
              analysis.
            </p>
          </div>

          {/* Links */}

          <div className="grid grid-cols-2 gap-12 text-sm lg:grid-cols-3">
            <div>
              <h3 className="mb-4 font-semibold text-white">
                Product
              </h3>

              <div className="space-y-3">
                <a
                  href="#features"
                  className="block hover:text-white"
                >
                  Features
                </a>

                <a
                  href="#how-it-works"
                  className="block hover:text-white"
                >
                  How it Works
                </a>

                <a
                  href="#testimonials"
                  className="block hover:text-white"
                >
                  Reviews
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-white">
                Account
              </h3>

              <div className="space-y-3">
                <Link
                  to="/login"
                  className="block hover:text-white"
                >
                  Log In
                </Link>

                <Link
                  to="/register"
                  className="block hover:text-white"
                >
                  Register
                </Link>

                <Link
                  to="/dashboard"
                  className="block hover:text-white"
                >
                  Dashboard
                </Link>
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-white">
                Resources
              </h3>

              <div className="space-y-3">
                <a
                  href="#faq"
                  className="block hover:text-white"
                >
                  FAQ
                </a>

                <a
                  href="#"
                  className="block hover:text-white"
                >
                  Privacy Policy
                </a>

                <a
                  href="#"
                  className="block hover:text-white"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-14 flex flex-col gap-6 border-t border-slate-800 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">
              VectorCV
            </span>
            . All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              className="transition hover:text-white"
            >
              <Send size={19} />
            </a>

            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="transition hover:text-white"
            >
              <Globe2 size={19} />
            </a>

            <a
              href="https://github.com"
              aria-label="GitHub"
              className="transition hover:text-white"
            >
              <Code2 size={19} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;