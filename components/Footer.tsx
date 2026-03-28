"use client";

import { motion } from "framer-motion";
import { Shield, Github, Linkedin, Mail, Lock } from "lucide-react";
import TryHackMeIcon from "./TryHackMeIcon";
import HackerGlobe from "./HackerGlobe";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-[var(--border)] bg-[var(--surface)]/50 relative overflow-hidden">
            {/* 3D Globe */}
            <HackerGlobe className="mx-auto max-w-lg" />

            <div className="section-container py-12 relative z-10">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Shield className="w-5 h-5 text-[var(--accent)]" />
                            <span className="font-mono font-bold text-[var(--text)]">
                                KAIF<span className="text-[var(--accent)]">.CYBER</span>
                            </span>
                        </div>
                        <p className="text-[var(--muted)] text-sm leading-relaxed">
                            Cybersecurity Analyst · Security Researcher · AI-Driven Defense Builder
                        </p>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h4 className="text-[var(--text)] font-semibold text-sm mb-3">Navigation</h4>
                        <div className="flex flex-col gap-2">
                            {["About", "Projects", "Research", "Skills", "Resume", "Contact"].map((link) => (
                                <button
                                    key={link}
                                    onClick={() => document.querySelector(`#${link.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth" })}
                                    className="text-[var(--muted)] text-sm text-left hover:text-[var(--accent)] transition-colors"
                                >
                                    {link}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Security notice */}
                    <div>
                        <h4 className="text-[var(--text)] font-semibold text-sm mb-3">Security Notice</h4>
                        <div className="space-y-2">
                            {[
                                "Static deployment — no server side processing",
                                "No third-party trackers or analytics",
                                "Content Security Policy active",
                                "HTTPS enforced on GitHub Pages",
                            ].map((item) => (
                                <div key={item} className="flex items-start gap-2 text-xs text-[var(--muted)]">
                                    <Lock className="w-3 h-3 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--border)]">
                    <p className="text-[var(--muted)] text-xs font-mono">
                        © {year} Kaif Chaudhari · Built with Next.js + TypeScript · <a href="https://github.com/KaifChaudhari" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">KaifChaudhari</a>
                    </p>

                    {/* Social icons */}
                    <div className="flex items-center gap-4">
                        <motion.a
                            href="https://github.com/KaifChaudhari"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                            aria-label="GitHub"
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Github className="w-4 h-4" />
                        </motion.a>
                        <motion.a
                            href="https://linkedin.com/in/kaifchaudhari"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                            aria-label="LinkedIn"
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Linkedin className="w-4 h-4" />
                        </motion.a>
                        <motion.a
                            href="https://tryhackme.com/p/kaifchaudhari"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--muted)] hover:text-[#88cc14] transition-colors"
                            aria-label="TryHackMe"
                            title="TryHackMe Profile"
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <TryHackMeIcon className="w-4 h-4" />
                        </motion.a>
                        <motion.a
                            href="mailto:kaifchaudhari@email.com"
                            className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                            aria-label="Email"
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Mail className="w-4 h-4" />
                        </motion.a>
                    </div>

                    {/* Security badge */}
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-green-400 text-xs font-mono">Secure Deployment</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
