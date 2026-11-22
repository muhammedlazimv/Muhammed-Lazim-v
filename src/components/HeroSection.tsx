import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, ArrowRight, Mail } from 'lucide-react';
import { PERSONAL_INFO, PROFILE_IMAGE_PATH, TYPING_PHRASES } from '../data/portfolioData';

export function HeroSection() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayedText(TYPING_PHRASES[0]);
      return;
    }

    const currentPhrase = TYPING_PHRASES[phraseIndex];
    let timeoutId: number;

    if (!isDeleting && displayedText === currentPhrase) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), 1700);
    } else if (isDeleting && displayedText === '') {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
      }, 320);
    } else {
      const nextLength = displayedText.length + (isDeleting ? -1 : 1);
      const delay = isDeleting ? 38 : 78;
      timeoutId = window.setTimeout(() => {
        setDisplayedText(currentPhrase.slice(0, nextLength));
      }, delay);
    }

    return () => window.clearTimeout(timeoutId);
  }, [displayedText, isDeleting, phraseIndex]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center px-5 pt-28 pb-20 sm:px-8 lg:pt-32 lg:pb-24"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Left: Typographic Hierarchy & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 flex flex-col items-center text-center lg:order-1 lg:col-span-7 lg:items-start lg:text-left"
        >
          <p className="mb-3 font-display text-sm font-semibold tracking-wide text-blue-600 dark:text-blue-400">
            {PERSONAL_INFO.profession}
          </p>

          <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl lg:leading-[1.08] dark:text-white">
            Muhammed{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
              Lazim V
            </span>
          </h1>

          {/* Animated Typing Text Line */}
          <div
            aria-live="polite"
            className="mt-4 flex min-h-[2.25rem] items-center gap-1.5 font-display text-lg font-semibold text-indigo-700 sm:text-xl dark:text-purple-300"
          >
            <span>{displayedText}</span>
            <span
              aria-hidden="true"
              className="animate-caret inline-block h-5 w-[2px] rounded-full bg-blue-600 dark:bg-purple-400"
            />
          </div>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            {PERSONAL_INFO.heroIntro}
          </p>

          {/* Primary & Secondary Buttons */}
          <div className="mt-9 flex w-full flex-col items-center gap-3.5 sm:w-auto sm:flex-row">
            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('projects')}
              className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-shadow duration-200 hover:shadow-xl hover:shadow-purple-600/30 sm:w-auto whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#070B19]"
            >
              <span>View My Work</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('contact')}
              className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-xl border border-slate-300/90 bg-white/80 px-7 py-3 text-sm font-semibold text-slate-800 backdrop-blur-md transition-all duration-200 hover:border-blue-500 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-purple-400 dark:hover:text-purple-300 sm:w-auto whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#070B19]"
            >
              <Mail className="h-4 w-4" />
              <span>Contact Me</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Right: Floating Circular Profile Photo Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 flex items-center justify-center lg:order-2 lg:col-span-5"
        >
          <div className="animate-float-gentle relative flex items-center justify-center">
            {/* Soft ambient glow behind portrait */}
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-full bg-gradient-to-tr from-blue-500/30 via-indigo-500/25 to-purple-500/30 blur-2xl dark:from-blue-600/35 dark:via-indigo-500/30 dark:to-purple-600/35"
            />

            {/* Rotating subtle gradient rim */}
            <div
              aria-hidden="true"
              className="animate-ring-spin absolute -inset-1.5 rounded-full bg-gradient-to-tr from-blue-600 via-purple-500 to-indigo-400 opacity-85"
            />

            {/* Inner crisp bezel & circular photo */}
            <div className="relative h-56 w-56 rounded-full bg-white p-1.5 shadow-2xl shadow-blue-950/15 sm:h-72 sm:w-72 lg:h-80 lg:w-80 dark:bg-[#0A1024] dark:shadow-black/50">
              <div className="h-full w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                {!imageError ? (
                  <img
                    src={PROFILE_IMAGE_PATH}
                    alt="Portrait of Muhammed Lazim V"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                    <span className="font-display text-5xl font-extrabold tracking-tight">
                      {PERSONAL_INFO.initials}
                    </span>
                    <span className="mt-2 text-xs font-medium text-blue-100">
                      {PERSONAL_INFO.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Full-width clean unboxed info strip below hero split */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="mt-16 border-t border-slate-200/80 pt-7 dark:border-slate-800/80"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">College</p>
            <p className="mt-1 font-display text-sm font-semibold text-slate-900 dark:text-slate-100">
              {PERSONAL_INFO.college}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">University</p>
            <p className="mt-1 font-display text-sm font-semibold text-slate-900 dark:text-slate-100">
              {PERSONAL_INFO.university}
            </p>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Location</p>
              <p className="mt-1 font-display text-sm font-semibold text-slate-900 dark:text-slate-100">
                {PERSONAL_INFO.location}
              </p>
            </div>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              aria-label="Scroll to About Me section"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-blue-600 transition-colors hover:text-purple-600 dark:text-blue-400 dark:hover:text-purple-400"
            >
              <span>Explore</span>
              <ArrowDownRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
