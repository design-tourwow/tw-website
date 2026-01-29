// Tour Data สำหรับหน้าค้นหา
export interface TourData {
  id: string
  code: string
  title: string
  destination: string
  duration: string
  durationDays: number
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviews: number
  image: string
  images: string[]
  airline: string
  airlineCode: string
  route: { from: string; to: string }
  travelPeriod: string
  badge: 'flash-sale' | 'premium' | 'hot-deal' | 'adventure' | 'luxury' | 'best-seller'
  badgeColor: 'red' | 'blue' | 'green' | 'purple' | 'orange'
  badgeText: string
  features: string[]
  slug: string
  category: string
  region: string
  countdown?: { hours: number; minutes: number; seconds: number }
  seatsLeft?: number
  popular: boolean
  /** List of destination slugs this tour covers (e.g., ['tokyo', 'osaka', 'kyoto']) */
  destinations: string[]
}

export const tourDatabase: TourData[] = [
  {
    id: '1',
    code: 'TW61529',
    title: 'ทัวร์ญี่ปุ่น โอซาก้า โตเกียว',
    destination: 'ญี่ปุ่น',
    duration: '7 วัน 5 คืน',
    durationDays: 7,
    price: 89900,
    originalPrice: 119900,
    discount: 30000,
    rating: 4,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop&auto=format&q=100',
    images: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop&auto=format&q=100',
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop&auto=format&q=100'
    ],
    airline: 'Thai Airways',
    airlineCode: 'TG',
    route: { from: 'BKK', to: 'KIX' },
    travelPeriod: 'มี.ค. - พ.ค. 68',
    badge: 'flash-sale',
    badgeColor: 'red',
    badgeText: 'ลดพิเศษ',
    features: ['โรงแรม 5 ดาว', 'บุฟเฟ่ต์ขาปูยักษ์', 'กรุ๊ปเล็ก VIP'],
    slug: 'osaka-tokyo-japan',
    category: 'asia',
    region: 'east-asia',
    seatsLeft: 3,
    popular: true,
    destinations: ['osaka', 'tokyo']
  },
  {
    id: '2',
    code: 'TW62841',
    title: 'ทัวร์ญี่ปุ่น ฮอกไกโด ซัปโปโร โอตารุ',
    destination: 'ญี่ปุ่น',
    duration: '7 วัน 5 คืน',
    durationDays: 7,
    price: 78900,
    originalPrice: 98900,
    discount: 20000,
    rating: 3,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&h=600&fit=crop&auto=format&q=100',
    images: ['https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&h=600&fit=crop&auto=format&q=100'],
    airline: 'Thai Airways',
    airlineCode: 'TG',
    route: { from: 'BKK', to: 'CTS' },
    travelPeriod: 'ก.ย. - พ.ย. 68',
    badge: 'premium',
    badgeColor: 'blue',
    badgeText: 'ทัวร์พรีเมี่ยม',
    features: ['โรงแรม 5 ดาว', 'อาหาร Kaiseki', 'ไกด์ท้องถิ่น'],
    slug: 'hokkaido-japan',
    category: 'asia',
    region: 'east-asia',
    popular: true,
    destinations: ['hokkaido']
  },
  {
    id: '3',
    code: 'TW63254',
    title: 'ทัวร์ญี่ปุ่น โตเกียว ฟูจิ คามาคุระ',
    destination: 'ญี่ปุ่น',
    duration: '6 วัน 4 คืน',
    durationDays: 6,
    price: 65900,
    originalPrice: 79900,
    discount: 14000,
    rating: 4,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&h=600&fit=crop&auto=format&q=100',
    images: ['https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&h=600&fit=crop&auto=format&q=100'],
    airline: 'Japan Airlines',
    airlineCode: 'JL',
    route: { from: 'BKK', to: 'NRT' },
    travelPeriod: 'ธ.ค. - ก.พ. 68',
    badge: 'hot-deal',
    badgeColor: 'red',
    badgeText: 'ดีลสุดคุ้ม',
    features: ['ภูเขาไฟฟูจิ', 'พระใหญ่คามาคุระ', 'ช้อปปิ้งชินจูกุ'],
    slug: 'tokyo-fuji-kamakura',
    category: 'asia',
    region: 'east-asia',
    popular: true,
    destinations: ['tokyo', 'fuji', 'kamakura']
  },
  {
    id: '4',
    code: 'TW84172',
    title: 'ทัวร์ญี่ปุ่น เกียวโต โอซาก้า นารา',
    destination: 'ญี่ปุ่น',
    duration: '5 วัน 3 คืน',
    durationDays: 5,
    price: 49900,
    originalPrice: 59900,
    discount: 10000,
    rating: 4,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop&auto=format&q=100',
    images: ['https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop&auto=format&q=100'],
    airline: 'ANA',
    airlineCode: 'NH',
    route: { from: 'BKK', to: 'KIX' },
    travelPeriod: 'มี.ค. - พ.ค. 68',
    badge: 'best-seller',
    badgeColor: 'orange',
    badgeText: 'ขายดี',
    features: ['วัดคินคาคุจิ', 'ศาลเจ้าฟูชิมิอินาริ', 'กวางนารา'],
    slug: 'kyoto-osaka-nara',
    category: 'asia',
    region: 'east-asia',
    popular: true,
    destinations: ['kyoto', 'osaka']
  },
  {
    id: '5',
    code: 'TW85231',
    title: 'ทัวร์ญี่ปุ่น นาโกย่า ทาคายาม่า คานาซาว่า',
    destination: 'ญี่ปุ่น',
    duration: '6 วัน 4 คืน',
    durationDays: 6,
    price: 72900,
    originalPrice: 89900,
    discount: 17000,
    rating: 4,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&h=600&fit=crop&auto=format&q=100',
    images: ['https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&h=600&fit=crop&auto=format&q=100'],
    airline: 'Thai Airways',
    airlineCode: 'TG',
    route: { from: 'BKK', to: 'NGO' },
    travelPeriod: 'เม.ย. - มิ.ย. 68',
    badge: 'adventure',
    badgeColor: 'blue',
    badgeText: 'ทัวร์ผจญภัย',
    features: ['หมู่บ้านชิราคาวาโกะ', 'สวนเค็นโรคุเอ็น', 'ตลาดเช้าทาคายาม่า'],
    slug: 'nagoya-takayama-kanazawa',
    category: 'asia',
    region: 'east-asia',
    seatsLeft: 5,
    popular: true,
    destinations: ['nagoya', 'takayama', 'kanazawa']
  },
  {
    id: '6',
    code: 'TW86342',
    title: 'ทัวร์ญี่ปุ่น โตเกียว นิกโก้',
    destination: 'ญี่ปุ่น',
    duration: '5 วัน 3 คืน',
    durationDays: 5,
    price: 54900,
    originalPrice: 64900,
    discount: 10000,
    rating: 4,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&h=600&fit=crop&auto=format&q=100',
    images: ['https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&h=600&fit=crop&auto=format&q=100'],
    airline: 'Japan Airlines',
    airlineCode: 'JL',
    route: { from: 'BKK', to: 'NRT' },
    travelPeriod: 'ต.ค. - ธ.ค. 68',
    badge: 'premium',
    badgeColor: 'blue',
    badgeText: 'ทัวร์พรีเมี่ยม',
    features: ['ศาลเจ้าโทโชกุ', 'ทะเลสาบชูเซ็นจิ', 'น้ำตกเคกอน'],
    slug: 'tokyo-nikko',
    category: 'asia',
    region: 'east-asia',
    popular: false,
    destinations: ['tokyo', 'nikko']
  },
  {
    id: '7',
    code: 'TW87453',
    title: 'ทัวร์ญี่ปุ่น ฮิโรชิม่า มิยาจิม่า โอซาก้า',
    destination: 'ญี่ปุ่น',
    duration: '6 วัน 4 คืน',
    durationDays: 6,
    price: 69900,
    originalPrice: 84900,
    discount: 15000,
    rating: 3,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=600&fit=crop&auto=format&q=100',
    images: ['https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=600&fit=crop&auto=format&q=100'],
    airline: 'ANA',
    airlineCode: 'NH',
    route: { from: 'BKK', to: 'KIX' },
    travelPeriod: 'ม.ค. - มี.ค. 68',
    badge: 'hot-deal',
    badgeColor: 'red',
    badgeText: 'จองด่วน!',
    features: ['อนุสรณ์สันติภาพ', 'เกาะมิยาจิม่า', 'ปราสาทโอซาก้า'],
    slug: 'hiroshima-osaka',
    category: 'asia',
    region: 'east-asia',
    popular: true,
    destinations: ['hiroshima', 'osaka']
  },
  {
    id: '8',
    code: 'TW88564',
    title: 'ทัวร์ญี่ปุ่น เซนได มัตสึชิม่า',
    destination: 'ญี่ปุ่น',
    duration: '5 วัน 3 คืน',
    durationDays: 5,
    price: 59900,
    originalPrice: 72900,
    discount: 13000,
    rating: 4,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&auto=format&q=100',
    images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&auto=format&q=100'],
    airline: 'Thai Airways',
    airlineCode: 'TG',
    route: { from: 'BKK', to: 'SDJ' },
    travelPeriod: 'พ.ย. - ม.ค. 68',
    badge: 'adventure',
    badgeColor: 'blue',
    badgeText: 'สำรวจธรรมชาติ',
    features: ['อ่าวมัตสึชิม่า', 'ปราสาทเซนได', 'ลิ้นวัวย่าง'],
    slug: 'sendai-matsushima',
    category: 'asia',
    region: 'east-asia',
    popular: false,
    destinations: ['sendai']
  },
  {
    id: '9',
    code: 'TW89675',
    title: 'ทัวร์ญี่ปุ่น โตเกียว โอซาก้า เกียวโต',
    destination: 'ญี่ปุ่น',
    duration: '8 วัน 6 คืน',
    durationDays: 8,
    price: 99900,
    originalPrice: 129900,
    discount: 30000,
    rating: 4,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop&auto=format&q=100',
    images: ['https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop&auto=format&q=100'],
    airline: 'Japan Airlines',
    airlineCode: 'JL',
    route: { from: 'BKK', to: 'NRT' },
    travelPeriod: 'ก.ค. - ก.ย. 68',
    badge: 'luxury',
    badgeColor: 'blue',
    badgeText: 'ทัวร์หรู',
    features: ['โรงแรม 5 ดาว', 'รถไฟชินคันเซ็น', 'อาหารไคเซกิ'],
    slug: 'tokyo-osaka-kyoto-grand',
    category: 'asia',
    region: 'east-asia',
    seatsLeft: 4,
    popular: true,
    destinations: ['tokyo', 'osaka', 'kyoto']
  },
  {
    id: '10',
    code: 'TW93519',
    title: 'ทัวร์ญี่ปุ่น ฟูจิ คาวากูจิโกะ โตเกียว',
    destination: 'ญี่ปุ่น',
    duration: '5 วัน 3 คืน',
    durationDays: 5,
    price: 55900,
    originalPrice: 67900,
    discount: 12000,
    rating: 4,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1578271887552-5ac3a72752bc?w=800&h=600&fit=crop&auto=format&q=100',
    images: ['https://images.unsplash.com/photo-1578271887552-5ac3a72752bc?w=800&h=600&fit=crop&auto=format&q=100'],
    airline: 'ANA',
    airlineCode: 'NH',
    route: { from: 'BKK', to: 'HND' },
    travelPeriod: 'ส.ค. - ต.ค. 68',
    badge: 'best-seller',
    badgeColor: 'orange',
    badgeText: 'ขายดีที่สุด',
    features: ['ทะเลสาบคาวากูจิโกะ', 'หมู่บ้านโอชิโนะฮักไก', 'ออนเซ็น'],
    slug: 'fuji-kawaguchiko-tokyo',
    category: 'asia',
    region: 'east-asia',
    popular: true,
    destinations: ['fuji', 'tokyo']
  },
  {
    id: '11',
    code: 'TW94620',
    title: 'ทัวร์ญี่ปุ่น โอซาก้า เกียวโต นารา',
    destination: 'ญี่ปุ่น',
    duration: '5 วัน 3 คืน',
    durationDays: 5,
    price: 45900,
    originalPrice: 54900,
    discount: 9000,
    rating: 4,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&h=600&fit=crop&auto=format&q=100',
    images: ['https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&h=600&fit=crop&auto=format&q=100'],
    airline: 'Thai Airways',
    airlineCode: 'TG',
    route: { from: 'BKK', to: 'KIX' },
    travelPeriod: 'ตลอดปี',
    badge: 'flash-sale',
    badgeColor: 'red',
    badgeText: 'ราคาพิเศษ',
    features: ['ปราสาทโอซาก้า', 'ป่าไผ่อาราชิยาม่า', 'โทริอิพันตัว'],
    slug: 'osaka-kyoto-nara',
    category: 'asia',
    region: 'east-asia',
    popular: true,
    destinations: ['osaka', 'kyoto']
  },
  {
    id: '12',
    code: 'TW95731',
    title: 'ทัวร์ญี่ปุ่น ฮอกไกโด ฟูราโน่ บิเอ',
    destination: 'ญี่ปุ่น',
    duration: '6 วัน 4 คืน',
    durationDays: 6,
    price: 82900,
    originalPrice: 99900,
    discount: 17000,
    rating: 4,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&auto=format&q=100',
    images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&auto=format&q=100'],
    airline: 'Japan Airlines',
    airlineCode: 'JL',
    route: { from: 'BKK', to: 'CTS' },
    travelPeriod: 'ก.พ. - เม.ย. 68',
    badge: 'premium',
    badgeColor: 'blue',
    badgeText: 'ทัวร์คุณภาพ',
    features: ['ทุ่งลาเวนเดอร์', 'บ่อน้ำสีฟ้า', 'สกีรีสอร์ท'],
    slug: 'hokkaido-furano',
    category: 'asia',
    region: 'east-asia',
    popular: true,
    destinations: ['hokkaido']
  }
]

