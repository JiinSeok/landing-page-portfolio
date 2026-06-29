'use client'

import { useTranslations } from '@/lib/providers/TextContext'

type FAQTocItem = {
  id: string
  question: string
  tocLabel: string
}

// 히어로의 lead 문장("경험을 설계하고 운영하며…") 바로 뒤에 놓여, 같은 타이포로
// 이어지는 퀵 목차. 채용 담당자가 먼저 궁금해할 질문으로 바로 점프하게 한다.
// 앵커는 FAQSection 항목의 안정적 id를 그대로 쓰므로 순서가 바뀌어도 안 깨진다.
// 컨테이너·정렬은 부모(Hero 본문 컬럼)가 책임지고, 여기서는 목록만 그린다.
export default function FaqToc() {
  const t = useTranslations('pages.home.sections.faq')

  const items = t('questions') as unknown as FAQTocItem[]
  const tocTitle = t('tocTitle')

  return (
    <nav aria-label={tocTitle}>
      <ul className="flex flex-wrap items-center text-base md:text-lg leading-relaxed text-muted-foreground">
        {items.map((faq, i) => (
          <li key={faq.id} className="flex items-center">
            <a
              href={`#${faq.id}`}
              aria-label={faq.question}
              className="rounded-sm break-keep transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {faq.tocLabel}
            </a>
            {i < items.length - 1 && (
              <span aria-hidden className="px-2 text-muted-foreground/40">
                ·
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
