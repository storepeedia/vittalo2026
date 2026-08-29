
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Mountain } from "lucide-react";
import { clsx } from "clsx";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Camps", href: "/camps" },
  { name: "Europe Packages", href: "/packages" },
  { name: "Customize Trip", href: "#customize" },
  { name: "About Us", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Admin routes don't use this navbar
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        {/* Scrolling Top Bar */}
        <div className="bg-[#0B1E36] overflow-hidden w-full py-1">
          <div className="animate-marquee whitespace-nowrap">
            <span className="text-white text-xs font-medium mx-4">🗻 All passes are included in the price. ⛷️ Skipass, equipment & guide are included in every camp price — no hidden extras!</span>
            <span className="text-white text-xs font-medium mx-4">🗻 All passes are included in the price. ⛷️ Skipass, equipment & guide are included in every camp price — no hidden extras!</span>
            <span className="text-white text-xs font-medium mx-4">🗻 All passes are included in the price. ⛷️ Skipass, equipment & guide are included in every camp price — no hidden extras!</span>
            <span className="text-white text-xs font-medium mx-4">🗻 All passes are included in the price. ⛷️ Skipass, equipment & guide are included in every camp price — no hidden extras!</span>
          </div>
        </div>

        <nav
          className={clsx(
            "w-full transition-all duration-300",
            scrolled ? "bg-white shadow-md py-4" : "bg-transparent py-6"
          )}
        >
          <div className="container mx-auto px-6 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className={clsx("flex items-center gap-2", scrolled ? "text-[#0B1E36]" : "text-white")}>
              <Image src="/logo.png" alt="Navittalo Logo" width={32} height={32} className="w-8 h-8 object-contain rounded-md" />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-wider leading-tight">NNA VITTALO</span>
                <span className={clsx("text-[10px] tracking-widest uppercase leading-tight font-medium", scrolled ? "text-black" : "text-blue-500")}>Adventure Travel</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={clsx("text-sm font-medium relative group", scrolled ? "text-[#0B1E36]" : "text-white")}
                  >
                    {link.name}
                    <span
                      className={clsx(
                        "absolute -bottom-1 left-0 h-[2px] bg-[#F59E0B] transition-all duration-300",
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </Link>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                href="#contact"
                className="bg-[#F59E0B] hover:bg-[#EAB308] text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-colors"
              >
                Enquire Now
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className={clsx("md:hidden", scrolled ? "text-[#0B1E36]" : "text-white")}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-[#0B1E36] shadow-xl flex flex-col items-center py-6 gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#contact"
                className="bg-[#F59E0B] hover:bg-[#EAB308] text-white px-8 py-3 rounded-full font-bold mt-4"
                onClick={() => setIsOpen(false)}
              >
                Enquire Now
              </Link>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
