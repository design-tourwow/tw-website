import React from 'react'
import { Filter, X } from 'lucide-react'

interface FilterSidebarProps {
  selectedRegion: string
  setSelectedRegion: (value: string) => void
  selectedPriceRange: string
  setSelectedPriceRange: (value: string) => void
  selectedDuration: string
  setSelectedDuration: (value: string) => void
  selectedAirline: string
  setSelectedAirline: (value: string) => void
  selectedRating: number
  setSelectedRating: (value: number) => void
  showFilters: boolean
  setShowFilters: (value: boolean) => void
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedRegion,
  setSelectedRegion,
  selectedPriceRange,
  setSelectedPriceRange,
  selectedDuration,
  setSelectedDuration,
  selectedAirline,
  setSelectedAirline,
  selectedRating,
  setSelectedRating,
  showFilters,
  setShowFilters
}) => {
  const regions = [
    { value: 'all', label: 'ทุกภูมิภาค' },
    { value: 'east-asia', label: 'เอเชียตะวันออก' },
    { value: 'southeast-asia', label: 'เอเชียตะวันออกเฉียงใต้' },
    { value: 'europe', label: 'ยุโรป' },
    { value: 'oceania', label: 'โอเชียเนีย' },
    { value: 'middle-east', label: 'ตะวันออกกลาง' }
  ]

  const priceRanges = [
    { value: 'all', label: 'ทุกช่วงราคา' },
    { value: '0-20000', label: 'ต่ำกว่า 20,000 บาท' },
    { value: '20000-40000', label: '20,000 - 40,000 บาท' },
    { value: '40000-60000', label: '40,000 - 60,000 บาท' },
    { value: '60000-80000', label: '60,000 - 80,000 บาท' },
    { value: '80000+', label: 'มากกว่า 80,000 บาท' }
  ]

  const durations = [
    { value: 'all', label: 'ทุกระยะเวลา' },
    { value: '3-5', label: '3-5 วัน' },
    { value: '6-8', label: '6-8 วัน' },
    { value: '9+', label: '9 วันขึ้นไป' }
  ]

  const airlines = [
    { value: 'all', label: 'ทุกสายการบิน' },
    { value: 'thai-airways', label: 'Thai Airways' },
    { value: 'singapore-airlines', label: 'Singapore Airlines' },
    { value: 'japan-airlines', label: 'Japan Airlines' },
    { value: 'cathay-pacific', label: 'Cathay Pacific' }
  ]

  return (
    <>
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg"
      >
        <Filter className="w-6 h-6" />
      </button>

      {/* Filter Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen lg:h-auto
        w-80 lg:w-full bg-white shadow-lg lg:shadow-none
        transform transition-transform duration-300 z-40
        ${showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              ตัวกรองการค้นหา
            </h3>
            <button
              onClick={() => setShowFilters(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Region Filter */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">ภูมิภาค</h4>
            <div className="space-y-2">
              {regions.map((region) => (
                <label key={region.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="region"
                    value={region.value}
                    checked={selectedRegion === region.value}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">{region.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">ช่วงราคา</h4>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <label key={range.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    value={range.value}
                    checked={selectedPriceRange === range.value}
                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Duration Filter */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">ระยะเวลา</h4>
            <div className="space-y-2">
              {durations.map((duration) => (
                <label key={duration.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="duration"
                    value={duration.value}
                    checked={selectedDuration === duration.value}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">{duration.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Airline Filter */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">สายการบิน</h4>
            <div className="space-y-2">
              {airlines.map((airline) => (
                <label key={airline.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="airline"
                    value={airline.value}
                    checked={selectedAirline === airline.value}
                    onChange={(e) => setSelectedAirline(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">{airline.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">คะแนนรีวิว</h4>
            <div className="space-y-2">
              {[0, 4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={selectedRating === rating}
                    onChange={(e) => setSelectedRating(Number(e.target.value))}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700 flex items-center">
                    {rating === 0 ? 'ทั้งหมด' : (
                      <>
                        {rating}+ <span className="text-yellow-400 ml-1">★</span>
                      </>
                    )}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              setSelectedRegion('all')
              setSelectedPriceRange('all')
              setSelectedDuration('all')
              setSelectedAirline('all')
              setSelectedRating(0)
            }}
            className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            ล้างตัวกรอง
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {showFilters && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setShowFilters(false)}
        />
      )}
    </>
  )
}
