import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import CampBookingForm from "@/components/CampBookingForm";
import { Tent, Calendar, Users, MapPin } from "lucide-react";

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
      start_date: "2024-06-15",
      end_date: "2024-06-20",
      available_spots: 12,
      total_spots: 15,
      price_per_person: 450,
      image_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
      description: "A challenging but rewarding trek to the peaks of the Tatra Mountains.",
      inclusions: ["Guide", "Accommodation", "Meals", "Permits"]
    },
    {
      id: "2",
      title: "Crystal Waters Kayak Expedition",
      activity_type: "Kayaking",
      start_date: "2024-07-10",
      end_date: "2024-07-14",
      available_spots: 8,
      total_spots: 20,
      price_per_person: 320,
      image_url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop",
      description: "Paddle through crystal clear turquoise waters and explore hidden coves.",
      inclusions: ["Kayak Rental", "Life Jacket", "Lunch", "Instructor"]
    },
  ];

  const finalCamp = camp || mockCamps.find(c => c.id === id);

  if (!finalCamp) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="relative h-96 w-full rounded-3xl overflow-hidden shadow-lg">
               <Image src={finalCamp.image_url} alt={finalCamp.title} fill className="object-cover" />
            </div>

            <div>
              <div className="flex items-center gap-2 text-green-700 font-bold mb-3">
                <Tent className="w-5 h-5" />
                <span>{finalCamp.activity_type}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{finalCamp.title}</h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">{finalCamp.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 border-y border-gray-200 py-6">
                 <div className="flex flex-col gap-1">
                   <span className="text-gray-500 text-sm">Start Date</span>
                   <span className="font-bold text-gray-900">{format(new Date(finalCamp.start_date), "MMM d, yyyy")}</span>
                 </div>
                 <div className="flex flex-col gap-1">
                   <span className="text-gray-500 text-sm">End Date</span>
                   <span className="font-bold text-gray-900">{format(new Date(finalCamp.end_date), "MMM d, yyyy")}</span>
                 </div>
                 <div className="flex flex-col gap-1">
                   <span className="text-gray-500 text-sm">Availability</span>
                   <span className="font-bold text-gray-900">{finalCamp.available_spots} / {finalCamp.total_spots}</span>
                 </div>
                 <div className="flex flex-col gap-1">
                   <span className="text-gray-500 text-sm">Price per person</span>
                   <span className="font-bold text-gray-900">€{finalCamp.price_per_person}</span>
                 </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">What&apos;s Included</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {finalCamp.inclusions?.map((inc: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {inc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <CampBookingForm camp={finalCamp} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
