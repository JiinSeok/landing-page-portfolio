/**
 * Personal section component for the homepage
 *
 * This component displays personal information and appeal using profile image
 * and showcasing personal interests and characteristics.
 *
 * Refactored to use Compound Component Pattern for better separation of concerns.
 */
'use client'

import { useTranslations } from '@/lib/providers/TextContext'
import styles from '@/lib/utils/styles'
import Image from 'next/image'
import { createContext, useContext, useState, useEffect } from 'react'

// Context type definition
type PersonalSectionContextType = {
  t: (key: string) => string
  isLoading: boolean
}

// Create context
const PersonalSectionContext = createContext<
  PersonalSectionContextType | undefined
>(undefined)

// Hook to use the context
const usePersonalSection = () => {
  const context = useContext(PersonalSectionContext)
  if (!context) {
    throw new Error(
      'usePersonalSection must be used within a PersonalSectionProvider',
    )
  }
  return context
}

// Main component
export default function PersonalSection() {
  const t = useTranslations()
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  // Context value
  const contextValue = {
    t,
    isLoading,
  }

  return (
    <PersonalSectionContext.Provider value={contextValue}>
      <section
        id="personal"
        className="w-full py-16 sm:py-20 md:py-24 lg:py-28 bg-secondary/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <PersonalSection.Header />
          <div className="flex flex-col md:flex-row lg:flex-row items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 mb-12 sm:mb-14 md:mb-16 lg:mb-20">
            <PersonalSection.ProfileImage />
            <PersonalSection.PersonalInfo />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            <PersonalSection.Interests />
            <PersonalSection.Values />
            <PersonalSection.Strengths />
            <PersonalSection.Motivations />
          </div>
        </div>
      </section>
    </PersonalSectionContext.Provider>
  )
}

// Header Component
PersonalSection.Header = function Header() {
  const { t } = usePersonalSection()

  return (
    <header className="text-center mb-16">
      <h2
        className={styles.combineStyles([styles.text.heading(2), 'mb-6'])}
        id="personalabout-title"
      >
        {t('pages.personal.about-title')}
      </h2>
    </header>
  )
}

// Profile Image Component
PersonalSection.ProfileImage = function ProfileImage() {
  const { t, isLoading } = usePersonalSection()

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center sm:pl-2 md:pl-4 lg:pl-6">
      <div
        className={styles.combineStyles([
          'relative rounded-full overflow-hidden border-4 border-primary',
          styles.sizing.avatar('4xl'),
        ])}
      >
        {isLoading ? (
          // Skeleton UI for profile image
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        ) : (
          <Image
            src="/profile.jpg"
            alt={t('pages.personal.profile-image-alt')}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>
    </div>
  )
}

// Personal Info Component
PersonalSection.PersonalInfo = function PersonalInfo() {
  const { t, isLoading } = usePersonalSection()

  return (
    <article className="w-full sm:w-1/2 md:w-2/3 lg:w-3/4 sm:px-3 md:px-6 lg:px-8">
      {isLoading ? (
        // Skeleton UI for personal info
        <>
          <div className="flex flex-wrap gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"
              ></div>
            ))}
          </div>
          <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
          <div className="flex flex-wrap gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </>
      ) : (
        // Actual content
        <>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              Frontend Developer
            </span>
            <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
              TypeScript
            </span>
            <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
              React
            </span>
            <span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
              Next.js
            </span>
            <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-700/10">
              UI/UX
            </span>
          </div>
          <p
            className={styles.combineStyles([
              styles.text.body('large'),
              'mb-4 break-keep',
            ])}
          >
            {t('pages.personal.profile-description')}
          </p>
          <address className="flex flex-wrap gap-4 not-italic">
            <a
              href="https://github.com/JiinSeok"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.combineStyles([
                styles.text.ui('default'),
                'inline-flex items-center gap-1 font-medium text-primary hover:text-primary/80',
              ])}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.combineStyles([
                  styles.sizing.icon('sm'),
                  'lucide lucide-github',
                ])}
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              {t('pages.personal.social-github')}
            </a>
            <a
              href="https://linkedin.com/in/jiin-seok"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.combineStyles([
                styles.text.ui('default'),
                'inline-flex items-center gap-1 font-medium text-primary hover:text-primary/80',
              ])}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.combineStyles([
                  styles.sizing.icon('sm'),
                  'lucide lucide-linkedin',
                ])}
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              {t('pages.personal.social-linkedin')}
            </a>
            <a
              href="mailto:seokjiin1073@gmail.com"
              className={styles.combineStyles([
                styles.text.ui('default'),
                'inline-flex items-center gap-1 font-medium text-primary hover:text-primary/80',
              ])}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.combineStyles([
                  styles.sizing.icon('sm'),
                  'lucide lucide-mail',
                ])}
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              {t('pages.personal.social-email')}
            </a>
          </address>
        </>
      )}
    </article>
  )
}

