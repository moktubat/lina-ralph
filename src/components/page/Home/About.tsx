import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="w-full bg-[#F4F2EE]">
            <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-[1fr_1.1fr_1fr] lg:gap-8 lg:py-28">
                <h2 className="max-w-sm font-serif text-3xl font-medium italic leading-[1.15] tracking-tight text-[#1C1B17] sm:text-4xl md:col-span-2 md:max-w-md lg:col-span-1 lg:max-w-xs lg:text-4xl xl:text-5xl">
                    5+ years helping people understand the patterns that keep
                    them stuck.
                </h2>

                <div className="relative mx-auto aspect-3/4 w-full max-w-sm overflow-hidden rounded-2xl md:mx-0 lg:max-w-none">
                    <Image
                        src="/image/lina-about.webp"
                        alt="Lina sitting cross-legged on a woven cushion with her hands held in front of her chest"
                        fill
                        sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                    />
                </div>

                <div className="flex flex-col justify-end gap-5 md:col-start-2 md:row-start-2 lg:col-start-3 lg:row-start-1 lg:max-w-xs">
                    <SpiralHeadIcon className="h-16 w-16" />
                    <p className="text-xs leading-relaxed text-[#1C1B17]/80 sm:text-sm">
                        Lina is a hypnotherapist who brings presence, clarity,
                        and deep respect to each conversation. Her work is
                        rooted in the belief that change does not need to begin
                        with more force. Sometimes it starts with a better
                        question.
                    </p>
                </div>
            </div>
        </section>
    );
}

function SpiralHeadIcon({ className = "" }: { className?: string }) {
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
                <linearGradient id="about-spiral" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#F5B63A" />
                    <stop offset="1" stopColor="#7DBB8A" />
                </linearGradient>
            </defs>
            {/* profile facing right */}
            <path
                d="M18 58V44c-5-4-8-10-8-17C10 15 19 6 30 6s19 8 19 17l4 8-4 2v5l-2 3h-6v10"
                stroke="#1C1B17"
                strokeWidth="1.5"
            />
            {/* spiral */}
            <path
                d="M30 34c-5.500 0-9-3.500-9-8s3.500-8.500 9-8.500S39 21 39 25s-3 6.500-7 6.500-6-2-6-5 2-4.500 5-4.500"
                stroke="url(#about-spiral)"
                strokeWidth="2.4"
            />
        </svg>
    );
}