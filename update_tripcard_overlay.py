import re

with open("src/components/TripCard.tsx", "r") as f:
    content = f.read()

search = """            {/* Bottom Image Tags (Overlapping bottom edge inside image container) */}
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2 z-10">
                {imageBottomTagsList.map((tag, idx) => (
                    <span key={idx} className="bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-sm border border-white/10">
                        {/* Try to infer some icons based on text, otherwise default circle */}
                        {tag.toLowerCase().includes('day') || tag.toLowerCase().includes('night') ? <Calendar className="w-3.5 h-3.5"/> :
                        tag.toLowerCase().includes('camp') ? <Tent className="w-3.5 h-3.5"/> :
                        <Flame className="w-3.5 h-3.5" />}
                        {tag}
                    </span>
                ))}
            </div>"""

replace = """            {/* Bottom Image Dates/Duration Overlay */}
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
            </div>"""

new_content = content.replace(search, replace)

with open("src/components/TripCard.tsx", "w") as f:
    f.write(new_content)
