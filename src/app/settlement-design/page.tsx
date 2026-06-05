import { Metadata } from 'next'

import SettlementDesignContent from '@/components/SettlementDesignPage/SettlementDesignContent'

export const metadata: Metadata = {
  title: '정산 기능 설계 · 석지인',
  description:
    '외산 결제 엔진 위에 한국형 월간 정산을 설계하고 팀에 핸드오프한 기록입니다. 월간 마감과 스냅샷, 상태 머신과 잠금, 멱등성, 민감정보 경계 설계를 인사이트와 예시 코드, 개념도로 정리했습니다.',
  openGraph: {
    title: '정산 기능 설계 · 석지인',
    description:
      '외산 결제 엔진 위에 한국형 월간 정산을 설계하고 팀에 핸드오프한 기록입니다.',
    url: 'https://usejiin.link/settlement-design',
    siteName: 'Jiin Seok',
    locale: 'ko_KR',
    type: 'article',
  },
}

export default function SettlementDesignPage() {
  return <SettlementDesignContent />
}
