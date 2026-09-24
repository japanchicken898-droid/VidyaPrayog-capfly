import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'loginNav';
  isInert?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  isInert = false,
  children,
  className = '',
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isInert) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  const variantStyles = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm hover:shadow transition-all',
    secondary:
      'bg-slate-800 text-white hover:bg-slate-900 active:bg-slate-950 transition-all',
    outline:
      'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-all',
    ghost:
      'bg-transparent text-slate-600 hover:bg-slate-100 text-slate-900 transition-all',
    loginNav:
      'w-full py-4 px-6 bg-white text-slate-900 font-bold text-base rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 hover:text-blue-700 transition-all duration-200 text-center flex items-center justify-center cursor-pointer select-none'
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`rounded-xl font-semibold transition-all ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
