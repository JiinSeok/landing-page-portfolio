'use client'

import { Button } from '@/components/ui/Button/Button'
import { ContentCard } from '@/components/ui/ContentCard'
import {
  SectionContainer,
  SectionHeader,
} from '@/components/ui/containers/SectionContainer'
import { GridLayout } from '@/components/ui/containers/ContentLayout'
import { ExternalLinkIcon } from 'lucide-react'

interface Material {
  title: string
  kind: string
  description: string
  url: string
}

const materials: Material[] = [
  {
    title: 'Notion 포트폴리오',
    kind: '포트폴리오',
    description: '프로젝트와 작업 과정을 더 자세히 정리한 Notion 포트폴리오입니다.',
    url: 'https://jiin-seok.notion.site/portfolio',
  },
  {
    title: 'Claude Code 설정 (dotfiles)',
    kind: '오픈소스 · AI 워크플로',
    description:
      '생성형 AI(Claude Code)에 개인 코드 스타일과 작업 규칙을 규칙으로 주입해 일관되게 협업하는 설정입니다. 민감정보를 제외한 공개판입니다.',
    url: 'https://github.com/JiinSeok/dotfiles-claude-public',
  },
  {
    title: 'SEO 라이트닝 토크',
    kind: '발표',
    description: 'SEO를 주제로 발표한 라이트닝 토크 자료입니다.',
    url: 'https://www.figma.com/deck/jdocRc3a37rnNsTRm1crbD/SEO-%EC%96%B4%EB%94%94%EA%B9%8C%EC%A7%80-%ED%95%B4%EB%B4%A4%EB%8B%88?node-id=45-555&t=H46fXS3tDDZMhydQ-1',
  },
  {
    title: '정산 기능 설계',
    kind: '설계',
    description: '정산 기능을 설계한 과정과 결과를 정리한 자료입니다.',
    url: 'https://mellow-pika-ec5224.netlify.app',
  },
  {
    title: '이벤트 협업 제안 · 포토부스 프로토타입',
    kind: '프로토타입',
    description: '이벤트 협업을 제안하며 만든 포토부스 기능 프로토타입입니다.',
    url: 'https://staging.doppket.com/proposals/mudo-run',
  },
]

export default function MaterialsSection() {
  return (
    <SectionContainer id="materials" padding="py-20 px-6 md:px-8 lg:px-12">
      <SectionHeader
        title="자료 · 발표"
        subtitle="발표 자료와 설계·프로토타입을 모았습니다."
        titleClassName="text-[clamp(2rem,4vw,3rem)]"
        subtitleClassName="text-[clamp(1.125rem,2vw,1.375rem)] max-w-2xl"
      />
      <GridLayout cols={{ default: 1, md: 2 }} gap="gap-6">
        {materials.map((m) => (
          <ContentCard
            key={m.url}
            title={m.title}
            className="h-full"
            footer={
              <a href={m.url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  바로가기
                  <ExternalLinkIcon className="w-4 h-4 ml-1" />
                </Button>
              </a>
            }
          >
            <span className="inline-block text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1">
              {m.kind}
            </span>
            <p className="text-sm text-muted-foreground">{m.description}</p>
          </ContentCard>
        ))}
      </GridLayout>
    </SectionContainer>
  )
}
