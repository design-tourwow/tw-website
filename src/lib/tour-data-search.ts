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
}

export const tourDatabase: TourData[] = [
  {
    id: '1',
    code: 'TW61529',
    title: 'ทัวร์ญี่ปุ่น โอซาก้า โตเกียว 7 วัน 5 คืน',
    destination: 'ญี่ปุ่น',
    duration: '7 วัน 5 คืน',
    durationDays: 7,
    price: 89900,
    originalPrice: 119900,
    discount: 30000,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop&auto=format&q=100',
    images: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop&auto=format&q=100',
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop&auto=format&q=100'
    ],
    airline: 'Thai Airways',
    airlineCode: 'TG',
    route: { from: 'BKK', to: 'NRT' },
    travelPeriod: 'มี.ค. - พ.ค. 68',
    badge: 'flash-sale',
    badgeColor: 'red',
    badgeText: 'ลดพิเศษ',
    features: ['โรงแรม 5 ดาว', 'บุฟเฟ่ต์ขาปูยักษ์', 'กรุ๊ปเล็ก VIP'],
    slug: 'newyork-usa',
    category: 'asia',
    region: 'east-asia',
    seatsLeft: 3,
    popular: true
  },
  {
    id: '2',
    code: 'TW62841',
    title: 'ทัวร์ญี่ปุ่น ฮอกไกโด 7 วัน 5 คืน',
    destination: 'ญี่ปุ่น',
    duration: '7 วัน 5 คืน',
    durationDays: 7,
    price: 78900,
    originalPrice: 98900,
    discount: 20000,
    rating: 3.5,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&h=600&fit=crop&auto=format&q=100',
    images: ['https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&h=600&fit=crop&auto=format&q=100'],
    airline: 'Thai Airways',
    airlineCode: 'TG',
    route: { from: 'BKK', to: 'NRT' },
    travelPeriod: 'ก.ย. - พ.ย. 68',
    badge: 'premium',
    badgeColor: 'blue',
    badgeText: 'ทัวร์พรีเมี่ยม',
    features: ['โรงแรม 5 ดาว', 'อาหาร Kaiseki', 'ไกด์ท้องถิ่น'],
    slug: 'tokyo-japan',
    category: 'asia',
    region: 'east-asia',
    popular: true
  },
  {
    id: '3',
    code: 'TW63254',
    title: 'ทัวร์สิงคโปร์ 4 วัน 3 คืน',
    destination: 'สิงคโปร์',
    duration: '4 วัน 3 คืน',
    durationDays: 4,
    price: 32900,
    originalPrice: 45900,
    discount: 13000,
    rating: 4.6,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop&auto=format&q=100',
    images: ['https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop&auto=format&q=100'],
    airline: 'Singapore Airlines',
    airlineCode: 'SQ',
    route: { from: 'BKK', to: 'SIN' },
    travelPeriod: 'ธ.ค. - ก.พ. 68',
    badge: 'hot-deal',
    badgeColor: 'red',
    badgeText: 'ดีลสุดคุ้ม',
    features: ['ยูนิเวอร์แซล สตูดิโอ', 'การ์เด้นส์ บาย เดอะ เบย์', 'ช้อปปิ้งออชาร์ด'],
    slug: 'singapore',
    category: 'asia',
    region: 'southeast-asia',
    popular: true
  },
  {
    id: '4',
    code: 'TW84172',
    title: 'ทัวร์คาซัคสถาน อัลมาตี 8 วัน 6 คืน',
    destination: 'คาซัคสถาน',
    duration: '8 วัน 6 คืน',
    durationDays: 8,
    price: 89900,
    originalPrice: 109900,
    discount: 20000,
    rating: 4.3,
    reviews: 47,
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=600&fit=crop&auto=format&q=100',
    images: ['https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=600&fit=crop&auto=format&q=100'],
    airline: 'Air Astana',
    airlineCode: 'KC',
    route: { from: 'BKK', to: 'ALA' },
    travelPeriod: 'มี.ค. - พ.ค. 68',
    badge: 'adventure',
    badgeColor: 'blue',
    badgeText: 'ทัวร์ผจญภัย',
    features: ['ธรรมชาติสุดอลังการ', 'ภูเขาหิมะ', 'ทะเลสาบ Big Almaty'],
    slug: 'switzerland',
    category: 'asia',
    region: 'central-asia',
    popular: false
  },
  {
    id: '5',
    code: 'TW85231',
    title: 'ทัวร์ฟิลิปปินส์ โบราเคย์ 5 วัน 4 คืน',
    destination: 'ฟิลิปปินส์',
    duration: '5 วัน 4 คืน',
    durationDays: 5,
    price: 24900,
    originalPrice: 34900,
    discount: 10000,
    rating: 4.9,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop&auto=format&q=100',
    images: ['https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop&auto=format&q=100'],
    airline: 'Philippine Airlines',
    airlineCode: 'PR',
    route: { from: 'BKK', to: 'MNL' },
    travelPeriod: 'เม.ย. - มิ.ย. 68',
    badge: 'flash-sale',
    badgeColor: 'red',
    badgeText: 'โปรโมชั่นพิเศษ',
    features: ['หาดทรายขาว', 'ดำน้ำชมปะการัง', 'รีสอร์ทริมหาด'],
    slug: 'philippines',
    category: 'asia',
    region: 'southeast-asia',
    seatsLeft: 5,
    popular: true
  },
  {
    id: '6',
    code: 'TW86342',
    title: 'ทัวร์ลาว หลวงพระบาง เวียงจันทน์ 4 วัน 3 คืน',
    destination: 'ลาว',
    duration: '4 วัน 3 คืน',
    durationDays: 4,
    price: 15900,
    originalPrice: 19900,
    discount: 4000,
    rating: 4.5,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=600&fit=crop&auto=format&q=100',
    images: ['https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=600&fit=crop&auto=format&q=100'],
    airline: 'Lao Airlines',
    airlineCode: 'QV',
    route: { from: 'BKK', to: 'VTE' },
    travelPeriod: 'ต.ค. - ธ.ค. 68',
    badge: 'premium',
    badgeColor: 'blue',
    badgeText: 'ทัวร์พรีเมี่ยม',
    features: ['มรดกโลก', 'ตักบาตรข้าวเหนียว', 'น้ำตกกวางซี'],
    slug: 'laos',
    category: 'asia',
    region: 'southeast-asia',
    popular: false
  },
  {
    id: '7',
    code: 'TW87453',
    title: 'ทัวร์กัมพูชา นครวัด นครธม 3 วัน 2 คืน',
    destination: 'กัมพูชา',
    duration: '3 วัน 2 คืน',
    durationDays: 3,
    price: 9900,
    originalPrice: 14900,
    discount: 5000,
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop&auto=format&q=100',
    images: ['https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop&auto=format&q=100'],
    airline: 'Bangkok Airways',
    airlineCode: 'PG',
    route: { from: 'BKK', to: 'REP' },
    travelPeriod: 'ม.ค. - มี.ค. 68',
    badge: 'hot-deal',
    badgeColor: 'red',
    badgeText: 'จองด่วน!',
    features: ['ปราสาทนครวัด', 'นครธม', 'ตาพรหม'],
    slug: 'vietnam',
    category: 'asia',
    region: 'southeast-asia',
    popular: true
  },
  {
    id: '8',
    code: 'TW88564',
    title: 'ทัวร์ฮ่องกง ดิสนีย์แลนด์ 4 วัน 3 คืน',
    destination: 'ฮ่องกง',
    duration: '4 วัน 3 คืน',
    durationDays: 4,
    price: 42900,
    originalPrice: 52900,
    discount: 10000,
    rating: 4.8,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=800&h=600&fit=crop&auto=format&q=100',
    images: ['https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=800&h=600&fit=crop&auto=format&q=100'],
    airline: 'Cathay Pacific',
    airlineCode: 'CX',
    route: { from: 'BKK', to: 'HKG' },
    travelPeriod: 'พ.ย. - ม.ค. 68',
    badge: 'luxury',
    badgeColor: 'blue',
    badgeText: 'ทัวร์หรู',
    features: ['ดิสนีย์แลนด์', 'นองปิง 360', 'ช้อปปิ้งมงก๊ก'],
    slug: 'korea',
    category: 'asia',
    region: 'east-asia',
    popular: true
  },
  {
    id: '9',
    code: 'TW89675',
    title: 'ทัวร์บาหลี อินโดนีเซีย 5 วัน 4 คืน',
    destination: 'อินโดนีเซีย',
    duration: '5 วัน 4 คืน',
    durationDays: 5,
    price: 28900,
    originalPrice: 38900,
    discount: 10000,
    rating: 4.9,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop&auto=format&q=100',
    images: ['https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop&auto=format&q=100'],
    airline: 'Garuda Indonesia',
    airlineCode: 'GA',
    route: { from: 'BKK', to: 'DPS' },
    travelPeriod: 'ก.ค. - ก.ย. 68',
    badge: 'hot-deal',
    badgeColor: 'red',
    badgeText: 'ดีลร้อนแรง',
    features: ['วัดเบซากีห์', 'นาข้าวขั้นบันได', 'ชายหาดกูตา'],
    slug: 'bali',
    category: 'asia',
    region: 'southeast-asia',
    seatsLeft: 4,
    popular: true
  },
  {
    id: '10',
    code: 'TW93519',
    title: 'ทัวร์มาเลเซีย กัวลาลัมเปอร์ 4 วัน 3 คืน',
    destination: 'มาเลเซีย',
    duration: '4 วัน 3 คืน',
    durationDays: 4,
    price: 18900,
    originalPrice: 24900,
    discount: 6000,
    rating: 4.4,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&h=600&fit=crop&auto=format&q=100',
    images: ['https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&h=600&fit=crop&auto=format&q=100'],
    airline: 'Malaysia Airlines',
    airlineCode: 'MH',
    route: { from: 'BKK', to: 'KUL' },
    travelPeriod: 'ส.ค. - ต.ค. 68',
    badge: 'premium',
    badgeColor: 'blue',
    badgeText: 'ทัวร์คุณภาพ',
    features: ['ตึกแฝดเปโตรนาส', 'ถ้ำบาตู', 'ช้อปปิ้งบูกิตบินตัง'],
    slug: 'malaysia',
    category: 'asia',
    region: 'southeast-asia',
    popular: false
  },
  {
    id: '11',
    code: 'TW94620',
    title: 'ทัวร์มัลดีฟส์ 6 วัน 4 คืน',
    destination: 'มัลดีฟส์',
    duration: '6 วัน 4 คืน',
    durationDays: 6,
    price: 125900,
    originalPrice: 155900,
    discount: 30000,
    rating: 5.0,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop&auto=format&q=100',
    images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop&auto=format&q=100'],
    airline: 'Singapore Airlines',
    airlineCode: 'SQ',
    route: { from: 'BKK', to: 'MLE' },
    travelPeriod: 'ตลอดปี',
    badge: 'luxury',
    badgeColor: 'blue',
    badgeText: 'ทัวร์ระดับ Luxury',
    features: ['Water Villa', 'ดำน้ำชมปะการัง', 'สปาริมทะเล'],
    slug: 'maldives',
    category: 'asia',
    region: 'south-asia',
    popular: true
  },
  {
    id: '12',
    code: 'TW95731',
    title: 'ทัวร์เกาหลี โซล ปูซาน 6 วัน 4 คืน',
    destination: 'เกาหลีใต้',
    duration: '6 วัน 4 คืน',
    durationDays: 6,
    price: 45900,
    originalPrice: 59900,
    discount: 14000,
    rating: 4.7,
    reviews: 267,
    image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=600&fit=crop&auto=format&q=100',
    images: ['https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=600&fit=crop&auto=format&q=100'],
    airline: 'Korean Air',
    airlineCode: 'KE',
    route: { from: 'BKK', to: 'ICN' },
    travelPeriod: 'ก.พ. - เม.ย. 68',
    badge: 'best-seller',
    badgeColor: 'orange',
    badgeText: 'ขายดี',
    features: ['ช้อปปิ้งมยองดง', 'ชมซากุระ', 'ตลาดปลาจากัลชี'],
    slug: 'korea',
    category: 'asia',
    region: 'east-asia',
    popular: true
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

  // Filter by search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase()
    filtered = filtered.filter(tour =>
      tour.title.toLowerCase().includes(query) ||
      tour.destination.toLowerCase().includes(query) ||
      tour.code.toLowerCase().includes(query)
    )
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
      const query = currentFilters.searchQuery.toLowerCase()
      filtered = filtered.filter(tour =>
        tour.title.toLowerCase().includes(query) ||
        tour.destination.toLowerCase().includes(query) ||
        tour.code.toLowerCase().includes(query)
      )
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
  // TODO: Implement holiday counting when data is available

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
