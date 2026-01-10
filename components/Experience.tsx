import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, TrendingUp, BarChart, CheckCircle2 } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experiences" className="py-24 bg-night-800">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-offwhite mb-4">Expériences Clés</h2>
          <div className="h-1 w-20 bg-steel-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Card 1: Ministry */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-night-900 rounded-2xl p-8 border border-night-700 hover:border-steel-500/40 transition-all hover:shadow-xl relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <BarChart size={120} />
             </div>
             
             <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-offwhite mb-1">Stage Académique</h3>
                        <p className="text-steel-400 font-medium">Ministère de l'Enseignement Secondaire</p>
                    </div>
                    <span className="text-xs font-mono bg-night-800 text-muted px-3 py-1 rounded-full border border-night-700">Mai - Juin 2025</span>
                </div>

                <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-steel-500 mt-1 flex-shrink-0" />
                        <p className="text-muted text-sm leading-relaxed">
                            <strong className="text-offwhite">Analyse des Inégalités :</strong> Application de <span className="text-steel-400">modèles de panel</span> pour identifier les variables explicatives des inégalités de réussite (BEPC/BAC).
                        </p>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-steel-500 mt-1 flex-shrink-0" />
                        <p className="text-muted text-sm leading-relaxed">
                            <strong className="text-offwhite">Automatisation VBA :</strong> Développement d'un script pour automatiser le calcul de l'<span className="text-steel-400">indice de Gini</span> sur la période 2015-2023.
                        </p>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-steel-500 mt-1 flex-shrink-0" />
                        <p className="text-muted text-sm leading-relaxed">
                            <strong className="text-offwhite">Aide à la Décision :</strong> Production de graphiques et interprétations statistiques pour les documents stratégiques de la Direction.
                        </p>
                    </li>
                </ul>
             </div>
          </motion.div>

          {/* Card 2: Socioanimer */}
          <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="bg-night-900 rounded-2xl p-8 border border-night-700 hover:border-steel-500/40 transition-all hover:shadow-xl relative overflow-hidden group"
           >
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp size={120} />
             </div>

             <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-offwhite mb-1">Alternance Marketing Digital</h3>
                        <p className="text-steel-400 font-medium">Socioanimer, Cotonou</p>
                    </div>
                    <span className="text-xs font-mono bg-night-800 text-muted px-3 py-1 rounded-full border border-night-700">Février - Juin 2025</span>
                </div>

                <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-steel-500 mt-1 flex-shrink-0" />
                        <p className="text-muted text-sm leading-relaxed">
                            <strong className="text-offwhite">Stratégie & Performance :</strong> Gestion d'un portefeuille de campagnes publicitaires et optimisation du ROI.
                        </p>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-steel-500 mt-1 flex-shrink-0" />
                        <p className="text-muted text-sm leading-relaxed">
                            <strong className="text-offwhite">Optimisation Web :</strong> Collaboration technique avec les développeurs pour améliorer l'expérience utilisateur et le taux de conversion.
                        </p>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-steel-500 mt-1 flex-shrink-0" />
                        <p className="text-muted text-sm leading-relaxed">
                            <strong className="text-offwhite">Content Marketing :</strong> Déploiement d'une stratégie de contenu structurée pour accroître l'engagement communautaire.
                        </p>
                    </li>
                </ul>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}