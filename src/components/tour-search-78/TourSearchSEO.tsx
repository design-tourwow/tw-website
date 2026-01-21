import React from 'react'
import Head from 'next/head'
import { TourData } from '@/lib/tour-data-search'

interface TourSearchSEOProps {
  tours: TourData[]
  totalResults: number
}

export const TourSearchSEO: React.FC<TourSearchSEOProps> = ({ tours, totalResults }) => {
  // Generate JSON-LD Schema for ItemList
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'numberOfItems': totalResults,
    'itemListElement': tours.slice(0, 10).map((tour, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'TouristTrip',
        'name': tour.title,
        'description': `${tour.title} - ${tour.features.join(', ')}`,
        'image': tour.image,
        'offers': {
          '@type': 'Offer',
          'price': tour.price,
          'priceCurrency': 'THB',
          'availability': 'https://schema.org/InStock',
          'validFrom': new Date().toISOString()
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': tour.rating,
          'reviewCount': tour.reviews,
          'bestRating': 5,
          'worstRating': 1
        },
        'provider': {
          '@type': 'TravelAgency',
          'name': 'TourWow',
          'url': 'https://tourwow.com'
        }
      }
    }))
  }

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'หน้าแรก',
        'item': 'https://tourwow.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'ค้นหาทัวร์',
        'item': 'https://tourwow.com/tour-search-78'
      }
    ]
  }

  return (
    <>
      <Head>
        <title>ค้นหาทัวร์ทั้งหมด {totalResults} แพ็คเกจ | TourWow - ทัวร์ราคาดี มีคุณภาพ</title>
        <meta
          name="description"
          content={`ค้นหาและเปรียบเทียบแพ็คเกจทัวร์ทั้งหมด ${totalResults} รายการ ทัวร์ญี่ปุ่น เกาหลี ยุโรป และอื่นๆ อีกมากมาย ราคาดีที่สุด จองง่าย ปลอดภัย`}
        />
        <meta name="keywords" content="ทัวร์, แพ็คเกจทัวร์, ทัวร์ญี่ปุ่น, ทัวร์เกาหลี, ทัวร์ยุโรป, จองทัวร์, ทัวร์ราคาถูก" />
        
        {/* Open Graph */}
        <meta property="og:title" content={`ค้นหาทัวร์ทั้งหมด ${totalResults} แพ็คเกจ | TourWow`} />
        <meta property="og:description" content={`ค้นหาและเปรียบเทียบแพ็คเกจทัวร์ทั้งหมด ${totalResults} รายการ`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tourwow.com/tour-search-78" />
        {tours[0] && <meta property="og:image" content={tours[0].image} />}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`ค้นหาทัวร์ทั้งหมด ${totalResults} แพ็คเกจ | TourWow`} />
        <meta name="twitter:description" content={`ค้นหาและเปรียบเทียบแพ็คเกจทัวร์ทั้งหมด ${totalResults} รายการ`} />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://tourwow.com/tour-search-78" />
      </Head>

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
