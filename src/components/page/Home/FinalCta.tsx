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
                <div className="absolute left-3 top-3 hidden h-[240px] w-[205px] overflow-hidden rounded-t-[32px] rounded-b-[100px] md:block lg:left-4 lg:top-4 lg:h-[328px] lg:w-[280px]">
                    <Image
                        src="/image/cta-left.webp"
                        alt="Lina standing behind a calm client with her hands raised"
                        fill
                        sizes="(max-width: 1024px) 205px, 280px"
                        className="object-cover"
                    />
                </div>

                {/* bottom-right arch */}
                <div className="absolute bottom-3 right-3 hidden h-[240px] w-[205px] overflow-hidden rounded-t-[100px] rounded-b-[32px] md:block lg:bottom-4 lg:right-4 lg:h-[328px] lg:w-[280px]">
                    <Image
                        src="/image/cta-right.webp"
                        alt="Client resting with closed eyes as a therapist's hands hover above her"
                        fill
                        sizes="(max-width: 1024px) 205px, 280px"
                        className="object-cover"
                    />
                </div>

                <div className="relative flex max-w-lg flex-col items-center">
                    <div className="flex h-34 w-34 items-center justify-center">
                        <Image
                            src="/svg/pendulum-rings.svg"
                            alt=""
                            width={136}
                            height={136}
                            className="object-contain"
                        />
                    </div>

                    <h2 className="mt-5 font-serif text-3xl italic leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
                        You don&apos;t have to keep fighting the same pattern.
                    </h2>

                    <p className="mt-4 text-xs font-light text-white/85 sm:text-sm md:text-base">
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