// ฟังก์ชันกรองและเรียงลำดับทัวร์
export function filterAndSortTours(
  tours: TourData[],
  filters: {
    region?: string
    priceRange?: string
    duration?: string
    airline?: string
    rating?: number
    searchQuery?: string
    holidays?: string[]
    priceRanges?: string[]
    durations?: string[]
    airlines?: string[]
  },
  sortBy: string
): TourData[] {
  let filtered = [...tours]

  // Filter by holidays (multiple selection)
  if (filters.holidays && filters.holidays.length > 0) {
    // TODO: Add holiday filtering logic when holiday data is available
  }

  // Filter by price ranges (multiple selection)
  if (filters.priceRanges && filters.priceRanges.length > 0) {
    filtered = filtered.filter(tour => {
      return filters.priceRanges!.some(range => {
        const [min, max] = range.split('-').map(Number)
        if (max === 999999) {
          return tour.price >= min
        }
        return tour.price >= min && tour.price <= max
      })
    })
  }

  // Filter by durations (multiple selection)
  if (filters.durations && filters.durations.length > 0) {
    filtered = filtered.filter(tour => {
      return filters.durations!.some(range => {
        const [min, max] = range.split('-').map(Number)
        if (max === 999) {
          return tour.durationDays >= min
        }
        return tour.durationDays >= min && tour.durationDays <= max
      })
    })
  }

  // Filter by airlines (multiple selection)
  if (filters.airlines && filters.airlines.length > 0) {
    filtered = filtered.filter(tour =>
      filters.airlines!.includes(tour.airlineCode)
    )
  }

  // Filter by rating
  if (filters.rating && filters.rating > 0) {
    filtered = filtered.filter(tour => tour.rating >= filters.rating!)
  }

  // Filter by search query - split by space and match ANY keyword
  if (filters.searchQuery) {
    const keywords = filters.searchQuery.toLowerCase().split(/\s+/).filter(k => k.length > 0)
    filtered = filtered.filter(tour => {
      const searchableText = (
        tour.title + ' ' +
        tour.destination + ' ' +
        tour.code + ' ' +
        tour.features.join(' ') + ' ' +
        tour.destinations.join(' ')
      ).toLowerCase()

      // Match if ANY keyword is found
      return keywords.some(keyword => searchableText.includes(keyword))
    })
  }

  // Sort
  switch (sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case 'popular':
    default:
      filtered.sort((a, b) => {
        if (a.popular && !b.popular) return -1
        if (!a.popular && b.popular) return 1
        return b.reviews - a.reviews
      })
  }

  return filtered
}

