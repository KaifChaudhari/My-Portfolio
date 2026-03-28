"use client";

import { BookOpen, GraduationCap, ArrowRight } from "lucide-react";

const learningItems = [
    {
        icon: <BookOpen className="w-5 h-5" />,
        title: "CompTIA Network+",
        subtitle: "Networking fundamentals · Protocols · Security",
        progress: 45,
        status: "In Progress",
        statusColor: "#38bdf8",
        eta: "2025",
    },
    {
        icon: <GraduationCap className="w-5 h-5" />,
        title: "BCA (Hons) Degree",
        subtitle: "Bachelor of Computer Applications · Security focus",
        progress: 65,
        status: "In Progress",
        statusColor: "#88cc14",
        eta: "2026",
    },
];

export default function CurrentlyLearning() {
    return (
        <div className="card-base p-5">
            <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest">Currently Learning</span>
            </div>

            <div className="space-y-5">
                {learningItems.map((item, i) => (
                    <div
                        key={item.title}
                        className="animate-fadeInUp"
                        style={{ animationDelay: `${i * 100}ms` }}
                    >
                        <div className="flex items-start gap-3 mb-3">
                            <div
                                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 border"
                                style={{
                                    color: item.statusColor,
                                    background: `${item.statusColor}18`,
                                    borderColor: `${item.statusColor}40`,
                                }}
                            >
                                {item.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-sm font-bold text-[var(--text)] truncate">{item.title}</span>
                                    <span
                                        className="text-xs font-mono flex-shrink-0"
                                        style={{ color: item.statusColor }}
                                    >
                                        {item.progress}%
                                    </span>
                                </div>
                                <div className="text-xs text-[var(--muted)] mt-0.5">{item.subtitle}</div>
                            </div>
                        </div>
                        {/* Progress bar */}
                        <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden ml-12">
                            <div
                                className="h-full rounded-full transition-all duration-1000 ease-out"
                                style={{ background: item.statusColor, width: `${item.progress}%` }}
                            />
                        </div>
                        <div className="flex items-center justify-between mt-1.5 ml-12">
                            <span
                                className="text-xs font-mono px-2 py-0.5 rounded"
                                style={{
                                    color: item.statusColor,
                                    background: `${item.statusColor}18`,
                                }}
                            >
                                {item.status}
                            </span>
                            <span className="text-xs text-[var(--muted)] font-mono flex items-center gap-1">
                                <ArrowRight className="w-3 h-3" /> Target {item.eta}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
