import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe2, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { portfolioData } from '../data/portfolioData';

export default function LanguagesInterests() {
  const { language } = useApp();
  const t = portfolioData[language].skills;

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section
      id="langues"
      ref={containerRef}
      className="py-20 bg-slate-100/70 dark:bg-night-800 relative overflow-hidden transition-colors duration-300"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-0 right-0 w-96 h-96 bg-steel-400/5 dark:bg-steel-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs font-mono font-semibold uppercase tracking-wider text-steel-600 dark:text-steel-400 mb-2">
            {t.languagesSectionKicker}
          </p>
          <h2
            className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 dark:text-offwhite mb-3"
            style={{ textWrap: 'balance' }}
          >
            {t.languagesSectionTitle}
          </h2>
          <div className="h-1 w-20 bg-steel-500 mx-auto rounded-full mb-4" />
          <p className="text-sm md:text-base text-slate-600 dark:text-muted max-w-2xl mx-auto">
            {t.languagesSectionSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {/* Spoken Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-night-900 rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-night-700 shadow-sm"
          >
            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100 dark:border-night-800">
              <Globe2 size={20} className="text-steel-500" />
              <h3 className="text-base font-display font-bold text-slate-900 dark:text-offwhite">
                {t.spokenLanguagesTitle}
              </h3>
            </div>

            <ul className="divide-y divide-slate-100 dark:divide-night-800">
              {t.spokenLanguages.map((lang, lIdx) => (
                <li key={lIdx} className="py-3 flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-offwhite">
                    {lang.name}
                  </span>
                  <span className="text-xs font-medium text-steel-600 dark:text-steel-400">
                    {lang.level}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Interests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="bg-white dark:bg-night-900 rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-night-700 shadow-sm"
          >
            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100 dark:border-night-800">
              <Heart size={20} className="text-rose-500" />
              <h3 className="text-base font-display font-bold text-slate-900 dark:text-offwhite">
                {t.interestsTitle}
              </h3>
            </div>

            <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              {t.interests.map((interest, iIdx) => (
                <li key={iIdx} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-steel-500 shrink-0" aria-hidden="true" />
                  <span>{interest}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
