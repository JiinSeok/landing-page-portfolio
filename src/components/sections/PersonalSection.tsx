/**
 * Career section with timeline layout
 *
 * Displays career history as a vertical timeline with company info + contributions.
 */
'use client'

import { useTranslations } from '@/lib/providers/TextContext'
import styles from '@/lib/utils/styles'
import Image from 'next/image'
import { useState, useEffect } from 'react'

type CareerEntry = {
  company: string
  description?: string
  url?: string
  period: string
  role: string
  contributions: string[]
}

const COMPANY_LOGOS: Record<string, string> = {
  '도스트11': '/images/logos/dost11.png',
  '체인시프트': '/images/logos/chainshift.png',
  '핏투게더': '/images/logos/fitogether.jpg',
  '물류대장': '/images/logos/ftf.svg',
  '연합뉴스': '/images/logos/yonhapnews.png',
}

export default function PersonalSection() {
  const t = useTranslations()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <section id="career" className="w-full py-16 md:py-20 bg-secondary/10">
        <div className="max-w-3xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24 mx-auto animate-pulse" />
          </div>
          <div className="space-y-10">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-6">
                <div className="w-3 flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  <div className="flex-1 w-px bg-gray-200 dark:bg-gray-700" />
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 pb-8">
                  <div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2 animate-pulse" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-1 animate-pulse" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/5 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const careers = t('pages.career.careers') as unknown as CareerEntry[]

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
                <div className={`flex-1 flex flex-col md:flex-row gap-4 md:gap-10 ${isLast ? '' : 'pb-10 md:pb-12'}`}>
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
                          />
                        </div>
                      )}
                      <h3 className="font-semibold text-lg">
                        {career.url ? (
                          <a href={career.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
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
      </div>
    </section>
  )
}
