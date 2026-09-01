"use client";

import { useState } from "react";
import { bookCamp } from "@/actions/bookings";

export default function CampBookingForm({ camp }: { camp: any }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const dates = (camp.camp_dates || "").split(",").map((d: string) => d.trim()).filter(Boolean);
  const isBookingDisabled = camp.price_per_person == null && camp.price_per_person_pln == null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("camp_id", camp.id);
    formData.append("price_per_person", camp.price_per_person != null ? camp.price_per_person.toString() : "0");
    formData.append("price_per_person_pln", camp.price_per_person_pln != null ? camp.price_per_person_pln.toString() : "0");

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
      <div className="bg-green-50 p-6 rounded-2xl border border-green-200 text-center">
        <h3 className="text-xl font-bold text-green-800 mb-2">Booking Confirmed!</h3>
        <p className="text-green-700">We have received your booking and will contact you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col gap-4">
      {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

      {dates.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
          <select name="chosen_date" required className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white">
            <option value="">-- Choose a date --</option>
            {dates.map((d: string, idx: number) => (
              <option key={idx} value={d}>{d}</option>
            ))}
          </select>
        </div>
      )}

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

      <button type="submit" disabled={loading || isBookingDisabled} className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl mt-4 transition-colors disabled:opacity-50 disabled:bg-gray-400">
        {isBookingDisabled ? "Price Unavailable" : (loading ? "Processing..." : "Book Your Spot")}
      </button>

      <div className="text-center text-xs text-gray-500 mt-2">
        Free cancellation up to 7 days before departure
      </div>
    </form>
  );
}
