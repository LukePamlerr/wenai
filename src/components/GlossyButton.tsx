import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { ReactNode } from 'react';

interface GlossyButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function GlossyButton({ children, className, onClick, type = 'button', disabled }: GlossyButtonProps) {
  return (
    <motion.button
      type={type}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={cn("glossy-button", disabled && "opacity-50 cursor-not-allowed", className)}
    >
      {children}
    </motion.button>
  );
}
