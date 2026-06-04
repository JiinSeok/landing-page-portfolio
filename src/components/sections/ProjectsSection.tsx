'use client'

import Image from 'next/image'
import { useState } from 'react'

import { useTranslations } from '@/lib/providers/TextContext'
import { Button } from '@/components/ui/Button/Button'
import { ContentCard } from '@/components/ui/ContentCard'
import { GridLayout } from '@/components/ui/containers/ContentLayout'
import {
  SectionContainer,
  SectionHeader,
} from '@/components/ui/containers/SectionContainer'

export interface GalleryItem {
  title: string
  period?: string
  tags: string[]
  description: string
  url?: string
  linkLabel?: string
  imageUrl?: string
  alt?: string
  codeSnippet?: string
  notionUrl?: string
}

const galleryItems: GalleryItem[] = [
  {
    title: 'formkit-react',
    period: '2025.08',
    tags: ['프로젝트', '오픈소스'],
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
    title: 'albaform',
    period: '2024.08 ~ 2025.01',
    tags: ['프로젝트', '팀'],
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
    period: '2026.05 ~ 현재',
    tags: ['프로젝트', 'iOS'],
    description:
      '애플펜슬로 쓴 손글씨를 한글 폰트로 만들어 주는 iOS 앱입니다. Swift·SwiftUI·PencilKit으로 직접 만들었고, 모델을 바꿔도 앱을 고치지 않도록 앱과 서버를 REST 계약으로 분리했습니다. 지금은 출시 준비 단계이며, 직접 브랜딩해 인스타그램으로 사전 마케팅을 하고 있습니다. (React Native가 아닌 네이티브 Swift입니다.)',
    url: 'https://www.instagram.com/tappytype/',
    linkLabel: '인스타그램 보기',
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
    period: '2025.05 ~ 현재',
    tags: ['프로젝트'],
    description:
      '지금 보고 계신 이 사이트입니다. Next.js App Router와 TypeScript로 만들었고, 공통 컴포넌트와 자동화(ESLint·Prettier·Husky)로 코드 스타일을 통일해 유지보수하기 쉽게 정리했습니다.',
    url: 'https://github.com/JiinSeok/landing-page-portfolio',
    linkLabel: '코드 저장소 보기',
    imageUrl: '/images/projects/portfolio.png',
    alt: '포트폴리오 사이트 첫 화면',
  },
  {
    title: 'bodycodi',
    period: '2025.09',
    tags: ['채용 과제'],
    description:
      '지원 회사의 서비스(2016년부터 운영된 JSP 레거시)를 직접 조사해 공존 제약을 추정·정의하고, 점진적 통합을 전제로 설계한 채용 과제입니다. tw- prefix 컨벤션 문서, 예측 가능/불가능을 구분하는 중앙 에러 처리, 50개 임계 조건부 가상화(7,000개에서도 부드러운 스크롤), 평가자가 데이터 크기와 네트워크 지연을 직접 바꿔 검증하는 테스트 제어 패널까지 담았습니다. 코드는 비공개이며 요청 주시면 공유드립니다.',
    imageUrl: '/images/projects/bodycodi.png',
    alt: 'bodycodi 채용 과제 소개 카드 (JSP 레거시 공존 설계)',
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
    title: 'Claude Code 설정 (dotfiles)',
    period: '2026.06',
    tags: ['오픈소스', 'AI 워크플로'],
    description:
      '생성형 AI(Claude Code)에 개인 코드 스타일과 작업 규칙을 규칙으로 주입해 일관되게 협업하는 설정입니다. 민감정보를 제외한 공개판입니다.',
    url: 'https://github.com/JiinSeok/dotfiles-claude-public',
  },
  {
    title: 'SEO 라이트닝 토크',
    period: '2026.01',
    tags: ['발표'],
    description: 'SEO를 주제로 발표한 라이트닝 토크 자료입니다.',
    url: 'https://www.figma.com/deck/jdocRc3a37rnNsTRm1crbD/SEO-%EC%96%B4%EB%94%94%EA%B9%8C%EC%A7%80-%ED%95%B4%EB%B4%A4%EB%8B%88?node-id=45-555&t=H46fXS3tDDZMhydQ-1',
    linkLabel: '발표 자료 보기',
  },
  {
    title: '정산 기능 설계',
    period: '2026.04',
    tags: ['설계'],
    description: '정산 기능을 설계한 과정과 결과를 정리한 자료입니다.',
    url: 'https://mellow-pika-ec5224.netlify.app',
    linkLabel: '자료 보기',
  },
  {
    title: '이벤트 협업 제안 · 포토부스 프로토타입',
    period: '2026.05',
    tags: ['프로토타입'],
    description: '이벤트 협업을 제안하며 만든 포토부스 기능 프로토타입입니다.',
    url: 'https://staging.doppket.com/proposals/mudo-run',
    linkLabel: '프로토타입 보기',
  },
]

export default function ProjectsSection() {
  const t = useTranslations('pages.projects')

  return (
    <SectionContainer id="projects" padding="py-20 px-6 md:px-8 lg:px-12">
      <SectionHeader
        title={t('meta.title')}
        subtitle={t('meta.subtitle')}
        titleClassName="text-[clamp(2rem,4vw,3rem)]"
        subtitleClassName="text-[clamp(1.125rem,2vw,1.375rem)] max-w-2xl"
      />

      <GridLayout cols={{ default: 1, md: 2, lg: 3 }} gap="gap-8">
        {galleryItems.map((item) => (
          <GalleryCard key={item.title} item={item} />
        ))}
      </GridLayout>
    </SectionContainer>
  )
}

function GalleryCard({ item }: { item: GalleryItem }) {
  const t = useTranslations('pages.projects')
  const [showCode, setShowCode] = useState(false)

  return (
    <article aria-label={item.title}>
      <ContentCard className="h-full flex flex-col">
        <div className="flex flex-col h-full">
          <header className="flex justify-between items-start mb-3">
            <h3 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold">
              {item.title}
            </h3>
            {item.period && (
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {item.period}
              </span>
            )}
          </header>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {item.imageUrl && (
            <figure className="relative mb-4 overflow-hidden rounded-md aspect-video bg-muted">
              {showCode && item.codeSnippet ? (
                <pre className="p-4 h-full bg-gray-900 text-gray-100 text-xs rounded-md overflow-auto">
                  <code>{item.codeSnippet}</code>
                </pre>
              ) : (
                <Image
                  src={item.imageUrl}
                  alt={item.alt ?? item.title}
                  fill
                  className="object-cover"
                />
              )}
            </figure>
          )}

          <p className="flex-grow mb-4 text-[clamp(0.875rem,1.25vw,1rem)] text-muted-foreground">
            {item.description}
          </p>

          <footer className="flex flex-wrap gap-2 mt-auto">
            {item.codeSnippet && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCode(!showCode)}
              >
                {showCode ? t('view-image') : t('view-code')}
              </Button>
            )}
            {item.url && (
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <Button variant="default" size="sm">
                  {item.linkLabel ?? t('view-project')}
                </Button>
              </a>
            )}
            {item.notionUrl && (
              <a
                href={item.notionUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  Notion에서 보기
                </Button>
              </a>
            )}
          </footer>
        </div>
      </ContentCard>
    </article>
  )
}
