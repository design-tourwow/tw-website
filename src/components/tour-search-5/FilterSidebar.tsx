'use client'

import { useState } from 'react'

interface FilterSidebarProps {
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
  filterCounts: {
    holidays: Record<string, number>
    priceRanges: Record<string, number>
    durations: Record<string, number>
    airlines: Record<string, number>
    ratings: Record<number, number>
  }
}

export default function FilterSidebar({ filters, onFilterChange, onReset, activeCount, filterCounts }: FilterSidebarProps) {
  const [airlineSearch, setAirlineSearch] = useState('')
  const [showAllAirlines, setShowAllAirlines] = useState(false)
  const [showAllHolidays, setShowAllHolidays] = useState(false)

  const holidays = [
    { value: 'new-year', label: 'วันปีใหม่' },
    { value: 'songkran', label: 'วันสงกรานต์' },
    { value: 'long-weekend', label: 'วันหยุดยาว' },
    { value: 'summer', label: 'ช่วงปิดเทอม' },
    { value: 'chinese-new-year', label: 'ตรุษจีน' },
    { value: 'loy-krathong', label: 'ลอยกระทง' },
  ]

  const priceRanges = [
    { value: '0-20000', label: 'ต่ำกว่า 20,000' },
    { value: '20000-50000', label: '20,000 - 50,000' },
    { value: '50000-100000', label: '50,000 - 100,000' },
    { value: '100000-999999', label: 'มากกว่า 100,000' },
  ]

  const durations = [
    { value: '1-3', label: '1-3 วัน' },
    { value: '4-6', label: '4-6 วัน' },
    { value: '7-10', label: '7-10 วัน' },
    { value: '11-999', label: 'มากกว่า 10 วัน' },
  ]

  const airlines = [
    { value: 'TG', label: 'Thai Airways', count: 8, logo: 'thai-airways.svg' },
    { value: 'SQ', label: 'Singapore Airlines', count: 6, logo: 'singapore-airlines.svg' },
    { value: 'KE', label: 'Korean Air', count: 5, logo: 'korean-air.svg' },
    { value: 'CX', label: 'Cathay Pacific', count: 4, logo: 'cathay-pacific.svg' },
    { value: 'GA', label: 'Garuda Indonesia', count: 3, logo: 'garuda-indonesia.svg' },
    { value: 'MH', label: 'Malaysia Airlines', count: 2, logo: 'malaysia-airlines.svg' },
    { value: 'JL', label: 'Japan Airlines', count: 2, logo: 'japan-airlines.svg' },
  ]

  const filteredAirlines = airlines.filter(airline =>
    airline.label.toLowerCase().includes(airlineSearch.toLowerCase())
  )

  const displayedAirlines = showAllAirlines ? filteredAirlines : filteredAirlines.slice(0, 5)
  const displayedHolidays = showAllHolidays ? holidays : holidays.slice(0, 5)

  const handleCheckboxChange = (filterKey: string, value: string) => {
    const currentValues = filters[filterKey as keyof typeof filters] as string[]
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value]
    onFilterChange(filterKey, newValues)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="relative mb-6">
        <h2 className="text-lg font-semibold text-gray-900">ตัวกรอง</h2>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="absolute top-0 right-0 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            ล้างทั้งหมด ({activeCount})
          </button>
        )}
      </div>

      <div className="space-y-7">
        {/* Holiday Filter */}
        <div className="pb-6 border-b border-gray-100">
          <label className="flex items-center gap-2.5 text-sm font-semibold text-gray-900 mb-4">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span>ตามวันหยุด</span>
          </label>
          <div className={`space-y-2 pl-1 ${!showAllHolidays ? 'max-h-48 overflow-y-auto hide-scrollbar' : ''}`}>
            {(() => {
              const holidaysToShow = showAllHolidays ? holidays : holidays.slice(0, 5)
              const availableHolidays = holidaysToShow.filter((holiday) => {
                const count = filterCounts.holidays[holiday.value] || 0
                return count > 0
              })
              
              if (availableHolidays.length === 0) {
                return (
                  <div className="text-sm text-gray-500 italic py-3 px-2 bg-gray-50 rounded-lg border border-gray-200">
                    ไม่มีตัวเลือกในหมวดนี้
                  </div>
                )
              }
              
              return availableHolidays.map((holiday) => {
                const count = filterCounts.holidays[holiday.value] || 0
                return (
                  <label key={holiday.value} className="flex items-center justify-between cursor-pointer group px-2 py-2 -mx-2 rounded-lg hover:bg-blue-50 transition-all duration-200">
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="relative flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={filters.holidays?.includes(holiday.value) || false}
                          onChange={() => handleCheckboxChange('holidays', holiday.value)}
                          className="peer sr-only"
                        />
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-all duration-200 flex items-center justify-center group-hover:border-blue-400 group-hover:shadow-sm">
                          {filters.holidays?.includes(holiday.value) && (
                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 font-medium transition-colors truncate">
                        {holiday.label}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors ml-2 flex-shrink-0">({count})</span>
                  </label>
                )
              })
            })()}
          </div>

          {/* Show More/Less Button for Holidays */}
          {holidays.filter(h => (filterCounts.holidays[h.value] || 0) > 0).length > 5 && (
            <button
              onClick={() => setShowAllHolidays(!showAllHolidays)}
              className="mt-4 ml-1 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1.5 transition-colors"
            >
              <span>{showAllHolidays ? 'แสดงวันหยุดน้อยลง' : 'แสดงวันหยุดทั้งหมด'}</span>
              <svg 
                className={`w-4 h-4 transform transition-transform duration-200 ${showAllHolidays ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="pb-6 border-b border-gray-100">
          <label className="flex items-center gap-2.5 text-sm font-semibold text-gray-900 mb-4">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
              <span className="text-lg sm:text-xl font-bold text-white">฿</span>
            </div>
            <span>ช่วงราคา (บาท)</span>
          </label>
          <div className="space-y-2 pl-1">
            {(() => {
              const availableRanges = priceRanges.filter((range) => {
                const count = filterCounts.priceRanges[range.value] || 0
                return count > 0
              })
              
              if (availableRanges.length === 0) {
                return (
                  <div className="text-sm text-gray-500 italic py-3 px-2 bg-gray-50 rounded-lg border border-gray-200">
                    ไม่มีตัวเลือกในหมวดนี้
                  </div>
                )
              }
              
              return availableRanges.map((range) => {
                const count = filterCounts.priceRanges[range.value] || 0
                return (
                  <label key={range.value} className="flex items-center justify-between cursor-pointer group px-2 py-2 -mx-2 rounded-lg hover:bg-blue-50 transition-all duration-200">
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="relative flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={filters.priceRanges?.includes(range.value) || false}
                          onChange={() => handleCheckboxChange('priceRanges', range.value)}
                          className="peer sr-only"
                        />
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-all duration-200 flex items-center justify-center group-hover:border-blue-400 group-hover:shadow-sm">
                          {filters.priceRanges?.includes(range.value) && (
                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 font-medium transition-colors truncate">
                        {range.label}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors ml-2 flex-shrink-0">({count})</span>
                  </label>
                )
              })
            })()}
          </div>
        </div>

        {/* Duration Filter */}
        <div className="pb-6 border-b border-gray-100">
          <label className="flex items-center gap-2.5 text-sm font-semibold text-gray-900 mb-4">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span>ระยะเวลา</span>
          </label>
          <div className="space-y-2 pl-1">
            {(() => {
              const availableDurations = durations.filter((duration) => {
                const count = filterCounts.durations[duration.value] || 0
                return count > 0
              })
              
              if (availableDurations.length === 0) {
                return (
                  <div className="text-sm text-gray-500 italic py-3 px-2 bg-gray-50 rounded-lg border border-gray-200">
                    ไม่มีตัวเลือกในหมวดนี้
                  </div>
                )
              }
              
              return availableDurations.map((duration) => {
                const count = filterCounts.durations[duration.value] || 0
                return (
                  <label key={duration.value} className="flex items-center justify-between cursor-pointer group px-2 py-2 -mx-2 rounded-lg hover:bg-blue-50 transition-all duration-200">
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="relative flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={filters.durations?.includes(duration.value) || false}
                          onChange={() => handleCheckboxChange('durations', duration.value)}
                          className="peer sr-only"
                        />
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-all duration-200 flex items-center justify-center group-hover:border-blue-400 group-hover:shadow-sm">
                          {filters.durations?.includes(duration.value) && (
                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 font-medium transition-colors truncate">
                        {duration.label}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors ml-2 flex-shrink-0">({count})</span>
                  </label>
                )
              })
            })()}
          </div>
        </div>

        {/* Airline Filter */}
        <div className="pb-6 border-b border-gray-100">
          <label className="flex items-center gap-2.5 text-sm font-semibold text-gray-900 mb-4">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white transform rotate-45" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
            </div>
            <span>สายการบิน</span>
          </label>
          
          {/* Search Box */}
          <div className="relative mb-4">
            <input
              type="text"
              value={airlineSearch}
              onChange={(e) => setAirlineSearch(e.target.value)}
              placeholder="ใส่ชื่อสายการบิน..."
              className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Airlines List */}
          <div className={`space-y-2 pl-1 ${!showAllAirlines ? 'max-h-48 overflow-y-auto hide-scrollbar' : ''}`}>
            {(() => {
              const airlinesToShow = showAllAirlines ? filteredAirlines : filteredAirlines.slice(0, 5)
              const availableAirlines = airlinesToShow.filter((airline) => {
                const count = filterCounts.airlines[airline.value] || 0
                return count > 0
              })
              
              if (availableAirlines.length === 0) {
                return (
                  <div className="text-sm text-gray-500 italic py-3 px-2 bg-gray-50 rounded-lg border border-gray-200">
                    ไม่มีตัวเลือกในหมวดนี้
                  </div>
                )
              }
              
              return availableAirlines.map((airline) => {
                const count = filterCounts.airlines[airline.value] || 0
                return (
                  <label key={airline.value} className="flex items-center justify-between cursor-pointer group px-2 py-2 -mx-2 rounded-lg hover:bg-blue-50 transition-all duration-200">
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="relative flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={filters.airlines?.includes(airline.value) || false}
                          onChange={() => handleCheckboxChange('airlines', airline.value)}
                          className="peer sr-only"
                        />
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-all duration-200 flex items-center justify-center group-hover:border-blue-400 group-hover:shadow-sm">
                          {filters.airlines?.includes(airline.value) && (
                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 font-medium transition-colors truncate">
                        {airline.label}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors ml-2 flex-shrink-0">({count})</span>
                  </label>
                )
              })
            })()}
          </div>

          {/* Show More/Less Button */}
          {filteredAirlines.filter(a => (filterCounts.airlines[a.value] || 0) > 0).length > 5 && (
            <button
              onClick={() => setShowAllAirlines(!showAllAirlines)}
              className="mt-4 ml-1 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1.5 transition-colors"
            >
              <span>{showAllAirlines ? 'แสดงสายการบินน้อยลง' : 'แสดงสายการบินทั้งหมด'}</span>
              <svg 
                className={`w-4 h-4 transform transition-transform duration-200 ${showAllAirlines ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>

        {/* Hotel Stars Filter */}
        <div>
          <label className="flex items-center gap-2.5 text-sm font-semibold text-gray-900 mb-4">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span>จำนวนดาวโรงแรม</span>
          </label>
          <div className="space-y-2 pl-1">
            {(() => {
              const availableRatings = [3, 4, 5].filter((stars) => {
                const count = filterCounts.ratings[stars] || 0
                return count > 0
              })
              
              if (availableRatings.length === 0) {
                return (
                  <div className="text-sm text-gray-500 italic py-3 px-2 bg-gray-50 rounded-lg border border-gray-200">
                    ไม่มีตัวเลือกในหมวดนี้
                  </div>
                )
              }
              
              return availableRatings.map((stars) => {
                const count = filterCounts.ratings[stars] || 0
                return (
                  <label key={stars} className="flex items-center justify-between cursor-pointer group px-2 py-2 -mx-2 rounded-lg hover:bg-blue-50 transition-all duration-200">
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="relative flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={filters.rating === stars}
                          onChange={() => onFilterChange('rating', filters.rating === stars ? 0 : stars)}
                          className="peer sr-only"
                        />
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-all duration-200 flex items-center justify-center group-hover:border-blue-400 group-hover:shadow-sm">
                          {filters.rating === stars && (
                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="ml-3 flex items-center gap-1.5">
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 font-medium transition-colors">{stars} ดาว</span>
                        <div className="flex">
                          {[...Array(stars)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors ml-2 flex-shrink-0">({count})</span>
                  </label>
                )
              })
            })()}
          </div>
        </div>
      </div>
    </div>
  )
}
