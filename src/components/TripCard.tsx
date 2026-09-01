import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Flame, Tent, Mountain, ArrowRight } from "lucide-react";

interface TripCardProps {
  id: string;
  type: "camp" | "package";
  title: string;
  imageUrl: string;
  isActive: boolean;

  // Tags
  tagsTopLeft?: string;
  tagsImageBottom?: string; // Comma separated
  tagsBodyTop?: string; // Comma separated

  // Specific to camps
  campDates?: string | string[];
  priceEur?: number;
  pricePln?: number;

  // Specific to packages
  durationDays?: number;
  durationNights?: number;
  route?: string;
  startingPriceEur?: number;
}

export function TripCard({
  id,
  type,
  title,
  imageUrl,
  isActive,
  tagsTopLeft,
  tagsImageBottom,
  tagsBodyTop,
  campDates,
  priceEur,
  pricePln,
  durationDays,
  durationNights,
  route,

  startingPriceEur,
}: TripCardProps) {

  // Get the first image from comma-separated list
  const firstImage = imageUrl ? imageUrl.split(',').map(s => s.trim()).filter(Boolean)[0] : '';

  // Parse tags
  const imageBottomTagsList = tagsImageBottom ? tagsImageBottom.split(',').map(s => s.trim()).filter(Boolean) : [];
  const bodyTopTagsList = tagsBodyTop ? tagsBodyTop.split(',').map(s => s.trim()).filter(Boolean) : [];

  // Parse dates
  const datesArray = Array.isArray(campDates)
    ? campDates
    : (typeof campDates === 'string' ? campDates.split(',').map(d => d.trim()).filter(Boolean) : []);

  const topLeftTag = !isActive ? "Coming soon" : (tagsTopLeft || "Available");

  // Top Left Tag Colors
  const topLeftTagColor = !isActive
    ? "bg-red-500 text-white"
    : "bg-[#0B1E36] text-white";

  const buttonColor = type === "camp" ? "bg-green-800 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700";
  const linkHref = type === "camp" ? `/camps/${id}` : `/packages/${id}`;

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group h-full">
      {/* Image Section */}
      <div className="relative h-64 w-full p-3 pb-0">
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image
            src={firstImage || imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Top Left Tag */}
            <div className={`absolute top-3 left-3 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-md ${topLeftTagColor}`}>
            {topLeftTag}
            </div>

            {/* Bottom Image Dates/Duration Overlay */}
            <div className="absolute bottom-3 left-3 right-3 z-10">
                {type === "camp" && datesArray.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                        {datesArray.map((dateStr, idx) => (
                            <span key={idx} className="bg-black/60 backdrop-blur-md text-white px-2 py-1.5 rounded-md text-[11px] font-medium flex items-center gap-1.5 shadow-sm border border-white/10 justify-center">
                                <Calendar className="w-3.5 h-3.5 shrink-0"/>
                                <span className="truncate">{dateStr}</span>
                            </span>
                        ))}
                    </div>
                )}
                {type === "package" && (durationDays || durationNights) && (
                    <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-md text-[11px] font-medium flex inline-flex items-center gap-1.5 shadow-sm border border-white/10">
                        <Calendar className="w-3.5 h-3.5 shrink-0"/>
                        {durationDays}D / {durationNights}N
                    </span>
                )}
            </div>
        </div>
      </div>

      {/* Body Section */}
      <div className="p-5 flex-grow flex flex-col pt-4">

        {/* Body Top Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
            {bodyTopTagsList.map((tag, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                    {tag}
                </span>
            ))}
        </div>

        <h3 className="text-xl font-extrabold text-gray-900 mb-2 leading-tight">
          {title}
        </h3>

        {/* Route (Packages) */}
        {type === "package" && route && (
            <div className="text-gray-500 text-sm mb-3 flex items-start gap-2 font-medium">
                <MapPin className="w-4 h-4 mt-0.5 text-gray-400 shrink-0" />
                <span className="line-clamp-2">{route}</span>
            </div>
        )}

        {/* Below Title Tags (formerly on image) */}
        <div className="flex flex-wrap gap-2 mb-6 mt-1">
            {imageBottomTagsList.map((tag, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    {tag}
                </span>
            ))}
        </div>

        {/* Footer / Pricing */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-0.5">From</span>
            {type === "camp" ? (
                <div className="flex items-baseline gap-2">
                    <span className="text-lg font-black text-gray-900">{priceEur != null ? `${priceEur}€` : "€ --"}</span>
                    <span className="text-sm font-bold text-gray-500">{pricePln != null ? `${pricePln} PLN` : "/ PLN --"}</span>
                </div>
            ) : (
                <div className="flex items-baseline gap-1">
                    <span className="text-lg font-black text-gray-900">{startingPriceEur}€</span>
                </div>
            )}
          </div>

          <Link
            href={linkHref}
            className={`${buttonColor} text-white p-3 rounded-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-md shrink-0`}
          >
             <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
