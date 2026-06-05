'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { useTranslations } from '@/lib/providers/TextContext'
import { Button } from '@/components/ui/Button/Button'

export type DeviceKind = 'phone' | 'tablet' | 'laptop'

export interface GalleryScreen {
  videoUrl?: string
  imageUrl?: string
  alt?: string
  caption?: string
}

export interface GalleryItem {
  title: string
  period?: string
  tags: string[]
  lead?: string
  description: string
  url?: string
  linkLabel?: string
  imageUrl?: string
  alt?: string
  codeSnippet?: string
  notionUrl?: string
  embedUrl?: string
  device?: DeviceKind
  videoUrl?: string
  screens?: GalleryScreen[]
  featured?: { sublabel: string }
}

export const galleryItems: GalleryItem[] = [
  {
    title: 'formkit-react',
    period: '2025.08',
    tags: ['프로젝트', '오픈소스'],
    lead: '직접 만들어 npm에 배포한 React 폼 라이브러리입니다.',
    description:
      '코드잇 스프린트에서 albaform 등을 만들며 얻은 폼 구현 배움을 채용 과제를 하며 패턴으로 다듬었고, 그 결과를 라이브러리로 발전시켰습니다. Compound Component 패턴으로 조합 가능한 API를 만들고, Zod 검증과 접근성(ARIA), TypeScript 타입을 한 패키지로 정리했습니다. Vite로 빌드하고 GitHub Actions로 검증한 뒤 배포했습니다.',
    url: 'https://www.npmjs.com/package/@jiin.seok/formkit-react',
    imageUrl: '/images/projects/formkit-react.png',
    alt: 'formkit-react 폼 라이브러리 예제 화면',
    device: 'laptop',
    videoUrl: '/videos/projects/formkit-react.webm',
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
    lead: '여러 명이 함께 만든 알바 구인구직 플랫폼입니다.',
    description:
      '검색 노출을 위한 SSR과 인터랙션을 위한 CSR을 나누고, 사용자 상태 6종에 따라 권한과 렌더링을 분기해 비인가 접근을 막았습니다. 공통 컴포넌트로 화면을 통일하고 낙관적 업데이트로 반응 속도를 높였습니다.',
    url: 'https://albaform.usejiin.link',
    imageUrl: '/images/projects/albaform.png',
    alt: 'albaform 구인구직 플랫폼 공고 목록 화면',
    notionUrl: 'https://jiin-seok.notion.site/albaform',
    device: 'phone',
    screens: [
      {
        videoUrl: '/videos/projects/albaform-applicant.webm',
        alt: 'albaform 지원자 여정 — 비로그인 차단 후 지원자 로그인, 마이페이지 화면',
        caption: '지원자로 로그인 → 마이페이지',
      },
      {
        videoUrl: '/videos/projects/albaform-owner.webm',
        alt: 'albaform 사장님 여정 — 내 알바폼의 비공개·모집 종료 상태별 화면',
        caption: '사장님으로 로그인 → 알바폼 상태 관리',
      },
    ],
    codeSnippet: `// 로그인 상태에 따라 렌더링 시점을 나눠 비인가 접근 차단
export default withAuth(MyPage, { redirectTo: '/sign-in' })`,
  },
  {
    title: 'TappyType',
    period: '2026.05 ~ 현재',
    tags: ['프로젝트', 'iOS'],
    lead: '애플펜슬로 쓴 손글씨를 한글 폰트로 만들어 주는 iOS 앱입니다.',
    description:
      'Swift·SwiftUI·PencilKit으로 직접 만들었고, 모델을 바꿔도 앱을 고치지 않도록 앱과 서버를 REST 계약으로 분리했습니다. 지금은 출시 준비 단계이며, 직접 브랜딩해 인스타그램으로 사전 마케팅을 하고 있습니다.',
    url: 'https://www.instagram.com/tappytype/',
    linkLabel: '인스타그램 보기',
    imageUrl: '/images/projects/tappytype-card.png',
    alt: 'TappyType iOS 앱 소개 카드',
    device: 'tablet',
    featured: { sublabel: 'iOS · 진행 중' },
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
    lead: '지금 보고 계신 이 사이트입니다.',
    description:
      '경력·프로젝트·교육을 생성형 AI 연표와 나란히 보여주는 타임라인형 디자인이고, 마우스를 따라다니는 포차코 커서 컴패니언이 숨어 있습니다. Next.js App Router와 TypeScript로 만들었고, 공통 컴포넌트와 자동화(ESLint·Prettier·Husky)로 코드 스타일을 통일했습니다.',
    url: 'https://github.com/JiinSeok/landing-page-portfolio',
    linkLabel: '코드 저장소 보기',
    imageUrl: '/images/projects/portfolio.png',
    alt: '포트폴리오 사이트 첫 화면',
    device: 'laptop',
    videoUrl: '/videos/projects/portfolio.webm',
  },
  {
    title: 'bodycodi',
    period: '2025.09',
    tags: ['채용 과제'],
    lead: '지원 회사의 JSP 레거시를 직접 조사해 공존 제약을 추정·정의하고, 점진적 통합을 전제로 설계한 채용 과제입니다.',
    description:
      'tw- prefix 컨벤션 문서, 예측 가능/불가능을 구분하는 중앙 에러 처리, 50개 임계 조건부 가상화(7,000개에서도 부드러운 스크롤), 평가자가 데이터 크기와 네트워크 지연을 직접 바꿔 검증하는 테스트 제어 패널까지 담았습니다. 코드는 비공개이며 요청 주시면 공유드립니다.',
    imageUrl: '/images/projects/bodycodi.png',
    alt: 'bodycodi 채용 과제 소개 카드 (JSP 레거시 공존 설계)',
    device: 'laptop',
    videoUrl: '/videos/projects/bodycodi.webm',
    featured: { sublabel: '레거시 공존 설계' },
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
    lead: '코드 리뷰에서 반복 지적되던 컨벤션을 AI가 작성 시점부터 지키게 만든 설정입니다.',
    description:
      'React 30개·Python 13개 규칙을 스킬로 정리해 Claude Code에 주입했고, 어떤 프로젝트에서든 첫 커밋부터 같은 스타일이 나옵니다. 민감정보를 제외한 공개판입니다.',
    url: 'https://github.com/JiinSeok/dotfiles-claude-public',
    codeSnippet: `# skills/seokjiin-react-style/rules — 30개 중 발췌

## component-variant-dict
변형 스타일은 딕셔너리로 관리한다 — 삼항 중첩 금지

const variantStyles = {
  primary: 'bg-brand-500 text-white hover:bg-brand-600',
  outline: 'border-2 border-brand-500 text-brand-500',
}

## format-comments
주석은 "what"이 아니라 "why"

// Notion 임시 URL이 1시간 후 만료되어
// 빌드 시점에 다운로드가 필요
const imageUrl = await downloadNotionImage(block.image.url)`,
  },
  {
    title: 'SEO 라이트닝 토크',
    period: '2026.01',
    tags: ['발표'],
    description: 'SEO를 주제로 발표한 라이트닝 토크 자료입니다.',
    url: 'https://www.figma.com/deck/jdocRc3a37rnNsTRm1crbD/SEO-%EC%96%B4%EB%94%94%EA%B9%8C%EC%A7%80-%ED%95%B4%EB%B4%A4%EB%8B%88?node-id=45-555&t=H46fXS3tDDZMhydQ-1',
    linkLabel: '발표 자료 보기',
    imageUrl: '/images/projects/seo-talk.png',
    alt: 'SEO 라이트닝 토크 발표 자료 표지',
    embedUrl:
      'https://embed.figma.com/deck/jdocRc3a37rnNsTRm1crbD/?embed-host=share',
  },
  {
    title: '서비스직으로서의 개발자 라이트닝 토크',
    period: '2025.11',
    tags: ['발표'],
    description:
      "도스트11 데브 미팅에서 '서비스직으로서의 개발자: 알잘딱깔센 개발을 위한 CX 101'을 주제로 발표한 라이트닝 토크 자료입니다.",
    url: 'https://www.figma.com/deck/94YP5c4rzlblr5exuS1ZKR/%EC%84%9C%EB%B9%84%EC%8A%A4%EC%A7%81%EC%9C%BC%EB%A1%9C%EC%84%9C%EC%9D%98-%EA%B0%9C%EB%B0%9C%EC%9E%90--%EB%B3%B5%EC%82%AC-?node-id=1-101&t=oEqxpmYisTFTWX0r-1',
    linkLabel: '발표 자료 보기',
    imageUrl: '/images/projects/cx-talk.png',
    alt: "'서비스직으로서의 개발자' 라이트닝 토크 발표 자료 표지",
    embedUrl:
      'https://embed.figma.com/deck/94YP5c4rzlblr5exuS1ZKR/?embed-host=share',
  },
  {
    title: '정산 기능 설계',
    period: '2026.04',
    tags: ['설계'],
    lead: '외산 결제 엔진 위에 한국형 월간 정산을 설계하고 팀에 핸드오프한 기록입니다.',
    description:
      '월간 마감·스냅샷, 상태 머신과 잠금, 멱등성, 민감정보 경계 같은 설계 결정과 직접 구현한 정산 UI·가격 스냅샷을 인사이트, 예시 코드, 개념도로 정리했습니다. 회사 내부 정보는 일반화했습니다.',
    url: '/settlement-design',
    linkLabel: '케이스 스터디 보기',
    imageUrl: '/images/projects/settlement-design.png',
    alt: '정산 기능 설계 케이스 스터디 페이지',
    device: 'laptop',
    videoUrl: '/videos/projects/settlement-design.webm',
  },
  {
    title: '이벤트 협업 제안 · 포토부스 프로토타입',
    period: '2026.05',
    tags: ['프로토타입'],
    description: '이벤트 협업을 제안하며 만든 포토부스 기능 프로토타입입니다.',
    url: 'https://staging.doppket.com/proposals/mudo-run',
    linkLabel: '프로토타입 보기',
    imageUrl: '/images/projects/photobooth.png',
    alt: '포토부스 데모 — 무한도전 RUN 프레임으로 4컷 촬영 후 합성',
    device: 'phone',
    videoUrl: '/videos/projects/photobooth.webm',
  },
]

