"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/components/providers/SmoothScrollProvider";

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
    const sectionRef = useRef<HTMLElement>(null);
    const pinTriggerRef = useRef<ScrollTrigger | null>(null);
    const lenis = useLenis();

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        if (!section) return;

        const onUpdate = (self: ScrollTrigger) => {
            const i = Math.min(
                ITEMS.length - 1,
                Math.floor(self.progress * ITEMS.length),
            );
            setActive((prev) => (prev === i ? prev : i));
        };

        const mm = gsap.matchMedia();

        // Desktop: pin the section and switch tabs while scrolling.
        mm.add(
            "(prefers-reduced-motion: no-preference) and (min-width: 1024px)",
            () => {
                const st = ScrollTrigger.create({
                    trigger: section,
                    // If the section is taller than the viewport, pin once its bottom is visible.
                    start: () =>
                        section.offsetHeight <= window.innerHeight
                            ? "top top"
                            : "bottom bottom",
                    end: () => `+=${window.innerHeight * 1.5}`,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate,
                });
                pinTriggerRef.current = st;

                return () => {
                    st.kill();
                    pinTriggerRef.current = null;
                };
            },
        );

        // Mobile / tablet: no pin, tabs follow scroll progress through the section.
        mm.add(
            "(prefers-reduced-motion: no-preference) and (max-width: 1023px)",
            () => {
                const st = ScrollTrigger.create({
                    trigger: section,
                    start: "top 45%",
                    end: "bottom 75%",
                    onUpdate,
                });

                return () => st.kill();
            },
        );

        return () => mm.revert();
    }, []);

    // Clicking a tab: on desktop scroll to that step, otherwise just switch.
    const goTo = (i: number) => {
        const st = pinTriggerRef.current;
        if (!st) {
            setActive(i);
            return;
        }

        const y = st.start + ((i + 0.5) / ITEMS.length) * (st.end - st.start);

        if (lenis) {
            lenis.scrollTo(y, { duration: 1.2 });
        } else {
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <section
            ref={sectionRef}
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
                <div className="grid gap-4 md:grid-cols-2 md:gap-x-4 md:gap-y-10 lg:grid-cols-[repeat(3,minmax(0,410px))] lg:justify-center lg:gap-x-6 lg:gap-y-16">
                    {/* Heading */}
                    <h2 className="max-w-md font-serif text-3xl italic leading-[1.15] tracking-tight sm:text-4xl md:col-span-2 lg:col-span-2 lg:row-start-1 lg:max-w-175 lg:text-5xl">
                        Your conscious mind can want one thing while your
                        patterns keep pulling you somewhere else.
                    </h2>

                    {/* Tabs */}
                    <div className="flex w-full flex-col justify-between gap-10 md:col-span-2 md:w-full md:max-w-[410px] lg:col-span-1 lg:row-start-2">
                        <div
                            role="tablist"
                            aria-label="From what you want to the deeper pattern"
                            className="mt-4 grid grid-cols-1 gap-x-4 sm:grid-cols-3 md:mt-10 lg:grid-cols-1 lg:gap-x-0"
                        >
                            {ITEMS.map((item, i) => (
                                <Tab
                                    key={item.id}
                                    label={item.label}
                                    isActive={active === i}
                                    onActivate={() => goTo(i)}
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
                        <div className="relative mx-auto aspect-[410/620] w-full max-w-[260px] overflow-hidden rounded-2xl bg-black/20 shadow-2xl shadow-black/20 sm:max-w-[300px] md:mx-0 md:w-full md:max-w-[410px] md:aspect-[410/620]">
                            {ITEMS.map((item, i) => (
                                <Image
                                    key={item.id}
                                    src={item.image}
                                    alt={item.alt}
                                    fill
                                    priority={i === 0}
                                    sizes="(min-width: 1280px) 400px, (min-width: 1024px) 34vw, (min-width: 768px) 50vw, 300px"
                                    aria-hidden={active !== i}
                                    className={`object-cover object-top transition-[opacity,transform,filter] duration-700 motion-reduce:transition-none ${EASE} ${active === i
                                        ? "scale-100 opacity-100 blur-0"
                                        : "scale-105 opacity-0 blur-[2px]"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Quotes (left) + pendulum (right) on mobile; stacked from md up */}
                    <div className="mt-2 flex w-full flex-row items-center justify-between gap-4 md:col-start-2 md:row-start-3 md:mt-0 md:mb-10 md:w-full md:max-w-[410px] md:flex-col md:items-stretch md:gap-8 lg:col-start-3 lg:row-start-2">
                        <div className="order-2 flex h-20 w-20 shrink-0 items-center justify-center sm:h-24 sm:w-24 md:order-1 md:mt-10 md:h-14 md:w-14 lg:h-32 lg:w-32">
                            <Image
                                key={ITEMS[active].id}
                                src={ITEMS[active].pendulum}
                                alt=""
                                width={128}
                                height={128}
                                className="h-full w-full object-contain"
                            />
                        </div>

                        <div
                            aria-live="polite"
                            className="order-1 grid min-w-0 flex-1 font-serif text-lg leading-snug tracking-tight md:order-2 md:max-w-sm md:flex-none md:text-2xl"
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