'use client'

import { useTranslations } from '@/lib/constants/mock-translations'
import styles from '@/lib/utils/styles'
import { useState, useEffect } from 'react'

/**
 * FAQ section component for the homepage
 *
 * This component displays a list of frequently asked questions with expandable answers.
 */
export default function FAQSection() {
  const t = useTranslations('HomePage')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Toggle FAQ item
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Get FAQ questions from translations
  // With the updated useTranslations function, this should now return the array directly
  const faqQuestions = t('faq.questions')
  const faqItems = faqQuestions || Array(5).fill(0).map((_, i) => ({
    question: `Question ${i + 1}`,
    answer: `Answer to question ${i + 1}`
  }))

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="faq" className={styles.combineStyles(['w-full bg-background', styles.layout.section('lg')])}>
      <div className={styles.layout.container('xl', styles.spacing.paddingX('lg'))}>
        <div className={styles.combineStyles(['text-center', styles.spacing.marginBottom('xl')])}>
          <h2 className={styles.combineStyles([styles.text.heading(2), styles.spacing.marginBottom('md')])}>{t('faq.title')}</h2>
          <p className={styles.combineStyles([styles.text.body('large'), 'text-muted-foreground max-w-3xl mx-auto'])}>
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {isLoading ? (
            // Skeleton UI for FAQ items
            <>
              {Array(5).fill(0).map((_, index) => (
                <div 
                  key={index} 
                  className={styles.combineStyles([
                    styles.spacing.marginBottom('md'), 
                    styles.spacing.paddingY('md'), 
                    'border-b border-border last:border-0'
                  ])}
                >
                  <div className={styles.spacing.paddingY('md')}>
                    <div
                      className={styles.combineStyles([
                        'flex justify-between items-center w-full', 
                        styles.spacing.paddingY('md')
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
            Array.isArray(faqItems) && faqItems.map((faq, index) => (
              <div 
                key={index} 
                className={styles.combineStyles([
                  styles.spacing.marginBottom('md'), 
                  styles.spacing.paddingY('md'), 
                  'border-b border-border last:border-0'
                ])}
              >
                <details 
                  className={styles.spacing.paddingY('md')}
                  open={openIndex === index}
                >
                  <summary
                    className={styles.combineStyles([
                      'flex justify-between items-center w-full text-left cursor-pointer', 
                      styles.spacing.paddingY('md')
                    ])}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFAQ(index);
                    }}
                    aria-expanded={openIndex === index}
                  >
                    <h3 className={styles.text.heading(4)}>{faq.question}</h3>
                    <span className="text-primary ml-3">
                      {openIndex === index ? (
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className={styles.sizing.icon('md')}
                          aria-label={t('faq.collapse-icon')}
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      ) : (
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className={styles.sizing.icon('md')}
                          aria-label={t('faq.expand-icon')}
                        >
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      )}
                    </span>
                  </summary>
                  <div className={styles.combineStyles([
                    styles.spacing.marginTop('md'), 
                    styles.spacing.paddingX('md'),
                    'text-muted-foreground', 
                    styles.text.body('default')
                  ])}>
                    <p className="pb-3">{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
