import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { portfolioData, LabSceneId } from './data/portfolioData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Hackathons from './components/Hackathons';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import LanguagesInterests from './components/LanguagesInterests';
import Contact from './components/Contact';
import Lab3DModal from './components/Lab3DModal';
import { ArrowUp, Download } from 'lucide-react';

function PortfolioContent() {
  const { language, cvUrls } = useApp();
  const t = portfolioData[language];

  const [isLab3DOpen, setIsLab3DOpen] = useState(false);
  const [lab3DScene, setLab3DScene] = useState<LabSceneId>('namibia-pca');
  const [prefilledSubject, setPrefilledSubject] = useState('');

  const handleOpenLab3D = (sceneId: LabSceneId = 'namibia-pca') => {
    setLab3DScene(sceneId);
    setIsLab3DOpen(true);
  };

  const handleRequestCode = (projectTitle: string) => {
    setPrefilledSubject(projectTitle);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-50 text-slate-900 dark:bg-night-900 dark:text-offwhite min-h-screen overflow-x-hidden font-sans selection:bg-steel-500 selection:text-white transition-colors duration-300 flex flex-col">
      <Navbar onOpenLab3D={handleOpenLab3D} />

      <main className="relative z-10 flex-1 flex flex-col gap-0">
        <Hero onOpenLab3D={handleOpenLab3D} />
        <Timeline />
        <Experience />
        <Projects onOpenLab3D={handleOpenLab3D} onRequestCode={handleRequestCode} />
        <Hackathons />
        <Skills />
        <Certifications />
        <LanguagesInterests />
        <Contact prefilledSubject={prefilledSubject} />
      </main>

      {/* Clean Footer */}
      <footer className="py-10 bg-white dark:bg-night-950 border-t border-slate-200 dark:border-night-700/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="text-base font-display font-bold text-slate-900 dark:text-offwhite">
              Jaurès <span className="text-steel-500">MOUZOUN</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-muted mt-1">
              {t.footer.tagline}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              © {new Date().getFullYear()} Jaurès MOUZOUN. {t.footer.rights}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <a
              href={cvUrls.fr.url}
              download={cvUrls.fr.filename}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 dark:bg-night-800 text-slate-700 dark:text-slate-300 hover:text-steel-600 dark:hover:text-steel-400 border border-slate-200 dark:border-night-700 transition-colors"
            >
              <Download size={13} />
              <span>{t.nav.downloadFR}</span>
            </a>
            <a
              href={cvUrls.en.url}
              download={cvUrls.en.filename}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 dark:bg-night-800 text-slate-700 dark:text-slate-300 hover:text-steel-600 dark:hover:text-steel-400 border border-slate-200 dark:border-night-700 transition-colors"
            >
              <Download size={13} />
              <span>{t.nav.downloadEN}</span>
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-slate-600 dark:text-muted hover:text-slate-900 dark:hover:text-offwhite hover:bg-slate-100 dark:hover:bg-night-800 transition-colors"
              title={t.footer.backToTop}
            >
              <ArrowUp size={14} />
              <span>{t.footer.backToTop}</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive 3D Lab Fullscreen Overlay */}
      <Lab3DModal
        isOpen={isLab3DOpen}
        initialScene={lab3DScene}
        onClose={() => setIsLab3DOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <PortfolioContent />
    </AppProvider>
  );
}