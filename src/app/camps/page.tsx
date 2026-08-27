import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";

export const revalidate = 0; // Disable cache to always fetch fresh data

export default async function CampsPage() {
  const supabase = await createClient();
  const { data: camps, error } = await supabase
    .from("camps")
    .select("*")
    .eq("is_active", true)
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
      image_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "2",
      title: "Crystal Waters Kayak Expedition",
      start_date: "2024-07-10",
      end_date: "2024-07-14",
      available_spots: 8,
      total_spots: 20,
      price_per_person: 320,
      image_url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "3",
      title: "Alpine Downhill Ski Adventure",
      start_date: "2024-01-20",
      end_date: "2024-01-27",
      available_spots: 25,
      total_spots: 25,
      price_per_person: 850,
      image_url: "https://images.unsplash.com/photo-1551524164-687a55dd1126?q=80&w=1925&auto=format&fit=crop",
    },
    {
      id: "4",
      title: "Cozy Alpine Cabin Staycation",
      start_date: "2024-12-22",
      end_date: "2024-12-27",
      available_spots: 2,
      total_spots: 10,
      price_per_person: 599,
      image_url: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=2070&auto=format&fit=crop",
    },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCamps.map((camp: any) => {
            return (
              <div key={camp.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex flex-col">
                <div className="relative h-48 w-full">
                  <Image
                    src={camp.image_url}
                    alt={camp.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                    {camp.available_spots} Spots Left
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                    {camp.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    {format(new Date(camp.start_date), "MMM d")} - {format(new Date(camp.end_date), "MMM d, yyyy")}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Price</p>
                      <p className="text-lg font-bold text-gray-900">
                        €{camp.price_per_person}
                        <span className="text-sm font-normal text-gray-500">/p</span>
                      </p>
                    </div>
                    {/* Placeholder Link for now */}
                    <Link
                      href={`/camps/${camp.id}`}
                      className="bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
