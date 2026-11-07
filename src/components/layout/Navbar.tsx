"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import {
    useAnchorScroll,
    useLenis,
} from "@/components/providers/SmoothScrollProvider";
import Image from "next/image";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

const NAV_LINKS = [
    { label: "Process", href: "#process" },
    { label: "What I help with", href: "#services" },
    { label: "About", href: "#about" },
    { label: "FAQs", href: "#faqs" },
];

const EASE = "ease-[cubic-bezier(.22,1,.36,1)]";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const lenis = useLenis();
    const scrollToAnchor = useAnchorScroll();
    const menuRef = useRef<HTMLDivElement>(null);
    const prevOpen = useRef(false);

    // Mobile menu
    useGSAP(
        () => {
            if (prevOpen.current === open) return;
            prevOpen.current = open;

            const items = gsap.utils.toArray<HTMLElement>("[data-menu-item]");
            if (prefersReducedMotion()) {
                gsap.set(items, { y: 0, opacity: open ? 1 : 0 });
                return;
            }

            if (open) {
                gsap.fromTo(
                    items,
                    { y: 32, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: 0.15,
                        ease: "power4.out",
                        stagger: 0.08,
                        overwrite: "auto",
                    },
                );
            } else {
                gsap.to(items, {
                    y: 16,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.in",
                    overwrite: "auto",
                });
            }
        },
        { scope: menuRef, dependencies: [open] },
    );

    useEffect(() => {
        if (!open) return;
        lenis?.stop();
        return () => lenis?.start();
    }, [open, lenis]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const onChange = (e: MediaQueryListEvent) => {
            if (e.matches) setOpen(false);
        };
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    function handleAnchor(e: MouseEvent<HTMLElement>, href: string) {
        setOpen(false);
        lenis?.start();
        scrollToAnchor(e, href);
    }

    return (
        <header className="absolute top-0 left-0 z-50 w-full px-4 py-2">
            <nav className="mx-auto flex max-w-7xl items-center justify-between">
                <Link
                    href="/"
                    onClick={() => {
                        setOpen(false);
                        lenis?.start();
                    }}
                    className="relative z-10 block w-[72px] sm:w-[86px]"
                >
                    <Image
                        src="/svg/logo.svg"
                        alt="Lina Ralph"
                        width={86}
                        height={86}
                        priority
                        className="h-auto w-full object-contain"
                    />
                </Link>

                {/* Desktop links */}
                <ul className="hidden items-center lg:flex">
                    {NAV_LINKS.map((link) => (
                        <li key={link.label}>
                            <Link
                                href={link.href}
                                onClick={(e) => scrollToAnchor(e, link.href)}
                                className="block rounded-lg bg-[#5C4B36]/30 px-4 py-2 text-sm text-white/90 backdrop-blur-lg transition-all duration-300 hover:bg-[#5C4B36]/50"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="relative z-10 flex items-center gap-2">
                    <div className="hidden sm:block">
                        <Button
                            variant="primary"
                            href="#contact"
                            avatarSrc="/image/avatar-lina.png"
                        >
                            Contact us
                        </Button>
                    </div>

                    {/* Hamburger */}
                    <button
                        type="button"
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        onClick={() => setOpen((o) => !o)}
                        className="grid h-11 w-11 place-items-center rounded-lg bg-[#5C4B36]/40 text-white backdrop-blur-lg outline-none focus-visible:ring-2 focus-visible:ring-[#E8E39A]/70 lg:hidden"
                    >
                        <span className="relative block h-3.5 w-5">
                            <span
                                className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-500 motion-reduce:transition-none ${EASE} ${open ? "top-1.5 rotate-45" : "top-0"}`}
                            />
                            <span
                                className={`absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-current transition-all duration-300 motion-reduce:transition-none ${EASE} ${open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"}`}
                            />
                            <span
                                className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-500 motion-reduce:transition-none ${EASE} ${open ? "top-1.5 -rotate-45" : "top-3"}`}
                            />
                        </span>
                    </button>
                </div>
            </nav>

            {/* Mobile / tablet menu */}
            <div
                ref={menuRef}
                id="mobile-menu"
                aria-hidden={!open}
                data-lenis-prevent
                className={`fixed inset-0 z-0 overflow-y-auto transition-[opacity,visibility] duration-500 motion-reduce:transition-none lg:hidden ${open
                    ? "visible opacity-100"
                    : "pointer-events-none invisible opacity-0"
                    }`}
                style={{
                    background: `
                        radial-gradient(ellipse 80% 40% at 0% 100%, #5F6A34 0%, transparent 70%),
                        radial-gradient(ellipse 80% 40% at 100% 100%, #7E7A2C 0%, transparent 70%),
                        linear-gradient(to bottom, #2E3C20 0%, #2E3C20 55%, #334123 100%)
                    `,
                }}
            >
                <div className="mx-auto flex min-h-full w-full max-w-xl flex-col px-6 pb-10 pt-28">
                    <ul className="flex flex-col">
                        {NAV_LINKS.map((link, i) => (
                            <li
                                key={link.label}
                                className="overflow-hidden border-b border-white/15"
                            >
                                <Link
                                    href={link.href}
                                    onClick={(e) => handleAnchor(e, link.href)}
                                    data-menu-item
                                    className="flex items-baseline gap-4 py-5 font-serif text-3xl italic text-white outline-none focus-visible:text-[#E8E39A] sm:text-4xl"
                                >
                                    <span className="font-sans text-xs not-italic text-white/50">
                                        0{i + 1}
                                    </span>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div data-menu-item className="mt-auto pt-12">
                        <Button
                            variant="primary"
                            href="#contact"
                            avatarSrc="/image/avatar-lina.png"
                            onClick={(e) => handleAnchor(e, "#contact")}
                        >
                            Book a free consultation
                        </Button>

                        <a
                            href="mailto:lina@therapish.com"
                            className="mt-5 block text-center text-sm text-white/70 hover:text-white"
                        >
                            lina@therapish.com
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}