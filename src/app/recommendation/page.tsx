import RecommendationContent from '@/components/RecommendationPage/RecommendationContent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '추천사 · 석지인',
  description:
    '함께 일한 동료들이 직접 작성한 추천사입니다. 도스트11 CTO 홍순상, 현 프론트엔드 리드 송찬영.',
  openGraph: {
    title: '추천사 · 석지인',
    description: '함께 일한 동료들이 직접 작성한 추천사입니다.',
    url: 'https://usejiin.link/recommendation',
    siteName: 'Jiin Seok',
    locale: 'ko_KR',
    type: 'article',
  },
}

export default function RecommendationPage() {
  return <RecommendationContent />
}
