'use client'

import { useState, useEffect, useMemo } from 'react'
import { tourDatabase, filterAndSortTours } from '@/lib/tour-data-search'
import TourCard from '@/components/tour-search-2/TourCard'
import FilterSidebar from '@/components/tour-search-2/FilterSidebar'
import SortDropdown from '@/components/tour-search-2/SortDropdown'
import TourCardSkeleton from '@/components/tour-search-2/TourCardSkeleton'
import EmptyState from '@/components/tour-search-2/EmptyState'
import PopularDestinations from '@/components/tour-search-2/PopularDestinations'
import Breadcrumb from '@/components/tour-search-2/Breadcrumb'
import SEOContent from '@/components/tour-search-2/SEOContent'
import FAQ from '@/components/tour-search-2/FAQ'
import SearchBar from '@/components/tour-search-2/SearchBar'
import AdvancedFilterModal from '@/components/tour-search-2/AdvancedFilterModal'

export default function TourSearchPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false)
  
  // Filter states
  const [filters, setFilters] = useState({
    region: 'all',
    priceRange: 'all',
    duration: 'all',
    airline: 'all',
    rating: 0,
    searchQuery: '',
    holidays: [] as string[],
    priceRanges: [] as string[],
    durations: [] as string[],
    airlines: [] as string[]
  })
  
  const [sortBy, setSortBy] = useState('popular')
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])
  
  // Filter and sort tours
  const filteredTours = useMemo(() => {
    return filterAndSortTours(tourDatabase, filters, sortBy)
  }, [filters, sortBy])
  
  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }
  
  const handleResetFilters = () => {
    setFilters({
      region: 'all',
      priceRange: 'all',
      duration: 'all',
      airline: 'all',
      rating: 0,
      searchQuery: '',
      holidays: [],
      priceRanges: [],
      durations: [],
      airlines: []
    })
  }
  
  const activeFilterCount = [
    ...filters.holidays,
    ...filters.priceRanges,
    ...filters.durations,
    ...filters.airlines,
    filters.rating !== 0 ? filters.rating : null,
    filters.searchQuery
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&h=600&fit=crop&auto=format&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Lighter Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-black/40" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 drop-shadow-lg">
              ทัวร์ญี่ปุ่น
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white drop-shadow-md leading-relaxed px-2 sm:px-0">
              สัมผัสความงามของดินแดนอาทิตย์อุทัย ตั้งแต่ภูเขาไฟฟูจิอันสง่างาม 
              ซากุระบานสะพรั่ง วัดวาอารามโบราณ ไปจนถึงเทคโนโลยีล้ำสมัยในโตเกียว 
              พร้อมอาหารญี่ปุ่นแท้รสชาติเลิศรส
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar 
            value={filters.searchQuery}
            onChange={(value) => handleFilterChange('searchQuery', value)}
          />
        </div>
      </section>

      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Popular Destinations - Copy (Testing Position) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <PopularDestinations />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex gap-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
              activeCount={activeFilterCount}
            />
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {/* Results Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
              {/* Left: Mobile Filter + Results Count */}
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  <span className="font-medium text-gray-700">ตัวกรอง</span>
                  {activeFilterCount > 0 && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <div className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                  <span className="text-gray-600">พบ</span>
                  <span className="font-bold text-blue-600 text-base sm:text-lg">ทัวร์ญี่ปุ่น</span>
                  <span className="text-gray-600">({filteredTours.length} โปรแกรม)</span>
                </div>
              </div>

              {/* Right: Filter Button + Sort Dropdown */}
              <div className="flex items-center gap-3">
                {/* Filter Button 2 - All Screen Sizes */}
                <button
                  onClick={() => setIsAdvancedFilterOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-all text-sm font-medium text-gray-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  <span>ตัวกรอง 2</span>
                  {activeFilterCount > 0 && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* Sort Dropdown */}
                <SortDropdown value={sortBy} onChange={setSortBy} />
              </div>
            </div>

            {/* Tour Grid */}
            {isLoading ? (
              <div className="flex flex-wrap gap-4 sm:gap-5 lg:gap-6">
                {[...Array(6)].map((_, i) => (
                  <TourCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredTours.length > 0 ? (
              <div className="flex flex-wrap gap-4 sm:gap-5 lg:gap-6">
                {filteredTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              <EmptyState onReset={handleResetFilters} />
            )}

            {/* SEO Content */}
            <SEOContent />

            {/* FAQ */}
            <FAQ />
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">ตัวกรอง</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
                activeCount={activeFilterCount}
              />
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                แสดงผล {filteredTours.length} ทัวร์
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Filter Modal 2 */}
      <AdvancedFilterModal
        isOpen={isAdvancedFilterOpen}
        onClose={() => setIsAdvancedFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        activeCount={activeFilterCount}
        resultsCount={filteredTours.length}
      />
    </div>
  )
}
