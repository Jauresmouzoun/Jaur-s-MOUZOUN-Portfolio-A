import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, CheckCircle2, Users, TrendingUp, BarChart3, Building2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { portfolioData } from '../data/portfolioData';

export default function Experience() {
  const { language } = useApp();
  const t = portfolioData[language].experience;

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const getExperienceIcon = (id: string) => {
    switch (id) {
      case 'dpaf':
        return <BarChart3 className="w-7 h-7 text-steel-500" />;
      case 'socioanimer':
        return <TrendingUp className="w-7 h-7 text-sky-500" />;
      case 'begise':
        return <Users className="w-7 h-7 text-indigo-500" />;
      default:
        return <Briefcase className="w-7 h-7 text-steel-500" />;
    }
  };

  return (
    <section
      id="experiences"
      ref={containerRef}
      className="py-24 bg-slate-50 dark:bg-night-900 relative overflow-hidden transition-colors duration-300"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-steel-400/5 dark:bg-steel-600/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono font-semibold uppercase tracking-wider text-steel-600 dark:text-steel-400 mb-2">
            {language === 'fr' ? 'Parcours Terrain' : 'Career Milestones'}
          </p>
          <h2
            className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 dark:text-offwhite mb-3"
            style={{ textWrap: 'balance' }}
          >
            {t.title}
          </h2>
          <div className="h-1 w-20 bg-steel-500 mx-auto rounded-full mb-4" />
          <p className="text-sm md:text-base text-slate-600 dark:text-muted max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {t.items.map((exp, idx) => (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="bg-white dark:bg-night-800 rounded-2xl p-7 border border-slate-200 dark:border-night-700 hover:border-steel-400 dark:hover:border-steel-500/40 transition-colors duration-200 shadow-sm hover:shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-night-900 border border-slate-200/80 dark:border-night-700">
                    {getExperienceIcon(exp.id)}
                  </div>
                  <div className="text-right text-xs font-mono text-slate-500 dark:text-muted tabular-nums">
                    <div>{exp.period}</div>
                    {exp.badge && (
                      <div className="text-[11px] font-sans font-semibold text-steel-600 dark:text-steel-400 mt-0.5">
                        {exp.badge}
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-display font-bold text-slate-900 dark:text-offwhite group-hover:text-steel-600 dark:group-hover:text-steel-400 transition-colors mb-1.5 leading-snug">
                  {exp.role}
                </h3>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-start gap-1.5">
                  <Building2 size={13} className="shrink-0 mt-0.5 text-steel-500" />
                  <span>{exp.organization}</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-muted mb-6">
                  {exp.location}
                </p>

                <ul className="space-y-3.5 pt-4 border-t border-slate-100 dark:border-night-700">
                  {exp.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-steel-500 shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-muted leading-relaxed">
                        <strong className="text-slate-800 dark:text-offwhite font-semibold">
                          {pt.title} :{' '}
                        </strong>
                        {pt.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}