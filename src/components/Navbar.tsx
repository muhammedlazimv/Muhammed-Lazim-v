import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { NAV_LINKS, PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Navbar({ activeSection, isDark, onToggleTheme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-panel border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm shadow-slate-900/[0.04] dark:shadow-black/25'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* Scroll reading progress bar */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600"
      />

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-5 sm:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="group flex items-center gap-2.5 whitespace-nowrap shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 font-display text-xs font-bold tracking-tight text-white shadow-sm shadow-blue-600/25 transition-transform duration-200 group-hover:scale-105">
            {PERSONAL_INFO.initials}
          </span>
          <span className="font-display text-base font-bold tracking-tight text-slate-900 dark:text-white">
            {PERSONAL_INFO.name}
          </span>
        </a>

        {/* Zone 2: Clean single-line typography navigation links */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Theme Toggle + Mobile Menu Trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/90 bg-white/80 text-slate-700 shadow-xs transition-all duration-200 hover:border-blue-400 hover:text-blue-600 dark:border-slate-700/80 dark:bg-slate-900/75 dark:text-slate-200 dark:hover:border-purple-400/70 dark:hover:text-purple-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? 'sun' : 'moon'}
                initial={{ rotate: -60, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 60, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.18 }}
                className="flex items-center justify-center"
              >
                {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
              </motion.span>
            </AnimatePresence>
          </button>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
            className="hidden md:inline-flex h-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-600/25 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#070B19]"
          >
            Contact Me
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200/90 bg-white/80 text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-700/80 dark:bg-slate-900/75 dark:text-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-b border-slate-200/80 bg-white/95 backdrop-blur-2xl dark:border-slate-800/80 dark:bg-[#0A1024]/95"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.id);
                    }}
                    className={`flex min-h-[44px] items-center rounded-xl px-4 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/70'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="pt-2">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('contact');
                  }}
                  className="flex min-h-[44px] w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 text-sm font-semibold text-white shadow-md shadow-blue-600/20"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
