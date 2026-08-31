"use client";

import { useState } from "react";
import { updateCamp } from "@/actions/admin/camps";
import { X } from "lucide-react";

export function EditCampModal({ camp, onClose }: { camp: any; onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      await updateCamp(camp.id, formData);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to update camp");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Edit Camp: {camp.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</label>
  <input name="title" required placeholder="Camp Title" defaultValue={camp.title} className="p-3 bg-gray-100 border-none text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#F59E0B] w-full" />
</div>
          <div className="flex flex-col gap-1">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Activity Type</label>
  <input name="activity_type" required placeholder="Activity (e.g. Skiing)" defaultValue={camp.activity_type} className="p-3 bg-gray-100 border-none text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#F59E0B] w-full" />
</div>
          <div className="flex flex-col gap-1 col-span-2">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Camp Dates</label>
  <input name="camp_dates" required placeholder="Dates (e.g. Dec 15 - Dec 20)" defaultValue={camp.camp_dates} className="p-3 bg-gray-100 border-none text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#F59E0B] w-full" />
</div>
          <div className="flex flex-col gap-1">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Spots</label>
  <input name="total_spots" type="number" required placeholder="Total Spots" defaultValue={camp.total_spots} className="p-3 bg-gray-100 border-none text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#F59E0B] w-full" />
</div>
          <div className="flex flex-col gap-1">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Price (€)</label>
  <input name="price_per_person" type="number" required placeholder="Price per person (€)" defaultValue={camp.price_per_person} className="p-3 bg-gray-100 border-none text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#F59E0B] w-full" />
</div>
          <div className="flex flex-col gap-1">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Price (PLN)</label>
  <input name="price_per_person_pln" type="number" required placeholder="Price per person (PLN)" defaultValue={camp.price_per_person_pln} className="p-3 bg-gray-100 border-none text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#F59E0B] w-full" />
</div>
          <div className="flex flex-col gap-1 col-span-2">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Image URL</label>
  <input name="image_url" required placeholder="Image URL" defaultValue={camp.image_url} className="p-3 bg-gray-100 border-none text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#F59E0B] w-full" />
</div>
          <div className="flex flex-col gap-1 col-span-2">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</label>
  <textarea name="description" required placeholder="Description" defaultValue={camp.description} className="p-3 bg-gray-100 border-none text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#F59E0B] w-full min-h-[120px]" />
</div>
          <div className="flex flex-col gap-1 col-span-2">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Itinerary</label>
  <textarea name="itinerary" placeholder="Itinerary (Rich Text HTML)" defaultValue={camp.itinerary} className="min-h-[100px] p-3 bg-gray-100 border-none text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#F59E0B] w-full min-h-[120px]" />
</div>
          <div className="flex flex-col gap-1 col-span-2">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Inclusions</label>
  <input name="inclusions" required placeholder="Inclusions (comma separated)" defaultValue={camp.inclusions?.join(", ")} className="p-3 bg-gray-100 border-none text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#F59E0B] w-full" />
</div>
          <div className="flex flex-col gap-1 col-span-2">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Top Left Tag</label>
  <input name="tags_top_left" placeholder="Top Left Tag (e.g. Available)" defaultValue={camp.tags_top_left} className="p-3 bg-gray-100 border-none text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#F59E0B] w-full" />
</div>
          <div className="flex flex-col gap-1 col-span-2">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Bottom Image Tags</label>
  <input name="tags_image_bottom" placeholder="Bottom Image Tags (comma separated, e.g. 2 Days 1 Night, Riverside Camp)" defaultValue={camp.tags_image_bottom} className="p-3 bg-gray-100 border-none text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#F59E0B] w-full" />
</div>
          <div className="flex flex-col gap-1 col-span-2">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Body Top Tags</label>
  <input name="tags_body_top" placeholder="Body Top Tags (comma separated, e.g. Beginner, Kayaking Sport)" defaultValue={camp.tags_body_top} className="p-3 bg-gray-100 border-none text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#F59E0B] w-full" />
</div>
          <div className="col-span-2 flex items-center gap-2">
             <input name="is_active" type="checkbox" value="true" defaultChecked={camp.is_active} id="editActiveCamp"/>
             <label htmlFor="editActiveCamp">Is Active?</label>
          </div>
          <div className="col-span-2 flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="bg-[#0B1E36] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#112d52] disabled:opacity-50">
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}
