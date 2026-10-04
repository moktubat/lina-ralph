import Image from "next/image";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function FinalCta() {
    return (
        <section className="w-full bg-[#F4F2EE] px-3 pb-3 sm:px-4 sm:pb-4">
            <div
                className="relative mx-auto flex min-h-130 w-full max-w-350 items-center justify-center overflow-hidden rounded-4xl px-5 py-40 text-center text-white sm:rounded-[48px] sm:px-6 sm:py-52 md:py-20 lg:min-h-160"
                style={{
                    background: `
                        radial-gradient(ellipse 60% 45% at 0% 100%, #6B8A4A 0%, transparent 70%),
                        radial-gradient(ellipse 50% 40% at 100% 100%, #7E7A2C 0%, transparent 70%),
                        linear-gradient(to bottom, #2E3C20 0%, #2E3C20 55%, #3B4A26 100%)
                    `,
                }}
            >
                {/* top-left arch (now visible on every screen size) */}
                <div className="absolute left-3 top-3 h-32 w-28 overflow-hidden rounded-t-2xl rounded-b-[56px] sm:h-44 sm:w-36 sm:rounded-t-3xl sm:rounded-b-[72px] md:h-60 md:w-51.25 md:rounded-t-4xl md:rounded-b-[100px] lg:left-4 lg:top-4 lg:h-82 lg:w-70">
                    <Image
                        src="/image/cta-left.webp"
                        alt="Lina standing behind a calm client with her hands raised"
                        fill
                        sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, (max-width: 1024px) 205px, 280px"
                        className="object-cover"
                    />
                </div>

                {/* bottom-right arch */}
                <div className="absolute bottom-3 right-3 h-32 w-28 overflow-hidden rounded-t-[56px] rounded-b-2xl sm:h-44 sm:w-36 sm:rounded-t-[72px] sm:rounded-b-3xl md:h-60 md:w-51.25 md:rounded-t-[100px] md:rounded-b-4xl lg:bottom-4 lg:right-4 lg:h-82 lg:w-70">
                    <Image
                        src="/image/cta-right.webp"
                        alt="Client resting with closed eyes as a therapist's hands hover above her"
                        fill
                        sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, (max-width: 1024px) 205px, 280px"
                        className="object-cover"
                    />
                </div>

                <Reveal className="relative flex max-w-lg flex-col items-center md:max-w-md lg:max-w-lg">
                    <div className="flex h-24 w-24 items-center justify-center sm:h-34 sm:w-34">
                        <Image
                            src="/svg/pendulum-rings.svg"
                            alt=""
                            width={136}
                            height={136}
                            className="h-full w-full object-contain"
                        />
                    </div>

                    <h2 className="mt-5 font-serif text-3xl italic leading-[1.1] tracking-tight text-balance sm:text-4xl md:text-5xl">
                        You don&apos;t have to keep fighting the same pattern.
                    </h2>

                    <p className="mt-4 text-sm font-light text-white/85 md:text-base">
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
                </Reveal>
            </div>
        </section>
    );
}