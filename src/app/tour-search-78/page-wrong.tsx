'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import {
  Search, Filter, X, MapPin, Calendar, Star, ChevronDown, 
  SlidersHorizontal, Home, ChevronRight
} from 'lucide-react'

// Mock tour data - ในการใช้งานจริงจะดึงจาก API
const generateTours = (count: number) => {
  const destinations = ['ญี่ปุ่น', 'เกาหลี', 'จีน', 'ไต้หวัน', 'สิงคโปร์', 'มาเลเซีย', 'เวียดนาม', 'ฝรั่งเศส', 'อิตาลี', 'สวิตเซอร์แลนด์']
  const tours = []
  
  for (let i = 0; i < count; i++) {
    const destination = destinations[i % destinations.length]
    tours.push({
      id: `TW${60000 + i}`,
      title: `ทัวร์${destination} ${5 + (i % 3)} วัน ${3 + (i % 2)} คืน`,
      destination,
      image: `https://images.unsplash.com/photo-${1480796927426 + i}?w=800&h=600&fit=crop`,
      price: 29999 + (i * 5000),
      originalPrice: 45999 + (i * 5000),
      days: 5 + (i % 3),
      nights: 3 + (i % 2),
      rating: 4.5 + (Math.random() * 0.5),
      reviews: 50 + (i * 10),
      airline: 'Thai Airways',
      highlights: ['ชมวัด', 'ช้อปปิ้ง', 'ชิมอาหาร']
    })
  }
  return tours
}

export default function TourSearchPage() {
  const router = useRouter()
  const [tours, setTours] = useState(generateTours(20))
  const [displayedTours, setDisplayedTours] = useState(12)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    destination: '',
    priceRange: [0, 100000],
    days: '',
    sortBy: 'popular'
  })
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const observerTarget = useRef(null)

  // Infinity Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && displayedTours < tours.length) {
          setLoading(true)
          setTimeout(() => {
            setDisplayedTours(prev => Math.min(prev + 12, tours.length))
            setLoading(false)
          }, 500)
        }
      },
      { threshold: 0.1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [displayedTours, tours.length])

  const filteredTours = tours.slice(0, displayedTours)

  return (
    <>
      <Head>
        <title>ค้นหาทัวร์ต่างประเทศ | แพ็คเกจทัวร์ราคาพิเศษ - TourWow</title>
        <meta name="description" content="ค้นหาและจองแพ็คเกจทัวร์ต่างประเทศ ทัวร์ญี่ปุ่น เกาหลี ยุโรป ราคาพิเศษ พร้อมโปรโมชั่นสุดคุ้ม จองง่าย ปลอดภัย มั่นใจ" />
        <meta name="keywords" content="ทัวร์ต่างประเทศ, แพ็คเกจทัวร์, ทัวร์ญี่ปุ่น, ทัวร์เกาหลี, ทัวร์ยุโรป, จองทัวร์" />
        <link rel="canonical" href="https://tourwow.com/tour-search-78" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb - SEO */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Home className="w-4 h-4" />
              <ChevronRight className="w-4 h-4" />
              <span className="text-blue-600 font-medium">ค้นหาทัวร์</span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Sidebar Filter - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <SlidersHorizontal className="w-5 h-5 mr-2" />
                  ตัวกรอง
                </h2>

                {/* Destination Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">ประเทศปลายทาง</h3>
                  <div className="space-y-2">
                    {['ญี่ปุ่น', 'เกาหลี', 'จีน', 'ไต้หวัน', 'ยุโรป'].map(dest => (
                      <label key={dest} className="flex items-center cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                        <span className="ml-2 text-sm text-gray-600">{dest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">ช่วงราคา</h3>
                  <div className="space-y-2">
                    {['ต่ำกว่า 30,000', '30,000 - 50,000', '50,000 - 80,000', 'มากกว่า 80,000'].map(price => (
                      <label key={price} className="flex items-center cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                        <span className="ml-2 text-sm text-gray-600">{price}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">ระยะเวลา</h3>
                  <div className="space-y-2">
                    {['3-4 วัน', '5-6 วัน', '7-8 วัน', 'มากกว่า 8 วัน'].map(duration => (
                      <label key={duration} className="flex items-center cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                        <span className="ml-2 text-sm text-gray-600">{duration}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1">
              {/* Search & Sort Bar */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="ค้นหาทัวร์..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Sort */}
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>ยอดนิยม</option>
                    <option>ราคาต่ำสุด</option>
                    <option>ราคาสูงสุด</option>
                    <option>ใหม่ล่าสุด</option>
                  </select>

                  {/* Mobile Filter Button */}
                  <button 
                    className="lg:hidden px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center"
                    onClick={() => setShowMobileFilter(true)}
                  >
                    <Filter className="w-5 h-5 mr-2" />
                    ตัวกรอง
                  </button>
                </div>

                {/* Results Count */}
                <div className="mt-4 text-sm text-gray-600">
                  พบ <span className="font-semibold text-gray-900">{tours.length}</span> ทัวร์
                </div>
              </div>

              {/* Tour Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>

              {/* Loading Indicator */}
              {loading && (
                <div className="flex justify-center items-center py-8">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {/* Infinity Scroll Trigger */}
              <div ref={observerTarget} className="h-10"></div>

              {/* End Message */}
              {displayedTours >= tours.length && (
                <div className="text-center py-8 text-gray-500">
                  แสดงทัวร์ครบทั้งหมดแล้ว
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilter(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">ตัวกรอง</h2>
              <button onClick={() => setShowMobileFilter(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* Same filter content as sidebar */}
          </div>
        </div>
      )}

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": filteredTours.map((tour, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "TouristTrip",
                "name": tour.title,
                "description": tour.highlights.join(', '),
                "offers": {
                  "@type": "Offer",
                  "price": tour.price,
                  "priceCurrency": "THB"
                }
              }
            }))
          })
        }}
      />
    </>
  )
}

// Tour Card Component
function TourCard({ tour }: { tour: any }) {
  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
          ลด {Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)}%
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer">
          {tour.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.floor(tour.rating) ? 'fill-current' : ''}`} />
            ))}
          </div>
          <span className="text-sm text-gray-600">({tour.reviews})</span>
        </div>

        {/* Details */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {tour.days}D{tour.nights}N
          </span>
          <span className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {tour.destination}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between pt-3 border-t">
          <div>
            <div className="text-sm text-gray-500 line-through">฿{tour.originalPrice.toLocaleString()}</div>
            <div className="text-2xl font-bold text-blue-600">฿{tour.price.toLocaleString()}</div>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            ดูรายละเอียด
          </button>
        </div>
      </div>
    </article>
  )
}
