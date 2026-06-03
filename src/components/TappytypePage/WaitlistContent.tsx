import WaitlistEmbed from '@/components/TappytypePage/WaitlistEmbed'

/**
 * WaitlistContent
 *
 * TappyType 사전 신청 페이지의 공통 본문. locale('ko' | 'en')에 따라 카피만 바뀐다.
 * - 모든 기기: 공개 폼을 새 탭에서 여는 CTA (인스타 인앱 브라우저 포함 안정적)
 * - 데스크톱: 인라인 Notion 임베드(WaitlistEmbed, 모바일/인앱에서는 렌더 안 함)
 *
 * 컬러: Pinterest coquette 무드(블러시 핑크 / 크림 / 체리 로즈 / 모브 텍스트).
 * 팔레트 토큰:
 *   bg     #FDE9EE→#FFF7F4 (블러시→크림)
 *   text   #6B4750 (모브)
 *   accent #C75C72 (체리 로즈)  cta #E27396 (코케트 로즈)
 *   card   #FFFBFB   border #F3D5DD (페일 핑크)
 */

export type WaitlistLocale = 'ko' | 'en'

// 새 탭에서 여는 공개 폼 URL (임베드용 /ebd/ 가 아닌 일반 페이지)
const WAITLIST_FORM_URL =
  'https://jiin-seok.notion.site/37464a36d59e8091a34fc6f8f0b468a2'

interface Copy {
  eyebrow: string
  title: string
  lead: [string, string]
  sub: string
  cta: string
  hint: string
  embedCaption: string
  toggleLabel: string
  toggleHref: string
}

const COPY: Record<WaitlistLocale, Copy> = {
  ko: {
    eyebrow: 'AI Korean Font Maker',
    title: 'TappyType 사전 신청',
    lead: [
      '애플펜슬로 쓴 손글씨를 나만의 한글 폰트로.',
      '몇 글자만 써 보면 AI가 자연스러운 한글 폰트를 완성해요.',
    ],
    sub: '출시 소식을 가장 먼저 받아보세요.',
    cta: '사전 신청하러 가기',
    hint: '인스타 앱에서 폼이 안 열리면 우측 상단 메뉴에서 외부 브라우저(Safari·Chrome)로 열어 주세요.',
    embedCaption: '또는 아래에서 바로 작성하세요.',
    toggleLabel: 'EN',
    toggleHref: '/tappytype/waitlist/en',
  },
  en: {
    eyebrow: 'AI Korean Font Maker',
    title: 'Join the TappyType waitlist',
    lead: [
      'Turn your Apple Pencil handwriting into your own Korean font.',
      'Write a few characters and AI completes a natural Korean typeface.',
    ],
    sub: 'Be the first to hear when we launch.',
    cta: 'Join the waitlist',
    hint: "If the form doesn't open inside the Instagram app, use the top-right menu to open it in your browser (Safari/Chrome).",
    embedCaption: 'Or fill it out right here.',
    toggleLabel: '한국어',
    toggleHref: '/tappytype/waitlist/ko',
  },
}

export default function WaitlistContent({
  locale,
}: {
  locale: WaitlistLocale
}) {
  const t = COPY[locale]

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#FDE9EE] to-[#FFF7F4] text-[#6B4750]">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16">
        {/* 언어 토글 */}
        <div className="mx-auto mb-6 flex max-w-2xl justify-end">
          <a
            href={t.toggleHref}
            className="rounded-full border border-[#F3D5DD] px-3 py-1 text-xs font-medium text-[#6B4750]/70 transition-colors hover:bg-[#F3D5DD]/50"
          >
            {t.toggleLabel}
          </a>
        </div>

        {/* 헤더 / 카피 */}
        <header className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-[#C75C72]/12 px-3 py-1 text-xs font-medium tracking-wide text-[#C75C72]">
            {t.eyebrow}
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#6B4750]">
            {t.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#6B4750]/80">
            {t.lead[0]}
            <br className="hidden sm:block" />
            {t.lead[1]}
          </p>
          <p className="mt-3 text-sm text-[#6B4750]/60">{t.sub}</p>

          {/* CTA: 모든 기기에서 동작 (새 탭에서 공개 폼 열기) */}
          <a
            href={WAITLIST_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#E27396] px-6 py-3 text-base font-semibold text-white shadow-sm transition-opacity duration-200 hover:opacity-90"
          >
            {t.cta}
          </a>
          <p className="mt-3 text-xs text-[#6B4750]/50">{t.hint}</p>
        </header>

        {/* 데스크톱 전용 인라인 임베드 (모바일·인앱 브라우저에서는 렌더하지 않음) */}
        <WaitlistEmbed caption={t.embedCaption} />
      </div>
    </main>
  )
}
