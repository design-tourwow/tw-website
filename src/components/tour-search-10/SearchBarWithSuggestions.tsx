'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { tourDatabase, type TourData } from '@/lib/tour-data-search'

interface SearchBarWithSuggestionsProps {
  value: string
  onChange: (value: string) => void
  onSearch?: (query: string) => void
  /** Current destination context (e.g., 'tokyo'). When set, suggestions are filtered to this destination only */
  currentDestination?: {
    slug: string
    searchQuery: string // e.g., 'โตเกียว Tokyo'
  }
}

// Popular tags data (same as PopularTagsBar)
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

export default function SearchBarWithSuggestions({ value, onChange, onSearch, currentDestination }: SearchBarWithSuggestionsProps) {
  const router = useRouter()
  const [isFocused, setIsFocused] = useState(false)
  const [showTags, setShowTags] = useState(false)
  const [tourSuggestions, setTourSuggestions] = useState<TourData[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Typing animation function
  const typeText = (text: string, callback: (currentText: string) => void) => {
    setIsTyping(true)
    let currentIndex = 0
    
    const typeNextChar = () => {
      if (currentIndex < text.length) {
        currentIndex++
        callback(text.substring(0, currentIndex))
        
        // Random delay between 50-150ms for natural typing
        const delay = Math.random() * 100 + 50
        typingTimeoutRef.current = setTimeout(typeNextChar, delay)
      } else {
        setIsTyping(false)
      }
    }
    
    typeNextChar()
  }

  // Filter suggestions based on input
  useEffect(() => {
    if (isFocused) {
      if (value.length >= 3) {
        // When typing 3+ characters, show tour name suggestions
        const query = value.toLowerCase()

        // First, filter by current destination if set (using destinations array)
        let toursToSearch = tourDatabase
        if (currentDestination) {
          toursToSearch = tourDatabase.filter(tour =>
            tour.destinations.includes(currentDestination.slug)
          )
        }

        // Then, filter by user's search query
        const matchedTours = toursToSearch.filter(tour => {
          // Match against tour title
          if (tour.title.toLowerCase().includes(query)) {
            return true
          }
          // Match against tour features/highlights
          if (tour.features.some(feature => feature.toLowerCase().includes(query))) {
            return true
          }
          return false
        })

        setTourSuggestions(matchedTours)
        setShowTags(false) // Hide tags when showing tour suggestions
      } else if (value.length === 0) {
        // When input is empty, show popular tags only if NOT on a destination page
        setShowTags(!currentDestination)
        setTourSuggestions([])
      } else {
        // 1-2 characters: don't show anything yet
        setShowTags(false)
        setTourSuggestions([])
      }
    } else {
      setShowTags(false)
      setTourSuggestions([])
    }
  }, [value, isFocused, currentDestination])

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleTagClick = (slug: string) => {
    // Navigate to the specific route
    router.push(`/tour-search-10/${slug}`)
    setIsFocused(false)
  }

  const handleTourSuggestionClick = (tour: TourData) => {
    // When clicking a tour suggestion, set tour title as search value
    onChange(tour.title)
    setIsFocused(false)
    inputRef.current?.blur()
  }

  const handleSearchClick = () => {
    // Trigger search with current query
    if (onSearch) {
      onSearch(value)
    }
    setIsFocused(false)
    inputRef.current?.blur()
  }

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.lang = 'th-TH'
      recognition.continuous = false
      recognition.interimResults = false
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        
        // Clear any existing typing animation
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current)
        }
        
        // Clear input first
        onChange('')
        
        // Set focused to show suggestions during typing
        setIsFocused(true)
        
        // Start typing animation
        setTimeout(() => {
          typeText(transcript, (currentText) => {
            onChange(currentText)
          })
        }, 100)
      }
      recognition.start()
    } else {
      alert('เบราว์เซอร์ของคุณไม่รองรับการค้นหาด้วยเสียง')
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-1.5">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            {/* Location Pin Icon - Always visible with theme blue color */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="absolute left-3 top-3 text-[#019dff] w-5 h-5 z-10"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            
            <div className="w-full pl-11 pr-24 px-2 min-h-[48px] border-2 border-transparent rounded-lg transition-colors flex items-center gap-1.5">
              {/* Input */}
              <input
                ref={inputRef}
                type="text"
                placeholder="ไปเที่ยวไหนดี? พิมพ์ชื่อจุดหมายที่อยากไป"
                className="flex-1 min-w-[120px] outline-none text-base text-gray-900 bg-transparent"
                aria-label="ค้นหาทัวร์"
                value={value}
                onChange={(e) => {
                  // Clear typing animation if user manually types
                  if (typingTimeoutRef.current) {
                    clearTimeout(typingTimeoutRef.current)
                    setIsTyping(false)
                  }
                  onChange(e.target.value)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleSearchClick()
                  }
                }}
                onFocus={() => setIsFocused(true)}
                disabled={isTyping}
              />
            </div>
            
            <button 
              onClick={handleVoiceSearch}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors hover:bg-gray-100 text-gray-600 flex items-center justify-center"
              aria-label="ค้นหาด้วยเสียง"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
            </button>

            <button 
              onClick={handleSearchClick}
              className="absolute right-1.5 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors hover:bg-gray-100 text-gray-600 flex items-center justify-center"
              aria-label="ค้นหา"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {(showTags || tourSuggestions.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
          <div className="py-3">
            {/* Popular Tags (when input is empty) */}
            {showTags && (
              <>
                <div className="px-4 py-2 text-xs text-gray-500 font-medium">
                  จุดหมายยอดนิยม
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 px-3 pb-2">
                  {popularTags.map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => handleTagClick(tag.slug)}
                      className="inline-flex items-center justify-center px-3 py-1.5 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm font-medium text-[#019dff] hover:bg-[#e6f7ff] hover:border-[#019dff] hover:text-[#0187e6] transition-all duration-200 whitespace-nowrap shadow-sm"
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Tour Name Suggestions (Vertical List) */}
            {tourSuggestions.length > 0 && (
              <>
                <div className="px-4 py-2 text-xs text-gray-500 font-medium">
                  โปรแกรมทัวร์ที่เกี่ยวข้อง ({tourSuggestions.length} โปรแกรม)
                </div>
                <div className="flex flex-col">
                  {tourSuggestions.map((tour) => (
                    <button
                      key={tour.id}
                      onClick={() => handleTourSuggestionClick(tour)}
                      className="w-full text-left px-4 py-3 hover:bg-[#e6f7ff] transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900 line-clamp-1">
                          {tour.title}
                        </span>
                        <span className="text-xs text-gray-500 flex-shrink-0">
                          {tour.features.slice(0, 2).join(', ')}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
