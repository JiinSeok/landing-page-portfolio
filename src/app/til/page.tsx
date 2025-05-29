'use client'

import React, { useState } from 'react'
import { tilEntries, TILEntry } from './til-data'
import Footer from '@/components/layout/Footer'
import Navigation from '@/components/layout/Navigation'
import { TabComponent, TabItem } from '@/components/ui/TabComponent'
import { ContentCard } from '@/components/ui/ContentCard'
import Image from 'next/image'
import { useTranslations } from '@/lib/providers/TextContext'

export default function TIL() {
  const t = useTranslations()
  const tilT = useTranslations('pages.til')
  const [activeTab, setActiveTab] = useState<string>(
    tilEntries[0]?.title || 'default',
  )

  // Function to get preview image based on entry tags
  const getPreviewImageForEntry = (entry: TILEntry) => {
    // Map tags to specific images
    const tagImageMap: Record<string, string> = {
      React: '/notion-images/albaform/create-form.png',
      TypeScript: '/notion-images/albaform/job-list.png',
      'Next.js': '/notion-images/albaform/seo.png',
      JavaScript: '/notion-images/albaform/login.png',
      CSS: '/notion-images/albaform/create-form.png',
      Frontend: '/notion-images/albaform/job-list.png',
      Hooks: '/notion-images/albaform/login.png',
      Async: '/notion-images/albaform/seo.png',
      Layout: '/notion-images/albaform/create-form.png',
    }

    // Try to find an image based on tags
    for (const tag of entry.tags) {
      if (tagImageMap[tag]) {
        return tagImageMap[tag]
      }
    }

    // Default fallback image
    return '/notion-images/albaform/seo.png'
  }

  // Create tabs for TIL entries
  const tabs: TabItem[] = tilEntries.map((entry) => ({
    id: entry.title,
    label: entry.title,
    content: (
      <ContentCard
        title={entry.title}
        icon={<div className="bg-chart-2"></div>}
      >
        <div className="relative h-64 md:h-72 w-full rounded-lg overflow-hidden bg-secondary/20 flex items-center justify-center mb-4">
          <div className="relative w-full h-full">
            <Image
              src={getPreviewImageForEntry(entry)}
              alt={entry.title}
              fill
              className="object-contain"
            />
          </div>
        </div>

        <p className="mb-4 text-gray-700 dark:text-gray-300">
          {entry.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {entry.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </ContentCard>
    ),
  }))

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <section>
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4 text-primary">
              {tilT('title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {tilT('subtitle')}
            </p>
          </div>

          {/* Banner Preview Section */}
          <div className="mb-16">
            <div className="relative w-full max-w-2xl mx-auto h-auto min-h-[340px] md:min-h-[420px] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-chart-1 to-chart-3 rounded-xl opacity-20 blur-xl"></div>
              <div className="relative h-full flex flex-col items-center justify-center p-6 md:p-8">
                <TabComponent
                  tabs={tabs}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </div>
            </div>
          </div>

          {/* List of all TIL entries */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              {tilT('all-entries')}
            </h2>
            {tilEntries.map((entry, index) => (
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
