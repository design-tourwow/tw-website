import Link from 'next/link'

export default function Breadcrumb() {
  return (
    <nav className="container mx-auto px-4 py-3" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm text-gray-600">
        <li>
          <Link href="/" className="hover:text-blue-600 transition-colors">
            หน้าแรก
          </Link>
        </li>
        <li>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </li>
        <li>
          <Link href="/tours" className="hover:text-blue-600 transition-colors">
            ทัวร์ต่างประเทศ
          </Link>
        </li>
        <li>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </li>
        <li className="font-medium text-gray-900" aria-current="page">
          ทัวร์ญี่ปุ่น
        </li>
      </ol>
    </nav>
  )
}
