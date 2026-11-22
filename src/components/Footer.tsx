import { ArrowUp, Mail } from 'lucide-react';
import { NAV_LINKS, PERSONAL_INFO } from '../data/portfolioData';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="relative border-t border-slate-200/80 bg-white/70 backdrop-blur-xl dark:border-slate-800/80 dark:bg-[#060915]/80">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Brand Summary */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 font-display text-xs font-bold text-white">
                {PERSONAL_INFO.initials}
              </span>
              <span className="font-display text-base font-bold text-slate-950 dark:text-white">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-400">
              {PERSONAL_INFO.profession} · {PERSONAL_INFO.location}
            </p>
          </div>

          {/* Quick Navigation */}
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Direct Actions */}
          <div className="flex items-center gap-2.5">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              aria-label="Send email to Muhammed Lazim V"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-medium text-slate-700 transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-purple-400 dark:hover:text-purple-300 whitespace-nowrap"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Email</span>
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-purple-400 dark:hover:text-purple-300"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-slate-200/80 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center dark:border-slate-800/80 dark:text-slate-400">
          <p>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </p>
          <p>
            {PERSONAL_INFO.college} · {PERSONAL_INFO.university}
          </p>
        </div>
      </div>
    </footer>
  );
}
