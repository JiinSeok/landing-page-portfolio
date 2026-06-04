/**
 * Career section with timeline layout
 *
 * Displays career history as a vertical timeline with company info + contributions.
 */
'use client'

import { useTranslations } from '@/lib/providers/TextContext'
import styles from '@/lib/utils/styles'
import Image from 'next/image'

type CareerEntry = {
  company: string
  description?: string
  url?: string
  period: string
  role: string
  contributions: string[]
}

type CareerExtra = {
  title: string
  groups: { label: string; items: string[] }[]
}

const COMPANY_LOGOS: Record<string, string> = {
  도스트11: '/images/logos/dost11.png',
  체인시프트: '/images/logos/chainshift.png',
  핏투게더: '/images/logos/fitogether.jpg',
  물류대장: '/images/logos/ftf.svg',
  연합뉴스: '/images/logos/yonhapnews.png',
}

export default function PersonalSection() {
  const t = useTranslations()

  const careers = t('pages.career.careers') as unknown as CareerEntry[]
  const extra = t('pages.career.more') as unknown as CareerExtra

  return (
    <section id="career" className="w-full py-16 md:py-20 bg-secondary/10">
      <div className="px-6 md:px-8 lg:px-12">
        <header className="max-w-3xl mx-auto text-center mb-12">
          <h2
            className={styles.combineStyles([styles.text.heading(2), 'mb-6'])}
            id="career-title"
          >
            {t('pages.career.section-title') as string}
          </h2>
        </header>

        {/* Timeline — left-aligned, expands rightward */}
        <div className="max-w-7xl mx-auto pl-4 md:pl-12 lg:pl-24">
          {careers.map((career, index) => {
            const logo = COMPANY_LOGOS[career.company]
            const isLast = index === careers.length - 1

            return (
              <div key={index} className="flex gap-4 md:gap-6">
                {/* Timeline column */}
                <div className="flex flex-col items-center shrink-0 w-6">
                  <div className="w-3 h-3 rounded-full bg-primary shrink-0 mt-1.5" />
                  {!isLast && <div className="flex-1 w-px bg-border" />}
                </div>

                {/* Content */}
                <div
                  className={`flex-1 flex flex-col md:flex-row gap-4 md:gap-10 ${isLast ? '' : 'pb-10 md:pb-12'}`}
                >
                  {/* Column 1: Company info — fixed width */}
                  <div className="md:w-56 shrink-0">
                    <div className="flex items-center gap-3 mb-2">
                      {logo && (
                        <div className="shrink-0 w-8 h-8 relative rounded overflow-hidden bg-white flex items-center justify-center">
                          <Image
                            src={logo}
                            alt={career.company}
                            width={32}
                            height={32}
                            className="object-contain"
                            style={{ width: 'auto', height: 'auto' }}
                          />
                        </div>
                      )}
                      <h3 className="font-semibold text-lg">
                        {career.url ? (
                          <a
                            href={career.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                          >
                            {career.company}
                          </a>
                        ) : (
                          career.company
                        )}
                      </h3>
                    </div>
                    {career.description && (
                      <p className="text-xs text-muted-foreground mb-1.5">
                        {career.description}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {career.period}
                    </p>
                    <p className="text-sm font-medium text-primary mt-0.5">
                      {career.role}
                    </p>
                  </div>

                  {/* Column 2: Contributions — expands freely */}
                  <ul className="space-y-2">
                    {career.contributions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="shrink-0 w-1 h-1 rounded-full bg-primary/40 mt-2" />
                        <span className={styles.text.body('small')}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        <div className="max-w-4xl mx-auto mt-20 pt-12 border-t border-border">
          <h3
            className={styles.combineStyles([
              styles.text.heading(3),
              'text-center mb-10',
            ])}
          >
            {extra.title}
          </h3>
          <dl>
            {extra.groups.map((group, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-3 md:gap-10 py-6 border-b border-border last:border-0"
              >
                <dt className="md:w-40 shrink-0 text-lg font-semibold text-primary">
                  {group.label}
                </dt>
                <dd className="flex-1">
                  <ul className="space-y-2">
                    {group.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="shrink-0 w-1 h-1 rounded-full bg-primary/40 mt-2.5" />
                        <span className={styles.text.body('default')}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
