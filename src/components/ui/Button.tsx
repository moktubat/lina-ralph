"use client";

import Image from "next/image";
import Link from "next/link";
import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { useAnchorScroll } from "@/components/providers/SmoothScrollProvider";

type ButtonProps = {
    children: ReactNode;
    variant?: "primary" | "outline";
    avatarSrc?: string;
    href?: string;
    className?: string;
    onClick?: MouseEventHandler<HTMLElement>;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

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
            className={classes}
            style={style}
            onClick={onClick}
            {...props}
        >
            {inner}
        </button>
    );
}