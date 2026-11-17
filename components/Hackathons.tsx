import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { portfolioData } from '../data/portfolioData';

export default function Hackathons() {
  const { language } = useApp();
  const t = portfolioData[language].hackathons;

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section
      id="bootcamps"
      ref={containerRef}
      className="py-20 bg-slate-50 dark:bg-night-900 relative overflow-hidden transition-colors duration-300"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-steel-400/5 dark:bg-steel-500/5 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs font-mono font-semibold uppercase tracking-wider text-steel-600 dark:text-steel-400 mb-2">
            {language === 'fr' ? 'Compétition & Immersion' : 'Competitions & Immersion'}
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="bg-white dark:bg-night-800 rounded-2xl p-8 sm:p-10 border border-slate-200 dark:border-night-700 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-steel-500/10 text-steel-600 dark:text-steel-400">
                <Award size={26} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-offwhite">
                  {t.name}
                </h3>
                <p className="text-xs sm:text-sm text-steel-600 dark:text-steel-400 font-medium">
                  {t.organizer}
                </p>
              </div>
            </div>

            <div className="text-xs font-mono text-slate-500 dark:text-muted">
              <span>{t.period}</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span className="text-steel-600 dark:text-steel-400 font-semibold">{t.badge}</span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-muted leading-relaxed mb-6">
            {t.description}
          </p>

          <div className="pt-5 border-t border-slate-200/80 dark:border-night-700">
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">
              {language === 'fr' ? 'Compétences & Livrables développés :' : 'Core Skills & Takeaways:'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {t.topics.map((topic, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-night-900 border border-slate-200 dark:border-night-700 text-xs font-medium text-slate-700 dark:text-slate-200"
                >
                  <CheckCircle2 size={14} className="text-steel-500 shrink-0" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
