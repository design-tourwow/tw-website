'use client'

import { useState } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onFilterClick?: () => void
}

export default function SearchBar({ value, onChange, onFilterClick }: SearchBarProps) {
  const [isListening, setIsListening] = useState(false)

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.lang = 'th-TH'
      recognition.continuous = false
      recognition.interimResults = false

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        onChange(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } else {
      alert('เบราว์เซอร์ของคุณไม่รองรับการค้นหาด้วยเสียง')
    }
  }

  return (
    <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm px-4 py-2 transition-all duration-300">
      <div className="flex gap-3">
        <div className="flex-1 relative" data-search-container="true">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-6 h-6 z-10"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          
          <input 
            type="text" 
            placeholder="ค้นหาทัวร์ญี่ปุ่น..." 
            className="w-full pl-14 pr-24 text-lg border-2 border-gray-300 rounded-xl focus:border-[#019dff] focus:outline-none transition-colors h-[68px] flex items-center" 
            aria-label="ค้นหาทัวร์"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          
          <button 
            onClick={handleVoiceSearch}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
              isListening ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100 text-gray-600'
            }`}
            aria-label="ค้นหาด้วยเสียง"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`}
            >
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" x2="12" y1="19" y2="22"></line>
            </svg>
          </button>
        </div>
        
        <button 
          onClick={onFilterClick}
          className="text-[#019dff] hover:text-[#0187e6] transition-colors duration-200 text-sm font-medium border-2 border-gray-300 rounded-xl hover:border-[#019dff] bg-white relative flex items-center justify-center" 
          style={{ height: '68px', minWidth: '68px' }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-6 h-6"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </button>
      </div>
    </div>
  )
}
