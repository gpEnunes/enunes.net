'use client';

import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section
      id="hero"
      className="h-screen w-full relative flex flex-col justify-center items-center text-center px-6 text-white"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* 🔲 Overlay escuro */}
      <div className="absolute inset-0 bg-black/50 md:bg-black/60 z-0" />

      {/* 🔤 Conteúdo acima do overlay */}
      <div className="relative z-10">
        <motion.h1
          className="text-3xl md:text-5xl font-bold mb-4 tracking-tight leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Emerson Nunes
        </motion.h1>

        <motion.p
          className="text-base md:text-xl max-w-md md:max-w-2xl text-gray-200 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Desenvolvedor Fullstack com paixão por interfaces elegantes, experiências interativas e
          soluções escaláveis. Com experiência em projetos internacionais, saúde digital, educação,
          entre outros — especializado em front end moderno com React, Vue e Next.js.
        </motion.p>

        <motion.div
          className="mt-4 text-sm text-gray-300 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Deslize para navegar →
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
