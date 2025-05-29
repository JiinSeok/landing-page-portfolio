'use client'

import { Button } from '@/components/ui/Button/Button'
import { ContentCard } from '@/components/ui/ContentCard'
import { TabComponent, TabItem } from '@/components/ui/TabComponent'
import { useModal } from '@/lib/hooks/useModal'
import { useTranslations } from '@/lib/constants/mock-translations'
import styles from '@/lib/utils/styles'
import { Link } from '@/navigation'
import Image from 'next/image'
import { createContext, useContext, useEffect, useState } from 'react'

// Summary Component
HeroSection.Summary = function Summary() {
  const { t } = useHeroSection()

  return (
    <ul className="mb-10 text-muted-foreground list-disc pl-6 space-y-3">
      {(() => {
        const summary = t('hero.summary')
        if (Array.isArray(summary)) {
          return summary.map((item: string, index: number) => (
            <li
              key={index}
              className="text-responsive-sm text-responsive-4xl font-bold break-keep leading-tight"
            >
              {item}
            </li>
          ))
        } else {
          return (
            <li className="text-responsive-md leading-relaxed">{summary}</li>
          )
        }
      })()}
    </ul>
  )
}

// CTA Buttons Component
HeroSection.CTAButtons = function CTAButtons() {
  const { t, openModal } = useHeroSection()

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      <Button
        size="lg"
        className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
        asChild
      >
        <a href="/files/resume.pdf" target="_blank" rel="noopener noreferrer">
          {t('hero.cta-resume')}
        </a>
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto"
        asChild
      >
        <a href="#projects">{t('hero.cta-projects')}</a>
      </Button>
      <Button
        size="lg"
        variant="ghost"
        className="text-primary hover:bg-primary/10 w-full sm:w-auto"
        onClick={() => openModal('contactDialog')}
      >
        {t('hero.cta-contact')}
      </Button>
    </div>
  )
}

// Tab Display Component
interface TabDisplayProps {
  tabs: TabItem[]
}

HeroSection.TabDisplay = function TabDisplay({ tabs }: TabDisplayProps) {
  const { activeTab, setActiveTab } = useHeroSection()

  return (
    <>
      <div className="w-full md:w-7/12 lg:w-1/2 flex justify-center relative mt-8 md:mt-0">
        <div className="relative w-full max-w-lg h-auto min-h-[28rem] md:h-[28rem] rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-chart-1 to-chart-3 rounded-xl opacity-20 blur-xl"></div>
          <div className="relative h-full flex flex-col items-center justify-center p-6 md:p-8">
            <TabComponent
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        </div>
      </div>
    </>
  )
}

// Context type definition
type HeroSectionContextType = {
  activeTab: string
  setActiveTab: (tab: string) => void
  openModal: (modalName: string) => void
  t: (key: string) => string
}

// Create context
const HeroSectionContext = createContext<HeroSectionContextType | undefined>(
  undefined,
)

// Hook to use the context
const useHeroSection = () => {
  const context = useContext(HeroSectionContext)
  if (!context) {
    throw new Error('useHeroSection must be used within a HeroSectionProvider')
  }
  return context
}

