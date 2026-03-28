"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, CheckCircle } from "lucide-react";
import TryHackMeIcon from "./TryHackMeIcon";

const contactLinks = [
    {
        icon: <Mail className="w-5 h-5" />,
        label: "Email",
        value: "kaifchaudhari@email.com",
        href: "mailto:kaifchaudhari@email.com",
        description: "Best for professional inquiries",
        accentColor: "var(--accent)",
    },
    {
        icon: <Github className="w-5 h-5" />,
        label: "GitHub",
        value: "github.com/KaifChaudhari",
        href: "https://github.com/KaifChaudhari",
        description: "Projects and open-source work",
        accentColor: "var(--accent)",
    },
    {
        icon: <Linkedin className="w-5 h-5" />,
        label: "LinkedIn",
        value: "linkedin.com/in/kaifchaudhari",
        href: "https://linkedin.com/in/kaifchaudhari",
        description: "Professional network",
        accentColor: "var(--accent)",
    },
    {
        icon: <TryHackMeIcon className="w-5 h-5" />,
        label: "TryHackMe",
        value: "tryhackme.com/p/kaifchaudhari",
        href: "https://tryhackme.com/p/kaifchaudhari",
        description: "CTF challenges & security labs",
        accentColor: "#88cc14",
    },
];

export default function Contact() {
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch("https://formspree.io/f/mwvnwlnn", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    name: formState.name,
                    email: formState.email,
                    message: formState.message,
                }),
            });
            if (res.ok) {
                setSubmitted(true);
            } else {
                setError("Something went wrong. Please try emailing me directly.");
            }
        } catch {
            setError("Network error. Please try again or email me directly.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="section-padding">
            <div className="section-container">
                <div className="text-center mb-16 animate-fadeInUp">
                    <h2 className="section-heading">Let&apos;s Connect</h2>
                    <p className="section-subheading mx-auto">
                        Open to cybersecurity roles, security consulting, and research collaboration opportunities.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    {/* Contact Info */}
                    <div className="animate-fadeInUp" style={{ animationDelay: "80ms" }}>
                        <h3 className="text-[var(--text)] font-bold text-xl mb-6">Direct Contact</h3>

                        <div className="space-y-4">
                            {contactLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target={link.href.startsWith("mailto") ? "_self" : "_blank"}
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)] transition-all duration-200 group"
                                >
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                                        style={{
                                            color: link.accentColor,
                                            background: `${link.accentColor}18`,
                                        }}
                                    >
                                        {link.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[var(--text)] font-semibold text-sm">{link.label}</div>
                                        <div className="text-[var(--muted)] text-xs truncate">{link.value}</div>
                                        <div className="text-[var(--muted)] text-xs">{link.description}</div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <div className="mt-8 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]/50">
                            <p className="text-[var(--muted)] text-sm leading-relaxed">
                                <span className="text-[var(--accent)] font-mono">$</span>{" "}
                                I typically respond within 24–48 hours. Available for:
                            </p>
                            <ul className="mt-2 space-y-1">
                                {["Full-time cybersecurity roles", "Security consulting", "Research collaboration", "Mentorship discussions"].map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                                        <span className="text-[var(--accent)] text-xs">›</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="animate-fadeInUp" style={{ animationDelay: "160ms" }}>
                        <h3 className="text-[var(--text)] font-bold text-xl mb-6">Send a Message</h3>

                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                            >
                                <CheckCircle className="w-12 h-12 text-green-400" />
                                <h4 className="text-[var(--text)] font-bold text-lg">Message Received</h4>
                                <p className="text-[var(--muted)] text-sm">
                                    Thanks for reaching out. I&apos;ll get back to you within 24–48 hours.
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--muted)] mb-2">Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        placeholder="Your name"
                                        className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--muted)] mb-2">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        placeholder="your@email.com"
                                        className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--muted)] mb-2">Message</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        placeholder="Tell me about the opportunity or question..."
                                        className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors text-sm resize-none"
                                    />
                                </div>
                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 text-xs font-mono bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2"
                                    >
                                        {error}
                                    </motion.p>
                                )}
                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <div className="w-4 h-4 border-2 border-[var(--bg)]/30 border-t-[var(--bg)] rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" /> Send Message
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
