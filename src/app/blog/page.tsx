'use client'

import React from 'react'
import ComingSoon from '@/components/ui/ComingSoon'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { useTranslations } from '@/lib/providers/TextContext'

/**
 * Blog page component
 * 
 * This page is currently under construction and displays a coming soon message.
 */
export default function BlogPage() {
  const t = useTranslations('pages.blog')

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-grow">
        <ComingSoon 
          pageTitle={t('title')}
          title={t('comingSoon.title')}
          subtitle={t('comingSoon.subtitle')}
          description={t('comingSoon.description')}
          showHomeButton={true}
          showNotification={true}
          customIcon={
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">📝</span>
            </div>
          }
        />
      </main>

      <Footer />
    </div>
  )
}
