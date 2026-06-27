import '@/app/globals.css'
import { metaData, socialLinks } from '@/app/config'
import ClientSideProviders from '@/lib/providers/ClientSideProviders'
import { TextProvider } from '@/lib/providers/TextContext'
import { LayoutProps } from '@/lib/types'
import { cn } from '@/lib/utils/classnames'
import { Metadata, Viewport } from 'next'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/ui/ScrollToTop'
import CursorCompanion from '@/components/ui/CursorCompanion'
import PromoBanner from '@/components/PromoBanner'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  metadataBase: new URL('https://usejiin.link'),
  title: '석지인 — 프론트엔드 개발자 포트폴리오 | React · Next.js',
  description:
    '석지인은 React·Next.js 기반의 프론트엔드·풀스택 개발자입니다. SQA·CX 경험을 바탕으로 사용자 중심의 서비스를 만들며, 도프켓·TappyType 등 다양한 프로젝트 포트폴리오를 확인하실 수 있습니다.',
  keywords:
    '석지인, 석지인 개발자, 프론트엔드 개발자, 풀스택 개발자, 프로덕트 엔지니어, React, Next.js, 포트폴리오',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: { url: '/favicon.ico', type: 'image/x-icon' },
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: '석지인 — 프론트엔드 개발자 포트폴리오 | React · Next.js',
    description:
      '석지인은 React·Next.js 기반의 프론트엔드·풀스택 개발자입니다. SQA·CX 경험을 바탕으로 사용자 중심의 서비스를 만들며, 도프켓·TappyType 등 다양한 프로젝트 포트폴리오를 확인하실 수 있습니다.',
    url: 'https://usejiin.link',
    siteName: 'Jiin Seok · Product Engineer',
    locale: 'ko_KR',
    alternateLocale: ['en_US'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '석지인 — 프론트엔드 개발자 포트폴리오 | React · Next.js',
    description:
      '석지인은 React·Next.js 기반의 프론트엔드·풀스택 개발자입니다. SQA·CX 경험을 바탕으로 사용자 중심의 서비스를 만듭니다.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: '석지인',
  alternateName: 'Jiin Seok',
  url: metaData.baseUrl,
  image: `${metaData.baseUrl}profile.jpg`,
  jobTitle: '프론트엔드·풀스택 개발자',
  worksFor: { '@type': 'Organization', name: '도스트11' },
  sameAs: [
    socialLinks.github,
    socialLinks.linkedin,
    'https://www.instagram.com/tappytype/',
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    '프론트엔드 개발',
    '웹 접근성',
    'SEO',
  ],
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          async
          src="https://unpkg.com/ios-pwa-splash@1.0.0/cdn.min.js"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        document.addEventListener('DOMContentLoaded', function() {
          if (typeof iosPWASplash === 'function') {
            iosPWASplash('/apple-touch-icon.png', '#FFFFFF');
          }
        });
      `,
          }}
        />
        {/* 페인트 전 실행: 홍보 배너 닫힘 상태를 미리 반영해 FOUC·CLS 방지 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('tappytype-banner-dismissed')==='1'){document.documentElement.setAttribute('data-promo-dismissed','')}}catch(e){}`,
          }}
        />
      </head>
      <body
        className={cn(
          'min-h-screen w-full bg-background text-[clamp(16px,1vw,18px)]',
        )}
      >
        <TextProvider>
          <PromoBanner />
          {/* Navigation */}
          <ClientSideProviders />
          {children}
          <Footer />
          <ScrollToTop />
          <CursorCompanion />
        </TextProvider>
        <Analytics />
      </body>
    </html>
  )
}
