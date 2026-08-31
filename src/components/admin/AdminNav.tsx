"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import { logout } from "@/actions/admin/auth";

const navLinks = [
  { name: "Camps", href: "/admin/dashboard/camps" },
  { name: "Packages", href: "/admin/dashboard/packages" },
  { name: "Camp Bookings", href: "/admin/dashboard/camp-bookings" },
  { name: "Package Inquiries", href: "/admin/dashboard/package-inquiries" },
  { name: "Settings", href: "/admin/dashboard/settings" },
];

export function AdminNav({ email }: { email: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6 flex-1 ml-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`text-sm font-medium transition-colors ${
              pathname.startsWith(link.href)
                ? "text-white border-b-2 border-[#F59E0B]"
                : "text-gray-300 hover:text-white"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <div className="hidden md:flex items-center gap-6">
        <span className="text-sm text-gray-300">{email}</span>
        <form action={logout}>
          <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </form>
      </div>

      {/* Mobile Navigation Toggle */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-300 hover:text-white focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-[#0B1E36] shadow-lg flex flex-col md:hidden z-50">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`px-6 py-4 text-sm font-medium border-b border-gray-700 ${
                pathname.startsWith(link.href) ? "text-[#F59E0B]" : "text-gray-300"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="px-6 py-4 flex flex-col gap-4 bg-[#0a182b]">
            <span className="text-sm text-gray-300">{email}</span>
            <form action={logout}>
              <button
                type="submit"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors w-full"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
