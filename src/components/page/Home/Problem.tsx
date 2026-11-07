"use client";

import { useRef, useState, memo } from "react";
import Image from "next/image";
import {
    FINE_POINTER,
    gsap,
    NO_REDUCED_MOTION,
    prefersReducedMotion,
    ScrollTrigger,
    useGSAP,
} from "@/lib/gsap";

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

const MARQUEE_STYLE: React.CSSProperties = {
    maskImage:
        "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
    WebkitMaskImage:
        "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
    background: `
      radial-gradient(ellipse at 50% 0%, #EFEDE9 0%, transparent 50%),
      radial-gradient(ellipse at 50% 100%, #F4F2EE 0%, transparent 50%),
      radial-gradient(ellipse at 25% 20%, #DEDFDC 0%, transparent 40%),
      radial-gradient(ellipse at 75% 20%, #DEDFDC 0%, transparent 40%),
      radial-gradient(ellipse at 25% 80%, #E8E8E4 0%, transparent 40%),
      radial-gradient(ellipse at 75% 80%, #E8E8E4 0%, transparent 40%),
      linear-gradient(to bottom right, #E3E5E2, #F1F0EC)
    `,
};

export default function Problem() {
    const [hovered, setHovered] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(NO_REDUCED_MOTION, () => {
                gsap.from("[data-problem-head] > *", {
                    y: 30,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: "[data-problem-head]",
                        start: "top 85%",
                        once: true,
                    },
                });

                gsap.from("[data-problem-card]", {
                    y: 48,
                    opacity: 0,
                    duration: 1.1,
                    ease: "power3.out",
                    stagger: 0.15,
                    clearProps: "opacity",
                    scrollTrigger: {
                        trigger: "[data-problem-cards]",
                        start: "top 85%",
                        once: true,
                    },
                });
            });
        },
        { scope: sectionRef },
    );

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden bg-[#F4F2EE]"
        >
            <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:py-20 lg:py-24">
                <div
                    data-problem-head
                    className="mx-auto max-w-2xl text-center"
                >
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

                <div
                    data-problem-cards
                    className="mt-10 flex flex-col gap-4 sm:mt-12 md:flex-row md:items-end md:gap-4 lg:gap-6"
                >
                    {CARDS.map((card, i) => (
                        <Card
                            key={card.id}
                            {...card}
                            isActive={i === 1 || hovered === i}
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
    onActivate: () => void;
    onDeactivate: () => void;
};

const CARD_EASE = "power4.out";
const CARD_DURATION = 0.7;
const TILT_MAX = 4;

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
    const articleRef = useRef<HTMLElement>(null);
    const imageWrapRef = useRef<HTMLDivElement>(null);
    const washOffRef = useRef<HTMLDivElement>(null);
    const washOnRef = useRef<HTMLDivElement>(null);
    const descRef = useRef<HTMLDivElement>(null);

    const [initial] = useState(isActive);
    const prevActive = useRef(isActive);

    const shape = useRef({
        ratio: initial ? 16 / 8.5 : 2.4,
        radius: initial ? 80 : 100,
    });

    // Active <-> inactive state change (aspect ratio, radius, washes, copy).
    useGSAP(
        () => {
            if (prevActive.current === isActive) return;
            prevActive.current = isActive;

            const d = prefersReducedMotion() ? 0 : CARD_DURATION;
            const vars = { duration: d, ease: CARD_EASE, overwrite: "auto" as const };

            gsap.to(shape.current, {
                ratio: isActive ? 16 / 8.5 : 2.4,
                radius: isActive ? 80 : 100,
                duration: d,
                ease: CARD_EASE,
                overwrite: true,
                onUpdate: () => {
                    const el = imageWrapRef.current;
                    if (!el) return;
                    el.style.aspectRatio = String(shape.current.ratio);
                    el.style.borderRadius = `${shape.current.radius}px`;
                },
            });
            gsap.to(washOffRef.current, { opacity: isActive ? 0 : 1, ...vars });
            gsap.to(washOnRef.current, { opacity: isActive ? 1 : 0, ...vars });
            gsap.to(descRef.current, {
                height: isActive ? "auto" : 0,
                opacity: isActive ? 1 : 0,
                ...vars,
            });
        },
        { scope: articleRef, dependencies: [isActive] },
    );

    // 3D tilt following the pointer (mouse only).
    useGSAP(
        () => {
            const el = articleRef.current;
            if (!el) return;

            const mm = gsap.matchMedia();
            mm.add(`${NO_REDUCED_MOTION} and ${FINE_POINTER}`, () => {
                const move = (e: PointerEvent) => {
                    const r = el.getBoundingClientRect();
                    const px = (e.clientX - r.left) / r.width - 0.5;
                    const py = (e.clientY - r.top) / r.height - 0.5;
                    gsap.to(el, {
                        rotationY: px * TILT_MAX * 2,
                        rotationX: -py * TILT_MAX * 2,
                        transformPerspective: 900,
                        duration: 0.6,
                        ease: "power3.out",
                        overwrite: "auto",
                    });
                };
                const reset = () =>
                    gsap.to(el, {
                        rotationX: 0,
                        rotationY: 0,
                        duration: 0.9,
                        ease: "power3.out",
                        overwrite: "auto",
                    });

                el.addEventListener("pointermove", move);
                el.addEventListener("pointerleave", reset);
                return () => {
                    el.removeEventListener("pointermove", move);
                    el.removeEventListener("pointerleave", reset);
                };
            });
        },
        { scope: articleRef },
    );

    return (
        <article
            ref={articleRef}
            data-problem-card
            tabIndex={0}
            aria-current={isActive}
            onMouseEnter={onActivate}
            onMouseLeave={onDeactivate}
            onFocus={onActivate}
            onClick={onActivate}
            className="
                relative flex min-w-0 flex-1 cursor-pointer overflow-hidden
                rounded-2xl bg-white p-4 outline-none
                focus-visible:ring-2 focus-visible:ring-[#5C4B36]
                sm:p-5
            "
        >
            {/* inactive wash */}
            <div
                ref={washOffRef}
                aria-hidden
                style={{ opacity: initial ? 0 : 1 }}
                className="pointer-events-none absolute inset-x-0 top-0 h-3/5 bg-linear-to-b from-[#E3E3E0] to-transparent"
            />

            {/* active wash */}
            <div
                ref={washOnRef}
                aria-hidden
                style={{ opacity: initial ? 1 : 0 }}
                className="pointer-events-none absolute inset-x-0 top-0 h-3/5 bg-linear-to-b from-[#E8E39A] via-[#C3D98F]/70 to-transparent"
            />

            <div className="relative z-10 flex w-full flex-col">
                <span className="block font-serif text-2xl italic text-[#1C1B17]">
                    {id}
                </span>

                {/* IMAGE */}
                <div
                    ref={imageWrapRef}
                    style={{
                        aspectRatio: initial ? 16 / 8.5 : 2.4,
                        borderRadius: initial ? 80 : 100,
                    }}
                    className="relative mx-auto mt-4 w-full overflow-hidden sm:mt-5"
                >
                    <Image
                        src={image}
                        alt={alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw"
                        className="object-cover"
                    />
                </div>

                {/* TITLE */}
                <h3 className="mt-5 text-base font-semibold leading-snug tracking-tight text-[#1C1B17] sm:mt-6 sm:text-2xl">
                    {title}
                </h3>

                {/* DESCRIPTION */}
                <div
                    ref={descRef}
                    style={{
                        height: initial ? "auto" : 0,
                        opacity: initial ? 1 : 0,
                    }}
                    className="overflow-hidden"
                >
                    <p className="pt-2 text-xs leading-relaxed tracking-tight text-[#1C1B17]/70 sm:text-base">
                        {description}
                    </p>
                </div>
            </div>
        </article>
    );
}

const Marquee = memo(function Marquee() {
    const rootRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const track = trackRef.current;
            const root = rootRef.current;
            if (!track || !root) return;

            const mm = gsap.matchMedia();
            mm.add(NO_REDUCED_MOTION, () => {
                const SPEED = 150;
                const setX = gsap.quickSetter(track, "x", "px");
                let width = track.scrollWidth / 3;
                let pos = 0;
                let vel = -SPEED;
                let target = -SPEED;

                // marquee can never drift out of sync with smooth scrolling.
                const tick = (_time: number, deltaMs: number) => {
                    const dt = Math.min(deltaMs, 32) / 1000;
                    vel += (target - vel) * (1 - Math.exp(-dt * 7.7));
                    pos += vel * dt;
                    setX(gsap.utils.wrap(-width, 0, pos));
                };

                // Scroll direction steers the marquee direction.
                const dirTrigger = ScrollTrigger.create({
                    start: 0,
                    end: "max",
                    onUpdate: (self) => {
                        target = self.direction === 1 ? -SPEED : SPEED;
                    },
                });

                // Star: spin + soft pulse (replaces the CSS spin animation).
                const stars = root.querySelectorAll("[data-star]");
                const starTweens = [
                    gsap.to(stars, {
                        rotation: 360,
                        duration: 8,
                        ease: "none",
                        repeat: -1,
                    }),
                    gsap.fromTo(
                        stars,
                        { scale: 1 },
                        {
                            scale: 1.12,
                            duration: 1.6,
                            ease: "sine.inOut",
                            yoyo: true,
                            repeat: -1,
                        },
                    ),
                ];

                // Only run while the marquee is on screen.
                const visibility = ScrollTrigger.create({
                    trigger: root,
                    start: "top bottom",
                    end: "bottom top",
                    onToggle: (self) => {
                        if (self.isActive) {
                            gsap.ticker.add(tick);
                            starTweens.forEach((t) => t.resume());
                        } else {
                            gsap.ticker.remove(tick);
                            starTweens.forEach((t) => t.pause());
                        }
                    },
                });

                const ro = new ResizeObserver(() => {
                    width = track.scrollWidth / 3;
                });
                ro.observe(track);

                return () => {
                    gsap.ticker.remove(tick);
                    ro.disconnect();
                    dirTrigger.kill();
                    visibility.kill();
                    starTweens.forEach((t) => t.kill());
                };
            });
        },
        { scope: rootRef },
    );

    return (
        <div
            ref={rootRef}
            className="flex select-none overflow-hidden py-4 md:py-8"
            style={MARQUEE_STYLE}
            aria-label="You are not broken. You may simply be working at the wrong level."
        >
            <div className="flex min-w-full shrink-0 overflow-hidden">
                <div ref={trackRef} className="flex shrink-0 items-center will-change-transform">
                    {[0, 1, 2].map((n) => (
                        <div key={n} className="flex shrink-0 items-center">
                            <span className="whitespace-nowrap font-serif text-xl tracking-tight text-[#3B3C39] sm:text-2xl lg:text-4xl">
                                You are not broken. You may simply be working at the wrong level.
                            </span>
                            <Image
                                data-star
                                src="/svg/star.svg"
                                alt=""
                                width={36}
                                height={36}
                                className="mx-4 h-6 w-6 shrink-0 sm:mx-7 sm:h-8 sm:w-8 lg:mx-10 lg:h-12 lg:w-12"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});
