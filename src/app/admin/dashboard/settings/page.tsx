import { createClient } from "@/lib/supabase/server";
import { AdminContactSettings } from "@/components/AdminForms";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data: contactSettings } = await supabase.from("contact_settings").select("*").single();

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>
      <div className="p-6">
        <AdminContactSettings settings={contactSettings} />
      </div>
    </div>
  );
}
