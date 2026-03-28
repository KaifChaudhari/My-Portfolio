// TryHackMe brand SVG icon (based on official THM logo mark)
export default function TryHackMeIcon({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="TryHackMe"
        >
            {/* THM-style shield / flag icon in brand green */}
            <rect x="4" y="4" width="32" height="32" rx="8" fill="#88cc14" fillOpacity="0.15" />
            <path
                d="M20 6L32 11V21C32 27.627 26.627 33.373 20 35C13.373 33.373 8 27.627 8 21V11L20 6Z"
                fill="#88cc14"
                fillOpacity="0.2"
                stroke="#88cc14"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            <text
                x="20"
                y="25"
                textAnchor="middle"
                fontSize="11"
                fontWeight="900"
                fontFamily="monospace"
                fill="#88cc14"
                letterSpacing="-0.5"
            >
                THM
            </text>
        </svg>
    );
}
