"use client";

interface GallowsProps {
  mistakes: number;
}

export default function Gallows({ mistakes }: GallowsProps) {
  const isPartVisible = (partId: number) => mistakes >= partId;

  return (
    <div className="flex items-center justify-center w-full max-w-xs mx-auto">
      <svg viewBox="0 0 200 250" className="w-full h-full" role="img">
        <g className="animate-draw-in">
          <line
            x1="10"
            y1="230"
            x2="150"
            y2="230"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="origin-left"
          />

          <line
            x1="40"
            y1="230"
            x2="40"
            y2="20"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="origin-bottom"
          />

          <line
            x1="40"
            y1="20"
            x2="130"
            y2="20"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="origin-left"
          />

          <line
            x1="130"
            y1="20"
            x2="130"
            y2="50"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {isPartVisible(1) && (
          <g className="animate-fade-in animation-delay-500">
            <circle
              cx="130"
              cy="65"
              r="15"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
            />
            <circle cx="125" cy="63" r="2" fill="currentColor" />
            <circle cx="135" cy="63" r="2" fill="currentColor" />
            <path
              d="M 125 70 Q 130 72 135 70"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        )}
        {isPartVisible(2) && (
          <g className="animate-fade-in animation-delay-500">
            <line
              x1="130"
              y1="80"
              x2="130"
              y2="130"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        )}
        {isPartVisible(3) && (
          <g className="animate-fade-in animation-delay-500">
            <line
              x1="130"
              y1="90"
              x2="110"
              y2="110"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        )}
        {isPartVisible(4) && (
          <g className="animate-fade-in animation-delay-500">
            <line
              x1="130"
              y1="90"
              x2="150"
              y2="110"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        )}
        {isPartVisible(5) && (
          <g className="animate-fade-in animation-delay-500">
            <line
              x1="130"
              y1="130"
              x2="110"
              y2="160"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        )}
        {isPartVisible(6) && (
          <g className="animate-fade-in animation-delay-500">
            <line
              x1="130"
              y1="130"
              x2="150"
              y2="160"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