// ฟังก์ชันกรองทัวร์ตาม destination slug
export function filterToursByDestination(tours: TourData[], destinationSlug: string): TourData[] {
  return tours.filter(tour => tour.destinations.includes(destinationSlug))
}

// ฟังก์ชันคำนวณจำนวนทัวร์ในแต่ละ filter option (Real-time cross-filter counting)
export function calculateFilterCounts(
  tours: TourData[],
  currentFilters: {
    holidays?: string[]
    priceRanges?: string[]
    durations?: string[]
    airlines?: string[]
    rating?: number
    searchQuery?: string
  }
) {
  // Helper function to filter tours excluding specific filter type
  const getFilteredToursExcluding = (excludeFilter: string) => {
    let filtered = [...tours]

    if (excludeFilter !== 'holidays' && currentFilters.holidays && currentFilters.holidays.length > 0) {
      // Apply holiday filter
    }

    if (excludeFilter !== 'priceRanges' && currentFilters.priceRanges && currentFilters.priceRanges.length > 0) {
      filtered = filtered.filter(tour => {
        return currentFilters.priceRanges!.some(range => {
          const [min, max] = range.split('-').map(Number)
          if (max === 999999) return tour.price >= min
          return tour.price >= min && tour.price <= max
        })
      })
    }

    if (excludeFilter !== 'durations' && currentFilters.durations && currentFilters.durations.length > 0) {
      filtered = filtered.filter(tour => {
        return currentFilters.durations!.some(range => {
          const [min, max] = range.split('-').map(Number)
          if (max === 999) return tour.durationDays >= min
          return tour.durationDays >= min && tour.durationDays <= max
        })
      })
    }

    if (excludeFilter !== 'airlines' && currentFilters.airlines && currentFilters.airlines.length > 0) {
      filtered = filtered.filter(tour => currentFilters.airlines!.includes(tour.airlineCode))
    }

    if (excludeFilter !== 'rating' && currentFilters.rating && currentFilters.rating > 0) {
      filtered = filtered.filter(tour => tour.rating >= currentFilters.rating!)
    }

    if (currentFilters.searchQuery) {
      const keywords = currentFilters.searchQuery.toLowerCase().split(/\s+/).filter(k => k.length > 0)
      filtered = filtered.filter(tour => {
        const searchableText = (
          tour.title + ' ' +
          tour.destination + ' ' +
          tour.code + ' ' +
          tour.features.join(' ') + ' ' +
          tour.destinations.join(' ')
        ).toLowerCase()
        return keywords.some(keyword => searchableText.includes(keyword))
      })
    }

    return filtered
  }

  // Calculate counts for each filter type
  const holidayCounts: Record<string, number> = {}
  const priceRangeCounts: Record<string, number> = {}
  const durationCounts: Record<string, number> = {}
  const airlineCounts: Record<string, number> = {}
  const ratingCounts: Record<number, number> = { 3: 0, 4: 0, 5: 0 }

  // Count holidays
  const toursForHolidays = getFilteredToursExcluding('holidays')
  // Mock holiday counts based on the example provided
  const mockHolidayCounts: Record<string, number> = {
    'valentine': 85,
    'makha-bucha': 51,
    'chakri': 89,
    'songkran': 10,
    'labor-day': 5,
    'coronation': 16,
    'visakha-bucha': 3,
    'queen-birthday': 2,
    'king-birthday': 1,
    'asalha-bucha': 1,
    'mothers-day': 12,
    'new-year': 45,
    'long-weekend': 32,
    'summer': 28,
    'chinese-new-year': 18,
    'loy-krathong': 22
  }
  Object.assign(holidayCounts, mockHolidayCounts)

  // Count price ranges
  const toursForPrices = getFilteredToursExcluding('priceRanges')
  const priceRanges = [
    { value: '0-20000', min: 0, max: 20000 },
    { value: '20000-50000', min: 20000, max: 50000 },
    { value: '50000-100000', min: 50000, max: 100000 },
    { value: '100000-999999', min: 100000, max: 999999 }
  ]
  priceRanges.forEach(range => {
    priceRangeCounts[range.value] = toursForPrices.filter(tour => {
      if (range.max === 999999) return tour.price >= range.min
      return tour.price >= range.min && tour.price <= range.max
    }).length
  })

  // Count durations
  const toursForDurations = getFilteredToursExcluding('durations')
  const durations = [
    { value: '1-3', min: 1, max: 3 },
    { value: '4-6', min: 4, max: 6 },
    { value: '7-10', min: 7, max: 10 },
    { value: '11-999', min: 11, max: 999 }
  ]
  durations.forEach(duration => {
    durationCounts[duration.value] = toursForDurations.filter(tour => {
      if (duration.max === 999) return tour.durationDays >= duration.min
      return tour.durationDays >= duration.min && tour.durationDays <= duration.max
    }).length
  })

  // Count airlines
  const toursForAirlines = getFilteredToursExcluding('airlines')
  toursForAirlines.forEach(tour => {
    airlineCounts[tour.airlineCode] = (airlineCounts[tour.airlineCode] || 0) + 1
  })

  // Count ratings
  const toursForRatings = getFilteredToursExcluding('rating')
  ;[3, 4, 5].forEach(stars => {
    ratingCounts[stars] = toursForRatings.filter(tour => tour.rating >= stars).length
  })

  return {
    holidays: holidayCounts,
    priceRanges: priceRangeCounts,
    durations: durationCounts,
    airlines: airlineCounts,
    ratings: ratingCounts
  }
}
