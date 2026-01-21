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