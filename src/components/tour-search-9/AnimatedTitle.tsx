'use client'

import { useState, useEffect } from 'react'

interface AnimatedTitleProps {
  text: string
  className?: string
}

export default function AnimatedTitle({ text, className = '' }: AnimatedTitleProps) {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.substring(0, currentIndex))
        currentIndex++
      } else {
        setIsComplete(true)
        clearInterval(typingInterval)
      }
    }, 150) // 150ms delay between each character

    return () => clearInterval(typingInterval)
  }, [text])

  return (
    <span 
      className={`
        inline-block 
        bg-gradient-to-r 
        from-white 
        via-[#87ceeb] 
        to-white 
        bg-clip-text 
        text-transparent 
        drop-shadow-2xl
        ${className}
      `}
      style={{
        backgroundSize: isComplete ? '200% 100%' : '100% 100%',
        animation: isComplete ? 'gradient-shift 6s ease-in-out infinite' : 'none'
      }}
    >
      {displayText}
      {/* Cursor - กระพริบเร็วขึ้น */}
      <span 
        className="text-white opacity-75 ml-1"
        style={{
          animation: 'cursor-blink 0.8s ease-in-out infinite'
        }}
      >
        |
      </span>
      
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes cursor-blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }
      `}</style>
    </span>
  )
}