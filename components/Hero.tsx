"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ArrowDown, ChevronRight, Download, X, CheckCircle, Shield } from "lucide-react";
import HoloNameIntro from "./HoloNameIntro";
import CyberCube from "./CyberCube";

const roles = [
    "Cybersecurity Analyst",
    "Security Researcher",
    "AI-Driven Defense Builder",
];

const scanLines = [
    { delay: 0, text: "$ initiating portfolio security audit..." },
    { delay: 400, text: "> scanning surface attack vectors..." },
    { delay: 900, text: "> checking XSS defenses.............. [PASS ✓]" },
    { delay: 1400, text: "> checking CSRF protections........... [PASS ✓]" },
    { delay: 1900, text: "> checking CSP headers................ [PASS ✓]" },
    { delay: 2400, text: "> enumerating open dependencies....... [CLEAN ✓]" },
    { delay: 2900, text: "> checking for exposed secrets......... [NONE ✓]" },
    { delay: 3400, text: "> validating HTTPS enforcement......... [PASS ✓]" },
    { delay: 3900, text: "✔ audit complete — 0 vulnerabilities found." },
    { delay: 4400, text: "  Portfolio: SECURE ■■■■■■■■■■ 100%" },
];

export default function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [scanOpen, setScanOpen] = useState(false);
    const [scanActive, setScanActive] = useState(false);
    const [visibleLines, setVisibleLines] = useState<number>(0);

    useEffect(() => {
        const current = roles[roleIndex];
        let timeout: NodeJS.Timeout;

        if (!isDeleting && displayed.length < current.length) {
            timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
        } else if (!isDeleting && displayed.length === current.length) {
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && displayed.length > 0) {
            timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
        } else if (isDeleting && displayed.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }

        return () => clearTimeout(timeout);
    }, [displayed, isDeleting, roleIndex]);

    const handleScan = () => {
        setScanOpen(true);
        setScanActive(true);
        setVisibleLines(0);

        scanLines.forEach((line, i) => {
            setTimeout(() => {
                setVisibleLines(i + 1);
                if (i === scanLines.length - 1) setScanActive(false);
            }, line.delay + 200);
        });
    };

    const closeScan = () => {
        setScanOpen(false);
        setVisibleLines(0);
        setScanActive(false);
    };

    const scrollToProjects = () => {
        document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 dot-grid opacity-15" />
            <HoloNameIntro />

            {/* Interactive Cyber Cube — bottom-right */}
            <div className="absolute bottom-8 right-8 z-20 hidden lg:block">
                <CyberCube />
            </div>

            {/* Gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--accent-2)]/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />



            <div className="section-container relative z-10 pt-24 pb-16">
                <div className="max-w-4xl">
                    {/* Status badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur-sm mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs font-mono text-[var(--muted)]">
                            Available for opportunities · Cybersecurity roles
                        </span>
                    </motion.div>

                    {/* Main headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-6"
                    >
                        {/* Typewriter role */}
                        <div className="text-[var(--accent)] font-mono text-lg sm:text-xl font-semibold mb-4 h-8">
                            <span>{displayed}</span>
                            <span className="inline-block w-0.5 h-5 bg-[var(--accent)] animate-pulse ml-1 align-middle" />
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight text-[var(--text)]">
                            Building Secure
                            <br />
                            <span className="text-[var(--accent)]">Systems</span> That{" "}
                            <br className="hidden sm:block" />
                            Actually Hold.
                        </h1>
                    </motion.div>

                    {/* Subheading */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-[var(--muted)] text-lg sm:text-xl max-w-2xl leading-relaxed mb-10"
                    >
                        Building secure systems, researching vulnerabilities, and engineering
                        intelligent defensive solutions. Cybersecurity is not a feature — it&apos;s the foundation.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-wrap gap-4 mb-16"
                    >
                        <button onClick={scrollToProjects} className="btn-primary flex items-center gap-2">
                            View Projects <ChevronRight className="w-4 h-4" />
                        </button>
                        <a
                            href="#resume"
                            onClick={(e) => { e.preventDefault(); document.querySelector("#resume")?.scrollIntoView({ behavior: "smooth" }); }}
                            className="btn-secondary flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" /> Download Resume
                        </a>
                        <button
                            onClick={handleScan}
                            className="btn-ghost flex items-center gap-2"
                            title="Run live security audit of this portfolio"
                        >
                            <Terminal className="w-4 h-4" />
                            Scan This Portfolio
                        </button>
                    </motion.div>

                    {/* Stats row */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.0 }}
                        className="flex flex-wrap gap-8 text-sm"
                    >
                        {[
                            { label: "Projects Built", value: "5+" },
                            { label: "OWASP Categories Tested", value: "10/10" },
                            { label: "Security Writeups", value: "4+" },
                            { label: "CTF Challenges", value: "25+" },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <div className="text-2xl font-bold text-[var(--accent)]">{stat.value}</div>
                                <div className="text-[var(--muted)] text-xs mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--muted)]"
            >
                <span className="text-xs font-mono">scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <ArrowDown className="w-4 h-4" />
                </motion.div>
            </motion.div>

            {/* ── Terminal Scan Modal ── */}
            <AnimatePresence>
                {scanOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={(e) => { if (e.target === e.currentTarget) closeScan(); }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="w-full max-w-lg rounded-2xl border border-[var(--accent)]/40 bg-[#0a0a0f] shadow-2xl overflow-hidden"
                        >
                            {/* Terminal top bar */}
                            <div className="flex items-center justify-between px-4 py-3 bg-[var(--surface)] border-b border-[var(--border)]">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <span className="text-xs font-mono text-[var(--muted)]">kaif@portfolio ~ security-audit</span>
                                <button
                                    onClick={closeScan}
                                    className="text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Terminal body */}
                            <div className="p-5 font-mono text-sm space-y-1.5 min-h-[260px]">
                                {scanLines.slice(0, visibleLines).map((line, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className={`${line.text.includes("PASS") || line.text.includes("CLEAN") || line.text.includes("NONE")
                                            ? "text-green-400"
                                            : line.text.includes("SECURE") || line.text.includes("complete")
                                                ? "text-[var(--accent)] font-bold"
                                                : line.text.startsWith("$")
                                                    ? "text-[var(--accent)]"
                                                    : "text-[var(--muted)]"
                                            }`}
                                    >
                                        {line.text}
                                    </motion.div>
                                ))}

                                {/* Blinking cursor while scanning */}
                                {scanActive && (
                                    <motion.span
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                        className="inline-block w-2 h-4 bg-[var(--accent)] ml-1 align-middle"
                                    />
                                )}

                                {/* Done state */}
                                {!scanActive && visibleLines === scanLines.length && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="flex items-center gap-2 mt-4 pt-4 border-t border-[var(--border)]"
                                    >
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        <span className="text-green-400 text-xs">No vulnerabilities detected · Built with security-first principles</span>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
