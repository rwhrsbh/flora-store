
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string; // If href is provided, it renders as an anchor tag
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-brand-primary text-white hover:bg-opacity-90 focus:ring-brand-primary',
    secondary: 'bg-brand-accent text-white hover:bg-opacity-90 focus:ring-brand-accent',
    outline: 'border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white focus:ring-brand-primary',
    ghost: 'text-brand-primary hover:bg-brand-primary hover:bg-opacity-10 focus:ring-brand-primary',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClassName}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
