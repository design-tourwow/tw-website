import React from 'react'

export const TourCardSkeleton: React.FC = () => {
  return (
    <div className="-mx-4 md:mx-0 animate-pulse">
      <div className="relative bg-gray-50 rounded-none md:rounded-2xl px-4 py-4">
        <div className="relative aspect-[5/6] overflow-hidden rounded-xl bg-gray-200">
          {/* Skeleton content */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-300 via-gray-200 to-transparent"></div>
          
          {/* Top badges skeleton */}
          <div className="absolute top-3 left-3 z-20">
            <div className="bg-gray-300 rounded-xl h-16 w-48"></div>
          </div>
          
          <div className="absolute top-0 right-0 z-20">
            <div className="bg-gray-300 rounded-bl-xl h-6 w-16"></div>
          </div>

          {/* Bottom content skeleton */}
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
            <div className="bg-gray-300 rounded h-6 w-24"></div>
            <div className="bg-gray-300 rounded h-8 w-full"></div>
            <div className="bg-gray-300 rounded h-5 w-32"></div>
            <div className="space-y-1">
              <div className="bg-gray-300 rounded h-4 w-full"></div>
              <div className="bg-gray-300 rounded h-4 w-3/4"></div>
            </div>
            <div className="bg-gray-300 rounded-lg h-20 w-full mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const TourCardSkeletonGrid: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <TourCardSkeleton key={index} />
      ))}
    </>
  )
}
