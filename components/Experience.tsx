import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';

const experiences = [
  {
    company: 'Notify AI',
    period: '2023–Presente',
    role: 'Backend Developer',
    description:
      'Responsável por integrações com CRMs, automações com inteligência artificial, exportação de métricas e otimização de performance em sistemas escaláveis.',
  },
  {
    company: 'MD3',
    period: '2021–2023',
    role: 'Frontend Developer',
    description:
      'Desenvolvimento de interfaces complexas com Vue e Nuxt, implementação de testes unitários com Jest e colaboração em projetos de jornalismo.',
  },
  {
    company: 'Merkat',
    period: '2021',
    role: 'Fundador & Fullstack Developer',
    description:
      'Criação e gestão técnica de uma plataforma web com Laravel e Vue, cobrindo todo o ciclo de desenvolvimento, desde arquitetura até deploy.',
  },
  {
    company: 'Grupo CH',
    period: '2019–2021',
    role: 'Fullstack Developer',
    description:
      'Participação em projetos institucionais e plataformas com dashboards interativos e redes globais, atuando tanto no desenvolvimento backend como frontend.',
  },
  {
    company: 'Incograf',
    period: '2018–2019',
    role: 'Junior Web Developer',
    description:
      'Desenvolvimento de sites e aplicações com HTML, CSS e JavaScript, focado em soluções funcionais e manutenção de projetos existentes.',
  },
];

const Experience = () => {
  return (
    <AnimatedSection
      id="experience"
      className="min-h-screen w-full flex flex-col px-4 md:px-6 py-12 md:pt-20 bg-[#f9f9f9] text-gray-800"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-10 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Experiência Profissional
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="border-l-4 border-gray-800 px-4 md:pl-6 py-4"
            >
              <h3 className="text-lg md:text-2xl font-semibold text-gray-900 mb-1">
                {exp.company} <span className="text-sm text-gray-500">({exp.period})</span>
              </h3>
              <p className="text-gray-700 mb-3 italic">{exp.role}</p>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Experience;
