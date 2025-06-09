import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false
}) => {
  const baseClasses = 'font-medium transition-colors rounded focus:outline-none';
  
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-hover text-light',
    secondary: 'bg-dark-light hover:bg-dark text-light',
    outline: 'border border-dark-border hover:border-primary text-light'
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;