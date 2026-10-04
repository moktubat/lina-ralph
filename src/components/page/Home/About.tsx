import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="w-full bg-[#F4F2EE]">
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-[405px_406px_405px] lg:gap-8 lg:py-28">
                {/* Left */}
                <h2 className="w-full max-w-[405px] self-start font-serif text-3xl font-medium italic leading-[1.15] tracking-tight text-[#1C1B17] sm:text-4xl md:col-span-2 md:max-w-[405px] lg:col-span-1 lg:text-4xl xl:text-5xl">
                    5+ years helping people understand the patterns that keep
                    them stuck.
                </h2>

                {/* Image */}
                <div className="relative mx-auto h-[620px] w-full max-w-[406px] overflow-hidden rounded-2xl md:col-span-1 md:mx-0 lg:col-span-1">
                    <Image
                        src="/image/lina-about.webp"
                        alt="Lina sitting cross-legged on a woven cushion with her hands held in front of her chest"
                        fill
                        sizes="(min-width: 1024px) 406px, (min-width: 768px) 50vw, 100vw"
                        className="object-cover object-center"
                    />
                </div>

                {/* Right */}
                <div className="flex w-full max-w-[405px] flex-col justify-end gap-10 md:col-span-1 md:col-start-2 md:row-start-2 lg:col-span-1 lg:col-start-3 lg:row-start-1">
                    <div className="flex h-24 w-24 items-center justify-center">
                        <Image
                            src="/svg/spiral-head.svg"
                            alt=""
                            width={96}
                            height={96}
                            className="object-contain"
                        />
                    </div>

                    <p className="text-sm leading-relaxed text-[#1C1B17]/80 sm:text-base">
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
