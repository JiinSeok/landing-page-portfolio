'use client'

import { useEffect, useState } from 'react'

/**
 * WaitlistEmbed
 *
 * Notion 폼 임베드는 데스크톱에서만 DOM에 렌더한다.
 * 모바일·인앱 브라우저(인스타/페이스북 웹뷰)는 크로스 도메인 iframe의
 * 서드파티 쿠키·스토리지를 차단해 Notion SPA가 로그인/캡차로 무한
 * 리다이렉트되거나 프레임을 탈출한다. 이런 환경에서는 iframe을 아예
 * 생성하지 않고(부모 페이지 보호) 상위의 CTA 버튼으로 폼을 새 탭에서 열게 한다.
 */

const WAITLIST_EMBED_URL =
  'https://jiin-seok.notion.site/ebd/37464a36d59e8091a34fc6f8f0b468a2'

export default function WaitlistEmbed({ caption }: { caption: string }) {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // 모바일·인앱 브라우저: iframe을 생성하지 않는다 (위 CTA 버튼으로 유도)
  if (!isDesktop) return null

  return (
    <div className="mx-auto mt-12 max-w-4xl">
      <p className="mb-3 text-center text-sm text-[#7C5566]/60">{caption}</p>
      <div className="overflow-hidden rounded-xl border border-[#F6DCE7] bg-[#FFFCFD] shadow-sm">
        <iframe
          src={WAITLIST_EMBED_URL}
          title="tappytype 사전 신청 폼"
          className="block h-[1400px] w-full"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  )
}
