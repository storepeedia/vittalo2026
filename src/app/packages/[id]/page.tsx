import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PackageBookingForm from "@/components/PackageBookingForm";
import { Map, Clock, CheckCircle } from "lucide-react";

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
      image_url: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070&auto=format&fit=crop",
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

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="relative h-96 w-full rounded-3xl overflow-hidden shadow-lg">
               <Image src={finalPkg.image_url} alt={finalPkg.title} fill className="object-cover" />
            </div>

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
              <p className="text-gray-600 text-lg leading-relaxed mb-8">{finalPkg.description}</p>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Itinerary</h3>
              <div className="flex flex-col gap-4 border-l-2 border-blue-100 pl-4 ml-2">
                {finalPkg.itinerary?.map((item: any, idx: number) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[25px] top-1 bg-blue-500 w-3 h-3 rounded-full ring-4 ring-white"></div>
                    <h4 className="font-bold text-gray-900 mb-1">Day {item.day}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <PackageBookingForm pkg={finalPkg} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
