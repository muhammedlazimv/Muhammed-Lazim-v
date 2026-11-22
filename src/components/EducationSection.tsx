import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { BookOpen, Calendar, GraduationCap } from 'lucide-react';
import { EDUCATION_TIMELINE } from '../data/portfolioData';

export function EducationSection() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 60%'],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0.05, 1]);

  return (
    <section
      id="education"
      className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="font-display text-sm font-semibold text-purple-600 dark:text-purple-400">
          Education
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
          Academic Background
        </h2>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
          Educational milestones from secondary studies to pursuing Computer Science at Calicut University.
        </p>
      </motion.div>

      {/* Modern Animated Vertical Timeline */}
      <div ref={timelineRef} className="relative mx-auto mt-16 max-w-3xl">
        {/* Static track */}
        <div
          aria-hidden="true"
          className="absolute top-3 bottom-3 left-5 w-[2px] -translate-x-1/2 bg-slate-200 dark:bg-slate-800 sm:left-1/2"
        />

        {/* Animated scroll-driven gradient fill */}
        <motion.div
          aria-hidden="true"
          style={{ scaleY: lineScaleY }}
          className="absolute top-3 bottom-3 left-5 w-[2px] -translate-x-1/2 origin-top bg-gradient-to-b from-blue-600 via-indigo-500 to-purple-600 sm:left-1/2"
        />

        <ol className="relative space-y-10 sm:space-y-12">
          {EDUCATION_TIMELINE.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            const isCurrent = idx === 0;

            return (
              <li
                key={item.id}
                className="relative grid grid-cols-1 items-start sm:grid-cols-2"
              >
                {/* Animated timeline indicator node */}
                <motion.div
                  initial={{ scale: 0.4, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  aria-hidden="true"
                  className="absolute top-5 left-5 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-blue-500/40 bg-white shadow-md shadow-blue-600/15 dark:border-purple-400/50 dark:bg-[#0B1226] sm:left-1/2"
                >
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-white ${
                      isCurrent
                        ? 'bg-gradient-to-br from-blue-600 to-purple-600'
                        : 'bg-gradient-to-br from-indigo-500 to-purple-500'
                    }`}
                  >
                    {isCurrent ? (
                      <GraduationCap className="h-3.5 w-3.5" />
                    ) : (
                      <BookOpen className="h-3.5 w-3.5" />
                    )}
                  </div>
                </motion.div>

                {/* Timeline Card positioned alternately on desktop */}
                <motion.div
                  initial={{ opacity: 0, y: 24, x: isLeft ? -16 : 16 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.55,
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -3 }}
                  className={`pl-14 sm:pl-0 ${
                    isLeft
                      ? 'sm:col-start-1 sm:pr-11 sm:text-right'
                      : 'sm:col-start-2 sm:pl-11 sm:text-left'
                  }`}
                >
                  <div className="glass-card rounded-2xl border border-slate-200/80 p-6 shadow-md shadow-slate-900/[0.03] transition-colors duration-200 hover:border-blue-400/60 dark:border-slate-800/80 dark:shadow-black/25 dark:hover:border-purple-400/50">
                    <div
                      className={`flex flex-wrap items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 ${
                        isLeft ? 'sm:justify-end' : 'sm:justify-start'
                      }`}
                    >
                      <Calendar className="h-3.5 w-3.5 shrink-0" />
                      <span className="font-mono tabular-nums">{item.period}</span>
                      <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">
                        ·
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">{item.status}</span>
                    </div>

                    <h3 className="mt-3 font-display text-lg font-bold text-slate-950 dark:text-white">
                      {item.degree}
                    </h3>

                    <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                      {item.institution}
                    </p>

                    {item.affiliation && (
                      <p className="mt-1 text-sm text-purple-600 dark:text-purple-400">
                        {item.affiliation}
                      </p>
                    )}
                  </div>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
