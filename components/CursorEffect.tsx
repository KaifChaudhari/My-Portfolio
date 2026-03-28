"use client";

import { useEffect, useRef } from "react";

/**
 * CursorEffect – custom magnetic cursor for desktop.
 * Outer ring + inner dot, grows on hovering interactive elements.
 * Hidden on touch devices.
 */
export default function CursorEffect() {
    const outerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Skip on touch devices
        if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

        const outer = outerRef.current;
        const inner = innerRef.current;
        if (!outer || !inner) return;

        let mx = 0, my = 0;   // mouse position
        let ox = 0, oy = 0;   // outer interpolated
        let ix = 0, iy = 0;   // inner interpolated
        let hovered = false;

        const onMove = (e: MouseEvent) => {
            mx = e.clientX;
            my = e.clientY;
        };

        const onEnter = () => { hovered = true; };
        const onLeave = () => { hovered = false; };

        // Attach hover listeners to all interactive elements
        const attachHover = () => {
            const targets = document.querySelectorAll("a, button, [role='button'], input, textarea, select");
            targets.forEach((el) => {
                el.addEventListener("mouseenter", onEnter);
                el.addEventListener("mouseleave", onLeave);
            });
            return targets;
        };

        window.addEventListener("mousemove", onMove);
        let targets = attachHover();

        // Re-attach on DOM changes (dynamic content)
        const observer = new MutationObserver(() => {
            targets.forEach((el) => {
                el.removeEventListener("mouseenter", onEnter);
                el.removeEventListener("mouseleave", onLeave);
            });
            targets = attachHover();
        });
        observer.observe(document.body, { childList: true, subtree: true });

        let animId: number;
        const animate = () => {
            animId = requestAnimationFrame(animate);
            // Smooth follow
            const outerSpeed = 0.15;
            const innerSpeed = 0.25;
            ox += (mx - ox) * outerSpeed;
            oy += (my - oy) * outerSpeed;
            ix += (mx - ix) * innerSpeed;
            iy += (my - iy) * innerSpeed;

            const scale = hovered ? 1.8 : 1;
            outer.style.transform = `translate(${ox - 20}px, ${oy - 20}px) scale(${scale})`;
            inner.style.transform = `translate(${ix - 4}px, ${iy - 4}px)`;
            inner.style.opacity = hovered ? "0" : "1";
        };
        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("mousemove", onMove);
            observer.disconnect();
            targets.forEach((el) => {
                el.removeEventListener("mouseenter", onEnter);
                el.removeEventListener("mouseleave", onLeave);
            });
        };
    }, []);

    return (
        <>
            {/* Outer ring */}
            <div
                ref={outerRef}
                className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[var(--accent)]/50 pointer-events-none z-[9999] transition-[border-color] duration-300 mix-blend-difference hidden md:block"
                style={{ willChange: "transform" }}
            />
            {/* Inner dot */}
            <div
                ref={innerRef}
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--accent)] pointer-events-none z-[9999] hidden md:block"
                style={{ willChange: "transform" }}
            />
        </>
    );
}
