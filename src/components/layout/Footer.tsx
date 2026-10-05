"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, ReactNode } from "react";
import { useAnchorScroll } from "@/components/providers/SmoothScrollProvider";

const MENU = [
    { label: "Home", href: "/" },
    { label: "Process", href: "#process" },
    { label: "What I help with", href: "#services" },
    { label: "About", href: "#about" },
    { label: "FAQs", href: "#faqs" },
];

const SOCIAL = [
    { label: "X", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "YouTube", href: "#" },
];

const LEGAL = [
    { label: "User Agreement", href: "/user-agreement" },
    { label: "Data Privacy", href: "/data-privacy" },
    { label: "Site Map", href: "/site-map" },
];

export default function Footer() {
    const scrollToAnchor = useAnchorScroll();

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    return (
        <footer className="mt-16 w-full overflow-clip bg-[#2E3C20] text-[#F4F2EE]">
            <div className="mx-auto w-full max-w-7xl px-4 pt-12 sm:px-6 lg:pt-16">
                {/* Logo + Contact */}
                <div className="grid gap-12 pb-12 lg:grid-cols-[1.4fr_1fr] lg:pb-14">
                    <div className="flex items-start">
                        <Link href="/" aria-label="Lina Ralph - Home" className="block">
                            <Image src="/svg/logo.svg" alt="Lina Ralph" width={380} height={100} priority className="block h-auto w-[180px] max-w-full md:w-[380px]" />
                        </Link>
                    </div>

                    <div className="lg:pl-16">
                        <h2 className="text-sm font-medium text-white/85">Get in Touch</h2>

                        <ul className="mt-5 space-y-5 text-sm">
                            <ContactItem icon={<PinIcon />}>
                                18 Rowan Street
                                <br />
                                City Centre, DC 20001
                            </ContactItem>

                            <ContactItem icon={<MailIcon />}>
                                <a href="mailto:lina@therapish.com" className="break-all hover:underline">
                                    lina@therapish.com
                                </a>
                            </ContactItem>

                            <ContactItem icon={<PhoneIcon />}>
                                <a href="tel:+15035551234" className="hover:underline">
                                    +1 (503) 555-1234
                                </a>
                            </ContactItem>

                            <ContactItem icon={<ClockIcon />}>
                                Mon–Fri, 9am – 6pm PST
                            </ContactItem>
                        </ul>
                    </div>
                </div>

                <Divider />

                {/* Link Columns */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-10 lg:grid-cols-3">
                    <nav aria-label="Footer menu">
                        <h2 className="text-base font-medium text-white/85">Menu</h2>

                        <ul className="mt-4 space-y-3 text-base">
                            {MENU.map((l) => (
                                <li key={l.label}>
                                    <AnimatedLink href={l.href} onClick={(e) => scrollToAnchor(e, l.href)}>
                                        {l.label}
                                    </AnimatedLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav aria-label="Social links">
                        <h2 className="text-base font-medium text-white/85">Social Links</h2>

                        <ul className="mt-4 space-y-3 text-base">
                            {SOCIAL.map((l) => (
                                <li key={l.label}>
                                    <AnimatedLink href={l.href}>{l.label}</AnimatedLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="col-span-2 lg:col-span-1">
                        <h2 className="text-base font-medium text-white/85">Stay In Loop</h2>

                        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-stretch lg:flex-col xl:flex-row">
                            <label htmlFor="newsletter-email" className="sr-only">
                                Your email address
                            </label>

                            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-md border border-white/30 bg-white/5 px-4 transition-colors focus-within:border-white/70">
                                <span className="h-5 w-5 shrink-0 text-white/90">
                                    <MailIcon />
                                </span>

                                <input id="newsletter-email" type="email" required placeholder="Your email address" className="min-w-0 flex-1 bg-transparent py-3.5 text-base outline-none placeholder:text-white/70 sm:text-sm" />
                            </div>

                            <button type="submit" className="shrink-0 rounded-md px-8 py-3.5 text-sm font-semibold text-[#010301] shadow-lg shadow-orange-500/20" style={{ background: "radial-gradient(at 0% 0%, #FF9C00 0%, transparent 50%), radial-gradient(at 100% 0%, #FFFEFD 0%, transparent 50%), radial-gradient(at 100% 100%, #F8A91A 0%, transparent 50%), #FF9C00" }}>
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <Divider />

                {/* Bottom */}
                <div className="flex flex-col gap-3 py-8 text-sm text-white/80 sm:flex-row sm:items-center sm:justify-between">
                    <p>© 2026 lina hypnotherapist. All rights reserved.</p>

                    <ul className="flex flex-wrap gap-x-6 gap-y-2">
                        {LEGAL.map((l) => (
                            <li key={l.label}>
                                <AnimatedLink href={l.href}>{l.label}</AnimatedLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}

function AnimatedLink({
    href,
    children,
    onClick,
}: {
    href: string;
    children: ReactNode;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
    return (
        <Link href={href} onClick={onClick} className="group relative inline-block transition-opacity hover:opacity-70">
            {children}
            <span aria-hidden className="absolute bottom-0 left-1/2 h-px w-full -translate-x-1/2 scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
        </Link>
    );
}

function Divider() {
    return <div aria-hidden className="h-px w-full bg-linear-to-r from-transparent via-white/25 to-transparent" />;
}

function ContactItem({ icon, children }: { icon: ReactNode; children: ReactNode }) {
    return (
        <li className="flex items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-white/10">
                <span className="h-4 w-4">{icon}</span>
            </span>
            <span className="min-w-0 leading-snug">{children}</span>
        </li>
    );
}

/* ---------- Icons ---------- */

function Svg({ children }: { children: ReactNode }) {
    return (
        <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
            {children}
        </svg>
    );
}

function PinIcon() {
    return (
        <Svg>
            <path d="M12 21s7-6.200 7-11.500A7 7 0 0 0 5 9.500C5 14.800 12 21 12 21Z" />
            <circle cx="12" cy="9.500" r="2.500" />
        </Svg>
    );
}

function MailIcon() {
    return (
        <Svg>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3.500 6.500 8.500 6.500 8.500-6.500M3.500 17.500l6-5.500M20.500 17.500l-6-5.500" />
        </Svg>
    );
}

function PhoneIcon() {
    return (
        <Svg>
            <path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
        </Svg>
    );
}

function ClockIcon() {
    return (
        <Svg>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
        </Svg>
    );
}
