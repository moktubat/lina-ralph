"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ButtonHTMLAttributes,
    MouseEventHandler,
    ReactNode,
    useRef,
} from "react";
import { useAnchorScroll } from "@/components/providers/SmoothScrollProvider";
import { FINE_POINTER, gsap, NO_REDUCED_MOTION, useGSAP } from "@/lib/gsap";

type ButtonProps = {
    children: ReactNode;
    variant?: "primary" | "outline";
    avatarSrc?: string;
    href?: string;
    className?: string;
    onClick?: MouseEventHandler<HTMLElement>;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

const MAGNET_MAX = 10; // px

const PRIMARY_BG = `
    radial-gradient(at 0% 0%, #FF9C00 0%, transparent 50%),
    radial-gradient(at 0% 100%, #FF9E03 0%, transparent 50%),
    radial-gradient(at 100% 0%, #FFFEFD 0%, transparent 50%),
    radial-gradient(at 100% 100%, #F8A91A 0%, transparent 50%),
    #FF9C00
`;

export default function Button({
    children,
    variant = "primary",
    avatarSrc,
    href,
    className = "",
    onClick,
    ...props
}: ButtonProps) {
    const scrollToAnchor = useAnchorScroll();
    const ref = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const el = ref.current;
            if (!el || variant !== "primary") return;

            const mm = gsap.matchMedia();
            mm.add(`${NO_REDUCED_MOTION} and ${FINE_POINTER}`, () => {
                const move = (e: PointerEvent) => {
                    const r = el.getBoundingClientRect();
                    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
                    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
                    gsap.to(el, {
                        x: gsap.utils.clamp(-1, 1, dx) * MAGNET_MAX,
                        y: gsap.utils.clamp(-1, 1, dy) * MAGNET_MAX,
                        duration: 0.4,
                        ease: "power3.out",
                        overwrite: "auto",
                    });
                };
                const reset = () =>
                    gsap.to(el, {
                        x: 0,
                        y: 0,
                        duration: 0.8,
                        ease: "elastic.out(1, 0.4)",
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
        { scope: ref, dependencies: [variant] },
    );

    const base =
        "inline-flex w-full sm:w-auto items-center justify-between gap-3 rounded-md text-sm py-1";

    const styles = {
        primary:
            "text-[#010301] font-semibold shadow-lg shadow-orange-500/20 pl-5 sm:pl-8 pr-1",
        outline:
            "bg-transparent border border-white text-white font-medium py-3 px-5 sm:px-8",
    };

    const inner = (
        <>
            <span>{children}</span>

            {avatarSrc && (
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-sm border border-white/60">
                    <Image
                        src={avatarSrc}
                        alt=""
                        fill
                        className="object-cover"
                    />
                </span>
            )}
        </>
    );

    const classes = `${base} ${styles[variant]} ${className}`;
    const style = variant === "primary" ? { background: PRIMARY_BG } : undefined;

    if (href) {
        return (
            <Link
                ref={ref as React.Ref<HTMLAnchorElement>}
                href={href}
                className={classes}
                style={style}
                onClick={(e) => {
                    onClick?.(e);
                    if (!e.defaultPrevented) {
                        scrollToAnchor(e, href);
                    }
                }}
            >
                {inner}
            </Link>
        );
    }

    return (
        <button
            ref={ref as React.Ref<HTMLButtonElement>}
            className={classes}
            style={style}
            onClick={onClick}
            {...props}
        >
            {inner}
        </button>
    );
}

