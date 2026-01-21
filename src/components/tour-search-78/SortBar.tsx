import React from 'react'
import { SlidersHorizontal, Grid, List } from 'lucide-react'

interface SortBarProps {
  totalResults: number
  sortBy: string
  setSortBy: (value: string) => void
  viewMode: 'grid' | 'list'
  setViewMode: (value: 'grid' | 'list') => void
}

export const SortBar: React.FC<SortBarProps> = ({
  totalResults,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode
}) => {
  const sortOptions = [
    { value: 'popular', label: 'ความนิยม' },
    { value: 'price-asc', label: 'ราคา: ต่ำ - สูง' },
    { value: 'price-desc', label: 'ราคา: สูง - ต่ำ' },
    { value: 'rating', label: 'คะแนนรีวิว' }
  ]

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Results Count */}
          <div className="text-gray-700">
            <span className="font-semibold">{totalResults}</span> ทัวร์ที่พบ
          </div>

          {/* Sort & View Controls */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden md:flex items-center gap-1 border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title="มุมมองตาราง"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title="มุมมองรายการ"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
