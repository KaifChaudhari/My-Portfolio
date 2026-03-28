"use client";

import { motion } from "framer-motion";
import { User, Calendar, BookOpen, Target } from "lucide-react";
import TryHackMeIcon from "./TryHackMeIcon";
import CurrentlyLearning from "./CurrentlyLearning";


const timeline = [
    {
        year: "2024–Present",
        icon: <Target className="w-4 h-4" />,
        title: "Cybersecurity Focus",
        desc: "Specializing in web application security, penetration testing, and AI-driven defense research.",
    },
    {
        year: "2023–Present",
        icon: <BookOpen className="w-4 h-4" />,
        title: "Security Research & CTFs",
        desc: "Active participation in CTF challenges, vulnerability writeups, and malware analysis.",
    },
    {
        year: "2022–2024",
        icon: <Calendar className="w-4 h-4" />,
        title: "Software Engineering Foundation",
        desc: "Built strong programming fundamentals across Python, Flutter, and web technologies.",
    },
    {
        year: "2021",
        icon: <User className="w-4 h-4" />,
        title: "CS Degree Journey Begins",
        desc: "Bachelor's in Computer Science — focusing on security, systems, and software engineering.",
    },
];

export default function About() {
    return (
        <section id="about" className="section-padding relative overflow-hidden">

            <div className="section-container relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Professional Summary */}
                    <div className="animate-fadeInUp">
                        <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-[var(--text)] mb-6">
                            Not Just a Security Analyst.
                            <br />
                            <span className="text-[var(--accent)]">A Balanced Hybrid.</span>
                        </h2>

                        <div className="space-y-5 text-[var(--muted)] leading-relaxed">
                            <p>
                                I operate at the intersection of offensive security research and defensive
                                engineering — identifying how systems break, then building the solutions
                                to prevent it. My work is hands-on, evidence-driven, and production-aware.
                            </p>
                            <p>
                                From dissecting OWASP Top 10 vulnerabilities in real applications to building
                                automated scanning tools and researching malware behavior, I approach security
                                as a discipline that requires both depth of knowledge and practical execution.
                            </p>
                            <p>
                                I&apos;m actively expanding into AI-driven threat detection — applying machine
                                learning to solve problems that traditional signature-based defenses consistently
                                miss.
                            </p>
                        </div>

                        {/* Core qualities */}
                        <div className="mt-8 grid grid-cols-2 gap-3">
                            {[
                                "OWASP Expertise",
                                "Threat Modeling",
                                "Secure Code Review",
                                "Malware Analysis",
                                "AI Defense Research",
                                "CTF Problem Solving",
                            ].map((skill) => (
                                <div
                                    key={skill}
                                    className="flex items-center gap-2 text-sm text-[var(--muted)]"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                                    {skill}
                                </div>
                            ))}
                        </div>

                        {/* TryHackMe Profile */}
                        <motion.a
                            href="https://tryhackme.com/p/kaifchaudhari"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)]/60 hover:border-[#88cc14]/50 transition-all duration-300 group"
                        >
                            <div className="w-9 h-9 rounded-lg bg-[#88cc14]/10 border border-[#88cc14]/30 flex items-center justify-center flex-shrink-0 group-hover:border-[#88cc14]/60 transition-colors">
                                <TryHackMeIcon className="w-6 h-6" />
                            </div>
                            <div className="min-w-0">
                                <div className="text-sm font-semibold text-[var(--text)]">TryHackMe</div>
                                <div className="text-xs text-[var(--muted)] font-mono">tryhackme.com/p/kaifchaudhari</div>
                            </div>
                            <div className="ml-auto flex items-center gap-1.5 text-xs font-mono text-[#88cc14]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#88cc14] animate-pulse" />
                                Active
                            </div>
                        </motion.a>
                    </div>


                    {/* Right: Timeline */}
                    <div className="animate-fadeInUp" style={{ animationDelay: "150ms" }}>
                        <h3 className="text-xl font-bold text-[var(--text)] mb-8">
                            Focus Areas &amp; Education
                        </h3>

                        <div className="relative">
                            {/* Vertical line */}
                            <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--border)]" />

                            <div className="space-y-8">
                                {timeline.map((item, i) => (
                                    <div
                                        key={item.year}
                                        className="relative pl-12 animate-fadeInUp"
                                        style={{ animationDelay: `${(i + 2) * 100}ms` }}
                                    >
                                        {/* Dot */}
                                        <div className="absolute left-0 top-1 w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center text-[var(--accent)]">
                                            {item.icon}
                                        </div>
                                        <div className="text-xs font-mono text-[var(--accent)] mb-1">{item.year}</div>
                                        <div className="text-[var(--text)] font-semibold mb-1">{item.title}</div>
                                        <div className="text-[var(--muted)] text-sm leading-relaxed">{item.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Currently Learning */}
                        <div className="mt-8">
                            <CurrentlyLearning />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
