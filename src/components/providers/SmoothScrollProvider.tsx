"use client";

import "lenis/dist/lenis.css";

import {
    MouseEvent,
    ReactNode,
    useCallback,
    useEffect,
    useSyncExternalStore,
} from "react";
import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let current: Lenis | null = null;
const listeners = new Set<() => void>();

function setCurrent(next: Lenis | null) {
    current = next;
    listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

const getSnapshot = () => current;
const getServerSnapshot = () => null;

export function useLenis() {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useAnchorScroll() {
    const lenis = useLenis();

    return useCallback(
        (e: MouseEvent<HTMLElement>, href: string) => {
            if (!href.startsWith("#")) return;

            const target = document.querySelector<HTMLElement>(href);
            if (!target) return;

            e.preventDefault();

            if (lenis) {
                lenis.scrollTo(target, { duration: 1.6 });
            } else {
                target.scrollIntoView({ behavior: "smooth" });
            }
        },
        [lenis],
    );
}

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const instance = new Lenis({
            duration: 1.3,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        instance.on("scroll", ScrollTrigger.update);

        const tick = (time: number) => instance.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        setCurrent(instance);

        return () => {
            gsap.ticker.remove(tick);
            instance.destroy();
            setCurrent(null);
        };
    }, []);

    return <>{children}</>;
}