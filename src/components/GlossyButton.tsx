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
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn("glossy-button", disabled && "opacity-50 cursor-not-allowed", className)}
    >
      {children}
    </button>
  );
}
