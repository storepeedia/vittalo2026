import { createClient } from "@/lib/supabase/server";
import Link from "next/link";


export default async function Footer() {
  const supabase = await createClient();
  const { data: contactSettings } = await supabase
    .from("contact_settings")
    .select("*")
    .single();

  const email = contactSettings?.email || "info@nnavittalo.com";
  const phone = contactSettings?.phone || "+48512647444";
  const currentYear = new Date().getFullYear();

  // Create WhatsApp link from phone number (stripping non-digits except +)
  const whatsappLink = `https://wa.me/${phone.replace(/[^\d+]/g, '')}`;

  return (
    <footer className="bg-[#0B1E36] text-white pt-16 pb-8 border-t-4 border-[#F59E0B]">
      <div className="container mx-auto px-4 md:px-8">

        {/* Top Section: Questions Get in touch */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-12 mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-0">
            Questions ? <br /> Get in touch
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 text-gray-300">
            <div>
              <p className="text-sm font-semibold text-gray-400 mb-1">Email</p>
              <a href={`mailto:${email}`} className="text-lg hover:text-[#F59E0B] transition-colors">{email}</a>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-400 mb-1">Phone / WhatsApp</p>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-lg hover:text-[#F59E0B] transition-colors">{phone}</a>
            </div>
          </div>
        </div>

        {/* Middle Section: Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">

          {/* Brand/About */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-[#F59E0B]">Navittalo</h3>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              We design unforgettable experiences, from rugged adventure camps in
              the wild to curated journeys through Europe. Experience more. Live more.
            </p>
          </div>

          {/* Company Links */}
          <div className="md:ml-auto">
            <h4 className="text-lg font-bold mb-6 tracking-wider">COMPANY</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
                  login
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 text-sm text-gray-500">
          <p className="mb-4 md:mb-0">
            © {currentYear} NNA VITTALO all rights reserved
          </p>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#F59E0B] hover:text-white transition-all">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#F59E0B] hover:text-white transition-all">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#F59E0B] hover:text-white transition-all">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#F59E0B] hover:text-white transition-all">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
