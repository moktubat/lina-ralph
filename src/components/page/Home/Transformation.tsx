"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Angle (deg) of each card on the arc. 0° is the fixed before/after card.
const ARC = [
    {
        angle: -66,
        image: "/image/energy-01.webp",
        alt: "Woman lying on the floor with a singing bowl beside her",
    },
    {
        angle: -44,
        image: "/image/energy-02.webp",
        alt: "Woman resting on a cushion while a therapist holds a hand above her",
    },
    {
        angle: -22,
        image: "/image/energy-03.webp",
        alt: "Woman with closed eyes relaxing in a calm room",
    },
    {
        angle: 22,
        image: "/image/energy-04.webp",
        alt: "Woman seated cross-legged looking tense while a therapist stands behind her",
    },
    {
        angle: 44,
        image: "/image/energy-05.webp",
        alt: "Woman sitting cross-legged in a bright room, hands resting on her knees",
    },
    {
        angle: 66,
        image: "/image/energy-06.webp",
        alt: "Woman sitting on a woven cushion, eyes closed",
    },
];

const CARD_SIZE = "h-40 w-30 sm:h-52 sm:w-40 lg:h-64 lg:w-50";

export default function Transformation() {
    const sectionRef = useRef<HTMLElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            const tween = gsap.fromTo(
                ringRef.current,
                { rotation: -7 },
                {
                    rotation: 7,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                },
            );

            return () => {
                tween.scrollTrigger?.kill();
                tween.kill();
            };
        });

        return () => mm.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden rounded-t-4xl text-white sm:rounded-t-[48px] lg:rounded-t-[64px] pt-14 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32"
            style={{
                background: `
                    radial-gradient(ellipse 70% 35% at 50% 100%, #7E7A2C 0%, transparent 75%),
                    radial-gradient(ellipse 45% 30% at 0% 100%, #5F6A34 0%, transparent 70%),
                    linear-gradient(to bottom, #2E3C20 0%, #2E3C20 55%, #334123 100%)
                `,
            }}
        >
            <div className="mx-auto w-full max-w-7xl px-4 pb-12">
                <h2 className="mx-auto max-w-xl text-center font-serif text-3xl italic leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
                    Imagine if this stopped taking so much energy.
                </h2>
            </div>

            {/* Arc gallery */}
            <div
                className="relative -mt-4 h-112 overflow-hidden sm:h-136 lg:h-152"
                style={{ ["--r" as string]: "clamp(460px, 56vw, 820px)" }}
            >
                {/* light on the "after" side, shade on the "before" side */}
                <div
                    aria-hidden
                    className="absolute inset-y-0 left-0 right-1/2 bg-linear-to-r from-transparent to-[#E8E39A]/15"
                />
                <div
                    aria-hidden
                    className="absolute inset-y-0 left-1/2 right-0 bg-black/15"
                />

                <span className="absolute left-4 top-2 z-30 text-xl sm:left-20">
                    After
                </span>
                <span className="absolute right-4 top-2 z-30 text-xl sm:right-20">
                    Before
                </span>

                {/* Rotating ring: zero-size pivot placed at the circle's centre */}
                <div
                    ref={ringRef}
                    className="absolute left-1/2 z-10 h-0 w-0"
                    style={{ top: "calc(var(--r) + 8rem)" }}
                >
                    {ARC.map((card) => (
                        <div
                            key={card.image}
                            className={`absolute left-0 top-0 origin-top-left overflow-hidden rounded-2xl bg-black/20 shadow-2xl shadow-black/30 ${CARD_SIZE}`}
                            style={{
                                transform: `rotate(${card.angle}deg) translateY(calc(var(--r) * -1)) translate(-50%, -50%)`,
                            }}
                        >
                            <Image
                                src={card.image}
                                alt={card.alt}
                                fill
                                sizes="(min-width: 1024px) 200px, (min-width: 640px) 160px, 120px"
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Divider line */}
                <div
                    aria-hidden
                    className="absolute inset-y-0 left-1/2 z-20 w-px bg-linear-to-b from-transparent via-[#E8B84A] to-transparent z-40"
                />

                {/* Centre card: after (left half) / before (right half) */}
                <div
                    className={`absolute left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl shadow-2xl shadow-black/40 ${CARD_SIZE}`}
                    style={{ top: "8rem" }}
                >
                    <Image
                        src="/image/energy-before.webp"
                        alt="Client looking tense and holding her breath during a session"
                        fill
                        sizes="(min-width: 1024px) 200px, (min-width: 640px) 160px, 120px"
                        className="object-cover"
                    />
                    <Image
                        src="/image/energy-after.webp"
                        alt="The same client looking calm and at ease"
                        fill
                        sizes="(min-width: 1024px) 200px, (min-width: 640px) 160px, 120px"
                        className="object-cover [clip-path:inset(0_50%_0_0)]"
                    />
                </div>
            </div>

            {/* Closing statement */}
            <div className="relative z-10 -mt-6 flex flex-col items-center px-4 text-center sm:-mt-60">
                <CompassIcon className="h-14 w-14 sm:h-32 sm:w-32" />

                <p className="mt-4 max-w-2xl font-serif text-base italic leading-snug tracking-tight sm:text-2xl">
                    The goal isn&apos;t to become someone else.
                    <br />
                    It&apos;s to make it easier to be the person you already
                    know you can be.
                </p>
            </div>
        </section>
    );
}

function CompassIcon({ className = "" }: { className?: string }) {
    return (
        <svg
            aria-hidden
            viewBox="0 0 64 64"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <defs>
                <linearGradient id="compass-arrows" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#7DBB8A" />
                    <stop offset="1" stopColor="#F5B63A" />
                </linearGradient>
            </defs>
            <circle cx="32" cy="30" r="17" stroke="#fff" strokeWidth="1.5" />
            <circle cx="32" cy="30" r="11" stroke="#fff" strokeWidth="1.2" />
            <path
                d="M21 30c3-5 6.500-7.500 11-7.500S40 25 43 30c-3 5-6.500 7.500-11 7.500S24 35 21 30Z"
                stroke="#fff"
                strokeWidth="1.2"
            />
            <circle cx="32" cy="30" r="3" stroke="#fff" strokeWidth="1.2" />
            <path d="M32 8V4M28 5h8" stroke="#fff" strokeWidth="1.5" />
            <path
                d="M20 54c7 3.500 17 3.500 24 0M40 51.500l4 2.500-4.500 1.500M24 51.500 20 54l4.500 1.500"
                stroke="url(#compass-arrows)"
                strokeWidth="1.6"
            />
        </svg>
    );
}