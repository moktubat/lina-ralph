"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const TESTIMONIALS = [
    {
        id: "sara",
        name: "Sara Tomb",
        avatar: "/image/testimonial-1.webp",
        quote: "The atelier answered every question personally. Rare, and quite lovely.",
    },
    {
        id: "daniel",
        name: "Daniel Reyes",
        avatar: "/image/testimonial-2.webp",
        quote: "I stopped bracing for the same argument. Something quietly shifted.",
    },
    {
        id: "maya",
        name: "Maya Chen",
        avatar: "/image/testimonial-3.webp",
        quote: "Lina never pushed. She simply asked better questions than I had.",
    },
    {
        id: "tom",
        name: "Tom Alder",
        avatar: "/image/testimonial-4.webp",
        quote: "Sleep came back first. Then the overthinking grew much quieter.",
    },
    {
        id: "priya",
        name: "Priya Nair",
        avatar: "/image/testimonial-5.webp",
        quote: "It felt like a conversation, not treatment. I left lighter every time.",
    },
];

const EASE = "ease-[cubic-bezier(.22,1,.36,1)]";
const INTERVAL = 6000;

export default function Testimonials() {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const t = setTimeout(
            () => setActive((i) => (i + 1) % TESTIMONIALS.length),
            INTERVAL,
        );
        return () => clearTimeout(t);
    }, [active, paused]);

    return (
        <section
            className="relative w-full overflow-hidden rounded-t-4xl text-white sm:rounded-t-[48px] lg:rounded-t-[64px]"
            style={{
                background: `
                    radial-gradient(ellipse 60% 35% at 0% 100%, #5F6A34 0%, transparent 70%),
                    radial-gradient(ellipse 60% 35% at 100% 100%, #6E6A26 0%, transparent 70%),
                    linear-gradient(to bottom, #2E3C20 0%, #2E3C20 60%, #334123 100%)
                `,
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
        >
            <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:py-20 lg:py-24">
                <h2 className="mx-auto max-w-xl text-center font-serif text-3xl italic leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
                    Don&apos;t just take Lina&apos;s word for it.
                </h2>

                <div
                    aria-live="polite"
                    className="mx-auto mt-10 grid max-w-xl sm:mt-12"
                >
                    {TESTIMONIALS.map((t, i) => (
                        <figure
                            key={t.id}
                            aria-hidden={active !== i}
                            className={`col-start-1 row-start-1 flex flex-col items-center text-center transition-[opacity,transform] duration-700 motion-reduce:transition-none ${EASE} ${active === i
                                ? "translate-y-0 opacity-100"
                                : "pointer-events-none translate-y-2 opacity-0"
                                }`}
                        >
                            <span className="relative h-16 w-16 overflow-hidden rounded-full border border-white/70">
                                <Image
                                    src={t.avatar}
                                    alt=""
                                    fill
                                    sizes="48px"
                                    className="object-cover"
                                />
                            </span>

                            <Stars />

                            <blockquote className="mt-4 max-w-md text-lg font-light leading-snug sm:text-2xl">
                                &ldquo;{t.quote}&rdquo;
                            </blockquote>

                            <span
                                aria-hidden
                                className="mt-3 h-0.5 w-100 bg-linear-to-r from-transparent via-white/40 to-transparent"
                            />
                            <figcaption className="mt-3 text-base text-white/80">
                                {t.name}
                            </figcaption>
                        </figure>
                    ))}
                </div>

                <div
                    role="tablist"
                    aria-label="Choose a testimonial"
                    className="mt-2 flex items-center justify-center gap-1.5"
                >
                    {TESTIMONIALS.map((t, i) => (
                        <button
                            key={t.id}
                            type="button"
                            role="tab"
                            aria-selected={active === i}
                            aria-label={`Testimonial from ${t.name}`}
                            onClick={() => setActive(i)}
                            className={`h-2 rounded-full outline-none transition-[width,background-color] duration-500 focus-visible:ring-2 focus-visible:ring-[#E8E39A]/70 motion-reduce:transition-none ${EASE} ${active === i
                                ? "w-6 bg-white"
                                : "w-2 bg-white/40 hover:bg-white/70"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function Stars() {
    return (
        <span
            role="img"
            aria-label="5 out of 5 stars"
            className="mt-3 flex gap-1 text-[#F5A511]"
        >
            {[0, 1, 2, 3, 4].map((n) => (
                <svg
                    key={n}
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                >
                    <path d="m12 2 2.900 6.300 6.900.8-5.100 4.700 1.400 6.800L12 17.200 5.900 20.600l1.400-6.800L2.200 9.100l6.900-.8L12 2Z" />
                </svg>
            ))}
        </span>
    );
}