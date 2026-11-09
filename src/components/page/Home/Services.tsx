"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    FINE_POINTER,
    gsap,
    NO_REDUCED_MOTION,
    useGSAP,
} from "@/lib/gsap";

const SERVICES = [
    {
        id: "01",
        title: "Anxiety & overthinking",
        image: "/image/service-01.webp",
        alt: "Woman with closed eyes while a therapist rests a hand on her forehead",
        className: "md:row-span-2 md:col-span-1 md:h-[480px]",
    },
    {
        id: "02",
        title: "Confidence & self-belief",
        image: "/image/service-02.webp",
        alt: "Woman sitting calmly with eyes closed while Lina stands behind her",
        className: "md:row-span-2 md:col-span-1 md:h-[480px]",
    },
    {
        id: "03",
        title: "Stress & emotional overload",
        image: "/image/service-03.webp",
        alt: "Man lying down while a therapist places a hand near his head",
        className: "md:col-span-2 md:h-[232px]",
    },
    {
        id: "04",
        title: "Habits & unwanted patterns",
        image: "/image/service-04.webp",
        alt: "Woman lying on a mat as a therapist kneels beside her",
        className: "md:col-span-2 md:h-[232px]",
    },
    {
        id: "05",
        title: "Fears & phobias",
        image: "/image/service-05.webp",
        alt: "Therapist holding a hand above a person resting on a cushion",
        className: "md:col-span-2 md:h-[232px]",
    },
];

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add(NO_REDUCED_MOTION, () => {
                gsap.from("[data-services-head] > *", {
                    y: 30,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: "[data-services-head]",
                        start: "top 85%",
                        once: true,
                    },
                });

                gsap.from("[data-service]", {
                    scale: 0.9,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    stagger: { each: 0.1, from: "start" },
                    clearProps: "opacity,transform",
                    scrollTrigger: {
                        trigger: "[data-services-grid]",
                        start: "top 85%",
                        once: true,
                    },
                });
            });

            mm.add(`${NO_REDUCED_MOTION} and ${FINE_POINTER}`, () => {
                const cleanups: (() => void)[] = [];

                gsap.utils.toArray<HTMLElement>("[data-service-hover]").forEach((card) => {
                    const img = card.querySelector("[data-service-img]");
                    const label = card.querySelector("[data-service-label]");
                    const num = card.querySelector("[data-service-num]");

                    // Natural hover in
                    const enter = () => {
                        gsap.to(img, {
                            scale: 1.045,
                            duration: 1.4,
                            ease: "power2.out",
                            overwrite: "auto",
                        });

                        gsap.to(label, {
                            y: -5,
                            duration: 0.85,
                            ease: "power3.out",
                            overwrite: "auto",
                        });

                        gsap.to(num, {
                            y: 3,
                            duration: 0.9,
                            ease: "power2.out",
                            overwrite: "auto",
                        });
                    };

                    // Soft natural return
                    const leave = () => {
                        gsap.to(img, {
                            scale: 1,
                            duration: 1.6,
                            ease: "power2.inOut",
                            overwrite: "auto",
                        });

                        gsap.to(label, {
                            y: 0,
                            duration: 1.1,
                            ease: "power2.inOut",
                            overwrite: "auto",
                        });

                        gsap.to(num, {
                            y: 0,
                            duration: 1,
                            ease: "power2.inOut",
                            overwrite: "auto",
                        });
                    };

                    card.addEventListener("pointerenter", enter);
                    card.addEventListener("pointerleave", leave);

                    cleanups.push(() => {
                        card.removeEventListener("pointerenter", enter);
                        card.removeEventListener("pointerleave", leave);
                        gsap.killTweensOf([img, label, num]);
                    });
                });

                return () => cleanups.forEach((fn) => fn());
            });
        },
        { scope: sectionRef },
    );

    return (
        <section
            ref={sectionRef}
            id="services"
            className="w-full bg-[#F4F2EE]"
        >
            <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:py-20 lg:py-24">
                <div
                    data-services-head
                    className="mx-auto max-w-xl text-center"
                >
                    <h2 className="font-serif text-3xl font-medium italic leading-[1.1] tracking-tight text-[#1C1B17] sm:text-4xl md:text-5xl">
                        What are you ready to change?
                    </h2>
                    <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#1C1B17]/70">
                        A consultation is a space to talk about what has been
                        difficult—and whether this approach feels like the
                        right fit.
                    </p>
                </div>

                <ul
                    data-services-grid
                    className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 md:grid-cols-4 md:auto-rows-58 md:gap-4"
                >
                    {SERVICES.map((s) => (
                        <li
                            key={s.id}
                            data-service
                            data-service-hover
                            className={`relative overflow-hidden rounded-2xl h-64 ${s.className}`}
                        >
                            <Image
                                data-service-img
                                src={s.image}
                                alt={s.alt}
                                fill
                                sizes="(min-width: 768px) 50vw, 100vw"
                                className="object-cover"
                            />

                            <div
                                aria-hidden
                                className="absolute inset-x-0 bottom-0 h-25 backdrop-blur-lg"
                                style={{
                                    maskImage:
                                        "linear-gradient(to top, black 0%, rgba(0,0,0,0.7) 50%, transparent 100%)",
                                    WebkitMaskImage:
                                        "linear-gradient(to top, black 0%, rgba(0,0,0,0.7) 50%, transparent 100%)",
                                }}
                            />

                            <span
                                data-service-num
                                className="absolute left-4 top-3 font-serif text-lg md:text-2xl italic text-white"
                            >
                                {s.id}
                            </span>
                            <h3
                                data-service-label
                                className="absolute bottom-4 left-4 right-4 text-lg  text-white md:text-[22px]"
                            >
                                {s.title}
                            </h3>
                        </li>
                    ))}

                    {/* 06 – text card */}
                    <li
                        data-service
                        className="relative flex h-64 flex-col overflow-hidden rounded-2xl bg-white bg-cover bg-center p-5 md:col-span-2 md:h-58"
                        style={{
                            backgroundImage: "url('/image/card-bg.png')",
                        }}
                    >
                        <span className="font-serif text-lg italic text-[#1C1B17] md:text-2xl">
                            06
                        </span>
                        <h3 className="mt-auto text-lg font-semibold text-[#1C1B17] md:text-[22px]">
                            Sleep &amp; relaxation
                        </h3>
                        <p className="my-2 text-sm leading-relaxed text-[#1C1B17]/80">
                            When it is difficult to let your body and mind
                            settle.
                        </p>

                        <Link
                            href="#contact"
                            aria-label="Talk about sleep and relaxation"
                            className="mt-5 grid h-9 w-9 place-items-center rounded-md text-[#1C1B17] shadow-lg shadow-orange-500/20 transition-transform duration-300 hover:scale-105"
                            style={{
                                background:
                                    "linear-gradient(135deg, #FFB627, #F8A91A 60%, #FFDD8A)",
                            }}
                        >
                            <svg
                                aria-hidden
                                viewBox="0 0 24 24"
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    );
}

