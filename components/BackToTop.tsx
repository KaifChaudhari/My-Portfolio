"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    onClick={scrollUp}
                    initial={{ opacity: 0, scale: 0.6, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6, y: 10 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full flex items-center justify-center border border-[var(--accent)] text-[var(--accent)] bg-[var(--surface)] shadow-lg"
                    style={{ boxShadow: "0 0 16px color-mix(in srgb, var(--accent) 25%, transparent)" }}
                    aria-label="Back to top"
                    title="Back to top"
                >
                    <ArrowUp className="w-4 h-4" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
