import React from 'react';

interface AlphaDevsLogoProps {
  className?: string;
  width?: number;
  height?: number;
  showText?: boolean;
}

const AlphaDevsLogo: React.FC<AlphaDevsLogoProps> = ({ 
  className = "", 
  width = 120, 
  height = 120, 
  showText = true 
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="/logo.jpg"
        className="transition-all duration-300"
      >
        {/* Alpha symbol (α) */}
        <path
          d="M50 160 L80 80 L120 80 L150 160 M70 130 L130 130"
          stroke="white"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Modern geometric accent */}
        <circle
          cx="100"
          cy="100"
          r="85"
          stroke="white"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
        />
        
        {/* Inner accent lines */}
        <path
          d="M60 140 L140 140"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
      
      {showText && (
        <div className="ml-3">
          <div className="text-2xl font-bold text-white tracking-wide">
            ALPHA-DEVS
          </div>
        </div>
      )}
    </div>
  );
};

export default AlphaDevsLogo;
