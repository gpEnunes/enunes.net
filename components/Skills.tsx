import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';

const skills = [
  {
    title: 'Frontend',
    items: ['React', 'Vue.js', 'Nuxt.js', 'Next.js', 'HTML5', 'CSS3', 'SCSS', 'Storybook'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'Laravel', 'NestJS', 'GraphQL'],
  },
  {
    title: 'Bases de Dados',
    items: ['MongoDB', 'MySQL', 'PostgreSQL'],
  },
  {
    title: 'Outros',
    items: ['Git', 'Docker', 'Jest', 'CI/CD', 'Design Systems', 'Software Architecture'],
  },
];

const Skills = () => {
  return (
    <AnimatedSection
      id="skills"
      className="min-h-screen w-full flex flex-col justify-center px-4 md:px-6 py-12 md:py-0 bg-white text-gray-800"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-10 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Skills Técnicas
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="border-l-4 border-gray-800 px-4 md:pl-6 py-4"
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">
                {skill.title}
              </h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {skill.items.map((item, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Skills;
