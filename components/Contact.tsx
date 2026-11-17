import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Linkedin, Phone, MessageCircle, MapPin, Copy, Check, FileText, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { portfolioData } from '../data/portfolioData';
import CVModal from './CVModal';

interface ContactProps {
  prefilledSubject?: string;
}

export default function Contact({ prefilledSubject = '' }: ContactProps) {
  const { language } = useApp();
  const t = portfolioData[language].contact;

  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submittedNotice, setSubmittedNotice] = useState<boolean>(false);

  useEffect(() => {
    if (prefilledSubject) {
      setFormData((prev) => ({
        ...prev,
        subject:
          language === 'fr'
            ? `Demande d'accès code / détails — ${prefilledSubject}`
            : `Code / details inquiry — ${prefilledSubject}`,
        message:
          language === 'fr'
            ? `Bonjour Jaurès,\n\nJe souhaiterais en savoir plus ou consulter le code/notebook concernant le projet "${prefilledSubject}".`
            : `Hello Jaurès,\n\nI would like to learn more or access the code/notebook for the project "${prefilledSubject}".`,
      }));
    }
  }, [prefilledSubject, language]);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const buildMailtoHref = () => {
    return `mailto:${t.email}?subject=${encodeURIComponent(
      formData.subject || 'Contact Portfolio Jaurès MOUZOUN'
    )}&body=${encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
  };

  const buildWhatsAppHref = () => {
    const text = `Bonjour Jaurès (${formData.name || 'Visiteur'} - ${formData.email || ''}) :\nObjet: ${
      formData.subject || 'Prise de contact'
    }\n\n${formData.message}`;
    return `https://wa.me/2290157413029?text=${encodeURIComponent(text)}`;
  };

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = buildMailtoHref();
    setSubmittedNotice(true);
    setTimeout(() => setSubmittedNotice(false), 6000);
  };

  const handleCopyMessage = () => {
    const summary = `À: ${t.email}\nObjet: ${formData.subject}\nDe: ${formData.name} (${formData.email})\n\n${formData.message}`;
    copyToClipboard(summary, 'message');
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-24 bg-slate-50 dark:bg-night-900 relative overflow-hidden transition-colors duration-300"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-1/2 left-1/2 w-full max-w-4xl h-full max-h-[500px] bg-steel-400/5 dark:bg-steel-600/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono font-semibold uppercase tracking-wider text-steel-600 dark:text-steel-400 mb-2">
            {language === 'fr' ? 'Disponibilité & Contact' : 'Availability & Contact'}
          </p>
          <h2
            className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 dark:text-offwhite mb-4"
            style={{ textWrap: 'balance' }}
          >
            {t.title}
          </h2>
          <div className="h-1 w-20 bg-steel-500 mx-auto rounded-full mb-4" />
          <p className="text-base md:text-lg text-slate-600 dark:text-muted max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Channels Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-white dark:bg-night-800 rounded-2xl p-7 sm:p-8 border border-slate-200 dark:border-night-700 shadow-sm space-y-5"
          >
            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-offwhite">
              {language === 'fr' ? 'Coordonnées Directes' : 'Direct Contacts'}
            </h3>

            <div className="divide-y divide-slate-100 dark:divide-night-700">
              {/* Email */}
              <div className="py-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Mail size={18} className="text-steel-500 shrink-0" />
                  <div className="truncate">
                    <div className="text-xs text-slate-400 dark:text-muted">Email</div>
                    <a
                      href={`mailto:${t.email}`}
                      className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-offwhite hover:text-steel-500 truncate block"
                    >
                      {t.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(t.email, 'email')}
                  className="p-2 text-slate-400 hover:text-steel-500 rounded-lg transition-colors shrink-0"
                  title="Copier l'email"
                >
                  {copiedItem === 'email' ? (
                    <Check size={16} className="text-emerald-500" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>

              {/* Phone */}
              <div className="py-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Phone size={18} className="text-emerald-500 shrink-0" />
                  <div>
                    <div className="text-xs text-slate-400 dark:text-muted">
                      {language === 'fr' ? 'Téléphone' : 'Phone'}
                    </div>
                    <a
                      href={`tel:${t.phone.replace(/\s+/g, '')}`}
                      className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-offwhite hover:text-steel-500 tabular-nums"
                    >
                      {t.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(t.phone, 'phone')}
                  className="p-2 text-slate-400 hover:text-steel-500 rounded-lg transition-colors shrink-0"
                  title="Copier le numéro"
                >
                  {copiedItem === 'phone' ? (
                    <Check size={16} className="text-emerald-500" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>

              {/* Location */}
              <div className="py-3.5 flex items-center gap-3">
                <MapPin size={18} className="text-sky-500 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400 dark:text-muted">
                    {language === 'fr' ? 'Localisation' : 'Location'}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-offwhite">
                    Cotonou, Bénin
                  </div>
                </div>
              </div>
            </div>

            {/* Social Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={t.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-semibold transition-colors"
              >
                <MessageCircle size={17} />
                <span>WhatsApp</span>
              </a>

              <a
                href={t.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0077b5] hover:bg-[#006396] text-white text-xs sm:text-sm font-semibold transition-colors"
              >
                <Linkedin size={17} />
                <span>LinkedIn</span>
              </a>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-night-700">
              <button
                onClick={() => setIsCVModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-steel-500/40 hover:border-steel-500 bg-slate-50 dark:bg-night-900 text-steel-700 dark:text-steel-300 text-xs sm:text-sm font-semibold transition-colors"
              >
                <FileText size={16} />
                <span>{language === 'fr' ? 'Consulter & Télécharger CV (FR / EN)' : 'View & Download CV (FR / EN)'}</span>
              </button>
            </div>
          </motion.div>

          {/* Interactive Contact / Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white dark:bg-night-800 rounded-2xl p-7 sm:p-8 border border-slate-200 dark:border-night-700 shadow-sm"
          >
            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-offwhite mb-2">
              {language === 'fr' ? 'Envoyer un message direct' : 'Send a direct message'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-muted mb-6">
              {language === 'fr'
                ? 'Composez votre message et envoyez-le en un clic par email, par WhatsApp ou copiez-le.'
                : 'Draft your message and send it via email, WhatsApp, or copy it directly.'}
            </p>

            <form onSubmit={handleSubmitEmail} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {language === 'fr' ? 'Votre Nom & Prénom' : 'Your Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ex: Jean Dupont"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-night-900 border border-slate-200 dark:border-night-700 text-slate-900 dark:text-offwhite text-sm focus:outline-none focus:border-steel-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {language === 'fr' ? 'Votre Adresse Email' : 'Your Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jean@exemple.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-night-900 border border-slate-200 dark:border-night-700 text-slate-900 dark:text-offwhite text-sm focus:outline-none focus:border-steel-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {language === 'fr' ? 'Objet de la demande' : 'Subject'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={
                    language === 'fr'
                      ? 'ex: Proposition de stage / Collaboration projet data'
                      : 'e.g., Internship opportunity / Data project inquiry'
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-night-900 border border-slate-200 dark:border-night-700 text-slate-900 dark:text-offwhite text-sm focus:outline-none focus:border-steel-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {language === 'fr' ? 'Votre Message' : 'Your Message'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={
                    language === 'fr'
                      ? 'Détaillez vos besoins ou le contexte de votre proposition...'
                      : 'Describe your requirements or the context of your proposal...'
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-night-900 border border-slate-200 dark:border-night-700 text-slate-900 dark:text-offwhite text-sm focus:outline-none focus:border-steel-500 transition-colors resize-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  className="px-6 py-3 bg-steel-600 hover:bg-steel-500 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-steel-600/20 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <Send size={15} />
                  <span>{language === 'fr' ? 'Envoyer par Email' : 'Send via Email'}</span>
                </button>

                <a
                  href={buildWhatsAppHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <MessageCircle size={15} />
                  <span>{language === 'fr' ? 'Envoyer via WhatsApp' : 'Send via WhatsApp'}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="px-4 py-3 bg-slate-100 dark:bg-night-900 hover:bg-slate-200 dark:hover:bg-night-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-medium rounded-xl border border-slate-200 dark:border-night-700 transition-colors flex items-center gap-1.5 whitespace-nowrap"
                >
                  {copiedItem === 'message' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  <span>
                    {copiedItem === 'message'
                      ? language === 'fr'
                        ? 'Copié !'
                        : 'Copied!'
                      : language === 'fr'
                      ? 'Copier'
                      : 'Copy'}
                  </span>
                </button>
              </div>

              {submittedNotice && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-2 border border-emerald-200 dark:border-emerald-800">
                  <Check size={16} />
                  <span>
                    {language === 'fr'
                      ? 'Votre client mail a été ouvert avec votre message prêt à être expédié.'
                      : 'Your email client has been opened with your pre-filled message.'}
                  </span>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      <CVModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </section>
  );
}