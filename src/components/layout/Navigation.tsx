'use client'

import React, { useState } from 'react'
import { Link } from '@/navigation'
import { NAVIGATION_ITEMS } from '@/lib/constants/sections/navigation'
import { ROUTER } from '@/lib/constants/router'
import { useTranslations } from '@/lib/providers/TextContext'
import { useModal } from '@/lib/hooks/useModal'

export default function Navigation() {
  const { modalName, openModal, closeModal } = useModal()
  const t = useTranslations('pages.home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Helper function to determine navigation item href
  const getItemHref = (itemId: string) => {
    switch (itemId) {
      case 'til':
        return ROUTER.TIL.path
      case 'soft-skills':
        return ROUTER.SoftSkills.path
      case 'resume':
        return ROUTER.Resume.path
      case 'projects':
        return ROUTER.Projects.path
      case 'site-build':
        return ROUTER.SiteBuild.path
      default:
        return { pathname: '/', hash: itemId }
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-4 md:py-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center justify-between w-full sm:w-auto mb-5 sm:mb-0">
          <Link href="/public" className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
            석지인
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
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
        <ul className="hidden sm:flex flex-wrap justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {NAVIGATION_ITEMS.map((item) => (
            <li key={item.id}>
              <Link
                href={getItemHref(item.id)}
                className="text-sm md:text-base text-foreground hover:text-primary transition-colors"
              >
                {t(`nav.${item.id}`)}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={() => openModal('contactDialog')}
              className="text-sm md:text-base text-foreground hover:text-primary transition-colors"
            >
              {t('nav.contact')}
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden mt-4 py-5 bg-card rounded-lg shadow-md"
          role="menu"
        >
          <ul className="flex flex-col space-y-4 px-4 sm:px-6">
            {NAVIGATION_ITEMS.map((item) => (
              <li key={item.id} role="menuitem">
                <Link
                  href={getItemHref(item.id)}
                  className="text-base md:text-lg font-medium text-foreground hover:text-primary transition-colors py-3 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(`nav.${item.id}`)}
                </Link>
              </li>
            ))}
            <li role="menuitem">
              <button
                onClick={() => {
                  openModal('contactDialog')
                  setIsMenuOpen(false)
                }}
                className="text-base md:text-lg font-medium text-foreground hover:text-primary transition-colors py-2 text-left w-full"
              >
                {t('nav.contact')}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}