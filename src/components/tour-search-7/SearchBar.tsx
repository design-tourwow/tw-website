'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  // Animated Placeholder States
  const [placeholder, setPlaceholder] = useState('')
  const [placeholderIndex, setPlaceholderIndex] = useState(0)

  // Placeholder Data
  const placeholders = [
    "ทัวร์ญี่ปุ่น ใบไม้เปลี่ยนสี",
    "ทัวร์เกาหลี ซากุระ",
    "ทัวร์ยุโรป ฤดูหนาว",
    "ทัวร์ไต้หวัน อาลีซาน",
    "ทัวร์สิงคโปร์ ครอบครัว"
  ]

  // Animated Placeholder Effect
  useEffect(() => {
    let timeout: NodeJS.Timeout
    const currentPlaceholder = placeholders[placeholderIndex]
    
    if (placeholder.length < currentPlaceholder.length) {
      // Typing phase
      timeout = setTimeout(() => {
        setPlaceholder(currentPlaceholder.slice(0, placeholder.length + 1))
      }, 100)
    } else {
      // Wait 2 seconds before starting to delete
      timeout = setTimeout(() => {
        setPlaceholder('')
        setPlaceholderIndex((placeholderIndex + 1) % placeholders.length)
      }, 2000)
    }
    
    return () => clearTimeout(timeout)
  }, [placeholder, placeholderIndex, placeholders])

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-white border-2 border-gray-200 rounded-xl sm:rounded-2xl text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all text-sm sm:text-base shadow-sm"
        />
        <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        </div>
      </div>
    </div>
  )
}
