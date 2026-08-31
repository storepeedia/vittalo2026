import { createClient } from "@/lib/supabase/server";
import { AdminPackageInquiries } from "@/components/admin/AdminPackageInquiries";

export const revalidate = 0;

export default async function AdminPackageInquiriesPage() {
  const supabase = await createClient();
  const { data: packageBookings } = await supabase.from("package_bookings").select("*, packages(title)").order("created_at", { ascending: false });

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Package Inquiries</h1>
      </div>
      <div className="p-6">
        <AdminPackageInquiries inquiries={packageBookings || []} />
      </div>
    </div>
  );
}
