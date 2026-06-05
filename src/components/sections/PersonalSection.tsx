'use client'

import { useTranslations } from '@/lib/providers/TextContext'
import styles from '@/lib/utils/styles'
import {
  galleryItems,
  GalleryItem,
  ProjectEntry,
} from '@/components/sections/ProjectEntry'
import Image from 'next/image'

type ContributionGroup = {
  title?: string
  items: string[]
}

type CareerEntry = {
  company: string
  description?: string
  url?: string
  period: string
  role: string
  contributions: (string | ContributionGroup)[]
}

type CareerExtra = {
  tag: string
  label: string
  period: string
  sort: string
}

type TimelineItem =
  | { kind: 'career'; sort: string; career: CareerEntry }
  | { kind: 'milestone'; sort: string; label: string }
  | { kind: 'extra'; sort: string; extra: CareerExtra }
  | { kind: 'project'; sort: string; project: GalleryItem }

const COMPANY_LOGOS: Record<string, string> = {
  도스트11: '/images/logos/dost11.png',
  체인시프트: '/images/logos/chainshift.png',
  핏투게더: '/images/logos/fitogether.jpg',
  물류대장: '/images/logos/ftf.svg',
  연합뉴스: '/images/logos/yonhapnews.png',
}

const LLM_MILESTONES = [
  { sort: '2026.05', label: '3사 플래그십 동시 교체' },
  { sort: '2025.11', label: 'Gemini 3·Claude Opus 4.5 출시' },
  { sort: '2025.08', label: 'GPT-5·나노 바나나 출시' },
  { sort: '2025.05', label: 'Claude 4·Claude Code 정식 출시' },
  { sort: '2025.02', label: 'Claude Code 공개·에이전틱 코딩' },
  { sort: '2024.06', label: 'Claude 3.5·AI 코딩 실용화' },
  { sort: '2023.03', label: 'GPT-4 출시·Cursor 등장' },
  { sort: '2022.11', label: 'ChatGPT 출시·LLM 대중화' },
  { sort: '2022.06', label: 'GitHub Copilot 정식 출시' },
]

