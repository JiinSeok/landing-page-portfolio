'use client'

import React from 'react'
import { softSkillEntries } from './soft-skills-data'
import Footer from '@/components/layout/Footer'
import Navigation from '@/components/layout/Navigation'
import Head from 'next/head'
import { useTranslations } from '@/lib/providers/TextContext'

export default function SoftSkills() {
  const t = useTranslations()
  const softSkillsT = useTranslations('pages.soft-skills')

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{softSkillsT('title')}</title>
        <meta name="description" content={softSkillsT('description')} />
      </Head>
      {/* Navigation */}
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <section>
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4 text-primary">
              {softSkillsT('title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {softSkillsT('subtitle')}
            </p>
          </div>

          <div className="space-y-8">
            {softSkillEntries.map((entry, index) => (
              <div
                key={index}
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                  <h2 className="text-2xl font-medium text-primary mb-2 md:mb-0">
                    {entry.url ? (
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {entry.title}
                      </a>
                    ) : (
                      entry.title
                    )}
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(entry.date).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  {entry.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
