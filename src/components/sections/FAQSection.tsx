'use client'

import { useTranslations } from '@/lib/providers/TextContext'
import styles from '@/lib/utils/styles'
import Image from 'next/image'

type FAQItem = {
  question: string
  answer: string
}

// 답변마다 다른 포즈의 석지인 픽셀 아바타를 순환 배치(같은 캐릭터 반복 대신 변형으로
// 위트를 주되, 폭이 제각각이라 고정 박스 + object-contain으로 정렬을 정규화한다).
const ANSWER_AVATARS = [
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
