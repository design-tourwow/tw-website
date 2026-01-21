import React from 'react'
import { X } from 'lucide-react'

interface ActiveFiltersProps {
  filters: {
    region?: string
    priceRange?: string
    duration?: string
    airline?: string
    rating?: number
    searchQuery?: string
  }
  onRemoveFilter: (filterKey: string) => void
  onClearAll: () => void
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  onRemoveFilter,
  onClearAll
}) => {
  const getFilterLabel = (key: string, value: any): string => {
    switch (key) {
      case 'region':
        const regionLabels: Record<string, string> = {
          'east-asia': 'เอเชียตะวันออก',
          'southeast-asia': 'เอเชียตะวันออกเฉียงใต้',
          'europe': 'ยุโรป',
          'oceania': 'โอเชียเนีย',
          'middle-east': 'ตะวันออกกลาง'
        }
        return regionLabels[value] || value
      case 'priceRange':
        if (value.includes('+')) {
          return `มากกว่า ${parseInt(value).toLocaleString()} บาท`
        }
        const [min, max] = value.split('-')
        return `${parseInt(min).toLocaleString()} - ${parseInt(max).toLocaleString()} บาท`
      case 'duration':
        if (value.includes('+')) {
          return `${value.replace('+', '')} วันขึ้นไป`
        }
        const [minDay, maxDay] = value.split('-')
        return `${minDay}-${maxDay} วัน`
      case 'airline':
        return value
      case 'rating':
        return `${value}+ ดาว`
      case 'searchQuery':
        return `"${value}"`
      default:
        return value
    }
  }

  const activeFilters = Object.entries(filters).filter(
    ([key, value]) => value && value !== 'all' && value !== 0 && value !== ''
  )

  if (activeFilters.length === 0) return null

  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-sm text-gray-600 font-medium">ตัวกรองที่เลือก:</span>
          
          {activeFilters.map(([key, value]) => (
            <button
              key={key}
              onClick={() => onRemoveFilter(key)}
              className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors"
            >
              <span>{getFilterLabel(key, value)}</span>
              <X className="w-3 h-3" />
            </button>
          ))}

          {activeFilters.length > 1 && (
            <button
              onClick={onClearAll}
              className="text-sm text-red-600 hover:text-red-700 font-medium underline ml-2"
            >
              ล้างทั้งหมด
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
