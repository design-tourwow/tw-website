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
  },
  {
    name: 'ไหว้พระขอพร',
    tag: 'ทัวร์ญี่ปุ่น ไหว้พระ',
    image: '/images/countries-image/Depositphotos_201691480_XL.jpg'
  }
]

export default function PopularDestinations() {
  return (
    <div className="mb-8">
      {/* Elegant Header */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">ทัวร์ญี่ปุ่น ยอดนิยม</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
      </div>

      {/* Grid Layout - Masonry Style */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {destinations.map((destination, index) => (
          <Link
            key={`${destination.tag}-${index}`}
            href={`/tour-search-7?tag=${destination.tag}`}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300"
          >
            {/* Image with overlay */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 16vw"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Text overlay */}
              <div className="absolute inset-0 flex items-end p-4">
                <div className="w-full">
                  <h3 className="text-white font-bold text-base sm:text-lg leading-tight drop-shadow-lg mb-2">
                    {destination.name}
                  </h3>
                  
                  {/* Animated underline */}
                  <div className="h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
