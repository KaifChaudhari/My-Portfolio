import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                mono: ["JetBrains Mono", "Fira Code", "monospace"],
            },
            colors: {
                // Premium theme
                premium: {
                    bg: "#0a0a0f",
                    surface: "#111118",
                    border: "#1e1e2e",
                    accent: "#00d4ff",
                    "accent-2": "#7c3aed",
                    text: "#e2e8f0",
                    muted: "#64748b",
                },
                // Corporate theme
                corporate: {
                    bg: "#f8fafc",
                    surface: "#ffffff",
                    border: "#e2e8f0",
                    accent: "#1e40af",
                    "accent-2": "#0ea5e9",
                    text: "#0f172a",
                    muted: "#64748b",
                },
                // Red/Terminal theme
                red: {
                    bg: "#0d0000",
                    surface: "#1a0000",
                    border: "#2d0000",
                    accent: "#ff2b2b",
                    "accent-2": "#ff6b35",
                    text: "#ffcccc",
                    muted: "#994444",
                },
            },
            animation: {
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "float": "float 6s ease-in-out infinite",
                "glow": "glow 2s ease-in-out infinite alternate",
                "scan": "scan 2s linear infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                glow: {
                    from: { boxShadow: "0 0 10px rgba(0,212,255,0.3)" },
                    to: { boxShadow: "0 0 25px rgba(0,212,255,0.7), 0 0 50px rgba(0,212,255,0.3)" },
                },
                scan: {
                    "0%": { transform: "translateY(-100%)" },
                    "100%": { transform: "translateY(100vh)" },
                },
            },
            backdropBlur: {
                xs: "2px",
            },
        },
    },
    plugins: [],
};
export default config;
