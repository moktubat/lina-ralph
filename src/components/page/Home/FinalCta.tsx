import Image from "next/image";
import Button from "@/components/ui/Button";

export default function FinalCta() {
    return (
        <section className="w-full bg-[#F4F2EE] px-3 pb-3 sm:px-4 sm:pb-4">
            <div
                className="relative mx-auto flex min-h-[520px] w-full max-w-[1400px] items-center justify-center overflow-hidden rounded-4xl px-6 py-20 text-center text-white sm:rounded-[48px] lg:min-h-[640px]"
                style={{
                    background: `
                        radial-gradient(ellipse 60% 45% at 0% 100%, #6B8A4A 0%, transparent 70%),
                        radial-gradient(ellipse 50% 40% at 100% 100%, #7E7A2C 0%, transparent 70%),
                        linear-gradient(to bottom, #2E3C20 0%, #2E3C20 55%, #3B4A26 100%)
                    `,
                }}
            >
                {/* top-left arch */}
                <div className="absolute left-3 top-3 hidden h-44 w-36 overflow-hidden rounded-[56px] rounded-br-[40px] md:block lg:left-4 lg:top-4 lg:h-60 lg:w-48">
                    <Image
                        src="/image/cta-left.webp"
                        alt="Lina standing behind a calm client with her hands raised"
                        fill
                        sizes="200px"
                        className="object-cover"
                    />
                </div>

                {/* bottom-right arch */}
                <div className="absolute bottom-3 right-3 hidden h-52 w-40 overflow-hidden rounded-[56px] rounded-tl-[40px] md:block lg:bottom-4 lg:right-4 lg:h-72 lg:w-56">
                    <Image
                        src="/image/cta-right.webp"
                        alt="Client resting with closed eyes as a therapist's hands hover above her"
                        fill
                        sizes="240px"
                        className="object-cover"
                    />
                </div>

                <div className="relative flex max-w-md flex-col items-center">
                    <PendulumRings className="h-14 w-14 sm:h-16 sm:w-16" />

                    <h2 className="mt-5 font-serif text-3xl italic leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
                        You don&apos;t have to keep fighting the same pattern.
                    </h2>

                    <p className="mt-4 text-xs font-light text-white/85 sm:text-sm">
                        A free, no-pressure conversation could be the place to
                        start.
                    </p>

                    <Button
                        variant="primary"
                        href="#contact"
                        avatarSrc="/image/avatar-lina.png"
                        className="mt-8"
                    >
                        Book a free consultation
                    </Button>
                </div>
            </div>
        </section>
    );
}

function PendulumRings({ className = "" }: { className?: string }) {
    return (
        <svg
            aria-hidden
            viewBox="0 0 64 64"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <defs>
                <linearGradient id="cta-rings" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#7DBB8A" />
                    <stop offset="1" stopColor="#F5B63A" />
                </linearGradient>
            </defs>
            <path
                d="M30 30a14 14 0 0 1 0 24M36 31a14 14 0 0 1 0 22M42 33a14 14 0 0 1 0 18"
                stroke="url(#cta-rings)"
                strokeWidth="1.6"
            />
            <circle cx="22" cy="42" r="14" stroke="#fff" strokeWidth="1.5" />
            <circle cx="22" cy="42" r="2" stroke="#fff" strokeWidth="1.2" />
            <path d="M31 32 46 15" stroke="#fff" strokeWidth="1.5" />
            <circle cx="50" cy="11" r="5" stroke="#fff" strokeWidth="1.5" />
        </svg>
    );
}