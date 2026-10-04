"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const CARDS = [
    {
        id: "01",
        title: "You've overthought it.",
        description:
            "You've analyzed every angle. But the same reaction keeps returning.",
        image: "/image/problem-01.webp",
        alt: "Woman meditating with her hands raised beside her head",
    },
    {
        id: "02",
        title: "You've promised yourself it would be different.",
        description:
            "Tomorrow. Monday. This time you'll stay calm. But the same reaction returns.",
        image: "/image/problem-02.webp",
        alt: "Man lying down while a therapist gently holds his head",
    },
    {
        id: "03",
        title: "You've tried to control it.",
        description:
            "You've tried to push it away. But the same reaction keeps returning.",
        image: "/image/problem-03.webp",
        alt: "Woman lying on a mat during a guided bodywork session",
    },
];

export default function Problem() {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <section className="relative w-full overflow-hidden bg-[#F4F2EE]">
            <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-serif text-3xl font-medium italic tracking-tight leading-[1.1] text-[#1C1B17] sm:text-4xl md:text-5xl">
                        Maybe the problem isn&apos;t that you haven&apos;t tried
                        hard enough.
                    </h2>

                    <p className="mx-auto mt-4 max-w-107 text-sm leading-relaxed text-[#1C1B17]/70 sm:mt-5">
                        Maybe you&apos;ve already tried. You&apos;ve done the
                        work, made the lists, and had the conversations. Still,
                        something pulls you back.
                    </p>
                </div>

                <div className="mt-10 flex flex-col gap-4 sm:mt-12 md:flex-row md:items-end md:gap-4 lg:gap-6">
                    {CARDS.map((card, i) => (
                        <Card
                            key={card.id}
                            {...card}
                            isActive={i === 1 || hovered === i}
                            isSecondaryActive={hovered !== null && i === 1}
                            onActivate={() => {
                                if (i !== 1) setHovered(i);
                            }}
                            onDeactivate={() => {
                                if (i !== 1) setHovered(null);
                            }}
                        />
                    ))}
                </div>
            </div>

            <Marquee />
        </section>
    );
}

type CardProps = (typeof CARDS)[number] & {
    isActive: boolean;
    isSecondaryActive: boolean;
    onActivate: () => void;
    onDeactivate: () => void;
};

