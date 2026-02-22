'use client'

import { Button } from '@/components/ui/Button/Button'
import { ContentCard } from '@/components/ui/ContentCard'
import { SectionContainer } from '@/components/ui/containers/SectionContainer'
import { ContentLayout } from '@/components/ui/containers/ContentLayout'
import { TabComponent, TabItem } from '@/components/ui/TabComponent'
import { useModal } from '@/lib/hooks/useModal'
import { useTranslations } from '@/lib/providers/TextContext'
import handleError from '@/lib/utils/errorHandler'
import { Link } from '@/navigation'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

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
              className="text-xl md:text-2xl lg:text-3xl font-bold break-keep leading-tight"
            >
              {item}
            </li>
          ))
        } else {
          return (
            <li className="text-base md:text-lg lg:text-xl leading-relaxed">
              {summary}
            </li>
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
  const t = useTranslations('pages.home.sections.hero')
  const { openModal } = useModal()
  const [activeTab, setActiveTab] = useState<string>('competencies')

  // Define tab content
  const competencies = t('competencies') as unknown as Array<{ label: string; description: string }>
  const achievements = t('achievements') as unknown as string[]
  const education = t('education') as unknown as Array<{ label: string; description: string }>
  const certifications = t('certifications') as unknown as Array<{ label: string; description: string }>

  const tabs: TabItem[] = useMemo<TabItem[]>(
    () => [
      {
        id: 'competencies',
        label: t('tab-competencies'),
        content: (
          <ContentCard title={t('competencies-title')}>
            <ul className="space-y-3">
              {Array.isArray(competencies) && competencies.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-sm md:text-base">{item.label}</span>
                    <p className="text-xs md:text-sm text-muted-foreground mt-0.5">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </ContentCard>
        ),
      },
      {
        id: 'achievements',
        label: t('tab-achievements'),
        content: (
          <ContentCard title={t('achievements-title')}>
            <ul className="space-y-3">
              {Array.isArray(achievements) && achievements.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm md:text-base">
                  <span className="shrink-0 text-primary mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <polyline points="9 11 12 14 22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  </span>
                  <span className="break-keep">{item}</span>
                </li>
              ))}
            </ul>
          </ContentCard>
        ),
      },
      {
        id: 'education',
        label: t('tab-education'),
        content: (
          <ContentCard title={t('education-title')}>
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">학력</h4>
                <ul className="space-y-2">
                  {Array.isArray(education) && education.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm md:text-base">
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="font-medium">{item.label}</span>
                      <span className="text-muted-foreground">— {item.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">자격증</h4>
                <ul className="space-y-2">
                  {Array.isArray(certifications) && certifications.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm md:text-base">
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="font-medium">{item.label}</span>
                      <span className="text-muted-foreground">— {item.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ContentCard>
        ),
      },
    ],
    [t, competencies, achievements, education, certifications],
  )

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

  const handleDownloadResume = async () => {
    try {
      window.open(
        // 'https://www.rallit.com/resumes/1459572@jxh4cjhfc4/%EC%84%9D%EC%A7%80%EC%9D%B8'
        '/files/resume.pdf',
        '_blank',
      )
    } catch (error) {
      handleError('올바른 파일 주소를 찾을 수 없습니다.', error as Error)
    }
  }

  return (
    <HeroSectionContext.Provider value={contextValue}>
      <SectionContainer
        id="hero"
        background="bg-gradient-to-b from-background to-secondary/20"
        padding="py-16 md:py-20 px-6 md:px-8 lg:px-12"
      >
        <ContentLayout
          direction="column"
          gap="gap-10"
          className="md:flex-row md:items-start"
        >
          <header className="md:w-1/2 mb-12 md:mb-0">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-start mb-4"
              id="meta.title"
            >
              <span className="block">{t('title-highlight1')}</span>
              <span className="block">{t('title-highlight2')}</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground text-start mb-12 max-w-3xl mx-auto">
              고객이 믿을 수 있는 웹 경험, 어떻게 만들까?
            </p>
            <div className="text-base md:text-lg w-full mb-10 font-extralight text-muted-foreground leading-relaxed whitespace-pre-line">
              <p>안녕하세요. SQA에서 프론트엔드로 전환한 개발자 석지인입니다.</p>
              <p>
                4개 회사에서 <strong>B2B SaaS 온보딩, 이슈 트래킹, 대시보드 MVP 개발</strong>을 수행하며
                복잡한 문제일수록 UI/UX가 중요하다는 것을 체감했습니다.
              </p>
              <p>
                <strong>구조화 · 공통화 · 표준화 · 자동화 · 문서화</strong>로
                비즈니스 가치를 전하고 사용자를 고객으로 만드는 프론트엔드를 만듭니다.
              </p>
            </div>
            {/*<HeroSection.Summary />*/}
            <nav
              className="flex flex-wrap gap-5"
              aria-label={t('cta-projects')}
            >
              <Link href="https://jiin-seok.notion.site/portfolio">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-base md:text-lg px-6 py-4 rounded-md"
                >
                  {t('cta-projects')}
                </Button>
              </Link>
              <Button
                onClick={handleDownloadResume}
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10 text-base md:text-lg px-6 py-4 rounded-md"
              >
                {t('cta-resume')}
              </Button>
            </nav>
          </header>
          <HeroSection.TabDisplay tabs={tabs} />
        </ContentLayout>
      </SectionContainer>
    </HeroSectionContext.Provider>
  )
}
