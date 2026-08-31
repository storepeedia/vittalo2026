import { createClient } from "@/lib/supabase/server";
import { AdminCampBookings } from "@/components/admin/AdminCampBookings";

export const revalidate = 0;

export default async function AdminCampBookingsPage() {
  const supabase = await createClient();
  const { data: campBookings } = await supabase.from("camp_bookings").select("*, camps(title, start_date)").order("created_at", { ascending: false });

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Camp Bookings</h1>
      </div>
      <div className="p-6">
        <AdminCampBookings bookings={campBookings || []} />
      </div>
    </div>
  );
}
