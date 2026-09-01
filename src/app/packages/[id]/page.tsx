import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PackageBookingForm from "@/components/PackageBookingForm";
import { Map, Clock, CheckCircle, Check } from "lucide-react";

export default async function PackageDetailsPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: pkg } = await supabase.from("packages").select("*").eq("id", id).single();

  const mockPackages = [
    {
      id: "1",
      title: "Swiss Alps Explorer",
      duration_days: 7,
      duration_nights: 6,
      route: "Zurich – Interlaken – Zermatt – Geneva",
      starting_price: 1299,
      image_url: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070&auto=format&fit=crop,https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop",
      description: "Discover the magic of the Swiss Alps, from charming villages to towering peaks.",
      itinerary: [
        {day: 1, description: "Arrival in Zurich"},
        {day: 2, description: "Train to Interlaken"}
      ]
    }
  ];

  const finalPkg = pkg || mockPackages.find(p => p.id === id);

  if (!finalPkg) {
    notFound();
  }

  // Parse images for masonry grid similar to camps
  const images = (finalPkg.image_url || "").split(",").map((s: string) => s.trim()).filter(Boolean);

  const hardcodedDescriptionText = "Feel the thrill of the wild 🌿\n\nDiscover the magic... Whether you're a first-timer or a seasoned adventurer, this package is carefully designed to deliver an unforgettable experience from start to finish.";

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12">

          <div className="lg:w-2/3 flex flex-col gap-8 order-1 lg:order-1">

            {/* IMAGE GRID */}
            {images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
                <div className="relative w-full h-full">
                  <Image src={images[0]} alt={finalPkg.title} fill className="object-cover" />
                </div>
                {images.length > 1 && (
                  <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-2 h-full">
                    {images.slice(1, 5).map((imgUrl: string, idx: number) => (
                      <div key={idx} className="relative w-full h-full">
                        <Image src={imgUrl} alt={`${finalPkg.title} ${idx+2}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div>
              <div className="flex items-center gap-4 text-blue-700 font-bold mb-3">
                <div className="flex items-center gap-1">
                   <Clock className="w-5 h-5" />
                   <span>{finalPkg.duration_days}D / {finalPkg.duration_nights}N</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                   <Map className="w-5 h-5" />
                   <span>{finalPkg.route}</span>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">{finalPkg.title}</h1>

              <p className="text-gray-600 text-[15px] leading-relaxed mb-10 whitespace-pre-line">
                {hardcodedDescriptionText}
              </p>

              <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4">Itinerary</h3>
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">

                {typeof finalPkg.itinerary === "string" ? (
                   <div
                     className="prose prose-sm md:prose-base max-w-none text-gray-700 break-words
                                prose-p:my-2 prose-ol:pl-4 prose-li:my-1"
                     dangerouslySetInnerHTML={{ __html: finalPkg.itinerary }}
                   />
                ) : (
                  <div className="flex flex-col gap-4 border-l-2 border-blue-100 pl-4 ml-2 break-words">
                    {Array.isArray(finalPkg.itinerary) && finalPkg.itinerary?.map((item: any, idx: number) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[25px] top-1 bg-blue-500 w-3 h-3 rounded-full ring-4 ring-white"></div>
                        <h4 className="font-bold text-gray-900 mb-1">Day {item.day}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:w-1/3 flex flex-col gap-6 order-2 lg:order-2">
            <div className="sticky top-32 flex flex-col gap-6">

              {/* PRICE CARD FOR PACKAGES (EUR Only) */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Starting Price</div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[40px] font-black text-[#2563eb] leading-none">
                    {finalPkg.starting_price}
                  </span>
                  <span className="text-xl font-bold text-[#2563eb]">EUR</span>
                </div>
                <div className="text-gray-500 text-sm flex items-center gap-1.5 mt-3 border-b border-gray-100 pb-4">
                  <Check className="w-4 h-4 text-gray-400" />
                  Guide always included
                </div>
              </div>

              <PackageBookingForm pkg={finalPkg} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
