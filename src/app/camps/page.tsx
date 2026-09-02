import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { TripCard } from "@/components/TripCard";

export const revalidate = 60; // Cache for 60 seconds (ISR) for faster loading

export default async function CampsPage() {
  const supabase = await createClient();
  const { data: camps, error } = await supabase
    .from("camps")
    .select("*")
    .order("priority", { ascending: true, nullsFirst: false }).order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching camps:", error);
  }

  // Fallback data in case DB is not populated yet or local Supabase is skipped
  const displayCamps = camps || [];
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
          {displayCamps.map((camp: any) => (
            <TripCard
              key={camp.id}
              id={camp.id}
              type="camp"
              title={camp.title}
              imageUrl={camp.image_url}
              isActive={camp.is_active !== false}
              tagsTopLeft={camp.tags_top_left}
              tagsImageBottom={camp.tags_image_bottom}
              tagsBodyTop={camp.tags_body_top}
              campDates={camp.camp_dates}
              priceEur={camp.price_per_person}
              pricePln={camp.price_per_person_pln}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
