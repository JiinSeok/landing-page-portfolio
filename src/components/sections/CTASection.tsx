'use client'

import { useTranslations } from '@/lib/providers/TextContext'
import styles from '@/lib/utils/styles'
import Image from 'next/image'

/**
 * CTA (Call to Action) section component for the homepage
 *
 * This component displays a call-to-action section with a profile photo, title,
 * and description.
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
          'text-center flex flex-col items-center',
        ])}
      >
        {/* <Image
          src="/profile.jpg"
          alt="석지인"
          width={96}
          height={96}
          className="rounded-full object-cover w-24 h-24 mb-6 border-2 border-white/30"
        /> */}
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
      </div>
    </section>
  )
}
