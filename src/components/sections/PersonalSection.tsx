/**
 * Career section component for the homepage
 *
 * Displays career history with 4 company cards based on resume data.
 * Uses Compound Component Pattern for separation of concerns.
 */
'use client'

import { useTranslations } from '@/lib/providers/TextContext'
import styles from '@/lib/utils/styles'
import { createContext, useContext, useState, useEffect } from 'react'

type CareerEntry = {
  company: string
  description?: string
  url?: string
  period: string
  role: string
  contributions: string[]
}

type CareerSectionContextType = {
  t: (key: string) => string | CareerEntry[]
  isLoading: boolean
}

const CareerSectionContext = createContext<CareerSectionContextType | undefined>(
  undefined,
)

const useCareerSection = () => {
  const context = useContext(CareerSectionContext)
  if (!context) {
    throw new Error(
      'useCareerSection must be used within a CareerSectionProvider',
    )
  }
  return context
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

  const contextValue = { t, isLoading }

  return (
    <CareerSectionContext.Provider value={contextValue}>
      <section
        id="career"
        className="w-full py-16 md:py-20 bg-secondary/10"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <PersonalSection.Header />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            <PersonalSection.CareerCards />
          </div>
        </div>
      </section>
    </CareerSectionContext.Provider>
  )
}

PersonalSection.Header = function Header() {
  const { t } = useCareerSection()

  return (
    <header className="text-center mb-12">
      <h2
        className={styles.combineStyles([styles.text.heading(2), 'mb-6'])}
        id="career-title"
      >
        {t('pages.career.section-title') as string}
      </h2>
    </header>
  )
}

PersonalSection.CareerCards = function CareerCards() {
  const { t, isLoading } = useCareerSection()

  if (isLoading) {
    return (
      <>
        {[1, 2, 3, 4].map((i) => (
          <section
            key={i}
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm"
          >
            <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2 animate-pulse" />
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-1 animate-pulse" />
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/5 mb-6 animate-pulse" />
            <div className="space-y-3">
              {[1, 2, 3].map((j) => (
                <div key={j} className="flex items-start">
                  <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full mr-3 mt-0.5 animate-pulse flex-shrink-0" />
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                </div>
              ))}
            </div>
          </section>
        ))}
      </>
    )
  }

  const careers = t('pages.career.careers') as unknown as CareerEntry[]

  return (
    <>
      {careers.map((career, index) => (
        <section
          key={index}
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm"
        >
          <h3
            className={styles.combineStyles([styles.text.heading(3), 'mb-0.5'])}
          >
            {career.url ? (
              <a href={career.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                {career.company}
              </a>
            ) : (
              career.company
            )}
          </h3>
          {career.description && (
            <p className="text-xs text-muted-foreground/70 mb-1">
              {career.description}
            </p>
          )}
          <p className="text-sm text-muted-foreground mb-1">
            {career.period}
          </p>
          <p className="text-sm font-medium text-primary mb-5">
            {career.role}
          </p>
          <ul className="space-y-3">
            {career.contributions.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                <span className={styles.text.body('default')}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  )
}
