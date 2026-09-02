import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { Flame, Map, Users, Target, Shield, Briefcase, Tent } from "lucide-react";
import { TripCard } from "@/components/TripCard";
import { DesktopGrid } from "@/components/DesktopGrid";
import { MobileCarouselSection } from "@/components/MobileCarouselSection";

export const revalidate = 0; // Disable cache to always fetch fresh data

export default async function Home() {
  const supabase = await createClient();
  const { data: camps, error: campsError } = await supabase
    .from("camps")
    .select("*")
    .order("start_date", { ascending: true })
    .limit(10);

  const { data: packages, error: packagesError } = await supabase
    .from("packages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  if (campsError) console.error("Error fetching camps:", campsError);
  if (packagesError) console.error("Error fetching packages:", packagesError);

  const displayCamps = camps && camps.length > 0 ? camps : [
    { id: "1", title: "Tatra Mountain Summit Trek", camp_dates: ["2024-06-15", "2024-06-20"], available_spots: 12, total_spots: 15, price_per_person: 450, price_per_person_pln: 1950, image_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop", tags_top_left: "Available", tags_image_bottom: "6 Days 5 Nights", tags_body_top: "Advanced" },
    { id: "2", title: "Crystal Waters Kayak Expedition", camp_dates: ["2024-07-10", "2024-07-14"], available_spots: 8, total_spots: 20, price_per_person: 320, price_per_person_pln: 1400, image_url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop", is_active: false, tags_image_bottom: "5 Days 4 Nights", tags_body_top: "Beginner" },
    { id: "3", title: "Alpine Downhill Ski Adventure", camp_dates: ["2024-01-20", "2024-01-27"], available_spots: 25, total_spots: 25, price_per_person: 850, price_per_person_pln: 3650, image_url: "https://images.unsplash.com/photo-1551524164-687a55dd1126?q=80&w=1925&auto=format&fit=crop", tags_top_left: "Available", tags_image_bottom: "8 Days 7 Nights", tags_body_top: "Sport" },

    { id: "4", title: "Kayaking Sochaczew", camp_dates: ["2024-05-15", "2024-05-16"], available_spots: 10, total_spots: 10, price_per_person: 100, price_per_person_pln: 450, image_url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop", is_active: false, tags_top_left: "Coming soon", tags_image_bottom: "2 Days 1 Night", tags_body_top: "Beginner" },
    { id: "5", title: "Auschwitz Historical Camp", camp_dates: ["2024-06-01"], available_spots: 20, total_spots: 20, price_per_person: 50, price_per_person_pln: 220, image_url: "https://images.unsplash.com/photo-1519006096500-264f338d1d86?q=80&w=2070&auto=format&fit=crop", is_active: false, tags_top_left: "Coming soon", tags_image_bottom: "1 Day", tags_body_top: "Sightseeing" },
    { id: "6", title: "Prague City Camp", camp_dates: ["2024-06-10"], available_spots: 15, total_spots: 15, price_per_person: 80, price_per_person_pln: 350, image_url: "https://images.unsplash.com/photo-1513807016779-d51c0c026263?q=80&w=2070&auto=format&fit=crop", is_active: false, tags_top_left: "Coming soon", tags_image_bottom: "1 Day", tags_body_top: "City Tour" },
  ];


  let finalCamps = displayCamps;
  if (finalCamps.length < 6) {
    const defaultDummies = [
      { id: "d4", title: "Kayaking Sochaczew", camp_dates: ["2024-05-15", "2024-05-16"], available_spots: 10, total_spots: 10, price_per_person: 100, price_per_person_pln: 450, image_url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop", is_active: false, tags_top_left: "Coming soon", tags_image_bottom: "2 Days 1 Night", tags_body_top: "Beginner" },
      { id: "d5", title: "Auschwitz Historical Camp", camp_dates: ["2024-06-01"], available_spots: 20, total_spots: 20, price_per_person: 50, price_per_person_pln: 220, image_url: "https://images.unsplash.com/photo-1519006096500-264f338d1d86?q=80&w=2070&auto=format&fit=crop", is_active: false, tags_top_left: "Coming soon", tags_image_bottom: "1 Day", tags_body_top: "Sightseeing" },
      { id: "d6", title: "Prague City Camp", camp_dates: ["2024-06-10"], available_spots: 15, total_spots: 15, price_per_person: 80, price_per_person_pln: 350, image_url: "https://images.unsplash.com/photo-1513807016779-d51c0c026263?q=80&w=2070&auto=format&fit=crop", is_active: false, tags_top_left: "Coming soon", tags_image_bottom: "1 Day", tags_body_top: "City Tour" }
    ];
    // append only what's needed to reach at least 6 if we don't have them
    finalCamps = [...finalCamps, ...defaultDummies.slice(0, Math.max(0, 6 - finalCamps.length))];
  }


  const displayPackages = packages && packages.length > 0 ? packages : [
    { id: "1", title: "Swiss Alps Explorer", duration_days: 7, duration_nights: 6, route: "Zurich – Interlaken – Zermatt", starting_price: 1299, image_url: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070&auto=format&fit=crop", tags_top_left: "Available", tags_image_bottom: "7 Days", tags_body_top: "Sightseeing" },
    { id: "2", title: "Central Europe Highlights", duration_days: 10, duration_nights: 9, route: "Prague – Vienna – Budapest", starting_price: 999, image_url: "https://images.unsplash.com/photo-1513807016779-d51c0c026263?q=80&w=2070&auto=format&fit=crop", is_active: false, tags_image_bottom: "10 Days", tags_body_top: "City Tour" },
    { id: "3", title: "Iberian Sun Tour", duration_days: 8, duration_nights: 7, route: "Lisbon – Porto – Madrid", starting_price: 1150, image_url: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=2070&auto=format&fit=crop", tags_top_left: "Available", tags_image_bottom: "8 Days", tags_body_top: "Comfort" },
  ];


  let finalPackages = displayPackages;
  if (finalPackages.length < 6) {
      const defaultPkgDummies = [
        { id: "p4", title: "Italian Lakes Retreat", duration_days: 5, duration_nights: 4, route: "Milan – Como – Garda", starting_price: 850, image_url: "https://images.unsplash.com/photo-1534439091919-4977054dd9d0?q=80&w=2070&auto=format&fit=crop", is_active: false, tags_top_left: "Coming soon", tags_image_bottom: "5 Days", tags_body_top: "Relaxation" },
        { id: "p5", title: "Nordic Fjords Cruise", duration_days: 7, duration_nights: 6, route: "Oslo – Bergen – Tromsø", starting_price: 1500, image_url: "https://images.unsplash.com/photo-1513568856947-f1c50058e381?q=80&w=2070&auto=format&fit=crop", is_active: false, tags_top_left: "Coming soon", tags_image_bottom: "7 Days", tags_body_top: "Nature" },
        { id: "p6", title: "Greek Islands Hopping", duration_days: 10, duration_nights: 9, route: "Athens – Santorini – Mykonos", starting_price: 1200, image_url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2070&auto=format&fit=crop", is_active: false, tags_top_left: "Coming soon", tags_image_bottom: "10 Days", tags_body_top: "Beach" }
      ];
      finalPackages = [...finalPackages, ...defaultPkgDummies.slice(0, Math.max(0, 6 - finalPackages.length))];
  }

  return (
    <div className="relative min-h-screen pb-20 bg-white">
      {/* Hero Background Image */}
      <div className="absolute top-0 w-full h-full z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="https://videos.pexels.com/video-files/3094026/3094026-uhd_3840_2160_30fps.mp4" type="video/mp4" />
        </video>
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
              <Link prefetch={true} href="/camps" className="text-green-700 font-bold text-sm flex items-center hover:underline">Explore Camps &rarr;</Link>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 flex-1 flex items-center gap-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1513807016779-d51c0c026263?q=80&w=2070&auto=format&fit=crop')] bg-cover transition-opacity group-hover:opacity-10" />
            <div className="bg-blue-100 p-4 rounded-full relative z-10"><Briefcase className="text-blue-700 w-8 h-8" /></div>
            <div className="text-left relative z-10 flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Explore Europe</h3>
              <p className="text-gray-600 text-sm mb-4">Curated European packages for the perfect holiday.</p>
              <Link prefetch={true} href="/packages" className="text-blue-700 font-bold text-sm flex items-center hover:underline">Explore Packages &rarr;</Link>
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
            <Link prefetch={true} href="/camps" className="hidden md:flex text-gray-600 hover:text-gray-900 font-semibold items-center gap-1">View all camps &rarr;</Link>
          </div>

          <MobileCarouselSection row1Interval={10000} row2Interval={10000}>
            {finalCamps.map((camp: any) => (
              <TripCard key={camp.id} id={camp.id} type="camp" title={camp.title} imageUrl={camp.image_url} isActive={camp.is_active !== false} tagsTopLeft={camp.tags_top_left} tagsImageBottom={camp.tags_image_bottom} tagsBodyTop={camp.tags_body_top} campDates={camp.camp_dates} priceEur={camp.price_per_person} pricePln={camp.price_per_person_pln} />
            ))}
          </MobileCarouselSection>
          <DesktopGrid>
            {finalCamps.map((camp: any) => (
              <TripCard key={camp.id} id={camp.id} type="camp" title={camp.title} imageUrl={camp.image_url} isActive={camp.is_active !== false} tagsTopLeft={camp.tags_top_left} tagsImageBottom={camp.tags_image_bottom} tagsBodyTop={camp.tags_body_top} campDates={camp.camp_dates} priceEur={camp.price_per_person} pricePln={camp.price_per_person_pln} />
            ))}
          </DesktopGrid>


          <div className="flex justify-between items-end mb-10 mt-24">
            <div>
              <p className="text-gray-500 font-bold tracking-widest text-sm mb-2">JOURNEYS THAT STAY WITH YOU</p>
              <h2 className="text-4xl font-bold text-gray-900">Popular Europe Packages</h2>
            </div>
            <Link prefetch={true} href="/packages" className="hidden md:flex text-gray-600 hover:text-gray-900 font-semibold items-center gap-1">View all packages &rarr;</Link>
          </div>

          <MobileCarouselSection row1Interval={10000} row2Interval={10000}>
            {finalPackages.map((pkg: any) => (
              <TripCard key={pkg.id} id={pkg.id} type="package" title={pkg.title} imageUrl={pkg.image_url} isActive={pkg.is_active !== false} tagsTopLeft={pkg.tags_top_left} tagsImageBottom={pkg.tags_image_bottom} tagsBodyTop={pkg.tags_body_top} durationDays={pkg.duration_days} durationNights={pkg.duration_nights} route={pkg.route} startingPriceEur={pkg.starting_price} />
            ))}
          </MobileCarouselSection>
          <DesktopGrid>
            {finalPackages.map((pkg: any) => (
              <TripCard key={pkg.id} id={pkg.id} type="package" title={pkg.title} imageUrl={pkg.image_url} isActive={pkg.is_active !== false} tagsTopLeft={pkg.tags_top_left} tagsImageBottom={pkg.tags_image_bottom} tagsBodyTop={pkg.tags_body_top} durationDays={pkg.duration_days} durationNights={pkg.duration_nights} route={pkg.route} startingPriceEur={pkg.starting_price} />
            ))}
          </DesktopGrid>

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
