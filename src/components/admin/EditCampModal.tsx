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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl my-8">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Edit Camp: {camp.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-2 gap-4">
          <input name="title" required placeholder="Camp Title" defaultValue={camp.title} className="p-2 border rounded" />
          <input name="activity_type" required placeholder="Activity (e.g. Skiing)" defaultValue={camp.activity_type} className="p-2 border rounded" />
          <input name="camp_dates" required placeholder="Dates (e.g. Dec 15 - Dec 20)" defaultValue={camp.camp_dates} className="p-2 border rounded col-span-2" />
          <input name="total_spots" type="number" required placeholder="Total Spots" defaultValue={camp.total_spots} className="p-2 border rounded" />
          <input name="price_per_person" type="number" required placeholder="Price per person (€)" defaultValue={camp.price_per_person} className="p-2 border rounded" />
          <input name="price_per_person_pln" type="number" required placeholder="Price per person (PLN)" defaultValue={camp.price_per_person_pln} className="p-2 border rounded" />
          <input name="image_url" required placeholder="Image URL" defaultValue={camp.image_url} className="p-2 border rounded col-span-2" />
          <textarea name="description" required placeholder="Description" defaultValue={camp.description} className="p-2 border rounded col-span-2" />
          <textarea name="itinerary" placeholder="Itinerary (Rich Text HTML)" defaultValue={camp.itinerary} className="p-2 border rounded col-span-2 min-h-[100px]" />
          <input name="inclusions" required placeholder="Inclusions (comma separated)" defaultValue={camp.inclusions?.join(", ")} className="p-2 border rounded col-span-2" />
          <input name="tags_top_left" placeholder="Top Left Tag (e.g. Available)" defaultValue={camp.tags_top_left} className="p-2 border rounded col-span-2" />
          <input name="tags_image_bottom" placeholder="Bottom Image Tags (comma separated, e.g. 2 Days 1 Night, Riverside Camp)" defaultValue={camp.tags_image_bottom} className="p-2 border rounded col-span-2" />
          <input name="tags_body_top" placeholder="Body Top Tags (comma separated, e.g. Beginner, Kayaking Sport)" defaultValue={camp.tags_body_top} className="p-2 border rounded col-span-2" />
          <div className="col-span-2 flex items-center gap-2">
             <input name="is_active" type="checkbox" value="true" defaultChecked={camp.is_active} id="editActiveCamp"/>
             <label htmlFor="editActiveCamp">Is Active?</label>
          </div>
          <div className="col-span-2 flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 disabled:opacity-50">
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
