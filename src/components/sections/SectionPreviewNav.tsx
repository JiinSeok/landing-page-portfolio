'use client'

const sections = [
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

export default function SectionPreviewNav() {
  return (
    <nav className="w-full py-8 px-6 md:px-8 lg:px-12" aria-label="섹션 미리보기">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {sections.map((section) => (
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
        </div>
      </div>
    </nav>
  )
}
