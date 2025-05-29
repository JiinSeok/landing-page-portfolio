'use client'

import { ComponentProps } from '@/lib/types'
import { cn } from '@/lib/utils/classnames'
import React from 'react'

export interface SectionContainerProps extends ComponentProps {
  background?: string
  /**
   * Whether to use full width or constrained width
   */
  fullWidth?: boolean
  padding?: string
}

export function SectionContainer({
  children,
  className,
  id,
  background,
  fullWidth = false,
  padding = 'py-24 px-6 md:px-8 lg:px-12',
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn(
        'w-full',
        background || 'bg-background',
        padding,
        className,
      )}
    >
      <div className={cn('mx-auto', fullWidth ? 'w-full' : 'max-w-7xl')}>
        {children}
      </div>
    </section>
  )
}

export function SectionHeader({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
  centered = true,
}: {
  title: React.ReactNode
  subtitle?: React.ReactNode
  className?: string
  titleClassName?: string
  subtitleClassName?: string
  centered?: boolean
}) {
  return (
    <header className={cn('mb-12', centered && 'text-center', className)}>
      <h2
        className={cn(
          'text-3xl md:text-4xl lg:text-5xl font-bold mb-4',
          titleClassName,
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-lg md:text-xl text-muted-foreground max-w-3xl',
            centered && 'mx-auto',
            'leading-relaxed',
            subtitleClassName,
          )}
        >
          {subtitle}
        </p>
      )}
    </header>
  )
}

SectionContainer.Header = SectionHeader
