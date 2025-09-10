import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaLinkedin, FaGithub } from 'react-icons/fa';

const Contact = () => {
  return (
    <AnimatedSection
      id="contact"
      className="min-h-screen w-full flex flex-col px-4 md:px-6 py-12 md:pt-20 bg-white text-gray-800"
    >
      <div className="max-w-xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-10 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Contacto
        </motion.h2>

        <motion.div
          className="space-y-6 text-base md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3">
            <FaEnvelope className="text-gray-600" />
            <a
              href="mailto:emersonunes500@gmail.com"
              className="underline hover:text-black transition"
            >
              emersonunes500@gmail.com
            </a>
          </div>

          <div className="flex items-center justify-center gap-3">
            <FaPhoneAlt className="text-gray-600" />
            <a href="tel:+351910074350" className="underline hover:text-black transition">
              +351 910 074 350
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-4">
            <a
              href="https://www.linkedin.com/in/emerson-nunes5"
              target="_blank"
              className="flex items-center gap-2 underline hover:text-black transition"
            >
              <FaLinkedin className="text-gray-600" />
              LinkedIn
            </a>
            <a
              href="https://github.com/gpEnunes"
              target="_blank"
              className="flex items-center gap-2 underline hover:text-black transition"
            >
              <FaGithub className="text-gray-600" />
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default Contact;
