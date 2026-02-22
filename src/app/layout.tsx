import '@/app/globals.css'
import { HomePageSkeleton } from '@/components/HomePage/Skeleton'
import ClientSideProviders from '@/lib/providers/ClientSideProviders'
import { TextProvider } from '@/lib/providers/TextContext'
import { LayoutProps } from '@/lib/types'
import { cn } from '@/lib/utils/classnames'
import { Metadata } from 'next'
import { Suspense } from 'react'
import Footer from "@/components/layout/Footer"
import ScrollToTop from "@/components/ui/ScrollToTop"
import CursorCompanion from "@/components/ui/CursorCompanion"

export const metadata: Metadata = {
  title: '석지인 포트폴리오',
  description:
    '사용자 중심의 웹 개발을 통해 매끄러운 디지털 경험을 만드는 웹 개발자입니다.',
  keywords: '웹 개발, 프론트엔드, 백엔드, React, Next.js, 포트폴리오, 석지인',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
    other: {
      rel: 'mask-icon',
      url: '/favicon.svg',
    },
  },
  openGraph: {
    title: '석지인 - 웹 개발자 포트폴리오',
    description:
      '석지인은 사용자 중심의 웹 개발과 디자인을 통해 혁신적인 디지털 경험을 만드는 웹 개발자입니다.',
    url: 'https://usejiin.link',
    siteName: 'Jiin Seok',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ko">
    <head>
      <script async src="https://unpkg.com/ios-pwa-splash@1.0.0/cdn.min.js"></script>
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', function() {
          if (typeof iosPWASplash === 'function') {
            iosPWASplash('/apple-touch-icon.png', '#FFFFFF');
          }
        });
      `}} />
      <title>석지인 포트폴리오</title>
    </head>
    <body
      className={cn(
        'min-h-screen w-full bg-background text-[clamp(16px,1vw,18px)]',
      )}
    >
    <TextProvider>
      {/* Navigation */}
      <ClientSideProviders />
      <Suspense fallback={<HomePageSkeleton />}>

        {children}
      </Suspense>
      <Footer />
      <ScrollToTop />
      <CursorCompanion />
    </TextProvider>
    </body>
    </html>

  )
}
