'use client'

import React from 'react'
import { SectionContainer } from './containers/SectionContainer'
import { ContentCard } from './ContentCard'
import { Button } from './Button/Button'
import { Link } from '@/navigation'
import { useTranslations } from '@/lib/providers/TextContext'

interface ComingSoonProps {
  title?: string
  subtitle?: string
  description?: string
  pageTitle?: string
  showHomeButton?: boolean
  showNotification?: boolean
  customIcon?: React.ReactNode
  className?: string
}

/**
 * ComingSoon component
 * 
 * A reusable component for pages that are under construction or coming soon.
 * It displays a message, an optional icon, and buttons to navigate back or get notified.
 */
export default function ComingSoon({
  title,
  subtitle,
  description,
  pageTitle,
  showHomeButton = true,
  showNotification = false,
  customIcon,
  className = '',
}: ComingSoonProps) {
  const t = useTranslations('components.comingSoon')
  
  // Use provided text or fallback to translations
  const displayTitle = title || t('title')
  const displaySubtitle = subtitle || t('subtitle')
  const displayDescription = description || t('description')
  const displayPageTitle = pageTitle || t('pageTitle')
  
  // Default icon if none provided
  const icon = customIcon || (
    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
      <span className="text-5xl">🚧</span>
    </div>
  )

  return (
    <SectionContainer className={`min-h-[70vh] flex items-center justify-center ${className}`}>
      <div className="w-full max-w-3xl mx-auto px-4">
        <ContentCard className="text-center">
          {icon}
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {displayPageTitle}
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            {displayTitle}
          </h2>
          
          <p className="text-xl text-muted-foreground mb-6">
            {displaySubtitle}
          </p>
          
          <div className="bg-secondary/20 p-6 rounded-lg mb-8">
            <p className="text-lg text-muted-foreground">
              {displayDescription}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {showHomeButton && (
              <Link href="/">
                <Button size="lg" variant="default">
                  {t('homeButton')}
                </Button>
              </Link>
            )}
            
            {showNotification && (
              <Button size="lg" variant="outline">
                {t('notifyButton')}
              </Button>
            )}
          </div>
        </ContentCard>
      </div>
    </SectionContainer>
  )
}