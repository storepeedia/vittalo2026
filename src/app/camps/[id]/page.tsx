import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CampBookingForm from "@/components/CampBookingForm";
import { Tent, Check, Calendar } from "lucide-react";
import React from 'react';

export default async function CampDetailsPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { id } = await params;

  // Try remote db first
  const { data: camp } = await supabase.from("camps").select("*").eq("id", id).single();

  // Fallback to local array since local DB isn't running
  const mockCamps = [
    {
      id: "1",
      title: "Tatra Mountain Summit Trek",
      activity_type: "Trekking",
      camp_dates: "05 September 2026, 12 October 2026",
      available_spots: 12,
      total_spots: 15,
      price_per_person: 88.99,
      price_per_person_pln: 379,
      image_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop,https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop,https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070&auto=format&fit=crop,https://images.unsplash.com/photo-1512401666611-6677f5984ba0?q=80&w=2070&auto=format&fit=crop,https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=2070&auto=format&fit=crop",
      description: "A challenging but rewarding trek to the peaks of the Tatra Mountains.",
      inclusions: ["Guide always included", "Accommodation included", "Safety gear & insurance", "Professional guide / instructor", "Meals & snacks", "Transport from meeting point"],
      itinerary: "<p><b>Zakopane Trekking & Camping Trip</b></p><br/><p><b>Package Includes</b></p><br/><ol><li>🚙 Transport in Zakopane – Pickup from Zakopane Railway/Bus Station and transportation during the trip.</li><li>🏕️ Accommodation</li><li>🍷 Welcome drink</li><li>🍩 Tea & snacks</li><li>🍽️ Dinner</li><li>🔥 BBQ – Chicken Grill</li><li>🍳 Breakfast</li></ol>"
    }
  ];

  const finalCamp = camp || mockCamps.find(c => c.id === id);

  if (!finalCamp) {
    notFound();
  }

  // Parse images
  const images = (finalCamp.image_url || "").split(",").map((s: string) => s.trim()).filter(Boolean);

  // Format checkmarks for amenities
  const hardcodedDescriptionText = "Discover the magic of the Polish mountains. Trecking Kościeliska Valley to see the Five Polish Ponds Valley. Experienced Tatra mountain guide included. Whether you're a first-timer or a seasoned adventurer, this camp is carefully designed to deliver an unforgettable experience from start to finish.";

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* LEFT COLUMN - CONTENT */}
          <div className="lg:w-2/3 flex flex-col gap-8 order-1 lg:order-1">

            {/* IMAGE GRID */}
            {images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
                <div className="relative w-full h-full">
                  <Image src={images[0]} alt={finalCamp.title} fill className="object-cover" />
                </div>
                {images.length > 1 && (
                  <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-2 h-full">
                    {images.slice(1, 5).map((imgUrl: string, idx: number) => (
                      <div key={idx} className="relative w-full h-full">
                        <Image src={imgUrl} alt={`${finalCamp.title} ${idx+2}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold text-[#1e1b4b] mb-4 flex items-center gap-2">
                Feel the thrill of the wild <span className="text-xl">🌿</span>
              </h2>

              <p className="text-gray-600 text-[15px] leading-relaxed mb-10">
                {hardcodedDescriptionText}
              </p>

              {/* AMENITIES */}
              <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4">Most Popular Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
                {finalCamp.inclusions?.map((inc: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 bg-[#f4f7fa] py-3 px-4 rounded-lg text-gray-700 text-sm">
                    <div className="w-5 h-5 bg-[#10b981] rounded text-white flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    {inc}
                  </div>
                ))}
              </div>

              {/* CAMP DATES */}
              <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4">Camp Date</h3>
              <div className="flex flex-col gap-3 mb-10">
                 {(finalCamp.camp_dates || "").split(",").map((dateStr: string, idx: number) => (
                   <div key={idx} className="flex items-center gap-4 bg-[#f4f7fa] p-4 rounded-xl border border-gray-100">
                     <div className="bg-white p-2.5 rounded-lg shadow-sm text-blue-500">
                       <Calendar className="w-6 h-6" />
                     </div>
                     <div>
                       <div className="font-bold text-[#1e1b4b] text-lg">{dateStr.trim()}</div>
                       <div className="text-gray-500 text-sm">Departure date</div>
                     </div>
                   </div>
                 ))}
              </div>

              {/* ITINERARY */}
              <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4">Itinerary</h3>
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
                <div
                  className="prose prose-sm md:prose-base max-w-none text-gray-700 break-words
                             prose-p:my-2 prose-ol:pl-4 prose-li:my-1"
                  dangerouslySetInnerHTML={{ __html: finalCamp.itinerary || "<p>No itinerary provided.</p>" }}
                />
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN - SIDEBAR */}
          <div className="lg:w-1/3 flex flex-col gap-6 order-2 lg:order-2">
            <div className="sticky top-32 flex flex-col gap-6">

              {/* PRICE CARD */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Total Price</div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[40px] font-black text-[#2563eb] leading-none">
                    {finalCamp.price_per_person_pln || (finalCamp.price_per_person * 4.3).toFixed(0)}
                  </span>
                  <span className="text-xl font-bold text-[#2563eb]">PLN</span>
                  <span className="text-gray-500 font-medium ml-1">
                    (~{finalCamp.price_per_person} EUR)
                  </span>
                </div>
                <div className="text-gray-500 text-sm flex items-center gap-1.5 mt-3 border-b border-gray-100 pb-4">
                  <Check className="w-4 h-4 text-gray-400" />
                  Guide always included
                </div>
              </div>

              {/* BOOKING FORM */}
              <CampBookingForm camp={finalCamp} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
