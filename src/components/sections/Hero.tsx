'use client'

import FaqToc from '@/components/sections/FaqToc'
import { useTranslations } from '@/lib/providers/TextContext'

/**
 * 타이포 중심 히어로.
 *
 * 자격(eyebrow) → 미션(headline) → 활동(lead) → 질문 퀵목차 순으로, 페이지의 진짜
 * 시그니처인 아래 TimelineToc(커리어×AI 이중축)로 자연스럽게 핸드오프한다. 별도 스펙
 * 테이블·미니 축을 두지 않는 이유는 같은 정보(경력 시점·현재 소속·스택)를 타임라인과
 * 기술 스택 섹션이 더 풍부하게 보여주기 때문(중복·시각 변종 회피).
 */
export default function Hero() {
  const t = useTranslations()

  // heroEyebrow 첫 줄은 역할·경력 자격(eyebrow), 나머지 줄은 현재 활동을 말하는
  // thesis급 문장이다. 둘을 한 덩어리로 작게 누르면 greeting(미션)과 위계가 어긋나
  // 보여서, 자격 → 미션(greeting) → 활동(lead) 3단으로 분리해 렌더한다. 워딩은
  // 원문 그대로 쓰고 줄바꿈 기준으로만 가른다(en은 한 줄이라 lead가 비고 2단이 된다).
  const [credential, ...eyebrowRest] = t('pages.career.meta.heroEyebrow').split(
    '\n',
  )
  const lead = eyebrowRest.join('\n').trim()

  return (
    <section
      aria-label="소개"
      className="w-full pt-24 pb-8 md:pt-28 md:pb-10 overflow-x-clip"
    >
      <div className="px-6 md:px-8">
        <div className="max-w-6xl mx-auto flex gap-4 md:gap-6">
          <div className="hidden md:block md:w-24 lg:w-28 shrink-0" aria-hidden />
          <div className="hidden md:block shrink-0 w-6" aria-hidden />

          <div className="flex-1 min-w-0">
            <h1 className="sr-only">
              석지인 — 프론트엔드·풀스택 개발자 포트폴리오
            </h1>

            <p className="mb-4 text-sm font-medium tracking-tight text-muted-foreground">
              {credential}
            </p>
            <p className="mb-4 max-w-2xl text-balance whitespace-pre-line text-xl md:text-3xl font-semibold tracking-tight leading-snug break-keep text-foreground">
              {t('pages.career.meta.greeting')}
            </p>
            {lead && (
              <p className="mb-2.5 max-w-2xl whitespace-pre-line text-base md:text-lg leading-relaxed break-keep text-muted-foreground">
                {lead}
              </p>
            )}

            <FaqToc />
          </div>
        </div>
      </div>
    </section>
  )
}
