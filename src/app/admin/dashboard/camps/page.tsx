import { createClient } from "@/lib/supabase/server";
import { AdminCamps } from "@/components/AdminForms";

export const revalidate = 0;

export default async function AdminCampsPage() {
  const supabase = await createClient();
  const { data: camps } = await supabase.from("camps").select("*").order("priority", { ascending: true, nullsFirst: false }).order("created_at", { ascending: false });

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Camps Management</h1>
      </div>
      <div className="p-6">
        <AdminCamps camps={camps || []} />
      </div>
    </div>
  );
}
