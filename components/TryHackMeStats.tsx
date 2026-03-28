"use client";

import TryHackMeIcon from "./TryHackMeIcon";
import { ExternalLink, Terminal, Globe, Flame, Gift, Award } from "lucide-react";
import Tilt3D from "./Tilt3D";
import thmData from "@/data/thm-cache.json";

const iconMap: Record<string, React.ReactNode> = {
    terminal: <Terminal className="w-4 h-4" />,
    globe: <Globe className="w-4 h-4" />,
    flame: <Flame className="w-4 h-4" />,
    gift: <Gift className="w-4 h-4" />,
    award: <Award className="w-4 h-4" />,
};

const stats = [
    { label: "Global Rank", value: thmData.rank },
    { label: "Rooms Completed", value: String(thmData.roomsCompleted) },
    { label: "Badges Earned", value: String(thmData.badgesCount) },
    { label: "Status", value: "Active" },
];

function lastUpdatedLabel(): string {
    try {
        const d = new Date(thmData.lastUpdated);
        const now = new Date();
        const days = Math.floor((now.getTime() - d.getTime()) / 86400000);
        if (days === 0) return "Updated today";
        if (days === 1) return "Updated yesterday";
        return `Updated ${days}d ago`;
    } catch {
        return "";
    }
}

export default function TryHackMeStats() {
    return (
        <section className="section-padding">
            <div className="section-container">
                <div className="mb-12 animate-fadeInUp">
                    <div className="flex items-center gap-3 mb-2">
                        <TryHackMeIcon className="w-7 h-7" />
                        <h2 className="section-heading mb-0">TryHackMe Profile</h2>
                    </div>
                    <p className="section-subheading">
                        Hands-on cybersecurity training — challenges, labs, and real-world attack/defence scenarios.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Stats card */}
                    <Tilt3D intensity={6} className="flex flex-col">
                        <div
                            className="card-base flex flex-col gap-5 h-full animate-fadeInUp"
                            style={{ animationDelay: "80ms" }}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <TryHackMeIcon className="w-5 h-5" />
                                <span className="font-bold text-[var(--text)]">{thmData.username}</span>
                                <span className="ml-auto flex items-center gap-1.5 text-xs font-mono text-[#88cc14]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#88cc14] animate-pulse" />
                                    Active
                                </span>
                            </div>

                            {stats.map((s) => (
                                <div key={s.label} className="flex items-center justify-between border-b border-[var(--border)] pb-3 last:border-0 last:pb-0">
                                    <span className="text-sm text-[var(--muted)]">{s.label}</span>
                                    <span className="text-sm font-mono font-bold text-[#88cc14]">{s.value}</span>
                                </div>
                            ))}

                            <div className="mt-auto flex items-center justify-between">
                                <a
                                    href={`https://tryhackme.com/p/${thmData.username}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-[#88cc14]/40 text-[#88cc14] text-sm font-semibold hover:bg-[#88cc14]/10 transition-colors"
                                >
                                    View Profile <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                                <span className="text-xs text-[var(--muted)] font-mono">
                                    {lastUpdatedLabel()}
                                </span>
                            </div>
                        </div>
                    </Tilt3D>

                    {/* Badges grid */}
                    <div
                        className="animate-fadeInUp"
                        style={{ animationDelay: "160ms" }}
                    >
                        <h3 className="text-sm font-semibold text-[var(--muted)] mb-4 uppercase tracking-wider">Earned Badges</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {thmData.badges.map((badge, i) => (
                                <Tilt3D key={badge.name} intensity={12}>
                                    <div
                                        className="card-base flex items-start gap-3 p-4 h-full animate-fadeInUp"
                                        style={{ animationDelay: `${(i + 3) * 80}ms` }}
                                    >
                                        <div
                                            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 border"
                                            style={{
                                                color: badge.color,
                                                background: `${badge.color}18`,
                                                borderColor: `${badge.color}40`,
                                            }}
                                        >
                                            {iconMap[badge.icon] || <Award className="w-4 h-4" />}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-sm font-bold text-[var(--text)] truncate">{badge.name}</div>
                                            <div className="text-xs text-[var(--muted)] mt-0.5 leading-snug">{badge.description}</div>
                                            <div
                                                className="text-xs font-mono mt-1.5"
                                                style={{ color: badge.color }}
                                            >
                                                {badge.rarity}
                                            </div>
                                        </div>
                                    </div>
                                </Tilt3D>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
