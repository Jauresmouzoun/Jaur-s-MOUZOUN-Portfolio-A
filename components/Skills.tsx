import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Database, PenTool, Layout, Code, PieChart } from 'lucide-react';

const skillCategories = [
  {
    title: "Analyse de Données",
    icon: <Database className="w-6 h-6 text-steel-400" />,
    skills: [
      { name: "R & RStudio", level: 90 },
      { name: "Python (Pandas, NumPy)", level: 85 },
      { name: "Excel Avancé (VBA)", level: 95 },
      { name: "Économétrie", level: 88 },
    ]
  },
  {
    title: "Visualisation",
    icon: <PieChart className="w-6 h-6 text-steel-400" />,
    skills: [
      { name: "Power BI", level: 85 },
      { name: "Tableaux de bord interactifs", level: 90 },
      { name: "Data Storytelling", level: 80 },
    ]
  },
  {
    title: "Digital & Créativité",
    icon: <PenTool className="w-6 h-6 text-steel-400" />,
    skills: [
      { name: "Suite Adobe (Ps, Ai)", level: 75 },
      { name: "CMS (Web Management)", level: 80 },
      { name: "Marketing Digital", level: 85 },
    ]
  }
];

export default function Skills() {
  return (
    <section id="competences" className="py-24 bg-night-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-steel-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-offwhite mb-4">Expertise Technique</h2>
          <p className="text-muted max-w-2xl mx-auto">
            Une combinaison de rigueur mathématique et de créativité numérique pour des solutions complètes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-night-800 rounded-xl p-8 border border-night-700 hover:border-steel-500/30 transition-all hover:shadow-lg hover:shadow-steel-500/10 group"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-night-900 rounded-lg border border-night-700 group-hover:border-steel-500/50 transition-colors">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-offwhite">{category.title}</h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-muted">{skill.name}</span>
                      <span className="text-sm font-medium text-steel-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-night-900 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-steel-600 to-steel-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}