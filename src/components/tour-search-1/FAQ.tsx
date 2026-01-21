'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "ทัวร์ญี่ปุ่นราคาเท่าไหร่?",
    answer: "ราคาทัวร์ญี่ปุ่นเริ่มต้นที่ 19,900 บาท ขึ้นอยู่กับโปรแกรม ช่วงเวลาเดินทาง สายการบิน และระดับโรงแรม เรามีทั้งทัวร์ญี่ปุ่นราคาถูก ทัวร์สุดคุ้ม และทัวร์พรีเมี่ยม พร้อมโปรโมชั่นพิเศษตลอดทั้งปี"
  },
  {
    question: "ไปญี่ปุ่นกี่วันดี?",
    answer: "แนะนำ 5-7 วัน สำหรับทัวร์ญี่ปุ่นแบบครบรส หรือ 4-5 วัน สำหรับเที่ยวเมืองเดียว เช่น โตเกียว โอซาก้า หรือฮอกไกโด ส่วนทัวร์ญี่ปุ่นแบบเต็มที่ 8-10 วัน จะได้เที่ยวหลายเมืองและสถานที่ท่องเที่ยวมากขึ้น"
  },
  {
    question: "ช่วงไหนไปญี่ปุ่นดีที่สุด?",
    answer: "แต่ละฤดูมีเสน่ห์ต่างกัน: ฤดูใบไม้ผลิ (มีนาคม-พฤษภาคม) ชมซากุระบาน, ฤดูร้อน (มิถุนายน-สิงหาคม) เทศกาลดอกไม้ไฟ, ฤดูใบไม้เปลี่ยนสี (กันยายน-พฤศจิกายน) ชมใบไม้แดง, ฤดูหนาว (ธันวาคม-กุมภาพันธ์) เล่นสกีและชมหิมะ"
  },
  {
    question: "ทัวร์ญี่ปุ่นรวมอะไรบ้าง?",
    answer: "รวมตั๋วเครื่องบินไป-กลับ, ที่พักตามโปรแกรม, อาหารตามระบุ, รถโค้ชปรับอากาศ, ไกด์นำเที่ยวภาษาไทย, ค่าเข้าชมสถานที่ท่องเที่ยว และประกันการเดินทาง ไม่รวมค่าทิปไกด์และคนขับรถ"
  },
  {
    question: "ต้องเตรียมเอกสารอะไรบ้าง?",
    answer: "หนังสือเดินทางที่มีอายุเหลือมากกว่า 6 เดือน, รูปถ่ายสี 2 นิ้ว จำนวน 2 รูป, สำเนาบัตรประชาชน, สำเนาทะเบียนบ้าน และหนังสือรับรองการทำงาน (สำหรับผู้ที่ทำงาน) หรือหนังสือรับรองการศึกษา (สำหรับนักเรียน/นักศึกษา)"
  },
  {
    question: "สามารถผ่อนชำระได้หรือไม่?",
    answer: "ได้ครับ รับผ่อนชำระผ่านบัตรเครดิต 0% นาน 3-10 เดือน (ขึ้นอยู่กับธนาคาร) หรือผ่อนผ่านช่องทางอื่นๆ ตามเงื่อนไขของแต่ละโปรแกรม สามารถสอบถามรายละเอียดเพิ่มเติมได้ที่ทีมงาน"
  },
  {
    question: "มีประกันการเดินทางหรือไม่?",
    answer: "ทุกโปรแกรมทัวร์รวมประกันการเดินทางพื้นฐานแล้ว แต่หากต้องการความคุ้มครองเพิ่มเติม สามารถซื้อประกันเพิ่มเติมได้ เช่น ประกันยกเลิกการเดินทาง ประกันสุขภาพ หรือประกันสัมภาระสูญหาย"
  },
  {
    question: "ถ้ายกเลิกทัวร์จะคืนเงินไหม?",
    answer: "ขึ้นอยู่กับระยะเวลาที่แจ้งยกเลิก: ยกเลิกก่อนเดินทาง 45 วัน คืนเงิน 100%, 30-44 วัน คืน 50%, 15-29 วัน คืน 25%, น้อยกว่า 15 วัน ไม่คืนเงิน (เงื่อนไขอาจแตกต่างกันตามแต่ละโปรแกรม)"
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="mt-8">
      <div className="py-8 px-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          คำถามที่พบบ่อย (FAQ)
        </h2>
        
        <div className="space-y-3">
          {faqData.map((faq, index) => (
            <div 
              key={index}
              className="group"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-4 px-5 text-left bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-white hover:shadow-md transition-all"
              >
                <span className="text-gray-900 pr-4 group-hover:text-blue-700 transition-colors">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-blue-600 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              {openIndex === index && (
                <div className="mt-2 px-5 py-4 bg-blue-50/40 rounded-xl border border-blue-100">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
