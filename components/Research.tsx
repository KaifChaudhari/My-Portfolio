"use client";

import { useTechnical } from "@/context/TechnicalContext";
import research from "@/data/research";
import { BookOpen, Bug, Brain, Flag, ExternalLink, Clock } from "lucide-react";
import Tilt3D from "./Tilt3D";


const categoryConfig: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
    writeup: { icon: <BookOpen className="w-4 h-4" />, label: "Writeup", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    research: { icon: <Bug className="w-4 h-4" />, label: "Research", color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
    blog: { icon: <Brain className="w-4 h-4" />, label: "Blog", color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
    ctf: { icon: <Flag className="w-4 h-4" />, label: "CTF", color: "text-green-400 bg-green-500/10 border-green-500/20" },
};

export default function Research() {
    const { isTechnical } = useTechnical();

    return (
        <section id="research" className="section-padding bg-[var(--surface)]/30 relative overflow-hidden">

            <div className="section-container relative z-10">
                <div className="mb-16 animate-fadeInUp">
                    <h2 className="section-heading">Security Research</h2>
                    <p className="section-subheading">
                        Documented vulnerability research, malware analysis, and CTF challenge breakdowns.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {research.map((item, i) => {
                        const cat = categoryConfig[item.category];
                        return (
                            <Tilt3D key={item.id} intensity={8}>
                                <article
                                    className="card-base group cursor-default h-full animate-fadeInUp"
                                    style={{ animationDelay: `${i * 80}ms` }}
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between gap-3 mb-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium border ${cat.color}`}>
                                            {cat.icon}
                                            {cat.label}
                                        </span>
                                        <div className="flex items-center gap-1 text-xs text-[var(--muted)]">
                                            <Clock className="w-3 h-3" />
                                            {item.readTime}
                                        </div>
                                    </div>

                                    <h3 className="text-[var(--text)] font-bold text-lg mb-3 group-hover:text-[var(--accent)] transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="text-[var(--muted)] text-sm leading-relaxed mb-4">
                                        {isTechnical ? item.technicalSummary : item.summary}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {item.tags.map((tag) => (
                                            <span key={tag} className="px-2 py-0.5 rounded text-xs font-mono border border-[var(--border)] text-[var(--muted)]">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-mono text-[var(--muted)]">{item.date}</span>
                                        {item.url ? (
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-xs text-[var(--accent)] hover:opacity-80 transition-opacity"
                                            >
                                                Read <ExternalLink className="w-3 h-3" />
                                            </a>
                                        ) : (
                                            <span className="text-xs text-[var(--muted)] font-mono">Draft / Internal</span>
                                        )}
                                    </div>
                                </article>
                            </Tilt3D>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
