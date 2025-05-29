'use client'

import PortfolioCTASection from '@/components/sections/CTASection'
import DemoShowcaseSection from '@/components/sections/DemoShowcaseSection'
import PortfolioFAQSection from '@/components/sections/FAQSection'
import FooterSection from '@/components/sections/FooterSection'
import PortfolioHeroSection from '@/components/sections/HeroSection'
import NewsletterSection from '@/components/sections/NewsletterSection'
import PersonalSection from '@/components/sections/PersonalSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import TechStackSection from '@/components/sections/TechStackSection'
import UXDesignSection from '@/components/sections/UXDesignSection'
import { Button } from '@/components/ui/Button/Button'
import Form from '@/components/ui/input/Form'
import StepperDialog from '@/components/ui/containers/Modal/StepperDialog'
import { ROUTER } from '@/lib/constants/router'
import { NAVIGATION_ITEMS } from '@/lib/constants/sections/navigation'
import { useModal } from '@/lib/hooks/useModal'
import {useTranslations} from '@/lib/providers/TextContext'
import { Link } from '@/navigation'
import { JSX, useState } from 'react'

export default function HomePage(): JSX.Element {
  const { modalName, openModal, closeModal } = useModal()
  const t = useTranslations('pages.home')
  const [email, setEmail] = useState('')
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
        return {pathname: '/', hash: itemId}
    }
  }

  const handleSubmit = (data: any) => {
    console.log('Subscribed with email:', data.email)
    // 여기에 이메일 구독 로직 추가
    setEmail('')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="flex flex-col items-center">
      {/* Contact Dialog */}
      <StepperDialog
        isOpen={modalName === 'contactDialog'}
        onRequestClose={closeModal}
      />

      {/* Navigation */}
      <nav
        className="w-full sticky top-0 bg-background z-40 shadow-sm"
        style={
          { '--navbar-height': '64px' } as React.CSSProperties & {
            '--navbar-height': string
          }
        }
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-5 md:py-7 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center justify-between w-full sm:w-auto mb-5 sm:mb-0">
            <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-primary">
              석지인
            </h1>

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
                      className="text-[clamp(0.875rem,1.25vw,1rem)] text-foreground hover:text-primary transition-colors"
                  >
                    {t(`nav.${item.id}`)}
                  </Link>
                </li>
            ))}
            <li>
              <button
                  onClick={() => openModal('contactDialog')}
                  className="text-[clamp(0.875rem,1.25vw,1rem)] text-foreground hover:text-primary transition-colors"
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
                className="md:hidden mt-5 py-6 bg-card rounded-lg shadow-md"
                role="menu"
            >
              <ul className="flex flex-col space-y-5 px-6">
              {NAVIGATION_ITEMS.map((item) => (
                  <li key={item.id} role="menuitem">
                    <Link
                        href={getItemHref(item.id)}
                        className="text-[clamp(1rem,1.5vw,1.125rem)] font-medium text-foreground hover:text-primary transition-colors py-3 block"
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
                      className="text-[clamp(1rem,1.5vw,1.125rem)] font-medium text-foreground hover:text-primary transition-colors py-2 text-left w-full"
                  >
                    {t('nav.contact')}
                  </button>
                </li>
              </ul>

              {/* CTA form area - mobile */}
            <div className="mt-8 px-6">
              <Form
                formId="release-notification-form-mobile"
                onSubmit={handleSubmit}
                defaultValues={{ email }}
                className={'flex flex-col space-y-5'}
              >
                <Form.Field>
                  <Form.Input
                    name="email"
                    type="email"
                    placeholder={
                      t('release.email-placeholder') ||
                      '이메일 주소를 입력하세요'
                    }
                    className="text-[clamp(1rem,1.5vw,1.125rem)] w-full"
                    required={true}
                    hookFormPattern={{
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: '유효한 이메일 주소를 입력해주세요',
                    }}
                    minLength={5}
                    maxLength={100}
                    aria-label="이메일 주소"
                  />
                </Form.Field>
                <Button
                  type="submit"
                  size="lg"
                  className="text-[clamp(1rem,1.5vw,1.125rem)] w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  예약하기
                </Button>
              </Form>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="w-full">
        {/* Portfolio Content */}
        <div className="w-full bg-gradient-to-b from-background to-secondary/5 py-16">
          <PortfolioHeroSection />
          <DemoShowcaseSection />
          <PersonalSection />
          <ProjectsSection />
          <TechStackSection />
          <UXDesignSection />
          <PortfolioFAQSection />
          <PortfolioCTASection />
          <NewsletterSection />
          <FooterSection />
        </div>
      </main>
    </div>
  )
}
