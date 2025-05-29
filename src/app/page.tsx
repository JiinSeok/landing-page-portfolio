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
import { useTranslations } from '@/lib/constants/mock-translations'
import styles from '@/lib/utils/styles'
import { Link } from '@/navigation'
import { JSX, useState } from 'react'

export default function HomePage(): JSX.Element {
  const { modalName, openModal, closeModal } = useModal()
  const t = useTranslations('HomePage')
  const [email, setEmail] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
            <h1
              className={styles.combineStyles([
                styles.text.heading(3),
                'md:' + styles.text.heading(2).replace('text-', ''),
                'text-primary',
              ])}
            >
              {t('developer-name')}
            </h1>

            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={toggleMenu}
              className="p-2 focus:outline-none sm:hidden"
              aria-label="메뉴 열기/닫기"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
          <div className="hidden sm:flex flex-wrap justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={
                  item.id === 'til'
                    ? ROUTER.TIL.path
                    : item.id === 'soft-skills'
                      ? ROUTER.SoftSkills.path
                      : item.id === 'resume'
                        ? ROUTER.Resume.path
                        : item.id === 'projects'
                          ? ROUTER.Projects.path
                          : item.id === 'site-build'
                            ? ROUTER.SiteBuild.path
                            : { pathname: '/', hash: item.id }
                }
                className={styles.combineStyles([
                  styles.text.ui('default'),
                  'md:' + styles.text.ui('large').replace('text-', ''),
                  'text-foreground hover:text-primary transition-colors',
                ])}
              >
                {t(`nav.${item.id}`)}
              </Link>
            ))}
            <button
              onClick={() => openModal('contactDialog')}
              className={styles.combineStyles([
                styles.text.ui('default'),
                'md:' + styles.text.ui('large').replace('text-', ''),
                'text-foreground hover:text-primary transition-colors',
              ])}
            >
              {t('nav.contact')}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 드롭다운 */}
        {isMenuOpen && (
          <div className="md:hidden mt-5 py-6 bg-card rounded-lg shadow-md">
            <div className="flex flex-col space-y-5 px-6">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  href={
                    item.id === 'til'
                      ? ROUTER.TIL.path
                      : item.id === 'soft-skills'
                        ? ROUTER.SoftSkills.path
                        : item.id === 'resume'
                          ? ROUTER.Resume.path
                          : item.id === 'projects'
                            ? ROUTER.Projects.path
                            : item.id === 'site-build'
                              ? ROUTER.SiteBuild.path
                              : { pathname: '/', hash: item.id }
                  }
                  className="text-base font-medium text-foreground hover:text-primary transition-colors py-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(`nav.${item.id}`)}
                </Link>
              ))}
              <button
                onClick={() => {
                  openModal('contactDialog')
                  setIsMenuOpen(false)
                }}
                className={styles.combineStyles([
                  styles.text.ui('default'),
                  'font-medium text-foreground hover:text-primary transition-colors py-2 text-left',
                ])}
              >
                {t('nav.contact')}
              </button>
            </div>

            {/* CTA 버튼 영역 - 모바일 */}
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
                    className="text-base w-full"
                    required={true}
                    hookFormPattern={{
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: '유효한 이메일 주소를 입력해주세요',
                    }}
                    minLength={5}
                    maxLength={100}
                  />
                </Form.Field>
                <Button
                  type="submit"
                  size="lg"
                  className="text-base w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  예약하기
                </Button>
              </Form>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main role="main" className="w-full">
        {/* Portfolio Content */}
        <div className="w-full bg-gradient-to-b from-background to-secondary/5 py-16">
          {/*<div className="max-w-7xl mx-auto px-6 mb-20">*/}
          {/*  <h2*/}
          {/*    className={styles.combineStyles([*/}
          {/*      styles.text.heading(2),*/}
          {/*      'text-center mb-4',*/}
          {/*    ])}*/}
          {/*    id="portfolio-title"*/}
          {/*  >*/}
          {/*    {t('portfolio-title')}*/}
          {/*  </h2>*/}
          {/*  <p*/}
          {/*    className={styles.combineStyles([*/}
          {/*      styles.text.body('large'),*/}
          {/*      'text-muted-foreground text-center mb-12 max-w-3xl mx-auto',*/}
          {/*    ])}*/}
          {/*  >*/}
          {/*    {t('portfolio-subtitle')}*/}
          {/*  </p>*/}
          {/*</div>*/}
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
