# Tour Search 50 - 2 Functions Documentation

## Overview
เอกสารนี้รวบรวม 2 Functions หลักจากหน้า `/tour-search-50` ที่ใช้สำหรับ:
1. **Animated Placeholder Search Bar** - แถบค้นหาที่มี placeholder แบบพิมพ์ทีละตัวอักษร
2. **Advanced Search Modal** - Modal ค้นหาขั้นสูงแบบเต็มหน้าจอสำหรับมือถือ

---

## Function 1: Animated Placeholder Search Bar

### Description
Search bar ที่มี placeholder animation แบบพิมพ์ทีละตัวอักษร (typing effect) โดยจะหมุนเวียนแสดงข้อความต่างๆ เช่น "ทัวร์ญี่ปุ่น ใบไม้เปลี่ยนสี", "ทัวร์เกาหลี ซากุระ" เป็นต้น

### States Required
```typescript
const [searchQuery, setSearchQuery] = useState('')
const [placeholder, setPlaceholder] = useState('')
const [placeholderIndex, setPlaceholderIndex] = useState(0)
```

### Placeholder Data
```typescript
const placeholders = [
  "ทัวร์ญี่ปุ่น ใบไม้เปลี่ยนสี",
  "ทัวร์เกาหลี ซากุระ",
  "ทัวร์ยุโรป ฤดูหนาว",
  "ทัวร์ไต้หวัน อาลีซาน",
  "ทัวร์สิงคโปร์ ครอบครัว"
]
```

### Animation Logic (useEffect)
```typescript
useEffect(() => {
  let timeout: NodeJS.Timeout
  const currentPlaceholder = placeholders[placeholderIndex]
  
  if (placeholder.length < currentPlaceholder.length) {
    // Typing phase
    timeout = setTimeout(() => {
      setPlaceholder(currentPlaceholder.slice(0, placeholder.length + 1))
    }, 100)
  } else {
    // Wait before deleting
    timeout = setTimeout(() => {
      if (placeholder.length > 0) {
        // Deleting phase
        setPlaceholder(placeholder.slice(0, -1))
      } else {
        // Move to next placeholder
        setPlaceholderIndex((placeholderIndex + 1) % placeholders.length)
      }
    }, placeholder.length > 0 ? 50 : 2000)
  }
  
  return () => clearTimeout(timeout)
}, [placeholder, placeholderIndex])
```

### JSX Component
```tsx
{/* Search Bar with Animated Placeholder */}
<div className="relative max-w-2xl mx-auto">
  <div className="relative">
    <input
      type="text"
      placeholder={placeholder}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full pl-12 pr-32 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all text-base shadow-sm"
    />
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <Search className="w-5 h-5 text-gray-400" />
    </div>
    <button
      onClick={() => setShowAdvancedModal(true)}
      className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors text-sm"
    >
      <Filter className="w-4 h-4" />
      <span className="hidden sm:inline">ค้นหาขั้นสูง</span>
    </button>
  </div>
</div>
```

### Key Features
- ✅ Typing animation ทีละตัวอักษร (100ms per character)
- ✅ Deleting animation (50ms per character)
- ✅ รอ 2 วินาทีก่อนเปลี่ยนข้อความใหม่
- ✅ วนลูปแสดง placeholder ทั้งหมด
- ✅ ปุ่มค้นหาขั้นสูงอยู่ด้านขวาของ search bar

---

## Function 2: Advanced Search Modal

### Description
Modal แบบเต็มหน้าจอสำหรับมือถือ (lg:hidden) ที่มีตัวกรองครบครัน รวมถึง:
- 🌍 เลือกประเทศ (พร้อมค้นหา)
- 📅 เลือกเดือนเดินทาง
- 👥 จำนวนผู้เดินทาง
- ⭐ คะแนนรีวิว
- 🏷️ ประเภททัวร์
- 💰 งบประมาณ
- ⏰ ระยะเวลา

### States Required
```typescript
const [showAdvancedModal, setShowAdvancedModal] = useState(false)
const [countrySearchQuery, setCountrySearchQuery] = useState('')
const [selectedCountry, setSelectedCountry] = useState('')
const [selectedMonths, setSelectedMonths] = useState<string[]>([])
const [selectedPeople, setSelectedPeople] = useState('')
const [selectedRating, setSelectedRating] = useState('')
const [selectedTourType, setSelectedTourType] = useState('')
const [selectedBudget, setSelectedBudget] = useState('')
const [selectedDuration, setSelectedDuration] = useState('')
```

### Country Data Structure
```typescript
const allCountries = [
  { name: 'ญี่ปุ่น', flagCode: 'jp' },
  { name: 'เกาหลี', flagCode: 'kr' },
  { name: 'ไต้หวัน', flagCode: 'tw' },
  { name: 'สิงคโปร์', flagCode: 'sg' },
  { name: 'เวียดนาม', flagCode: 'vn' },
  // ... more countries
]
```

