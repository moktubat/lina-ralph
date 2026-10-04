"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type RevealProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
    y?: number;
};

export default function Reveal({
    children,
    className = "",
    delay = 0,
    y = 40,
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const el = ref.current;
        if (!el) return;

        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.fromTo(
                el,
                { y, opacity: 0, filter: "blur(6px)" },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1.1,
                    delay,
                    ease: "power3.out",
                    clearProps: "filter",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 88%",
                        once: true,
                    },
                },
            );
        });

        return () => mm.revert();
    }, [delay, y]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}