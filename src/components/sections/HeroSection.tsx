'use client'

import { Button } from '@/components/ui/Button/Button'
import { ContentCard } from '@/components/ui/ContentCard'
import { SectionContainer } from '@/components/ui/containers/SectionContainer'
import { TabComponent, TabItem } from '@/components/ui/TabComponent'
import { useTranslations } from '@/lib/providers/TextContext'
import handleError from '@/lib/utils/errorHandler'
import styles from '@/lib/utils/styles'
import { Link } from '@/navigation'
import { useEffect, useMemo, useState } from 'react'

// Section preview data for the nav cards
const previewSections = [
  {
    id: 'career',
    title: '경력',
    description: '5개 회사에서의 경험',
    preview: ['도스트11 · 풀스택 개발자', '체인시프트 · 프론트엔드', '핏투게더 · SQA', '물류대장 · SQA 매니저', '연합뉴스 · 자료조사'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: 'tech-stack',
    title: '기술 스택',
    description: '사용하는 주요 기술과 도구',
    preview: ['React · TypeScript · Rails', 'Tailwind CSS · Next.js', 'Git · Docker · MySQL'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 'faq',
    title: '자주 묻는 질문',
    description: '궁금하실 수 있는 점들',
    preview: ['현재 어떤 일을 하고 있나요?', 'SQA 경험이 어떻게 도움이 되나요?', '협업 스타일은 어떤가요?'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </svg>
    ),
  },
]

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Main component
export default function HeroSection() {
  const t = useTranslations('pages.home.sections.hero')
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
                    <span className="font-semibold text-sm">{item.label}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
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
                <li key={i} className={styles.combineStyles([styles.text.body('small'), 'flex items-start gap-2'])}>
                  <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
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
                    <li key={i} className="flex items-center gap-2 text-sm">
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
                    <li key={i} className="flex items-center gap-2 text-sm">
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
      const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
      const nextIndex = (currentIndex + 1) % tabs.length
      setActiveTab(tabs[nextIndex].id)
    }, 5000)

    return () => clearInterval(interval)
  }, [activeTab, tabs])

  const handleDownloadResume = async () => {
    try {
      window.open('/files/resume.pdf', '_blank')
    } catch (error) {
      handleError('올바른 파일 주소를 찾을 수 없습니다.', error as Error)
    }
  }

  return (
      <SectionContainer
        id="hero"
        background="bg-gradient-to-b from-background to-secondary/20"
        padding="py-16 md:py-20 px-6 md:px-8 lg:px-12"
      >
        {/* Hero: Left intro + Right preview nav */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start gap-10">
          <header className="md:w-1/2">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-start mb-4"
              id="meta.title"
            >
              <span className="block">{t('title-highlight1')}</span>
              <span className="block">{t('title-highlight2')}</span>
            </h1>
            <p className={styles.combineStyles([styles.text.body('large'), 'text-muted-foreground text-start mb-12'])}>
              SQA 출신 풀스택 개발자
            </p>
            <div className={styles.combineStyles([styles.text.body('default'), 'w-full mb-10 font-light text-muted-foreground leading-relaxed whitespace-pre-line'])}>
              <p>안녕하세요. 석지인입니다.</p>
              <p>
                MBC AI 전략자회사 <strong>도스트11</strong>에서 디지털 에셋 마켓 도프켓의 풀스택 개발을 하고 있어요.
                한국 시장 로컬라이제이션, 상품 대시보드, 블로그 CMS, 결제 UX, B2B 고객사 온보딩 등을 맡고 있습니다.
              </p>
              <p>
                이전에 2개 회사에서 SQA를 했고, 그때 시작한 이슈 트래킹·용어 통일·문서화 습관이 개발에도 이어지고 있어요.
              </p>
            </div>
            <nav className="flex flex-wrap gap-5" aria-label={t('cta-projects')}>
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

          {/* Section preview nav cards — vertical */}
          <nav className="md:w-1/2 flex flex-col gap-3 mt-4 md:mt-0" aria-label="섹션 미리보기">
            {previewSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="group text-left p-5 rounded-lg border border-border/50 bg-card hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary">{section.icon}</span>
                  <h3 className="font-semibold text-sm">{section.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{section.description}</p>
                <ul className="space-y-1.5">
                  {section.preview.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground/70 truncate">
                      <span className="shrink-0 w-1 h-1 rounded-full bg-primary/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </nav>
        </div>

        {/* Carousel — full width below hero content */}
        <div className="max-w-3xl mx-auto mt-16">
          <div className="relative rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-chart-1 to-chart-3 rounded-xl opacity-20 blur-xl" />
            <div className="relative h-[28rem] flex flex-col p-6 md:p-8">
              <TabComponent
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
          </div>
        </div>
      </SectionContainer>
  )
}
