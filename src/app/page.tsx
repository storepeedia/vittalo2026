import Image from "next/image";
import Link from "next/link";
import { Tent, Briefcase } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";

export const revalidate = 0;

export default async function Home() {
  const supabase = await createClient();

  const { data: camps } = await supabase.from("camps").select("*").eq("is_active", true).order("start_date", { ascending: true }).limit(4);
  const { data: packages } = await supabase.from("packages").select("*").eq("is_active", true).order("created_at", { ascending: false }).limit(3);

  const displayCamps = camps && camps.length > 0 ? camps : [
    { id: "1", title: "Tatra Mountain Summit Trek", start_date: "2024-06-15", end_date: "2024-06-20", available_spots: 12, total_spots: 15, price_per_person: 450, image_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop" },
    { id: "2", title: "Crystal Waters Kayak Expedition", start_date: "2024-07-10", end_date: "2024-07-14", available_spots: 8, total_spots: 20, price_per_person: 320, image_url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop" },
    { id: "3", title: "Alpine Downhill Ski Adventure", start_date: "2024-01-20", end_date: "2024-01-27", available_spots: 25, total_spots: 25, price_per_person: 850, image_url: "https://images.unsplash.com/photo-1551524164-687a55dd1126?q=80&w=1925&auto=format&fit=crop" },
    { id: "4", title: "Cozy Alpine Cabin Staycation", start_date: "2024-12-22", end_date: "2024-12-27", available_spots: 2, total_spots: 10, price_per_person: 599, image_url: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=2070&auto=format&fit=crop" },
  ];

  const displayPackages = packages && packages.length > 0 ? packages : [
    { id: "1", title: "Swiss Alps Explorer", duration_days: 7, duration_nights: 6, route: "Zurich – Interlaken – Zermatt – Geneva", starting_price: 1299, image_url: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070&auto=format&fit=crop" },
    { id: "2", title: "Central Europe Highlights", duration_days: 10, duration_nights: 9, route: "Prague – Vienna – Budapest", starting_price: 999, image_url: "https://images.unsplash.com/photo-1513807016779-d51c0c026263?q=80&w=2070&auto=format&fit=crop" },
    { id: "3", title: "Iberian Sun Tour", duration_days: 8, duration_nights: 7, route: "Lisbon – Porto – Madrid", starting_price: 1150, image_url: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=2070&auto=format&fit=crop" },
  ];

  return (
    <div className="relative min-h-screen pb-20 bg-white">
      {/* Hero Background Image */}
      <div className="absolute top-0 w-full h-full z-0">
        <Image src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop" alt="Alpine lake mountains" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-start min-h-[100vh] text-center pt-32">
        <div className="border border-white/20 rounded-full px-6 py-2 mb-6 backdrop-blur-sm">
            <p className="text-white font-bold tracking-widest text-xs">🏆 EUROPE'S PREMIER ADVENTURE OPERATOR</p>
        </div>
        <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold max-w-4xl leading-tight mb-6">Your Next<br/>Epic Adventure<br/>Starts with<br/>NNA VITTALO</h1>
        <p className="text-gray-200 text-lg md:text-xl max-w-3xl mb-10 font-light">From mountain peaks to ocean waves — we craft unforgettable travel and adventure camps. Skipass, equipment, guides and accommodation always included.</p>

        <div className="flex flex-row justify-between gap-8 md:gap-24 max-w-4xl border-t border-white/20 pt-8 mb-12">
            <div>
                <p className="text-white font-bold text-3xl md:text-4xl mb-1">150+</p>
                <p className="text-gray-300 text-xs md:text-sm">Happy Adventurers</p>
            </div>
            <div>
                <p className="text-white font-bold text-3xl md:text-4xl mb-1">3+</p>
                <p className="text-gray-300 text-xs md:text-sm">Destinations</p>
            </div>
            <div>
                <p className="text-white font-bold text-3xl md:text-4xl mb-1">1 yr</p>
                <p className="text-gray-300 text-xs md:text-sm">Experience</p>
            </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 max-w-4xl w-full relative z-10 px-4 mb-16">
          <div className="bg-white rounded-2xl p-6 flex-1 flex items-center gap-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop')] bg-cover transition-opacity group-hover:opacity-10" />
            <div className="bg-green-100 p-4 rounded-full relative z-10"><Tent className="text-green-700 w-8 h-8" /></div>
            <div className="text-left relative z-10 flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Join a Camp</h3>
              <p className="text-gray-600 text-sm mb-4">Discover our thrilling outdoor adventure camps.</p>
              <Link href="/camps" className="text-green-700 font-bold text-sm flex items-center hover:underline">Explore Camps &rarr;</Link>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 flex-1 flex items-center gap-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1513807016779-d51c0c026263?q=80&w=2070&auto=format&fit=crop')] bg-cover transition-opacity group-hover:opacity-10" />
            <div className="bg-blue-100 p-4 rounded-full relative z-10"><Briefcase className="text-blue-700 w-8 h-8" /></div>
            <div className="text-left relative z-10 flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Explore Europe</h3>
              <p className="text-gray-600 text-sm mb-4">Curated European packages for the perfect holiday.</p>
              <Link href="/packages" className="text-blue-700 font-bold text-sm flex items-center hover:underline">Explore Packages &rarr;</Link>
            </div>
          </div>
        </div>


      </div>

      <div className="relative z-10 bg-gray-50 pt-16 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-gray-500 font-bold tracking-widest text-sm mb-2">ADVENTURE AWAITS</p>
              <h2 className="text-4xl font-bold text-gray-900">Upcoming Camps</h2>
            </div>
            <Link href="/camps" className="hidden md:flex text-gray-600 hover:text-gray-900 font-semibold items-center gap-1">View all camps &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayCamps.map((camp: any) => (
              <div key={camp.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex flex-col">
                <div className="relative h-48 w-full">
                  <Image src={camp.image_url} alt={camp.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">{camp.available_spots} Spots Left</div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{camp.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{format(new Date(camp.start_date), "MMM d")} - {format(new Date(camp.end_date), "MMM d, yyyy")}</p>
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Price</p>
                      <p className="text-lg font-bold text-gray-900">€{camp.price_per_person}<span className="text-sm font-normal text-gray-500">/p</span></p>
                    </div>
                    <Link href={`/camps/${camp.id}`} className="bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">View Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-end mb-10 mt-24">
            <div>
              <p className="text-gray-500 font-bold tracking-widest text-sm mb-2">JOURNEYS THAT STAY WITH YOU</p>
              <h2 className="text-4xl font-bold text-gray-900">Popular Europe Packages</h2>
            </div>
            <Link href="/packages" className="hidden md:flex text-gray-600 hover:text-gray-900 font-semibold items-center gap-1">View all packages &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPackages.map((pkg: any) => (
              <div key={pkg.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex flex-col group">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image src={pkg.image_url} alt={pkg.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">{pkg.duration_days} Days / {pkg.duration_nights} Nights</div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1 leading-tight">{pkg.title}</h3>
                    <p className="text-gray-200 text-sm flex items-center gap-2">{pkg.route}</p>
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">From</p>
                      <p className="text-xl font-bold text-gray-900">€{pkg.starting_price}<span className="text-sm font-normal text-gray-500">/p</span></p>
                    </div>
                    <Link href={`/packages/${pkg.id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">View Package</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#FBF8F2] w-full py-20 relative z-10">
        <div className="container mx-auto px-6 max-w-6xl text-center">
           <h2 className="text-3xl font-bold text-gray-900 mb-4">Want a custom trip?</h2>
           <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">Whether it's a family vacation or a couple's getaway, we plan the perfect itinerary for you.</p>
           <div className="flex flex-wrap justify-center gap-4 mb-8">
             <span className="bg-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-gray-100">Couples/Families</span>
             <span className="bg-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-gray-100">Custom Itinerary</span>
             <span className="bg-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-gray-100">Choice of Car</span>
             <span className="bg-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-gray-100">Hotels & Food</span>
           </div>
           <Link href="#contact" className="inline-block bg-[#F59E0B] hover:bg-[#EAB308] text-white px-8 py-4 rounded-full font-bold transition-colors">Plan My Trip &rarr;</Link>
        </div>
      </div>
    </div>
  );
}
