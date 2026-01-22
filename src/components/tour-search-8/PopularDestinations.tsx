'use client'

import Link from 'next/link'
import Image from 'next/image'

interface Destination {
  name: string
  tag: string
  image: string
  height: number
  description: string
}

const destinations: Destination[] = [
  { name: 'โตเกียว', tag: 'ทัวร์โตเกียว', image: '/images/countries-image/Depositphotos_29211759_XL.jpg', height: 380, description: 'เมืองหลวงแห่งความทันสมัย' },
  { name: 'ภูเขาไฟฟูจิ', tag: 'ทัวร์ภูเขาไฟฟูจิ', image: '/images/countries-image/Depositphotos_441586420_XL.jpg', height: 240, description: 'ภูเขาศักดิ์สิทธิ์' },
  { name: 'ดิสนีย์แลนด์', tag: 'ทัวร์โตเกียวดิสนีย์แลนด์', image: '/images/countries-image/Depositphotos_226695298_XL.jpg', height: 280, description: 'สวนสนุกในฝัน' },
  { name: 'ชินไซบาชิ', tag: 'ทัวร์โอซาก้า', image: '/images/countries-image/Depositphotos_253336082_XL.jpg', height: 220, description: 'สวรรค์ช้อปปิ้งและอาหาร' },
  { name: 'ฮอกไกโด', tag: 'ทัวร์ฮอกไกโด', image: '/images/countries-image/Depositphotos_230120794_XL.jpg', height: 340, description: 'เกาะทางเหนือที่สวยงาม' },
  { name: 'เกียวโต', tag: 'ทัวร์เกียวโต', image: '/images/countries-image/Depositphotos_190490760_XL.jpg', height: 260, description: 'เมืองโบราณแห่งวัฒนธรรม' },
  { name: 'นารา', tag: 'ทัวร์นารา', image: '/images/countries-image/Depositphotos_152336482_XL.jpg', height: 300, description: 'พบกับกวางน่ารัก' },
  { name: 'ยูนิเวอร์แซล', tag: 'ทัวร์ญี่ปุ่น ยูนิเวอร์แซล', image: '/images/countries-image/Depositphotos_575957902_XL.jpg', height: 280, description: 'สวนสนุกระดับโลก' },
  { name: 'วัฒนธรรมญี่ปุ่น', tag: 'ทัวร์เกียวโต', image: '/images/countries-image/Depositphotos_184117898_XL.jpg', height: 260, description: 'วัฒนธรรมดั้งเดิม' },
]

export default function PopularDestinations() {
  return (
    <div className="mb-12">
      <style jsx>{`
        .masonry-container {
          column-count: 3;
          column-gap: 1rem;
        }
        @media (max-width: 1023px) {
          .masonry-container {
            column-count: 2;
          }
        }
        @media (max-width: 639px) {
          .masonry-container {
            column-count: 1;
          }
        }
        .masonry-item {
          break-inside: avoid;
          margin-bottom: 1rem;
          display: inline-block;
          width: 100%;
        }
      `}</style>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-blue-600 rounded-xl shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              ทัวร์ญี่ปุ่น ยอดนิยม
            </h2>
            <p className="text-sm text-gray-600 mt-1">สำรวจจุดหมายปลายทางที่น่าสนใจ</p>
          </div>
        </div>
      </div>

      {/* Mobile: Horizontal Scroll */}
      <div className="sm:hidden flex gap-4 overflow-x-auto pb-4 px-4">
        {destinations.slice(0, 6).map((destination, index) => (
          <Link
            key={index}
            href={`/tour-search-8?tag=${destination.tag}`}
            className="group flex-shrink-0 w-56"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-105"
                  sizes="224px"
                  priority={index < 4}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-bold text-xl drop-shadow-lg mb-1">
                    {destination.name}
                  </h3>
                  <p className="text-white/90 text-sm drop-shadow-md">
                    {destination.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop: Masonry Layout with CSS Columns */}
      <div className="hidden sm:block masonry-container">
        {destinations.map((destination, index) => (
          <div key={index} className="masonry-item">
            <Link
              href={`/tour-search-8?tag=${destination.tag}`}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 block"
              style={{ height: `${destination.height}px` }}
            >
              <div className="absolute inset-0">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 6}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 group-hover:via-black/10 transition-all duration-500" />
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-bold text-xl drop-shadow-lg mb-1.5">
                  {destination.name}
                </h3>
                <p className="text-white/90 text-sm drop-shadow-md">
                  {destination.description}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
