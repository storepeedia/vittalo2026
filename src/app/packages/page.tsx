import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { TripCard } from "@/components/TripCard";

export const revalidate = 60; // Cache for 60 seconds (ISR) for faster loading

export default async function PackagesPage() {
  const supabase = await createClient();
  const { data: packages, error } = await supabase
    .from("packages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching packages:", error);
  }

  // Fallback data
  const displayPackages = packages && packages.length > 0 ? packages : [
    {
      id: "1",
      title: "Swiss Alps Explorer",
      duration_days: 7,
      duration_nights: 6,
      route: "Zurich – Interlaken – Zermatt – Geneva",
      starting_price: 1299,
      image_url: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070&auto=format&fit=crop",
      is_active: true,
      tags_top_left: "Available",
      tags_image_bottom: "7 Days 6 Nights, Train Tour",
      tags_body_top: "Sightseeing, Alps, Comfort"
    },
    {
      id: "2",
      title: "Central Europe Highlights",
      duration_days: 10,
      duration_nights: 9,
      route: "Prague – Vienna – Budapest",
      starting_price: 999,
      image_url: "https://images.unsplash.com/photo-1513807016779-d51c0c026263?q=80&w=2070&auto=format&fit=crop",
      is_active: false,
      tags_top_left: "",
      tags_image_bottom: "10 Days 9 Nights, Bus Tour",
      tags_body_top: "City Tour, History, Culture"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-gray-500 font-bold tracking-widest text-sm mb-2">
              JOURNEYS THAT STAY WITH YOU
            </p>
            <h1 className="text-4xl font-bold text-gray-900">Popular Europe Packages</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPackages.map((pkg: any) => (
            <TripCard
              key={pkg.id}
              id={pkg.id}
              type="package"
              title={pkg.title}
              imageUrl={pkg.image_url}
              isActive={pkg.is_active !== false}
              tagsTopLeft={pkg.tags_top_left}
              tagsImageBottom={pkg.tags_image_bottom}
              tagsBodyTop={pkg.tags_body_top}
              durationDays={pkg.duration_days}
              durationNights={pkg.duration_nights}
              route={pkg.route}
              startingPriceEur={pkg.starting_price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
