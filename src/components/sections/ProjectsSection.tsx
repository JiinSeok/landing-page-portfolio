'use client'

import { Button } from '@/components/ui/Button/Button'
import { ContentCard } from '@/components/ui/ContentCard'
import {
  SectionContainer,
  SectionHeader,
} from '@/components/ui/containers/SectionContainer'
import {
  ContentLayout,
  GridLayout,
} from '@/components/ui/containers/ContentLayout'
import { Link } from '@/navigation'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LayoutGridIcon,
  LayoutIcon,
} from 'lucide-react'
import { useTranslations } from '@/lib/providers/TextContext'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

// 이미지/GIF URL과 대체 텍스트가 포함된 프로젝트 인터페이스
export interface ProjectWithMedia {
  title: string
  year: number
  description: string
  url: string
  imageUrl: string
  alt: string
  codeSnippet?: string
  notionUrl?: string
}

// 프로젝트별 세부 페이지가 따로 없으면 전체 포트폴리오로 연결
const NOTION_PORTFOLIO_URL = 'https://jiin-seok.notion.site/portfolio'

const projectsData: ProjectWithMedia[] = [
  {
    title: 'formkit-react',
    year: 2025,
    description:
      '직접 만들어 npm에 배포한 React 폼 라이브러리입니다. Compound Component 패턴으로 조합 가능한 API를 만들고, Zod 검증과 접근성(ARIA), TypeScript 타입을 한 패키지로 정리했습니다. Vite로 빌드하고 GitHub Actions로 검증한 뒤 배포했습니다.',
    url: 'https://www.npmjs.com/package/@jiin.seok/formkit-react',
    imageUrl: '/images/projects/formkit-react.png',
    alt: 'formkit-react 폼 라이브러리 예제 화면',
    codeSnippet: `import FormKit from '@jiin.seok/formkit-react'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('이메일 형식이 올바르지 않습니다'),
  password: z.string().min(8, '8자 이상 입력해 주세요'),
})

export function LoginForm() {
  return (
    <FormKit.Root formId="login" schema={schema} onSubmit={handleSubmit}>
      <FormKit.Field>
        <FormKit.Label>이메일</FormKit.Label>
        <FormKit.Input name="email" type="email" required />
      </FormKit.Field>
      <FormKit.SubmitButton>로그인</FormKit.SubmitButton>
    </FormKit.Root>
  )
}`,
  },
  {
    title: 'bodycodi',
    year: 2025,
    description:
      '2016년부터 운영된 JSP 레거시와 공존하는 React 화면을 점진적으로 통합한 프로젝트입니다. JSP의 전역 CSS와 Tailwind가 충돌하던 문제를 tw- prefix 전략과 컨벤션 문서로 정리했고, Axios와 TanStack Query로 에러 처리를 한곳에 모았습니다.',
    url: 'https://github.com/JiinSeok/bodycodi-frontend',
    imageUrl: '/images/projects/bodycodi.png',
    alt: 'bodycodi 프로젝트 소개 카드 (JSP 레거시와 React 통합)',
    codeSnippet: `// 레거시 JSP의 전역 CSS와 충돌하지 않도록 prefix 전략
// tailwind.config.js
export default {
  prefix: 'tw-', // .container / .card / .btn 충돌 방지
}

// TanStack Query 한곳에서 에러 처리
new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => handleApiError(error),
  }),
})`,
  },
  {
    title: 'albaform',
    year: 2024,
    description:
      '여러 명이 함께 만든 알바 구인구직 플랫폼입니다. 검색 노출을 위한 SSR과 인터랙션을 위한 CSR을 나누고, 사용자 상태 6종에 따라 권한과 렌더링을 분기해 비인가 접근을 막았습니다. 공통 컴포넌트로 화면을 통일하고 낙관적 업데이트로 반응 속도를 높였습니다.',
    url: 'https://albaform.usejiin.link',
    imageUrl: '/images/projects/albaform.png',
    alt: 'albaform 구인구직 플랫폼 공고 목록 화면',
    notionUrl: 'https://jiin-seok.notion.site/albaform',
    codeSnippet: `// 로그인 상태에 따라 렌더링 시점을 나눠 비인가 접근 차단
export default withAuth(MyPage, { redirectTo: '/sign-in' })`,
  },
  {
    title: 'tappytype',
    year: 2026,
    description:
      '애플펜슬로 쓴 손글씨를 한글 폰트로 만들어 주는 iOS 앱입니다. Swift·SwiftUI·PencilKit으로 직접 만들었고, 모델을 바꿔도 앱을 고치지 않도록 앱과 서버를 REST 계약으로 분리했습니다. 지금은 출시 준비 단계이며, 직접 브랜딩해 인스타그램으로 사전 마케팅을 하고 있습니다. (React Native가 아닌 네이티브 Swift입니다.)',
    url: 'https://github.com/JiinSeok/typetap',
    imageUrl: '/images/projects/tappytype-card.png',
    alt: 'tappytype iOS 앱 소개 카드',
    codeSnippet: `// 생성 모델을 바꿔도 앱 코드는 고치지 않도록 경계를 분리
protocol HandwritingGenerator {
    func generate(style: [Glyph], targets: [Character]) async throws -> [Glyph]
}

// 서버를 호출하는 구현체만 갈아끼우면 됩니다
struct RemoteHandwritingGenerator: HandwritingGenerator { /* ... */ }`,
  },
  {
    title: '포트폴리오 사이트',
    year: 2025,
    description:
      '지금 보고 계신 이 사이트입니다. Next.js App Router와 TypeScript로 만들었고, 공통 컴포넌트와 자동화(ESLint·Prettier·Husky)로 코드 스타일을 통일해 유지보수하기 쉽게 정리했습니다.',
    url: '/site-build',
    imageUrl: '/images/projects/portfolio.png',
    alt: '포트폴리오 사이트 첫 화면',
  },
]

