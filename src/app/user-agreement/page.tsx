import Reveal from "@/components/ui/Reveal";

export const metadata = {
    title: "User Agreement | Lina Ralph",
};

export default function UserAgreement() {
    return (
        <section className="w-full bg-linear-to-b from-[#E8E39A] via-[#C3D98F]/70 to-transparent">
            <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:py-20 lg:py-24">
                <Reveal>
                    <h1 className="font-serif text-4xl font-medium italic leading-[1.1] tracking-tight text-[#1C1B17] sm:text-5xl">
                        User Agreement
                    </h1>
                    <p className="mt-4 text-sm text-[#1C1B17]/60">
                        Last updated: October 5, 2026
                    </p>
                </Reveal>

                <div className="mt-12 space-y-10 text-[#1C1B17]/80">
                    <Reveal>
                        <h2 className="text-xl font-semibold text-[#1C1B17]">1. Introduction</h2>
                        <p className="mt-3 text-sm leading-relaxed sm:text-base">
                            Welcome to Lina Ralph. By accessing or using our website, you agree to be bound by this User Agreement. If you do not agree to these terms, please do not use our services.
                        </p>
                    </Reveal>

                    <Reveal>
                        <h2 className="text-xl font-semibold text-[#1C1B17]">2. Nature of Services</h2>
                        <p className="mt-3 text-sm leading-relaxed sm:text-base">
                            The services provided through this website, including hypnotherapy and consultations, are for educational and wellness purposes. They are not intended to be a substitute for professional medical advice, diagnosis, or treatment.
                        </p>
                    </Reveal>

                    <Reveal>
                        <h2 className="text-xl font-semibold text-[#1C1B17]">3. User Responsibilities</h2>
                        <p className="mt-3 text-sm leading-relaxed sm:text-base">
                            You agree to provide accurate information when booking consultations and to use the website only for lawful purposes. You are responsible for maintaining the confidentiality of any account information.
                        </p>
                    </Reveal>

                    <Reveal>
                        <h2 className="text-xl font-semibold text-[#1C1B17]">4. Limitation of Liability</h2>
                        <p className="mt-3 text-sm leading-relaxed sm:text-base">
                            Lina Ralph shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or services. Our liability is limited to the maximum extent permitted by law.
                        </p>
                    </Reveal>

                    <Reveal>
                        <h2 className="text-xl font-semibold text-[#1C1B17]">5. Changes to the Agreement</h2>
                        <p className="mt-3 text-sm leading-relaxed sm:text-base">
                            We reserve the right to modify this agreement at any time. Continued use of the website after changes constitutes acceptance of the new terms.
                        </p>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}