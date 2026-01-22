'use client'

import { useState, useRef, useEffect } from 'react'

interface SearchBarWithSuggestionsProps {
  value: string
  onChange: (value: string) => void
  selectedTags?: string[]
  onTagsChange?: (tags: string[]) => void
}

export default function SearchBarWithSuggestions({ value, onChange, selectedTags = [], onTagsChange }: SearchBarWithSuggestionsProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
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

  // All available keywords/tags
  const allKeywords = [
    'โตเกียว',
    'โอซาก้า',
    'เกียวโต',
    'ฟูจิ',
    'ฮอกไกโด',
    'ซัปโปโร',
    'นาโกย่า',
    'ฮิโรชิม่า',
    'นารา',
    'คานาซาว่า',
    'ทาคายาม่า',
    'ชิราคาวาโกะ',
    'ดิสนีย์',
    'ภูเขาไฟฟูจิ',
    'ออนเซ็น',
    'ซากุระ',
    'ใบไม้เปลี่ยนสี',
    'หิมะ',
    '5 วัน',
    '6 วัน',
    '7 วัน',
    'ราคาถูก',
    'หรูหรา',
    'ครอบครัว',
    'ฮันนีมูน'
  ]

  // Filter suggestions based on input
  useEffect(() => {
    if (isFocused) {
      if (value.length >= 2) {
        // Filter keywords that match the input and exclude selected tags
        const filtered = allKeywords.filter(keyword =>
          keyword.toLowerCase().includes(value.toLowerCase()) &&
          !selectedTags.includes(keyword)
        )
        setSuggestions(filtered)
      } else if (value.length === 0) {
        // Show all keywords except selected ones
        const available = allKeywords.filter(keyword => !selectedTags.includes(keyword))
        setSuggestions(available)
      } else {
        setSuggestions([])
      }
    } else {
      setSuggestions([])
    }
  }, [value, isFocused, selectedTags])

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

  const handleSuggestionClick = (keyword: string) => {
    if (!onTagsChange) return
    
    // Add tag (no toggle, just add)
    if (!selectedTags.includes(keyword)) {
      onTagsChange([...selectedTags, keyword])
    }
    // Don't close dropdown, keep it open for multi-select
  }

  const handleRemoveTag = (tagToRemove: string) => {
    if (!onTagsChange) return
    onTagsChange(selectedTags.filter(tag => tag !== tagToRemove))
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
              className="absolute left-3 top-3 text-gray-400 w-5 h-5 z-10"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            
            <div className="w-full pl-11 pr-24 px-2 min-h-[48px] border-2 border-transparent rounded-lg transition-colors flex flex-wrap items-center gap-1.5">
              {/* Selected Tags */}
              {selectedTags.map((tag, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    // Do nothing when clicking on tag name
                  }}
                  className="flex-shrink-0 inline-flex items-center justify-center gap-1 px-3 py-1 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm font-medium text-[#019dff] hover:bg-[#e6f7ff] hover:border-[#019dff] hover:text-[#0187e6] transition-all duration-200 whitespace-nowrap shadow-sm focus:outline-none"
                >
                  {tag}
                  <span
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveTag(tag)
                    }}
                    className="hover:opacity-60 transition-opacity cursor-pointer flex items-center justify-center"
                    role="button"
                    aria-label={`ลบ ${tag}`}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </span>
                </button>
              ))}
              
              {/* Input */}
              <input 
                ref={inputRef}
                type="text" 
                placeholder={selectedTags.length === 0 ? "ค้นหาทัวร์ญี่ปุ่น..." : ""}
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
                  // Delete last tag when pressing Backspace on empty input
                  if (e.key === 'Backspace' && value === '' && selectedTags.length > 0) {
                    e.preventDefault()
                    handleRemoveTag(selectedTags[selectedTags.length - 1])
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
              onClick={() => {
                // Trigger search or just close suggestions
                setIsFocused(false)
                inputRef.current?.blur()
              }}
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
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 py-3 z-50 max-h-80 overflow-y-auto">
          <div className="px-4 py-2 text-xs text-gray-500 font-medium">
            {value.length >= 2 ? 'คำแนะนำที่ตรงกัน' : 'คำค้นหายอดนิยม'}
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 px-3">
            {suggestions.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(keyword)}
                className="flex-shrink-0 inline-flex items-center justify-center px-3 py-1 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm font-medium text-gray-600 hover:bg-[#e6f7ff] hover:border-[#019dff] hover:text-[#0187e6] transition-all duration-200 whitespace-nowrap shadow-sm"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
