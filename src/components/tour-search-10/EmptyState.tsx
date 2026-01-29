'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

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

interface EmptyStateProps {
  onReset: () => void
}

export default function EmptyState({ onReset }: EmptyStateProps) {
  const params = useParams()
  const destination = params?.destination as string | undefined
  const destinationName = destination ? destinationNames[destination] : null

  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto">
        {/* Icon */}
        <div className="mb-6">
          <svg
            className="w-24 h-24 mx-auto text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Message */}
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          ไม่พบทัวร์ที่ตรงกับเงื่อนไข
        </h3>
        <p className="text-gray-600 mb-8">
          ลองปรับเปลี่ยนตัวกรองหรือคำค้นหาของคุณ
        </p>

        {/* Actions - Single Row */}
        <div className="flex gap-3 justify-center">
          {destinationName && (
            <Link
              href="/tour-search-10"
              className="px-6 py-3 bg-[#019dff] text-white rounded-xl font-medium hover:bg-[#0187e6] transition-colors shadow-md"
            >
              ดูทัวร์ญี่ปุ่น
            </Link>
          )}
          <Link
            href="/tours"
            className="px-6 py-3 bg-white border-2 border-[#019dff] text-[#019dff] rounded-xl font-medium hover:bg-[#e6f7ff] transition-colors"
          >
            ดูทัวร์ทั้งหมด
          </Link>
        </div>
      </div>
    </div>
  )
}
