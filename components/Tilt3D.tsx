"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

interface Tilt3DProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number; // degrees of tilt, default 12
    glare?: boolean;
}

export default function Tilt3D({ children, className = "", intensity = 12, glare = true }: Tilt3DProps) {
    const ref = useRef<HTMLDivElement>(null);

    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const glareX = useMotionValue(50);
    const glareY = useMotionValue(50);

    const springConfig = { stiffness: 200, damping: 22, mass: 0.5 };
    const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [intensity, -intensity]), springConfig);
    const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-intensity, intensity]), springConfig);
    const scale = useSpring(1, { stiffness: 300, damping: 25 });

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const { left, top, width, height } = el.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        rawX.set(x);
        rawY.set(y);
        glareX.set(((e.clientX - left) / width) * 100);
        glareY.set(((e.clientY - top) / height) * 100);
    }, [rawX, rawY, glareX, glareY]);

    const handleMouseEnter = useCallback(() => scale.set(1.03), [scale]);

    const handleMouseLeave = useCallback(() => {
        rawX.set(0);
        rawY.set(0);
        scale.set(1);
        glareX.set(50);
        glareY.set(50);
    }, [rawX, rawY, scale, glareX, glareY]);

    const glareOpacity = useTransform(
        [rawX, rawY],
        ([x, y]: number[]) => Math.sqrt(x * x + y * y) * 0.4
    );

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                scale,
                transformStyle: "preserve-3d",
                perspective: 800,
            }}
            className={`relative ${className}`}
        >
            {children}

            {/* Glare layer */}
            {glare && (
                <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{
                        background: useTransform(
                            [glareX, glareY],
                            ([x, y]: number[]) =>
                                `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`
                        ),
                        opacity: glareOpacity,
                    }}
                />
            )}
        </motion.div>
    );
}
