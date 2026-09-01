"use client";
import { useState } from "react";
import { createCamp, deleteCamp } from "@/actions/admin/camps";
import { createPackage, deletePackage } from "@/actions/admin/packages";
import { format } from "date-fns";
import { Trash2, Plus, Edit2 } from "lucide-react";
import { EditCampModal } from "./admin/EditCampModal";
import { EditPackageModal } from "./admin/EditPackageModal";
import { FormRichTextEditor } from "./FormRichTextEditor";

export function AdminCamps({ camps }: { camps: any[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editingCamp, setEditingCamp] = useState<any | null>(null);

  return (
    <div className="mb-12 pb-12">
       <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Camp Inventory</h2>
          <button onClick={() => setShowForm(!showForm)} className="bg-[#0B1E36] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
            <Plus className="w-4 h-4"/> Add Camp
          </button>
       </div>

       {showForm && (
         <form action={async (fd) => { await createCamp(fd); setShowForm(false); }} className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6 grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
               <label className="text-sm font-semibold text-gray-700">Camp Title</label>
               <input name="title" required placeholder="Camp Title" className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <div className="flex flex-col gap-1">
               <label className="text-sm font-semibold text-gray-700">Activity (e.g. Skiing)</label>
               <input name="activity_type" required placeholder="Activity (e.g. Skiing)" className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <div className="flex flex-col gap-1 col-span-2">
               <label className="text-sm font-semibold text-gray-700">Dates (e.g. Dec 15 - Dec 20)</label>
               <input name="camp_dates" required placeholder="Dates (e.g. Dec 15 - Dec 20)" className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <div className="flex flex-col gap-1">
               <label className="text-sm font-semibold text-gray-700">Total Spots</label>
               <input name="total_spots" type="number" required placeholder="Total Spots" className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <div className="flex flex-col gap-1">
               <label className="text-sm font-semibold text-gray-700">Price per person (€)</label>
               <input name="price_per_person" type="number" placeholder="Price per person (€)" className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <div className="flex flex-col gap-1">
               <label className="text-sm font-semibold text-gray-700">Priority (1 is highest)</label>
               <input name="priority" type="number" placeholder="Priority" className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <div className="flex flex-col gap-1">
               <label className="text-sm font-semibold text-gray-700">Price per person (PLN)</label>
               <input name="price_per_person_pln" type="number" placeholder="Price per person (PLN)" className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <div className="flex flex-col gap-1 col-span-2">
               <label className="text-sm font-semibold text-gray-700">Image URL</label>
               <input name="image_url" required placeholder="Image URL" className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <div className="flex flex-col gap-1 col-span-2">
               <label className="text-sm font-semibold text-gray-700">Description</label>
               <textarea name="description" required placeholder="Description" className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <div className="flex flex-col gap-1 col-span-2">
               <label className="text-sm font-semibold text-gray-700">Itinerary (Rich Text HTML)</label>
               <FormRichTextEditor name="itinerary" placeholder="Itinerary (Rich Text HTML)" />
            </div>
            <div className="flex flex-col gap-1 col-span-2">
               <label className="text-sm font-semibold text-gray-700">Inclusions (comma separated)</label>
               <input name="inclusions" required placeholder="Inclusions (comma separated)" className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <div className="flex flex-col gap-1 col-span-2">
               <label className="text-sm font-semibold text-gray-700">Top Left Tag (e.g. Available)</label>
               <input name="tags_top_left" placeholder="Top Left Tag (e.g. Available)" className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <div className="flex flex-col gap-1 col-span-2">
               <label className="text-sm font-semibold text-gray-700">Bottom Image Tags (comma separated)</label>
               <input name="tags_image_bottom" placeholder="Bottom Image Tags (comma separated, e.g. 2 Days 1 Night, Riverside Camp)" className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <div className="flex flex-col gap-1 col-span-2">
               <label className="text-sm font-semibold text-gray-700">Body Top Tags (comma separated)</label>
               <input name="tags_body_top" placeholder="Body Top Tags (comma separated, e.g. Beginner, Kayaking Sport)" className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <div className="col-span-2 flex items-center gap-2">
               <input name="is_active" type="checkbox" value="true" defaultChecked id="activeCamp"/>
               <label htmlFor="activeCamp">Is Active?</label>
            </div>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded font-bold col-span-2">Save Camp</button>
         </form>
       )}

       <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
             <thead className="bg-gray-50 text-gray-900">
               <tr>
                 <th className="p-3 font-semibold">Priority</th>
                 <th className="p-3 font-semibold">Title</th>
                 <th className="p-3 font-semibold">Dates</th>
                 <th className="p-3 font-semibold">Spots</th>
                 <th className="p-3 font-semibold">Price (EUR)</th>
                 <th className="p-3 font-semibold">Status</th>
                 <th className="p-3 font-semibold">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {(camps || []).map((c: any) => (
                 <tr key={c.id} className="hover:bg-gray-50">
                   <td className="p-3">{c.priority || "-"}</td>
                   <td className="p-3 font-medium text-gray-900">{c.title}</td>
                   <td className="p-3 max-w-[200px] truncate" title={c.camp_dates}>{c.camp_dates}</td>
                   <td className="p-3">{c.available_spots} / {c.total_spots}</td>
                   <td className="p-3">€{c.price_per_person}</td>
                   <td className="p-3">
                     <span className={`px-2 py-1 rounded-full text-xs font-semibold ${c.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                       {c.is_active ? 'Active' : 'Inactive'}
                     </span>
                   </td>
                   <td className="p-3 flex items-center gap-3">
                     <button onClick={() => setEditingCamp(c)} className="text-blue-500 hover:text-blue-700"><Edit2 className="w-4 h-4"/></button>
                     <button onClick={() => deleteCamp(c.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4"/></button>
                   </td>
                 </tr>
               ))}
               {(!camps || camps.length === 0) && (
                  <tr><td colSpan={7} className="p-4 text-center text-gray-500">No camps found. Ensure Supabase is connected.</td></tr>
               )}
             </tbody>
          </table>
       </div>
       {editingCamp && <EditCampModal camp={editingCamp} onClose={() => setEditingCamp(null)} />}
    </div>
  );
}

export function AdminPackages({ packages }: { packages: any[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<any | null>(null);

  return (
    <div className="mb-12 pb-12">
       <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Europe Packages</h2>
          <button onClick={() => setShowForm(!showForm)} className="bg-[#0B1E36] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
            <Plus className="w-4 h-4"/> Add Package
          </button>
       </div>

       {showForm && (
         <form action={async (fd) => { await createPackage(fd); setShowForm(false); }} className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6 grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
               <label className="text-sm font-semibold text-gray-700">Package Title</label>
               <input name="title" required placeholder="Package Title" className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <div className="flex flex-col gap-1">
               <label className="text-sm font-semibold text-gray-700">Route (e.g. Zurich - Paris)</label>
               <input name="route" required placeholder="Route (e.g. Zurich - Paris)" className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <div className="flex flex-col gap-1">
               <label className="text-sm font-semibold text-gray-700">Days</label>
               <input name="duration_days" type="number" required placeholder="Days" className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <div className="flex flex-col gap-1">
               <label className="text-sm font-semibold text-gray-700">Nights</label>
               <input name="duration_nights" type="number" required placeholder="Nights" className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <div className="flex flex-col gap-1 col-span-2">
               <label className="text-sm font-semibold text-gray-700">Priority (1 is highest)</label>
               <input name="priority" type="number" placeholder="Priority" className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <div className="flex flex-col gap-1 col-span-2">
               <label className="text-sm font-semibold text-gray-700">Starting Price (€)</label>
               <input name="starting_price" type="number" required placeholder="Starting Price (€)" className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <div className="flex flex-col gap-1 col-span-2">
               <label className="text-sm font-semibold text-gray-700">Image URL</label>
               <input name="image_url" required placeholder="Image URL" className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <div className="flex flex-col gap-1 col-span-2">
               <label className="text-sm font-semibold text-gray-700">Description</label>
               <textarea name="description" required placeholder="Description" className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <div className="flex flex-col gap-1 col-span-2">
               <label className="text-sm font-semibold text-gray-700">Itinerary (Rich Text HTML)</label>
               <FormRichTextEditor name="itinerary" placeholder="Itinerary (Rich Text HTML)" />
            </div>
            <div className="flex flex-col gap-1 col-span-2">
               <label className="text-sm font-semibold text-gray-700">Top Left Tag (e.g. Available)</label>
               <input name="tags_top_left" placeholder="Top Left Tag (e.g. Available)" className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <div className="flex flex-col gap-1 col-span-2">
               <label className="text-sm font-semibold text-gray-700">Bottom Image Tags (comma separated)</label>
               <input name="tags_image_bottom" placeholder="Bottom Image Tags (comma separated, e.g. 7 Days, Train)" className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <div className="flex flex-col gap-1 col-span-2">
               <label className="text-sm font-semibold text-gray-700">Body Top Tags (comma separated)</label>
               <input name="tags_body_top" placeholder="Body Top Tags (comma separated, e.g. Alps, Sightseeing)" className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <div className="col-span-2 flex items-center gap-2">
               <input name="is_active" type="checkbox" value="true" defaultChecked id="activePkg"/>
               <label htmlFor="activePkg">Is Active?</label>
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-bold col-span-2">Save Package</button>
         </form>
       )}

       <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
             <thead className="bg-gray-50 text-gray-900">
               <tr>
                 <th className="p-3 font-semibold">Priority</th>
                 <th className="p-3 font-semibold">Title</th>
                 <th className="p-3 font-semibold">Duration</th>
                 <th className="p-3 font-semibold">Route</th>
                 <th className="p-3 font-semibold">Price</th>
                 <th className="p-3 font-semibold">Status</th>
                 <th className="p-3 font-semibold">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {(packages || []).map((p: any) => (
                 <tr key={p.id} className="hover:bg-gray-50">
                   <td className="p-3">{p.priority || "-"}</td>
                   <td className="p-3 font-medium text-gray-900">{p.title}</td>
                   <td className="p-3">{p.duration_days}D / {p.duration_nights}N</td>
                   <td className="p-3">{p.route}</td>
                   <td className="p-3">€{p.starting_price}</td>
                   <td className="p-3">
                     <span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                       {p.is_active ? 'Active' : 'Inactive'}
                     </span>
                   </td>
                   <td className="p-3 flex items-center gap-3">
                     <button onClick={() => setEditingPackage(p)} className="text-blue-500 hover:text-blue-700"><Edit2 className="w-4 h-4"/></button>
                     <button onClick={() => deletePackage(p.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4"/></button>
                   </td>
                 </tr>
               ))}
               {(!packages || packages.length === 0) && (
                  <tr><td colSpan={7} className="p-4 text-center text-gray-500">No packages found. Ensure Supabase is connected.</td></tr>
               )}
             </tbody>
          </table>
       </div>
       {editingPackage && <EditPackageModal pkg={editingPackage} onClose={() => setEditingPackage(null)} />}
    </div>
  );
}

import { updateContactSettings } from "@/actions/admin/settings";

export function AdminContactSettings({ settings }: { settings: { email: string; phone: string } | null }) {
  const [isEditing, setIsEditing] = useState(false);


  return (
    <div className="mb-12 pb-12">
       <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Contact Settings</h2>
          <button onClick={() => setIsEditing(!isEditing)} className="bg-[#0B1E36] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
            {isEditing ? 'Cancel' : 'Edit Settings'}
          </button>
       </div>

       {isEditing ? (
         <form action={async (fd) => { await updateContactSettings(fd); setIsEditing(false); }} className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6 grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
               <label className="text-sm font-semibold text-gray-700">Email</label>
               <input name="email" type="email" required placeholder="Email" defaultValue={settings?.email || ""} className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <div className="flex flex-col gap-1">
               <label className="text-sm font-semibold text-gray-700">Phone</label>
               <input name="phone" required placeholder="Phone (e.g. +48...)" defaultValue={settings?.phone || ""} className="p-2 border border-black rounded text-gray-700 placeholder-gray-400" />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-bold col-span-2">Save Settings</button>
         </form>
       ) : (
         <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 grid grid-cols-2 gap-4">
           <div>
             <p className="text-sm text-gray-500 font-semibold mb-1">Email</p>
             <p className="font-medium text-gray-900">{settings?.email || "Not set"}</p>
           </div>
           <div>
             <p className="text-sm text-gray-500 font-semibold mb-1">Phone</p>
             <p className="font-medium text-gray-900">{settings?.phone || "Not set"}</p>
           </div>
         </div>
       )}
    </div>
  );
}
