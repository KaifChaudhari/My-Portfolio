"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);
    const spring = useSpring(progress, { stiffness: 200, damping: 30 });

    useEffect(() => {
        const update = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const total = scrollHeight - clientHeight;
            setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
        };
        window.addEventListener("scroll", update, { passive: true });
        return () => window.removeEventListener("scroll", update);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 z-[9999] h-[2px] origin-left"
            style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
                boxShadow: "0 0 8px var(--accent)",
            }}
        />
    );
}
