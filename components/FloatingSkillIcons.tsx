"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * FloatingSkillIcons — floating 3D skill labels with glass/hologram material.
 * Slow orbit around central axis. Hover → enlarge + glow.
 * Each skill is a canvas-textured billboard with glass-like appearance.
 * No EffectComposer — uses plain renderer for transparent alpha support.
 */

interface SkillDef {
    name: string;
    color: string;
    radius: number;
    speed: number;
    phase: number;
    yBias: number;
}

const SKILLS: SkillDef[] = [
    { name: "Python",          color: "#4ade80", radius: 2.4, speed: 0.30, phase: 0,              yBias: 0 },
    { name: "Java",            color: "#fb923c", radius: 2.1, speed: 0.40, phase: Math.PI * 0.4,  yBias: 0.3 },
    { name: "React",           color: "#00d4ff", radius: 2.6, speed: 0.25, phase: Math.PI * 0.85, yBias: -0.2 },
    { name: "Linux",           color: "#facc15", radius: 2.0, speed: 0.45, phase: Math.PI * 1.2,  yBias: 0.1 },
    { name: "Cyber Security",  color: "#ff4444", radius: 2.3, speed: 0.35, phase: Math.PI * 1.5,  yBias: -0.3 },
    { name: "Docker",          color: "#38bdf8", radius: 1.8, speed: 0.50, phase: Math.PI * 0.6,  yBias: 0.4 },
    { name: "Networking",      color: "#c084fc", radius: 2.2, speed: 0.38, phase: Math.PI * 1.8,  yBias: -0.1 },
];

/** Create holographic label: glass-like card with text */
function createHoloLabel(name: string, color: string): THREE.Mesh {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 80;
    const ctx = canvas.getContext("2d")!;

    // Glass background — semi-transparent
    ctx.fillStyle = "rgba(10, 15, 25, 0.55)";
    ctx.beginPath();
    ctx.roundRect(0, 0, 256, 80, 12);
    ctx.fill();

    // Glass border
    ctx.strokeStyle = `${color}88`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(2, 2, 252, 76, 10);
    ctx.stroke();

    // Glow inner line top
    ctx.strokeStyle = `${color}30`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, 8);
    ctx.lineTo(236, 8);
    ctx.stroke();

    // Text
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    ctx.font = "bold 22px 'JetBrains Mono', monospace";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(name, 128, 42);

    const texture = new THREE.CanvasTexture(canvas);
    const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(1.6, 0.5),
        new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            opacity: 0.9,
        })
    );
    return mesh;
}

interface Props {
    className?: string;
}

export default function FloatingSkillIcons({ className = "" }: Props) {
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
        renderer.setClearColor(0x000000, 0); // fully transparent
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
        camera.position.set(0, 1, 6);
        camera.lookAt(0, 0, 0);

        // Lights
        scene.add(new THREE.AmbientLight(0xffffff, 0.3));
        const coreLight = new THREE.PointLight(0x00d4ff, 4, 12);
        scene.add(coreLight);

        // Central glowing sphere
        const coreMesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.35, 24, 24),
            new THREE.MeshPhongMaterial({ color: 0x00d4ff, emissive: 0x00d4ff, emissiveIntensity: 0.5, transparent: true, opacity: 0.25 })
        );
        scene.add(coreMesh);

        // Wireframe cage
        const coreWire = new THREE.Mesh(
            new THREE.IcosahedronGeometry(0.45, 1),
            new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.12 })
        );
        scene.add(coreWire);

        // Skill labels
        const skillMeshes = SKILLS.map((skill) => {
            const mesh = createHoloLabel(skill.name, skill.color);
            scene.add(mesh);
            return { mesh, def: skill };
        });

        // Raycasting
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(-10, -10);
        let hoveredIdx = -1;

        const onPointerMove = (e: PointerEvent) => {
            const rect = mount.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        };
        mount.addEventListener("pointermove", onPointerMove);
        renderer.domElement.style.pointerEvents = "auto";

        // Resize
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

            // Core
            coreMesh.rotation.y = t * 0.3;
            coreWire.rotation.y = -t * 0.2;
            coreWire.rotation.x = t * 0.15;
            const pulse = 0.2 + Math.sin(t * 2) * 0.08;
            (coreMesh.material as THREE.MeshPhongMaterial).opacity = pulse;

            // Orbit skills
            skillMeshes.forEach(({ mesh, def }, idx) => {
                const angle = t * def.speed + def.phase;
                mesh.position.x = Math.cos(angle) * def.radius;
                mesh.position.z = Math.sin(angle) * def.radius * 0.35;
                mesh.position.y = def.yBias + Math.sin(t * 0.4 + idx) * 0.2;
                mesh.lookAt(camera.position);

                // Hover scale
                const isH = idx === hoveredIdx;
                const target = isH ? 1.35 : 1;
                mesh.scale.lerp(new THREE.Vector3(target, target, target), 0.1);
                (mesh.material as THREE.MeshBasicMaterial).opacity = isH ? 1 : 0.85;
            });

            // Raycast
            raycaster.setFromCamera(mouse, camera);
            const hits = raycaster.intersectObjects(skillMeshes.map(s => s.mesh));
            hoveredIdx = hits.length > 0
                ? skillMeshes.findIndex(s => s.mesh === hits[0].object)
                : -1;
            mount.style.cursor = hoveredIdx >= 0 ? "pointer" : "default";

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(animId);
            mount.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("resize", onResize);
            renderer.dispose();
            if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className={`w-full ${className}`}
            style={{ height: "450px", maxHeight: "55vh" }}
        />
    );
}
