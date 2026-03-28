"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * CyberCube — interactive 3D navigation cube.
 * Each face has a label (About, Projects, Skills, Resume, Contact, GitHub).
 * Drag to rotate. Click face → smooth-scroll to that section.
 * Glass/holographic material — cyan wireframe edges, semi-transparent faces.
 */

const FACES: { label: string; target: string; color: string }[] = [
    { label: "About",    target: "about",    color: "#00d4ff" },
    { label: "Projects", target: "projects", color: "#c084fc" },
    { label: "Skills",   target: "skills",   color: "#4ade80" },
    { label: "Resume",   target: "resume",   color: "#fb923c" },
    { label: "Contact",  target: "contact",  color: "#ff4444" },
    { label: "GitHub",   target: "https://github.com/KaifChaudhari", color: "#facc15" },
];

function createFaceTexture(label: string, color: string): THREE.CanvasTexture {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;

    // Semi-transparent dark background
    ctx.fillStyle = "rgba(10, 10, 20, 0.6)";
    ctx.fillRect(0, 0, 256, 256);

    // Border
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.strokeRect(8, 8, 240, 240);

    // Corner accents
    ctx.fillStyle = color;
    ctx.fillRect(8, 8, 20, 3);
    ctx.fillRect(8, 8, 3, 20);
    ctx.fillRect(228, 8, 20, 3);
    ctx.fillRect(245, 8, 3, 20);
    ctx.fillRect(8, 245, 20, 3);
    ctx.fillRect(8, 228, 3, 20);
    ctx.fillRect(228, 245, 20, 3);
    ctx.fillRect(245, 228, 3, 20);

    // Label text
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    ctx.font = "bold 28px 'JetBrains Mono', monospace";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label.toUpperCase(), 128, 128);

    // Small hex accent
    ctx.shadowBlur = 0;
    ctx.font = "11px 'JetBrains Mono', monospace";
    ctx.fillStyle = `${color}88`;
    ctx.fillText(`[ 0x${Math.floor(Math.random() * 0xffff).toString(16).padStart(4, "0")} ]`, 128, 200);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}

export default function CyberCube({ className = "" }: { className?: string }) {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const w = mount.clientWidth;
        const h = mount.clientHeight;
        const isMobile = window.innerWidth < 768;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(w, h);
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 50);
        camera.position.set(0, 0, 4);

        // ── Lights ──
        scene.add(new THREE.AmbientLight(0xffffff, 0.4));
        const pLight = new THREE.PointLight(0x00d4ff, 3, 10);
        pLight.position.set(3, 3, 3);
        scene.add(pLight);

        // ── Cube — 6 face materials ──
        const materials = FACES.map((face) => {
            return new THREE.MeshBasicMaterial({
                map: createFaceTexture(face.label, face.color),
                transparent: true,
                opacity: 0.85,
                side: THREE.FrontSide,
            });
        });
        const cubeSize = isMobile ? 1.0 : 1.3;
        const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        const cube = new THREE.Mesh(cubeGeo, materials);
        scene.add(cube);

        // Wireframe overlay
        const wireGeo = new THREE.BoxGeometry(cubeSize * 1.01, cubeSize * 1.01, cubeSize * 1.01);
        const wireframe = new THREE.Mesh(wireGeo, new THREE.MeshBasicMaterial({
            color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.2,
        }));
        scene.add(wireframe);

        // ── Drag rotation ──
        let isDragging = false;
        let prevX = 0, prevY = 0;
        let rotVelX = 0, rotVelY = 0;
        // Auto-rotate
        let autoRotX = 0.003, autoRotY = 0.005;

        const onPointerDown = (e: PointerEvent) => {
            isDragging = true;
            prevX = e.clientX;
            prevY = e.clientY;
            autoRotX = 0;
            autoRotY = 0;
        };
        const onPointerMove = (e: PointerEvent) => {
            if (!isDragging) return;
            const dx = e.clientX - prevX;
            const dy = e.clientY - prevY;
            rotVelY = dx * 0.008;
            rotVelX = dy * 0.008;
            prevX = e.clientX;
            prevY = e.clientY;
        };
        const onPointerUp = () => {
            isDragging = false;
            // Restore auto-rotate after a while
            setTimeout(() => {
                if (!isDragging) {
                    autoRotX = 0.003;
                    autoRotY = 0.005;
                }
            }, 3000);
        };

        // ── Click → navigate ──
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const onClick = (e: MouseEvent) => {
            const rect = mount.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const hits = raycaster.intersectObject(cube);
            if (hits.length > 0 && hits[0].faceIndex != null) {
                const faceIdx = Math.floor(hits[0].faceIndex / 2);
                const face = FACES[faceIdx];
                if (face.target.startsWith("http")) {
                    window.open(face.target, "_blank");
                } else {
                    document.querySelector(`#${face.target}`)?.scrollIntoView({ behavior: "smooth" });
                }
            }
        };

        renderer.domElement.style.pointerEvents = "auto";
        renderer.domElement.style.cursor = "grab";
        renderer.domElement.addEventListener("pointerdown", onPointerDown);
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
        renderer.domElement.addEventListener("click", onClick);

        // ── Resize ──
        const onResize = () => {
            if (!mount) return;
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mount.clientWidth, mount.clientHeight);
        };
        window.addEventListener("resize", onResize);

        // ── Animation ──
        let animId: number;
        const animate = () => {
            animId = requestAnimationFrame(animate);

            // Apply drag velocity with decay
            cube.rotation.x += rotVelX + autoRotX;
            cube.rotation.y += rotVelY + autoRotY;
            wireframe.rotation.x = cube.rotation.x;
            wireframe.rotation.y = cube.rotation.y;

            rotVelX *= 0.95;
            rotVelY *= 0.95;

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(animId);
            renderer.domElement.removeEventListener("pointerdown", onPointerDown);
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
            renderer.domElement.removeEventListener("click", onClick);
            window.removeEventListener("resize", onResize);
            renderer.dispose();
            if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className={`${className}`}
            style={{ width: "200px", height: "200px" }}
        />
    );
}
