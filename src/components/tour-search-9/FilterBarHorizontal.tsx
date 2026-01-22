'use client'

import { useState, useRef, useEffect } from 'react'

interface FilterBarHorizontalProps {
  filters: {
    region: string
    priceRange: string
    duration: string
    airline: string
    rating: number
    searchQuery: string
    holidays: string[]
    priceRanges: string[]
    durations: string[]
    airlines: string[]
  }
  onFilterChange: (key: string, value: any) => void
  onReset: () => void
  activeCount: number
}

export default function FilterBarHorizontal({ filters, onFilterChange, onReset, activeCount }: FilterBarHorizontalProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const holidays = [
    { value: 'new-year', label: 'วันปีใหม่' },
    { value: 'songkran', label: 'วันสงกรานต์' },
    { value: 'long-weekend', label: 'วันหยุดยาว' },
    { value: 'summer', label: 'ช่วงปิดเทอม' },
  ]

  const priceRanges = [
    { value: '0-20000', label: 'ต่ำกว่า 20,000 บาท' },
    { value: '20000-50000', label: '20,000 - 50,000 บาท' },
    { value: '50000-100000', label: '50,000 - 100,000 บาท' },
    { value: '100000-999999', label: 'มากกว่า 100,000 บาท' },
  ]

  const durations = [
    { value: '1-3', label: '1-3 วัน' },
    { value: '4-6', label: '4-6 วัน' },
    { value: '7-10', label: '7-10 วัน' },
    { value: '11-999', label: 'มากกว่า 10 วัน' },
  ]

  const handleCheckboxChange = (filterKey: string, value: string) => {
    const currentValues = filters[filterKey as keyof typeof filters] as string[]
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value]
    onFilterChange(filterKey, newValues)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getActiveCount = (filterKey: string) => {
    if (filterKey === 'rating') {
      return filters.rating !== 0 ? 1 : 0
    }
    return (filters[filterKey as keyof typeof filters] as string[])?.length || 0
  }

  const DropdownButton = ({ 
    label, 
    icon, 
    filterKey, 
    children 
  }: { 
    label: string
    icon: React.ReactNode
    filterKey: string
    children: React.ReactNode 
  }) => {
    const isOpen = openDropdown === filterKey
    const activeCount = getActiveCount(filterKey)

    return (
      <div className="relative">
        <button
          onClick={() => setOpenDropdown(isOpen ? null : filterKey)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
            activeCount > 0
              ? 'bg-[#019dff] text-white shadow-md hover:bg-[#0187e6]'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow-sm'
          }`}
        >
          {icon}
          <span>{label}</span>
          {activeCount > 0 && (
            <span className="ml-1 bg-white/20 text-white text-xs font-semibold px-2 py-0.5 rounded-full min-w-[20px] text-center">
              {activeCount}
            </span>
          )}
          <svg 
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
            <div className="p-3 max-h-80 overflow-y-auto">
              {children}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div ref={dropdownRef} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Left: Dropdowns */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Holiday Dropdown */}
          <DropdownButton
            label="วันหยุด"
            filterKey="holidays"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          >
            <div className="space-y-2">
              {holidays.map((holiday) => (
                <label key={holiday.value} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group">
                  <div className="relative flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={filters.holidays?.includes(holiday.value) || false}
                      onChange={() => handleCheckboxChange('holidays', holiday.value)}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-[#019dff] peer-checked:bg-[#019dff] transition-all duration-200 flex items-center justify-center">
                      {filters.holidays?.includes(holiday.value) && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-700">{holiday.label}</span>
                </label>
              ))}
            </div>
          </DropdownButton>

          {/* Price Range Dropdown */}
          <DropdownButton
            label="ช่วงราคา"
            filterKey="priceRanges"
            icon={<span className="text-base font-bold">฿</span>}
          >
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <label key={range.value} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group">
                  <div className="relative flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={filters.priceRanges?.includes(range.value) || false}
                      onChange={() => handleCheckboxChange('priceRanges', range.value)}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-[#019dff] peer-checked:bg-[#019dff] transition-all duration-200 flex items-center justify-center">
                      {filters.priceRanges?.includes(range.value) && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-700">{range.label}</span>
                </label>
              ))}
            </div>
          </DropdownButton>

          {/* Duration Dropdown */}
          <DropdownButton
            label="ระยะเวลา"
            filterKey="durations"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          >
            <div className="space-y-2">
              {durations.map((duration) => (
                <label key={duration.value} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group">
                  <div className="relative flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={filters.durations?.includes(duration.value) || false}
                      onChange={() => handleCheckboxChange('durations', duration.value)}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-[#019dff] peer-checked:bg-[#019dff] transition-all duration-200 flex items-center justify-center">
                      {filters.durations?.includes(duration.value) && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-700">{duration.label}</span>
                </label>
              ))}
            </div>
          </DropdownButton>

          {/* Hotel Stars Dropdown */}
          <DropdownButton
            label="ดาวโรงแรม"
            filterKey="rating"
            icon={
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            }
          >
            <div className="space-y-2">
              {[3, 4, 5].map((stars) => (
                <label key={stars} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group">
                  <div className="relative flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={filters.rating === stars}
                      onChange={() => onFilterChange('rating', filters.rating === stars ? 0 : stars)}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-[#019dff] peer-checked:bg-[#019dff] transition-all duration-200 flex items-center justify-center">
                      {filters.rating === stars && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-700 flex items-center gap-1.5">
                    <span>{stars} ดาว</span>
                    <div className="flex">
                      {[...Array(stars)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </span>
                </label>
              ))}
            </div>
          </DropdownButton>
        </div>

        {/* Right: Clear Button */}
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium border border-red-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>ล้างตัวกรอง ({activeCount})</span>
          </button>
        )}
      </div>
    </div>
  )
}
