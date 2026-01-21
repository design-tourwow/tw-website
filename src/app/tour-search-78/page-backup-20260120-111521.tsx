'use client'

export const dynamic = 'force-dynamic'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Search, Filter, X, MapPin, Calendar, Star, TrendingUp,
  ChevronDown, ArrowUp, MessageCircle, Phone, Sparkles,
  Users, Clock, Gift, Zap, Globe, Heart
} from 'lucide-react'

const TourSearch64 = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentImageKorea, setCurrentImageKorea] = useState(0)
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
  const [isNavigating, setIsNavigating] = useState(false)
  const heroScrollRef = useRef<HTMLDivElement>(null)
  const hero1ScrollRef = useRef<HTMLDivElement>(null)

  const HERO_CARDS_COUNT = 2 // จำนวนการ์ดจริงของแต่ละ Hero Banner

  // Tour slug mapping for redirect to detail page
  const tourSlugMap: Record<string, string> = {
    'TW61529': 'newyork-usa',      // ทัวร์นิวยอร์ก (Template 1: Mobile First, Continuous Scroll)
    'TW62841': 'tokyo-japan',      // ทัวร์โตเกียว (Template 2: Desktop First Tabs - Blue Theme)
    'TW63254': 'singapore',        // ทัวร์สิงคโปร์ (Template 3: ...)
    'TW84172': 'switzerland',      // ทัวร์สวิตเซอร์แลนด์ (ยังไม่มีหน้า detail)
    'TW85231': 'philippines',      // ทัวร์ฟิลิปปินส์ (ยังไม่มีหน้า detail)
    'TW86342': 'laos',             // ทัวร์ลาว (ยังไม่มีหน้า detail)
    'TW87453': 'vietnam',          // ทัวร์เวียดนาม (ยังไม่มีหน้า detail)
    'TW88564': 'korea',            // ทัวร์เกาหลี (ยังไม่มีหน้า detail)
    'TW89675': 'bali',             // ทัวร์บาหลี (ยังไม่มีหน้า detail)
    'TW93519': 'malaysia',         // ทัวร์มาเลเซีย (ยังไม่มีหน้า detail)
    'TW94620': 'maldives',         // ทัวร์มัลดีฟส์ (ยังไม่มีหน้า detail)
    // เพิ่ม mapping ทัวร์อื่นๆ ตามต้องการ
  }

  // Function to handle tour card click and redirect to detail page
  const handleTourClick = (tourCode: string) => {
    const slug = tourSlugMap[tourCode]
    if (slug) {
      setIsNavigating(true)
      router.push(`/tour-search-74/${slug}`)
    } else {
      // Fallback: ถ้าไม่มี slug ให้ redirect ไปหน้าแรก
      console.warn(`No slug found for tour code: ${tourCode}`)
      alert('ขออภัย ไม่พบข้อมูลทัวร์นี้')
    }
  }

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

  // Auto carousel for Korea Card - 3 images rotating every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageKorea((prev) => (prev + 1) % 3) // 3 images
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [])

  // Update Korea carousel visibility
  useEffect(() => {
    const carouselItems = document.querySelectorAll('.carousel-item-korea')

    carouselItems.forEach((item, index) => {
      if (index === currentImageKorea) {
        item.classList.remove('opacity-0')
        item.classList.add('opacity-100')
      } else {
        item.classList.remove('opacity-100')
        item.classList.add('opacity-0')
      }
    })
  }, [currentImageKorea])

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
      <main className="container mx-auto py-4">

        {/* Vector Background Demo Section - NEW */}
        <div className="w-full bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Kanit, sans-serif' }}>
              Vector Background Demo
            </h2>

            {/* Cards Container */}
            <div className="flex lg:grid lg:grid-cols-3 gap-6 md:gap-7 overflow-x-auto lg:overflow-visible pb-6 snap-x lg:snap-none scrollbar-hide">

              {/* Card 1 - Luxury Minimalist (ธีมขาว-ทอง สไตล์หรูหรา) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-3xl overflow-hidden bg-white">
                  {/* Image Section - Top 60% */}
                  <div className="relative h-[60%] overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80"
                      alt="ทัวร์ญี่ปุ่น โตเกียว"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Minimal Badge */}
                    <div className="absolute top-6 right-6">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, #B8860B 0%, #FFD700 100%)',
                          boxShadow: '0 8px 32px rgba(184, 134, 11, 0.4)'
                        }}
                      >
                        <p
                          className="text-xs font-bold text-white"
                          style={{ fontFamily: 'Kanit, sans-serif' }}
                        >
                          -40%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content Section - Bottom 40% */}
                  <div className="h-[40%] p-6 flex flex-col justify-between">
                    <div>
                      <h3
                        className="text-2xl font-bold mb-2"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#1F2937',
                          letterSpacing: '-0.01em'
                        }}
                      >
                        ทัวร์ญี่ปุ่น
                      </h3>
                      <p
                        className="text-sm mb-3"
                        style={{
                          fontFamily: 'Sarabun, sans-serif',
                          color: '#6B7280'
                        }}
                      >
                        โตเกียว - ฟูจิ - ฮาโกเน่ • 5 วัน 3 คืน
                      </p>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <p
                          className="text-xs line-through mb-1"
                          style={{
                            fontFamily: 'Sarabun, sans-serif',
                            color: '#9CA3AF'
                          }}
                        >
                          52,999.-
                        </p>
                        <h1
                          className="text-4xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(135deg, #B8860B 0%, #FFD700 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                          }}
                        >
                          31,999
                        </h1>
                      </div>
                      <button
                        className="px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-105"
                        style={{
                          background: 'linear-gradient(135deg, #B8860B 0%, #FFD700 100%)',
                          color: '#FFFFFF',
                          fontFamily: 'Kanit, sans-serif',
                          boxShadow: '0 4px 16px rgba(184, 134, 11, 0.3)'
                        }}
                      >
                        จองเลย
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [1]
                  </span>
                </div>
              </div>

              {/* Card 2 - Explosive Sale (ธีมแดงสด เร้าใจ มีพลัง) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&q=80"
                    alt="ทัวร์ญี่ปุ่น โตเกียว"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Very Light Red Gradient Overlay - เห็นรูปชัดมาก */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(220, 38, 38, 0.65) 0%, rgba(239, 68, 68, 0.35) 30%, rgba(248, 113, 113, 0.1) 60%, transparent 100%)'
                    }}
                  />

                  {/* Pulsing Flash Sale Badge */}
                  <div className="absolute top-6 left-6">
                    <div
                      className="relative px-6 py-3 rounded-lg transform -rotate-6"
                      style={{
                        background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
                        boxShadow: '0 0 30px rgba(251, 191, 36, 0.8), 0 8px 20px rgba(0, 0, 0, 0.4)',
                        animation: 'pulse 2s ease-in-out infinite'
                      }}
                    >
                      <p
                        className="text-lg font-black"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#DC2626',
                          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
                        }}
                      >
                        ⚡ FLASH SALE
                      </p>
                    </div>
                  </div>

                  {/* Exciting Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    {/* Big Discount Badge */}
                    <div className="mb-4">
                      <div
                        className="inline-block px-5 py-2 rounded-full"
                        style={{
                          background: 'rgba(0, 0, 0, 0.4)',
                          backdropFilter: 'blur(10px)',
                          border: '2px solid rgba(255, 255, 255, 0.5)'
                        }}
                      >
                        <p
                          className="text-sm font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047'
                          }}
                        >
                          🔥 ลดสูงสุด 15,000 บาท!
                        </p>
                      </div>
                    </div>

                    <h3
                      className="text-5xl font-black mb-2"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '3px 3px 10px rgba(0, 0, 0, 0.8)',
                        lineHeight: 1.1
                      }}
                    >
                      ทัวร์ญี่ปุ่น
                    </h3>

                    <p
                      className="text-lg font-bold mb-4"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FEF3C7',
                        textShadow: '2px 2px 6px rgba(0, 0, 0, 0.6)'
                      }}
                    >
                      โตเกียว-โอซาก้า-เกียวโต 6 วัน 4 คืน
                    </p>

                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <p
                          className="text-base line-through mb-1 font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FCA5A5'
                          }}
                        >
                          ราคาเต็ม 49,999.-
                        </p>
                        <div className="flex items-baseline gap-2">
                          <h1
                            className="text-6xl font-black"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FDE047',
                              textShadow: '4px 4px 12px rgba(0, 0, 0, 0.9)',
                              letterSpacing: '-0.02em'
                            }}
                          >
                            34,999
                          </h1>
                          <span
                            className="text-2xl font-bold"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FEF3C7'
                            }}
                          >
                            บาท
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      className="w-full py-4 rounded-xl font-black text-lg transition-all hover:scale-105 relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #FCD34D 0%, #FBBF24 100%)',
                        color: '#DC2626',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 8px 30px rgba(251, 191, 36, 0.6)',
                        animation: 'buttonPulse 2s ease-in-out infinite'
                      }}
                    >
                      🎉 จองด่วน! เหลือที่นั่งน้อย
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [2]
                  </span>
                </div>
              </div>

              {/* Card 3 - Premium Red Accent (ธีมแดงหรูหรา ดูพรีเมียม แต่เร้าใจ) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-3xl overflow-hidden bg-white shadow-2xl">
                  {/* Image Section - Top 60% */}
                  <div className="relative h-[60%] overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&q=80"
                      alt="ทัวร์ญี่ปุ่น โอซาก้า"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Premium Red Corner Tag */}
                    <div className="absolute top-0 right-0">
                      <div
                        className="pl-6 pr-4 pt-4 pb-6"
                        style={{
                          background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)',
                          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20% 100%)',
                          boxShadow: '0 8px 24px rgba(220, 38, 38, 0.4)'
                        }}
                      >
                        <p
                          className="text-xs font-bold text-white mb-0.5"
                          style={{ fontFamily: 'Kanit, sans-serif' }}
                        >
                          ลดพิเศษ
                        </p>
                        <p
                          className="text-2xl font-black text-white leading-none"
                          style={{ fontFamily: 'Kanit, sans-serif' }}
                        >
                          45%
                        </p>
                      </div>
                    </div>

                    {/* Small Flash Sale Badge */}
                    <div className="absolute bottom-4 left-4">
                      <div
                        className="px-4 py-2 rounded-lg"
                        style={{
                          background: 'rgba(0, 0, 0, 0.75)',
                          backdropFilter: 'blur(10px)'
                        }}
                      >
                        <p
                          className="text-xs font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FBBF24'
                          }}
                        >
                          ⚡ Flash Sale วันนี้!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content Section - Bottom 40% */}
                  <div className="h-[40%] p-6 flex flex-col justify-between relative">
                    <div>
                      <h3
                        className="text-2xl font-bold mb-2"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#1F2937'
                        }}
                      >
                        ทัวร์ญี่ปุ่น
                      </h3>
                      <p
                        className="text-sm mb-3"
                        style={{
                          fontFamily: 'Sarabun, sans-serif',
                          color: '#6B7280'
                        }}
                      >
                        โอซาก้า - เกียวโต - นารา • 6 วัน 4 คืน
                      </p>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <p
                          className="text-xs line-through mb-1"
                          style={{
                            fontFamily: 'Sarabun, sans-serif',
                            color: '#9CA3AF'
                          }}
                        >
                          55,999.-
                        </p>
                        <h1
                          className="text-4xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#DC2626'
                          }}
                        >
                          29,999
                        </h1>
                      </div>
                      <button
                        className="px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-105"
                        style={{
                          background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)',
                          color: '#FFFFFF',
                          fontFamily: 'Kanit, sans-serif',
                          boxShadow: '0 6px 20px rgba(220, 38, 38, 0.35)'
                        }}
                      >
                        จองเลย
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [3]
                  </span>
                </div>
              </div>

              {/* Card 4 - Clean Minimal Design (ธีมแดง-ทอง สะอาดตา) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80"
                    alt="ทัวร์ญี่ปุ่น ฟูจิ"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Dark Gradient Overlay for Better Text Contrast */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, rgba(153, 27, 27, 0.50) 35%, rgba(194, 65, 12, 0.25) 60%, transparent 85%)'
                    }}
                  />

                  {/* Single Top Badge */}
                  <div className="absolute top-5 left-5">
                    <div
                      className="px-5 py-2.5 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
                        boxShadow: '0 4px 20px rgba(251, 191, 36, 0.6)',
                        animation: 'pulse 2s ease-in-out infinite'
                      }}
                    >
                      <p className="text-base font-black leading-none whitespace-nowrap" style={{ fontFamily: 'Kanit, sans-serif', color: '#7F1D1D' }}>
                        ⚡ HOT SALE
                      </p>
                    </div>
                  </div>

                  {/* Clean Content with Better Contrast */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
                    <h3
                      className="text-5xl md:text-6xl font-black mb-2 leading-tight"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      ทัวร์ญี่ปุ่น
                    </h3>

                    <p
                      className="text-lg md:text-xl font-medium mb-4"
                      style={{
                        fontFamily: 'Sarabun, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
                      }}
                    >
                      โตเกียว-ฟูจิ-ทาคายาม่า 7 วัน
                    </p>

                    <div className="mb-5">
                      <div className="flex items-center gap-3 mb-2">
                        <p
                          className="text-lg line-through"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FCA5A5',
                            textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          68,999.-
                        </p>
                        <div
                          className="px-3 py-1 rounded-md"
                          style={{
                            background: 'rgba(220, 38, 38, 0.3)',
                            border: '1px solid rgba(220, 38, 38, 0.5)'
                          }}
                        >
                          <p className="text-xs font-bold leading-none" style={{ fontFamily: 'Kanit, sans-serif', color: '#FCA5A5' }}>
                            ลด 39%
                          </p>
                        </div>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <h1
                          className="text-6xl md:text-7xl font-black"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047',
                            textShadow: '3px 3px 10px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 0, 0, 0.5)',
                            letterSpacing: '-0.02em'
                          }}
                        >
                          41,999
                        </h1>
                        <span
                          className="text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          บาท
                        </span>
                      </div>
                    </div>

                    <button
                      className="w-full py-4 rounded-xl font-black text-lg md:text-xl transition-all hover:scale-105 flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        color: '#7F1D1D',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 8px 30px rgba(253, 224, 71, 0.5)',
                        lineHeight: 1
                      }}
                    >
                      <span className="leading-none">จองเลย →</span>
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [4]
                  </span>
                </div>
              </div>

              {/* Card 5 - Clean Center Focus (ธีมทอง-แดง เน้นตรงกลาง สะอาดตา) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&q=80"
                    alt="ทัวร์ญี่ปุ่น"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Dark Gradient Overlay for Better Text Contrast */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, rgba(120, 53, 15, 0.50) 35%, rgba(161, 98, 7, 0.25) 60%, transparent 85%)'
                    }}
                  />

                  {/* Single Top Badge */}
                  <div className="absolute top-5 right-5">
                    <div
                      className="px-5 py-2.5 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                        boxShadow: '0 4px 20px rgba(220, 38, 38, 0.6)',
                        animation: 'pulse 2s ease-in-out infinite'
                      }}
                    >
                      <p className="text-base font-black leading-none whitespace-nowrap" style={{ fontFamily: 'Kanit, sans-serif', color: '#FFFFFF' }}>
                        🔥 SALE
                      </p>
                    </div>
                  </div>

                  {/* Clean Content with Better Contrast */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
                    <h3
                      className="text-5xl md:text-6xl font-black mb-2 leading-tight"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      ทัวร์ญี่ปุ่น
                    </h3>

                    <p
                      className="text-lg md:text-xl font-medium mb-4"
                      style={{
                        fontFamily: 'Sarabun, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
                      }}
                    >
                      โตเกียว-โอซาก้า-เกียวโต 6 วัน
                    </p>

                    <div className="mb-5">
                      <div className="inline-flex items-center gap-2 mb-3">
                        <span
                          className="text-sm"
                          style={{
                            fontFamily: 'Sarabun, sans-serif',
                            color: '#FFFFFF',
                            opacity: 0.7
                          }}
                        >
                          จากราคา
                        </span>
                        <p
                          className="text-xl line-through font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FCA5A5',
                            textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          64,999.-
                        </p>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <h1
                          className="text-6xl md:text-7xl font-black"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047',
                            textShadow: '3px 3px 10px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 0, 0, 0.5)',
                            letterSpacing: '-0.02em'
                          }}
                        >
                          35,999
                        </h1>
                        <span
                          className="text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          บาท
                        </span>
                      </div>
                    </div>

                    <button
                      className="w-full py-4 rounded-xl font-black text-lg md:text-xl transition-all hover:scale-105 flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        color: '#991B1B',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 8px 30px rgba(253, 224, 71, 0.5)',
                        lineHeight: 1
                      }}
                    >
                      <span className="leading-none">จองทันที →</span>
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [5]
                  </span>
                </div>
              </div>

              {/* Card 6 - Asymmetric Split Design (ธีมแดง-ทอง แบบ Split เฉียง) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-3xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80"
                    alt="ทัวร์ญี่ปุ่น โตเกียว"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Diagonal Split Overlay - Creative Asymmetric Design */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(155deg, transparent 0%, transparent 42%, rgba(220, 38, 38, 0.85) 42%, rgba(153, 27, 27, 0.92) 100%)',
                    }}
                  />

                  {/* Top Left - Minimalist Badge */}
                  <div className="absolute top-6 left-6">
                    <div
                      className="px-5 py-2.5 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        boxShadow: '0 4px 20px rgba(251, 191, 36, 0.6)',
                      }}
                    >
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#991B1B' }}>
                        ⭐ PREMIUM
                      </p>
                    </div>
                  </div>

                  {/* Bottom Right Content Area - On Red Diagonal */}
                  <div className="absolute bottom-0 right-0 left-0 p-8">
                    <div className="max-w-[85%] ml-auto">
                      {/* Title with Elegant Typography */}
                      <h3
                        className="text-2xl font-bold mb-2 leading-tight"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
                        }}
                      >
                        ทัวร์ญี่ปุ่น พรีเมียม
                      </h3>

                      <p
                        className="text-base mb-4"
                        style={{
                          fontFamily: 'Sarabun, sans-serif',
                          color: '#FEF3C7',
                          fontWeight: 500
                        }}
                      >
                        โตเกียว-ฟูจิ-ฮาโกเน 5 วัน
                      </p>

                      {/* Price Section with Visual Hierarchy */}
                      <div className="mb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className="text-base line-through"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FCA5A5',
                              opacity: 0.8
                            }}
                          >
                            59,999.-
                          </span>
                          <div
                            className="px-3 py-1 rounded-md"
                            style={{
                              background: 'rgba(253, 224, 71, 0.25)',
                              border: '1.5px solid rgba(253, 224, 71, 0.5)'
                            }}
                          >
                            <p className="text-xs font-bold" style={{ fontFamily: 'Kanit, sans-serif', color: '#FDE047' }}>
                              ลด 35%
                            </p>
                          </div>
                        </div>

                        <div className="flex items-baseline gap-2">
                          <h1
                            className="text-6xl font-black"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              background: 'linear-gradient(135deg, #FDE047 0%, #FCD34D 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              textShadow: 'none',
                              filter: 'drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.6))',
                              letterSpacing: '-0.02em'
                            }}
                          >
                            38,999
                          </h1>
                          <span
                            className="text-xl font-medium"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FEF3C7'
                            }}
                          >
                            บาท
                          </span>
                        </div>
                      </div>

                      {/* CTA Button - Sophisticated Design */}
                      <button
                        className="w-full py-4 rounded-xl font-bold text-base transition-all hover:scale-[1.02] hover:shadow-2xl"
                        style={{
                          background: 'linear-gradient(135deg, #FFFFFF 0%, #FEF3C7 100%)',
                          color: '#991B1B',
                          fontFamily: 'Kanit, sans-serif',
                          boxShadow: '0 6px 25px rgba(255, 255, 255, 0.4)',
                        }}
                      >
                        ดูรายละเอียด →
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [6]
                  </span>
                </div>
              </div>

              {/* Card 7 - Radial Spotlight Design (ธีมแดง-ทอง Spotlight Effect) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-3xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80"
                    alt="ทัวร์ญี่ปุ่น"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Radial Gradient Overlay - Spotlight from Bottom Center */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 100%, rgba(220, 38, 38, 0.75) 0%, rgba(153, 27, 27, 0.88) 45%, rgba(120, 53, 15, 0.95) 100%)',
                    }}
                  />

                  {/* Top Right - Floating Time-Limited Badge */}
                  <div className="absolute top-6 right-6">
                    <div
                      className="relative"
                      style={{
                        animation: 'pulse 2.5s ease-in-out infinite'
                      }}
                    >
                      <div
                        className="px-6 py-3 rounded-2xl"
                        style={{
                          background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                          boxShadow: '0 0 35px rgba(220, 38, 38, 0.8), 0 8px 25px rgba(0, 0, 0, 0.5)',
                          border: '2px solid rgba(253, 224, 71, 0.6)'
                        }}
                      >
                        <p className="text-xs font-bold mb-0.5" style={{ fontFamily: 'Kanit, sans-serif', color: '#FEF3C7' }}>
                          จำกัดเวลา
                        </p>
                        <p className="text-lg font-black leading-none" style={{ fontFamily: 'Kanit, sans-serif', color: '#FDE047' }}>
                          48 ชม.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Center Content - Spotlight Focus */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <div className="text-center mb-6">
                      {/* Destination Tag */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                        style={{
                          background: 'rgba(0, 0, 0, 0.4)',
                          backdropFilter: 'blur(10px)',
                          border: '1.5px solid rgba(253, 224, 71, 0.3)'
                        }}
                      >
                        <span className="text-lg">🗾</span>
                        <p className="text-sm font-bold" style={{ fontFamily: 'Sarabun, sans-serif', color: '#FFFFFF' }}>
                          ทัวร์ญี่ปุ่น
                        </p>
                      </div>

                      {/* Main Title */}
                      <h3
                        className="text-3xl font-black mb-3 leading-tight"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '3px 3px 10px rgba(0, 0, 0, 0.7)',
                        }}
                      >
                        โตเกียว-โอซาก้า<br/>
                        ฮอกไกโด
                      </h3>

                      <p
                        className="text-sm mb-6"
                        style={{
                          fontFamily: 'Sarabun, sans-serif',
                          color: '#FEF3C7',
                          fontWeight: 500
                        }}
                      >
                        7 วัน 5 คืน • โรงแรม 5 ดาว
                      </p>

                      {/* Price Showcase - Center Aligned */}
                      <div className="mb-5">
                        <div className="inline-flex items-center gap-3 mb-3">
                          <span
                            className="text-lg line-through"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FCA5A5',
                            }}
                          >
                            74,999.-
                          </span>
                          <div
                            className="px-4 py-1.5 rounded-lg"
                            style={{
                              background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                              boxShadow: '0 4px 15px rgba(253, 224, 71, 0.5)'
                            }}
                          >
                            <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#991B1B' }}>
                              🔥 ลด 45%
                            </p>
                          </div>
                        </div>

                        <div className="flex items-baseline justify-center gap-2">
                          <h1
                            className="text-7xl font-black"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              background: 'linear-gradient(180deg, #FFFFFF 0%, #FDE047 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              filter: 'drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.8))',
                              letterSpacing: '-0.03em'
                            }}
                          >
                            41,999
                          </h1>
                          <span
                            className="text-2xl font-bold"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FEF3C7'
                            }}
                          >
                            บาท
                          </span>
                        </div>
                      </div>

                      {/* CTA Button - Center Focus */}
                      <button
                        className="px-12 py-4 rounded-full font-black text-lg transition-all hover:scale-105"
                        style={{
                          background: 'linear-gradient(135deg, #FDE047 0%, #F59E0B 100%)',
                          color: '#991B1B',
                          fontFamily: 'Kanit, sans-serif',
                          boxShadow: '0 10px 35px rgba(253, 224, 71, 0.6), 0 0 50px rgba(251, 191, 36, 0.3)',
                          animation: 'buttonPulse 2s ease-in-out infinite'
                        }}
                      >
                        ⚡ จองเลย!
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [7]
                  </span>
                </div>
              </div>

              {/* Card 8 - Overlay Badge Style (ธีมน้ำเงิน-ทอง สะอาดตา) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=800&q=80"
                    alt="ทัวร์ญี่ปุ่น"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Blue-Dark Gradient Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.80) 0%, rgba(30, 64, 175, 0.45) 40%, transparent 75%)'
                    }}
                  />

                  {/* Top Center Badge */}
                  <div className="absolute top-5 left-0 right-0 flex justify-center">
                    <div
                      className="px-6 py-2.5 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
                        boxShadow: '0 4px 20px rgba(59, 130, 246, 0.6)',
                      }}
                    >
                      <p className="text-sm font-black leading-none whitespace-nowrap" style={{ fontFamily: 'Kanit, sans-serif', color: '#FFFFFF' }}>
                        ✨ NEW
                      </p>
                    </div>
                  </div>

                  {/* Clean Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
                    <h3
                      className="text-5xl md:text-6xl font-black mb-2 leading-tight"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      ทัวร์ญี่ปุ่น
                    </h3>

                    <p
                      className="text-lg md:text-xl font-medium mb-4"
                      style={{
                        fontFamily: 'Sarabun, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
                      }}
                    >
                      ฮอกไกโด-ซัปโปโร 6 วัน
                    </p>

                    <div className="mb-5">
                      <p
                        className="text-sm mb-2"
                        style={{
                          fontFamily: 'Sarabun, sans-serif',
                          color: '#93C5FD',
                          textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)'
                        }}
                      >
                        เริ่มต้นเพียง
                      </p>
                      <div className="flex items-baseline gap-2">
                        <h1
                          className="text-6xl md:text-7xl font-black"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#60A5FA',
                            textShadow: '3px 3px 10px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 0, 0, 0.5)',
                            letterSpacing: '-0.02em'
                          }}
                        >
                          52,999
                        </h1>
                        <span
                          className="text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          บาท
                        </span>
                      </div>
                    </div>

                    <button
                      className="w-full py-4 rounded-xl font-black text-lg md:text-xl transition-all hover:scale-105 flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
                        color: '#FFFFFF',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 8px 30px rgba(59, 130, 246, 0.5)',
                        lineHeight: 1
                      }}
                    >
                      <span className="leading-none">ดูรายละเอียด →</span>
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [8]
                  </span>
                </div>
              </div>

              {/* Card 9 - Minimalist Green Theme (ธีมเขียว-ขาว สะอาดตา) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80"
                    alt="ทัวร์ญี่ปุ่น"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Green-Dark Gradient Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.80) 0%, rgba(5, 150, 105, 0.45) 40%, transparent 75%)'
                    }}
                  />

                  {/* Top Left Corner Badge */}
                  <div className="absolute top-5 left-5">
                    <div
                      className="px-5 py-2.5 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                        boxShadow: '0 4px 20px rgba(16, 185, 129, 0.6)',
                      }}
                    >
                      <p className="text-sm font-black leading-none whitespace-nowrap" style={{ fontFamily: 'Kanit, sans-serif', color: '#FFFFFF' }}>
                        🌿 ECO
                      </p>
                    </div>
                  </div>

                  {/* Clean Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
                    <h3
                      className="text-5xl md:text-6xl font-black mb-2 leading-tight"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      ทัวร์ญี่ปุ่น
                    </h3>

                    <p
                      className="text-lg md:text-xl font-medium mb-5"
                      style={{
                        fontFamily: 'Sarabun, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
                      }}
                    >
                      นาโกย่า-ทาคายาม่า 5 วัน
                    </p>

                    <div className="flex items-baseline gap-2 mb-5">
                      <h1
                        className="text-6xl md:text-7xl font-black"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#34D399',
                          textShadow: '3px 3px 10px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 0, 0, 0.5)',
                          letterSpacing: '-0.02em'
                        }}
                      >
                        38,999
                      </h1>
                      <span
                        className="text-2xl font-bold"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
                        }}
                      >
                        บาท
                      </span>
                    </div>

                    <button
                      className="w-full py-4 rounded-xl font-black text-lg md:text-xl transition-all hover:scale-105 flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)',
                        color: '#FFFFFF',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 8px 30px rgba(16, 185, 129, 0.5)',
                        lineHeight: 1
                      }}
                    >
                      <span className="leading-none">สำรองที่นั่ง →</span>
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [9]
                  </span>
                </div>
              </div>

              {/* Card 10 - Purple Premium Theme (ธีมม่วง-ชมพู หรูหรา) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&q=80"
                    alt="ทัวร์ญี่ปุ่น"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Purple-Dark Gradient Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.80) 0%, rgba(126, 34, 206, 0.50) 40%, transparent 75%)'
                    }}
                  />

                  {/* Top Right Badge */}
                  <div className="absolute top-5 right-5">
                    <div
                      className="px-5 py-2.5 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)',
                        boxShadow: '0 4px 20px rgba(168, 85, 247, 0.6)',
                      }}
                    >
                      <p className="text-sm font-black leading-none whitespace-nowrap" style={{ fontFamily: 'Kanit, sans-serif', color: '#FFFFFF' }}>
                        👑 VIP
                      </p>
                    </div>
                  </div>

                  {/* Clean Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
                    <h3
                      className="text-5xl md:text-6xl font-black mb-2 leading-tight"
                      style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      ทัวร์ญี่ปุ่น
                    </h3>

                    <p
                      className="text-lg md:text-xl font-medium mb-4"
                      style={{
                        fontFamily: 'Sarabun, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
                      }}
                    >
                      เกียวโต-โอซาก้า-นารา 7 วัน
                    </p>

                    <div className="mb-5">
                      <div className="flex items-center gap-2 mb-2">
                        <p
                          className="text-lg line-through"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#F9A8D4',
                            textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          78,999.-
                        </p>
                        <div
                          className="px-3 py-1 rounded-md"
                          style={{
                            background: 'rgba(168, 85, 247, 0.3)',
                            border: '1px solid rgba(168, 85, 247, 0.5)'
                          }}
                        >
                          <p className="text-xs font-bold leading-none" style={{ fontFamily: 'Kanit, sans-serif', color: '#E9D5FF' }}>
                            ลด 35%
                          </p>
                        </div>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <h1
                          className="text-6xl md:text-7xl font-black"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#C084FC',
                            textShadow: '3px 3px 10px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 0, 0, 0.5)',
                            letterSpacing: '-0.02em'
                          }}
                        >
                          51,999
                        </h1>
                        <span
                          className="text-2xl font-bold"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          บาท
                        </span>
                      </div>
                    </div>

                    <button
                      className="w-full py-4 rounded-xl font-black text-lg md:text-xl transition-all hover:scale-105 flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #C084FC 0%, #A855F7 100%)',
                        color: '#FFFFFF',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 8px 30px rgba(168, 85, 247, 0.5)',
                        lineHeight: 1
                      }}
                    >
                      <span className="leading-none">จองเลย →</span>
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [10]
                  </span>
                </div>
              </div>

              {/* Card 11 - Explosive Gradient with Pattaya Font (ธีมแดง-ทอง แบบระเบิด) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80"
                    alt="ทัวร์ญี่ปุ่น"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Explosive Gradient Overlay */}
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at bottom, rgba(220, 38, 38, 0.95) 0%, rgba(153, 27, 27, 0.85) 40%, rgba(185, 28, 28, 0.75) 70%, rgba(127, 29, 29, 0.5) 100%)'
                  }} />

                  {/* Top Corner Badge */}
                  <div className="absolute top-4 right-4 px-4 py-2 rounded-full" style={{
                    background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
                    boxShadow: '0 0 30px rgba(251, 191, 36, 0.8), 0 0 60px rgba(251, 191, 36, 0.4)',
                    animation: 'pulse 2s ease-in-out infinite'
                  }}>
                    <p className="text-sm font-black leading-none" style={{ fontFamily: 'Kanit, sans-serif', color: '#7C2D12' }}>
                      ⚡ ลด 40%
                    </p>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="mb-4">
                      <p className="text-xs uppercase tracking-widest mb-3" style={{
                        fontFamily: 'Sarabun, sans-serif',
                        color: '#FDE047',
                        fontWeight: 700,
                        textShadow: '0 0 20px rgba(253, 224, 71, 0.5)'
                      }}>
                        EXPLOSIVE DEAL
                      </p>

                      <h3 className="text-5xl md:text-6xl leading-none mb-4" style={{
                        fontFamily: 'var(--font-pattaya)',
                        color: '#FFFFFF',
                        textShadow: '2px 2px 0 #DC2626, 4px 4px 0 #991B1B, 6px 6px 20px rgba(0, 0, 0, 0.5)',
                        letterSpacing: '0.02em'
                      }}>
                        ญี่ปุ่น
                      </h3>

                      <p className="text-xl mb-5" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        fontWeight: 600,
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                      }}>
                        โตเกียว • โอซาก้า • ฟูจิ
                      </p>

                      {/* Price Section */}
                      <div className="mb-5">
                        <div className="inline-block px-4 py-2 rounded-lg mb-2" style={{
                          background: 'rgba(0, 0, 0, 0.4)',
                          backdropFilter: 'blur(10px)'
                        }}>
                          <div className="flex items-baseline gap-3">
                            <span className="text-lg line-through" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FCA5A5',
                              opacity: 0.8
                            }}>
                              59,990.-
                            </span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-5xl font-black" style={{
                                fontFamily: 'Kanit, sans-serif',
                                color: '#FDE047',
                                textShadow: '0 0 30px rgba(253, 224, 71, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.5)',
                                letterSpacing: '-0.02em'
                              }}>
                                35,990
                              </span>
                              <span className="text-xl font-bold" style={{
                                fontFamily: 'Kanit, sans-serif',
                                color: '#FEF3C7'
                              }}>
                                บาท
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button className="w-full py-4 rounded-xl text-lg font-black transition-all hover:scale-105" style={{
                        background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
                        color: '#7C2D12',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 0 30px rgba(251, 191, 36, 0.6), 0 8px 24px rgba(0, 0, 0, 0.3)'
                      }}>
                        จองด่วน! เหลือที่จำกัด →
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[11]</span>
                </div>
              </div>

              {/* Card 12 - Luxury Elegant with Pattaya Font (ธีมดำ-ทอง แบบหรูหรา) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80"
                    alt="ทัวร์ญี่ปุ่น"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Dark Luxury Gradient */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(17, 24, 39, 0.85) 40%, rgba(31, 41, 55, 0.6) 70%, transparent 100%)'
                  }} />

                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-32 h-32" style={{
                    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
                    clipPath: 'polygon(100% 0, 100% 100%, 0 0)'
                  }} />

                  {/* Top Badge */}
                  <div className="absolute top-5 left-5 flex items-center gap-2">
                    <div className="px-4 py-2 rounded-lg" style={{
                      background: 'rgba(251, 191, 36, 0.2)',
                      border: '2px solid #FBBF24',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <p className="text-xs font-bold leading-none" style={{
                        fontFamily: 'Sarabun, sans-serif',
                        color: '#FDE047',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                      }}>
                        Premium Package
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div>
                      <h3 className="text-6xl md:text-7xl leading-none mb-3" style={{
                        fontFamily: 'var(--font-pattaya)',
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 50%, #F59E0B 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8))',
                        letterSpacing: '0.02em'
                      }}>
                        ฮอกไกโด
                      </h3>

                      <p className="text-xl mb-6" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#E5E7EB',
                        fontWeight: 500,
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                      }}>
                        ซัปโปโร • โอตารุ • ฟูราโน่
                      </p>

                      {/* Info Pills */}
                      <div className="flex gap-2 mb-5">
                        <div className="px-3 py-1.5 rounded-full" style={{
                          background: 'rgba(251, 191, 36, 0.15)',
                          border: '1px solid rgba(251, 191, 36, 0.3)'
                        }}>
                          <p className="text-xs font-semibold" style={{ fontFamily: 'Sarabun, sans-serif', color: '#FDE047' }}>
                            6 วัน 4 คืน
                          </p>
                        </div>
                        <div className="px-3 py-1.5 rounded-full" style={{
                          background: 'rgba(251, 191, 36, 0.15)',
                          border: '1px solid rgba(251, 191, 36, 0.3)'
                        }}>
                          <p className="text-xs font-semibold" style={{ fontFamily: 'Sarabun, sans-serif', color: '#FDE047' }}>
                            5 ดาว
                          </p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-end justify-between mb-4">
                        <div>
                          <p className="text-xs mb-1" style={{ fontFamily: 'Sarabun, sans-serif', color: '#9CA3AF' }}>
                            เริ่มต้นเพียง
                          </p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FBBF24',
                              textShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
                            }}>
                              69,990
                            </span>
                            <span className="text-lg font-medium" style={{
                              fontFamily: 'Sarabun, sans-serif',
                              color: '#D1D5DB'
                            }}>
                              บาท
                            </span>
                          </div>
                        </div>
                        <button className="px-8 py-3 rounded-xl font-bold transition-all hover:scale-105" style={{
                          background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
                          color: '#1F2937',
                          fontFamily: 'Kanit, sans-serif',
                          boxShadow: '0 0 30px rgba(251, 191, 36, 0.4)'
                        }}>
                          ดูรายละเอียด
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[12]</span>
                </div>
              </div>

              {/* Card 13 - Vibrant Modern with Pattaya Font (ธีมสีสัน แบบโมเดิร์น) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80"
                    alt="ทัวร์ญี่ปุ่น"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Colorful Gradient Overlay */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.9) 0%, rgba(239, 68, 68, 0.85) 30%, rgba(249, 115, 22, 0.8) 60%, rgba(251, 146, 60, 0.75) 100%)'
                  }} />

                  {/* Animated Badge Top */}
                  <div className="absolute top-5 left-5">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full" style={{
                        background: '#FDE047',
                        filter: 'blur(15px)',
                        animation: 'pulse 2s ease-in-out infinite'
                      }} />
                      <div className="relative px-5 py-2.5 rounded-full flex items-center gap-2" style={{
                        background: '#FFFFFF',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
                      }}>
                        <span className="text-2xl">🔥</span>
                        <p className="text-sm font-black leading-none" style={{
                          fontFamily: 'Kanit, sans-serif',
                          background: 'linear-gradient(135deg, #DC2626 0%, #EA580C 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}>
                          HOT DEAL
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div>
                      {/* Large Title with Pattaya */}
                      <h3 className="text-7xl md:text-8xl leading-none mb-3" style={{
                        fontFamily: 'var(--font-pattaya)',
                        color: '#FFFFFF',
                        textShadow: '3px 3px 0 rgba(220, 38, 38, 0.8), 6px 6px 0 rgba(153, 27, 27, 0.6), 9px 9px 30px rgba(0, 0, 0, 0.5)',
                        letterSpacing: '0.02em',
                        transform: 'rotate(-2deg)',
                        transformOrigin: 'left bottom'
                      }}>
                        เกาหลี
                      </h3>

                      <p className="text-2xl mb-6" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.5)'
                      }}>
                        โซล • เจจู • ปูซาน
                      </p>

                      {/* Price with Glow Effect */}
                      <div className="mb-5">
                        <div className="inline-block p-5 rounded-2xl" style={{
                          background: 'rgba(255, 255, 255, 0.95)',
                          boxShadow: '0 0 40px rgba(253, 224, 71, 0.6), 0 8px 32px rgba(0, 0, 0, 0.3)'
                        }}>
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="text-xs mb-1" style={{
                                fontFamily: 'Sarabun, sans-serif',
                                color: '#DC2626',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                              }}>
                                ราคาพิเศษ
                              </p>
                              <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black" style={{
                                  fontFamily: 'Kanit, sans-serif',
                                  background: 'linear-gradient(135deg, #DC2626 0%, #EA580C 100%)',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  backgroundClip: 'text',
                                  letterSpacing: '-0.02em'
                                }}>
                                  28,990
                                </span>
                                <span className="text-lg font-bold" style={{
                                  fontFamily: 'Sarabun, sans-serif',
                                  color: '#7C2D12'
                                }}>
                                  บาท
                                </span>
                              </div>
                            </div>
                            <div className="px-3 py-1.5 rounded-lg" style={{
                              background: 'linear-gradient(135deg, #DC2626 0%, #EA580C 100%)',
                              transform: 'rotate(-5deg)'
                            }}>
                              <p className="text-sm font-black leading-none" style={{
                                fontFamily: 'Kanit, sans-serif',
                                color: '#FFFFFF'
                              }}>
                                -35%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <button className="w-full py-4 rounded-xl text-lg font-black transition-all hover:scale-105" style={{
                        background: '#FFFFFF',
                        color: '#DC2626',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                      }}>
                        จองทันที ราคานี้วันนี้เท่านั้น! →
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[13]</span>
                </div>
              </div>

              {/* Card 14 - Explosive with Chonburi Font (ธีมแดง-ทอง แบบหรูหรา) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&q=80"
                    alt="ทัวร์ยุโรป"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Red-Gold Gradient - Extra Light */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(153, 27, 27, 0.50) 0%, rgba(185, 28, 28, 0.35) 30%, rgba(220, 38, 38, 0.20) 55%, rgba(239, 68, 68, 0.08) 75%, transparent 100%)'
                  }} />

                  {/* Gold Shimmer Effect */}
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at top right, rgba(251, 191, 36, 0.08) 0%, rgba(252, 211, 77, 0.03) 30%, transparent 60%)',
                    pointerEvents: 'none'
                  }} />

                  {/* Corner Sticker Badge */}
                  <div className="absolute top-0 right-0">
                    <div className="relative w-24 h-24">
                      <div className="absolute inset-0" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                        boxShadow: '0 8px 24px rgba(251, 191, 36, 0.6)'
                      }} />
                      <div className="absolute top-3 right-3 text-center" style={{ transform: 'rotate(45deg)' }}>
                        <p className="text-xs font-black leading-none" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#7C2D12'
                        }}>
                          SALE
                        </p>
                        <p className="text-lg font-black leading-none mt-0.5" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#DC2626'
                        }}>
                          -45%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div>
                      {/* Urgent Tag */}
                      <div className="inline-block mb-4">
                        <div className="relative">
                          {/* Glow Effect */}
                          <div className="absolute inset-0 rounded" style={{
                            background: '#DC2626',
                            filter: 'blur(8px)',
                            animation: 'pulse 1.5s ease-in-out infinite'
                          }} />
                          {/* Main Badge */}
                          <div className="relative px-3 py-1.5 rounded" style={{
                            background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                            border: '1.5px solid #FDE047',
                            boxShadow: '0 2px 8px rgba(220, 38, 38, 0.5), 0 0 20px rgba(253, 224, 71, 0.3)',
                            animation: 'pulse 1.5s ease-in-out infinite'
                          }}>
                            <p className="text-xs font-black flex items-center gap-1" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF',
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
                              letterSpacing: '0.02em'
                            }}>
                              <span className="text-sm">⚠️</span>
                              <span>เหลือ 2 ที่สุดท้าย!</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Chonburi Title - Display Font */}
                      <h3 className="text-6xl md:text-7xl leading-none mb-3" style={{
                        fontFamily: 'var(--font-chonburi)',
                        color: '#FFFFFF',
                        textShadow: '3px 3px 0 rgba(220, 38, 38, 0.6), 6px 6px 0 rgba(153, 27, 27, 0.4), 9px 9px 30px rgba(0, 0, 0, 0.8)',
                        letterSpacing: '0.01em'
                      }}>
                        ยุโรป
                      </h3>

                      <p className="text-xl mb-6" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FEF3C7',
                        fontWeight: 600,
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                      }}>
                        ปารีส • ลอนดอน • อัมสเตอร์ดัม
                      </p>

                      {/* Price Row */}
                      <div className="flex items-end justify-between mb-5">
                        <div>
                          <p className="text-base font-bold line-through mb-2" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                          }}>
                            ราคาเต็ม 89,990.-
                          </p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-6xl font-black" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FDE047',
                              textShadow: '0 0 40px rgba(253, 224, 71, 0.8), 4px 4px 12px rgba(0, 0, 0, 0.9)',
                              letterSpacing: '-0.02em'
                            }}>
                              49,990
                            </span>
                            <span className="text-2xl font-bold" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FEF3C7'
                            }}>
                              บาท
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <button className="w-full py-4 rounded-xl text-lg font-black transition-all hover:scale-105" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        color: '#7C2D12',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 0 40px rgba(253, 224, 71, 0.6), 0 8px 24px rgba(0, 0, 0, 0.4)'
                      }}>
                        จองเลย! วันนี้เท่านั้น →
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[14]</span>
                </div>
              </div>

              {/* Card 15 - Handwriting with Sriracha Font (ธีมเขียว-ฟ้า แบบเป็นธรรมชาติ) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
                    alt="ทัวร์นิวซีแลนด์"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Green-Teal Gradient */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(5, 150, 105, 0.9) 0%, rgba(16, 185, 129, 0.75) 40%, rgba(52, 211, 153, 0.5) 70%, transparent 100%)'
                  }} />

                  {/* Ribbon Badge */}
                  <div className="absolute top-6 left-0">
                    <div className="relative px-6 py-3 pr-8" style={{
                      background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                      boxShadow: '0 4px 16px rgba(251, 191, 36, 0.6), 4px 4px 0 rgba(180, 83, 9, 0.3)',
                      clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)'
                    }}>
                      <p className="text-base font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#065F46'
                      }}>
                        🌿 ECO TOUR
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div>
                      {/* Handwritten Style Badge */}
                      <div className="inline-block mb-4">
                        <div className="px-5 py-2 rounded-2xl" style={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                          transform: 'rotate(-2deg)'
                        }}>
                          <p className="text-sm" style={{
                            fontFamily: 'var(--font-sriracha)',
                            color: '#059669',
                            fontSize: '18px'
                          }}>
                            ลดพิเศษ 30%
                          </p>
                        </div>
                      </div>

                      {/* Sriracha Title - Handwriting Font */}
                      <h3 className="text-6xl md:text-7xl leading-tight mb-3" style={{
                        fontFamily: 'var(--font-sriracha)',
                        color: '#FFFFFF',
                        textShadow: '3px 3px 0 rgba(5, 150, 105, 0.8), 6px 6px 0 rgba(4, 120, 87, 0.6), 9px 9px 30px rgba(0, 0, 0, 0.6)',
                        letterSpacing: '0.02em'
                      }}>
                        นิวซีแลนด์
                      </h3>

                      <p className="text-lg mb-6" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        fontWeight: 600,
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                      }}>
                        ออกแลนด์ • ควีนส์ทาวน์ • มิลฟอร์ดซาวน์
                      </p>

                      {/* Price Box */}
                      <div className="mb-5">
                        <div className="inline-block px-6 py-4 rounded-2xl" style={{
                          background: 'rgba(255, 255, 255, 0.95)',
                          boxShadow: '0 0 40px rgba(253, 224, 71, 0.5), 0 8px 32px rgba(0, 0, 0, 0.3)',
                          transform: 'rotate(-1deg)'
                        }}>
                          <p className="text-xs mb-1" style={{
                            fontFamily: 'var(--font-sriracha)',
                            color: '#059669',
                            fontSize: '14px'
                          }}>
                            ราคาพิเศษ
                          </p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-bold" style={{
                              fontFamily: 'Kanit, sans-serif',
                              background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                              letterSpacing: '-0.02em'
                            }}>
                              79,990
                            </span>
                            <span className="text-lg font-bold" style={{
                              fontFamily: 'Sarabun, sans-serif',
                              color: '#065F46'
                            }}>
                              บาท
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <button className="w-full py-4 rounded-xl text-lg font-black transition-all hover:scale-105" style={{
                        background: '#FFFFFF',
                        color: '#059669',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                      }}>
                        สำรองที่นั่งเลย! →
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[15]</span>
                </div>
              </div>

              {/* Card 16 - Decorative with Charm Font (ธีมน้ำเงิน-ฟ้า แบบหวาน) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=800&q=80"
                    alt="ทัวร์มัลดีฟส์"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Blue Gradient */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(29, 78, 216, 0.9) 0%, rgba(59, 130, 246, 0.75) 40%, rgba(96, 165, 250, 0.5) 70%, transparent 100%)'
                  }} />

                  {/* Decorative Wave Badge */}
                  <div className="absolute top-5 left-5">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-2xl" style={{
                        background: '#60A5FA',
                        filter: 'blur(12px)',
                        animation: 'pulse 3s ease-in-out infinite'
                      }} />
                      <div className="relative px-5 py-3 rounded-2xl" style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)'
                      }}>
                        <p className="text-base font-bold" style={{
                          fontFamily: 'var(--font-charm)',
                          color: '#1E40AF',
                          fontSize: '20px'
                        }}>
                          🌊 Summer Deal
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div>
                      {/* Charm Title - Decorative Font */}
                      <h3 className="text-6xl md:text-7xl leading-tight mb-3" style={{
                        fontFamily: 'var(--font-charm)',
                        color: '#FFFFFF',
                        textShadow: '3px 3px 0 rgba(29, 78, 216, 0.8), 6px 6px 0 rgba(30, 64, 175, 0.6), 9px 9px 30px rgba(0, 0, 0, 0.6)',
                        letterSpacing: '0.02em',
                        fontWeight: 700
                      }}>
                        มัลดีฟส์
                      </h3>

                      <p className="text-xl mb-6" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        fontWeight: 600,
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                      }}>
                        5 วัน 4 คืน • All Inclusive Resort
                      </p>

                      {/* Special Offer Box */}
                      <div className="mb-5">
                        <div className="p-5 rounded-2xl" style={{
                          background: 'rgba(255, 255, 255, 0.95)',
                          boxShadow: '0 0 40px rgba(96, 165, 250, 0.6), 0 8px 32px rgba(0, 0, 0, 0.3)'
                        }}>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-bold" style={{
                              fontFamily: 'var(--font-charm)',
                              color: '#1E40AF',
                              fontSize: '16px'
                            }}>
                              โปรโมชั่นพิเศษ
                            </p>
                            <div className="px-3 py-1 rounded-lg" style={{
                              background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)'
                            }}>
                              <p className="text-xs font-black" style={{
                                fontFamily: 'Kanit, sans-serif',
                                color: '#FFFFFF'
                              }}>
                                -40%
                              </p>
                            </div>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm line-through" style={{
                              fontFamily: 'Sarabun, sans-serif',
                              color: '#9CA3AF'
                            }}>
                              119,990.-
                            </span>
                          </div>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-5xl font-black" style={{
                              fontFamily: 'Kanit, sans-serif',
                              background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                              letterSpacing: '-0.02em'
                            }}>
                              69,990
                            </span>
                            <span className="text-lg font-bold" style={{
                              fontFamily: 'Sarabun, sans-serif',
                              color: '#1E3A8A'
                            }}>
                              บาท
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <button className="w-full py-4 rounded-xl text-lg font-black transition-all hover:scale-105" style={{
                        background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
                        color: '#FFFFFF',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 0 30px rgba(59, 130, 246, 0.5), 0 8px 24px rgba(0, 0, 0, 0.3)'
                      }}>
                        จองด่วน! ที่นั่งจำกัด →
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[16]</span>
                </div>
              </div>

              {/* Card 17 - Split Diagonal Layout (ธีมดำ-ทอง แบบแยกทแยง) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden bg-white">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80"
                    alt="ทัวร์แคนาดา"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Diagonal Split Overlay - Black to Gold */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.65) 0%, rgba(17, 24, 39, 0.55) 45%, transparent 45%, transparent 55%, rgba(251, 191, 36, 0.40) 55%, rgba(245, 158, 11, 0.50) 100%)'
                  }} />

                  {/* Top Left Badge */}
                  <div className="absolute top-5 left-5">
                    <div className="relative">
                      <div className="absolute inset-0 rounded" style={{
                        background: '#DC2626',
                        filter: 'blur(8px)',
                        animation: 'pulse 1.5s ease-in-out infinite'
                      }} />
                      <div className="relative px-3 py-1.5 rounded" style={{
                        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                        border: '1.5px solid #FDE047',
                        boxShadow: '0 2px 8px rgba(220, 38, 38, 0.5)',
                        animation: 'pulse 1.5s ease-in-out infinite'
                      }}>
                        <p className="text-xs font-black flex items-center gap-1" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF'
                        }}>
                          <span className="text-sm">🔥</span>
                          <span>จองด่วน!</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Diagonal Corner Badge - Top Right */}
                  <div className="absolute top-0 right-0">
                    <div className="relative w-20 h-20">
                      <div className="absolute inset-0" style={{
                        background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
                        clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                        boxShadow: '0 4px 12px rgba(251, 191, 36, 0.5)'
                      }} />
                      <div className="absolute top-2 right-2 text-center" style={{ transform: 'rotate(45deg)' }}>
                        <p className="text-[10px] font-bold leading-none" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#000000'
                        }}>
                          ลด
                        </p>
                        <p className="text-base font-black leading-none mt-0.5" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#DC2626'
                        }}>
                          35%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content - Bottom */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div>
                      {/* Title */}
                      <h3 className="text-6xl md:text-7xl leading-none mb-3" style={{
                        fontFamily: 'var(--font-chonburi)',
                        color: '#FFFFFF',
                        textShadow: '3px 3px 0 rgba(220, 38, 38, 0.6), 6px 6px 0 rgba(153, 27, 27, 0.4), 9px 9px 30px rgba(0, 0, 0, 0.8)',
                        letterSpacing: '0.01em'
                      }}>
                        แคนาดา
                      </h3>

                      <p className="text-xl mb-6" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FEF3C7',
                        fontWeight: 600,
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                      }}>
                        แวนคูเวอร์ • ตอรอนโต • ไนแองการา
                      </p>

                      {/* Price */}
                      <p className="text-sm font-bold line-through mb-2" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                      }}>
                        ราคาเต็ม 95,990.-
                      </p>
                      <div className="flex items-baseline gap-2 mb-5">
                        <span className="text-6xl font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FDE047',
                          textShadow: '0 0 40px rgba(253, 224, 71, 0.8), 4px 4px 12px rgba(0, 0, 0, 0.9)',
                          letterSpacing: '-0.02em'
                        }}>
                          62,490
                        </span>
                        <span className="text-2xl font-bold" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FEF3C7'
                        }}>
                          บาท
                        </span>
                      </div>

                      {/* CTA */}
                      <button className="w-full py-4 rounded-xl text-lg font-black transition-all hover:scale-105" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        color: '#000000',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 0 40px rgba(253, 224, 71, 0.6), 0 8px 24px rgba(0, 0, 0, 0.4)'
                      }}>
                        จองเลย! ที่นั่งจำกัด →
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[17]</span>
                </div>
              </div>

              {/* Card 18 - Center Focus Layout (ธีมแดง-ทอง-ขาว แบบโฟกัสกลาง) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80"
                    alt="ทัวร์ตุรกี"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Red-Black Radial Gradient */}
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at center, rgba(220, 38, 38, 0.30) 0%, rgba(185, 28, 28, 0.50) 30%, rgba(153, 27, 27, 0.70) 60%, rgba(0, 0, 0, 0.85) 100%)'
                  }} />

                  {/* Top Ribbon */}
                  <div className="absolute top-6 left-0 right-0 flex justify-center">
                    <div className="px-8 py-2 rounded-r-full rounded-l-full" style={{
                      background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
                      boxShadow: '0 4px 16px rgba(251, 191, 36, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#000000'
                      }}>
                        ⭐ แพ็กเกจพิเศษ ⭐
                      </p>
                    </div>
                  </div>

                  {/* Center Content Box */}
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="text-center">
                      <h3 className="text-7xl md:text-8xl leading-none mb-4" style={{
                        fontFamily: 'var(--font-pattaya)',
                        color: '#FFFFFF',
                        textShadow: '4px 4px 0 rgba(220, 38, 38, 0.8), 8px 8px 0 rgba(153, 27, 27, 0.6), 12px 12px 40px rgba(0, 0, 0, 0.9)',
                        letterSpacing: '0.02em'
                      }}>
                        ตุรกี
                      </h3>

                      <p className="text-2xl mb-6" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FEF3C7',
                        fontWeight: 700,
                        textShadow: '2px 2px 10px rgba(0, 0, 0, 0.9)'
                      }}>
                        อิสตันบูล • คัปปาโดเกีย
                      </p>

                      {/* Price Box */}
                      <div className="inline-block px-8 py-5 rounded-2xl mb-6" style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        boxShadow: '0 0 50px rgba(253, 224, 71, 0.7), 0 10px 40px rgba(0, 0, 0, 0.4)'
                      }}>
                        <p className="text-xs mb-1" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#DC2626',
                          fontWeight: 700
                        }}>
                          ราคาพิเศษ
                        </p>
                        <div className="flex items-baseline gap-3 mb-1">
                          <span className="text-6xl font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            letterSpacing: '-0.02em'
                          }}>
                            54,990
                          </span>
                          <span className="text-2xl font-bold" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#7C2D12'
                          }}>
                            บาท
                          </span>
                        </div>
                        <p className="text-sm line-through" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#9CA3AF'
                        }}>
                          จาก 84,600.-
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom CTA */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <button className="w-full py-4 rounded-xl text-lg font-black transition-all hover:scale-105" style={{
                      background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                      color: '#000000',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 0 40px rgba(253, 224, 71, 0.7), 0 8px 24px rgba(0, 0, 0, 0.4)'
                    }}>
                      จองทันที! →
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[18]</span>
                </div>
              </div>

              {/* Card 19 - Horizontal Split Layout (ธีมดำ-แดง-ทอง แบบแบ่งครึ่งนอน) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden bg-white">
                  {/* Top Half - Image */}
                  <div className="absolute top-0 left-0 right-0 h-1/2">
                    <img
                      src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80"
                      alt="ทัวร์ดูไบ"
                      className="w-full h-full object-cover"
                    />
                    {/* Corner Triangle Badge */}
                    <div className="absolute top-0 left-0">
                      <div className="relative w-20 h-20">
                        <div className="absolute inset-0" style={{
                          background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                          clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                          boxShadow: '0 4px 12px rgba(220, 38, 38, 0.5)'
                        }} />
                        <div className="absolute top-2 left-2 text-left" style={{ transform: 'rotate(-45deg)' }}>
                          <p className="text-xs font-black leading-none" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047'
                          }}>
                            HOT
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Half - Content */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 p-6" style={{
                    background: 'linear-gradient(135deg, #000000 0%, #1F1F1F 50%, #DC2626 100%)'
                  }}>
                    {/* Title */}
                    <h3 className="text-5xl md:text-6xl leading-none mb-3" style={{
                      fontFamily: 'var(--font-sriracha)',
                      color: '#FFFFFF',
                      textShadow: '3px 3px 0 rgba(220, 38, 38, 0.8), 6px 6px 0 rgba(153, 27, 27, 0.6), 9px 9px 30px rgba(0, 0, 0, 0.7)',
                      letterSpacing: '0.02em'
                    }}>
                      ดูไบ
                    </h3>

                    <p className="text-base mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FDE047',
                      fontWeight: 600,
                      textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)'
                    }}>
                      5 วัน 3 คืน • บุรจญ์ คาลิฟา
                    </p>

                    {/* Price & CTA Row */}
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs mb-1 line-through" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          opacity: 0.7
                        }}>
                          59,990.-
                        </p>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-4xl font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047',
                            textShadow: '0 0 30px rgba(253, 224, 71, 0.8), 2px 2px 8px rgba(0, 0, 0, 0.9)',
                            letterSpacing: '-0.02em'
                          }}>
                            39,990
                          </span>
                          <span className="text-lg font-bold" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF'
                          }}>
                            บาท
                          </span>
                        </div>
                      </div>
                      <button className="px-6 py-3 rounded-xl text-base font-black transition-all hover:scale-105" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        color: '#000000',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 0 30px rgba(253, 224, 71, 0.6), 0 4px 16px rgba(0, 0, 0, 0.4)'
                      }}>
                        จองเลย →
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[19]</span>
                </div>
              </div>

              {/* Card 20 - Explosive Glam Red-Gold (ธีมแดง-ทอง หรูหราระเบิด) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80"
                    alt="ทัวร์โรม อิตาลี"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Red-Black Gradient Overlay */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(153, 27, 27, 0.55) 35%, rgba(220, 38, 38, 0.25) 60%, rgba(239, 68, 68, 0.10) 80%, transparent 100%)'
                  }} />

                  {/* Gold Shimmer Top Right */}
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at top right, rgba(251, 191, 36, 0.15) 0%, rgba(252, 211, 77, 0.05) 30%, transparent 60%)'
                  }} />

                  {/* Corner Sticker Badge - Top Right */}
                  <div className="absolute top-0 right-0">
                    <div className="relative w-28 h-28">
                      <div className="absolute inset-0" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                        boxShadow: '0 6px 20px rgba(251, 191, 36, 0.6)'
                      }} />
                      <div className="absolute top-4 right-4 text-center" style={{ transform: 'rotate(45deg)' }}>
                        <p className="text-xs font-black" style={{ color: '#000000' }}>HOT</p>
                        <p className="text-2xl font-black leading-none" style={{ color: '#DC2626' }}>-30%</p>
                      </div>
                    </div>
                  </div>

                  {/* Content - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Urgent Tag */}
                    <div className="inline-block mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-lg" style={{
                          background: '#DC2626',
                          filter: 'blur(10px)',
                          animation: 'pulse 1.5s ease-in-out infinite'
                        }} />
                        <div className="relative px-4 py-2 rounded-lg" style={{
                          background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                          border: '2px solid #FDE047',
                          animation: 'pulse 1.5s ease-in-out infinite'
                        }}>
                          <p className="text-sm font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF'
                          }}>
                            <span className="mr-1">🔥</span>
                            <span>จองด่วน! เหลือน้อย</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Title - Chonburi Font */}
                    <h3 className="text-6xl md:text-7xl font-black mb-2 leading-none" style={{
                      fontFamily: 'var(--font-chonburi)',
                      color: '#FFFFFF',
                      textShadow: '4px 4px 0 rgba(220, 38, 38, 0.7), 8px 8px 0 rgba(153, 27, 27, 0.5), 12px 12px 40px rgba(0, 0, 0, 0.9)'
                    }}>
                      โรม
                    </h3>

                    {/* Subtitle */}
                    <p className="text-base mb-5 font-semibold" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FDE047',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                    }}>
                      อิตาลี • 6 วัน 4 คืน
                    </p>

                    {/* Price & CTA Row */}
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs mb-1" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          opacity: 0.8
                        }}>
                          <span className="line-through">ราคาเต็ม 75,990.-</span>
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047',
                            textShadow: '0 0 40px rgba(253, 224, 71, 0.9), 4px 4px 15px rgba(0, 0, 0, 0.9)',
                            letterSpacing: '-0.02em'
                          }}>
                            52,990
                          </span>
                          <span className="text-lg font-bold" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF'
                          }}>
                            บาท
                          </span>
                        </div>
                      </div>

                      <button className="px-6 py-3 rounded-xl text-base font-black transition-all hover:scale-105" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        color: '#000000',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 0 35px rgba(253, 224, 71, 0.7), 0 4px 18px rgba(0, 0, 0, 0.5)'
                      }}>
                        จองเลย! →
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[20]</span>
                </div>
              </div>

              {/* Card 21 - Luxury Black-Gold Split (ธีมดำ-ทอง หรูหรา แบบแยกครึ่ง) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80"
                    alt="ทัวร์บาหลี"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Black Gradient Overlay - Strong Bottom */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.75) 30%, rgba(0, 0, 0, 0.40) 55%, rgba(0, 0, 0, 0.15) 75%, transparent 100%)'
                  }} />

                  {/* Gold Accent Gradient - Subtle Top */}
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at top left, rgba(251, 191, 36, 0.12) 0%, transparent 50%)'
                  }} />

                  {/* Corner Sticker - Top Left */}
                  <div className="absolute top-0 left-0">
                    <div className="relative w-24 h-24">
                      <div className="absolute inset-0" style={{
                        background: 'linear-gradient(135deg, #DC2626 0%, #7F1D1D 100%)',
                        clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                        boxShadow: '0 4px 15px rgba(220, 38, 38, 0.6)'
                      }} />
                      <div className="absolute top-3 left-3 text-left" style={{ transform: 'rotate(-45deg)' }}>
                        <p className="text-xs font-black leading-none" style={{ color: '#FDE047' }}>NEW</p>
                      </div>
                    </div>
                  </div>

                  {/* Top Right Discount Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="px-4 py-2 rounded-lg" style={{
                      background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                      boxShadow: '0 0 25px rgba(251, 191, 36, 0.7), 0 4px 15px rgba(0, 0, 0, 0.4)'
                    }}>
                      <p className="text-2xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#000000'
                      }}>
                        -35%
                      </p>
                    </div>
                  </div>

                  {/* Content - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Urgent Badge */}
                    <div className="inline-block mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-lg" style={{
                          background: '#FDE047',
                          filter: 'blur(12px)',
                          opacity: 0.6
                        }} />
                        <div className="relative px-4 py-2 rounded-lg" style={{
                          background: '#000000',
                          border: '2px solid #FDE047',
                          boxShadow: '0 0 20px rgba(253, 224, 71, 0.4)'
                        }}>
                          <p className="text-sm font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047'
                          }}>
                            <span className="mr-1">⭐</span>
                            <span>โปรแกรมพรีเมียม</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Title - Pattaya Font */}
                    <h3 className="text-6xl md:text-7xl font-black mb-3 leading-none" style={{
                      fontFamily: 'var(--font-pattaya)',
                      color: '#FDE047',
                      textShadow: '4px 4px 0 rgba(0, 0, 0, 0.8), 8px 8px 20px rgba(253, 224, 71, 0.5), 12px 12px 40px rgba(0, 0, 0, 0.9)',
                      letterSpacing: '0.03em'
                    }}>
                      บาหลี
                    </h3>

                    {/* Subtitle */}
                    <p className="text-base mb-5 font-semibold" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                    }}>
                      อินโดนีเซีย • 5 วัน 3 คืน
                    </p>

                    {/* Price & CTA Row */}
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs mb-1" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          opacity: 0.8
                        }}>
                          <span className="line-through">ราคาเต็ม 45,990.-</span>
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047',
                            textShadow: '0 0 40px rgba(253, 224, 71, 0.9), 4px 4px 15px rgba(0, 0, 0, 0.9)',
                            letterSpacing: '-0.02em'
                          }}>
                            29,990
                          </span>
                          <span className="text-lg font-bold" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF'
                          }}>
                            บาท
                          </span>
                        </div>
                      </div>

                      <button className="px-6 py-3 rounded-xl text-base font-black transition-all hover:scale-105" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        color: '#000000',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 0 35px rgba(253, 224, 71, 0.7), 0 4px 18px rgba(0, 0, 0, 0.5)'
                      }}>
                        จองเลย! →
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[21]</span>
                </div>
              </div>

              {/* Card 22 - Red-Gold Explosive Drama (ธีมแดง-ทอง ดราม่าระเบิด) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=800&q=80"
                    alt="ทัวร์ฮ่องกง"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Red-Black Gradient Overlay */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(153, 27, 27, 0.75) 0%, rgba(185, 28, 28, 0.55) 25%, rgba(220, 38, 38, 0.30) 50%, rgba(239, 68, 68, 0.12) 70%, transparent 100%)'
                  }} />

                  {/* Gold Shimmer Effect */}
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at bottom right, rgba(251, 191, 36, 0.20) 0%, rgba(252, 211, 77, 0.08) 35%, transparent 65%)'
                  }} />

                  {/* Top Corner Badges Row */}
                  <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
                    {/* Left Badge - Urgent */}
                    <div className="relative">
                      <div className="absolute inset-0 rounded-lg" style={{
                        background: '#DC2626',
                        filter: 'blur(10px)',
                        animation: 'pulse 1.5s ease-in-out infinite'
                      }} />
                      <div className="relative px-3 py-1.5 rounded-lg" style={{
                        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                        border: '2px solid #FDE047',
                        animation: 'pulse 1.5s ease-in-out infinite'
                      }}>
                        <p className="text-xs font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF'
                        }}>
                          ⏰ เหลือ 3 ที่!
                        </p>
                      </div>
                    </div>

                    {/* Right Badge - Discount */}
                    <div className="px-4 py-2 rounded-lg" style={{
                      background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                      boxShadow: '0 0 30px rgba(251, 191, 36, 0.8), 0 4px 15px rgba(0, 0, 0, 0.4)'
                    }}>
                      <p className="text-xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#DC2626'
                      }}>
                        -33%
                      </p>
                    </div>
                  </div>

                  {/* Content - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Badge - Premium */}
                    <div className="inline-block mb-3">
                      <div className="px-3 py-1.5 rounded" style={{
                        background: 'rgba(0, 0, 0, 0.8)',
                        border: '1.5px solid #FDE047'
                      }}>
                        <p className="text-xs font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FDE047'
                        }}>
                          ⭐ แพ็กเกจยอดนิยม
                        </p>
                      </div>
                    </div>

                    {/* Title - Charm Font */}
                    <h3 className="text-6xl md:text-7xl font-black mb-2 leading-none" style={{
                      fontFamily: 'var(--font-charm)',
                      color: '#FFFFFF',
                      textShadow: '4px 4px 0 rgba(220, 38, 38, 0.8), 8px 8px 0 rgba(153, 27, 27, 0.6), 12px 12px 40px rgba(0, 0, 0, 0.9)',
                      letterSpacing: '0.02em'
                    }}>
                      ฮ่องกง
                    </h3>

                    {/* Subtitle */}
                    <p className="text-base mb-5 font-semibold" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FDE047',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                    }}>
                      4 วัน 3 คืน • ดิสนีย์แลนด์
                    </p>

                    {/* Price & CTA Row */}
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs mb-1" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          opacity: 0.8
                        }}>
                          <span className="line-through">ราคาเต็ม 35,990.-</span>
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047',
                            textShadow: '0 0 40px rgba(253, 224, 71, 0.9), 4px 4px 15px rgba(0, 0, 0, 0.9)',
                            letterSpacing: '-0.02em'
                          }}>
                            23,990
                          </span>
                          <span className="text-lg font-bold" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF'
                          }}>
                            บาท
                          </span>
                        </div>
                      </div>

                      <button className="px-6 py-3 rounded-xl text-base font-black transition-all hover:scale-105" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        color: '#000000',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 0 35px rgba(253, 224, 71, 0.7), 0 4px 18px rgba(0, 0, 0, 0.5)'
                      }}>
                        จองด่วน! →
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[22]</span>
                </div>
              </div>

              {/* Card 23 - Black Luxury Gold Accent (ธีมดำหรูหรา เน้นทอง) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                    alt="ทัวร์มัลดีฟส์"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Black Gradient Overlay - Very Dark */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.75) 40%, rgba(0, 0, 0, 0.55) 70%, rgba(0, 0, 0, 0.25) 100%)'
                  }} />

                  {/* Gold Shimmer - Diagonal */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(135deg, transparent 0%, transparent 40%, rgba(251, 191, 36, 0.15) 60%, rgba(252, 211, 77, 0.08) 80%, transparent 100%)'
                  }} />

                  {/* Top Left - Red Corner Triangle */}
                  <div className="absolute top-0 left-0">
                    <div className="relative w-28 h-28">
                      <div className="absolute inset-0" style={{
                        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                        clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                        boxShadow: '0 4px 20px rgba(220, 38, 38, 0.6)'
                      }} />
                      <div className="absolute top-4 left-4 text-left" style={{ transform: 'rotate(-45deg)' }}>
                        <p className="text-sm font-black leading-none" style={{ color: '#FDE047' }}>HOT</p>
                        <p className="text-xs font-bold" style={{ color: '#FFFFFF' }}>DEAL</p>
                      </div>
                    </div>
                  </div>

                  {/* Content - Left Aligned */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    {/* Top - Discount Badge */}
                    <div className="flex justify-end mt-2">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-xl" style={{
                          background: '#FDE047',
                          filter: 'blur(15px)',
                          opacity: 0.5
                        }} />
                        <div className="relative px-6 py-3 rounded-xl" style={{
                          background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                          boxShadow: '0 0 30px rgba(251, 191, 36, 0.8), 0 4px 20px rgba(0, 0, 0, 0.5)'
                        }}>
                          <p className="text-3xl font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#000000'
                          }}>
                            -40%
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Content */}
                    <div>
                      {/* Badge */}
                      <div className="inline-block mb-4">
                        <div className="relative">
                          <div className="absolute inset-0 rounded-lg" style={{
                            background: '#DC2626',
                            filter: 'blur(10px)',
                            animation: 'pulse 1.5s ease-in-out infinite'
                          }} />
                          <div className="relative px-4 py-2 rounded-lg" style={{
                            background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                            border: '2px solid #FDE047',
                            animation: 'pulse 1.5s ease-in-out infinite'
                          }}>
                            <p className="text-sm font-black" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF'
                            }}>
                              <span className="mr-1">💎</span>
                              <span>Luxury Package</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Title - Sriracha Font */}
                      <h3 className="text-6xl md:text-7xl font-black mb-2 leading-none" style={{
                        fontFamily: 'var(--font-sriracha)',
                        color: '#FDE047',
                        textShadow: '4px 4px 0 rgba(0, 0, 0, 0.9), 8px 8px 25px rgba(253, 224, 71, 0.6), 12px 12px 45px rgba(0, 0, 0, 0.9)',
                        letterSpacing: '0.02em'
                      }}>
                        มัลดีฟส์
                      </h3>

                      {/* Subtitle */}
                      <p className="text-base mb-5 font-semibold" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                      }}>
                        6 วัน 4 คืน • Private Villa
                      </p>

                      {/* Price & CTA Row */}
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xs mb-1" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            opacity: 0.8
                          }}>
                            <span className="line-through">ราคาเต็ม 89,990.-</span>
                          </p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FDE047',
                              textShadow: '0 0 40px rgba(253, 224, 71, 0.9), 4px 4px 15px rgba(0, 0, 0, 0.9)',
                              letterSpacing: '-0.02em'
                            }}>
                              53,990
                            </span>
                            <span className="text-lg font-bold" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF'
                            }}>
                              บาท
                            </span>
                          </div>
                        </div>

                        <button className="px-6 py-3 rounded-xl text-base font-black transition-all hover:scale-105" style={{
                          background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                          color: '#000000',
                          fontFamily: 'Kanit, sans-serif',
                          boxShadow: '0 0 35px rgba(253, 224, 71, 0.7), 0 4px 18px rgba(0, 0, 0, 0.5)'
                        }}>
                          จองเลย! →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[23]</span>
                </div>
              </div>

              {/* Card 24 - Red Dominant Gold Touch (ธีมแดงเด่น จุดทอง) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&q=80"
                    alt="ทัวร์สวิตเซอร์แลนด์"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Red-Black Gradient Overlay - Strong */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(127, 29, 29, 0.90) 0%, rgba(153, 27, 27, 0.70) 30%, rgba(185, 28, 28, 0.50) 50%, rgba(220, 38, 38, 0.25) 70%, transparent 100%)'
                  }} />

                  {/* Gold Glow Spots */}
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at top right, rgba(251, 191, 36, 0.25) 0%, transparent 40%), radial-gradient(ellipse at bottom left, rgba(252, 211, 77, 0.15) 0%, transparent 35%)'
                  }} />

                  {/* Top Badges Row */}
                  <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
                    {/* Left - New Badge */}
                    <div className="px-3 py-1.5 rounded-lg" style={{
                      background: '#000000',
                      border: '2px solid #FDE047',
                      boxShadow: '0 0 20px rgba(253, 224, 71, 0.4)'
                    }}>
                      <p className="text-xs font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FDE047'
                      }}>
                        🆕 โปรแกรมใหม่
                      </p>
                    </div>

                    {/* Right - Discount Circle */}
                    <div className="relative w-20 h-20">
                      <div className="absolute inset-0 rounded-full" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        boxShadow: '0 0 35px rgba(251, 191, 36, 0.8), 0 4px 20px rgba(0, 0, 0, 0.5)'
                      }} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-xs font-black leading-none" style={{ color: '#000000' }}>ลด</p>
                        <p className="text-2xl font-black leading-none" style={{ color: '#DC2626' }}>38%</p>
                      </div>
                    </div>
                  </div>

                  {/* Content - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Urgent Badge */}
                    <div className="inline-block mb-3">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-lg" style={{
                          background: '#FDE047',
                          filter: 'blur(12px)',
                          opacity: 0.6
                        }} />
                        <div className="relative px-4 py-2 rounded-lg" style={{
                          background: 'rgba(0, 0, 0, 0.9)',
                          border: '2px solid #FDE047'
                        }}>
                          <p className="text-sm font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047'
                          }}>
                            <span className="mr-1">⚡</span>
                            <span>จองวันนี้ รับฟรี! ประกัน</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Title - Chonburi Font */}
                    <h3 className="text-5xl md:text-6xl font-black mb-2 leading-none" style={{
                      fontFamily: 'var(--font-chonburi)',
                      color: '#FFFFFF',
                      textShadow: '3px 3px 0 rgba(220, 38, 38, 0.8), 6px 6px 0 rgba(153, 27, 27, 0.6), 9px 9px 35px rgba(0, 0, 0, 0.9)'
                    }}>
                      สวิตเซอร์แลนด์
                    </h3>

                    {/* Subtitle */}
                    <p className="text-base mb-4 font-semibold" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FDE047',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                    }}>
                      7 วัน 5 คืน • ยอดเขาจุงเฟรา
                    </p>

                    {/* Price & CTA Row */}
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs mb-1" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          opacity: 0.8
                        }}>
                          <span className="line-through">ราคาเต็ม 129,990.-</span>
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047',
                            textShadow: '0 0 40px rgba(253, 224, 71, 0.9), 4px 4px 15px rgba(0, 0, 0, 0.9)',
                            letterSpacing: '-0.02em'
                          }}>
                            79,990
                          </span>
                          <span className="text-lg font-bold" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF'
                          }}>
                            บาท
                          </span>
                        </div>
                      </div>

                      <button className="px-6 py-3 rounded-xl text-base font-black transition-all hover:scale-105" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        color: '#000000',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 0 35px rgba(253, 224, 71, 0.7), 0 4px 18px rgba(0, 0, 0, 0.5)'
                      }}>
                        จองเลย! →
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[24]</span>
                </div>
              </div>

              {/* Card 25 - Gold Dominant Black Base (ธีมทองเด่น ฐานดำ) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800&q=80"
                    alt="ทัวร์นอร์เวย์"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Black Gradient Overlay - Very Strong Bottom */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.80) 25%, rgba(0, 0, 0, 0.50) 50%, rgba(0, 0, 0, 0.20) 75%, transparent 100%)'
                  }} />

                  {/* Gold Overlay Gradient */}
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at center bottom, rgba(251, 191, 36, 0.25) 0%, rgba(252, 211, 77, 0.12) 30%, transparent 60%)'
                  }} />

                  {/* Corner Triangle - Top Right Red */}
                  <div className="absolute top-0 right-0">
                    <div className="relative w-24 h-24">
                      <div className="absolute inset-0" style={{
                        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                        clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                        boxShadow: '0 4px 15px rgba(220, 38, 38, 0.6)'
                      }} />
                      <div className="absolute top-3 right-3 text-center" style={{ transform: 'rotate(45deg)' }}>
                        <p className="text-sm font-black leading-none" style={{ color: '#FDE047' }}>VIP</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    {/* Top Badge */}
                    <div className="flex justify-start mt-2">
                      <div className="px-5 py-2.5 rounded-xl" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        boxShadow: '0 0 30px rgba(251, 191, 36, 0.8), 0 4px 20px rgba(0, 0, 0, 0.5)'
                      }}>
                        <p className="text-xl font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#000000'
                        }}>
                          -42%
                        </p>
                      </div>
                    </div>

                    {/* Bottom Content */}
                    <div>
                      {/* Badge */}
                      <div className="inline-block mb-4">
                        <div className="relative">
                          <div className="absolute inset-0 rounded-lg" style={{
                            background: '#DC2626',
                            filter: 'blur(10px)',
                            animation: 'pulse 1.5s ease-in-out infinite'
                          }} />
                          <div className="relative px-4 py-2 rounded-lg" style={{
                            background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                            border: '2px solid #FDE047',
                            animation: 'pulse 1.5s ease-in-out infinite'
                          }}>
                            <p className="text-sm font-black" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF'
                            }}>
                              <span className="mr-1">❄️</span>
                              <span>เหลือ 5 ที่สุดท้าย!</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Title - Pattaya Font */}
                      <h3 className="text-6xl md:text-7xl font-black mb-3 leading-none" style={{
                        fontFamily: 'var(--font-pattaya)',
                        color: '#FDE047',
                        textShadow: '4px 4px 0 rgba(0, 0, 0, 0.9), 8px 8px 25px rgba(253, 224, 71, 0.7), 12px 12px 45px rgba(0, 0, 0, 0.9)',
                        letterSpacing: '0.05em'
                      }}>
                        นอร์เวย์
                      </h3>

                      {/* Subtitle */}
                      <p className="text-base mb-5 font-semibold" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                      }}>
                        8 วัน 6 คืน • ล่าแสงเหนือ
                      </p>

                      {/* Price & CTA Row */}
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xs mb-1" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            opacity: 0.8
                          }}>
                            <span className="line-through">ราคาเต็ม 149,990.-</span>
                          </p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FDE047',
                              textShadow: '0 0 40px rgba(253, 224, 71, 0.9), 4px 4px 15px rgba(0, 0, 0, 0.9)',
                              letterSpacing: '-0.02em'
                            }}>
                              86,990
                            </span>
                            <span className="text-lg font-bold" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF'
                            }}>
                              บาท
                            </span>
                          </div>
                        </div>

                        <button className="px-6 py-3 rounded-xl text-base font-black transition-all hover:scale-105" style={{
                          background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                          color: '#000000',
                          fontFamily: 'Kanit, sans-serif',
                          boxShadow: '0 0 35px rgba(253, 224, 71, 0.7), 0 4px 18px rgba(0, 0, 0, 0.5)'
                        }}>
                          จองเลย! →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[25]</span>
                </div>
              </div>

              {/* Card 26 - Circular Frame Design (ธีมวงกลมทอง กรอบดำ) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80"
                    alt="ทัวร์เกาหลี"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Black Vignette Effect */}
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 40%, rgba(0, 0, 0, 0.85) 100%)'
                  }} />

                  {/* Circular Gold Border Frame */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="relative w-full h-full rounded-full" style={{
                      border: '3px solid #FDE047',
                      boxShadow: '0 0 40px rgba(253, 224, 71, 0.6), inset 0 0 60px rgba(0, 0, 0, 0.8)'
                    }} />
                  </div>

                  {/* Content - Centered in Circle */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                    {/* Top Badge */}
                    <div className="mb-4">
                      <div className="inline-block px-5 py-2 rounded-full" style={{
                        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                        border: '2px solid #FDE047',
                        boxShadow: '0 0 25px rgba(220, 38, 38, 0.6)'
                      }}>
                        <p className="text-xs font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FDE047'
                        }}>
                          ⭐ EXCLUSIVE
                        </p>
                      </div>
                    </div>

                    {/* Circle Price Badge - Large */}
                    <div className="relative w-32 h-32 mb-4">
                      <div className="absolute inset-0 rounded-full" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        boxShadow: '0 0 50px rgba(253, 224, 71, 0.9), 0 6px 25px rgba(0, 0, 0, 0.6)'
                      }} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-sm font-black leading-none mb-1" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#000000'
                        }}>ลด</p>
                        <p className="text-4xl font-black leading-none" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#DC2626'
                        }}>40%</p>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-6xl font-black mb-3 leading-none" style={{
                      fontFamily: 'var(--font-pattaya)',
                      color: '#FFFFFF',
                      textShadow: '4px 4px 0 rgba(0, 0, 0, 0.9), 8px 8px 30px rgba(253, 224, 71, 0.4)'
                    }}>
                      เกาหลี
                    </h3>

                    {/* Subtitle */}
                    <p className="text-base mb-4 font-semibold" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FDE047',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                    }}>
                      โซล • 5 วัน 3 คืน
                    </p>

                    {/* Price */}
                    <div className="mb-4">
                      <p className="text-xs mb-1" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        opacity: 0.8
                      }}>
                        <span className="line-through">42,990.-</span>
                      </p>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-5xl font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FDE047',
                          textShadow: '0 0 40px rgba(253, 224, 71, 0.9), 3px 3px 12px rgba(0, 0, 0, 0.9)'
                        }}>
                          25,990
                        </span>
                        <span className="text-base font-bold" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF'
                        }}>
                          บาท
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className="px-8 py-3 rounded-full text-base font-black transition-all hover:scale-105" style={{
                      background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                      color: '#000000',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 0 35px rgba(253, 224, 71, 0.7), 0 4px 18px rgba(0, 0, 0, 0.5)'
                    }}>
                      จองเลย! →
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[26]</span>
                </div>
              </div>

              {/* Card 27 - Bold Black Gold Glory (ธีมดำทองสง่างาม) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80"
                    alt="ทัวร์ไทเป"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Black Gradient Overlay - Strong Bottom */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.70) 30%, rgba(0, 0, 0, 0.40) 60%, rgba(0, 0, 0, 0.15) 80%, transparent 100%)'
                  }} />

                  {/* Gold Shimmer Effect */}
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at top right, rgba(251, 191, 36, 0.18) 0%, rgba(252, 211, 77, 0.08) 30%, transparent 60%)'
                  }} />

                  {/* Corner Sticker Badge - Top Right */}
                  <div className="absolute top-0 right-0">
                    <div className="relative w-28 h-28">
                      <div className="absolute inset-0" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                        boxShadow: '0 6px 20px rgba(251, 191, 36, 0.6)'
                      }} />
                      <div className="absolute top-4 right-4 text-center" style={{ transform: 'rotate(45deg)' }}>
                        <p className="text-xs font-black" style={{ color: '#000000' }}>SALE</p>
                        <p className="text-2xl font-black leading-none" style={{ color: '#DC2626' }}>-35%</p>
                      </div>
                    </div>
                  </div>

                  {/* Content - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Urgent Tag */}
                    <div className="inline-block mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-lg" style={{
                          background: '#DC2626',
                          filter: 'blur(10px)',
                          animation: 'pulse 1.5s ease-in-out infinite'
                        }} />
                        <div className="relative px-4 py-2 rounded-lg" style={{
                          background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                          border: '2px solid #FDE047',
                          animation: 'pulse 1.5s ease-in-out infinite'
                        }}>
                          <p className="text-sm font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF'
                          }}>
                            <span className="mr-1">⚡</span>
                            <span>จองด่วน! ที่นั่งจำกัด</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Title - Pattaya Font */}
                    <h3 className="text-6xl md:text-7xl font-black mb-2 leading-none" style={{
                      fontFamily: 'var(--font-pattaya)',
                      color: '#FDE047',
                      textShadow: '4px 4px 0 rgba(0, 0, 0, 0.9), 8px 8px 25px rgba(253, 224, 71, 0.6), 12px 12px 45px rgba(0, 0, 0, 0.9)',
                      letterSpacing: '0.05em'
                    }}>
                      ไทเป
                    </h3>

                    {/* Subtitle */}
                    <p className="text-base mb-5 font-semibold" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                    }}>
                      ไต้หวัน • 4 วัน 3 คืน
                    </p>

                    {/* Price & CTA Row */}
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs mb-1" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          opacity: 0.8
                        }}>
                          <span className="line-through">ราคาเต็ม 32,990.-</span>
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047',
                            textShadow: '0 0 40px rgba(253, 224, 71, 0.9), 4px 4px 15px rgba(0, 0, 0, 0.9)',
                            letterSpacing: '-0.02em'
                          }}>
                            21,490
                          </span>
                          <span className="text-lg font-bold" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF'
                          }}>
                            บาท
                          </span>
                        </div>
                      </div>

                      <button className="px-6 py-3 rounded-xl text-base font-black transition-all hover:scale-105" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        color: '#000000',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 0 35px rgba(253, 224, 71, 0.7), 0 4px 18px rgba(0, 0, 0, 0.5)'
                      }}>
                        จองเลย! →
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[27]</span>
                </div>
              </div>

              {/* Card 28 - Premium Gold Elegance (ธีมทองหรูหรา) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1555217851-6141535bd771?w=800&q=80"
                    alt="ทัวร์เวียดนาม"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Black Gradient Overlay - Very Strong */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.90) 0%, rgba(0, 0, 0, 0.75) 30%, rgba(0, 0, 0, 0.50) 55%, rgba(0, 0, 0, 0.20) 75%, transparent 100%)'
                  }} />

                  {/* Gold Shimmer Effect - Prominent */}
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at bottom center, rgba(251, 191, 36, 0.25) 0%, rgba(252, 211, 77, 0.12) 30%, transparent 60%)'
                  }} />

                  {/* Corner Sticker Badge - Top Right */}
                  <div className="absolute top-0 right-0">
                    <div className="relative w-28 h-28">
                      <div className="absolute inset-0" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                        boxShadow: '0 6px 20px rgba(251, 191, 36, 0.7)'
                      }} />
                      <div className="absolute top-4 right-4 text-center" style={{ transform: 'rotate(45deg)' }}>
                        <p className="text-xs font-black" style={{ color: '#000000' }}>HOT</p>
                        <p className="text-2xl font-black leading-none" style={{ color: '#DC2626' }}>-28%</p>
                      </div>
                    </div>
                  </div>

                  {/* Content - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Urgent Tag */}
                    <div className="inline-block mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-lg" style={{
                          background: '#DC2626',
                          filter: 'blur(10px)',
                          animation: 'pulse 1.5s ease-in-out infinite'
                        }} />
                        <div className="relative px-4 py-2 rounded-lg" style={{
                          background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                          border: '2px solid #FDE047',
                          animation: 'pulse 1.5s ease-in-out infinite'
                        }}>
                          <p className="text-sm font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF'
                          }}>
                            <span className="mr-1">🔥</span>
                            <span>โปรพิเศษ! จำนวนจำกัด</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Title - Sriracha Font */}
                    <h3 className="text-6xl md:text-7xl font-black mb-2 leading-none" style={{
                      fontFamily: 'var(--font-sriracha)',
                      color: '#FDE047',
                      textShadow: '4px 4px 0 rgba(0, 0, 0, 0.9), 8px 8px 25px rgba(253, 224, 71, 0.7), 12px 12px 45px rgba(0, 0, 0, 0.9)',
                      letterSpacing: '0.03em'
                    }}>
                      เวียดนาม
                    </h3>

                    {/* Subtitle */}
                    <p className="text-base mb-5 font-semibold" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                    }}>
                      ดานัง • ฮอยอัน • 4 วัน 3 คืน
                    </p>

                    {/* Price & CTA Row */}
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs mb-1" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          opacity: 0.8
                        }}>
                          <span className="line-through">ราคาเต็ม 18,990.-</span>
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047',
                            textShadow: '0 0 40px rgba(253, 224, 71, 0.9), 4px 4px 15px rgba(0, 0, 0, 0.9)',
                            letterSpacing: '-0.02em'
                          }}>
                            13,690
                          </span>
                          <span className="text-lg font-bold" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF'
                          }}>
                            บาท
                          </span>
                        </div>
                      </div>

                      <button className="px-6 py-3 rounded-xl text-base font-black transition-all hover:scale-105" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        color: '#000000',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 0 35px rgba(253, 224, 71, 0.7), 0 4px 18px rgba(0, 0, 0, 0.5)'
                      }}>
                        จองเลย! →
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[28]</span>
                </div>
              </div>

              {/* Card 29 - Red-Gold Majestic (ธีมแดง-ทองสง่างาม) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1593511343093-ed66e378fe8d?w=800&q=80"
                    alt="ทัวร์เนปาล"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Red-Black Gradient Overlay */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(153, 27, 27, 0.85) 0%, rgba(185, 28, 28, 0.60) 30%, rgba(220, 38, 38, 0.35) 55%, rgba(239, 68, 68, 0.15) 75%, transparent 100%)'
                  }} />

                  {/* Gold Shimmer Effect */}
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at top right, rgba(251, 191, 36, 0.20) 0%, rgba(252, 211, 77, 0.08) 30%, transparent 60%)'
                  }} />

                  {/* Corner Sticker Badge - Top Right */}
                  <div className="absolute top-0 right-0">
                    <div className="relative w-28 h-28">
                      <div className="absolute inset-0" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                        boxShadow: '0 6px 20px rgba(251, 191, 36, 0.6)'
                      }} />
                      <div className="absolute top-4 right-4 text-center" style={{ transform: 'rotate(45deg)' }}>
                        <p className="text-xs font-black" style={{ color: '#000000' }}>SALE</p>
                        <p className="text-2xl font-black leading-none" style={{ color: '#DC2626' }}>-32%</p>
                      </div>
                    </div>
                  </div>

                  {/* Content - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Urgent Tag */}
                    <div className="inline-block mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-lg" style={{
                          background: '#DC2626',
                          filter: 'blur(10px)',
                          animation: 'pulse 1.5s ease-in-out infinite'
                        }} />
                        <div className="relative px-4 py-2 rounded-lg" style={{
                          background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                          border: '2px solid #FDE047',
                          animation: 'pulse 1.5s ease-in-out infinite'
                        }}>
                          <p className="text-sm font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF'
                          }}>
                            <span className="mr-1">🏔️</span>
                            <span>ทัวร์เสริมดวง พิเศษ!</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Title - Chonburi Font */}
                    <h3 className="text-6xl md:text-7xl font-black mb-2 leading-none" style={{
                      fontFamily: 'var(--font-chonburi)',
                      color: '#FFFFFF',
                      textShadow: '4px 4px 0 rgba(220, 38, 38, 0.8), 8px 8px 0 rgba(153, 27, 27, 0.6), 12px 12px 40px rgba(0, 0, 0, 0.9)'
                    }}>
                      เนปาล
                    </h3>

                    {/* Subtitle */}
                    <p className="text-base mb-5 font-semibold" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FDE047',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                    }}>
                      กาฐมาณฑุ • 6 วัน 4 คืน
                    </p>

                    {/* Price & CTA Row */}
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs mb-1" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          opacity: 0.8
                        }}>
                          <span className="line-through">ราคาเต็ม 55,990.-</span>
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047',
                            textShadow: '0 0 40px rgba(253, 224, 71, 0.9), 4px 4px 15px rgba(0, 0, 0, 0.9)',
                            letterSpacing: '-0.02em'
                          }}>
                            37,990
                          </span>
                          <span className="text-lg font-bold" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF'
                          }}>
                            บาท
                          </span>
                        </div>
                      </div>

                      <button className="px-6 py-3 rounded-xl text-base font-black transition-all hover:scale-105" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        color: '#000000',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 0 35px rgba(253, 224, 71, 0.7), 0 4px 18px rgba(0, 0, 0, 0.5)'
                      }}>
                        จองเลย! →
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[29]</span>
                </div>
              </div>

              {/* Card 30 - Black-Gold Imperial (ธีมดำ-ทองจักรพรรดิ) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80"
                    alt="ทัวร์อินเดีย"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Black Gradient Overlay - Very Strong */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.75) 30%, rgba(0, 0, 0, 0.45) 60%, rgba(0, 0, 0, 0.18) 80%, transparent 100%)'
                  }} />

                  {/* Gold Shimmer Effect */}
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at top left, rgba(251, 191, 36, 0.22) 0%, rgba(252, 211, 77, 0.10) 30%, transparent 60%)'
                  }} />

                  {/* Corner Sticker Badge - Top Right */}
                  <div className="absolute top-0 right-0">
                    <div className="relative w-28 h-28">
                      <div className="absolute inset-0" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                        boxShadow: '0 6px 20px rgba(251, 191, 36, 0.7)'
                      }} />
                      <div className="absolute top-4 right-4 text-center" style={{ transform: 'rotate(45deg)' }}>
                        <p className="text-xs font-black" style={{ color: '#000000' }}>VIP</p>
                        <p className="text-2xl font-black leading-none" style={{ color: '#DC2626' }}>-37%</p>
                      </div>
                    </div>
                  </div>

                  {/* Content - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Urgent Tag */}
                    <div className="inline-block mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-lg" style={{
                          background: '#DC2626',
                          filter: 'blur(10px)',
                          animation: 'pulse 1.5s ease-in-out infinite'
                        }} />
                        <div className="relative px-4 py-2 rounded-lg" style={{
                          background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                          border: '2px solid #FDE047',
                          animation: 'pulse 1.5s ease-in-out infinite'
                        }}>
                          <p className="text-sm font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF'
                          }}>
                            <span className="mr-1">💎</span>
                            <span>แพ็กเกจหรูหรา</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Title - Pattaya Font */}
                    <h3 className="text-6xl md:text-7xl font-black mb-2 leading-none" style={{
                      fontFamily: 'var(--font-pattaya)',
                      color: '#FDE047',
                      textShadow: '4px 4px 0 rgba(0, 0, 0, 0.9), 8px 8px 25px rgba(253, 224, 71, 0.7), 12px 12px 45px rgba(0, 0, 0, 0.9)',
                      letterSpacing: '0.05em'
                    }}>
                      อินเดีย
                    </h3>

                    {/* Subtitle */}
                    <p className="text-base mb-5 font-semibold" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                    }}>
                      ทัชมาฮาล • 7 วัน 5 คืน
                    </p>

                    {/* Price & CTA Row */}
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs mb-1" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          opacity: 0.8
                        }}>
                          <span className="line-through">ราคาเต็ม 68,990.-</span>
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047',
                            textShadow: '0 0 40px rgba(253, 224, 71, 0.9), 4px 4px 15px rgba(0, 0, 0, 0.9)',
                            letterSpacing: '-0.02em'
                          }}>
                            43,490
                          </span>
                          <span className="text-lg font-bold" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF'
                          }}>
                            บาท
                          </span>
                        </div>
                      </div>

                      <button className="px-6 py-3 rounded-xl text-base font-black transition-all hover:scale-105" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        color: '#000000',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 0 35px rgba(253, 224, 71, 0.7), 0 4px 18px rgba(0, 0, 0, 0.5)'
                      }}>
                        จองเลย! →
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[30]</span>
                </div>
              </div>

              {/* Card 31 - Red Intense Dramatic (ธีมแดงเข้มดราม่า) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80"
                    alt="ทัวร์เม็กซิโก"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Red-Black Gradient Overlay - Strong */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(127, 29, 29, 0.90) 0%, rgba(153, 27, 27, 0.70) 30%, rgba(185, 28, 28, 0.45) 55%, rgba(220, 38, 38, 0.20) 75%, transparent 100%)'
                  }} />

                  {/* Gold Shimmer Effect */}
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at bottom right, rgba(251, 191, 36, 0.18) 0%, rgba(252, 211, 77, 0.08) 30%, transparent 60%)'
                  }} />

                  {/* Corner Sticker Badge - Top Right */}
                  <div className="absolute top-0 right-0">
                    <div className="relative w-28 h-28">
                      <div className="absolute inset-0" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                        boxShadow: '0 6px 20px rgba(251, 191, 36, 0.6)'
                      }} />
                      <div className="absolute top-4 right-4 text-center" style={{ transform: 'rotate(45deg)' }}>
                        <p className="text-xs font-black" style={{ color: '#000000' }}>HOT</p>
                        <p className="text-2xl font-black leading-none" style={{ color: '#DC2626' }}>-43%</p>
                      </div>
                    </div>
                  </div>

                  {/* Content - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Urgent Tag */}
                    <div className="inline-block mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-lg" style={{
                          background: '#DC2626',
                          filter: 'blur(10px)',
                          animation: 'pulse 1.5s ease-in-out infinite'
                        }} />
                        <div className="relative px-4 py-2 rounded-lg" style={{
                          background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                          border: '2px solid #FDE047',
                          animation: 'pulse 1.5s ease-in-out infinite'
                        }}>
                          <p className="text-sm font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF'
                          }}>
                            <span className="mr-1">🎊</span>
                            <span>เหลือ 4 ที่สุดท้าย!</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Title - Sriracha Font */}
                    <h3 className="text-6xl md:text-7xl font-black mb-2 leading-none" style={{
                      fontFamily: 'var(--font-sriracha)',
                      color: '#FFFFFF',
                      textShadow: '4px 4px 0 rgba(220, 38, 38, 0.8), 8px 8px 0 rgba(153, 27, 27, 0.6), 12px 12px 40px rgba(0, 0, 0, 0.9)',
                      letterSpacing: '0.03em'
                    }}>
                      เม็กซิโก
                    </h3>

                    {/* Subtitle */}
                    <p className="text-base mb-5 font-semibold" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FDE047',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                    }}>
                      แคนคูน • 8 วัน 6 คืน
                    </p>

                    {/* Price & CTA Row */}
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs mb-1" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          opacity: 0.8
                        }}>
                          <span className="line-through">ราคาเต็ม 98,990.-</span>
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047',
                            textShadow: '0 0 40px rgba(253, 224, 71, 0.9), 4px 4px 15px rgba(0, 0, 0, 0.9)',
                            letterSpacing: '-0.02em'
                          }}>
                            56,390
                          </span>
                          <span className="text-lg font-bold" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF'
                          }}>
                            บาท
                          </span>
                        </div>
                      </div>

                      <button className="px-6 py-3 rounded-xl text-base font-black transition-all hover:scale-105" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        color: '#000000',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 0 35px rgba(253, 224, 71, 0.7), 0 4px 18px rgba(0, 0, 0, 0.5)'
                      }}>
                        จองเลย! →
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[31]</span>
                </div>
              </div>

              {/* Card 32 - Horizontal Split Left-Right (แบ่งครึ่งซ้าย-ขวา) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden flex">
                  {/* Left Side - Image (50%) */}
                  <div className="w-1/2 relative">
                    <img
                      src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80"
                      alt="ทัวร์สวีเดน"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Dark overlay on image */}
                    <div className="absolute inset-0" style={{
                      background: 'linear-gradient(to right, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%)'
                    }} />

                    {/* Discount Badge on Image - Top Left */}
                    <div className="absolute top-4 left-4">
                      <div className="relative">
                        <div className="px-4 py-2 rounded-lg" style={{
                          background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                          boxShadow: '0 4px 15px rgba(253, 224, 71, 0.5)'
                        }}>
                          <p className="text-2xl font-black leading-none" style={{ color: '#DC2626' }}>-38%</p>
                          <p className="text-xs font-black" style={{ color: '#000000' }}>OFF</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Content (50%) - Solid Black Background */}
                  <div className="w-1/2 relative flex flex-col justify-between p-5" style={{
                    background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)'
                  }}>
                    {/* Gold Accent Border on left edge */}
                    <div className="absolute left-0 top-0 bottom-0 w-1" style={{
                      background: 'linear-gradient(to bottom, #FDE047 0%, #FBBF24 50%, #FDE047 100%)',
                      boxShadow: '0 0 20px rgba(253, 224, 71, 0.6)'
                    }} />

                    {/* Top Section */}
                    <div>
                      {/* Small badge */}
                      <div className="inline-block mb-3 px-3 py-1 rounded-md" style={{
                        background: 'rgba(220, 38, 38, 0.2)',
                        border: '1px solid #DC2626'
                      }}>
                        <p className="text-xs font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FDE047'
                        }}>
                          ❄️ WINTER SPECIAL
                        </p>
                      </div>

                      {/* Destination Title - Vertical Emphasis */}
                      <h3 className="text-5xl md:text-6xl font-black mb-2 leading-tight" style={{
                        fontFamily: 'var(--font-charm)',
                        color: '#FDE047',
                        textShadow: '3px 3px 0 rgba(220, 38, 38, 0.3), 0 0 30px rgba(253, 224, 71, 0.5)',
                        letterSpacing: '0.05em'
                      }}>
                        สวีเดน
                      </h3>

                      <p className="text-sm font-semibold mb-4" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        opacity: 0.9
                      }}>
                        สตอกโฮล์ม<br />7 วัน 5 คืน
                      </p>

                      {/* Decorative gold line */}
                      <div className="w-16 h-1 mb-4" style={{
                        background: 'linear-gradient(to right, #FDE047, transparent)',
                        boxShadow: '0 0 10px rgba(253, 224, 71, 0.5)'
                      }} />
                    </div>

                    {/* Bottom Section - Price */}
                    <div>
                      <p className="text-xs mb-1" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        opacity: 0.6
                      }}>
                        <span className="line-through">฿125,000</span>
                      </p>
                      <div className="mb-3">
                        <span className="text-4xl font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FDE047',
                          textShadow: '0 0 25px rgba(253, 224, 71, 0.8)',
                          letterSpacing: '-0.02em'
                        }}>
                          ฿77,500
                        </span>
                      </div>

                      <button className="w-full py-2.5 rounded-lg text-sm font-black transition-all hover:scale-105" style={{
                        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                        color: '#FDE047',
                        fontFamily: 'Kanit, sans-serif',
                        border: '2px solid #FDE047',
                        boxShadow: '0 4px 15px rgba(220, 38, 38, 0.4)'
                      }}>
                        จองทันที →
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[32]</span>
                </div>
              </div>

              {/* Card 33 - Centered Circle Frame (วงกลมกลางการ์ด) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden" style={{
                  background: 'linear-gradient(135deg, #DC2626 0%, #7F1D1D 100%)'
                }}>
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80"
                    alt="ทัวร์ดูไบ"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                  />

                  {/* Red Radial Gradient Overlay */}
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(circle at center, transparent 0%, transparent 35%, rgba(127, 29, 29, 0.8) 60%, rgba(0, 0, 0, 0.95) 100%)'
                  }} />

                  {/* Main Content - Centered */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Circular Content Container */}
                    <div className="relative flex flex-col items-center text-center">
                      {/* Rotating Gold Ring Behind */}
                      <div className="absolute inset-0 flex items-center justify-center" style={{
                        width: '280px',
                        height: '280px',
                        margin: 'auto'
                      }}>
                        <div className="animate-spin-slow" style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          border: '4px dashed #FDE047',
                          opacity: 0.4
                        }} />
                      </div>

                      {/* Inner Circle - Gold Border */}
                      <div className="relative rounded-full p-1" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 50%, #FDE047 100%)',
                        boxShadow: '0 0 50px rgba(253, 224, 71, 0.6), inset 0 0 30px rgba(0, 0, 0, 0.3)'
                      }}>
                        <div className="rounded-full p-8" style={{
                          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
                          width: '240px',
                          height: '240px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                          {/* Discount Badge on top */}
                          <div className="mb-2 px-3 py-1 rounded-full" style={{
                            background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                            border: '2px solid #FDE047'
                          }}>
                            <p className="text-lg font-black" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FDE047'
                            }}>
                              -41% OFF
                            </p>
                          </div>

                          {/* Destination */}
                          <h3 className="text-5xl font-black mb-1 leading-none" style={{
                            fontFamily: 'var(--font-pattaya)',
                            color: '#FDE047',
                            textShadow: '0 0 30px rgba(253, 224, 71, 0.8), 3px 3px 0 rgba(220, 38, 38, 0.5)',
                            letterSpacing: '0.05em'
                          }}>
                            ดูไบ
                          </h3>

                          <p className="text-xs font-semibold mb-3" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            opacity: 0.8
                          }}>
                            6 วัน 4 คืน
                          </p>

                          {/* Gold divider */}
                          <div className="w-12 h-0.5 mb-3" style={{
                            background: 'linear-gradient(to right, transparent, #FDE047, transparent)'
                          }} />

                          {/* Price */}
                          <p className="text-xs mb-1" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            opacity: 0.5
                          }}>
                            <span className="line-through">฿89,900</span>
                          </p>
                          <p className="text-3xl font-black mb-2" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047',
                            textShadow: '0 0 20px rgba(253, 224, 71, 0.8)',
                            letterSpacing: '-0.02em'
                          }}>
                            ฿53,041
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom CTA Button */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <button className="w-full py-3 rounded-xl text-base font-black transition-all hover:scale-105" style={{
                      background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                      color: '#000000',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 0 35px rgba(253, 224, 71, 0.7), 0 4px 18px rgba(0, 0, 0, 0.5)'
                    }}>
                      🔥 จองด่วน! เหลือน้อย
                    </button>
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1 rounded-full" style={{
                      background: 'rgba(0, 0, 0, 0.8)',
                      border: '2px solid #FDE047'
                    }}>
                      <p className="text-xs font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FDE047'
                      }}>
                        ⭐ เมืองแห่งทองคำ
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[33]</span>
                </div>
              </div>

              {/* Card 34 - Diagonal Cut Design (แบ่งเฉียงทแยงมุม) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Top Triangle Section - Image */}
                  <div className="absolute inset-0" style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 65%, 0 45%)'
                  }}>
                    <img
                      src="https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800&q=80"
                      alt="ทัวร์โมร็อกโก"
                      className="w-full h-full object-cover"
                    />
                    {/* Dark overlay on image */}
                    <div className="absolute inset-0" style={{
                      background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.7) 100%)'
                    }} />

                    {/* Discount Badge on Image */}
                    <div className="absolute top-5 right-5">
                      <div className="w-16 h-16 rounded-full flex flex-col items-center justify-center" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        boxShadow: '0 6px 20px rgba(253, 224, 71, 0.6)',
                        border: '3px solid #FFFFFF'
                      }}>
                        <p className="text-xs font-black leading-none" style={{ color: '#000000' }}>SAVE</p>
                        <p className="text-xl font-black leading-none" style={{ color: '#DC2626' }}>35%</p>
                      </div>
                    </div>

                    {/* Title on Image */}
                    <div className="absolute bottom-4 left-5">
                      <h3 className="text-5xl md:text-6xl font-black leading-none" style={{
                        fontFamily: 'var(--font-chonburi)',
                        color: '#FDE047',
                        textShadow: '3px 3px 0 rgba(0, 0, 0, 0.9), 0 0 40px rgba(253, 224, 71, 0.7)',
                        letterSpacing: '0.03em'
                      }}>
                        โมร็อกโก
                      </h3>
                    </div>
                  </div>

                  {/* Bottom Section - Solid Background */}
                  <div className="absolute inset-0" style={{
                    clipPath: 'polygon(0 45%, 100% 65%, 100% 100%, 0 100%)',
                    background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)'
                  }}>
                    {/* Diagonal Gold Line Separator */}
                    <div className="absolute top-0 left-0 right-0 h-1" style={{
                      background: 'linear-gradient(to right, #FDE047 0%, #FBBF24 50%, #FDE047 100%)',
                      boxShadow: '0 0 20px rgba(253, 224, 71, 0.8)',
                      transform: 'skewY(-3deg)',
                      transformOrigin: 'left'
                    }} />

                    {/* Content in bottom section */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-lg" style={{
                        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                        border: '2px solid #FDE047'
                      }}>
                        <span style={{ fontSize: '14px' }}>👑</span>
                        <p className="text-xs font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FDE047'
                        }}>
                          PREMIUM PACKAGE
                        </p>
                      </div>

                      {/* Subtitle */}
                      <p className="text-base font-semibold mb-4" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        opacity: 0.9
                      }}>
                        มาราเกช • 9 วัน 7 คืน
                      </p>

                      {/* Price Section */}
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xs mb-1" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            opacity: 0.5
                          }}>
                            <span className="line-through">ราคาปกติ ฿115,000</span>
                          </p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FDE047',
                              textShadow: '0 0 35px rgba(253, 224, 71, 0.9)',
                              letterSpacing: '-0.02em'
                            }}>
                              ฿74,750
                            </span>
                          </div>
                        </div>

                        <button className="px-5 py-2.5 rounded-lg text-sm font-black transition-all hover:scale-105" style={{
                          background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                          color: '#000000',
                          fontFamily: 'Kanit, sans-serif',
                          boxShadow: '0 0 30px rgba(253, 224, 71, 0.7), 0 4px 15px rgba(0, 0, 0, 0.5)'
                        }}>
                          จองเลย →
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Small accent triangles in corners */}
                  <div className="absolute top-0 left-0 w-8 h-8" style={{
                    background: '#DC2626',
                    clipPath: 'polygon(0 0, 100% 0, 0 100%)'
                  }} />
                  <div className="absolute bottom-0 right-0 w-8 h-8" style={{
                    background: '#DC2626',
                    clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
                  }} />
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[34]</span>
                </div>
              </div>

              {/* Card 35 - Top-Bottom Stack (ซ้อนบน-ล่าง) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden flex flex-col">
                  {/* Top Section - Pure Black with Gold Accents (40%) */}
                  <div className="h-[40%] relative p-5 flex flex-col justify-between" style={{
                    background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)'
                  }}>
                    {/* Discount Circle Badge - Top Left */}
                    <div className="absolute -top-3 -left-3">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{
                        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                        border: '4px solid #FDE047',
                        boxShadow: '0 6px 20px rgba(220, 38, 38, 0.5)'
                      }}>
                        <div className="text-center">
                          <p className="text-2xl font-black leading-none" style={{ color: '#FDE047' }}>-42%</p>
                          <p className="text-xs font-black" style={{ color: '#FFFFFF' }}>OFF</p>
                        </div>
                      </div>
                    </div>

                    {/* Title - Right Side */}
                    <div className="ml-auto text-right">
                      <p className="text-xs font-bold mb-1" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FDE047',
                        letterSpacing: '0.1em'
                      }}>
                        ⚡ FLASH DEAL
                      </p>
                      <h3 className="text-4xl font-black leading-none mb-1" style={{
                        fontFamily: 'var(--font-pattaya)',
                        color: '#FDE047',
                        textShadow: '3px 3px 0 rgba(220, 38, 38, 0.5), 0 0 30px rgba(253, 224, 71, 0.5)'
                      }}>
                        ฝรั่งเศส
                      </h3>
                      <p className="text-xs font-semibold" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        opacity: 0.9
                      }}>
                        ปารีส • 8 วัน 6 คืน
                      </p>
                    </div>
                  </div>

                  {/* Bottom Section - Image with Dark Overlay (60%) */}
                  <div className="h-[60%] relative">
                    <img
                      src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80"
                      alt="ทัวร์ปารีส"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Dark gradient from top */}
                    <div className="absolute inset-0" style={{
                      background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.6) 100%)'
                    }} />

                    {/* Price & CTA - Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-end justify-between mb-3">
                        <div>
                          <p className="text-xs mb-1" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            opacity: 0.7
                          }}>
                            <span className="line-through">฿95,000</span>
                          </p>
                          <p className="text-5xl font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047',
                            textShadow: '0 0 40px rgba(253, 224, 71, 0.9)',
                            letterSpacing: '-0.02em'
                          }}>
                            ฿55,100
                          </p>
                        </div>

                        <div className="px-4 py-2 rounded-lg" style={{
                          background: 'rgba(220, 38, 38, 0.9)',
                          border: '2px solid #FDE047'
                        }}>
                          <p className="text-xs font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047'
                          }}>
                            🔥 เหลือ 3 ที่!
                          </p>
                        </div>
                      </div>

                      <button className="w-full py-3 rounded-xl text-base font-black transition-all hover:scale-105" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        color: '#000000',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 0 35px rgba(253, 224, 71, 0.7)'
                      }}>
                        จองทันที →
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[35]</span>
                </div>
              </div>

              {/* Card 36 - Corner Focus (มุมการ์ด) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden" style={{
                  background: '#000000'
                }}>
                  {/* Background Image - Faded */}
                  <img
                    src="https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80"
                    alt="ทัวร์อิตาลี"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                  />

                  {/* Top Left Corner - Large Title Block */}
                  <div className="absolute top-0 left-0 p-6" style={{
                    background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.95) 0%, rgba(153, 27, 27, 0.90) 100%)',
                    clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)',
                    width: '75%',
                    paddingBottom: '120px'
                  }}>
                    <div className="mb-3">
                      <p className="text-xs font-black mb-2" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FDE047',
                        letterSpacing: '0.1em'
                      }}>
                        ✨ LUXURY PACKAGE
                      </p>
                      <h3 className="text-6xl font-black leading-none" style={{
                        fontFamily: 'var(--font-chonburi)',
                        color: '#FFFFFF',
                        textShadow: '4px 4px 0 rgba(0, 0, 0, 0.3), 0 0 40px rgba(253, 224, 71, 0.4)'
                      }}>
                        อิตาลี
                      </h3>
                    </div>
                    <p className="text-sm font-semibold" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FDE047'
                    }}>
                      โรม-เวนิส • 10 วัน 8 คืน
                    </p>
                  </div>

                  {/* Bottom Right Corner - Price & Discount */}
                  <div className="absolute bottom-0 right-0 p-6 text-right" style={{
                    background: 'linear-gradient(225deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.90) 100%)',
                    clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)',
                    width: '70%',
                    paddingTop: '100px'
                  }}>
                    {/* Discount Badge */}
                    <div className="inline-block mb-3 px-4 py-2 rounded-full" style={{
                      background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                      boxShadow: '0 4px 15px rgba(253, 224, 71, 0.5)'
                    }}>
                      <p className="text-lg font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#DC2626'
                      }}>
                        ลด 40%
                      </p>
                    </div>

                    <p className="text-xs mb-1" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      opacity: 0.6
                    }}>
                      <span className="line-through">฿128,000</span>
                    </p>
                    <p className="text-5xl font-black mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FDE047',
                      textShadow: '0 0 35px rgba(253, 224, 71, 0.9)',
                      letterSpacing: '-0.02em'
                    }}>
                      ฿76,800
                    </p>

                    <button className="px-8 py-3 rounded-lg text-sm font-black transition-all hover:scale-105" style={{
                      background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                      color: '#FDE047',
                      fontFamily: 'Kanit, sans-serif',
                      border: '2px solid #FDE047',
                      boxShadow: '0 4px 15px rgba(220, 38, 38, 0.4)'
                    }}>
                      จองเลย! →
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[36]</span>
                </div>
              </div>

              {/* Card 37 - Center Strip Banner (แถบกลาง) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image - Full */}
                  <img
                    src="https://images.unsplash.com/photo-1513415425419-6b19e290d41c?w=800&q=80"
                    alt="ทัวร์ออสเตรีย"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Dark Overlay Top & Bottom */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, transparent 35%, transparent 65%, rgba(0, 0, 0, 0.7) 100%)'
                  }} />

                  {/* Center Horizontal Strip - Gold/Red */}
                  <div className="absolute left-0 right-0 py-6 px-6" style={{
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.98) 50%, rgba(0, 0, 0, 0.95) 100%)',
                    borderTop: '3px solid #FDE047',
                    borderBottom: '3px solid #FDE047',
                    boxShadow: '0 0 40px rgba(253, 224, 71, 0.4), inset 0 0 40px rgba(220, 38, 38, 0.2)'
                  }}>
                    <div className="text-center">
                      {/* Destination */}
                      <h3 className="text-5xl md:text-6xl font-black mb-2 leading-none" style={{
                        fontFamily: 'var(--font-sriracha)',
                        color: '#FDE047',
                        textShadow: '3px 3px 0 rgba(220, 38, 38, 0.6), 0 0 40px rgba(253, 224, 71, 0.8)',
                        letterSpacing: '0.05em'
                      }}>
                        ออสเตรีย
                      </h3>

                      {/* Details */}
                      <p className="text-sm font-semibold mb-3" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF'
                      }}>
                        เวียนนา-ซาลซ์เบิร์ก • 7 วัน 5 คืน
                      </p>

                      {/* Price Row */}
                      <div className="flex items-center justify-center gap-4 mb-3">
                        <div className="px-3 py-1 rounded-md" style={{
                          background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)'
                        }}>
                          <p className="text-xs font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047'
                          }}>
                            -39% OFF
                          </p>
                        </div>

                        <div>
                          <p className="text-xs line-through" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            opacity: 0.6
                          }}>
                            ฿108,000
                          </p>
                        </div>

                        <p className="text-4xl font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FDE047',
                          textShadow: '0 0 30px rgba(253, 224, 71, 0.9)',
                          letterSpacing: '-0.02em'
                        }}>
                          ฿65,880
                        </p>
                      </div>

                      {/* CTA */}
                      <button className="px-8 py-2.5 rounded-full text-sm font-black transition-all hover:scale-105" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        color: '#000000',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 0 30px rgba(253, 224, 71, 0.7)'
                      }}>
                        จองด่วน! →
                      </button>
                    </div>
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1.5 rounded-full" style={{
                      background: 'rgba(220, 38, 38, 0.95)',
                      border: '2px solid #FDE047'
                    }}>
                      <p className="text-xs font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF'
                      }}>
                        🎵 เทศกาลดนตรี
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[37]</span>
                </div>
              </div>

              {/* Card 38 - Zigzag Border (ขอบซิกแซก) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden p-1" style={{
                  background: 'linear-gradient(45deg, #FDE047 0%, #DC2626 25%, #FDE047 50%, #DC2626 75%, #FDE047 100%)',
                  backgroundSize: '40px 40px'
                }}>
                  {/* Inner Container - Black */}
                  <div className="relative w-full h-full rounded-xl overflow-hidden" style={{
                    background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)'
                  }}>
                    {/* Background Image */}
                    <img
                      src="https://images.unsplash.com/photo-1534430453356-0136aa5fec8a?w=800&q=80"
                      alt="ทัวร์เช็ก"
                      className="absolute inset-0 w-full h-full object-cover opacity-30"
                    />

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-between p-6">
                      {/* Top Section */}
                      <div>
                        <div className="inline-block mb-3 px-4 py-2 rounded-lg" style={{
                          background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                          border: '2px solid #FDE047',
                          animation: 'pulse 1.5s ease-in-out infinite'
                        }}>
                          <p className="text-sm font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047'
                          }}>
                            💎 SUPER DEAL -44%
                          </p>
                        </div>

                        <h3 className="text-6xl md:text-7xl font-black mb-2 leading-none" style={{
                          fontFamily: 'var(--font-charm)',
                          color: '#FDE047',
                          textShadow: '4px 4px 0 rgba(220, 38, 38, 0.6), 8px 8px 0 rgba(0, 0, 0, 0.4), 0 0 50px rgba(253, 224, 71, 0.6)',
                          letterSpacing: '0.03em'
                        }}>
                          เช็ก
                        </h3>

                        <p className="text-base font-semibold" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          opacity: 0.9
                        }}>
                          ปราก-เชสกีครุมลอฟ • 8 วัน 6 คืน
                        </p>
                      </div>

                      {/* Bottom Section - Price & CTA */}
                      <div>
                        <div className="flex items-end justify-between mb-4">
                          <div>
                            <p className="text-xs mb-1" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF',
                              opacity: 0.5
                            }}>
                              <span className="line-through">฿92,000</span>
                            </p>
                            <p className="text-5xl font-black" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FDE047',
                              textShadow: '0 0 40px rgba(253, 224, 71, 0.9)',
                              letterSpacing: '-0.02em'
                            }}>
                              ฿51,520
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-xs font-bold mb-1" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#DC2626'
                            }}>
                              เหลือเวลา
                            </p>
                            <div className="px-3 py-1 rounded-md" style={{
                              background: 'rgba(220, 38, 38, 0.2)',
                              border: '1px solid #DC2626'
                            }}>
                              <p className="text-xl font-black" style={{
                                fontFamily: 'Kanit, sans-serif',
                                color: '#FDE047'
                              }}>
                                12:45:32
                              </p>
                            </div>
                          </div>
                        </div>

                        <button className="w-full py-3 rounded-xl text-base font-black transition-all hover:scale-105" style={{
                          background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                          color: '#000000',
                          fontFamily: 'Kanit, sans-serif',
                          boxShadow: '0 0 35px rgba(253, 224, 71, 0.7), 0 4px 18px rgba(0, 0, 0, 0.5)'
                        }}>
                          จองเลย! เหลือน้อย →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[38]</span>
                </div>
              </div>

              {/* Card 39 - Asymmetric Blocks (บล็อกไม่สมมาตร) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden" style={{
                  background: 'linear-gradient(135deg, #DC2626 0%, #7F1D1D 100%)'
                }}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, #000 0px, #000 2px, transparent 2px, transparent 10px)`,
                    backgroundSize: '14px 14px'
                  }} />

                  {/* Image Block - Top Right (Small) */}
                  <div className="absolute top-4 right-4 w-32 h-32 rounded-lg overflow-hidden" style={{
                    border: '3px solid #FDE047',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                  }}>
                    <img
                      src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80"
                      alt="ทัวร์ฮังการี"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content - Left Side */}
                  <div className="relative h-full p-6 flex flex-col justify-between">
                    {/* Title Block - Large Left */}
                    <div className="max-w-[200px]">
                      <div className="inline-block mb-3 px-3 py-1.5 rounded-md" style={{
                        background: 'rgba(0, 0, 0, 0.6)',
                        border: '2px solid #FDE047'
                      }}>
                        <p className="text-xs font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FDE047'
                        }}>
                          🏰 EXCLUSIVE
                        </p>
                      </div>

                      <h3 className="text-6xl font-black mb-2 leading-none" style={{
                        fontFamily: 'var(--font-pattaya)',
                        color: '#FFFFFF',
                        textShadow: '4px 4px 0 rgba(0, 0, 0, 0.5), 0 0 40px rgba(253, 224, 71, 0.5)',
                        letterSpacing: '0.03em'
                      }}>
                        ฮังการี
                      </h3>

                      <p className="text-sm font-semibold mb-4" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FDE047'
                      }}>
                        บูดาเปสต์ • 6 วัน 4 คืน
                      </p>

                      {/* Discount Badge */}
                      <div className="inline-block px-4 py-2 rounded-lg" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        boxShadow: '0 4px 15px rgba(253, 224, 71, 0.5)'
                      }}>
                        <p className="text-2xl font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#DC2626'
                        }}>
                          -36%
                        </p>
                      </div>
                    </div>

                    {/* Bottom Price Block - Wide */}
                    <div>
                      <div className="p-4 rounded-xl mb-3" style={{
                        background: 'rgba(0, 0, 0, 0.8)',
                        border: '2px solid #FDE047'
                      }}>
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-xs mb-1" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF',
                              opacity: 0.6
                            }}>
                              <span className="line-through">฿76,000</span>
                            </p>
                            <p className="text-4xl font-black" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FDE047',
                              textShadow: '0 0 30px rgba(253, 224, 71, 0.9)',
                              letterSpacing: '-0.02em'
                            }}>
                              ฿48,640
                            </p>
                          </div>

                          <button className="px-6 py-2.5 rounded-lg text-sm font-black transition-all hover:scale-105" style={{
                            background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                            color: '#FDE047',
                            fontFamily: 'Kanit, sans-serif',
                            border: '2px solid #FDE047'
                          }}>
                            จอง →
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-center font-bold" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF'
                      }}>
                        ⚡ เหลือ 6 ที่สุดท้าย!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[39]</span>
                </div>
              </div>

              {/* Card 40 - Triple Vertical Strips (3 แถบตั้ง) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden flex">
                  {/* Left Strip - Black (30%) */}
                  <div className="w-[30%] relative p-4 flex flex-col justify-between" style={{
                    background: 'linear-gradient(180deg, #000000 0%, #1a1a1a 100%)'
                  }}>
                    {/* Vertical Title */}
                    <div className="transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
                      <h3 className="text-5xl font-black" style={{
                        fontFamily: 'var(--font-chonburi)',
                        color: '#FDE047',
                        textShadow: '3px 3px 0 rgba(220, 38, 38, 0.5)',
                        letterSpacing: '0.1em'
                      }}>
                        นอร์เวย์
                      </h3>
                    </div>

                    {/* Discount Badge - Rotated */}
                    <div className="transform -rotate-90 origin-bottom-left -mb-8">
                      <div className="inline-block px-3 py-1 rounded-md" style={{
                        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                        border: '2px solid #FDE047'
                      }}>
                        <p className="text-sm font-black whitespace-nowrap" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FDE047'
                        }}>
                          -45% OFF
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Center Strip - Image (50%) */}
                  <div className="w-[50%] relative">
                    <img
                      src="https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80"
                      alt="ทัวร์นอร์เวย์"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0" style={{
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 50%, rgba(0,0,0,0.5) 100%)'
                    }} />

                    {/* Center Content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center px-4">
                        <div className="inline-block px-4 py-1.5 rounded-full mb-2" style={{
                          background: 'rgba(0, 0, 0, 0.8)',
                          border: '2px solid #FDE047'
                        }}>
                          <p className="text-xs font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047'
                          }}>
                            🏔️ FJORD CRUISE
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Strip - Red/Black (20%) */}
                  <div className="w-[20%] relative flex flex-col justify-end p-3" style={{
                    background: 'linear-gradient(180deg, #DC2626 0%, #7F1D1D 100%)'
                  }}>
                    {/* Price - Vertical */}
                    <div className="text-center mb-4">
                      <p className="text-xs mb-1 line-through" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        opacity: 0.7
                      }}>
                        98K
                      </p>
                      <p className="text-3xl font-black leading-none" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FDE047',
                        textShadow: '0 0 20px rgba(253, 224, 71, 0.8)',
                        letterSpacing: '-0.05em'
                      }}>
                        53,900
                      </p>
                      <p className="text-xs font-bold" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF'
                      }}>
                        บาท
                      </p>
                    </div>

                    {/* CTA Button - Vertical Text */}
                    <button className="w-full py-4 rounded-lg text-xs font-black transform transition-all hover:scale-105" style={{
                      background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                      color: '#000000',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 4px 15px rgba(253, 224, 71, 0.5)'
                    }}>
                      จอง!
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[40]</span>
                </div>
              </div>

              {/* Card 41 - Hexagon Overlay (หกเหลี่ยม) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden" style={{
                  background: '#000000'
                }}>
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&q=80"
                    alt="ทัวร์โปรตุเกส"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                  />

                  {/* Hexagon Center Cutout for Main Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative" style={{ width: '280px', height: '280px' }}>
                      {/* Hexagon Shape with Gold Border */}
                      <div className="absolute inset-0" style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.95) 0%, rgba(127, 29, 29, 0.95) 100%)',
                        border: '4px solid #FDE047',
                        boxShadow: '0 0 50px rgba(253, 224, 71, 0.5), inset 0 0 50px rgba(0, 0, 0, 0.3)'
                      }}>
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                          {/* Badge */}
                          <div className="mb-3 px-3 py-1 rounded-full" style={{
                            background: 'rgba(0, 0, 0, 0.6)',
                            border: '2px solid #FDE047'
                          }}>
                            <p className="text-xs font-black" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FDE047'
                            }}>
                              ⭐ PREMIUM
                            </p>
                          </div>

                          {/* Title */}
                          <h3 className="text-5xl font-black mb-2 leading-none" style={{
                            fontFamily: 'var(--font-pattaya)',
                            color: '#FFFFFF',
                            textShadow: '3px 3px 0 rgba(0, 0, 0, 0.5), 0 0 30px rgba(253, 224, 71, 0.5)'
                          }}>
                            โปรตุเกส
                          </h3>

                          <p className="text-xs mb-3 font-semibold" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047'
                          }}>
                            ลิสบอน-ปอร์โต • 9 วัน 7 คืน
                          </p>

                          {/* Divider */}
                          <div className="w-16 h-0.5 mb-3" style={{
                            background: 'linear-gradient(to right, transparent, #FDE047, transparent)'
                          }} />

                          {/* Price */}
                          <p className="text-xs line-through mb-1" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            opacity: 0.6
                          }}>
                            ฿118,000
                          </p>
                          <p className="text-4xl font-black mb-3" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047',
                            textShadow: '0 0 30px rgba(253, 224, 71, 0.9)',
                            letterSpacing: '-0.02em'
                          }}>
                            ฿70,800
                          </p>

                          {/* CTA */}
                          <button className="px-6 py-2 rounded-full text-xs font-black transition-all hover:scale-105" style={{
                            background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                            color: '#000000',
                            fontFamily: 'Kanit, sans-serif',
                            boxShadow: '0 0 20px rgba(253, 224, 71, 0.6)'
                          }}>
                            จองเลย! →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Discount Badge - Top Right */}
                  <div className="absolute top-4 right-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{
                      background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                      border: '3px solid #DC2626',
                      boxShadow: '0 4px 15px rgba(253, 224, 71, 0.5)'
                    }}>
                      <div className="text-center">
                        <p className="text-xl font-black leading-none" style={{ color: '#DC2626' }}>-40%</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[41]</span>
                </div>
              </div>

              {/* Card 42 - L-Shape Design (รูป L) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&q=80"
                    alt="ทัวร์โครเอเชีย"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%)'
                  }} />

                  {/* L-Shape Gold Border Overlay */}
                  <div className="absolute top-0 left-0 right-1/3 bottom-0" style={{
                    borderRight: '4px solid #FDE047',
                    boxShadow: '4px 0 20px rgba(253, 224, 71, 0.3)'
                  }} />
                  <div className="absolute bottom-0 left-0 right-0 top-2/3" style={{
                    borderTop: '4px solid #FDE047',
                    boxShadow: '0 -4px 20px rgba(253, 224, 71, 0.3)'
                  }} />

                  {/* Top Left Content Block */}
                  <div className="absolute top-6 left-6" style={{ maxWidth: '55%' }}>
                    <div className="inline-block mb-3 px-3 py-1.5 rounded-md" style={{
                      background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                      border: '2px solid #FDE047'
                    }}>
                      <p className="text-xs font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FDE047'
                      }}>
                        🌊 ADRIATIC SEA
                      </p>
                    </div>

                    <h3 className="text-6xl font-black mb-2 leading-none" style={{
                      fontFamily: 'var(--font-sriracha)',
                      color: '#FDE047',
                      textShadow: '4px 4px 0 rgba(220, 38, 38, 0.6), 0 0 40px rgba(253, 224, 71, 0.6)',
                      letterSpacing: '0.03em'
                    }}>
                      โครเอเชีย
                    </h3>

                    <p className="text-sm font-semibold" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF'
                    }}>
                      ดูบรอฟนิก-ซาเกร็บ
                    </p>
                  </div>

                  {/* Bottom Right Content Block */}
                  <div className="absolute bottom-6 right-6 text-right">
                    {/* Discount */}
                    <div className="inline-block mb-3 px-4 py-2 rounded-lg" style={{
                      background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                      boxShadow: '0 4px 15px rgba(253, 224, 71, 0.5)'
                    }}>
                      <p className="text-2xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#DC2626'
                      }}>
                        ประหยัด 43%
                      </p>
                    </div>

                    <p className="text-xs mb-1 line-through" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      opacity: 0.6
                    }}>
                      ฿102,000
                    </p>
                    <p className="text-5xl font-black mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FDE047',
                      textShadow: '0 0 40px rgba(253, 224, 71, 0.9)',
                      letterSpacing: '-0.02em'
                    }}>
                      ฿58,140
                    </p>

                    <button className="px-8 py-3 rounded-xl text-sm font-black transition-all hover:scale-105" style={{
                      background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                      color: '#FDE047',
                      fontFamily: 'Kanit, sans-serif',
                      border: '2px solid #FDE047',
                      boxShadow: '0 4px 15px rgba(220, 38, 38, 0.4)'
                    }}>
                      จองทันที →
                    </button>
                  </div>

                  {/* Badge Center */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="px-4 py-2 rounded-full" style={{
                      background: 'rgba(0, 0, 0, 0.9)',
                      border: '3px solid #FDE047',
                      boxShadow: '0 0 30px rgba(253, 224, 71, 0.5)'
                    }}>
                      <p className="text-xs font-black whitespace-nowrap" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FDE047'
                      }}>
                        ⚡ 8 วัน 6 คืน
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[42]</span>
                </div>
              </div>

              {/* Card 43 - Radial Burst (แผ่รัศมี) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden" style={{
                  background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)'
                }}>
                  {/* Radial Lines Pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      repeating-conic-gradient(
                        from 0deg at 50% 50%,
                        transparent 0deg,
                        rgba(253, 224, 71, 0.1) 5deg,
                        transparent 10deg
                      )
                    `
                  }} />

                  {/* Red Radial Glow from Center */}
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(circle at center, rgba(220, 38, 38, 0.3) 0%, transparent 60%)'
                  }} />

                  {/* Small Image Circle - Top Right */}
                  <div className="absolute top-8 right-8 w-24 h-24 rounded-full overflow-hidden" style={{
                    border: '4px solid #FDE047',
                    boxShadow: '0 6px 20px rgba(253, 224, 71, 0.5)'
                  }}>
                    <img
                      src="https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=800&q=80"
                      alt="ทัวร์สเปน"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Main Content - Center */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    {/* Rotating Badge */}
                    <div className="mb-4 animate-spin-slow">
                      <div className="w-28 h-28 rounded-full flex items-center justify-center" style={{
                        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                        border: '4px solid #FDE047',
                        boxShadow: '0 0 40px rgba(220, 38, 38, 0.6)'
                      }}>
                        <div className="text-center">
                          <p className="text-xs font-black" style={{ color: '#FFFFFF' }}>HOT DEAL</p>
                          <p className="text-3xl font-black leading-none" style={{ color: '#FDE047' }}>-38%</p>
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-7xl font-black mb-3 leading-none" style={{
                      fontFamily: 'var(--font-charm)',
                      color: '#FDE047',
                      textShadow: '4px 4px 0 rgba(220, 38, 38, 0.6), 8px 8px 0 rgba(0, 0, 0, 0.4), 0 0 60px rgba(253, 224, 71, 0.8)',
                      letterSpacing: '0.05em'
                    }}>
                      สเปน
                    </h3>

                    <p className="text-sm font-semibold mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF'
                    }}>
                      บาร์เซโลนา-มาดริด • 9 วัน 7 คืน
                    </p>

                    {/* Price Bar */}
                    <div className="px-6 py-3 rounded-full mb-4" style={{
                      background: 'rgba(220, 38, 38, 0.3)',
                      border: '2px solid #FDE047',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <div className="flex items-center gap-3">
                        <p className="text-xs line-through" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          opacity: 0.6
                        }}>
                          ฿112,000
                        </p>
                        <p className="text-4xl font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FDE047',
                          textShadow: '0 0 30px rgba(253, 224, 71, 0.9)',
                          letterSpacing: '-0.02em'
                        }}>
                          ฿69,440
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <button className="px-10 py-3 rounded-full text-base font-black transition-all hover:scale-105" style={{
                      background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                      color: '#000000',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 0 40px rgba(253, 224, 71, 0.7), 0 4px 18px rgba(0, 0, 0, 0.5)'
                    }}>
                      จองด่วน! →
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[43]</span>
                </div>
              </div>

              {/* Card 44 - Wave Pattern (ลายคลื่น) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=800&q=80"
                    alt="ทัวร์โปแลนด์"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Wave Shape Overlay - Top (Red) */}
                  <div className="absolute top-0 left-0 right-0" style={{
                    height: '45%',
                    background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.95) 0%, rgba(153, 27, 27, 0.95) 100%)',
                    clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)'
                  }}>
                    {/* Content in Top Wave */}
                    <div className="p-6">
                      <div className="inline-block mb-3 px-4 py-1.5 rounded-full" style={{
                        background: 'rgba(0, 0, 0, 0.6)',
                        border: '2px solid #FDE047'
                      }}>
                        <p className="text-xs font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FDE047'
                        }}>
                          🏰 HISTORIC TOUR
                        </p>
                      </div>

                      <h3 className="text-6xl font-black mb-2 leading-none" style={{
                        fontFamily: 'var(--font-pattaya)',
                        color: '#FFFFFF',
                        textShadow: '4px 4px 0 rgba(0, 0, 0, 0.4), 0 0 30px rgba(253, 224, 71, 0.4)',
                        letterSpacing: '0.03em'
                      }}>
                        โปแลนด์
                      </h3>

                      <p className="text-sm font-semibold" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FDE047'
                      }}>
                        วอร์ซอ-คราคูฟ • 7 วัน 5 คืน
                      </p>
                    </div>
                  </div>

                  {/* Wave Shape Overlay - Bottom (Black) */}
                  <div className="absolute bottom-0 left-0 right-0" style={{
                    height: '50%',
                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%)',
                    clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 100%)'
                  }}>
                    {/* Content in Bottom Wave */}
                    <div className="absolute bottom-6 left-6 right-6">
                      {/* Discount Badge Row */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="px-4 py-2 rounded-lg" style={{
                          background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                          boxShadow: '0 4px 15px rgba(253, 224, 71, 0.5)'
                        }}>
                          <p className="text-2xl font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#DC2626'
                          }}>
                            -37%
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs mb-1 line-through" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            opacity: 0.5
                          }}>
                            ฿88,000
                          </p>
                          <p className="text-4xl font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047',
                            textShadow: '0 0 35px rgba(253, 224, 71, 0.9)',
                            letterSpacing: '-0.02em'
                          }}>
                            ฿55,440
                          </p>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button className="w-full py-3 rounded-xl text-base font-black transition-all hover:scale-105" style={{
                        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                        color: '#FDE047',
                        fontFamily: 'Kanit, sans-serif',
                        border: '2px solid #FDE047',
                        boxShadow: '0 4px 15px rgba(220, 38, 38, 0.5)'
                      }}>
                        จองเลย! →
                      </button>
                    </div>
                  </div>

                  {/* Floating Badge - Center Overlap */}
                  <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '43%' }}>
                    <div className="px-5 py-2 rounded-full" style={{
                      background: 'rgba(253, 224, 71, 1)',
                      border: '3px solid #DC2626',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)'
                    }}>
                      <p className="text-xs font-black whitespace-nowrap" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#000000'
                      }}>
                        ⚡ เหลือ 5 ที่!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[44]</span>
                </div>
              </div>

              {/* Card 45 - Diamond/Rhombus Shape (รูปข้าวหลามตัด) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden" style={{
                  background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)'
                }}>
                  {/* Gold Grid Pattern Background */}
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `
                      repeating-linear-gradient(0deg, #FDE047 0px, transparent 1px, transparent 20px),
                      repeating-linear-gradient(90deg, #FDE047 0px, transparent 1px, transparent 20px)
                    `,
                    backgroundSize: '20px 20px'
                  }} />

                  {/* Diamond Frame - Rotated 45deg */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="relative transform rotate-45 w-[280px] h-[280px]" style={{
                      background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                      border: '4px solid #FDE047',
                      boxShadow: '0 0 60px rgba(253, 224, 71, 0.5), inset 0 0 60px rgba(0, 0, 0, 0.3)'
                    }}>
                      {/* Image Inside Diamond - Counter-rotate */}
                      <div className="absolute inset-2 transform -rotate-45 overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&q=80"
                          alt="ทัวร์อังกฤษ"
                          className="w-full h-full object-cover"
                        />

                        {/* Content Overlay Inside Diamond */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{
                          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.95) 100%)'
                        }}>
                          <h3 className="text-5xl font-black mb-2 leading-none text-center" style={{
                            fontFamily: 'var(--font-chonburi)',
                            color: '#FDE047',
                            textShadow: '3px 3px 0 rgba(220, 38, 38, 0.7), 0 0 40px rgba(253, 224, 71, 0.6)',
                            letterSpacing: '0.05em'
                          }}>
                            อังกฤษ
                          </h3>

                          <p className="text-xs font-semibold mb-3 text-center" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF'
                          }}>
                            ลอนดอน-ออกซ์ฟอร์ด
                          </p>

                          {/* Discount Badge */}
                          <div className="px-4 py-2 rounded-lg mb-2" style={{
                            background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                            boxShadow: '0 4px 15px rgba(253, 224, 71, 0.6)'
                          }}>
                            <p className="text-2xl font-black" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#DC2626'
                            }}>
                              -41%
                            </p>
                          </div>

                          <p className="text-2xl font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047',
                            textShadow: '0 0 30px rgba(253, 224, 71, 1)'
                          }}>
                            ฿52,340
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Corner Labels - Outside Diamond */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-md" style={{
                    background: 'rgba(220, 38, 38, 0.9)',
                    border: '2px solid #FDE047'
                  }}>
                    <p className="text-xs font-black" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FDE047'
                    }}>
                      🏰 PREMIUM
                    </p>
                  </div>

                  <div className="absolute top-4 right-4 px-3 py-1 rounded-md" style={{
                    background: 'rgba(253, 224, 71, 1)',
                    border: '2px solid #000000'
                  }}>
                    <p className="text-xs font-black" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#000000'
                    }}>
                      7D5N
                    </p>
                  </div>

                  {/* Bottom CTA */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <button className="w-full py-3 rounded-xl text-sm font-black transition-all hover:scale-105" style={{
                      background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                      color: '#FDE047',
                      fontFamily: 'Kanit, sans-serif',
                      border: '2px solid #FDE047',
                      boxShadow: '0 4px 20px rgba(220, 38, 38, 0.6)'
                    }}>
                      จองเลย! →
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[45]</span>
                </div>
              </div>

              {/* Card 46 - Concentric Rectangles (กรอบซ้อนกัน) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden p-4" style={{
                  background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)'
                }}>
                  {/* Second Rectangle - Red */}
                  <div className="absolute inset-6 rounded-xl" style={{
                    background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                    border: '3px solid #000000'
                  }}>
                    {/* Third Rectangle - Black */}
                    <div className="absolute inset-6 rounded-lg" style={{
                      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
                      border: '3px solid #FDE047'
                    }}>
                      {/* Fourth Rectangle - White (Image Container) */}
                      <div className="absolute inset-6 rounded-md overflow-hidden" style={{
                        border: '3px solid #DC2626'
                      }}>
                        <img
                          src="https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&q=80"
                          alt="ทัวร์เยอรมนี"
                          className="w-full h-full object-cover"
                        />

                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{
                          background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.9) 100%)'
                        }}>
                          {/* Discount Badge - Top */}
                          <div className="mb-3 px-5 py-2.5 rounded-full animate-pulse" style={{
                            background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                            border: '3px solid #DC2626',
                            boxShadow: '0 6px 25px rgba(253, 224, 71, 0.8)'
                          }}>
                            <p className="text-3xl font-black" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#DC2626'
                            }}>
                              -42%
                            </p>
                          </div>

                          <h3 className="text-6xl font-black mb-2 leading-none text-center" style={{
                            fontFamily: 'var(--font-sriracha)',
                            color: '#FFFFFF',
                            textShadow: '4px 4px 0 rgba(220, 38, 38, 0.8), 0 0 50px rgba(253, 224, 71, 0.5)',
                            letterSpacing: '0.05em'
                          }}>
                            เยอรมนี
                          </h3>

                          <p className="text-sm font-semibold mb-4 text-center" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047'
                          }}>
                            เบอร์ลิน-มิวนิค • 8 วัน 6 คืน
                          </p>

                          {/* Price Box */}
                          <div className="px-6 py-3 rounded-lg" style={{
                            background: 'rgba(0, 0, 0, 0.9)',
                            border: '2px solid #FDE047'
                          }}>
                            <p className="text-xs mb-1 line-through text-center" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF',
                              opacity: 0.5
                            }}>
                              ฿95,000
                            </p>
                            <p className="text-4xl font-black text-center" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FDE047',
                              textShadow: '0 0 35px rgba(253, 224, 71, 1)',
                              letterSpacing: '-0.02em'
                            }}>
                              ฿55,100
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Label - Top Left Corner Outside All Frames */}
                  <div className="absolute top-6 left-6 px-3 py-1.5 rounded-md z-10" style={{
                    background: 'rgba(0, 0, 0, 0.9)',
                    border: '2px solid #FDE047'
                  }}>
                    <p className="text-xs font-black" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FDE047'
                    }}>
                      🎯 HOT DEAL
                    </p>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[46]</span>
                </div>
              </div>

              {/* Card 47 - Grid Split (4 Quadrants - แบ่ง 4 ส่วน) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden grid grid-cols-2 grid-rows-2 gap-1" style={{
                  background: '#FDE047'
                }}>
                  {/* Top Left - Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=800&q=80"
                      alt="ทัวร์สเปน"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Top Right - Title & Discount */}
                  <div className="relative p-5 flex flex-col justify-center" style={{
                    background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)'
                  }}>
                    <div className="mb-3 px-3 py-2 rounded-lg inline-block" style={{
                      background: 'rgba(253, 224, 71, 1)',
                      border: '2px solid #000000'
                    }}>
                      <p className="text-3xl font-black leading-none" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#DC2626'
                      }}>
                        -39%
                      </p>
                    </div>

                    <h3 className="text-5xl font-black leading-none mb-2" style={{
                      fontFamily: 'var(--font-charm)',
                      color: '#FFFFFF',
                      textShadow: '3px 3px 0 rgba(0, 0, 0, 0.5)',
                      letterSpacing: '0.03em'
                    }}>
                      สเปน
                    </h3>

                    <p className="text-xs font-semibold" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FDE047'
                    }}>
                      บาร์เซโลนา-มาดริด
                    </p>
                  </div>

                  {/* Bottom Left - Price */}
                  <div className="relative p-5 flex flex-col justify-center items-center" style={{
                    background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)'
                  }}>
                    <p className="text-xs mb-1 font-bold" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      opacity: 0.6
                    }}>
                      เริ่มต้น
                    </p>
                    <p className="text-4xl font-black mb-1" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FDE047',
                      textShadow: '0 0 30px rgba(253, 224, 71, 0.9)',
                      letterSpacing: '-0.03em'
                    }}>
                      ฿48,790
                    </p>
                    <p className="text-xs line-through" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      opacity: 0.4
                    }}>
                      ฿80,000
                    </p>
                  </div>

                  {/* Bottom Right - CTA & Details */}
                  <div className="relative p-5 flex flex-col justify-center" style={{
                    background: 'linear-gradient(135deg, #FBBF24 0%, #FDE047 100%)'
                  }}>
                    <p className="text-sm font-black mb-3 text-center" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#000000'
                    }}>
                      🔥 7 วัน 5 คืน
                    </p>

                    <button className="w-full py-2.5 rounded-lg text-sm font-black transition-all hover:scale-105" style={{
                      background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                      color: '#FDE047',
                      fontFamily: 'Kanit, sans-serif',
                      border: '2px solid #000000',
                      boxShadow: '0 4px 15px rgba(220, 38, 38, 0.5)'
                    }}>
                      จองเลย →
                    </button>

                    <p className="text-xs font-bold mt-2 text-center" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#DC2626'
                    }}>
                      ⚡ เหลือ 8 ที่!
                    </p>
                  </div>

                  {/* Center Cross - Gold Divider */}
                  <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2" style={{
                    background: 'linear-gradient(90deg, #FDE047 0%, #FBBF24 50%, #FDE047 100%)',
                    boxShadow: '0 0 15px rgba(253, 224, 71, 0.8)'
                  }} />
                  <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2" style={{
                    background: 'linear-gradient(180deg, #FDE047 0%, #FBBF24 50%, #FDE047 100%)',
                    boxShadow: '0 0 15px rgba(253, 224, 71, 0.8)'
                  }} />
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[47]</span>
                </div>
              </div>

              {/* Card 48 - Chevron/Arrow Pattern (ลายลูกศรซิกแซก) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden" style={{
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)'
                }}>
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&q=80"
                    alt="ทัวร์ออสเตรีย"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                  />

                  {/* Chevron Arrow 1 - Top */}
                  <div className="absolute top-0 left-0 right-0" style={{
                    height: '35%',
                    background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.95) 0%, rgba(153, 27, 27, 0.95) 100%)',
                    clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)'
                  }}>
                    <div className="p-5">
                      <div className="inline-block mb-2 px-3 py-1 rounded-md" style={{
                        background: 'rgba(253, 224, 71, 1)',
                        border: '2px solid #000000'
                      }}>
                        <p className="text-xs font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#DC2626'
                        }}>
                          🎻 CULTURAL
                        </p>
                      </div>

                      <h3 className="text-5xl font-black leading-none" style={{
                        fontFamily: 'var(--font-pattaya)',
                        color: '#FDE047',
                        textShadow: '3px 3px 0 rgba(0, 0, 0, 0.5)',
                        letterSpacing: '0.05em'
                      }}>
                        ออสเตรีย
                      </h3>
                    </div>
                  </div>

                  {/* Chevron Arrow 2 - Middle */}
                  <div className="absolute" style={{
                    top: '30%',
                    left: '0',
                    right: '0',
                    height: '30%',
                    background: 'linear-gradient(135deg, rgba(253, 224, 71, 0.95) 0%, rgba(251, 191, 36, 0.95) 100%)',
                    clipPath: 'polygon(15% 0, 100% 0, 70% 100%, 0 100%)'
                  }}>
                    <div className="p-5 pl-16">
                      <p className="text-sm font-semibold mb-2" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#000000'
                      }}>
                        เวียนนา-ซาลส์บูร์ก • 6 วัน 4 คืน
                      </p>

                      <div className="inline-block px-4 py-2 rounded-lg" style={{
                        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                        border: '2px solid #000000'
                      }}>
                        <p className="text-2xl font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FDE047'
                        }}>
                          -40%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Chevron Arrow 3 - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0" style={{
                    height: '38%',
                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%)',
                    clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)'
                  }}>
                    <div className="absolute bottom-5 right-5 left-32">
                      <div className="flex items-end justify-between mb-3">
                        <div>
                          <p className="text-xs mb-1 line-through" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            opacity: 0.5
                          }}>
                            ฿85,000
                          </p>
                          <p className="text-4xl font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047',
                            textShadow: '0 0 35px rgba(253, 224, 71, 1)',
                            letterSpacing: '-0.02em'
                          }}>
                            ฿51,000
                          </p>
                        </div>

                        <button className="px-6 py-2.5 rounded-lg text-sm font-black transition-all hover:scale-105" style={{
                          background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                          color: '#FDE047',
                          fontFamily: 'Kanit, sans-serif',
                          border: '2px solid #FDE047'
                        }}>
                          จอง →
                        </button>
                      </div>

                      <p className="text-xs font-bold text-right" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FDE047'
                      }}>
                        ⚡ จองด่วน!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[48]</span>
                </div>
              </div>

              {/* Card 49 - Spiral Pattern (ลายเกลียวจากใจกลาง) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=800&q=80"
                    alt="ทัวร์โครเอเชีย"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Spiral Gradient Overlay */}
                  <div className="absolute inset-0" style={{
                    background: `
                      radial-gradient(circle at 30% 40%,
                        transparent 0%,
                        transparent 15%,
                        rgba(220, 38, 38, 0.3) 15%,
                        rgba(220, 38, 38, 0.6) 25%,
                        rgba(0, 0, 0, 0.7) 35%,
                        rgba(0, 0, 0, 0.9) 50%,
                        rgba(0, 0, 0, 0.95) 70%
                      )
                    `
                  }} />

                  {/* Rotating Ring - Center */}
                  <div className="absolute" style={{ top: '25%', left: '15%' }}>
                    <div className="relative w-40 h-40">
                      {/* Outer Ring - Rotating */}
                      <div className="absolute inset-0 rounded-full animate-spin-slow" style={{
                        border: '4px solid transparent',
                        borderTopColor: '#FDE047',
                        borderRightColor: '#FDE047',
                        boxShadow: '0 0 30px rgba(253, 224, 71, 0.6)'
                      }} />

                      {/* Inner Circle */}
                      <div className="absolute inset-4 rounded-full flex items-center justify-center" style={{
                        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                        border: '3px solid #FDE047',
                        boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.5)'
                      }}>
                        <div className="text-center">
                          <p className="text-3xl font-black leading-none" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047'
                          }}>
                            -44%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content - Bottom Right */}
                  <div className="absolute bottom-6 right-6 left-6">
                    <div className="mb-3">
                      <h3 className="text-6xl font-black mb-2 leading-none" style={{
                        fontFamily: 'var(--font-chonburi)',
                        color: '#FFFFFF',
                        textShadow: '4px 4px 0 rgba(220, 38, 38, 0.8), 0 0 40px rgba(253, 224, 71, 0.4)',
                        letterSpacing: '0.05em'
                      }}>
                        โครเอเชีย
                      </h3>

                      <p className="text-sm font-semibold mb-3" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FDE047'
                      }}>
                        ดูบรอฟนิค-สปลิต • 7 วัน 5 คืน
                      </p>

                      {/* Price Bar */}
                      <div className="flex items-end justify-between p-4 rounded-xl mb-3" style={{
                        background: 'rgba(0, 0, 0, 0.9)',
                        border: '2px solid #FDE047',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.7)'
                      }}>
                        <div>
                          <p className="text-xs mb-1 line-through" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            opacity: 0.5
                          }}>
                            ฿92,000
                          </p>
                          <p className="text-4xl font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047',
                            textShadow: '0 0 35px rgba(253, 224, 71, 1)',
                            letterSpacing: '-0.02em'
                          }}>
                            ฿51,520
                          </p>
                        </div>

                        <div className="px-3 py-1.5 rounded-md" style={{
                          background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                          border: '2px solid #FDE047'
                        }}>
                          <p className="text-xs font-black whitespace-nowrap" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047'
                          }}>
                            🌊 SEA VIEW
                          </p>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button className="w-full py-3 rounded-xl text-base font-black transition-all hover:scale-105" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        color: '#000000',
                        fontFamily: 'Kanit, sans-serif',
                        border: '2px solid #DC2626',
                        boxShadow: '0 4px 20px rgba(253, 224, 71, 0.7)'
                      }}>
                        จองเลย! →
                      </button>
                    </div>
                  </div>

                  {/* Top Label */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-md" style={{
                    background: 'rgba(253, 224, 71, 1)',
                    border: '2px solid #DC2626'
                  }}>
                    <p className="text-xs font-black" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#DC2626'
                    }}>
                      ⚡ HOT!
                    </p>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[49]</span>
                </div>
              </div>

              {/* Card 50 - Pentagon/5-sided Polygon (รูปห้าเหลี่ยม) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden" style={{
                  background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)'
                }}>
                  {/* Pentagon Shape - Center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-[320px] h-[320px]">
                      {/* Pentagon with Image */}
                      <div className="absolute inset-0" style={{
                        clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                        border: '4px solid #000000'
                      }}>
                        <img
                          src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80"
                          alt="ทัวร์โรมาเนีย"
                          className="w-full h-full object-cover"
                          style={{
                            clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'
                          }}
                        />

                        {/* Dark Overlay */}
                        <div className="absolute inset-0" style={{
                          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.85) 100%)',
                          clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'
                        }}>
                          {/* Content Inside Pentagon */}
                          <div className="absolute bottom-8 left-8 right-8 text-center">
                            <h3 className="text-5xl font-black mb-2 leading-none" style={{
                              fontFamily: 'var(--font-sriracha)',
                              color: '#FDE047',
                              textShadow: '3px 3px 0 rgba(220, 38, 38, 0.7), 0 0 40px rgba(253, 224, 71, 0.5)',
                              letterSpacing: '0.05em'
                            }}>
                              โรมาเนีย
                            </h3>

                            <p className="text-sm font-semibold mb-3" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF'
                            }}>
                              บูคาเรสต์-เทรนซิลวาเนีย
                            </p>

                            <div className="inline-block px-5 py-2 rounded-lg mb-2" style={{
                              background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                              border: '2px solid #DC2626'
                            }}>
                              <p className="text-2xl font-black" style={{
                                fontFamily: 'Kanit, sans-serif',
                                color: '#DC2626'
                              }}>
                                -43%
                              </p>
                            </div>

                            <p className="text-3xl font-black" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FDE047',
                              textShadow: '0 0 30px rgba(253, 224, 71, 1)'
                            }}>
                              ฿49,020
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top Label */}
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full z-10" style={{
                    background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                    border: '3px solid #000000',
                    boxShadow: '0 4px 15px rgba(220, 38, 38, 0.6)'
                  }}>
                    <p className="text-xs font-black" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FDE047'
                    }}>
                      🏰 CASTLE TOUR
                    </p>
                  </div>

                  {/* Bottom CTA */}
                  <div className="absolute bottom-5 left-6 right-6 z-10">
                    <button className="w-full py-3 rounded-xl text-base font-black transition-all hover:scale-105" style={{
                      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
                      color: '#FDE047',
                      fontFamily: 'Kanit, sans-serif',
                      border: '2px solid #DC2626',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.7)'
                    }}>
                      จองเลย! →
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[50]</span>
                </div>
              </div>

              {/* Card 51 - Circular Rings (วงกลมซ้อนกัน) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden" style={{
                  background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)'
                }}>
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=800&q=80"
                    alt="ทัวร์บัลแกเรีย"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                  />

                  {/* Large Outer Ring - Red */}
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="relative w-full h-full max-w-[340px] max-h-[340px]">
                      <div className="absolute inset-0 rounded-full" style={{
                        background: 'transparent',
                        border: '8px solid #DC2626',
                        boxShadow: '0 0 40px rgba(220, 38, 38, 0.6), inset 0 0 40px rgba(220, 38, 38, 0.2)'
                      }} />

                      {/* Middle Ring - Gold */}
                      <div className="absolute inset-8 rounded-full" style={{
                        background: 'transparent',
                        border: '6px solid #FDE047',
                        boxShadow: '0 0 30px rgba(253, 224, 71, 0.6)'
                      }} />

                      {/* Inner Circle - Image */}
                      <div className="absolute inset-16 rounded-full overflow-hidden" style={{
                        border: '4px solid #FFFFFF',
                        boxShadow: '0 0 25px rgba(255, 255, 255, 0.4)'
                      }}>
                        <img
                          src="https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=800&q=80"
                          alt="ทัวร์บัลแกเรีย"
                          className="w-full h-full object-cover"
                        />

                        {/* Content Overlay in Center Circle */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{
                          background: 'radial-gradient(circle, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.9) 100%)'
                        }}>
                          <div className="px-4 py-2 rounded-full mb-2" style={{
                            background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                            border: '2px solid #FDE047'
                          }}>
                            <p className="text-2xl font-black" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FDE047'
                            }}>
                              -38%
                            </p>
                          </div>

                          <h3 className="text-4xl font-black mb-1 leading-none text-center" style={{
                            fontFamily: 'var(--font-charm)',
                            color: '#FFFFFF',
                            textShadow: '2px 2px 0 rgba(220, 38, 38, 0.8)',
                            letterSpacing: '0.03em'
                          }}>
                            บัลแกเรีย
                          </h3>

                          <p className="text-xs font-semibold mb-2 text-center" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047'
                          }}>
                            โซเฟีย-พลอฟดิฟ
                          </p>

                          <p className="text-2xl font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047',
                            textShadow: '0 0 25px rgba(253, 224, 71, 1)'
                          }}>
                            ฿47,120
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Info Bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-5" style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, transparent 100%)'
                  }}>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-bold" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FDE047'
                      }}>
                        🏛️ 6 วัน 4 คืน
                      </p>

                      <button className="px-6 py-2 rounded-lg text-sm font-black transition-all hover:scale-105" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        color: '#DC2626',
                        fontFamily: 'Kanit, sans-serif',
                        border: '2px solid #DC2626'
                      }}>
                        จอง →
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[51]</span>
                </div>
              </div>

              {/* Card 52 - Triangular Split (แบ่งสามเหลี่ยม) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Top Triangle - Red */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                    clipPath: 'polygon(0 0, 100% 0, 0 100%)'
                  }}>
                    <div className="p-6">
                      <h3 className="text-6xl font-black mb-2 leading-none" style={{
                        fontFamily: 'var(--font-pattaya)',
                        color: '#FDE047',
                        textShadow: '4px 4px 0 rgba(0, 0, 0, 0.5)',
                        letterSpacing: '0.05em'
                      }}>
                        เซอร์เบีย
                      </h3>

                      <p className="text-sm font-semibold mb-4" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF'
                      }}>
                        เบลเกรด • 5 วัน 3 คืน
                      </p>

                      <div className="inline-block px-4 py-2 rounded-lg" style={{
                        background: 'rgba(253, 224, 71, 1)',
                        border: '2px solid #000000'
                      }}>
                        <p className="text-2xl font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#DC2626'
                        }}>
                          -35%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Triangle - Black */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
                    clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
                  }}>
                    {/* Image in Bottom Triangle */}
                    <div className="absolute bottom-0 right-0 w-full h-full">
                      <img
                        src="https://images.unsplash.com/photo-1605026582738-d87a8b1c3d66?w=800&q=80"
                        alt="ทัวร์เซอร์เบีย"
                        className="w-full h-full object-cover opacity-40"
                        style={{
                          clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
                        }}
                      />
                    </div>

                    <div className="absolute bottom-6 right-6 text-right">
                      <p className="text-xs mb-1 line-through" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        opacity: 0.5
                      }}>
                        ฿68,000
                      </p>
                      <p className="text-5xl font-black mb-4" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FDE047',
                        textShadow: '0 0 40px rgba(253, 224, 71, 1), 3px 3px 0 rgba(220, 38, 38, 0.5)',
                        letterSpacing: '-0.02em'
                      }}>
                        ฿44,200
                      </p>

                      <button className="px-8 py-3 rounded-xl text-base font-black transition-all hover:scale-105" style={{
                        background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                        color: '#000000',
                        fontFamily: 'Kanit, sans-serif',
                        border: '2px solid #DC2626',
                        boxShadow: '0 4px 20px rgba(253, 224, 71, 0.7)'
                      }}>
                        จองเลย →
                      </button>
                    </div>
                  </div>

                  {/* Diagonal Gold Line */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '141.42%',
                      height: '3px',
                      background: 'linear-gradient(90deg, #FDE047 0%, #FBBF24 50%, #FDE047 100%)',
                      transformOrigin: 'top left',
                      transform: 'rotate(45deg)',
                      boxShadow: '0 0 20px rgba(253, 224, 71, 0.8)'
                    }} />
                  </div>

                  {/* Center Badge */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="px-4 py-2 rounded-full" style={{
                      background: 'rgba(0, 0, 0, 0.9)',
                      border: '3px solid #FDE047',
                      boxShadow: '0 6px 25px rgba(0, 0, 0, 0.7)'
                    }}>
                      <p className="text-xs font-black whitespace-nowrap" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FDE047'
                      }}>
                        ⚡ ราคาพิเศษ!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[52]</span>
                </div>
              </div>

              {/* Card 53 - Stacked Horizontal Bars (แถบนอนซ้อนกัน) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden flex flex-col">
                  {/* Bar 1 - Red (20%) */}
                  <div className="relative h-[20%]" style={{
                    background: 'linear-gradient(90deg, #DC2626 0%, #991B1B 100%)'
                  }}>
                    <div className="absolute inset-0 flex items-center px-5">
                      <div className="inline-block px-4 py-1.5 rounded-md" style={{
                        background: 'rgba(253, 224, 71, 1)',
                        border: '2px solid #000000'
                      }}>
                        <p className="text-xs font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#DC2626'
                        }}>
                          🌟 EXCLUSIVE
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bar 2 - Gold (15%) */}
                  <div className="relative h-[15%]" style={{
                    background: 'linear-gradient(90deg, #FDE047 0%, #FBBF24 100%)'
                  }}>
                    <div className="absolute inset-0 flex items-center justify-between px-5">
                      <h3 className="text-4xl font-black leading-none" style={{
                        fontFamily: 'var(--font-chonburi)',
                        color: '#DC2626',
                        textShadow: '2px 2px 0 rgba(0, 0, 0, 0.3)',
                        letterSpacing: '0.05em'
                      }}>
                        มอนเทเนโกร
                      </h3>

                      <div className="px-3 py-1.5 rounded-lg" style={{
                        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                        border: '2px solid #000000'
                      }}>
                        <p className="text-xl font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FDE047'
                        }}>
                          -40%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bar 3 - Image (45%) */}
                  <div className="relative h-[45%]">
                    <img
                      src="https://images.unsplash.com/photo-1582736505430-c6c344e1c5f1?w=800&q=80"
                      alt="ทัวร์มอนเทเนโกร"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Bar 4 - Black (20%) */}
                  <div className="relative h-[20%]" style={{
                    background: 'linear-gradient(90deg, #000000 0%, #1a1a1a 100%)'
                  }}>
                    <div className="absolute inset-0 flex items-center justify-between px-5">
                      <div>
                        <p className="text-xs mb-1" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          opacity: 0.6
                        }}>
                          พอดกอรีตซา-คอทอร์ • 6D4N
                        </p>
                        <p className="text-3xl font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FDE047',
                          textShadow: '0 0 30px rgba(253, 224, 71, 0.9)',
                          letterSpacing: '-0.02em'
                        }}>
                          ฿46,200
                        </p>
                      </div>

                      <button className="px-6 py-2.5 rounded-lg text-sm font-black transition-all hover:scale-105" style={{
                        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                        color: '#FDE047',
                        fontFamily: 'Kanit, sans-serif',
                        border: '2px solid #FDE047'
                      }}>
                        จอง →
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[53]</span>
                </div>
              </div>

              {/* Card 54 - Corner to Corner Diagonal (มุมสู่มุมทแยง) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80"
                    alt="ทัวร์เอสโตเนีย"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Diagonal Strip - From Top-Left to Bottom-Right */}
                  <div className="absolute inset-0">
                    {/* Top-Left Triangle - Red */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.95) 0%, rgba(153, 27, 27, 0.95) 100%)',
                      clipPath: 'polygon(0 0, 60% 0, 0 60%)'
                    }}>
                      <div className="p-6">
                        <div className="inline-block mb-3 px-3 py-1.5 rounded-md" style={{
                          background: 'rgba(253, 224, 71, 1)',
                          border: '2px solid #000000'
                        }}>
                          <p className="text-xs font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#DC2626'
                          }}>
                            🏰 MEDIEVAL
                          </p>
                        </div>

                        <h3 className="text-5xl font-black mb-2 leading-none" style={{
                          fontFamily: 'var(--font-sriracha)',
                          color: '#FFFFFF',
                          textShadow: '3px 3px 0 rgba(0, 0, 0, 0.5)',
                          letterSpacing: '0.05em'
                        }}>
                          เอสโตเนีย
                        </h3>

                        <p className="text-sm font-semibold" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FDE047'
                        }}>
                          ทาลลินน์-ทาร์ตู
                        </p>
                      </div>
                    </div>

                    {/* Bottom-Right Triangle - Black */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%)',
                      clipPath: 'polygon(100% 40%, 100% 100%, 40% 100%)'
                    }}>
                      <div className="absolute bottom-6 right-6 text-right">
                        <div className="inline-block mb-3 px-5 py-2.5 rounded-lg" style={{
                          background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                          border: '3px solid #DC2626',
                          boxShadow: '0 6px 25px rgba(253, 224, 71, 0.8)'
                        }}>
                          <p className="text-3xl font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#DC2626'
                          }}>
                            -37%
                          </p>
                        </div>

                        <p className="text-xs mb-1 line-through" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          opacity: 0.5
                        }}>
                          ฿72,000
                        </p>
                        <p className="text-5xl font-black mb-4" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FDE047',
                          textShadow: '0 0 40px rgba(253, 224, 71, 1)',
                          letterSpacing: '-0.02em'
                        }}>
                          ฿45,360
                        </p>

                        <button className="px-8 py-3 rounded-xl text-base font-black transition-all hover:scale-105" style={{
                          background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                          color: '#FDE047',
                          fontFamily: 'Kanit, sans-serif',
                          border: '2px solid #FDE047',
                          boxShadow: '0 4px 20px rgba(220, 38, 38, 0.6)'
                        }}>
                          จองเลย! →
                        </button>
                      </div>
                    </div>

                    {/* Diagonal Gold Band - Center */}
                    <div style={{
                      position: 'absolute',
                      top: '-10%',
                      left: '-10%',
                      width: '141.42%',
                      height: '60px',
                      background: 'linear-gradient(90deg, rgba(253, 224, 71, 0) 0%, rgba(253, 224, 71, 1) 20%, rgba(251, 191, 36, 1) 50%, rgba(253, 224, 71, 1) 80%, rgba(253, 224, 71, 0) 100%)',
                      transformOrigin: 'top left',
                      transform: 'rotate(45deg)',
                      boxShadow: '0 0 30px rgba(253, 224, 71, 0.8)',
                      border: '2px solid #DC2626',
                      borderLeft: 'none',
                      borderRight: 'none'
                    }}>
                      {/* Duration Text on Diagonal Band */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-sm font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#000000'
                        }}>
                          ⭐ 5 วัน 3 คืน ⭐
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[54]</span>
                </div>
              </div>

              {/* Card 55 - Octagon Shape (รูปแปดเหลี่ยม) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden" style={{
                  background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)'
                }}>
                  {/* Diagonal Lines Pattern */}
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, #FDE047 0px, #FDE047 2px, transparent 2px, transparent 12px),
                                      repeating-linear-gradient(-45deg, #FDE047 0px, #FDE047 2px, transparent 2px, transparent 12px)`
                  }} />

                  {/* Octagon Frame - Center */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="relative w-[300px] h-[300px]">
                      {/* Octagon Shape */}
                      <div className="absolute inset-0" style={{
                        clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
                        border: '5px solid #FDE047',
                        boxShadow: '0 0 50px rgba(253, 224, 71, 0.6), inset 0 0 50px rgba(220, 38, 38, 0.3)'
                      }}>
                        {/* Image Inside Octagon */}
                        <img
                          src="https://images.unsplash.com/photo-1517815230537-b8ece49c1f8d?w=800&q=80"
                          alt="ทัวร์ลัตเวีย"
                          className="w-full h-full object-cover"
                          style={{
                            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                          }}
                        />

                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{
                          background: 'radial-gradient(circle, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.9) 100%)',
                          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                        }}>
                          <div className="px-4 py-2 rounded-full mb-3 animate-pulse" style={{
                            background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                            border: '3px solid #DC2626',
                            boxShadow: '0 6px 25px rgba(253, 224, 71, 0.8)'
                          }}>
                            <p className="text-3xl font-black" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#DC2626'
                            }}>
                              -46%
                            </p>
                          </div>

                          <h3 className="text-5xl font-black mb-2 leading-none text-center" style={{
                            fontFamily: 'var(--font-pattaya)',
                            color: '#FFFFFF',
                            textShadow: '4px 4px 0 rgba(220, 38, 38, 0.8), 0 0 40px rgba(253, 224, 71, 0.4)',
                            letterSpacing: '0.05em'
                          }}>
                            ลัตเวีย
                          </h3>

                          <p className="text-sm font-semibold mb-3 text-center" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047'
                          }}>
                            รีกา • 5 วัน 3 คืน
                          </p>

                          <p className="text-3xl font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FDE047',
                            textShadow: '0 0 35px rgba(253, 224, 71, 1)'
                          }}>
                            ฿41,580
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Corner Badges */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-md" style={{
                    background: 'rgba(253, 224, 71, 1)',
                    border: '2px solid #000000'
                  }}>
                    <p className="text-xs font-black" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#DC2626'
                    }}>
                      🏛️ HISTORIC
                    </p>
                  </div>

                  {/* Bottom CTA */}
                  <div className="absolute bottom-5 left-6 right-6">
                    <button className="w-full py-3 rounded-xl text-base font-black transition-all hover:scale-105" style={{
                      background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                      color: '#000000',
                      fontFamily: 'Kanit, sans-serif',
                      border: '2px solid #000000',
                      boxShadow: '0 4px 20px rgba(253, 224, 71, 0.8)'
                    }}>
                      จองเลย! →
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[55]</span>
                </div>
              </div>

              {/* Card 56 - X-Cross Split (แบ่งกากบาท) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden" style={{
                  background: '#000000'
                }}>
                  {/* Top Triangle - Red */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                    clipPath: 'polygon(0 0, 100% 0, 50% 50%)'
                  }}>
                    <div className="p-5 text-center">
                      <h3 className="text-5xl font-black leading-none" style={{
                        fontFamily: 'var(--font-chonburi)',
                        color: '#FDE047',
                        textShadow: '3px 3px 0 rgba(0, 0, 0, 0.5)',
                        letterSpacing: '0.05em'
                      }}>
                        ลิทัวเนีย
                      </h3>
                    </div>
                  </div>

                  {/* Right Triangle - Gold */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                    clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)'
                  }}>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2">
                      <div className="px-4 py-2 rounded-lg" style={{
                        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                        border: '2px solid #000000'
                      }}>
                        <p className="text-2xl font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FDE047'
                        }}>
                          -39%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Triangle - Black with Image */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    clipPath: 'polygon(0 100%, 100% 100%, 50% 50%)'
                  }}>
                    <img
                      src="https://images.unsplash.com/photo-1580974852861-c381f8961a46?w=800&q=80"
                      alt="ทัวร์ลิทัวเนีย"
                      className="w-full h-full object-cover"
                      style={{
                        clipPath: 'polygon(0 100%, 100% 100%, 50% 50%)'
                      }}
                    />

                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center" style={{
                      clipPath: 'polygon(0 100%, 100% 100%, 50% 50%)'
                    }}>
                      <p className="text-xs mb-1" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)'
                      }}>
                        วิลนีอุส-เคาว์นัส • 6D4N
                      </p>
                      <p className="text-4xl font-black mb-3" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FDE047',
                        textShadow: '0 0 40px rgba(253, 224, 71, 1), 3px 3px 0 rgba(0, 0, 0, 0.8)'
                      }}>
                        ฿43,470
                      </p>

                      <button className="px-6 py-2 rounded-lg text-sm font-black transition-all hover:scale-105" style={{
                        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                        color: '#FDE047',
                        fontFamily: 'Kanit, sans-serif',
                        border: '2px solid #FDE047'
                      }}>
                        จอง →
                      </button>
                    </div>
                  </div>

                  {/* Left Triangle - White/Light */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255, 255, 255, 0.95)',
                    clipPath: 'polygon(0 0, 0 100%, 50% 50%)'
                  }}>
                    <div className="absolute left-5 top-1/2 -translate-y-1/2">
                      <div className="transform -rotate-90">
                        <p className="text-sm font-black whitespace-nowrap" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#DC2626'
                        }}>
                          ⚡ ราคาพิเศษ!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Center Point Decoration */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full" style={{
                    background: '#FDE047',
                    border: '2px solid #000000',
                    boxShadow: '0 0 20px rgba(253, 224, 71, 1)'
                  }} />
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[56]</span>
                </div>
              </div>

              {/* Card 57 - Vertical Stripes (ลายทางตั้ง) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden flex">
                  {/* Stripe 1 - Red (25%) */}
                  <div className="w-[25%] relative" style={{
                    background: 'linear-gradient(180deg, #DC2626 0%, #991B1B 100%)'
                  }}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
                        <p className="text-sm font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FDE047'
                        }}>
                          🎯 HOT DEAL
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stripe 2 - Gold (20%) */}
                  <div className="w-[20%] relative" style={{
                    background: 'linear-gradient(180deg, #FDE047 0%, #FBBF24 100%)'
                  }}>
                    <div className="absolute inset-0 flex flex-col items-center justify-between py-5">
                      <div className="px-2 py-3 rounded-lg" style={{
                        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                        border: '2px solid #000000'
                      }}>
                        <p className="text-xl font-black leading-none" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FDE047'
                        }}>
                          -41%
                        </p>
                      </div>

                      <div className="transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
                        <p className="text-xs font-bold" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#DC2626'
                        }}>
                          6 วัน 4 คืน
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stripe 3 - Image (35%) */}
                  <div className="w-[35%] relative">
                    <img
                      src="https://images.unsplash.com/photo-1555990538-c3c98b870e3b?w=800&q=80"
                      alt="ทัวร์มอลโดวา"
                      className="w-full h-full object-cover"
                    />

                    {/* Title Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center" style={{
                      background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.7) 100%)'
                    }}>
                      <div className="transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
                        <h3 className="text-6xl font-black" style={{
                          fontFamily: 'var(--font-sriracha)',
                          color: '#FDE047',
                          textShadow: '4px 4px 0 rgba(220, 38, 38, 0.8), 0 0 40px rgba(253, 224, 71, 0.5)',
                          letterSpacing: '0.1em'
                        }}>
                          มอลโดวา
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Stripe 4 - Black (20%) */}
                  <div className="w-[20%] relative" style={{
                    background: 'linear-gradient(180deg, #000000 0%, #1a1a1a 100%)'
                  }}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
                        <p className="text-3xl font-black mb-2" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FDE047',
                          textShadow: '0 0 30px rgba(253, 224, 71, 1)',
                          letterSpacing: '-0.05em'
                        }}>
                          ฿44,250
                        </p>
                        <p className="text-xs line-through" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          opacity: 0.5
                        }}>
                          ฿75,000
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[57]</span>
                </div>
              </div>

              {/* Card 58 - Offset Squares (สี่เหลี่ยมเยื้อง) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden" style={{
                  background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)'
                }}>
                  {/* Large Square - Red (Offset Top-Left) */}
                  <div className="absolute top-4 left-4 w-[200px] h-[200px] rounded-lg" style={{
                    background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                    border: '4px solid #000000',
                    boxShadow: '0 8px 30px rgba(220, 38, 38, 0.6)'
                  }}>
                    <div className="p-4">
                      <div className="inline-block mb-2 px-3 py-1 rounded-md" style={{
                        background: 'rgba(253, 224, 71, 1)',
                        border: '2px solid #000000'
                      }}>
                        <p className="text-xs font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#DC2626'
                        }}>
                          🌟 SPECIAL
                        </p>
                      </div>

                      <h3 className="text-4xl font-black mb-2 leading-none" style={{
                        fontFamily: 'var(--font-charm)',
                        color: '#FFFFFF',
                        textShadow: '3px 3px 0 rgba(0, 0, 0, 0.5)',
                        letterSpacing: '0.03em'
                      }}>
                        สโลวีเนีย
                      </h3>

                      <p className="text-xs font-semibold mb-2" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FDE047'
                      }}>
                        ลูบลิยานา-เบลด
                      </p>

                      <div className="inline-block px-3 py-1.5 rounded-lg" style={{
                        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
                        border: '2px solid #FDE047'
                      }}>
                        <p className="text-xl font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FDE047'
                        }}>
                          -44%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Medium Square - Black (Offset Bottom-Right) */}
                  <div className="absolute bottom-4 right-4 w-[220px] h-[220px] rounded-lg overflow-hidden" style={{
                    border: '4px solid #DC2626',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7)'
                  }}>
                    <img
                      src="https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80"
                      alt="ทัวร์สโลวีเนีย"
                      className="w-full h-full object-cover"
                    />

                    {/* Price Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-end p-4" style={{
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, transparent 60%)'
                    }}>
                      <p className="text-xs mb-1 line-through" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        opacity: 0.5
                      }}>
                        ฿86,000
                      </p>
                      <p className="text-4xl font-black mb-3" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FDE047',
                        textShadow: '0 0 40px rgba(253, 224, 71, 1)',
                        letterSpacing: '-0.02em'
                      }}>
                        ฿48,160
                      </p>

                      <button className="px-6 py-2 rounded-lg text-sm font-black transition-all hover:scale-105" style={{
                        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                        color: '#FDE047',
                        fontFamily: 'Kanit, sans-serif',
                        border: '2px solid #FDE047'
                      }}>
                        จองเลย →
                      </button>
                    </div>
                  </div>

                  {/* Small Floating Badge */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full" style={{
                    background: 'rgba(0, 0, 0, 0.9)',
                    border: '3px solid #FDE047',
                    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.8)'
                  }}>
                    <p className="text-xs font-black whitespace-nowrap" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FDE047'
                    }}>
                      ⚡ 7D5N
                    </p>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[58]</span>
                </div>
              </div>

              {/* Card 59 - Circular Donut (โดนัทวงกลม) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden" style={{
                  background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)'
                }}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: `repeating-conic-gradient(from 0deg, #FDE047 0deg, #FDE047 1deg, transparent 1deg, transparent 10deg)`
                  }} />

                  {/* Outer Circle - Gold Ring */}
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="relative w-full h-full max-w-[340px] max-h-[340px]">
                      {/* Gold Ring Border */}
                      <div className="absolute inset-0 rounded-full" style={{
                        background: 'conic-gradient(from 0deg, #FDE047, #FBBF24, #FDE047, #FBBF24, #FDE047)',
                        padding: '12px',
                        boxShadow: '0 0 60px rgba(253, 224, 71, 0.7), inset 0 0 60px rgba(253, 224, 71, 0.3)'
                      }}>
                        {/* Red Ring */}
                        <div className="w-full h-full rounded-full" style={{
                          background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                          padding: '8px',
                          boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.5)'
                        }}>
                          {/* Inner Black Circle with Image */}
                          <div className="w-full h-full rounded-full overflow-hidden" style={{
                            border: '4px solid #FFFFFF',
                            boxShadow: '0 0 30px rgba(255, 255, 255, 0.5)'
                          }}>
                            <img
                              src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80"
                              alt="ทัวร์อัลเบเนีย"
                              className="w-full h-full object-cover"
                            />

                            {/* Content in Center */}
                            <div className="absolute inset-12 flex flex-col items-center justify-center">
                              <div className="text-center px-4">
                                <div className="inline-block mb-3 px-4 py-2 rounded-full" style={{
                                  background: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
                                  border: '3px solid #DC2626',
                                  boxShadow: '0 6px 25px rgba(253, 224, 71, 0.9)'
                                }}>
                                  <p className="text-3xl font-black" style={{
                                    fontFamily: 'Kanit, sans-serif',
                                    color: '#DC2626'
                                  }}>
                                    -45%
                                  </p>
                                </div>

                                <h3 className="text-5xl font-black mb-2 leading-none" style={{
                                  fontFamily: 'var(--font-pattaya)',
                                  color: '#FDE047',
                                  textShadow: '4px 4px 0 rgba(0, 0, 0, 0.9), 0 0 40px rgba(253, 224, 71, 0.6)',
                                  letterSpacing: '0.05em'
                                }}>
                                  อัลเบเนีย
                                </h3>

                                <p className="text-xs font-semibold mb-3" style={{
                                  fontFamily: 'Kanit, sans-serif',
                                  color: '#FFFFFF'
                                }}>
                                  ทิรานา-ดูเรส
                                </p>

                                <p className="text-3xl font-black" style={{
                                  fontFamily: 'Kanit, sans-serif',
                                  color: '#FDE047',
                                  textShadow: '0 0 35px rgba(253, 224, 71, 1)'
                                }}>
                                  ฿38,500
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-5 left-0 right-0 text-center">
                    <button className="px-10 py-3 rounded-xl text-base font-black transition-all hover:scale-105" style={{
                      background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                      color: '#FDE047',
                      fontFamily: 'Kanit, sans-serif',
                      border: '2px solid #FDE047',
                      boxShadow: '0 4px 20px rgba(220, 38, 38, 0.7)'
                    }}>
                      จองเลย! • 6D4N →
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>[59]</span>
                </div>
              </div>

              {/* Card 3 - Elegant Serif Typography (ธีมแดงเข้ม + Playfair Display) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image - Full Visible */}
                  <img
                    src="https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80"
                    alt="Tokyo Traditional"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Elegant Dark Gradient at Bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-8"
                    style={{
                      background: 'linear-gradient(to top, rgba(87, 13, 18, 0.97) 0%, rgba(87, 13, 18, 0.8) 60%, transparent 100%)'
                    }}
                  >
                    {/* Small Premium Badge */}
                    <div className="mb-4">
                      <div
                        className="inline-block px-4 py-1.5 rounded-sm"
                        style={{
                          background: 'rgba(212, 175, 55, 0.15)',
                          border: '1px solid rgba(212, 175, 55, 0.6)'
                        }}
                      >
                        <p
                          className="text-xs"
                          style={{
                            fontFamily: "'Sarabun', sans-serif",
                            color: '#D4AF37',
                            letterSpacing: '0.1em',
                            fontWeight: 600
                          }}
                        >
                          แพ็คเกจพิเศษ
                        </p>
                      </div>
                    </div>

                    {/* Serif Title */}
                    <h3
                      className="text-4xl mb-2"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontWeight: 700,
                        color: '#FFFFFF',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                        textShadow: '2px 2px 12px rgba(0, 0, 0, 0.8)'
                      }}
                    >
                      ทัวร์ญี่ปุ่น
                    </h3>

                    <p
                      className="text-base mb-5"
                      style={{
                        fontFamily: "'Sarabun', sans-serif",
                        color: 'rgba(255, 255, 255, 0.95)',
                        fontWeight: 500
                      }}
                    >
                      โตเกียว - เกียวโต • 6 วัน 4 คืน
                    </p>

                    <div className="flex items-end justify-between">
                      <div>
                        <p
                          className="text-xs mb-1"
                          style={{
                            fontFamily: "'Sarabun', sans-serif",
                            color: 'rgba(212, 175, 55, 0.7)',
                            textDecoration: 'line-through'
                          }}
                        >
                          48,999.-
                        </p>
                        <h1
                          className="text-5xl"
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontWeight: 700,
                            color: '#D4AF37',
                            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)'
                          }}
                        >
                          35,999
                        </h1>
                      </div>
                      <button
                        className="px-6 py-3 rounded-sm transition-all hover:scale-105"
                        style={{
                          background: 'rgba(212, 175, 55, 0.2)',
                          border: '1.5px solid #D4AF37',
                          color: '#D4AF37',
                          fontFamily: "'Sarabun', sans-serif",
                          fontSize: '14px',
                          fontWeight: 600
                        }}
                      >
                        ดูรายละเอียด
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [3]
                  </span>
                </div>
              </div>

              {/* Card 4 - Bold Sans Display (ธีมน้ำเงินสด + Montserrat/Impact) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image - Full Visible */}
                  <img
                    src="https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&q=80"
                    alt="Tokyo Shibuya"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Top Badge - Bold Style */}
                  <div className="absolute top-6 left-6">
                    <div
                      className="px-5 py-3 rounded-lg transform -rotate-3"
                      style={{
                        background: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
                        boxShadow: '0 8px 24px rgba(14, 165, 233, 0.5)'
                      }}
                    >
                      <p
                        className="text-sm"
                        style={{
                          fontFamily: "'Kanit', sans-serif",
                          fontWeight: 900,
                          color: '#FFFFFF',
                          letterSpacing: '0.05em'
                        }}
                      >
                        เมก้าเซลล์
                      </p>
                    </div>
                  </div>

                  {/* Bottom Content - Bold Typography */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div
                      className="rounded-2xl p-6"
                      style={{
                        background: 'rgba(255, 255, 255, 0.98)',
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)'
                      }}
                    >
                      <h3
                        className="text-4xl mb-2"
                        style={{
                          fontFamily: "'Montserrat', 'Impact', sans-serif",
                          fontWeight: 900,
                          color: '#0369A1',
                          textTransform: 'uppercase',
                          letterSpacing: '-0.03em',
                          lineHeight: 1
                        }}
                      >
                        ทัวร์ญี่ปุ่น
                      </h3>

                      <p
                        className="text-sm mb-4"
                        style={{
                          fontFamily: "'Kanit', sans-serif",
                          fontWeight: 600,
                          color: '#64748B'
                        }}
                      >
                        โตเกียว • โอซาก้า • 5 วัน 3 คืน
                      </p>

                      <div className="flex items-end justify-between">
                        <div>
                          <p
                            className="text-xs mb-1 line-through"
                            style={{
                              fontFamily: "'Kanit', sans-serif",
                              fontWeight: 500,
                              color: '#94A3B8'
                            }}
                          >
                            45,999.-
                          </p>
                          <h1
                            className="text-5xl"
                            style={{
                              fontFamily: "'Montserrat', sans-serif",
                              fontWeight: 900,
                              color: '#0EA5E9',
                              letterSpacing: '-0.02em'
                            }}
                          >
                            31,999
                          </h1>
                        </div>
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
                          style={{
                            background: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
                            boxShadow: '0 6px 20px rgba(14, 165, 233, 0.4)'
                          }}
                        >
                          <span
                            className="text-2xl"
                            style={{
                              fontFamily: "'Montserrat', sans-serif",
                              fontWeight: 900,
                              color: '#FFFFFF'
                            }}
                          >
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [4]
                  </span>
                </div>
              </div>

              {/* Card 11 - Side Corner (Sangria) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                  {/* Background Image with Dark Overlay */}
                  <img
                    src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80"
                    alt="Tokyo Night"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                  />

                  {/* Minimalist Content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-8">

                    {/* Top - Small Badge */}
                    <div className="self-end">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)',
                          boxShadow: '0 4px 12px rgba(220, 38, 38, 0.4)'
                        }}
                      >
                        <span className="text-white text-xs font-bold">-30%</span>
                      </div>
                    </div>

                    {/* Bottom - Clean Typography */}
                    <div>
                      <div className="mb-6">
                        <p
                          className="text-sm text-gray-400 mb-2 tracking-wider"
                          style={{ fontFamily: 'Kanit, sans-serif' }}
                        >
                          PREMIUM TOUR
                        </p>
                        <h3
                          className="text-3xl font-bold text-white mb-1"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            letterSpacing: '-0.02em'
                          }}
                        >
                          ทัวร์ญี่ปุ่น
                        </h3>
                        <p
                          className="text-base text-gray-300"
                          style={{ fontFamily: 'Kanit, sans-serif' }}
                        >
                          โตเกียว 5 วัน 3 คืน
                        </p>
                      </div>

                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xs text-gray-500 line-through mb-1">41,999.-</p>
                          <h1
                            className="text-5xl font-bold"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text'
                            }}
                          >
                            29,999
                          </h1>
                        </div>
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
                          style={{
                            background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)',
                            boxShadow: '0 4px 12px rgba(220, 38, 38, 0.4)'
                          }}
                        >
                          <span className="text-white text-xl">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [5]
                  </span>
                </div>
              </div>

              {/* Card 6 - Style 6: Side Panel Overlay (ธีมน้ำเงิน) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image - Full Visible */}
                  <img
                    src="https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&q=80"
                    alt="Tokyo Night"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Right Side Panel - Blue Theme */}
                  <div
                    className="absolute top-0 right-0 bottom-0 w-32 flex flex-col items-center justify-center gap-6 p-4"
                    style={{
                      background: 'linear-gradient(180deg, rgba(30, 64, 175, 0.95) 0%, rgba(37, 99, 235, 0.95) 100%)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '-4px 0 20px rgba(30, 64, 175, 0.3)'
                    }}
                  >
                    {/* Vertical Text */}
                    <div className="transform -rotate-90 whitespace-nowrap">
                      <h3
                        className="text-xl font-bold text-white"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          letterSpacing: '0.1em'
                        }}
                      >
                        ทัวร์ญี่ปุ่น
                      </h3>
                    </div>

                    {/* Price Circle */}
                    <div
                      className="w-20 h-20 rounded-full flex flex-col items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
                        boxShadow: '0 4px 16px rgba(59, 130, 246, 0.5)'
                      }}
                    >
                      <p className="text-xs text-blue-200 font-medium">จาก</p>
                      <h1
                        className="text-xl font-bold text-white leading-tight"
                        style={{ fontFamily: 'Kanit, sans-serif' }}
                      >
                        34,999
                      </h1>
                    </div>

                    {/* Arrow Button */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
                      style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: '2px solid rgba(255, 255, 255, 0.5)'
                      }}
                    >
                      <span className="text-white text-lg">→</span>
                    </div>
                  </div>

                  {/* Bottom Left Info */}
                  <div className="absolute bottom-4 left-4">
                    <div
                      className="px-4 py-2 rounded-lg"
                      style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      <p
                        className="text-sm font-bold text-blue-600"
                        style={{ fontFamily: 'Sarabun, sans-serif' }}
                      >
                        โตเกียว 5 วัน 3 คืน
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [6]
                  </span>
                </div>
              </div>

              {/* Card 7 - Style 7: Top Banner Modern (ธีมแดง) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image - Full Visible */}
                  <img
                    src="https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80"
                    alt="Mt. Fuji"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Top Banner - Red Theme */}
                  <div
                    className="absolute top-0 left-0 right-0 p-6"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(220, 38, 38, 0.95) 0%, rgba(220, 38, 38, 0.7) 70%, transparent 100%)',
                      backdropFilter: 'blur(8px)'
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div
                          className="inline-block px-3 py-1 rounded-full mb-3"
                          style={{
                            background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
                            boxShadow: '0 2px 8px rgba(251, 191, 36, 0.4)'
                          }}
                        >
                          <p
                            className="text-xs font-bold text-red-900"
                            style={{ fontFamily: 'Kanit, sans-serif' }}
                          >
                            HOT SALE
                          </p>
                        </div>
                        <h3
                          className="text-3xl font-bold text-white mb-1"
                          style={{
                            fontFamily: 'Kanit, sans-serif',
                            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          ทัวร์ญี่ปุ่น
                        </h3>
                        <p
                          className="text-sm text-white"
                          style={{
                            fontFamily: 'Sarabun, sans-serif',
                            textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)'
                          }}
                        >
                          ฟูจิ-ฮาโกเน่ 4 วัน
                        </p>
                      </div>
                      <div
                        className="text-right bg-white rounded-xl px-4 py-3"
                        style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}
                      >
                        <p className="text-xs text-gray-500 line-through">33,999.-</p>
                        <h1
                          className="text-3xl font-bold text-red-600"
                          style={{ fontFamily: 'Kanit, sans-serif' }}
                        >
                          23,999
                        </h1>
                      </div>
                    </div>
                  </div>

                  {/* Bottom CTA Button */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <button
                      className="w-full py-4 rounded-xl font-bold text-lg"
                      style={{
                        background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)',
                        color: '#FFFFFF',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 8px 24px rgba(220, 38, 38, 0.5)'
                      }}
                    >
                      จองเลย!
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [7]
                  </span>
                </div>
              </div>

              {/* Card 8 - Style 8: Circle Badge Luxury (ธีมน้ำเงิน) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image - Full Visible */}
                  <img
                    src="https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&q=80"
                    alt="Tokyo Tower"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Top Left Circle Badge */}
                  <div className="absolute top-6 left-6">
                    <div
                      className="w-24 h-24 rounded-full flex flex-col items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
                        boxShadow: '0 8px 24px rgba(30, 64, 175, 0.6)',
                        border: '3px solid rgba(255, 255, 255, 0.9)'
                      }}
                    >
                      <p
                        className="text-xs text-blue-200 font-medium"
                        style={{ fontFamily: 'Kanit, sans-serif' }}
                      >
                        ลด
                      </p>
                      <h2
                        className="text-2xl font-bold text-white leading-tight"
                        style={{ fontFamily: 'Kanit, sans-serif' }}
                      >
                        30%
                      </h2>
                    </div>
                  </div>

                  {/* Bottom Card with Glassmorphism */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div
                      className="rounded-2xl p-5"
                      style={{
                        background: 'rgba(255, 255, 255, 0.12)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      <h3
                        className="text-3xl font-bold text-white mb-2"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)'
                        }}
                      >
                        ทัวร์ญี่ปุ่น
                      </h3>
                      <p
                        className="text-sm text-white mb-4"
                        style={{
                          fontFamily: 'Sarabun, sans-serif',
                          textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)'
                        }}
                      >
                        โตเกียว-ฟูจิ 5 วัน 3 คืน
                      </p>

                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xs text-blue-200 line-through mb-1">45,999.-</p>
                          <h1
                            className="text-4xl font-bold text-white"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)'
                            }}
                          >
                            32,999.-
                          </h1>
                        </div>
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
                          style={{
                            background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.5)'
                          }}
                        >
                          <span className="text-white text-xl">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [8]
                  </span>
                </div>
              </div>

              {/* Card 9 - Style 9: Frame Border Premium (ธีมแดง) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div
                  className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden p-4"
                  style={{
                    background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                    boxShadow: '0 12px 40px rgba(220, 38, 38, 0.4)'
                  }}
                >
                  {/* Inner Image Container - No gradient overlay on image */}
                  <div className="relative h-full rounded-xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80"
                      alt="Osaka Castle"
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Small Info Badge on Image */}
                    <div className="absolute top-4 left-4">
                      <div
                        className="px-4 py-2 rounded-lg"
                        style={{
                          background: 'rgba(255, 255, 255, 0.95)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                        }}
                      >
                        <p
                          className="text-xs font-bold text-red-600"
                          style={{ fontFamily: 'Sarabun, sans-serif' }}
                        >
                          นาโกย่า-ทาคายาม่า
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content Outside Frame (on the red border area) */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div
                      className="bg-white rounded-xl p-4"
                      style={{ boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)' }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3
                            className="text-2xl font-bold text-gray-900"
                            style={{ fontFamily: 'Kanit, sans-serif' }}
                          >
                            ทัวร์ญี่ปุ่น
                          </h3>
                          <p
                            className="text-xs text-gray-600"
                            style={{ fontFamily: 'Sarabun, sans-serif' }}
                          >
                            5 วัน 3 คืน
                          </p>
                        </div>
                        <div
                          className="px-3 py-1 rounded-full"
                          style={{
                            background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)'
                          }}
                        >
                          <p
                            className="text-xs font-bold text-white"
                            style={{ fontFamily: 'Kanit, sans-serif' }}
                          >
                            -25%
                          </p>
                        </div>
                      </div>

                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xs text-gray-400 line-through">44,999.-</p>
                          <h1
                            className="text-3xl font-bold text-red-600"
                            style={{ fontFamily: 'Kanit, sans-serif' }}
                          >
                            33,999.-
                          </h1>
                        </div>
                        <button
                          className="px-5 py-2 rounded-lg font-bold text-white"
                          style={{
                            background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)',
                            fontFamily: 'Kanit, sans-serif',
                            boxShadow: '0 4px 12px rgba(220, 38, 38, 0.4)'
                          }}
                        >
                          จอง
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [9]
                  </span>
                </div>
              </div>

              {/* Card 10 - Style 10: Asymmetric Layout (ธีมน้ำเงิน) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden">
                  {/* Background Image - Full Visible */}
                  <img
                    src="https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&q=80"
                    alt="Tokyo Streets"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Asymmetric Blue Panel - Bottom Left Corner */}
                  <div
                    className="absolute bottom-0 left-0 p-6"
                    style={{
                      width: '75%',
                      height: '55%',
                      background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.95) 0%, rgba(37, 99, 235, 0.92) 100%)',
                      clipPath: 'polygon(0 20%, 100% 0, 100% 100%, 0 100%)',
                      backdropFilter: 'blur(8px)'
                    }}
                  >
                    <div className="h-full flex flex-col justify-end">
                      <h3
                        className="text-3xl font-bold text-white mb-2"
                        style={{
                          fontFamily: 'Kanit, sans-serif',
                          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)'
                        }}
                      >
                        ทัวร์ญี่ปุ่น
                      </h3>
                      <p
                        className="text-sm text-blue-100 mb-4"
                        style={{
                          fontFamily: 'Sarabun, sans-serif',
                          textShadow: '1px 1px 4px rgba(0, 0, 0, 0.4)'
                        }}
                      >
                        โตเกียว-ทาคายาม่า 6 วัน
                      </p>

                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xs text-blue-200 line-through mb-1">51,999.-</p>
                          <h1
                            className="text-5xl font-bold text-white"
                            style={{
                              fontFamily: 'Kanit, sans-serif',
                              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)'
                            }}
                          >
                            30,999
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Small Badge - Top Right */}
                  <div className="absolute top-6 right-6">
                    <div
                      className="w-16 h-16 rounded-full flex flex-col items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
                        boxShadow: '0 6px 20px rgba(59, 130, 246, 0.6)',
                        border: '3px solid rgba(255, 255, 255, 0.9)'
                      }}
                    >
                      <p className="text-xs text-blue-100 font-medium">SALE</p>
                      <p
                        className="text-lg font-bold text-white leading-tight"
                        style={{ fontFamily: 'Kanit, sans-serif' }}
                      >
                        40%
                      </p>
                    </div>
                  </div>

                  {/* Arrow Button */}
                  <div className="absolute bottom-6 right-6">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
                      style={{
                        background: 'linear-gradient(135deg, #60A5FA 0%, #93C5FD 100%)',
                        boxShadow: '0 6px 20px rgba(96, 165, 250, 0.5)'
                      }}
                    >
                      <span className="text-white text-2xl font-bold">→</span>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [10]
                  </span>
                </div>
              </div>

              {/* Card 11 - Side Corner (Sangria) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&q=80"
                    alt="Tokyo Tower"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Gradient from left side */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to right, rgba(146, 0, 10, 0.97) 0%, rgba(146, 0, 10, 0.7) 40%, rgba(146, 0, 10, 0.3) 65%, transparent 85%)'
                  }}></div>

                  {/* Content on left */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="inline-block self-start px-3 py-1.5 rounded-full" style={{
                      background: '#FFD700'
                    }}>
                      <p className="text-xs font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#92000A' }}>
                        ⚡ FLASH
                      </p>
                    </div>

                    <div>
                      <h3 className="text-4xl font-black mb-2" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFD700',
                        textShadow: '3px 3px 12px rgba(0, 0, 0, 0.9)'
                      }}>
                        ทัวร์ญี่ปุ่น <span style={{ color: '#FFFFFF' }}>ปังสุด</span>
                      </h3>
                      <p className="text-base mb-4" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                      }}>
                        โตเกียว-โยโกฮาม่า 5 วัน 3 คืน
                      </p>

                      <div className="flex items-end gap-4 mb-4">
                        <div>
                          <p className="text-xs line-through" style={{ color: '#FFE4E1' }}>
                            45,999.-
                          </p>
                          <h1 className="text-6xl font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                          }}>
                            32,999.-
                          </h1>
                        </div>
                      </div>

                      <button className="px-8 py-3 rounded-xl font-bold" style={{
                        background: '#FFFFFF',
                        color: '#92000A',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)'
                      }}>
                        จองเลย
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [11]
                  </span>
                </div>
              </div>

              {/* Card 12 - Bottom Heavy (Carmine) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80"
                    alt="Mount Fuji"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Heavy bottom gradient */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(150, 0, 24, 0.98) 0%, rgba(150, 0, 24, 0.85) 35%, rgba(150, 0, 24, 0.4) 60%, transparent 80%)'
                  }}></div>

                  {/* Small top badge */}
                  <div className="absolute top-4 right-4 px-4 py-2 rounded-lg" style={{
                    background: 'rgba(255, 235, 59, 0.95)',
                    boxShadow: '0 4px 12px rgba(255, 235, 59, 0.5)'
                  }}>
                    <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#960018' }}>
                      -35%
                    </p>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      ทัวร์ญี่ปุ่น <span style={{ color: '#FFFFFF' }}>ปังสุด</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                    }}>
                      ฟูจิ-ฮาโกเน่ 4 วัน 3 คืน
                    </p>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm line-through mb-1" style={{ color: '#FFE4E1' }}>
                          43,999.-
                        </p>
                        <h1 className="text-6xl font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                        }}>
                          27,999.-
                        </h1>
                      </div>
                      <button className="px-7 py-3 rounded-xl font-bold" style={{
                        background: '#FFFFFF',
                        color: '#960018',
                        fontFamily: 'Kanit, sans-serif',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)'
                      }}>
                        จองเลย
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [12]
                  </span>
                </div>
              </div>

              {/* Card 13 - L-Shape Overlay (Terracotta) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&q=80"
                    alt="Tokyo Night"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* L-shaped overlay (bottom + left) */}
                  <div className="absolute bottom-0 left-0 right-0 h-2/5" style={{
                    background: 'linear-gradient(to top, rgba(204, 78, 92, 0.95) 0%, rgba(204, 78, 92, 0.7) 70%, transparent 100%)'
                  }}></div>
                  <div className="absolute top-0 left-0 bottom-0 w-1/3" style={{
                    background: 'linear-gradient(to right, rgba(204, 78, 92, 0.9) 0%, rgba(204, 78, 92, 0.5) 60%, transparent 100%)'
                  }}></div>

                  {/* Content bottom-left corner */}
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-3xl font-black mb-2" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFE082',
                      textShadow: '3px 3px 10px rgba(0, 0, 0, 0.9)'
                    }}>
                      ทัวร์ญี่ปุ่น <span style={{ color: '#FFFFFF' }}>ปังสุด</span>
                    </h3>
                    <p className="text-base mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF'
                    }}>
                      โตเกียว-คามาคุระ 5 วัน 3 คืน
                    </p>

                    <div className="flex items-end gap-4">
                      <div>
                        <p className="text-xs line-through" style={{ color: '#FFE4E1' }}>
                          44,999.-
                        </p>
                        <h1 className="text-5xl font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF'
                        }}>
                          33,999.-
                        </h1>
                      </div>
                      <button className="px-6 py-3 rounded-xl font-bold" style={{
                        background: '#FFFFFF',
                        color: '#CC4E5C',
                        fontFamily: 'Kanit, sans-serif'
                      }}>
                        จอง
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [13]
                  </span>
                </div>
              </div>

              {/* Card 14 - Wave Overlay (Garnet) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80"
                    alt="Castle"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Wave-like gradient from bottom */}
                  <div className="absolute inset-0" style={{
                    background: `
                      radial-gradient(ellipse 150% 50% at 50% 100%,
                        rgba(115, 34, 45, 0.98) 0%,
                        rgba(115, 34, 45, 0.9) 35%,
                        rgba(115, 34, 45, 0.5) 55%,
                        transparent 75%
                      )
                    `
                  }}></div>

                  {/* Top-left badge */}
                  <div className="absolute top-4 left-4 px-4 py-2 rounded-xl" style={{
                    background: '#FFD54F',
                    boxShadow: '0 4px 16px rgba(255, 213, 79, 0.5)'
                  }}>
                    <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#73222D' }}>
                      SUPER SALE
                    </p>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-4xl font-black mb-2" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD54F',
                      textShadow: '3px 3px 12px rgba(0, 0, 0, 0.95)'
                    }}>
                      ทัวร์ญี่ปุ่น <span style={{ color: '#FFFFFF' }}>ปังสุด</span>
                    </h3>
                    <p className="text-base mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                    }}>
                      ฮิโรชิม่า-มิยาจิม่า 5 วัน 3 คืน
                    </p>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs line-through mb-1" style={{ color: '#FFE4E1' }}>
                          45,999.-
                        </p>
                        <h1 className="text-6xl font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                        }}>
                          32,999.-
                        </h1>
                      </div>
                      <button className="px-7 py-3 rounded-xl font-bold" style={{
                        background: '#FFFFFF',
                        color: '#73222D',
                        fontFamily: 'Kanit, sans-serif'
                      }}>
                        จองเลย
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [14]
                  </span>
                </div>
              </div>

              {/* Card 15 - Gradient Arc (Blood Red) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&q=80"
                    alt="Tokyo"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Arc gradient from bottom-left */}
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse 120% 80% at 0% 100%, rgba(138, 3, 3, 0.96) 0%, rgba(138, 3, 3, 0.85) 40%, rgba(138, 3, 3, 0.4) 70%, transparent 90%)'
                  }}></div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 p-6" style={{ maxWidth: '75%' }}>
                    <div className="inline-block px-4 py-2 rounded-xl mb-3" style={{
                      background: '#FFD54F',
                      boxShadow: '0 4px 12px rgba(255, 213, 79, 0.6)'
                    }}>
                      <p className="text-xs font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#8A0303' }}>
                        LIMITED
                      </p>
                    </div>

                    <h3 className="text-4xl font-black mb-2" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD54F',
                      textShadow: '3px 3px 12px rgba(0, 0, 0, 0.95)'
                    }}>
                      ทัวร์ญี่ปุ่น <span style={{ color: '#FFFFFF' }}>ปังสุด</span>
                    </h3>
                    <p className="text-base mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                    }}>
                      โตเกียว-ฮาโกเน่ 6 วัน 4 คืน
                    </p>

                    <div className="flex items-end gap-4">
                      <div>
                        <p className="text-xs line-through" style={{ color: '#FFE4E1' }}>
                          47,999.-
                        </p>
                        <h1 className="text-6xl font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                        }}>
                          34,999.-
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [15]
                  </span>
                </div>
              </div>

              {/* Card 16 - Side Wave (Burgundy) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80"
                    alt="Castle"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Wave from left side */}
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse 100% 120% at 0% 50%, rgba(128, 0, 32, 0.98) 0%, rgba(128, 0, 32, 0.9) 35%, rgba(128, 0, 32, 0.6) 55%, rgba(128, 0, 32, 0.2) 70%, transparent 85%)'
                  }}></div>

                  {/* Content on left */}
                  <div className="absolute top-0 left-0 bottom-0 p-6 flex flex-col justify-center" style={{ maxWidth: '65%' }}>
                    <div className="inline-block self-start px-4 py-2 rounded-xl mb-3" style={{
                      background: '#FFD54F',
                      boxShadow: '0 4px 12px rgba(255, 213, 79, 0.5)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#800020' }}>
                        SUPER SALE
                      </p>
                    </div>

                    <h3 className="text-4xl font-black mb-2 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD54F',
                      textShadow: '3px 3px 12px rgba(0, 0, 0, 0.95)'
                    }}>
                      ทัวร์ญี่ปุ่น<br/>
                      <span style={{ color: '#FFFFFF' }}>ปังสุด</span>
                    </h3>
                    <p className="text-base mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                    }}>
                      ฮิโรชิม่า-คุราชิกิ 5 วัน 3 คืน
                    </p>

                    <div className="mb-4">
                      <p className="text-xs line-through" style={{ color: '#FFE4E1' }}>
                        46,999.-
                      </p>
                      <h1 className="text-6xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                      }}>
                        32,999.-
                      </h1>
                    </div>

                    <button className="self-start px-7 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#800020',
                      fontFamily: 'Kanit, sans-serif'
                    }}>
                      จองเลย
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [16]
                  </span>
                </div>
              </div>

              {/* Card 17 - Torn Paper Effect (Fire Brick) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&q=80"
                    alt="Nikko Shrine"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Torn paper effect - irregular bottom edge */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(178, 34, 34, 0.98) 0%, rgba(178, 34, 34, 0.9) 30%, rgba(178, 34, 34, 0.6) 50%, transparent 70%)',
                    maskImage: 'linear-gradient(to top, black 0%, black 35%, transparent 35.5%, black 36%, black 37%, transparent 37.5%, black 38%, black 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 0%, black 35%, transparent 35.5%, black 36%, black 37%, transparent 37.5%, black 38%, black 100%)'
                  }}></div>

                  {/* Top badge */}
                  <div className="absolute top-5 left-5 px-5 py-2 rounded-lg" style={{
                    background: '#FDE047',
                    boxShadow: '0 4px 16px rgba(253, 224, 71, 0.6)',
                    transform: 'rotate(-3deg)'
                  }}>
                    <p className="text-base font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#B22222' }}>
                      โปรโมชั่น จัดหนัก!
                    </p>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-4xl font-black mb-2" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FDE047',
                      textShadow: '3px 3px 12px rgba(0, 0, 0, 0.95)'
                    }}>
                      นิกโกะ-คาวากูจิโกะ
                    </h3>
                    <p className="text-base mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                    }}>
                      5 วัน 3 คืน ชมใบไม้แดง
                    </p>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                          42,999.-
                        </p>
                        <h1 className="text-6xl font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                        }}>
                          29,999.-
                        </h1>
                      </div>
                      <button className="px-7 py-3 rounded-xl font-bold" style={{
                        background: '#FFFFFF',
                        color: '#B22222',
                        fontFamily: 'Kanit, sans-serif'
                      }}>
                        ลงทะเบียน
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [17]
                  </span>
                </div>
              </div>

              {/* Card 18 - Floating Glass Box (Cardinal Red) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80"
                    alt="Tokyo Tower"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Subtle vignette */}
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)'
                  }}></div>

                  {/* Floating glassmorphism box */}
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="w-full max-w-sm p-6 rounded-2xl" style={{
                      background: 'rgba(196, 30, 58, 0.85)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)'
                    }}>
                      <div className="text-center">
                        <div className="inline-block px-4 py-2 rounded-full mb-3" style={{
                          background: '#FFEB3B'
                        }}>
                          <p className="text-xs font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#C41E3A' }}>
                            RECOMMENDED
                          </p>
                        </div>

                        <h3 className="text-4xl font-black mb-2" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFEB3B',
                          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)'
                        }}>
                          ทัวร์ญี่ปุ่น<br/>
                          <span style={{ color: '#FFFFFF' }}>โดนใจ</span>
                        </h3>
                        <p className="text-base mb-4" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF'
                        }}>
                          โตเกียวทาวเวอร์-โอไดบะ 5D3N
                        </p>

                        <div className="mb-4">
                          <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                            41,999.-
                          </p>
                          <h1 className="text-5xl font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '3px 3px 12px rgba(0, 0, 0, 0.8)'
                          }}>
                            29,999.-
                          </h1>
                        </div>

                        <button className="w-full py-3 rounded-xl font-bold" style={{
                          background: '#FFFFFF',
                          color: '#C41E3A',
                          fontFamily: 'Kanit, sans-serif',
                          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)'
                        }}>
                          ดูโปรแกรม
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [18]
                  </span>
                </div>
              </div>

              {/* Card 19 - Gradient Border (Fire Engine Red) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl" style={{
                  background: 'linear-gradient(135deg, #CE2029 0%, #A01820 100%)',
                  padding: '6px'
                }}>
                  {/* Inner content with image */}
                  <div className="relative h-full rounded-xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80"
                      alt="Mt Fuji"
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Light gradient for text readability */}
                    <div className="absolute inset-0" style={{
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 60%)'
                    }}></div>

                    {/* Top badge */}
                    <div className="absolute top-4 right-4 px-4 py-2 rounded-lg" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 12px rgba(255, 215, 0, 0.5)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#CE2029' }}>
                        NEW ROUTE
                      </p>
                    </div>

                    {/* Bottom content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-4xl font-black mb-2" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFD700',
                        textShadow: '3px 3px 12px rgba(0, 0, 0, 0.95)'
                      }}>
                        เส้นทางใหม่<br/>
                        <span style={{ color: '#FFFFFF' }}>ญี่ปุ่น</span>
                      </h3>
                      <p className="text-base mb-4" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                      }}>
                        ทาคายาม่า-คานาซาว่า 5D3N
                      </p>

                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                            43,999.-
                          </p>
                          <h1 className="text-5xl font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF',
                            textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                          }}>
                            31,999.-
                          </h1>
                        </div>
                        <button className="px-6 py-3 rounded-xl font-bold" style={{
                          background: '#FFFFFF',
                          color: '#CE2029',
                          fontFamily: 'Kanit, sans-serif'
                        }}>
                          ดูเพิ่ม
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [19]
                  </span>
                </div>
              </div>

              {/* Card 20 - Slanted Stripe (Imperial Red) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&q=80"
                    alt="Bamboo Forest"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Slanted stripe from bottom left to top */}
                  <div className="absolute inset-0" style={{
                    background: `
                      linear-gradient(45deg,
                        rgba(237, 41, 57, 0.98) 0%,
                        rgba(237, 41, 57, 0.95) 30%,
                        rgba(237, 41, 57, 0.7) 50%,
                        rgba(237, 41, 57, 0.4) 65%,
                        transparent 80%
                      )
                    `
                  }}></div>

                  {/* Bottom left content */}
                  <div className="absolute bottom-0 left-0 p-6" style={{ maxWidth: '70%' }}>
                    <div className="inline-block px-4 py-2 rounded-lg mb-3" style={{
                      background: '#FFEB3B',
                      boxShadow: '0 4px 12px rgba(255, 235, 59, 0.5)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#ED2939' }}>
                        EARLY BIRD
                      </p>
                    </div>

                    <h3 className="text-4xl font-black mb-2 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFEB3B',
                      textShadow: '3px 3px 12px rgba(0, 0, 0, 0.95)'
                    }}>
                      จองก่อน<br/>
                      <span style={{ color: '#FFFFFF' }}>ลดก่อน</span>
                    </h3>
                    <p className="text-base mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                    }}>
                      เกียวโต-อาราชิยาม่า 5D3N
                    </p>

                    <div className="mb-3">
                      <p className="text-xs line-through" style={{ color: '#FFE4E1' }}>
                        44,999.-
                      </p>
                      <h1 className="text-6xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                      }}>
                        30,999.-
                      </h1>
                    </div>

                    <button className="px-7 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#ED2939',
                      fontFamily: 'Kanit, sans-serif'
                    }}>
                      ลงทะเบียน
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [20]
                  </span>
                </div>
              </div>

              {/* Card 21 - Radial Burst (Oxblood) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&q=80"
                    alt="Tokyo Lights"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Radial burst pattern from center */}
                  <div className="absolute inset-0" style={{
                    background: `
                      repeating-conic-gradient(
                        from 0deg at 50% 50%,
                        rgba(76, 0, 9, 0) 0deg,
                        rgba(76, 0, 9, 0) 10deg,
                        rgba(76, 0, 9, 0.95) 10deg,
                        rgba(76, 0, 9, 0.95) 20deg
                      ),
                      radial-gradient(circle at center, transparent 0%, transparent 25%, rgba(76, 0, 9, 0.8) 80%, rgba(76, 0, 9, 0.95) 100%)
                    `
                  }}></div>

                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 6px 20px rgba(255, 215, 0, 0.7)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#4C0009' }}>
                        🔥 HOT DEAL
                      </p>
                    </div>

                    <h3 className="text-6xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)',
                      letterSpacing: '-2px'
                    }}>
                      SUPER<br/>
                      <span style={{ color: '#FFFFFF' }}>SALE</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      โตเกียว-นิกโกะ-คาวากูจิโกะ 6D4N
                    </p>

                    <div className="mb-4">
                      <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                        48,999.-
                      </p>
                      <h1 className="text-7xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '6px 6px 24px rgba(0, 0, 0, 0.95)'
                      }}>
                        32,999.-
                      </h1>
                    </div>

                    <button className="px-10 py-4 rounded-xl font-black text-lg" style={{
                      background: '#FFFFFF',
                      color: '#4C0009',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)'
                    }}>
                      จองเลย!
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [21]
                  </span>
                </div>
              </div>

              {/* Card 22 - Diagonal Stripe (Rosewood) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80"
                    alt="Sapporo Snow"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Diagonal stripe pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      repeating-linear-gradient(
                        45deg,
                        rgba(101, 0, 11, 0) 0px,
                        rgba(101, 0, 11, 0) 50px,
                        rgba(101, 0, 11, 0.98) 50px,
                        rgba(101, 0, 11, 0.98) 150px,
                        rgba(101, 0, 11, 0.5) 150px,
                        rgba(101, 0, 11, 0.5) 200px
                      )
                    `
                  }}></div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="inline-block px-4 py-2 rounded-lg mb-3" style={{
                      background: '#FFFFFF',
                      boxShadow: '0 4px 12px rgba(255, 255, 255, 0.4)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#65000B' }}>
                        ❄️ WINTER SPECIAL
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-2 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      ทัวร์หิมะ<br/>
                      <span style={{ color: '#FFD700' }}>ญี่ปุ่น</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      ซัปโปโร-โอตารุ 6D4N
                    </p>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                          54,999.-
                        </p>
                        <h1 className="text-6xl font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                        }}>
                          39,999.-
                        </h1>
                      </div>
                      <button className="px-7 py-3 rounded-xl font-bold" style={{
                        background: '#FFFFFF',
                        color: '#65000B',
                        fontFamily: 'Kanit, sans-serif'
                      }}>
                        จองเลย
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [22]
                  </span>
                </div>
              </div>

              {/* Card 23 - Top-Down Gradient (Dark Scarlet) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80"
                    alt="Cherry Blossom"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Top-down gradient */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to bottom, rgba(86, 3, 25, 0.98) 0%, rgba(86, 3, 25, 0.9) 25%, rgba(86, 3, 25, 0.6) 50%, rgba(86, 3, 25, 0.2) 75%, transparent 100%)'
                  }}></div>

                  {/* Top content */}
                  <div className="absolute top-0 left-0 right-0 p-6">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#560319' }}>
                        🌸 SAKURA
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      เทศกาล<br/>
                      <span style={{ color: '#FFFFFF' }}>ดอกไม้</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      โตเกียว-โอซาก้า-เกียวโต 7D5N
                    </p>

                    <div className="mb-3">
                      <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                        59,999.-
                      </p>
                      <h1 className="text-6xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                      }}>
                        45,999.-
                      </h1>
                    </div>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#560319',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)'
                    }}>
                      สำรองที่
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [23]
                  </span>
                </div>
              </div>

              {/* Card 24 - Starburst Corner (Brickred) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&q=80"
                    alt="Private Tour"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Starburst from top-left corner */}
                  <div className="absolute inset-0" style={{
                    background: `
                      repeating-conic-gradient(
                        from 0deg at 0% 0%,
                        rgba(155, 36, 35, 0) 0deg,
                        rgba(155, 36, 35, 0) 5deg,
                        rgba(155, 36, 35, 0.95) 5deg,
                        rgba(155, 36, 35, 0.95) 10deg
                      ),
                      radial-gradient(ellipse at 0% 0%, rgba(155, 36, 35, 0.98) 0%, rgba(155, 36, 35, 0.8) 40%, rgba(155, 36, 35, 0.3) 60%, transparent 80%)
                    `
                  }}></div>

                  {/* Top-left content */}
                  <div className="absolute top-0 left-0 p-6" style={{ maxWidth: '70%' }}>
                    <div className="inline-block px-4 py-2 rounded-lg mb-3" style={{
                      background: '#FFEB3B',
                      boxShadow: '0 4px 12px rgba(255, 235, 59, 0.5)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#9B2423' }}>
                        🌟 PRIVATE
                      </p>
                    </div>

                    <h3 className="text-4xl font-black mb-2 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFEB3B',
                      textShadow: '3px 3px 12px rgba(0, 0, 0, 0.95)'
                    }}>
                      ทัวร์ส่วนตัว<br/>
                      <span style={{ color: '#FFFFFF' }}>VIP</span>
                    </h3>
                    <p className="text-base mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                    }}>
                      ปรับแผนได้ตามต้องการ 6D4N
                    </p>

                    <div className="mb-3">
                      <p className="text-xs line-through" style={{ color: '#FFE4E1' }}>
                        79,999.-
                      </p>
                      <h1 className="text-5xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                      }}>
                        59,999.-
                      </h1>
                    </div>

                    <button className="px-7 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#9B2423',
                      fontFamily: 'Kanit, sans-serif'
                    }}>
                      ปรึกษาแผน
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [24]
                  </span>
                </div>
              </div>

              {/* Card 25 - Rounded Corner Spotlight (Scarlet) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&q=80"
                    alt="Cultural"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Rounded corner spotlight from bottom-right */}
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse 140% 140% at 85% 85%, rgba(255, 36, 0, 0.98) 0%, rgba(255, 36, 0, 0.9) 30%, rgba(255, 36, 0, 0.6) 50%, rgba(255, 36, 0, 0.2) 65%, transparent 80%)'
                  }}></div>

                  {/* Bottom-right content */}
                  <div className="absolute bottom-0 right-0 p-6 text-right" style={{ maxWidth: '75%' }}>
                    <div className="inline-block px-4 py-2 rounded-lg mb-3" style={{
                      background: '#FFFFFF',
                      boxShadow: '0 4px 12px rgba(255, 255, 255, 0.4)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#FF2400' }}>
                        🏯 CULTURAL
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-2 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      วัฒนธรรม<br/>
                      <span style={{ color: '#FFD700' }}>ญี่ปุ่น</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      เกียวโต-นารา-โกเบ 6D4N
                    </p>

                    <div className="mb-3">
                      <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                        47,999.-
                      </p>
                      <h1 className="text-6xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                      }}>
                        34,999.-
                      </h1>
                    </div>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#FF2400',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      ดูโปรแกรม
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [25]
                  </span>
                </div>
              </div>

              {/* Card 26 - Grid Overlay (Cherry Red) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80"
                    alt="Photography"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Grid pattern overlay */}
                  <div className="absolute inset-0" style={{
                    background: `
                      repeating-linear-gradient(
                        0deg,
                        transparent 0px,
                        transparent 80px,
                        rgba(222, 49, 99, 0.4) 80px,
                        rgba(222, 49, 99, 0.4) 85px
                      ),
                      repeating-linear-gradient(
                        90deg,
                        transparent 0px,
                        transparent 80px,
                        rgba(222, 49, 99, 0.4) 80px,
                        rgba(222, 49, 99, 0.4) 85px
                      ),
                      linear-gradient(to bottom, rgba(222, 49, 99, 0.95) 0%, rgba(222, 49, 99, 0.7) 50%, rgba(222, 49, 99, 0.95) 100%)
                    `
                  }}></div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#DE3163' }}>
                        📸 PHOTOGRAPHY
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-2 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      ทัวร์ถ่ายภาพ<br/>
                      <span style={{ color: '#FFFFFF' }}>Photo Tour</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      ฟูจิ-ชิราคาว่าโกะ ถ่ายภาพ 5D3N
                    </p>

                    <div className="mb-4">
                      <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                        48,999.-
                      </p>
                      <h1 className="text-6xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                      }}>
                        35,999.-
                      </h1>
                    </div>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#DE3163',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [26]
                  </span>
                </div>
              </div>

              {/* Card 27 - Lightning Bolt (Raspberry Red) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80"
                    alt="Express"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Lightning bolt gradient overlay */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to bottom right, rgba(227, 11, 92, 0.98) 0%, rgba(227, 11, 92, 0.9) 30%, rgba(227, 11, 92, 0.6) 60%, transparent 100%)'
                  }}></div>

                  {/* Top-left content */}
                  <div className="absolute top-0 left-0 p-6" style={{ maxWidth: '70%' }}>
                    <div className="inline-block px-4 py-2 rounded-lg mb-3" style={{
                      background: '#FFEB3B',
                      boxShadow: '0 4px 12px rgba(255, 235, 59, 0.5)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#E30B5C' }}>
                        ⚡ EXPRESS
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-2 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFEB3B',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      ด่วน!<br/>
                      <span style={{ color: '#FFFFFF' }}>จำกัดที่</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      โตเกียว-โอซาก้า เหลือที่จำกัด 6D4N
                    </p>

                    <div className="mb-3">
                      <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                        43,999.-
                      </p>
                      <h1 className="text-6xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                      }}>
                        30,999.-
                      </h1>
                    </div>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#E30B5C',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      จองด่วน!
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [27]
                  </span>
                </div>
              </div>

              {/* Card 28 - Mesh Gradient (Red Orange) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80"
                    alt="Senior Tour"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Mesh gradient overlay */}
                  <div className="absolute inset-0" style={{
                    background: `radial-gradient(at 20% 30%, rgba(255, 69, 0, 0.95) 0%, transparent 50%),
                                radial-gradient(at 80% 70%, rgba(255, 69, 0, 0.95) 0%, transparent 50%),
                                radial-gradient(at 50% 50%, rgba(255, 69, 0, 0.6) 0%, transparent 50%)`
                  }}></div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFFFFF',
                      boxShadow: '0 4px 16px rgba(255, 255, 255, 0.5)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#FF4500' }}>
                        👴👵 SENIOR
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-2 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      ผู้สูงอายุ<br/>
                      <span style={{ color: '#FFD700' }}>สบายๆ</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      โตเกียว-ฟูจิ เดินช้าๆ 6D4N
                    </p>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                          44,999.-
                        </p>
                        <h1 className="text-6xl font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                        }}>
                          32,999.-
                        </h1>
                      </div>
                      <button className="px-7 py-3 rounded-xl font-bold" style={{
                        background: '#FFFFFF',
                        color: '#FF4500',
                        fontFamily: 'Kanit, sans-serif'
                      }}>
                        สอบถาม
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [28]
                  </span>
                </div>
              </div>

              {/* Card 29 - Radial Stripes (Auburn) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&q=80"
                    alt="Buddhist"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Radial stripes from bottom */}
                  <div className="absolute inset-0" style={{
                    background: `
                      repeating-conic-gradient(
                        from 180deg at 50% 100%,
                        rgba(165, 42, 42, 0) 0deg,
                        rgba(165, 42, 42, 0) 8deg,
                        rgba(165, 42, 42, 0.95) 8deg,
                        rgba(165, 42, 42, 0.95) 16deg
                      ),
                      radial-gradient(ellipse at 50% 100%, rgba(165, 42, 42, 0.98) 0%, rgba(165, 42, 42, 0.8) 50%, transparent 70%)
                    `
                  }}></div>

                  {/* Bottom center content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFFFFF',
                      boxShadow: '0 4px 16px rgba(255, 255, 255, 0.5)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#A52A2A' }}>
                        🙏 BUDDHIST
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-2 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      ทัวร์ธรรม<br/>
                      <span style={{ color: '#FFD700' }}>ญี่ปุ่น</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      เกียวโต-นารา วัดวาอาราม 6D4N
                    </p>

                    <div className="mb-4">
                      <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                        45,999.-
                      </p>
                      <h1 className="text-6xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                      }}>
                        33,999.-
                      </h1>
                    </div>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#A52A2A',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [29]
                  </span>
                </div>
              </div>

              {/* Card 30 - Gradient Border Frame (Blood Red) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl" style={{
                  background: 'linear-gradient(135deg, #660000 0%, #990000 50%, #CC0000 100%)',
                  padding: '8px'
                }}>
                  {/* Inner frame */}
                  <div className="relative h-full rounded-xl overflow-hidden" style={{
                    background: '#000000',
                    padding: '4px'
                  }}>
                    {/* Image */}
                    <div className="relative h-full rounded-lg overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&q=80"
                        alt="New Year"
                        className="w-full h-full object-cover"
                      />

                      {/* Bottom gradient */}
                      <div className="absolute inset-0" style={{
                        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 60%)'
                      }}></div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="inline-block px-4 py-2 rounded-lg mb-3" style={{
                          background: '#FFD700',
                          boxShadow: '0 4px 12px rgba(255, 215, 0, 0.6)'
                        }}>
                          <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#660000' }}>
                            🎊 NEW YEAR
                          </p>
                        </div>

                        <h3 className="text-4xl font-black mb-2" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFD700',
                          textShadow: '3px 3px 12px rgba(0, 0, 0, 0.95)'
                        }}>
                          ปีใหม่<br/>
                          <span style={{ color: '#FFFFFF' }}>ญี่ปุ่น</span>
                        </h3>
                        <p className="text-base mb-4" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                        }}>
                          โตเกียว-โอซาก้า ช่วงปีใหม่ 6D4N
                        </p>

                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                              64,999.-
                            </p>
                            <h1 className="text-5xl font-black" style={{
                              fontFamily: 'Kanit, sans-serif',
                              color: '#FFFFFF',
                              textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                            }}>
                              48,999.-
                            </h1>
                          </div>
                          <button className="px-6 py-3 rounded-xl font-bold" style={{
                            background: '#FFD700',
                            color: '#660000',
                            fontFamily: 'Kanit, sans-serif'
                          }}>
                            จองเลย
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [30]
                  </span>
                </div>
              </div>

              {/* Card 31 - Dual Tone Split (Firebrick) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <div className="h-full flex flex-col">
                    {/* Top: Image (60%) */}
                    <div className="h-[60%] relative">
                      <img
                        src="https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80"
                        alt="Summer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 px-4 py-2 rounded-lg" style={{
                        background: '#FFFFFF',
                        boxShadow: '0 4px 12px rgba(255, 255, 255, 0.5)'
                      }}>
                        <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#B22222' }}>
                          ☀️ SUMMER
                        </p>
                      </div>
                    </div>

                    {/* Bottom: Solid color (40%) */}
                    <div className="h-[40%] p-5 flex flex-col justify-center" style={{
                      background: 'linear-gradient(135deg, #B22222 0%, #8B0000 100%)'
                    }}>
                      <h3 className="text-3xl font-black mb-2" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFD700',
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)'
                      }}>
                        หน้าร้อน ญี่ปุ่น
                      </h3>
                      <p className="text-sm mb-3" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF'
                      }}>
                        โตเกียว-โอซาก้า ช่วงหน้าร้อน 5D3N
                      </p>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs line-through" style={{ color: '#FFE4E1' }}>
                            42,999.-
                          </p>
                          <h1 className="text-4xl font-black" style={{
                            fontFamily: 'Kanit, sans-serif',
                            color: '#FFFFFF'
                          }}>
                            30,999.-
                          </h1>
                        </div>
                        <button className="px-6 py-2 rounded-lg font-bold text-sm" style={{
                          background: '#FFFFFF',
                          color: '#B22222',
                          fontFamily: 'Kanit, sans-serif'
                        }}>
                          ดูทัวร์
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [31]
                  </span>
                </div>
              </div>

              {/* Card 32 - Corner Radial (Ruby Red) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80"
                    alt="Kyoto Temple"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Corner radial gradient */}
                  <div className="absolute inset-0" style={{
                    background: `
                      radial-gradient(circle at top right, rgba(155, 17, 30, 0.98) 0%, rgba(155, 17, 30, 0.8) 25%, transparent 50%),
                      radial-gradient(circle at bottom left, rgba(155, 17, 30, 0.98) 0%, rgba(155, 17, 30, 0.8) 25%, transparent 50%),
                      linear-gradient(135deg, rgba(155, 17, 30, 0.3) 0%, rgba(155, 17, 30, 0.6) 100%)
                    `
                  }}></div>

                  {/* Top right content */}
                  <div className="absolute top-6 right-6 text-right">
                    <div className="inline-block px-4 py-2 rounded-lg mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 12px rgba(255, 215, 0, 0.5)'
                    }}>
                      <p className="text-xs font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#9B111E' }}>
                        ⛩️ TEMPLE TOUR
                      </p>
                    </div>
                    <h3 className="text-3xl font-black mb-2" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '3px 3px 12px rgba(0, 0, 0, 0.95)'
                    }}>
                      วัดญี่ปุ่น<br/>
                      <span style={{ color: '#FFFFFF' }}>สวยงาม</span>
                    </h3>
                  </div>

                  {/* Bottom left content */}
                  <div className="absolute bottom-6 left-6">
                    <p className="text-base mb-3" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                    }}>
                      เกียวโต-นารา วัดโบราณ 5D3N
                    </p>
                    <div className="mb-3">
                      <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                        46,999.-
                      </p>
                      <h1 className="text-6xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                      }}>
                        33,999.-
                      </h1>
                    </div>
                    <button className="px-7 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#9B111E',
                      fontFamily: 'Kanit, sans-serif'
                    }}>
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [32]
                  </span>
                </div>
              </div>

              {/* Card 33 - Spiral Fade (Cerise) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&q=80"
                    alt="Kyoto Bamboo Forest"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Spiral fade overlay */}
                  <div className="absolute inset-0" style={{
                    background: `
                      conic-gradient(
                        from 0deg at 50% 50%,
                        rgba(185, 29, 71, 0.98) 0deg,
                        rgba(185, 29, 71, 0.9) 60deg,
                        rgba(185, 29, 71, 0.7) 120deg,
                        rgba(185, 29, 71, 0.5) 180deg,
                        rgba(185, 29, 71, 0.7) 240deg,
                        rgba(185, 29, 71, 0.9) 300deg,
                        rgba(185, 29, 71, 0.98) 360deg
                      )
                    `
                  }}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#B91D47' }}>
                        🎋 BAMBOO FOREST
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      ป่าไผ่<br/>
                      <span style={{ color: '#FFFFFF' }}>สุดสวยงาม</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      เกียวโต-อาราชิยาม่า ป่าไผ่ 5D3N
                    </p>

                    <h1 className="text-7xl font-black mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                    }}>
                      37,999.-
                    </h1>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#B91D47',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      จองเลย
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [33]
                  </span>
                </div>
              </div>

              {/* Card 34 - Cross Hatch (Lava) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1549693578-d683be217e58?w=800&q=80"
                    alt="Tokyo Skytree"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Cross hatch pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 10px,
                        rgba(194, 24, 7, 0.3) 10px,
                        rgba(194, 24, 7, 0.3) 12px
                      ),
                      repeating-linear-gradient(
                        -45deg,
                        transparent,
                        transparent 10px,
                        rgba(194, 24, 7, 0.3) 10px,
                        rgba(194, 24, 7, 0.3) 12px
                      ),
                      linear-gradient(to bottom, rgba(194, 24, 7, 0.7) 0%, rgba(194, 24, 7, 0.95) 100%)
                    `
                  }}></div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="inline-block px-4 py-2 rounded-lg mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 12px rgba(255, 215, 0, 0.5)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#C21807' }}>
                        🗼 SKYTREE SPECIAL
                      </p>
                    </div>

                    <h3 className="text-4xl font-black mb-2" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '3px 3px 12px rgba(0, 0, 0, 0.95)'
                    }}>
                      สกายทรี<br/>
                      <span style={{ color: '#FFFFFF' }}>สุดตระการตา</span>
                    </h3>
                    <p className="text-base mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                    }}>
                      โตเกียว-สกายทรี-อาซากุสะ 5D3N
                    </p>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                          44,999.-
                        </p>
                        <h1 className="text-6xl font-black" style={{
                          fontFamily: 'Kanit, sans-serif',
                          color: '#FFFFFF',
                          textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                        }}>
                          31,999.-
                        </h1>
                      </div>
                      <button className="px-7 py-3 rounded-xl font-bold" style={{
                        background: '#FFFFFF',
                        color: '#C21807',
                        fontFamily: 'Kanit, sans-serif'
                      }}>
                        จองด่วน
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [34]
                  </span>
                </div>
              </div>

              {/* Card 35 - Rain Drops (English Red) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80"
                    alt="Traditional Crafts"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Rain drops pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      radial-gradient(ellipse 20px 40px at 15% 10%, rgba(171, 75, 82, 0.9), transparent),
                      radial-gradient(ellipse 20px 40px at 45% 15%, rgba(171, 75, 82, 0.85), transparent),
                      radial-gradient(ellipse 20px 40px at 75% 20%, rgba(171, 75, 82, 0.9), transparent),
                      radial-gradient(ellipse 20px 40px at 25% 40%, rgba(171, 75, 82, 0.88), transparent),
                      radial-gradient(ellipse 20px 40px at 55% 45%, rgba(171, 75, 82, 0.9), transparent),
                      radial-gradient(ellipse 20px 40px at 85% 50%, rgba(171, 75, 82, 0.87), transparent),
                      radial-gradient(ellipse 20px 40px at 10% 65%, rgba(171, 75, 82, 0.9), transparent),
                      radial-gradient(ellipse 20px 40px at 40% 70%, rgba(171, 75, 82, 0.85), transparent),
                      radial-gradient(ellipse 20px 40px at 70% 75%, rgba(171, 75, 82, 0.9), transparent),
                      radial-gradient(ellipse 20px 40px at 30% 88%, rgba(171, 75, 82, 0.88), transparent),
                      radial-gradient(ellipse 20px 40px at 60% 92%, rgba(171, 75, 82, 0.9), transparent),
                      radial-gradient(ellipse 20px 40px at 90% 95%, rgba(171, 75, 82, 0.87), transparent),
                      linear-gradient(to bottom, rgba(171, 75, 82, 0.3) 0%, rgba(171, 75, 82, 0.95) 100%)
                    `
                  }}></div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <div className="inline-block px-4 py-2 rounded-lg mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 12px rgba(255, 215, 0, 0.5)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#AB4B52' }}>
                        🎭 CRAFT TOUR
                      </p>
                    </div>

                    <h3 className="text-4xl font-black mb-2" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '3px 3px 12px rgba(0, 0, 0, 0.95)'
                    }}>
                      งานฝีมือ<br/>
                      <span style={{ color: '#FFFFFF' }}>สุดประณีต</span>
                    </h3>
                    <p className="text-base mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'
                    }}>
                      เกียวโต-คานาซาว่า ศิลปะญี่ปุ่น 5D3N
                    </p>

                    <div className="mb-4">
                      <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                        48,999.-
                      </p>
                      <h1 className="text-6xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                      }}>
                        35,999.-
                      </h1>
                    </div>

                    <button className="px-7 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#AB4B52',
                      fontFamily: 'Kanit, sans-serif'
                    }}>
                      สำรองที่
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [35]
                  </span>
                </div>
              </div>

              {/* Card 36 - Square Grid Fade (Blood Red) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1555217851-6141535bd771?w=800&q=80"
                    alt="Market Tour"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Square grid fade pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      repeating-linear-gradient(
                        0deg,
                        rgba(138, 7, 7, 0.8) 0px,
                        rgba(138, 7, 7, 0.8) 2px,
                        transparent 2px,
                        transparent 50px
                      ),
                      repeating-linear-gradient(
                        90deg,
                        rgba(138, 7, 7, 0.8) 0px,
                        rgba(138, 7, 7, 0.8) 2px,
                        transparent 2px,
                        transparent 50px
                      ),
                      linear-gradient(135deg, rgba(138, 7, 7, 0.5) 0%, rgba(138, 7, 7, 0.95) 100%)
                    `
                  }}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#8A0707' }}>
                        🏪 MARKET
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      ตลาดญี่ปุ่น<br/>
                      <span style={{ color: '#FFFFFF' }}>สุดฮิต!</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      โตเกียว-โอซาก้า ชิม ช้อป ชิล 5D3N
                    </p>

                    <h1 className="text-7xl font-black mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                    }}>
                      36,999.-
                    </h1>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#8A0707',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [36]
                  </span>
                </div>
              </div>

              {/* Card 37 - Mega Finale All Patterns (Shiraz) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80"
                    alt="Grand Ultimate"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Mega finale - combination of all patterns */}
                  <div className="absolute inset-0" style={{
                    background: `
                      conic-gradient(
                        from 0deg at 50% 50%,
                        rgba(181, 18, 27, 0.3) 0deg,
                        rgba(181, 18, 27, 0.8) 45deg,
                        rgba(181, 18, 27, 0.3) 90deg,
                        rgba(181, 18, 27, 0.8) 135deg,
                        rgba(181, 18, 27, 0.3) 180deg,
                        rgba(181, 18, 27, 0.8) 225deg,
                        rgba(181, 18, 27, 0.3) 270deg,
                        rgba(181, 18, 27, 0.8) 315deg,
                        rgba(181, 18, 27, 0.3) 360deg
                      ),
                      radial-gradient(circle at 50% 50%, transparent 0%, transparent 15%, rgba(181, 18, 27, 0.4) 15%, transparent 20%),
                      radial-gradient(circle at 50% 50%, transparent 0%, transparent 30%, rgba(181, 18, 27, 0.6) 30%, transparent 35%),
                      radial-gradient(circle at 50% 50%, transparent 0%, transparent 45%, rgba(181, 18, 27, 0.8) 45%, transparent 50%),
                      radial-gradient(ellipse at center, transparent 50%, rgba(181, 18, 27, 0.98) 100%)
                    `
                  }}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#B5121B' }}>
                        👑 GRAND FINALE
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      แกรนด์<br/>
                      <span style={{ color: '#FFFFFF' }}>ฟินาเล่!</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      ญี่ปุ่น 5 เมือง ครบทุกที่ 10D8N
                    </p>

                    <div className="mb-4">
                      <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                        119,999.-
                      </p>
                      <h1 className="text-7xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                      }}>
                        79,999.-
                      </h1>
                    </div>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#B5121B',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      จองเลย!
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [37]
                  </span>
                </div>
              </div>

              {/* Card 38 - Flower Petals (Jasper) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80"
                    alt="Hanami Party"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Flower petals pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      radial-gradient(ellipse 60px 30px at 30% 30%, rgba(215, 59, 62, 0.9) 0%, transparent 50%),
                      radial-gradient(ellipse 60px 30px at 70% 30%, rgba(215, 59, 62, 0.9) 0%, transparent 50%),
                      radial-gradient(ellipse 30px 60px at 50% 20%, rgba(215, 59, 62, 0.9) 0%, transparent 50%),
                      radial-gradient(ellipse 60px 30px at 30% 70%, rgba(215, 59, 62, 0.8) 0%, transparent 50%),
                      radial-gradient(ellipse 60px 30px at 70% 70%, rgba(215, 59, 62, 0.8) 0%, transparent 50%),
                      radial-gradient(ellipse 30px 60px at 50% 80%, rgba(215, 59, 62, 0.8) 0%, transparent 50%),
                      radial-gradient(ellipse at center, transparent 40%, rgba(215, 59, 62, 0.98) 100%)
                    `
                  }}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#D73B3E' }}>
                        🌺 HANAMI
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      ฮานามิ<br/>
                      <span style={{ color: '#FFFFFF' }}>ปาร์ตี้!</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      โตเกียว-อุเอโนะ ปิกนิกชมซากุระ 5D3N
                    </p>

                    <h1 className="text-7xl font-black mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                    }}>
                      44,999.-
                    </h1>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#D73B3E',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [38]
                  </span>
                </div>
              </div>

              {/* Card 39 - Scattered Petals (Dark Salmon) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1554797589-7241bb691973?w=800&q=80"
                    alt="Sumo Wrestling"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Scattered petals pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      radial-gradient(ellipse 15% 20% at 20% 30%, rgba(233, 150, 122, 0.85) 0%, transparent 50%),
                      radial-gradient(ellipse 12% 18% at 60% 20%, rgba(233, 150, 122, 0.8) 0%, transparent 50%),
                      radial-gradient(ellipse 18% 22% at 80% 45%, rgba(233, 150, 122, 0.9) 0%, transparent 50%),
                      radial-gradient(ellipse 14% 19% at 15% 60%, rgba(233, 150, 122, 0.75) 0%, transparent 50%),
                      radial-gradient(ellipse 16% 21% at 45% 70%, rgba(233, 150, 122, 0.85) 0%, transparent 50%),
                      radial-gradient(ellipse 13% 17% at 75% 75%, rgba(233, 150, 122, 0.8) 0%, transparent 50%),
                      radial-gradient(ellipse 17% 23% at 30% 85%, rgba(233, 150, 122, 0.9) 0%, transparent 50%),
                      radial-gradient(ellipse 15% 19% at 90% 25%, rgba(233, 150, 122, 0.75) 0%, transparent 50%),
                      radial-gradient(ellipse at center, transparent 30%, rgba(233, 150, 122, 0.98) 100%)
                    `
                  }}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#E9967A' }}>
                        🤼 SUMO
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      ซูโม่<br/>
                      <span style={{ color: '#FFFFFF' }}>มวยปล้ำ!</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      โตเกียว ชมซูโม่สด โรงซ้อม 5D4N
                    </p>

                    <h1 className="text-7xl font-black mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                    }}>
                      43,999.-
                    </h1>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#E9967A',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [39]
                  </span>
                </div>
              </div>

              {/* Card 40 - Plasma Wave (Venetian Red) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&q=80"
                    alt="Onsen Spa"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Plasma wave pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      radial-gradient(ellipse 50% 80% at 20% 30%, rgba(200, 8, 21, 0.7) 0%, transparent 50%),
                      radial-gradient(ellipse 60% 70% at 80% 40%, rgba(200, 8, 21, 0.6) 0%, transparent 50%),
                      radial-gradient(ellipse 55% 75% at 40% 70%, rgba(200, 8, 21, 0.8) 0%, transparent 50%),
                      radial-gradient(ellipse 65% 65% at 70% 80%, rgba(200, 8, 21, 0.65) 0%, transparent 50%),
                      radial-gradient(ellipse 45% 85% at 90% 20%, rgba(200, 8, 21, 0.75) 0%, transparent 50%),
                      radial-gradient(ellipse 70% 60% at 10% 85%, rgba(200, 8, 21, 0.7) 0%, transparent 50%),
                      radial-gradient(ellipse at center, transparent 25%, rgba(200, 8, 21, 0.98) 100%)
                    `
                  }}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#C80815' }}>
                        ♨️ ONSEN SPA
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      ออนเซ็น<br/>
                      <span style={{ color: '#FFFFFF' }}>สปาพรีเมี่ยม!</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      ฮาโกเน่-เบปปุ ออนเซ็นหรู 8D7N
                    </p>

                    <div className="mb-4">
                      <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                        109,999.-
                      </p>
                      <h1 className="text-7xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                      }}>
                        75,999.-
                      </h1>
                    </div>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#C80815',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [40]
                  </span>
                </div>
              </div>

              {/* Card 41 - Quantum Dots (Scarlet Red) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80"
                    alt="Zen Retreat"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Quantum dots pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      radial-gradient(circle at 15% 15%, rgba(253, 21, 27, 0.8) 0%, rgba(253, 21, 27, 0.8) 2px, transparent 2px),
                      radial-gradient(circle at 35% 25%, rgba(253, 21, 27, 0.7) 0%, rgba(253, 21, 27, 0.7) 3px, transparent 3px),
                      radial-gradient(circle at 65% 15%, rgba(253, 21, 27, 0.6) 0%, rgba(253, 21, 27, 0.6) 2px, transparent 2px),
                      radial-gradient(circle at 85% 30%, rgba(253, 21, 27, 0.8) 0%, rgba(253, 21, 27, 0.8) 2px, transparent 2px),
                      radial-gradient(circle at 25% 45%, rgba(253, 21, 27, 0.7) 0%, rgba(253, 21, 27, 0.7) 2px, transparent 2px),
                      radial-gradient(circle at 45% 55%, rgba(253, 21, 27, 0.6) 0%, rgba(253, 21, 27, 0.6) 3px, transparent 3px),
                      radial-gradient(circle at 75% 50%, rgba(253, 21, 27, 0.8) 0%, rgba(253, 21, 27, 0.8) 2px, transparent 2px),
                      radial-gradient(circle at 10% 70%, rgba(253, 21, 27, 0.7) 0%, rgba(253, 21, 27, 0.7) 2px, transparent 2px),
                      radial-gradient(circle at 55% 75%, rgba(253, 21, 27, 0.6) 0%, rgba(253, 21, 27, 0.6) 2px, transparent 2px),
                      radial-gradient(circle at 90% 85%, rgba(253, 21, 27, 0.8) 0%, rgba(253, 21, 27, 0.8) 3px, transparent 3px),
                      radial-gradient(ellipse at center, transparent 28%, rgba(253, 21, 27, 0.98) 100%)
                    `
                  }}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#FD151B' }}>
                        🧘 ZEN RETREAT
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      เซน<br/>
                      <span style={{ color: '#FFFFFF' }}>สันติภาพ!</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      เกียวโต วัดเซน สมาธิ ธรรมะ 7D6N
                    </p>

                    <h1 className="text-7xl font-black mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                    }}>
                      78,999.-
                    </h1>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#FD151B',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [41]
                  </span>
                </div>
              </div>

              {/* Card 42 - Fractal Branches (Burgundy Wine) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80"
                    alt="Autumn Colors"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Fractal branches pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      linear-gradient(90deg, rgba(145, 0, 25, 0.8) 0%, transparent 5%),
                      linear-gradient(60deg, rgba(145, 0, 25, 0.7) 0%, transparent 5%),
                      linear-gradient(30deg, rgba(145, 0, 25, 0.6) 0%, transparent 5%),
                      linear-gradient(120deg, rgba(145, 0, 25, 0.7) 0%, transparent 5%),
                      linear-gradient(150deg, rgba(145, 0, 25, 0.6) 0%, transparent 5%),
                      linear-gradient(0deg, rgba(145, 0, 25, 0.8) 0%, transparent 5%),
                      linear-gradient(45deg, rgba(145, 0, 25, 0.5) 0%, transparent 8%),
                      linear-gradient(135deg, rgba(145, 0, 25, 0.5) 0%, transparent 8%),
                      linear-gradient(to right, rgba(145, 0, 25, 0.4) 0%, transparent 15%),
                      radial-gradient(ellipse at center, transparent 25%, rgba(145, 0, 25, 0.98) 100%)
                    `,
                    backgroundPosition: '0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 30% 80%, 70% 80%, 50% 90%, center'
                  }}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#910019' }}>
                        🍁 AUTUMN COLORS
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      ใบไม้เปลี่ยนสี<br/>
                      <span style={{ color: '#FFFFFF' }}>งดงาม!</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      นิกโกะ-คามิโคจิ ฤดูใบไม้ร่วง 8D7N
                    </p>

                    <div className="mb-4">
                      <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                        129,999.-
                      </p>
                      <h1 className="text-7xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                      }}>
                        85,999.-
                      </h1>
                    </div>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#910019',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [42]
                  </span>
                </div>
              </div>

              {/* Card 43 - Lava Flow (Red Orange) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80"
                    alt="Luxury Shopping"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Lava flow pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      radial-gradient(ellipse 40% 60% at 30% 20%, rgba(255, 24, 0, 0.8) 0%, transparent 50%),
                      radial-gradient(ellipse 50% 70% at 70% 35%, rgba(255, 24, 0, 0.7) 0%, transparent 50%),
                      radial-gradient(ellipse 45% 65% at 15% 60%, rgba(255, 24, 0, 0.85) 0%, transparent 50%),
                      radial-gradient(ellipse 55% 75% at 85% 70%, rgba(255, 24, 0, 0.75) 0%, transparent 50%),
                      radial-gradient(ellipse 35% 55% at 50% 85%, rgba(255, 24, 0, 0.9) 0%, transparent 50%),
                      linear-gradient(to bottom, transparent 0%, rgba(255, 24, 0, 0.3) 50%, rgba(255, 24, 0, 0.6) 100%),
                      radial-gradient(ellipse at center, transparent 20%, rgba(255, 24, 0, 0.98) 100%)
                    `
                  }}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#FF1800' }}>
                        🛍️ LUXURY SHOPPING
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      ช้อปหรู<br/>
                      <span style={{ color: '#FFFFFF' }}>เต็มที่!</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      โตเกียว-โอซาก้า ช้อปปิ้งหรู 12D11N
                    </p>

                    <div className="mb-4">
                      <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                        229,999.-
                      </p>
                      <h1 className="text-7xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                      }}>
                        149,999.-
                      </h1>
                    </div>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#FF1800',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [43]
                  </span>
                </div>
              </div>

              {/* Card 44 - Prism Light (Persian Orange Red) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80"
                    alt="Jazz Club"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Prism light pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      linear-gradient(45deg, rgba(224, 60, 49, 0.8) 0%, transparent 20%),
                      linear-gradient(90deg, transparent 20%, rgba(224, 60, 49, 0.7) 40%, transparent 60%),
                      linear-gradient(135deg, transparent 40%, rgba(224, 60, 49, 0.8) 60%, transparent 80%),
                      linear-gradient(180deg, transparent 60%, rgba(224, 60, 49, 0.7) 80%, transparent 100%),
                      linear-gradient(-45deg, rgba(224, 60, 49, 0.6) 0%, transparent 30%),
                      radial-gradient(ellipse at center, transparent 25%, rgba(224, 60, 49, 0.98) 100%)
                    `
                  }}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#E03C31' }}>
                        🎷 JAZZ CLUB
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      แจ๊ส<br/>
                      <span style={{ color: '#FFFFFF' }}>สุดเจ๋ง!</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      โตเกียว แจ๊สคลับ ดนตรีสด 6D5N
                    </p>

                    <h1 className="text-7xl font-black mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                    }}>
                      102,999.-
                    </h1>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#E03C31',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [44]
                  </span>
                </div>
              </div>

              {/* Card 45 - Tornado Spiral (Red RYB) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80"
                    alt="Yacht Cruise"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Tornado spiral pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      conic-gradient(
                        from 45deg at 50% 50%,
                        rgba(247, 35, 12, 0.9) 0deg,
                        rgba(247, 35, 12, 0.6) 60deg,
                        rgba(247, 35, 12, 0.3) 120deg,
                        transparent 180deg,
                        transparent 240deg,
                        rgba(247, 35, 12, 0.3) 300deg,
                        rgba(247, 35, 12, 0.6) 330deg,
                        rgba(247, 35, 12, 0.9) 360deg
                      ),
                      repeating-radial-gradient(
                        circle at 50% 50%,
                        transparent 0%,
                        transparent 8%,
                        rgba(247, 35, 12, 0.2) 8%,
                        rgba(247, 35, 12, 0.2) 10%,
                        transparent 10%,
                        transparent 18%
                      ),
                      radial-gradient(ellipse at center, transparent 20%, rgba(247, 35, 12, 0.98) 100%)
                    `
                  }}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#F7230C' }}>
                        ⛵ YACHT CRUISE
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      ล่องเรือยอชท์<br/>
                      <span style={{ color: '#FFFFFF' }}>หรูหรา!</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      โอกินาว่า ล่องยอชท์ ทะเล 7D6N
                    </p>

                    <div className="mb-4">
                      <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                        169,999.-
                      </p>
                      <h1 className="text-7xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                      }}>
                        108,999.-
                      </h1>
                    </div>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#F7230C',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [45]
                  </span>
                </div>
              </div>

              {/* Card 46 - Particle Wave (Pigment Red) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80"
                    alt="Meditation Retreat"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Particle wave pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      radial-gradient(circle at 10% 20%, rgba(237, 28, 36, 0.7) 0%, rgba(237, 28, 36, 0.7) 1px, transparent 1px),
                      radial-gradient(circle at 30% 15%, rgba(237, 28, 36, 0.6) 0%, rgba(237, 28, 36, 0.6) 2px, transparent 2px),
                      radial-gradient(circle at 50% 25%, rgba(237, 28, 36, 0.8) 0%, rgba(237, 28, 36, 0.8) 1px, transparent 1px),
                      radial-gradient(circle at 70% 18%, rgba(237, 28, 36, 0.5) 0%, rgba(237, 28, 36, 0.5) 2px, transparent 2px),
                      radial-gradient(circle at 90% 30%, rgba(237, 28, 36, 0.7) 0%, rgba(237, 28, 36, 0.7) 1px, transparent 1px),
                      radial-gradient(circle at 20% 50%, rgba(237, 28, 36, 0.6) 0%, rgba(237, 28, 36, 0.6) 2px, transparent 2px),
                      radial-gradient(circle at 40% 55%, rgba(237, 28, 36, 0.8) 0%, rgba(237, 28, 36, 0.8) 1px, transparent 1px),
                      radial-gradient(circle at 60% 48%, rgba(237, 28, 36, 0.7) 0%, rgba(237, 28, 36, 0.7) 2px, transparent 2px),
                      radial-gradient(circle at 80% 60%, rgba(237, 28, 36, 0.6) 0%, rgba(237, 28, 36, 0.6) 1px, transparent 1px),
                      radial-gradient(circle at 15% 80%, rgba(237, 28, 36, 0.8) 0%, rgba(237, 28, 36, 0.8) 2px, transparent 2px),
                      radial-gradient(circle at 35% 75%, rgba(237, 28, 36, 0.7) 0%, rgba(237, 28, 36, 0.7) 1px, transparent 1px),
                      radial-gradient(circle at 55% 85%, rgba(237, 28, 36, 0.6) 0%, rgba(237, 28, 36, 0.6) 2px, transparent 2px),
                      radial-gradient(circle at 75% 78%, rgba(237, 28, 36, 0.8) 0%, rgba(237, 28, 36, 0.8) 1px, transparent 1px),
                      radial-gradient(circle at 95% 90%, rgba(237, 28, 36, 0.7) 0%, rgba(237, 28, 36, 0.7) 2px, transparent 2px),
                      radial-gradient(ellipse at center, transparent 25%, rgba(237, 28, 36, 0.98) 100%)
                    `
                  }}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#ED1C24' }}>
                        🧘‍♀️ MEDITATION
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      สมาธิ<br/>
                      <span style={{ color: '#FFFFFF' }}>พักผ่อน!</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      เกียวโต รีทรีท วิปัสสนา 8D7N
                    </p>

                    <div className="mb-4">
                      <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                        179,999.-
                      </p>
                      <h1 className="text-7xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                      }}>
                        118,999.-
                      </h1>
                    </div>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#ED1C24',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [46]
                  </span>
                </div>
              </div>

              {/* Card 47 - Lightning Net (Dark Candy Apple Red) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80"
                    alt="Ninja Village"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Lightning net pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      linear-gradient(30deg, rgba(164, 0, 0, 0.8) 0%, transparent 8%, transparent 92%, rgba(164, 0, 0, 0.8) 100%),
                      linear-gradient(60deg, transparent 0%, rgba(164, 0, 0, 0.7) 8%, transparent 16%, transparent 84%, rgba(164, 0, 0, 0.7) 92%),
                      linear-gradient(90deg, rgba(164, 0, 0, 0.6) 0%, transparent 8%, transparent 92%, rgba(164, 0, 0, 0.6) 100%),
                      linear-gradient(120deg, transparent 0%, rgba(164, 0, 0, 0.7) 8%, transparent 16%, transparent 84%, rgba(164, 0, 0, 0.7) 92%),
                      linear-gradient(150deg, rgba(164, 0, 0, 0.8) 0%, transparent 8%, transparent 92%, rgba(164, 0, 0, 0.8) 100%),
                      radial-gradient(ellipse at center, transparent 25%, rgba(164, 0, 0, 0.98) 100%)
                    `
                  }}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#A40000' }}>
                        🥷 NINJA VILLAGE
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      หมู่บ้านนินจา<br/>
                      <span style={{ color: '#FFFFFF' }}>ลึกลับ!</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      อิงะ-โคกะ หมู่บ้านนินจา 7D6N
                    </p>

                    <h1 className="text-7xl font-black mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                    }}>
                      122,999.-
                    </h1>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#A40000',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [47]
                  </span>
                </div>
              </div>

              {/* Card 48 - Laser Beams (Candy Apple Red) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80"
                    alt="Future City"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Laser beams pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      linear-gradient(25deg, rgba(255, 8, 0, 0.8) 0%, rgba(255, 8, 0, 0.8) 2%, transparent 2%),
                      linear-gradient(50deg, transparent 0%, rgba(255, 8, 0, 0.7) 10%, rgba(255, 8, 0, 0.7) 12%, transparent 12%),
                      linear-gradient(75deg, transparent 0%, rgba(255, 8, 0, 0.6) 20%, rgba(255, 8, 0, 0.6) 22%, transparent 22%),
                      linear-gradient(100deg, transparent 0%, rgba(255, 8, 0, 0.8) 30%, rgba(255, 8, 0, 0.8) 32%, transparent 32%),
                      linear-gradient(125deg, transparent 0%, rgba(255, 8, 0, 0.7) 40%, rgba(255, 8, 0, 0.7) 42%, transparent 42%),
                      linear-gradient(150deg, transparent 0%, rgba(255, 8, 0, 0.6) 50%, rgba(255, 8, 0, 0.6) 52%, transparent 52%),
                      radial-gradient(ellipse at center, transparent 25%, rgba(255, 8, 0, 0.98) 100%)
                    `
                  }}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#FF0800' }}>
                        🌆 FUTURE CITY
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      เมืองแห่งอนาคต<br/>
                      <span style={{ color: '#FFFFFF' }}>ล้ำยุค!</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      โตเกียว-โอซาก้า อนาคต 9D8N
                    </p>

                    <div className="mb-4">
                      <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                        219,999.-
                      </p>
                      <h1 className="text-7xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                      }}>
                        138,999.-
                      </h1>
                    </div>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#FF0800',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [48]
                  </span>
                </div>
              </div>

              {/* Card 49 - Pulse Wave (Crimson Deeper) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80"
                    alt="Cherry Blossom Premium"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Pulse wave pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      radial-gradient(ellipse 120% 30% at 50% 10%, rgba(153, 0, 0, 0.8) 0%, transparent 50%),
                      radial-gradient(ellipse 110% 25% at 50% 30%, rgba(153, 0, 0, 0.7) 0%, transparent 50%),
                      radial-gradient(ellipse 130% 35% at 50% 50%, rgba(153, 0, 0, 0.6) 0%, transparent 50%),
                      radial-gradient(ellipse 110% 25% at 50% 70%, rgba(153, 0, 0, 0.7) 0%, transparent 50%),
                      radial-gradient(ellipse 120% 30% at 50% 90%, rgba(153, 0, 0, 0.8) 0%, transparent 50%),
                      radial-gradient(ellipse at center, transparent 20%, rgba(153, 0, 0, 0.98) 100%)
                    `
                  }}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#990000' }}>
                        🌸 SAKURA ULTRA
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      ซากุระอัลตร้า<br/>
                      <span style={{ color: '#FFFFFF' }}>หรูสุดๆ!</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      ทั่วญี่ปุ่น ซากุระหรู 15D14N
                    </p>

                    <div className="mb-4">
                      <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                        399,999.-
                      </p>
                      <h1 className="text-7xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                      }}>
                        198,999.-
                      </h1>
                    </div>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#990000',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [49]
                  </span>
                </div>
              </div>

              {/* Card 50 - Concentric Squares (Carmine Red) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=80"
                    alt="Traditional Garden"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Concentric squares pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      linear-gradient(to right, rgba(163, 0, 33, 0.9) 0%, transparent 5%, transparent 95%, rgba(163, 0, 33, 0.9) 100%),
                      linear-gradient(to bottom, rgba(163, 0, 33, 0.9) 0%, transparent 5%, transparent 95%, rgba(163, 0, 33, 0.9) 100%),
                      linear-gradient(to right, transparent 0%, transparent 10%, rgba(163, 0, 33, 0.8) 10%, rgba(163, 0, 33, 0.8) 12%, transparent 12%, transparent 88%, rgba(163, 0, 33, 0.8) 88%, rgba(163, 0, 33, 0.8) 90%, transparent 90%, transparent 100%),
                      linear-gradient(to bottom, transparent 0%, transparent 10%, rgba(163, 0, 33, 0.8) 10%, rgba(163, 0, 33, 0.8) 12%, transparent 12%, transparent 88%, rgba(163, 0, 33, 0.8) 88%, rgba(163, 0, 33, 0.8) 90%, transparent 90%, transparent 100%),
                      linear-gradient(to right, transparent 0%, transparent 20%, rgba(163, 0, 33, 0.7) 20%, rgba(163, 0, 33, 0.7) 22%, transparent 22%, transparent 78%, rgba(163, 0, 33, 0.7) 78%, rgba(163, 0, 33, 0.7) 80%, transparent 80%, transparent 100%),
                      linear-gradient(to bottom, transparent 0%, transparent 20%, rgba(163, 0, 33, 0.7) 20%, rgba(163, 0, 33, 0.7) 22%, transparent 22%, transparent 78%, rgba(163, 0, 33, 0.7) 78%, rgba(163, 0, 33, 0.7) 80%, transparent 80%, transparent 100%),
                      radial-gradient(ellipse at center, transparent 35%, rgba(163, 0, 33, 0.98) 100%)
                    `
                  }}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#A30021' }}>
                        🏯 GARDEN
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      สวนญี่ปุ่น<br/>
                      <span style={{ color: '#FFFFFF' }}>ดั้งเดิม!</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      เกียวโต Zen Garden Tour 5D4N
                    </p>

                    <div className="mb-4">
                      <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                        85,999.-
                      </p>
                      <h1 className="text-7xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                      }}>
                        56,999.-
                      </h1>
                    </div>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#A30021',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [50]
                  </span>
                </div>
              </div>

              {/* Card 51 - Scattered Dots (Dark Sienna) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80"
                    alt="Coffee Tour"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Scattered dots pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      radial-gradient(circle at 12% 18%, rgba(60, 20, 20, 0.9) 0%, transparent 2.5%),
                      radial-gradient(circle at 28% 12%, rgba(60, 20, 20, 0.85) 0%, transparent 2%),
                      radial-gradient(circle at 45% 8%, rgba(60, 20, 20, 0.8) 0%, transparent 1.8%),
                      radial-gradient(circle at 62% 15%, rgba(60, 20, 20, 0.9) 0%, transparent 2.3%),
                      radial-gradient(circle at 78% 11%, rgba(60, 20, 20, 0.85) 0%, transparent 2%),
                      radial-gradient(circle at 88% 22%, rgba(60, 20, 20, 0.8) 0%, transparent 2.2%),
                      radial-gradient(circle at 8% 38%, rgba(60, 20, 20, 0.85) 0%, transparent 2.1%),
                      radial-gradient(circle at 22% 42%, rgba(60, 20, 20, 0.9) 0%, transparent 2.4%),
                      radial-gradient(circle at 38% 35%, rgba(60, 20, 20, 0.8) 0%, transparent 1.9%),
                      radial-gradient(circle at 55% 48%, rgba(60, 20, 20, 0.85) 0%, transparent 2%),
                      radial-gradient(circle at 72% 42%, rgba(60, 20, 20, 0.9) 0%, transparent 2.3%),
                      radial-gradient(circle at 85% 45%, rgba(60, 20, 20, 0.8) 0%, transparent 2%),
                      radial-gradient(circle at 15% 65%, rgba(60, 20, 20, 0.9) 0%, transparent 2.2%),
                      radial-gradient(circle at 32% 72%, rgba(60, 20, 20, 0.85) 0%, transparent 2.1%),
                      radial-gradient(circle at 48% 68%, rgba(60, 20, 20, 0.8) 0%, transparent 1.8%),
                      radial-gradient(circle at 65% 75%, rgba(60, 20, 20, 0.9) 0%, transparent 2.4%),
                      radial-gradient(circle at 82% 68%, rgba(60, 20, 20, 0.85) 0%, transparent 2%),
                      radial-gradient(circle at 92% 85%, rgba(60, 20, 20, 0.8) 0%, transparent 2.3%),
                      radial-gradient(ellipse at center, transparent 20%, rgba(60, 20, 20, 0.98) 100%)
                    `
                  }}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#3C1414' }}>
                        ☕ COFFEE
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      คาเฟ่<br/>
                      <span style={{ color: '#FFFFFF' }}>แสนพิเศษ!</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      โตเกียว Coffee Culture Tour 4D3N
                    </p>

                    <div className="mb-4">
                      <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                        68,999.-
                      </p>
                      <h1 className="text-7xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                      }}>
                        46,999.-
                      </h1>
                    </div>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#3C1414',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      จองทันที
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [51]
                  </span>
                </div>
              </div>

              {/* Card 52 - Dotted Grid (Chestnut) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=800&q=80"
                    alt="Sushi Master"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Dotted grid pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      radial-gradient(circle at 0% 0%, rgba(149, 69, 53, 0.85) 0%, transparent 1.5%),
                      radial-gradient(circle at 20% 0%, rgba(149, 69, 53, 0.85) 0%, transparent 1.5%),
                      radial-gradient(circle at 40% 0%, rgba(149, 69, 53, 0.85) 0%, transparent 1.5%),
                      radial-gradient(circle at 60% 0%, rgba(149, 69, 53, 0.85) 0%, transparent 1.5%),
                      radial-gradient(circle at 80% 0%, rgba(149, 69, 53, 0.85) 0%, transparent 1.5%),
                      radial-gradient(circle at 100% 0%, rgba(149, 69, 53, 0.85) 0%, transparent 1.5%),
                      radial-gradient(circle at 0% 20%, rgba(149, 69, 53, 0.85) 0%, transparent 1.5%),
                      radial-gradient(circle at 20% 20%, rgba(149, 69, 53, 0.85) 0%, transparent 1.5%),
                      radial-gradient(circle at 40% 20%, rgba(149, 69, 53, 0.85) 0%, transparent 1.5%),
                      radial-gradient(circle at 60% 20%, rgba(149, 69, 53, 0.85) 0%, transparent 1.5%),
                      radial-gradient(circle at 80% 20%, rgba(149, 69, 53, 0.85) 0%, transparent 1.5%),
                      radial-gradient(circle at 100% 20%, rgba(149, 69, 53, 0.85) 0%, transparent 1.5%),
                      radial-gradient(ellipse at center, transparent 20%, rgba(149, 69, 53, 0.98) 100%)
                    `,
                    backgroundSize: '100% 100%'
                  }}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#954535' }}>
                        🍣 SUSHI MASTER
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      ซูชิ<br/>
                      <span style={{ color: '#FFFFFF' }}>โอมากาเสะ!</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      โตเกียว Omakase Experience 6D5N
                    </p>

                    <div className="mb-4">
                      <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                        159,999.-
                      </p>
                      <h1 className="text-7xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                      }}>
                        99,999.-
                      </h1>
                    </div>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#954535',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      จองด่วน!
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [52]
                  </span>
                </div>
              </div>

              {/* Card 53 - Diagonal Waves (Red Berry) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80"
                    alt="Karaoke"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Diagonal waves pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      radial-gradient(ellipse 300px 100px at 0% 30%, rgba(142, 69, 133, 0.9) 0%, transparent 50%),
                      radial-gradient(ellipse 300px 100px at 100% 40%, rgba(142, 69, 133, 0.85) 0%, transparent 50%),
                      radial-gradient(ellipse 300px 100px at 0% 60%, rgba(142, 69, 133, 0.8) 0%, transparent 50%),
                      radial-gradient(ellipse 300px 100px at 100% 70%, rgba(142, 69, 133, 0.9) 0%, transparent 50%),
                      linear-gradient(
                        135deg,
                        rgba(142, 69, 133, 0.98) 0%,
                        rgba(142, 69, 133, 0.5) 50%,
                        rgba(142, 69, 133, 0.98) 100%
                      )
                    `
                  }}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#8E4585' }}>
                        🎤 KARAOKE
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      คาราโอเกะ<br/>
                      <span style={{ color: '#FFFFFF' }}>พรีเมี่ยม!</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      โตเกียว Karaoke Night 4D3N
                    </p>

                    <div className="mb-4">
                      <h1 className="text-7xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                      }}>
                        38,999.-
                      </h1>
                    </div>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#8E4585',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [53]
                  </span>
                </div>
              </div>

              {/* Card 54 - Cat Island (Red Salsa) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80"
                    alt="Cat Island"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Paw prints pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      radial-gradient(circle at 25% 25%, rgba(253, 58, 74, 0.9) 0%, rgba(253, 58, 74, 0.9) 2%, transparent 2%),
                      radial-gradient(circle at 30% 22%, rgba(253, 58, 74, 0.8) 0%, rgba(253, 58, 74, 0.8) 1%, transparent 1%),
                      radial-gradient(circle at 35% 24%, rgba(253, 58, 74, 0.8) 0%, rgba(253, 58, 74, 0.8) 1%, transparent 1%),
                      radial-gradient(circle at 27% 30%, rgba(253, 58, 74, 0.8) 0%, rgba(253, 58, 74, 0.8) 1%, transparent 1%),
                      radial-gradient(circle at 32% 31%, rgba(253, 58, 74, 0.8) 0%, rgba(253, 58, 74, 0.8) 1%, transparent 1%),
                      radial-gradient(circle at 70% 60%, rgba(253, 58, 74, 0.9) 0%, rgba(253, 58, 74, 0.9) 2%, transparent 2%),
                      radial-gradient(circle at 75% 57%, rgba(253, 58, 74, 0.8) 0%, rgba(253, 58, 74, 0.8) 1%, transparent 1%),
                      radial-gradient(circle at 80% 59%, rgba(253, 58, 74, 0.8) 0%, rgba(253, 58, 74, 0.8) 1%, transparent 1%),
                      repeating-linear-gradient(45deg, transparent 0px, transparent 40px, rgba(253, 58, 74, 0.4) 40px, rgba(253, 58, 74, 0.4) 41px),
                      radial-gradient(ellipse at center, transparent 30%, rgba(253, 58, 74, 0.98) 100%)
                    `
                  }}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#FD3A4A' }}>
                        🐱 CAT ISLAND
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      เกาะ<br/>
                      <span style={{ color: '#FFFFFF' }}>แมว!</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      ทาชิโระจิมะ Cat Island 5D4N
                    </p>

                    <div className="mb-4">
                      <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                        79,999.-
                      </p>
                      <h1 className="text-7xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                      }}>
                        53,999.-
                      </h1>
                    </div>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#FD3A4A',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      จองเลย!
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [54]
                  </span>
                </div>
              </div>

              {/* Card 55 - VR Arcade (Falu Red) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80"
                    alt="VR Arcade"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Virtual grid pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      repeating-linear-gradient(90deg, transparent 0px, transparent 30px, rgba(128, 24, 24, 0.7) 30px, rgba(128, 24, 24, 0.7) 31px),
                      repeating-linear-gradient(0deg, transparent 0px, transparent 30px, rgba(128, 24, 24, 0.7) 30px, rgba(128, 24, 24, 0.7) 31px),
                      linear-gradient(0deg, rgba(128, 24, 24, 0.3) 0%, transparent 50%, rgba(128, 24, 24, 0.3) 100%),
                      radial-gradient(circle at 50% 50%, rgba(128, 24, 24, 0.9) 0%, transparent 20%),
                      radial-gradient(ellipse at center, transparent 30%, rgba(128, 24, 24, 0.98) 100%)
                    `
                  }}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#801818' }}>
                        🕶️ VR ARCADE
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      เวอร์ชวล<br/>
                      <span style={{ color: '#FFFFFF' }}>เรียลลิตี้!</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      อากิฮาบาระ VR Arcade 4D3N
                    </p>

                    <div className="mb-4">
                      <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                        81,999.-
                      </p>
                      <h1 className="text-7xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                      }}>
                        54,999.-
                      </h1>
                    </div>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#801818',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      จองเลย!
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [55]
                  </span>
                </div>
              </div>

              {/* Card 56 - Autumn Leaves (Cornell Red Darker) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=800&q=80"
                    alt="Autumn Leaves"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Falling leaves pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      radial-gradient(ellipse 12px 16px at 20% 15%, rgba(179, 27, 27, 0.85) 0%, transparent 100%),
                      radial-gradient(ellipse 12px 16px at 35% 25%, rgba(179, 27, 27, 0.75) 0%, transparent 100%),
                      radial-gradient(ellipse 12px 16px at 60% 35%, rgba(179, 27, 27, 0.8) 0%, transparent 100%),
                      radial-gradient(ellipse 12px 16px at 75% 50%, rgba(179, 27, 27, 0.75) 0%, transparent 100%),
                      radial-gradient(ellipse 12px 16px at 40% 60%, rgba(179, 27, 27, 0.85) 0%, transparent 100%),
                      radial-gradient(ellipse 12px 16px at 65% 70%, rgba(179, 27, 27, 0.8) 0%, transparent 100%),
                      radial-gradient(ellipse 12px 16px at 25% 80%, rgba(179, 27, 27, 0.75) 0%, transparent 100%),
                      linear-gradient(0deg, rgba(179, 27, 27, 0.9) 0%, transparent 40%),
                      radial-gradient(ellipse at center, transparent 30%, rgba(179, 27, 27, 0.98) 100%)
                    `
                  }}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#B31B1B' }}>
                        🍂 AUTUMN
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      ใบไม้เปลี่ยนสี<br/>
                      <span style={{ color: '#FFFFFF' }}>อัลติเมท!</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      เกียวโต Autumn Leaves Ultimate 10D9N
                    </p>

                    <div className="mb-4">
                      <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                        188,999.-
                      </p>
                      <h1 className="text-7xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                      }}>
                        125,999.-
                      </h1>
                    </div>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#B31B1B',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      จองเลย!
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [56]
                  </span>
                </div>
              </div>

              {/* Card 57 - Manga Museum (Rufous Red) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=800&q=80"
                    alt="Manga Museum"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Comic panels pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      repeating-linear-gradient(90deg, transparent 0px, transparent 120px, rgba(168, 28, 7, 0.8) 120px, rgba(168, 28, 7, 0.8) 123px, transparent 123px, transparent 130px, rgba(168, 28, 7, 0.8) 130px, rgba(168, 28, 7, 0.8) 133px),
                      repeating-linear-gradient(0deg, transparent 0px, transparent 100px, rgba(168, 28, 7, 0.8) 100px, rgba(168, 28, 7, 0.8) 103px),
                      linear-gradient(135deg, rgba(168, 28, 7, 0.25) 0%, transparent 40%, rgba(168, 28, 7, 0.35) 100%),
                      radial-gradient(circle at 30% 40%, rgba(168, 28, 7, 0.92) 0%, transparent 18%),
                      radial-gradient(ellipse at center, transparent 40%, rgba(168, 28, 7, 0.98) 100%)
                    `
                  }}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#A81C07' }}>
                        📚 MANGA WORLD
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      พิพิธภัณฑ์<br/>
                      <span style={{ color: '#FFFFFF' }}>การ์ตูน!</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      เกียวโตมังงะมิวเซียม 4D3N
                    </p>

                    <div className="mb-4">
                      <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                        76,999.-
                      </p>
                      <h1 className="text-7xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                      }}>
                        52,999.-
                      </h1>
                    </div>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#A81C07',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      จองเลย!
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [57]
                  </span>
                </div>
              </div>

              {/* Card 58 - Matsuda Light (Prune) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&q=80"
                    alt="Matsuda Light"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Illumination dots pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      radial-gradient(circle at 15% 20%, rgba(112, 28, 28, 0.92) 0%, transparent 3%),
                      radial-gradient(circle at 35% 15%, rgba(112, 28, 28, 0.88) 0%, transparent 2.5%),
                      radial-gradient(circle at 55% 25%, rgba(112, 28, 28, 0.9) 0%, transparent 3.5%),
                      radial-gradient(circle at 75% 18%, rgba(112, 28, 28, 0.85) 0%, transparent 2.8%),
                      radial-gradient(circle at 85% 30%, rgba(112, 28, 28, 0.9) 0%, transparent 3.2%),
                      radial-gradient(circle at 20% 60%, rgba(112, 28, 28, 0.87) 0%, transparent 3%),
                      radial-gradient(circle at 45% 70%, rgba(112, 28, 28, 0.93) 0%, transparent 3.5%),
                      radial-gradient(circle at 65% 65%, rgba(112, 28, 28, 0.88) 0%, transparent 2.7%),
                      radial-gradient(circle at 80% 75%, rgba(112, 28, 28, 0.9) 0%, transparent 3.3%),
                      linear-gradient(180deg, rgba(112, 28, 28, 0.2) 0%, transparent 40%, rgba(112, 28, 28, 0.3) 100%),
                      radial-gradient(ellipse at center, transparent 42%, rgba(112, 28, 28, 0.98) 100%)
                    `
                  }}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#701C1C' }}>
                        💡 ILLUMINATION
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      มาสุดะ<br/>
                      <span style={{ color: '#FFFFFF' }}>แสงไฟ!</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      มาสุดะอิลลูมิเนชั่น 5D4N
                    </p>

                    <div className="mb-4">
                      <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                        85,999.-
                      </p>
                      <h1 className="text-7xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                      }}>
                        61,999.-
                      </h1>
                    </div>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#701C1C',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      จองเลย!
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [58]
                  </span>
                </div>
              </div>

              {/* Card 59 - Hanami Sakura (Crimson Glory) */}
              <div className="flex-shrink-0 lg:flex-shrink w-[360px] md:w-[420px] lg:w-auto snap-start lg:snap-align-none group">
                <div className="relative h-[360px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80"
                    alt="Hanami Sakura"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Petal fall pattern */}
                  <div className="absolute inset-0" style={{
                    background: `
                      radial-gradient(ellipse 8px 12px at 15% 20%, rgba(190, 0, 50, 0.88) 0%, transparent 50%),
                      radial-gradient(ellipse 10px 14px at 35% 10%, rgba(190, 0, 50, 0.82) 0%, transparent 50%),
                      radial-gradient(ellipse 7px 11px at 55% 25%, rgba(190, 0, 50, 0.9) 0%, transparent 50%),
                      radial-gradient(ellipse 9px 13px at 75% 15%, rgba(190, 0, 50, 0.85) 0%, transparent 50%),
                      radial-gradient(ellipse 8px 12px at 85% 30%, rgba(190, 0, 50, 0.87) 0%, transparent 50%),
                      radial-gradient(ellipse 10px 15px at 20% 50%, rgba(190, 0, 50, 0.84) 0%, transparent 50%),
                      radial-gradient(ellipse 9px 14px at 40% 45%, rgba(190, 0, 50, 0.91) 0%, transparent 50%),
                      radial-gradient(ellipse 7px 10px at 60% 55%, rgba(190, 0, 50, 0.86) 0%, transparent 50%),
                      radial-gradient(ellipse 11px 16px at 80% 50%, rgba(190, 0, 50, 0.89) 0%, transparent 50%),
                      radial-gradient(ellipse 8px 13px at 25% 75%, rgba(190, 0, 50, 0.83) 0%, transparent 50%),
                      radial-gradient(ellipse 10px 14px at 50% 80%, rgba(190, 0, 50, 0.92) 0%, transparent 50%),
                      radial-gradient(ellipse 9px 12px at 70% 85%, rgba(190, 0, 50, 0.88) 0%, transparent 50%),
                      linear-gradient(180deg, rgba(190, 0, 50, 0.15) 0%, transparent 50%, rgba(190, 0, 50, 0.25) 100%),
                      radial-gradient(ellipse at center, transparent 42%, rgba(190, 0, 50, 0.98) 100%)
                    `
                  }}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="inline-block px-5 py-2 rounded-full mb-3" style={{
                      background: '#FFD700',
                      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.6)'
                    }}>
                      <p className="text-sm font-black" style={{ fontFamily: 'Kanit, sans-serif', color: '#BE0032' }}>
                        🌸 HANAMI
                      </p>
                    </div>

                    <h3 className="text-5xl font-black mb-3 leading-tight" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFD700',
                      textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95)'
                    }}>
                      ไม้ซากุระ<br/>
                      <span style={{ color: '#FFFFFF' }}>ฮานามิ!</span>
                    </h3>
                    <p className="text-lg mb-4" style={{
                      fontFamily: 'Kanit, sans-serif',
                      color: '#FFFFFF',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)'
                    }}>
                      เกียวโตฮานามิพิเศษ 7D6N
                    </p>

                    <div className="mb-4">
                      <p className="text-sm line-through" style={{ color: '#FFE4E1' }}>
                        149,999.-
                      </p>
                      <h1 className="text-6xl font-black" style={{
                        fontFamily: 'Kanit, sans-serif',
                        color: '#FFFFFF',
                        textShadow: '5px 5px 20px rgba(0, 0, 0, 0.95)'
                      }}>
                        109,999.-
                      </h1>
                    </div>

                    <button className="px-8 py-3 rounded-xl font-bold" style={{
                      background: '#FFFFFF',
                      color: '#BE0032',
                      fontFamily: 'Kanit, sans-serif',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      จองเลย!
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                    [59]
                  </span>
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
            <div className="-mx-4 md:mx-0 group cursor-pointer" data-card-id="card-1" onClick={() => handleTourClick('TW61529')}>
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
            <div className="-mx-4 md:mx-0 group cursor-pointer" data-card-id="card-2" onClick={() => handleTourClick('TW62841')}>
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
            <div className="-mx-4 md:mx-0 group cursor-pointer" data-card-id="card-3" onClick={() => handleTourClick('TW63254')}>
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
            <div className="-mx-4 md:mx-0 group cursor-pointer" onClick={() => handleTourClick('TW84172')}>
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
            <div className="-mx-4 md:mx-0 group cursor-pointer" data-card-id="card-5" onClick={() => handleTourClick('TW85231')}>
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
            <div className="-mx-4 md:mx-0 group cursor-pointer" onClick={() => handleTourClick('TW86342')}>
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
            <div className="-mx-4 md:mx-0 group cursor-pointer" onClick={() => handleTourClick('TW87453')}>
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
            <div className="-mx-4 md:mx-0 group cursor-pointer" onClick={() => handleTourClick('TW88564')}>
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
            <div className="-mx-4 md:mx-0 group cursor-pointer" onClick={() => handleTourClick('TW89675')}>
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
            <div className="-mx-4 md:mx-0 group cursor-pointer" onClick={() => handleTourClick('TW93519')}>
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
            <div className="-mx-4 md:mx-0 group cursor-pointer" onClick={() => handleTourClick('TW88564')}>
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
            <div className="-mx-4 md:mx-0 group cursor-pointer" onClick={() => handleTourClick('TW94620')}>
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
            <div className="-mx-4 md:mx-0 group cursor-pointer" onClick={() => handleTourClick('TW93519')}>
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
            <div className="-mx-4 md:mx-0 group cursor-pointer" onClick={() => handleTourClick('TW94620')}>
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

      {/* Loading Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg font-semibold text-gray-800">กำลังโหลดข้อมูลทัวร์...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default TourSearch64