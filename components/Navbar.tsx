import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Sun, Moon, Globe, ChevronDown, FileText, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { portfolioData, LabSceneId } from '../data/portfolioData';
import CVModal from './CVModal';

interface NavbarProps {
  onOpenLab3D: (sceneId?: LabSceneId) => void;
}

export default function Navbar({ onOpenLab3D }: NavbarProps) {
  const { language, toggleLanguage, theme, toggleTheme, cvUrls } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCVDropdownOpen, setIsCVDropdownOpen] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  const t = portfolioData[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scrollspy active section observer
  useEffect(() => {
    const sectionIds = ['home', 'formation', 'experiences', 'projets', 'bootcamps', 'competences', 'certifications', 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { id: 'formation', name: t.nav.education, href: '#formation' },
    { id: 'experiences', name: t.nav.experience, href: '#experiences' },
    { id: 'projets', name: t.nav.projects, href: '#projets' },
    { id: 'competences', name: t.nav.skills, href: '#competences' },
    { id: 'certifications', name: t.nav.certifications, href: '#certifications' },
    { id: 'contact', name: t.nav.contact, href: '#contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-night-900/95 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-white/10 py-3'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between gap-6">
            {/* Brand Zone (single-line wordmark) */}
            <a
              href="#home"
              className="text-lg sm:text-xl font-display font-extrabold tracking-tight text-slate-900 dark:text-offwhite hover:text-steel-600 dark:hover:text-steel-400 transition-colors whitespace-nowrap shrink-0"
            >
              Jaurès<span className="text-steel-500"> MOUZOUN</span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-7">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    className={`text-sm font-medium whitespace-nowrap shrink-0 transition-colors relative py-1 ${
                      isActive
                        ? 'text-steel-600 dark:text-steel-400 font-semibold'
                        : 'text-slate-600 dark:text-muted hover:text-slate-900 dark:hover:text-offwhite'
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-steel-500 dark:bg-steel-400 transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0'
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            {/* Utility Controls & Primary CV Action */}
            <div className="hidden md:flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => onOpenLab3D('namibia-pca')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-steel-700 dark:text-steel-300 bg-steel-50 dark:bg-steel-500/10 border border-steel-200 dark:border-steel-500/30 hover:border-steel-500 transition-colors whitespace-nowrap shrink-0"
              >
                <Box size={14} />
                <span>{t.nav.openLab3D}</span>
              </button>

              <button
                onClick={toggleLanguage}
                aria-label={language === 'fr' ? 'Switch to English' : 'Passer en français'}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-night-800 border border-slate-200 dark:border-night-700 hover:border-steel-400 transition-colors whitespace-nowrap shrink-0"
              >
                <Globe size={14} className="text-steel-500" />
                <span className="font-mono font-bold uppercase">{language}</span>
              </button>

              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
                className="p-2 rounded-lg text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-night-800 border border-slate-200 dark:border-night-700 hover:border-steel-400 transition-colors shrink-0"
              >
                {theme === 'dark' ? (
                  <Sun size={16} className="text-amber-400" />
                ) : (
                  <Moon size={16} className="text-slate-700" />
                )}
              </button>

              {/* CV Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsCVDropdownOpen((prev) => !prev)}
                  onBlur={() => setTimeout(() => setIsCVDropdownOpen(false), 200)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-steel-600 hover:bg-steel-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0"
                >
                  <Download size={14} />
                  <span>{t.nav.downloadCV}</span>
                  <ChevronDown
                    size={13}
                    className={`transition-transform ${isCVDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isCVDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-night-800 shadow-xl border border-slate-200 dark:border-night-700 py-2 z-50"
                    >
                      <a
                        href={cvUrls.fr.url}
                        download={cvUrls.fr.filename}
                        className="flex items-center justify-between px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-night-700 transition-colors"
                      >
                        <span>{t.nav.downloadFR}</span>
                        <Download size={13} className="text-steel-500" />
                      </a>
                      <a
                        href={cvUrls.en.url}
                        download={cvUrls.en.filename}
                        className="flex items-center justify-between px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-night-700 transition-colors"
                      >
                        <span>{t.nav.downloadEN}</span>
                        <Download size={13} className="text-steel-500" />
                      </a>
                      <div className="border-t border-slate-100 dark:border-night-700 mt-1 pt-1">
                        <button
                          onClick={() => {
                            setIsCVDropdownOpen(false);
                            setIsCVModalOpen(true);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-steel-600 dark:text-steel-400 hover:bg-slate-100 dark:hover:bg-night-700 transition-colors"
                        >
                          <FileText size={13} />
                          <span>{t.nav.viewPDF}</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={toggleTheme}
                aria-label="Thème"
                className="p-2 rounded-lg text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-night-800 border border-slate-200 dark:border-night-700"
              >
                {theme === 'dark' ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} />}
              </button>

              <button
                onClick={toggleLanguage}
                aria-label="Langue"
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold uppercase font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-night-800 border border-slate-200 dark:border-night-700"
              >
                {language}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-700 dark:text-offwhite hover:text-steel-500"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white dark:bg-night-800 border-b border-slate-200 dark:border-night-700 overflow-hidden shadow-xl"
            >
              <div className="px-6 pt-4 pb-6 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === link.id
                        ? 'bg-steel-50 dark:bg-night-700 text-steel-600 dark:text-steel-400 font-semibold'
                        : 'text-slate-700 dark:text-muted hover:bg-slate-100 dark:hover:bg-night-700'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenLab3D('namibia-pca');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-steel-600 dark:text-steel-400 bg-steel-50 dark:bg-night-900 border border-steel-200 dark:border-night-700 mt-2"
                >
                  <Box size={16} />
                  <span>{t.hero.launch3DLabBtn}</span>
                </button>

                <div className="pt-3 border-t border-slate-200 dark:border-night-700 grid grid-cols-2 gap-2">
                  <a
                    href={cvUrls.fr.url}
                    download={cvUrls.fr.filename}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-steel-600 text-white text-xs font-semibold"
                  >
                    <Download size={14} />
                    <span>CV FR</span>
                  </a>
                  <a
                    href={cvUrls.en.url}
                    download={cvUrls.en.filename}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-slate-800 dark:bg-night-700 text-white text-xs font-semibold"
                  >
                    <Download size={14} />
                    <span>Resume EN</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CVModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </>
  );
}