'use client'

import React, { useState } from 'react'
import { CheckIcon, CopyIcon, MailIcon } from 'lucide-react'

import {
  NAVBAR_HEIGHT,
  RAIL_OFFSET_LG,
  RAIL_OFFSET_MD,
} from '@/lib/constants/layout'
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
import { Link, usePathname } from '@/navigation'
import { useLocale } from '@/lib/providers/TextContext'

// 영어 i18n 골격은 갖췄으나 본문 산문이 아직 한국어 폴백(혼용)이라 토글을 숨겨 둔다.
// 본문 transcreation·NAV 로케일화 완료 후 true로 바꾸면 토글이 노출된다.
const SHOW_LOCALE_TOGGLE = false

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
    iconClass: 'w-3.5 h-3.5',
  },
  {
    label: 'LinkedIn',
    ariaLabel: 'LinkedIn 프로필',
    href: ROUTER.LinkedIn.path,
    Icon: LinkedinIcon,
    iconClass: 'w-[18px] h-[18px]',
  },
  {
    label: 'Email',
    ariaLabel: '이메일 보내기',
    href: ROUTER.Email.path,
    Icon: MailIcon,
    iconClass: 'w-5 h-5',
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
  const {
    copied: railCopied,
    open: railOpen,
    copy: railCopy,
    containerRef: railRef,
  } = useCopyContact()
  const onHome = usePathname() === '/'
  const { locale, setLocale } = useLocale()

  return (
    <>
      {onHome && (
        <div className="hidden md:block fixed inset-x-0 top-[var(--promo-h)] z-50 pointer-events-none">
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 dark bg-background lg:hidden"
            style={{
              width: `calc((100% - min(72rem, 100%)) / 2 + ${RAIL_OFFSET_MD}px)`,
            }}
          />
          <div
            aria-hidden
            className="hidden absolute inset-y-0 left-0 dark bg-background lg:block"
            style={{
              width: `calc((100% - min(72rem, 100%)) / 2 + ${RAIL_OFFSET_LG}px)`,
            }}
          />
          <div className="relative max-w-6xl mx-auto px-8 flex">
            <div
              ref={railRef}
              className="dark relative flex flex-col items-end justify-center gap-0.5 w-24 lg:w-28 h-14 shrink-0 pr-4 pointer-events-auto"
            >
              <Link
                href="/"
                className="text-lg font-bold text-foreground whitespace-nowrap"
              >
                석지인
              </Link>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <a
                  href={ROUTER.Resume.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[24px] text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  이력서 ↗
                </a>
                <button
                  type="button"
                  onClick={railCopy}
                  className="inline-flex items-center min-h-[24px] text-xs text-muted-foreground whitespace-nowrap hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {railCopied ? '복사됨 ✓' : '연락처 복사'}
                </button>
              </div>
              <ContactPopover open={railOpen} className="left-0" />
            </div>
          </div>
        </div>
      )}
      <nav
        className={`site-header w-full sticky top-[var(--promo-h)] bg-background text-muted-foreground border-b border-border z-40 transition-transform duration-300 ${onHome ? 'md:border-b-0' : ''}`}
        style={
          { '--navbar-height': `${NAVBAR_HEIGHT}px` } as React.CSSProperties & {
            '--navbar-height': string
          }
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 h-14 flex justify-between items-center">
          <div
            className={`flex items-center gap-4 relative ${onHome ? 'md:invisible' : ''}`}
            ref={containerRef}
          >
            <Link
              href="/"
              className="w-fit text-lg font-bold text-foreground whitespace-nowrap"
            >
              석지인
            </Link>
            <ContactCopyButton
              copied={copied}
              onClick={copy}
              className="hidden md:flex"
            />
            <ContactPopover open={open} className="left-0" />
          </div>

          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(item.id)}
                    className="inline-flex items-center min-h-[24px] text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {SHOW_LOCALE_TOGGLE && (
              <button
                type="button"
                onClick={() => setLocale(locale === 'ko' ? 'en' : 'ko')}
                className="inline-flex items-center min-h-[24px] text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                aria-label={
                  locale === 'ko' ? 'Switch to English' : '한국어로 전환'
                }
              >
                {locale === 'ko' ? 'EN' : '한국어'}
              </button>
            )}

            <a
              href={ROUTER.Resume.path}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3.5 py-1.5 bg-foreground text-background text-sm font-medium rounded-full hover:bg-foreground/85 transition-colors ${onHome ? 'md:hidden' : ''}`}
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
            className="p-2 md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
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
            className="md:hidden border-t border-border bg-background"
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
    </>
  )
}
