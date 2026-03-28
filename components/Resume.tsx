"use client";

import { Download, Eye, FileText } from "lucide-react";
import Tilt3D from "./Tilt3D";

export default function Resume() {
    return (
        <section id="resume" className="section-padding bg-[var(--surface)]/30">
            <div className="section-container">
                <div className="text-center mb-16 animate-fadeInUp">
                    <h2 className="section-heading">Professional Profile</h2>
                    <p className="section-subheading mx-auto">
                        My resume covers security research, penetration testing, AI-driven defense, and full-stack engineering.
                    </p>
                </div>

                {/* Single Resume Card */}
                <Tilt3D intensity={7} className="max-w-md mx-auto">
                    <div
                        className="card-base text-center group animate-fadeInUp"
                        style={{ borderColor: "var(--accent)", borderWidth: "1px", borderStyle: "solid", animationDelay: "100ms" }}
                    >
                        {/* Glow gradient */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-[var(--accent-2)]/5 pointer-events-none" />

                        <div className="relative">
                            <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/20 border border-[var(--accent)]/40 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                                <FileText className="w-7 h-7 text-[var(--accent)]" />
                            </div>

                            <h3 className="font-bold text-[var(--text)] text-xl mb-3">Kaif Chaudhari — Resume</h3>
                            <p className="text-[var(--muted)] text-sm mb-8 leading-relaxed">
                                Cybersecurity Analyst · Security Researcher · AI Defense Builder.
                                Clean, ATS-optimized format that covers both impact and technical depth.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <a
                                    href="/Kaif_Chaudhari_Resume.pdf"
                                    download
                                    className="btn-primary flex items-center justify-center gap-2"
                                >
                                    <Download className="w-4 h-4" /> Download PDF
                                </a>
                                <a
                                    href="/Kaif_Chaudhari_Resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-ghost flex items-center justify-center gap-2"
                                >
                                    <Eye className="w-4 h-4" /> Preview
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Trust indicators */}
                    <div
                        className="text-center mt-10 animate-fadeInUp"
                        style={{ animationDelay: "200ms" }}
                    >
                        <div className="inline-flex flex-wrap items-center justify-center gap-6 px-6 py-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]/50">
                            {[
                                { label: "Last Updated", value: "Feb 2025" },
                                { label: "Format", value: "PDF" },
                                { label: "ATS Optimized", value: "Yes" },
                                { label: "References", value: "On Request" },
                            ].map((item) => (
                                <div key={item.label} className="text-center">
                                    <div className="text-[var(--accent)] font-mono text-sm font-semibold">{item.value}</div>
                                    <div className="text-[var(--muted)] text-xs">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Tilt3D>
            </div>
        </section>
    );
}
