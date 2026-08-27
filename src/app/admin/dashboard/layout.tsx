import { ReactNode } from "react";
import Link from "next/link";
import { logout } from "@/actions/admin/auth";
import { Mountain, LayoutDashboard, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

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
          <Mountain className="text-[#F59E0B] w-6 h-6" />
          <span className="text-lg font-bold tracking-wider hidden sm:block">NAVITTALO ADMIN</span>
        </Link>
        <div className="flex items-center gap-6">
          <span className="text-sm text-gray-300 hidden sm:block">{user.email}</span>
          <form action={logout}>
            <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </form>
        </div>
      </header>

      <main className="flex-grow p-4 sm:p-8">
        {children}
      </main>
    </div>
  );
}
