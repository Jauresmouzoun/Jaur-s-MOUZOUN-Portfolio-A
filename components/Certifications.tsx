import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BadgeCheck, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { portfolioData } from '../data/portfolioData';

export default function Certifications() {
  const { language } = useApp();
  const t = portfolioData[language].certifications;

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section
      id="certifications"
      ref={containerRef}
      className="py-20 bg-slate-50 dark:bg-night-900 relative overflow-hidden transition-colors duration-300"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-steel-400/5 dark:bg-steel-500/5 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs font-mono font-semibold uppercase tracking-wider text-steel-600 dark:text-steel-400 mb-2">
            {t.kicker}
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

        {/* Earned Certifications Grid (1 col mobile, 2 cols desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {t.items.map((cert, index) => (
            <motion.article
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-white dark:bg-night-800 rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-night-700 hover:border-steel-400 dark:hover:border-steel-500/50 transition-all duration-200 shadow-sm hover:shadow-lg flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-xl bg-steel-500/10 text-steel-600 dark:text-steel-400 shrink-0">
                      <BadgeCheck size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 dark:text-offwhite group-hover:text-steel-600 dark:group-hover:text-steel-400 transition-colors">
                        {cert.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-steel-600 dark:text-steel-400 font-medium">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-slate-600 dark:text-slate-300 whitespace-nowrap pt-1">
                    {cert.date}
                  </span>
                </div>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-night-700">
                  {cert.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-night-900 border border-slate-200 dark:border-night-700 text-xs font-medium text-slate-700 dark:text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verification Button (only rendered if verificationUrl exists) */}
              {cert.verificationUrl && (
                <div className="pt-5 mt-5 border-t border-slate-100 dark:border-night-700">
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-steel-50 dark:bg-steel-500/10 text-steel-700 dark:text-steel-300 hover:bg-steel-600 hover:text-white border border-steel-200 dark:border-steel-500/30 text-xs font-semibold transition-colors whitespace-nowrap"
                  >
                    <span>{t.verifyBtn}</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </motion.article>
          ))}
        </div>

        {/* Discreet "In Progress" Courses Strip */}
        {t.inProgressItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.12 }}
            className="mt-8 rounded-xl px-5 py-4 bg-slate-100/80 dark:bg-night-800/50 border border-slate-200/80 dark:border-night-700/60"
          >
            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-muted mb-2.5">
              {t.inProgressTitle}
            </p>
            <ul className="space-y-1.5 text-xs text-slate-500 dark:text-muted">
              {t.inProgressItems.map((course) => (
                <li key={course.id} className="leading-relaxed">
                  <span>{course.title}</span>
                  <span aria-hidden="true"> — </span>
                  <span className="text-slate-600 dark:text-slate-400">{course.institution}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </section>
  );
}
