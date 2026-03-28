"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTechnical } from "@/context/TechnicalContext";
import projects from "@/data/projects";
import { ExternalLink, Github, ChevronDown, ChevronUp, Shield, Code2 } from "lucide-react";
import Tilt3D from "./Tilt3D";

export default function Projects() {
    const { isTechnical } = useTechnical();
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const featured = projects.find((p) => p.featured);
    const additional = projects.filter((p) => !p.featured);

    const toggleExpand = (id: string) => {
        setExpandedId((prev) => (prev === id ? null : id));
    };

    return (
        <section id="projects" className="section-padding relative overflow-hidden">

            <div className="section-container relative z-10">
                <div className="mb-16 animate-fadeInUp">
                    <h2 className="section-heading">Security Engineering Work</h2>
                    <p className="section-subheading">
                        Systems built with security-first design principles and real-world applicability.
                    </p>
                </div>

                {/* Featured Project */}
                {featured && (
                    <Tilt3D intensity={5} className="mb-12">
                        <div className="animate-fadeInUp" style={{ animationDelay: "100ms" }}>
                            <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
                                {/* Featured badge */}
                                <div className="absolute top-0 right-0 px-4 py-2 bg-[var(--accent)] text-[var(--bg)] text-xs font-mono font-bold rounded-bl-xl">
                                    {featured.tag}
                                </div>

                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-[var(--accent-2)]/5 pointer-events-none" />

                                <div className="relative p-8 lg:p-10">
                                    <div className="flex flex-wrap items-start gap-4 mb-6">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-2xl lg:text-3xl font-bold text-[var(--text)] mb-1">
                                                {featured.title}
                                            </h3>
                                            <p className="text-[var(--accent)] font-mono text-sm">{featured.subtitle}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-mono border ${featured.status === "completed"
                                            ? "border-green-500/30 text-green-400 bg-green-500/10"
                                            : "border-blue-500/30 text-blue-400 bg-blue-500/10"
                                            }`}>
                                            {featured.status}
                                        </span>
                                    </div>

                                    {/* Description — switches on technical mode */}
                                    <p className="text-[var(--muted)] leading-relaxed mb-6 max-w-3xl">
                                        {isTechnical ? featured.technicalDescription : featured.description}
                                    </p>

                                    {/* Highlights */}
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                                        {(isTechnical ? featured.technicalHighlights : featured.highlights).map((h) => (
                                            <div key={h} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                                                <Shield className="w-3.5 h-3.5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                                                <span>{h}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Architecture (technical mode) */}
                                    <AnimatePresence>
                                        {isTechnical && featured.architecture && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 mb-6">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Code2 className="w-4 h-4 text-[var(--accent)]" />
                                                        <span className="text-xs font-mono text-[var(--accent)]">Architecture</span>
                                                    </div>
                                                    <p className="text-xs font-mono text-[var(--muted)] leading-relaxed">
                                                        {featured.architecture}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Stack */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {featured.stack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 rounded-md text-xs font-mono border border-[var(--border)] text-[var(--muted)] bg-[var(--bg)]/50"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Links */}
                                    <div className="flex gap-4">
                                        {featured.githubUrl && (
                                            <a
                                                href={featured.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-secondary flex items-center gap-2 text-sm"
                                            >
                                                <Github className="w-4 h-4" /> GitHub
                                            </a>
                                        )}
                                        {featured.liveUrl && (
                                            <a
                                                href={featured.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-primary flex items-center gap-2 text-sm"
                                            >
                                                <ExternalLink className="w-4 h-4" /> Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tilt3D>
                )}

                {/* Additional Projects */}
                <div className="grid md:grid-cols-2 gap-6">
                    {additional.map((project, i) => (
                        <Tilt3D key={project.id} intensity={9}>
                            <div
                                className="card-base h-full animate-fadeInUp"
                                style={{ animationDelay: `${(i + 1) * 100}ms` }}
                            >
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <div>
                                        <span className="text-xs font-mono text-[var(--accent)] mb-1 block">{project.tag}</span>
                                        <h3 className="text-xl font-bold text-[var(--text)]">{project.title}</h3>
                                        <p className="text-[var(--accent)] text-sm font-mono">{project.subtitle}</p>
                                    </div>
                                    <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-mono border ${project.status === "completed"
                                        ? "border-green-500/30 text-green-400 bg-green-500/10"
                                        : "border-blue-500/30 text-blue-400 bg-blue-500/10"
                                        }`}>{project.status}</span>
                                </div>

                                <p className="text-[var(--muted)] text-sm leading-relaxed mb-4">
                                    {isTechnical ? project.technicalDescription : project.description}
                                </p>

                                {/* Technical highlights toggle */}
                                <AnimatePresence>
                                    {isTechnical && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="mb-4 space-y-2">
                                                {project.technicalHighlights.slice(0, 4).map((h) => (
                                                    <div key={h} className="flex items-start gap-2 text-xs text-[var(--muted)]">
                                                        <span className="text-[var(--accent)] mt-0.5">›</span>
                                                        <span className="font-mono">{h}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.stack.map((tech) => (
                                        <span key={tech} className="px-2.5 py-1 rounded-md text-xs font-mono border border-[var(--border)] text-[var(--muted)]">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Expand more highlights */}
                                <button
                                    onClick={() => toggleExpand(project.id)}
                                    className="flex items-center gap-1 text-xs font-mono text-[var(--accent)] hover:opacity-80 transition-opacity"
                                >
                                    {expandedId === project.id ? (
                                        <><ChevronUp className="w-3 h-3" /> Less details</>
                                    ) : (
                                        <><ChevronDown className="w-3 h-3" /> More details</>
                                    )}
                                </button>

                                <AnimatePresence>
                                    {expandedId === project.id && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden mt-4"
                                        >
                                            <div className="pt-4 border-t border-[var(--border)] space-y-2">
                                                {project.highlights.map((h) => (
                                                    <div key={h} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                                                        <Shield className="w-3.5 h-3.5 text-[var(--accent)] flex-shrink-0" />
                                                        {h}
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </Tilt3D>
                    ))}
                </div>
            </div>
        </section>
    );
}
