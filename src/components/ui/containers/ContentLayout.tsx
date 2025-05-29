'use client'

import { cn } from '@/lib/utils/classnames'
import React from 'react'

export interface ContentLayoutProps {
  children: React.ReactNode
  className?: string

  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'

  gap?: string

  align?: 'start' | 'center' | 'end' | 'stretch'

  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

  wrap?: boolean
}

export function ContentLayout({
  children,
  className,
  direction = 'row',
  gap = 'gap-8',
  align = 'start',
  justify = 'start',
  wrap = false,
}: ContentLayoutProps) {
  const alignmentMap = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }

  const justifyMap = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  }

  const directionMap = {
    row: 'flex-row',
    column: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'column-reverse': 'flex-col-reverse',
  }

  return (
    <div
      className={cn(
        'flex',
        directionMap[direction],
        alignmentMap[align],
        justifyMap[justify],
        gap,
        wrap && 'flex-wrap',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function GridLayout({
  children,
  className,
  cols = { default: 1, sm: 2, md: 3, lg: 4 },
  gap = 'gap-8',
}: {
  children: React.ReactNode
  className?: string
  cols?: {
    default: number
    sm?: number
    md?: number
    lg?: number
  }
  gap?: string
}) {
  const getColsClass = () => {
    const { default: defaultCols, sm, md, lg } = cols

    return cn(
      `grid-cols-${defaultCols}`,
      sm && `sm:grid-cols-${sm}`,
      md && `md:grid-cols-${md}`,
      lg && `lg:grid-cols-${lg}`,
    )
  }

  return (
    <div className={cn('grid', getColsClass(), gap, className)} role={'list'}>
      {children}
    </div>
  )
}

ContentLayout.Grid = GridLayout
