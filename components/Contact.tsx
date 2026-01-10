import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Phone, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-night-900 relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-b from-night-800 to-night-900 p-10 md:p-16 rounded-3xl border border-night-700 shadow-2xl"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-offwhite mb-6">Parlons de vos données</h2>
          <p className="text-lg text-muted mb-10 max-w-2xl mx-auto">
            Prêt à transformer vos défis analytiques en opportunités ? <br/>
            Je suis disponible pour des projets de data science, économétrie et stratégie digitale.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            
            <a 
              href="mailto:jaures23mzn@gmail.com" 
              className="group flex items-center gap-3 bg-steel-600 hover:bg-steel-500 text-white px-8 py-4 rounded-xl font-medium transition-all w-full md:w-auto justify-center shadow-lg shadow-steel-500/20"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Me contacter par Email</span>
            </a>

            <a 
              href="https://bit.ly/4kwda4C" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-[#0077b5] hover:bg-[#006396] text-white px-8 py-4 rounded-xl font-medium transition-all w-full md:w-auto justify-center shadow-lg"
            >
              <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>LinkedIn</span>
            </a>

             <a 
              href="https://wa.me/2290157413029" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-xl font-medium transition-all w-full md:w-auto justify-center shadow-lg"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-night-700 flex flex-col md:flex-row justify-center gap-8 text-muted text-sm">
             <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+229 01 57 41 30 29</span>
             </div>
             <div className="flex items-center gap-2">
                <MapPinIcon />
                <span>Gbegamey, Cotonou</span>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MapPinIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
        </svg>
    )
}