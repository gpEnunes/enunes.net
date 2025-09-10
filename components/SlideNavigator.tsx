'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';
import Education from './Education';
import Contact from './Contact';

const sections = [
  { label: 'Início', component: <Hero key="hero" /> },
  { label: 'Sobre', component: <About key="about" /> },
  { label: 'Skills', component: <Skills key="skills" /> },
  { label: 'Experiência', component: <Experience key="experience" /> },
  { label: 'Projetos', component: <Projects key="projects" /> },
  { label: 'Educação', component: <Education key="education" /> },
  { label: 'Contacto', component: <Contact key="contact" /> },
];

const SlideNavigator = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((current) => (current + 1) % sections.length);
  const prev = () => setIndex((current) => (current - 1 + sections.length) % sections.length);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-hidden relative bg-white pt-0 md:pt-16">
      {/* 🔝 Navbar horizontal no topo (escondido em mobile) */}
      <div className="hidden md:flex absolute top-0 left-0 right-0 justify-center gap-6 py-4 bg-white z-10">
        {sections.map((section, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`text-sm font-medium transition ${
              i === index ? 'text-gray-900 underline' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* 🎬 Slide atual com animação e swipe */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, info) => {
            if (info.offset.x < -100) next();
            if (info.offset.x > 100) prev();
          }}
          className="absolute inset-0"
        >
          {sections[index].component}
        </motion.div>
      </AnimatePresence>

      {/* 🔻 Botões de navegação + indicadores */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-between px-6">
        <button
          onClick={prev}
          disabled={index === 0}
          className={`px-4 py-2 border rounded transition ${
            index === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
          }`}
        >
          ←
        </button>
        <button
          onClick={next}
          disabled={index === sections.length - 1}
          className={`px-4 py-2 border rounded transition ${
            index === sections.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
          }`}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default SlideNavigator;
