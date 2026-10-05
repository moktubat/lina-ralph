"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const IMAGES = [
    {
        afterImage: "/image/energy-after-01.webp",
        beforeImage: "/image/energy-before-01.webp",
        altAfter: "Woman lying on the floor with a singing bowl beside her - calm state",
        altBefore: "Woman lying on the floor with a singing bowl beside her - tense state",
    },
    {
        afterImage: "/image/energy-after-02.webp",
        beforeImage: "/image/energy-before-02.webp",
        altAfter: "Woman resting on a cushion while a therapist holds a hand above her - relaxed",
        altBefore: "Woman resting on a cushion while a therapist holds a hand above her - stressed",
    },
    {
        afterImage: "/image/energy-after-03.webp",
        beforeImage: "/image/energy-before-03.webp",
        altAfter: "Woman with closed eyes relaxing in a calm room - peaceful",
        altBefore: "Woman with closed eyes relaxing in a calm room - anxious",
    },
    {
        afterImage: "/image/energy-after-04.webp",
        beforeImage: "/image/energy-before-04.webp",
        altAfter: "Woman seated cross-legged looking calm while a therapist stands behind her",
        altBefore: "Woman seated cross-legged looking tense while a therapist stands behind her",
    },
    {
        afterImage: "/image/energy-after-05.webp",
        beforeImage: "/image/energy-before-05.webp",
        altAfter: "Woman sitting cross-legged in a bright room, hands resting on her knees - at ease",
        altBefore: "Woman sitting cross-legged in a bright room, hands resting on her knees - uncomfortable",
    },
    {
        afterImage: "/image/energy-after-06.webp",
        beforeImage: "/image/energy-before-06.webp",
        altAfter: "Woman sitting on a woven cushion, eyes closed - serene",
        altBefore: "Woman sitting on a woven cushion, eyes closed - troubled",
    },
];

const CARD_COUNT = 12;
const STEP = 360 / CARD_COUNT;
const CARDS = Array.from({ length: CARD_COUNT }, (_, i) => ({
    id: i,
    angle: i * STEP,
    ...IMAGES[i % IMAGES.length],
}));

const CARD_SIZE = "h-60 w-44 sm:h-80 sm:w-56 lg:h-90 lg:w-67";
const ROTATION_DURATION = 80;

const getRadius = () =>
    Math.min(Math.max(window.innerWidth * 0.62, 520), 900);

function getClipPath(phi: number, cx: number, w: number, h: number): string {
    const cos = Math.cos(phi);
    const sin = Math.sin(phi);
    const f = (x: number, y: number) => cos * x - sin * y + cx;

    const hw = w / 2;
    const hh = h / 2;
    const rect: [number, number][] = [
        [-hw, -hh],
        [hw, -hh],
        [hw, hh],
        [-hw, hh],
    ];

    const out: [number, number][] = [];
    for (let i = 0; i < rect.length; i++) {
        const a = rect[i];
        const b = rect[(i + 1) % rect.length];
        const fa = f(a[0], a[1]);
        const fb = f(b[0], b[1]);

        if (fa < 0) out.push(a);
        if (fa < 0 !== fb < 0) {
            const t = fa / (fa - fb);
            out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
        }
    }

    if (out.length < 3) return "inset(0 100% 0 0)";
    return `polygon(${out
        .map(([x, y]) => `${(x + hw).toFixed(2)}px ${(y + hh).toFixed(2)}px`)
        .join(", ")})`;
}

