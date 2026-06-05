import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import WaitlistContent, {
  type WaitlistLocale,
} from '@/components/TappytypePage/WaitlistContent'

/**
 * TappyType 사전 신청 — 언어별 경로. /tappytype/waitlist/ko, /tappytype/waitlist/en
 * en/ko 외 세그먼트는 404 (dynamicParams=false).
 */
export const dynamicParams = false

export function generateStaticParams(): { lang: WaitlistLocale }[] {
  return [{ lang: 'ko' }, { lang: 'en' }]
}

const META: Record<WaitlistLocale, Metadata> = {
  ko: {
    title: 'TappyType 사전 신청',
    description:
      '애플펜슬로 쓴 손글씨를 나만의 한글 폰트로. TappyType 출시 소식을 가장 먼저 받아보세요.',
  },
  en: {
    title: 'Join the TappyType waitlist',
    description:
      'Turn your Apple Pencil handwriting into your own Korean font. Be the first to hear when TappyType launches.',
  },
}

function isWaitlistLocale(value: string): value is WaitlistLocale {
  return value === 'ko' || value === 'en'
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isWaitlistLocale(lang)) return {}

  const meta = META[lang]
  return {
    ...meta,
    openGraph: {
      title: meta.title as string,
      description: meta.description as string,
      url: `https://usejiin.link/tappytype/waitlist/${lang}`,
      locale: lang === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
    },
  }
}

export default async function TappytypeWaitlistLangPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isWaitlistLocale(lang)) notFound()

  return <WaitlistContent locale={lang} />
}
