'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

interface AnimatedFeatureProps {
  children: ReactNode;
}

export const AnimatedSection = ({ children, className = '', delay = 0 }: AnimatedSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedFeature = ({ children }: AnimatedFeatureProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded-xl hover:bg-white/10 transition-all duration-300 h-full"
    >
      {children}
    </motion.div>
  );
};

export const AnimatedContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};