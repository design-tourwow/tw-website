// Complete Tour Data with all fields
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
  badge: string
  badgeColor: 'red' | 'blue' | 'green' | 'orange'
  badgeText: string
  features: string[]
  slug: string
  category: string
  region: string
  seatsLeft?: number
  popular: boolean
  lastUpdated: string
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
    images: [],
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
    popular: true,
    lastUpdated: new Date().toISOString()
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
    images: [],
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
    popular: true,
    lastUpdated: new Date().toISOString()
  },
  // Add more tours as needed...
]

// Filter and Sort Function
export function filterAndSortTours(
  tours: TourData[],
  filters: {
    region?: string
    priceRange?: string
    duration?: string
    airline?: string
    rating?: number
    category?: string
    searchQuery?: string
  },
  sortBy: string
): TourData[] {
  let filtered = [...tours]

  // Apply filters
  if (filters.region && filters.region !== 'all') {
    filtered = filtered.filter(tour => tour.region === filters.region)
  }

  if (filters.priceRange && filters.priceRange !== 'all') {
    const [min, max] = filters.priceRange.split('-').map(Number)
    if (max) {
      filtered = filtered.filter(tour => tour.price >= min && tour.price <= max)
    } else {
      filtered = filtered.filter(tour => tour.price >= min)
    }
  }

  if (filters.rating && filters.rating > 0) {
    filtered = filtered.filter(tour => tour.rating >= filters.rating!)
  }

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase()
    filtered = filtered.filter(tour =>
      tour.title.toLowerCase().includes(query) ||
      tour.destination.toLowerCase().includes(query) ||
      tour.code.toLowerCase().includes(query)
    )
  }

  // Apply sorting
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
    case 'newest':
      filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
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
