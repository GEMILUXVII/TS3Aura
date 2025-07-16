import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '../../utils';

// Omit the props from React.ButtonHTMLAttributes that conflict with MotionProps
type ButtonHTMLProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps>;

interface CustomButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

type ButtonProps = CustomButtonProps & ButtonHTMLProps & MotionProps;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-dark-700 hover:bg-dark-600 text-white border border-dark-600 hover:border-primary-600',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white',
    ghost: 'text-gray-300 hover:text-white hover:bg-dark-700',
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <motion.button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        loading && 'opacity-75 cursor-not-allowed',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      {...props}
    >
      {loading && (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
      )}
      {children}
    </motion.button>
  );
};
