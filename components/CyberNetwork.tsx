"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * CyberNetwork — 3D interactive particle network background.
 * Floating nodes connected by glowing edges, with mouse interaction.
 * • Mouse movement → nearest nodes drift toward cursor
 * • Scroll → slow camera z-drift
 * • Threat nodes (8%) pulse red/orange
 * • Theme-aware: transparent alpha channel, no opaque black fill
 */
interface Props {
    className?: string;
    particleCount?: number;
    color?: string;
}

export default function CyberNetwork({
    className = "",
    particleCount = 80,
    color = "#00d4ff",
}: Props) {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const isMobile = window.innerWidth < 768;
        const count = isMobile ? Math.floor(particleCount * 0.4) : particleCount;
        const w = mount.clientWidth;
        const h = mount.clientHeight;

        // Renderer — transparent background (works with any theme)
        const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
        renderer.setSize(w, h);
        renderer.setClearColor(0x000000, 0); // fully transparent
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const aspect = w / h;
        const camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 100);
        camera.position.set(0, 0, 6);

        const threeColor = new THREE.Color(color);

        // Nodes
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3]     = (Math.random() - 0.5) * (aspect * 7);
            positions[i * 3 + 1] = (Math.random() - 0.5) * 6.5;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
            velocities[i * 3]     = (Math.random() - 0.5) * 0.003;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
        }

        // Threat nodes (8%)
        const threatSet = new Set<number>();
        const threatCount = Math.floor(count * 0.08);
        while (threatSet.size < threatCount) {
            threatSet.add(Math.floor(Math.random() * count));
        }

        const colors = new Float32Array(count * 3);
        const normalC = new THREE.Color(color);
        const threatC = new THREE.Color("#ff4444");
        const alertC  = new THREE.Color("#fb923c");
        for (let i = 0; i < count; i++) {
            let c = normalC;
            if (threatSet.has(i)) c = Math.random() > 0.5 ? threatC : alertC;
            colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
        }

        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        pGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        const pMat = new THREE.PointsMaterial({
            vertexColors: true,
            size: isMobile ? 0.07 : 0.055,
            transparent: true,
            opacity: 0.7,
            sizeAttenuation: true,
            depthWrite: false,
        });
        const pointCloud = new THREE.Points(pGeo, pMat);
        scene.add(pointCloud);

        // Edges
        const maxEdges = count * count;
        const edgePositions = new Float32Array(maxEdges * 6);
        const edgeColors = new Float32Array(maxEdges * 6);
        const edgeGeo = new THREE.BufferGeometry();
        edgeGeo.setAttribute("position", new THREE.BufferAttribute(edgePositions, 3));
        edgeGeo.setAttribute("color", new THREE.BufferAttribute(edgeColors, 3));
        const edgeMat = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.12,
        });
        const edges = new THREE.LineSegments(edgeGeo, edgeMat);
        scene.add(edges);

        const threshold = isMobile ? 2.5 : 3.0;

        // Mouse interaction
        let mouseWorldX = 0, mouseWorldY = 0;
        const onMouseMove = (e: MouseEvent) => {
            const rect = mount.getBoundingClientRect();
            const mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const my = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            mouseWorldX = mx * aspect * 3.5;
            mouseWorldY = my * 3.25;
        };
        mount.addEventListener("mousemove", onMouseMove);

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
            const posArr = pGeo.attributes.position.array as Float32Array;
            const colArr = pGeo.attributes.color.array as Float32Array;

            for (let i = 0; i < count; i++) {
                const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;
                posArr[ix] += velocities[ix];
                posArr[iy] += velocities[iy];
                posArr[iz] += velocities[iz];
                if (Math.abs(posArr[ix]) > aspect * 4) velocities[ix] *= -1;
                if (Math.abs(posArr[iy]) > 4) velocities[iy] *= -1;
                if (Math.abs(posArr[iz]) > 1.5) velocities[iz] *= -1;

                if (!isMobile) {
                    const dx = mouseWorldX - posArr[ix];
                    const dy = mouseWorldY - posArr[iy];
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 2.5) {
                        posArr[ix] += dx * 0.002;
                        posArr[iy] += dy * 0.002;
                    }
                }
            }
            pGeo.attributes.position.needsUpdate = true;

            // Pulse threat nodes
            const pulse = 0.6 + 0.4 * Math.sin(t * 2.5);
            threatSet.forEach((idx) => {
                colArr[idx * 3] = threatC.r * pulse;
            });
            pGeo.attributes.color.needsUpdate = true;

            // Rebuild edges
            let edgeIdx = 0;
            for (let i = 0; i < count && edgeIdx < maxEdges; i++) {
                for (let j = i + 1; j < count && edgeIdx < maxEdges; j++) {
                    const dx = posArr[i * 3] - posArr[j * 3];
                    const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
                    const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                    if (dist < threshold) {
                        const fade = 1 - dist / threshold;
                        const isThreat = threatSet.has(i) || threatSet.has(j);
                        const ec = isThreat ? threatC : threeColor;
                        const eArr = edgeGeo.attributes.position.array as Float32Array;
                        const ecArr = edgeGeo.attributes.color.array as Float32Array;

                        eArr[edgeIdx * 6]     = posArr[i * 3];
                        eArr[edgeIdx * 6 + 1] = posArr[i * 3 + 1];
                        eArr[edgeIdx * 6 + 2] = posArr[i * 3 + 2];
                        eArr[edgeIdx * 6 + 3] = posArr[j * 3];
                        eArr[edgeIdx * 6 + 4] = posArr[j * 3 + 1];
                        eArr[edgeIdx * 6 + 5] = posArr[j * 3 + 2];

                        ecArr[edgeIdx * 6]     = ec.r * fade;
                        ecArr[edgeIdx * 6 + 1] = ec.g * fade;
                        ecArr[edgeIdx * 6 + 2] = ec.b * fade;
                        ecArr[edgeIdx * 6 + 3] = ec.r * fade;
                        ecArr[edgeIdx * 6 + 4] = ec.g * fade;
                        ecArr[edgeIdx * 6 + 5] = ec.b * fade;

                        edgeIdx++;
                    }
                }
            }
            edgeGeo.setDrawRange(0, edgeIdx * 2);
            edgeGeo.attributes.position.needsUpdate = true;
            edgeGeo.attributes.color.needsUpdate = true;

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(animId);
            mount.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", onResize);
            renderer.dispose();
            if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        };
    }, [particleCount, color]);

    return (
        <div
            ref={mountRef}
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{ opacity: 0.6 }}
        />
    );
}
