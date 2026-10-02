"use client";

import { useState } from "react";
import Image from "next/image";

const ITEMS = [
    {
        id: "want",
        label: "What you want?",
        image: "/image/pattern-want.webp",
        alt: "Therapist playing a singing bowl over a woman resting on a cushion",
        quotes: [
            "I want to feel calm.",
            "I want to stop overthinking.",
            "I want confidence.",
            "I want to sleep better.",
        ],
    },
    {
        id: "happening",
        label: "What keeps happening?",
        image: "/image/pattern-happening.webp",
        alt: "Woman sitting alone by a window, lost in thought",
        quotes: [
            "I react before I can think.",
            "I say yes when I mean no.",
            "I promise myself this time is different.",
            "I end up back in the same place.",
        ],
    },
    {
        id: "pattern",
        label: "The deeper pattern",
        image: "/image/pattern-deeper.webp",
        alt: "Client relaxing with closed eyes during a hypnotherapy session",
        quotes: [
            "Part of me still feels unsafe.",
            "It learned this a long time ago.",
            "It has been protecting me ever since.",
            "It doesn't know the danger has passed.",
        ],
    },
];

const EASE = "ease-[cubic-bezier(.22,1,.36,1)]";

export default function DeeperPattern() {
    const [active, setActive] = useState(0);

    return (
        <section
            className="relative w-full overflow-hidden rounded-b-4xl text-white sm:rounded-b-[48px] lg:rounded-b-[64px]"
            style={{
                background: `
                    radial-gradient(ellipse 55% 35% at 0% 100%, #5F6A34 0%, transparent 70%),
                    radial-gradient(ellipse 55% 35% at 100% 100%, #575624 0%, transparent 70%),
                    linear-gradient(to bottom, #2E3C20 0%, #2E3C20 55%, #334123 100%)
                `,
            }}
        >
            <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-24">
                <div className="grid gap-4 md:grid-cols-2 md:gap-x-4 md:gap-y-6 lg:grid-cols-[1fr_1.15fr_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-6 lg:gap-y-6">
                    {/* Heading */}
                    <h2 className="max-w-md font-serif text-3xl italic leading-[1.15] tracking-tight sm:text-4xl md:col-span-2 lg:col-span-2 lg:row-start-1 lg:max-w-175 lg:text-5xl">
                        Your conscious mind can want one thing while your
                        patterns keep pulling you somewhere else.
                    </h2>

                    {/* Tabs */}
                    <div className="flex flex-col justify-between gap-10 md:col-span-2 lg:col-span-1 lg:row-start-2">
                        <div
                            role="tablist"
                            aria-label="From what you want to the deeper pattern"
                            className="grid grid-cols-1 gap-x-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-x-0"
                        >
                            {ITEMS.map((item, i) => (
                                <Tab
                                    key={item.id}
                                    label={item.label}
                                    isActive={active === i}
                                    onActivate={() => setActive(i)}
                                />
                            ))}
                        </div>

                        <HeadIcon className="hidden h-16 w-16 text-white/90 lg:block" />
                    </div>

                    {/* Image */}
                    <div className="md:col-start-1 lg:col-start-2 lg:row-start-2">
                        <div className="relative mx-auto aspect-4/5 w-full max-w-md overflow-hidden rounded-2xl bg-black/20 shadow-2xl shadow-black/20 lg:aspect-auto lg:h-[450px] lg:max-w-[360px]">
                            {ITEMS.map((item, i) => (
                                <Image
                                    key={item.id}
                                    src={item.image}
                                    alt={item.alt}
                                    fill
                                    priority={i === 0}
                                    sizes="(min-width: 1280px) 400px, (min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw"
                                    aria-hidden={active !== i}
                                    className={`object-cover object-top transition-[opacity,transform,filter] duration-700 motion-reduce:transition-none ${EASE} ${active === i
                                        ? "scale-100 opacity-100 blur-0"
                                        : "scale-105 opacity-0 blur-[2px]"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Pendulum + quotes */}
                    <div className="flex flex-col justify-between gap-8 md:col-start-2 md:row-start-3 lg:col-start-3 lg:row-start-2">
                        <PendulumIcon className="ml-auto hidden h-14 w-14 md:block lg:h-16 lg:w-16" />

                        <div
                            aria-live="polite"
                            className="grid max-w-sm font-serif text-lg italic leading-snug tracking-tight sm:text-xl lg:text-lg xl:text-xl"
                        >
                            {ITEMS.map((item, i) => (
                                <ul
                                    key={item.id}
                                    aria-hidden={active !== i}
                                    className="col-start-1 row-start-1 space-y-1"
                                >
                                    {item.quotes.map((quote, q) => (
                                        <li
                                            key={quote}
                                            className={`transition-[opacity,transform] duration-700 motion-reduce:transition-none ${EASE} ${active === i
                                                ? "translate-y-0 opacity-100"
                                                : "translate-y-2 opacity-0"
                                                }`}
                                            style={{
                                                transitionDelay:
                                                    active === i
                                                        ? `${150 + q * 90}ms`
                                                        : "0ms",
                                            }}
                                        >
                                            &ldquo;{quote}&rdquo;
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Tab({
    label,
    isActive,
    onActivate,
}: {
    label: string;
    isActive: boolean;
    onActivate: () => void;
}) {
    return (
        <button
            type="button"
            role="tab"
            aria-selected={isActive}
            onMouseEnter={onActivate}
            onFocus={onActivate}
            onClick={onActivate}
            className="group relative w-full py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#E8E39A]/70 sm:py-4"
        >
            <span
                className={`block transition-[color,font-size] duration-500 motion-reduce:transition-none ${EASE} ${isActive
                    ? "text-lg text-white sm:text-xl"
                    : "text-sm text-white/55 group-hover:text-white/80 sm:text-base"
                    }`}
            >
                {label}
            </span>

            {/* base line */}
            <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px bg-white/20"
            />
            {/* active line */}
            <span
                aria-hidden
                className={`absolute inset-x-0 bottom-0 h-px origin-left bg-linear-to-r from-[#F5B63A] to-[#7DBB8A] transition-transform duration-700 motion-reduce:transition-none ${EASE} ${isActive ? "scale-x-100" : "scale-x-0"
                    }`}
            />
        </button>
    );
}

function HeadIcon({ className = "" }: { className?: string }) {
    return (
        <svg
            aria-hidden
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <defs>
                <linearGradient id="head-spiral" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#F5B63A" />
                    <stop offset="1" stopColor="#7DBB8A" />
                </linearGradient>
            </defs>
            <path d="M14 30c0-11 8-19 18-19s18 8 18 19" />
            <rect x="9" y="28" width="7" height="12" rx="3" />
            <rect x="48" y="28" width="7" height="12" rx="3" />
            <path d="M18 30v10c0 8 6 14 14 14s14-6 14-14V30" />
            <path d="M28 54v6h8v-6" />
            <path
                d="M32 42c-4 0-7-3-7-6.5S28 29 32 29s6 2.6 6 5.5S35.5 39 32 39s-3.5-1.7-3.5-3.5"
                stroke="url(#head-spiral)"
                strokeWidth="2.2"
            />
        </svg>
    );
}

function PendulumIcon({ className = "" }: { className?: string }) {
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
                <linearGradient id="pendulum" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#7DBB8A" />
                    <stop offset="1" stopColor="#F5B63A" />
                </linearGradient>
            </defs>
            <circle cx="52" cy="8" r="3.5" stroke="#fff" strokeWidth="1.5" />
            <path d="M49.5 10.5 36 26" stroke="#fff" strokeWidth="1.5" />
            <path
                d="M36 24 46 34 30 60 14 42Z"
                stroke="url(#pendulum)"
                strokeWidth="1.8"
            />
            <path
                d="M14 42h32M36 24 30 60M46 34 30 42"
                stroke="url(#pendulum)"
                strokeWidth="1.2"
                opacity=".7"
            />
        </svg>
    );
}