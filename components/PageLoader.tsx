"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

/**
 * PageLoader — cinematic Three.js loading screen.
 *
 * Phase 1 (0→2s): 300 particles scattered randomly, converge into a sphere.
 * Phase 2 (2→3.5s): Sphere pulses. Text sequence:
 *   "INITIALIZING SYSTEM..." → "LOADING PORTFOLIO..." → "ACCESS GRANTED"
 * Phase 3 (3.5→4.5s): Particles explode outward, overlay fades, main content appears.
 */
export default function PageLoader() {
    const [loading, setLoading] = useState(true);
    const [statusText, setStatusText] = useState("INITIALIZING SYSTEM...");
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!loading) return;
        const mount = canvasRef.current;
        if (!mount) return;

        // ── Renderer ──
        const w = window.innerWidth;
        const h = window.innerHeight;
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(w, h);
        renderer.setClearColor(0x0a0a0f, 1);
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
        camera.position.set(0, 0, 5);

        // ── Particles ──
        const COUNT = 300;
        const positions = new Float32Array(COUNT * 3);
        const targets = new Float32Array(COUNT * 3);  // sphere target positions
        const colors = new Float32Array(COUNT * 3);

        const cyan = new THREE.Color(0x00d4ff);
        const purple = new THREE.Color(0xc084fc);

        for (let i = 0; i < COUNT; i++) {
            // Random start positions (scattered)
            positions[i * 3] = (Math.random() - 0.5) * 12;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

            // Sphere target positions
            const phi = Math.acos(2 * Math.random() - 1);
            const theta = Math.random() * Math.PI * 2;
            const r = 1.2;
            targets[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            targets[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            targets[i * 3 + 2] = r * Math.cos(phi);

            // Color gradient: cyan → purple
            const mix = Math.random();
            const c = cyan.clone().lerp(purple, mix);
            colors[i * 3] = c.r;
            colors[i * 3 + 1] = c.g;
            colors[i * 3 + 2] = c.b;
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        const mat = new THREE.PointsMaterial({
            vertexColors: true,
            size: 0.04,
            transparent: true,
            opacity: 0.9,
            sizeAttenuation: true,
            depthWrite: false,
        });
        const points = new THREE.Points(geo, mat);
        scene.add(points);

        // Subtle ambient light
        scene.add(new THREE.AmbientLight(0x00d4ff, 0.3));

        const clock = new THREE.Clock();
        let phase = 0;  // 0=converge, 1=pulse, 2=explode
        let animId: number;

        const animate = () => {
            animId = requestAnimationFrame(animate);
            const elapsed = clock.getElapsedTime();
            const posArr = geo.attributes.position.array as Float32Array;

            if (phase === 0) {
                // Phase 0: converge toward sphere (0→2s)
                const progress = Math.min(elapsed / 2.0, 1);
                const ease = progress * progress * (3 - 2 * progress); // smoothstep
                for (let i = 0; i < COUNT; i++) {
                    const sx = positions[i * 3];
                    const sy = positions[i * 3 + 1];
                    const sz = positions[i * 3 + 2];
                    posArr[i * 3] = sx + (targets[i * 3] - sx) * ease;
                    posArr[i * 3 + 1] = sy + (targets[i * 3 + 1] - sy) * ease;
                    posArr[i * 3 + 2] = sz + (targets[i * 3 + 2] - sz) * ease;
                }
                if (progress >= 1) phase = 1;
            } else if (phase === 1) {
                // Phase 1: pulse on sphere (2→3.5s)
                const t = elapsed - 2.0;
                const pulse = 1 + Math.sin(t * 6) * 0.08;
                for (let i = 0; i < COUNT; i++) {
                    posArr[i * 3] = targets[i * 3] * pulse;
                    posArr[i * 3 + 1] = targets[i * 3 + 1] * pulse;
                    posArr[i * 3 + 2] = targets[i * 3 + 2] * pulse;
                }
                if (t >= 1.5) phase = 2;
            } else if (phase === 2) {
                // Phase 2: explode outward (3.5→4.5s)
                const t = elapsed - 3.5;
                const expand = 1 + t * 4;
                mat.opacity = Math.max(0, 1 - t * 1.2);
                for (let i = 0; i < COUNT; i++) {
                    posArr[i * 3] = targets[i * 3] * expand;
                    posArr[i * 3 + 1] = targets[i * 3 + 1] * expand;
                    posArr[i * 3 + 2] = targets[i * 3 + 2] * expand;
                }
            }

            geo.attributes.position.needsUpdate = true;
            points.rotation.y = elapsed * 0.3;

            renderer.render(scene, camera);
        };
        animate();

        // ── Text sequence ──
        const t1 = setTimeout(() => setStatusText("LOADING PORTFOLIO..."), 1200);
        const t2 = setTimeout(() => setStatusText("ACCESS GRANTED"), 2800);
        const t3 = setTimeout(() => setLoading(false), 4200);

        return () => {
            cancelAnimationFrame(animId);
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            renderer.dispose();
            if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        };
    }, [loading]);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center"
                    style={{ background: "#0a0a0f" }}
                    exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeOut" } }}
                >
                    {/* Three.js canvas */}
                    <div ref={canvasRef} className="absolute inset-0" />

                    {/* Overlay text */}
                    <div className="relative z-10 flex flex-col items-center gap-6">
                        <motion.div
                            className="font-mono font-black text-3xl tracking-tight text-white"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            KAIF<span className="text-[#00d4ff]">.CYBER</span>
                        </motion.div>

                        <motion.div
                            key={statusText}
                            className="font-mono text-sm text-[#00d4ff]/80 tracking-widest"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {`> ${statusText}`}
                            <span className="animate-pulse ml-1">_</span>
                        </motion.div>

                        {/* Progress bar */}
                        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-[#00d4ff] to-[#c084fc]"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 3.5, ease: "easeInOut" }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
