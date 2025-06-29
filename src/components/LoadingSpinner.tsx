import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: 'white' | 'gray' | 'black';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '', 
  color = 'white' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    white: 'border-white/20 border-t-white',
    gray: 'border-gray-300/20 border-t-gray-300',
    black: 'border-black/20 border-t-black'
  };

  return (
    <div 
      className={`${sizeClasses[size]} ${colorClasses[color]} border-2 rounded-full animate-spin ${className}`}
    />
  );
};

export default LoadingSpinner;