// Main component
export default function HeroSection() {
  const t = useTranslations('HomePage')
  const { openModal } = useModal()
  const [activeTab, setActiveTab] = useState<string>('code')

  // Define tab content
  const tabs: TabItem[] = [
    {
      id: 'code',
      label: t('hero.tab-code'),
      content: (
        <ContentCard
          title={t('hero.code-snippet')}
          icon={<div className="bg-chart-1"></div>}
        >
          <div className="bg-secondary p-4 rounded-lg text-responsive-sm">
            {t('hero.code-question')}
          </div>
          <div className="bg-primary/10 p-4 rounded-lg text-responsive-sm whitespace-pre-line">
            {t('hero.code-answer')}
          </div>
          <div className="bg-secondary/50 p-4 rounded-lg font-mono">
            <pre className="text-responsive-sm whitespace-pre-wrap break-words">
              {`// Example TypeScript code
              type User = {
                id: string;
                name: string;
                email: string;
              };

              const fetchUser = async (id: string): Promise<User> => {
                const response = await fetch(\`/api/users/\${id}\`);
                return response.json();
              }`}
            </pre>
          </div>
        </ContentCard>
      ),
    },
    {
      id: 'seo',
      label: t('hero.tab-seo'),
      content: (
        <ContentCard
          title={t('hero.seo-title')}
          icon={<div className="bg-chart-3"></div>}
        >
          <div className="relative h-64 md:h-72 w-full rounded-lg overflow-hidden">
            <Image
              src="/notion-images/albaform/seo.png"
              alt="SEO Optimization"
              fill
              className="object-contain"
            />
          </div>
          <p className="mt-4 text-responsive-sm text-muted-foreground break-keep whitespace-pre-line leading-relaxed h-24 overflow-hidden">
            {t('hero.seo-description')}
          </p>
        </ContentCard>
      ),
    },
    {
      id: 'demo',
      label: t('hero.tab-demo'),
      content: (
        <ContentCard
          title={t('hero.demo-title')}
          icon={<div className="bg-chart-4"></div>}
        >
          <div className="relative h-64 md:h-72 w-full rounded-lg overflow-hidden">
            <Image
              src="/notion-images/albaform/seo.png"
              alt="Interactive Demo"
              fill
              className="object-contain"
            />
          </div>
          <p className="mt-4 text-responsive-sm text-muted-foreground break-keep whitespace-pre-line leading-relaxed h-24 overflow-hidden">
            {t('hero.demo-description')}
          </p>
        </ContentCard>
      ),
    },
  ]

  // Auto-rotate tabs every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Find current tab index
      const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
      // Calculate next tab index (loop back to 0 if at the end)
      const nextIndex = (currentIndex + 1) % tabs.length
      // Set the next tab as active
      setActiveTab(tabs[nextIndex].id)
    }, 5000) // Change tab every 5 seconds

    // Clean up interval on component unmount
    return () => clearInterval(interval)
  }, [activeTab, tabs])

  // Context value
  const contextValue = {
    activeTab,
    setActiveTab,
    openModal,
    t,
  }

  return (
    <HeroSectionContext.Provider value={contextValue}>
      <section
        id="hero"
        className="w-full py-24 bg-gradient-to-b from-background to-secondary/20"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-start gap-10">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h2
                className={styles.combineStyles([
                  styles.text.heading(2),
                  'text-start mb-4',
                ])}
                id="portfolio-title"
              >
                {t('portfolio-title')}
              </h2>
              <p
                className={styles.combineStyles([
                  styles.text.body('large'),
                  'text-muted-foreground text-start mb-12 max-w-3xl mx-auto',
                ])}
              >
                {t('portfolio-subtitle')}
              </p>
              <div className="text-md w-full md:text-lg mb-10 font-extralight text-muted-foreground leading-relaxed whitespace-pre-line">
                <p>안녕하세요.</p>
                <p>
                  소프트웨어를 쉽고 빠르게 만들기 위해 도구를 즐겨 활용하는
                  석지인입니다(TypeScript, Next.js, TailwindCSS, Shadcn/ui,
                  JetBrain Junie(AI) 등). 저 역시{' '}
                  <span className={'font-bold'}>
                    복잡한 기술도 쉽게 이용할 수 있는 프론트엔드
                  </span>
                  로 사용자의 문제를 풀고 싶습니다.
                </p>
                <p>
                  프론트엔드는 비즈니스 가치를 보여줌으로써 사용자를 고객으로
                  만듭니다. 방법에 얽매이지 않고{' '}
                  <span className={'font-bold'}>
                    사용자를 고객으로 만드는 프론트엔드
                  </span>
                  를 위해 노력하겠습니다.
                </p>
              </div>
              {/*<HeroSection.Summary />*/}
              <nav
                className="flex flex-wrap gap-5"
                aria-label={t('hero.main-actions')}
              >
                <Link href="#projects">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-6 py-4 rounded-md"
                  >
                    {t('hero.cta-projects')}
                  </Button>
                </Link>
                <Link href="#resume">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary text-primary hover:bg-primary/10 text-lg px-6 py-4 rounded-md"
                  >
                    {t('hero.cta-resume')}
                  </Button>
                </Link>
              </nav>
            </div>
            <HeroSection.TabDisplay tabs={tabs} />
          </div>
        </div>
      </section>
    </HeroSectionContext.Provider>
  )
}