export default function Transformation() {
    const galleryRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const afterRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const gallery = galleryRef.current;
        const ring = ringRef.current;
        if (!gallery || !ring) return;

        const state = { rotation: 0, radius: getRadius(), w: 0, h: 0 };

        const update = () => {
            const { rotation, radius, w, h } = state;
            if (w === 0 || h === 0) return;

            for (let i = 0; i < CARDS.length; i++) {
                const after = afterRefs.current[i];
                if (!after) continue;

                const phi = ((CARDS[i].angle + rotation) * Math.PI) / 180;
                const cx = radius * Math.sin(phi);
                after.style.clipPath = getClipPath(phi, cx, w, h);
            }
        };

        const measure = () => {
            const first = cardRefs.current[0];
            if (first) {
                state.w = first.offsetWidth;
                state.h = first.offsetHeight;
            }
            state.radius = getRadius();
            gallery.style.setProperty("--r", `${state.radius}px`);
            update();
        };

        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(gallery);

        let tween: gsap.core.Tween | undefined;
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            tween = gsap.to(state, {
                rotation: -360,
                duration: ROTATION_DURATION,
                ease: "none",
                repeat: -1,
                onUpdate: () => {
                    gsap.set(ring, { rotation: state.rotation });
                    update();
                },
            });
            return () => tween?.kill();
        });

        const io = new IntersectionObserver(
            ([e]) => (e.isIntersecting ? tween?.resume() : tween?.pause()),
            { rootMargin: "100px" },
        );
        io.observe(gallery);

        return () => {
            ro.disconnect();
            io.disconnect();
            mm.revert();
        };
    }, []);

    return (
        <section
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
                ref={galleryRef}
                className="relative -mt-4 h-136 overflow-hidden sm:h-152 lg:h-176"
                style={{ ["--r" as string]: "700px" }}
            >
                <div
                    aria-hidden
                    className="absolute inset-y-0 left-0 top-0 h-[450px] w-1/2 bg-gradient-to-r from-transparent to-[#E8E39A]/15"
                />

                <div
                    aria-hidden
                    className="absolute inset-y-0 right-0 top-0 h-[450px] w-1/2 bg-gradient-to-l from-transparent to-black/15"
                />

                <span className="absolute left-4 top-2 z-30 text-xl sm:left-20">
                    After
                </span>
                <span className="absolute right-4 top-2 z-30 text-xl sm:right-20">
                    Before
                </span>

                {/* Rotating ring: zero-size pivot at the circle's centre */}
                <div
                    ref={ringRef}
                    className="absolute left-1/2 z-10 h-0 w-0 will-change-transform"
                    style={{ top: "calc(var(--r) + 12rem)" }}
                >
                    {CARDS.map((card, index) => (
                        <div
                            key={card.id}
                            ref={(el) => {
                                cardRefs.current[index] = el;
                            }}
                            className={`absolute left-0 top-0 origin-top-left overflow-hidden rounded-2xl bg-black/20 shadow-2xl shadow-black/30 ${CARD_SIZE}`}
                            style={{
                                transform: `rotate(${card.angle}deg) translateY(calc(var(--r) * -1)) translate(-50%, -50%)`,
                            }}
                        >
                            {/* Before (base layer) */}
                            <Image
                                src={card.beforeImage}
                                alt={card.altBefore}
                                fill
                                loading="eager"
                                fetchPriority="low"
                                sizes="(min-width: 1024px) 268px, (min-width: 640px) 224px, 176px"
                                className="object-cover"
                            />
                            {/* After (overlay, clipped by wrapper) */}
                            <div
                                ref={(el) => {
                                    afterRefs.current[index] = el;
                                }}
                                className="absolute inset-0"
                                style={{ clipPath: "inset(0 100% 0 0)" }}
                            >
                                <Image
                                    src={card.afterImage}
                                    alt={card.altAfter}
                                    fill
                                    loading="eager"
                                    fetchPriority="low"
                                    sizes="(min-width: 1024px) 268px, (min-width: 640px) 224px, 176px"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Divider line */}
                <div
                    aria-hidden
                    className="absolute inset-y-0 left-1/2 z-20 w-px -translate-x-1/2 bg-linear-to-b from-transparent via-[#E8B84A] to-transparent"
                />
            </div>

            {/* Closing statement */}
            <div className="relative z-10 -mt-6 flex flex-col items-center px-4 text-center sm:-mt-60">
                <div className="flex h-20 w-20 items-center justify-center sm:h-32 sm:w-32">
                    <Image
                        src="/svg/compass.svg"
                        alt=""
                        width={80}
                        height={80}
                        className="object-contain"
                    />
                </div>

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