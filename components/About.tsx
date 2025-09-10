import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <AnimatedSection
      id="about"
      className="min-h-screen w-full px-4 md:px-6 py-12 md:py-0 bg-[#f9f9f9] text-gray-800 flex flex-col justify-center items-center text-center"
    >
      <div className="max-w-3xl">
        <motion.h2
          className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Sobre Mim
        </motion.h2>

        <motion.div
          className="w-16 h-1 bg-gray-800 mx-auto mb-6 rounded"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        />

        <motion.p
          className="text-base md:text-lg leading-relaxed text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Sou Emerson Nunes, desenvolvedor fullstack com foco em front end moderno e apaixonado por
          criar experiências digitais intuitivas, acessíveis e visualmente elegantes. Ao longo da
          minha carreira, participei em projetos internacionais nas áreas da saúde digital, educação
          e inteligência artificial, colaborando com equipas multidisciplinares em ambientes ágeis e
          exigentes.
          <br />
          <br />
          Tenho experiência sólida com tecnologias como React, Vue, Next.js e Tailwind CSS, além de
          backend com Node.js e bases de dados relacionais e não relacionais. Gosto de transformar
          ideias em interfaces funcionais e escaláveis, sempre com atenção ao detalhe e à
          experiência do utilizador.
          <br />
          <br />
          Mais do que escrever código, acredito em construir soluções com propósito — que resolvem
          problemas reais e criam impacto positivo. Sou curioso, autodidata e movido por desafios
          que exigem criatividade, estratégia e empatia.
        </motion.p>
      </div>
    </AnimatedSection>
  );
};

export default About;
