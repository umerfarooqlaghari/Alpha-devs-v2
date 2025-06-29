import React from 'react';

interface AnalyticsIconProps {
  className?: string;
  size?: number;
}

const AnalyticsIcon: React.FC<AnalyticsIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle */}
      <circle cx="12" cy="12" r="11" fill="url(#analyticsGradient)" opacity="0.1" />
      
      {/* Chart bars */}
      <rect x="4" y="16" width="2" height="4" rx="1" fill="currentColor" opacity="0.6" />
      <rect x="7" y="12" width="2" height="8" rx="1" fill="currentColor" opacity="0.8" />
      <rect x="10" y="8" width="2" height="12" rx="1" fill="currentColor" />
      <rect x="13" y="10" width="2" height="10" rx="1" fill="currentColor" opacity="0.8" />
      <rect x="16" y="6" width="2" height="14" rx="1" fill="currentColor" />
      <rect x="19" y="14" width="2" height="6" rx="1" fill="currentColor" opacity="0.6" />
      
      {/* Trend line */}
      <path
        d="M3 17 L6 14 L9 10 L12 8 L15 11 L18 7 L21 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.7"
      />
      
      {/* Data points */}
      <circle cx="6" cy="14" r="2" fill="currentColor" opacity="0.9" />
      <circle cx="12" cy="8" r="2" fill="currentColor" />
      <circle cx="18" cy="7" r="2" fill="currentColor" opacity="0.9" />
      
      <defs>
        <linearGradient id="analyticsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default AnalyticsIcon;
