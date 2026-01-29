'use client'

import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

// Destination name mapping (Thai)
const destinationNames: Record<string, string> = {
  'tokyo': 'โตเกียว',
  'osaka': 'โอซาก้า',
  'kyoto': 'เกียวโต',
  'hokkaido': 'ฮอกไกโด',
  'fuji': 'ฟูจิ',
  'nagoya': 'นาโกย่า',
  'hiroshima': 'ฮิโรชิม่า',
  'nikko': 'นิกโก้',
  'kamakura': 'คามาคุระ',
  'takayama': 'ทาคายาม่า',
  'kanazawa': 'คานาซาว่า',
  'sendai': 'เซนได',
}

// Destination-specific tags mapping (without prefix - will be added dynamically)
const destinationTags: Record<string, { label: string; slug: string }[]> = {
  // Tokyo - สถานที่ท่องเที่ยวและย่านดังในโตเกียว
  'tokyo': [
    { label: 'ชิบูย่า', slug: 'shibuya' },
    { label: 'ชินจูกุ', slug: 'shinjuku' },
    { label: 'อาซากุสะ', slug: 'asakusa' },
    { label: 'ดิสนีย์แลนด์', slug: 'tokyo-disneyland' },
    { label: 'โตเกียวทาวเวอร์', slug: 'tokyo-tower' },
    { label: 'ฮาราจูกุ', slug: 'harajuku' },
    { label: 'อากิฮาบาระ', slug: 'akihabara' },
    { label: 'สกายทรี', slug: 'skytree' },
  ],
  // Osaka - สถานที่ท่องเที่ยวและย่านดังในโอซาก้า
  'osaka': [
    { label: 'โดทงโบริ', slug: 'dotonbori' },
    { label: 'ปราสาทโอซาก้า', slug: 'osaka-castle' },
    { label: 'ยูนิเวอร์แซลสตูดิโอ', slug: 'usj' },
    { label: 'ชินเซไก', slug: 'shinsekai' },
    { label: 'นัมบะ', slug: 'namba' },
    { label: 'อุเมดะ', slug: 'umeda' },
    { label: 'เท็นโนจิ', slug: 'tennoji' },
    { label: 'คุโรมง', slug: 'kuromon' },
  ],
  // Kyoto - วัดและสถานที่สำคัญในเกียวโต
  'kyoto': [
    { label: 'วัดคินคาคุจิ', slug: 'kinkakuji' },
    { label: 'ฟูชิมิอินาริ', slug: 'fushimi-inari' },
    { label: 'อาราชิยาม่า', slug: 'arashiyama' },
    { label: 'กิออน', slug: 'gion' },
    { label: 'วัดคิโยมิสึ', slug: 'kiyomizu' },
    { label: 'ป่าไผ่', slug: 'bamboo-forest' },
    { label: 'นิชิกิมาร์เก็ต', slug: 'nishiki' },
    { label: 'ปราสาทนิโจ', slug: 'nijo-castle' },
  ],
  // Hokkaido - สถานที่ท่องเที่ยวในฮอกไกโด
  'hokkaido': [
    { label: 'ซัปโปโร', slug: 'sapporo' },
    { label: 'โอตารุ', slug: 'otaru' },
    { label: 'ฟูราโน่', slug: 'furano' },
    { label: 'บิเอ', slug: 'biei' },
    { label: 'โนโบริเบ็ตสึ', slug: 'noboribetsu' },
    { label: 'ฮาโกดาเตะ', slug: 'hakodate' },
    { label: 'ทะเลสาบโทยะ', slug: 'lake-toya' },
    { label: 'นิเซโกะ', slug: 'niseko' },
  ],
  // Fuji - ภูเขาไฟฟูจิและบริเวณใกล้เคียง
  'fuji': [
    { label: 'คาวากูจิโกะ', slug: 'kawaguchiko' },
    { label: 'โกะเท็มบะ', slug: 'gotemba' },
    { label: 'โอชิโนะฮักไก', slug: 'oshino-hakkai' },
    { label: 'ฟูจิคิว', slug: 'fuji-q' },
    { label: 'ชูเรโตะ', slug: 'chureito' },
    { label: 'ออนเซ็น', slug: 'onsen' },
    { label: 'ยามานาชิ', slug: 'yamanashi' },
    { label: 'ฮาโกเน่', slug: 'hakone' },
  ],
  // Nagoya - สถานที่ท่องเที่ยวในนาโกย่า
  'nagoya': [
    { label: 'ปราสาทนาโกย่า', slug: 'nagoya-castle' },
    { label: 'โอสึ', slug: 'osu' },
    { label: 'ซาคาเอะ', slug: 'sakae' },
    { label: 'พิพิธภัณฑ์โตโยต้า', slug: 'toyota-museum' },
    { label: 'อัตสึตะ', slug: 'atsuta' },
    { label: 'เลโก้แลนด์', slug: 'legoland' },
    { label: 'นาบานะโนะซาโตะ', slug: 'nabana-no-sato' },
    { label: 'อินุยามะ', slug: 'inuyama' },
  ],
  // Hiroshima - สถานที่ท่องเที่ยวในฮิโรชิม่า
  'hiroshima': [
    { label: 'อนุสรณ์สันติภาพ', slug: 'peace-memorial' },
    { label: 'มิยาจิม่า', slug: 'miyajima' },
    { label: 'โดมปรมาณู', slug: 'atomic-dome' },
    { label: 'ปราสาทฮิโรชิม่า', slug: 'hiroshima-castle' },
    { label: 'โอโนมิจิ', slug: 'onomichi' },
    { label: 'อิซึกุชิมะ', slug: 'itsukushima' },
    { label: 'สวนชุกเคเอ็น', slug: 'shukkeien' },
    { label: 'โทโมโนะอุระ', slug: 'tomonoura' },
  ],
  // Nikko - สถานที่ท่องเที่ยวในนิกโก้
  'nikko': [
    { label: 'ศาลเจ้าโทโชกุ', slug: 'toshogu' },
    { label: 'ทะเลสาบชูเซ็นจิ', slug: 'chuzenji' },
    { label: 'น้ำตกเคกอน', slug: 'kegon' },
    { label: 'สะพานชินเคียว', slug: 'shinkyo' },
    { label: 'ออนเซ็นคินุกาวะ', slug: 'kinugawa' },
    { label: 'วัดรินโนจิ', slug: 'rinnoji' },
    { label: 'อิโรฮะซากะ', slug: 'irohazaka' },
    { label: 'เอโดะวันเดอร์แลนด์', slug: 'edo-wonderland' },
  ],
  // Kamakura - สถานที่ท่องเที่ยวในคามาคุระ
  'kamakura': [
    { label: 'พระใหญ่ไดบุทสึ', slug: 'daibutsu' },
    { label: 'วัดฮาเซเดระ', slug: 'hasedera' },
    { label: 'ศาลเจ้าสึรุกาโอกะ', slug: 'tsurugaoka' },
    { label: 'หาดยูอิกาฮามะ', slug: 'yuigahama' },
    { label: 'วัดโฮโกกุจิ', slug: 'hokokuji' },
    { label: 'เอโนชิมะ', slug: 'enoshima' },
    { label: 'ถนนโคมาจิ', slug: 'komachi' },
    { label: 'วัดเอ็นกาคุจิ', slug: 'engakuji' },
  ],
  // Takayama - สถานที่ท่องเที่ยวในทาคายาม่า
  'takayama': [
    { label: 'ชิราคาวาโกะ', slug: 'shirakawago' },
    { label: 'ตลาดเช้า', slug: 'morning-market' },
    { label: 'เมืองเก่า', slug: 'old-town' },
    { label: 'ทาคายาม่าจินยะ', slug: 'takayama-jinya' },
    { label: 'โกคายาม่า', slug: 'gokayama' },
    { label: 'ฮิดะโนซาโตะ', slug: 'hida-no-sato' },
    { label: 'สะพานนากาบาชิ', slug: 'nakabashi' },
    { label: 'เนื้อฮิดะ', slug: 'hida-beef' },
  ],
  // Kanazawa - สถานที่ท่องเที่ยวในคานาซาว่า
  'kanazawa': [
    { label: 'สวนเค็นโรคุเอ็น', slug: 'kenrokuen' },
    { label: 'ย่านฮิกาชิชายะ', slug: 'higashi-chaya' },
    { label: 'ตลาดโอมิโช', slug: 'omicho' },
    { label: 'ปราสาทคานาซาว่า', slug: 'kanazawa-castle' },
    { label: 'พิพิธภัณฑ์ศิลปะ 21st', slug: '21st-century' },
    { label: 'ย่านนากามาจิ', slug: 'nagamachi' },
    { label: 'วัดนินจาเดระ', slug: 'ninjadera' },
    { label: 'สวนเกียวคุเซ็น', slug: 'gyokusen' },
  ],
  // Sendai - สถานที่ท่องเที่ยวในเซนได
  'sendai': [
    { label: 'อ่าวมัตสึชิม่า', slug: 'matsushima' },
    { label: 'ปราสาทเซนได', slug: 'sendai-castle' },
    { label: 'ถนนโจเซ็นจิ', slug: 'jozenji' },
    { label: 'อากิอุออนเซ็น', slug: 'akiu-onsen' },
    { label: 'ซาคุนามิออนเซ็น', slug: 'sakunami' },
    { label: 'ลิ้นวัวย่าง', slug: 'gyutan' },
    { label: 'สวนโคโตได', slug: 'kotodai' },
    { label: 'ยามาเดระ', slug: 'yamadera' },
  ],
}

