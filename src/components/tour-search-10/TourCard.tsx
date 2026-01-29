'use client'

import { TourData } from '@/lib/tour-data-search'
import Link from 'next/link'

interface TourCardProps {
  tour: TourData
  cardId?: string
}

// Generate extended title: ทัวร์[ประเทศ] [เมือง] [ไฮไลท์] [จำนวนวัน]
function generateExtendedTitle(tour: TourData): string {
  // Extract cities from original title (remove "ทัวร์", destination, and duration)
  let cities = tour.title
    .replace(/^ทัวร์/, '')
    .replace(tour.destination, '')
    .replace(tour.duration, '')
    .trim()

  // Get 1-2 highlights from features
  const highlights = tour.features.slice(0, 2).join(' ')

  // Build new title
  return `ทัวร์${tour.destination} ${cities} ${highlights} ${tour.duration}`
}

// Unique highlight paragraphs for each tour
const tourHighlights: Record<string, string> = {
  '1': 'พาชมซากุระบานสะพรั่งที่โอซาก้า ช้อปจุใจย่านชินจูกุ โตเกียว ฟินกับบุฟเฟ่ต์ขาปูยักษ์สดๆ จากทะเล พร้อมที่พักหรู 5 ดาวใจกลางเมือง',
  '2': 'หลงเสน่ห์ฮอกไกโดแดนหิมะขาว สัมผัสออนเซ็นน้ำแร่ธรรมชาติ ชมทุ่งลาเวนเดอร์สีม่วงสุดโรแมนติก ลิ้มรสอาหาร Kaiseki ระดับพรีเมียม',
  '3': 'ตื่นตากับ Gardens by the Bay สวนลอยฟ้าสุดล้ำ มันส์สุดเหวี่ยงที่ Universal Studios ช้อปแบรนด์เนมถูกกว่าไทยที่ Orchard Road',
  '4': 'ผจญภัยดินแดนซีกโลกตะวันออก ชมทะเลสาบ Big Almaty สีฟ้าใส ตะลุยภูเขาหิมะตระการตา สัมผัสวัฒนธรรม Silk Road อันเก่าแก่',
  '5': 'พักผ่อนริมหาดทรายขาวละเอียดที่สุดในเอเชีย ดำน้ำชมปะการังหลากสีสัน ปาร์ตี้ยามค่ำคืนสุดมันส์ รีสอร์ทติดทะเลวิวสวยปัง',
  '6': 'ตักบาตรข้าวเหนียวยามเช้าริมแม่น้ำโขง ชมเมืองมรดกโลกหลวงพระบาง น้ำตกกวางซีสีเทอควอยซ์สุดตระการตา สัมผัสวิถีล้านช้าง',
  '7': 'ชมพระอาทิตย์ขึ้นที่นครวัดมหาปราสาท 1 ใน 7 สิ่งมหัศจรรย์ของโลก สำรวจนครธมอารยธรรมเขมรโบราณ ตาพรหมปราสาทต้นไม้รกครึ้ม',
  '8': 'สนุกสุดเหวี่ยงกับดิสนีย์แลนด์ฮ่องกง นั่งกระเช้านองปิง 360 ชมวิวพระใหญ่ ช้อปจุใจย่านมงก๊ก ลิ้มรสติ่มซำเลิศรส',
  '9': 'สักการะวัดเบซากีห์ Mother Temple แห่งบาหลี ชมนาข้าวขั้นบันไดเตกัลลาลังสีเขียวสุดตา พักวิลล่าริมหาดส่วนตัว สปาบาหลีผ่อนคลาย',
  '10': 'ถ่ายรูปคู่ตึกแฝดเปโตรนาสสูงตระหง่าน เที่ยวถ้ำบาตูศาสนสถานศักดิ์สิทธิ์ ช้อปสตรีทฟู้ดจาลันอาลอร์ ราคาถูกใจ',
  '11': 'พักวิลล่าเหนือผืนน้ำสีฟ้าใสกระจ่าง ดำน้ำชมปะการังและปลาเขตร้อน สปาริมทะเลสุดโรแมนติก ดินเนอร์ใต้หมู่ดาวล้านดวง',
  '12': 'ช้อปเครื่องสำอางเกาหลีราคาถูกกว่าไทย ลิ้มรสไก่ทอดเกาหลีต้นตำรับ สัมผัส K-Culture ย่านฮงแด ชมพระราชวังเคียงบกกุง',
}

