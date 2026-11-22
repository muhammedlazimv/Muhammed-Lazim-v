import { motion } from 'motion/react';
import {
  Clock,
  Compass,
  Flame,
  Lightbulb,
  MessageSquare,
  Scale,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { PERSONAL_SKILLS, type PersonalSkill } from '../data/portfolioData';

const SKILL_ICON_MAP: Record<PersonalSkill['iconKey'], LucideIcon> = {
  leadership: Compass,
  communication: MessageSquare,
  problemSolving: Lightbulb,
  decisionMaking: Scale,
  teamwork: Users,
  timeManagement: Clock,
  hardworking: Flame,
};

const ACCENT_STYLES: Record<
  PersonalSkill['accent'],
  { iconBg: string; ringHover: string; indexText: string }
> = {
  blue: {
    iconBg:
      'bg-blue-600/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/15 dark:text-blue-400 dark:group-hover:bg-blue-500 dark:group-hover:text-white',
    ringHover:
      'hover:border-blue-400/70 hover:shadow-blue-600/10 dark:hover:border-blue-400/50 dark:hover:shadow-blue-500/15',
    indexText: 'text-blue-600/70 dark:text-blue-400/80',
  },
  purple: {
    iconBg:
      'bg-purple-600/10 text-purple-600 group-hover:bg-purple-600 group-hover:text-white dark:bg-purple-500/15 dark:text-purple-400 dark:group-hover:bg-purple-500 dark:group-hover:text-white',
    ringHover:
      'hover:border-purple-400/70 hover:shadow-purple-600/10 dark:hover:border-purple-400/50 dark:hover:shadow-purple-500/15',
    indexText: 'text-purple-600/70 dark:text-purple-400/80',
  },
  indigo: {
    iconBg:
      'bg-indigo-600/10 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-500/15 dark:text-indigo-400 dark:group-hover:bg-indigo-500 dark:group-hover:text-white',
    ringHover:
      'hover:border-indigo-400/70 hover:shadow-indigo-600/10 dark:hover:border-indigo-400/50 dark:hover:shadow-indigo-500/15',
    indexText: 'text-indigo-600/70 dark:text-indigo-400/80',
  },
};

export function SkillsSection() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="font-display text-sm font-semibold text-blue-600 dark:text-blue-400">
          Skills &amp; Personal Strengths
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
          Core Personal &amp; Professional Strengths
        </h2>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
          The interpersonal qualities, mindset, and habits that shape how I learn, collaborate, and solve problems.
        </p>
      </motion.div>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PERSONAL_SKILLS.map((skill, idx) => {
          const Icon = SKILL_ICON_MAP[skill.iconKey];
          const tone = ACCENT_STYLES[skill.accent];
          const isLastFeatured = idx === PERSONAL_SKILLS.length - 1;

          return (
            <motion.article
              key={skill.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -5 }}
              className={`glass-card group relative overflow-hidden rounded-2xl border border-slate-200/80 p-6 shadow-md shadow-slate-900/[0.03] transition-all duration-300 dark:border-slate-800/80 dark:shadow-black/25 ${
                tone.ringHover
              } ${isLastFeatured ? 'sm:col-span-2 lg:col-span-3' : ''}`}
            >
              {/* Subtle hover gradient sheen */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/[0.04] via-transparent to-purple-500/[0.06] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div
                className={`relative flex flex-col ${
                  isLastFeatured ? 'lg:flex-row lg:items-center lg:gap-8' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-4 lg:shrink-0">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 group-hover:scale-105 ${tone.iconBg}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`font-mono text-xs font-semibold tabular-nums ${tone.indexText} ${
                      isLastFeatured ? 'lg:hidden' : ''
                    }`}
                  >
                    {skill.index}
                  </span>
                </div>

                <div className={isLastFeatured ? 'mt-5 lg:mt-0 lg:flex-1' : 'mt-5'}>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-bold text-slate-950 dark:text-white">
                      {skill.title}
                    </h3>
                    {isLastFeatured && (
                      <span
                        className={`hidden font-mono text-xs font-semibold tabular-nums lg:inline ${tone.indexText}`}
                      >
                        {skill.index}
                      </span>
                    )}
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {skill.description}
                  </p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
