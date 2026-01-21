'use client'

import { TourData } from '@/lib/tour-data-search'
import Link from 'next/link'

interface TourCardProps {
  tour: TourData
}

export default function TourCard({ tour }: TourCardProps) {
  return (
    <Link href={`/tour-search-78/${tour.slug}`} className="block group cursor-pointer flex-grow" style={{ minWidth: '392px', maxWidth: '450px' }}>
      <div className="relative bg-gray-50 rounded-2xl px-4 py-4">
        <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={tour.image}
              alt={tour.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          </div>

          {/* Flight Info */}
          <div className="absolute top-3 left-3 z-20">
            <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
              <div className="flex items-stretch">
                <div className={`flex items-center gap-2 px-2 py-2 border-r ${tour.badgeColor === 'red' ? 'border-red-100' : 'border-blue-100'}`}>
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${tour.badgeColor === 'red' ? 'from-red-400 to-rose-600' : 'from-blue-400 to-blue-600'} rounded-full blur-md opacity-70`}></div>
                    <div className={`relative bg-gradient-to-br ${tour.badgeColor === 'red' ? 'from-red-500 to-rose-600' : 'from-blue-500 to-blue-600'} p-2 rounded-full w-7 h-7 flex items-center justify-center`}>
                      <svg className="transform rotate-45 scale-150 text-white" fill="currentColor" viewBox="0 0 24 24" style={{width: '32px', height: '32px'}}>
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-0 truncate">{tour.airline}</p>
                    <div className="flex items-center -mt-1 gap-0.5">
                      <span className="text-base font-bold mr-1">{tour.route.from}</span>
                      <div className="w-4 border-t border-dashed border-gray-400"></div>
                      <span className="text-base font-bold ml-1">{tour.route.to}</span>
                    </div>
                  </div>
                </div>
                <div className={`px-2 py-2 bg-gradient-to-r ${tour.badgeColor === 'red' ? 'from-red-50 to-rose-50' : 'from-blue-50 to-blue-50'} flex flex-col justify-center`}>
                  <p className="text-sm text-blue-600 font-medium mb-0">ช่วงเดินทาง</p>
                  <p className={`text-base font-bold ${tour.badgeColor === 'red' ? 'text-red-900' : 'text-blue-900'} -mt-1 whitespace-nowrap`}>{tour.travelPeriod}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tour Code */}
          <div className="absolute top-0 right-0 z-20">
            <div className={`bg-gradient-to-bl ${tour.badgeColor === 'red' ? 'from-red-600 to-red-700' : 'from-blue-600 to-blue-700'} text-white px-2 py-1 rounded-bl-xl shadow-md`}>
              <p className="font-semibold tracking-wide" style={{fontSize: '10px'}}>{tour.code}</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
            <div className="mb-2">
              <div className={`${tour.badgeColor === 'red' ? 'bg-red-600' : 'bg-blue-600'} text-white px-3 py-1 rounded text-sm font-bold inline-block shadow-lg`}>
                {tour.badgeText}
              </div>
            </div>

            <h3 className="font-bold mb-0 leading-tight drop-shadow-lg" style={{fontSize: '24px'}}>
              {tour.title}
            </h3>

            <div className="flex items-center gap-2 mb-1.5 text-base">
              <div className="flex text-yellow-400 text-base">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>
                    {i < Math.floor(tour.rating) ? '★' : (i < tour.rating ? (
                      <span style={{position: 'relative', display: 'inline-block'}}>
                        <span style={{color: '#d1d5db'}}>★</span>
                        <span style={{position: 'absolute', left: 0, top: 0, width: `${(tour.rating % 1) * 100}%`, overflow: 'hidden', color: '#fbbf24'}}>★</span>
                      </span>
                    ) : <span style={{color: '#d1d5db'}}>★</span>)}
                  </span>
                ))}
              </div>
              <span className="text-base font-medium">{tour.rating} ({tour.reviews} รีวิว)</span>
            </div>

            <div className="mb-4 text-base leading-relaxed">
              {tour.features.slice(0, 2).map((feature, index) => (
                <p key={index} className="drop-shadow-lg font-medium">{feature}</p>
              ))}
            </div>

            <div className={`${tour.badgeColor === 'red' ? 'gradient-background-red' : 'gradient-background-blue'} backdrop-blur-sm rounded-lg p-3`}>
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold">฿{tour.price.toLocaleString()}</span>
                    <span className="text-base line-through opacity-70 font-medium">฿{tour.originalPrice.toLocaleString()}</span>
                  </div>
                  <span className="text-white font-bold text-base inline-flex items-center justify-center gap-1 group hover:animate-none cursor-pointer drop-shadow-md">
                    <span>จองตอนนี้</span>
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                    </svg>
                  </span>
                </div>
                <p className="text-sm opacity-90 font-medium">ประหยัด ฿{tour.discount.toLocaleString()} | ผ่อน ฿{Math.ceil(tour.price / 6).toLocaleString()}/เดือน</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
