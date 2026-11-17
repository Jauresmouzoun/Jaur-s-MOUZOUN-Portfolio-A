import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Box, ArrowRight, Target, FlaskConical, TrendingUp, BarChart3 } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { ProjectItem, LabSceneId } from '../data/portfolioData';
import { useApp } from '../context/AppContext';

interface ProjectCaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onLaunch3D: (sceneId: LabSceneId) => void;
  onRequestCode: (projectTitle: string) => void;
}

export default function ProjectCaseStudyModal({
  project,
  onClose,
  onLaunch3D,
  onRequestCode,
}: ProjectCaseStudyModalProps) {
  const { language, theme } = useApp();

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  const axisColor = theme === 'dark' ? '#94a3b8' : '#64748b';
  const gridColor = theme === 'dark' ? '#1e293b' : '#e2e8f0';
  const tooltipBg = theme === 'dark' ? '#0f172a' : '#ffffff';
  const tooltipBorder = theme === 'dark' ? '#334155' : '#cbd5e1';

  const renderChart = (proj: ProjectItem) => {
    const { chartType, chartData } = proj.caseStudy;

    switch (chartType) {
      case 'auprc':
        return (
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={chartData} margin={{ top: 10, right: 16, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="smoteGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="recall" stroke={axisColor} fontSize={12} />
              <YAxis domain={[0, 1]} stroke={axisColor} fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBg,
                  borderColor: tooltipBorder,
                  borderRadius: '10px',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Area
                type="monotone"
                dataKey="smote"
                name="SMOTE + Random Forest"
                stroke="#0ea5e9"
                strokeWidth={2.5}
                fill="url(#smoteGrad)"
              />
              <Area
                type="monotone"
                dataKey="baseline"
                name="Baseline (Déséquilibré)"
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="4 4"
                fill="transparent"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'benchmark':
        return (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData} margin={{ top: 10, right: 16, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="model" stroke={axisColor} fontSize={11} />
              <YAxis domain={[85, 100]} stroke={axisColor} fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBg,
                  borderColor: tooltipBorder,
                  borderRadius: '10px',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="accuracy" name="Accuracy (%)" fill="#0284c7" radius={[4, 4, 0, 0]} />
              <Bar dataKey="f1" name="F1-Score (%)" fill="#38bdf8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'timeseries':
        return (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} margin={{ top: 10, right: 16, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="year" stroke={axisColor} fontSize={12} />
              <YAxis domain={[1000, 1550]} stroke={axisColor} fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBg,
                  borderColor: tooltipBorder,
                  borderRadius: '10px',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line
                type="monotone"
                dataKey="observed"
                name={language === 'fr' ? 'Observé (mm)' : 'Observed (mm)'}
                stroke="#38bdf8"
                strokeWidth={2.5}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="forecast"
                name="Holt-Winters"
                stroke="#f59e0b"
                strokeWidth={2.5}
                strokeDasharray="5 4"
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'pca':
        return (
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={chartData} margin={{ top: 10, right: 16, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="axis" stroke={axisColor} fontSize={12} />
              <YAxis domain={[0, 100]} stroke={axisColor} fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBg,
                  borderColor: tooltipBorder,
                  borderRadius: '10px',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar
                dataKey="variance"
                name={language === 'fr' ? 'Variance axe (%)' : 'Axis Variance (%)'}
                fill="#0284c7"
                radius={[4, 4, 0, 0]}
              />
              <Line
                type="monotone"
                dataKey="cumulative"
                name={language === 'fr' ? 'Inertie cumulée (%)' : 'Cumulative (%)'}
                stroke="#f59e0b"
                strokeWidth={2.5}
                dot={{ r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        );

      case 'architecture':
        return (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 10, right: 20, left: 25, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis type="number" domain={[0, 40]} stroke={axisColor} fontSize={12} />
              <YAxis dataKey="module" type="category" stroke={axisColor} fontSize={11} width={120} />
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBg,
                  borderColor: tooltipBorder,
                  borderRadius: '10px',
                  fontSize: '12px',
                }}
              />
              <Bar
                dataKey="weight"
                name={language === 'fr' ? 'Couverture (%)' : 'Weight (%)'}
                fill="#0ea5e9"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-3xl bg-white dark:bg-night-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-night-700 overflow-hidden z-10 my-8"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-200 dark:border-night-700 flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-steel-600 dark:text-steel-400 flex items-center gap-2 mb-1">
                  <span>{project.period}</span>
                  {project.badge && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{project.badge}</span>
                    </>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-offwhite">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-muted mt-0.5">
                  {project.subtitle}
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Fermer"
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-offwhite hover:bg-slate-100 dark:hover:bg-night-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* 3 Quantitative Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.caseStudy.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-night-900 border border-slate-200 dark:border-night-700"
                  >
                    <div className="text-xl sm:text-2xl font-extrabold text-steel-600 dark:text-steel-400 tabular-nums">
                      {m.value}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-muted mt-1 font-medium">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Recharts Visual */}
              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-night-900 border border-slate-200 dark:border-night-700">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200 mb-4">
                  <BarChart3 size={15} className="text-steel-500" />
                  <span>{project.caseStudy.chartTitle}</span>
                </div>
                {renderChart(project)}
              </div>

              {/* Objective / Methodology / Impact */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-offwhite">
                    <Target size={15} className="text-steel-500" />
                    <span>{language === 'fr' ? 'Objectif' : 'Objective'}</span>
                  </div>
                  <p className="text-slate-600 dark:text-muted leading-relaxed">
                    {project.caseStudy.objective}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-offwhite">
                    <FlaskConical size={15} className="text-steel-500" />
                    <span>{language === 'fr' ? 'Méthodologie' : 'Methodology'}</span>
                  </div>
                  <p className="text-slate-600 dark:text-muted leading-relaxed">
                    {project.caseStudy.methodology}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-offwhite">
                    <TrendingUp size={15} className="text-steel-500" />
                    <span>{language === 'fr' ? 'Impact & Résultats' : 'Impact & Results'}</span>
                  </div>
                  <p className="text-slate-600 dark:text-muted leading-relaxed">
                    {project.caseStudy.impact}
                  </p>
                </div>
              </div>

              {/* Stack metadata */}
              <div className="pt-3 border-t border-slate-200 dark:border-night-700 text-xs font-mono text-slate-500 dark:text-muted">
                <span className="font-semibold text-slate-700 dark:text-slate-300 mr-2">
                  Stack :
                </span>
                {project.tags.join(' · ')}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-night-900 border-t border-slate-200 dark:border-night-700 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                {project.labSceneId && (
                  <button
                    onClick={() => {
                      const sceneId = project.labSceneId!;
                      onClose();
                      onLaunch3D(sceneId);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-steel-600 hover:bg-steel-500 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors shadow-sm"
                  >
                    <Box size={16} />
                    <span>
                      {language === 'fr' ? 'Explorer la scène 3D' : 'Inspect 3D Scene'}
                    </span>
                  </button>
                )}

                <button
                  onClick={() => {
                    onClose();
                    onRequestCode(project.title);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-night-800 border border-slate-200 dark:border-night-700 hover:border-steel-500 text-slate-800 dark:text-offwhite rounded-lg text-xs sm:text-sm font-semibold transition-colors"
                >
                  <span>
                    {language === 'fr'
                      ? 'Demander le code / notebook'
                      : 'Request code / notebook'}
                  </span>
                  <ArrowRight size={15} />
                </button>
              </div>

              <button
                onClick={onClose}
                className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-muted hover:text-slate-900 dark:hover:text-offwhite transition-colors"
              >
                {language === 'fr' ? 'Fermer' : 'Close'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
