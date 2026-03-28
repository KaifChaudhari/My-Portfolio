"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * HoloNameIntro — holographic name reveal animation.
 * Particles converge into text "KAIF CHAUDHARI", glitch, then stabilize.
 * No EffectComposer — uses plain renderer for transparent alpha support.
 */
export default function HoloNameIntro({ className = "" }: { className?: string }) {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const isMobile = window.innerWidth < 768;
        const w = mount.clientWidth;
        const h = mount.clientHeight;

        // Text sampling canvas
        const textCanvas = document.createElement("canvas");
        const tcW = 512, tcH = 128;
        textCanvas.width = tcW;
        textCanvas.height = tcH;
        const tctx = textCanvas.getContext("2d")!;
        tctx.fillStyle = "black";
        tctx.fillRect(0, 0, tcW, tcH);
        tctx.fillStyle = "white";
        tctx.font = `bold ${isMobile ? 28 : 42}px 'JetBrains Mono', monospace`;
        tctx.textAlign = "center";
        tctx.textBaseline = "middle";
        tctx.fillText("KAIF CHAUDHARI", tcW / 2, tcH / 2);

        const imageData = tctx.getImageData(0, 0, tcW, tcH);
        const textPositions: THREE.Vector3[] = [];
        const sampleStep = isMobile ? 5 : 3;
        for (let y = 0; y < tcH; y += sampleStep) {
            for (let x = 0; x < tcW; x += sampleStep) {
                const idx = (y * tcW + x) * 4;
                if (imageData.data[idx] > 128) {
                    const px = ((x / tcW) - 0.5) * 7;
                    const py = -((y / tcH) - 0.5) * 1.8;
                    textPositions.push(new THREE.Vector3(px, py, 0));
                }
            }
        }

        const COUNT = textPositions.length;
        if (COUNT === 0) return;

        const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
        renderer.setSize(w, h);
        renderer.setClearColor(0x000000, 0); // fully transparent
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
        camera.position.set(0, 0, 5);

        // Particles
        const positions = new Float32Array(COUNT * 3);
        const startPositions = new Float32Array(COUNT * 3);
        const targetPositions = new Float32Array(COUNT * 3);
        const pColors = new Float32Array(COUNT * 3);

        const cyanColor = new THREE.Color("#00d4ff");
        const purpleColor = new THREE.Color("#c084fc");

        for (let i = 0; i < COUNT; i++) {
            startPositions[i * 3]     = (Math.random() - 0.5) * 12;
            startPositions[i * 3 + 1] = (Math.random() - 0.5) * 7;
            startPositions[i * 3 + 2] = (Math.random() - 0.5) * 5;

            positions[i * 3]     = startPositions[i * 3];
            positions[i * 3 + 1] = startPositions[i * 3 + 1];
            positions[i * 3 + 2] = startPositions[i * 3 + 2];

            targetPositions[i * 3]     = textPositions[i].x;
            targetPositions[i * 3 + 1] = textPositions[i].y;
            targetPositions[i * 3 + 2] = 0;

            const mix = Math.random();
            const c = cyanColor.clone().lerp(purpleColor, mix);
            pColors[i * 3] = c.r;
            pColors[i * 3 + 1] = c.g;
            pColors[i * 3 + 2] = c.b;
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));

        const mat = new THREE.PointsMaterial({
            vertexColors: true,
            size: isMobile ? 0.04 : 0.025,
            transparent: true,
            opacity: 0.85,
            sizeAttenuation: true,
            depthWrite: false,
        });
        const points = new THREE.Points(geo, mat);
        scene.add(points);

        const onResize = () => {
            if (!mount) return;
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mount.clientWidth, mount.clientHeight);
        };
        window.addEventListener("resize", onResize);

        let animId: number;
        const clock = new THREE.Clock();

        const animate = () => {
            animId = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();
            const posArr = geo.attributes.position.array as Float32Array;

            if (t < 1.5) {
                // Phase 0: scattered, gentle drift
                for (let i = 0; i < COUNT; i++) {
                    posArr[i * 3]     = startPositions[i * 3]     + Math.sin(t + i * 0.1) * 0.04;
                    posArr[i * 3 + 1] = startPositions[i * 3 + 1] + Math.cos(t + i * 0.1) * 0.04;
                }
            } else if (t < 3.5) {
                // Phase 1: converge to text positions
                const progress = Math.min((t - 1.5) / 2, 1);
                const ease = progress * progress * (3 - 2 * progress);
                for (let i = 0; i < COUNT; i++) {
                    posArr[i * 3]     = startPositions[i * 3]     + (targetPositions[i * 3]     - startPositions[i * 3])     * ease;
                    posArr[i * 3 + 1] = startPositions[i * 3 + 1] + (targetPositions[i * 3 + 1] - startPositions[i * 3 + 1]) * ease;
                    posArr[i * 3 + 2] = startPositions[i * 3 + 2] * (1 - ease);
                }
            } else if (t < 4.2) {
                // Phase 2: glitch
                const glitchIntensity = Math.sin((t - 3.5) * 12) * 0.5 + 0.5;
                for (let i = 0; i < COUNT; i++) {
                    const jx = (Math.random() - 0.5) * glitchIntensity * 0.25;
                    const jy = (Math.random() - 0.5) * glitchIntensity * 0.12;
                    posArr[i * 3]     = targetPositions[i * 3]     + jx;
                    posArr[i * 3 + 1] = targetPositions[i * 3 + 1] + jy;
                    posArr[i * 3 + 2] = 0;
                }
            } else {
                // Phase 3: stable text, subtle float
                for (let i = 0; i < COUNT; i++) {
                    posArr[i * 3]     = targetPositions[i * 3]     + Math.sin(t * 0.5 + i * 0.02) * 0.01;
                    posArr[i * 3 + 1] = targetPositions[i * 3 + 1] + Math.cos(t * 0.4 + i * 0.02) * 0.01;
                    posArr[i * 3 + 2] = 0;
                }
            }

            geo.attributes.position.needsUpdate = true;
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", onResize);
            renderer.dispose();
            if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{ opacity: 0.6 }}
        />
    );
}
