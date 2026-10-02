"use client";

import { ReactNode, useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STEPS = [
    {
        id: "understand",
        title: "Understand",
        description:
            "Make space for what is happening now—and what you want to be different.",
        icon: <BrainIcon />,
    },
    {
        id: "explore",
        title: "Explore",
        description:
            "Gently look at the responses, beliefs, and patterns connected to the problem.",
        icon: <EyeSearchIcon />,
    },
    {
        id: "repattern",
        title: "Repattern",
        description:
            "Practice new ways of responding that feel grounded in your real life.",
        icon: <PuzzleIcon />,
    },
];

export default function Approach() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            const ctx = gsap.context(() => {
                gsap.from("[data-step]", {
                    y: 32,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: "[data-steps]",
                        start: "top 80%",
                        once: true,
                    },
                });
            }, sectionRef);

            return () => ctx.revert();
        });

        return () => mm.revert();
    }, []);

    return (
        <section
            id="process"
            ref={sectionRef}
            className="relative w-full overflow-hidden bg-[#F4F2EE]"
        >
            <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:py-20 lg:py-24">
                <h2 className="mx-auto max-w-3xl text-center font-serif text-3xl font-medium italic leading-[1.1] tracking-tight text-[#1C1B17] sm:text-4xl md:text-5xl">
                    Lina doesn&apos;t just focus on the symptom. She looks at
                    the pattern underneath it.
                </h2>

                <ul
                    data-steps
                    className="mx-auto mt-12 grid max-w-5xl gap-12 sm:mt-16 md:grid-cols-3 md:gap-8"
                >
                    {STEPS.map((step) => (
                        <li
                            key={step.id}
                            data-step
                            className="flex flex-col items-center text-center"
                        >
                            <Badge>{step.icon}</Badge>

                            <h3 className="mt-6 text-lg font-bold text-[#1C1B17] sm:text-xl">
                                {step.title}
                            </h3>

                            <p className="mt-3 max-w-xs text-xs leading-relaxed text-[#1C1B17]/70 sm:text-sm">
                                {step.description}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

/* ---------- scalloped badge ---------- */

// Wavy circle: r + amp * cos(lobes * θ). Deterministic, so SSR and client match.
function scallopPath(r: number, amp: number, lobes: number, steps = 240) {
    let d = "";
    for (let i = 0; i < steps; i++) {
        const t = (i / steps) * Math.PI * 2;
        const rad = r + amp * Math.cos(lobes * t);
        const x = (50 + rad * Math.cos(t)).toFixed(2);
        const y = (50 + rad * Math.sin(t)).toFixed(2);
        d += `${i === 0 ? "M" : "L"}${x} ${y}`;
    }
    return d + "Z";
}

const SCALLOP = scallopPath(43, 3.2, 16);

function Badge({ children }: { children: ReactNode }) {
    const gradientId = `badge-${useId().replace(/:/g, "")}`;

    return (
        <span className="relative grid h-24 w-24 place-items-center sm:h-28 sm:w-28">
            <svg
                aria-hidden
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full"
            >
                <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#6CC08C" />
                        <stop offset="0.55" stopColor="#A7C852" />
                        <stop offset="1" stopColor="#D4A62A" />
                    </linearGradient>
                </defs>
                <path d={SCALLOP} fill={`url(#${gradientId})`} />
            </svg>

            <span className="relative h-10 w-10 text-white sm:h-12 sm:w-12">
                {children}
            </span>
        </span>
    );
}

/* ---------- icons ---------- */

const ICON_PROPS = {
    "aria-hidden": true,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-full w-full",
} as const;

function BrainIcon() {
    return (
        <svg {...ICON_PROPS}>
            <path d="M24 9v30" />
            <path d="M24 12c-1.5-3-6-3.5-8.5-1.2-2.4 2.2-2 5.4-.2 7-3.3.7-5.3 4-3.6 7 .8 1.5 2.100 2.300 3.600 2.500-.8 3 1.200 6 4.200 6.300 2.200.2 3.800-1 4.500-2.600" />
            <path d="M24 12c1.500-3 6-3.500 8.500-1.200 2.400 2.200 2 5.400.2 7 3.300.7 5.300 4 3.600 7-.8 1.500-2.100 2.300-3.600 2.500.8 3-1.200 6-4.200 6.300-2.200.2-3.800-1-4.500-2.600" />
            <path d="M15 19c2 0 3.500 1 4 2.500M33 19c-2 0-3.500 1-4 2.500M16 31c2.500 0 4-1 4.500-2.500M32 31c-2.500 0-4-1-4.500-2.500" />
        </svg>
    );
}

function EyeSearchIcon() {
    return (
        <svg {...ICON_PROPS}>
            <circle cx="21" cy="21" r="12" />
            <path d="m30 30 10 10" />
            <path d="M12 21c2.500-4 5.500-6 9-6s6.500 2 9 6c-2.500 4-5.500 6-9 6s-6.500-2-9-6Z" />
            <circle cx="21" cy="21" r="3" />
            <path d="M21 7v2.500M8 12l2 1.500M34 12l-2 1.500" />
        </svg>
    );
}

function PuzzleIcon() {
    return (
        <svg {...ICON_PROPS}>
            <path d="M8 16h8a4 4 0 1 1 8 0h8v8a4 4 0 1 1 0 8v8H8V32a4 4 0 1 0 0-8V16Z" />
            <path d="M32 8l3-3 4 2 1 4-2 3" />
        </svg>
    );
}