function Card({
    id,
    title,
    description,
    image,
    alt,
    isActive,
    onActivate,
    onDeactivate,
}: CardProps) {
    return (
        <article
            tabIndex={0}
            aria-current={isActive}
            onMouseEnter={onActivate}
            onMouseLeave={onDeactivate}
            onFocus={onActivate}
            onClick={onActivate}
            className="
                relative flex min-w-0 flex-1 cursor-pointer overflow-hidden
                rounded-2xl bg-white p-4 outline-none
                transition-shadow duration-700
                ease-[cubic-bezier(.22,1,.36,1)]
                focus-visible:ring-2 focus-visible:ring-[#5C4B36]
                sm:p-5
            "
        >
            {/* inactive wash */}
            <div
                aria-hidden
                className={`
                    pointer-events-none absolute inset-x-0 top-0 h-3/5
                    bg-linear-to-b from-[#E3E3E0] to-transparent
                    transition-opacity duration-700
                    ease-[cubic-bezier(.22,1,.36,1)]
                    ${isActive ? "opacity-0" : "opacity-100"}
                `}
            />

            {/* active wash */}
            <div
                aria-hidden
                className={`
                    pointer-events-none absolute inset-x-0 top-0 h-3/5
                    bg-linear-to-b from-[#E8E39A] via-[#C3D98F]/70 to-transparent
                    transition-opacity duration-700
                    ease-[cubic-bezier(.22,1,.36,1)]
                    ${isActive ? "opacity-100" : "opacity-0"}
                `}
            />

            <div className="relative z-10 flex w-full flex-col">
                <span className="block font-serif text-2xl italic text-[#1C1B17]">
                    {id}
                </span>

                {/* IMAGE */}
                <div
                    className={`relative mx-auto mt-4 w-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] sm:mt-5 ${isActive ? "aspect-16/8.5 rounded-[80px]" : "aspect-[2.4/1] rounded-[100px]"}`}
                >
                    <Image
                        src={image}
                        alt={alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
                    />
                </div>

                {/* TITLE */}
                <h3
                    className="
                        mt-5 text-base font-semibold
                        leading-snug tracking-tight text-[#1C1B17]
                        transition-[margin] duration-700
                        ease-[cubic-bezier(.22,1,.36,1)]
                        sm:mt-6 sm:text-2xl
                    "
                >
                    {title}
                </h3>

                {/* DESCRIPTION */}
                <div
                    className={`
                        grid overflow-hidden
                        transition-[grid-template-rows,opacity]
                        duration-700
                        ease-[cubic-bezier(.22,1,.36,1)]
                        ${isActive
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }
                    `}
                >
                    <div className="min-h-0">
                        <p
                            className="
                                pt-2 text-xs leading-relaxed
                                tracking-tight text-[#1C1B17]/70
                                sm:text-base
                            "
                        >
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
}

function Marquee() {
    return (
        <div
            className="flex select-none overflow-hidden py-4 md:py-8"
            style={{
                maskImage:
                    "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
                WebkitMaskImage:
                    "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
                // --- ADDED MESH GRADIENT BACKGROUND ---
                background: `
                  radial-gradient(ellipse at 50% 0%, #EFEDE9 0%, transparent 50%),
                  radial-gradient(ellipse at 50% 100%, #F4F2EE 0%, transparent 50%),
                  radial-gradient(ellipse at 25% 20%, #DEDFDC 0%, transparent 40%),
                  radial-gradient(ellipse at 75% 20%, #DEDFDC 0%, transparent 40%),
                  radial-gradient(ellipse at 25% 80%, #E8E8E4 0%, transparent 40%),
                  radial-gradient(ellipse at 75% 80%, #E8E8E4 0%, transparent 40%),
                  linear-gradient(to bottom right, #E3E5E2, #F1F0EC)
                `,
            }}
            aria-label="You are not broken. You may simply be working at the wrong level."
        >
            <MarqueeGroup />
            <MarqueeGroup ariaHidden />
        </div>
    );
}

function MarqueeGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
    const trackRef = useRef<HTMLDivElement>(null);

    const positionRef = useRef(0);

    // Pixels per second
    const SPEED = 150;

    const velocityRef = useRef(-SPEED);
    const targetVelocityRef = useRef(-SPEED);

    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        let lastScrollY = window.scrollY;
        let lastTime: number | null = null;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                // Scroll down → marquee goes LEFT
                targetVelocityRef.current = -SPEED;
            } else if (currentScrollY < lastScrollY) {
                // Scroll up → marquee goes RIGHT
                targetVelocityRef.current = SPEED;
            }

            lastScrollY = currentScrollY;
        };

        const animate = (timestamp: number) => {
            if (lastTime === null) {
                lastTime = timestamp;
            }

            const delta = Math.min(timestamp - lastTime, 32);
            lastTime = timestamp;

            // Smoothly accelerate toward the new direction.
            velocityRef.current +=
                (targetVelocityRef.current - velocityRef.current) * 0.12;

            positionRef.current +=
                velocityRef.current * (delta / 1000);

            const width = track.scrollWidth / 3;

            // Infinite loop — works in both directions.
            if (positionRef.current <= -width) {
                positionRef.current += width;
            }

            if (positionRef.current >= 0) {
                positionRef.current -= width;
            }

            track.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;

            animationRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("scroll", handleScroll);

            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <div
            aria-hidden={ariaHidden || undefined}
            className="flex min-w-full shrink-0 overflow-hidden"
        >
            <div
                ref={trackRef}
                className="flex shrink-0 items-center will-change-transform"
            >
                {[0, 1, 2].map((n) => (
                    <div
                        key={n}
                        className="flex shrink-0 items-center"
                    >
                        <span className="whitespace-nowrap font-serif text-xl tracking-tight text-[#3B3C39] sm:text-2xl lg:text-4xl">
                            You are not broken. You may simply be working at the
                            wrong level.
                        </span>

                        <Image
                            src="/svg/star.svg"
                            alt=""
                            width={36}
                            height={36}
                            className="mx-4 h-6 w-6 shrink-0 animate-[spin_8s_linear_infinite] sm:mx-7 sm:h-8 sm:w-8 lg:mx-10 lg:h-12 lg:w-12"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}