'use client'

import { cn } from '@/lib/utils/classnames'
import { Link } from '@/navigation'
import { ReactNode } from 'react'

interface FooterLink {
  href: string
  label: string | ReactNode
}

interface FooterSectionProps {
  title: string | ReactNode
  links?: FooterLink[]
  children?: ReactNode
  className?: string
}

export function Footer({
  title,
  links,
  children,
  className,
}: FooterSectionProps) {
  return (
    <div className={cn('', className)}>
      <h6 className="text-xl font-semibold mb-6">{title}</h6>
      {links && links.length > 0 && (
        <ul className="space-y-4">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className="text-base text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {children}
    </div>
  )
}
