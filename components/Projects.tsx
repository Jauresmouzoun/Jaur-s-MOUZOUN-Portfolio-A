import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { CheckCircle2, BarChart3, Box, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { portfolioData, ProjectItem, LabSceneId } from '../data/portfolioData';
import ProjectCaseStudyModal from './ProjectCaseStudyModal';

interface ProjectsProps {
  onOpenLab3D: (sceneId?: LabSceneId) => void;
  onRequestCode: (projectTitle: string) => void;
}

export default function Projects({ onOpenLab3D, onRequestCode }: ProjectsProps) {
  const { language } = useApp();
  const t = portfolioData[language].projects;

  const [activeFilter, setActiveFilter] = useState<'all' | 'data-science' | 'econometrics' | 'web-mobile'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const filteredProjects = t.items.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const filterOptions = [
    { key: 'all', label: t.filterAll },
    { key: 'data-science', label: t.filterDS },
    { key: 'econometrics', label: t.filterEcon },
    { key: 'web-mobile', label: t.filterWeb },
  ];

  return (
    <section
      id="projets"
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
          className="text-center mb-10"
        >
          <p className="text-xs font-mono font-semibold uppercase tracking-wider text-steel-600 dark:text-steel-400 mb-2">
            {language === 'fr' ? 'Travaux & Modélisation' : 'Applied Research & Engineering'}
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

          {/* Segmented Filter Control */}
          <div className="inline-flex flex-wrap justify-center gap-1 p-1.5 mt-8 bg-white dark:bg-night-900 rounded-xl border border-slate-200 dark:border-night-700">
            {filterOptions.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key as typeof activeFilter)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                  activeFilter === f.key
                    ? 'bg-steel-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-muted hover:text-slate-900 dark:hover:text-offwhite'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Interactive 3D Laboratory Showcase Strip */}
        <div className="mb-10 p-6 sm:p-7 rounded-2xl bg-slate-900 dark:bg-night-900 border border-slate-800 dark:border-steel-500/30 text-offwhite flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-steel-400">
              <Box size={15} />
              <span>Three.js · WebGL PBR · OrbitControls</span>
            </div>
            <h3 className="text-lg sm:text-xl font-display font-bold text-offwhite">
              {t.labBannerTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t.labBannerDesc}
            </p>
          </div>
          <button
            onClick={() => onOpenLab3D('namibia-pca')}
            className="px-5 py-3 bg-steel-600 hover:bg-steel-500 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 shadow-lg shadow-steel-600/20"
          >
            <Box size={16} />
            <span>{t.labBannerBtn}</span>
            <ArrowUpRight size={15} />
          </button>
        </div>

        {/* Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className="bg-white dark:bg-night-900 rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-night-700 hover:border-steel-400 dark:hover:border-steel-500/50 transition-all duration-200 shadow-sm hover:shadow-lg flex flex-col justify-between group"
              >
                <div>
                  {/* Quiet Unboxed Metadata Line */}
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-muted mb-2.5">
                    <span>{project.period}</span>
                    {project.badge && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-steel-600 dark:text-steel-400 font-semibold">
                          {project.badge}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 dark:text-offwhite group-hover:text-steel-600 dark:group-hover:text-steel-400 transition-colors mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-steel-400/90 font-medium mb-3">
                    {project.subtitle}
                  </p>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-muted mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Points */}
                  <ul className="space-y-2 mb-5 pt-3 border-t border-slate-100 dark:border-night-800">
                    {project.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 size={13} className="text-steel-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Unboxed Stack Line + Action Buttons */}
                <div className="pt-4 border-t border-slate-100 dark:border-night-800 space-y-4">
                  <p className="text-[11px] font-mono text-slate-500 dark:text-muted leading-relaxed">
                    {project.tags.join(' · ')}
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-night-800 hover:bg-steel-600 hover:text-white dark:hover:bg-steel-600 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors whitespace-nowrap"
                    >
                      <BarChart3 size={14} />
                      <span>{t.openCaseStudy}</span>
                    </button>

                    {project.labSceneId && (
                      <button
                        onClick={() => onOpenLab3D(project.labSceneId)}
                        className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-steel-50 dark:bg-steel-500/10 text-steel-700 dark:text-steel-300 hover:bg-steel-600 hover:text-white border border-steel-200 dark:border-steel-500/30 text-xs font-semibold transition-colors whitespace-nowrap"
                      >
                        <Box size={14} />
                        <span>{t.open3DView}</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case Study & Recharts Modal */}
      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onLaunch3D={onOpenLab3D}
        onRequestCode={onRequestCode}
      />
    </section>
  );
}
