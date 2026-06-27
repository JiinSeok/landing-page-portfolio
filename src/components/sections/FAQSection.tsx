'use client'

import { useTranslations } from '@/lib/providers/TextContext'
import styles from '@/lib/utils/styles'
import Image from 'next/image'

type FAQItem = {
  question: string
  answer: string
}

// 질문 내용(키워드)에 맞춰 어울리는 포즈를 고른다. 질문 순서가 바뀌어도 매칭이
// 유지되도록 인덱스가 아니라 키워드로 매칭하고, 못 찾으면 순환 폴백한다(ko/en 모두 대응).
// 표시 측은 폭이 제각각이라 고정 박스 + object-contain으로 정렬을 정규화한다.
const TOPIC_AVATARS: { test: RegExp; src: string }[] = [
  { test: /\bAI\b/i, src: '/images/avatars/avatar-4.webp' }, // AI 활용 → 후드+코드 화면
  { test: /협업|collaborat/i, src: '/images/avatars/avatar-2.webp' }, // 협업 → 밝게 대화
  { test: /SQA|CX|품질|quality/i, src: '/images/avatars/avatar-1.webp' }, // 품질 → 기본 포즈
  { test: /전향|move into|why did you/i, src: '/images/avatars/avatar-5.webp' }, // 개발 전향 → 사색
  { test: /비전공|기초|major|fundamental/i, src: '/images/avatars/avatar-3.webp' }, // 기초 다지기 → 코딩
  { test: /지금|현재|\bnow\b|working/i, src: '/images/avatars/avatar-6.webp' }, // 현재 업무 → 노트북 작업
]
const FALLBACK_AVATARS = [
  '/images/avatars/avatar-1.webp',
  '/images/avatars/avatar-2.webp',
  '/images/avatars/avatar-3.webp',
  '/images/avatars/avatar-4.webp',
  '/images/avatars/avatar-5.webp',
  '/images/avatars/avatar-6.webp',
]

export default function FAQSection() {
  const t = useTranslations('pages.home.sections.faq')

  const faqItems = t('questions') as unknown as FAQItem[]

  return (
    <section
      id="faq"
      className={styles.combineStyles([
        'w-full',
        styles.layout.section('lg'),
      ])}
    >
      <div className="px-6 md:px-8">
        <h2 className="sr-only">{t('title')}</h2>
        <div className="max-w-3xl mx-auto text-center mb-12 md:hidden">
          <p className={styles.text.heading(2)} aria-hidden="true">
            {t('title')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto flex gap-4 md:gap-6">
          <div className="dark hidden md:flex md:w-24 lg:w-28 shrink-0 justify-end">
            <p
              className="self-start sticky top-28 bg-background text-right font-semibold text-foreground leading-snug break-keep"
              aria-hidden="true"
            >
              {t('title')}
            </p>
          </div>
          <div className="hidden md:block shrink-0 w-6" />

          <div className="flex-1 min-w-0">
            {faqItems.map((faq, i) => {
              const avatarSrc =
                TOPIC_AVATARS.find((topic) => topic.test.test(faq.question))
                  ?.src ?? FALLBACK_AVATARS[i % FALLBACK_AVATARS.length]
              return (
                <div
                  key={faq.question}
                  className={styles.combineStyles([
                    styles.spacing.marginBottom('lg'),
                    styles.spacing.paddingY('lg'),
                    'border-b border-border last:border-0',
                  ])}
                >
                  <h3 className="font-semibold text-lg py-3">{faq.question}</h3>
                  <div
                    className={styles.combineStyles([
                      'flex items-end gap-4',
                      'text-muted-foreground',
                      styles.text.body('small'),
                    ])}
                  >
                    <div className="relative mx-3 h-16 w-14 shrink-0">
                      <Image
                        src={avatarSrc}
                        alt=""
                        fill
                        sizes="56px"
                        aria-hidden
                        className="object-contain object-bottom select-none"
                        draggable={false}
                      />
                    </div>
                    <p className="pb-3 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
