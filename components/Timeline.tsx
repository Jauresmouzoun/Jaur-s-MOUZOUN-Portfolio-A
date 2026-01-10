import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const educationData = [
  {
    id: 1,
    title: "Cycle d'Ingénieur Statisticien Économiste",
    institution: "École Nationale d’Économie Appliquée et de Management (ENEAM)",
    year: "2025 - Aujourd'hui",
    description: "Première année. Formation d'excellence en modélisation mathématique, statistique avancée et théories économiques.",
    active: true
  },
  {
    id: 2,
    title: "Licence en Statistique",
    specialty: "Spécialité Statistique Économique et Sectorielle",
    institution: "École Nationale d’Économie Appliquée et de Management (ENEAM)",
    year: "2025",
    description: "Acquisition des fondamentaux en analyse de données et économétrie.",
    active: false
  },
  {
    id: 3,
    title: "Baccalauréat Scientifique (Série D)",
    institution: "Complexe Scolaire Saint Jean-Baptiste de Dogbo",
    year: "2022",
    description: "Diplôme obtenu avec mention, marquant le début du parcours scientifique.",
    active: false
  }
];

export default function Timeline() {
  return (
    <section id="formation" className="py-24 bg-night-800">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-offwhite mb-4">Parcours Académique</h2>
          <div className="h-1 w-20 bg-steel-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-night-700"></div>

          <div className="space-y-12">
            {educationData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                } items-center w-full`}
              >
                {/* Content Side */}
                <div className="w-full md:w-5/12 pl-8 md:pl-0 md:pr-0">
                  <div className={`bg-night-900 p-6 rounded-xl border border-night-700 hover:border-steel-500/50 transition-all shadow-lg group ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <div className={`flex items-center gap-2 mb-2 text-steel-400 ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                      <GraduationCap size={20} />
                      <h3 className="text-lg font-bold text-offwhite group-hover:text-steel-400 transition-colors">{item.title}</h3>
                    </div>
                    {item.specialty && <p className="text-sm text-steel-400 mb-2">{item.specialty}</p>}
                    <p className="text-sm font-medium text-muted mb-4">{item.institution}</p>
                    <p className="text-sm text-muted/80 leading-relaxed">{item.description}</p>
                    
                    <div className={`flex flex-wrap gap-4 mt-4 text-xs text-muted ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                      <span className="flex items-center gap-1 bg-night-800 px-2 py-1 rounded">
                        <Calendar size={12} /> {item.year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-night-900 border-2 border-steel-500 rounded-full z-10 top-6 md:top-1/2 md:-translate-y-1/2">
                    {item.active && (
                        <span className="absolute w-3 h-3 bg-steel-400 rounded-full animate-ping opacity-75"></span>
                    )}
                </div>

                {/* Empty Side for layout balance */}
                <div className="w-full md:w-5/12 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}