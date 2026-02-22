'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Link } from '@/navigation'
import { CopyIcon, CheckIcon } from 'lucide-react'
import {
  ButtonContainer,
  FloatingButtonGroup,
  TocButton, TocMenu,
  ShareMenu,
} from '@/components/FloatingButtonGroup'

const NAV_ITEMS = [
  { id: 'career', label: '경력' },
  { id: 'tech-stack', label: '기술 스택' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: '더 보기' },
]

const CONTACT_INFO = [
  { label: 'Email', value: 'seokjiin1073@gmail.com', href: 'mailto:seokjiin1073@gmail.com' },
  { label: 'GitHub', value: 'github.com/JiinSeok', href: 'https://github.com/JiinSeok' },
  { label: 'LinkedIn', value: 'linkedin.com/in/jiin-seok', href: 'https://linkedin.com/in/jiin-seok' },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const contactRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setContactOpen(false)
      }
    }
    if (contactOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [contactOpen])

  const copyAll = async () => {
    const text = `석지인 (Jiin Seok)\nEmail: seokjiin1073@gmail.com\nGitHub: github.com/JiinSeok\nLinkedIn: linkedin.com/in/jiin-seok`
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <nav
      className="w-full sticky top-0 bg-background z-40 shadow-sm"
      style={
        { '--navbar-height': '64px' } as React.CSSProperties & {
          '--navbar-height': string
        }
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-4 md:py-6 flex justify-between items-center">
        {/* Left: name + copy info */}
        <div className="flex items-center gap-4 relative" ref={contactRef}>
          <Link href="/" className="w-fit text-lg md:text-xl font-bold text-primary whitespace-nowrap">
            석지인<span className="text-muted-foreground font-normal mx-1.5">·</span><span className="text-muted-foreground font-normal">웹 개발자</span>
          </Link>
          <button
            onClick={() => setContactOpen(!contactOpen)}
            className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors border border-border/50 rounded-full px-2.5 py-1"
          >
            <CopyIcon className="w-3 h-3" />
            <span>Copy Info</span>
          </button>

          {/* Contact dropdown */}
          {contactOpen && (
            <div className="absolute top-full left-0 mt-3 w-72 bg-card border border-border/50 rounded-xl shadow-lg p-4 animate-in slide-in-from-top-2 duration-150 z-50">
              <ul className="space-y-2.5">
                {CONTACT_INFO.map((item) => (
                  <li key={item.label} className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground w-14 shrink-0 text-xs font-medium">{item.label}</span>
                    <a
                      href={item.href}
                      target={item.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors truncate"
                    >
                      {item.value}
                    </a>
                  </li>
                ))}
              </ul>
              <button
                onClick={copyAll}
                className="mt-3 w-full flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-primary border border-border/50 rounded-lg py-1.5 transition-colors"
              >
                {copied ? (
                  <><CheckIcon className="w-3 h-3" /> 복사됨</>
                ) : (
                  <><CopyIcon className="w-3 h-3" /> 전체 복사</>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Desktop nav links */}
        <ul className="hidden sm:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </button>
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

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 focus:outline-none sm:hidden"
          aria-label="메뉴 열기/닫기"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="sm:hidden border-t border-border/50 bg-card shadow-md"
          role="menu"
        >
          <ul className="flex flex-col py-2 px-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} role="menuitem">
                <button
                  onClick={() => { scrollTo(item.id); setIsMenuOpen(false) }}
                  className="w-full text-left text-base font-medium text-foreground hover:text-primary transition-colors py-3 block"
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li role="menuitem">
              <button
                onClick={() => { copyAll(); setIsMenuOpen(false) }}
                className="w-full text-left text-base font-medium text-foreground hover:text-primary transition-colors py-3 flex items-center gap-2"
              >
                <CopyIcon className="w-4 h-4" />
                {copied ? '복사됨!' : 'Copy Info'}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
