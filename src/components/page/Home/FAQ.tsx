
"use client";

import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";

// ─── Data
const FAQS = [
    {
        id: "what",
        question: "What is hypnotherapy?",
        answer:
            "Hypnotherapy uses focused attention and guided techniques to help you explore the patterns, responses, and beliefs connected to what you are experiencing. It is collaborative, and each session is shaped around your goals.",
    },
    {
        id: "stage",
        question: "Is hypnotherapy the same as stage hypnosis?",
        answer:
            "No. Stage hypnosis is entertainment, while hypnotherapy is a private, respectful process designed to support meaningful personal change. You remain in charge of what you share and what you do throughout each session.",
    },
    {
        id: "control",
        question: "Will I be awake and in control?",
        answer:
            "Yes. You stay aware throughout, can speak at any point, and can stop the session whenever you choose. Most people describe it as a deeply relaxed and focused state where they remain comfortable and in control.",
    },
    {
        id: "sessions",
        question: "How many sessions will I need?",
        answer:
            "It depends on what you want to change. Many people notice a shift within a few sessions, while others may benefit from more time and support. In your consultation, Lina will help you understand what feels realistic.",
    },
    {
        id: "format",
        question: "Are sessions online or in person?",
        answer:
            "Both are available. Online sessions work well from a quiet, comfortable space at home, while in-person sessions take place at Lina's studio. You can choose the setting that feels most natural and supportive for you.",
    },
    {
        id: "medical",
        question: "Can hypnotherapy replace medical or mental-health treatment?",
        answer:
            "No. Hypnotherapy can support your wellbeing, but it is not a substitute for medical or mental-health care. If you are receiving treatment, Lina encourages you to keep working with your doctor or therapist alongside your hypnotherapy sessions.",
    },
];

// ─── Constants
const OPEN_ITEM_BG = `radial-gradient(ellipse 40% 100% at 50% 100%, #E7EAD2 0%, transparent 100%), linear-gradient(to right, #E5CB83, #9BC17C)`;

const OPEN_ICON_BG = `radial-gradient(circle at 0% 0%, #FC9E06 0%, transparent 55%), radial-gradient(circle at 0% 100%, #FDAC26 0%, transparent 55%), radial-gradient(circle at 100% 0%, #FFF7DF 0%, transparent 55%), radial-gradient(circle at 100% 100%, #FEC668 0%, transparent 55%), #F4D489`;

const EASE = "power3.inOut";

// ─── Main Component
export default function Faq() {
    const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

    const listRef = useRef<HTMLUListElement>(null);

    // Keep FAQ list height constant.
    // All headers + tallest answer + gaps.
    useLayoutEffect(() => {
        const list = listRef.current;
        if (!list) return;

        let cancelled = false;

        const measure = () => {
            if (cancelled) return;

            const items = Array.from(
                list.querySelectorAll<HTMLElement>("[data-faq-item]")
            );

            const gap =
                parseFloat(getComputedStyle(list).rowGap) || 0;

            let headers = 0;
            let tallest = 0;

            items.forEach((li) => {
                const header = li.querySelector<HTMLElement>(
                    "[data-faq-head]"
                );

                const content = li.querySelector<HTMLElement>(
                    "[data-faq-content]"
                );

                headers += header?.offsetHeight ?? 0;

                tallest = Math.max(
                    tallest,
                    content?.offsetHeight ?? 0
                );
            });

            list.style.minHeight = `${headers + tallest + gap * (items.length - 1)
                }px`;
        };

        const observer = new ResizeObserver(measure);

        observer.observe(list);

        list.querySelectorAll("[data-faq-item]").forEach((item) => {
            observer.observe(item);
        });

        measure();

        document.fonts?.ready.then(() => {
            if (!cancelled) measure();
        });

        return () => {
            cancelled = true;
            observer.disconnect();
        };
    }, []);

    return (
        <section id="faqs" className="w-full bg-[#F4F2EE]">
            <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:py-20 lg:py-24">

                <h2 className="text-center font-serif text-3xl font-medium italic leading-[1.1] tracking-tight text-[#1C1B17] sm:text-4xl md:text-5xl">
                    Questions you might be holding.
                </h2>

                <div className="mx-auto mt-10 max-w-2xl sm:mt-12">

                    <ul
                        ref={listRef}
                        className="flex flex-col gap-3"
                    >
                        {FAQS.map((item) => (
                            <FaqItem
                                key={item.id}
                                item={item}
                                isOpen={openId === item.id}
                                onToggle={() =>
                                    setOpenId(
                                        openId === item.id
                                            ? null
                                            : item.id
                                    )
                                }
                            />
                        ))}
                    </ul>

                </div>
            </div>
        </section>
    );
}

// ─── FAQ Item
interface FaqItemProps {
    item: {
        id: string;
        question: string;
        answer: string;
    };
    isOpen: boolean;
    onToggle: () => void;
}

