'use client'

import { useState, useEffect, useMemo } from 'react'
import { tourDatabase, filterAndSortTours, calculateFilterCounts } from '@/lib/tour-data-search'
import TourCard from '@/components/tour-search-4/TourCard'
import FilterSidebar from '@/components/tour-search-5/FilterSidebar'
import SortDropdown from '@/components/tour-search-4/SortDropdown'
import TourCardSkeleton from '@/components/tour-search-4/TourCardSkeleton'
import EmptyState from '@/components/tour-search-4/EmptyState'
import { Search, SlidersHorizontal, X, ArrowUp } from 'lucide-react'

export default function TourSearch5Page() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [showGoToTop, setShowGoToTop] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
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
  
  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setShowGoToTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  // Filter and sort tours
  const filteredTours = useMemo(() => {
    return filterAndSortTours(tourDatabase, { ...filters, searchQuery }, sortBy)
  }, [filters, sortBy, searchQuery])

  // Calculate filter counts
  const filterCounts = useMemo(() => {
    return calculateFilterCounts(tourDatabase, { ...filters, searchQuery })
  }, [filters, searchQuery])

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
    setSearchQuery('')
  }

  const activeFilterCount = [
    ...filters.holidays,
    ...filters.priceRanges,
    ...filters.durations,
    ...filters.airlines,
    filters.rating !== 0 ? filters.rating : null,
    searchQuery
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact Hero Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">ค้นหาทัวร์ที่ใช่สำหรับคุณ</h1>
          
          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาจุดหมาย, ประเทศ, หรือชื่อทัวร์..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-base"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-6">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
                activeCount={activeFilterCount}
                filterCounts={filterCounts}
              />
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {/* Results Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                {/* Results Count */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-gray-600">
                      พบ <span className="font-bold text-gray-900">{filteredTours.length}</span> โปรแกรมทัวร์
                    </span>
                  </div>
                </div>

                {/* Desktop Sort */}
                <div className="hidden sm:block">
                  <SortDropdown value={sortBy} onChange={setSortBy} />
                </div>

                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>ตัวกรอง</span>
                  {activeFilterCount > 0 && (
                    <span className="bg-white text-blue-600 text-xs px-2 py-0.5 rounded-full font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Mobile Sort */}
              <div className="sm:hidden mt-4 pt-4 border-t border-gray-200">
                <SortDropdown value={sortBy} onChange={setSortBy} />
              </div>
            </div>

            {/* Tour Grid */}
            {isLoading ? (
              <div 
                className="grid gap-6"
                style={{ 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))'
                }}
              >
                {[...Array(6)].map((_, i) => (
                  <TourCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredTours.length > 0 ? (
              <div 
                className="grid gap-6"
                style={{ 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))'
                }}
              >
                {filteredTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              <EmptyState onReset={handleResetFilters} />
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          
          {/* Modal */}
          <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                  <SlidersHorizontal className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">ตัวกรองการค้นหา</h2>
                  {activeFilterCount > 0 && (
                    <p className="text-sm text-gray-600">เลือกแล้ว {activeFilterCount} รายการ</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
                activeCount={activeFilterCount}
                filterCounts={filterCounts}
              />
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3">
              <button
                onClick={handleResetFilters}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                ล้างตัวกรอง
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                แสดงผล ({filteredTours.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Go to Top Button */}
      {showGoToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 hover:scale-110 transition-all z-40 flex items-center justify-center"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