export default function ProjectsSection() {
  const t = useTranslations('pages.projects')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isGridView, setIsGridView] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  // 다음 프로젝트로 이동하는 함수
  const nextProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === projectsData.length - 1 ? 0 : prevIndex + 1,
    )
  }

  // 이전 프로젝트로 이동하는 함수
  const prevProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1,
    )
  }

  // 인덱스 변경 시 현재 프로젝트로 스크롤
  useEffect(() => {
    if (carouselRef.current && !isGridView) {
      const scrollPosition = currentIndex * carouselRef.current.offsetWidth
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      })
    }
  }, [currentIndex, isGridView])

  return (
    <SectionContainer id="projects" padding="py-20 px-6 md:px-8 lg:px-12">
      <SectionHeader
        title={t('meta.title')}
        subtitle={t('meta.subtitle')}
        titleClassName="text-[clamp(2rem,4vw,3rem)]"
        subtitleClassName="text-[clamp(1.125rem,2vw,1.375rem)] max-w-2xl"
      />

      {/* 보기 전환 및 탐색 컨트롤 */}
      <ContentLayout
        direction="row"
        justify="between"
        align="center"
        className="mb-8"
      >
        <nav className="flex space-x-2" aria-label={t('view-options')}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsGridView(false)}
            className={!isGridView ? 'bg-primary text-primary-foreground' : ''}
            aria-pressed={!isGridView}
          >
            <LayoutIcon className="w-4 h-4 mr-1" />
            <span>{t('view-carousel')}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsGridView(true)}
            className={isGridView ? 'bg-primary text-primary-foreground' : ''}
            aria-pressed={isGridView}
          >
            <LayoutGridIcon className="w-4 h-4 mr-1" />
            <span>{t('view-gallery')}</span>
          </Button>
        </nav>

        {!isGridView && (
          <nav className="flex space-x-2" aria-label={t('carousel-navigation')}>
            <Button
              variant="outline"
              size="icon"
              onClick={prevProject}
              aria-label={t('previous-project')}
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextProject}
              aria-label={t('next-project')}
            >
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </nav>
        )}
      </ContentLayout>

      {/* 프로젝트 표시 - 캐러셀 또는 그리드 */}
      {isGridView ? (
        <GridLayout cols={{ default: 1, md: 2, lg: 3 }} gap="gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </GridLayout>
      ) : (
        <div
          ref={carouselRef}
          className="flex overflow-x-hidden snap-x snap-mandatory"
          role="region"
          aria-label={t('projects.carousel')}
        >
          {projectsData.map((project, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 snap-center px-4"
              role="group"
              aria-roledescription="slide"
              aria-label={`${t('projects.slide')} ${index + 1} ${t('projects.of')} ${projectsData.length}`}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}

      {/* 캐러셀 인디케이터 */}
      {!isGridView && (
        <ContentLayout
          direction="row"
          justify="center"
          className="mt-8 space-x-2"
        >
          {projectsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${currentIndex === index
                  ? 'bg-primary'
                  : 'bg-gray-300 dark:bg-gray-700'
                }`}
              aria-label={`${t('projects.go-to-project')} ${index + 1}`}
            />
          ))}
        </ContentLayout>
      )}
    </SectionContainer>
  )
}

// 프로젝트 카드 컴포넌트
function ProjectCard({ project }: { project: ProjectWithMedia }) {
  const t = useTranslations('pages.projects')
  const [showCode, setShowCode] = useState(false)
  const isExternal = project.url.startsWith('http')

  return (
    <article
      role="listitem"
      aria-labelledby={`project-title-${project.title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <ContentCard title={project.title} className="h-full flex flex-col">
        <div className="flex flex-col h-full">
          <header className="flex justify-between items-start mb-4">
            <h3
              id={`project-title-${project.title.replace(/\s+/g, '-').toLowerCase()}`}
              className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold"
            >
              {project.title}
            </h3>
            <time
              dateTime={`${project.year}`}
              className="text-sm text-muted-foreground"
            >
              {project.year}
            </time>
          </header>

          {/* 프로젝트 이미지 또는 코드 스니펫 */}
          <figure className="relative mb-4 overflow-hidden rounded-md aspect-video bg-muted">
            {showCode && project.codeSnippet ? (
              <pre className="p-4 text-xs overflow-auto h-full bg-gray-900 text-gray-100 rounded-md">
                <code>{project.codeSnippet}</code>
              </pre>
            ) : (
              <Image
                src={project.imageUrl}
                alt={project.alt}
                fill
                className="object-cover"
              />
            )}
            {!showCode && (
              <figcaption className="sr-only">{project.alt}</figcaption>
            )}
          </figure>

          <p className="text-[clamp(0.875rem,1.25vw,1rem)] text-muted-foreground mb-4 flex-grow">
            {project.description}
          </p>

          <footer className="flex flex-wrap gap-2 mt-auto">
            {project.codeSnippet && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCode(!showCode)}
              >
                {showCode ? t('view-image') : t('view-code')}
              </Button>
            )}
            {isExternal ? (
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <Button variant="default" size="sm">
                  {t('view-project')}
                </Button>
              </a>
            ) : (
              <Link href={project.url}>
                <Button variant="default" size="sm">
                  {t('view-project')}
                </Button>
              </Link>
            )}
            <a
              href={project.notionUrl ?? NOTION_PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm">
                Notion에서 보기
              </Button>
            </a>
          </footer>
        </div>
      </ContentCard>
    </article>
  )
}
