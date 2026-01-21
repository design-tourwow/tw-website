'use client'

export const dynamic = 'force-dynamic'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import {
  Search, Filter, X, MapPin, Calendar, Star, TrendingUp,
  ChevronDown, ArrowUp, MessageCircle, Phone, Sparkles,
  Users, Clock, Gift, Zap, Globe, Heart
} from 'lucide-react'

const TourSearch64 = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [globalTime, setGlobalTime] = useState(Date.now())
  const [smartPreviewCard, setSmartPreviewCard] = useState(null)
  const [smartPreviewCard2, setSmartPreviewCard2] = useState(null)
  const [smartPreviewCard3, setSmartPreviewCard3] = useState(null)
  const [smartPreviewCard5, setSmartPreviewCard5] = useState(null)
  const [closingCard2, setClosingCard2] = useState(false)
  const [closingCard3, setClosingCard3] = useState(false)
  const [closingCard5, setClosingCard5] = useState(false)
  const [card2Dismissed, setCard2Dismissed] = useState(false)
  const [card3Dismissed, setCard3Dismissed] = useState(false)
  const [card5Dismissed, setCard5Dismissed] = useState(false)
  const [viewerCount, setViewerCount] = useState(0)
  const [viewerCountAnimate, setViewerCountAnimate] = useState(false)
  const [viewerIncrement, setViewerIncrement] = useState(0)
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)
  const [videoProgress, setVideoProgress] = useState(0)
  const [selectedDateIndex, setSelectedDateIndex] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentSlideHero1, setCurrentSlideHero1] = useState(0)
  const [autoScrollStoppedHero1, setAutoScrollStoppedHero1] = useState(false)
  const [autoScrollStoppedHero2, setAutoScrollStoppedHero2] = useState(false)
  const heroScrollRef = useRef<HTMLDivElement>(null)
  const hero1ScrollRef = useRef<HTMLDivElement>(null)

  const HERO_CARDS_COUNT = 2 // จำนวนการ์ดจริงของแต่ละ Hero Banner

  // Auto-scroll for Hero Banner 1
  useEffect(() => {
    if (autoScrollStoppedHero1) return

    const interval = setInterval(() => {
      setCurrentSlideHero1((prev) => prev + 1)
    }, 10000) // 10 seconds

    return () => clearInterval(interval)
  }, [autoScrollStoppedHero1])

  // Reset Hero Banner 1 เมื่อถึงการ์ด duplicate
  useEffect(() => {
    if (currentSlideHero1 === HERO_CARDS_COUNT) {
      const timer = setTimeout(() => {
        if (hero1ScrollRef.current) {
          hero1ScrollRef.current.style.transition = 'none'
          setCurrentSlideHero1(0)
          setTimeout(() => {
            if (hero1ScrollRef.current) {
              hero1ScrollRef.current.style.transition = 'transform 500ms ease-out'
            }
          }, 50)
        }
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [currentSlideHero1])

  // Auto-scroll for Hero Banner 2
  useEffect(() => {
    if (autoScrollStoppedHero2) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1)
    }, 10000) // 10 seconds

    return () => clearInterval(interval)
  }, [autoScrollStoppedHero2])

  // Reset Hero Banner 2 เมื่อถึงการ์ด duplicate
  useEffect(() => {
    if (currentSlide === HERO_CARDS_COUNT) {
      const timer = setTimeout(() => {
        if (heroScrollRef.current) {
          heroScrollRef.current.style.transition = 'none'
          setCurrentSlide(0)
          setTimeout(() => {
            if (heroScrollRef.current) {
              heroScrollRef.current.style.transition = 'transform 500ms ease-out'
            }
          }, 50)
        }
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [currentSlide])

  const tourDates = [
    { period: '15-19 ธ.ค.', price: 79888, originalPrice: 95900, discount: 16012 },
    { period: '22-26 ธ.ค.', price: 89888, originalPrice: 109900, discount: 20012 },
    { period: '29 ธ.ค.-2 ม.ค.', price: 95888, originalPrice: 119900, discount: 24012 },
    { period: '5-9 ม.ค.', price: 72888, originalPrice: 92900, discount: 20012 },
    { period: '12-16 ม.ค.', price: 72888, originalPrice: 92900, discount: 20012 }
  ]

  const destinations = [
    {
      title: 'ทัวร์นิวยอร์ก 5 วัน 3 คืน',
      image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&h=1200&fit=crop&auto=format',
      airline: '/icons/airlines/united-airlines.svg',
      airlineName: 'United Airlines',
      features: [
        'ชมอนุสาวรีย์เทพีเสรีภาพ ไอคอนของอเมริกา',
        'เที่ยว Times Square ช้อปจุใจ 5th Avenue',
        'ชมวิวมหานคร จาก Empire State Building'
      ],
      seatsLeft: 5
    },
    {
      title: 'ทัวร์ปารีส 6 วัน 4 คืน',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=1200&fit=crop&auto=format',
      airline: '/icons/airlines/emirates-airlines.svg',
      airlineName: 'Emirates Airlines',
      features: [
        'ชมหอไอเฟล สัญลักษณ์แห่งเมืองแสงไฟ',
        'เที่ยวพิพิธภัณฑ์ลูฟร์ ชมโมนาลิซ่า',
        'ล่องเรือแม่น้ำแซน ชมปารีสยามค่ำคืน'
      ],
      seatsLeft: 3
    },
    {
      title: 'ทัวร์โตเกียว 5 วัน 3 คืน',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=1200&fit=crop&auto=format',
      airline: '/icons/airlines/japan-airlines.svg',
      airlineName: 'Japan Airlines',
      features: [
        'ชมภูเขาไฟฟูจิ สัญลักษณ์ของญี่ปุ่น',
        'เที่ยวย่านชิบูย่า ฮาราจูกุ ช้อปจุใจ',
        'ชิมอาหารญี่ปุ่นต้นตำรับ ที่ Tsukiji Market'
      ],
      seatsLeft: 8
    },
    {
      title: 'ทัวร์ลอนดอน 6 วัน 4 คืน',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=1200&fit=crop&auto=format',
      airline: '/icons/airlines/singapore-airlines.svg',
      airlineName: 'Singapore Airlines',
      features: [
        'ชม Big Ben และ London Eye ริมแม่น้ำเทมส์',
        'เที่ยววัง Buckingham รับชมพิธีเปลี่ยนยาม',
        'ช้อปปิ้งที่ Oxford Street และ Harrods'
      ],
      seatsLeft: 4
    },
    {
      title: 'ทัวร์โรม 7 วัน 5 คืน',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=1200&fit=crop&auto=format',
      airline: '/icons/airlines/turkish-airlines.svg',
      airlineName: 'Turkish Airlines',
      features: [
        'ชม Colosseum สนามกีฬาโบราณ',
        'เที่ยว Vatican City ชมโบสถ์ St. Peter',
        'โยนเหรียญที่น้ำพุ Trevi Fountain'
      ],
      seatsLeft: 6
    },
    {
      title: 'ทัวร์ซิดนีย์ 6 วัน 4 คืน',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=1200&fit=crop&auto=format',
      airline: '/icons/airlines/qantas.svg',
      airlineName: 'Qantas Airways',
      features: [
        'ชม Sydney Opera House ไอคอนของออสเตรเลีย',
        'เดินชม Harbour Bridge และ Circular Quay',
        'เที่ยวชายหาด Bondi Beach สุดชิล'
      ],
      seatsLeft: 7
    },
    {
      title: 'ทัวร์เกาหลี 5 วัน 3 คืน',
      image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=1200&fit=crop&auto=format',
      airline: '/icons/airlines/asiana-airlines.svg',
      airlineName: 'Asiana Airlines',
      features: [
        'เที่ยว Namsan Tower ชมวิวกรุงโซลมุมสูง',
        'ช้อปปิ้งที่ Myeongdong และ Gangnam',
        'ชิมบุฟเฟ่ต์ BBQ เกาหลีแท้ๆ'
      ],
      seatsLeft: 2
    }
  ]
  const [scrollY, setScrollY] = useState(0)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLIFrameElement | null)[]>([])
  const videoIds = ['CzNjGx3-_YY', 'w1Z5dOcyi7w', 'itwXOthv-MA', 'EZFIWyaZxqs', 'x-juOxrHmUE']

  // Base countdown times (in seconds from now)
  const baseCountdowns = {
    countdown1: { totalSeconds: 2 * 3600 + 35 * 60 + 41 },
    countdown2: { totalSeconds: 1 * 3600 + 47 * 60 + 23 },
    countdown5: { totalSeconds: 3 * 3600 + 12 * 60 + 18 },
    countdown7: { totalSeconds: 4 * 3600 + 25 * 60 + 33 },
    countdown9: { totalSeconds: 2 * 3600 + 8 * 60 + 47 },
    countdown11: { totalSeconds: 1 * 3600 + 55 * 60 + 29 },
    countdown14: { totalSeconds: 3 * 3600 + 18 * 60 + 52 }
  }

  // Calculate current countdowns based on global time
  const getCountdown = (baseSeconds) => {
    const elapsed = Math.floor((Date.now() - globalTime) / 1000)
    const remaining = Math.max(0, baseSeconds - elapsed)
    return {
      hours: Math.floor(remaining / 3600),
      minutes: Math.floor((remaining % 3600) / 60),
      seconds: remaining % 60
    }
  }

  const countdown1 = getCountdown(baseCountdowns.countdown1.totalSeconds)
  const countdown2 = getCountdown(baseCountdowns.countdown2.totalSeconds)
  const countdown5 = getCountdown(baseCountdowns.countdown5.totalSeconds)
  const countdown7 = getCountdown(baseCountdowns.countdown7.totalSeconds)
  const countdown9 = getCountdown(baseCountdowns.countdown9.totalSeconds)
  const countdown11 = getCountdown(baseCountdowns.countdown11.totalSeconds)
  const countdown14 = getCountdown(baseCountdowns.countdown14.totalSeconds)

  // Single global timer for all countdowns and carousel
  useEffect(() => {
    const interval = setInterval(() => {
      // Update global time for countdowns
      setGlobalTime(Date.now())

      // Update carousel every 5 seconds
      if (Math.floor(Date.now() / 1000) % 5 === 0) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 2)
      }
    }, 1000) // Update every second

    return () => clearInterval(interval)
  }, [])


  // Update carousel indicators and visibility
  useEffect(() => {
    // Handle Card 1 carousel
    const carouselItems1 = document.querySelectorAll('.carousel-item-1')

    carouselItems1.forEach((item, index) => {
      if (index === currentImageIndex) {
        item.classList.remove('opacity-0')
        item.classList.add('opacity-100')
      } else {
        item.classList.remove('opacity-100')
        item.classList.add('opacity-0')
      }
    })

    // Handle Card 2 carousel
    const carouselItems2 = document.querySelectorAll('.carousel-item-2')

    carouselItems2.forEach((item, index) => {
      if (index === currentImageIndex) {
        item.classList.remove('opacity-0')
        item.classList.add('opacity-100')
      } else {
        item.classList.remove('opacity-100')
        item.classList.add('opacity-0')
      }
    })

  }, [currentImageIndex])

  // Smart Preview - View Duration Tracking for Card 1
  useEffect(() => {
    const observerOptions = {
      threshold: 1.0, // 100% visible
      rootMargin: '0px'
    }

    const cardTimers = new Map()

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const cardId = entry.target.getAttribute('data-card-id')

        if (cardId === 'card-1') {
          if (entry.isIntersecting && entry.intersectionRatio === 1.0) {
            // Card is 100% visible, start timer
            const timer = setTimeout(() => {
              setSmartPreviewCard(cardId)
            }, 5000) // 5 seconds

            cardTimers.set(cardId, timer)
          } else {
            // Card is not fully visible, clear timer
            const timer = cardTimers.get(cardId)
            if (timer) {
              clearTimeout(timer)
              cardTimers.delete(cardId)
            }

            // Hide smart preview if this card was showing it
            if (smartPreviewCard === cardId) {
              setSmartPreviewCard(null)
            }
          }
        }
      })
    }, observerOptions)

    // Observe only card-1
    const card1 = document.querySelector('[data-card-id="card-1"]')
    if (card1) observer.observe(card1)

    return () => {
      // Cleanup
      observer.disconnect()
      cardTimers.forEach(timer => clearTimeout(timer))
      cardTimers.clear()
    }
  }, [smartPreviewCard])

  // Smart Preview - View Duration Tracking for Card 2 (Separate)
  useEffect(() => {
    const observerOptions = {
      threshold: 1.0, // 100% visible
      rootMargin: '0px'
    }

    const cardTimers = new Map()

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const cardId = entry.target.getAttribute('data-card-id')

        if (cardId === 'card-2') {
          if (entry.isIntersecting && entry.intersectionRatio === 1.0) {
            // Card is 100% visible, start timer only if not dismissed
            if (!card2Dismissed) {
              const timer = setTimeout(() => {
                setSmartPreviewCard2(cardId)
              }, 5000) // 5 seconds

              cardTimers.set(cardId, timer)
            }
          } else {
            // Card is not fully visible, clear timer
            const timer = cardTimers.get(cardId)
            if (timer) {
              clearTimeout(timer)
              cardTimers.delete(cardId)
            }

            // Hide smart preview if this card was showing it
            if (smartPreviewCard2 === cardId) {
              closeSmartPreviewCard2()
            }

            // Reset dismissed flag when card completely leaves viewport
            if (card2Dismissed) {
              setCard2Dismissed(false)
            }
          }
        }
      })
    }, observerOptions)

    // Observe only card-2
    const card2 = document.querySelector('[data-card-id="card-2"]')
    if (card2) observer.observe(card2)

    return () => {
      // Cleanup
      observer.disconnect()
      cardTimers.forEach(timer => clearTimeout(timer))
      cardTimers.clear()
    }
  }, [smartPreviewCard2, card2Dismissed])

  // Smart Preview - View Duration Tracking for Card 3 (Separate)
  useEffect(() => {
    const observerOptions = {
      threshold: 1.0, // 100% visible
      rootMargin: '0px'
    }

    const cardTimers = new Map()

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const cardId = entry.target.getAttribute('data-card-id')

        if (cardId === 'card-3') {
          if (entry.isIntersecting && entry.intersectionRatio === 1.0) {
            // Card is 100% visible, start timer only if not dismissed
            if (!card3Dismissed) {
              const timer = setTimeout(() => {
                setSmartPreviewCard3(cardId)
              }, 5000) // 5 seconds

              cardTimers.set(cardId, timer)
            }
          } else {
            // Card is not fully visible, clear timer
            const timer = cardTimers.get(cardId)
            if (timer) {
              clearTimeout(timer)
              cardTimers.delete(cardId)
            }

            // Hide smart preview if this card was showing it
            if (smartPreviewCard3 === cardId) {
              closeSmartPreviewCard3()
            }

            // Reset dismissed flag when card completely leaves viewport
            if (card3Dismissed) {
              setCard3Dismissed(false)
            }
          }
        }
      })
    }, observerOptions)

    // Observe only card-3
    const card3 = document.querySelector('[data-card-id="card-3"]')
    if (card3) observer.observe(card3)

    return () => {
      // Cleanup
      observer.disconnect()
      cardTimers.forEach(timer => clearTimeout(timer))
      cardTimers.clear()
    }
  }, [smartPreviewCard3, card3Dismissed])

  // Random Viewer Count System for Card 3
  useEffect(() => {
    if (smartPreviewCard3 === 'card-3') {
      // Initialize with random number between 3-12 when modal opens
      const initialCount = Math.floor(Math.random() * 10) + 3
      setViewerCount(initialCount)

      // After 5 seconds, increment by +1 or +2 every 3-7 seconds
      const initialTimer = setTimeout(() => {
        const incrementTimer = setInterval(() => {
          const increment = Math.random() > 0.5 ? 1 : 2

          // Show +X indicator
          setViewerIncrement(increment)
          setViewerCountAnimate(true)

          // Update actual count after showing increment
          setTimeout(() => {
            setViewerCount(prev => {
              const newCount = prev + increment
              // Cap at reasonable number (max 20)
              return newCount > 20 ? 20 : newCount
            })
          }, 500)

          // Hide increment and reset animation after longer display
          setTimeout(() => {
            setViewerCountAnimate(false)
            // Remove increment after fade animation completes
            setTimeout(() => {
              setViewerIncrement(0)
            }, 800)
          }, 1500)
        }, Math.floor(Math.random() * 4000) + 3000) // Random interval 3-7 seconds

        // Store timer to clear later
        return () => clearInterval(incrementTimer)
      }, 5000) // Start incrementing after 5 seconds

      return () => {
        clearTimeout(initialTimer)
      }
    } else {
      // Reset when modal closes
      setViewerCount(0)
      setViewerCountAnimate(false)
      setViewerIncrement(0)
    }
  }, [smartPreviewCard3])

  // Smart Preview - View Duration Tracking for Card 5 (Separate)
  useEffect(() => {
    const observerOptions = {
      threshold: 1.0, // 100% visible
      rootMargin: '0px'
    }

    const cardTimers = new Map()

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const cardId = entry.target.getAttribute('data-card-id')

        if (cardId === 'card-5') {
          if (entry.isIntersecting && entry.intersectionRatio === 1.0) {
            // Card is 100% visible, start timer only if not dismissed
            if (!card5Dismissed) {
              const timer = setTimeout(() => {
                setSmartPreviewCard5(cardId)
              }, 5000) // 5 seconds

              cardTimers.set(cardId, timer)
            }
          } else {
            // Card is not fully visible, clear timer
            const timer = cardTimers.get(cardId)
            if (timer) {
              clearTimeout(timer)
              cardTimers.delete(cardId)
            }

            // Hide smart preview if this card was showing it
            if (smartPreviewCard5 === cardId) {
              closeSmartPreviewCard5()
            }

            // Reset dismissed flag when card completely leaves viewport
            if (card5Dismissed) {
              setCard5Dismissed(false)
            }
          }
        }
      })
    }, observerOptions)

    // Observe only card-5
    const card5 = document.querySelector('[data-card-id="card-5"]')
    if (card5) observer.observe(card5)

    return () => {
      // Cleanup
      observer.disconnect()
      cardTimers.forEach(timer => clearTimeout(timer))
      cardTimers.clear()
    }
  }, [smartPreviewCard5, card5Dismissed])

  // Closing function for card-2 Smart Preview
  const closeSmartPreviewCard2 = (isManualDismiss = false) => {
    if (isManualDismiss) {
      setCard2Dismissed(true)
    }
    setClosingCard2(true)
    setTimeout(() => {
      setSmartPreviewCard2(null)
      setClosingCard2(false)
    }, 400) // Match animation duration
  }

  // Closing function for card-3 Smart Preview
  const closeSmartPreviewCard3 = (isManualDismiss = false) => {
    if (isManualDismiss) {
      setCard3Dismissed(true)
    }
    setClosingCard3(true)
    setTimeout(() => {
      setSmartPreviewCard3(null)
      setClosingCard3(false)
    }, 400) // Match animation duration
  }

  // Closing function for card-5 Smart Preview
  const closeSmartPreviewCard5 = (isManualDismiss = false) => {
    if (isManualDismiss) {
      setCard5Dismissed(true)
    }
    setClosingCard5(true)
    setTimeout(() => {
      setSmartPreviewCard5(null)
      setClosingCard5(false)
    }, 400) // Match animation duration
  }

  // Video Shorts Intersection Observer for autoplay and tracking
  useEffect(() => {
    const container = videoContainerRef.current
    if (!container) return

    const observerOptions = {
      root: null, // Use viewport instead
      threshold: 0.75, // 75% visible
      rootMargin: '0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const videoIndex = parseInt(entry.target.getAttribute('data-video-index') || '0')

        if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
          setActiveVideoIndex(videoIndex)
        }
      })
    }, observerOptions)

    // Observe all video cards
    const videoCards = container.querySelectorAll('.video-card')
    videoCards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  // Handle auto-swipe when video ends (wait 5 seconds after video ends)
  const handleVideoEnded = useCallback(() => {
    const container = videoContainerRef.current
    if (!container) return

    setTimeout(() => {
      const nextIndex = (activeVideoIndex + 1) % videoIds.length
      const nextCard = container.querySelector(`[data-video-index="${nextIndex}"]`)
      if (nextCard) {
        nextCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }, 5000) // 5 seconds after video ends
  }, [activeVideoIndex, videoIds.length])

  // Track video progress for progress bar
  useEffect(() => {
    const activeVideo = videoRefs.current[activeVideoIndex] as HTMLVideoElement
    if (!activeVideo) return

    const updateProgress = () => {
      if (activeVideo.duration) {
        const progress = (activeVideo.currentTime / activeVideo.duration) * 100
        setVideoProgress(progress)
      }
    }

    activeVideo.addEventListener('timeupdate', updateProgress)
    return () => activeVideo.removeEventListener('timeupdate', updateProgress)
  }, [activeVideoIndex])

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <style jsx>{`
        .animate-shine {
          animation: shine 3s infinite;
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        .animate-bounce-horizontal {
          animation: bounce-horizontal 1.5s ease-in-out infinite;
        }

        @keyframes bounce-horizontal {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-3px);
          }
          75% {
            transform: translateX(3px);
          }
        }

        .flash-sale-card {
          animation: gradient-border-flash 6s ease infinite;
        }

        @keyframes gradient-border-flash {
          0% {
            box-shadow: 0 0 0 3px #dc2626;
          }
          25% {
            box-shadow: 0 0 0 3px #b91c1c;
          }
          50% {
            box-shadow: 0 0 0 3px #ef4444;
          }
          75% {
            box-shadow: 0 0 0 3px #f87171;
          }
          100% {
            box-shadow: 0 0 0 3px #dc2626;
          }
        }

        /* Card 3 Animations */
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes scale-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(1.1);
            opacity: 0;
          }
        }

        @keyframes gradient-animation-flash {
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

        @keyframes countdown-breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.02);
            opacity: 1;
          }
        }

        .countdown-simple {
          background: rgba(255, 255, 255, 0.95);
          color: #dc2626;
          border: 1px solid rgba(220, 38, 38, 0.2);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .gradient-background-red {
          background: linear-gradient(300deg, #dc2626, #b91c1c, #ef4444, #f87171);
          background-size: 180% 180%;
          animation: gradient-animation-red 6s ease infinite;
        }
        @keyframes gradient-animation-red {
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
        @keyframes arrow-bounce-x {
          0%, 100% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(4px);
          }
        }

        .squircle {
          width: 80px;
          aspect-ratio: 1;
          border-radius: 18px;
        }
        .animate-arrow-bounce {
          animation: arrow-bounce-x 1.5s ease-in-out infinite;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .gradient-background-blue {
          background: linear-gradient(300deg, #1d4ed8, #1e40af, #3b82f6, #60a5fa);
          background-size: 180% 180%;
          animation: gradient-animation-blue 6s ease infinite;
        }
        @keyframes gradient-animation-blue {
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

        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes expandPrice {
          from {
            transform: translateY(60%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes contractPrice {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(100%);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
      <main className="container mx-auto py-4">

        {/* New Hero Section - ทัวร์ยอดฮิตและดีลสุดพิเศษ */}
        <div className="w-full bg-white py-6 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Main Heading */}
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#004A99' }}>
              ทัวร์ยอดฮิตและดีลสุดพิเศษ
            </h2>

            {/* Horizontal Scrolling Cards */}
            <div className="relative -mx-4 px-4">
              <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">

                {/* Card 1 - ทัวร์ไฟไหม้ */}
                <div className="flex-shrink-0 w-[85%] snap-start">
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    {/* Image Container */}
                    <div className="relative h-48">
                      <img
                        src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop&auto=format"
                        alt="Paris, France"
                        className="w-full h-full object-cover"
                      />
                      {/* Hot Deal Badge */}
                      <div
                        className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-sm font-bold"
                        style={{ backgroundColor: '#E53935' }}
                      >
                        ทัวร์ไฟไหม้
                      </div>
                    </div>
                    {/* Content Container */}
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2" style={{ color: '#004A99' }}>
                        ทัวร์ยุโรป ฝรั่งเศส-สวิส
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>7 วัน 5 คืน</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm text-gray-400 line-through">฿49,900</span>
                        <span className="text-2xl font-bold" style={{ color: '#E53935' }}>฿39,900</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2 - ยอดนิยม */}
                <div className="flex-shrink-0 w-[85%] snap-start">
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="relative h-48">
                      <img
                        src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop&auto=format"
                        alt="Seoul, Korea"
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-sm font-bold"
                        style={{ backgroundColor: '#004A99' }}
                      >
                        ยอดนิยม
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2" style={{ color: '#004A99' }}>
                        ทัวร์เกาหลี โซล-เชจู
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>5 วัน 3 คืน</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-800">฿32,900</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3 - ทัวร์ไฟไหม้ */}
                <div className="flex-shrink-0 w-[85%] snap-start">
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="relative h-48">
                      <img
                        src="https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=600&fit=crop&auto=format"
                        alt="Thailand"
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-sm font-bold"
                        style={{ backgroundColor: '#E53935' }}
                      >
                        ทัวร์ไฟไหม้
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2" style={{ color: '#004A99' }}>
                        ทัวร์ภูเก็ต-พังงา-กระบี่
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>4 วัน 3 คืน</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm text-gray-400 line-through">฿15,900</span>
                        <span className="text-2xl font-bold" style={{ color: '#E53935' }}>฿12,900</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 4 - ยอดนิยม */}
                <div className="flex-shrink-0 w-[85%] snap-start">
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="relative h-48">
                      <img
                        src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop&auto=format"
                        alt="Tokyo, Japan"
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-sm font-bold"
                        style={{ backgroundColor: '#004A99' }}
                      >
                        ยอดนิยม
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2" style={{ color: '#004A99' }}>
                        ทัวร์ญี่ปุ่น โตเกียว-โอซาก้า
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>6 วัน 4 คืน</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-800">฿45,900</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 5 - ทัวร์ไฟไหม้ */}
                <div className="flex-shrink-0 w-[85%] snap-start">
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="relative h-48">
                      <img
                        src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&h=600&fit=crop&auto=format"
                        alt="Santorini, Greece"
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-sm font-bold"
                        style={{ backgroundColor: '#E53935' }}
                      >
                        ทัวร์ไฟไหม้
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2" style={{ color: '#004A99' }}>
                        ทัวร์กรีซ ซานโตรินี-เอเธนส์
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>8 วัน 6 คืน</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm text-gray-400 line-through">฿89,900</span>
                        <span className="text-2xl font-bold" style={{ color: '#E53935' }}>฿69,900</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* The Premium Modular Card Section */}
        <div className="w-full bg-gradient-to-b from-gray-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Kanit, sans-serif' }}>
              ทัวร์ยอดนิยม
            </h2>

            {/* Cards Container - Horizontal Scroll */}
            <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">

              {/* Card 1 - Tokyo */}
              <div className="flex-shrink-0 w-[320px] snap-start">
                <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=1200&fit=crop&auto=format"
                    alt="Tokyo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)' }} />

                  <div className="absolute top-0 right-0 z-20" style={{ width: '140px', height: '140px', overflow: 'hidden' }}>
                    <div className="absolute transform rotate-45" style={{ top: '28px', right: '-35px', width: '170px', background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)', textAlign: 'center', padding: '8px 0', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                      <span className="text-white text-xs font-bold tracking-wide" style={{ fontFamily: 'Kanit, sans-serif', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>ประหยัด 25%</span>
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <span className="text-2xl">🗼</span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Kanit, sans-serif', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                      ทัวร์โตเกียว-ฟูจิ
                      <br />
                      6 วัน 4 คืน
                    </h3>
                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>⭐</span>
                        <span className="text-white text-sm" style={{ fontFamily: 'Sarabun, sans-serif', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>ชมภูเขาไฟฟูจิ</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>⭐</span>
                        <span className="text-white text-sm" style={{ fontFamily: 'Sarabun, sans-serif', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>ออนเซ็นแท้</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>⭐</span>
                        <span className="text-white text-sm" style={{ fontFamily: 'Sarabun, sans-serif', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>ช้อปปิ้งชินจูกุ</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="text-gray-300 text-sm line-through mb-1">฿52,900</div>
                      <div className="text-4xl font-black text-white" style={{ fontFamily: 'Kanit, sans-serif', textShadow: '0 2px 6px rgba(220, 38, 38, 0.4)' }}>
                        ฿39,900
                      </div>
                    </div>
                    <button className="w-full py-3.5 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95" style={{ fontFamily: 'Kanit, sans-serif', background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)', boxShadow: '0 4px 14px rgba(220, 38, 38, 0.4)' }}>
                      <span>เหลือ 8 ที่สุดท้าย! จองเลย</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 3 - Paris */}
              <div className="flex-shrink-0 w-[320px] snap-start">
                <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=1200&fit=crop&auto=format"
                    alt="Paris"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)' }} />

                  <div className="absolute top-0 right-0 z-20" style={{ width: '140px', height: '140px', overflow: 'hidden' }}>
                    <div className="absolute transform rotate-45" style={{ top: '28px', right: '-35px', width: '170px', background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)', textAlign: 'center', padding: '8px 0', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                      <span className="text-white text-xs font-bold tracking-wide" style={{ fontFamily: 'Kanit, sans-serif', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>ประหยัด 35%</span>
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <span className="text-2xl">🗼</span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Kanit, sans-serif', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                      ทัวร์ปารีส-ลอนดอน
                      <br />
                      7 วัน 5 คืน
                    </h3>
                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>⭐</span>
                        <span className="text-white text-sm" style={{ fontFamily: 'Sarabun, sans-serif', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>หอไอเฟล + ลูฟร์</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>⭐</span>
                        <span className="text-white text-sm" style={{ fontFamily: 'Sarabun, sans-serif', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>บิ๊กเบน + บัคกิ้งแฮม</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>⭐</span>
                        <span className="text-white text-sm" style={{ fontFamily: 'Sarabun, sans-serif', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>ล่องเรือแม่น้ำแซน</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="text-gray-300 text-sm line-through mb-1">฿79,900</div>
                      <div className="text-4xl font-black text-white" style={{ fontFamily: 'Kanit, sans-serif', textShadow: '0 2px 6px rgba(220, 38, 38, 0.4)' }}>
                        ฿51,900
                      </div>
                    </div>
                    <button className="w-full py-3.5 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95" style={{ fontFamily: 'Kanit, sans-serif', background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)', boxShadow: '0 4px 14px rgba(220, 38, 38, 0.4)' }}>
                      <span>เหลือ 3 ที่สุดท้าย! จองเลย</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 4 - Santorini */}
              <div className="flex-shrink-0 w-[320px] snap-start">
                <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=1200&fit=crop&auto=format"
                    alt="Santorini"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)' }} />

                  <div className="absolute top-0 right-0 z-20" style={{ width: '140px', height: '140px', overflow: 'hidden' }}>
                    <div className="absolute transform rotate-45" style={{ top: '28px', right: '-35px', width: '170px', background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)', textAlign: 'center', padding: '8px 0', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                      <span className="text-white text-xs font-bold tracking-wide" style={{ fontFamily: 'Kanit, sans-serif', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>ประหยัด 28%</span>
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <span className="text-2xl">🏛️</span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Kanit, sans-serif', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                      ทัวร์ซานโตรินี
                      <br />
                      7 วัน 5 คืน
                    </h3>
                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>⭐</span>
                        <span className="text-white text-sm" style={{ fontFamily: 'Sarabun, sans-serif', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>หมู่บ้านหลังคาฟ้า</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>⭐</span>
                        <span className="text-white text-sm" style={{ fontFamily: 'Sarabun, sans-serif', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>ดูพระอาทิตย์ตก Oia</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>⭐</span>
                        <span className="text-white text-sm" style={{ fontFamily: 'Sarabun, sans-serif', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>ล่องเรือชมหน้าผา</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="text-gray-300 text-sm line-through mb-1">฿69,900</div>
                      <div className="text-4xl font-black text-white" style={{ fontFamily: 'Kanit, sans-serif', textShadow: '0 2px 6px rgba(220, 38, 38, 0.4)' }}>
                        ฿49,900
                      </div>
                    </div>
                    <button className="w-full py-3.5 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95" style={{ fontFamily: 'Kanit, sans-serif', background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)', boxShadow: '0 4px 14px rgba(220, 38, 38, 0.4)' }}>
                      <span>เหลือ 6 ที่สุดท้าย! จองเลย</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 5 - Switzerland */}
              <div className="flex-shrink-0 w-[320px] snap-start">
                <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&h=1200&fit=crop&auto=format"
                    alt="Switzerland"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)' }} />

                  <div className="absolute top-0 right-0 z-20" style={{ width: '140px', height: '140px', overflow: 'hidden' }}>
                    <div className="absolute transform rotate-45" style={{ top: '28px', right: '-35px', width: '170px', background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)', textAlign: 'center', padding: '8px 0', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                      <span className="text-white text-xs font-bold tracking-wide" style={{ fontFamily: 'Kanit, sans-serif', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>ประหยัด 20%</span>
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <span className="text-2xl">🏔️</span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Kanit, sans-serif', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                      ทัวร์สวิตเซอร์แลนด์
                      <br />
                      8 วัน 6 คืน
                    </h3>
                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>⭐</span>
                        <span className="text-white text-sm" style={{ fontFamily: 'Sarabun, sans-serif', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>ยอดเขายุงฟราว</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>⭐</span>
                        <span className="text-white text-sm" style={{ fontFamily: 'Sarabun, sans-serif', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>นั่งรถไฟชมทิวทัศน์</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>⭐</span>
                        <span className="text-white text-sm" style={{ fontFamily: 'Sarabun, sans-serif', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>ช้อกโกแลตโรงงาน</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="text-gray-300 text-sm line-through mb-1">฿99,900</div>
                      <div className="text-4xl font-black text-white" style={{ fontFamily: 'Kanit, sans-serif', textShadow: '0 2px 6px rgba(220, 38, 38, 0.4)' }}>
                        ฿79,900
                      </div>
                    </div>
                    <button className="w-full py-3.5 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95" style={{ fontFamily: 'Kanit, sans-serif', background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)', boxShadow: '0 4px 14px rgba(220, 38, 38, 0.4)' }}>
                      <span>เหลือ 4 ที่สุดท้าย! จองเลย</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* The Premium Modular Card Section - NEW DESIGN */}
        <div className="w-full bg-gradient-to-b from-white to-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            {/* Cards Container - Horizontal Scroll */}
            <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">

              {/* Card 1 - New York */}
              <div className="flex-shrink-0 w-[320px] snap-start">
                <div className="relative h-[540px] rounded-xl overflow-visible shadow-2xl hover:shadow-3xl transition-shadow duration-300 bg-white">

                  {/* Module 1: Image Section (45% of card) */}
                  <div className="relative h-[243px] overflow-hidden rounded-t-xl">
                    <img
                      src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop&auto=format"
                      alt="New York"
                      className="w-full h-full object-cover"
                    />

                    {/* Sale Ribbon */}
                    <div className="absolute top-0 right-0 z-20" style={{ width: '120px', height: '120px', overflow: 'hidden' }}>
                      <div className="absolute transform rotate-45" style={{ top: '24px', right: '-30px', width: '150px', background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)', textAlign: 'center', padding: '6px 0', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                        <span className="text-white text-xs font-bold tracking-wide" style={{ fontFamily: 'Kanit, sans-serif', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>ประหยัด 30%</span>
                      </div>
                    </div>
                  </div>

                  {/* Price Circle - The Bridge Element - REFINED RED THEME */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-30" style={{ top: '193px' }}>
                    <div className="relative w-[110px] h-[110px] rounded-full flex items-center justify-center" style={{
                      background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                      border: '5px solid white',
                      boxShadow: '0 8px 24px rgba(220, 38, 38, 0.5), 0 0 0 1px rgba(220, 38, 38, 0.1)'
                    }}>
                      <div className="text-center">
                        <div className="text-xs text-white/80 font-medium mb-0.5" style={{ fontFamily: 'Sarabun, sans-serif' }}>เริ่มต้น</div>
                        <div className="text-2xl font-black leading-tight text-white" style={{ fontFamily: 'Kanit, sans-serif', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                          ฿62,900
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Module 2: Info Section (55% of card) - BRIGHT LIGHT THEME */}
                  <div className="h-[297px] px-6 pt-16 pb-5 flex flex-col rounded-b-xl" style={{ background: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 100%)' }}>

                    {/* Old Price (below circle) */}
                    <div className="text-center mb-4">
                      <span className="text-gray-600 text-sm line-through">฿89,900</span>
                    </div>

                    {/* Headline */}
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-4 leading-snug" style={{ fontFamily: 'Kanit, sans-serif' }}>
                      ทัวร์นิวยอร์ก<br />5 วัน 3 คืน
                    </h3>

                    {/* Highlights */}
                    <div className="space-y-2.5 mb-5 flex-grow">
                      <div className="flex items-center gap-2.5 bg-white/60 rounded-lg px-3 py-2 shadow-sm">
                        <span className="text-amber-500 text-sm">⭐</span>
                        <span className="text-gray-800 text-sm font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>เที่ยวครอบคลุม 10 จุด</span>
                      </div>
                      <div className="flex items-center gap-2.5 bg-white/60 rounded-lg px-3 py-2 shadow-sm">
                        <span className="text-amber-500 text-sm">⭐</span>
                        <span className="text-gray-800 text-sm font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>รวมตั๋วเครื่องบิน</span>
                      </div>
                      <div className="flex items-center gap-2.5 bg-white/60 rounded-lg px-3 py-2 shadow-sm">
                        <span className="text-amber-500 text-sm">⭐</span>
                        <span className="text-gray-800 text-sm font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>ไกด์ภาษาไทย</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="text-center">
                      <div className="text-xs text-red-600 font-bold mb-2 animate-pulse" style={{ fontFamily: 'Kanit, sans-serif' }}>🔥 เหลือเพียง 5 ที่นั่ง!</div>
                      <button className="w-full py-3.5 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95" style={{
                        fontFamily: 'Kanit, sans-serif',
                        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                        color: 'white',
                        boxShadow: '0 6px 20px rgba(220, 38, 38, 0.4)'
                      }}>
                        จองเลย →
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* Card 2 - Tokyo */}
              <div className="flex-shrink-0 w-[320px] snap-start">
                <div className="relative h-[540px] rounded-xl overflow-visible shadow-2xl hover:shadow-3xl transition-shadow duration-300 bg-white">
                  <div className="relative h-[243px] overflow-hidden rounded-t-xl">
                    <img
                      src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop&auto=format"
                      alt="Tokyo"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 z-20" style={{ width: '120px', height: '120px', overflow: 'hidden' }}>
                      <div className="absolute transform rotate-45" style={{ top: '24px', right: '-30px', width: '150px', background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)', textAlign: 'center', padding: '6px 0', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                        <span className="text-white text-xs font-bold tracking-wide" style={{ fontFamily: 'Kanit, sans-serif', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>ประหยัด 25%</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-30" style={{ top: '193px' }}>
                    <div className="relative w-[110px] h-[110px] rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)', border: '5px solid white', boxShadow: '0 8px 24px rgba(220, 38, 38, 0.5), 0 0 0 1px rgba(220, 38, 38, 0.1)' }}>
                      <div className="text-center">
                        <div className="text-xs text-white/80 font-medium mb-0.5" style={{ fontFamily: 'Sarabun, sans-serif' }}>เริ่มต้น</div>
                        <div className="text-2xl font-black leading-tight text-white" style={{ fontFamily: 'Kanit, sans-serif', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>฿39,900</div>
                      </div>
                    </div>
                  </div>
                  <div className="h-[297px] px-6 pt-16 pb-5 flex flex-col rounded-b-xl" style={{ background: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 100%)' }}>
                    <div className="text-center mb-4">
                      <span className="text-gray-600 text-sm line-through">฿52,900</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-4 leading-snug" style={{ fontFamily: 'Kanit, sans-serif' }}>ทัวร์โตเกียว-ฟูจิ<br />6 วัน 4 คืน</h3>
                    <div className="space-y-2.5 mb-5 flex-grow">
                      <div className="flex items-center gap-2.5 bg-white/60 rounded-lg px-3 py-2 shadow-sm">
                        <span className="text-amber-500 text-sm">⭐</span>
                        <span className="text-gray-800 text-sm font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>ชมภูเขาไฟฟูจิ</span>
                      </div>
                      <div className="flex items-center gap-2.5 bg-white/60 rounded-lg px-3 py-2 shadow-sm">
                        <span className="text-amber-500 text-sm">⭐</span>
                        <span className="text-gray-800 text-sm font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>ออนเซ็นแท้</span>
                      </div>
                      <div className="flex items-center gap-2.5 bg-white/60 rounded-lg px-3 py-2 shadow-sm">
                        <span className="text-amber-500 text-sm">⭐</span>
                        <span className="text-gray-800 text-sm font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>ช้อปปิ้งชินจูกุ</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-red-600 font-bold mb-2 animate-pulse" style={{ fontFamily: 'Kanit, sans-serif' }}>🔥 เหลือเพียง 8 ที่นั่ง!</div>
                      <button className="w-full py-3.5 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95" style={{ fontFamily: 'Kanit, sans-serif', background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)', color: 'white', boxShadow: '0 6px 20px rgba(220, 38, 38, 0.4)' }}>จองเลย →</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 - Paris */}
              <div className="flex-shrink-0 w-[320px] snap-start">
                <div className="relative h-[540px] rounded-xl overflow-visible shadow-2xl hover:shadow-3xl transition-shadow duration-300 bg-white">
                  <div className="relative h-[243px] overflow-hidden rounded-t-xl">
                    <img
                      src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop&auto=format"
                      alt="Paris"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 z-20" style={{ width: '120px', height: '120px', overflow: 'hidden' }}>
                      <div className="absolute transform rotate-45" style={{ top: '24px', right: '-30px', width: '150px', background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)', textAlign: 'center', padding: '6px 0', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                        <span className="text-white text-xs font-bold tracking-wide" style={{ fontFamily: 'Kanit, sans-serif', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>ประหยัด 35%</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-30" style={{ top: '193px' }}>
                    <div className="relative w-[110px] h-[110px] rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)', border: '5px solid white', boxShadow: '0 8px 24px rgba(220, 38, 38, 0.5), 0 0 0 1px rgba(220, 38, 38, 0.1)' }}>
                      <div className="text-center">
                        <div className="text-xs text-white/80 font-medium mb-0.5" style={{ fontFamily: 'Sarabun, sans-serif' }}>เริ่มต้น</div>
                        <div className="text-2xl font-black leading-tight text-white" style={{ fontFamily: 'Kanit, sans-serif', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>฿51,900</div>
                      </div>
                    </div>
                  </div>
                  <div className="h-[297px] px-6 pt-16 pb-5 flex flex-col rounded-b-xl" style={{ background: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 100%)' }}>
                    <div className="text-center mb-4">
                      <span className="text-gray-600 text-sm line-through">฿79,900</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-4 leading-snug" style={{ fontFamily: 'Kanit, sans-serif' }}>ทัวร์ปารีส-ลอนดอน<br />7 วัน 5 คืน</h3>
                    <div className="space-y-2.5 mb-5 flex-grow">
                      <div className="flex items-center gap-2.5 bg-white/60 rounded-lg px-3 py-2 shadow-sm">
                        <span className="text-amber-500 text-sm">⭐</span>
                        <span className="text-gray-800 text-sm font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>หอไอเฟล + ลูฟร์</span>
                      </div>
                      <div className="flex items-center gap-2.5 bg-white/60 rounded-lg px-3 py-2 shadow-sm">
                        <span className="text-amber-500 text-sm">⭐</span>
                        <span className="text-gray-800 text-sm font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>บิ๊กเบน + บัคกิ้งแฮม</span>
                      </div>
                      <div className="flex items-center gap-2.5 bg-white/60 rounded-lg px-3 py-2 shadow-sm">
                        <span className="text-amber-500 text-sm">⭐</span>
                        <span className="text-gray-800 text-sm font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>ล่องเรือแม่น้ำแซน</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-red-600 font-bold mb-2 animate-pulse" style={{ fontFamily: 'Kanit, sans-serif' }}>🔥 เหลือเพียง 3 ที่นั่ง!</div>
                      <button className="w-full py-3.5 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95" style={{ fontFamily: 'Kanit, sans-serif', background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)', color: 'white', boxShadow: '0 6px 20px rgba(220, 38, 38, 0.4)' }}>จองเลย →</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4 - Santorini */}
              <div className="flex-shrink-0 w-[320px] snap-start">
                <div className="relative h-[540px] rounded-xl overflow-visible shadow-2xl hover:shadow-3xl transition-shadow duration-300 bg-white">
                  <div className="relative h-[243px] overflow-hidden rounded-t-xl">
                    <img
                      src="https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop&auto=format"
                      alt="Santorini"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 z-20" style={{ width: '120px', height: '120px', overflow: 'hidden' }}>
                      <div className="absolute transform rotate-45" style={{ top: '24px', right: '-30px', width: '150px', background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)', textAlign: 'center', padding: '6px 0', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                        <span className="text-white text-xs font-bold tracking-wide" style={{ fontFamily: 'Kanit, sans-serif', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>ประหยัด 28%</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-30" style={{ top: '193px' }}>
                    <div className="relative w-[110px] h-[110px] rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)', border: '5px solid white', boxShadow: '0 8px 24px rgba(220, 38, 38, 0.5), 0 0 0 1px rgba(220, 38, 38, 0.1)' }}>
                      <div className="text-center">
                        <div className="text-xs text-white/80 font-medium mb-0.5" style={{ fontFamily: 'Sarabun, sans-serif' }}>เริ่มต้น</div>
                        <div className="text-2xl font-black leading-tight text-white" style={{ fontFamily: 'Kanit, sans-serif', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>฿49,900</div>
                      </div>
                    </div>
                  </div>
                  <div className="h-[297px] px-6 pt-16 pb-5 flex flex-col rounded-b-xl" style={{ background: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 100%)' }}>
                    <div className="text-center mb-4">
                      <span className="text-gray-600 text-sm line-through">฿69,900</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-4 leading-snug" style={{ fontFamily: 'Kanit, sans-serif' }}>ทัวร์ซานโตรินี<br />7 วัน 5 คืน</h3>
                    <div className="space-y-2.5 mb-5 flex-grow">
                      <div className="flex items-center gap-2.5 bg-white/60 rounded-lg px-3 py-2 shadow-sm">
                        <span className="text-amber-500 text-sm">⭐</span>
                        <span className="text-gray-800 text-sm font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>หมู่บ้านหลังคาฟ้า</span>
                      </div>
                      <div className="flex items-center gap-2.5 bg-white/60 rounded-lg px-3 py-2 shadow-sm">
                        <span className="text-amber-500 text-sm">⭐</span>
                        <span className="text-gray-800 text-sm font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>ดูพระอาทิตย์ตก Oia</span>
                      </div>
                      <div className="flex items-center gap-2.5 bg-white/60 rounded-lg px-3 py-2 shadow-sm">
                        <span className="text-amber-500 text-sm">⭐</span>
                        <span className="text-gray-800 text-sm font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>ล่องเรือชมหน้าผา</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-red-600 font-bold mb-2 animate-pulse" style={{ fontFamily: 'Kanit, sans-serif' }}>🔥 เหลือเพียง 6 ที่นั่ง!</div>
                      <button className="w-full py-3.5 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95" style={{ fontFamily: 'Kanit, sans-serif', background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)', color: 'white', boxShadow: '0 6px 20px rgba(220, 38, 38, 0.4)' }}>จองเลย →</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 5 - Switzerland */}
              <div className="flex-shrink-0 w-[320px] snap-start">
                <div className="relative h-[540px] rounded-xl overflow-visible shadow-2xl hover:shadow-3xl transition-shadow duration-300 bg-white">
                  <div className="relative h-[243px] overflow-hidden rounded-t-xl">
                    <img
                      src="https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&h=600&fit=crop&auto=format"
                      alt="Switzerland"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 z-20" style={{ width: '120px', height: '120px', overflow: 'hidden' }}>
                      <div className="absolute transform rotate-45" style={{ top: '24px', right: '-30px', width: '150px', background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)', textAlign: 'center', padding: '6px 0', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                        <span className="text-white text-xs font-bold tracking-wide" style={{ fontFamily: 'Kanit, sans-serif', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>ประหยัด 20%</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-30" style={{ top: '193px' }}>
                    <div className="relative w-[110px] h-[110px] rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)', border: '5px solid white', boxShadow: '0 8px 24px rgba(220, 38, 38, 0.5), 0 0 0 1px rgba(220, 38, 38, 0.1)' }}>
                      <div className="text-center">
                        <div className="text-xs text-white/80 font-medium mb-0.5" style={{ fontFamily: 'Sarabun, sans-serif' }}>เริ่มต้น</div>
                        <div className="text-2xl font-black leading-tight text-white" style={{ fontFamily: 'Kanit, sans-serif', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>฿79,900</div>
                      </div>
                    </div>
                  </div>
                  <div className="h-[297px] px-6 pt-16 pb-5 flex flex-col rounded-b-xl" style={{ background: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 100%)' }}>
                    <div className="text-center mb-4">
                      <span className="text-gray-600 text-sm line-through">฿99,900</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-4 leading-snug" style={{ fontFamily: 'Kanit, sans-serif' }}>ทัวร์สวิตเซอร์แลนด์<br />8 วัน 6 คืน</h3>
                    <div className="space-y-2.5 mb-5 flex-grow">
                      <div className="flex items-center gap-2.5 bg-white/60 rounded-lg px-3 py-2 shadow-sm">
                        <span className="text-amber-500 text-sm">⭐</span>
                        <span className="text-gray-800 text-sm font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>ยอดเขายุงฟราว</span>
                      </div>
                      <div className="flex items-center gap-2.5 bg-white/60 rounded-lg px-3 py-2 shadow-sm">
                        <span className="text-amber-500 text-sm">⭐</span>
                        <span className="text-gray-800 text-sm font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>นั่งรถไฟชมทิวทัศน์</span>
                      </div>
                      <div className="flex items-center gap-2.5 bg-white/60 rounded-lg px-3 py-2 shadow-sm">
                        <span className="text-amber-500 text-sm">⭐</span>
                        <span className="text-gray-800 text-sm font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>ช้อกโกแลตโรงงาน</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-red-600 font-bold mb-2 animate-pulse" style={{ fontFamily: 'Kanit, sans-serif' }}>🔥 เหลือเพียง 4 ที่นั่ง!</div>
                      <button className="w-full py-3.5 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95" style={{ fontFamily: 'Kanit, sans-serif', background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)', color: 'white', boxShadow: '0 6px 20px rgba(220, 38, 38, 0.4)' }}>จองเลย →</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Vector Background Demo Section - NEW */}
        <div className="w-full bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Kanit, sans-serif' }}>
              Vector Background Demo
            </h2>

            {/* Cards Container */}
            <div className="flex lg:grid lg:grid-cols-3 gap-6 md:gap-7 overflow-x-auto lg:overflow-visible pb-6 snap-x lg:snap-none scrollbar-hide">

              {/* Demo Card 1 - Flash Sale Style with Red & Black Theme */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[480px] md:h-[560px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform">
                  {/* Base64 Background Image - Original Quality */}
                  <img
                    src={"/vectors/Depositphotos_795891962_XL.jpg"}
                    alt="Pattern background"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Red Gradient Overlay - Flash Sale Style */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      height: '50%',
                      background: 'linear-gradient(to top, rgba(255, 0, 0, 0.7) 0%, rgba(255, 69, 0, 0.5) 30%, rgba(255, 165, 0, 0.3) 60%, rgba(255, 165, 0, 0) 100%)'
                    }}
                  />

                  {/* Flash Sale Style - Dramatic Red & Black Theme */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6">
                    <div className="relative text-center w-full px-2">
                      {/* Explosion Tag - Top */}
                      <div className="mb-2">
                        <div
                          className="inline-block px-6 md:px-8 py-2 md:py-3 relative"
                          style={{
                            background: 'linear-gradient(135deg, #DC2626 0%, #7F1D1D 100%)',
                            clipPath: 'polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)',
                            boxShadow: '0 0 30px rgba(220, 38, 38, 0.8), 0 0 60px rgba(220, 38, 38, 0.5)'
                          }}
                        >
                          <p
                            className="text-xl md:text-2xl font-black tracking-wider"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF',
                              textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.8)'
                            }}
                          >
                            ⚡ FLASH SALE ⚡
                          </p>
                        </div>
                      </div>

                      {/* Countdown Timer Style */}
                      <div className="mb-3">
                        <p
                          className="text-base md:text-lg font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '0 0 10px rgba(255, 0, 0, 0.8), 2px 2px 6px rgba(0, 0, 0, 0.9)',
                            letterSpacing: '0.05em'
                          }}
                        >
                          ⏰ เหลือเวลาอีก 3 ชม. เท่านั้น!
                        </p>
                      </div>

                      {/* Main Discount - HUGE */}
                      <div className="mb-2">
                        <h1
                          className="text-8xl md:text-9xl font-black leading-none"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FF0000',
                            textShadow: '0 0 20px rgba(255, 0, 0, 1), 0 0 40px rgba(255, 0, 0, 0.8), 0 0 60px rgba(255, 0, 0, 0.6), 4px 4px 0px #000000, 8px 8px 0px rgba(0, 0, 0, 0.5)',
                            WebkitTextStroke: '3px #000000',
                            letterSpacing: '-0.02em'
                          }}
                        >
                          -70%
                        </h1>
                      </div>

                      {/* Destination Label */}
                      <div className="mb-3">
                        <div className="inline-block px-5 md:px-6 py-2 bg-black/80 backdrop-blur-sm rounded-lg" style={{ border: '2px solid #DC2626', boxShadow: '0 0 20px rgba(220, 38, 38, 0.6)' }}>
                          <p
                            className="text-2xl md:text-3xl font-black"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              background: 'linear-gradient(90deg, #FFFFFF 0%, #FEE2E2 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                              textShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
                            }}
                          >
                            ทัวร์เกาหลี โซล-ปูซาน
                          </p>
                        </div>
                      </div>

                      {/* Price Section */}
                      <div className="mb-2">
                        <p className="text-lg md:text-xl font-bold mb-1" style={{ fontFamily: 'Kanit, sans-serif', color: '#FFFFFF', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)' }}>
                          จากปกติ <span className="line-through" style={{ color: '#FCA5A5' }}>49,999.-</span>
                        </p>
                        <div className="inline-block px-4 md:px-6 py-2 md:py-3 bg-white rounded-xl" style={{ boxShadow: '0 0 30px rgba(255, 255, 255, 0.5), 0 8px 20px rgba(0, 0, 0, 0.6)' }}>
                          <h2
                            className="text-5xl md:text-6xl font-black"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text'
                            }}
                          >
                            14,999.-
                          </h2>
                        </div>
                      </div>

                      {/* Urgency CTA */}
                      <div className="mt-3">
                        <div className="inline-block">
                          <div
                            className="px-6 md:px-8 py-2 md:py-3 rounded-full animate-pulse"
                            style={{
                              background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
                              boxShadow: '0 0 30px rgba(251, 191, 36, 0.8), 0 4px 15px rgba(0, 0, 0, 0.5)',
                              border: '3px solid #FFFFFF'
                            }}
                          >
                            <p
                              className="text-lg md:text-xl font-black"
                              style={{
                                fontFamily: 'Kanit, sans-serif',
                                color: '#000000',
                                textShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
                              }}
                            >
                              🔥 จองด่วน! เหลือ 2 ที่!!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 3:4
                  </span>
                </div>
              </div>

              {/* Demo Card 2 - Comic Pop Art Background */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[450px] md:h-[525px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform">
                  {/* Base64 Background Image - Original Quality */}
                  <img
                    src={"/vectors/Comic pop art background.jpg"}
                    alt="Comic Pop Art background"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      filter: 'brightness(0.75) contrast(1.1)'
                    }}
                  />

                  {/* Top Image Layer - Japan (47.5%) with smooth blend */}
                  <div
                    className="absolute top-0 left-0 right-0"
                    style={{
                      height: '47.5%',
                      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)'
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80"
                      alt="Japan cityscape"
                      className="w-full h-full object-cover"
                      style={{
                        opacity: 0.85,
                        mixBlendMode: 'luminosity'
                      }}
                    />
                  </div>

                  {/* Red Gradient Overlay - Flash Sale Style */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      height: '47.5%',
                      background: 'linear-gradient(to top, rgba(255, 0, 0, 0.7) 0%, rgba(255, 69, 0, 0.5) 30%, rgba(255, 165, 0, 0.3) 60%, rgba(255, 165, 0, 0) 100%)'
                    }}
                  />

                  {/* Bold Promotional Text - Centered in card */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6" style={{ transform: 'scale(0.9375)', transformOrigin: 'center center' }}>
                    <div className="relative text-center w-full px-2">
                      {/* Top Header - Tour Type */}
                      <div className="mb-2">
                        <h3
                          className="text-4xl md:text-5xl font-black tracking-tight"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFEB3B',
                            textShadow: '4px 4px 0px rgba(0, 0, 0, 0.8), 8px 8px 20px rgba(0, 0, 0, 0.6)',
                            WebkitTextStroke: '2px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          ทัวร์ญี่ปุ่น <span style={{ color: '#FFFFFF' }}>ปังสุด</span>
                        </h3>
                      </div>

                      {/* Sub Header - Duration */}
                      <div className="mb-3">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                          }}
                        >
                          โตเกียว-ฟูจิ 5 วัน 3 คืน
                        </p>
                      </div>

                      {/* Date Range Badge */}
                      <div className="inline-block mb-3 px-4 md:px-6 py-1.5 md:py-2 rounded-full" style={{ background: 'linear-gradient(135deg, #FFEB3B 0%, #FBC02D 100%)', boxShadow: '0 4px 12px rgba(251, 192, 45, 0.6)' }}>
                        <p className="text-lg md:text-xl font-black text-black" style={{ fontFamily: 'Kanit, sans-serif' }}>
                          📅 15-19 ธ.ค. 68
                        </p>
                      </div>

                      {/* Discount Line - Original Price */}
                      <div className="mb-2">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          ลดเหลือจาก <span className="line-through" style={{ color: '#FF6B6B' }}>39,999.-</span>
                        </p>
                      </div>

                      {/* Main Price - HUGE */}
                      <div className="relative inline-block">
                        <h1
                          className="text-6xl md:text-7xl font-black leading-none"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(180deg, #FFEB3B 0%, #FF9800 50%, #FF5722 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '0 0 30px rgba(255, 235, 59, 0.8)',
                            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 20px rgba(255, 152, 0, 0.8))',
                            WebkitTextStroke: '1px rgba(255, 235, 59, 0.5)'
                          }}
                        >
                          29,999.-
                        </h1>
                      </div>

                      {/* Call to Action Button */}
                      <div className="mt-4">
                        <button
                          className="w-full max-w-sm mx-auto block"
                          style={{
                            background: 'linear-gradient(135deg, #FF0000 0%, #DC2626 100%)',
                            padding: '16px 32px',
                            borderRadius: '12px',
                            border: '3px solid #FFEB3B',
                            boxShadow: '0 0 40px rgba(255, 0, 0, 0.8), 0 6px 20px rgba(0, 0, 0, 0.6)',
                            cursor: 'pointer',
                            animation: 'scale-pulse 2s ease-in-out infinite'
                          }}
                        >
                          <p
                            className="text-xl md:text-2xl font-black"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF',
                              textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                            }}
                          >
                            🎁 รับส่วนลด 10,000.- เลย!
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 4:5
                  </span>
                </div>
              </div>

              {/* Demo Card 3 - Refined Red Sunburst Theme */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[432px] md:h-[504px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Sunburst Background */}
                  <img
                    src="/vectors/Depositphotos_795891962_XL.jpg"
                    alt="Flash Sale Background"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Content - Centered */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-8" style={{ transform: 'scale(0.9000)', transformOrigin: 'center center' }}>
                    <div className="text-center">

                      {/* Main Headline - White with Black Outline */}
                      <h3
                        className="text-3xl md:text-4xl font-black mb-2 leading-tight"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '3px 3px 0px #000000, -1px -1px 0px #000000, 1px -1px 0px #000000, -1px 1px 0px #000000',
                        }}
                      >
                        เก็บเงินได้แล้วนะจ๊ะ
                      </h3>

                      {/* Sub Headline - White with Black Outline */}
                      <h2
                        className="text-4xl md:text-5xl font-black mb-1 leading-tight"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '4px 4px 0px #000000, -2px -2px 0px #000000, 2px -2px 0px #000000, -2px 2px 0px #000000',
                        }}
                      >
                        ทัวร์+พร้อมห้องพัก
                      </h2>

                      {/* Duration Badge */}
                      <div className="inline-block my-4 px-8 py-2" style={{
                        background: '#FFFFFF',
                        border: '4px solid #FF0000',
                        borderRadius: '12px',
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.6)'
                      }}>
                        <p className="text-2xl md:text-3xl font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FF0000',
                        }}>
                          5 วัน 4 คืน
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 5:6
                  </span>
                </div>
              </div>

              {/* Demo Card 4 - Refined Red Sunburst Theme */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[420px] md:h-[490px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Sunburst Background */}
                  <img
                    src="/vectors/Depositphotos_795891962_XL.jpg"
                    alt="Flash Sale Background"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Content - Centered */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-8" style={{ transform: 'scale(0.8750)', transformOrigin: 'center center' }}>
                    <div className="text-center">

                      {/* Main Headline - White with Black Outline */}
                      <h3
                        className="text-4xl md:text-5xl font-black mb-2 leading-tight"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '4px 4px 0px #000000, -2px -2px 0px #000000, 2px -2px 0px #000000, -2px 2px 0px #000000',
                        }}
                      >
                        ลดราคาสุดๆ
                      </h3>

                      {/* Sub Headline - White with Black Outline */}
                      <h2
                        className="text-5xl md:text-6xl font-black mb-3 leading-tight"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '5px 5px 0px #000000, -2px -2px 0px #000000, 2px -2px 0px #000000, -2px 2px 0px #000000',
                        }}
                      >
                        ทุกโปรแกรม
                      </h2>

                      {/* Discount Badge */}
                      <div className="inline-block my-4 px-10 py-3" style={{
                        background: '#FFFFFF',
                        border: '4px solid #FF0000',
                        borderRadius: '12px',
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.6)'
                      }}>
                        <p className="text-3xl md:text-4xl font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FF0000',
                        }}>
                          สูงสุด 50%
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 6:7
                  </span>
                </div>
              </div>

              {/* Demo Card 5 - Refined Red Sunburst Theme */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[411px] md:h-[480px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Sunburst Background */}
                  <img
                    src="/vectors/Depositphotos_795891962_XL.jpg"
                    alt="Flash Sale Background"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Content - Centered */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-8" style={{ transform: 'scale(0.8562)', transformOrigin: 'center center' }}>
                    <div className="text-center">

                      {/* Main Headline - White with Black Outline */}
                      <h3
                        className="text-3xl md:text-4xl font-black mb-2 leading-tight"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '3px 3px 0px #000000, -1px -1px 0px #000000, 1px -1px 0px #000000, -1px 1px 0px #000000',
                        }}
                      >
                        โปรโมชั่นพิเศษ
                      </h3>

                      {/* Sub Headline - White with Black Outline */}
                      <h2
                        className="text-4xl md:text-5xl font-black mb-1 leading-tight"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '4px 4px 0px #000000, -2px -2px 0px #000000, 2px -2px 0px #000000, -2px 2px 0px #000000',
                        }}
                      >
                        ทัวร์ในประเทศ
                      </h2>

                      {/* Price Badge */}
                      <div className="inline-block my-4 px-8 py-2" style={{
                        background: '#FFFFFF',
                        border: '4px solid #FF0000',
                        borderRadius: '12px',
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.6)'
                      }}>
                        <p className="text-2xl md:text-3xl font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FF0000',
                        }}>
                          เริ่มต้น 2,999.-
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 7:8
                  </span>
                </div>
              </div>

              {/* Demo Card 6 - Limited Time Flash Sale */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[405px] md:h-[472px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform">
                  {/* Background */}
                  <img
                    src={"/vectors/Comic pop art background.jpg"}
                    alt="Flash Sale background"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Savings Ribbon */}
                  <div
                    className="text-white font-black"
                    style={{
                      fontSize: '20px',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      zIndex: 9999,
                      isolation: 'isolate',
                      willChange: 'transform',
                      lineHeight: 1.8,
                      paddingInline: '1lh',
                      paddingBottom: '0.5em',
                      borderImage: 'conic-gradient(#0008 0 0) 51%/0.5em',
                      clipPath: 'polygon(100% calc(100% - 0.5em),100% 100%,calc(100% - 0.5em) calc(100% - 0.5em),0.5em calc(100% - 0.5em), 0 100%,0 calc(100% - 0.5em),999px calc(100% - 0.5em - 999px),calc(100% - 999px) calc(100% - 0.5em - 999px))',
                      transform: 'translate(calc((1 - 0.7071) * 100%), -100%) rotate(45deg) translateZ(0)',
                      transformOrigin: '0% 100%',
                      backgroundColor: '#FF4500',
                      fontFamily: 'Kanit, sans-serif'
                    }}
                  >
                    ประหยัด ฿6,000.-
                  </div>

                  {/* Red Gradient Overlay - Flash Sale Style */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      height: '50%',
                      background: 'linear-gradient(to top, rgba(255, 0, 0, 0.7) 0%, rgba(255, 69, 0, 0.5) 30%, rgba(255, 165, 0, 0.3) 60%, rgba(255, 165, 0, 0) 100%)'
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6" style={{ transform: 'scale(0.8438)', transformOrigin: 'center center' }}>
                    <div className="relative text-center w-full px-2">

                      {/* Limited Time Badge */}
                      <div className="mb-4">
                        <div
                          className="inline-block px-6 md:px-8 py-2 md:py-3"
                          style={{
                            background: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)',
                            borderRadius: '50px',
                            border: '3px solid #FFFFFF',
                            boxShadow: '0 0 30px rgba(255, 165, 0, 0.8), 0 4px 15px rgba(0, 0, 0, 0.6)'
                          }}
                        >
                          <p
                            className="text-base md:text-lg font-black"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF',
                              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
                            }}
                          >
                            ⏰ จำกัดเวลา 48 ชม.!
                          </p>
                        </div>
                      </div>

                      {/* Tour Title */}
                      <h3
                        className="text-[2rem] md:text-[2.5rem] font-black leading-tight mb-3"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 1px 1px 0px #FFFFFF, 2px 2px 0px #FFFFFF, 3px 3px 0px #FFD700, 6px 6px 0px #FF8C00, 9px 9px 0px #000000, 12px 12px 20px rgba(0, 0, 0, 0.8)',
                          WebkitTextStroke: '1px rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        ทัวร์สิงคโปร์<br />
                        4 วัน 3 คืน
                      </h3>

                      {/* Original Price - Strikethrough */}
                      <p
                        className="text-xl md:text-2xl font-bold mb-3"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)',
                          textDecoration: 'line-through',
                          opacity: 0.8
                        }}
                      >
                        ราคาปกติ 18,999.-
                      </p>

                      {/* Sale Price - Big & Bold */}
                      <div className="mb-5" style={{ animation: 'float 2.5s ease-in-out infinite' }}>
                        <p
                          className="text-sm md:text-base font-bold mb-1"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFEB3B',
                            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                          }}
                        >
                          ลดเหลือเพียง
                        </p>
                        <h2
                          className="text-6xl md:text-7xl font-black"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(135deg, #FFEB3B 0%, #FFA500 50%, #FF4500 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            filter: 'drop-shadow(0 0 20px rgba(255, 165, 0, 1)) drop-shadow(0 4px 10px rgba(0, 0, 0, 0.8))'
                          }}
                        >
                          12,999.-
                        </h2>
                      </div>

                      {/* CTA Button */}
                      <button
                        className="w-full max-w-sm mx-auto block"
                        style={{
                          background: 'linear-gradient(135deg, #FF4500 0%, #DC2626 100%)',
                          padding: '14px 28px',
                          borderRadius: '12px',
                          border: '2px solid #FFFFFF',
                          boxShadow: '0 0 30px rgba(255, 69, 0, 0.8), 0 6px 20px rgba(0, 0, 0, 0.6)',
                          cursor: 'pointer',
                          animation: 'scale-pulse 2s ease-in-out infinite'
                        }}
                      >
                        <p
                          className="text-xl md:text-2xl font-black"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          🔥 จองทันที!!
                        </p>
                      </button>

                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 8:9
                  </span>
                </div>
              </div>

              {/* Demo Card 7 - Early Bird Flash Sale */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[400px] md:h-[467px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform">
                  {/* Background */}
                  <img
                    src={"/vectors/Depositphotos_795891962_XL.jpg"}
                    alt="Flash Sale background"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Red Gradient Overlay - Flash Sale Style */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      height: '50%',
                      background: 'linear-gradient(to top, rgba(255, 0, 0, 0.7) 0%, rgba(255, 69, 0, 0.5) 30%, rgba(255, 165, 0, 0.3) 60%, rgba(255, 165, 0, 0) 100%)'
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6" style={{ transform: 'scale(0.8333)', transformOrigin: 'center center' }}>
                    <div className="relative text-center w-full px-2">

                      {/* Tour Title */}
                      <h3
                        className="text-[2rem] md:text-[2.5rem] font-black leading-tight mb-6"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 1px 1px 0px #FFFFFF, 2px 2px 0px #FFFFFF, 3px 3px 0px #FFD700, 6px 6px 0px #FF8C00, 9px 9px 0px #000000, 12px 12px 20px rgba(0, 0, 0, 0.8)',
                          WebkitTextStroke: '1px rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        ทัวร์เกาหลี โซล-ปูซาน<br />
                        6 วัน 5 คืน
                      </h3>

                      {/* Original Price */}
                      <p
                        className="text-xl md:text-2xl font-bold mb-3"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)',
                          textDecoration: 'line-through',
                          opacity: 0.8
                        }}
                      >
                        39,999.-
                      </p>

                      {/* Sale Price */}
                      <div className="mb-6" style={{ animation: 'float 2.5s ease-in-out infinite' }}>
                        <h2
                          className="text-7xl md:text-8xl font-black"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(135deg, #FFEB3B 0%, #FFA500 50%, #FF4500 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            filter: 'drop-shadow(0 0 25px rgba(255, 165, 0, 1)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.8))'
                          }}
                        >
                          19,999.-
                        </h2>
                      </div>

                      {/* CTA Button */}
                      <button
                        className="w-full max-w-sm mx-auto block"
                        style={{
                          background: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)',
                          padding: '14px 28px',
                          borderRadius: '12px',
                          border: '3px solid #FFEB3B',
                          boxShadow: '0 0 30px rgba(255, 165, 0, 0.8), 0 6px 20px rgba(0, 0, 0, 0.6)',
                          cursor: 'pointer',
                          animation: 'scale-pulse 2s ease-in-out infinite'
                        }}
                      >
                        <p
                          className="text-xl md:text-2xl font-black"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(90deg, #FFFFFF 0%, #FFEB3B 50%, #FFFFFF 100%)',
                            backgroundSize: '200% auto',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            animation: 'shimmer 2s linear infinite',
                            filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8)) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.9))'
                          }}
                        >
                          ประหยัดไป 20,000.- จองเลย!
                        </p>
                      </button>

                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 9:10
                  </span>
                </div>
              </div>

              {/* Demo Card 8 - Flash Bang Sale */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[396px] md:h-[462px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform">
                  {/* Background */}
                  <img
                    src={"/vectors/Depositphotos_795891962_XL.jpg"}
                    alt="Flash Sale background"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Red Gradient Overlay - Flash Sale Style */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      height: '50%',
                      background: 'linear-gradient(to top, rgba(255, 0, 0, 0.7) 0%, rgba(255, 69, 0, 0.5) 30%, rgba(255, 165, 0, 0.3) 60%, rgba(255, 165, 0, 0) 100%)'
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6" style={{ transform: 'scale(0.8250)', transformOrigin: 'center center' }}>
                    <div className="relative text-center w-full px-2">

                      {/* Discount Percentage Badge */}
                      <div className="mb-5" style={{ animation: 'scale-pulse 2s ease-in-out infinite' }}>
                        <div
                          className="inline-block px-8 md:px-10 py-3 md:py-4"
                          style={{
                            background: 'linear-gradient(135deg, #FF0000 0%, #FF4500 100%)',
                            borderRadius: '20px',
                            border: '3px solid #FFEB3B',
                            boxShadow: '0 0 40px rgba(255, 0, 0, 0.9), 0 6px 20px rgba(0, 0, 0, 0.6)'
                          }}
                        >
                          <p
                            className="text-sm font-bold mb-1"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFEB3B'
                            }}
                          >
                            ส่วนลดสูงสุด
                          </p>
                          <p
                            className="text-5xl md:text-6xl font-black leading-none"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              background: 'linear-gradient(90deg, #FFFFFF 0%, #FFEB3B 50%, #FFFFFF 100%)',
                              backgroundSize: '200% auto',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                              animation: 'shimmer 2s linear infinite',
                              filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.9))'
                            }}
                          >
                            60%
                          </p>
                        </div>
                      </div>

                      {/* Tour Title */}
                      <h3
                        className="text-[2rem] md:text-[2.5rem] font-black leading-tight mb-6"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 1px 1px 0px #FFFFFF, 2px 2px 0px #FFFFFF, 3px 3px 0px #FFD700, 6px 6px 0px #FF8C00, 9px 9px 0px #000000, 12px 12px 20px rgba(0, 0, 0, 0.8)',
                          WebkitTextStroke: '1px rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        ทัวร์ตุรกี อิสตันบูล<br />
                        8 วัน 7 คืน
                      </h3>

                      {/* Original Price */}
                      <p
                        className="text-xl md:text-2xl font-bold mb-3"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)',
                          textDecoration: 'line-through',
                          opacity: 0.8
                        }}
                      >
                        79,999.-
                      </p>

                      {/* Sale Price */}
                      <div className="mb-6" style={{ animation: 'float 2.5s ease-in-out infinite' }}>
                        <h2
                          className="text-7xl md:text-8xl font-black"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(135deg, #FFEB3B 0%, #FFA500 50%, #FF4500 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            filter: 'drop-shadow(0 0 25px rgba(255, 165, 0, 1)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.8))'
                          }}
                        >
                          31,999.-
                        </h2>
                      </div>

                      {/* CTA Button */}
                      <button
                        className="w-full max-w-sm mx-auto block"
                        style={{
                          background: 'linear-gradient(135deg, #FF4500 0%, #DC2626 100%)',
                          padding: '14px 28px',
                          borderRadius: '12px',
                          border: '3px solid #FFEB3B',
                          boxShadow: '0 0 40px rgba(255, 69, 0, 0.9), 0 6px 20px rgba(0, 0, 0, 0.6)',
                          cursor: 'pointer',
                          animation: 'scale-pulse 2s ease-in-out infinite'
                        }}
                      >
                        <p
                          className="text-xl md:text-2xl font-black"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(90deg, #FFFFFF 0%, #FFEB3B 50%, #FFFFFF 100%)',
                            backgroundSize: '200% auto',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            animation: 'shimmer 2s linear infinite',
                            filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8)) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.9))'
                          }}
                        >
                          ประหยัดไป 48,000.- จองเลย!
                        </p>
                      </button>

                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 10:11
                  </span>
                </div>
              </div>

              {/* Demo Card 9 - Dubai Scenic */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[393px] md:h-[458px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform">
                  {/* Background - Comic Pop Art */}
                  <img
                    src={"/vectors/Comic pop art background.jpg"}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      filter: 'brightness(0.6) contrast(1.1)'
                    }}
                  />

                  {/* Top Image Layer - Dubai (40%) with smooth blend */}
                  <div
                    className="absolute top-0 left-0 right-0"
                    style={{
                      height: '40%',
                      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)'
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80"
                      alt="Dubai cityscape"
                      className="w-full h-full object-cover"
                      style={{
                        opacity: 0.85,
                        mixBlendMode: 'luminosity'
                      }}
                    />
                  </div>

                  {/* Red Gradient Overlay - Flash Sale Style */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      height: '60%',
                      background: 'linear-gradient(to top, rgba(255, 0, 0, 0.7) 0%, rgba(255, 69, 0, 0.5) 30%, rgba(255, 165, 0, 0.3) 60%, rgba(255, 165, 0, 0) 100%)'
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6" style={{ transform: 'scale(0.8187)', transformOrigin: 'center center' }}>
                    <div className="relative text-center w-full px-2">

                      {/* Tour Title */}
                      <h3
                        className="text-[2rem] md:text-[2.5rem] font-black leading-tight mb-6"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 1px 1px 0px #FFFFFF, 2px 2px 0px #FFFFFF, 3px 3px 0px #FFD700, 6px 6px 0px #FF8C00, 9px 9px 0px #000000, 12px 12px 20px rgba(0, 0, 0, 0.8)',
                          WebkitTextStroke: '1px rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        ทัวร์ดูไบ-อาบูดาบี<br />
                        5 วัน 3 คืน
                      </h3>

                      {/* Original Price */}
                      <p
                        className="text-xl md:text-2xl font-bold mb-3"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)',
                          textDecoration: 'line-through',
                          opacity: 0.8
                        }}
                      >
                        42,999.-
                      </p>

                      {/* Sale Price */}
                      <div className="mb-6" style={{ animation: 'float 2.5s ease-in-out infinite' }}>
                        <h2
                          className="text-7xl md:text-8xl font-black"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(135deg, #FFEB3B 0%, #FFA500 50%, #FF4500 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            filter: 'drop-shadow(0 0 25px rgba(255, 165, 0, 1)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.8))'
                          }}
                        >
                          34,999.-
                        </h2>
                      </div>

                      {/* CTA Button */}
                      <button
                        className="w-full max-w-sm mx-auto block"
                        style={{
                          background: 'linear-gradient(135deg, #FF0000 0%, #DC2626 100%)',
                          padding: '14px 28px',
                          borderRadius: '12px',
                          border: '3px solid #FFEB3B',
                          boxShadow: '0 0 30px rgba(255, 0, 0, 0.8), 0 6px 20px rgba(0, 0, 0, 0.6)',
                          cursor: 'pointer',
                          animation: 'scale-pulse 2s ease-in-out infinite'
                        }}
                      >
                        <p
                          className="text-xl md:text-2xl font-black"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(90deg, #FFFFFF 0%, #FFEB3B 50%, #FFFFFF 100%)',
                            backgroundSize: '200% auto',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            animation: 'shimmer 2s linear infinite',
                            filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8)) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.9))'
                          }}
                        >
                          จองเลย!
                        </p>
                      </button>

                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 11:12
                  </span>
                </div>
              </div>

              {/* Demo Card 10 - Vietnam Flash Sale */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform">
                  {/* Background - Comic Pop Art */}
                  <img
                    src={"/vectors/Depositphotos_795891962_XL.jpg"}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      filter: 'brightness(0.7) contrast(1.1)'
                    }}
                  />

                  {/* Top Image Layer - Vietnam (40%) with smooth blend */}
                  <div
                    className="absolute top-0 left-0 right-0"
                    style={{
                      height: '40%',
                      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)'
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80"
                      alt="Vietnam landscape"
                      className="w-full h-full object-cover"
                      style={{
                        opacity: 0.85,
                        mixBlendMode: 'luminosity'
                      }}
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      height: '60%',
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 30%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0) 100%)'
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="relative text-center w-full px-2">

                      {/* Tour Type Header */}
                      <div className="mb-2">
                        <h3
                          className="text-4xl md:text-5xl font-black tracking-tight"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FF4500',
                            textShadow: '4px 4px 0px rgba(0, 0, 0, 0.8), 8px 8px 20px rgba(0, 0, 0, 0.6)',
                            WebkitTextStroke: '2px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          ทัวร์เวียดนาม <span style={{ color: '#FFEB3B' }}>สุดฮอต</span>
                        </h3>
                      </div>

                      {/* Duration */}
                      <div className="mb-3">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                          }}
                        >
                          ฮานอย-ฮาลอง 4 วัน 3 คืน
                        </p>
                      </div>

                      {/* Promo Badge */}
                      <div className="inline-block mb-3 px-4 md:px-6 py-1.5 md:py-2 rounded-full" style={{ background: 'linear-gradient(135deg, #FFEB3B 0%, #FBC02D 100%)', boxShadow: '0 4px 12px rgba(251, 192, 45, 0.6)' }}>
                        <p className="text-lg md:text-xl font-black text-black" style={{ fontFamily: 'Kanit, sans-serif' }}>
                          📅 โปรถึง 31 ธ.ค. เท่านั้น!
                        </p>
                      </div>

                      {/* Discount Line */}
                      <div className="mb-2">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          ลดเหลือจาก <span className="line-through" style={{ color: '#FF6B6B' }}>24,999.-</span>
                        </p>
                      </div>

                      {/* Main Price */}
                      <div className="relative inline-block">
                        <h1
                          className="text-6xl md:text-7xl font-black leading-none"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(180deg, #FFEB3B 0%, #FF9800 50%, #FF5722 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '0 0 30px rgba(255, 235, 59, 0.8)',
                            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 20px rgba(255, 152, 0, 0.8))',
                            WebkitTextStroke: '1px rgba(255, 235, 59, 0.5)'
                          }}
                        >
                          16,999.-
                        </h1>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-4">
                        <button
                          className="w-full max-w-sm mx-auto block"
                          style={{
                            background: 'linear-gradient(135deg, #FF0000 0%, #DC2626 100%)',
                            padding: '16px 32px',
                            borderRadius: '12px',
                            border: '3px solid #FFEB3B',
                            boxShadow: '0 0 40px rgba(255, 0, 0, 0.8), 0 6px 20px rgba(0, 0, 0, 0.6)',
                            cursor: 'pointer',
                            animation: 'scale-pulse 2s ease-in-out infinite'
                          }}
                        >
                          <p
                            className="text-xl md:text-2xl font-black"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF',
                              textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                            }}
                          >
                            🎁 รับส่วนลด 8,000.- เลย!
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 11 - Hong Kong with Bottom Banner */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform">
                  {/* Background - Comic Pop Art */}
                  <img
                    src="/vectors/Comic pop art background.jpg"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      filter: 'brightness(0.7) contrast(1.1)'
                    }}
                  />

                  {/* Bottom Image Layer - Hong Kong Temple (40%) with smooth blend */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      height: '40%',
                      maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)',
                      WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)'
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=800&q=80"
                      alt="Hong Kong Temple"
                      className="w-full h-full object-cover"
                      style={{
                        opacity: 0.85,
                        mixBlendMode: 'luminosity'
                      }}
                    />
                  </div>

                  {/* Gradient Overlay for top content */}
                  <div
                    className="absolute top-0 left-0 right-0"
                    style={{
                      height: '60%',
                      background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 30%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0) 100%)'
                    }}
                  />

                  {/* Content - Positioned at Top */}
                  <div className="absolute inset-0 flex flex-col items-center justify-start pt-8 p-4 md:p-6" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="relative text-center w-full px-2">
                      {/* Top Header - Tour Type */}
                      <div className="mb-2">
                        <h3
                          className="text-4xl md:text-5xl font-black tracking-tight"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFEB3B',
                            textShadow: '4px 4px 0px rgba(0, 0, 0, 0.8), 8px 8px 20px rgba(0, 0, 0, 0.6)',
                            WebkitTextStroke: '2px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          ทัวร์ฮ่องกง <span style={{ color: '#FFFFFF' }}>สุดฮิต</span>
                        </h3>
                      </div>

                      {/* Sub Header - Duration */}
                      <div className="mb-3">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                          }}
                        >
                          ฮ่องกง-มาเก๊า 4 วัน 3 คืน
                        </p>
                      </div>

                      {/* Promo Badge */}
                      <div className="inline-block mb-3 px-4 md:px-6 py-1.5 md:py-2 rounded-full" style={{ background: 'linear-gradient(135deg, #FFEB3B 0%, #FBC02D 100%)', boxShadow: '0 4px 12px rgba(251, 192, 45, 0.6)' }}>
                        <p className="text-lg md:text-xl font-black text-black" style={{ fontFamily: 'Kanit, sans-serif' }}>
                          🎉 โปรพิเศษ! ลดทันที
                        </p>
                      </div>

                      {/* Discount Line */}
                      <div className="mb-2">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          ลดเหลือจาก <span className="line-through" style={{ color: '#FF6B6B' }}>18,999.-</span>
                        </p>
                      </div>

                      {/* Main Price */}
                      <div className="relative inline-block">
                        <h1
                          className="text-6xl md:text-7xl font-black leading-none"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(180deg, #FFEB3B 0%, #FF9800 50%, #FF5722 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '0 0 30px rgba(255, 235, 59, 0.8)',
                            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 20px rgba(255, 152, 0, 0.8))',
                            WebkitTextStroke: '1px rgba(255, 235, 59, 0.5)'
                          }}
                        >
                          12,999.-
                        </h1>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-4">
                        <button
                          className="w-full max-w-sm mx-auto block"
                          style={{
                            background: 'linear-gradient(135deg, #FF0000 0%, #DC2626 100%)',
                            padding: '16px 32px',
                            borderRadius: '12px',
                            border: '3px solid #FFEB3B',
                            boxShadow: '0 0 40px rgba(255, 0, 0, 0.8), 0 6px 20px rgba(0, 0, 0, 0.6)',
                            cursor: 'pointer',
                            animation: 'scale-pulse 2s ease-in-out infinite'
                          }}
                        >
                          <p
                            className="text-xl md:text-2xl font-black"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF',
                              textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                            }}
                          >
                            🎁 จองเลย รับของฟรี!
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 12 - Taiwan with Bottom Banner and Red Overlay */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform">
                  {/* Background - Comic Pop Art */}
                  <img
                    src="/vectors/Comic pop art background.jpg"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      filter: 'brightness(0.7) contrast(1.1)'
                    }}
                  />

                  {/* Bottom Image Layer - Taiwan Temple (40%) with smooth blend */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      height: '40%',
                      maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)',
                      WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)'
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=800&q=80"
                      alt="Taiwan Temple"
                      className="w-full h-full object-cover"
                      style={{
                        opacity: 0.85,
                        mixBlendMode: 'luminosity'
                      }}
                    />
                  </div>

                  {/* Red Gradient Overlay for top content */}
                  <div
                    className="absolute top-0 left-0 right-0"
                    style={{
                      height: '60%',
                      background: 'linear-gradient(to bottom, rgba(139, 0, 0, 0.8) 0%, rgba(178, 34, 34, 0.6) 30%, rgba(220, 20, 60, 0.3) 60%, rgba(255, 0, 0, 0) 100%)'
                    }}
                  />

                  {/* Content - Positioned at Top */}
                  <div className="absolute inset-0 flex flex-col items-center justify-start pt-8 p-4 md:p-6" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="relative text-center w-full px-2">
                      {/* Top Header - Tour Type */}
                      <div className="mb-2">
                        <h3
                          className="text-4xl md:text-5xl font-black tracking-tight"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFEB3B',
                            textShadow: '4px 4px 0px rgba(139, 0, 0, 0.8), 8px 8px 20px rgba(178, 34, 34, 0.6)',
                            WebkitTextStroke: '2px rgba(139, 0, 0, 0.3)'
                          }}
                        >
                          ทัวร์ญี่ปุ่น <span style={{ color: '#FFFFFF' }}>ฮอตฮิต</span>
                        </h3>
                      </div>

                      {/* Sub Header - Duration */}
                      <div className="mb-3">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 8px rgba(139, 0, 0, 0.9)'
                          }}
                        >
                          โตเกียว-ฟูจิ 5 วัน 4 คืน
                        </p>
                      </div>

                      {/* Promo Badge */}
                      <div className="inline-block mb-3 px-4 md:px-6 py-1.5 md:py-2 rounded-full" style={{ background: 'linear-gradient(135deg, #FFEB3B 0%, #FBC02D 100%)', boxShadow: '0 4px 12px rgba(251, 192, 45, 0.6)' }}>
                        <p className="text-lg md:text-xl font-black text-black" style={{ fontFamily: 'Kanit, sans-serif' }}>
                          🔥 ลดพิเศษ! จองด่วน
                        </p>
                      </div>

                      {/* Discount Line */}
                      <div className="mb-2">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 6px rgba(139, 0, 0, 0.8)'
                          }}
                        >
                          ลดเหลือจาก <span className="line-through" style={{ color: '#FFB6C1' }}>22,999.-</span>
                        </p>
                      </div>

                      {/* Main Price */}
                      <div className="relative inline-block">
                        <h1
                          className="text-6xl md:text-7xl font-black leading-none"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(180deg, #FFEB3B 0%, #FF9800 50%, #FF5722 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '0 0 30px rgba(255, 235, 59, 0.8)',
                            filter: 'drop-shadow(0 4px 8px rgba(139, 0, 0, 0.9)) drop-shadow(0 0 20px rgba(255, 152, 0, 0.8))',
                            WebkitTextStroke: '1px rgba(255, 235, 59, 0.5)'
                          }}
                        >
                          15,999.-
                        </h1>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-4">
                        <button
                          className="w-full max-w-sm mx-auto block"
                          style={{
                            background: 'linear-gradient(135deg, #FF0000 0%, #DC2626 100%)',
                            padding: '16px 32px',
                            borderRadius: '12px',
                            border: '3px solid #FFEB3B',
                            boxShadow: '0 0 40px rgba(255, 0, 0, 0.8), 0 6px 20px rgba(139, 0, 0, 0.6)',
                            cursor: 'pointer',
                            animation: 'scale-pulse 2s ease-in-out infinite'
                          }}
                        >
                          <p
                            className="text-xl md:text-2xl font-black"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF',
                              textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                            }}
                          >
                            🎊 จองเลย! ของแถมเพียบ
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 13 - Diagonal Split Design */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80"
                    alt="Maldives Beach"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Diagonal Overlay - Top Right */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(135deg, transparent 0%, transparent 40%, rgba(255, 0, 0, 0.95) 40%, rgba(220, 38, 38, 0.98) 100%)',
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                    }}
                  />

                  {/* Content - Bottom Right Diagonal Section */}
                  <div className="absolute inset-0 flex items-end justify-end p-6 md:p-8" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="relative text-right w-full" style={{ maxWidth: '85%' }}>
                      {/* Flash Sale Badge */}
                      <div className="inline-block mb-2 px-4 py-1 rounded-full" style={{ background: 'linear-gradient(90deg, #FFEB3B 0%, #FFA500 100%)', boxShadow: '0 4px 12px rgba(255, 165, 0, 0.6)', animation: 'scale-pulse 2s ease-in-out infinite' }}>
                        <p className="text-sm md:text-base font-black text-black" style={{ fontFamily: 'Kanit, sans-serif' }}>
                          ⚡ FLASH SALE ⚡
                        </p>
                      </div>

                      {/* Destination */}
                      <h3
                        className="text-[2.5rem] md:text-[3rem] font-black leading-none mb-2"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFEB3B',
                          textShadow: '3px 3px 0px rgba(0, 0, 0, 0.8), 6px 6px 15px rgba(0, 0, 0, 0.6)',
                          WebkitTextStroke: '1.5px rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        มัลดีฟส์
                      </h3>

                      {/* Duration */}
                      <p
                        className="text-lg md:text-xl font-bold mb-3"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                        }}
                      >
                        5 วัน 4 คืน พักรีสอร์ท 5 ดาว
                      </p>

                      {/* Price Display */}
                      <div className="mb-3">
                        <p className="text-base text-white opacity-80 mb-1" style={{ fontFamily: 'Kanit, sans-serif' }}>
                          ราคาพิเศษเพียง
                        </p>
                        <h1
                          className="text-6xl md:text-7xl font-black leading-none mb-1"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(180deg, #FFEB3B 0%, #FF9800 50%, #FFA500 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 25px rgba(255, 215, 0, 0.9))',
                            WebkitTextStroke: '1px rgba(255, 235, 59, 0.6)'
                          }}
                        >
                          49,999.-
                        </h1>
                        <p
                          className="text-lg font-bold line-through opacity-70"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFB6C1'
                          }}
                        >
                          จาก 99,999.-
                        </p>
                      </div>

                      {/* CTA Button */}
                      <button
                        className="w-full"
                        style={{
                          background: 'linear-gradient(135deg, #FFEB3B 0%, #FFA500 100%)',
                          padding: '14px 28px',
                          borderRadius: '12px',
                          border: '3px solid #FFFFFF',
                          boxShadow: '0 0 30px rgba(255, 165, 0, 0.8), 0 6px 20px rgba(0, 0, 0, 0.6)',
                          cursor: 'pointer',
                          animation: 'scale-pulse 2s ease-in-out infinite'
                        }}
                      >
                        <p
                          className="text-xl md:text-2xl font-black"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#DC2626',
                            textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
                          }}
                        >
                          🏝️ จองเลย! ลดครึ่งราคา
                        </p>
                      </button>
                    </div>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 14 - Korea with Left Overlay */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80"
                    alt="Seoul Korea"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Left-to-Right Red Gradient Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(90deg, rgba(220, 38, 38, 0.98) 0%, rgba(255, 0, 0, 0.95) 35%, transparent 70%, transparent 100%)',
                    }}
                  />

                  {/* Content - Left Side */}
                  <div className="absolute inset-0 flex items-center justify-start p-6 md:p-8" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="relative text-left" style={{ maxWidth: '75%' }}>
                      {/* Flash Sale Badge */}
                      <div className="inline-block mb-3 px-4 py-1 rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, #FFEB3B 0%, #FFA500 100%)',
                          animation: 'scale-pulse 2s ease-in-out infinite',
                          boxShadow: '0 4px 15px rgba(255, 215, 0, 0.6)'
                        }}>
                        <p className="text-sm md:text-base font-black text-black">
                          ⚡ FLASH SALE ⚡
                        </p>
                      </div>

                      {/* Destination */}
                      <h3
                        className="text-[2.5rem] md:text-[3rem] font-black leading-none mb-2"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFEB3B',
                          textShadow: '3px 3px 0px rgba(0, 0, 0, 0.8), 6px 6px 15px rgba(0, 0, 0, 0.6)',
                        }}
                      >
                        ทัวร์เกาหลี
                      </h3>

                      {/* Duration */}
                      <p
                        className="text-lg md:text-xl font-bold mb-4"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                        }}
                      >
                        โซล-เมียงดง 5 วัน 3 คืน
                      </p>

                      {/* Original Price */}
                      <p
                        className="text-2xl font-bold mb-1"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFB6C1',
                          textDecoration: 'line-through',
                          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)',
                        }}
                      >
                        69,999.-
                      </p>

                      {/* Price */}
                      <h1
                        className="text-6xl md:text-7xl font-black leading-none mb-4"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(180deg, #FFEB3B 0%, #FF9800 50%, #FFA500 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 25px rgba(255, 215, 0, 0.9))',
                        }}
                      >
                        34,999.-
                      </h1>

                      {/* CTA Button */}
                      <button
                        className="w-full px-6 py-3 rounded-xl font-black text-base md:text-lg shadow-xl transition-all duration-300 hover:scale-105"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(135deg, #FFEB3B 0%, #FFA500 100%)',
                          border: '3px solid #FFFFFF',
                          animation: 'scale-pulse 2s ease-in-out infinite'
                        }}
                      >
                        <p style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#DC2626',
                        }}>
                          🛫 จองด่วน! เหลือที่นั่งน้อย
                        </p>
                      </button>
                    </div>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 15 - Turkey with Circular Gradient */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80"
                    alt="Turkey Cappadocia Hot Air Balloons"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Radial Gradient Overlay from bottom-left */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(circle at 20% 85%, rgba(220, 38, 38, 0.98) 0%, rgba(255, 0, 0, 0.90) 25%, rgba(255, 69, 0, 0.70) 45%, transparent 70%)',
                    }}
                  />

                  {/* Content - Bottom Left */}
                  <div className="absolute inset-0 flex items-end justify-start p-6 md:p-8" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="relative text-left" style={{ maxWidth: '85%' }}>
                      {/* Flash Sale Badge */}
                      <div className="inline-block mb-2 px-4 py-1.5 rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, #FFEB3B 0%, #FFA500 100%)',
                          animation: 'scale-pulse 2s ease-in-out infinite',
                          boxShadow: '0 6px 20px rgba(255, 215, 0, 0.7)',
                          border: '2px solid rgba(255, 255, 255, 0.5)'
                        }}>
                        <p className="text-sm md:text-base font-black text-black">
                          ⚡ HOT DEAL ⚡
                        </p>
                      </div>

                      {/* Destination */}
                      <h3
                        className="text-[2.8rem] md:text-[3.2rem] font-black leading-none mb-1"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFEB3B',
                          textShadow: '4px 4px 0px rgba(0, 0, 0, 0.9), 8px 8px 20px rgba(0, 0, 0, 0.7)',
                        }}
                      >
                        ทัวร์ตุรกี
                      </h3>

                      {/* Duration */}
                      <p
                        className="text-lg md:text-xl font-bold mb-2"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)',
                        }}
                      >
                        อิสตันบูล-คัปปาโดเจีย 7 วัน 5 คืน
                      </p>

                      {/* Original Price */}
                      <p
                        className="text-2xl font-bold mb-1"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFE4E1',
                          textDecoration: 'line-through',
                          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                        }}
                      >
                        89,999.-
                      </p>

                      {/* Price */}
                      <h1
                        className="text-7xl md:text-8xl font-black leading-none mb-3"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(180deg, #FFEB3B 0%, #FFD700 30%, #FFA500 70%, #FF8C00 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 5px 10px rgba(0, 0, 0, 1)) drop-shadow(0 0 30px rgba(255, 215, 0, 1))',
                        }}
                      >
                        44,999.-
                      </h1>

                      {/* CTA Button */}
                      <button
                        className="w-full px-6 py-3.5 rounded-2xl font-black text-base md:text-lg shadow-2xl transition-all duration-300 hover:scale-105"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(135deg, #FFEB3B 0%, #FFD700 50%, #FFA500 100%)',
                          border: '3px solid #FFFFFF',
                          boxShadow: '0 8px 25px rgba(255, 140, 0, 0.6), inset 0 2px 5px rgba(255, 255, 255, 0.5)',
                          animation: 'float 3s ease-in-out infinite'
                        }}
                      >
                        <p style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#DC2626',
                          textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)'
                        }}>
                          🎈 จองด่วน! ลดกระหน่ำ 50%
                        </p>
                      </button>
                    </div>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 16 - Dubai with Top-Right Radial */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80"
                    alt="Dubai Burj Khalifa"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Radial Gradient Overlay from top-right */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(circle at 80% 20%, rgba(255, 0, 0, 0.95) 0%, rgba(220, 38, 38, 0.90) 20%, rgba(178, 34, 34, 0.75) 40%, transparent 65%)',
                    }}
                  />

                  {/* Content - Top Right */}
                  <div className="absolute inset-0 flex items-start justify-end p-6 md:p-8 pt-8" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="relative text-right" style={{ maxWidth: '80%' }}>
                      {/* Flash Sale Badge */}
                      <div className="inline-block mb-2 px-5 py-1.5 rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, #FFA500 0%, #FFEB3B 100%)',
                          animation: 'wiggle 3s ease-in-out infinite',
                          boxShadow: '0 6px 20px rgba(255, 165, 0, 0.8)',
                          border: '2px solid rgba(255, 255, 255, 0.6)'
                        }}>
                        <p className="text-sm md:text-base font-black text-black">
                          ⚡ SUPER SALE ⚡
                        </p>
                      </div>

                      {/* Destination */}
                      <h3
                        className="text-[2.8rem] md:text-[3.2rem] font-black leading-none mb-1"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFEB3B',
                          textShadow: '4px 4px 0px rgba(0, 0, 0, 0.9), 8px 8px 20px rgba(0, 0, 0, 0.8)',
                        }}
                      >
                        ทัวร์ดูไบ
                      </h3>

                      {/* Duration */}
                      <p
                        className="text-lg md:text-xl font-bold mb-3"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)',
                        }}
                      >
                        ดูไบ-อาบูดาบี 5 วัน 3 คืน
                      </p>

                      {/* Original Price */}
                      <p
                        className="text-xl font-bold mb-1"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFE4E1',
                          textDecoration: 'line-through',
                          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                        }}
                      >
                        79,999.-
                      </p>

                      {/* Price */}
                      <h1
                        className="text-6xl md:text-7xl font-black leading-none mb-4"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(180deg, #FFEB3B 0%, #FFD700 40%, #FFA500 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 5px 10px rgba(0, 0, 0, 1)) drop-shadow(0 0 30px rgba(255, 215, 0, 1))',
                        }}
                      >
                        39,999.-
                      </h1>

                      {/* CTA Button */}
                      <button
                        className="w-full px-6 py-3.5 rounded-2xl font-black text-base md:text-lg shadow-2xl transition-all duration-300 hover:scale-105"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(135deg, #FFEB3B 0%, #FFD700 50%, #FFA500 100%)',
                          border: '3px solid #FFFFFF',
                          boxShadow: '0 8px 25px rgba(255, 165, 0, 0.7), inset 0 2px 5px rgba(255, 255, 255, 0.5)',
                          animation: 'scale-pulse 2s ease-in-out infinite'
                        }}
                      >
                        <p style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#DC2626',
                          textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)'
                        }}>
                          🏙️ จองเลย! ลดสุดคุ้ม 50%
                        </p>
                      </button>
                    </div>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 17 - Italy Diagonal Right */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80"
                    alt="Italy Venice"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Diagonal Overlay - Bottom Left to Top Right */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(45deg, rgba(255, 0, 0, 0.95) 0%, rgba(220, 38, 38, 0.98) 35%, transparent 65%, transparent 100%)',
                    }}
                  />

                  {/* Content - Bottom Left */}
                  <div className="absolute inset-0 flex items-end justify-start p-6 md:p-8" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="relative text-left w-full" style={{ maxWidth: '85%' }}>
                      {/* Flash Sale Badge */}
                      <div className="inline-block mb-2 px-4 py-1 rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, #FFEB3B 0%, #FFA500 100%)',
                          animation: 'scale-pulse 2s ease-in-out infinite',
                          boxShadow: '0 4px 15px rgba(255, 215, 0, 0.7)'
                        }}>
                        <p className="text-sm md:text-base font-black text-black">
                          ⚡ FLASH SALE ⚡
                        </p>
                      </div>

                      {/* Destination */}
                      <h3
                        className="text-[2.5rem] md:text-[3rem] font-black leading-none mb-2"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFEB3B',
                          textShadow: '3px 3px 0px rgba(0, 0, 0, 0.8), 6px 6px 15px rgba(0, 0, 0, 0.6)',
                        }}
                      >
                        ทัวร์อิตาลี
                      </h3>

                      {/* Duration */}
                      <p
                        className="text-lg md:text-xl font-bold mb-3"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                        }}
                      >
                        โรม-เวนิส 7 วัน 5 คืน
                      </p>

                      {/* Original Price */}
                      <p
                        className="text-xl font-bold mb-1"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFB6C1',
                          textDecoration: 'line-through',
                          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)',
                        }}
                      >
                        119,999.-
                      </p>

                      {/* Price */}
                      <h1
                        className="text-6xl md:text-7xl font-black leading-none mb-3"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(180deg, #FFEB3B 0%, #FF9800 50%, #FFA500 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 25px rgba(255, 215, 0, 0.9))',
                        }}
                      >
                        59,999.-
                      </h1>

                      {/* CTA Button */}
                      <button
                        className="w-full px-6 py-3 rounded-xl font-black text-base md:text-lg shadow-xl transition-all duration-300 hover:scale-105"
                        style={{
                          background: 'linear-gradient(135deg, #FFEB3B 0%, #FFA500 100%)',
                          border: '3px solid #FFFFFF',
                          animation: 'scale-pulse 2s ease-in-out infinite'
                        }}
                      >
                        <p style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#DC2626',
                        }}>
                          🏛️ จองด่วน! ลดครึ่งราคา
                        </p>
                      </button>
                    </div>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 18 - Spain with Bottom Radial */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80"
                    alt="Spain Barcelona"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Radial Gradient Overlay from bottom center */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(circle at 50% 90%, rgba(220, 38, 38, 0.98) 0%, rgba(255, 0, 0, 0.90) 25%, rgba(255, 69, 0, 0.70) 45%, transparent 70%)',
                    }}
                  />

                  {/* Content - Bottom Center */}
                  <div className="absolute inset-0 flex items-end justify-center p-6 md:p-8" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="relative text-center w-full">
                      {/* Flash Sale Badge */}
                      <div className="inline-block mb-2 px-4 py-1.5 rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, #FFEB3B 0%, #FFA500 100%)',
                          animation: 'wiggle 3s ease-in-out infinite',
                          boxShadow: '0 6px 20px rgba(255, 215, 0, 0.7)',
                          border: '2px solid rgba(255, 255, 255, 0.5)'
                        }}>
                        <p className="text-sm md:text-base font-black text-black">
                          ⚡ HOT DEAL ⚡
                        </p>
                      </div>

                      {/* Destination */}
                      <h3
                        className="text-[2.5rem] md:text-[3rem] font-black leading-none mb-2"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFEB3B',
                          textShadow: '4px 4px 0px rgba(0, 0, 0, 0.9), 8px 8px 20px rgba(0, 0, 0, 0.7)',
                        }}
                      >
                        ทัวร์สเปน
                      </h3>

                      {/* Duration */}
                      <p
                        className="text-base md:text-lg font-bold mb-2"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)',
                        }}
                      >
                        บาร์เซโลนา-มาดริด 6 วัน 4 คืน
                      </p>

                      {/* Original Price */}
                      <p
                        className="text-xl font-bold mb-1"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFE4E1',
                          textDecoration: 'line-through',
                          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                        }}
                      >
                        109,999.-
                      </p>

                      {/* Price */}
                      <h1
                        className="text-6xl md:text-7xl font-black leading-none mb-3"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(180deg, #FFEB3B 0%, #FFD700 30%, #FFA500 70%, #FF8C00 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 5px 10px rgba(0, 0, 0, 1)) drop-shadow(0 0 30px rgba(255, 215, 0, 1))',
                        }}
                      >
                        54,999.-
                      </h1>

                      {/* CTA Button */}
                      <button
                        className="w-full max-w-[300px] mx-auto px-6 py-3.5 rounded-2xl font-black text-base md:text-lg shadow-2xl transition-all duration-300 hover:scale-105"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(135deg, #FFEB3B 0%, #FFD700 50%, #FFA500 100%)',
                          border: '3px solid #FFFFFF',
                          boxShadow: '0 8px 25px rgba(255, 140, 0, 0.6), inset 0 2px 5px rgba(255, 255, 255, 0.5)',
                          animation: 'float 3s ease-in-out infinite'
                        }}
                      >
                        <p style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#DC2626',
                          textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)'
                        }}>
                          ⚽ จองเลย! ลดกระหน่ำ 50%
                        </p>
                      </button>
                    </div>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 19 - Iceland Left to Right */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80"
                    alt="Iceland Northern Lights"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Left-to-Right Red Gradient Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(90deg, rgba(220, 38, 38, 0.98) 0%, rgba(255, 0, 0, 0.95) 35%, transparent 70%, transparent 100%)',
                    }}
                  />

                  {/* Content - Left Side */}
                  <div className="absolute inset-0 flex items-center justify-start p-6 md:p-8" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="relative text-left" style={{ maxWidth: '75%' }}>
                      {/* Flash Sale Badge */}
                      <div className="inline-block mb-3 px-4 py-1 rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, #FFEB3B 0%, #FFA500 100%)',
                          animation: 'scale-pulse 2s ease-in-out infinite',
                          boxShadow: '0 4px 15px rgba(255, 215, 0, 0.6)'
                        }}>
                        <p className="text-sm md:text-base font-black text-black">
                          ⚡ MEGA SALE ⚡
                        </p>
                      </div>

                      {/* Destination */}
                      <h3
                        className="text-[2.5rem] md:text-[3rem] font-black leading-none mb-2"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFEB3B',
                          textShadow: '3px 3px 0px rgba(0, 0, 0, 0.8), 6px 6px 15px rgba(0, 0, 0, 0.6)',
                        }}
                      >
                        ทัวร์ไอซ์แลนด์
                      </h3>

                      {/* Duration */}
                      <p
                        className="text-lg md:text-xl font-bold mb-4"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                        }}
                      >
                        เรคยาวิก-โกลเด้นเซอร์เคิล 6 วัน 4 คืน
                      </p>

                      {/* Original Price */}
                      <p
                        className="text-2xl font-bold mb-1"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFB6C1',
                          textDecoration: 'line-through',
                          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)',
                        }}
                      >
                        139,999.-
                      </p>

                      {/* Price */}
                      <h1
                        className="text-6xl md:text-7xl font-black leading-none mb-4"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(180deg, #FFEB3B 0%, #FF9800 50%, #FFA500 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 25px rgba(255, 215, 0, 0.9))',
                        }}
                      >
                        69,999.-
                      </h1>

                      {/* CTA Button */}
                      <button
                        className="w-full px-6 py-3 rounded-xl font-black text-base md:text-lg shadow-xl transition-all duration-300 hover:scale-105"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(135deg, #FFEB3B 0%, #FFA500 100%)',
                          border: '3px solid #FFFFFF',
                          animation: 'scale-pulse 2s ease-in-out infinite'
                        }}
                      >
                        <p style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#DC2626',
                        }}>
                          🌌 จองด่วน! เหลือที่นั่งน้อย
                        </p>
                      </button>
                    </div>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 20 - Greece with Clean Asymmetric Design */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80"
                    alt="Greece Santorini Blue Dome"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: 'center' }}
                  />

                  {/* Soft Gradient Overlay - Only Bottom Third */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(220, 38, 38, 0.92) 0%, rgba(255, 0, 0, 0.75) 25%, transparent 50%)',
                    }}
                  />

                  {/* Content - Bottom with breathing room */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    {/* Flash Sale Badge - Top Left Corner */}
                    <div className="inline-block mb-3 px-3 py-1 rounded-md"
                      style={{
                        background: '#FFEB3B',
                        animation: 'wiggle 3s ease-in-out infinite',
                      }}>
                      <p className="text-xs font-black text-black">
                        ⚡ FLASH SALE
                      </p>
                    </div>

                    {/* Destination - Left Aligned */}
                    <h3
                      className="text-[2.2rem] md:text-[2.8rem] font-black leading-tight mb-1"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                        textShadow: '3px 3px 0px rgba(0, 0, 0, 0.7)',
                      }}
                    >
                      ทัวร์กรีซ
                    </h3>

                    <p
                      className="text-base md:text-lg font-bold mb-4"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                      }}
                    >
                      ซานโตรินี-เอเธนส์ 7 วัน 5 คืน
                    </p>

                    {/* Price Row - Horizontal Layout */}
                    <div className="flex items-baseline gap-3 mb-3">
                      <p
                        className="text-xl font-bold"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFB6C1',
                          textDecoration: 'line-through',
                        }}
                      >
                        129,999.-
                      </p>

                      <h1
                        className="text-5xl md:text-6xl font-black leading-none"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(180deg, #FFEB3B 0%, #FFD700 50%, #FFA500 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9))',
                        }}
                      >
                        64,999.-
                      </h1>
                    </div>

                    {/* CTA Button - Compact */}
                    <button
                      className="px-6 py-2.5 rounded-xl font-black text-sm md:text-base shadow-xl transition-all duration-300 hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #FFEB3B 0%, #FFA500 100%)',
                        border: '2px solid #FFFFFF',
                        animation: 'scale-pulse 2s ease-in-out infinite'
                      }}
                    >
                      <p style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#DC2626',
                      }}>
                        🏝️ จองเลย!
                      </p>
                    </button>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 21 - Norway with Top-Left Radial */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1601439678777-b2b3c56fa627?w=800&q=80"
                    alt="Norway Fjord"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Radial Gradient Overlay from top-left */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(circle at 15% 15%, rgba(255, 0, 0, 0.95) 0%, rgba(220, 38, 38, 0.90) 20%, rgba(178, 34, 34, 0.75) 40%, transparent 65%)',
                    }}
                  />

                  {/* Content - Top Left */}
                  <div className="absolute inset-0 flex items-start justify-start p-6 md:p-8 pt-8" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="relative text-left" style={{ maxWidth: '80%' }}>
                      {/* Flash Sale Badge */}
                      <div className="inline-block mb-2 px-5 py-1.5 rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, #FFEB3B 0%, #FFA500 100%)',
                          animation: 'wiggle 3s ease-in-out infinite',
                          boxShadow: '0 6px 20px rgba(255, 215, 0, 0.8)',
                          border: '2px solid rgba(255, 255, 255, 0.6)'
                        }}>
                        <p className="text-sm md:text-base font-black text-black">
                          ⚡ SUPER DEAL ⚡
                        </p>
                      </div>

                      {/* Destination */}
                      <h3
                        className="text-[2.8rem] md:text-[3.2rem] font-black leading-none mb-1"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFEB3B',
                          textShadow: '4px 4px 0px rgba(0, 0, 0, 0.9), 8px 8px 20px rgba(0, 0, 0, 0.8)',
                        }}
                      >
                        ทัวร์นอร์เวย์
                      </h3>

                      {/* Duration */}
                      <p
                        className="text-lg md:text-xl font-bold mb-3"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)',
                        }}
                      >
                        ออสโล-ฟยอร์ด 8 วัน 6 คืน
                      </p>

                      {/* Original Price */}
                      <p
                        className="text-xl font-bold mb-1"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFE4E1',
                          textDecoration: 'line-through',
                          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                        }}
                      >
                        149,999.-
                      </p>

                      {/* Price */}
                      <h1
                        className="text-6xl md:text-7xl font-black leading-none mb-4"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(180deg, #FFEB3B 0%, #FFD700 40%, #FFA500 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 5px 10px rgba(0, 0, 0, 1)) drop-shadow(0 0 30px rgba(255, 215, 0, 1))',
                        }}
                      >
                        74,999.-
                      </h1>

                      {/* CTA Button */}
                      <button
                        className="w-full px-6 py-3.5 rounded-2xl font-black text-base md:text-lg shadow-2xl transition-all duration-300 hover:scale-105"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(135deg, #FFEB3B 0%, #FFD700 50%, #FFA500 100%)',
                          border: '3px solid #FFFFFF',
                          boxShadow: '0 8px 25px rgba(255, 165, 0, 0.7), inset 0 2px 5px rgba(255, 255, 255, 0.5)',
                          animation: 'scale-pulse 2s ease-in-out infinite'
                        }}
                      >
                        <p style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#DC2626',
                          textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)'
                        }}>
                          ⛰️ จองเลย! ลดสุดคุ้ม 50%
                        </p>
                      </button>
                    </div>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 22 - Portugal with Minimal Split Design */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80"
                    alt="Portugal Lisbon"
                    className="absolute inset-0 w-full h-full object-cover brightness-105"
                  />

                  {/* Diagonal Accent Strip - Top Right to Bottom */}
                  <div
                    className="absolute top-0 right-0 bottom-0"
                    style={{
                      width: '45%',
                      background: 'linear-gradient(165deg, rgba(220, 38, 38, 0.88) 0%, rgba(255, 0, 0, 0.92) 100%)',
                      clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)',
                    }}
                  />

                  {/* Content - Right Side in Red Area */}
                  <div className="absolute top-0 right-0 bottom-0 flex items-center" style={{ width: '45%' }}>
                    <div className="p-5 md:p-6 text-right w-full">
                      {/* Flash Badge */}
                      <div className="inline-block mb-4 px-3 py-1 rounded-md"
                        style={{
                          background: '#FFEB3B',
                          animation: 'wiggle 3s ease-in-out infinite',
                        }}>
                        <p className="text-xs font-black text-black">
                          ⚡ SALE
                        </p>
                      </div>

                      {/* Destination */}
                      <h3
                        className="text-[1.6rem] md:text-[2rem] font-black leading-tight mb-2"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFEB3B',
                          textShadow: '2px 2px 0px rgba(0, 0, 0, 0.6)',
                        }}
                      >
                        ทัวร์โปรตุเกส
                      </h3>

                      <p
                        className="text-sm font-bold mb-6"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.6)',
                        }}
                      >
                        ลิสบอน-ปอร์โต<br/>7 วัน 5 คืน
                      </p>

                      {/* Original Price */}
                      <p
                        className="text-base font-bold mb-1"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFB6C1',
                          textDecoration: 'line-through',
                        }}
                      >
                        99,999.-
                      </p>

                      {/* Price - Vertical Stack */}
                      <h1
                        className="text-4xl md:text-5xl font-black leading-none mb-6"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(180deg, #FFEB3B 0%, #FFD700 50%, #FFA500 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.8))',
                        }}
                      >
                        49,999.-
                      </h1>

                      {/* CTA Button */}
                      <button
                        className="w-full px-4 py-2 rounded-lg font-black text-xs shadow-lg transition-all duration-300 hover:scale-105"
                        style={{
                          background: 'linear-gradient(135deg, #FFEB3B 0%, #FFA500 100%)',
                          border: '2px solid #FFFFFF',
                          animation: 'scale-pulse 2s ease-in-out infinite'
                        }}
                      >
                        <p style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#DC2626',
                        }}>
                          จองเลย!
                        </p>
                      </button>
                    </div>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 23 - Egypt with Corner Peek Design */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&q=80"
                    alt="Egypt Pyramids"
                    className="absolute inset-0 w-full h-full object-cover brightness-110"
                  />

                  {/* Soft Corner Gradient - Bottom Left */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(circle at 0% 100%, rgba(220, 38, 38, 0.90) 0%, rgba(255, 0, 0, 0.80) 35%, transparent 65%)',
                    }}
                  />

                  {/* Content - Bottom Left Corner */}
                  <div className="absolute bottom-0 left-0 p-6 md:p-8" style={{ maxWidth: '70%' }}>
                    {/* Small Flash Badge */}
                    <div className="inline-block mb-2 px-3 py-1 rounded-md"
                      style={{
                        background: '#FFEB3B',
                        animation: 'float 3s ease-in-out infinite',
                      }}>
                      <p className="text-xs font-black text-black">
                        ⚡ HOT
                      </p>
                    </div>

                    {/* Destination */}
                    <h3
                      className="text-[2rem] md:text-[2.5rem] font-black leading-tight mb-1"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                        textShadow: '3px 3px 0px rgba(0, 0, 0, 0.7)',
                      }}
                    >
                      ทัวร์อียิปต์
                    </h3>

                    <p
                      className="text-sm md:text-base font-bold mb-3"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                      }}
                    >
                      ไคโร-ลักซอร์ 6 วัน 4 คืน
                    </p>

                    {/* Price Section - Compact */}
                    <div className="mb-3">
                      <p
                        className="text-lg font-bold mb-1"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFB6C1',
                          textDecoration: 'line-through',
                        }}
                      >
                        84,999.-
                      </p>

                      <h1
                        className="text-5xl md:text-6xl font-black leading-none"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(180deg, #FFEB3B 0%, #FFD700 50%, #FFA500 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9))',
                        }}
                      >
                        42,499.-
                      </h1>
                    </div>

                    {/* CTA Button - Small */}
                    <button
                      className="px-5 py-2 rounded-lg font-black text-xs shadow-lg transition-all duration-300 hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #FFEB3B 0%, #FFA500 100%)',
                        border: '2px solid #FFFFFF',
                        animation: 'scale-pulse 2s ease-in-out infinite'
                      }}
                    >
                      <p style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#DC2626',
                      }}>
                        🏛️ จองเลย!
                      </p>
                    </button>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 24 - Morocco with Floating Price Tag */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&q=80"
                    alt="Morocco"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Vignette Effect Only */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.4) 100%)',
                    }}
                  />

                  {/* Floating Price Badge - Top Right */}
                  <div
                    className="absolute top-6 right-6 p-4 rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, #FFEB3B 0%, #FFD700 50%, #FFA500 100%)',
                      border: '4px solid #FFFFFF',
                      boxShadow: '0 15px 50px rgba(0, 0, 0, 0.6), 0 0 0 8px rgba(255, 215, 0, 0.3)',
                      animation: 'float 3s ease-in-out infinite',
                      transform: 'rotate(-5deg)'
                    }}
                  >
                    <p className="text-xs font-black text-black text-center mb-1">เริ่มต้น</p>
                    <h1
                      className="text-3xl font-black leading-none text-center"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#DC2626',
                      }}
                    >
                      34,999.-
                    </h1>
                  </div>

                  {/* Content - Bottom Full Width Bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-5"
                    style={{
                      background: 'linear-gradient(90deg, rgba(220, 38, 38, 0.95) 0%, rgba(255, 0, 0, 0.92) 100%)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="inline-block mb-1 px-2 py-0.5 rounded"
                          style={{ background: '#FFEB3B' }}>
                          <p className="text-[0.65rem] font-black text-black">⚡ FLASH SALE</p>
                        </div>
                        <h3
                          className="text-2xl md:text-3xl font-black leading-tight"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFEB3B',
                            textShadow: '2px 2px 0px rgba(0, 0, 0, 0.6)',
                          }}
                        >
                          ทัวร์โมร็อกโก
                        </h3>
                        <p className="text-sm font-bold" style={{ color: '#FFFFFF' }}>
                          มาร์ราเกช-คาสซาบลังกา
                        </p>
                      </div>
                      <button
                        className="px-5 py-2.5 rounded-xl font-black text-sm shadow-xl"
                        style={{
                          background: '#FFEB3B',
                          border: '2px solid #FFFFFF',
                        }}
                      >
                        <p style={{ fontFamily: 'Kanit, sans-serif', color: '#DC2626' }}>จอง →</p>
                      </button>
                    </div>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 25 - New Zealand with Side Peek Banner */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80"
                    alt="New Zealand Milford Sound"
                    className="absolute inset-0 w-full h-full object-cover brightness-105"
                  />

                  {/* Thin Vertical Red Strip - Right Edge */}
                  <div
                    className="absolute top-0 bottom-0 right-0"
                    style={{
                      width: '35%',
                      background: 'linear-gradient(180deg, rgba(220, 38, 38, 0.92) 0%, rgba(255, 0, 0, 0.92) 100%)',
                    }}
                  />

                  {/* Content - Right Side */}
                  <div className="absolute top-0 right-0 bottom-0 flex flex-col justify-center" style={{ width: '35%' }}>
                    <div className="p-4 text-center">
                      <div className="inline-block mb-3 px-2 py-1 rounded"
                        style={{ background: '#FFEB3B', animation: 'wiggle 3s ease-in-out infinite' }}>
                        <p className="text-xs font-black text-black">⚡ SALE</p>
                      </div>

                      <h3
                        className="text-xl font-black leading-tight mb-3"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFEB3B',
                          textShadow: '2px 2px 0px rgba(0, 0, 0, 0.7)',
                        }}
                      >
                        ทัวร์<br/>นิวซีแลนด์
                      </h3>

                      <p className="text-base line-through mb-1" style={{ color: '#FFB6C1' }}>
                        89,999.-
                      </p>

                      <h1
                        className="text-4xl font-black leading-tight mb-4"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(180deg, #FFEB3B 0%, #FFA500 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.9))',
                        }}
                      >
                        44,999.-
                      </h1>

                      <button
                        className="w-full px-3 py-2 rounded-lg font-black text-xs shadow-lg"
                        style={{
                          background: '#FFEB3B',
                          border: '2px solid #FFFFFF',
                        }}
                      >
                        <p style={{ fontFamily: 'Kanit, sans-serif', color: '#DC2626' }}>จอง</p>
                      </button>
                    </div>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 26 - Peru with Top Label Tag */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80"
                    alt="Peru Machu Picchu"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Top Label Tag - Folded Corner Effect */}
                  <div className="absolute top-0 right-0" style={{ width: '50%' }}>
                    <div
                      className="relative p-4 pb-6"
                      style={{
                        background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.96) 0%, rgba(255, 0, 0, 0.96) 100%)',
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 10% 100%)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      <div className="text-right">
                        <div className="inline-block mb-2 px-2 py-0.5 rounded"
                          style={{ background: '#FFEB3B' }}>
                          <p className="text-[0.65rem] font-black text-black">⚡ HOT</p>
                        </div>
                        <h3
                          className="text-xl font-black mb-1"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFEB3B',
                            textShadow: '2px 2px 0px rgba(0, 0, 0, 0.6)',
                          }}
                        >
                          ทัวร์เปรู
                        </h3>
                        <p className="text-3xl font-black"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFEB3B',
                          }}
                        >
                          52,999.-
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5"
                    style={{
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%)',
                    }}
                  >
                    <p className="text-base font-bold mb-1" style={{ color: '#FFFFFF' }}>
                      มาชูปิกชู-คุสโก
                    </p>
                    <p className="text-sm" style={{ color: '#FFFFFF' }}>
                      8 วัน 6 คืน
                    </p>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 27 - Croatia with Circle Cutout */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1555990793-da11153b2473?w=800&q=80"
                    alt="Croatia"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Bottom Overlay with Circle Cutout Effect */}
                  <div className="absolute inset-0">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="croatiaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="rgba(220, 38, 38, 0.94)" />
                          <stop offset="100%" stopColor="rgba(255, 0, 0, 0.94)" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0,450 Q 200,350 400,450 L 400,600 L 0,600 Z"
                        fill="url(#croatiaGradient)"
                      />
                    </svg>
                  </div>

                  {/* Large Circle Badge - Overlapping */}
                  <div
                    className="absolute flex items-center justify-center"
                    style={{
                      bottom: '32%',
                      right: '8%',
                      width: '140px',
                      height: '140px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #FFEB3B 0%, #FFA500 100%)',
                      border: '5px solid #FFFFFF',
                      boxShadow: '0 15px 50px rgba(0, 0, 0, 0.4)',
                      animation: 'scale-pulse 2s ease-in-out infinite'
                    }}
                  >
                    <div className="text-center">
                      <p className="text-xs font-black" style={{ color: '#DC2626' }}>ลดสูงสุด</p>
                      <h1 className="text-2xl font-black leading-tight" style={{ fontFamily: 'Kanit, sans-serif', color: '#DC2626' }}>
                        50%
                      </h1>
                      <p className="text-xs font-black" style={{ color: '#DC2626' }}>OFF</p>
                    </div>
                  </div>

                  {/* Content - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="inline-block mb-2 px-2 py-0.5 rounded"
                      style={{ background: '#FFEB3B' }}>
                      <p className="text-xs font-black text-black">⚡ FLASH</p>
                    </div>
                    <h3
                      className="text-2xl md:text-3xl font-black mb-1"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                        textShadow: '2px 2px 0px rgba(0, 0, 0, 0.6)',
                      }}
                    >
                      ทัวร์โครเอเชีย
                    </h3>
                    <div className="flex items-baseline gap-2 mb-2">
                      <p className="text-lg line-through" style={{ color: '#FFB6C1' }}>
                        94,999.-
                      </p>
                      <h1
                        className="text-4xl font-black"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFEB3B',
                        }}
                      >
                        47,499.-
                      </h1>
                    </div>
                    <p className="text-sm" style={{ color: '#FFFFFF' }}>
                      ดูบรอฟนิค-พลิตวิเช 7 วัน 5 คืน
                    </p>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 28 - Vietnam with Stripe Pattern */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80"
                    alt="Vietnam"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Striped Overlay Pattern - Left Side */}
                  <div className="absolute inset-0" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="none" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                      <defs>
                        <pattern id="stripePattern" x="0" y="0" width="40" height="600" patternUnits="userSpaceOnUse" patternTransform="rotate(-15)">
                          <rect width="20" height="600" fill="rgba(220, 38, 38, 0.90)" />
                          <rect x="20" width="20" height="600" fill="rgba(255, 0, 0, 0.90)" />
                        </pattern>
                      </defs>
                      <rect width="180" height="600" fill="url(#stripePattern)" />
                    </svg>
                  </div>

                  {/* Content - Left Side on Stripes */}
                  <div className="absolute inset-y-0 left-0 flex items-center" style={{ width: '50%' }}>
                    <div className="p-5">
                      <div className="inline-block mb-3 px-3 py-1 rounded-lg"
                        style={{
                          background: '#FFEB3B',
                          animation: 'wiggle 3s ease-in-out infinite'
                        }}>
                        <p className="text-xs font-black text-black">⚡ SALE</p>
                      </div>

                      <h3
                        className="text-2xl md:text-3xl font-black leading-tight mb-2"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFEB3B',
                          textShadow: '3px 3px 0px rgba(0, 0, 0, 0.8)',
                        }}
                      >
                        ทัวร์เวียดนาม
                      </h3>

                      <p className="text-sm font-bold mb-4" style={{ color: '#FFFFFF', textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)' }}>
                        ฮานอย-ฮาลอง<br/>5 วัน 3 คืน
                      </p>

                      <p className="text-base line-through mb-1" style={{ color: '#FFB6C1' }}>
                        29,999.-
                      </p>

                      <h1
                        className="text-5xl font-black mb-4"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(180deg, #FFEB3B 0%, #FFA500 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.9))',
                        }}
                      >
                        14,999.-
                      </h1>

                      <button
                        className="px-4 py-2 rounded-lg font-black text-xs shadow-lg"
                        style={{
                          background: '#FFEB3B',
                          border: '2px solid #FFFFFF',
                        }}
                      >
                        <p style={{ fontFamily: 'Kanit, sans-serif', color: '#DC2626' }}>จอง</p>
                      </button>
                    </div>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 29 - Argentina with L-Shape Banner */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800&q=80"
                    alt="Argentina"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* L-Shape Overlay - Bottom & Left */}
                  <div
                    className="absolute bottom-0 left-0"
                    style={{
                      width: '100%',
                      height: '45%',
                      background: 'linear-gradient(45deg, rgba(220, 38, 38, 0.94) 0%, rgba(255, 0, 0, 0.90) 100%)',
                      clipPath: 'polygon(0 0, 40% 0, 40% 60%, 100% 60%, 100% 100%, 0 100%)',
                    }}
                  />

                  {/* Content - Bottom Left L-Shape */}
                  <div className="absolute bottom-0 left-0 p-6" style={{ width: '40%' }}>
                    <div className="inline-block mb-2 px-2 py-0.5 rounded"
                      style={{ background: '#FFEB3B', animation: 'float 3s ease-in-out infinite' }}>
                      <p className="text-xs font-black text-black">⚡ HOT</p>
                    </div>

                    <h3
                      className="text-2xl font-black mb-1"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                        textShadow: '2px 2px 0px rgba(0, 0, 0, 0.7)',
                      }}
                    >
                      ทัวร์อาร์เจนตินา
                    </h3>

                    <h1
                      className="text-4xl font-black"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                      }}
                    >
                      57,999.-
                    </h1>
                  </div>

                  {/* Extended Info - Bottom Right */}
                  <div className="absolute bottom-0 right-0 p-6" style={{ width: '55%' }}>
                    <p className="text-sm font-bold" style={{ color: '#FFFFFF' }}>
                      บัวโนสไอเรส-อิกัวซู 8 วัน 6 คืน
                    </p>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 30 - Canada with Double Banner */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80"
                    alt="Canada"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Top Banner */}
                  <div
                    className="absolute top-0 left-0 right-0 p-4"
                    style={{
                      background: 'linear-gradient(90deg, rgba(220, 38, 38, 0.90) 0%, rgba(255, 0, 0, 0.88) 100%)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="inline-block px-2 py-0.5 rounded mb-1"
                          style={{ background: '#FFEB3B' }}>
                          <p className="text-xs font-black text-black">⚡ FLASH</p>
                        </div>
                        <h3
                          className="text-xl font-black"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFEB3B',
                          }}
                        >
                          ทัวร์แคนาดา
                        </h3>
                      </div>
                      <div className="text-right">
                        <p className="text-sm line-through" style={{ color: '#FFB6C1' }}>
                          79,999.-
                        </p>
                        <h1
                          className="text-3xl font-black"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFEB3B',
                          }}
                        >
                          39,999.-
                        </h1>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Banner */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4 text-center"
                    style={{
                      background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.70) 100%)',
                    }}
                  >
                    <p className="text-sm font-bold" style={{ color: '#FFFFFF' }}>
                      แวนคูเวอร์-ตะวันตก 6 วัน 4 คืน
                    </p>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 31 - Austria with Corner Frame */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80"
                    alt="Austria"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Four Corner Accents */}
                  {/* Top Left */}
                  <div
                    className="absolute top-0 left-0"
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.95) 0%, transparent 100%)',
                      clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                    }}
                  />

                  {/* Top Right with Badge */}
                  <div
                    className="absolute top-0 right-0 p-3"
                    style={{
                      width: '120px',
                      height: '120px',
                      background: 'linear-gradient(225deg, rgba(220, 38, 38, 0.95) 0%, transparent 100%)',
                      clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                    }}
                  >
                    <div className="text-right">
                      <div className="inline-block px-2 py-0.5 rounded"
                        style={{ background: '#FFEB3B' }}>
                        <p className="text-xs font-black text-black">50% OFF</p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Right with Content */}
                  <div
                    className="absolute bottom-0 right-0 p-5"
                    style={{
                      width: '60%',
                      height: '180px',
                      background: 'linear-gradient(315deg, rgba(220, 38, 38, 0.94) 0%, rgba(255, 0, 0, 0.90) 100%)',
                      clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)',
                    }}
                  >
                    <div className="text-right mt-8">
                      <h3
                        className="text-2xl font-black mb-1"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFEB3B',
                          textShadow: '2px 2px 0px rgba(0, 0, 0, 0.7)',
                        }}
                      >
                        ทัวร์ออสเตรีย
                      </h3>
                      <p className="text-sm mb-2" style={{ color: '#FFFFFF' }}>
                        เวียนนา-ซาลส์บูร์ก
                      </p>
                      <h1
                        className="text-4xl font-black"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFEB3B',
                        }}
                      >
                        54,999.-
                      </h1>
                    </div>
                  </div>

                  {/* Bottom Left */}
                  <div
                    className="absolute bottom-0 left-0"
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(45deg, rgba(220, 38, 38, 0.95) 0%, transparent 100%)',
                      clipPath: 'polygon(0 100%, 100% 100%, 0 0)',
                    }}
                  />

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 32 - Chile with Zigzag Edge */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80"
                    alt="Chile"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Zigzag Bottom Overlay */}
                  <div className="absolute inset-0">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chileGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="rgba(220, 38, 38, 0.94)" />
                          <stop offset="100%" stopColor="rgba(255, 0, 0, 0.92)" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0,420 L 50,380 L 100,420 L 150,380 L 200,420 L 250,380 L 300,420 L 350,380 L 400,420 L 400,600 L 0,600 Z"
                        fill="url(#chileGradient)"
                      />
                    </svg>
                  </div>

                  {/* Content - Bottom Center */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="inline-block mb-2 px-3 py-1 rounded-full"
                      style={{ background: '#FFEB3B', animation: 'scale-pulse 2s ease-in-out infinite' }}>
                      <p className="text-xs font-black text-black">⚡ SALE</p>
                    </div>

                    <h3
                      className="text-2xl md:text-3xl font-black mb-1"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                        textShadow: '2px 2px 0px rgba(0, 0, 0, 0.7)',
                      }}
                    >
                      ทัวร์ชิลี
                    </h3>

                    <p className="text-sm mb-2" style={{ color: '#FFFFFF' }}>
                      ซานติอาโก-วัลปาไรโซ 7 วัน 5 คืน
                    </p>

                    <div className="flex items-baseline justify-center gap-2">
                      <p className="text-lg line-through" style={{ color: '#FFB6C1' }}>
                        92,999.-
                      </p>
                      <h1
                        className="text-5xl font-black"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(180deg, #FFEB3B 0%, #FFA500 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.9))',
                        }}
                      >
                        46,499.-
                      </h1>
                    </div>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 33 - Finland with Hexagon Badge */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1520769945061-0a448c463865?w=800&q=80"
                    alt="Finland Northern Lights"
                    className="absolute inset-0 w-full h-full object-cover brightness-110"
                  />

                  {/* Gradient Vignette */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.5) 100%)',
                    }}
                  />

                  {/* Hexagon Price Badge - Center */}
                  <div
                    className="absolute flex items-center justify-center"
                    style={{
                      top: '30%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '160px',
                      height: '180px',
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.96) 0%, rgba(255, 0, 0, 0.96) 100%)',
                      border: '4px solid #FFFFFF',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
                      animation: 'float 3s ease-in-out infinite'
                    }}
                  >
                    <div className="text-center">
                      <div className="inline-block mb-2 px-2 py-0.5 rounded"
                        style={{ background: '#FFEB3B' }}>
                        <p className="text-xs font-black text-black">⚡ DEAL</p>
                      </div>
                      <h1
                        className="text-3xl font-black leading-tight"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFEB3B',
                        }}
                      >
                        62,999.-
                      </h1>
                      <p className="text-xs font-bold" style={{ color: '#FFFFFF' }}>
                        ลดจาก<br/>125,999.-
                      </p>
                    </div>
                  </div>

                  {/* Content - Bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-6 text-center"
                    style={{
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, transparent 100%)',
                    }}
                  >
                    <h3
                      className="text-2xl font-black mb-1"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                        textShadow: '2px 2px 0px rgba(0, 0, 0, 0.7)',
                      }}
                    >
                      ทัวร์ฟินแลนด์
                    </h3>
                    <p className="text-sm" style={{ color: '#FFFFFF' }}>
                      เฮลซิงกิ-ลาปแลนด์ 8 วัน 6 คืน
                    </p>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 34 - Brazil with Torn Paper Edge */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80"
                    alt="Brazil Rio"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Torn Paper Effect - Bottom */}
                  <div className="absolute inset-0">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="brazilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="rgba(220, 38, 38, 0.96)" />
                          <stop offset="100%" stopColor="rgba(255, 0, 0, 0.94)" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0,380 Q 20,370 40,380 Q 60,390 80,375 Q 100,360 120,380 Q 140,400 160,375 Q 180,350 200,375 Q 220,400 240,380 Q 260,360 280,380 Q 300,400 320,375 Q 340,350 360,380 Q 380,410 400,380 L 400,600 L 0,600 Z"
                        fill="url(#brazilGradient)"
                      />
                    </svg>
                  </div>

                  {/* Sticker-style Price Badge - Top Left */}
                  <div
                    className="absolute top-6 left-6"
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: '#FFEB3B',
                      border: '5px dashed #FFFFFF',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                      transform: 'rotate(15deg)',
                      animation: 'wiggle 3s ease-in-out infinite'
                    }}
                  >
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <p className="text-xs font-black text-black">ลด</p>
                        <h1 className="text-3xl font-black leading-none" style={{ fontFamily: 'Kanit, sans-serif', color: '#DC2626' }}>
                          50%
                        </h1>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="inline-block mb-2 px-3 py-1 rounded"
                      style={{ background: 'rgba(255, 235, 59, 0.9)' }}>
                      <p className="text-xs font-black text-black">⚡ FLASH SALE</p>
                    </div>
                    <h3
                      className="text-3xl font-black mb-1"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                        textShadow: '3px 3px 0px rgba(0, 0, 0, 0.8)',
                      }}
                    >
                      ทัวร์บราซิล
                    </h3>
                    <p className="text-base mb-2" style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                      ริโอ-อิกัวซู 9 วัน 7 คืน
                    </p>
                    <h1
                      className="text-5xl font-black"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                      }}
                    >
                      67,999.-
                    </h1>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 35 - Poland with Speech Bubble */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1529963183134-61a90db47eaf?w=800&q=80"
                    alt="Poland"
                    className="absolute inset-0 w-full h-full object-cover brightness-105"
                  />

                  {/* Speech Bubble - Bottom Right */}
                  <div
                    className="absolute bottom-16 right-6"
                    style={{
                      width: '70%',
                      padding: '20px',
                      background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.96) 0%, rgba(255, 0, 0, 0.96) 100%)',
                      borderRadius: '20px',
                      boxShadow: '0 15px 50px rgba(0, 0, 0, 0.6)',
                      position: 'relative'
                    }}
                  >
                    {/* Speech Bubble Tail */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-20px',
                        right: '40px',
                        width: '0',
                        height: '0',
                        borderLeft: '20px solid transparent',
                        borderRight: '20px solid transparent',
                        borderTop: '20px solid rgba(255, 0, 0, 0.96)',
                      }}
                    />

                    <div className="inline-block mb-2 px-2 py-0.5 rounded"
                      style={{ background: '#FFEB3B' }}>
                      <p className="text-xs font-black text-black">⚡ SALE</p>
                    </div>

                    <h3
                      className="text-2xl font-black mb-1"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                        textShadow: '2px 2px 0px rgba(0, 0, 0, 0.6)',
                      }}
                    >
                      ทัวร์โปแลนด์
                    </h3>

                    <p className="text-sm mb-2" style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                      วอร์ซอ-คราคูฟ 6 วัน 4 คืน
                    </p>

                    <div className="flex items-baseline gap-2">
                      <p className="text-base line-through" style={{ color: '#FFB6C1' }}>
                        72,999.-
                      </p>
                      <h1
                        className="text-4xl font-black"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFEB3B',
                        }}
                      >
                        36,499.-
                      </h1>
                    </div>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 36 - Ireland with Clean Bottom Banner */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1519318664110-2506a1498640?w=800&q=80"
                    alt="Ireland Cliffs of Moher"
                    className="absolute inset-0 w-full h-full object-cover brightness-105"
                  />

                  {/* Simple Bottom Banner */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-6"
                    style={{
                      background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.94) 0%, rgba(255, 0, 0, 0.94) 100%)',
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="inline-block px-3 py-1 rounded"
                        style={{ background: '#FFEB3B' }}>
                        <p className="text-xs font-black text-black">⚡ HOT DEAL</p>
                      </div>
                      <h1
                        className="text-4xl font-black"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFEB3B',
                        }}
                      >
                        41,999.-
                      </h1>
                    </div>

                    <h3
                      className="text-2xl font-black mb-1"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                        textShadow: '2px 2px 0px rgba(0, 0, 0, 0.6)',
                      }}
                    >
                      ทัวร์ไอร์แลนด์
                    </h3>

                    <p className="text-sm" style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                      ดับลิน-กอลเวย์ 6 วัน 4 คืน
                    </p>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 37 - Mexico with Graffiti Style */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1518638150340-f706e86654de?w=800&q=80"
                    alt="Mexico"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Graffiti-style Spray Paint Effect - Left Side */}
                  <div
                    className="absolute inset-y-0 left-0"
                    style={{
                      width: '50%',
                      background: 'linear-gradient(90deg, rgba(220, 38, 38, 0.94) 0%, rgba(255, 0, 0, 0.88) 70%, transparent 100%)',
                      filter: 'blur(2px)',
                    }}
                  />

                  {/* Solid overlay for content */}
                  <div
                    className="absolute inset-y-0 left-0 flex items-center"
                    style={{
                      width: '45%',
                    }}
                  >
                    <div className="p-6">
                      {/* Graffiti-style Badge */}
                      <div
                        className="inline-block mb-3 px-4 py-2"
                        style={{
                          background: '#FFEB3B',
                          transform: 'rotate(-3deg) skew(-3deg)',
                          boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.5)',
                        }}
                      >
                        <p className="text-sm font-black text-black" style={{ transform: 'skew(3deg)' }}>
                          ⚡ SUPER SALE
                        </p>
                      </div>

                      <h3
                        className="text-3xl font-black leading-tight mb-2"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFEB3B',
                          textShadow: '4px 4px 0px rgba(0, 0, 0, 0.8)',
                          transform: 'rotate(-2deg)',
                        }}
                      >
                        ทัวร์เม็กซิโก
                      </h3>

                      <p className="text-sm mb-3" style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                        แคนคูน-ชิเชนอิตซา<br/>7 วัน 5 คืน
                      </p>

                      <div
                        style={{
                          display: 'inline-block',
                          background: '#FFEB3B',
                          padding: '8px 16px',
                          transform: 'rotate(2deg)',
                          boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.5)',
                        }}
                      >
                        <h1
                          className="text-4xl font-black"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#DC2626',
                          }}
                        >
                          38,999.-
                        </h1>
                      </div>
                    </div>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 38 - Scotland with Plaid Pattern */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=800&q=80"
                    alt="Scotland"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Plaid/Grid Pattern Overlay - Top Half */}
                  <div className="absolute inset-0">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="none">
                      <defs>
                        <pattern id="plaidPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                          <rect width="60" height="60" fill="rgba(220, 38, 38, 0.85)" />
                          <rect x="0" y="25" width="60" height="10" fill="rgba(255, 0, 0, 0.95)" />
                          <rect x="25" y="0" width="10" height="60" fill="rgba(255, 0, 0, 0.95)" />
                        </pattern>
                      </defs>
                      <rect width="400" height="250" fill="url(#plaidPattern)" />
                    </svg>
                  </div>

                  {/* Content - Top in Pattern Area */}
                  <div className="absolute top-0 left-0 right-0 p-6" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="inline-block mb-3 px-3 py-1 rounded"
                      style={{ background: '#FFEB3B' }}>
                      <p className="text-xs font-black text-black">⚡ FLASH SALE</p>
                    </div>

                    <h3
                      className="text-3xl font-black mb-2"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                        textShadow: '3px 3px 0px rgba(0, 0, 0, 0.8)',
                      }}
                    >
                      ทัวร์สก็อตแลนด์
                    </h3>

                    <p className="text-base mb-3" style={{ color: '#FFFFFF', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
                      เอดินบะระ-ไฮแลนด์
                    </p>

                    <div className="flex items-baseline gap-3">
                      <p className="text-xl line-through" style={{ color: '#FFE4E1' }}>
                        88,999.-
                      </p>
                      <h1
                        className="text-5xl font-black"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(180deg, #FFEB3B 0%, #FFA500 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 1))',
                        }}
                      >
                        44,499.-
                      </h1>
                    </div>
                  </div>

                  {/* Info Bar - Bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4 text-center"
                    style={{
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.6) 100%)',
                    }}
                  >
                    <p className="text-sm font-bold" style={{ color: '#FFFFFF' }}>
                      7 วัน 5 คืน พร้อมไกด์ท้องถิ่น
                    </p>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 39 - Cambodia with Explosive Burst */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80"
                    alt="Cambodia Angkor Wat"
                    className="absolute inset-0 w-full h-full object-cover brightness-110"
                  />

                  {/* Explosive Sunburst Background - Center */}
                  <div className="absolute inset-0" style={{
                    background: `
                      repeating-conic-gradient(
                        from 0deg at 50% 50%,
                        rgba(255, 0, 0, 0.85) 0deg 4deg,
                        rgba(255, 69, 0, 0.90) 4deg 8deg,
                        rgba(255, 165, 0, 0.85) 8deg 12deg,
                        rgba(255, 0, 0, 0.85) 12deg 16deg
                      )
                    `,
                    clipPath: 'circle(45% at 50% 50%)',
                  }} />

                  {/* Content - Center */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="inline-block mb-3 px-4 py-2 rounded-full animate-scale-pulse"
                      style={{
                        background: '#FFEB3B',
                        boxShadow: '0 0 20px rgba(255, 235, 59, 0.8)',
                      }}>
                      <p className="text-sm font-black text-black">⚡ FLASH SALE ⚡</p>
                    </div>

                    <h3
                      className="text-4xl font-black mb-2"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                        textShadow: '4px 4px 0px rgba(0, 0, 0, 1), -1px -1px 0px rgba(255, 255, 255, 0.3)',
                        transform: 'rotate(-2deg)',
                      }}
                    >
                      ทัวร์กัมพูชา
                    </h3>

                    <p className="text-lg mb-4" style={{
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 1)'
                    }}>
                      นครวัด-เสียมเรียบ
                    </p>

                    <div className="mb-3">
                      <p className="text-2xl line-through mb-1" style={{ color: '#FFE4E1', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
                        32,999.-
                      </p>
                      <h1
                        className="text-6xl font-black animate-scale-pulse"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(180deg, #FFEB3B 0%, #FFD700 50%, #FFA500 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 1))',
                        }}
                      >
                        15,999.-
                      </h1>
                    </div>

                    <div className="px-4 py-2 rounded-lg"
                      style={{
                        background: 'rgba(0, 0, 0, 0.7)',
                        border: '2px solid #FFEB3B',
                      }}>
                      <p className="text-sm font-bold" style={{ color: '#FFEB3B' }}>
                        4 วัน 3 คืน พร้อมไกด์
                      </p>
                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 40 - Laos with Diagonal Lightning Bolt */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1540611025311-01df3cef54b5?w=800&q=80"
                    alt="Laos Luang Prabang"
                    className="absolute inset-0 w-full h-full object-cover brightness-105"
                  />

                  {/* Diagonal Lightning Bolt Slash - Top Left to Bottom Right */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.92) 0%, rgba(255, 69, 0, 0.88) 35%, transparent 60%)',
                  }} />

                  {/* Lightning Bolt Icon - SVG - Top Left */}
                  <div className="absolute top-6 left-6 z-20 animate-float" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <svg width="60" height="80" viewBox="0 0 60 80" style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.8))' }}>
                      <path
                        d="M 35,0 L 15,35 L 28,35 L 20,80 L 50,30 L 35,30 Z"
                        fill="#FFEB3B"
                        stroke="#FFD700"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>

                  {/* Content - Top Left Area */}
                  <div className="absolute top-24 left-6 right-0 pr-24 z-10" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="inline-block mb-3 px-3 py-1.5 rounded"
                      style={{
                        background: '#FFEB3B',
                        boxShadow: '0 4px 12px rgba(255, 235, 59, 0.6)',
                      }}>
                      <p className="text-xs font-black text-black">⚡ FLASH SALE</p>
                    </div>

                    <h3
                      className="text-3xl font-black mb-2"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                        textShadow: '3px 3px 0px rgba(0, 0, 0, 1), -1px -1px 0px rgba(255, 255, 255, 0.2)',
                      }}
                    >
                      ทัวร์ลาว
                    </h3>

                    <p className="text-base mb-4" style={{
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 1)'
                    }}>
                      หลวงพระบาง-เวียงจันทน์
                    </p>

                    <div className="flex items-baseline gap-3 mb-2">
                      <p className="text-xl line-through" style={{ color: '#FFE4E1', textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)' }}>
                        28,999.-
                      </p>
                      <h1
                        className="text-5xl font-black"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(180deg, #FFEB3B 0%, #FFA500 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 1))',
                        }}
                      >
                        12,999.-
                      </h1>
                    </div>

                    <p className="text-sm font-bold" style={{ color: '#FFEB3B', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)' }}>
                      4 วัน 3 คืน ครบทุกมื้อ
                    </p>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 41 - Myanmar with Mega Price Explosion */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80"
                    alt="Myanmar Bagan Temples"
                    className="absolute inset-0 w-full h-full object-cover brightness-110"
                  />

                  {/* Explosive Circle Burst - Bottom Center */}
                  <div className="absolute bottom-0 left-0 right-0" style={{ height: '50%' }}>
                    <div className="absolute inset-0" style={{
                      background: `
                        radial-gradient(
                          circle at 50% 100%,
                          rgba(255, 0, 0, 0.95) 0%,
                          rgba(255, 69, 0, 0.92) 25%,
                          rgba(255, 165, 0, 0.88) 40%,
                          transparent 65%
                        )
                      `,
                    }} />
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-6 left-6 z-20" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="px-4 py-2 rounded-lg animate-wiggle"
                      style={{
                        background: 'linear-gradient(135deg, #FFEB3B 0%, #FFD700 100%)',
                        boxShadow: '0 6px 16px rgba(255, 235, 59, 0.7)',
                        border: '3px solid #FF0000',
                      }}>
                      <p className="text-sm font-black text-black">⚡ ลดแรง ⚡</p>
                    </div>
                  </div>

                  {/* Content - Bottom Center */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center z-10" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <h3
                      className="text-3xl font-black mb-2"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                        textShadow: '4px 4px 0px rgba(0, 0, 0, 1), -1px -1px 0px rgba(255, 255, 255, 0.3)',
                      }}
                    >
                      ทัวร์พม่า
                    </h3>

                    <p className="text-base mb-3" style={{
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 1)'
                    }}>
                      พุกาม-ย่างกุ้ง 5 วัน 4 คืน
                    </p>

                    {/* Mega Price Display */}
                    <div className="mb-2">
                      <p className="text-xl line-through mb-2" style={{
                        color: '#FFE4E1',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)'
                      }}>
                        45,999.-
                      </p>
                      <div className="relative inline-block">
                        {/* Starburst behind price */}
                        <div className="absolute inset-0 transform scale-150" style={{
                          background: 'radial-gradient(circle, rgba(255, 235, 59, 0.4) 0%, transparent 70%)',
                        }} />
                        <h1
                          className="text-7xl font-black animate-scale-pulse relative z-10"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(180deg, #FFEB3B 0%, #FFD700 30%, #FFA500 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 1))',
                          }}
                        >
                          21,999.-
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 42 - Philippines with Fire Banner */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80"
                    alt="Philippines Palawan"
                    className="absolute inset-0 w-full h-full object-cover brightness-105"
                  />

                  {/* Hot Deal Fire Banner - Top to Middle Diagonal */}
                  <div className="absolute inset-0" style={{
                    background: `
                      linear-gradient(
                        155deg,
                        rgba(255, 0, 0, 0.94) 0%,
                        rgba(255, 69, 0, 0.92) 20%,
                        rgba(255, 165, 0, 0.88) 35%,
                        transparent 50%
                      )
                    `,
                  }} />

                  {/* Fire Icon Top Left */}
                  <div className="absolute top-6 left-6 animate-wiggle z-20" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="text-6xl" style={{
                      filter: 'drop-shadow(0 4px 12px rgba(255, 69, 0, 0.8))',
                    }}>
                      🔥
                    </div>
                  </div>

                  {/* Content - Upper Left */}
                  <div className="absolute top-24 left-6 right-0 pr-32 z-10" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="inline-block mb-3 px-4 py-2 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, #FFEB3B 0%, #FFD700 100%)',
                        boxShadow: '0 6px 16px rgba(255, 235, 59, 0.7)',
                        border: '3px solid #FF0000',
                      }}>
                      <p className="text-sm font-black text-black">🔥 HOT SALE 🔥</p>
                    </div>

                    <h3
                      className="text-3xl font-black mb-2"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                        textShadow: '4px 4px 0px rgba(0, 0, 0, 1), -1px -1px 0px rgba(255, 255, 255, 0.3)',
                      }}
                    >
                      ทัวร์ฟิลิปปินส์
                    </h3>

                    <p className="text-base mb-4" style={{
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 1)'
                    }}>
                      ปาลาวัน-เอลนิโด
                    </p>

                    <div className="mb-2">
                      <p className="text-xl line-through mb-1" style={{
                        color: '#FFE4E1',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)'
                      }}>
                        38,999.-
                      </p>
                      <h1
                        className="text-6xl font-black"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(180deg, #FFEB3B 0%, #FFD700 50%, #FFA500 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 1))',
                        }}
                      >
                        18,999.-
                      </h1>
                    </div>

                    <p className="text-sm font-bold" style={{
                      color: '#FFEB3B',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)'
                    }}>
                      5 วัน 4 คืน ฟินสุดๆ
                    </p>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 43 - Indonesia with Intense Side Banner */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80"
                    alt="Indonesia Bali"
                    className="absolute inset-0 w-full h-full object-cover brightness-110"
                  />

                  {/* Intense Vertical Banner - Right Side with Pattern */}
                  <div className="absolute top-0 right-0 bottom-0" style={{ width: '45%' }}>
                    {/* Base gradient */}
                    <div className="absolute inset-0" style={{
                      background: `
                        linear-gradient(
                          to left,
                          rgba(255, 0, 0, 0.95) 0%,
                          rgba(255, 69, 0, 0.92) 50%,
                          transparent 100%
                        )
                      `,
                    }} />

                    {/* Diagonal stripes overlay */}
                    <div className="absolute inset-0" style={{
                      background: `
                        repeating-linear-gradient(
                          45deg,
                          transparent,
                          transparent 10px,
                          rgba(255, 165, 0, 0.3) 10px,
                          rgba(255, 165, 0, 0.3) 20px
                        )
                      `,
                    }} />
                  </div>

                  {/* Explosive Badge - Top Right */}
                  <div className="absolute top-6 right-6 z-20" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div
                      className="px-5 py-3 rounded-full animate-scale-pulse"
                      style={{
                        background: '#FFEB3B',
                        boxShadow: '0 0 30px rgba(255, 235, 59, 0.9), inset 0 2px 0 rgba(255, 255, 255, 0.5)',
                        border: '4px solid #FF0000',
                      }}
                    >
                      <p className="text-base font-black text-black">⚡ MEGA ⚡</p>
                    </div>
                  </div>

                  {/* Content - Right Side */}
                  <div className="absolute top-32 right-6 bottom-6 flex flex-col justify-center text-right z-10" style={{ width: '40%' }}>
                    <h3
                      className="text-2xl font-black mb-2"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                        textShadow: '3px 3px 0px rgba(0, 0, 0, 1), -1px -1px 0px rgba(255, 255, 255, 0.3)',
                      }}
                    >
                      ทัวร์อินโดนีเซีย
                    </h3>

                    <p className="text-sm mb-4" style={{
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 1)'
                    }}>
                      บาหลี-อูบุด
                    </p>

                    <div className="mb-3">
                      <p className="text-lg line-through mb-1" style={{
                        color: '#FFE4E1',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)'
                      }}>
                        49,999.-
                      </p>
                      <h1
                        className="text-5xl font-black"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(180deg, #FFEB3B 0%, #FFD700 50%, #FFA500 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 1))',
                        }}
                      >
                        25,999.-
                      </h1>
                    </div>

                    <div className="px-3 py-2 rounded-lg" style={{
                      background: 'rgba(0, 0, 0, 0.7)',
                      border: '2px solid #FFEB3B',
                    }}>
                      <p className="text-xs font-bold" style={{ color: '#FFEB3B' }}>
                        5 วัน 3 คืน
                      </p>
                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 44 - มาเลเซีย with Corner Explosion */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80"
                    alt="Malaysia Petronas Towers"
                    className="absolute inset-0 w-full h-full object-cover brightness-105"
                  />

                  {/* Explosive Top Left Corner */}
                  <div className="absolute top-0 left-0" style={{ width: '55%', height: '55%' }}>
                    <div className="absolute inset-0" style={{
                      background: `
                        radial-gradient(
                          circle at 0% 0%,
                          rgba(255, 0, 0, 0.94) 0%,
                          rgba(255, 69, 0, 0.90) 30%,
                          rgba(255, 165, 0, 0.82) 50%,
                          transparent 70%
                        )
                      `,
                    }} />
                  </div>

                  {/* Content - Top Left */}
                  <div className="absolute top-6 left-6 right-32 z-10" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="inline-block mb-3 px-4 py-2 rounded-xl animate-wiggle"
                      style={{
                        background: 'linear-gradient(135deg, #FFEB3B 0%, #FFD700 100%)',
                        boxShadow: '0 6px 20px rgba(255, 235, 59, 0.8)',
                        border: '4px solid #FF0000',
                      }}>
                      <p className="text-sm font-black text-black">💥 ระเบิด 💥</p>
                    </div>

                    <h3
                      className="text-4xl font-black mb-2"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                        textShadow: '4px 4px 0px rgba(0, 0, 0, 1), -2px -2px 0px rgba(255, 255, 255, 0.3)',
                        transform: 'rotate(-2deg)',
                      }}
                    >
                      ทัวร์มาเลเซีย
                    </h3>

                    <p className="text-base mb-4" style={{
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 1)'
                    }}>
                      กัวลาลัมเปอร์
                    </p>

                    <div className="mb-2">
                      <p className="text-xl line-through mb-1" style={{
                        color: '#FFE4E1',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)'
                      }}>
                        22,999.-
                      </p>
                      <h1
                        className="text-6xl font-black animate-scale-pulse"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(180deg, #FFEB3B 0%, #FFD700 50%, #FFA500 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 1))',
                        }}
                      >
                        9,999.-
                      </h1>
                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 45 - เวียดนาม with Wave Pattern */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=800&q=80"
                    alt="Vietnam Ha Long Bay"
                    className="absolute inset-0 w-full h-full object-cover brightness-110"
                  />

                  {/* Wave Pattern Bottom */}
                  <div className="absolute bottom-0 left-0 right-0" style={{ height: '45%' }}>
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#FF0000', stopOpacity: 0.95 }} />
                          <stop offset="50%" style={{ stopColor: '#FF4500', stopOpacity: 0.92 }} />
                          <stop offset="100%" style={{ stopColor: '#FFA500', stopOpacity: 0.88 }} />
                        </linearGradient>
                      </defs>
                      {/* Wave Shape */}
                      <path
                        d="M 0,80 Q 50,40 100,80 T 200,80 T 300,80 T 400,80 L 400,300 L 0,300 Z"
                        fill="url(#waveGradient)"
                      />
                    </svg>
                  </div>

                  {/* Floating Badge - Top Right */}
                  <div className="absolute top-6 right-6 z-20 animate-float" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="px-4 py-2 rounded-full"
                      style={{
                        background: '#FFEB3B',
                        boxShadow: '0 8px 24px rgba(255, 235, 59, 0.8)',
                        border: '3px solid #FF0000',
                      }}>
                      <p className="text-sm font-black text-black">⚡ SALE</p>
                    </div>
                  </div>

                  {/* Content - Bottom Center */}
                  <div className="absolute bottom-6 left-0 right-0 text-center z-10 px-6">
                    <h3
                      className="text-3xl font-black mb-2"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                        textShadow: '4px 4px 0px rgba(0, 0, 0, 1), -1px -1px 0px rgba(255, 255, 255, 0.3)',
                      }}
                    >
                      ทัวร์เวียดนาม
                    </h3>

                    <p className="text-base mb-3" style={{
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 1)'
                    }}>
                      ฮาลองเบย์-ฮานอย
                    </p>

                    <div className="flex items-baseline justify-center gap-3 mb-2">
                      <p className="text-xl line-through" style={{
                        color: '#FFE4E1',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)'
                      }}>
                        19,999.-
                      </p>
                      <h1
                        className="text-6xl font-black"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(180deg, #FFEB3B 0%, #FFD700 50%, #FFA500 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 1))',
                        }}
                      >
                        8,999.-
                      </h1>
                    </div>

                    <p className="text-sm font-bold" style={{
                      color: '#FFEB3B',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)'
                    }}>
                      4 วัน 3 คืน พร้อมครูซ
                    </p>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 46 - สิงคโปร์ with Double Corner Blast */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80"
                    alt="Singapore Marina Bay Sands"
                    className="absolute inset-0 w-full h-full object-cover brightness-105"
                  />

                  {/* Top Right Corner Blast */}
                  <div className="absolute top-0 right-0" style={{ width: '60%', height: '40%' }}>
                    <div className="absolute inset-0" style={{
                      background: `
                        radial-gradient(
                          circle at 100% 0%,
                          rgba(255, 0, 0, 0.93) 0%,
                          rgba(255, 69, 0, 0.88) 35%,
                          transparent 65%
                        )
                      `,
                    }} />
                  </div>

                  {/* Bottom Left Corner Blast */}
                  <div className="absolute bottom-0 left-0" style={{ width: '55%', height: '45%' }}>
                    <div className="absolute inset-0" style={{
                      background: `
                        radial-gradient(
                          circle at 0% 100%,
                          rgba(255, 69, 0, 0.92) 0%,
                          rgba(255, 165, 0, 0.87) 35%,
                          transparent 70%
                        )
                      `,
                    }} />
                  </div>

                  {/* Mega Badge - Center */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div
                      className="px-8 py-4 rounded-3xl animate-scale-pulse"
                      style={{
                        background: 'linear-gradient(135deg, #FFEB3B 0%, #FFD700 100%)',
                        boxShadow: '0 12px 40px rgba(255, 235, 59, 1), inset 0 2px 0 rgba(255, 255, 255, 0.6)',
                        border: '6px solid #FF0000',
                      }}
                    >
                      <p className="text-2xl font-black text-black">⚡ HOT ⚡</p>
                    </div>
                  </div>

                  {/* Content - Top Right */}
                  <div className="absolute top-6 right-6 text-right z-10" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <h3
                      className="text-3xl font-black mb-2"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                        textShadow: '4px 4px 0px rgba(0, 0, 0, 1), -1px -1px 0px rgba(255, 255, 255, 0.3)',
                      }}
                    >
                      ทัวร์สิงคโปร์
                    </h3>

                    <h1
                      className="text-6xl font-black mb-2"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        background: 'linear-gradient(180deg, #FFEB3B 0%, #FFD700 50%, #FFA500 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 1))',
                      }}
                    >
                      11,999.-
                    </h1>

                    <p className="text-base line-through mb-1" style={{
                      color: '#FFE4E1',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)'
                    }}>
                      24,999.-
                    </p>
                  </div>

                  {/* Info - Bottom Left */}
                  <div className="absolute bottom-6 left-6 z-10">
                    <p className="text-base mb-2" style={{
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 1)'
                    }}>
                      มารีน่าเบย์-เซนโตซ่า
                    </p>

                    <p className="text-sm font-bold" style={{
                      color: '#FFEB3B',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)'
                    }}>
                      3 วัน 2 คืน ฟินสุด
                    </p>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 47 - ญี่ปุ่น with Massive Center Price */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80"
                    alt="Japan Mount Fuji"
                    className="absolute inset-0 w-full h-full object-cover brightness-105"
                  />

                  {/* Vignette Overlay */}
                  <div className="absolute inset-0" style={{
                    background: `
                      radial-gradient(
                        ellipse at 50% 50%,
                        transparent 0%,
                        rgba(0, 0, 0, 0.3) 50%,
                        rgba(0, 0, 0, 0.7) 100%
                      )
                    `,
                  }} />

                  {/* Explosive Price Circle - Center */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div
                      className="relative flex items-center justify-center"
                      style={{
                        width: '280px',
                        height: '280px',
                        borderRadius: '50%',
                        background: `
                          radial-gradient(
                            circle,
                            rgba(255, 0, 0, 0.97) 0%,
                            rgba(255, 69, 0, 0.95) 40%,
                            rgba(255, 165, 0, 0.90) 80%,
                            rgba(255, 0, 0, 0.85) 100%
                          )
                        `,
                        boxShadow: '0 0 60px rgba(255, 0, 0, 0.8), inset 0 0 40px rgba(255, 255, 255, 0.2)',
                        border: '8px solid #FFEB3B',
                      }}
                    >
                      <div className="text-center">
                        <p className="text-lg font-black mb-2" style={{ color: '#FFEB3B' }}>
                          ⚡ MEGA SALE ⚡
                        </p>
                        <h1
                          className="text-7xl font-black animate-scale-pulse"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(180deg, #FFEB3B 0%, #FFD700 50%, #FFF 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 1))',
                          }}
                        >
                          39,999
                        </h1>
                        <p className="text-2xl font-black" style={{ color: '#FFEB3B' }}>
                          บาท
                        </p>
                        <p className="text-lg line-through mt-2" style={{ color: '#FFE4E1' }}>
                          เดิม 65,999.-
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Title - Top */}
                  <div className="absolute top-6 left-0 right-0 text-center z-10" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <h3
                      className="text-5xl font-black"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                        textShadow: '5px 5px 0px rgba(0, 0, 0, 1), -2px -2px 0px rgba(255, 255, 255, 0.3)',
                      }}
                    >
                      ทัวร์ญี่ปุ่น
                    </h3>
                  </div>

                  {/* Info - Bottom */}
                  <div className="absolute bottom-6 left-0 right-0 text-center z-10">
                    <p className="text-xl font-bold mb-1" style={{
                      color: '#FFFFFF',
                      textShadow: '3px 3px 8px rgba(0, 0, 0, 1)'
                    }}>
                      โตเกียว-ฟูจิ-โอซาก้า
                    </p>
                    <p className="text-base font-bold" style={{
                      color: '#FFEB3B',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 1)'
                    }}>
                      6 วัน 4 คืน ซากุระบาน
                    </p>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 48 - เกาหลี NEW */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80"
                    alt="South Korea Seoul"
                    className="absolute inset-0 w-full h-full object-cover brightness-105"
                  />

                  {/* Diagonal Bottom Right */}
                  <div className="absolute inset-0" style={{
                    background: `
                      linear-gradient(
                        120deg,
                        transparent 0%,
                        transparent 40%,
                        rgba(255, 0, 0, 0.94) 60%,
                        rgba(255, 69, 0, 0.92) 80%,
                        rgba(255, 165, 0, 0.90) 100%
                      )
                    `,
                  }} />

                  {/* Content - Bottom Right */}
                  <div className="absolute bottom-6 right-6 text-right z-10" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="inline-block mb-3 px-4 py-2 rounded-xl"
                      style={{
                        background: '#FFEB3B',
                        boxShadow: '0 6px 20px rgba(255, 235, 59, 0.9)',
                        border: '3px solid #FFFFFF',
                      }}>
                      <p className="text-sm font-black text-black">⚡ FLASH</p>
                    </div>

                    <h3
                      className="text-4xl font-black mb-2"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                        textShadow: '4px 4px 0px rgba(0, 0, 0, 1)',
                      }}
                    >
                      ทัวร์เกาหลี
                    </h3>

                    <p className="text-base mb-3" style={{
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 1)'
                    }}>
                      โซล-เกาะนามิ 5 วัน
                    </p>

                    <div>
                      <p className="text-xl line-through mb-1" style={{
                        color: '#FFE4E1',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)'
                      }}>
                        48,999.-
                      </p>
                      <h1
                        className="text-6xl font-black"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(180deg, #FFEB3B 0%, #FFD700 50%, #FFA500 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 1))',
                        }}
                      >
                        29,999.-
                      </h1>
                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 49 - ไต้หวัน NEW */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=800&q=80"
                    alt="Taiwan Taipei 101"
                    className="absolute inset-0 w-full h-full object-cover brightness-105"
                  />

                  {/* Left Side Vertical */}
                  <div className="absolute top-0 left-0 bottom-0" style={{ width: '45%' }}>
                    <div className="absolute inset-0" style={{
                      background: `
                        linear-gradient(
                          to right,
                          rgba(255, 0, 0, 0.94) 0%,
                          rgba(255, 69, 0, 0.90) 60%,
                          transparent 100%
                        )
                      `,
                    }} />
                  </div>

                  {/* Content - Left Side Center */}
                  <div className="absolute top-1/2 left-6 transform -translate-y-1/2 z-10" style={{ width: '38%' }}>
                    <div className="inline-block mb-3 px-3 py-2 rounded-lg"
                      style={{
                        background: '#FFEB3B',
                        border: '3px solid #FF0000',
                      }}>
                      <p className="text-xs font-black text-black">⚡ HOT</p>
                    </div>

                    <h3
                      className="text-3xl font-black mb-2"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                        textShadow: '3px 3px 0px rgba(0, 0, 0, 1)',
                      }}
                    >
                      ทัวร์ไต้หวัน
                    </h3>

                    <p className="text-sm mb-3" style={{
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 1)'
                    }}>
                      ไทเป-จิ้วเฟิ่น
                    </p>

                    <p className="text-base line-through mb-1" style={{
                      color: '#FFE4E1',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.9)'
                    }}>
                      29,999.-
                    </p>
                    <h1
                      className="text-5xl font-black"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        background: 'linear-gradient(180deg, #FFEB3B 0%, #FFA500 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 1))',
                      }}
                    >
                      14,999.-
                    </h1>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 50 - ฮ่องกง NEW */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=800&q=80"
                    alt="Hong Kong"
                    className="absolute inset-0 w-full h-full object-cover brightness-105"
                  />

                  {/* Bottom Half Strong */}
                  <div className="absolute bottom-0 left-0 right-0" style={{ height: '50%' }}>
                    <div className="absolute inset-0" style={{
                      background: `
                        linear-gradient(
                          to top,
                          rgba(255, 0, 0, 0.94) 0%,
                          rgba(255, 69, 0, 0.88) 50%,
                          transparent 100%
                        )
                      `,
                    }} />
                  </div>

                  {/* Content - Bottom Center */}
                  <div className="absolute bottom-6 left-0 right-0 text-center z-10 px-6" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="inline-block mb-3 px-4 py-2 rounded-full"
                      style={{
                        background: '#FFEB3B',
                        boxShadow: '0 6px 16px rgba(255, 235, 59, 0.9)',
                        border: '3px solid #FFFFFF',
                      }}>
                      <p className="text-sm font-black text-black">⚡ SALE</p>
                    </div>

                    <h3
                      className="text-4xl font-black mb-2"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                        textShadow: '4px 4px 0px rgba(0, 0, 0, 1)',
                      }}
                    >
                      ทัวร์ฮ่องกง
                    </h3>

                    <p className="text-base mb-3" style={{
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 1)'
                    }}>
                      ดิสนีย์-วิกตอเรียพีค
                    </p>

                    <div className="flex items-baseline justify-center gap-3">
                      <p className="text-xl line-through" style={{
                        color: '#FFE4E1',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)'
                      }}>
                        19,999.-
                      </p>
                      <h1
                        className="text-7xl font-black"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(180deg, #FFEB3B 0%, #FFD700 50%, #FFA500 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 1))',
                        }}
                      >
                        8,999.-
                      </h1>
                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 51 - มัลดีฟส์ NEW */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80"
                    alt="Maldives"
                    className="absolute inset-0 w-full h-full object-cover brightness-105"
                  />

                  {/* Top Right Corner */}
                  <div className="absolute top-0 right-0" style={{ width: '50%', height: '50%' }}>
                    <div className="absolute inset-0" style={{
                      background: `
                        radial-gradient(
                          circle at 100% 0%,
                          rgba(255, 0, 0, 0.92) 0%,
                          rgba(255, 69, 0, 0.86) 50%,
                          transparent 75%
                        )
                      `,
                    }} />
                  </div>

                  {/* Content - Top Right */}
                  <div className="absolute top-6 right-6 text-right z-10" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="inline-block mb-3 px-4 py-2 rounded-xl"
                      style={{
                        background: '#FFEB3B',
                        border: '3px solid #FF0000',
                      }}>
                      <p className="text-sm font-black text-black">⚡ HOT</p>
                    </div>

                    <h3
                      className="text-3xl font-black mb-2"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                        textShadow: '3px 3px 0px rgba(0, 0, 0, 1)',
                      }}
                    >
                      มัลดีฟส์
                    </h3>

                    <p className="text-sm mb-3" style={{
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 1)'
                    }}>
                      รีสอร์ท 5 ดาว
                    </p>

                    <p className="text-lg line-through mb-1" style={{
                      color: '#FFE4E1',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.9)'
                    }}>
                      89,999.-
                    </p>
                    <h1
                      className="text-6xl font-black"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        background: 'linear-gradient(180deg, #FFEB3B 0%, #FFD700 50%, #FFA500 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 1))',
                      }}
                    >
                      59,999.-
                    </h1>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 52 - ดูไบ NEW */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80"
                    alt="Dubai"
                    className="absolute inset-0 w-full h-full object-cover brightness-105"
                  />

                  {/* Bottom Left Corner */}
                  <div className="absolute bottom-0 left-0" style={{ width: '55%', height: '55%' }}>
                    <div className="absolute inset-0" style={{
                      background: `
                        radial-gradient(
                          circle at 0% 100%,
                          rgba(255, 0, 0, 0.94) 0%,
                          rgba(255, 69, 0, 0.88) 40%,
                          transparent 70%
                        )
                      `,
                    }} />
                  </div>

                  {/* Content - Bottom Left */}
                  <div className="absolute bottom-6 left-6 z-10" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="inline-block mb-3 px-4 py-2 rounded-xl"
                      style={{
                        background: '#FFEB3B',
                        boxShadow: '0 6px 16px rgba(255, 235, 59, 0.9)',
                        border: '3px solid #FFFFFF',
                      }}>
                      <p className="text-sm font-black text-black">⚡ SALE</p>
                    </div>

                    <h3
                      className="text-4xl font-black mb-2"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                        textShadow: '4px 4px 0px rgba(0, 0, 0, 1)',
                      }}
                    >
                      ทัวร์ดูไบ
                    </h3>

                    <p className="text-base mb-3" style={{
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 1)'
                    }}>
                      เบิร์จคาลิฟา-ทะเลทราย
                    </p>

                    <div>
                      <p className="text-xl line-through mb-1" style={{
                        color: '#FFE4E1',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)'
                      }}>
                        75,999.-
                      </p>
                      <h1
                        className="text-6xl font-black"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(180deg, #FFEB3B 0%, #FFD700 50%, #FFA500 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 1))',
                        }}
                      >
                        45,999.-
                      </h1>
                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 53 - จีน NEW */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80"
                    alt="China Great Wall"
                    className="absolute inset-0 w-full h-full object-cover brightness-105"
                  />

                  {/* Right Side Vertical */}
                  <div className="absolute top-0 right-0 bottom-0" style={{ width: '48%' }}>
                    <div className="absolute inset-0" style={{
                      background: `
                        linear-gradient(
                          to left,
                          rgba(255, 0, 0, 0.94) 0%,
                          rgba(255, 69, 0, 0.88) 60%,
                          transparent 100%
                        )
                      `,
                    }} />
                  </div>

                  {/* Content - Right Side Center */}
                  <div className="absolute top-1/2 right-6 transform -translate-y-1/2 text-right z-10" style={{ width: '42%' }}>
                    <div className="inline-block mb-3 px-4 py-2 rounded-lg"
                      style={{
                        background: '#FFEB3B',
                        border: '3px solid #FFFFFF',
                      }}>
                      <p className="text-sm font-black text-black">⚡ FLASH</p>
                    </div>

                    <h3
                      className="text-4xl font-black mb-2"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFEB3B',
                        textShadow: '4px 4px 0px rgba(0, 0, 0, 1)',
                      }}
                    >
                      ทัวร์จีน
                    </h3>

                    <p className="text-base mb-3" style={{
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 1)'
                    }}>
                      กำแพงเมืองจีน-ปักกิ่ง
                    </p>

                    <div>
                      <p className="text-xl line-through mb-1" style={{
                        color: '#FFE4E1',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)'
                      }}>
                        42,999.-
                      </p>
                      <h1
                        className="text-6xl font-black"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(180deg, #FFEB3B 0%, #FFD700 50%, #FFA500 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 1))',
                        }}
                      >
                        22,999.-
                      </h1>
                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 54 - Vietnam Enhanced Banner */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform">
                  {/* Background - Vector Pattern */}
                  <img
                    src={"/vectors/Depositphotos_795891962_XL.jpg"}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      filter: 'brightness(0.75) contrast(1.1)'
                    }}
                  />

                  {/* Top Image Layer - Vietnam Banner (47.5%) with smooth blend */}
                  <div
                    className="absolute top-0 left-0 right-0"
                    style={{
                      height: '47.5%',
                      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)'
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80"
                      alt="Vietnam landscape"
                      className="w-full h-full object-cover"
                      style={{
                        opacity: 0.85,
                        mixBlendMode: 'luminosity'
                      }}
                    />
                  </div>

                  {/* Bottom Dark Gradient */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      height: '60%',
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 25%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0) 100%)'
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="relative text-center w-full px-2">

                      {/* Tour Type Header */}
                      <div className="mb-2">
                        <h3
                          className="text-4xl md:text-5xl font-black tracking-tight"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FF4500',
                            textShadow: '4px 4px 0px rgba(0, 0, 0, 0.8), 8px 8px 20px rgba(0, 0, 0, 0.6)',
                            WebkitTextStroke: '2px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          ทัวร์เวียดนาม <span style={{ color: '#FFEB3B' }}>สุดฮอต</span>
                        </h3>
                      </div>

                      {/* Duration */}
                      <div className="mb-3">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                          }}
                        >
                          ฮานอย-ฮาลอง 4 วัน 3 คืน
                        </p>
                      </div>

                      {/* Promo Badge */}
                      <div className="inline-block mb-3 px-4 md:px-6 py-1.5 md:py-2 rounded-full" style={{ background: 'linear-gradient(135deg, #FFEB3B 0%, #FBC02D 100%)', boxShadow: '0 4px 12px rgba(251, 192, 45, 0.6)' }}>
                        <p className="text-lg md:text-xl font-black text-black" style={{ fontFamily: 'Kanit, sans-serif' }}>
                          📅 โปรถึง 31 ธ.ค. เท่านั้น!
                        </p>
                      </div>

                      {/* Discount Line */}
                      <div className="mb-2">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          ลดเหลือจาก <span className="line-through" style={{ color: '#FF6B6B' }}>24,999.-</span>
                        </p>
                      </div>

                      {/* Main Price */}
                      <div className="relative inline-block">
                        <h1
                          className="text-6xl md:text-7xl font-black leading-none"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(180deg, #FFEB3B 0%, #FF9800 50%, #FF5722 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '0 0 30px rgba(255, 235, 59, 0.8)',
                            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 20px rgba(255, 152, 0, 0.8))',
                            WebkitTextStroke: '1px rgba(255, 235, 59, 0.5)'
                          }}
                        >
                          16,999.-
                        </h1>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-4">
                        <button
                          className="w-full max-w-sm mx-auto block"
                          style={{
                            background: 'linear-gradient(135deg, #FF0000 0%, #DC2626 100%)',
                            padding: '16px 32px',
                            borderRadius: '12px',
                            border: '3px solid #FFEB3B',
                            boxShadow: '0 0 40px rgba(255, 0, 0, 0.8), 0 6px 20px rgba(0, 0, 0, 0.6)',
                            cursor: 'pointer',
                            animation: 'scale-pulse 2s ease-in-out infinite'
                          }}
                        >
                          <p
                            className="text-xl md:text-2xl font-black"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF',
                              textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                            }}
                          >
                            🎁 รับส่วนลด 8,000.- เลย!
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1
                  </span>
                </div>
              </div>

              {/* Demo Card 55 - Japan Bottom Banner */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform">
                  {/* Background - Vector Pattern */}
                  <img
                    src={"/vectors/Comic pop art background.jpg"}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      filter: 'brightness(0.75) contrast(1.1)'
                    }}
                  />

                  {/* Bottom Image Layer - Japan Banner (47.5%) with smooth blend */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      height: '47.5%',
                      maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)',
                      WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)'
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80"
                      alt="Japan cityscape"
                      className="w-full h-full object-cover"
                      style={{
                        opacity: 0.85,
                        mixBlendMode: 'luminosity'
                      }}
                    />
                  </div>

                  {/* Top Dark Gradient */}
                  <div
                    className="absolute top-0 left-0 right-0"
                    style={{
                      height: '60%',
                      background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 25%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0) 100%)'
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="relative text-center w-full px-2">
                      {/* Tour Type Header */}
                      <div className="mb-2">
                        <h3
                          className="text-4xl md:text-5xl font-black tracking-tight"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FF4500',
                            textShadow: '4px 4px 0px rgba(0, 0, 0, 0.8), 8px 8px 20px rgba(0, 0, 0, 0.6)',
                            WebkitTextStroke: '2px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          ทัวร์ญี่ปุ่น <span style={{ color: '#FFEB3B' }}>ซากุระ</span>
                        </h3>
                      </div>

                      {/* Duration */}
                      <div className="mb-3">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                          }}
                        >
                          โตเกียว-ฟูจิ 5 วัน 3 คืน
                        </p>
                      </div>

                      {/* Promo Badge */}
                      <div className="inline-block mb-3 px-4 md:px-6 py-1.5 md:py-2 rounded-full" style={{ background: 'linear-gradient(135deg, #FFEB3B 0%, #FBC02D 100%)', boxShadow: '0 4px 12px rgba(251, 192, 45, 0.6)' }}>
                        <p className="text-lg md:text-xl font-black text-black" style={{ fontFamily: 'Kanit, sans-serif' }}>
                          🌸 ซากุระบาน พิเศษ!
                        </p>
                      </div>

                      {/* Discount Line */}
                      <div className="mb-2">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          จากปกติ <span className="line-through" style={{ color: '#FF6B6B' }}>45,999.-</span>
                        </p>
                      </div>

                      {/* Main Price */}
                      <div className="relative inline-block">
                        <h1
                          className="text-6xl md:text-7xl font-black leading-none"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(180deg, #FFEB3B 0%, #FF9800 50%, #FF5722 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '0 0 30px rgba(255, 235, 59, 0.8)',
                            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 20px rgba(255, 152, 0, 0.8))',
                            WebkitTextStroke: '1px rgba(255, 235, 59, 0.5)'
                          }}
                        >
                          32,999.-
                        </h1>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-4">
                        <button
                          className="w-full max-w-sm mx-auto block"
                          style={{
                            background: 'linear-gradient(135deg, #FF0000 0%, #DC2626 100%)',
                            padding: '16px 32px',
                            borderRadius: '12px',
                            border: '3px solid #FFEB3B',
                            boxShadow: '0 0 40px rgba(255, 0, 0, 0.8), 0 6px 20px rgba(0, 0, 0, 0.6)',
                            cursor: 'pointer',
                            animation: 'scale-pulse 2s ease-in-out infinite'
                          }}
                        >
                          <p
                            className="text-xl md:text-2xl font-black"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF',
                              textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                            }}
                          >
                            🎌 จองเลย รับของขวัญ!
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1 (Bottom Banner)
                  </span>
                </div>
              </div>

              {/* Demo Card 56 - Singapore Left Banner */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform">
                  {/* Background - Vector Pattern */}
                  <img
                    src={"/vectors/Depositphotos_795891962_XL.jpg"}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      filter: 'brightness(0.75) contrast(1.1)'
                    }}
                  />

                  {/* Left Image Layer - Singapore Banner (40%) with smooth blend */}
                  <div
                    className="absolute top-0 bottom-0 left-0"
                    style={{
                      width: '40%',
                      maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)',
                      WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)'
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80"
                      alt="Singapore"
                      className="w-full h-full object-cover"
                      style={{
                        opacity: 0.85,
                        mixBlendMode: 'luminosity'
                      }}
                    />
                  </div>

                  {/* Right Dark Gradient */}
                  <div
                    className="absolute top-0 bottom-0 right-0"
                    style={{
                      width: '70%',
                      background: 'linear-gradient(to left, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0) 100%)'
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="relative text-center w-full px-2">
                      {/* Tour Type Header */}
                      <div className="mb-2">
                        <h3
                          className="text-4xl md:text-5xl font-black tracking-tight"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FF4500',
                            textShadow: '4px 4px 0px rgba(0, 0, 0, 0.8), 8px 8px 20px rgba(0, 0, 0, 0.6)',
                            WebkitTextStroke: '2px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          ทัวร์สิงคโปร์ <span style={{ color: '#FFEB3B' }}>หรูหรา</span>
                        </h3>
                      </div>

                      {/* Duration */}
                      <div className="mb-3">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                          }}
                        >
                          สิงคโปร์-เซ็นโตซ่า 4 วัน 3 คืน
                        </p>
                      </div>

                      {/* Promo Badge */}
                      <div className="inline-block mb-3 px-4 md:px-6 py-1.5 md:py-2 rounded-full" style={{ background: 'linear-gradient(135deg, #FFEB3B 0%, #FBC02D 100%)', boxShadow: '0 4px 12px rgba(251, 192, 45, 0.6)' }}>
                        <p className="text-lg md:text-xl font-black text-black" style={{ fontFamily: 'Kanit, sans-serif' }}>
                          🏙️ City Break ลด 30%
                        </p>
                      </div>

                      {/* Discount Line */}
                      <div className="mb-2">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          ราคาปกติ <span className="line-through" style={{ color: '#FF6B6B' }}>38,999.-</span>
                        </p>
                      </div>

                      {/* Main Price */}
                      <div className="relative inline-block">
                        <h1
                          className="text-6xl md:text-7xl font-black leading-none"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(180deg, #FFEB3B 0%, #FF9800 50%, #FF5722 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '0 0 30px rgba(255, 235, 59, 0.8)',
                            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 20px rgba(255, 152, 0, 0.8))',
                            WebkitTextStroke: '1px rgba(255, 235, 59, 0.5)'
                          }}
                        >
                          27,299.-
                        </h1>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-4">
                        <button
                          className="w-full max-w-sm mx-auto block"
                          style={{
                            background: 'linear-gradient(135deg, #FF0000 0%, #DC2626 100%)',
                            padding: '16px 32px',
                            borderRadius: '12px',
                            border: '3px solid #FFEB3B',
                            boxShadow: '0 0 40px rgba(255, 0, 0, 0.8), 0 6px 20px rgba(0, 0, 0, 0.6)',
                            cursor: 'pointer',
                            animation: 'scale-pulse 2s ease-in-out infinite'
                          }}
                        >
                          <p
                            className="text-xl md:text-2xl font-black"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF',
                              textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                            }}
                          >
                            🎯 จองด่วน ที่นั่งจำกัด!
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1 (Left Banner)
                  </span>
                </div>
              </div>

              {/* Demo Card 57 - Taiwan Right Banner */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform">
                  {/* Background - Vector Pattern */}
                  <img
                    src={"/vectors/Comic pop art background.jpg"}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      filter: 'brightness(0.75) contrast(1.1)'
                    }}
                  />

                  {/* Right Image Layer - Taiwan Banner (40%) with smooth blend */}
                  <div
                    className="absolute top-0 bottom-0 right-0"
                    style={{
                      width: '40%',
                      maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)',
                      WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)'
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1540897677-a614fb3b1e8c?w=800&q=80"
                      alt="Taiwan"
                      className="w-full h-full object-cover"
                      style={{
                        opacity: 0.85,
                        mixBlendMode: 'luminosity'
                      }}
                    />
                  </div>

                  {/* Left Dark Gradient */}
                  <div
                    className="absolute top-0 bottom-0 left-0"
                    style={{
                      width: '70%',
                      background: 'linear-gradient(to right, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0) 100%)'
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="relative text-center w-full px-2">
                      {/* Tour Type Header */}
                      <div className="mb-2">
                        <h3
                          className="text-4xl md:text-5xl font-black tracking-tight"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FF4500',
                            textShadow: '4px 4px 0px rgba(0, 0, 0, 0.8), 8px 8px 20px rgba(0, 0, 0, 0.6)',
                            WebkitTextStroke: '2px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          ทัวร์ไต้หวัน <span style={{ color: '#FFEB3B' }}>ไฮไลท์</span>
                        </h3>
                      </div>

                      {/* Duration */}
                      <div className="mb-3">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                          }}
                        >
                          ไทเป-อาลีซาน 5 วัน 3 คืน
                        </p>
                      </div>

                      {/* Promo Badge */}
                      <div className="inline-block mb-3 px-4 md:px-6 py-1.5 md:py-2 rounded-full" style={{ background: 'linear-gradient(135deg, #FFEB3B 0%, #FBC02D 100%)', boxShadow: '0 4px 12px rgba(251, 192, 45, 0.6)' }}>
                        <p className="text-lg md:text-xl font-black text-black" style={{ fontFamily: 'Kanit, sans-serif' }}>
                          🎊 Early Bird ลดเพิ่ม
                        </p>
                      </div>

                      {/* Discount Line */}
                      <div className="mb-2">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          เคยราคา <span className="line-through" style={{ color: '#FF6B6B' }}>29,999.-</span>
                        </p>
                      </div>

                      {/* Main Price */}
                      <div className="relative inline-block">
                        <h1
                          className="text-6xl md:text-7xl font-black leading-none"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(180deg, #FFEB3B 0%, #FF9800 50%, #FF5722 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '0 0 30px rgba(255, 235, 59, 0.8)',
                            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 20px rgba(255, 152, 0, 0.8))',
                            WebkitTextStroke: '1px rgba(255, 235, 59, 0.5)'
                          }}
                        >
                          21,999.-
                        </h1>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-4">
                        <button
                          className="w-full max-w-sm mx-auto block"
                          style={{
                            background: 'linear-gradient(135deg, #FF0000 0%, #DC2626 100%)',
                            padding: '16px 32px',
                            borderRadius: '12px',
                            border: '3px solid #FFEB3B',
                            boxShadow: '0 0 40px rgba(255, 0, 0, 0.8), 0 6px 20px rgba(0, 0, 0, 0.6)',
                            cursor: 'pointer',
                            animation: 'scale-pulse 2s ease-in-out infinite'
                          }}
                        >
                          <p
                            className="text-xl md:text-2xl font-black"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF',
                              textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                            }}
                          >
                            ⚡ จับโปรด่วน!
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1 (Right Banner)
                  </span>
                </div>
              </div>

              {/* Demo Card 58 - Korea Center Circular Banner */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform">
                  {/* Background - Vector Pattern */}
                  <img
                    src={"/vectors/Depositphotos_795891962_XL.jpg"}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      filter: 'brightness(0.75) contrast(1.1)'
                    }}
                  />

                  {/* Center Circular Image Layer - Korea Banner with radial fade */}
                  <div
                    className="absolute"
                    style={{
                      top: '50%',
                      left: '50%',
                      width: '80%',
                      height: '80%',
                      transform: 'translate(-50%, -50%)',
                      maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%)',
                      WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%)'
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80"
                      alt="Korea Seoul"
                      className="w-full h-full object-cover"
                      style={{
                        opacity: 0.85,
                        mixBlendMode: 'luminosity'
                      }}
                    />
                  </div>

                  {/* Circular Dark Gradient Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 40%, rgba(0, 0, 0, 0.85) 100%)'
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="relative text-center w-full px-2">
                      {/* Tour Type Header */}
                      <div className="mb-2">
                        <h3
                          className="text-4xl md:text-5xl font-black tracking-tight"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FF4500',
                            textShadow: '4px 4px 0px rgba(0, 0, 0, 0.8), 8px 8px 20px rgba(0, 0, 0, 0.6)',
                            WebkitTextStroke: '2px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          ทัวร์เกาหลี <span style={{ color: '#FFEB3B' }}>โอปป้า</span>
                        </h3>
                      </div>

                      {/* Duration */}
                      <div className="mb-3">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                          }}
                        >
                          โซล-เกาะนามิ 5 วัน 3 คืน
                        </p>
                      </div>

                      {/* Promo Badge */}
                      <div className="inline-block mb-3 px-4 md:px-6 py-1.5 md:py-2 rounded-full" style={{ background: 'linear-gradient(135deg, #FFEB3B 0%, #FBC02D 100%)', boxShadow: '0 4px 12px rgba(251, 192, 45, 0.6)' }}>
                        <p className="text-lg md:text-xl font-black text-black" style={{ fontFamily: 'Kanit, sans-serif' }}>
                          💜 K-Drama Tour!
                        </p>
                      </div>

                      {/* Discount Line */}
                      <div className="mb-2">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          ปกติ <span className="line-through" style={{ color: '#FF6B6B' }}>39,999.-</span>
                        </p>
                      </div>

                      {/* Main Price */}
                      <div className="relative inline-block">
                        <h1
                          className="text-6xl md:text-7xl font-black leading-none"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(180deg, #FFEB3B 0%, #FF9800 50%, #FF5722 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '0 0 30px rgba(255, 235, 59, 0.8)',
                            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 20px rgba(255, 152, 0, 0.8))',
                            WebkitTextStroke: '1px rgba(255, 235, 59, 0.5)'
                          }}
                        >
                          29,999.-
                        </h1>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-4">
                        <button
                          className="w-full max-w-sm mx-auto block"
                          style={{
                            background: 'linear-gradient(135deg, #FF0000 0%, #DC2626 100%)',
                            padding: '16px 32px',
                            borderRadius: '12px',
                            border: '3px solid #FFEB3B',
                            boxShadow: '0 0 40px rgba(255, 0, 0, 0.8), 0 6px 20px rgba(0, 0, 0, 0.6)',
                            cursor: 'pointer',
                            animation: 'scale-pulse 2s ease-in-out infinite'
                          }}
                        >
                          <p
                            className="text-xl md:text-2xl font-black"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF',
                              textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                            }}
                          >
                            🎬 ไปกับโอปป้าเลย!
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1 (Center Circular)
                  </span>
                </div>
              </div>

              {/* Demo Card 59 - Maldives Split Banner */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform">
                  {/* Background - Vector Pattern */}
                  <img
                    src={"/vectors/Comic pop art background.jpg"}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      filter: 'brightness(0.75) contrast(1.1)'
                    }}
                  />

                  {/* Diagonal Split Image Layer - Maldives Banner */}
                  <div
                    className="absolute inset-0"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0 100%)',
                      WebkitClipPath: 'polygon(0 0, 100% 0, 60% 100%, 0 100%)'
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        maskImage: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0) 100%)',
                        WebkitMaskImage: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0) 100%)'
                      }}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80"
                        alt="Maldives"
                        className="w-full h-full object-cover"
                        style={{
                          opacity: 0.85,
                          mixBlendMode: 'luminosity'
                        }}
                      />
                    </div>
                  </div>

                  {/* Diagonal Gradient Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 30%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.85) 100%)'
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="relative text-center w-full px-2">
                      {/* Tour Type Header */}
                      <div className="mb-2">
                        <h3
                          className="text-4xl md:text-5xl font-black tracking-tight"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FF4500',
                            textShadow: '4px 4px 0px rgba(0, 0, 0, 0.8), 8px 8px 20px rgba(0, 0, 0, 0.6)',
                            WebkitTextStroke: '2px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          ทัวร์มัลดีฟส์ <span style={{ color: '#FFEB3B' }}>สวรรค์</span>
                        </h3>
                      </div>

                      {/* Duration */}
                      <div className="mb-3">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                          }}
                        >
                          มาเล-รีสอร์ท 6 วัน 4 คืน
                        </p>
                      </div>

                      {/* Promo Badge */}
                      <div className="inline-block mb-3 px-4 md:px-6 py-1.5 md:py-2 rounded-full" style={{ background: 'linear-gradient(135deg, #FFEB3B 0%, #FBC02D 100%)', boxShadow: '0 4px 12px rgba(251, 192, 45, 0.6)' }}>
                        <p className="text-lg md:text-xl font-black text-black" style={{ fontFamily: 'Kanit, sans-serif' }}>
                          🏝️ ฮันนีมูน พิเศษ!
                        </p>
                      </div>

                      {/* Discount Line */}
                      <div className="mb-2">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          จากราคา <span className="line-through" style={{ color: '#FF6B6B' }}>89,999.-</span>
                        </p>
                      </div>

                      {/* Main Price */}
                      <div className="relative inline-block">
                        <h1
                          className="text-6xl md:text-7xl font-black leading-none"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(180deg, #FFEB3B 0%, #FF9800 50%, #FF5722 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '0 0 30px rgba(255, 235, 59, 0.8)',
                            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 20px rgba(255, 152, 0, 0.8))',
                            WebkitTextStroke: '1px rgba(255, 235, 59, 0.5)'
                          }}
                        >
                          65,999.-
                        </h1>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-4">
                        <button
                          className="w-full max-w-sm mx-auto block"
                          style={{
                            background: 'linear-gradient(135deg, #FF0000 0%, #DC2626 100%)',
                            padding: '16px 32px',
                            borderRadius: '12px',
                            border: '3px solid #FFEB3B',
                            boxShadow: '0 0 40px rgba(255, 0, 0, 0.8), 0 6px 20px rgba(0, 0, 0, 0.6)',
                            cursor: 'pointer',
                            animation: 'scale-pulse 2s ease-in-out infinite'
                          }}
                        >
                          <p
                            className="text-xl md:text-2xl font-black"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF',
                              textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                            }}
                          >
                            🌊 จองเลย! โปรสุดพิเศษ
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1 (Diagonal Split)
                  </span>
                </div>
              </div>

              {/* Demo Card 60 - Switzerland Top Banner */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform">
                  {/* Background - Vector Pattern */}
                  <img
                    src={"/vectors/Depositphotos_795891962_XL.jpg"}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      filter: 'brightness(0.75) contrast(1.1)'
                    }}
                  />

                  {/* Top Image Layer - Switzerland Banner (47.5%) with smooth blend */}
                  <div
                    className="absolute top-0 left-0 right-0"
                    style={{
                      height: '47.5%',
                      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)'
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80"
                      alt="Switzerland"
                      className="w-full h-full object-cover"
                      style={{
                        opacity: 0.85,
                        mixBlendMode: 'luminosity'
                      }}
                    />
                  </div>

                  {/* Bottom Dark Gradient */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      height: '60%',
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 25%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0) 100%)'
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="relative text-center w-full px-2">
                      {/* Tour Type Header */}
                      <div className="mb-2">
                        <h3
                          className="text-4xl md:text-5xl font-black tracking-tight"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FF4500',
                            textShadow: '4px 4px 0px rgba(0, 0, 0, 0.8), 8px 8px 20px rgba(0, 0, 0, 0.6)',
                            WebkitTextStroke: '2px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          ทัวร์ยุโรป <span style={{ color: '#FFEB3B' }}>สุดพิเศษ</span>
                        </h3>
                      </div>

                      {/* Duration */}
                      <div className="mb-3">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                          }}
                        >
                          สวิส-ฝรั่งเศส 7 วัน 5 คืน
                        </p>
                      </div>

                      {/* Promo Badge */}
                      <div className="inline-block mb-3 px-4 md:px-6 py-1.5 md:py-2 rounded-full" style={{ background: 'linear-gradient(135deg, #FFEB3B 0%, #FBC02D 100%)', boxShadow: '0 4px 12px rgba(251, 192, 45, 0.6)' }}>
                        <p className="text-lg md:text-xl font-black text-black" style={{ fontFamily: 'Kanit, sans-serif' }}>
                          ✈️ ยุโรป ดีลพิเศษ!
                        </p>
                      </div>

                      {/* Discount Line */}
                      <div className="mb-2">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          จากปกติ <span className="line-through" style={{ color: '#FF6B6B' }}>79,999.-</span>
                        </p>
                      </div>

                      {/* Main Price */}
                      <div className="relative inline-block">
                        <h1
                          className="text-6xl md:text-7xl font-black leading-none"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(180deg, #FFEB3B 0%, #FF9800 50%, #FF5722 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '0 0 30px rgba(255, 235, 59, 0.8)',
                            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 20px rgba(255, 152, 0, 0.8))',
                            WebkitTextStroke: '1px rgba(255, 235, 59, 0.5)'
                          }}
                        >
                          59,999.-
                        </h1>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-4">
                        <button
                          className="w-full max-w-sm mx-auto block"
                          style={{
                            background: 'linear-gradient(135deg, #FF0000 0%, #DC2626 100%)',
                            padding: '16px 32px',
                            borderRadius: '12px',
                            border: '3px solid #FFEB3B',
                            boxShadow: '0 0 40px rgba(255, 0, 0, 0.8), 0 6px 20px rgba(0, 0, 0, 0.6)',
                            cursor: 'pointer',
                            animation: 'scale-pulse 2s ease-in-out infinite'
                          }}
                        >
                          <p
                            className="text-xl md:text-2xl font-black"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF',
                              textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                            }}
                          >
                            🎁 จองด่วน ลดสูงสุด!
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1 (Top Banner)
                  </span>
                </div>
              </div>

              {/* Demo Card 61 - Dubai Bottom Banner */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform">
                  {/* Background - Vector Pattern */}
                  <img
                    src={"/vectors/Comic pop art background.jpg"}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      filter: 'brightness(0.75) contrast(1.1)'
                    }}
                  />

                  {/* Bottom Image Layer - Dubai Banner (47.5%) with smooth blend */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      height: '47.5%',
                      maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)',
                      WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)'
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80"
                      alt="Dubai"
                      className="w-full h-full object-cover"
                      style={{
                        opacity: 0.85,
                        mixBlendMode: 'luminosity'
                      }}
                    />
                  </div>

                  {/* Top Dark Gradient */}
                  <div
                    className="absolute top-0 left-0 right-0"
                    style={{
                      height: '60%',
                      background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 25%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0) 100%)'
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="relative text-center w-full px-2">
                      {/* Tour Type Header */}
                      <div className="mb-2">
                        <h3
                          className="text-4xl md:text-5xl font-black tracking-tight"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FF4500',
                            textShadow: '4px 4px 0px rgba(0, 0, 0, 0.8), 8px 8px 20px rgba(0, 0, 0, 0.6)',
                            WebkitTextStroke: '2px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          ทัวร์ดูไบ <span style={{ color: '#FFEB3B' }}>หรูหรา</span>
                        </h3>
                      </div>

                      {/* Duration */}
                      <div className="mb-3">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                          }}
                        >
                          ดูไบ-อาบูดาบี 5 วัน 3 คืน
                        </p>
                      </div>

                      {/* Promo Badge */}
                      <div className="inline-block mb-3 px-4 md:px-6 py-1.5 md:py-2 rounded-full" style={{ background: 'linear-gradient(135deg, #FFEB3B 0%, #FBC02D 100%)', boxShadow: '0 4px 12px rgba(251, 192, 45, 0.6)' }}>
                        <p className="text-lg md:text-xl font-black text-black" style={{ fontFamily: 'Kanit, sans-serif' }}>
                          🏙️ Luxury Deal!
                        </p>
                      </div>

                      {/* Discount Line */}
                      <div className="mb-2">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          ราคาปกติ <span className="line-through" style={{ color: '#FF6B6B' }}>52,999.-</span>
                        </p>
                      </div>

                      {/* Main Price */}
                      <div className="relative inline-block">
                        <h1
                          className="text-6xl md:text-7xl font-black leading-none"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(180deg, #FFEB3B 0%, #FF9800 50%, #FF5722 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '0 0 30px rgba(255, 235, 59, 0.8)',
                            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 20px rgba(255, 152, 0, 0.8))',
                            WebkitTextStroke: '1px rgba(255, 235, 59, 0.5)'
                          }}
                        >
                          42,999.-
                        </h1>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-4">
                        <button
                          className="w-full max-w-sm mx-auto block"
                          style={{
                            background: 'linear-gradient(135deg, #FF0000 0%, #DC2626 100%)',
                            padding: '16px 32px',
                            borderRadius: '12px',
                            border: '3px solid #FFEB3B',
                            boxShadow: '0 0 40px rgba(255, 0, 0, 0.8), 0 6px 20px rgba(0, 0, 0, 0.6)',
                            cursor: 'pointer',
                            animation: 'scale-pulse 2s ease-in-out infinite'
                          }}
                        >
                          <p
                            className="text-xl md:text-2xl font-black"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF',
                              textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                            }}
                          >
                            💎 ดีลสุดคุ้ม จองเลย!
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1 (Bottom Banner)
                  </span>
                </div>
              </div>

              {/* Demo Card 62 - Australia Left Banner */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform">
                  {/* Background - Vector Pattern */}
                  <img
                    src={"/vectors/Depositphotos_795891962_XL.jpg"}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      filter: 'brightness(0.75) contrast(1.1)'
                    }}
                  />

                  {/* Left Image Layer - Australia Banner (40%) with smooth blend */}
                  <div
                    className="absolute top-0 bottom-0 left-0"
                    style={{
                      width: '40%',
                      maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)',
                      WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)'
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80"
                      alt="Australia"
                      className="w-full h-full object-cover"
                      style={{
                        opacity: 0.85,
                        mixBlendMode: 'luminosity'
                      }}
                    />
                  </div>

                  {/* Right Dark Gradient */}
                  <div
                    className="absolute top-0 bottom-0 right-0"
                    style={{
                      width: '70%',
                      background: 'linear-gradient(to left, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0) 100%)'
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="relative text-center w-full px-2">
                      {/* Tour Type Header */}
                      <div className="mb-2">
                        <h3
                          className="text-4xl md:text-5xl font-black tracking-tight"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FF4500',
                            textShadow: '4px 4px 0px rgba(0, 0, 0, 0.8), 8px 8px 20px rgba(0, 0, 0, 0.6)',
                            WebkitTextStroke: '2px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          ทัวร์ออสเตรเลีย <span style={{ color: '#FFEB3B' }}>มหัศจรรย์</span>
                        </h3>
                      </div>

                      {/* Duration */}
                      <div className="mb-3">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                          }}
                        >
                          ซิดนีย์-เมลเบิร์น 6 วัน 4 คืน
                        </p>
                      </div>

                      {/* Promo Badge */}
                      <div className="inline-block mb-3 px-4 md:px-6 py-1.5 md:py-2 rounded-full" style={{ background: 'linear-gradient(135deg, #FFEB3B 0%, #FBC02D 100%)', boxShadow: '0 4px 12px rgba(251, 192, 45, 0.6)' }}>
                        <p className="text-lg md:text-xl font-black text-black" style={{ fontFamily: 'Kanit, sans-serif' }}>
                          🦘 Aussie Special!
                        </p>
                      </div>

                      {/* Discount Line */}
                      <div className="mb-2">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          จากราคา <span className="line-through" style={{ color: '#FF6B6B' }}>69,999.-</span>
                        </p>
                      </div>

                      {/* Main Price */}
                      <div className="relative inline-block">
                        <h1
                          className="text-6xl md:text-7xl font-black leading-none"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(180deg, #FFEB3B 0%, #FF9800 50%, #FF5722 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '0 0 30px rgba(255, 235, 59, 0.8)',
                            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 20px rgba(255, 152, 0, 0.8))',
                            WebkitTextStroke: '1px rgba(255, 235, 59, 0.5)'
                          }}
                        >
                          54,999.-
                        </h1>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-4">
                        <button
                          className="w-full max-w-sm mx-auto block"
                          style={{
                            background: 'linear-gradient(135deg, #FF0000 0%, #DC2626 100%)',
                            padding: '16px 32px',
                            borderRadius: '12px',
                            border: '3px solid #FFEB3B',
                            boxShadow: '0 0 40px rgba(255, 0, 0, 0.8), 0 6px 20px rgba(0, 0, 0, 0.6)',
                            cursor: 'pointer',
                            animation: 'scale-pulse 2s ease-in-out infinite'
                          }}
                        >
                          <p
                            className="text-xl md:text-2xl font-black"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF',
                              textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                            }}
                          >
                            🎉 จองเลย ลดเพิ่ม!
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1 (Left Banner)
                  </span>
                </div>
              </div>

              {/* Demo Card 63 - Bali Right Banner */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform">
                  {/* Background - Vector Pattern */}
                  <img
                    src={"/vectors/Comic pop art background.jpg"}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      filter: 'brightness(0.75) contrast(1.1)'
                    }}
                  />

                  {/* Right Image Layer - Bali Banner (40%) with smooth blend */}
                  <div
                    className="absolute top-0 bottom-0 right-0"
                    style={{
                      width: '40%',
                      maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)',
                      WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)'
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80"
                      alt="Bali"
                      className="w-full h-full object-cover"
                      style={{
                        opacity: 0.85,
                        mixBlendMode: 'luminosity'
                      }}
                    />
                  </div>

                  {/* Left Dark Gradient */}
                  <div
                    className="absolute top-0 bottom-0 left-0"
                    style={{
                      width: '70%',
                      background: 'linear-gradient(to right, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0) 100%)'
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="relative text-center w-full px-2">
                      {/* Tour Type Header */}
                      <div className="mb-2">
                        <h3
                          className="text-4xl md:text-5xl font-black tracking-tight"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FF4500',
                            textShadow: '4px 4px 0px rgba(0, 0, 0, 0.8), 8px 8px 20px rgba(0, 0, 0, 0.6)',
                            WebkitTextStroke: '2px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          ทัวร์บาหลี <span style={{ color: '#FFEB3B' }}>สุดชิล</span>
                        </h3>
                      </div>

                      {/* Duration */}
                      <div className="mb-3">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                          }}
                        >
                          บาหลี-อูบุด 5 วัน 3 คืน
                        </p>
                      </div>

                      {/* Promo Badge */}
                      <div className="inline-block mb-3 px-4 md:px-6 py-1.5 md:py-2 rounded-full" style={{ background: 'linear-gradient(135deg, #FFEB3B 0%, #FBC02D 100%)', boxShadow: '0 4px 12px rgba(251, 192, 45, 0.6)' }}>
                        <p className="text-lg md:text-xl font-black text-black" style={{ fontFamily: 'Kanit, sans-serif' }}>
                          🌴 Tropical Escape!
                        </p>
                      </div>

                      {/* Discount Line */}
                      <div className="mb-2">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          ปกติ <span className="line-through" style={{ color: '#FF6B6B' }}>25,999.-</span>
                        </p>
                      </div>

                      {/* Main Price */}
                      <div className="relative inline-block">
                        <h1
                          className="text-6xl md:text-7xl font-black leading-none"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(180deg, #FFEB3B 0%, #FF9800 50%, #FF5722 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '0 0 30px rgba(255, 235, 59, 0.8)',
                            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 20px rgba(255, 152, 0, 0.8))',
                            WebkitTextStroke: '1px rgba(255, 235, 59, 0.5)'
                          }}
                        >
                          18,999.-
                        </h1>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-4">
                        <button
                          className="w-full max-w-sm mx-auto block"
                          style={{
                            background: 'linear-gradient(135deg, #FF0000 0%, #DC2626 100%)',
                            padding: '16px 32px',
                            borderRadius: '12px',
                            border: '3px solid #FFEB3B',
                            boxShadow: '0 0 40px rgba(255, 0, 0, 0.8), 0 6px 20px rgba(0, 0, 0, 0.6)',
                            cursor: 'pointer',
                            animation: 'scale-pulse 2s ease-in-out infinite'
                          }}
                        >
                          <p
                            className="text-xl md:text-2xl font-black"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF',
                              textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                            }}
                          >
                            🔥 ราคาพิเศษ จองเลย!
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1 (Right Banner)
                  </span>
                </div>
              </div>

              {/* Demo Card 64 - Hong Kong Center Circular Banner */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform">
                  {/* Background - Vector Pattern */}
                  <img
                    src={"/vectors/Depositphotos_795891962_XL.jpg"}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      filter: 'brightness(0.75) contrast(1.1)'
                    }}
                  />

                  {/* Center Circular Image Layer - Hong Kong Banner with radial fade */}
                  <div
                    className="absolute"
                    style={{
                      top: '50%',
                      left: '50%',
                      width: '80%',
                      height: '80%',
                      transform: 'translate(-50%, -50%)',
                      maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%)',
                      WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%)'
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=800&q=80"
                      alt="Hong Kong"
                      className="w-full h-full object-cover"
                      style={{
                        opacity: 0.85,
                        mixBlendMode: 'luminosity'
                      }}
                    />
                  </div>

                  {/* Circular Dark Gradient Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 40%, rgba(0, 0, 0, 0.85) 100%)'
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <div className="relative text-center w-full px-2">
                      {/* Tour Type Header */}
                      <div className="mb-2">
                        <h3
                          className="text-4xl md:text-5xl font-black tracking-tight"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FF4500',
                            textShadow: '4px 4px 0px rgba(0, 0, 0, 0.8), 8px 8px 20px rgba(0, 0, 0, 0.6)',
                            WebkitTextStroke: '2px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          ทัวร์ฮ่องกง <span style={{ color: '#FFEB3B' }}>สุดคุ้ม</span>
                        </h3>
                      </div>

                      {/* Duration */}
                      <div className="mb-3">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                          }}
                        >
                          ฮ่องกง-มาเก๊า 4 วัน 3 คืน
                        </p>
                      </div>

                      {/* Promo Badge */}
                      <div className="inline-block mb-3 px-4 md:px-6 py-1.5 md:py-2 rounded-full" style={{ background: 'linear-gradient(135deg, #FFEB3B 0%, #FBC02D 100%)', boxShadow: '0 4px 12px rgba(251, 192, 45, 0.6)' }}>
                        <p className="text-lg md:text-xl font-black text-black" style={{ fontFamily: 'Kanit, sans-serif' }}>
                          🎰 ช้อปปิ้ง+คาสิโน!
                        </p>
                      </div>

                      {/* Discount Line */}
                      <div className="mb-2">
                        <p
                          className="text-xl md:text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          จากปกติ <span className="line-through" style={{ color: '#FF6B6B' }}>22,999.-</span>
                        </p>
                      </div>

                      {/* Main Price */}
                      <div className="relative inline-block">
                        <h1
                          className="text-6xl md:text-7xl font-black leading-none"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(180deg, #FFEB3B 0%, #FF9800 50%, #FF5722 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '0 0 30px rgba(255, 235, 59, 0.8)',
                            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 20px rgba(255, 152, 0, 0.8))',
                            WebkitTextStroke: '1px rgba(255, 235, 59, 0.5)'
                          }}
                        >
                          15,999.-
                        </h1>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-4">
                        <button
                          className="w-full max-w-sm mx-auto block"
                          style={{
                            background: 'linear-gradient(135deg, #FF0000 0%, #DC2626 100%)',
                            padding: '16px 32px',
                            borderRadius: '12px',
                            border: '3px solid #FFEB3B',
                            boxShadow: '0 0 40px rgba(255, 0, 0, 0.8), 0 6px 20px rgba(0, 0, 0, 0.6)',
                            cursor: 'pointer',
                            animation: 'scale-pulse 2s ease-in-out infinite'
                          }}
                        >
                          <p
                            className="text-xl md:text-2xl font-black"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF',
                              textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                            }}
                          >
                            💫 ที่สุดแห่งดีล!
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Aspect Ratio Label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    Aspect Ratio: 1:1 (Center Circular)
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Hero Banner Section */}
        <div className="w-full bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 mt-16">
          <div className="relative">
          <div ref={hero1ScrollRef} className="flex gap-6 md:gap-7 pt-16 transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlideHero1 * 384}px)` }}>

            {/* Statue of Liberty Banner */}
            <div className="flex-shrink-0 w-[360px] md:w-[420px] group">
              <div className="relative h-[480px] md:h-[560px] overflow-visible">
                {/* Airline Badge */}
                <div className="absolute top-4 left-4 z-30 squircle bg-white p-2 flex items-center justify-center" style={{ width: '80px', height: '80px' }}>
                  <img
                    src="/icons/airlines/united-airlines.svg"
                    alt="United Airlines"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Card content */}
                <div className="relative h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 transform">
                  <img
                    src="https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&h=1200&fit=crop&auto=format"
                    alt="Statue of Liberty, NY, USA"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}></div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                  <h3 className="text-2xl font-black mb-2 drop-shadow-lg">ทัวร์นิวยอร์ก 5 วัน 3 คืน</h3>

                  {/* Available Dates */}
                  <div className="mb-2 flex gap-1 overflow-x-auto scrollbar-hide">
                    {tourDates.map((date, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setAutoScrollStoppedHero1(true)
                          setAutoScrollStoppedHero2(true)
                          setSelectedDateIndex(index)
                        }}
                        className={`flex-shrink-0 px-1.5 py-0.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                          selectedDateIndex === index
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {date.period}
                      </button>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-white text-sm font-semibold">
                      <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>ชมอนุสาวรีย์เทพีเสรีภาพ ไอคอนของอเมริกา</span>
                    </div>
                    <div className="flex items-center gap-2 text-white text-sm font-semibold">
                      <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>เที่ยว Times Square ช้อปจุใจ 5th Avenue</span>
                    </div>
                    <div className="flex items-center gap-2 text-white text-sm font-semibold">
                      <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>ชมวิวมหานคร จาก Empire State Building</span>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="mb-3">
                    <div className="flex items-baseline gap-3">
                      <span className="text-lg text-gray-400 line-through">฿{tourDates[selectedDateIndex].originalPrice.toLocaleString()}</span>
                      <span className="font-black text-yellow-400" style={{ fontSize: '36px' }}>฿{tourDates[selectedDateIndex].price.toLocaleString()}.-</span>
                    </div>
                  </div>

                  {/* Bottom Action Bar */}
                  <div
                    onClick={() => {
                      setAutoScrollStoppedHero1(true)
                      setAutoScrollStoppedHero2(true)
                    }}
                    className="relative gradient-background-red text-white text-center py-3 rounded-xl shadow-2xl cursor-pointer transition-transform"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-lg font-black">เหลือ 5 ที่สุดท้าย! จองเลย</span>
                      <div className="relative flex items-center">
                        <div className="absolute w-4 h-4 bg-yellow-300 rounded-full animate-ping"></div>
                        <div className="relative w-4 h-4 bg-yellow-300 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  </div>
                </div>

                {/* Ribbon - Outside overflow-hidden */}
                <div
                  className="text-white font-black"
                  style={{
                    fontSize: '24px',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 9999,
                    isolation: 'isolate',
                    willChange: 'transform',
                    lineHeight: '1.8',
                    paddingInline: '1lh',
                    paddingBottom: '0.5em',
                    borderImage: 'conic-gradient(#0008 0 0) 51%/0.5em',
                    clipPath: 'polygon(100% calc(100% - 0.5em),100% 100%,calc(100% - 0.5em) calc(100% - 0.5em),0.5em calc(100% - 0.5em), 0 100%,0 calc(100% - 0.5em),999px calc(100% - 0.5em - 999px),calc(100% - 999px) calc(100% - 0.5em - 999px))',
                    transform: 'translate(calc((1 - 0.7071) * 100%), -100%) rotate(45deg) translateZ(0)',
                    transformOrigin: '0% 100%',
                    backgroundColor: '#BD1550'
                  }}
                >
                  ประหยัด ฿{tourDates[selectedDateIndex].discount.toLocaleString()}.-
                </div>
              </div>
            </div>

            {/* Second Banner - Paris */}
            <div className="flex-shrink-0 w-[360px] md:w-[420px] group">
              <div className="relative h-[480px] md:h-[560px] overflow-visible">
                {/* Airline Badge */}
                <div className="absolute top-4 left-4 z-30 squircle bg-white p-2 flex items-center justify-center" style={{ width: '80px', height: '80px' }}>
                  <img
                    src="/icons/airlines/emirates-airlines.svg"
                    alt="Emirates Airlines"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Card content */}
                <div className="relative h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 transform">
                  <img
                    src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=1200&fit=crop&auto=format"
                    alt="Paris, France"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}></div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <h3 className="text-2xl font-black mb-2 drop-shadow-lg">ทัวร์ปารีส 6 วัน 4 คืน</h3>

                    {/* Available Dates */}
                    <div className="mb-2 flex gap-1 overflow-x-auto scrollbar-hide">
                      {tourDates.map((date, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedDateIndex(index)}
                          className={`flex-shrink-0 px-1.5 py-0.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                            selectedDateIndex === index
                              ? 'bg-red-600 text-white hover:bg-red-700'
                              : 'bg-white/20 text-white hover:bg-white/30'
                          }`}
                        >
                          {date.period}
                        </button>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-white text-sm font-semibold">
                        <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>ชมหอไอเฟล สัญลักษณ์แห่งเมืองแสงไฟ</span>
                      </div>
                      <div className="flex items-center gap-2 text-white text-sm font-semibold">
                        <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>เที่ยวพิพิธภัณฑ์ลูฟร์ ชมโมนาลิซ่า</span>
                      </div>
                      <div className="flex items-center gap-2 text-white text-sm font-semibold">
                        <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>ล่องเรือแม่น้ำแซน ชมปารีสยามค่ำคืน</span>
                      </div>
                    </div>

                    {/* Price Section */}
                    <div className="mb-3">
                      <div className="flex items-baseline gap-3">
                        <span className="text-lg text-gray-400 line-through">฿{tourDates[selectedDateIndex].originalPrice.toLocaleString()}</span>
                        <span className="font-black text-yellow-400" style={{ fontSize: '36px' }}>฿{tourDates[selectedDateIndex].price.toLocaleString()}.-</span>
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div
                      onClick={() => {
                        setAutoScrollStoppedHero1(true)
                        setAutoScrollStoppedHero2(true)
                      }}
                      className="relative gradient-background-red text-white text-center py-3 rounded-xl shadow-2xl cursor-pointer transition-transform"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-lg font-black">เหลือ 3 ที่สุดท้าย! จองเลย</span>
                        <div className="relative flex items-center">
                          <div className="absolute w-4 h-4 bg-yellow-300 rounded-full animate-ping"></div>
                          <div className="relative w-4 h-4 bg-yellow-300 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ribbon - Outside overflow-hidden */}
                <div
                  className="text-white font-black"
                  style={{
                    fontSize: '24px',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 9999,
                    isolation: 'isolate',
                    willChange: 'transform',
                    lineHeight: '1.8',
                    paddingInline: '1lh',
                    paddingBottom: '0.5em',
                    borderImage: 'conic-gradient(#0008 0 0) 51%/0.5em',
                    clipPath: 'polygon(100% calc(100% - 0.5em),100% 100%,calc(100% - 0.5em) calc(100% - 0.5em),0.5em calc(100% - 0.5em), 0 100%,0 calc(100% - 0.5em),999px calc(100% - 0.5em - 999px),calc(100% - 999px) calc(100% - 0.5em - 999px))',
                    transform: 'translate(calc((1 - 0.7071) * 100%), -100%) rotate(45deg) translateZ(0)',
                    transformOrigin: '0% 100%',
                    backgroundColor: '#BD1550'
                  }}
                >
                  ประหยัด ฿{tourDates[selectedDateIndex].discount.toLocaleString()}.-
                </div>
              </div>
            </div>

            {/* Duplicate for infinite scroll */}
            {/* Statue of Liberty Banner */}
            <div className="flex-shrink-0 w-[360px] md:w-[420px] group">
              <div className="relative h-[480px] md:h-[560px] overflow-visible">
                {/* Airline Badge */}
                <div className="absolute top-4 left-4 z-30 squircle bg-white p-2 flex items-center justify-center" style={{ width: '80px', height: '80px' }}>
                  <img
                    src="/icons/airlines/united-airlines.svg"
                    alt="United Airlines"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Card content */}
                <div className="relative h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 transform">
                  <img
                    src="https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&h=1200&fit=crop&auto=format"
                    alt="Statue of Liberty, NY, USA"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}></div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                  <h3 className="text-2xl font-black mb-2 drop-shadow-lg">ทัวร์นิวยอร์ก 5 วัน 3 คืน</h3>

                  {/* Available Dates */}
                  <div className="mb-2 flex gap-1 overflow-x-auto scrollbar-hide">
                    {tourDates.map((date, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setAutoScrollStoppedHero1(true)
                          setAutoScrollStoppedHero2(true)
                          setSelectedDateIndex(index)
                        }}
                        className={`flex-shrink-0 px-1.5 py-0.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                          selectedDateIndex === index
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {date.period}
                      </button>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-white text-sm font-semibold">
                      <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>ชมอนุสาวรีย์เทพีเสรีภาพ ไอคอนของอเมริกา</span>
                    </div>
                    <div className="flex items-center gap-2 text-white text-sm font-semibold">
                      <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>เที่ยว Times Square ช้อปจุใจ 5th Avenue</span>
                    </div>
                    <div className="flex items-center gap-2 text-white text-sm font-semibold">
                      <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>ชมวิวมหานคร จาก Empire State Building</span>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="mb-3">
                    <div className="flex items-baseline gap-3">
                      <span className="text-lg text-gray-400 line-through">฿{tourDates[selectedDateIndex].originalPrice.toLocaleString()}</span>
                      <span className="font-black text-yellow-400" style={{ fontSize: '36px' }}>฿{tourDates[selectedDateIndex].price.toLocaleString()}.-</span>
                    </div>
                  </div>

                  {/* Bottom Action Bar */}
                  <div
                    onClick={() => {
                      setAutoScrollStoppedHero1(true)
                      setAutoScrollStoppedHero2(true)
                    }}
                    className="relative gradient-background-red text-white text-center py-3 rounded-xl shadow-2xl cursor-pointer transition-transform"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-lg font-black">เหลือ 5 ที่สุดท้าย! จองเลย</span>
                      <div className="relative flex items-center">
                        <div className="absolute w-4 h-4 bg-yellow-300 rounded-full animate-ping"></div>
                        <div className="relative w-4 h-4 bg-yellow-300 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  </div>
                </div>

                {/* Ribbon - Outside overflow-hidden */}
                <div
                  className="text-white font-black"
                  style={{
                    fontSize: '24px',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 9999,
                    isolation: 'isolate',
                    willChange: 'transform',
                    lineHeight: '1.8',
                    paddingInline: '1lh',
                    paddingBottom: '0.5em',
                    borderImage: 'conic-gradient(#0008 0 0) 51%/0.5em',
                    clipPath: 'polygon(100% calc(100% - 0.5em),100% 100%,calc(100% - 0.5em) calc(100% - 0.5em),0.5em calc(100% - 0.5em), 0 100%,0 calc(100% - 0.5em),999px calc(100% - 0.5em - 999px),calc(100% - 999px) calc(100% - 0.5em - 999px))',
                    transform: 'translate(calc((1 - 0.7071) * 100%), -100%) rotate(45deg) translateZ(0)',
                    transformOrigin: '0% 100%',
                    backgroundColor: '#BD1550'
                  }}
                >
                  ประหยัด ฿{tourDates[selectedDateIndex].discount.toLocaleString()}.-
                </div>
              </div>
            </div>

          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => {
                setAutoScrollStoppedHero1(true)
                setCurrentSlideHero1(currentSlideHero1 === 0 ? HERO_CARDS_COUNT - 1 : currentSlideHero1 - 1)
              }}
              className="bg-white/90 hover:bg-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-gray-800 font-semibold">ก่อนหน้า</span>
            </button>

            <button
              onClick={() => {
                setAutoScrollStoppedHero1(true)
                setCurrentSlideHero1(currentSlideHero1 + 1)
              }}
              className="bg-white/90 hover:bg-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <span className="text-gray-800 font-semibold">ถัดไป</span>
              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          </div>

        </div>
        </div>

        {/* Hero Banner 2 Section */}
        <div className="w-full bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 mt-16">
          <div className="relative">
          <div ref={heroScrollRef} className="flex gap-6 md:gap-7 pt-16 transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 384}px)` }}>

            {/* Statue of Liberty Banner */}
            <div className="flex-shrink-0 w-[360px] md:w-[420px] group">
              <div className="relative h-[480px] md:h-[560px] overflow-visible">
                {/* Airline Badge */}
                <div className="absolute top-4 left-4 z-30 squircle bg-white p-2 flex items-center justify-center" style={{ width: '80px', height: '80px' }}>
                  <img
                    src="/icons/airlines/united-airlines.svg"
                    alt="United Airlines"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Card content */}
                <div className="relative h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 transform">
                  <img
                    src="https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&h=1200&fit=crop&auto=format"
                    alt="Statue of Liberty, NY, USA"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}></div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                  <h3 className="text-2xl font-black mb-2 drop-shadow-lg">ทัวร์นิวยอร์ก 5 วัน 3 คืน</h3>

                  {/* Available Dates */}
                  <div className="mb-2 flex gap-1 overflow-x-auto scrollbar-hide">
                    {tourDates.map((date, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedDateIndex(index)}
                        className={`flex-shrink-0 px-1.5 py-0.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                          selectedDateIndex === index
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {date.period}
                      </button>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-white text-sm font-semibold">
                      <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>ชมอนุสาวรีย์เทพีเสรีภาพ ไอคอนของอเมริกา</span>
                    </div>
                    <div className="flex items-center gap-2 text-white text-sm font-semibold">
                      <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>เที่ยว Times Square ช้อปจุใจ 5th Avenue</span>
                    </div>
                    <div className="flex items-center gap-2 text-white text-sm font-semibold">
                      <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>ชมวิวมหานคร จาก Empire State Building</span>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="mb-3">
                    <div className="flex items-baseline gap-3">
                      <span className="text-lg text-gray-400 line-through">฿{tourDates[selectedDateIndex].originalPrice.toLocaleString()}</span>
                      <span className="font-black text-yellow-400" style={{ fontSize: '36px' }}>฿{tourDates[selectedDateIndex].price.toLocaleString()}.-</span>
                    </div>
                  </div>

                  {/* Bottom Action Bar */}
                  <div
                    onClick={() => setAutoScrollStoppedHero2(true)}
                    className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 rounded-xl shadow-2xl cursor-pointer transition-transform"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-lg font-black">🎄 ทัวร์ปีใหม่ 2025</span>
                      <div className="relative flex items-center">
                        <div className="absolute w-4 h-4 bg-yellow-300 rounded-full animate-ping"></div>
                        <div className="relative w-4 h-4 bg-yellow-300 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  </div>
                </div>

                {/* Ribbon - Outside overflow-hidden */}
                <div
                  className="text-white font-black"
                  style={{
                    fontSize: '24px',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 9999,
                    isolation: 'isolate',
                    willChange: 'transform',
                    lineHeight: '1.8',
                    paddingInline: '1lh',
                    paddingBottom: '0.5em',
                    borderImage: 'conic-gradient(#0008 0 0) 51%/0.5em',
                    clipPath: 'polygon(100% calc(100% - 0.5em),100% 100%,calc(100% - 0.5em) calc(100% - 0.5em),0.5em calc(100% - 0.5em), 0 100%,0 calc(100% - 0.5em),999px calc(100% - 0.5em - 999px),calc(100% - 999px) calc(100% - 0.5em - 999px))',
                    transform: 'translate(calc((1 - 0.7071) * 100%), -100%) rotate(45deg) translateZ(0)',
                    transformOrigin: '0% 100%',
                    backgroundColor: '#2563eb'
                  }}
                >
                  ติดวันหยุด 5 วัน
                </div>
              </div>
            </div>

            {/* Second Banner - Paris */}
            <div className="flex-shrink-0 w-[360px] md:w-[420px] group">
              <div className="relative h-[480px] md:h-[560px] overflow-visible">
                {/* Airline Badge */}
                <div className="absolute top-4 left-4 z-30 squircle bg-white p-2 flex items-center justify-center" style={{ width: '80px', height: '80px' }}>
                  <img
                    src="/icons/airlines/emirates-airlines.svg"
                    alt="Emirates Airlines"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Card content */}
                <div className="relative h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 transform">
                  <img
                    src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=1200&fit=crop&auto=format"
                    alt="Paris, France"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}></div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    <h3 className="text-2xl font-black mb-2 drop-shadow-lg">ทัวร์ปารีส 6 วัน 4 คืน</h3>

                    {/* Available Dates */}
                    <div className="mb-2 flex gap-1 overflow-x-auto scrollbar-hide">
                      {tourDates.map((date, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedDateIndex(index)}
                          className={`flex-shrink-0 px-1.5 py-0.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                            selectedDateIndex === index
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-white/20 text-white hover:bg-white/30'
                          }`}
                        >
                          {date.period}
                        </button>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-white text-sm font-semibold">
                        <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>ชมหอไอเฟล สัญลักษณ์แห่งเมืองแสงไฟ</span>
                      </div>
                      <div className="flex items-center gap-2 text-white text-sm font-semibold">
                        <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>เที่ยวพิพิธภัณฑ์ลูฟร์ ชมโมนาลิซ่า</span>
                      </div>
                      <div className="flex items-center gap-2 text-white text-sm font-semibold">
                        <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>ล่องเรือแม่น้ำแซน ชมปารีสยามค่ำคืน</span>
                      </div>
                    </div>

                    {/* Price Section */}
                    <div className="mb-3">
                      <div className="flex items-baseline gap-3">
                        <span className="text-lg text-gray-400 line-through">฿{tourDates[selectedDateIndex].originalPrice.toLocaleString()}</span>
                        <span className="font-black text-yellow-400" style={{ fontSize: '36px' }}>฿{tourDates[selectedDateIndex].price.toLocaleString()}.-</span>
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 rounded-xl shadow-2xl cursor-pointer hover:scale-105 transition-transform">
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-lg font-black">🌸 ทัวร์วาเลนไทน์ 2025</span>
                        <div className="relative flex items-center">
                          <div className="absolute w-4 h-4 bg-yellow-300 rounded-full animate-ping"></div>
                          <div className="relative w-4 h-4 bg-yellow-300 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ribbon - Outside overflow-hidden */}
                <div
                  className="text-white font-black"
                  style={{
                    fontSize: '24px',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    lineHeight: '1.8',
                    paddingInline: '1lh',
                    paddingBottom: '0.5em',
                    borderImage: 'conic-gradient(#0008 0 0) 51%/0.5em',
                    clipPath: 'polygon(100% calc(100% - 0.5em),100% 100%,calc(100% - 0.5em) calc(100% - 0.5em),0.5em calc(100% - 0.5em), 0 100%,0 calc(100% - 0.5em),999px calc(100% - 0.5em - 999px),calc(100% - 999px) calc(100% - 0.5em - 999px))',
                    transform: 'translate(calc((1 - 0.7071) * 100%), -100%) rotate(45deg)',
                    transformOrigin: '0% 100%',
                    backgroundColor: '#2563eb'
                  }}
                >
                  เทศกาลรัก
                </div>
              </div>
            </div>

            {/* Duplicate for infinite scroll */}
            {/* Statue of Liberty Banner */}
            <div className="flex-shrink-0 w-[360px] md:w-[420px] group">
              <div className="relative h-[480px] md:h-[560px] overflow-visible">
                {/* Airline Badge */}
                <div className="absolute top-4 left-4 z-30 squircle bg-white p-2 flex items-center justify-center" style={{ width: '80px', height: '80px' }}>
                  <img
                    src="/icons/airlines/united-airlines.svg"
                    alt="United Airlines"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Card content */}
                <div className="relative h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 transform">
                  <img
                    src="https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&h=1200&fit=crop&auto=format"
                    alt="Statue of Liberty, NY, USA"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}></div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                  <h3 className="text-2xl font-black mb-2 drop-shadow-lg">ทัวร์นิวยอร์ก 5 วัน 3 คืน</h3>

                  {/* Available Dates */}
                  <div className="mb-2 flex gap-1 overflow-x-auto scrollbar-hide">
                    {tourDates.map((date, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedDateIndex(index)}
                        className={`flex-shrink-0 px-1.5 py-0.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                          selectedDateIndex === index
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {date.period}
                      </button>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-white text-sm font-semibold">
                      <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>ชมอนุสาวรีย์เทพีเสรีภาพ ไอคอนของอเมริกา</span>
                    </div>
                    <div className="flex items-center gap-2 text-white text-sm font-semibold">
                      <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>เที่ยว Times Square ช้อปจุใจ 5th Avenue</span>
                    </div>
                    <div className="flex items-center gap-2 text-white text-sm font-semibold">
                      <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>ชมวิวมหานคร จาก Empire State Building</span>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="mb-3">
                    <div className="flex items-baseline gap-3">
                      <span className="text-lg text-gray-400 line-through">฿{tourDates[selectedDateIndex].originalPrice.toLocaleString()}</span>
                      <span className="font-black text-yellow-400" style={{ fontSize: '36px' }}>฿{tourDates[selectedDateIndex].price.toLocaleString()}.-</span>
                    </div>
                  </div>

                  {/* Bottom Action Bar */}
                  <div
                    onClick={() => setAutoScrollStoppedHero2(true)}
                    className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 rounded-xl shadow-2xl cursor-pointer transition-transform"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-lg font-black">🎄 ทัวร์ปีใหม่ 2025</span>
                      <div className="relative flex items-center">
                        <div className="absolute w-4 h-4 bg-yellow-300 rounded-full animate-ping"></div>
                        <div className="relative w-4 h-4 bg-yellow-300 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  </div>
                </div>

                {/* Ribbon - Outside overflow-hidden */}
                <div
                  className="text-white font-black"
                  style={{
                    fontSize: '24px',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 9999,
                    isolation: 'isolate',
                    willChange: 'transform',
                    lineHeight: '1.8',
                    paddingInline: '1lh',
                    paddingBottom: '0.5em',
                    borderImage: 'conic-gradient(#0008 0 0) 51%/0.5em',
                    clipPath: 'polygon(100% calc(100% - 0.5em),100% 100%,calc(100% - 0.5em) calc(100% - 0.5em),0.5em calc(100% - 0.5em), 0 100%,0 calc(100% - 0.5em),999px calc(100% - 0.5em - 999px),calc(100% - 999px) calc(100% - 0.5em - 999px))',
                    transform: 'translate(calc((1 - 0.7071) * 100%), -100%) rotate(45deg) translateZ(0)',
                    transformOrigin: '0% 100%',
                    backgroundColor: '#2563eb'
                  }}
                >
                  ติดวันหยุด 5 วัน
                </div>
              </div>
            </div>

          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => {
                setAutoScrollStoppedHero2(true)
                setCurrentSlide(currentSlide === 0 ? HERO_CARDS_COUNT - 1 : currentSlide - 1)
              }}
              className="bg-white/90 hover:bg-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-gray-800 font-semibold">ก่อนหน้า</span>
            </button>

            <button
              onClick={() => {
                setAutoScrollStoppedHero2(true)
                setCurrentSlide(currentSlide + 1)
              }}
              className="bg-white/90 hover:bg-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <span className="text-gray-800 font-semibold">ถัดไป</span>
              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          </div>

        </div>
        </div>

        {/* ทัวร์แนะนำ Section - New Mobile-First Design */}
        <div className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-b from-blue-50/50 to-white">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-gray-900 mb-3">ทัวร์แนะนำ</h2>
            <p className="text-gray-600 text-lg">แพ็กเกจยอดนิยมที่คัดสรรมาเพื่อคุณ</p>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6 -mx-4 px-4">

            {/* Card 1 - Tokyo */}
            <div className="flex-shrink-0 w-[280px] snap-start">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">

                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=450&fit=crop&auto=format"
                    alt="Tokyo"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    ยอดนิยม
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-black text-gray-900 mb-3 leading-tight">
                    ทัวร์โตเกียว 5 วัน
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-semibold">
                      🌸 ซากุระ
                    </span>
                    <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-semibold">
                      🗼 Tower
                    </span>
                    <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-semibold">
                      🏔️ Fuji
                    </span>
                  </div>

                  <div className="mb-5">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-black text-blue-600">
                        ฿25,900
                      </span>
                      <span className="text-base text-gray-400 line-through">
                        ฿32,000
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">ราคาต่อท่าน</p>
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg hover:shadow-xl">
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2 - Paris */}
            <div className="flex-shrink-0 w-[280px] snap-start">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">

                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=450&fit=crop&auto=format"
                    alt="Paris"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    โปรโมชั่น
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-black text-gray-900 mb-3 leading-tight">
                    ทัวร์ปารีส 6 วัน
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-semibold">
                      🗼 Eiffel
                    </span>
                    <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-semibold">
                      🏛️ Louvre
                    </span>
                  </div>

                  <div className="mb-5">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-black text-blue-600">
                        ฿45,900
                      </span>
                      <span className="text-base text-gray-400 line-through">
                        ฿52,000
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">ราคาต่อท่าน</p>
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg hover:shadow-xl">
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3 - London */}
            <div className="flex-shrink-0 w-[280px] snap-start">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">

                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=450&fit=crop&auto=format"
                    alt="London"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    แนะนำ
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-black text-gray-900 mb-3 leading-tight">
                    ทัวร์ลอนดอน 7 วัน
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-semibold">
                      🏰 Big Ben
                    </span>
                    <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-semibold">
                      🌉 Bridge
                    </span>
                  </div>

                  <div className="mb-5">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-black text-blue-600">
                        ฿48,900
                      </span>
                      <span className="text-base text-gray-400 line-through">
                        ฿55,000
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">ราคาต่อท่าน</p>
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg hover:shadow-xl">
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            </div>

            {/* Card 4 - New York */}
            <div className="flex-shrink-0 w-[280px] snap-start">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">

                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=450&fit=crop&auto=format"
                    alt="New York"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-orange-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    ใหม่
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-black text-gray-900 mb-3 leading-tight">
                    ทัวร์นิวยอร์ก 6 วัน
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-semibold">
                      🗽 Liberty
                    </span>
                    <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-semibold">
                      🏙️ Times Sq
                    </span>
                  </div>

                  <div className="mb-5">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-black text-blue-600">
                        ฿52,900
                      </span>
                      <span className="text-base text-gray-400 line-through">
                        ฿60,000
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">ราคาต่อท่าน</p>
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg hover:shadow-xl">
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            </div>

            {/* Card 5 - Bali */}
            <div className="flex-shrink-0 w-[280px] snap-start">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">

                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=450&fit=crop&auto=format"
                    alt="Bali"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-teal-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg" style={{ transform: 'scale(0.7500)', transformOrigin: 'center center' }}>
                    ราคาดี
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-black text-gray-900 mb-3 leading-tight">
                    ทัวร์บาหลี 5 วัน
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-semibold">
                      🏖️ Beach
                    </span>
                    <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-semibold">
                      🛕 Temple
                    </span>
                  </div>

                  <div className="mb-5">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-black text-blue-600">
                        ฿18,900
                      </span>
                      <span className="text-base text-gray-400 line-through">
                        ฿24,000
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">ราคาต่อท่าน</p>
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg hover:shadow-xl">
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">


          {/* Header Section */}
          <div className="text-center mb-6 mt-16 md:mt-24">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              ผลการค้นหาทัวร์
            </h1>
            <p className="text-gray-600 mb-4">ทัวร์ทั้งหมดที่ตรงกับความต้องการของคุณ</p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Card 1 - ลดพิเศษ with Flight Info and Tour Code */}
            <div className="-mx-4 md:mx-0 group cursor-pointer" data-card-id="card-1">
              {/* White background wrapper - full width */}
              <div className="relative bg-gray-50 rounded-none md:rounded-2xl px-4 py-4">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flash-sale-card">

                {/* Full Background Carousel */}
                <div className="absolute inset-0">
                  <div className="carousel-container-1 relative w-full h-full">
                    <img
                      src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop&auto=format&q=100"
                      alt="Japan 1"
                      className="carousel-item-1 absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop&auto=format&q=100"
                      alt="Japan 2"
                      className="carousel-item-1 absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Red Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-stretch">

                      {/* Airline Section */}
                      <div className="flex items-center gap-2 px-2 py-2 border-r border-red-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-red-500 to-rose-600 p-2 rounded-full w-7 h-7 flex items-center justify-center">
                            <svg className="transform rotate-45 scale-150 text-white" fill="currentColor" viewBox="0 0 24 24" style={{width: '32px', height: '32px'}}>
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-0 truncate">Thai Airways</p>
                          <div className="flex items-center -mt-1 gap-0.5">
                            <span className="text-base font-bold mr-1">BKK</span>
                            <div className="w-4 border-t border-dashed border-gray-400"></div>
                            <span className="text-base font-bold ml-1">NRT</span>
                          </div>
                        </div>
                      </div>

                      {/* Date Section */}
                      <div className="px-2 py-2 bg-gradient-to-r from-red-50 to-rose-50 flex flex-col justify-center">
                        <p className="text-sm text-blue-600 font-medium mb-0">ช่วงเดินทาง</p>
                        <p className="text-base font-bold text-red-900 -mt-1 whitespace-nowrap">มี.ค. - พ.ค. 68</p>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Tour Code - Separate Top Right */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-gradient-to-bl from-red-600 to-red-700 text-white px-2 py-1 rounded-bl-xl shadow-md">
                    <p className="font-semibold tracking-wide" style={{fontSize: '10px'}}>TW61529</p>
                  </div>
                </div>

                {/* Main Content - Bottom Focus */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">

                  {/* ลดพิเศษ Badge */}
                  <div className="mb-2">
                    <div className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold inline-block shadow-lg">
                      เหลือ 3 สุดท้าย
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold mb-0 leading-tight drop-shadow-lg" style={{fontSize: '24px'}}>
                    ทัวร์ญี่ปุ่น โอซาก้า โตเกียว 7 วัน 5 คืน
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-1.5 text-base">
                    <div className="flex text-yellow-400 text-base">
                      <span>★★★★</span>
                      <span style={{position: 'relative', display: 'inline-block'}}>
                        <span style={{color: '#d1d5db'}}>★</span>
                        <span style={{position: 'absolute', left: 0, top: 0, width: '80%', overflow: 'hidden', color: '#fbbf24'}}>★</span>
                      </span>
                    </div>
                    <span className="text-base font-medium">4.8 (124 รีวิว)</span>
                  </div>

                  {/* Highlight Text */}
                  <div className="mb-8 text-base leading-relaxed">
                    <p className="drop-shadow-lg font-medium">สัมผัสความมหัศจรรย์ของญี่ปุ่น</p>
                    <p className="drop-shadow-lg font-medium">พร้อมประสบการณ์สุดพิเศษที่ไม่ลืม</p>
                  </div>

                  {/* Price Section */}
                  <div className="gradient-background-red backdrop-blur-sm rounded-lg p-3 relative">
                    {/* Countdown Timer - Clean Design */}
                    <div className="absolute -top-6 left-0 bg-white text-red-600 px-1.5 py-1.5 rounded-r-lg rounded-tl-md text-sm font-bold shadow-md flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{String(countdown1.hours).padStart(2, '0')}:{String(countdown1.minutes).padStart(2, '0')}:{String(countdown1.seconds).padStart(2, '0')}</span>
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold">฿89,900</span>
                          <span className="text-base line-through opacity-70 font-medium">฿119,900</span>
                        </div>
                        <span className="text-white font-bold text-base-horizontal inline-flex items-center justify-center gap-1 group hover:animate-none cursor-pointer drop-shadow-md">
                          <span>โปรโมชั่นพิเศษ</span>
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1-horizontal" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                          </svg>
                        </span>
                      </div>
                      <p className="text-sm opacity-90 font-medium">ประหยัด ฿30,000 | ผ่อน ฿14,983/เดือน</p>
                    </div>
                  </div>

                </div>

                {/* Image Indicators - Right Side */}
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col space-y-2 z-20">
                  {[0, 1].map((index) => (
                    <div
                      key={index}
                      className={`carousel-indicator-1 w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? 'bg-red-500 shadow-lg' : 'bg-white/60'
                      }`}
                    />
                  ))}
                </div>

                </div>

                {/* Premium Highlights Reveal - Expanding Price Box - Full width */}
                {smartPreviewCard === 'card-1' && (
                  <>
                    {/* Subtle overlay to focus attention - positioned over card only */}
                    <div
                      className="absolute inset-4 bg-gradient-to-t from-black/60 via-transparent to-transparent z-30 rounded-xl"
                      style={{ animation: 'fadeIn 0.3s ease-out' }}
                    />

                    {/* Expanding Price Section - Full Width */}
                    <div
                      className="absolute bottom-0 left-0 right-0 z-40"
                      style={{
                        animation: 'expandPrice 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                      }}
                    >
                      <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-t-2xl shadow-2xl">
                        {/* Premium Content Header */}
                        <div className="p-2 text-white">
                          <div className="text-center">
                            <div className="text-lg font-black text-white">
                              สิทธิพิเศษที่คุณจะได้รับ
                            </div>
                          </div>
                        </div>

                        {/* Premium Value Section */}
                        <div
                          className="bg-white/95 backdrop-blur p-2"
                          style={{
                            borderTop: '2px dashed rgba(255,255,255,0.3)',
                          }}
                        >
                          {/* Title */}
                          <div
                            className="text-center mb-3"
                            style={{ animation: 'slideUp 0.4s ease-out 0.3s backwards' }}
                          >
                          </div>

                          {/* Value Items */}
                          <div className="space-y-2.5">
                            <div
                              className="flex items-center gap-2 bg-white rounded-md p-2 border-l-3 border-l-red-500 shadow-sm"
                              style={{ animation: 'slideInRight 0.4s ease-out 0.4s backwards' }}
                            >
                              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <span className="text-base">🏨</span>
                              </div>
                              <div className="flex-1">
                                <p className="text-base font-semibold text-gray-800">โรงแรม 5 ดาว</p>
                                <p className="text-sm text-gray-600">ทุกคืนตลอดทริป</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-green-600 font-bold">✓ รวมแล้ว</p>
                                <p className="text-sm text-gray-500">มูลค่า ฿25,000</p>
                              </div>
                            </div>

                            <div
                              className="flex items-center gap-2 bg-white rounded-md p-2 border-l-3 border-l-red-500 shadow-sm"
                              style={{ animation: 'slideInRight 0.4s ease-out 0.5s backwards' }}
                            >
                              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <span className="text-base">🦀</span>
                              </div>
                              <div className="flex-1">
                                <p className="text-base font-semibold text-gray-800">บุฟเฟ่ต์ขาปูยักษ์</p>
                                <p className="text-sm text-gray-600">ฮอกไกโดแท้</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-green-600 font-bold">✓ รวมแล้ว</p>
                                <p className="text-sm text-gray-500">มูลค่า ฿3,500</p>
                              </div>
                            </div>

                            <div
                              className="flex items-center gap-2 bg-white rounded-md p-2 border-l-3 border-l-red-500 shadow-sm"
                              style={{ animation: 'slideInRight 0.4s ease-out 0.6s backwards' }}
                            >
                              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <span className="text-base">👥</span>
                              </div>
                              <div className="flex-1">
                                <p className="text-base font-semibold text-gray-800">กรุ๊ปเล็ก VIP</p>
                                <p className="text-sm text-gray-600">ไม่เกิน 15 ท่าน</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-purple-600 font-bold">★ พิเศษ</p>
                                <p className="text-sm text-gray-500">ไกด์ส่วนตัว</p>
                              </div>
                            </div>
                          </div>

                          {/* Call to Action */}
                          <div
                            className="text-center"
                            style={{ animation: 'pulse 2s infinite', animationDelay: '0.8s' }}
                          >
                            <button
                              onClick={() => setSmartPreviewCard(null)}
                              className="text-xs text-gray-600 hover:text-gray-800 font-medium underline"
                            >
                              ซ่อนข้อมูล
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Card 2 - ทัวร์พรีเมี่ยม with Flight Info and Tour Code */}
            <div className="-mx-4 md:mx-0 group cursor-pointer" data-card-id="card-2">
              <div className="relative bg-gray-50 rounded-none md:rounded-2xl px-4 py-4 overflow-hidden">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">

                {/* Single Background Image */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&h=600&fit=crop&auto=format&q=100"
                    alt="Hokkaido"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    style={{
                      imageRendering: 'pixelated',
                      imageRendering: '-webkit-optimize-contrast',
                      imageRendering: '-moz-crisp-edges',
                      imageRendering: 'crisp-edges',
                      filter: 'contrast(1.3) saturate(1.2) brightness(1.05) blur(0px) sharpen(2px)',
                      transform: 'scale(1.002)',
                      WebkitBackfaceVisibility: 'hidden',
                      backfaceVisibility: 'hidden',
                      WebkitPerspective: 1000,
                      perspective: 1000,
                      willChange: 'transform'
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Blue Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-stretch">

                      {/* Airline Section */}
                      <div className="flex items-center gap-2 px-2 py-2 border-r border-blue-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-full w-7 h-7 flex items-center justify-center">
                            <svg className="transform rotate-45 scale-150 text-white" fill="currentColor" viewBox="0 0 24 24" style={{width: '32px', height: '32px'}}>
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-0 truncate">Thai Airways</p>
                          <div className="flex items-center -mt-1 gap-0.5">
                            <span className="text-base font-bold mr-1">BKK</span>
                            <div className="w-4 border-t border-dashed border-gray-400"></div>
                            <span className="text-base font-bold ml-1">NRT</span>
                          </div>
                        </div>
                      </div>

                      {/* Date Section */}
                      <div className="px-2 py-2 bg-gradient-to-r from-blue-50 to-blue-50 flex flex-col justify-center">
                        <p className="text-sm text-blue-600 font-medium mb-0">ช่วงเดินทาง</p>
                        <p className="text-base font-bold text-blue-900 -mt-1 whitespace-nowrap">ก.ย. - พ.ย. 68</p>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Tour Code - Separate Top Right */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-gradient-to-bl from-blue-600 to-blue-700 text-white px-2 py-1 rounded-bl-xl shadow-md">
                    <p className="font-semibold tracking-wide" style={{fontSize: '10px'}}>TW62841</p>
                  </div>
                </div>

                {/* Main Content - Bottom Focus */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">

                  {/* Premium Badge */}
                  <div className="mb-2">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold inline-block shadow-lg">
                      ทัวร์พรีเมี่ยม
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold mb-0 leading-tight drop-shadow-lg" style={{fontSize: '24px'}}>
                    ทัวร์ญี่ปุ่น ฮอกไกโด 7 วัน 5 คืน
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-1.5 text-base">
                    <div className="flex text-yellow-400 text-base">
                      <span>★★★</span>
                      <span style={{position: 'relative', display: 'inline-block'}}>
                        <span style={{color: '#d1d5db'}}>★</span>
                        <span style={{position: 'absolute', left: 0, top: 0, width: '50%', overflow: 'hidden', color: '#fbbf24'}}>★</span>
                      </span>
                      <span style={{color: '#d1d5db'}}>★</span>
                    </div>
                    <span className="text-base font-medium">3.5 (89 รีวิว)</span>
                  </div>

                  {/* Highlight Text */}
                  <div className="mb-4 text-base leading-relaxed">
                    <p className="drop-shadow-lg font-medium">สัมผัสความมหัศจรรย์ของฮอกไกโด</p>
                    <p className="drop-shadow-lg font-medium">พร้อมประสบการณ์สุดพิเศษที่ไม่ลืม</p>
                  </div>

                  {/* Price Section */}
                  <div className="gradient-background-blue backdrop-blur-sm rounded-lg p-3">
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold">฿78,900</span>
                          <span className="text-base line-through opacity-70 font-medium">฿98,900</span>
                        </div>
                        <span className="text-white font-bold text-base-horizontal inline-flex items-center justify-center gap-1 group hover:animate-none cursor-pointer drop-shadow-md">
                          <span>จองตอนนี้</span>
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1-horizontal" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                          </svg>
                        </span>
                      </div>
                      <p className="text-sm opacity-90 font-medium">ประหยัด ฿20,000 | ผ่อน ฿13,150/เดือน</p>
                    </div>
                  </div>

                </div>

                </div>

                {/* Smart Preview for Card 2 - Blue Theme Promotional */}
                {smartPreviewCard2 === 'card-2' && (
                  <>
                    {/* Subtle overlay to focus attention */}
                    <div
                      className="absolute inset-4 bg-gradient-to-t from-black/60 via-transparent to-transparent z-30 rounded-xl"
                      style={{
                        animation: closingCard2
                          ? 'fadeOut 0.3s ease-out forwards'
                          : 'fadeIn 0.3s ease-out'
                      }}
                    />

                    {/* Expanding Promotional Section */}
                    <div
                      className="absolute bottom-0 left-0 right-0 z-40"
                      style={{
                        animation: closingCard2
                          ? 'contractPrice 0.4s ease-in-out forwards'
                          : 'expandPrice 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                      }}
                    >
                      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl shadow-2xl border-t-4 border-blue-700">
                        {/* Clean Content */}
                        <div className="bg-white/95 backdrop-blur p-3 rounded-t-2xl">

                          {/* Price Focus */}
                          <div className="flex items-start gap-3 mb-2 pb-2 border-b border-gray-200">
                            <div className="relative mt-1">
                              {/* Badge with ribbon effect */}
                              <div className="relative">
                                {/* Glowing border effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-lg blur-sm opacity-60 transform -rotate-2"></div>

                                {/* Main badge */}
                                <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 text-white text-sm font-black px-3 py-1.5 rounded-lg shadow-lg relative overflow-hidden transform -rotate-2">
                                {/* Shiny overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12"></div>

                                {/* Badge content */}
                                <div className="relative z-10 flex items-center gap-1">
                                  <span className="text-yellow-300 text-xs">💎</span>
                                  <span>-20%</span>
                                  <span className="text-yellow-300 text-xs">💎</span>
                                </div>

                                {/* Corner decorations */}
                                <div className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-yellow-400 rounded-full opacity-80"></div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-yellow-400 rounded-full opacity-80 animate-ping"></div>
                                </div>
                              </div>

                              {/* Simple shadow effect */}
                              <div className="absolute -bottom-1 left-2 right-2 h-1 bg-blue-700/30 rounded-full blur-sm"></div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-baseline gap-2">
                                <span className="text-xl font-bold text-blue-600">฿78,900</span>
                                <span className="text-base line-through opacity-70 font-medium text-gray-400">฿98,900</span>
                              </div>
                              <p className="text-xs text-green-600 font-bold">ราคาพิเศษ VIP Member</p>
                              <p className="text-xs text-blue-600 font-bold">ทัวร์พรีเมี่ยม คุณภาพระดับโลก</p>
                            </div>
                          </div>

                          {/* Key Benefits */}
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-base">🏨</span>
                              <span className="text-sm font-bold text-gray-700">โรงแรม 5 ดาวทุกคืน ทำเล Premium</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-base">👨‍🍳</span>
                              <span className="text-sm font-bold text-gray-700">อาหาร Kaiseki + ปูยักษ์ฮอกไกโด</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-base">🎯</span>
                              <span className="text-sm font-bold text-gray-700">ไกด์ท้องถิ่นมืออาชีพ พูดไทยได้</span>
                            </div>
                            <div className="flex items-center gap-2 bg-blue-50 p-1 rounded">
                              <span className="text-base">⭐</span>
                              <span className="text-xs font-bold text-blue-700">รีวิว 4.8/5 ดาว จากลูกค้า VIP 500+ ท่าน</span>
                            </div>
                          </div>

                          {/* CTA Buttons */}
                          <div className="flex items-center justify-between mt-2 gap-2">
                            <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black py-2.5 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-sm shadow-lg group">
                              <span className="animate-bounce-horizontal inline-flex items-center justify-center gap-1 group-hover:animate-none drop-shadow-md">
                                <span>สำรองที่นั่ง VIP</span>
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1-horizontal" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                                </svg>
                              </span>
                            </button>
                            <div className="h-8 w-px bg-gray-300"></div>
                            <button
                              onClick={() => closeSmartPreviewCard2(true)}
                              className="text-xs text-gray-400 hover:text-gray-600 underline px-2 py-1 hover:bg-gray-50 rounded transition-colors whitespace-nowrap"
                            >
                              ดูต่อภายหลัง
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

              </div>
            </div>

            {/* Card 3 - Singapore ลดพิเศษ */}
            <div className="-mx-4 md:mx-0 group cursor-pointer" data-card-id="card-3">
              <div className="relative bg-gray-50 rounded-none md:rounded-2xl px-4 py-4">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flash-sale-card">

                {/* Single Background Image */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop&auto=format&q=100"
                    alt="Singapore"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    style={{
                      imageRendering: 'pixelated',
                      imageRendering: '-webkit-optimize-contrast',
                      imageRendering: '-moz-crisp-edges',
                      imageRendering: 'crisp-edges',
                      filter: 'contrast(1.3) saturate(1.2) brightness(1.05) blur(0px) sharpen(2px)',
                      transform: 'scale(1.002)',
                      WebkitBackfaceVisibility: 'hidden',
                      backfaceVisibility: 'hidden',
                      WebkitPerspective: 1000,
                      perspective: 1000,
                      willChange: 'transform'
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Red Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-stretch">

                      {/* Airline Section */}
                      <div className="flex items-center gap-2 px-2 py-2 border-r border-red-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-red-500 to-rose-600 p-2 rounded-full w-7 h-7 flex items-center justify-center">
                            <svg className="transform rotate-45 scale-150 text-white" fill="currentColor" viewBox="0 0 24 24" style={{width: '32px', height: '32px'}}>
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-0 truncate">Singapore Airlines</p>
                          <div className="flex items-center -mt-1 gap-0.5">
                            <span className="text-base font-bold mr-1">BKK</span>
                            <div className="w-4 border-t border-dashed border-gray-400"></div>
                            <span className="text-base font-bold ml-1">SIN</span>
                          </div>
                        </div>
                      </div>

                      {/* Date Section */}
                      <div className="px-2 py-2 bg-gradient-to-r from-red-50 to-rose-50 flex flex-col justify-center">
                        <p className="text-sm text-blue-600 font-medium mb-0">ช่วงเดินทาง</p>
                        <p className="text-base font-bold text-red-900 -mt-1 whitespace-nowrap">ธ.ค. - ก.พ. 68</p>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Tour Code - Separate Top Right */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-gradient-to-bl from-red-600 to-red-700 text-white px-2 py-1 rounded-bl-xl shadow-md">
                    <p className="font-semibold tracking-wide" style={{fontSize: '10px'}}>TW63254</p>
                  </div>
                </div>

                {/* Main Content - Bottom Focus */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">

                  {/* ลดพิเศษ Badge */}
                  <div className="mb-2">
                    <div className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold inline-block shadow-lg">
                      ดีลสุดคุ้ม
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold mb-0 leading-tight drop-shadow-lg" style={{fontSize: '24px'}}>
                    ทัวร์สิงคโปร์ 4 วัน 3 คืน
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-1.5 text-base">
                    <div className="flex text-yellow-400 text-base">
                      <span>★★★★</span>
                      <span style={{position: 'relative', display: 'inline-block'}}>
                        <span style={{color: '#d1d5db'}}>★</span>
                        <span style={{position: 'absolute', left: 0, top: 0, width: '60%', overflow: 'hidden', color: '#fbbf24'}}>★</span>
                      </span>
                    </div>
                    <span className="text-base font-medium">4.6 (156 รีวิว)</span>
                  </div>

                  {/* Highlight Text */}
                  <div className="mb-8 text-base leading-relaxed">
                    <p className="drop-shadow-lg font-medium">สัมผัสเสน่ห์เมืองสิงคโปร์</p>
                    <p className="drop-shadow-lg font-medium">ช้อปปิ้งและสถานที่ท่องเที่ยวระดับโลก</p>
                  </div>

                  {/* Price Section */}
                  <div className="gradient-background-red backdrop-blur-sm rounded-lg p-3 relative">
                    {/* Countdown Timer - Clean Design */}
                    <div className="absolute -top-6 left-0 bg-white text-red-600 px-1.5 py-1.5 rounded-r-lg rounded-tl-md text-sm font-bold shadow-md flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{String(countdown2.hours).padStart(2, '0')}:{String(countdown2.minutes).padStart(2, '0')}:{String(countdown2.seconds).padStart(2, '0')}</span>
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold">฿32,900</span>
                          <span className="text-base line-through opacity-70 font-medium">฿45,900</span>
                        </div>
                        <span className="text-white font-bold text-base-horizontal inline-flex items-center justify-center gap-1 group hover:animate-none cursor-pointer drop-shadow-md">
                          <span>โปรโมชั่นพิเศษ</span>
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1-horizontal" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                          </svg>
                        </span>
                      </div>
                      <p className="text-sm opacity-90 font-medium">ประหยัด ฿13,000 | ผ่อน ฿5,483/เดือน</p>
                    </div>
                  </div>

                </div>

                {/* Smart Preview for Card 3 - Red Promotional Hard Sale */}
                {smartPreviewCard3 === 'card-3' && (
                  <>
                    {/* Subtle overlay to focus attention */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-30"
                      style={{ animation: 'fadeIn 0.3s ease-out' }}
                    />

                    {/* Expanding Promotional Section */}
                    <div
                      className="absolute bottom-0 left-0 right-0 z-40"
                      style={{
                        animation: closingCard3
                          ? 'contractPrice 0.4s ease-in-out forwards'
                          : 'expandPrice 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                      }}
                    >
                      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-t-2xl shadow-2xl border-t-4 border-red-700">
                        {/* Clean Content */}
                        <div className="bg-white/95 backdrop-blur p-3 rounded-t-2xl">

                          {/* Price Focus */}
                          <div className="flex items-start gap-3 mb-2 pb-2 border-b border-gray-200">
                            <div className="relative mt-1">
                              {/* Badge with ribbon effect */}
                              <div className="relative">
                                {/* Glowing border effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-lg blur-sm opacity-60 transform -rotate-2"></div>

                                {/* Main badge */}
                                <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white text-sm font-black px-3 py-1.5 rounded-lg shadow-lg relative overflow-hidden transform -rotate-2">
                                {/* Shiny overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12"></div>

                                {/* Badge content */}
                                <div className="relative z-10 flex items-center gap-1">
                                  <span className="text-yellow-300 text-xs">🔥</span>
                                  <span>-28%</span>
                                  <span className="text-yellow-300 text-xs">🔥</span>
                                </div>

                                {/* Corner decorations */}
                                <div className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-yellow-400 rounded-full opacity-80"></div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-yellow-400 rounded-full opacity-80 animate-ping"></div>
                                </div>
                              </div>

                              {/* Simple shadow effect */}
                              <div className="absolute -bottom-1 left-2 right-2 h-1 bg-red-700/30 rounded-full blur-sm"></div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-baseline gap-2">
                                <span className="text-xl font-bold text-red-600">฿32,900</span>
                                <span className="text-base line-through opacity-70 font-medium text-gray-400">฿45,900</span>
                              </div>
                              <p className="text-xs text-green-600 font-bold">ประหยัด ฿13,000 ทันที!</p>
                              <p className="text-xs text-red-600 font-bold">
                                ราคานี้เหลือเวลาเพียง {String(countdown2.hours).padStart(2, '0')}:{String(countdown2.minutes).padStart(2, '0')}:{String(countdown2.seconds).padStart(2, '0')}
                              </p>
                            </div>
                          </div>

                          {/* Key Benefits - More Compelling */}
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-base">💳</span>
                              <span className="text-sm font-bold text-gray-700">ผ่อน 0% ฿2,741 x 12 เดือน</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-base">🎁</span>
                              <span className="text-sm font-bold text-gray-700">ฟรี! ยูนิเวอร์แซล+ซิม มูลค่า ฿5,000</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-base">🔒</span>
                              <span className="text-sm font-bold text-gray-700">จองแล้วล็อคราคา ไม่มีค่าใช้จ่ายเพิ่ม</span>
                            </div>
                            <div className="flex items-center gap-2 bg-yellow-50 p-1 rounded">
                              <span className="text-base">👀</span>
                              <span className="text-xs font-bold text-orange-700 relative">
                                มีลูกค้าอีก
                                <span className="relative inline-block mx-1">
                                  {viewerCount}
                                  {/* +X Animation */}
                                  {viewerIncrement > 0 && (
                                    <span className={`absolute -top-2 -right-1 text-green-600 font-black text-xs transition-all duration-800 ${viewerCountAnimate ? 'animate-bounce opacity-100 scale-100' : 'opacity-0 scale-75 transform translate-y-1'}`}>
                                      +{viewerIncrement}
                                    </span>
                                  )}
                                </span>
                                คนกำลังดูทัวร์นี้
                              </span>
                            </div>
                          </div>

                          {/* CTA Button Row */}
                          <div className="flex items-center justify-between mt-2 gap-2">
                            <button className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 text-white font-black py-2.5 rounded-lg hover:from-red-700 hover:to-orange-700 transition-all text-sm shadow-lg group">
                              <span className="animate-bounce-horizontal inline-flex items-center justify-center gap-1 group-hover:animate-none drop-shadow-md">
                                <span>จองด่วน! คลิกเลย</span>
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1-horizontal" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                                </svg>
                              </span>
                            </button>
                            <div className="h-8 w-px bg-gray-300"></div>
                            <button
                              onClick={() => closeSmartPreviewCard3(true)}
                              className="text-xs text-gray-400 hover:text-gray-600 underline px-2 py-1 hover:bg-gray-50 rounded transition-colors whitespace-nowrap"
                            >
                              ดูต่อภายหลัง
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                </div>
              </div>
            </div>



            {/* Card 4 - Kazakhstan (Copy of Card 2) */}
            <div className="-mx-4 md:mx-0 group cursor-pointer">
              <div className="relative bg-gray-50 rounded-none md:rounded-2xl px-4 py-4">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">

                {/* Video Background Only */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=600&fit=crop&auto=format&q=100"
                    alt="Kazakhstan"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Blue Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-stretch">

                      {/* Airline Section */}
                      <div className="flex items-center gap-2 px-2 py-2 border-r border-blue-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-full w-7 h-7 flex items-center justify-center">
                            <svg className="transform rotate-45 scale-150 text-white" fill="currentColor" viewBox="0 0 24 24" style={{width: '32px', height: '32px'}}>
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-0 truncate">Air Astana</p>
                          <div className="flex items-center -mt-1 gap-0.5">
                            <span className="text-base font-bold mr-1">BKK</span>
                            <div className="w-4 border-t border-dashed border-gray-400"></div>
                            <span className="text-base font-bold ml-1">ALA</span>
                          </div>
                        </div>
                      </div>

                      {/* Date Section */}
                      <div className="px-2 py-2 bg-gradient-to-r from-blue-50 to-blue-50 flex flex-col justify-center">
                        <p className="text-sm text-blue-600 font-medium mb-0">ช่วงเดินทาง</p>
                        <p className="text-base font-bold text-blue-900 -mt-1 whitespace-nowrap">มี.ค. - พ.ค. 68</p>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Tour Code - Separate Top Right */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-gradient-to-bl from-blue-600 to-blue-700 text-white px-2 py-1 rounded-bl-xl shadow-md">
                    <p className="font-semibold tracking-wide" style={{fontSize: '10px'}}>TW84172</p>
                  </div>
                </div>

                {/* Main Content - Bottom Focus */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">

                  {/* Premium Badge */}
                  <div className="mb-2">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold inline-block shadow-lg">
                      ทัวร์ผจญภัย
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold mb-0 leading-tight drop-shadow-lg" style={{fontSize: '24px'}}>
                    ทัวร์คาซัคสถาน อัลมาตี 8 วัน 6 คืน
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-1.5 text-base">
                    <div className="flex text-yellow-400 text-base">
                      <span>★★★★</span>
                      <span style={{position: 'relative', display: 'inline-block'}}>
                        <span style={{color: '#d1d5db'}}>★</span>
                        <span style={{position: 'absolute', left: 0, top: 0, width: '30%', overflow: 'hidden', color: '#fbbf24'}}>★</span>
                      </span>
                    </div>
                    <span className="text-base font-medium">4.3 (47 รีวิว)</span>
                  </div>

                  {/* Highlight Text */}
                  <div className="mb-4 text-base leading-relaxed">
                    <p className="drop-shadow-lg font-medium">สัมผัสความมหัศจรรย์ของคาซัคสถาน</p>
                    <p className="drop-shadow-lg font-medium">พร้อมประสบการณ์สุดพิเศษที่ไม่ลืม</p>
                  </div>

                  {/* Price Section */}
                  <div className="gradient-background-blue backdrop-blur-sm rounded-lg p-3">
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold">฿89,900</span>
                          <span className="text-base line-through opacity-70 font-medium">฿109,900</span>
                        </div>
                        <span className="text-white font-bold text-base-horizontal inline-flex items-center justify-center gap-1 group hover:animate-none cursor-pointer drop-shadow-md">
                          <span>จองตอนนี้</span>
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1-horizontal" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                          </svg>
                        </span>
                      </div>
                      <p className="text-sm opacity-90 font-medium">ประหยัด ฿20,000 | ผ่อน ฿14,983/เดือน</p>
                    </div>
                  </div>

                </div>

                </div>
              </div>
            </div>

            {/* Card 5 - Philippines (ลดพิเศษ) */}
            <div className="-mx-4 md:mx-0 group cursor-pointer" data-card-id="card-5">
              <div className="relative bg-gray-50 rounded-none md:rounded-2xl px-4 py-4">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flash-sale-card">
                {/* Single Background Image */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop&auto=format&q=100"
                    alt="Philippines"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Red Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-stretch">
                      <div className="flex items-center gap-2 px-2 py-2 border-r border-red-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-red-500 to-rose-600 p-2 rounded-full w-7 h-7 flex items-center justify-center">
                            <svg className="transform rotate-45 scale-150 text-white" fill="currentColor" viewBox="0 0 24 24" style={{width: '32px', height: '32px'}}>
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-0 truncate">Philippine Airlines</p>
                          <div className="flex items-center -mt-1 gap-0.5">
                            <span className="text-base font-bold mr-1">BKK</span>
                            <div className="w-4 border-t border-dashed border-gray-400"></div>
                            <span className="text-base font-bold ml-1">MNL</span>
                          </div>
                        </div>
                      </div>
                      <div className="px-2 py-2 bg-gradient-to-r from-red-50 to-rose-50 flex flex-col justify-center">
                        <p className="text-sm text-blue-600 font-medium mb-0">ช่วงเดินทาง</p>
                        <p className="text-base font-bold text-red-900 -mt-1 whitespace-nowrap">เม.ย. - มิ.ย. 68</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tour Code */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-gradient-to-bl from-red-600 to-red-700 text-white px-2 py-1 rounded-bl-xl shadow-md">
                    <p className="font-semibold tracking-wide" style={{fontSize: '10px'}}>TW85231</p>
                  </div>
                </div>

                {/* Main Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                  <div className="mb-2">
                    <div className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold inline-block shadow-lg">
                      โปรโมชั่นพิเศษ
                    </div>
                  </div>
                  <h3 className="font-bold mb-0 leading-tight drop-shadow-lg" style={{fontSize: '24px'}}>
                    ทัวร์ฟิลิปปินส์ โบราเคย์ 5 วัน 4 คืน
                  </h3>
                  <div className="flex items-center gap-2 mb-1.5 text-base">
                    <div className="flex text-yellow-400 text-base">
                      <span>★★★★</span>
                      <span style={{position: 'relative', display: 'inline-block'}}>
                        <span style={{color: '#d1d5db'}}>★</span>
                        <span style={{position: 'absolute', left: 0, top: 0, width: '90%', overflow: 'hidden', color: '#fbbf24'}}>★</span>
                      </span>
                    </div>
                    <span className="text-base font-medium">4.9 (203 รีวิว)</span>
                  </div>
                  <div className="mb-8 text-base leading-relaxed">
                    <p className="drop-shadow-lg font-medium">หาดทรายขาวที่สวยที่สุด</p>
                    <p className="drop-shadow-lg font-medium">ดำน้ำตื้นชมปะการัง</p>
                  </div>
                  <div className="gradient-background-red backdrop-blur-sm rounded-lg p-3 relative">
                    {/* Countdown Timer - Clean Design */}
                    <div className="absolute -top-6 left-0 bg-white text-red-600 px-1.5 py-1.5 rounded-r-lg rounded-tl-md text-sm font-bold shadow-md flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{String(countdown5.hours).padStart(2, '0')}:{String(countdown5.minutes).padStart(2, '0')}:{String(countdown5.seconds).padStart(2, '0')}</span>
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold">฿24,900</span>
                          <span className="text-base line-through opacity-70 font-medium">฿34,900</span>
                        </div>
                        <span className="text-white font-bold text-base-horizontal inline-flex items-center justify-center gap-1 group hover:animate-none cursor-pointer drop-shadow-md">
                          <span>โปรโมชั่นพิเศษ</span>
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1-horizontal" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                          </svg>
                        </span>
                      </div>
                      <p className="text-sm opacity-90 font-medium">ประหยัด ฿10,000 | ผ่อน ฿4,150/เดือน</p>
                    </div>
                  </div>
                </div>

                {/* Smart Preview for Card 5 - Flash Sale Beach Paradise */}
                {smartPreviewCard5 === 'card-5' && (
                  <>
                    {/* Subtle overlay to focus attention */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-30"
                      style={{ animation: 'fadeIn 0.3s ease-out' }}
                    />

                    {/* Expanding Promotional Section */}
                    <div
                      className="absolute bottom-0 left-0 right-0 z-40"
                      style={{
                        animation: closingCard5
                          ? 'contractPrice 0.4s ease-in-out forwards'
                          : 'expandPrice 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                      }}
                    >
                      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-t-2xl shadow-2xl border-t-4 border-red-700">
                        {/* Clean Content */}
                        <div className="bg-white/95 backdrop-blur p-3 rounded-t-2xl">

                          {/* Price Focus */}
                          <div className="flex items-start gap-3 mb-2 pb-2 border-b border-gray-200">
                            <div className="relative mt-1">
                              {/* Badge with ribbon effect */}
                              <div className="relative">
                                {/* Glowing border effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-orange-400 to-red-400 rounded-lg blur-sm opacity-60 transform -rotate-2"></div>

                                {/* Main badge */}
                                <div className="bg-gradient-to-r from-red-500 via-orange-600 to-red-500 text-white text-sm font-black px-3 py-1.5 rounded-lg shadow-lg relative overflow-hidden transform -rotate-2">
                                  {/* Shiny overlay */}
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12"></div>

                                  {/* Badge content */}
                                  <div className="relative z-10 flex items-center gap-1">
                                    <span className="text-white text-xs">🔥</span>
                                    <span>-29%</span>
                                    <span className="text-white text-xs">🔥</span>
                                  </div>

                                  {/* Corner decorations */}
                                  <div className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-white rounded-full opacity-80"></div>
                                  <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-white rounded-full opacity-80 animate-ping"></div>
                                </div>
                              </div>

                              {/* Simple shadow effect */}
                              <div className="absolute -bottom-1 left-2 right-2 h-1 bg-red-700/30 rounded-full blur-sm"></div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-baseline gap-2">
                                <span className="text-xl font-bold text-red-600">฿24,900</span>
                                <span className="text-base line-through opacity-70 font-medium text-gray-400">฿34,900</span>
                              </div>
                              <p className="text-xs text-green-600 font-bold">ประหยัด ฿10,000 ทันที!</p>
                              <p className="text-xs text-red-600 font-bold">
                                ราคานี้เหลือเวลาเพียง {String(countdown5.hours).padStart(2, '0')}:{String(countdown5.minutes).padStart(2, '0')}:{String(countdown5.seconds).padStart(2, '0')}
                              </p>
                            </div>
                          </div>

                          {/* Key Benefits - More Compelling */}
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-base">💳</span>
                              <span className="text-sm font-bold text-gray-700">ผ่อน 0% ฿2,075 x 12 เดือน</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-base">🎁</span>
                              <span className="text-sm font-bold text-gray-700">ฟรี! ซิม+อุปกรณ์ทะเล มูลค่า ฿3,000</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-base">🏖️</span>
                              <span className="text-sm font-bold text-gray-700">หาดทรายขาว + ดำน้ำชมปะการัง</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-base">🔒</span>
                              <span className="text-sm font-bold text-gray-700">จองแล้วล็อคราคา ไม่มีค่าใช้จ่ายเพิ่ม</span>
                            </div>
                          </div>

                          {/* CTA Button Row */}
                          <div className="flex items-center justify-between mt-2 gap-2">
                            <button className="flex-1 gradient-background-red text-white font-black py-2.5 rounded-lg transition-all text-sm shadow-lg group">
                              <span className="animate-bounce-horizontal inline-flex items-center justify-center gap-1 group-hover:animate-none drop-shadow-md">
                                <span>จองด่วน! โปรสุดคุ้ม</span>
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1-horizontal" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                                </svg>
                              </span>
                            </button>
                            <div className="h-8 w-px bg-gray-300"></div>
                            <button
                              onClick={() => closeSmartPreviewCard5(true)}
                              className="text-xs text-gray-400 hover:text-gray-600 underline px-2 py-1 hover:bg-gray-50 rounded transition-colors whitespace-nowrap"
                            >
                              ดูต่อภายหลัง
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                </div>
              </div>
            </div>

            {/* Card 6 - Laos (ทัวร์พรีเมี่ยม) */}
            <div className="-mx-4 md:mx-0 group cursor-pointer">
              <div className="relative bg-gray-50 rounded-none md:rounded-2xl px-4 py-4">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                {/* Single Background Image */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=600&fit=crop&auto=format&q=100"
                    alt="Laos"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Blue Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-stretch">
                      <div className="flex items-center gap-2 px-2 py-2 border-r border-blue-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-full w-7 h-7 flex items-center justify-center">
                            <svg className="transform rotate-45 scale-150 text-white" fill="currentColor" viewBox="0 0 24 24" style={{width: '32px', height: '32px'}}>
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-0 truncate">Lao Airlines</p>
                          <div className="flex items-center -mt-1 gap-0.5">
                            <span className="text-base font-bold mr-1">BKK</span>
                            <div className="w-4 border-t border-dashed border-gray-400"></div>
                            <span className="text-base font-bold ml-1">VTE</span>
                          </div>
                        </div>
                      </div>
                      <div className="px-2 py-2 bg-gradient-to-r from-blue-50 to-blue-50 flex flex-col justify-center">
                        <p className="text-sm text-blue-600 font-medium mb-0">ช่วงเดินทาง</p>
                        <p className="text-base font-bold text-blue-900 -mt-1 whitespace-nowrap">ต.ค. - ธ.ค. 68</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tour Code */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-gradient-to-bl from-blue-600 to-blue-700 text-white px-2 py-1 rounded-bl-xl shadow-md">
                    <p className="font-semibold tracking-wide" style={{fontSize: '10px'}}>TW86342</p>
                  </div>
                </div>

                {/* Main Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                  <div className="mb-2">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold inline-block shadow-lg">
                      ทัวร์พรีเมี่ยม
                    </div>
                  </div>
                  <h3 className="font-bold mb-0 leading-tight drop-shadow-lg" style={{fontSize: '24px'}}>
                    ทัวร์ลาว หลวงพระบาง เวียงจันทน์ 4 วัน 3 คืน
                  </h3>
                  <div className="flex items-center gap-2 mb-1.5 text-base">
                    <div className="flex text-yellow-400 text-base">
                      <span>★★★★</span>
                      <span style={{position: 'relative', display: 'inline-block'}}>
                        <span style={{color: '#d1d5db'}}>★</span>
                        <span style={{position: 'absolute', left: 0, top: 0, width: '50%', overflow: 'hidden', color: '#fbbf24'}}>★</span>
                      </span>
                    </div>
                    <span className="text-base font-medium">4.5 (89 รีวิว)</span>
                  </div>
                  <div className="mb-4 text-base leading-relaxed">
                    <p className="drop-shadow-lg font-medium">มรดกโลกหลวงพระบาง</p>
                    <p className="drop-shadow-lg font-medium">ตักบาตรข้าวเหนียว</p>
                  </div>
                  <div className="gradient-background-blue backdrop-blur-sm rounded-lg p-3">
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold">฿15,900</span>
                          <span className="text-base line-through opacity-70 font-medium">฿19,900</span>
                        </div>
                        <span className="text-white font-bold text-base-horizontal inline-flex items-center justify-center gap-1 group hover:animate-none cursor-pointer drop-shadow-md">
                          <span>จองตอนนี้</span>
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1-horizontal" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                          </svg>
                        </span>
                      </div>
                      <p className="text-sm opacity-90 font-medium">ประหยัด ฿4,000 | ผ่อน ฿2,650/เดือน</p>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>

            {/* Card 7 - Cambodia (ลดพิเศษ) */}
            <div className="-mx-4 md:mx-0 group cursor-pointer">
              <div className="relative bg-gray-50 rounded-none md:rounded-2xl px-4 py-4">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flash-sale-card">
                {/* Single Background Image */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop&auto=format&q=100"
                    alt="Cambodia"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Red Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-stretch">
                      <div className="flex items-center gap-2 px-2 py-2 border-r border-red-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-red-500 to-rose-600 p-2 rounded-full w-7 h-7 flex items-center justify-center">
                            <svg className="transform rotate-45 scale-150 text-white" fill="currentColor" viewBox="0 0 24 24" style={{width: '32px', height: '32px'}}>
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-0 truncate">Bangkok Airways</p>
                          <div className="flex items-center -mt-1 gap-0.5">
                            <span className="text-base font-bold mr-1">BKK</span>
                            <div className="w-4 border-t border-dashed border-gray-400"></div>
                            <span className="text-base font-bold ml-1">REP</span>
                          </div>
                        </div>
                      </div>
                      <div className="px-2 py-2 bg-gradient-to-r from-red-50 to-rose-50 flex flex-col justify-center">
                        <p className="text-sm text-blue-600 font-medium mb-0">ช่วงเดินทาง</p>
                        <p className="text-base font-bold text-red-900 -mt-1 whitespace-nowrap">ม.ค. - มี.ค. 68</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tour Code */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-gradient-to-bl from-red-600 to-red-700 text-white px-2 py-1 rounded-bl-xl shadow-md">
                    <p className="font-semibold tracking-wide" style={{fontSize: '10px'}}>TW87453</p>
                  </div>
                </div>

                {/* Main Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                  <div className="mb-2">
                    <div className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold inline-block shadow-lg">
                      จองด่วน!
                    </div>
                  </div>
                  <h3 className="font-bold mb-0 leading-tight drop-shadow-lg" style={{fontSize: '24px'}}>
                    ทัวร์กัมพูชา นครวัด นครธม 3 วัน 2 คืน
                  </h3>
                  <div className="flex items-center gap-2 mb-1.5 text-base">
                    <div className="flex text-yellow-400 text-base">
                      <span>★★★★</span>
                      <span style={{position: 'relative', display: 'inline-block'}}>
                        <span style={{color: '#d1d5db'}}>★</span>
                        <span style={{position: 'absolute', left: 0, top: 0, width: '70%', overflow: 'hidden', color: '#fbbf24'}}>★</span>
                      </span>
                    </div>
                    <span className="text-base font-medium">4.7 (156 รีวิว)</span>
                  </div>
                  <div className="mb-8 text-base leading-relaxed">
                    <p className="drop-shadow-lg font-medium">มรดกโลกปราสาทนครวัด</p>
                    <p className="drop-shadow-lg font-medium">เมืองโบราณนครธม</p>
                  </div>
                  <div className="gradient-background-red backdrop-blur-sm rounded-lg p-3 relative">
                    {/* Countdown Timer - Clean Design */}
                    <div className="absolute -top-6 left-0 bg-white text-red-600 px-1.5 py-1.5 rounded-r-lg rounded-tl-md text-sm font-bold shadow-md flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{String(countdown7.hours).padStart(2, '0')}:{String(countdown7.minutes).padStart(2, '0')}:{String(countdown7.seconds).padStart(2, '0')}</span>
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold">฿9,900</span>
                          <span className="text-base line-through opacity-70 font-medium">฿14,900</span>
                        </div>
                        <span className="text-white font-bold text-base-horizontal inline-flex items-center justify-center gap-1 group hover:animate-none cursor-pointer drop-shadow-md">
                          <span>โปรโมชั่นพิเศษ</span>
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1-horizontal" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                          </svg>
                        </span>
                      </div>
                      <p className="text-sm opacity-90 font-medium">ประหยัด ฿5,000 | ผ่อน ฿1,650/เดือน</p>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>

            {/* Card 8 - Hong Kong (ทัวร์พรีเมี่ยม) */}
            <div className="-mx-4 md:mx-0 group cursor-pointer">
              <div className="relative bg-gray-50 rounded-none md:rounded-2xl px-4 py-4">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                {/* Single Background Image */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=800&h=600&fit=crop&auto=format&q=100"
                    alt="Hong Kong"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Blue Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-stretch">
                      <div className="flex items-center gap-2 px-2 py-2 border-r border-blue-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-full w-7 h-7 flex items-center justify-center">
                            <svg className="transform rotate-45 scale-150 text-white" fill="currentColor" viewBox="0 0 24 24" style={{width: '32px', height: '32px'}}>
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-0 truncate">Cathay Pacific</p>
                          <div className="flex items-center -mt-1 gap-0.5">
                            <span className="text-base font-bold mr-1">BKK</span>
                            <div className="w-4 border-t border-dashed border-gray-400"></div>
                            <span className="text-base font-bold ml-1">HKG</span>
                          </div>
                        </div>
                      </div>
                      <div className="px-2 py-2 bg-gradient-to-r from-blue-50 to-blue-50 flex flex-col justify-center">
                        <p className="text-sm text-blue-600 font-medium mb-0">ช่วงเดินทาง</p>
                        <p className="text-base font-bold text-blue-900 -mt-1 whitespace-nowrap">พ.ย. - ม.ค. 68</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tour Code */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-gradient-to-bl from-blue-600 to-blue-700 text-white px-2 py-1 rounded-bl-xl shadow-md">
                    <p className="font-semibold tracking-wide" style={{fontSize: '10px'}}>TW88564</p>
                  </div>
                </div>

                {/* Main Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                  <div className="mb-2">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold inline-block shadow-lg">
                      ทัวร์หรู
                    </div>
                  </div>
                  <h3 className="font-bold mb-0 leading-tight drop-shadow-lg" style={{fontSize: '24px'}}>
                    ทัวร์ฮ่องกง ดิสนีย์แลนด์ 4 วัน 3 คืน
                  </h3>
                  <div className="flex items-center gap-2 mb-1.5 text-base">
                    <div className="flex text-yellow-400 text-base">
                      <span>★★★★</span>
                      <span style={{position: 'relative', display: 'inline-block'}}>
                        <span style={{color: '#d1d5db'}}>★</span>
                        <span style={{position: 'absolute', left: 0, top: 0, width: '80%', overflow: 'hidden', color: '#fbbf24'}}>★</span>
                      </span>
                    </div>
                    <span className="text-base font-medium">4.8 (234 รีวิว)</span>
                  </div>
                  <div className="mb-4 text-base leading-relaxed">
                    <p className="drop-shadow-lg font-medium">ดิสนีย์แลนด์เต็มวัน</p>
                    <p className="drop-shadow-lg font-medium">นั่งกระเช้านองปิง</p>
                  </div>
                  <div className="gradient-background-blue backdrop-blur-sm rounded-lg p-3">
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold">฿42,900</span>
                          <span className="text-base line-through opacity-70 font-medium">฿52,900</span>
                        </div>
                        <span className="text-white font-bold text-base-horizontal inline-flex items-center justify-center gap-1 group hover:animate-none cursor-pointer drop-shadow-md">
                          <span>จองตอนนี้</span>
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1-horizontal" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                          </svg>
                        </span>
                      </div>
                      <p className="text-sm opacity-90 font-medium">ประหยัด ฿10,000 | ผ่อน ฿7,150/เดือน</p>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>

            {/* Card 9 - Indonesia (ลดพิเศษ) */}
            <div className="-mx-4 md:mx-0 group cursor-pointer">
              <div className="relative bg-gray-50 rounded-none md:rounded-2xl px-4 py-4">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flash-sale-card">
                {/* Single Background Image */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop&auto=format&q=100"
                    alt="Indonesia"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Red Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-stretch">
                      <div className="flex items-center gap-2 px-2 py-2 border-r border-red-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-red-500 to-rose-600 p-2 rounded-full w-7 h-7 flex items-center justify-center">
                            <svg className="transform rotate-45 scale-150 text-white" fill="currentColor" viewBox="0 0 24 24" style={{width: '32px', height: '32px'}}>
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-0 truncate">Garuda Indonesia</p>
                          <div className="flex items-center -mt-1 gap-0.5">
                            <span className="text-base font-bold mr-1">BKK</span>
                            <div className="w-4 border-t border-dashed border-gray-400"></div>
                            <span className="text-base font-bold ml-1">CGK</span>
                          </div>
                        </div>
                      </div>
                      <div className="px-2 py-2 bg-gradient-to-r from-red-50 to-rose-50 flex flex-col justify-center">
                        <p className="text-sm text-blue-600 font-medium mb-0">ช่วงเดินทาง</p>
                        <p className="text-base font-bold text-red-900 -mt-1 whitespace-nowrap">ก.ค. - ก.ย. 68</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tour Code */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-gradient-to-bl from-red-600 to-red-700 text-white px-2 py-1 rounded-bl-xl shadow-md">
                    <p className="font-semibold tracking-wide" style={{fontSize: '10px'}}>TW89675</p>
                  </div>
                </div>

                {/* Main Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                  <div className="mb-2">
                    <div className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold inline-block shadow-lg">
                      ดีลร้อนแรง
                    </div>
                  </div>
                  <h3 className="font-bold mb-0 leading-tight drop-shadow-lg" style={{fontSize: '24px'}}>
                    ทัวร์บาหลี อินโดนีเซีย 5 วัน 4 คืน
                  </h3>
                  <div className="flex items-center gap-2 mb-1.5 text-base">
                    <div className="flex text-yellow-400 text-base">
                      <span>★★★★</span>
                      <span style={{position: 'relative', display: 'inline-block'}}>
                        <span style={{color: '#d1d5db'}}>★</span>
                        <span style={{position: 'absolute', left: 0, top: 0, width: '90%', overflow: 'hidden', color: '#fbbf24'}}>★</span>
                      </span>
                    </div>
                    <span className="text-base font-medium">4.9 (312 รีวิว)</span>
                  </div>
                  <div className="mb-8 text-base leading-relaxed">
                    <p className="drop-shadow-lg font-medium">เกาะสวรรค์บาหลี</p>
                    <p className="drop-shadow-lg font-medium">วัดเบซากีห์ นาข้าวขั้นบันได</p>
                  </div>
                  <div className="gradient-background-red backdrop-blur-sm rounded-lg p-3 relative">
                    {/* Countdown Timer - Clean Design */}
                    <div className="absolute -top-6 left-0 bg-white text-red-600 px-1.5 py-1.5 rounded-r-lg rounded-tl-md text-sm font-bold shadow-md flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{String(countdown9.hours).padStart(2, '0')}:{String(countdown9.minutes).padStart(2, '0')}:{String(countdown9.seconds).padStart(2, '0')}</span>
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold">฿28,900</span>
                          <span className="text-base line-through opacity-70 font-medium">฿38,900</span>
                        </div>
                        <span className="text-white font-bold text-base-horizontal inline-flex items-center justify-center gap-1 group hover:animate-none cursor-pointer drop-shadow-md">
                          <span>โปรโมชั่นพิเศษ</span>
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1-horizontal" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                          </svg>
                        </span>
                      </div>
                      <p className="text-sm opacity-90 font-medium">ประหยัด ฿10,000 | ผ่อน ฿4,817/เดือน</p>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>

            {/* Card 10 - Malaysia (ทัวร์พรีเมี่ยม) */}
            <div className="-mx-4 md:mx-0 group cursor-pointer">
              <div className="relative bg-gray-50 rounded-none md:rounded-2xl px-4 py-4">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                {/* Single Background Image */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&h=600&fit=crop&auto=format&q=100"
                    alt="Malaysia"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Blue Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-stretch">
                      <div className="flex items-center gap-2 px-2 py-2 border-r border-blue-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-full w-7 h-7 flex items-center justify-center">
                            <svg className="transform rotate-45 scale-150 text-white" fill="currentColor" viewBox="0 0 24 24" style={{width: '32px', height: '32px'}}>
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-0 truncate">Malaysia Airlines</p>
                          <div className="flex items-center -mt-1 gap-0.5">
                            <span className="text-base font-bold mr-1">BKK</span>
                            <div className="w-4 border-t border-dashed border-gray-400"></div>
                            <span className="text-base font-bold ml-1">KUL</span>
                          </div>
                        </div>
                      </div>
                      <div className="px-2 py-2 bg-gradient-to-r from-blue-50 to-blue-50 flex flex-col justify-center">
                        <p className="text-sm text-blue-600 font-medium mb-0">ช่วงเดินทาง</p>
                        <p className="text-base font-bold text-blue-900 -mt-1 whitespace-nowrap">มิ.ย. - ส.ค. 68</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tour Code */}

                {/* Main Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                  <div className="mb-2">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold inline-block shadow-lg">
                      ทัวร์ครอบครัว
                    </div>
                  </div>
                  <h3 className="font-bold mb-0 leading-tight drop-shadow-lg" style={{fontSize: '24px'}}>
                    ทัวร์มาเลเซีย กัวลาลัมเปอร์ 4 วัน 3 คืน
                  </h3>
                  <div className="flex items-center gap-2 mb-1.5 text-base">
                    <div className="flex text-yellow-400 text-base">
                      <span>★★★★</span>
                      <span style={{position: 'relative', display: 'inline-block'}}>
                        <span style={{color: '#d1d5db'}}>★</span>
                        <span style={{position: 'absolute', left: 0, top: 0, width: '60%', overflow: 'hidden', color: '#fbbf24'}}>★</span>
                      </span>
                    </div>
                    <span className="text-base font-medium">4.6 (178 รีวิว)</span>
                  </div>
                  <div className="mb-4 text-base leading-relaxed">
                    <p className="drop-shadow-lg font-medium">เก็นติ้งไฮแลนด์</p>
                    <p className="drop-shadow-lg font-medium">ถ้ำบาตู ปุตราจายา</p>
                  </div>
                  <div className="gradient-background-blue backdrop-blur-sm rounded-lg p-3">
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold">฿18,900</span>
                          <span className="text-base line-through opacity-70 font-medium">฿24,900</span>
                        </div>
                        <span className="text-white font-bold text-base-horizontal inline-flex items-center justify-center gap-1 group hover:animate-none cursor-pointer drop-shadow-md">
                          <span>จองตอนนี้</span>
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1-horizontal" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                          </svg>
                        </span>
                      </div>
                      <p className="text-sm opacity-90 font-medium">ประหยัด ฿6,000 | ผ่อน ฿3,150/เดือน</p>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>

            {/* Card 11 - South Korea (ลดพิเศษ) */}
            <div className="-mx-4 md:mx-0 group cursor-pointer">
              <div className="relative bg-gray-50 rounded-none md:rounded-2xl px-4 py-4">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flash-sale-card">
                {/* Single Background Image */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&h=600&fit=crop&auto=format&q=100"
                    alt="South Korea"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Red Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-stretch">
                      <div className="flex items-center gap-2 px-2 py-2 border-r border-red-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-red-500 to-rose-600 p-2 rounded-full w-7 h-7 flex items-center justify-center">
                            <svg className="transform rotate-45 scale-150 text-white" fill="currentColor" viewBox="0 0 24 24" style={{width: '32px', height: '32px'}}>
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-0 truncate">Korean Air</p>
                          <div className="flex items-center -mt-1 gap-0.5">
                            <span className="text-base font-bold mr-1">BKK</span>
                            <div className="w-4 border-t border-dashed border-gray-400"></div>
                            <span className="text-base font-bold ml-1">ICN</span>
                          </div>
                        </div>
                      </div>
                      <div className="px-2 py-2 bg-gradient-to-r from-red-50 to-rose-50 flex flex-col justify-center">
                        <p className="text-sm text-blue-600 font-medium mb-0">ช่วงเดินทาง</p>
                        <p className="text-base font-bold text-red-900 -mt-1 whitespace-nowrap">ต.ค. - ธ.ค. 68</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tour Code */}

                {/* Main Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                  <div className="mb-2">
                    <div className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold inline-block shadow-lg">
                      โปรโมชั่นหมดวันนี้!
                    </div>
                  </div>
                  <h3 className="font-bold mb-0 leading-tight drop-shadow-lg" style={{fontSize: '24px'}}>
                    ทัวร์เกาหลี โซล ปูซาน 6 วัน 4 คืน
                  </h3>
                  <div className="flex items-center gap-2 mb-1.5 text-base">
                    <div className="flex text-yellow-400 text-base">★★★★★</div>
                    <span className="text-base font-medium">5.0 (425 รีวิว)</span>
                  </div>
                  <div className="mb-8 text-base leading-relaxed">
                    <p className="drop-shadow-lg font-medium">ชมใบไม้เปลี่ยนสี</p>
                    <p className="drop-shadow-lg font-medium">สวนสนุกเอเวอร์แลนด์</p>
                  </div>
                  <div className="gradient-background-red backdrop-blur-sm rounded-lg p-3 relative">
                    {/* Countdown Timer - Clean Design */}
                    <div className="absolute -top-6 left-0 bg-white text-red-600 px-1.5 py-1.5 rounded-r-lg rounded-tl-md text-sm font-bold shadow-md flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{String(countdown11.hours).padStart(2, '0')}:{String(countdown11.minutes).padStart(2, '0')}:{String(countdown11.seconds).padStart(2, '0')}</span>
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold">฿35,900</span>
                          <span className="text-base line-through opacity-70 font-medium">฿45,900</span>
                        </div>
                        <span className="text-white font-bold text-base-horizontal inline-flex items-center justify-center gap-1 group hover:animate-none cursor-pointer drop-shadow-md">
                          <span>โปรโมชั่นพิเศษ</span>
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1-horizontal" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                          </svg>
                        </span>
                      </div>
                      <p className="text-sm opacity-90 font-medium">ประหยัด ฿10,000 | ผ่อน ฿5,983/เดือน</p>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>

            {/* Card 12 - Taiwan (ทัวร์พรีเมี่ยม) */}
            <div className="-mx-4 md:mx-0 group cursor-pointer">
              <div className="relative bg-gray-50 rounded-none md:rounded-2xl px-4 py-4">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                {/* Single Background Image */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=800&h=600&fit=crop&auto=format&q=100"
                    alt="Taiwan"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Blue Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-stretch">
                      <div className="flex items-center gap-2 px-2 py-2 border-r border-blue-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-full w-7 h-7 flex items-center justify-center">
                            <svg className="transform rotate-45 scale-150 text-white" fill="currentColor" viewBox="0 0 24 24" style={{width: '32px', height: '32px'}}>
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-0 truncate">EVA Air</p>
                          <div className="flex items-center -mt-1 gap-0.5">
                            <span className="text-base font-bold mr-1">BKK</span>
                            <div className="w-4 border-t border-dashed border-gray-400"></div>
                            <span className="text-base font-bold ml-1">TPE</span>
                          </div>
                        </div>
                      </div>
                      <div className="px-2 py-2 bg-gradient-to-r from-blue-50 to-blue-50 flex flex-col justify-center">
                        <p className="text-sm text-blue-600 font-medium mb-0">ช่วงเดินทาง</p>
                        <p className="text-base font-bold text-blue-900 -mt-1 whitespace-nowrap">เม.ย. - มิ.ย. 68</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tour Code */}

                {/* Main Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                  <div className="mb-2">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold inline-block shadow-lg">
                      ขายดี
                    </div>
                  </div>
                  <h3 className="font-bold mb-0 leading-tight drop-shadow-lg" style={{fontSize: '24px'}}>
                    ทัวร์ไต้หวัน ไทเป อาลีซาน 5 วัน 3 คืน
                  </h3>
                  <div className="flex items-center gap-2 mb-1.5 text-base">
                    <div className="flex text-yellow-400 text-base">
                      <span>★★★★</span>
                      <span style={{position: 'relative', display: 'inline-block'}}>
                        <span style={{color: '#d1d5db'}}>★</span>
                        <span style={{position: 'absolute', left: 0, top: 0, width: '70%', overflow: 'hidden', color: '#fbbf24'}}>★</span>
                      </span>
                    </div>
                    <span className="text-base font-medium">4.7 (298 รีวิว)</span>
                  </div>
                  <div className="mb-4 text-base leading-relaxed">
                    <p className="drop-shadow-lg font-medium">ตึกไทเป 101</p>
                    <p className="drop-shadow-lg font-medium">หมู่บ้านจิ่วเฟิน</p>
                  </div>
                  <div className="gradient-background-blue backdrop-blur-sm rounded-lg p-3">
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold">฿25,900</span>
                          <span className="text-base line-through opacity-70 font-medium">฿32,900</span>
                        </div>
                        <span className="text-white font-bold text-base-horizontal inline-flex items-center justify-center gap-1 group hover:animate-none cursor-pointer drop-shadow-md">
                          <span>จองตอนนี้</span>
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1-horizontal" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                          </svg>
                        </span>
                      </div>
                      <p className="text-sm opacity-90 font-medium">ประหยัด ฿7,000 | ผ่อน ฿4,317/เดือน</p>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>

            {/* Card 13 - Europe Tour */}
            <div className="-mx-4 md:mx-0 group cursor-pointer">
              <div className="relative bg-gray-50 rounded-none md:rounded-2xl px-4 py-4">
              <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flash-sale-card">

                {/* Single Background Image */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1508189860359-777d945909ef?ixlib=rb-4.0.3&w=800&h=600&fit=crop&auto=format"
                    alt="Rome Colosseum"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Red Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-stretch">

                      {/* Airline Section */}
                      <div className="flex items-center gap-2 px-2 py-2 border-r border-red-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-red-500 to-rose-600 p-2 rounded-full w-7 h-7 flex items-center justify-center">
                            <svg className="transform rotate-45 scale-150 text-white" fill="currentColor" viewBox="0 0 24 24" style={{width: '32px', height: '32px'}}>
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-0 truncate">Qatar Airways</p>
                          <div className="flex items-center -mt-1 gap-0.5">
                            <span className="text-base font-bold mr-1">BKK</span>
                            <div className="w-4 border-t border-dashed border-gray-400"></div>
                            <div className="w-2 h-2 border border-gray-500 rounded-full"></div>
                            <div className="w-4 border-t border-dashed border-gray-400"></div>
                            <span className="text-base font-bold ml-1">CDG</span>
                          </div>
                        </div>
                      </div>

                      {/* Date Section */}
                      <div className="px-2 py-2 bg-gradient-to-r from-red-50 to-rose-50 flex flex-col justify-center">
                        <p className="text-sm text-blue-600 font-medium mb-0">ช่วงเดินทาง</p>
                        <p className="text-base font-bold text-red-900 -mt-1 whitespace-nowrap">มิ.ย. - ส.ค. 68</p>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Tour Code - Separate Top Right */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-gradient-to-bl from-red-600 to-red-700 text-white px-2 py-1 rounded-bl-xl shadow-md">
                    <p className="font-semibold tracking-wide" style={{fontSize: '10px'}}>TW93519</p>
                  </div>
                </div>

                {/* Main Content - Bottom Focus */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">

                  {/* ลดพิเศษ Badge */}
                  <div className="mb-2">
                    <div className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold inline-block shadow-lg">
                      เหลือ 2 สุดท้าย
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold mb-0 leading-tight drop-shadow-lg" style={{fontSize: '24px'}}>
                    ทัวร์ยุโรป ฝรั่งเศส อิตาลี สวิส 10 วัน 7 คืน
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-1.5 text-base">
                    <div className="flex text-yellow-400 text-base">
                      <span>★★★★★</span>
                    </div>
                    <span className="text-base font-medium">5.0 (89 รีวิว)</span>
                  </div>

                  {/* Highlight Text */}
                  <div className="mb-8 text-base leading-relaxed">
                    <p className="drop-shadow-lg font-medium">สัมผัสความโรแมนติกของยุโรป</p>
                    <p className="drop-shadow-lg font-medium">หอไอเฟล อัลป์สวิส เวนิส</p>
                  </div>

                  {/* Price Section */}
                  <div className="gradient-background-red backdrop-blur-sm rounded-lg p-3 relative">
                    {/* Countdown Timer - Clean Design */}
                    <div className="absolute -top-6 left-0 bg-white text-red-600 px-1.5 py-1.5 rounded-r-lg rounded-tl-md text-sm font-bold shadow-md flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{String(countdown11.hours).padStart(2, '0')}:{String(countdown11.minutes).padStart(2, '0')}:{String(countdown11.seconds).padStart(2, '0')}</span>
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold">฿189,900</span>
                          <span className="text-base line-through opacity-70 font-medium">฿239,900</span>
                        </div>
                        <span className="text-white font-bold text-base-horizontal inline-flex items-center justify-center gap-1 group hover:animate-none cursor-pointer drop-shadow-md">
                          <span>โปรโมชั่นพิเศษ</span>
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1-horizontal" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                          </svg>
                        </span>
                      </div>
                      <p className="text-sm opacity-90 font-medium">ประหยัด ฿50,000 | ผ่อน ฿31,650/เดือน</p>
                    </div>
                  </div>

                </div>

                </div>
              </div>
            </div>

            {/* Card 14 - Australia Tour (2 Stops) */}
            <div className="-mx-4 md:mx-0 group cursor-pointer">
              <div className="relative bg-gray-50 rounded-none md:rounded-2xl px-4 py-4">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flash-sale-card">

                {/* Single Background Image */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&w=800&h=600&fit=crop&auto=format"
                    alt="Sydney Opera House"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Blue Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-stretch">

                      {/* Airline Section */}
                      <div className="flex items-center gap-2 px-2 py-2 border-r border-red-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-red-500 to-rose-600 p-2 rounded-full w-7 h-7 flex items-center justify-center">
                            <svg className="transform rotate-45 scale-150 text-white" fill="currentColor" viewBox="0 0 24 24" style={{width: '32px', height: '32px'}}>
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-0 truncate">Emirates</p>
                          <div className="flex items-center -mt-1 gap-0.5">
                            <span className="text-base font-bold mr-1">BKK</span>
                            <div className="w-3 border-t border-dashed border-gray-400"></div>
                            <div className="w-2 h-2 border border-gray-500 rounded-full"></div>
                            <div className="w-2 border-t border-dashed border-gray-400"></div>
                            <div className="w-2 h-2 border border-gray-500 rounded-full"></div>
                            <div className="w-3 border-t border-dashed border-gray-400"></div>
                            <span className="text-base font-bold ml-1">SYD</span>
                          </div>
                        </div>
                      </div>

                      {/* Date Section */}
                      <div className="px-2 py-2 bg-gradient-to-r from-red-50 to-rose-50 flex flex-col justify-center">
                        <p className="text-sm text-blue-600 font-medium mb-0">ช่วงเดินทาง</p>
                        <p className="text-base font-bold text-red-900 -mt-1 whitespace-nowrap">ก.ย. - พ.ย. 68</p>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Tour Code - Separate Top Right */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-gradient-to-bl from-red-600 to-red-700 text-white px-2 py-1 rounded-bl-xl shadow-md">
                    <p className="font-semibold tracking-wide" style={{fontSize: '10px'}}>TW94620</p>
                  </div>
                </div>

                {/* Main Content - Bottom Focus */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">

                  {/* ลดพิเศษ Badge */}
                  <div className="mb-2">
                    <div className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold inline-block shadow-lg">
                      เหลือ 1 สุดท้าย
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold mb-0 leading-tight drop-shadow-lg" style={{fontSize: '24px'}}>
                    ทัวร์ออสเตรเลีย ซิดนีย์ เมลเบิร์น 8 วัน 6 คืน
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-1.5 text-base">
                    <div className="flex text-yellow-400 text-base">
                      <span>★★★★</span>
                      <span style={{position: 'relative', display: 'inline-block'}}>
                        <span style={{color: '#d1d5db'}}>★</span>
                        <span style={{position: 'absolute', left: 0, top: 0, width: '60%', overflow: 'hidden', color: '#fbbf24'}}>★</span>
                      </span>
                    </div>
                    <span className="text-base font-medium">4.6 (76 รีวิว)</span>
                  </div>

                  {/* Highlight Text */}
                  <div className="mb-8 text-base leading-relaxed">
                    <p className="drop-shadow-lg font-medium">สัมผัสทวีปใต้อันแสนงาม</p>
                    <p className="drop-shadow-lg font-medium">โอเปร่าเฮาส์ เกรทโอเชียนโร้ด</p>
                  </div>

                  {/* Price Section */}
                  <div className="gradient-background-red backdrop-blur-sm rounded-lg p-3 relative">
                    {/* Countdown Timer - Clean Design */}
                    <div className="absolute -top-6 left-0 bg-white text-red-600 px-1.5 py-1.5 rounded-r-lg rounded-tl-md text-sm font-bold shadow-md flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{String(countdown14.hours).padStart(2, '0')}:{String(countdown14.minutes).padStart(2, '0')}:{String(countdown14.seconds).padStart(2, '0')}</span>
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold">฿159,900</span>
                          <span className="text-base line-through opacity-70 font-medium">฿199,900</span>
                        </div>
                        <span className="text-white font-bold text-base-horizontal inline-flex items-center justify-center gap-1 group hover:animate-none cursor-pointer drop-shadow-md">
                          <span>โปรโมชั่นพิเศษ</span>
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1-horizontal" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                          </svg>
                        </span>
                      </div>
                      <p className="text-sm opacity-90 font-medium">ประหยัด ฿40,000 | ผ่อน ฿26,650/เดือน</p>
                    </div>
                  </div>

                </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

export default TourSearch64