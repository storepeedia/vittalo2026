"use client";

import { usePathname } from "next/navigation";
import { ShieldCheck, Clock, CheckCircle, HeartHandshake } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="mt-auto relative z-10 w-full px-4 py-8">
      <div className="container mx-auto">
        <div className="bg-[#0B1E36] rounded-full py-6 px-4 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 text-white max-w-6xl mx-auto shadow-2xl">
          <div className="flex items-center gap-3">
            <HeartHandshake className="text-[#F59E0B] w-6 h-6" />
            <span className="font-semibold text-sm md:text-base">Trusted by Travellers</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-[#F59E0B] w-6 h-6" />
            <span className="font-semibold text-sm md:text-base">Safe & Secure</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="text-[#F59E0B] w-6 h-6" />
            <span className="font-semibold text-sm md:text-base">24/7 Support</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="text-[#F59E0B] w-6 h-6" />
            <span className="font-semibold text-sm md:text-base">Best Price Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
