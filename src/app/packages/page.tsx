import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0; // Disable cache to always fetch fresh data

export default async function PackagesPage() {
  const supabase = await createClient();
  const { data: packages, error } = await supabase
    .from("packages")
    .select("*")
    .eq("is_active", true)
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
    },
    {
      id: "2",
      title: "Central Europe Highlights",
      duration_days: 10,
      duration_nights: 9,
      route: "Prague – Vienna – Budapest",
      starting_price: 999,
      image_url: "https://images.unsplash.com/photo-1513807016779-d51c0c026263?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "3",
      title: "Iberian Sun Tour",
      duration_days: 8,
      duration_nights: 7,
      route: "Lisbon – Porto – Madrid",
      starting_price: 1150,
      image_url: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=2070&auto=format&fit=crop",
    },
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
          {displayPackages.map((pkg: any) => {
            return (
              <div key={pkg.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex flex-col group">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={pkg.image_url}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                    {pkg.duration_days} Days / {pkg.duration_nights} Nights
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1 leading-tight">
                      {pkg.title}
                    </h3>
                    <p className="text-gray-200 text-sm flex items-center gap-2">
                       {pkg.route}
                    </p>
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">From</p>
                      <p className="text-xl font-bold text-gray-900">
                        €{pkg.starting_price}
                        <span className="text-sm font-normal text-gray-500">/p</span>
                      </p>
                    </div>
                    {/* Placeholder Link for now */}
                    <Link
                      href={`/packages/${pkg.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                    >
                      View Package
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
