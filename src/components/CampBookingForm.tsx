"use client";

import { useState } from "react";
import { bookCamp } from "@/actions/bookings";

export default function CampBookingForm({ camp }: { camp: any }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("camp_id", camp.id);
    formData.append("price_per_person", camp.price_per_person.toString());

    const result = await bookCamp(formData);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  }

  if (success) {
    return (
      <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-center">
        <h3 className="text-xl font-bold text-green-800 mb-2">Booking Confirmed!</h3>
        <p className="text-green-700">We have received your booking and will contact you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col gap-4">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Book this Camp</h3>
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Spots to Book</label>
        <input name="spots_booked" type="number" min="1" max={camp.available_spots} defaultValue="1" required className="w-full border border-gray-300 rounded-lg px-4 py-2" />
      </div>

      <button type="submit" disabled={loading} className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-xl mt-4 transition-colors disabled:opacity-50">
        {loading ? "Processing..." : "Confirm Booking"}
      </button>
    </form>
  );
}
