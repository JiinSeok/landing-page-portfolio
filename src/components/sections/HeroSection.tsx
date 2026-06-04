'use client'

import { useTranslations } from '@/lib/providers/TextContext'

const previewSections = [
  {
    id: 'career',
    title: '경력',
    description: '도스트11에서 풀스택으로 일하고 있습니다 · SQA 출신',
    preview: [
      '도스트11 · 풀스택 (Rails + React)',
      '체인시프트 · 프론트엔드',
      '핏투게더 · SQA',
      '물류대장 · SQA 매니저',
      '연합뉴스 · 자료조사',
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 'faq',
    title: '자주 묻는 질문',
    description: '많이들 궁금해하시는 내용을 정리했습니다',
    preview: [
      '현재 어떤 일을 하고 있나요?',
      'SQA 경험이 어떻게 도움이 되었나요?',
      '협업 스타일은 어떤가요?',
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
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
  const t = useTranslations('pages.home.sections.cta')

  return (
    <section
      id="hero"
      className="w-full bg-primary text-white py-16 md:py-20 px-6 md:px-8 lg:px-12"
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-3">
            {t('title')}
          </h1>
          <p className="text-[clamp(1.125rem,2vw,1.375rem)] text-white/80 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <nav
          className="grid grid-cols-1 sm:grid-cols-3 gap-5"
          aria-label="섹션 미리보기"
        >
          {previewSections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group flex flex-col overflow-hidden text-left rounded-xl border border-white/15 bg-white/10 transition-colors cursor-pointer hover:bg-white/15 hover:border-white/25"
              style={{
                animation: `fadeUp 0.4s ease ${index * 0.08}s both`,
              }}
            >
              <div className="px-5 pt-5 pb-3 flex items-center gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/15 text-white shrink-0">
                  {section.icon}
                </span>
                <div>
                  <h3 className="font-semibold text-base leading-tight text-white">
                    {section.title}
                  </h3>
                  <p className="text-xs text-white/60 mt-0.5">
                    {section.description}
                  </p>
                </div>
              </div>

              <div className="mx-5 border-t border-white/10" />

              <ul className="px-5 pt-3 pb-4 space-y-1.5 flex-1">
                {section.preview.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2.5 text-sm text-white/70"
                  >
                    <span className="shrink-0 w-1 h-1 rounded-full bg-white/40" />
                    <span className="truncate">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="px-5 pb-4 flex items-center gap-1 text-xs text-white/40 group-hover:text-white/80 transition-colors">
                <span>자세히 보기</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </section>
  )
}