export function AutoPlayVideo({ src, label }: { src: string; label?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { rootMargin: '120px' },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
      src={src}
      aria-label={label}
      muted
      loop
      playsInline
      preload="auto"
      className="absolute inset-0 w-full h-full object-cover"
    />
  )
}

function ScreenMedia({
  screen,
  title,
  sizes,
  priority = false,
}: {
  screen: GalleryScreen
  title: string
  sizes: string
  priority?: boolean
}) {
  if (screen.videoUrl) {
    return <AutoPlayVideo src={screen.videoUrl} label={screen.alt ?? title} />
  }
  if (screen.imageUrl) {
    return (
      <Image
        src={screen.imageUrl}
        alt={screen.alt ?? title}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    )
  }
  return null
}

const APPLE_BEZELS = {
  phone: {
    src: '/images/device/iphone-17-black.png',
    aspectRatio: '1350 / 2760',
    screenInset: '2.54% 5.33%',
    sizes: '(min-width: 768px) 190px, 45vw',
  },
  tablet: {
    src: '/images/device/ipad-pro-11-black-landscape.png',
    aspectRatio: '2640 / 1880',
    screenInset: '5.64% 4.17%',
    sizes: '(min-width: 1024px) 384px, (min-width: 768px) 320px, 100vw',
  },
  laptop: {
    src: '/images/device/macbook-air-m5-silver.png',
    aspectRatio: '3400 / 2240',
    screenInset: '12.86% 12.35%',
    sizes: '(min-width: 1024px) 384px, (min-width: 768px) 320px, 100vw',
  },
}

