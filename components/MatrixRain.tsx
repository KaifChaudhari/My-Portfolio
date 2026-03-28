"use client";

import { useEffect, useRef } from "react";


/**
 * MatrixRain — 2D canvas falling code background.
 * Subtle falling characters for the dark cyber aesthetic.
 */
export default function MatrixRain({ className = "" }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const chars = "01アイウエオカキクケコ10ΔΣΩ{}[]<>/:;@#$%".split("");

        const fontSize = 14;
        let columns = Math.floor(canvas.width / fontSize);
        let drops: number[] = new Array(columns).fill(0).map(() => Math.random() * -100);
        let speeds: number[] = new Array(columns).fill(0).map(() => 0.3 + Math.random() * 0.7);

        const accentColor = "0, 212, 255";

        let animId: number;

        const draw = () => {
            animId = requestAnimationFrame(draw);

            ctx.fillStyle = "rgba(10, 10, 15, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

            for (let i = 0; i < columns; i++) {
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                const brightness = Math.random();
                if (brightness > 0.96) {
                    ctx.fillStyle = `rgba(${accentColor}, 0.7)`;
                } else {
                    ctx.fillStyle = `rgba(${accentColor}, 0.12)`;
                }

                const char = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(char, x, y);

                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i] += speeds[i];
            }
        };
        draw();

        const onResize = () => {
            resize();
            columns = Math.floor(canvas.width / fontSize);
            drops = new Array(columns).fill(0).map(() => Math.random() * -100);
            speeds = new Array(columns).fill(0).map(() => 0.3 + Math.random() * 0.7);
        };
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 pointer-events-none z-0 ${className}`}
            style={{ opacity: 0.25 }}
        />
    );
}
