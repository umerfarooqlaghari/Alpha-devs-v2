import React from 'react';

interface IntegrationIconProps {
  className?: string;
  size?: number;
}

const IntegrationIcon: React.FC<IntegrationIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Central hub */}
      <circle
        cx="12"
        cy="12"
        r="3"
        fill="currentColor"
        opacity="0.9"
      />
      
      {/* Connection nodes */}
      <circle cx="6" cy="6" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="18" cy="6" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="6" cy="18" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="18" cy="18" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="12" cy="3" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="12" cy="21" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="3" cy="12" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="21" cy="12" r="1.5" fill="currentColor" opacity="0.6" />
      
      {/* Connection lines */}
      <path
        d="M9.5 9.5 L6 6 M14.5 9.5 L18 6 M9.5 14.5 L6 18 M14.5 14.5 L18 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M12 9 L12 3 M12 15 L12 21 M9 12 L3 12 M15 12 L21 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      
      {/* Data flow indicators */}
      <circle cx="9" cy="9" r="0.5" fill="white" opacity="0.8">
        <animate attributeName="r" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="15" cy="9" r="0.5" fill="white" opacity="0.8">
        <animate attributeName="r" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="0.5s" />
      </circle>
      <circle cx="9" cy="15" r="0.5" fill="white" opacity="0.8">
        <animate attributeName="r" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="1s" />
      </circle>
      <circle cx="15" cy="15" r="0.5" fill="white" opacity="0.8">
        <animate attributeName="r" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="1.5s" />
      </circle>
      
      {/* Central icon */}
      <circle cx="12" cy="12" r="1" fill="white" opacity="0.9" />
    </svg>
  );
};

export default IntegrationIcon;