function DeviceFrame({
  kind,
  screen,
  title,
  priority = false,
}: {
  kind: DeviceKind
  screen: GalleryScreen
  title: string
  priority?: boolean
}) {
  const bezel = APPLE_BEZELS[kind]
  return (
    <div className="relative w-full" style={{ aspectRatio: bezel.aspectRatio }}>
      <div
        className="absolute overflow-hidden bg-muted"
        style={{ inset: bezel.screenInset }}
      >
        <a
          href={screen.videoUrl ?? screen.imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${screen.alt ?? title} 크게 보기`}
          className="absolute inset-0 cursor-zoom-in"
        >
          <ScreenMedia
            screen={screen}
            title={title}
            sizes={bezel.sizes}
            priority={priority}
          />
        </a>
      </div>
      <Image
        src={bezel.src}
        alt=""
        fill
        sizes={bezel.sizes}
        priority={priority}
        className="pointer-events-none select-none"
      />
    </div>
  )
}

function DeviceMockup({
  item,
  priority = false,
}: {
  item: GalleryItem
  priority?: boolean
}) {
  const fallbackScreen: GalleryScreen = {
    videoUrl: item.videoUrl,
    imageUrl: item.imageUrl,
    alt: item.alt,
  }
  const screens = item.screens ?? [fallbackScreen]

  if (item.device === 'phone') {
    return (
      <div className="flex justify-center gap-3">
        {screens.map((screen) => (
          <div
            key={screen.videoUrl ?? screen.imageUrl}
            className="flex-1 max-w-[190px]"
          >
            {screen.caption && (
              <p className="mb-2 text-center text-xs text-muted-foreground">
                {screen.caption}
              </p>
            )}
            <DeviceFrame
              kind="phone"
              screen={screen}
              title={item.title}
              priority={priority}
            />
          </div>
        ))}
      </div>
    )
  }
  return (
    <DeviceFrame
      kind={item.device ?? 'laptop'}
      screen={screens[0]}
      title={item.title}
      priority={priority}
    />
  )
}

export function ProjectEntry({
  item,
  priority = false,
}: {
  item: GalleryItem
  priority?: boolean
}) {
  const t = useTranslations('pages.projects')
  const [showCode, setShowCode] = useState(false)

  return (
    <article
      aria-label={item.title}
      className="flex-1 flex flex-col md:flex-row gap-4 md:gap-8 min-w-0"
    >
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
          <h3 className="font-semibold text-lg">{item.title}</h3>
          {item.period && (
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {item.period}
            </span>
          )}
        </div>

        {item.lead && (
          <p className="mb-1.5 max-w-[65ch] text-sm font-medium text-foreground">
            {item.lead}
          </p>
        )}
        <p className="mb-4 max-w-[65ch] text-sm text-muted-foreground">
          {item.description}
        </p>

        <footer className="flex flex-wrap gap-2">
          {item.codeSnippet && item.imageUrl && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCode(!showCode)}
            >
              {showCode ? t('view-image') : t('view-code')}
            </Button>
          )}
          {item.url &&
            (item.url.startsWith('/') ? (
              <Link href={item.url}>
                <Button variant="default" size="sm">
                  {item.linkLabel ?? t('view-project')}
                </Button>
              </Link>
            ) : (
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <Button variant="default" size="sm">
                  {item.linkLabel ?? t('view-project')}
                </Button>
              </a>
            ))}
          {item.notionUrl && (
            <a href={item.notionUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                Notion에서 보기
              </Button>
            </a>
          )}
        </footer>
      </div>

      {item.embedUrl && (
        <figure className="relative md:w-80 lg:w-96 shrink-0 self-start w-full overflow-hidden rounded-md aspect-video bg-muted">
          <iframe
            src={item.embedUrl}
            title={item.title}
            loading="lazy"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </figure>
      )}

      {!item.embedUrl && (item.device || item.imageUrl || item.codeSnippet) && (
        <figure className="md:w-80 lg:w-96 shrink-0 self-start w-full">
          {(showCode || (!item.device && !item.imageUrl)) && item.codeSnippet ? (
            <pre className="p-4 aspect-video bg-gray-900 text-gray-100 text-xs rounded-md overflow-auto">
              <code>{item.codeSnippet}</code>
            </pre>
          ) : item.device ? (
            <DeviceMockup item={item} priority={priority} />
          ) : (
            <div className="relative aspect-video overflow-hidden rounded-md bg-muted">
              <a
                href={item.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.alt ?? item.title} 크게 보기`}
                className="absolute inset-0 cursor-zoom-in"
              >
                <Image
                  src={item.imageUrl as string}
                  alt={item.alt ?? item.title}
                  fill
                  sizes="(min-width: 1024px) 384px, (min-width: 768px) 320px, 100vw"
                  priority={priority}
                  className="object-cover"
                />
              </a>
            </div>
          )}
        </figure>
      )}
    </article>
  )
}
