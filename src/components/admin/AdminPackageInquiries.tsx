"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export function AdminPackageInquiries({ inquiries }: { inquiries: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [packageFilter, setPackageFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const filteredInquiries = inquiries.filter((b) => {
    const matchesSearch = b.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPackage = b.packages?.title?.toLowerCase().includes(packageFilter.toLowerCase());

    // Filter by package selected travel dates rather than inquiry creation date
    const selectedDate = b.selected_dates ? new Date(b.selected_dates).toISOString().split('T')[0] : null;
    const matchesDate = dateFilter ? selectedDate === dateFilter : true;

    return matchesSearch && matchesPackage && matchesDate;
  });

  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1E36]"
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Filter by package name..."
            value={packageFilter}
            onChange={(e) => setPackageFilter(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1E36]"
          />
        </div>
        <div className="flex-1">
          <input
            type="date"
            title="Filter by inquiry date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1E36] text-gray-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-900">
            <tr>
              <th className="p-3 font-semibold">Customer</th>
              <th className="p-3 font-semibold">Package</th>
              <th className="p-3 font-semibold">Inquiry Date</th>
              <th className="p-3 font-semibold">Travelers</th>
              <th className="p-3 font-semibold">Requests</th>
              <th className="p-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredInquiries.map((b: any) => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-900">
                  {b.full_name} <br/><span className="text-xs text-gray-400">{b.email}</span>
                </td>
                <td className="p-3">{b.packages?.title}</td>
                <td className="p-3">{new Date(b.created_at).toLocaleDateString()}</td>
                <td className="p-3">{b.number_of_travelers}</td>
                <td className="p-3 text-xs max-w-xs truncate">{b.custom_requests || "-"}</td>
                <td className="p-3 capitalize">{b.booking_status}</td>
              </tr>
            ))}
            {filteredInquiries.length === 0 && (
              <tr><td colSpan={6} className="p-4 text-center text-gray-500">No package inquiries match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
