'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

interface Destination {
  name: string
  tag: string
  image: string
  size: 'medium' | 'large'
  description: string
}

const destinations: Destination[] = [
  // คอลัมน์ 1: large + 3 medium = 9 rows
  {
    name: 'โตเกียว',
    tag: 'ทัวร์โตเกียว',
    image: '/images/countries-image/Depositphotos_29211759_XL.jpg',
    size: 'large',
    description: 'เมืองหลวงแห่งความทันสมัย'
  },
  {
    name: 'ชินไซบาชิ',
    tag: 'ทัวร์โอซาก้า',
    image: '/images/countries-image/Depositphotos_253336082_XL.jpg',
    size: 'medium',
    description: 'สวรรค์ช้อปปิ้งและอาหาร'
  },
  {
    name: 'เกียวโต',
    tag: 'ทัวร์เกียวโต',
    image: '/images/countries-image/Depositphotos_190490760_XL.jpg',
    size: 'medium',
    description: 'เมืองโบราณแห่งวัฒนธรรม'
  },
  {
    name: 'นารา',
    tag: 'ทัวร์นารา',
    image: '/images/countries-image/Depositphotos_152336482_XL.jpg',
    size: 'medium',
    description: 'พบกับกวางน่ารัก'
  },
  // คอลัมน์ 2: large + 3 medium = 9 rows
  {
    name: 'ภูเขาไฟฟูจิ',
    tag: 'ทัวร์ภูเขาไฟฟูจิ',
    image: '/images/countries-image/Depositphotos_441586420_XL.jpg',
    size: 'large',
    description: 'ภูเขาศักดิ์สิทธิ์'
  },
  {
    name: 'ฮิโรชิมา',
    tag: 'ทัวร์ฮิโรชิมา',
    image: '/images/countries-image/Depositphotos_313838848_XL.jpg',
    size: 'medium',
    description: 'เมืองแห่งสันติภาพ'
  },
  {
    name: 'ยูนิเวอร์แซล',
    tag: 'ทัวร์ญี่ปุ่น ยูนิเวอร์แซล',
    image: '/images/countries-image/Depositphotos_575957902_XL.jpg',
    size: 'medium',
    description: 'สวนสนุกระดับโลก'
  },
  {
    name: 'ไหว้พระขอพร',
    tag: 'ทัวร์ญี่ปุ่น ไหว้พระ',
    image: '/images/countries-image/Depositphotos_201691480_XL.jpg',
    size: 'medium',
    description: 'เสริมสิริมงคล'
  },
  // คอลัมน์ 3: large + 3 medium = 9 rows
  {
    name: 'ฮอกไกโด',
    tag: 'ทัวร์ฮอกไกโด',
    image: '/images/countries-image/Depositphotos_230120794_XL.jpg',
    size: 'large',
    description: 'เกาะทางเหนือที่สวยงาม'
  },
  {
    name: 'ดิสนีย์แลนด์',
    tag: 'ทัวร์โตเกียวดิสนีย์แลนด์',
    image: '/images/countries-image/Depositphotos_226695298_XL.jpg',
    size: 'medium',
    description: 'สวนสนุกในฝัน'
  },
  {
    name: 'เทศกาลปีใหม่',
    tag: 'ทัวร์ญี่ปุ่น ปีใหม่',
    image: '/images/countries-image/Depositphotos_312361978_XL.jpg',
    size: 'medium',
    description: 'ฉลองปีใหม่แบบญี่ปุ่น'
  },
  {
    name: 'วัฒนธรรมญี่ปุ่น',
    tag: 'ทัวร์เกียวโต',
    image: '/images/countries-image/Depositphotos_184117898_XL.jpg',
    size: 'medium',
    description: 'วัฒนธรรมดั้งเดิม'
  }
]

export default function PopularDestinations() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const getGridRowSpan = (size: string) => {
    switch (size) {
      case 'medium': return 'row-span-2'
      case 'large': return 'row-span-3'
      default: return 'row-span-2'
    }
  }

  return (
    <>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <div className="mb-12">
        {/* Header */}
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
        <div className="sm:hidden flex gap-4 overflow-x-auto pb-4 px-4 snap-x snap-mandatory hide-scrollbar">
          {destinations.slice(0, 6).map((destination, index) => (
            <Link
              key={index}
              href={`/tour-search-8?tag=${destination.tag}`}
              className="group flex-shrink-0 w-56 snap-start"
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

        {/* Desktop: Masonry Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[100px]">
          {destinations.map((destination, index) => (
            <Link
              key={index}
              href={`/tour-search-8?tag=${destination.tag}`}
              className={`group relative ${getGridRowSpan(destination.size)} overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`
              }}
            >
              <div className="absolute inset-0">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className={`object-cover transition-all duration-500 ${
                    hoveredIndex === index ? 'scale-105' : 'scale-100'
                  }`}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
                  priority={index < 6}
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-bold text-xl drop-shadow-lg mb-1.5">
                  {destination.name}
                </h3>
                <p className="text-white/90 text-sm drop-shadow-md">
                  {destination.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
