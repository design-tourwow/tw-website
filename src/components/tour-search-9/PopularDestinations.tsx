'use client'

export default function PopularDestinations() {
  return (
    <>
      {/* Image Cards - Hidden for now */}
      {/* <div className="flex gap-3 overflow-x-auto pb-2 pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
        {destinations.map((destination) => (
          <Link
            key={destination.slug}
            href={`/tour-search-1?destination=${destination.slug}`}
            className="group relative flex-shrink-0 w-40 aspect-[3/4] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="160px"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-2.5 text-white">
              <h3 className="font-bold text-sm mb-0.5 leading-tight">{destination.name}</h3>
              <p className="text-xs text-white/90">{destination.tours} ทัวร์</p>
            </div>

            <div className="absolute inset-0 bg-[#019dff]/0 group-hover:bg-[#019dff]/10 transition-colors duration-300" />
          </Link>
        ))}
      </div> */}
    </>
  )
}
