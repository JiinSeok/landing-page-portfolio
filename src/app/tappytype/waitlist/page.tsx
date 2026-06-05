import type { Metadata } from 'next'
import WaitlistContent from '@/components/TappytypePage/WaitlistContent'

/**
 * TappyType 사전 신청 — 기본(한국어).
 *
 * 인스타 바이오 링크가 이 bare 경로(/tappytype/waitlist)를 가리키므로,
 * 리다이렉트 없이 한국어 버전을 직접 렌더한다. 영어는 /tappytype/waitlist/en.
 */
export const metadata: Metadata = {
  title: 'TappyType 사전 신청',
  description:
    '애플펜슬로 쓴 손글씨를 나만의 한글 폰트로. TappyType 출시 소식을 가장 먼저 받아보세요.',
  openGraph: {
    title: 'TappyType 사전 신청',
    description:
      '애플펜슬로 쓴 손글씨를 나만의 한글 폰트로. TappyType 출시 소식을 가장 먼저 받아보세요.',
    url: 'https://www.usejiin.link/tappytype/waitlist',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function TappytypeWaitlistPage() {
  return <WaitlistContent locale="ko" />
}
