import { createClient } from "@/lib/supabase/server";
import { AdminPackages } from "@/components/AdminForms";

export const revalidate = 0;

export default async function AdminPackagesPage() {
  const supabase = await createClient();
  const { data: packages } = await supabase.from("packages").select("*").order("created_at", { ascending: false });

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Packages Management</h1>
      </div>
      <div className="p-6">
        <AdminPackages packages={packages || []} />
      </div>
    </div>
  );
}
