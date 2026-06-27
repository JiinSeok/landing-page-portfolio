import RecommendationContent from '@/components/RecommendationPage/RecommendationContent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '석지인 추천사 — 함께 일한 CTO·동료의 평가',
  description:
    '함께 일한 분들이 써 주신 석지인 추천사입니다. 전 도스트11 CTO 홍순상, 전 핏투게더 동료 송찬영(현 프론트엔드 리드).',
  alternates: {
    canonical: '/recommendation',
  },
  openGraph: {
    title: '석지인 추천사 — 함께 일한 CTO·동료의 평가',
    description: '함께 일한 분들이 써 주신 석지인 추천사입니다.',
    url: 'https://usejiin.link/recommendation',
    siteName: 'Jiin Seok',
    locale: 'ko_KR',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: '석지인 추천사 — 함께 일한 CTO·동료의 평가',
    description: '함께 일한 분들이 써 주신 석지인 추천사입니다.',
  },
}

export default function RecommendationPage() {
  return <RecommendationContent />
}