export default function TourCard({ tour, cardId }: TourCardProps) {
  const extendedTitle = generateExtendedTitle(tour)
  // Get unique highlight or fallback to features
  const highlightParagraph = tourHighlights[tour.id] || tour.features.join(' • ')
  // Hotel star rating (3 or 4 stars based on tour id)
  const hotelRating = parseInt(tour.id) % 2 === 0 ? 4 : 3
  return (
    <div data-card-id={cardId} className="w-full">
      <Link 
        href={`/tour-search-78/${tour.slug}`} 
        className="block group cursor-pointer w-full"
      >
      <div className="relative bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4">
        <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={tour.image}
              alt={tour.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            {/* Brightness overlay on hover */}
            <div className="absolute inset-0 bg-white/0 hover:bg-white/10 transition-all duration-500 ease-out"></div>
          </div>

          {/* Flight Info */}
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-20">
            <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-lg sm:rounded-xl shadow-xl overflow-hidden">
              <div className="flex items-stretch">
                <div className={`flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-1.5 sm:py-2 border-r ${tour.badgeColor === 'red' ? 'border-red-100' : 'border-[#e6f7ff]'}`}>
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${tour.badgeColor === 'red' ? 'from-red-400 to-rose-600' : 'from-[#019dff] to-[#019dff]'} rounded-full blur-md opacity-70`}></div>
                    <div className={`relative bg-gradient-to-br ${tour.badgeColor === 'red' ? 'from-red-500 to-rose-600' : 'from-[#019dff] to-[#0187e6]'} p-1.5 sm:p-2 rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center`}>
                      <svg className="transform rotate-45 scale-150 text-white" fill="currentColor" viewBox="0 0 24 24" style={{width: '28px', height: '28px'}}>
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wider mb-0 truncate">{tour.airline}</p>
                  </div>
                </div>
                <div className={`px-1.5 sm:px-2 py-1.5 sm:py-2 bg-gradient-to-r ${tour.badgeColor === 'red' ? 'from-red-50 to-rose-50' : 'from-[#e6f7ff] to-[#e6f7ff]'} flex flex-col justify-center`}>
                  <div className="flex items-center gap-1">
                    <svg className={`w-4 h-4 sm:w-5 sm:h-5 ${tour.badgeColor === 'red' ? 'text-red-900' : 'text-[#019dff]'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
                    </svg>
                    <p className={`text-sm sm:text-base font-bold ${tour.badgeColor === 'red' ? 'text-red-900' : 'text-[#019dff]'} whitespace-nowrap`}>{tour.duration}</p>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5">
                    <svg className={`w-4 h-4 sm:w-5 sm:h-5 ${tour.badgeColor === 'red' ? 'text-red-900' : 'text-[#019dff]'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 14c1.66 0 3-1.34 3-3S8.66 8 7 8s-3 1.34-3 3 1.34 3 3 3zm12-7h-8v8H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/>
                    </svg>
                    <span className="text-xs sm:text-sm font-medium text-gray-600">ที่พักระดับ</span>
                    <div className="flex text-yellow-400 text-sm sm:text-base">
                      {Array.from({ length: tour.rating }, (_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tour Code */}
          <div className="absolute top-0 right-0 z-20">
            <div className={`bg-gradient-to-bl ${tour.badgeColor === 'red' ? 'from-red-600 to-red-700' : 'from-[#019dff] to-[#0187e6]'} text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-bl-lg sm:rounded-bl-xl shadow-md`}>
              <p className="font-semibold tracking-wide text-[9px] sm:text-[10px]">{tour.code}</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white z-10">
            <div className="mb-1.5 sm:mb-2">
              <div className={`${tour.badgeColor === 'red' ? 'bg-red-600' : 'bg-[#019dff]'} text-white px-2.5 sm:px-3 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-bold inline-block shadow-lg`}>
                {tour.badgeText}
              </div>
            </div>

            <h3 className="font-bold mb-1 sm:mb-1.5 leading-tight drop-shadow-lg text-xl sm:text-2xl">
              {extendedTitle}
            </h3>

            <div className="mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
              <p className="drop-shadow-lg font-medium line-clamp-2">
                {highlightParagraph}
              </p>
            </div>

            <div className={`${tour.badgeColor === 'red' ? 'gradient-background-red' : 'gradient-background-blue'} backdrop-blur-sm rounded-lg p-2.5 sm:p-3`}>
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-1.5 sm:gap-2">
                    <span className="text-lg sm:text-xl font-bold">฿{tour.price.toLocaleString()}</span>
                    <span className="text-sm sm:text-base line-through opacity-70 font-medium">฿{tour.originalPrice.toLocaleString()}</span>
                  </div>
                  <span className="text-white font-bold text-sm sm:text-base inline-flex items-center justify-center gap-1 group hover:animate-none cursor-pointer drop-shadow-md">
                    <span>จองตอนนี้</span>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                    </svg>
                  </span>
                </div>
                <p className="text-xs sm:text-sm opacity-90 font-medium">ประหยัด ฿{tour.discount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
    </div>
  )
}
