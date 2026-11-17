import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, Eye, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  const { language, cvUrls } = useApp();
  const [selectedLang, setSelectedLang] = useState<'fr' | 'en'>(language);
  const [showPreview, setShowPreview] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      setSelectedLang(language);
    }
  }, [isOpen, language]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const activeCV = cvUrls[selectedLang];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl bg-white dark:bg-night-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-night-700 overflow-hidden z-10 my-4"
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-slate-200 dark:border-night-700">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-steel-500/10 text-steel-600 dark:text-steel-400">
                  <FileText size={22} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-offwhite">
                    Curriculum Vitae – Jaurès MOUZOUN
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-muted">
                    {language === 'fr'
                      ? 'Version actualisée · Disponible en Français et en Anglais'
                      : 'Updated PDF edition · Available in French and English'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Interactive Language Switcher Tabs */}
                <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-night-900 rounded-lg border border-slate-200 dark:border-night-700">
                  <button
                    onClick={() => setSelectedLang('fr')}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap ${
                      selectedLang === 'fr'
                        ? 'bg-white dark:bg-night-800 text-slate-900 dark:text-offwhite shadow-sm'
                        : 'text-slate-600 dark:text-muted hover:text-slate-900 dark:hover:text-offwhite'
                    }`}
                  >
                    Français
                  </button>
                  <button
                    onClick={() => setSelectedLang('en')}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap ${
                      selectedLang === 'en'
                        ? 'bg-white dark:bg-night-800 text-slate-900 dark:text-offwhite shadow-sm'
                        : 'text-slate-600 dark:text-muted hover:text-slate-900 dark:hover:text-offwhite'
                    }`}
                  >
                    English
                  </button>
                </div>

                <button
                  onClick={onClose}
                  aria-label="Fermer"
                  className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-offwhite hover:bg-slate-100 dark:hover:bg-night-700 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6 space-y-4">
              {/* Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs sm:text-sm text-slate-600 dark:text-muted">
                  <span className="font-semibold text-slate-800 dark:text-offwhite">
                    {selectedLang === 'fr'
                      ? 'CV Français (1 page)'
                      : 'English Resume (1 page)'}
                  </span>
                  <span className="mx-2" aria-hidden="true">·</span>
                  <span>ENEAM ISE 2 · +229 01 57 41 30 29</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setShowPreview((p) => !p)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-slate-100 dark:bg-night-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-night-700 hover:border-steel-400 transition-colors"
                  >
                    <Eye size={14} />
                    <span>
                      {showPreview
                        ? language === 'fr'
                          ? 'Masquer l’aperçu'
                          : 'Hide Preview'
                        : language === 'fr'
                        ? 'Afficher l’aperçu'
                        : 'Show Preview'}
                    </span>
                  </button>

                  <a
                    href={activeCV.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-slate-100 dark:bg-night-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-night-700 hover:border-steel-400 transition-colors"
                  >
                    <ExternalLink size={14} />
                    <span>{language === 'fr' ? 'Ouvrir' : 'Open Tab'}</span>
                  </a>

                  <a
                    href={activeCV.url}
                    download={activeCV.filename}
                    className="flex items-center gap-2 px-4 py-2 bg-steel-600 hover:bg-steel-500 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors shadow-sm"
                  >
                    <Download size={15} />
                    <span>
                      {selectedLang === 'fr'
                        ? language === 'fr'
                          ? 'Télécharger (FR)'
                          : 'Download (FR)'
                        : language === 'fr'
                        ? 'Télécharger (EN)'
                        : 'Download (EN)'}
                    </span>
                  </a>
                </div>
              </div>

              {/* Embedded PDF Preview */}
              {showPreview && (
                <div className="w-full h-[58vh] min-h-[360px] rounded-xl overflow-hidden border border-slate-200 dark:border-night-700 bg-slate-100 dark:bg-night-900">
                  <iframe
                    key={activeCV.url}
                    src={`${activeCV.url}#view=FitH`}
                    title={activeCV.label}
                    className="w-full h-full border-0"
                  />
                </div>
              )}

              {/* Direct Dual-Download Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <a
                  href={cvUrls.fr.url}
                  download={cvUrls.fr.filename}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-night-900 border border-slate-200 dark:border-night-700 hover:border-steel-500 transition-colors group"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-offwhite group-hover:text-steel-600 dark:group-hover:text-steel-400">
                      CV Français — Élève Ingénieur Statisticien Économiste
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-muted mt-0.5">
                      CV_Jaures_MOUZOUN_FR.pdf
                    </div>
                  </div>
                  <Download size={16} className="text-steel-500 shrink-0" />
                </a>

                <a
                  href={cvUrls.en.url}
                  download={cvUrls.en.filename}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-night-900 border border-slate-200 dark:border-night-700 hover:border-steel-500 transition-colors group"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-offwhite group-hover:text-steel-600 dark:group-hover:text-steel-400">
                      English Resume — Statistics & Economics Student
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-muted mt-0.5">
                      Resume_Jaures_MOUZOUN_EN.pdf
                    </div>
                  </div>
                  <Download size={16} className="text-steel-500 shrink-0" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
