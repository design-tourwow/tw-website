'use client'

import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

interface PopularTagsBarProps {
  className?: string
}

export default function PopularTagsBar({ className = '' }: PopularTagsBarProps) {
  const router = useRouter()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Mock popular tags data
  const popularTags = [
    { label: 'ทัวร์ญี่ปุ่น โตเกียว', slug: 'tokyo' },
    { label: 'ทัวร์ญี่ปุ่น โอซาก้า', slug: 'osaka' },
    { label: 'ทัวร์ญี่ปุ่น เกียวโต', slug: 'kyoto' },
    { label: 'ทัวร์ญี่ปุ่น ฮอกไกโด', slug: 'hokkaido' },
    { label: 'ทัวร์ญี่ปุ่น ฟูจิ', slug: 'fuji' },
    { label: 'ทัวร์ญี่ปุ่น นาโกย่า', slug: 'nagoya' },
    { label: 'ทัวร์ญี่ปุ่น ฮิโรชิม่า', slug: 'hiroshima' },
    { label: 'ทัวร์ญี่ปุ่น นิกโก้', slug: 'nikko' },
    { label: 'ทัวร์ญี่ปุ่น คามาคุระ', slug: 'kamakura' },
    { label: 'ทัวร์ญี่ปุ่น ทาคายาม่า', slug: 'takayama' },
    { label: 'ทัวร์ญี่ปุ่น คานาซาว่า', slug: 'kanazawa' },
    { label: 'ทัวร์ญี่ปุ่น เซนได', slug: 'sendai' }
  ]

  // Check scroll position and update button states
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  // Handle scroll events
  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollButtons)
      // Check initial state
      checkScrollButtons()
      
      return () => container.removeEventListener('scroll', checkScrollButtons)
    }
  }, [])

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      })
    }
  }

  // Handle tag click
  const handleTagClick = (slug: string) => {
    // Navigate to the specific route
    router.push(`/tour-search-10/${slug}`)
  }

  return (
    <div className={`relative ${className}`}>
      {/* Left Scroll Button */}
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-md hover:bg-white hover:shadow-lg transition-all flex items-center justify-center group"
          aria-label="เลื่อนซ้าย"
        >
          <svg 
            className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Right Scroll Button */}
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-md hover:bg-white hover:shadow-lg transition-all flex items-center justify-center group"
          aria-label="เลื่อนขวา"
        >
          <svg 
            className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Tags Container */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide py-2 px-1"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitScrollbar: { display: 'none' }
        }}
      >
        {popularTags.map((tag, index) => (
          <button
            key={index}
            onClick={() => handleTagClick(tag.slug)}
            className="flex-shrink-0 inline-flex items-center justify-center px-3 py-1 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm font-medium text-[#019dff] hover:bg-[#e6f7ff] hover:border-[#019dff] hover:text-[#0187e6] transition-all duration-200 whitespace-nowrap shadow-sm focus:outline-none h-7"
          >
            {tag.label}
          </button>
        ))}
      </div>

      {/* Custom scrollbar hide styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}