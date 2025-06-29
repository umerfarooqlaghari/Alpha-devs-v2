import React from 'react';

interface SecurityIconProps {
  className?: string;
  size?: number;
}

const SecurityIcon: React.FC<SecurityIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield outline */}
      <path
        d="M12 2 L4 6 L4 12 C4 16.5 7.5 20.26 12 21 C16.5 20.26 20 16.5 20 12 L20 6 L12 2 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
        opacity="0.8"
      />
      
      {/* Shield fill */}
      <path
        d="M12 3 L5 6.5 L5 12 C5 15.9 8.1 19.24 12 19.9 C15.9 19.24 19 15.9 19 12 L19 6.5 L12 3 Z"
        fill="currentColor"
        opacity="0.1"
      />
      
      {/* Lock icon inside */}
      <rect
        x="9"
        y="11"
        width="6"
        height="4"
        rx="1"
        fill="currentColor"
        opacity="0.9"
      />
      
      {/* Lock shackle */}
      <path
        d="M10 11 L10 9 C10 7.9 10.9 7 12 7 C13.1 7 14 7.9 14 9 L14 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      
      {/* Lock keyhole */}
      <circle
        cx="12"
        cy="13"
        r="0.8"
        fill="white"
        opacity="0.8"
      />
      
      {/* Security pattern */}
      <circle cx="8" cy="8" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="16" cy="8" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="8" cy="16" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="16" cy="16" r="1" fill="currentColor" opacity="0.3" />
      
      {/* Connection lines */}
      <path
        d="M8 8 L12 12 L16 8 M8 16 L12 12 L16 16"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.2"
      />
    </svg>
  );
};

export default SecurityIcon;
