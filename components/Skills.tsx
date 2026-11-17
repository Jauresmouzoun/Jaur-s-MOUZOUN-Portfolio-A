import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BarChart2, Cpu, CheckCircle2, Terminal, Compass } from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Tooltip,
} from 'recharts';
import { useApp } from '../context/AppContext';
import { portfolioData } from '../data/portfolioData';

export default function Skills() {
  const { language, theme } = useApp();
  const t = portfolioData[language].skills;

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const radarData = [
    {
      axis: language === 'fr' ? 'Économétrie' : 'Econometrics',
      score: 92,
    },
    {
      axis: language === 'fr' ? 'Statistique Math.' : 'Math. Stats',
      score: 90,
    },
    {
      axis: 'DataViz & BI',
      score: 88,
    },
    {
      axis: 'Machine Learning',
      score: 86,
    },
    {
      axis: language === 'fr' ? 'Dev & VBA/SQL' : 'Dev & VBA/SQL',
      score: 85,
    },
  ];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Terminal className="w-5 h-5 text-steel-500" />;
      case 'barChart':
        return <BarChart2 className="w-5 h-5 text-sky-500" />;
      case 'cpu':
        return <Cpu className="w-5 h-5 text-indigo-500" />;
      case 'check':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      default:
        return <Compass className="w-5 h-5 text-steel-500" />;
    }
  };

  const gridStroke = theme === 'dark' ? '#334155' : '#cbd5e1';
  const labelFill = theme === 'dark' ? '#cbd5e1' : '#334155';

  return (
    <section
      id="competences"
      ref={containerRef}
      className="py-24 bg-slate-100/70 dark:bg-night-800 relative overflow-hidden transition-colors duration-300"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-0 right-0 w-96 h-96 bg-steel-400/5 dark:bg-steel-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono font-semibold uppercase tracking-wider text-steel-600 dark:text-steel-400 mb-2">
            {language === 'fr' ? 'Savoir-Faire & Stack' : 'Expertise & Stack'}
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

        {/* 4 Skill Matrices (unboxed hairline rows instead of nested cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {t.categories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="bg-white dark:bg-night-900 rounded-2xl p-6 border border-slate-200 dark:border-night-700 shadow-sm flex flex-col"
            >
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-100 dark:border-night-800">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-night-800">
                  {getCategoryIcon(category.icon)}
                </div>
                <h3 className="text-base font-display font-bold text-slate-900 dark:text-offwhite leading-tight">
                  {category.title}
                </h3>
              </div>

              <ul className="divide-y divide-slate-100 dark:divide-night-800">
                {category.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="py-2.5 flex items-center justify-between gap-2 text-xs sm:text-sm"
                  >
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {item.name}
                    </span>
                    {item.badge && (
                      <span className="text-[11px] font-mono text-steel-600 dark:text-steel-400 whitespace-nowrap">
                        {item.badge}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Analytical Engineering Radar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-white dark:bg-night-900 rounded-2xl p-6 border border-slate-200 dark:border-night-700 shadow-sm flex flex-col"
        >
          <div className="text-center mb-2">
            <h3 className="text-base font-display font-bold text-slate-900 dark:text-offwhite mb-1">
              {language === 'fr' ? 'Profil d’Ingénierie Analytique' : 'Analytical Engineering Profile'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-muted">
              {language === 'fr'
                ? 'Équilibre entre théorie statistique, modélisation et déploiement'
                : 'Balance across statistical theory, modeling, and deployment'}
            </p>
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="74%" data={radarData}>
                <PolarGrid stroke={gridStroke} />
                <PolarAngleAxis
                  dataKey="axis"
                  tick={{ fill: labelFill, fontSize: 11, fontWeight: 500 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
                    borderColor: gridStroke,
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Radar
                  name={language === 'fr' ? 'Maîtrise' : 'Proficiency'}
                  dataKey="score"
                  stroke="#0ea5e9"
                  fill="#38bdf8"
                  fillOpacity={0.32}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}