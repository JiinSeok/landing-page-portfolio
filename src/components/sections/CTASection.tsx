'use client'

import { useTranslations } from '@/lib/providers/TextContext'
import styles from '@/lib/utils/styles'

/**
 * CTA (Call to Action) section component for the homepage
 *
 * This component displays a call-to-action section with a title, description,
 * and a button to contact the developer.
 */
export default function CTASection() {
  const t = useTranslations('pages.home.sections.cta')

  return (
    <section
      id="contact"
      className={styles.combineStyles([
        'w-full bg-primary text-white',
        styles.layout.section('lg'),
      ])}
    >
      <div
        className={styles.combineStyles([
          styles.layout.container('xl'),
          'px-6 md:px-8 lg:px-12',
          'text-center',
        ])}
      >
        <h2
          className={styles.combineStyles([
            styles.text.heading(2),
            styles.spacing.marginBottom('sm'),
          ])}
        >
          {t('title')}
        </h2>
        <p
          className={styles.combineStyles([
            styles.text.body('large'),
            'opacity-90 max-w-2xl mx-auto',
            styles.spacing.marginBottom('md'),
          ])}
        >
          {t('description')}
        </p>
        {/*<Button*/}
        {/*  variant="default"*/}
        {/*  size="lg"*/}
        {/*  className="bg-white text-primary hover:bg-white/90"*/}
        {/*  onClick={() => openModal('contactDialog')}*/}
        {/*>*/}
        {/*  {t('button')}*/}
        {/*</Button>*/}
      </div>
    </section>
  )
}
