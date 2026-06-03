import type { Metadata } from 'next'

/**
 * tappytype 사전 신청(waitlist) 페이지
 *
 * 애플펜슬 손글씨를 한글 폰트로 만들어 주는 iOS 앱 tappytype의 출시 알림을
 * 받을 수 있는 페이지입니다. Notion 폼을 임베드해 신청을 받습니다.
 * 브랜딩은 typetap 브랜드 가이드의 연한 팔레트(Cream / Warm White / Cocoa Brown,
 * 강조는 Lavender·Peach)를 따릅니다.
 */

// Notion 임베드 URL (브랜드 가이드의 사전 신청 폼)
const WAITLIST_EMBED_URL =
  'https://jiin-seok.notion.site/ebd/37464a36d59e8091a34fc6f8f0b468a2'

export const metadata: Metadata = {
  title: 'tappytype 사전 신청',
  description:
    '애플펜슬로 쓴 손글씨를 나만의 한글 폰트로. tappytype 출시 소식을 가장 먼저 받아보세요.',
  openGraph: {
    title: 'tappytype 사전 신청',
    description:
      '애플펜슬로 쓴 손글씨를 나만의 한글 폰트로. tappytype 출시 소식을 가장 먼저 받아보세요.',
    url: 'https://usejiin.link/tappytype/waitlist',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function TappytypeWaitlistPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#FFF3E8] to-[#FFFDF9] text-[#7B5A4A]">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
        {/* 헤더 / 카피 */}
        <header className="text-center">
          <span className="inline-block rounded-full bg-[#A98AF9]/12 px-3 py-1 text-xs font-medium tracking-wide text-[#A98AF9]">
            AI Korean Font Maker
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#7B5A4A]">
            tappytype 사전 신청
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#7B5A4A]/80">
            애플펜슬로 쓴 손글씨를 나만의 한글 폰트로.
            <br className="hidden sm:block" />
            몇 글자만 써 보면 AI가 자연스러운 한글 폰트를 완성해요.
          </p>
          <p className="mt-3 text-sm text-[#7B5A4A]/60">
            출시 소식을 가장 먼저 받아보세요.
          </p>
        </header>

        {/* Notion 폼 임베드 */}
        <div className="mt-10 overflow-hidden rounded-xl border border-[#E9E3DE] bg-[#FFFDF9] shadow-sm">
          <iframe
            src={WAITLIST_EMBED_URL}
            title="tappytype 사전 신청 폼"
            className="block h-[600px] w-full"
            frameBorder="0"
            allowFullScreen
          />
        </div>

        <p className="mt-6 text-center text-xs text-[#7B5A4A]/50">
          폼이 보이지 않으면{' '}
          <a
            href={WAITLIST_EMBED_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#A98AF9] underline-offset-2 hover:underline"
          >
            여기에서 신청
          </a>
          해 주세요.
        </p>
      </div>
    </main>
  )
}
