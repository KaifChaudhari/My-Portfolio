"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield } from "lucide-react";
import TechnicalToggle from "./TechnicalToggle";

const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Research", href: "#research" },
    { label: "Skills", href: "#skills" },
    { label: "Achievements", href: "#achievements" },
    { label: "Resume", href: "#resume" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                        ? "backdrop-blur-xl bg-[var(--bg)]/80 border-b border-[var(--border)] shadow-lg"
                        : "bg-transparent"
                    }`}
            >
                <div className="section-container">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <motion.a
                            href="#"
                            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                            className="flex items-center gap-2 group"
                            whileHover={{ scale: 1.02 }}
                        >
                            <Shield className="w-5 h-5 text-[var(--accent)] group-hover:rotate-12 transition-transform duration-300" />
                            <span className="font-mono font-bold text-lg text-[var(--text)]">
                                KAIF<span className="text-[var(--accent)]">.CYBER</span>
                            </span>
                        </motion.a>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <button
                                    key={link.href}
                                    onClick={() => handleNavClick(link.href)}
                                    className="nav-link text-sm font-medium hover:text-[var(--accent)] transition-colors duration-200"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="hidden md:flex items-center gap-3">
                            <TechnicalToggle />
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2 rounded-lg text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-16 left-0 right-0 z-40 backdrop-blur-xl bg-[var(--surface)]/95 border-b border-[var(--border)] md:hidden"
                    >
                        <div className="section-container py-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <button
                                    key={link.href}
                                    onClick={() => handleNavClick(link.href)}
                                    className="text-left text-[var(--text)] font-medium py-2 hover:text-[var(--accent)] transition-colors"
                                >
                                    {link.label}
                                </button>
                            ))}
                            <div className="pt-4 border-t border-[var(--border)] flex items-center gap-4">
                                <TechnicalToggle />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
