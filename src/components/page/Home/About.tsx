import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export default function About() {
    return (
        <section id="about" className="w-full bg-[#F4F2EE]">
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-[405px_406px_405px] lg:gap-8 lg:py-28">
                {/* Left */}
                <Reveal className="w-full max-w-101.5 self-start md:col-span-2 lg:col-span-1">
                    <h2 className="font-serif text-3xl font-medium italic leading-[1.15] tracking-tight text-[#1C1B17] sm:text-4xl lg:text-4xl xl:text-5xl">
                        5+ years helping people understand the patterns that
                        keep them stuck.
                    </h2>
                </Reveal>

                {/* Image: short on phones, full height from md up */}
                <Reveal
                    delay={0.12}
                    className="mx-auto w-full max-w-101.5 md:col-span-1 md:mx-0 lg:col-span-1"
                >
                    <div className="relative h-90 w-full overflow-hidden rounded-2xl sm:h-110 md:h-155">
                        <Image
                            src="/image/lina-about.webp"
                            alt="Lina sitting cross-legged on a woven cushion with her hands held in front of her chest"
                            fill
                            sizes="(min-width: 1024px) 406px, (min-width: 768px) 50vw, 100vw"
                            className="object-cover object-center"
                        />
                    </div>
                </Reveal>

                {/* Right */}
                <Reveal
                    delay={0.24}
                    className="flex w-full max-w-101.5 flex-col gap-6 md:col-span-1 md:col-start-2 md:row-start-2 md:justify-end md:gap-10 lg:col-span-1 lg:col-start-3 lg:row-start-1"
                >
                    <div className="flex h-16 w-16 items-center justify-center sm:h-24 sm:w-24">
                        <Image
                            src="/svg/spiral-head.svg"
                            alt=""
                            width={96}
                            height={96}
                            className="h-full w-full object-contain"
                        />
                    </div>

                    <p className="text-sm leading-relaxed text-[#1C1B17]/80 sm:text-base">
                        Lina is a hypnotherapist who brings presence, clarity,
                        and deep respect to each conversation. Her work is
                        rooted in the belief that change does not need to begin
                        with more force. Sometimes it starts with a better
                        question.
                    </p>
                </Reveal>
            </div>
        </section>
    );
}