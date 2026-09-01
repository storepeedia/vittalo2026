"use client";

import { useState } from "react";
import { updatePackage } from "@/actions/admin/packages";
import { X } from "lucide-react";
import { FormRichTextEditor } from "../FormRichTextEditor";

export function EditPackageModal({ pkg, onClose }: { pkg: any; onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      await updatePackage(pkg.id, formData);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to update package");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-10 pb-10 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl my-8">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Edit Package: {pkg.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
             <label className="text-sm font-semibold text-gray-700">Package Title</label>
             <input name="title" required placeholder="Package Title" defaultValue={pkg.title} className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
          </div>
          <div className="flex flex-col gap-1">
             <label className="text-sm font-semibold text-gray-700">Route (e.g. Zurich - Paris)</label>
             <input name="route" required placeholder="Route (e.g. Zurich - Paris)" defaultValue={pkg.route} className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
          </div>
          <div className="flex flex-col gap-1">
             <label className="text-sm font-semibold text-gray-700">Days</label>
             <input name="duration_days" type="number" required placeholder="Days" defaultValue={pkg.duration_days} className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
          </div>
          <div className="flex flex-col gap-1">
             <label className="text-sm font-semibold text-gray-700">Nights</label>
             <input name="duration_nights" type="number" required placeholder="Nights" defaultValue={pkg.duration_nights} className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
          </div>
          <div className="flex flex-col gap-1 col-span-2">
             <label className="text-sm font-semibold text-gray-700">Priority (1 is highest)</label>
             <input name="priority" type="number" placeholder="Priority" defaultValue={pkg.priority} className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
          </div>
          <div className="flex flex-col gap-1 col-span-2">
             <label className="text-sm font-semibold text-gray-700">Starting Price (€)</label>
             <input name="starting_price" type="number" required placeholder="Starting Price (€)" defaultValue={pkg.starting_price} className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
          </div>
          <div className="flex flex-col gap-1 col-span-2">
             <label className="text-sm font-semibold text-gray-700">Image URL</label>
             <input name="image_url" required placeholder="Image URL" defaultValue={pkg.image_url} className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
          </div>
          <div className="flex flex-col gap-1 col-span-2">
             <label className="text-sm font-semibold text-gray-700">Description</label>
             <textarea name="description" required placeholder="Description" defaultValue={pkg.description} className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
          </div>
          <div className="flex flex-col gap-1 col-span-2">
             <label className="text-sm font-semibold text-gray-700">Itinerary (Rich Text HTML)</label>
             <FormRichTextEditor name="itinerary" defaultValue={typeof pkg.itinerary === 'string' ? pkg.itinerary : JSON.stringify(pkg.itinerary)} placeholder="Itinerary (Rich Text HTML)" />
          </div>
          <div className="flex flex-col gap-1 col-span-2">
             <label className="text-sm font-semibold text-gray-700">Top Left Tag (e.g. Available)</label>
             <input name="tags_top_left" placeholder="Top Left Tag (e.g. Available)" defaultValue={pkg.tags_top_left} className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
          </div>
          <div className="flex flex-col gap-1 col-span-2">
             <label className="text-sm font-semibold text-gray-700">Bottom Image Tags (comma separated)</label>
             <input name="tags_image_bottom" placeholder="Bottom Image Tags (comma separated, e.g. 7 Days, Train)" defaultValue={pkg.tags_image_bottom} className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
          </div>
          <div className="flex flex-col gap-1 col-span-2">
             <label className="text-sm font-semibold text-gray-700">Body Top Tags (comma separated)</label>
             <input name="tags_body_top" placeholder="Body Top Tags (comma separated, e.g. Alps, Sightseeing)" defaultValue={pkg.tags_body_top} className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
          </div>
          <div className="col-span-2 flex items-center gap-2">
             <input name="is_active" type="checkbox" value="true" defaultChecked={pkg.is_active} id="editActivePkg"/>
             <label htmlFor="editActivePkg">Is Active?</label>
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
