'use client'

import React, { useState } from 'react'
import { CheckIcon, CopyIcon, MailIcon } from 'lucide-react'

import { NAVBAR_HEIGHT } from '@/lib/constants/layout'
import { ROUTER } from '@/lib/constants/router'
import { useCopyContact } from '@/lib/hooks/useCopyContact'
import {
  ContactCopyButton,
  ContactPopover,
} from '@/components/layout/ContactCopyButton'
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons'
import {
  ButtonContainer,
  FloatingButtonGroup,
  TocButton,
  TocMenu,
  ShareMenu,
} from '@/components/FloatingButtonGroup'
import { Link } from '@/navigation'

const NAV_ITEMS = [
  { id: 'career', label: '커리어' },
  { id: 'tech-stack', label: '기술 스택' },
  { id: 'faq', label: 'FAQ' },
]

const EXTERNAL_LINKS = [
  {
    label: 'GitHub',
    ariaLabel: 'GitHub 프로필',
    href: ROUTER.GitHub.path,
    Icon: GithubIcon,
  },
  {
    label: 'LinkedIn',
    ariaLabel: 'LinkedIn 프로필',
    href: ROUTER.LinkedIn.path,
    Icon: LinkedinIcon,
  },
  {
    label: 'Email',
    ariaLabel: '이메일 보내기',
    href: ROUTER.Email.path,
    Icon: MailIcon,
  },
]

function scrollTo(id: string) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { copied, open, copy, containerRef } = useCopyContact()

  return (
    <nav
      className="site-header w-full sticky top-0 bg-background text-muted-foreground border-b border-border z-40 transition-transform duration-300"
      style={
        { '--navbar-height': `${NAVBAR_HEIGHT}px` } as React.CSSProperties & {
          '--navbar-height': string
        }
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 h-14 flex justify-between items-center">
        <div className="flex items-center gap-4 relative" ref={containerRef}>
          <Link
            href="/"
            className="w-fit text-lg font-bold text-foreground whitespace-nowrap"
          >
            석지인
          </Link>
          <ContactCopyButton
            copied={copied}
            onClick={copy}
            className="hidden sm:flex"
          />
          <ContactPopover open={open} className="left-0" />
        </div>

        <div className="hidden sm:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <ul className="flex items-center gap-1">
            {EXTERNAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  title={link.ariaLabel}
                  className="flex items-center p-1.5 text-muted-foreground rounded-md hover:text-foreground hover:bg-secondary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <link.Icon className="w-4 h-4" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href={ROUTER.Resume.path}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 bg-foreground text-background text-sm font-medium rounded-full hover:bg-foreground/85 transition-colors"
          >
            이력서
          </a>

          <div className="nav-floating-buttons">
            <FloatingButtonGroup className="static flex-row">
              <ButtonContainer>
                <TocButton />
              </ButtonContainer>
              <TocMenu />
              <ShareMenu />
            </FloatingButtonGroup>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 sm:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          aria-label="메뉴 열기/닫기"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="sm:hidden border-t border-border bg-background"
          role="menu"
        >
          <ul className="flex flex-col py-2 px-4">
            <li role="menuitem">
              <a
                href={ROUTER.Resume.path}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-left text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-3 block"
                onClick={() => setIsMenuOpen(false)}
              >
                이력서
              </a>
            </li>
            {NAV_ITEMS.map((item) => (
              <li key={item.id} role="menuitem">
                <button
                  type="button"
                  onClick={() => {
                    scrollTo(item.id)
                    setIsMenuOpen(false)
                  }}
                  className="w-full text-left text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-3 block"
                >
                  {item.label}
                </button>
              </li>
            ))}
            {EXTERNAL_LINKS.map((link) => (
              <li key={link.label} role="menuitem">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-left text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-3 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li role="menuitem">
              <button
                type="button"
                onClick={() => {
                  copy()
                  setIsMenuOpen(false)
                }}
                className="w-full text-left text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-3 flex items-center gap-2"
              >
                {copied ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  <CopyIcon className="w-4 h-4" />
                )}
                {copied ? '복사됨!' : 'Copy Info'}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
