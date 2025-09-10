'use client';

import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Projects = () => {
  return (
    <AnimatedSection
      id="projects"
      className="min-h-screen w-full flex flex-col px-4 md:px-6 py-12 md:pt-20 bg-white text-gray-800"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-10 text-center tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Projetos Pessoais
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            className="border-l-4 border-gray-800 px-4 md:pl-6 py-4 rounded shadow-sm hover:shadow-md transition"
            variants={item}
          >
            <h3 className="text-lg md:text-xl font-semibold mb-2">Projeto SaudadeCare</h3>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Plataforma de monitorização de saúde desenvolvida com NestJS, GraphQL, Next.js e MUI.
              Suporte a múltiplos perfis, dashboards dinâmicos e visualização de dados em tempo
              real. Foco em escalabilidade, segurança e acessibilidade.
            </p>
          </motion.div>

          <motion.div
            className="border-l-4 border-gray-800 px-4 md:pl-6 py-4 rounded shadow-sm hover:shadow-md transition"
            variants={item}
          >
            <h3 className="text-lg md:text-xl font-semibold mb-2">EraUmaVez</h3>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Audiobook interativo para crianças, construído com Next.js e React. A narrativa
              adapta-se às escolhas da criança, promovendo aprendizagem ativa e envolvimento
              emocional. Interface lúdica e acessível, com foco na experiência do utilizador.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
};

export default Projects;
