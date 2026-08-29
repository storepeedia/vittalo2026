import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { TripCard } from "@/components/TripCard";

export const revalidate = 0; // Disable cache to always fetch fresh data

export default async function CampsPage() {
  const supabase = await createClient();
  const { data: camps, error } = await supabase
    .from("camps")
    .select("*")
    .order("start_date", { ascending: true });

  if (error) {
    console.error("Error fetching camps:", error);
  }

  // Fallback data in case DB is not populated yet or local Supabase is skipped
  const displayCamps = camps && camps.length > 0 ? camps : [
    {
      id: "1",
      title: "Tatra Mountain Summit Trek",
      start_date: "2024-06-15",
      end_date: "2024-06-20",
      available_spots: 12,
      total_spots: 15,
      price_per_person: 450,
      price_per_person_pln: 1950,
      image_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
      is_active: true,
      tags_top_left: "Available",
      tags_image_bottom: "6 Days 5 Nights, Mountain Trek",
      tags_body_top: "Advanced, Trekking, Summer"
    },
    {
      id: "2",
      title: "Crystal Waters Kayak Expedition",
      start_date: "2024-07-10",
      end_date: "2024-07-14",
      available_spots: 8,
      total_spots: 20,
      price_per_person: 320,
      price_per_person_pln: 1400,
      image_url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop",
      is_active: false,
      tags_top_left: "",
      tags_image_bottom: "5 Days 4 Nights, Riverside Camp",
      tags_body_top: "Beginner, Kayaking Sport"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-gray-500 font-bold tracking-widest text-sm mb-2">
              ADVENTURE AWAITS
            </p>
            <h1 className="text-4xl font-bold text-gray-900">Upcoming Camps</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCamps.map((camp: any) => {
            return (
              <TripCard
                key={camp.id}
                id={camp.id}
                type="camp"
                title={camp.title}
                imageUrl={camp.image_url}
                isActive={camp.is_active}
                tagsTopLeft={camp.tags_top_left}
                tagsImageBottom={camp.tags_image_bottom}
                tagsBodyTop={camp.tags_body_top}
                startDate={camp.start_date}
                endDate={camp.end_date}
                priceEur={camp.price_per_person}
                pricePln={camp.price_per_person_pln}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
