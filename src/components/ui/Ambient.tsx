"use client";

import { HTMLAttributes, ReactNode, useRef } from "react";
import { gsap, NO_REDUCED_MOTION, ScrollTrigger, useGSAP } from "@/lib/gsap";

type AmbientProps = {
    children: ReactNode;
    variant: "float" | "sway" | "pulse";
    className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "children" | "className">;

export default function Ambient({
    children,
    variant,
    className = "",
    ...rest
}: AmbientProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const el = ref.current;
            if (!el) return;

            const mm = gsap.matchMedia();
            mm.add(NO_REDUCED_MOTION, () => {
                let tween: gsap.core.Tween;

                if (variant === "float") {
                    tween = gsap.fromTo(
                        el,
                        { y: -5 },
                        { y: 5, duration: 3.5, ease: "sine.inOut", yoyo: true, repeat: -1 },
                    );
                } else if (variant === "sway") {
                    // Pivot at top-centre, like a pendulum on a string.
                    gsap.set(el, { transformOrigin: "50% 0%" });
                    tween = gsap.fromTo(
                        el,
                        { rotation: -4 },
                        { rotation: 4, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 },
                    );
                } else {
                    tween = gsap.fromTo(
                        el,
                        { scale: 1 },
                        { scale: 1.05, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 },
                    );
                }

                tween.progress(Math.random());

                const st = ScrollTrigger.create({
                    trigger: el,
                    start: "top bottom",
                    end: "bottom top",
                    onToggle: (self) =>
                        self.isActive ? tween.resume() : tween.pause(),
                });

                return () => {
                    st.kill();
                    tween.kill();
                };
            });
        },
        { scope: ref, dependencies: [variant] },
    );

    return (
        <div ref={ref} className={className} {...rest}>
            {children}
        </div>
    );
}
