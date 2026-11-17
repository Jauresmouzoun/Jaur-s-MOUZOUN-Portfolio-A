import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Mail, ArrowUpRight, Box } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { portfolioData, LabSceneId } from '../data/portfolioData';
import Hero3DCanvas from './three/Hero3DCanvas';
import CVModal from './CVModal';

interface HeroProps {
  onOpenLab3D: (sceneId?: LabSceneId) => void;
}

export default function Hero({ onOpenLab3D }: HeroProps) {
  const { language, theme, cvUrls } = useApp();
  const t = portfolioData[language].hero;
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  const activeCV = cvUrls[language];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-night-900 pt-24 pb-16 transition-colors duration-300"
    >
      {/* Interactive Three.js 3D Econometric Manifold Backdrop */}
      <div className="absolute inset-0 z-0 opacity-95 dark:opacity-100">
        <Hero3DCanvas theme={theme} />
      </div>

      {/* Measured Contrast Scrim for WCAG AA Legibility over 3D Surface */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-slate-50/45 via-slate-50/25 to-slate-50/90 dark:from-night-900/45 dark:via-night-900/20 dark:to-night-900/90"
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          {/* Quiet Kicker (no pulsing dot) */}
          <p className="text-xs sm:text-sm font-mono font-semibold tracking-wide text-steel-700 dark:text-steel-400 mb-4">
            {t.badge}
          </p>

          {/* Name */}
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold mb-5 text-slate-900 dark:text-offwhite tracking-tight leading-[1.08]"
            style={{ textWrap: 'balance' }}
          >
            Jaurès{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-steel-600 to-sky-500 dark:from-steel-400 dark:to-sky-300">
              MOUZOUN
            </span>
          </h1>

          {/* Headline */}
          <p
            className="text-xl sm:text-2xl md:text-3xl text-slate-700 dark:text-slate-200 max-w-3xl mx-auto font-normal leading-snug mb-6"
            style={{ textWrap: 'balance' }}
          >
            {t.headline}{' '}
            <span className="font-semibold text-slate-900 dark:text-offwhite underline decoration-steel-500 decoration-2 underline-offset-4">
              {t.subheadline}
            </span>
          </p>

          {/* Bio */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-9">
            {t.bio}
          </p>

          {/* Primary & Secondary Actions */}
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center mb-12">
            <a
              href="#contact"
              className="w-full sm:w-auto px-6 py-3.5 bg-steel-600 hover:bg-steel-500 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-steel-600/20 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Mail size={17} />
              <span>{t.contactBtn}</span>
            </a>

            <button
              onClick={() => onOpenLab3D('namibia-pca')}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 dark:bg-offwhite text-white dark:text-night-900 hover:bg-slate-800 dark:hover:bg-slate-200 rounded-xl font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Box size={17} />
              <span>{t.launch3DLabBtn}</span>
            </button>

            <a
              href={activeCV.url}
              download={activeCV.filename}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/90 dark:bg-night-800/90 border border-slate-300 dark:border-night-600 hover:border-steel-500 text-slate-800 dark:text-offwhite rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Download size={17} className="text-steel-600 dark:text-steel-400" />
              <span>
                {t.downloadCVBtn} ({language.toUpperCase()})
              </span>
            </a>
          </div>

          <div className="mb-10">
            <button
              onClick={() => setIsCVModalOpen(true)}
              className="inline-flex items-center gap-1 text-xs sm:text-sm text-steel-700 dark:text-steel-400 hover:underline font-medium"
            >
              <span>{t.chooseLangCV}</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Key Quantitative Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-200 dark:border-night-700/80">
            {t.quickStats.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/85 dark:bg-night-800/80 border border-slate-200/80 dark:border-night-700/80 text-center"
              >
                <div className="text-xl sm:text-2xl font-display font-extrabold text-steel-600 dark:text-steel-400 tabular-nums">
                  {item.stat}
                </div>
                <div className="text-xs text-slate-600 dark:text-muted mt-1 font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Cue */}
      <a
        href="#formation"
        aria-label="Défiler vers la formation"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 text-slate-500 dark:text-muted hover:text-steel-500 transition-colors"
      >
        <ChevronDown size={26} />
      </a>

      <CVModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </section>
  );
}