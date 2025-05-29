'use client'

import { ReactNode } from 'react'

interface ContentCardProps {
  title?: string
  icon?: ReactNode
  children: ReactNode
  className?: string
  footer?: ReactNode
  hoverEffect?: boolean
}

export function ContentCard({
  title,
  icon,
  children,
  className = '',
  footer,
}: ContentCardProps) {
  return (
    <div
      className={`bg-card p-6 md:p-8 rounded-xl shadow-lg w-full ${className}`}
    >
      {icon && <div className="text-4xl mb-4">{icon}</div>}
      {title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
      <div className="space-y-4">{children}</div>
      {footer && (
        <div className="mt-4 pt-4 border-t border-border">{footer}</div>
      )}
    </div>
  )
}
