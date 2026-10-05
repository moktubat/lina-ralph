import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export const metadata = {
    title: "Site Map | Lina Ralph",
};

const LINKS = {
    "Main Pages": [
        { label: "Home", href: "/" },
        { label: "Process", href: "/#process" },
        { label: "What I help with", href: "/#services" },
        { label: "About", href: "/#about" },
        { label: "FAQs", href: "/#faqs" },
    ],
    "Legal": [
        { label: "User Agreement", href: "/user-agreement" },
        { label: "Data Privacy", href: "/data-privacy" },
    ],
    "Contact": [
        { label: "Book a Consultation", href: "/#contact" },
        { label: "Email Us", href: "mailto:lina@therapish.com" },
        { label: "Call Us", href: "tel:+15035551234" },
    ],
};

export default function SiteMap() {
    return (
        <section className="w-full bg-linear-to-b from-[#E8E39A] via-[#C3D98F]/70 to-transparent">
            <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:py-20 lg:py-24">
                <Reveal>
                    <h1 className="font-serif text-4xl font-medium italic leading-[1.1] tracking-tight text-[#1C1B17] sm:text-5xl">
                        Site Map
                    </h1>
                    <p className="mt-4 text-sm leading-relaxed text-[#1C1B17]/70 sm:text-base">
                        A complete guide to navigating our website.
                    </p>
                </Reveal>

                <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {Object.entries(LINKS).map(([category, links], index) => (
                        <Reveal key={category} delay={index * 0.1}>
                            <h2 className="text-lg font-semibold text-[#1C1B17]">
                                {category}
                            </h2>
                            <ul className="mt-4 space-y-3">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-[#1C1B17]/70 underline decoration-[#1C1B17]/20 underline-offset-4 transition-colors hover:text-[#1C1B17] hover:decoration-[#1C1B17]/60 sm:text-base"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}