// Helper function to get tags with city prefix
function getTagsWithPrefix(destinationSlug: string): { label: string; slug: string }[] {
  const tags = destinationTags[destinationSlug]
  const cityName = destinationNames[destinationSlug]
  if (!tags || !cityName) return []

  return tags.map(tag => ({
    label: `ทัวร์${cityName} ${tag.label}`,
    slug: tag.slug
  }))
}

// Default popular tags for main page
const defaultPopularTags = [
  { label: 'ทัวร์ญี่ปุ่น โตเกียว', slug: 'tokyo' },
  { label: 'ทัวร์ญี่ปุ่น โอซาก้า', slug: 'osaka' },
  { label: 'ทัวร์ญี่ปุ่น เกียวโต', slug: 'kyoto' },
  { label: 'ทัวร์ญี่ปุ่น ฮอกไกโด', slug: 'hokkaido' },
  { label: 'ทัวร์ญี่ปุ่น ฟูจิ', slug: 'fuji' },
  { label: 'ทัวร์ญี่ปุ่น นาโกย่า', slug: 'nagoya' },
  { label: 'ทัวร์ญี่ปุ่น ฮิโรชิม่า', slug: 'hiroshima' },
  { label: 'ทัวร์ญี่ปุ่น นิกโก้', slug: 'nikko' },
  { label: 'ทัวร์ญี่ปุ่น คามาคุระ', slug: 'kamakura' },
  { label: 'ทัวร์ญี่ปุ่น ทาคายาม่า', slug: 'takayama' },
  { label: 'ทัวร์ญี่ปุ่น คานาซาว่า', slug: 'kanazawa' },
  { label: 'ทัวร์ญี่ปุ่น เซนได', slug: 'sendai' }
]

