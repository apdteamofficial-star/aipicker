import React from 'react';

interface AIPickerLogoProps {
  className?: string;
  iconSize?: number;
  showText?: boolean;
  variant?: 'light' | 'dark';
}

export const AIPickerLogoMark: React.FC<{ size?: number; className?: string }> = ({
  size = 38,
  className = '',
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none transition-transform duration-300 group-hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_4px_12px_rgba(99,102,241,0.35)]"
      >
        <defs>
          {/* Main Left Blade Gradient */}
          <linearGradient id="ai-blade-left" x1="6" y1="42" x2="24" y2="4" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4338CA" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>

          {/* Main Right Blade Gradient */}
          <linearGradient id="ai-blade-right" x1="24" y1="4" x2="42" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#D946EF" />
          </linearGradient>

          {/* Dynamic AI Core Prism Crossbar */}
          <linearGradient id="ai-prism-core" x1="12" y1="26" x2="36" y2="26" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>

          {/* Center Neural Sparkle Gradient */}
          <radialGradient id="ai-neural-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="ai-spark-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#67E8F9" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          {/* Filter for subtle futuristic glow */}
          <filter id="soft-neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer ambient glow path */}
        <path
          d="M24 5L41 41H31.5L24 23.5L16.5 41H7L24 5Z"
          fill="none"
          stroke="url(#ai-prism-core)"
          strokeWidth="1.5"
          opacity="0.3"
          className="blur-[1px]"
        />

        {/* Left Stylized Arch of 'A' */}
        <path
          d="M24 5.5L7 41.5H16L24 24.5L24 5.5Z"
          fill="url(#ai-blade-left)"
        />

        {/* Right Stylized Arch of 'A' */}
        <path
          d="M24 5.5L41 41.5H32L24 24.5L24 5.5Z"
          fill="url(#ai-blade-right)"
        />

        {/* Futuristic Floating Chevron / Picker Crossbar */}
        <path
          d="M13 29L24 21L35 29L29 32.5L24 28.5L19 32.5L13 29Z"
          fill="url(#ai-prism-core)"
          filter="url(#soft-neon-glow)"
        />

        {/* Upper Apex Light Beam */}
        <polygon
          points="24,5 26.5,12 24,10 21.5,12"
          fill="#FFFFFF"
          opacity="0.9"
        />

        {/* Dynamic 4-pointed AI Neural Star / Picker Cursor at Apex */}
        <g transform="translate(24, 21.5)">
          {/* Subtle star glow */}
          <circle cx="0" cy="0" r="4.5" fill="url(#ai-neural-glow)" opacity="0.8" />
          {/* Diamond spark */}
          <path
            d="M0 -5.5L1.4 -1.4L5.5 0L1.4 1.4L0 5.5L-1.4 1.4L-5.5 0L-1.4 -1.4Z"
            fill="url(#ai-spark-grad)"
          />
          <circle cx="0" cy="0" r="1.1" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};

export const AIPickerLogo: React.FC<AIPickerLogoProps> = ({
  className = '',
  iconSize = 38,
  showText = true,
  variant = 'light',
}) => {
  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <AIPickerLogoMark size={iconSize} />

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center tracking-tight font-sans leading-none">
            <span
              className={`text-xl font-black ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              AI
            </span>
            <span className="text-xl font-black bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent ml-0.5">
              Picker
            </span>
          </div>
          <span
            className={`text-[9.5px] font-bold tracking-widest uppercase mt-1 ${
              isLight ? 'text-indigo-600/90' : 'text-cyan-400/90'
            }`}
          >
            Directory & Lab
          </span>
        </div>
      )}
    </div>
  );
};
