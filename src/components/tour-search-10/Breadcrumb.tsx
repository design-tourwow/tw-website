'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

// Destination mapping for Thai names
const destinationNames: Record<string, string> = {
  'tokyo': 'โตเกียว',
  'osaka': 'โอซาก้า',
  'kyoto': 'เกียวโต',
  'hokkaido': 'ฮอกไกโด',
  'fuji': 'ฟูจิ',
  'nagoya': 'นาโกย่า',
  'hiroshima': 'ฮิโรชิม่า',
  'nikko': 'นิกโก้',
  'kamakura': 'คามาคุระ',
  'takayama': 'ทาคายาม่า',
  'kanazawa': 'คานาซาว่า',
  'sendai': 'เซนได'
}

interface BreadcrumbProps {
  className?: string
}

export default function Breadcrumb({ className = '' }: BreadcrumbProps) {
  const params = useParams()
  const pathname = usePathname()

  // Check if we're on a destination page
  const destination = params?.destination as string | undefined
  const destinationName = destination ? destinationNames[destination] : null
  const isDestinationPage = pathname?.includes('/tour-search-10/') && destination

  return (
    <nav className={`py-2 sm:py-3 mb-1 ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 flex-wrap">
        {/* Home */}
        <li>
          <Link href="/" className="hover:text-[#019dff] transition-colors">
            หน้าแรก
          </Link>
        </li>

        <li>
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </li>

        {/* Tours */}
        <li>
          <Link href="/tours" className="hover:text-[#019dff] transition-colors">
            ทัวร์ต่างประเทศ
          </Link>
        </li>

        <li>
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </li>

        {/* Japan Tours - Link if on destination page, text if on main */}
        {isDestinationPage ? (
          <>
            <li>
              <Link
                href="/tour-search-10"
                className="hover:text-[#019dff] transition-colors text-[#019dff] font-medium"
              >
                ทัวร์ญี่ปุ่น
              </Link>
            </li>

            <li>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>

            {/* Current Destination */}
            <li className="font-medium text-gray-900" aria-current="page">
              {destinationName || destination}
            </li>
          </>
        ) : (
          <li className="font-medium text-gray-900" aria-current="page">
            ทัวร์ญี่ปุ่น
          </li>
        )}
      </ol>
    </nav>
  )
}
