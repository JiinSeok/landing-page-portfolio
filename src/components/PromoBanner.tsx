'use client'

import { projects } from '@/lib/constants/facts'
import { useTranslations } from '@/lib/providers/TextContext'

/**
 * tappytype.com 홍보 슬림 배너.
 *
 * 표시 여부는 React state가 아니라 <html data-promo-dismissed> 속성 + CSS로
 * 제어한다. layout.tsx의 페인트 전 인라인 스크립트가 localStorage를 읽어 속성을
 * 미리 찍으므로 깜빡임(FOUC)·레이아웃 점프(CLS)가 없고, SSR 마크업이 정적이라
 * 하이드레이션 불일치도 없다. 클릭 핸들러는 속성과 localStorage만 토글한다.
 */
const STORAGE_KEY = 'tappytype-banner-dismissed'

export default function PromoBanner() {
  const t = useTranslations('layout.promo')
  const url = projects.tappytype.url ?? 'https://tappytype.com'

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // localStorage 비가용(프라이빗 모드 등)이어도 닫기는 동작
    }
    document.documentElement.setAttribute('data-promo-dismissed', '')
  }

  const reopen = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // 무시
    }
    document.documentElement.removeAttribute('data-promo-dismissed')
  }

  return (
    <>
      {/* md+에서는 좌측 다크 레일을 침범하지 않도록 흰 콘텐츠 영역(레일 오른쪽 끝)부터
          배너를 시작한다. ml 값은 page.tsx·TimelineToc의 레일 폭 계산(RAIL_OFFSET_MD=132 /
          RAIL_OFFSET_LG=148)과 동일하게 맞춘다. 모바일은 레일이 없어 전체 폭 유지. */}
      <aside
        data-promo-banner
        role="region"
        aria-label={t('regionLabel')}
        className="sticky top-0 z-[60] flex w-full items-center justify-center gap-3 bg-primary px-4 py-2 text-sm text-primary-foreground md:ml-[calc((100%_-_min(72rem,100%))/2_+_132px)] md:w-auto md:border-l md:border-border lg:ml-[calc((100%_-_min(72rem,100%))/2_+_148px)]"
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline"
        >
          <span aria-hidden="true">🖋</span>
          <span>{t('text')}</span>
          <span className="font-semibold whitespace-nowrap">
            {t('cta')} →
          </span>
        </a>
        <button
          type="button"
          onClick={dismiss}
          aria-label={t('closeLabel')}
          className="ml-1 rounded p-1 text-primary-foreground/70 transition-colors hover:text-primary-foreground"
        >
          <span aria-hidden="true">✕</span>
        </button>
      </aside>

      <button
        type="button"
        data-promo-chip
        onClick={reopen}
        aria-label={t('reopenLabel')}
        className="fixed bottom-6 left-6 z-50 flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-4 text-sm text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
      >
        <span aria-hidden="true">🖋</span>
        <span>{t('chip')}</span>
      </button>
    </>
  )
}
