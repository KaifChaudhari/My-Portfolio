"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollAnimations — global GSAP ScrollTrigger-based animations.
 * Mounts once at the app level to set up:
 * 1. Section heading staggered word reveals
 * 2. Animated counters for any [data-counter] elements
 * 3. Card fade-up reveals
 *
 * Uses class-based selectors so any section heading with class `gsap-reveal`
 * and counters with `data-counter` attribute are automatically animated.
 */
export default function ScrollAnimations() {
    useEffect(() => {
        // Wait for DOM to be ready
        const ctx = gsap.context(() => {
            // ── Section headings: split into words, stagger in ──
            document.querySelectorAll(".section-heading").forEach((heading) => {
                const text = heading.textContent || "";
                const words = text.split(" ");
                heading.innerHTML = words
                    .map((word) => `<span class="gsap-word" style="display:inline-block;opacity:0;transform:translateY(20px)">${word}</span>`)
                    .join(" ");

                gsap.to(heading.querySelectorAll(".gsap-word"), {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: heading,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                });
            });

            // ── Animated counters ──
            document.querySelectorAll("[data-counter]").forEach((el) => {
                const target = parseInt(el.getAttribute("data-counter") || "0", 10);
                const suffix = el.getAttribute("data-suffix") || "";
                const obj = { val: 0 };

                gsap.to(obj, {
                    val: target,
                    duration: 2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                    onUpdate: () => {
                        (el as HTMLElement).textContent = Math.floor(obj.val) + suffix;
                    },
                });
            });

            // ── Card fade-up reveals ──
            gsap.utils.toArray(".card-base").forEach((card) => {
                gsap.from(card as Element, {
                    y: 30,
                    opacity: 0,
                    duration: 0.7,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card as Element,
                        start: "top 88%",
                        toggleActions: "play none none none",
                    },
                });
            });
        });

        return () => ctx.revert();
    }, []);

    return null; // No DOM output — purely an effect
}
