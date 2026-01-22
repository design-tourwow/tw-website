'use client'

import Link from 'next/link'
import Image from 'next/image'

interface Destination {
  name: string
  tag: string
  image: string
}

const destinations: Destination[] = [
  {
    name: 'โตเกียว',
    tag: 'ทัวร์โตเกียว',
    image: '/images/countries-image/Depositphotos_29211759_XL.jpg'
  },
  {
    name: 'ชินไซบาชิ',
    tag: 'ทัวร์โอซาก้า',
    image: '/images/countries-image/Depositphotos_253336082_XL.jpg'
  },
  {
    name: 'เกียวโต',
    tag: 'ทัวร์เกียวโต',
    image: '/images/countries-image/Depositphotos_190490760_XL.jpg'
  },
  {
    name: 'เกียวโต',
    tag: 'ทัวร์เกียวโต',
    image: '/images/countries-image/Depositphotos_184117898_XL.jpg'
  },
  {
    name: 'นารา',
    tag: 'ทัวร์นารา',
    image: '/images/countries-image/Depositphotos_152336482_XL.jpg'
  },
  {
    name: 'ดิสนีย์แลนด์',
    tag: 'ทัวร์โตเกียวดิสนีย์แลนด์',
    image: '/images/countries-image/Depositphotos_226695298_XL.jpg'
  },
  {
    name: 'เทศกาลปีใหม่',
    tag: 'ทัวร์ญี่ปุ่น ปีใหม่',
    image: '/images/countries-image/Depositphotos_312361978_XL.jpg'
  },
  {
    name: 'ฮิโรชิมา',
    tag: 'ทัวร์ฮิโรชิมา',
    image: '/images/countries-image/Depositphotos_313838848_XL.jpg'
  },
  {
    name: 'ภูเขาไฟฟูจิ',
    tag: 'ทัวร์ภูเขาไฟฟูจิ',
    image: '/images/countries-image/Depositphotos_441586420_XL.jpg'
  },
  {
    name: 'ยูนิเวอร์แซล',
    tag: 'ทัวร์ญี่ปุ่น ยูนิเวอร์แซล',
    image: '/images/countries-image/Depositphotos_575957902_XL.jpg'
  },
  {
    name: 'ฮอกไกโด',
    tag: 'ทัวร์ฮอกไกโด',
    image: '/images/countries-image/Depositphotos_230120794_XL.jpg'
  }
]

export default function PopularDestinations() {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          ทัวร์ญี่ปุ่น ยอดนิยม
        </h2>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {destinations.map((destination) => (
          <Link
            key={destination.tag}
            href={`/tour-search-6?tag=${destination.tag}`}
            className="group flex-shrink-0 relative w-36 h-28 sm:w-40 sm:h-32 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {/* Background Image */}
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110 brightness-90 group-hover:brightness-100"
              sizes="(max-width: 640px) 144px, 160px"
            />

            {/* Light Overlay - เบาๆ เพื่อให้เห็นรูปชัด */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent group-hover:from-black/30 transition-all duration-300" />

            {/* Text Content */}
            <div className="absolute inset-0 flex items-end p-3">
              <div className="w-full">
                <h3 className="text-white font-bold text-base sm:text-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  {destination.name}
                </h3>
              </div>
            </div>

            {/* Shine Effect on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
