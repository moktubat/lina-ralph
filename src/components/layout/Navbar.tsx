import Link from "next/link";
import Button from "@/components/ui/Button";

const NAV_LINKS = [
    { label: "Process", href: "#process" },
    { label: "What I help with", href: "#services" },
    { label: "About", href: "#about" },
    { label: "FAQs", href: "#faqs" },
];

export default function Navbar() {
    return (
        <header className="absolute top-0 left-0 z-50 w-full px-4 py-2">
            <nav className="mx-auto flex max-w-7xl items-center justify-between">
                <Link
                    href="/"
                    className="font-serif text-2xl italic leading-tight text-white sm:text-3xl"
                >
                    Lina
                    <br /> Ralph
                </Link>

                <ul className="hidden items-center md:flex">
                    {NAV_LINKS.map((link) => (
                        <li key={link.label}>
                            <Link
                                href={link.href}
                                className="block rounded-lg bg-[#5C4B36]/30 px-4 py-2 text-sm text-white/90 backdrop-blur-lg transition-all duration-300 hover:bg-[#5C4B36]/50"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <Button
                    variant="primary"
                    avatarSrc="/image/avatar-lina.png"
                >
                    Contact us
                </Button>
            </nav>
        </header>
    );
}
