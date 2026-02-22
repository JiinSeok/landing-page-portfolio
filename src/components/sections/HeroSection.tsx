'use client'

import { SectionContainer } from '@/components/ui/containers/SectionContainer'
import Image from 'next/image'

// Section preview data — intro content is woven into card descriptions
const previewSections = [
  {
    id: 'career',
    title: '경력',
    description: '도스트11에서 풀스택 개발 중 · SQA 출신',
    preview: [
      '도스트11 · 풀스택 (Rails + React)',
      '체인시프트 · 프론트엔드',
      '핏투게더 · SQA',
      '물류대장 · SQA 매니저',
      '연합뉴스 · 자료조사',
    ],
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
    description: 'Rails + React + TypeScript 환경',
    preview: [
      'React · TypeScript · Next.js',
      'Ruby on Rails · PostgreSQL',
      'Tailwind CSS · Git · Docker',
    ],
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
    preview: [
      '현재 어떤 일을 하고 있나요?',
      'SQA 경험이 어떻게 도움이 되나요?',
      '협업 스타일은 어떤가요?',
    ],
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

export default function HeroSection() {
  return (
    <SectionContainer
      id="hero"
      background="bg-gradient-to-b from-background to-secondary/20"
      padding="py-16 md:py-20 px-6 md:px-8 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Profile + greeting */}
        <div className="flex items-center gap-4 mb-8">
          <Image
            src="/profile.jpg"
            alt="석지인"
            width={56}
            height={56}
            className="rounded-full object-cover w-14 h-14"
          />
          <div>
            <p className="text-base font-medium">안녕하세요, 석지인입니다.</p>
            <p className="text-sm text-muted-foreground">궁금한 항목부터 눌러보세요.</p>
          </div>
        </div>

        {/* Section preview nav cards — 3 columns */}
        <nav className="grid grid-cols-1 sm:grid-cols-3 gap-4" aria-label="섹션 미리보기">
          {previewSections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group text-left p-5 rounded-lg border border-border/50 bg-card hover:border-primary/30 hover:shadow-md transition-all cursor-pointer flex flex-col items-start"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-primary">{section.icon}</span>
                <h3 className="font-semibold text-sm">{section.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-2.5">{section.description}</p>
              <ul className="space-y-1">
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
    </SectionContainer>
  )
}
