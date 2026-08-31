import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-[#0B1E36] text-white py-4 px-6 shadow-md flex items-center justify-between z-10 relative">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Navittalo Admin Logo" width={24} height={24} className="w-6 h-6 object-contain rounded-md" />
          <span className="text-lg font-bold tracking-wider hidden sm:block">NAVITTALO ADMIN</span>
        </Link>
        <AdminNav email={user.email || ""} />
      </header>

      <main className="flex-grow p-4 sm:p-8">
        {children}
      </main>
    </div>
  );
}
