'use client'

import React, { useState, useRef, useEffect } from 'react'
import { NAVBAR_HEIGHT } from '@/lib/constants/layout'
import { Link } from '@/navigation'
import { CopyIcon, CheckIcon } from 'lucide-react'
import {
  ButtonContainer,
  FloatingButtonGroup,
  TocButton,
  TocMenu,
  ShareMenu,
} from '@/components/FloatingButtonGroup'
import { ROUTER } from '@/lib/constants/router'

const NAV_ITEMS = [
  { id: 'career', label: '경력' },
  { id: 'tech-stack', label: '기술 스택' },
  { id: 'faq', label: 'FAQ' },
]

const EXTERNAL_LINKS = [
  { label: 'GitHub', href: ROUTER.GitHub.path },
  { label: 'LinkedIn', href: ROUTER.LinkedIn.path },
  { label: 'Email', href: ROUTER.Email.path },
]

const CONTACT_INFO = [
  {
    label: 'Email',
    value: 'seokjiin1073@gmail.com',
    href: 'mailto:seokjiin1073@gmail.com',
  },
  {
    label: 'GitHub',
    value: 'github.com/JiinSeok',
    href: 'https://github.com/JiinSeok',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/jiin-seok',
    href: 'https://linkedin.com/in/jiin-seok',
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
  const [contactOpen, setContactOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const contactRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        contactRef.current &&
        !contactRef.current.contains(e.target as Node)
      ) {
        setContactOpen(false)
      }
    }
    if (contactOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [contactOpen])

  const copyAndShow = async () => {
    const text = `석지인 (Jiin Seok)\nEmail: seokjiin1073@gmail.com\nGitHub: github.com/JiinSeok\nLinkedIn: linkedin.com/in/jiin-seok`
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setContactOpen(true)
    setTimeout(() => {
      setContactOpen(false)
      setCopied(false)
    }, 3000)
  }

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
        <div className="flex items-center gap-4 relative" ref={contactRef}>
          <Link
            href="/"
            className="w-fit text-lg md:text-xl font-bold text-foreground whitespace-nowrap"
          >
            석지인<span className="text-muted-foreground/70 font-normal mx-1.5">·</span>
            <span className="text-muted-foreground font-normal">개발자</span>
          </Link>
          <button
            onClick={copyAndShow}
            className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground border border-border rounded-full px-2.5 py-1 hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {copied ? (
              <CheckIcon className="w-3 h-3" />
            ) : (
              <CopyIcon className="w-3 h-3" />
            )}
            <span>{copied ? 'Copied!' : 'Copy Info'}</span>
          </button>

          {contactOpen && (
            <div className="absolute top-full left-0 mt-3 w-72 bg-popover border border-border rounded-xl shadow-lg p-4 animate-in slide-in-from-top-2 duration-150 z-50">
              <p className="flex items-center gap-1.5 text-xs text-emerald-600 mb-3">
                <CheckIcon className="w-3.5 h-3.5" />
                클립보드에 복사되었습니다
              </p>
              <ul className="space-y-2">
                {CONTACT_INFO.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span className="text-muted-foreground w-14 shrink-0 text-xs font-medium">
                      {item.label}
                    </span>
                    <span className="text-foreground truncate">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-6">
          <a
            href={ROUTER.Resume.path}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
          >
            이력서
          </a>

          <span className="h-4 w-px bg-border" aria-hidden />

          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <span className="h-4 w-px bg-border" aria-hidden />

          <ul className="flex items-center gap-5">
            {EXTERNAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="nav-floating-buttons">
              <FloatingButtonGroup className="static flex-row">
                <ButtonContainer>
                  <TocButton />
                </ButtonContainer>
                <TocMenu />
                <ShareMenu />
              </FloatingButtonGroup>
            </li>
          </ul>
        </div>

        <button
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
                onClick={() => {
                  copyAndShow()
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
