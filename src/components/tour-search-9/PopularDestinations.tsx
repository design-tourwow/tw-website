'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function PopularDestinations() {
  const destinations = [
    {
      name: 'ทัวร์โตเกียว',
      tours: 156,
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&h=600&fit=crop&auto=format&q=90', // Tokyo cityscape
      slug: 'tokyo'
    },
    {
      name: 'ทัวร์โอซาก้า',
      tours: 142,
      image: 'https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?w=800&h=600&fit=crop&auto=format&q=90', // Osaka Castle
      slug: 'osaka'
    },
    {
      name: 'ทัวร์ฮอกไกโด',
      tours: 98,
      image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop&auto=format&q=90', // Japan winter snow scene
      slug: 'hokkaido'
    },
    {
      name: 'ทัวร์เกียวโต',
      tours: 134,
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop&auto=format&q=90', // Kyoto temple
      slug: 'kyoto'
    },
    {
      name: 'ทัวร์ญี่ปุ่น ปีใหม่',
      tours: 187,
      image: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&h=600&fit=crop&auto=format&q=90', // Japanese temple winter
      slug: 'new-year'
    },
    {
      name: 'ทัวร์ญี่ปุ่น สงกรานต์',
      tours: 165,
      image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&h=600&fit=crop&auto=format&q=90', // Cherry blossom with Mt. Fuji (April)
      slug: 'songkran'
    },
    {
      name: 'ทัวร์ญี่ปุ่น ชมซากุระ',
      tours: 203,
      image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&h=600&fit=crop&auto=format&q=90', // Mt. Fuji with cherry blossom
      slug: 'sakura'
    },
    {
      name: 'ทัวร์ญี่ปุ่น ใบไม้เปลี่ยนสี',
      tours: 121,
      image: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&h=600&fit=crop&auto=format&q=90', // Autumn leaves
      slug: 'autumn'
    },
    {
      name: 'ทัวร์ฟูจิ',
      tours: 89,
      image: 'https://images.unsplash.com/photo-1576675784201-0e142b423952?w=800&h=600&fit=crop&auto=format&q=90', // Mt. Fuji
      slug: 'fuji'
    },
    {
      name: 'ทัวร์นาโกย่า',
      tours: 76,
      image: 'https://images.unsplash.com/photo-1555400082-6b3d6d4a1f8b?w=800&h=600&fit=crop&auto=format&q=90', // Nagoya
      slug: 'nagoya'
    }
  ]

  const popularTags = [
    'ทัวร์ญี่ปุ่นราคาถูก',
    'ทัวร์โตเกียว',
    'ทัวร์โตเกียวดิสนีย์แลนด์',
    'ทัวร์ฮอกไกโด',
    'ทัวร์โอซาก้า',
    'ทัวร์โตเกียวโอซาก้า',
    'ทัวร์เกียวโต',
    'ทัวร์นาโกย่า',
    'ทัวร์ทาคายาม่า',
    'ทัวร์ญี่ปุ่น ยูนิเวอร์แซล',
    'ทัวร์ฟุกุโอกะ',
    'ทัวร์ญี่ปุ่น การบินไทย',
    'ทัวร์ญี่ปุ่น เมษายน',
    'ทัวร์ญี่ปุ่น สงกรานต์',
    'ทัวร์ญี่ปุ่น ปีใหม่',
    'ทัวร์ญี่ปุ่นซากุระ',
    'ทัวร์ญี่ปุ่นอิสระ',
    'ทัวร์ญี่ปุ่น 5 ดาว',
    'ทัวร์ฮาคุบะ',
    'ทัวร์คามิโคจิ',
    'ทัวร์ฮอกไกโด การบินไทย',
    'ทัวร์เซนได',
    'ทัวร์โอกินาว่า',
    'ทัวร์กำแพงหิมะ ญี่ปุ่น',
    'ทัวร์ชิราคาวาโกะ'
  ]

  return (
    <section className="mt-2 mb-4 sm:mb-6">
      {/* Image Cards - Hidden for now */}
      {/* <div className="flex gap-3 overflow-x-auto pb-2 pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
        {destinations.map((destination) => (
          <Link
            key={destination.slug}
            href={`/tour-search-1?destination=${destination.slug}`}
            className="group relative flex-shrink-0 w-40 aspect-[3/4] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="160px"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-2.5 text-white">
              <h3 className="font-bold text-sm mb-0.5 leading-tight">{destination.name}</h3>
              <p className="text-xs text-white/90">{destination.tours} ทัวร์</p>
            </div>

            <div className="absolute inset-0 bg-[#019dff]/0 group-hover:bg-[#019dff]/10 transition-colors duration-300" />
          </Link>
        ))}
      </div> */}

      {/* Popular Tags */}
      <div className="mt-3 sm:mt-4">
        <div 
          className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 pr-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {popularTags.map((tag, index) => (
            <Link
              key={index}
              href={`/tour-search-9?tag=${tag}`}
              className="flex-shrink-0 inline-flex items-center justify-center px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-500 hover:bg-[#e6f7ff] hover:border-blue-300 hover:text-[#0187e6] transition-all duration-200 whitespace-nowrap"
            >
              {tag}
            </Link>
          ))}
        </div>
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  )
}
