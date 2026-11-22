import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  CheckCircle2,
  Eye,
  Monitor,
  Moon,
  Smartphone,
  Sun,
  X,
} from 'lucide-react';
import { FEATURED_PROJECT, PERSONAL_INFO, PROFILE_IMAGE_PATH } from '../data/portfolioData';

interface ProjectsSectionProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function ProjectsSection({ isDark, onToggleTheme }: ProjectsSectionProps) {
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>(isDark ? 'dark' : 'light');
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    setPreviewTheme(isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    if (!detailsOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDetailsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [detailsOpen]);

  const scrollToContact = () => {
    setDetailsOpen(false);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const mockIsDark = previewTheme === 'dark';

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="font-display text-sm font-semibold text-purple-600 dark:text-purple-400">
          Featured Project
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
          Selected Work
        </h2>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
          Focused on responsive layout craftsmanship, clear visual hierarchy, and smooth user interaction.
        </p>
      </motion.div>

      <motion.article
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card mx-auto mt-14 overflow-hidden rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-900/[0.04] dark:border-slate-800/80 dark:shadow-black/35"
      >
        {/* Top Interactive Preview Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 bg-slate-100/70 px-5 py-3.5 sm:px-7 dark:border-slate-800/80 dark:bg-slate-900/70">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {FEATURED_PROJECT.category}
          </div>

          <div className="flex items-center gap-2">
            {/* Interactive Viewport Switcher */}
            <div
              role="group"
              aria-label="Preview viewport size"
              className="flex items-center gap-1 rounded-lg bg-white/90 p-1 shadow-xs dark:bg-slate-950/80"
            >
              <button
                type="button"
                onClick={() => setPreviewViewport('desktop')}
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
                  previewViewport === 'desktop'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <Monitor className="h-3.5 w-3.5" />
                <span>Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewViewport('mobile')}
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
                  previewViewport === 'mobile'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span>Mobile</span>
              </button>
            </div>

            {/* Interactive Preview Theme Switcher */}
            <button
              type="button"
              onClick={() => setPreviewTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              aria-label="Toggle mockup theme preview"
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-700 transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-300 dark:hover:border-purple-400 dark:hover:text-purple-300 whitespace-nowrap"
            >
              {mockIsDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
              <span>{mockIsDark ? 'Light Preview' : 'Dark Preview'}</span>
            </button>
          </div>
        </div>

        {/* Main Card Split */}
        <div className="grid grid-cols-1 items-center gap-10 p-6 sm:p-8 lg:grid-cols-12 lg:p-10">
          {/* Interactive Live Miniature Preview */}
          <div className="flex items-center justify-center lg:col-span-6">
            <motion.div
              layout
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`relative overflow-hidden rounded-2xl border shadow-lg transition-colors duration-300 ${
                previewViewport === 'mobile' ? 'w-60' : 'w-full'
              } ${
                mockIsDark
                  ? 'border-slate-700/80 bg-[#080D1E] text-white shadow-black/40'
                  : 'border-slate-200 bg-white text-slate-900 shadow-slate-900/10'
              }`}
            >
              {/* Mini ambient gradient */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-12 right-0 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-2xl"
              />

              {/* Mini Header */}
              <div
                className={`flex items-center justify-between border-b px-4 py-2.5 text-[11px] ${
                  mockIsDark ? 'border-slate-800' : 'border-slate-100'
                }`}
              >
                <div className="flex items-center gap-1.5 font-display font-bold">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-purple-600 text-[9px] text-white">
                    {PERSONAL_INFO.initials}
                  </span>
                  <span className="truncate">{PERSONAL_INFO.name}</span>
                </div>
                {previewViewport === 'desktop' && (
                  <div
                    className={`flex items-center gap-3 text-[10px] ${
                      mockIsDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    <span>About</span>
                    <span>Education</span>
                    <span>Skills</span>
                    <span>Contact</span>
                  </div>
                )}
              </div>

              {/* Mini Hero Body */}
              <div
                className={`relative p-5 ${
                  previewViewport === 'desktop'
                    ? 'flex items-center justify-between gap-4'
                    : 'flex flex-col items-center text-center gap-3'
                }`}
              >
                <div className={previewViewport === 'desktop' ? 'flex-1' : 'order-2'}>
                  <p className="text-[10px] font-semibold text-blue-500">
                    {PERSONAL_INFO.profession}
                  </p>
                  <p className="mt-1 font-display text-base font-bold leading-tight">
                    {PERSONAL_INFO.name}
                  </p>
                  <p
                    className={`mt-1.5 text-[11px] leading-relaxed ${
                      mockIsDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Responsive layout, dark mode, smooth animations, and interactive contact.
                  </p>
                  <div
                    className={`mt-3 flex gap-2 ${
                      previewViewport === 'mobile' ? 'justify-center' : ''
                    }`}
                  >
                    <span className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-2.5 py-1 text-[10px] font-semibold text-white">
                      View Work
                    </span>
                    <span
                      className={`rounded-lg border px-2.5 py-1 text-[10px] font-medium ${
                        mockIsDark
                          ? 'border-slate-700 text-slate-300'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      Contact
                    </span>
                  </div>
                </div>

                <div
                  className={`shrink-0 rounded-full bg-gradient-to-tr from-blue-600 to-purple-500 p-0.5 ${
                    previewViewport === 'desktop' ? 'h-20 w-20' : 'order-1 h-16 w-16'
                  }`}
                >
                  <img
                    src={PROFILE_IMAGE_PATH}
                    alt="Miniature portfolio preview avatar"
                    referrerPolicy="no-referrer"
                    className="h-full w-full rounded-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Mini Footer Strip */}
              <div
                className={`flex items-center justify-between border-t px-4 py-2 text-[10px] ${
                  mockIsDark
                    ? 'border-slate-800/80 text-slate-400'
                    : 'border-slate-100 text-slate-500'
                }`}
              >
                <span>{previewViewport === 'desktop' ? 'Desktop View' : 'Mobile View'}</span>
                <span>{mockIsDark ? 'Dark Theme' : 'Light Theme'}</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Project Description & Functional Controls */}
          <div className="lg:col-span-6">
            <h3 className="font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
              {FEATURED_PROJECT.title}
            </h3>

            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {FEATURED_PROJECT.description}
            </p>

            {/* Clean unboxed feature list */}
            <ul className="mt-6 space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
              {FEATURED_PROJECT.highlights.slice(0, 3).map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-purple-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setDetailsOpen(true)}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-shadow hover:shadow-lg hover:shadow-purple-600/25 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <Eye className="h-4 w-4" />
                <span>View Project Details</span>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onToggleTheme}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-300/90 bg-white/80 px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-blue-500 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-purple-400 dark:hover:text-purple-300 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span>Test Site {isDark ? 'Light' : 'Dark'} Mode</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.article>

      {/* Accessible Project Details Modal */}
      <AnimatePresence>
        {detailsOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDetailsOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8 dark:border-slate-800 dark:bg-[#0B1226]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {FEATURED_PROJECT.category}
                  </p>
                  <h3
                    id="project-modal-title"
                    className="mt-1 font-display text-2xl font-bold text-slate-950 dark:text-white"
                  >
                    {FEATURED_PROJECT.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setDetailsOpen(false)}
                  aria-label="Close project details"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                {FEATURED_PROJECT.description}
              </p>

              <div className="mt-6 border-t border-slate-200 pt-5 dark:border-slate-800">
                <h4 className="font-display text-sm font-semibold text-slate-900 dark:text-white">
                  Key Features Implemented
                </h4>
                <ul className="mt-3 space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
                  {FEATURED_PROJECT.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-purple-600 dark:text-purple-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDetailsOpen(false)}
                  className="inline-flex min-h-[42px] items-center justify-center rounded-xl border border-slate-300 px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 text-sm font-semibold text-white shadow-md shadow-blue-600/20"
                >
                  Discuss This Project
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
