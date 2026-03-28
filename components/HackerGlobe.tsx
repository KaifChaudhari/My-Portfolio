"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * HackerGlobe — rotating wireframe globe with animated data packets.
 * • Globe rotates slowly with continents approximated by node clusters
 * • Arc connections between random node pairs
 * • Data packets (small bright spheres) travel along arcs
 * • Threat nodes pulse red, normal nodes pulse cyan
 * • Represents global cybersecurity / threat intelligence
 */
export default function HackerGlobe({ className = "" }: { className?: string }) {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const isMobile = window.innerWidth < 768;
        const w = mount.clientWidth;
        const h = mount.clientHeight;

        const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
        renderer.setSize(w, h);
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
        camera.position.set(0, 0.3, 3.5);

        const globeRadius = isMobile ? 0.85 : 1.1;

        // ── Globe wireframe ──
        const globeWire = new THREE.Mesh(
            new THREE.SphereGeometry(globeRadius, 40, 40),
            new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.08 })
        );
        scene.add(globeWire);

        // Inner solid dark sphere
        const innerGlobe = new THREE.Mesh(
            new THREE.SphereGeometry(globeRadius * 0.99, 32, 32),
            new THREE.MeshPhongMaterial({ color: 0x080818, emissive: 0x001020, emissiveIntensity: 0.3 })
        );
        scene.add(innerGlobe);

        // ── Network nodes on surface ──
        const nodeCount = isMobile ? 25 : 50;
        const nodePositions: THREE.Vector3[] = [];
        const nodeDots = new THREE.Group();
        const threatNodeSet = new Set<number>();
        const threatCount = Math.floor(nodeCount * 0.15);
        while (threatNodeSet.size < threatCount) {
            threatNodeSet.add(Math.floor(Math.random() * nodeCount));
        }

        for (let i = 0; i < nodeCount; i++) {
            const lat = (Math.random() - 0.5) * Math.PI;
            const lon = Math.random() * Math.PI * 2;
            const r = globeRadius * 1.01;
            const pos = new THREE.Vector3(
                r * Math.cos(lat) * Math.cos(lon),
                r * Math.sin(lat),
                r * Math.cos(lat) * Math.sin(lon)
            );
            nodePositions.push(pos);

            const dot = new THREE.Mesh(
                new THREE.SphereGeometry(0.012, 4, 4),
                new THREE.MeshBasicMaterial({
                    color: threatNodeSet.has(i) ? 0xff4444 : 0x00d4ff,
                })
            );
            dot.position.copy(pos);
            nodeDots.add(dot);
        }
        scene.add(nodeDots);

        // ── Arc connections ──
        const arcCount = isMobile ? 10 : 22;
        const arcGroup = new THREE.Group();
        const arcCurves: { curve: THREE.QuadraticBezierCurve3; isThreat: boolean }[] = [];

        for (let i = 0; i < arcCount; i++) {
            const a = nodePositions[Math.floor(Math.random() * nodeCount)];
            const b = nodePositions[Math.floor(Math.random() * nodeCount)];
            if (a.distanceTo(b) < 0.3) continue;

            const mid = a.clone().add(b).multiplyScalar(0.5);
            const dist = a.distanceTo(b);
            mid.normalize().multiplyScalar(globeRadius + dist * 0.35);

            const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
            const points = curve.getPoints(24);
            const geo = new THREE.BufferGeometry().setFromPoints(points);

            const isThreat = i < 4;
            const line = new THREE.Line(
                geo,
                new THREE.LineBasicMaterial({
                    color: isThreat ? 0xff4444 : 0x00d4ff,
                    transparent: true,
                    opacity: isThreat ? 0.35 : 0.18,
                })
            );
            arcGroup.add(line);
            arcCurves.push({ curve, isThreat });
        }
        scene.add(arcGroup);

        // ── Data packets traveling along arcs ──
        const packets: { mesh: THREE.Mesh; curveIdx: number; progress: number; speed: number }[] = [];
        const packetCount = isMobile ? 5 : 12;
        for (let i = 0; i < Math.min(packetCount, arcCurves.length); i++) {
            const isThreat = arcCurves[i].isThreat;
            const pkt = new THREE.Mesh(
                new THREE.SphereGeometry(isThreat ? 0.025 : 0.018, 6, 6),
                new THREE.MeshBasicMaterial({
                    color: isThreat ? 0xff4444 : 0x00ffd4,
                })
            );
            scene.add(pkt);
            packets.push({
                mesh: pkt,
                curveIdx: i,
                progress: Math.random(),
                speed: 0.003 + Math.random() * 0.004,
            });
        }

        // ── Lights ──
        scene.add(new THREE.AmbientLight(0xffffff, 0.3));
        const light = new THREE.PointLight(0x00d4ff, 3, 12);
        light.position.set(2, 2, 2);
        scene.add(light);

        // ── Resize ──
        const onResize = () => {
            if (!mount) return;
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mount.clientWidth, mount.clientHeight);
        };
        window.addEventListener("resize", onResize);

        // ── Main group for rotation ──
        const mainGroup = new THREE.Group();
        mainGroup.add(globeWire, innerGlobe, nodeDots, arcGroup);
        scene.add(mainGroup);
        // Remove duplicate scene.add (already added individually)
        scene.remove(globeWire);
        scene.remove(innerGlobe);
        scene.remove(nodeDots);
        scene.remove(arcGroup);

        // ── Animation ──
        let animId: number;
        const clock = new THREE.Clock();

        const animate = () => {
            animId = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();

            // Rotate globe
            mainGroup.rotation.y = t * 0.08;

            // Pulse dots
            nodeDots.children.forEach((dot, i) => {
                const scale = 1 + Math.sin(t * 2 + i * 0.5) * 0.4;
                dot.scale.setScalar(scale);
            });

            // Move data packets along arcs
            packets.forEach((pkt) => {
                pkt.progress += pkt.speed;
                if (pkt.progress > 1) pkt.progress = 0;
                const point = arcCurves[pkt.curveIdx].curve.getPointAt(pkt.progress);
                // Apply globe rotation to packet position
                point.applyAxisAngle(new THREE.Vector3(0, 1, 0), mainGroup.rotation.y);
                pkt.mesh.position.copy(point);
            });

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
            className={`w-full ${className}`}
            style={{ height: "300px" }}
        />
    );
}
