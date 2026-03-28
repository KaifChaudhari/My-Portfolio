"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Shield,
    Network,
    Code,
    Database,
    Globe,
    Trophy,
    Award,
    Star,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import Tilt3D from "./Tilt3D";
import { featuredCerts, achievementCategories, type Certificate } from "@/data/achievements";

const iconMap: Record<string, React.ReactNode> = {
    Shield: <Shield className="w-5 h-5" />,
    Network: <Network className="w-5 h-5" />,
    Code: <Code className="w-5 h-5" />,
    Database: <Database className="w-5 h-5" />,
    Globe: <Globe className="w-5 h-5" />,
    Trophy: <Trophy className="w-5 h-5" />,
};

function CertTag({ label }: { label: string }) {
    return (
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30">
            {label}
        </span>
    );
}

function FeaturedCard({ cert, index, className = "" }: { cert: Certificate; index: number; className?: string }) {
    return (
        <Tilt3D intensity={8} className={className}>
            <div
                className="card-base group cursor-default h-full relative animate-fadeInUp"
                style={{ animationDelay: `${index * 80}ms` }}
            >
                {/* Featured badge */}
                <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30">
                        <Star className="w-3 h-3" />
                        Featured
                    </div>
                </div>

                {/* Number badge */}
                <div className="flex items-start gap-4 mb-4 pr-20">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-[var(--accent)] bg-[var(--accent)]/10 border border-[var(--border)] group-hover:border-[var(--accent)] transition-colors duration-300 font-bold text-lg">
                        {index + 1}
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                        <h3 className="font-bold text-[var(--text)] leading-tight text-sm">
                            {cert.title}
                        </h3>
                        <p className="text-xs text-[var(--muted)] mt-1">
                            {cert.issuer}
                            {cert.date ? ` · ${cert.date}` : ""}
                        </p>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                    {cert.tags.map((tag) => (
                        <CertTag key={tag} label={tag} />
                    ))}
                </div>
            </div>
        </Tilt3D>
    );
}

function CategorySection({
    category,
    icon,
    certs,
    index,
}: {
    category: string;
    icon: string;
    certs: Certificate[];
    index: number;
}) {
    const [expanded, setExpanded] = useState(false);
    const visibleCerts = expanded ? certs : certs.slice(0, 2);
    const hasMore = certs.length > 2;

    return (
        <div
            className="card-base h-full flex flex-col animate-fadeInUp"
            style={{ animationDelay: `${index * 60}ms` }}
        >
            {/* Category header */}
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[var(--accent)] bg-[var(--accent)]/10 border border-[var(--border)]">
                    {iconMap[icon]}
                </div>
                <div>
                    <h3 className="font-bold text-[var(--text)]">{category}</h3>
                    <p className="text-xs text-[var(--muted)]">
                        {certs.length} certificate{certs.length !== 1 ? "s" : ""}
                    </p>
                </div>
            </div>

            {/* Cert list */}
            <div className="space-y-3 flex-1">
                <AnimatePresence initial={false}>
                    {visibleCerts.map((cert) => (
                        <motion.div
                            key={cert.title}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-b border-[var(--border)] pb-3 last:border-0 last:pb-0"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-[var(--text)] leading-snug">
                                        {cert.title}
                                    </p>
                                    <p className="text-xs text-[var(--muted)] mt-0.5">
                                        {cert.issuer}
                                        {cert.date ? ` · ${cert.date}` : ""}
                                    </p>
                                </div>
                                <Award className="w-4 h-4 text-[var(--accent)]/50 flex-shrink-0 mt-0.5" />
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {cert.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs font-mono px-1.5 py-0.5 rounded bg-[var(--border)]/40 text-[var(--text)]/70 border border-[var(--border)]"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Show more/less */}
            {hasMore && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center gap-1 text-xs font-mono text-[var(--accent)] mt-4 hover:opacity-80 transition-opacity"
                >
                    {expanded ? (
                        <>
                            Show Less <ChevronUp className="w-3 h-3" />
                        </>
                    ) : (
                        <>
                            +{certs.length - 2} more <ChevronDown className="w-3 h-3" />
                        </>
                    )}
                </button>
            )}
        </div>
    );
}

export default function Achievements() {
    const totalCerts = achievementCategories.reduce(
        (sum, cat) => sum + cat.certs.length,
        0
    );

    return (
        <section
            id="achievements"
            className="section-padding bg-[var(--surface)]/30 relative overflow-x-clip"
        >
            <div className="section-container relative z-10">
                {/* Header */}
                <div className="mb-12 animate-fadeInUp">
                    <h2 className="section-heading">Certifications & Achievements</h2>
                    <p className="section-subheading">
                        {totalCerts}+ validated certifications across cybersecurity, networking,
                        programming, and cloud — backed by EC-Council, NPTEL/IIT, TryHackMe,
                        and more.
                    </p>
                </div>

                {/* Featured Certifications */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-6">
                        <Star className="w-5 h-5 text-[var(--accent)]" />
                        <h3 className="text-lg font-bold text-[var(--text)]">
                            Featured Certifications
                        </h3>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {featuredCerts.map((cert, i) => (
                            <FeaturedCard
                                key={cert.title}
                                cert={cert}
                                index={i}
                                className=""
                            />
                        ))}
                    </div>
                </div>

                {/* All Categories */}
                <div className="flex items-center gap-2 mb-6">
                    <Award className="w-5 h-5 text-[var(--accent)]" />
                    <h3 className="text-lg font-bold text-[var(--text)]">
                        All Certifications
                    </h3>
                </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {achievementCategories.map((cat, i) => (
                        <CategorySection
                            key={cat.category}
                            category={cat.category}
                            icon={cat.icon}
                            certs={cat.certs}
                            index={i}
                        />
                    ))}
                </div>

                {/* Stats strip */}
                <div
                    className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeInUp"
                    style={{ animationDelay: "200ms" }}
                >
                    {[
                        { label: "Total Certifications", value: `${totalCerts}+` },
                        { label: "Featured", value: `${featuredCerts.length}` },
                        { label: "Categories", value: `${achievementCategories.length}` },
                        {
                            label: "Top Issuers",
                            value: "EC-Council, IIT, THM",
                        },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="text-center p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]"
                        >
                            <div className="text-xl font-bold text-[var(--accent)]">
                                {stat.value}
                            </div>
                            <div className="text-xs text-[var(--muted)] mt-1 font-mono">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
