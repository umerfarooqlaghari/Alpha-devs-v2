import React from 'react';

interface VoiceIconProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

const VoiceIcon: React.FC<VoiceIconProps> = ({ className = "", size = 24, animated = false }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Microphone body */}
      <rect
        x="9"
        y="2"
        width="6"
        height="10"
        rx="3"
        fill="currentColor"
        opacity="0.9"
      />
      
      {/* Microphone grille */}
      <line x1="10" y1="4" x2="14" y2="4" stroke="white" strokeWidth="0.5" opacity="0.6" />
      <line x1="10" y1="6" x2="14" y2="6" stroke="white" strokeWidth="0.5" opacity="0.6" />
      <line x1="10" y1="8" x2="14" y2="8" stroke="white" strokeWidth="0.5" opacity="0.6" />
      <line x1="10" y1="10" x2="14" y2="10" stroke="white" strokeWidth="0.5" opacity="0.6" />
      
      {/* Microphone stand */}
      <path
        d="M12 12 L12 18 M8 18 L16 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />
      
      {/* Sound waves */}
      <path
        d="M18 8 C18 5.79 16.21 4 14 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity={animated ? "0.8" : "0.6"}
        className={animated ? "animate-pulse" : ""}
      />
      <path
        d="M20 6 C20 3.79 17.21 1 14 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity={animated ? "0.6" : "0.4"}
        className={animated ? "animate-pulse" : ""}
        style={animated ? { animationDelay: "0.2s" } : {}}
      />
      <path
        d="M6 8 C6 5.79 7.79 4 10 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity={animated ? "0.8" : "0.6"}
        className={animated ? "animate-pulse" : ""}
      />
      <path
        d="M4 6 C4 3.79 6.79 1 10 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity={animated ? "0.6" : "0.4"}
        className={animated ? "animate-pulse" : ""}
        style={animated ? { animationDelay: "0.4s" } : {}}
      />
      
      {/* AI indicator */}
      <circle
        cx="18"
        cy="18"
        r="3"
        fill="currentColor"
        opacity="0.9"
      />
      <text
        x="18"
        y="19"
        textAnchor="middle"
        fontSize="6"
        fill="white"
        fontWeight="bold"
      >
        AI
      </text>
    </svg>
  );
};

export default VoiceIcon;