### Clear Filters Function
```typescript
const clearFilters = () => {
  setSelectedCountry('')
  setSelectedMonths([])
  setSelectedPeople('')
  setSelectedRating('')
  setSelectedTourType('')
  setSelectedBudget('')
  setSelectedDuration('')
  setCountrySearchQuery('')
}
```

### Complete JSX Component
```tsx
{showAdvancedModal && (
  <div className="fixed inset-0 z-[1500] bg-black/20 backdrop-blur-sm lg:hidden">
    <div className="absolute inset-0 bg-white animate-in slide-in-from-top duration-300">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex-1 overflow-y-auto p-4 pb-2 space-y-6">
          
          {/* Country Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-900">🌍 ประเทศทั้งหมด</h3>
              <button
                onClick={() => setShowAdvancedModal(false)}
                className="group p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 hover:text-gray-800 transition-all duration-200"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>

            {/* Country Search */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ค้นหาประเทศ..."
                  value={countrySearchQuery}
                  onChange={(e) => setCountrySearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
                {countrySearchQuery && (
                  <button
                    onClick={() => setCountrySearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Countries Grid */}
            <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
              {allCountries.filter(country => {
                if (countrySearchQuery.length < 2) return true;
                return country.name.toLowerCase().includes(countrySearchQuery.toLowerCase());
              }).map((country, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCountry(country.name === selectedCountry ? '' : country.name)}
                  className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                    selectedCountry === country.name
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-[18px] h-[18px] rounded-full border border-gray-200 overflow-hidden flex-shrink-0">
                      <Image 
                        src={`/icons/destinations/flag-icons-main/flags/1x1/${country.flagCode}.svg`}
                        alt={`${country.name} flag`}
                        width={18}
                        height={18}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-sm font-medium truncate">{country.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Travel Date Filter */}
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-blue-600" />
              <h3 className="text-base font-semibold text-gray-900">วันเดินทาง</h3>
              <span className="text-xs text-gray-500">(2568)</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {[
                { name: 'มกราคม', short: 'ม.ค.', value: '01', isPast: true, hasTours: true },
                { name: 'กุมภาพันธ์', short: 'ก.พ.', value: '02', isPast: true, hasTours: true },
                { name: 'มีนาคม', short: 'มี.ค.', value: '03', isPast: true, hasTours: true },
                { name: 'เมษายน', short: 'เม.ย.', value: '04', isPast: false, hasTours: true },
                { name: 'พฤษภาคม', short: 'พ.ค.', value: '05', isPast: false, hasTours: true },
                { name: 'มิถุนายน', short: 'มิ.ย.', value: '06', isPast: false, hasTours: true },
                { name: 'กรกฎาคม', short: 'ก.ค.', value: '07', isPast: false, hasTours: true },
                { name: 'สิงหาคม', short: 'ส.ค.', value: '08', isPast: false, hasTours: false },
                { name: 'กันยายน', short: 'ก.ย.', value: '09', isPast: false, hasTours: true },
                { name: 'ตุลาคม', short: 'ต.ค.', value: '10', isPast: false, hasTours: true },
                { name: 'พฤศจิกายน', short: 'พ.ย.', value: '11', isPast: false, hasTours: true },
                { name: 'ธันวาคม', short: 'ธ.ค.', value: '12', isPast: false, hasTours: true }
              ].map((month, index) => {
                const isDisabled = month.isPast || !month.hasTours
                const isSelected = selectedMonths.includes(month.value)
                
                return (
                  <button
                    key={index}
                    disabled={isDisabled}
                    onClick={() => {
                      if (isDisabled) return
                      setSelectedMonths(prev => 
                        isSelected 
                          ? prev.filter(m => m !== month.value)
                          : [...prev, month.value]
                      )
                    }}
                    className={`relative py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                      isDisabled
                        ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed opacity-50'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50/50'
                    }`}
                  >
                    <div className="text-xs font-bold">{month.short}</div>
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Number of People Filter */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">👥 จำนวนผู้เดินทาง</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '1 คน', value: '1' },
                { label: '2 คน', value: '2' },
                { label: '3-4 คน', value: '3-4' },
                { label: '5+ คน', value: '5+' }
              ].map((people, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPeople(people.value === selectedPeople ? '' : people.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedPeople === people.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="text-sm font-medium">{people.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">⭐ คะแนนรีวิว</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '4+ ดาว', value: '4+' },
                { label: '3+ ดาว', value: '3+' },
                { label: 'ทุกคะแนน', value: 'all' },
                { label: 'รีวิวเยอะ', value: 'popular' }
              ].map((rating, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedRating(rating.value === selectedRating ? '' : rating.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedRating === rating.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="text-sm font-medium">{rating.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tour Type Filter */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">🏷️ ประเภททัวร์</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '🌿 ธรรมชาติ', value: 'nature' },
                { label: '🏛️ วัฒนธรรม', value: 'culture' },
                { label: '🛍️ ช้อปปิ้ง', value: 'shopping' },
                { label: '🏔️ ผจญภัย', value: 'adventure' }
              ].map((type, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTourType(type.value === selectedTourType ? '' : type.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedTourType === type.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="text-sm font-medium">{type.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Budget Filter */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">💰 งบประมาณ</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'ไม่เกิน 30,000', value: '30000' },
                { label: 'ไม่เกิน 50,000', value: '50000' },
                { label: 'ไม่เกิน 100,000', value: '100000' },
                { label: 'โปรโมชั่น', value: 'promotion' }
              ].map((budget, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedBudget(budget.value === selectedBudget ? '' : budget.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedBudget === budget.value
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  <div className="text-sm font-medium">{budget.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Duration Filter */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">⏰ ระยะเวลา</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '3-5 วัน', value: 'short' },
                { label: '6-8 วัน', value: 'medium' },
                { label: '9-12 วัน', value: 'long' },
                { label: 'มากกว่า 2 สัปดาห์', value: 'extended' }
              ].map((duration, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDuration(duration.value === selectedDuration ? '' : duration.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedDuration === duration.value
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50'
                  }`}
                >
                  <div className="text-sm font-medium">{duration.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Fixed Bottom Buttons */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 space-y-3">
          <button
            onClick={() => setShowAdvancedModal(false)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            ค้นหาทัวร์ ({searchResults.length} ผลลัพธ์)
          </button>
          <button
            onClick={clearFilters}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-colors"
          >
            ล้างตัวกรอง
          </button>
        </div>
      </div>
    </div>
  </div>
)}
```

### Key Features
- ✅ Full-screen modal สำหรับมือถือ (lg:hidden)
- ✅ Slide-in animation จากด้านบน
- ✅ ค้นหาประเทศพร้อม flag icons
- ✅ เลือกได้หลายเดือน (multi-select)
- ✅ Disabled states สำหรับเดือนที่ผ่านไปแล้ว
- ✅ Fixed bottom buttons (ค้นหา + ล้างตัวกรอง)
- ✅ แสดงจำนวนผลลัพธ์แบบ real-time
- ✅ Smooth transitions และ hover effects

---

## Required Dependencies

### Icons (lucide-react)
```typescript
import { 
  Search, 
  Filter, 
  X, 
  Calendar,
  ArrowUp,
  Zap
} from 'lucide-react'
```

### Next.js Image
```typescript
import Image from 'next/image'
```

### Tailwind CSS Classes
ต้องมี Tailwind CSS configuration ที่รองรับ:
- `animate-in`, `slide-in-from-top` (หรือใช้ custom animation)
- `backdrop-blur-sm`
- Gradient backgrounds
- Responsive breakpoints (sm, md, lg)

---

## Integration Guide

### Step 1: Copy States
คัดลอก states ทั้งหมดที่จำเป็นไปยังหน้าของคุณ

### Step 2: Add Placeholder Animation
เพิ่ม useEffect สำหรับ animated placeholder

### Step 3: Add Search Bar JSX
วาง search bar component ในตำแหน่งที่ต้องการ

### Step 4: Add Modal JSX
วาง modal component (ควรอยู่ก่อน closing tag ของ main container)

### Step 5: Add Country Data
เพิ่มข้อมูลประเทศพร้อม flag codes

### Step 6: Implement Filter Logic
เขียน logic สำหรับกรองข้อมูลตาม filters ที่เลือก

---

## Customization Tips

### เปลี่ยนสี Theme
- Search bar: `border-blue-500`, `ring-blue-100`
- Buttons: `bg-blue-600`, `hover:bg-blue-700`
- Selected states: `border-blue-500`, `bg-blue-50`

### ปรับความเร็ว Animation
- Typing speed: เปลี่ยน `100` ใน setTimeout
- Deleting speed: เปลี่ยน `50` ใน setTimeout
- Wait time: เปลี่ยน `2000` (2 วินาที)

### เพิ่ม/ลด Filters
แก้ไข array ใน JSX ของแต่ละ filter section

---

## Performance Notes

1. **Placeholder Animation**: ใช้ setTimeout แทน setInterval เพื่อ performance ที่ดีกว่า
2. **Modal Rendering**: ใช้ conditional rendering (`&&`) แทน `display: none`
3. **Country Search**: Filter เมื่อพิมพ์ครบ 2 ตัวอักษรขึ้นไป
4. **Image Optimization**: ใช้ Next.js Image component สำหรับ flag icons

---

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Safari (latest)
- ✅ Firefox (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## License & Credits

Functions extracted from `/tour-search-50` page
Created: January 2026
