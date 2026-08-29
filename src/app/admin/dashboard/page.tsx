import { createClient } from "@/lib/supabase/server";
import { AdminCamps, AdminPackages, AdminContactSettings } from "@/components/AdminForms";

export const revalidate = 0;

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: camps } = await supabase.from("camps").select("*").order("created_at", { ascending: false });
  const { data: packages } = await supabase.from("packages").select("*").order("created_at", { ascending: false });
  const { data: campBookings } = await supabase.from("camp_bookings").select("*, camps(title)").order("created_at", { ascending: false });
  const { data: packageBookings } = await supabase.from("package_bookings").select("*, packages(title)").order("created_at", { ascending: false });
  const { data: contactSettings } = await supabase.from("contact_settings").select("*").single();

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Management</h1>
      </div>

      <div className="p-6">
         <div className="flex gap-4 border-b border-gray-200 mb-6 pb-2 overflow-x-auto">
            <a href="#camps" className="px-4 py-2 font-medium text-[#0B1E36] border-b-2 border-[#F59E0B]">Camps</a>
            <a href="#packages" className="px-4 py-2 font-medium text-gray-500 hover:text-gray-900">Packages</a>
            <a href="#camp-bookings" className="px-4 py-2 font-medium text-gray-500 hover:text-gray-900">Camp Bookings</a>
            <a href="#package-bookings" className="px-4 py-2 font-medium text-gray-500 hover:text-gray-900">Package Bookings</a>
            <a href="#settings" className="px-4 py-2 font-medium text-gray-500 hover:text-gray-900">Settings</a>
         </div>

         <div id="settings">
            <AdminContactSettings settings={contactSettings} />
         </div>

         <div id="camps">
            <AdminCamps camps={camps || []} />
         </div>

         <div id="packages">
            <AdminPackages packages={packages || []} />
         </div>

         <div id="camp-bookings" className="mb-12 border-b border-gray-200 pb-12">
            <h2 className="text-xl font-bold mb-4">Camp Bookings</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                 <thead className="bg-gray-50 text-gray-900">
                   <tr>
                     <th className="p-3 font-semibold">Customer</th>
                     <th className="p-3 font-semibold">Camp</th>
                     <th className="p-3 font-semibold">Spots</th>
                     <th className="p-3 font-semibold">Total Price</th>
                     <th className="p-3 font-semibold">Status</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   {(campBookings || []).map((b: any) => (
                     <tr key={b.id} className="hover:bg-gray-50">
                       <td className="p-3 font-medium text-gray-900">
                         {b.full_name} <br/><span className="text-xs text-gray-400">{b.email}</span>
                       </td>
                       <td className="p-3">{b.camps?.title}</td>
                       <td className="p-3">{b.spots_booked}</td>
                       <td className="p-3">€{b.total_price}</td>
                       <td className="p-3 capitalize">{b.booking_status}</td>
                     </tr>
                   ))}
                   {(!campBookings || campBookings.length === 0) && (
                      <tr><td colSpan={5} className="p-4 text-center text-gray-500">No camp bookings yet.</td></tr>
                   )}
                 </tbody>
              </table>
            </div>
         </div>

         <div id="package-bookings" className="mb-12">
            <h2 className="text-xl font-bold mb-4">Package Inquiries</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                 <thead className="bg-gray-50 text-gray-900">
                   <tr>
                     <th className="p-3 font-semibold">Customer</th>
                     <th className="p-3 font-semibold">Package</th>
                     <th className="p-3 font-semibold">Travelers</th>
                     <th className="p-3 font-semibold">Requests</th>
                     <th className="p-3 font-semibold">Status</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   {(packageBookings || []).map((b: any) => (
                     <tr key={b.id} className="hover:bg-gray-50">
                       <td className="p-3 font-medium text-gray-900">
                         {b.full_name} <br/><span className="text-xs text-gray-400">{b.email}</span>
                       </td>
                       <td className="p-3">{b.packages?.title}</td>
                       <td className="p-3">{b.number_of_travelers}</td>
                       <td className="p-3 text-xs max-w-xs truncate">{b.custom_requests || "-"}</td>
                       <td className="p-3 capitalize">{b.booking_status}</td>
                     </tr>
                   ))}
                   {(!packageBookings || packageBookings.length === 0) && (
                      <tr><td colSpan={5} className="p-4 text-center text-gray-500">No package inquiries yet.</td></tr>
                   )}
                 </tbody>
              </table>
            </div>
         </div>

      </div>
    </div>
  );
}
