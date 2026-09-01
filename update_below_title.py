import re

with open("src/components/TripCard.tsx", "r") as f:
    content = f.read()

search = """        {/* Dates / Route */}
        <div className="text-gray-500 text-sm mb-6 flex items-start gap-2 font-medium">
            {type === "camp" ? (
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {(() => {
                        if (datesArray.length === 0) return null;

                        return datesArray.map((dateStr, idx) => (
                            <div key={idx} className="flex items-center gap-1">
                                <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                                <span>{dateStr}</span>
                            </div>
                        ));
                    })()}
                </div>
            ) : (
                <>
                    <MapPin className="w-4 h-4 mt-0.5 text-gray-400 shrink-0" />
                    <span className="line-clamp-2">
                        {durationDays}D/{durationNights}N • {route}
                    </span>
                </>
            )}
        </div>"""

replace = """        {/* Route (Packages) */}
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
        </div>"""

new_content = content.replace(search, replace)

with open("src/components/TripCard.tsx", "w") as f:
    f.write(new_content)