function FaqItem({
    item,
    isOpen,
    onToggle,
}: FaqItemProps) {
    const panelRef = useRef<HTMLDivElement>(null);

    const contentRef = useRef<HTMLDivElement>(null);

    const isInitialRender = useRef(true);

    useLayoutEffect(() => {
        const panel = panelRef.current;
        const content = contentRef.current;

        if (!panel || !content) return;

        // Initial state without animation.
        if (isInitialRender.current) {
            isInitialRender.current = false;

            gsap.set(panel, {
                height: isOpen ? "auto" : 0,
            });

            return;
        }

        gsap.killTweensOf(panel);

        if (isOpen) {
            const targetHeight = content.offsetHeight;

            gsap.fromTo(
                panel,
                { height: 0 },
                {
                    height: targetHeight,
                    duration: 0.6,
                    ease: EASE,
                    onComplete: () => {
                        gsap.set(panel, {
                            height: "auto",
                        });
                    },
                }
            );
        } else {
            const currentHeight = panel.offsetHeight;

            gsap.fromTo(
                panel,
                { height: currentHeight },
                {
                    height: 0,
                    duration: 0.5,
                    ease: EASE,
                }
            );
        }

    }, [isOpen]);

    return (
        <li
            data-faq-item
            className={`overflow-hidden rounded-md transition-shadow duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${isOpen ? "shadow-lg shadow-black/5" : ""
                }`}
            style={{
                background: isOpen
                    ? OPEN_ITEM_BG
                    : "#FFFEF4",
            }}
        >
            <h3 data-faq-head>
                <button
                    type="button"
                    id={`faq-btn-${item.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    onClick={onToggle}
                    className="relative flex w-full items-center justify-between gap-4 pt-1 pb-2 pl-4 pr-1 text-left text-base font-bold text-[#1C1B17] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5C4B36] sm:text-lg"
                >
                    <span>{item.question}</span>

                    <span
                        aria-hidden
                        className={`relative grid h-13 w-13 shrink-0 place-items-center rounded-md transition-colors duration-500 motion-reduce:transition-none ${isOpen
                                ? "text-[#1C1B17]"
                                : "bg-[#E7EDD7] text-[#1C1B17]"
                            }`}
                        style={
                            isOpen
                                ? { background: OPEN_ICON_BG }
                                : undefined
                        }
                    >
                        <EyeIcon isOpen={isOpen} />
                    </span>
                </button>
            </h3>

            {/* Animated answer panel */}
            <div
                ref={panelRef}
                id={`faq-panel-${item.id}`}
                role="region"
                aria-labelledby={`faq-btn-${item.id}`}
                aria-hidden={!isOpen}
                inert={!isOpen}
                className="overflow-hidden"
            >
                <div
                    ref={contentRef}
                    data-faq-content
                    className="px-1 pb-1"
                >
                    <div className="rounded-t-xl rounded-b-md bg-[#FFFEF4]">
                        <p className="px-4 py-4 text-sm leading-relaxed text-[#1C1B17]/75 md:text-base">
                            {item.answer}
                        </p>
                    </div>
                </div>
            </div>
        </li>
    );
}

// ─── Eye Icon
function EyeIcon({ isOpen }: { isOpen: boolean }) {
    const box = "[transform-box:fill-box]";

    return (
        <svg
            aria-hidden
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7 overflow-visible"
        >
            {/* Open eye */}
            <g
                className={`transition-opacity ease-out motion-reduce:transition-none ${isOpen
                        ? "opacity-100 delay-90 duration-50"
                        : "opacity-0 delay-120 duration-50"
                    }`}
            >
                <g
                    className={`${box} origin-center transition-transform ease-out motion-reduce:transition-none ${isOpen
                            ? "scale-y-100 delay-90 duration-200"
                            : "scale-y-[0.06] duration-120"
                        }`}
                >
                    <path d="M3 12c5.4-8 12.6-8 18 0-5.4 8-12.6 8-18 0z" />
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </g>
            </g>

            {/* Closed eye */}
            <g
                className={`transition-opacity ease-out motion-reduce:transition-none ${isOpen
                        ? "opacity-0 duration-100"
                        : "opacity-100 delay-120 duration-60"
                    }`}
            >
                <g
                    className={`${box} origin-top transition-transform ease-out motion-reduce:transition-none ${isOpen
                            ? "scale-y-0 duration-100"
                            : "scale-y-100 delay-120 duration-180"
                        }`}
                >
                    <path d="M21.0006 12.0007C19.2536 15.5766 15.8779 18 12 18M12 18C8.12204 18 4.7463 15.5766 2.99977 12.0002M12 18L12 21M19.4218 14.4218L21.4999 16.5M16.2304 16.9687L17.5 19.5M4.57812 14.4218L2.5 16.5M7.76953 16.9687L6.5 19.5" />
                </g>
            </g>
        </svg>
    );
}