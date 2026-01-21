'use client'

export const dynamic = 'force-dynamic'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowUp, Loader2 } from 'lucide-react'
import { FilterSidebar } from '@/components/tour-search-78/FilterSidebar'
import { SortBar } from '@/components/tour-search-78/SortBar'
import { ActiveFilters } from '@/components/tour-search-78/ActiveFilters'
import { TourCardSkeletonGrid } from '@/components/tour-search-78/TourCardSkeleton'
import { TourSearchSEO } from '@/components/tour-search-78/TourSearchSEO'
import { tourDatabase, filterAndSortTours, type TourData } from '@/lib/tour-data-search'

const TourSearchNew = () => {
  const router = useRouter()
  
  // States
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all')
  const [selectedDuration, setSelectedDuration] = useState<string>('all')
  const [selectedAirline, setSelectedAirline] = useState<string>('all')
  const [selectedRating, setSelectedRating] = useState<number>(0)
  const [sortBy, setSortBy] = useState<string>('popular')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [displayedCount, setDisplayedCount] = useState<number>(9)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  
  const observerTarget = useRef<HTMLDivElement>(null)
  const ITEMS_PER_PAGE = 9

  // Filter and sort tours
  const filteredTours = filterAndSortTours(
    tourDatabase,
    {
      region: selectedRegion,
      priceRange: selectedPriceRange,
      duration: selectedDuration,
      airline: selectedAirline,
      rating: selectedRating,
      searchQuery
    },
    sortBy
  )

  const displayedTours = filteredTours.slice(0, displayedCount)
  const hasMore = displayedCount < filteredTours.length

  // Infinity Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          setIsLoadingMore(true)
          setTimeout(() => {
            setDisplayedCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredTours.length))
            setIsLoadingMore(false)
          }, 500)
        }
      },
      { threshold: 0.1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [hasMore, isLoadingMore, filteredTours.length])

  // Back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Reset displayed count when filters change
  useEffect(() => {
    setDisplayedCount(ITEMS_PER_PAGE)
  }, [selectedRegion, selectedPriceRange, selectedDuration, selectedAirline, selectedRating, searchQuery, sortBy])

  // Handle filter removal
  const handleRemoveFilter = (filterKey: string) => {
    switch (filterKey) {
      case 'region':
        setSelectedRegion('all')
        break
      case 'priceRange':
        setSelectedPriceRange('all')
        break
      case 'duration':
        setSelectedDuration('all')
        break
      case 'airline':
        setSelectedAirline('all')
        break
      case 'rating':
        setSelectedRating(0)
        break
      case 'searchQuery':
        setSearchQuery('')
        break
    }
  }

  // Clear all filters
  const handleClearAllFilters = () => {
    setSelectedRegion('all')
    setSelectedPriceRange('all')
    setSelectedDuration('all')
    setSelectedAirline('all')
    setSelectedRating(0)
    setSearchQuery('')
  }

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle tour click
  const handleTourClick = (tour: TourData) => {
    router.push(`/tour-search-74/${tour.slug}`)
  }

  return (
    <>
      <TourSearchSEO tours={displayedTours} totalResults={filteredTours.length} />
      
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm text-gray-600" itemScope itemType="https://schema.org/BreadcrumbList">
              <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <a href="/" itemProp="item" className="hover:text-blue-600">
                  <span itemProp="name">หน้าแรก</span>
                </a>
                <meta itemProp="position" content="1" />
              </span>
              <span>/</span>
              <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name" className="text-blue-600 font-medium">ค้นหาทัวร์</span>
                <meta itemProp="position" content="2" />
              </span>
            </nav>
          </div>
        </div>

        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              ค้นหาทัวร์ทั้งหมด
            </h1>
            
            {/* Search Bar */}
            <div className="max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="ค้นหาทัวร์ตามชื่อ, ประเทศ, หรือรหัสทัวร์..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sort Bar */}
        <SortBar
          totalResults={filteredTours.length}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* Active Filters */}
        <ActiveFilters
          filters={{
            region: selectedRegion,
            priceRange: selectedPriceRange,
            duration: selectedDuration,
            airline: selectedAirline,
            rating: selectedRating,
            searchQuery
          }}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearAllFilters}
        />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Filter Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-20">
                <FilterSidebar
                  selectedRegion={selectedRegion}
                  setSelectedRegion={setSelectedRegion}
                  selectedPriceRange={selectedPriceRange}
                  setSelectedPriceRange={setSelectedPriceRange}
                  selectedDuration={selectedDuration}
                  setSelectedDuration={setSelectedDuration}
                  selectedAirline={selectedAirline}
                  setSelectedAirline={setSelectedAirline}
                  selectedRating={selectedRating}
                  setSelectedRating={setSelectedRating}
                  showFilters={showFilters}
                  setShowFilters={setShowFilters}
                />
              </div>
            </aside>

            {/* Mobile Filter Sidebar */}
            <div className="lg:hidden">
              <FilterSidebar
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
                selectedPriceRange={selectedPriceRange}
                setSelectedPriceRange={setSelectedPriceRange}
                selectedDuration={selectedDuration}
                setSelectedDuration={setSelectedDuration}
                selectedAirline={selectedAirline}
                setSelectedAirline={setSelectedAirline}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
              />
            </div>

            {/* Tour Grid */}
            <main className="flex-1">
              {filteredTours.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    ไม่พบทัวร์ที่ตรงกับเงื่อนไขการค้นหา
                  </h3>
                  <p className="text-gray-500 mb-4">
                    ลองปรับเปลี่ยนตัวกรองหรือคำค้นหาของคุณ
                  </p>
                  <button
                    onClick={handleClearAllFilters}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    ล้างตัวกรองทั้งหมด
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedTours.map((tour) => (
                      <TourCardComponent
                        key={tour.id}
                        tour={tour}
                        onClick={() => handleTourClick(tour)}
                      />
                    ))}
                    
                    {/* Loading Skeletons */}
                    {isLoadingMore && <TourCardSkeletonGrid count={3} />}
                  </div>

                  {/* Infinity Scroll Observer Target */}
                  <div ref={observerTarget} className="h-10" />

                  {/* End of Results */}
                  {!hasMore && displayedTours.length > 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>แสดงทัวร์ครบทั้งหมดแล้ว ({filteredTours.length} รายการ)</p>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-20 right-4 lg:bottom-8 lg:right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all z-40"
            aria-label="กลับไปด้านบน"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        )}
      </div>
    </>
  )
}

// Tour Card Component (ใช้โครงสร้างเดิม)
const TourCardComponent: React.FC<{ tour: TourData; onClick: () => void }> = ({ tour, onClick }) => {
  return (
    <div className="-mx-4 md:mx-0 group cursor-pointer" onClick={onClick}>
      <div className="relative bg-gray-50 rounded-none md:rounded-2xl px-4 py-4">
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
    </div>
  )
}

export default TourSearchNew
