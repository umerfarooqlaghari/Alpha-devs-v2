import React from 'react';

interface AIIconProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

const AIIcon: React.FC<AIIconProps> = ({ className = "", size = 24, animated = false }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Brain outline */}
      <path
        d="M9.5 2 C7.5 2 6 3.5 6 5.5 C4.5 5.5 3 7 3 8.5 C3 10 4.5 11.5 6 11.5 C6 13.5 7.5 15 9.5 15 L14.5 15 C16.5 15 18 13.5 18 11.5 C19.5 11.5 21 10 21 8.5 C21 7 19.5 5.5 18 5.5 C18 3.5 16.5 2 14.5 2 L9.5 2 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
        opacity="0.8"
      />
      
      {/* Brain fill */}
      <path
        d="M9.5 3 C8 3 7 4 7 5.5 C5.5 5.5 4 6.5 4 8.5 C4 9.5 5 10.5 6 10.5 C6 12 7 14 9.5 14 L14.5 14 C16 14 17 12 17 10.5 C18 10.5 20 9.5 20 8.5 C20 6.5 18.5 5.5 17 5.5 C17 4 16 3 14.5 3 L9.5 3 Z"
        fill="currentColor"
        opacity="0.1"
      />
      
      {/* Neural network nodes */}
      <circle cx="8" cy="7" r="1" fill="currentColor" opacity="0.8" />
      <circle cx="12" cy="6" r="1" fill="currentColor" opacity="0.8" />
      <circle cx="16" cy="7" r="1" fill="currentColor" opacity="0.8" />
      <circle cx="9" cy="10" r="1" fill="currentColor" opacity="0.8" />
      <circle cx="15" cy="10" r="1" fill="currentColor" opacity="0.8" />
      <circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.8" />
      
      {/* Neural connections */}
      <path
        d="M8 7 L12 6 L16 7 M8 7 L9 10 M16 7 L15 10 M12 6 L12 12 M9 10 L12 12 M15 10 L12 12"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
      />
      
      {/* AI processing indicators */}
      {animated && (
        <>
          <circle cx="8" cy="7" r="0.5" fill="white" opacity="0.9">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="12" cy="6" r="0.5" fill="white" opacity="0.9">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" begin="0.3s" />
          </circle>
          <circle cx="16" cy="7" r="0.5" fill="white" opacity="0.9">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" begin="0.6s" />
          </circle>
          <circle cx="9" cy="10" r="0.5" fill="white" opacity="0.9">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" begin="0.9s" />
          </circle>
          <circle cx="15" cy="10" r="0.5" fill="white" opacity="0.9">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" begin="1.2s" />
          </circle>
        </>
      )}
      
      {/* Circuit pattern */}
      <path
        d="M6 18 L8 18 L8 20 M10 18 L12 18 M14 18 L16 18 L16 20 M18 18 L20 18"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="8" cy="18" r="0.5" fill="currentColor" opacity="0.6" />
      <circle cx="12" cy="18" r="0.5" fill="currentColor" opacity="0.6" />
      <circle cx="16" cy="18" r="0.5" fill="currentColor" opacity="0.6" />
    </svg>
  );
};

export default AIIcon;
