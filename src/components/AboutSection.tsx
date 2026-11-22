import { motion } from 'motion/react';
import { Building2, GraduationCap, Layers, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

const ABOUT_CARDS = [
  {
    label: 'College',
    value: PERSONAL_INFO.college,
    icon: Building2,
    iconTone:
      'bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400',
  },
  {
    label: 'University',
    value: PERSONAL_INFO.university,
    icon: GraduationCap,
    iconTone:
      'bg-purple-500/10 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400',
  },
  {
    label: 'Location',
    value: PERSONAL_INFO.location,
    icon: MapPin,
    iconTone:
      'bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400',
  },
  {
    label: 'Core Interests',
    value: 'Web Development & UI Design',
    icon: Layers,
    iconTone:
      'bg-blue-500/10 text-blue-600 dark:bg-purple-500/15 dark:text-purple-300',
  },
] as const;

export function AboutSection() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-12">
        {/* Left column: Section title and About Me narrative */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6"
        >
          <p className="font-display text-sm font-semibold text-blue-600 dark:text-blue-400">
            About Me
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
            Building responsive web experiences with curiosity and purpose
          </h2>

          <div className="glass-card mt-7 rounded-2xl border border-slate-200/80 p-7 shadow-lg shadow-slate-900/[0.03] dark:border-slate-800/80 dark:shadow-black/25">
            <p className="text-base leading-relaxed text-slate-700 sm:text-[17px] sm:leading-8 dark:text-slate-200">
              {PERSONAL_INFO.aboutParagraph}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
            <span>{PERSONAL_INFO.name}</span>
            <span aria-hidden="true">·</span>
            <span>{PERSONAL_INFO.profession}</span>
          </div>
        </motion.div>

        {/* Right column: Four structured highlight cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6 lg:pt-8">
          {ABOUT_CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.52,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4 }}
                className="glass-card group rounded-2xl border border-slate-200/80 p-6 shadow-md shadow-slate-900/[0.03] transition-colors duration-200 hover:border-blue-400/60 dark:border-slate-800/80 dark:shadow-black/20 dark:hover:border-purple-400/50"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${card.iconTone}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-5 text-xs font-medium text-slate-500 dark:text-slate-400">
                  {card.label}
                </p>
                <h3 className="mt-1 font-display text-base font-semibold leading-snug text-slate-900 dark:text-white">
                  {card.value}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