// Interests Component
PersonalSection.Interests = function Interests() {
  const { t, isLoading } = usePersonalSection()

  return (
    <section className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
      {isLoading ? (
        // Skeleton UI for interests
        <>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6 animate-pulse"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start">
                <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full mr-3 animate-pulse"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              </div>
            ))}
          </div>
        </>
      ) : (
        // Actual content
        <>
          <h3
            className={styles.combineStyles([styles.text.heading(3), 'mb-6'])}
          >
            {t('pages.personal.interests-title')}
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.combineStyles([
                  styles.sizing.icon('lg'),
                  'text-primary mr-3 mt-1 flex-shrink-0',
                ])}
                aria-hidden="true"
              >
                <polyline points="9 11 12 14 22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              <span className={styles.text.body('default')}>
                {t('pages.personal.interest-1')}
              </span>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.combineStyles([
                  styles.sizing.icon('md'),
                  'text-primary mr-2 mt-1 flex-shrink-0',
                ])}
                aria-hidden="true"
              >
                <polyline points="9 11 12 14 22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              <span className={styles.text.body('default')}>
                {t('pages.personal.interest-2')}
              </span>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.combineStyles([
                  styles.sizing.icon('md'),
                  'text-primary mr-2 mt-1 flex-shrink-0',
                ])}
                aria-hidden="true"
              >
                <polyline points="9 11 12 14 22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              <span className={styles.text.body('default')}>
                {t('pages.personal.interest-3')}
              </span>
            </li>
          </ul>
        </>
      )}
    </section>
  )
}

// Values Component
PersonalSection.Values = function Values() {
  const { t, isLoading } = usePersonalSection()

  return (
    <section className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
      {isLoading ? (
        // Skeleton UI for values
        <>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6 animate-pulse"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start">
                <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full mr-3 animate-pulse"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              </div>
            ))}
          </div>
        </>
      ) : (
        // Actual content
        <>
          <h3
            className={styles.combineStyles([styles.text.heading(3), 'mb-6'])}
          >
            {t('pages.personal.values-title')}
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.combineStyles([
                  styles.sizing.icon('lg'),
                  'text-primary mr-3 mt-1 flex-shrink-0',
                ])}
                aria-hidden="true"
              >
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
              <span className={styles.text.body('default')}>
                {t('pages.personal.value-1')}
              </span>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.combineStyles([
                  styles.sizing.icon('md'),
                  'text-primary mr-2 mt-1 flex-shrink-0',
                ])}
                aria-hidden="true"
              >
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
              <span className={styles.text.body('default')}>
                {t('pages.personal.value-2')}
              </span>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.combineStyles([
                  styles.sizing.icon('md'),
                  'text-primary mr-2 mt-1 flex-shrink-0',
                ])}
                aria-hidden="true"
              >
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
              <span className={styles.text.body('default')}>
                {t('pages.personal.value-3')}
              </span>
            </li>
          </ul>
        </>
      )}
    </section>
  )
}

// Strengths Component
PersonalSection.Strengths = function Strengths() {
  const { t, isLoading } = usePersonalSection()

  return (
    <section className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
      {isLoading ? (
        // Skeleton UI for strengths
        <>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6 animate-pulse"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start">
                <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full mr-3 animate-pulse"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              </div>
            ))}
          </div>
        </>
      ) : (
        // Actual content
        <>
          <h3
            className={styles.combineStyles([styles.text.heading(3), 'mb-6'])}
          >
            {t('pages.personal.strengths-title')}
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.combineStyles([
                  styles.sizing.icon('lg'),
                  'text-primary mr-3 mt-1 flex-shrink-0',
                ])}
                aria-hidden="true"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span className={styles.text.body('default')}>
                {t('pages.personal.strength-1')}
              </span>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.combineStyles([
                  styles.sizing.icon('md'),
                  'text-primary mr-2 mt-1 flex-shrink-0',
                ])}
                aria-hidden="true"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span className={styles.text.body('default')}>
                {t('pages.personal.strength-2')}
              </span>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.combineStyles([
                  styles.sizing.icon('md'),
                  'text-primary mr-2 mt-1 flex-shrink-0',
                ])}
                aria-hidden="true"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span className={styles.text.body('default')}>
                {t('pages.personal.strength-3')}
              </span>
            </li>
          </ul>
        </>
      )}
    </section>
  )
}

// Motivations Component
PersonalSection.Motivations = function Motivations() {
  const { t, isLoading } = usePersonalSection()

  return (
    <section className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
      {isLoading ? (
        // Skeleton UI for motivations
        <>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6 animate-pulse"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start">
                <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full mr-3 animate-pulse"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              </div>
            ))}
          </div>
        </>
      ) : (
        // Actual content
        <>
          <h3
            className={styles.combineStyles([styles.text.heading(3), 'mb-6'])}
          >
            {t('pages.personal.motivations-title')}
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.combineStyles([
                  styles.sizing.icon('lg'),
                  'text-primary mr-3 mt-1 flex-shrink-0',
                ])}
                aria-hidden="true"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              <span className={styles.text.body('default')}>
                {t('pages.personal.motivation-1')}
              </span>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.combineStyles([
                  styles.sizing.icon('md'),
                  'text-primary mr-2 mt-1 flex-shrink-0',
                ])}
                aria-hidden="true"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              <span className={styles.text.body('default')}>
                {t('pages.personal.motivation-2')}
              </span>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.combineStyles([
                  styles.sizing.icon('md'),
                  'text-primary mr-2 mt-1 flex-shrink-0',
                ])}
                aria-hidden="true"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              <span className={styles.text.body('default')}>
                {t('pages.personal.motivation-3')}
              </span>
            </li>
          </ul>
        </>
      )}
    </section>
  )
}
