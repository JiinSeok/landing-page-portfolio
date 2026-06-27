'use client'

import { useTranslations } from '@/lib/providers/TextContext'

type CareerLite = { company: string }

/**
 * 스펙시트형 히어로.
 *
 * 이름 락업 → thesis → 하단 hairline 스펙 테이블 순으로, 페이지의 진짜 시그니처인
 * 아래 TimelineToc(커리어×AI 이중축)로 자연스럽게 핸드오프한다. 미니 축을 따로 두지
 * 않는 이유는 실제 타임라인이 바로 다음에 오기 때문(중복 회피). 모노 영문 라벨은
 * 이력서의 "소개<ABOUT>" 병기와 동일한 시그니처 결.
 */
export default function Hero() {
  const t = useTranslations()
  const careers = t('pages.career.careers') as unknown as CareerLite[]
  const current = careers?.[0]?.company ?? ''

  const specs: { label: string; value: string }[] = [
    { label: 'SINCE', value: '2021' },
    { label: 'NOW', value: `${current} · ${t('layout.ui.current')}` },
    { label: 'SHIPPED', value: 'TappyType · formkit-react' },
    { label: 'STACK', value: 'React · Next.js · TS' },
  ]

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
            <h1 className="sr-only">석지인 — 개발자 포트폴리오</h1>

            <p className="mb-4 text-sm font-medium tracking-tight text-muted-foreground">
              {t('pages.career.meta.heroEyebrow')}
            </p>

            <p className="mb-5 max-w-2xl text-balance whitespace-pre-line text-xl md:text-3xl font-semibold tracking-tight leading-snug break-keep text-foreground">
              {t('pages.career.meta.greeting')}
            </p>

            <p className="mb-8 w-full text-sm md:text-base leading-relaxed break-keep text-muted-foreground">
              {t('pages.career.meta.heroSummary')}
            </p>

            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
              {specs.map((spec) => (
                <div key={spec.label} className="bg-background px-4 py-3">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    {spec.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-foreground break-keep">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
