import React from 'react';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className="bg-night-900 min-h-screen text-offwhite overflow-x-hidden font-sans selection:bg-steel-500 selection:text-white">
      <Navbar />
      
      <main className="relative z-10 flex flex-col gap-0">
        <Hero />
        <Timeline />
        <Skills />
        <Experience />
        <Contact />
      </main>

      <footer className="py-8 text-center text-muted text-sm bg-night-900 border-t border-night-700">
        <p>© {new Date().getFullYear()} Jaurès MOUZOUN. Tous droits réservés.</p>
      </footer>
    </div>
  );
}