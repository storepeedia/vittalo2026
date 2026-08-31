"use client";

import { useState } from "react";
import { updatePackage } from "@/actions/admin/packages";
import { X } from "lucide-react";

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
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Edit Package: {pkg.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</label>
  <input name="title" required placeholder="Package Title" defaultValue={pkg.title} className="p-3 bg-gray-100 border-none text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#F59E0B] w-full" />
</div>
          <div className="flex flex-col gap-1">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Route</label>
  <input name="route" required placeholder="Route (e.g. Zurich - Paris)" defaultValue={pkg.route} className="p-3 bg-gray-100 border-none text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#F59E0B] w-full" />
</div>
          <div className="flex flex-col gap-1">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration (Days)</label>
  <input name="duration_days" type="number" required placeholder="Days" defaultValue={pkg.duration_days} className="p-3 bg-gray-100 border-none text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#F59E0B] w-full" />
</div>
          <div className="flex flex-col gap-1">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration (Nights)</label>
  <input name="duration_nights" type="number" required placeholder="Nights" defaultValue={pkg.duration_nights} className="p-3 bg-gray-100 border-none text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#F59E0B] w-full" />
</div>
          <div className="flex flex-col gap-1 col-span-2">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Starting Price (€)</label>
  <input name="starting_price" type="number" required placeholder="Starting Price (€)" defaultValue={pkg.starting_price} className="p-3 bg-gray-100 border-none text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#F59E0B] w-full" />
</div>
          <div className="flex flex-col gap-1 col-span-2">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Image URL</label>
  <input name="image_url" required placeholder="Image URL" defaultValue={pkg.image_url} className="p-3 bg-gray-100 border-none text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#F59E0B] w-full" />
</div>
          <div className="flex flex-col gap-1 col-span-2">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</label>
  <textarea name="description" required placeholder="Description" defaultValue={pkg.description} className="p-3 bg-gray-100 border-none text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#F59E0B] w-full min-h-[120px]" />
</div>
          <div className="flex flex-col gap-1 col-span-2">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Itinerary</label>
  <textarea name="itinerary" required placeholder='Itinerary JSON: [{"day":1,"description":"..."}]' defaultValue={JSON.stringify(pkg.itinerary)} className="font-mono text-sm p-3 bg-gray-100 border-none text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#F59E0B] w-full min-h-[120px]" />
</div>
          <div className="flex flex-col gap-1 col-span-2">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Top Left Tag</label>
  <input name="tags_top_left" placeholder="Top Left Tag (e.g. Available)" defaultValue={pkg.tags_top_left} className="p-3 bg-gray-100 border-none text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#F59E0B] w-full" />
</div>
          <div className="flex flex-col gap-1 col-span-2">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Bottom Image Tags</label>
  <input name="tags_image_bottom" placeholder="Bottom Image Tags (comma separated, e.g. 7 Days, Train)" defaultValue={pkg.tags_image_bottom} className="p-3 bg-gray-100 border-none text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#F59E0B] w-full" />
</div>
          <div className="flex flex-col gap-1 col-span-2">
  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Body Top Tags</label>
  <input name="tags_body_top" placeholder="Body Top Tags (comma separated, e.g. Alps, Sightseeing)" defaultValue={pkg.tags_body_top} className="p-3 bg-gray-100 border-none text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#F59E0B] w-full" />
</div>
          <div className="col-span-2 flex items-center gap-2">
             <input name="is_active" type="checkbox" value="true" defaultChecked={pkg.is_active} id="editActivePkg"/>
             <label htmlFor="editActivePkg">Is Active?</label>
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
