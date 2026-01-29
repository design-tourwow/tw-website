'use client'

import { useState, useEffect, useMemo } from 'react'
import { tourDatabase, filterAndSortTours, calculateFilterCounts } from '@/lib/tour-data-search'
import TourCard from '@/components/tour-search-10/TourCard'
import FilterSidebar from '@/components/tour-search-10/FilterSidebar'
import SortDropdown from '@/components/tour-search-10/SortDropdown'
import TourCardSkeleton from '@/components/tour-search-10/TourCardSkeleton'
import EmptyState from '@/components/tour-search-10/EmptyState'
import PopularDestinations from '@/components/tour-search-10/PopularDestinations'
import Breadcrumb from '@/components/tour-search-10/Breadcrumb'
import SEOContent from '@/components/tour-search-10/SEOContent'
import SearchBarWithSuggestions from '@/components/tour-search-10/SearchBarWithSuggestions'
import AdvancedFilterModal from '@/components/tour-search-10/AdvancedFilterModal'
import AnimatedTitle from '@/components/tour-search-10/AnimatedTitle'
import HotPromotionBanner from '@/components/tour-search-10/HotPromotionBanner'
import PopularTagsBar from '@/components/tour-search-10/PopularTagsBar'

export default function TourSearchPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showGoToTop, setShowGoToTop] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  
  const sortOptions = [
    { 
      value: 'popular', 
      label: 'ยอดนิยม',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    { 
      value: 'price-asc', 
      label: 'ราคาต่ำสุด',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
        </svg>
      )
    },
    { 
      value: 'price-desc', 
      label: 'ราคาสูงสุด',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
        </svg>
      )
    },
    { 
      value: 'rating', 
      label: 'คะแนนสูงสุด',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    },
  ]
  
  // Prevent body scroll when mobile filter is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      const scrollY = window.scrollY
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.width = '100%'
    } else {
      const scrollY = document.body.style.top
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }
    
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
    }
  }, [isMobileFilterOpen])
  
  // Detect scroll for "Go to Top" button and sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled down 300px
      setShowGoToTop(window.scrollY > 300)
      
      // Mobile sticky behavior - check if scrolled past search and filter area
      const searchSection = document.querySelector('.search-filter-section')
      if (searchSection && window.innerWidth < 1024) { // Only on mobile/tablet
        const rect = searchSection.getBoundingClientRect()
        setIsSticky(rect.bottom <= 0)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll) // Also check on resize
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
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
  
  const [pendingSearchQuery, setPendingSearchQuery] = useState('')
  
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
  
  // Calculate filter counts for real-time updates
  const filterCounts = useMemo(() => {
    return calculateFilterCounts(tourDatabase, filters)
  }, [filters])
  
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
    setPendingSearchQuery('')
  }

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }))
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
      <style jsx>{`
        @keyframes expandPrice {
          from { 
            transform: translateY(100%); 
            opacity: 0;
          }
          to { 
            transform: translateY(0); 
            opacity: 1;
          }
        }
        @keyframes contractPrice {
          from { 
            transform: translateY(0); 
            opacity: 1; 
          }
          to { 
            transform: translateY(100%); 
            opacity: 0; 
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .animate-bounce-horizontal {
          animation: bounce-horizontal 1.5s ease-in-out infinite;
        }
        @keyframes bounce-horizontal {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
      `}</style>
      
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-20 sm:py-24 md:py-32 lg:py-40 px-4 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=2048&h=1024&fit=crop&auto=format&q=90)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Lighter Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/15 to-black/25" />
        </div>

        <div className="mx-auto relative z-10" style={{ maxWidth: '1200px' }}>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              <AnimatedTitle text="ทัวร์ญี่ปุ่น" />
            </h1>
          </div>
        </div>
      </section>

      {/* Breadcrumb & Search & Popular Destinations */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 search-filter-section" style={{ maxWidth: '1200px' }}>
        <Breadcrumb />
        
        {/* Mobile Search Bar - Below Breadcrumb */}
        <div className="lg:hidden mb-3">
          <div className="max-w-full mx-auto">
            <SearchBarWithSuggestions 
              value={pendingSearchQuery}
              onChange={setPendingSearchQuery}
              onSearch={handleSearch}
            />
          </div>
        </div>
        
        {/* Desktop Search Bar */}
        <div className="hidden lg:block mb-3">
          <div className="max-w-full mx-auto">
            <SearchBarWithSuggestions 
              value={pendingSearchQuery}
              onChange={setPendingSearchQuery}
              onSearch={handleSearch}
            />
          </div>
        </div>
        
        {/* Popular Tags Bar - Below Search */}
        <div className="mb-6">
          <PopularTagsBar />
        </div>
        
        <PopularDestinations />
      </div>

      {/* Sticky Mobile Search Bar Only */}
      {isSticky && (
        <div className="lg:hidden fixed top-16 left-0 right-0 z-40 pt-0.5">
          <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
            {/* Mobile Search Bar Only */}
            <SearchBarWithSuggestions 
              value={pendingSearchQuery}
              onChange={setPendingSearchQuery}
              onSearch={handleSearch}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 ${isSticky ? 'lg:mt-0 mt-20' : ''}`} style={{ maxWidth: '1200px' }}>
        <div className="flex gap-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            {/* Hot Promotion Banner - Start at same level as Tour Grid */}
            <div className="mt-24 sm:mt-28 mb-6">
              <HotPromotionBanner />
            </div>
            
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
              activeCount={activeFilterCount}
              filterCounts={filterCounts}
            />
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {/* Results Bar */}
            <div className="mb-4 sm:mb-6">
              {/* Desktop: Results Count & Sort - Same Line */}
              <div className="hidden lg:flex lg:items-center lg:justify-between gap-3 mb-3 sm:mb-4">
                {/* Desktop: Results Count */}
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base text-gray-600">พบ</span>
                  <span className="font-bold text-[#019dff] text-lg sm:text-xl">ทัวร์ญี่ปุ่น</span>
                  <span className="text-sm sm:text-base text-gray-600">({filteredTours.length} โปรแกรม)</span>
                </div>

                {/* Desktop Sort Dropdown - Same Line */}
                <div>
                  <SortDropdown value={sortBy} onChange={setSortBy} />
                </div>
              </div>

              {/* Mobile: Results Count & Filter/Sort Buttons - Same Line */}
              <div className="lg:hidden flex items-center justify-between gap-3 mb-3 sm:mb-4">
                {/* Mobile: Results Count (Left Aligned) */}
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-sm text-gray-600">พบ</span>
                  <span className="font-bold text-[#019dff] text-base">ทัวร์ญี่ปุ่น</span>
                  <span className="text-sm text-gray-600">{filteredTours.length} โปรแกรม</span>
                </div>

                {/* Mobile: Filter & Sort Buttons (Right Aligned, Compact) */}
                <div className="relative flex-shrink-0">
                  <div className="flex items-center rounded-lg overflow-hidden shadow-sm border border-gray-200">
                    {/* Filter Button - Compact */}
                    <button
                      onClick={() => setIsMobileFilterOpen(true)}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-white border-r border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                      <span className="text-xs">กรอง</span>
                      {activeFilterCount > 0 && (
                        <span className="bg-[#019dff] text-white text-xs px-1.5 py-0.5 rounded-full font-bold min-w-[16px] text-center">
                          {activeFilterCount}
                        </span>
                      )}
                    </button>

                    {/* Sort Button - Compact */}
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-all"
                    >
                      <span className="text-xs">เรียง</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                    </button>
                  </div>

                  {/* Sort Dropdown Menu */}
                  {isOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsOpen(false)}
                      />
                      <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
                        <div className="py-2">
                          {[
                            { value: 'popular', label: 'ความนิยม' },
                            { value: 'price-low', label: 'ราคา: ต่ำ → สูง' },
                            { value: 'price-high', label: 'ราคา: สูง → ต่ำ' },
                            { value: 'duration-short', label: 'ระยะเวลา: สั้น → ยาว' },
                            { value: 'duration-long', label: 'ระยะเวลา: ยาว → สั้น' },
                            { value: 'newest', label: 'ใหม่ล่าสุด' }
                          ].map((option) => (
                            <button
                              key={option.value}
                              onClick={() => {
                                setSortBy(option.value as any)
                                setIsOpen(false)
                              }}
                              className={`w-full text-left px-4 py-3 text-sm hover:bg-[#e6f7ff] transition-colors ${
                                sortBy === option.value ? 'bg-[#e6f7ff] text-[#019dff] font-medium' : 'text-gray-700'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Separator Line Before Tour Cards */}
            <div className="border-b border-gray-200 mb-4 sm:mb-6"></div>

            {/* Tour Grid */}
            {isLoading ? (
              <div 
                className="grid gap-4 sm:gap-6"
                style={{ 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 412px), 1fr))'
                }}
              >
                {[...Array(8)].map((_, i) => (
                  <TourCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredTours.length > 0 ? (
              <div 
                className="grid gap-4 sm:gap-6"
                style={{ 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 412px), 1fr))'
                }}
              >
                {filteredTours.map((tour, index) => (
                  <div key={tour.id}>
                    {/* Tour Card */}
                    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                      <TourCard tour={tour} />
                    </div>
                    
                    {/* Hot Promotion Banner after 3rd card in mobile only */}
                    {index === 2 && (
                      <div className="lg:hidden mt-4 sm:mt-6">
                        <HotPromotionBanner />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState onReset={handleResetFilters} />
            )}

            {/* SEO Content */}
            <SEOContent />
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white shadow-2xl overflow-hidden flex flex-col">
            {/* Header - Fixed */}
            <div className="flex-shrink-0 bg-gradient-to-r from-gray-100 to-gray-50 px-5 py-4 flex items-center justify-between shadow-sm border-b border-gray-200">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-[#019dff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">ตัวกรอง</h2>
                  {activeFilterCount > 0 && (
                    <p className="text-xs text-gray-600">เลือกแล้ว {activeFilterCount} รายการ</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-10 h-10 rounded-xl bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Filter Content - Scrollable */}
            <div className="flex-1 overflow-y-auto bg-gray-50">
              <div className="p-5">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleResetFilters}
                  activeCount={activeFilterCount}
                  filterCounts={filterCounts}
                />
              </div>
            </div>

            {/* Footer - Fixed */}
            <div className="flex-shrink-0 bg-white border-t border-gray-200 p-4 shadow-lg">
              <div className="flex gap-3">
                {activeFilterCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="flex-1 bg-gray-100 text-gray-700 py-3.5 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    ล้าง
                  </button>
                )}
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className={`${activeFilterCount > 0 ? 'flex-[2]' : 'flex-1'} bg-[#019dff] text-white py-3.5 rounded-xl font-semibold hover:bg-[#0187e6] transition-all shadow-sm flex items-center justify-center gap-2`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  แสดงผล {filteredTours.length} ทัวร์
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Filter Modal */}
      <AdvancedFilterModal
        isOpen={isAdvancedFilterOpen}
        onClose={() => setIsAdvancedFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        activeCount={activeFilterCount}
        resultsCount={filteredTours.length}
      />

      {/* Go to Top Button */}
      {showGoToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-gradient-to-r from-[#019dff] to-[#0187e6] text-white rounded-full shadow-lg hover:from-[#0187e6] hover:to-blue-800 transition-all flex items-center justify-center group hover:scale-110"
          aria-label="กลับไปด้านบน"
        >
          <svg 
            className="w-6 h-6 transform group-hover:-translate-y-0.5 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  )
}