export default function PersonalSection() {
  const t = useTranslations()

  const careers = t('pages.career.careers') as unknown as CareerEntry[]
  const extras = t('pages.career.extras') as unknown as CareerExtra[]

  const timeline: TimelineItem[] = [
    ...careers.map((career) => ({
      kind: 'career' as const,
      sort: career.period.slice(0, 7),
      career,
    })),
    ...extras.map((extra) => ({
      kind: 'extra' as const,
      sort: extra.sort,
      extra,
    })),
    ...galleryItems
      .filter((g) => g.period)
      .map((g) => ({
        kind: 'project' as const,
        sort: (g.period as string).slice(0, 7),
        project: g,
      })),
    ...LLM_MILESTONES.map((m) => ({ kind: 'milestone' as const, ...m })),
  ].sort((a, b) => b.sort.localeCompare(a.sort))

  const firstProjectIndex = timeline.findIndex((item) => item.kind === 'project')

  return (
    <section
      id="career"
      aria-label="타임라인"
      className="w-full py-16 md:py-20 bg-secondary/10"
    >
      <div className="px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto pl-4 md:pl-0">
          <div className="flex gap-4 md:gap-6 mb-8 md:mb-10">
            <div className="hidden md:flex md:w-56 lg:w-72 shrink-0 justify-end items-end">
              <span className="flex items-center gap-2 text-xs font-semibold text-muted-foreground tracking-wide">
                <span className="w-3 h-3 rounded-full border-2 border-muted-foreground/40 bg-background" />
                생성형 AI 주요 출시
              </span>
            </div>
            <div className="w-6 shrink-0" />
            <div className="flex-1 flex flex-wrap gap-x-5 gap-y-1.5">
              <span className="flex items-center gap-2 text-xs font-semibold text-primary tracking-wide">
                <span className="w-3 h-3 rounded-full bg-primary" />
                경력
              </span>
              <span className="flex items-center gap-2 text-xs font-semibold text-primary/70 tracking-wide">
                <span className="w-3 h-3 rounded-full bg-primary/50" />
                프로젝트 · 교육 · 자격
              </span>
              <span className="flex md:hidden items-center gap-2 text-xs font-semibold text-muted-foreground tracking-wide">
                <span className="w-3 h-3 rounded-full border-2 border-muted-foreground/40 bg-background" />
                생성형 AI 주요 출시
              </span>
            </div>
          </div>
          {timeline.map((item, index) => {
            const isLast = index === timeline.length - 1

            if (item.kind === 'milestone') {
              return (
                <div key={`m-${item.sort}`} className="flex gap-4 md:gap-6">
                  <div className="hidden md:flex md:w-56 lg:w-72 shrink-0 justify-end">
                    <span className="text-xs text-muted-foreground text-right leading-snug lg:whitespace-nowrap">
                      {item.sort} · {item.label}
                    </span>
                  </div>
                  <div className="flex flex-col items-center shrink-0 w-6">
                    <div className="w-3 h-3 rounded-full border-2 border-muted-foreground/40 bg-background shrink-0 mt-1" />
                    {!isLast && <div className="flex-1 w-px bg-border" />}
                  </div>
                  <div className={`flex-1 ${isLast ? '' : 'pb-6'} md:hidden`}>
                    <span className="text-xs text-muted-foreground">
                      {item.sort} · {item.label}
                    </span>
                  </div>
                  <div
                    className={`hidden md:block flex-1 ${isLast ? '' : 'pb-6'}`}
                  />
                </div>
              )
            }

            if (item.kind === 'extra') {
              const { extra } = item
              return (
                <div key={extra.label} className="flex gap-4 md:gap-6">
                  <div className="hidden md:block md:w-56 lg:w-72 shrink-0" />
                  <div className="flex flex-col items-center shrink-0 w-6">
                    <div
                      className={`w-px h-[34px] shrink-0 ${index === 0 ? '' : 'bg-border'}`}
                    />
                    <div className="w-3 h-3 rounded-full bg-primary/50 shrink-0" />
                    {!isLast && <div className="flex-1 w-px bg-border" />}
                  </div>
                  <div
                    className={`flex-1 min-w-0 ${isLast ? '' : 'pb-8 md:pb-10'}`}
                  >
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                        {extra.tag}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-medium">{extra.label}</h3>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {extra.period}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }

            if (item.kind === 'project') {
              return (
                <div key={item.project.title} className="flex gap-4 md:gap-6">
                  <div className="hidden md:block md:w-56 lg:w-72 shrink-0" />
                  <div className="flex flex-col items-center shrink-0 w-6">
                    <div
                      className={`w-px h-[34px] shrink-0 ${index === 0 ? '' : 'bg-border'}`}
                    />
                    <div className="w-3 h-3 rounded-full bg-primary/50 shrink-0" />
                    {!isLast && <div className="flex-1 w-px bg-border" />}
                  </div>
                  <div
                    className={`flex-1 min-w-0 ${isLast ? '' : 'pb-10 md:pb-12'}`}
                  >
                    <ProjectEntry
                      item={item.project}
                      priority={index === firstProjectIndex}
                    />
                  </div>
                </div>
              )
            }

            const { career } = item
            const logo = COMPANY_LOGOS[career.company]

            return (
              <div key={career.company} className="flex gap-4 md:gap-6">
                <div className="hidden md:block md:w-56 lg:w-72 shrink-0" />
                <div className="flex flex-col items-center shrink-0 w-6">
                  <div
                    className={`w-px h-[34px] shrink-0 ${index === 0 ? '' : 'bg-border'}`}
                  />
                  <div className="w-3 h-3 rounded-full bg-primary shrink-0" />
                  {!isLast && <div className="flex-1 w-px bg-border" />}
                </div>

                <div
                  className={`flex-1 min-w-0 ${isLast ? '' : 'pb-10 md:pb-12'}`}
                >
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="px-2.5 py-0.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                      경력
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1.5">
                    {logo && (
                      <span className="shrink-0 w-7 h-7 relative rounded overflow-hidden bg-white inline-flex items-center justify-center">
                        <Image
                          src={logo}
                          alt={career.company}
                          width={28}
                          height={28}
                          className="w-7 h-7 object-contain"
                        />
                      </span>
                    )}
                    <h3 className="font-semibold text-lg">
                      {career.url ? (
                        <a
                          href={career.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          {career.company}
                        </a>
                      ) : (
                        career.company
                      )}
                    </h3>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {career.period}
                    </span>
                  </div>

                  <p className="mb-3 text-sm text-muted-foreground">
                    {career.description && <>{career.description} · </>}
                    <span className="font-medium text-primary">
                      {career.role}
                    </span>
                  </p>

                  <div className="space-y-4">
                    {career.contributions.map((entry, i) => {
                      const group: ContributionGroup =
                        typeof entry === 'string' ? { items: [entry] } : entry
                      return (
                        <div key={group.title ?? i}>
                          {group.title && (
                            <h4 className="mb-1.5 text-sm font-semibold">
                              {group.title}
                            </h4>
                          )}
                          <ul className="space-y-2">
                            {group.items.map((item) => (
                              <li key={item} className="flex items-start gap-2">
                                <span className="shrink-0 w-1 h-1 rounded-full bg-primary/40 mt-2" />
                                <span className={styles.text.body('small')}>
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
