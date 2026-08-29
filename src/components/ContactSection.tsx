"use client";

import { Mail, Phone } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Contact Info */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-[#142A58] leading-tight">
            Questions?
            <br />
            Get in touch!
          </h2>
          <p className="text-gray-600 text-lg">
            Reach out if you have any questions or just want to connect!
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <a
                href="mailto:nnavittalo@gmail.com"
                className="text-gray-700 font-medium hover:text-[#F59E0B] transition-colors"
              >
                nnavittalo@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <a
                href="tel:+48729648977"
                className="text-gray-700 font-medium hover:text-[#F59E0B] transition-colors"
              >
                +48729648977
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Newsletter */}
        <div className="bg-[#142A58] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h3 className="text-2xl font-bold">Subscribe to newsletter</h3>
            <p className="text-gray-300">To be up to date with new camps.</p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full bg-transparent border-b border-gray-400 py-3 px-0 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-transparent border-b border-gray-400 py-3 px-0 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="pt-4 flex items-start gap-3">
                <input type="checkbox" id="privacy" className="mt-1" />
                <label htmlFor="privacy" className="text-sm text-gray-300">
                  By signing up you agree to our{" "}
                  <a href="#" className="underline">
                    Terms
                  </a>{" "}
                  &{" "}
                  <a href="#" className="underline">
                    Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1A3673] hover:bg-[#204085] text-white font-medium py-4 rounded-xl mt-6 transition-colors"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
