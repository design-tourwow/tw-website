export default function TourCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-pulse flex-grow" style={{ minWidth: '392px', maxWidth: '450px' }}>
      {/* Image Skeleton */}
      <div className="aspect-[4/3] bg-gray-200" />

      {/* Content Skeleton */}
      <div className="p-4">
        {/* Code & Airline */}
        <div className="flex items-center justify-between mb-2">
          <div className="h-3 w-20 bg-gray-200 rounded" />
          <div className="h-3 w-24 bg-gray-200 rounded" />
        </div>

        {/* Title */}
        <div className="space-y-2 mb-3">
          <div className="h-5 bg-gray-200 rounded w-full" />
          <div className="h-5 bg-gray-200 rounded w-3/4" />
        </div>

        {/* Destination & Duration */}
        <div className="flex items-center gap-4 mb-3">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>

        {/* Features */}
        <div className="flex gap-2 mb-3">
          <div className="h-6 w-20 bg-gray-200 rounded-full" />
          <div className="h-6 w-24 bg-gray-200 rounded-full" />
          <div className="h-6 w-20 bg-gray-200 rounded-full" />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-5 w-12 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>

        {/* Price */}
        <div className="border-t border-gray-100 pt-3">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-7 w-32 bg-gray-200 rounded" />
            </div>
            <div className="h-10 w-28 bg-gray-200 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
