import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  hover = false,
  glow = false 
}) => {
  return (
    <motion.div
      className={cn(
        'bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl p-6 shadow-xl',
        hover && 'transition-all duration-300 hover:shadow-2xl hover:border-primary-600/50 hover:-translate-y-1',
        glow && 'shadow-[0_0_20px_rgba(30,144,255,0.3)]',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
