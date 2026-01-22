'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, Search, Calendar, DollarSign, Clock, Plane, Star } from 'lucide-react'
import Image from 'next/image'

interface AdvancedFilterModalProps {
  isOpen: boolean
  onClose: () => void
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
  resultsCount: number
}

export default function AdvancedFilterModal({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onReset,
  activeCount,
  resultsCount
}: AdvancedFilterModalProps) {
  const [countrySearchQuery, setCountrySearchQuery] = useState('')
  const [airlineSearchQuery, setAirlineSearchQuery] = useState('')

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.width = '100%'
      document.documentElement.style.overflowX = 'hidden'
      document.body.style.overflowX = 'hidden'
    } else {
      const scrollY = document.body.style.top
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      document.documentElement.style.overflowX = ''
      document.body.style.overflowX = ''
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
      document.documentElement.style.overflowX = ''
      document.body.style.overflowX = ''
    }
  }, [isOpen])

  // Countries data
  const countries = [
    { name: 'ญี่ปุ่น', flagCode: 'jp', tours: 312 },
    { name: 'เกาหลี', flagCode: 'kr', tours: 245 },
    { name: 'ไต้หวัน', flagCode: 'tw', tours: 189 },
    { name: 'สิงคโปร์', flagCode: 'sg', tours: 156 },
    { name: 'เวียดนาม', flagCode: 'vn', tours: 134 },
    { name: 'ฮ่องกง', flagCode: 'hk', tours: 98 },
    { name: 'จีน', flagCode: 'cn', tours: 276 },
    { name: 'มาเลเซีย', flagCode: 'my', tours: 87 },
  ]

  // Holidays data
  const holidays = [
    { value: 'new-year', label: 'วันปีใหม่', icon: '🎉' },
    { value: 'songkran', label: 'วันสงกรานต์', icon: '💦' },
    { value: 'long-weekend', label: 'วันหยุดยาว', icon: '📅' },
    { value: 'summer', label: 'ช่วงปิดเทอม', icon: '☀️' },
  ]

  // Price ranges
  const priceRanges = [
    { value: '0-20000', label: 'ต่ำกว่า 20,000', icon: '💰' },
    { value: '20000-50000', label: '20,000 - 50,000', icon: '💵' },
    { value: '50000-100000', label: '50,000 - 100,000', icon: '💸' },
    { value: '100000-999999', label: 'มากกว่า 100,000', icon: '💎' },
  ]

  // Durations
  const durations = [
    { value: '1-3', label: '1-3 วัน', icon: '⚡' },
    { value: '4-6', label: '4-6 วัน', icon: '🌟' },
    { value: '7-10', label: '7-10 วัน', icon: '✨' },
    { value: '11-999', label: 'มากกว่า 10 วัน', icon: '🎯' },
  ]

  // Airlines
  const airlines = [
    { value: 'TG', label: 'Thai Airways', count: 8, logo: 'thai-airways.svg' },
    { value: 'SQ', label: 'Singapore Airlines', count: 6, logo: 'singapore-airlines.svg' },
    { value: 'KE', label: 'Korean Air', count: 5, logo: 'korean-air.svg' },
    { value: 'CX', label: 'Cathay Pacific', count: 4, logo: 'cathay-pacific.svg' },
    { value: 'JL', label: 'Japan Airlines', count: 2, logo: 'japan-airlines.svg' },
  ]

  // Months
  const months = [
    { name: 'กุมภาพันธ์', short: 'ก.พ.', value: '02', hasTours: true },
    { name: 'มีนาคม', short: 'มี.ค.', value: '03', hasTours: true },
    { name: 'เมษายน', short: 'เม.ย.', value: '04', hasTours: true },
    { name: 'พฤษภาคม', short: 'พ.ค.', value: '05', hasTours: true },
    { name: 'มิถุนายน', short: 'มิ.ย.', value: '06', hasTours: true },
    { name: 'กรกฎาคม', short: 'ก.ค.', value: '07', hasTours: true },
    { name: 'สิงหาคม', short: 'ส.ค.', value: '08', hasTours: false },
    { name: 'กันยายน', short: 'ก.ย.', value: '09', hasTours: true },
    { name: 'ตุลาคม', short: 'ต.ค.', value: '10', hasTours: true },
    { name: 'พฤศจิกายน', short: 'พ.ย.', value: '11', hasTours: true },
    { name: 'ธันวาคม', short: 'ธ.ค.', value: '12', hasTours: true },
  ]

  const handleCheckboxChange = (filterKey: string, value: string) => {
    const currentValues = filters[filterKey as keyof typeof filters] as string[]
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value]
    onFilterChange(filterKey, newValues)
  }

  const filteredCountries = countries.filter(country =>
    countrySearchQuery.length < 2 || country.name.toLowerCase().includes(countrySearchQuery.toLowerCase())
  )

  const filteredAirlines = airlines.filter(airline =>
    airlineSearchQuery.length < 2 || airline.label.toLowerCase().includes(airlineSearchQuery.toLowerCase())
  )

  if (!isOpen) return null

  return typeof window !== 'undefined' ? createPortal(
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[99998] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0,
          width: '100vw',
          height: '100vh',
        }}
      />
      
      {/* Modal Content */}
      <div 
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0,
          width: '100vw',
          height: '100vh',
        }}
      >
        <div className="w-full max-w-6xl h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#e6f7ff] to-white">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">ค้นหาทัวร์ขั้นสูง</h2>
              <p className="text-sm text-gray-600 mt-1">เลือกตัวกรองเพื่อค้นหาทัวร์ที่ใช่สำหรับคุณ</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Left Column */}
              <div className="space-y-6">
                
                {/* Countries */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#e6f7ff]0 to-[#019dff] flex items-center justify-center">
                      <span className="text-xl">🌏</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">ประเทศปลายทาง</h3>
                      <p className="text-xs text-gray-500">เลือกประเทศที่ต้องการเดินทาง</p>
                    </div>
                  </div>

                  {/* Country Search */}
                  <div className="relative mb-4">
                    <input
                      type="text"
                      placeholder="ค้นหาประเทศ..."
                      value={countrySearchQuery}
                      onChange={(e) => setCountrySearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#e6f7ff]0 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>

                  {/* Countries Grid */}
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {filteredCountries.map((country) => (
                      <button
                        key={country.flagCode}
                        className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-[#e6f7ff]0 hover:bg-[#e6f7ff] transition-all text-left"
                      >
                        <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                          <Image 
                            src={`/icons/destinations/flag-icons-main/flags/1x1/${country.flagCode}.svg`}
                            alt={country.name}
                            width={24}
                            height={24}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">{country.name}</div>
                          <div className="text-xs text-gray-500">{country.tours} ทัวร์</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Holidays */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#e6f7ff]0 to-[#019dff] flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">ตามวันหยุด</h3>
                      <p className="text-xs text-gray-500">เลือกช่วงวันหยุดที่ต้องการ</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {holidays.map((holiday) => (
                      <label
                        key={holiday.value}
                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-[#e6f7ff]0 hover:bg-[#e6f7ff] cursor-pointer transition-all group"
                      >
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
                        <span className="text-sm font-medium text-gray-900">{holiday.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Ranges */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#e6f7ff]0 to-[#019dff] flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">ช่วงราคา</h3>
                      <p className="text-xs text-gray-500">เลือกงบประมาณที่เหมาะสม</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label
                        key={range.value}
                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-[#e6f7ff]0 hover:bg-[#e6f7ff] cursor-pointer transition-all group"
                      >
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
                        <span className="text-sm font-medium text-gray-900">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column */}
              <div className="space-y-6">

                {/* Durations */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#e6f7ff]0 to-[#019dff] flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">ระยะเวลา</h3>
                      <p className="text-xs text-gray-500">เลือกจำนวนวันที่ต้องการ</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {durations.map((duration) => (
                      <label
                        key={duration.value}
                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-[#e6f7ff]0 hover:bg-[#e6f7ff] cursor-pointer transition-all group"
                      >
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
                        <span className="text-sm font-medium text-gray-900">{duration.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Airlines */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#e6f7ff]0 to-[#019dff] flex items-center justify-center">
                      <Plane className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">สายการบิน</h3>
                      <p className="text-xs text-gray-500">เลือกสายการบินที่ต้องการ</p>
                    </div>
                  </div>

                  {/* Airline Search */}
                  <div className="relative mb-4">
                    <input
                      type="text"
                      placeholder="ค้นหาสายการบิน..."
                      value={airlineSearchQuery}
                      onChange={(e) => setAirlineSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#e6f7ff]0 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>

                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {filteredAirlines.map((airline) => (
                      <label
                        key={airline.value}
                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-[#e6f7ff]0 hover:bg-[#e6f7ff] cursor-pointer transition-all group"
                      >
                        <div className="relative flex-shrink-0">
                          <input
                            type="checkbox"
                            checked={filters.airlines?.includes(airline.value) || false}
                            onChange={() => handleCheckboxChange('airlines', airline.value)}
                            className="sr-only peer"
                          />
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-[#019dff] peer-checked:bg-[#019dff] transition-all duration-200 flex items-center justify-center">
                            {filters.airlines?.includes(airline.value) && (
                              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 flex-1">{airline.label}</span>
                        <span className="text-xs text-gray-500">({airline.count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Hotel Stars */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#e6f7ff]0 to-[#019dff] flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">ระดับโรงแรม</h3>
                      <p className="text-xs text-gray-500">เลือกจำนวนดาวโรงแรม</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[3, 4, 5].map((stars) => (
                      <label
                        key={stars}
                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-[#e6f7ff]0 hover:bg-[#e6f7ff] cursor-pointer transition-all group"
                      >
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
                        <span className="text-sm font-medium text-gray-900">{stars} ดาว</span>
                        <div className="flex">
                          {[...Array(stars)].map((_, i) => (
                            <span key={i} className="text-yellow-400">★</span>
                          ))}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {activeCount > 0 && (
                  <button
                    onClick={onReset}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
                  >
                    ล้างตัวกรอง ({activeCount})
                  </button>
                )}
              </div>
              <button
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-[#019dff] to-[#0187e6] hover:from-[#0187e6] hover:to-[#0171cc] text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                แสดงผล {resultsCount} ทัวร์
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  ) : null
}
