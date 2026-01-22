'use client'

import { useState, useEffect, useMemo } from 'react'
import { tourDatabase, filterAndSortTours, calculateFilterCounts } from '@/lib/tour-data-search'
import TourCard from '@/components/tour-search-4/TourCard'
import FilterSidebar from '@/components/tour-search-4/FilterSidebar'
import SortDropdown from '@/components/tour-search-4/SortDropdown'
import TourCardSkeleton from '@/components/tour-search-4/TourCardSkeleton'
import EmptyState from '@/components/tour-search-4/EmptyState'
import PopularDestinations from '@/components/tour-search-7/PopularDestinations'
import Breadcrumb from '@/components/tour-search-4/Breadcrumb'
import SEOContent from '@/components/tour-search-4/SEOContent'
import FAQ from '@/components/tour-search-4/FAQ'
import AdvancedFilterModal from '@/components/tour-search-4/AdvancedFilterModal'

export default function TourSearchPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showGoToTop, setShowGoToTop] = useState(false)
  
  // Smart Preview states for first 3 cards
  const [smartPreviewCard1, setSmartPreviewCard1] = useState<string | null>(null)
  const [smartPreviewCard2, setSmartPreviewCard2] = useState<string | null>(null)
  const [smartPreviewCard3, setSmartPreviewCard3] = useState<string | null>(null)
  const [closingCard1, setClosingCard1] = useState(false)
  const [closingCard2, setClosingCard2] = useState(false)
  const [closingCard3, setClosingCard3] = useState(false)
  const [card1Dismissed, setCard1Dismissed] = useState(false)
  const [card2Dismissed, setCard2Dismissed] = useState(false)
  const [card3Dismissed, setCard3Dismissed] = useState(false)
  
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
  
  // Detect scroll for "Go to Top" button
  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled down 300px
      setShowGoToTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  // Smart Preview - Close functions
  const closeSmartPreviewCard1 = (isManualDismiss = false) => {
    if (isManualDismiss) setCard1Dismissed(true)
    setSmartPreviewCard1(null)
    setClosingCard1(false)
  }
  
  const closeSmartPreviewCard2 = (isManualDismiss = false) => {
    if (isManualDismiss) setCard2Dismissed(true)
    setSmartPreviewCard2(null)
    setClosingCard2(false)
  }
  
  const closeSmartPreviewCard3 = (isManualDismiss = false) => {
    if (isManualDismiss) setCard3Dismissed(true)
    setSmartPreviewCard3(null)
    setClosingCard3(false)
  }
  
  // Smart Preview - View Duration Tracking for Cards 1, 2, 3
  useEffect(() => {
    console.log('Setting up IntersectionObserver...')
    
    const observerOptions = {
      threshold: [0, 0.25, 0.5, 0.75, 1.0],
      rootMargin: '0px'
    }

    const cardTimers = new Map()

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const cardId = entry.target.getAttribute('data-card-id')
        console.log('Observer detected:', cardId, 'isIntersecting:', entry.isIntersecting, 'ratio:', entry.intersectionRatio)
        
        if (cardId === 'card-1' && !card1Dismissed) {
          if (entry.isIntersecting && entry.intersectionRatio === 1.0) {
            console.log('Card 1 fully visible, starting 3s timer...')
            const timer = setTimeout(() => {
              console.log('Card 1 timer fired! Showing popup...')
              setSmartPreviewCard1(cardId)
            }, 3000)
            cardTimers.set(cardId, timer)
          } else if (entry.intersectionRatio < 0.25 || !entry.isIntersecting) {
            const timer = cardTimers.get(cardId)
            if (timer) {
              console.log('Card 1 not visible, clearing timer')
              clearTimeout(timer)
              cardTimers.delete(cardId)
            }
            if (smartPreviewCard1 === cardId) {
              console.log('Card 1 scrolled away, closing popup smoothly...')
              closeSmartPreviewCard1()
            }
            if (card1Dismissed && entry.intersectionRatio === 0) setCard1Dismissed(false)
          }
        }
        
        if (cardId === 'card-2' && !card2Dismissed) {
          if (entry.isIntersecting && entry.intersectionRatio === 1.0) {
            console.log('Card 2 fully visible, starting 3s timer...')
            const timer = setTimeout(() => {
              console.log('Card 2 timer fired! Showing popup...')
              setSmartPreviewCard2(cardId)
            }, 3000)
            cardTimers.set(cardId, timer)
          } else if (entry.intersectionRatio < 0.25 || !entry.isIntersecting) {
            const timer = cardTimers.get(cardId)
            if (timer) {
              console.log('Card 2 not visible, clearing timer')
              clearTimeout(timer)
              cardTimers.delete(cardId)
            }
            if (smartPreviewCard2 === cardId) {
              console.log('Card 2 scrolled away, closing popup smoothly...')
              closeSmartPreviewCard2()
            }
            if (card2Dismissed && entry.intersectionRatio === 0) setCard2Dismissed(false)
          }
        }
        
        if (cardId === 'card-3' && !card3Dismissed) {
          if (entry.isIntersecting && entry.intersectionRatio === 1.0) {
            console.log('Card 3 fully visible, starting 3s timer...')
            const timer = setTimeout(() => {
              console.log('Card 3 timer fired! Showing popup...')
              setSmartPreviewCard3(cardId)
            }, 3000)
            cardTimers.set(cardId, timer)
          } else if (entry.intersectionRatio < 0.25 || !entry.isIntersecting) {
            const timer = cardTimers.get(cardId)
            if (timer) {
              console.log('Card 3 not visible, clearing timer')
              clearTimeout(timer)
              cardTimers.delete(cardId)
            }
            if (smartPreviewCard3 === cardId) {
              console.log('Card 3 scrolled away, closing popup smoothly...')
              closeSmartPreviewCard3()
            }
            if (card3Dismissed && entry.intersectionRatio === 0) setCard3Dismissed(false)
          }
        }
      })
    }, observerOptions)

    // Wait for DOM to be ready
    setTimeout(() => {
      const card1 = document.querySelector('[data-card-id="card-1"]')
      const card2 = document.querySelector('[data-card-id="card-2"]')
      const card3 = document.querySelector('[data-card-id="card-3"]')
      
      console.log('Found cards:', { card1: !!card1, card2: !!card2, card3: !!card3 })
      
      if (card1) {
        console.log('Observing card-1')
        observer.observe(card1)
      }
      if (card2) {
        console.log('Observing card-2')
        observer.observe(card2)
      }
      if (card3) {
        console.log('Observing card-3')
        observer.observe(card3)
      }
    }, 1000)

    return () => {
      console.log('Cleaning up observer')
      observer.disconnect()
      cardTimers.forEach(timer => clearTimeout(timer))
      cardTimers.clear()
    }
  }, [smartPreviewCard1, smartPreviewCard2, smartPreviewCard3, card1Dismissed, card2Dismissed, card3Dismissed])
  
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&h=600&fit=crop&auto=format&q=80)',
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
              <span className="inline-block bg-gradient-to-r from-white via-blue-50 to-white bg-clip-text text-transparent drop-shadow-2xl">
                ทัวร์ญี่ปุ่น
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Breadcrumb & Popular Destinations */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6" style={{ maxWidth: '1200px' }}>
        <Breadcrumb />
        <PopularDestinations />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6" style={{ maxWidth: '1200px' }}>
        <div className="flex gap-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
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
            {/* Results Count - Mobile & Desktop */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-200">
              <span className="text-sm sm:text-base text-gray-600">พบ</span>
              <span className="font-bold text-blue-600 text-lg sm:text-xl">ทัวร์ญี่ปุ่น</span>
              <span className="text-sm sm:text-base text-gray-600">({filteredTours.length} โปรแกรม)</span>
            </div>

            {/* Filter & Sort Buttons Container */}
            <div className="flex items-center justify-end">
              {/* Filter & Sort Combined Button - Mobile Only */}
              <div className="lg:hidden relative flex-1">
              <div className="flex items-center rounded-2xl overflow-hidden shadow-lg">
                {/* Filter Button - Dark to Medium (Left to Right) */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-700 to-blue-600 text-white font-medium hover:from-blue-800 hover:to-blue-700 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  <span className="text-sm">ตัวกรอง</span>
                  {activeFilterCount > 0 && (
                    <span className="bg-white/90 text-blue-700 text-xs px-2 py-0.5 rounded-full font-bold min-w-[20px] text-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* Sort Button - Medium to Dark (Left to Right) */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium hover:from-blue-700 hover:to-blue-800 transition-all"
                >
                  <span className="text-sm">เรียงตาม</span>
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
                  <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 py-1 z-50 overflow-hidden">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setSortBy(option.value)
                          setIsOpen(false)
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                          sortBy === option.value
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className={`flex-shrink-0 ${sortBy === option.value ? 'text-blue-600' : 'text-gray-500'}`}>
                          {option.icon}
                        </span>
                        <span className="flex-1 text-left font-medium">{option.label}</span>
                        {sortBy === option.value && (
                          <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

              {/* Desktop Sort Dropdown */}
              <div className="hidden lg:block">
                <SortDropdown value={sortBy} onChange={setSortBy} />
              </div>
            </div>
          </div>

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
                <div key={tour.id} className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                  <TourCard 
                    tour={tour} 
                    cardId={index === 0 ? 'card-1' : index === 1 ? 'card-2' : index === 2 ? 'card-3' : undefined}
                  />
                  
                  {/* Smart Preview Popup for Card 1 */}
                  {index === 0 && smartPreviewCard1 === 'card-1' && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl sm:rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-30"
                        style={{ animation: 'fadeIn 0.3s ease-out' }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 z-40 pointer-events-auto"
                        style={{ animation: 'expandPrice 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}
                      >
                        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-t-2xl shadow-2xl border-t-4 border-red-700">
                          <div className="bg-white/95 backdrop-blur p-3 rounded-t-2xl">
                            <div className="flex items-start gap-3 mb-2 pb-2 border-b border-gray-200">
                              <div className="relative mt-1">
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-lg blur-sm opacity-60 transform -rotate-2"></div>
                                <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white text-sm font-black px-3 py-1.5 rounded-lg shadow-lg relative overflow-hidden transform -rotate-2">
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12"></div>
                                  <div className="relative z-10 flex items-center gap-1">
                                    <span className="text-yellow-300 text-xs">🔥</span>
                                    <span>-25%</span>
                                    <span className="text-yellow-300 text-xs">🔥</span>
                                  </div>
                                  <div className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-yellow-400 rounded-full opacity-80"></div>
                                  <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-yellow-400 rounded-full opacity-80 animate-ping"></div>
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-xl font-bold text-red-600">฿29,900</span>
                                  <span className="text-base line-through opacity-70 font-medium text-gray-400">฿39,900</span>
                                </div>
                                <p className="text-xs text-green-600 font-bold">ประหยัด ฿10,000 ทันที!</p>
                                <p className="text-xs text-red-600 font-bold">ดีลพิเศษวันนี้เท่านั้น!</p>
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2">
                                <span className="text-base">💳</span>
                                <span className="text-sm font-bold text-gray-700">ผ่อน 0% เริ่มต้น ฿2,491/เดือน</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-base">🎁</span>
                                <span className="text-sm font-bold text-gray-700">ฟรี! ประกันเดินทาง มูลค่า ฿2,000</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-base">🔒</span>
                                <span className="text-sm font-bold text-gray-700">จองแล้วล็อคราคา รับประกัน 100%</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2 gap-2">
                              <button className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 text-white font-black py-2.5 rounded-lg hover:from-red-700 hover:to-orange-700 transition-all text-sm shadow-lg group">
                                <span className="animate-bounce-horizontal inline-flex items-center justify-center gap-1 group-hover:animate-none drop-shadow-md">
                                  <span>จองด่วน! คลิกเลย</span>
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                                  </svg>
                                </span>
                              </button>
                              <div className="h-8 w-px bg-gray-300"></div>
                              <button onClick={() => closeSmartPreviewCard1(true)} className="text-xs text-gray-400 hover:text-gray-600 underline px-2 py-1 hover:bg-gray-50 rounded transition-colors whitespace-nowrap">
                                ดูต่อภายหลัง
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Smart Preview Popup for Card 2 */}
                  {index === 1 && smartPreviewCard2 === 'card-2' && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl sm:rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-30"
                        style={{ animation: 'fadeIn 0.3s ease-out' }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 z-40 pointer-events-auto"
                        style={{ animation: 'expandPrice 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}
                      >
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl shadow-2xl border-t-4 border-blue-700">
                          <div className="bg-white/95 backdrop-blur p-3 rounded-t-2xl">
                            <div className="flex items-start gap-3 mb-2 pb-2 border-b border-gray-200">
                              <div className="relative mt-1">
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-lg blur-sm opacity-60 transform -rotate-2"></div>
                                <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 text-white text-sm font-black px-3 py-1.5 rounded-lg shadow-lg relative overflow-hidden transform -rotate-2">
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12"></div>
                                  <div className="relative z-10 flex items-center gap-1">
                                    <span className="text-yellow-300 text-xs">💎</span>
                                    <span>-20%</span>
                                    <span className="text-yellow-300 text-xs">💎</span>
                                  </div>
                                  <div className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-yellow-400 rounded-full opacity-80"></div>
                                  <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-yellow-400 rounded-full opacity-80 animate-ping"></div>
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-xl font-bold text-blue-600">฿35,900</span>
                                  <span className="text-base line-through opacity-70 font-medium text-gray-400">฿44,900</span>
                                </div>
                                <p className="text-xs text-green-600 font-bold">ราคาพิเศษ VIP Member</p>
                                <p className="text-xs text-blue-600 font-bold">ทัวร์พรีเมี่ยม คุณภาพระดับโลก</p>
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2">
                                <span className="text-base">🏨</span>
                                <span className="text-sm font-bold text-gray-700">โรงแรม 5 ดาวทุกคืน ทำเล Premium</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-base">👨‍🍳</span>
                                <span className="text-sm font-bold text-gray-700">อาหารพรีเมี่ยม + ของว่างพิเศษ</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-base">🎯</span>
                                <span className="text-sm font-bold text-gray-700">ไกด์ท้องถิ่นมืออาชีพ พูดไทยได้</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2 gap-2">
                              <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black py-2.5 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-sm shadow-lg group">
                                <span className="animate-bounce-horizontal inline-flex items-center justify-center gap-1 group-hover:animate-none drop-shadow-md">
                                  <span>สำรองที่นั่ง VIP</span>
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                                  </svg>
                                </span>
                              </button>
                              <div className="h-8 w-px bg-gray-300"></div>
                              <button onClick={() => closeSmartPreviewCard2(true)} className="text-xs text-gray-400 hover:text-gray-600 underline px-2 py-1 hover:bg-gray-50 rounded transition-colors whitespace-nowrap">
                                ดูต่อภายหลัง
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Smart Preview Popup for Card 3 */}
                  {index === 2 && smartPreviewCard3 === 'card-3' && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl sm:rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-30"
                        style={{ animation: 'fadeIn 0.3s ease-out' }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 z-40 pointer-events-auto"
                        style={{ animation: 'expandPrice 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}
                      >
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl shadow-2xl border-t-4 border-blue-700">
                          <div className="bg-white/95 backdrop-blur p-3 rounded-t-2xl">
                            <div className="flex items-start gap-3 mb-2 pb-2 border-b border-gray-200">
                              <div className="relative mt-1">
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-lg blur-sm opacity-60 transform -rotate-2"></div>
                                <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 text-white text-sm font-black px-3 py-1.5 rounded-lg shadow-lg relative overflow-hidden transform -rotate-2">
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12"></div>
                                  <div className="relative z-10 flex items-center gap-1">
                                    <span className="text-yellow-300 text-xs">⭐</span>
                                    <span>-18%</span>
                                    <span className="text-yellow-300 text-xs">⭐</span>
                                  </div>
                                  <div className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-yellow-400 rounded-full opacity-80"></div>
                                  <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-yellow-400 rounded-full opacity-80 animate-ping"></div>
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-xl font-bold text-blue-600">฿42,900</span>
                                  <span className="text-base line-through opacity-70 font-medium text-gray-400">฿52,900</span>
                                </div>
                                <p className="text-xs text-green-600 font-bold">ประหยัด ฿10,000</p>
                                <p className="text-xs text-blue-600 font-bold">โปรโมชั่นพิเศษสุดสัปดาห์!</p>
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2">
                                <span className="text-base">✈️</span>
                                <span className="text-sm font-bold text-gray-700">บินตรง ไม่แวะ ประหยัดเวลา</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-base">🎁</span>
                                <span className="text-sm font-bold text-gray-700">ฟรี! ซิมการ์ด + ประกันเดินทาง</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-base">📸</span>
                                <span className="text-sm font-bold text-gray-700">ถ่ายรูปสวยทุกจุด Instagrammable</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2 gap-2">
                              <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black py-2.5 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-sm shadow-lg group">
                                <span className="animate-bounce-horizontal inline-flex items-center justify-center gap-1 group-hover:animate-none drop-shadow-md">
                                  <span>จองเลย! ราคาพิเศษ</span>
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                                  </svg>
                                </span>
                              </button>
                              <div className="h-8 w-px bg-gray-300"></div>
                              <button onClick={() => closeSmartPreviewCard3(true)} className="text-xs text-gray-400 hover:text-gray-600 underline px-2 py-1 hover:bg-gray-50 rounded transition-colors whitespace-nowrap">
                                ดูต่อภายหลัง
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
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

          {/* FAQ */}
          <FAQ />
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
            <div className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">ตัวกรอง</h2>
                  {activeFilterCount > 0 && (
                    <p className="text-xs text-blue-100">เลือกแล้ว {activeFilterCount} รายการ</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className={`${activeFilterCount > 0 ? 'flex-[2]' : 'flex-1'} bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg flex items-center justify-center gap-2`}
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

      {/* Go to Top Button */}
      {showGoToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center group hover:scale-110"
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
