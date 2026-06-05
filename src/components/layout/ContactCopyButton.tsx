'use client'

import { CheckIcon, CopyIcon } from 'lucide-react'

import { CONTACT_INFO } from '@/lib/constants/contact'

import type { ButtonHTMLAttributes, HTMLAttributes } from 'react'

interface ContactCopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  copied: boolean
}

function ContactCopyButton({
  copied,
  className = '',
  ...rest
}: ContactCopyButtonProps) {
  return (
    <button
      type="button"
      aria-label="연락처 복사"
      title="연락처 복사"
      className={`flex items-center p-1.5 text-muted-foreground rounded-md hover:text-foreground hover:bg-secondary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${className}`}
      {...rest}
    >
      {copied ? (
        <CheckIcon className="w-4 h-4" />
      ) : (
        <CopyIcon className="w-4 h-4" />
      )}
    </button>
  )
}

interface ContactPopoverProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean
}

function ContactPopover({
  open,
  className = '',
  ...rest
}: ContactPopoverProps) {
  if (!open) return null

  return (
    <div
      className={`absolute top-full mt-3 w-72 p-4 bg-popover border border-border rounded-xl shadow-lg animate-in slide-in-from-top-2 duration-150 z-50 ${className}`}
      {...rest}
    >
      <p className="flex items-center gap-1.5 mb-3 text-xs text-emerald-600">
        <CheckIcon className="w-3.5 h-3.5" />
        클립보드에 복사되었습니다
      </p>
      <ul className="space-y-2">
        {CONTACT_INFO.map((item) => (
          <li key={item.label} className="flex items-center gap-2 text-sm">
            <span className="w-14 shrink-0 text-muted-foreground text-xs font-medium">
              {item.label}
            </span>
            <span className="text-popover-foreground truncate">
              {item.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { ContactCopyButton, ContactPopover }
