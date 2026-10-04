"use client";

import { useState } from "react";
import Image from "next/image";

const ITEMS = [
    {
        id: "want",
        label: "What you want?",
        image: "/image/pattern-want.webp",
        pendulum: "/svg/pendulum-want.svg",
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
        pendulum: "/svg/pendulum-happening.svg",
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
        pendulum: "/svg/pendulum-pattern.svg",
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
                <div className="grid gap-4 md:grid-cols-2 md:gap-x-4 md:gap-y-10 lg:grid-cols-[410px_410px_410px] lg:grid-rows-[auto_1fr] lg:gap-x-6 lg:gap-y-16">
                    {/* Heading */}
                    <h2 className="max-w-md font-serif text-3xl italic leading-[1.15] tracking-tight sm:text-4xl md:col-span-2 lg:col-span-2 lg:row-start-1 lg:max-w-175 lg:text-5xl">
                        Your conscious mind can want one thing while your
                        patterns keep pulling you somewhere else.
                    </h2>

                    {/* Tabs */}
                    <div className="flex w-[410px] flex-col justify-between gap-10 md:col-span-2 lg:col-span-1 lg:row-start-2">
                        <div
                            role="tablist"
                            aria-label="From what you want to the deeper pattern"
                            className="mt-10 grid grid-cols-1 gap-x-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-x-0"
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

                        <div className="hidden h-24 w-24 items-center justify-center lg:flex">
                            <Image
                                src="/svg/head.svg"
                                alt=""
                                width={96}
                                height={96}
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Image */}
                    <div className="md:col-start-1 lg:col-start-2 lg:row-start-2">
                        <div className="relative h-[620px] w-[410px] overflow-hidden rounded-2xl bg-black/20 shadow-2xl shadow-black/20">
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
                    <div className="mb-10 flex w-[410px] flex-col justify-between gap-8 md:col-start-2 md:row-start-3 lg:col-start-3 lg:row-start-2">
                        <div className="mt-10 hidden h-14 w-14 items-center justify-center md:flex lg:h-32 lg:w-32">
                            <Image
                                src={ITEMS[active].pendulum}
                                alt=""
                                width={128}
                                height={128}
                                className="object-contain"
                            />
                        </div>

                        <div
                            aria-live="polite"
                            className="grid max-w-sm font-serif text-lg leading-snug tracking-tight md:text-2xl"
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
                        ? "text-xl text-white sm:text-2xl"
                        : "text-base text-white/55 group-hover:text-white/80 sm:text-lg"
                    }`}
            >
                {label}
            </span>

            <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px bg-white/20"
            />

            <span
                aria-hidden
                className={`absolute inset-x-0 bottom-0 h-px origin-left bg-linear-to-r from-[#F5B63A] to-[#7DBB8A] transition-transform duration-700 motion-reduce:transition-none ${EASE} ${isActive ? "scale-x-100" : "scale-x-0"
                    }`}
            />
        </button>
    );
}
