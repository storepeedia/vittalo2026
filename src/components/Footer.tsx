"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="mt-auto relative z-10 w-full bg-[#10246b] text-gray-300 py-16 px-4 font-sans">
      <div className="container mx-auto max-w-6xl">
        {/* Top Info section from IMG_2765.png */}
        <div className="mb-12">
          <p className="mb-4">
            If you want to spend your holidays actively, we will guide you.
            <br />
            Our goal is simple - explore the most beautiful places, create new
            <br />
            friendships, and bring back a bag of beautiful memories. We are
            <br />
            waiting for you. It's an adventure to the{" "}
            <span className="font-bold text-white">bold</span>.
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-white">✉️</span>
              <a
                href="mailto:nnavittalo@gmail.com"
                className="hover:text-white transition-colors border-b border-gray-400 pb-0.5"
              >
                nnavittalo@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white">📞</span>
              <a
                href="tel:+48729648977"
                className="hover:text-white transition-colors"
              >
                +48729648977
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Our Camps */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider mb-6">
              OUR CAMPS
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/camps"
                  className="hover:text-white transition-colors"
                >
                  Kayaking Getaway
                </Link>
              </li>
              <li>
                <Link
                  href="/camps"
                  className="hover:text-white transition-colors"
                >
                  Ski Camp
                </Link>
              </li>
              <li>
                <Link
                  href="/camps"
                  className="hover:text-white transition-colors"
                >
                  Surfing Camp
                </Link>
              </li>
              <li>
                <Link
                  href="/camps"
                  className="hover:text-white transition-colors"
                >
                  Hiking in Tatra
                </Link>
              </li>
              <li>
                <Link
                  href="/camps"
                  className="hover:text-white transition-colors"
                >
                  Camping Weekend
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider mb-6">
              COMPANY
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/camps"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-xl leading-none">&gt;</span> All Camps
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider mb-6">
              CONTACT
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:nnavittalo@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  nnavittalo@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+48729648977"
                  className="hover:text-white transition-colors"
                >
                  +48729648977
                </a>
              </li>
              <li>Warsaw, Poland</li>
              <li>Mon–Fri 9:00–18:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#1a3680] flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2026 NNA VITTALO. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
