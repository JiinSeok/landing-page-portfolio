'use client'

import { useTranslations } from '@/lib/providers/TextContext'
import styles from '@/lib/utils/styles'
import Image from 'next/image'

type FAQItem = {
  question: string
  answer: string
}

// FAQ 질문 순서에 맞춰 내용과 어울리는 포즈를 배치(인덱스 = 질문 순서):
// 1 개발 전향 스토리→사색, 2 비전공 기초 다지기→코딩, 3 SQA/CX 강점→기본 포즈,
// 4 현재 업무→노트북 작업, 5 AI 활용→후드+코드 화면, 6 협업→밝게 대화.
// 폭이 제각각이라 표시 측은 고정 박스 + object-contain으로 정렬을 정규화한다.
const ANSWER_AVATARS = [
  '/images/avatars/avatar-5.webp',
  '/images/avatars/avatar-3.webp',
  '/images/avatars/avatar-1.webp',
  '/images/avatars/avatar-6.webp',
  '/images/avatars/avatar-4.webp',
  '/images/avatars/avatar-2.webp',
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
        <div className="max-w-3xl mx-auto text-center mb-12 md:hidden">
          <h2 className={styles.text.heading(2)}>{t('title')}</h2>
        </div>

        <div className="max-w-6xl mx-auto flex gap-4 md:gap-6">
          <div className="dark hidden md:flex md:w-24 lg:w-28 shrink-0 justify-end">
            <h2 className="self-start sticky top-28 bg-background text-right font-semibold text-foreground leading-snug break-keep">
              {t('title')}
            </h2>
          </div>
          <div className="hidden md:block shrink-0 w-6" />

          <div className="flex-1 min-w-0">
            {faqItems.map((faq, i) => (
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
                      src={ANSWER_AVATARS[i % ANSWER_AVATARS.length]}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
