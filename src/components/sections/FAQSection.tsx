'use client'

import { useTranslations } from '@/lib/providers/TextContext'
import styles from '@/lib/utils/styles'
import { useState, useEffect } from 'react'


/**
 * FAQ section component for the homepage
 *
 * This component displays a list of frequently asked questions with expandable answers.
 */
export default function FAQSection() {
  const t = useTranslations('pages.home.sections.faq')
  const [isLoading, setIsLoading] = useState(true)

  // Get FAQ questions from translations
  // With the updated useTranslations function, this should now return the array directly
  const faqQuestions = t('questions')
  const faqItems =
    faqQuestions ||
    Array(5)
      .fill(0)
      .map((_, i) => ({
        question: `Question ${i + 1}`,
        answer: `Answer to question ${i + 1}`,
      }))

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="faq"
      className={styles.combineStyles([
        'w-full bg-background',
        styles.layout.section('lg'),
      ])}
    >
      <div className="px-6 md:px-8 lg:px-12">
        <div
          className={styles.combineStyles([
            'max-w-3xl mx-auto text-center',
            styles.spacing.marginBottom('xl'),
          ])}
        >
          <h2
            className={styles.combineStyles([
              styles.text.heading(2),
              styles.spacing.marginBottom('md'),
            ])}
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

        <div className="max-w-7xl mx-auto pl-4 md:pl-12 lg:pl-24">
          {isLoading ? (
            // Skeleton UI for FAQ items
            <>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className={styles.combineStyles([
                      styles.spacing.marginBottom('md'),
                      styles.spacing.paddingY('md'),
                      'border-b border-border last:border-0',
                    ])}
                  >
                    <div className={styles.spacing.paddingY('md')}>
                      <div
                        className={styles.combineStyles([
                          'flex justify-between items-center w-full',
                          styles.spacing.paddingY('md'),
                        ])}
                      >
                        {/* Skeleton for question */}
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                        {/* Skeleton for icon */}
                        <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          ) : (
            // Actual FAQ items
            Array.isArray(faqItems) &&
            faqItems.map((faq, index) => (
              <div
                key={index}
                className={styles.combineStyles([
                  styles.spacing.marginBottom('md'),
                  styles.spacing.paddingY('md'),
                  'border-b border-border last:border-0',
                ])}
              >
                <h3
                  className={styles.combineStyles([
                    styles.text.heading(4),
                    styles.spacing.paddingY('md'),
                  ])}
                >
                  {faq.question}
                </h3>
                <div
                  className={styles.combineStyles([
                    styles.spacing.paddingX('md'),
                    'text-muted-foreground',
                    styles.text.body('default'),
                  ])}
                >
                  <p className="pb-3">{faq.answer}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
