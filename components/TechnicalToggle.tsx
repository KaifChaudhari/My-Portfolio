"use client";

import { useTechnical } from "@/context/TechnicalContext";
import { motion } from "framer-motion";
import { Code2, User } from "lucide-react";

export default function TechnicalToggle() {
    const { isTechnical, toggleTechnical } = useTechnical();

    return (
        <motion.button
            onClick={toggleTechnical}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all duration-300 ${isTechnical
                    ? "bg-[var(--accent)] border-[var(--accent)] text-[var(--bg)]"
                    : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                }`}
            title={isTechnical ? "Switch to Recruiter View" : "Switch to Technical View"}
        >
            {isTechnical ? (
                <>
                    <Code2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Technical</span>
                </>
            ) : (
                <>
                    <User className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Recruiter</span>
                </>
            )}
        </motion.button>
    );
}
