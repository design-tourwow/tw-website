'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface PromotionItem {
  id: string
  image: string
  title: string
  link: string
}

const promotions: PromotionItem[] = [
  {
    id: '1',
    image: '/images/hot-promotion/obtvnfd00390.jpg',
    title: 'โปรโมชั่นพิเศษ ทัวร์ญี่ปุ่น',
    link: '/promotion/japan-special'
  },
  {
    id: '2', 
    image: '/images/hot-promotion/tour_3431766643839.jpg',
    title: 'ทัวร์เกาหลี ราคาพิเศษ',
    link: '/promotion/korea-deal'
  },
  {
    id: '3',
    image: '/images/hot-promotion/tpro260037.webp', 
    title: 'ทัวร์ยุโรป โปรโมชั่นสุดคุ้ม',
    link: '/promotion/europe-promo'
  },
  {
    id: '4',
    image: '/images/hot-promotion/294077.jpg',
    title: 'ทัวร์เวียดนาม ราคาดี',
    link: '/promotion/vietnam-offer'
  },
  {
    id: '5',
    image: '/images/hot-promotion/596819.jpg',
    title: 'ทัวร์สิงคโปร์ โปรสุดพิเศษ',
    link: '/promotion/singapore-special'
  },
  {
    id: '6',
    image: '/images/hot-promotion/566000009632802.webp',
    title: 'ทัวร์ไต้หวัน ราคาโปรโมชั่น',
    link: '/promotion/taiwan-deal'
  }
]

export default function HotPromotionBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Banner auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === promotions.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000) // 5 seconds

    return () => clearInterval(interval)
  }, [])

  const handlePromotionClick = (link: string) => {
    // Handle promotion click - could navigate to promotion page
    console.log('Clicked promotion:', link)
    // window.open(link, '_blank') // or use Next.js router
  }

  return (
    <div className="w-full mb-6">
      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">โปรไฟไหม้</h2>
        
        {/* Fire Emoji - Same for all devices */}
        <span 
          className="text-xl sm:text-2xl lg:fire-gradient-animation"
        >
          🔥
        </span>
      </div>
      
      {/* CSS Animation for Desktop Fire Emoji */}
      <style jsx>{`
        @media (min-width: 1024px) {
          .lg\\:fire-gradient-animation {
            background: linear-gradient(45deg, #ff4c0d, #fc9502, #fce202, #ff6b35);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: fireGradient 3s ease-in-out infinite;
          }
        }
        
        @keyframes fireGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      </div>
      {/* Desktop: 2 rows (vertical stack) */}
      <div className="hidden lg:block space-y-4">
        {/* First Row */}
        <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg cursor-pointer">
          <div 
            className="relative w-full h-full transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`
            }}
          >
            <div className="flex w-full h-full">
              {promotions.map((promotion) => (
                <div
                  key={`row1-${promotion.id}`}
                  className="relative w-full h-full flex-shrink-0"
                  onClick={() => handlePromotionClick(promotion.link)}
                >
                  <Image
                    src={promotion.image}
                    alt={promotion.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 256px"
                  />
                  {/* Brightness overlay on hover */}
                  <div className="absolute inset-0 bg-white/0 hover:bg-white/10 transition-all duration-500 ease-out"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Row - offset by 1 */}
        <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg cursor-pointer">
          <div 
            className="relative w-full h-full transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${((currentIndex + 1) % promotions.length) * 100}%)`
            }}
          >
            <div className="flex w-full h-full">
              {promotions.map((promotion) => (
                <div
                  key={`row2-${promotion.id}`}
                  className="relative w-full h-full flex-shrink-0"
                  onClick={() => handlePromotionClick(promotion.link)}
                >
                  <Image
                    src={promotion.image}
                    alt={promotion.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 256px"
                  />
                  {/* Brightness overlay on hover */}
                  <div className="absolute inset-0 bg-white/0 hover:bg-white/10 transition-all duration-500 ease-out"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: 1 row */}
      <div className="lg:hidden">
        <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg cursor-pointer">
          <div 
            className="relative w-full h-full transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`
            }}
          >
            <div className="flex w-full h-full">
              {promotions.map((promotion) => (
                <div
                  key={`mobile-${promotion.id}`}
                  className="relative w-full h-full flex-shrink-0"
                  onClick={() => handlePromotionClick(promotion.link)}
                >
                  <Image
                    src={promotion.image}
                    alt={promotion.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  {/* Brightness overlay on hover */}
                  <div className="absolute inset-0 bg-white/0 hover:bg-white/10 transition-all duration-500 ease-out"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-3" style={{ gap: '8px' }}>
        {promotions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-[#019dff]' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            style={{
              width: '8px',
              height: '8px',
              transform: index === currentIndex ? 'scale(1.5)' : 'scale(1)',
              minWidth: '8px',
              minHeight: '8px'
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}