import Image from "next/image";
import Link from "next/link";

const SERVICES = [
    {
        id: "01",
        title: "Anxiety & overthinking",
        image: "/image/service-01.webp",
        alt: "Woman with closed eyes while a therapist rests a hand on her forehead",
        className: "md:row-span-2 md:col-span-1",
    },
    {
        id: "02",
        title: "Confidence & self-belief",
        image: "/image/service-02.webp",
        alt: "Woman sitting calmly with eyes closed while Lina stands behind her",
        className: "md:row-span-2 md:col-span-1",
    },
    {
        id: "03",
        title: "Stress & emotional overload",
        image: "/image/service-03.webp",
        alt: "Man lying down while a therapist places a hand near his head",
        className: "md:col-span-2",
    },
    {
        id: "04",
        title: "Habits & unwanted patterns",
        image: "/image/service-04.webp",
        alt: "Woman lying on a mat as a therapist kneels beside her",
        className: "md:col-span-2",
    },
    {
        id: "05",
        title: "Fears & phobias",
        image: "/image/service-05.webp",
        alt: "Therapist holding a hand above a person resting on a cushion",
        className: "md:col-span-2",
    },
];

const EASE = "ease-[cubic-bezier(.22,1,.36,1)]";

export default function Services() {
    return (
        <section id="services" className="w-full bg-[#F4F2EE]">
            <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="font-serif text-3xl font-medium italic leading-[1.1] tracking-tight text-[#1C1B17] sm:text-4xl md:text-5xl">
                        What are you ready to change?
                    </h2>
                    <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#1C1B17]/70">
                        A consultation is a space to talk about what has been
                        difficult—and whether this approach feels like the
                        right fit.
                    </p>
                </div>

                <ul className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 md:grid-cols-4 md:auto-rows-[160px] md:gap-4 lg:auto-rows-[190px]">
                    {SERVICES.map((s) => (
                        <li
                            key={s.id}
                            className={`group relative h-64 overflow-hidden rounded-2xl md:h-auto ${s.className}`}
                        >
                            <Image
                                src={s.image}
                                alt={s.alt}
                                fill
                                sizes="(min-width: 768px) 50vw, 100vw"
                                className={`object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none ${EASE}`}
                            />
                            <div
                                aria-hidden
                                className="absolute inset-0 bg-linear-to-t from-black/60 via-black/5 to-black/10"
                            />

                            <span className="absolute left-4 top-3 font-serif text-sm italic text-white">
                                {s.id}
                            </span>
                            <h3 className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white sm:text-base">
                                {s.title}
                            </h3>
                        </li>
                    ))}

                    {/* 06 – text card */}
                    <li
                        className="relative flex h-64 flex-col overflow-hidden rounded-2xl bg-white p-5 md:col-span-2 md:h-auto"
                        style={{
                            background: `
                                radial-gradient(ellipse 60% 70% at 100% 0%, #B9DA9A 0%, transparent 70%),
                                radial-gradient(ellipse 50% 60% at 0% 0%, #F1E9A0 0%, transparent 70%),
                                #fff
                            `,
                        }}
                    >
                        <span className="sr-only">06</span>
                        <h3 className="mt-auto text-sm font-semibold text-[#1C1B17] sm:text-base">
                            Sleep &amp; relaxation
                        </h3>
                        <p className="mt-2 max-w-xs text-xs leading-relaxed text-[#1C1B17]/60">
                            When it is difficult to let your body and mind
                            settle.
                        </p>

                        <Link
                            href="#contact"
                            aria-label="Talk about sleep and relaxation"
                            className="mt-5 grid h-9 w-9 place-items-center rounded-md text-[#1C1B17] shadow-lg shadow-orange-500/20 transition-transform duration-300 hover:scale-105"
                            style={{
                                background:
                                    "linear-gradient(135deg, #FFB627, #F8A91A 60%, #FFDD8A)",
                            }}
                        >
                            <svg
                                aria-hidden
                                viewBox="0 0 24 24"
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    );
}