import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

export function PageLoader() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 650);
    return () => window.clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } }}
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-[#070B19]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.04, y: -6 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-600/25">
              <span className="font-display text-xl font-bold tracking-tight">
                {PERSONAL_INFO.initials}
              </span>
            </div>
            <div className="h-1 w-32 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
