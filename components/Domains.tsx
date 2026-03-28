"use client";

import { Globe, Bug, Brain, Network, Code2 } from "lucide-react";
import Tilt3D from "./Tilt3D";

const domains = [
    {
        icon: <Globe className="w-6 h-6" />,
        title: "Web Application Security",
        description:
            "Manual and automated testing of web applications against OWASP Top 10. Identifying injection flaws, authentication bypasses, and logic vulnerabilities in production systems.",
        capability: "Penetration Testing · Code Review · OWASP",
    },
    {
        icon: <Bug className="w-6 h-6" />,
        title: "Malware & Threat Research",
        description:
            "Static and dynamic malware analysis using reverse engineering techniques. Identifying C2 mechanisms, persistence strategies, and evasion patterns in real-world samples.",
        capability: "Reverse Engineering · IOC Extraction · YARA",
    },
    {
        icon: <Brain className="w-6 h-6" />,
        title: "AI in Cyber Defense",
        description:
            "Applying machine learning to anomaly detection, intelligent threat correlation, and automated security analysis. Building models that catch what signatures miss.",
        capability: "Anomaly Detection · ML Models · LLM Security",
    },
    {
        icon: <Network className="w-6 h-6" />,
        title: "Network Security",
        description:
            "Analysis of network traffic, protocol vulnerabilities, and infrastructure security. Proficient in reconnaissance, scanning, and network-level attack identification.",
        capability: "Traffic Analysis · Nmap · Wireshark",
    },
    {
        icon: <Code2 className="w-6 h-6" />,
        title: "Secure Software Engineering",
        description:
            "Building applications with security as the foundation — not an afterthought. Threat-aware design, secure architecture decisions, and defense-in-depth implementation.",
        capability: "Secure SDLC · Flask · Next.js · Flutter",
    },
];

export default function Domains() {
    return (
        <section id="domains" className="section-padding bg-[var(--surface)]/30 relative overflow-hidden">
            <div className="section-container relative z-10">
                <div className="text-center mb-16 animate-fadeInUp">
                    <h2 className="section-heading">Security Specializations</h2>
                    <p className="section-subheading mx-auto">
                        Five interconnected domains that form a complete, defense-in-depth security profile.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {domains.map((domain, i) => (
                        <Tilt3D key={domain.title} intensity={10} className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
                            <div
                                className="card-base group cursor-default h-full animate-fadeInUp"
                                style={{ animationDelay: `${i * 80}ms` }}
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-[var(--accent)] bg-[var(--accent)]/10 border border-[var(--border)] group-hover:border-[var(--accent)] transition-colors duration-300">
                                        {domain.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-[var(--text)] leading-tight">{domain.title}</h3>
                                    </div>
                                </div>

                                <p className="text-[var(--muted)] text-sm leading-relaxed mb-4">
                                    {domain.description}
                                </p>

                                <div className="text-xs font-mono text-[var(--accent)]/70 border-t border-[var(--border)] pt-3">
                                    {domain.capability}
                                </div>
                            </div>
                        </Tilt3D>
                    ))}
                </div>
            </div>
        </section>
    );
}
