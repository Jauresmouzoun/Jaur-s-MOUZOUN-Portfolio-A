import React from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from 'recharts';
import { ChevronDown } from 'lucide-react';

// Mock data for the background chart to simulate economic/statistical trends
const data = Array.from({ length: 50 }, (_, i) => ({
  name: i,
  uv: 4000 + Math.random() * 2000 + Math.sin(i / 5) * 1000,
  pv: 2400 + Math.random() * 1000 + Math.cos(i / 5) * 1000,
}));

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-night-900">
      
      {/* Background Chart Animation */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis hide />
            <YAxis hide domain={['auto', 'auto']} />
            <Area 
              type="monotone" 
              dataKey="uv" 
              stroke="#38bdf8" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorUv)" 
              animationDuration={3000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-night-900 via-transparent to-transparent z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-steel-400/10 text-steel-400 text-sm font-semibold tracking-wide mb-6 border border-steel-400/20">
            INGÉNIEUR STATISTICIEN ÉCONOMISTE
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-offwhite leading-tight">
            Jaurès <span className="text-transparent bg-clip-text bg-gradient-to-r from-steel-400 to-blue-600">MOUZOUN</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed mb-10">
            Transformer la donnée complexe en <br className="hidden md:block" />
            <span className="text-offwhite font-medium">leviers d'action stratégique.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <a 
              href="#contact"
              className="px-8 py-4 bg-steel-600 hover:bg-steel-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-steel-500/20 transform hover:-translate-y-1"
            >
              Me Contacter
            </a>
            <a 
              href="#experiences"
              className="px-8 py-4 bg-transparent border border-night-700 hover:border-steel-400 text-muted hover:text-offwhite rounded-lg font-medium transition-all"
            >
              Voir mon Portfolio
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-muted"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={32} className="opacity-50" />
      </motion.div>
    </section>
  );
}