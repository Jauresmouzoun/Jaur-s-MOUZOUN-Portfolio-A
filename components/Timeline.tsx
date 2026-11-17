import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { portfolioData } from '../data/portfolioData';

export default function Timeline() {
  const { language } = useApp();
  const t = portfolioData[language].education;

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      id="formation"
      ref={containerRef}
      className="py-24 bg-slate-100/70 dark:bg-night-800 relative overflow-hidden transition-colors duration-300"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-steel-400/5 dark:bg-steel-600/5 rounded-full blur-[100px] -translate-x-1/2 pointer-events-none"
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono font-semibold uppercase tracking-wider text-steel-600 dark:text-steel-400 mb-2">
            {language === 'fr' ? 'Parcours Académique' : 'Academic Background'}
          </p>
          <h2
            className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 dark:text-offwhite mb-3"
            style={{ textWrap: 'balance' }}
          >
            {t.title}
          </h2>
          <div className="h-1 w-20 bg-steel-500 mx-auto rounded-full mb-4" />
          <p className="text-sm md:text-base text-slate-600 dark:text-muted max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-slate-300 dark:bg-night-700" />

          <div className="space-y-12">
            {t.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                } items-center w-full`}
              >
                <div className="w-full md:w-5/12 pl-12 md:pl-0">
                  <div
                    className={`bg-white dark:bg-night-900 p-6 sm:p-7 rounded-2xl border ${
                      item.active
                        ? 'border-steel-500/80 shadow-md'
                        : 'border-slate-200 dark:border-night-700 shadow-sm'
                    } hover:border-steel-400 dark:hover:border-steel-500/50 transition-colors group`}
                  >
                    {/* Quiet Unboxed Period & Status Metadata */}
                    <div className="text-xs font-mono text-slate-500 dark:text-muted mb-2 tabular-nums">
                      <span>{item.period}</span>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      <span>{item.location}</span>
                    </div>

                    <h3 className="text-lg font-display font-bold text-slate-900 dark:text-offwhite group-hover:text-steel-600 dark:group-hover:text-steel-400 transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs font-semibold text-steel-600 dark:text-steel-400 mt-1 mb-2">
                      {item.degreeType}
                    </p>

                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mb-4 flex items-start gap-1.5">
                      <GraduationCap size={14} className="shrink-0 mt-0.5 text-steel-500" />
                      <span>{item.institution}</span>
                    </p>

                    {item.courses && (
                      <div className="pt-3 border-t border-slate-100 dark:border-night-800">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                          <BookOpen size={13} className="text-steel-500" />
                          <span>{language === 'fr' ? 'Modules clés :' : 'Core Curriculum:'}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-muted leading-relaxed">
                          {item.courses}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Static Center Node */}
                <div
                  className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full z-10 top-7 md:top-1/2 md:-translate-y-1/2 border-2 ${
                    item.active
                      ? 'bg-steel-500 border-white dark:border-night-900'
                      : 'bg-white dark:bg-night-900 border-steel-500'
                  }`}
                />

                <div className="w-full md:w-5/12 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}