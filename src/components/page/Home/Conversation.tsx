import Image from "next/image";
import { ReactNode } from "react";
import Button from "@/components/ui/Button";

const STEPS = [
    {
        step: "Step 01",
        title: "Book your call",
        description: "Choose a time that works for you.",
        icon: <PhoneIcon />,
    },
    {
        step: "Step 02",
        title: "Tell Lina what's really going on",
        description: "Bring the thing you've been carrying around.",
        icon: <PeopleIcon />,
    },
    {
        step: "Step 03",
        title: "Decide together",
        description: "Talk through whether the next step makes sense.",
        icon: <CheckIcon />,
    },
];

export default function Conversation() {
    return (
        <section
            id="contact"
            className="relative w-full overflow-hidden rounded-b-4xl sm:rounded-b-[48px] lg:rounded-b-[64px]"
        >
            <Image
                src="/image/conversation-bg.webp"
                alt=""
                fill
                sizes="100vw"
                className="-z-20 object-cover object-bottom"
            />
            {/* Fade from the page background into the photo */}
            <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-linear-to-b from-[#F4F2EE] via-[#F4F2EE]/70 to-transparent"
            />

            <div className="mx-auto w-full max-w-7xl px-4 pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-24">
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="font-serif text-3xl font-medium italic leading-[1.1] tracking-tight text-[#1C1B17] sm:text-4xl md:text-5xl">
                        Simply a conversation.
                    </h2>
                    <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#1C1B17]/70">
                        There&apos;s no pressure to commit to anything. Just a
                        chance to share what&apos;s going on, ask questions,
                        and see if working together feels right.
                    </p>
                </div>

                <ol className="mt-16 grid gap-6 sm:mt-24 md:grid-cols-3 md:gap-4 lg:mt-40 lg:gap-6">
                    {STEPS.map((s) => (
                        <li key={s.step} className="flex flex-col items-start">
                            <span className="rounded-t-lg bg-[#3A3026]/80 px-4 py-1.5 text-xs text-white backdrop-blur-md">
                                {s.step}
                            </span>

                            <div className="w-full rounded-b-xl rounded-tr-xl bg-[#3A3026]/75 p-5 pb-8 text-white backdrop-blur-md sm:p-6 sm:pb-10">
                                <span className="grid h-10 w-10 place-items-center rounded-md bg-linear-to-b from-[#6CC08C] to-[#D4A62A] text-white">
                                    <span className="h-5 w-5">{s.icon}</span>
                                </span>

                                <h3 className="mt-6 text-base font-medium sm:text-lg">
                                    {s.title}
                                </h3>
                                <p className="mt-2 text-xs font-light text-white/80 sm:text-sm">
                                    {s.description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>

                <div className="mt-10 flex justify-center sm:mt-14">
                    <Button
                        variant="primary"
                        href="#contact"
                        avatarSrc="/image/avatar-lina.png"
                    >
                        Book a free consultation
                    </Button>
                </div>
            </div>
        </section>
    );
}

/* ---------- icons ---------- */

function Icon({ children }: { children: ReactNode }) {
    return (
        <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-full w-full"
        >
            {children}
        </svg>
    );
}

function PhoneIcon() {
    return (
        <Icon>
            <path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
        </Icon>
    );
}

function PeopleIcon() {
    return (
        <Icon>
            <rect x="8.500" y="3" width="7" height="5" rx="1" />
            <rect x="2.500" y="16" width="7" height="5" rx="1" />
            <rect x="14.500" y="16" width="7" height="5" rx="1" />
            <path d="M12 8v4M6 16v-4h12v4" />
        </Icon>
    );
}

function CheckIcon() {
    return (
        <Icon>
            <rect x="4" y="4" width="16" height="16" rx="3" />
            <path d="m8.500 12.500 2.500 2.500 4.500-5" />
        </Icon>
    );
}