"use client";

import { useTheme, Theme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const themes: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: "premium", label: "Dark", icon: <Moon className="w-3.5 h-3.5" /> },
    { value: "corporate", label: "Light", icon: <Sun className="w-3.5 h-3.5" /> },
];

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex items-center gap-1 p-1 rounded-lg border border-[var(--border)] bg-[var(--surface)]">
            {themes.map((t) => (
                <motion.button
                    key={t.value}
                    onClick={() => setTheme(t.value)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${theme === t.value
                        ? "bg-[var(--accent)] text-[var(--bg)]"
                        : "text-[var(--muted)] hover:text-[var(--text)]"
                        }`}
                    title={t.label}
                >
                    {t.icon}
                    <span className="hidden lg:inline">{t.label}</span>
                </motion.button>
            ))}
        </div>
    );
}
