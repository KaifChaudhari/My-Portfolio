"use client";

import skills from "@/data/skills";
import { Shield, Code, Terminal, Layers, Brain } from "lucide-react";
import Tilt3D from "./Tilt3D";
import FloatingSkillIcons from "./FloatingSkillIcons";

const iconMap: Record<string, React.ReactNode> = {
    Shield: <Shield className="w-5 h-5" />,
    Code: <Code className="w-5 h-5" />,
    Terminal: <Terminal className="w-5 h-5" />,
    Layers: <Layers className="w-5 h-5" />,
    Brain: <Brain className="w-5 h-5" />,
};

const levelColor: Record<string, string> = {
    Expert: "bg-[var(--accent)] text-[var(--bg)]",
    Advanced: "bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/30",
    Intermediate: "bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)]",
    Familiar: "bg-transparent text-[var(--muted)]/60 border border-[var(--border)]/50",
};

const levelBar: Record<string, string> = {
    Expert: "100%",
    Advanced: "80%",
    Intermediate: "60%",
    Familiar: "40%",
};

export default function Skills() {
    return (
        <section id="skills" className="section-padding relative overflow-hidden">
            <div className="section-container relative z-10">
                <div className="mb-12 animate-fadeInUp">
                    <h2 className="section-heading">Technical Capabilities</h2>
                    <p className="section-subheading">
                        A categorized overview of security tools, programming languages, and frameworks.
                    </p>
                </div>

                {/* 3D Skills orbit visualization */}
                <div className="mb-12 animate-fadeInUp" style={{ animationDelay: "100ms" }}>
                    <FloatingSkillIcons />
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {skills.map((category, i) => (
                        <Tilt3D key={category.category} intensity={8}>
                            <div
                                className="card-base h-full animate-fadeInUp"
                                style={{ animationDelay: `${(i + 1) * 80}ms` }}
                            >
                                {/* Category header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[var(--accent)] bg-[var(--accent)]/10 border border-[var(--border)]">
                                        {iconMap[category.icon]}
                                    </div>
                                    <h3 className="font-bold text-[var(--text)]">{category.category}</h3>
                                </div>

                                {/* Skills list */}
                                <div className="space-y-3">
                                    {category.skills.map((skill) => (
                                        <div key={skill.name}>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm text-[var(--text)]">{skill.name}</span>
                                                <span className={`text-xs px-2 py-0.5 rounded font-mono ${levelColor[skill.level]}`}>
                                                    {skill.level}
                                                </span>
                                            </div>
                                            {/* Progress bar */}
                                            <div className="h-1 bg-[var(--border)] rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[var(--accent)] rounded-full transition-all duration-1000 ease-out"
                                                    style={{ width: levelBar[skill.level] }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Tilt3D>
                    ))}
                </div>

                {/* Legend */}
                <div className="mt-10 flex flex-wrap gap-4 justify-center animate-fadeInUp" style={{ animationDelay: "500ms" }}>
                    {["Expert", "Advanced", "Intermediate", "Familiar"].map((level) => (
                        <div key={level} className="flex items-center gap-2">
                            <span className={`text-xs px-2.5 py-1 rounded font-mono ${levelColor[level]}`}>{level}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
