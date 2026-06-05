'use client'

import { useTranslations } from '@/lib/providers/TextContext'
import styles from '@/lib/utils/styles'

type FAQItem = {
  question: string
  answer: string
}

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
      <div className="px-6 md:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto text-center mb-12 md:hidden">
          <h2
            className={styles.combineStyles([styles.text.heading(2), 'mb-6'])}
          >
            {t('title')}
          </h2>
          <p
            className={styles.combineStyles([
              styles.text.body('large'),
              'text-muted-foreground max-w-3xl mx-auto',
            ])}
          >
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto flex gap-4 md:gap-6">
          <div className="dark hidden md:flex md:w-24 lg:w-28 shrink-0 justify-end">
            <div className="self-start sticky top-28 flex flex-col items-end text-right">
              <h2 className="font-semibold text-foreground leading-snug">
                {t('title')}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground leading-snug">
                {t('subtitle')}
              </p>
            </div>
          </div>
          <div className="hidden md:block shrink-0 w-6" />

          <div className="flex-1 min-w-0">
            {faqItems.map((faq) => (
              <div
                key={faq.question}
                className={styles.combineStyles([
                  styles.spacing.marginBottom('md'),
                  styles.spacing.paddingY('md'),
                  'border-b border-border last:border-0',
                ])}
              >
                <h3 className="font-semibold text-lg py-3">{faq.question}</h3>
                <div
                  className={styles.combineStyles([
                    styles.spacing.paddingX('md'),
                    'text-muted-foreground',
                    styles.text.body('small'),
                  ])}
                >
                  <p className="pb-3">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
