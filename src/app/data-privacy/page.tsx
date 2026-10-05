import Reveal from "@/components/ui/Reveal";

export const metadata = {
    title: "Data Privacy | Lina Ralph",
};

export default function DataPrivacy() {
    return (
        <section className="w-full bg-linear-to-b from-[#E8E39A] via-[#C3D98F]/70 to-transparent">
            <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:py-20 lg:py-24">
                <Reveal>
                    <h1 className="font-serif text-4xl font-medium italic leading-[1.1] tracking-tight text-[#1C1B17] sm:text-5xl">
                        Data Privacy Policy
                    </h1>
                    <p className="mt-4 text-sm text-[#1C1B17]/60">
                        Last updated: October 5, 2026
                    </p>
                </Reveal>

                <div className="mt-12 space-y-10 text-[#1C1B17]/80">
                    <Reveal>
                        <h2 className="text-xl font-semibold text-[#1C1B17]">1. Information We Collect</h2>
                        <p className="mt-3 text-sm leading-relaxed sm:text-base">
                            We collect personal information that you voluntarily provide to us when booking a consultation, subscribing to our newsletter, or contacting us. This may include your name, email address, and phone number.
                        </p>
                    </Reveal>

                    <Reveal>
                        <h2 className="text-xl font-semibold text-[#1C1B17]">2. How We Use Your Information</h2>
                        <p className="mt-3 text-sm leading-relaxed sm:text-base">
                            Your information is used to facilitate consultations, respond to inquiries, and send relevant updates (if opted-in). We do not sell your personal data to third parties.
                        </p>
                    </Reveal>

                    <Reveal>
                        <h2 className="text-xl font-semibold text-[#1C1B17]">3. Data Security</h2>
                        <p className="mt-3 text-sm leading-relaxed sm:text-base">
                            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, or destruction.
                        </p>
                    </Reveal>

                    <Reveal>
                        <h2 className="text-xl font-semibold text-[#1C1B17]">4. Your Rights</h2>
                        <p className="mt-3 text-sm leading-relaxed sm:text-base">
                            You have the right to access, correct, or delete your personal data. You may also opt-out of marketing communications at any time by contacting us.
                        </p>
                    </Reveal>

                    <Reveal>
                        <h2 className="text-xl font-semibold text-[#1C1B17]">5. Contact Us</h2>
                        <p className="mt-3 text-sm leading-relaxed sm:text-base">
                            If you have any questions about this Privacy Policy, please contact us at{" "}
                            <a href="mailto:lina@therapish.com" className="text-[#1C1B17] underline hover:text-[#1C1B17]/80">
                                lina@therapish.com
                            </a>.
                        </p>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}