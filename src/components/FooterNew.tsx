import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export default function FooterNew() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">T</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">TourWow</h3>
                <p className="text-xs text-gray-500">ทัวร์ในฝัน</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              แพลตฟอร์มจองทัวร์ออนไลน์ที่ครอบคลุมทั้งในและต่างประเทศ 
              พร้อมตัวเลือกทัวร์กว่า 2,000 โปรแกรมไปทั่วโลกกว่า 100 ประเทศ
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-blue-100 hover:bg-blue-600 flex items-center justify-center transition-all group">
                <Facebook className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-blue-100 hover:bg-blue-400 flex items-center justify-center transition-all group">
                <Twitter className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-pink-100 hover:bg-pink-600 flex items-center justify-center transition-all group">
                <Instagram className="w-4 h-4 text-pink-600 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-red-100 hover:bg-red-600 flex items-center justify-center transition-all group">
                <Youtube className="w-4 h-4 text-red-600 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">เมนูหลัก</h4>
            <ul className="-space-y-1">
              <li className="leading-[1.2]">
                <Link href="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors inline-block group">
                  หน้าแรก
                </Link>
              </li>
              <li className="leading-[1.2]">
                <Link href="/tours" className="text-sm text-gray-600 hover:text-blue-600 transition-colors inline-block group">
                  ทัวร์
                </Link>
              </li>
              <li className="leading-[1.2]">
                <Link href="/destinations" className="text-sm text-gray-600 hover:text-blue-600 transition-colors inline-block group">
                  จุดหมายปลายทาง
                </Link>
              </li>
              <li className="leading-[1.2]">
                <Link href="/gallery" className="text-sm text-gray-600 hover:text-blue-600 transition-colors inline-block group">
                  แกลเลอรี่
                </Link>
              </li>
              <li className="leading-[1.2]">
                <Link href="/tourwow-blog" className="text-sm text-gray-600 hover:text-blue-600 transition-colors inline-block group">
                  📝 บล็อก
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">บริการลูกค้า</h4>
            <ul className="-space-y-1">
              <li className="leading-[1.2]">
                <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors inline-block group">
                  นโยบายการจอง
                </Link>
              </li>
              <li className="leading-[1.2]">
                <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors inline-block group">
                  นโยบายการยกเลิก
                </Link>
              </li>
              <li className="leading-[1.2]">
                <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors inline-block group">
                  เงื่อนไขและข้อตกลง
                </Link>
              </li>
              <li className="leading-[1.2]">
                <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors inline-block group">
                  นโยบายความเป็นส่วนตัว
                </Link>
              </li>
              <li className="leading-[1.2]">
                <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600 transition-colors inline-block group">
                  เกี่ยวกับเรา
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">ติดต่อเรา</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">โทรศัพท์</p>
                  <a href="tel:026741500" className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                    02-674-1500
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">อีเมล</p>
                  <a href="mailto:info@tourwow.com" className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                    info@tourwow.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">ที่อยู่</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    507/517 ถนนสาธุประดิษฐ์<br />
                    แขวงช่องนนทรี เขตยานนาวา<br />
                    กรุงเทพมหานคร 10120
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-600">
                © 2024 TourWow. สงวนลิขสิทธิ์ทั้งหมด
              </p>
              <p className="text-xs text-gray-500 mt-1">
                ใบอนุญาตธุรกิจนำเที่ยว เลขที่ 11/09058
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/contact" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">
                ข้อกำหนดการใช้บริการ
              </Link>
              <Link href="/contact" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">
                นโยบายความเป็นส่วนตัว
              </Link>
              <Link href="/contact" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">
                ติดต่อเรา
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
