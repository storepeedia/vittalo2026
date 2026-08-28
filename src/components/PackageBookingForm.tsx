"use client";

import { useState } from "react";
import { bookPackage } from "@/actions/bookings";

export default function PackageBookingForm({ pkg }: { pkg: any }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("package_id", pkg.id);
    formData.append("starting_price", pkg.starting_price.toString());

    const result = await bookPackage(formData);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  }

  if (success) {
    return (
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 text-center">
        <h3 className="text-xl font-bold text-blue-800 mb-2">Inquiry Sent!</h3>
        <p className="text-blue-700">We will contact you shortly to finalize your custom package.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col gap-4">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Enquire Now</h3>
      {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input name="full_name" required className="w-full border border-gray-300 rounded-lg px-4 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input name="email" type="email" required className="w-full border border-gray-300 rounded-lg px-4 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input name="phone" required className="w-full border border-gray-300 rounded-lg px-4 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
        <input name="number_of_travelers" type="number" min="1" defaultValue="1" required className="w-full border border-gray-300 rounded-lg px-4 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Custom Requests</label>
        <textarea name="custom_requests" rows={3} className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="Any dietary requirements, room preferences, etc..."></textarea>
      </div>

      <button type="submit" disabled={loading} className="w-full bg-[#F59E0B] hover:bg-[#EAB308] text-white font-bold py-3 rounded-xl mt-4 transition-colors disabled:opacity-50">
        {loading ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
}
