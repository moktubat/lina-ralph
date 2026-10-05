"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "@/components/ui/Button";

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.from(headlineRef.current, {
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                });

                gsap.from(cardRef.current, {
                    y: 30,
                    opacity: 0,
                    duration: 1,
                    delay: 0.3,
                    ease: "power3.out",
                });
            });

            return () => mm.revert();
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="relative min-h-dvh w-full overflow-hidden px-4 pt-40 pb-10 sm:pb-14 md:pb-16"
        >
            <Image
                src="/image/heroBg.webp"
                alt="Client receiving a calming hypnotherapy session"
                fill
                priority
                className="-z-10 object-cover object-center"
            />

            <div className="absolute inset-0 -z-10 bg-black/20" />

            <div className="mx-auto flex min-h-[calc(100dvh-7rem)] w-full max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:items-end lg:gap-12">
                <h1
                    ref={headlineRef}
                    className="max-w-xl self-start font-serif tracking-tight text-4xl italic leading-[1.1] text-white sm:max-w-xl sm:text-5xl md:max-w-152 md:text-6xl"
                >
                    You&apos;ve tried to change it. So why does it keep coming
                    back?
                </h1>

                <div
                    ref={cardRef}
                    className="w-full max-w-sm self-end rounded-xl bg-linear-to-b from-[#2F200D]/90 via-[#2F200D]/50 to-transparent p-6 text-white backdrop-blur-xs sm:max-w-md sm:p-6 lg:max-w-130"
                >
                    <div className="mb-4 flex items-center gap-2 text-base font-medium">
                        <MoonIcon />
                        <span>Sleep &amp; relaxation</span>
                    </div>

                    <p className="mb-4 text-sm leading-relaxed text-white font-light sm:text-base">
                        &ldquo;Lina transformed my life with her incredible
                        hypnotherapy skills. I finally broke free from the
                        patterns that held me back!&rdquo;
                    </p>

                    <div className="mb-6 flex items-center gap-3">
                        <span className="relative h-10 w-10 overflow-hidden rounded-full border border-white">
                            <Image
                                src="/image/avatar-sara.png"
                                alt=""
                                fill
                                className="object-cover"
                            />
                        </span>

                        <span className="text-sm font-medium">
                            Sara Staphen
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Button
                            variant="primary"
                            href="#contact"
                            avatarSrc="/image/avatar-lina.png"
                        >
                            Book a free consultation
                        </Button>

                        <Button variant="outline" href="#process">
                            See how it works
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function MoonIcon() {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
    );
}