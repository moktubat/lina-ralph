"use client";

import { ReactNode, useRef } from "react";
import { gsap, NO_REDUCED_MOTION, useGSAP } from "@/lib/gsap";

type RevealProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
    y?: number;
    variant?: "rise" | "mask";
};

export default function Reveal({
    children,
    className = "",
    delay = 0,
    y = 40,
    variant = "rise",
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const el = ref.current;
            if (!el) return;

            const mm = gsap.matchMedia();
            mm.add(NO_REDUCED_MOTION, () => {
                const scrollTrigger = {
                    trigger: el,
                    start: "top 88%",
                    once: true,
                };

                if (variant === "mask") {
                    gsap.fromTo(
                        el,
                        { clipPath: "inset(100% 0% 0% 0%)", y: y * 0.5 },
                        {
                            clipPath: "inset(0% 0% 0% 0%)",
                            y: 0,
                            duration: 1.3,
                            delay,
                            ease: "power4.out",
                            clearProps: "clipPath,transform",
                            scrollTrigger,
                        },
                    );
                    return;
                }

                gsap.fromTo(
                    el,
                    { y, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.1,
                        delay,
                        ease: "power3.out",
                        clearProps: "transform,opacity",
                        scrollTrigger,
                    },
                );
            });
        },
        { scope: ref, dependencies: [delay, y, variant] },
    );

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