interface PopularTagsBarProps {
  className?: string
  /** Current destination slug - if provided, shows destination-specific tags */
  destinationSlug?: string
}

export default function PopularTagsBar({ className = '', destinationSlug }: PopularTagsBarProps) {
  const router = useRouter()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Get tags based on destination or default (with city prefix for destination pages)
  const tags = destinationSlug
    ? getTagsWithPrefix(destinationSlug)
    : defaultPopularTags

  // Check scroll position and update button states
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  // Handle scroll events
  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollButtons)
      // Check initial state
      checkScrollButtons()

      return () => container.removeEventListener('scroll', checkScrollButtons)
    }
  }, [tags]) // Re-check when tags change

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      })
    }
  }

  // Handle tag click
  const handleTagClick = (tag: { label: string; slug: string }) => {
    if (destinationSlug) {
      // On destination page, tags are for filtering/search (future feature)
      // For now, we can just scroll to top or trigger a search
      console.log('Tag clicked:', tag.label)
    } else {
      // On main page, navigate to destination
      router.push(`/tour-search-10/${tag.slug}`)
    }
  }

  // Don't render if no tags
  if (tags.length === 0) {
    return null
  }

  return (
    <div className={`relative ${className}`}>
      {/* Left Scroll Button */}
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-md hover:bg-white hover:shadow-lg transition-all flex items-center justify-center group"
          aria-label="เลื่อนซ้าย"
        >
          <svg
            className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Right Scroll Button */}
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-md hover:bg-white hover:shadow-lg transition-all flex items-center justify-center group"
          aria-label="เลื่อนขวา"
        >
          <svg
            className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Tags Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide py-2 px-1"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {tags.map((tag, index) => (
          <button
            key={index}
            onClick={() => handleTagClick(tag)}
            className="flex-shrink-0 inline-flex items-center justify-center px-3 py-1 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm font-medium text-[#019dff] hover:bg-[#e6f7ff] hover:border-[#019dff] hover:text-[#0187e6] transition-all duration-200 whitespace-nowrap shadow-sm focus:outline-none h-7"
          >
            {tag.label}
          </button>
        ))}
      </div>

      {/* Custom scrollbar hide styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
