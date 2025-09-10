import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';

const educationItems = [
  {
    title: 'Engenharia Informática (incompleto)',
    institution: 'ISEC Coimbra',
  },
  {
    title: 'Curso Técnico de Gestão e Programação',
    institution: 'Escola Martinho Árias',
  },
];

const certifications = ['React', 'TypeScript', 'CSS', 'Vue', 'Python'];

const Education = () => {
  return (
    <AnimatedSection
      id="education"
      className="min-h-screen w-full flex flex-col px-4 md:px-6 py-12 md:pt-20 bg-[#f9f9f9] text-gray-800"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-10 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Educação & Certificações
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">
          {educationItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="border-l-4 border-gray-800 px-4 md:pl-6 py-2 text-left"
            >
              <h3 className="text-lg md:text-xl font-semibold mb-1">{item.title}</h3>
              <p className="text-sm md:text-base text-gray-600">{item.institution}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg md:text-xl font-semibold mb-4">Certificações Técnicas</h3>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {certifications.map((cert, i) => (
              <span
                key={i}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition"
              >
                {cert}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default Education;
