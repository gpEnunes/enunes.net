// components/AnimatedSection.tsx
'use client';

import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string; // ← adiciona esta linha
};

const AnimatedSection = ({ children, className = '' }: Props) => {
  return (
    <motion.section
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      variants={fadeInUp}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
