"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Bug, Cpu, Award } from "lucide-react";

const highlights = [
    {
        icon: <ShieldCheck className="w-5 h-5" />,
        label: "OWASP Top 10 Coverage",
        sub: "Full spectrum web security",
    },
    {
        icon: <Bug className="w-5 h-5" />,
        label: "Vulnerability Research",
        sub: "Advanced exploitation & analysis",
    },
    {
        icon: <Cpu className="w-5 h-5" />,
        label: "AI-Driven Defense",
        sub: "Intelligent threat detection",
    },
    {
        icon: <Award className="w-5 h-5" />,
        label: "Balanced Hybrid Profile",
        sub: "Analyst + Researcher + Builder",
    },
];

export default function ValueStrip() {
    return (
        <section className="border-y border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur-sm">
            <div className="section-container py-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {highlights.map((item, i) => (
                        <div
                            key={item.label}
                            className="flex items-center gap-3 animate-fadeInUp"
                            style={{ animationDelay: `${i * 80}ms`, perspective: 400 }}
                        >
                            {/* 3D spinning icon box */}
                            <motion.div
                                className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-[var(--accent)]"
                                style={{ background: "rgba(0, 212, 255, 0.1)", border: "1px solid var(--border)", transformStyle: "preserve-3d" }}
                                whileHover={{
                                    rotateY: 180,
                                    scale: 1.15,
                                    boxShadow: "0 0 16px var(--accent)",
                                }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            >
                                {item.icon}
                            </motion.div>
                            <div>
                                <div className="text-[var(--text)] font-semibold text-sm leading-tight">{item.label}</div>
                                <div className="text-[var(--muted)] text-xs mt-0.5">{item.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
