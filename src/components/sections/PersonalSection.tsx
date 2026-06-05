'use client'

import { useTranslations } from '@/lib/providers/TextContext'
import {
  AXIS_START,
  buildTimeline,
  buildTocItems,
  entryDate,
  type BeforeAfterSide,
  type CareerEntry,
  type CareerExtra,
  type ContributionGroup,
} from '@/lib/utils/timeline'
import TimelineToc from '@/components/sections/TimelineToc'
import {
  galleryItems,
  ProjectEntry,
  AutoPlayVideo,
} from '@/components/sections/ProjectEntry'
import Image from 'next/image'

const TITLE_TECH_PATTERN = /^(.*?)\s*\(([^)]+)\)$/

const FEATURED_CAREER_CARD_STYLES = `
  p-5 md:p-6
  bg-background
  border border-border
  rounded-xl
  shadow-[0_1px_3px_rgba(0,0,0,0.04),0_16px_40px_-20px_rgba(0,0,0,0.15)]
`

const COMPANY_LOGOS: Record<string, string> = {
  도스트11: '/images/logos/dost11.png',
  체인시프트: '/images/logos/chainshift.png',
  핏투게더: '/images/logos/fitogether.jpg',
  물류대장: '/images/logos/ftf.svg',
  연합뉴스: '/images/logos/yonhapnews.png',
}

function BeforeAfterSideView({
  side,
}: {
  side: BeforeAfterSide
}) {
  return (
    <figure className="flex flex-col flex-1 justify-between min-w-0">
      <a
        href={side.videoUrl ?? side.imageUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${side.alt} 크게 보기`}
        className="block cursor-zoom-in"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-md">
          {side.videoUrl ? (
            <AutoPlayVideo src={side.videoUrl} label={side.alt} />
          ) : (
            <Image
              src={side.imageUrl as string}
              alt={side.alt}
              fill
              sizes="(min-width: 1280px) 440px, (min-width: 768px) 45vw, 50vw"
              className="object-cover object-top"
            />
          )}
        </div>
      </a>
      <figcaption className="mt-1.5 text-xs text-muted-foreground text-center">
        {side.caption}
      </figcaption>
    </figure>
  )
}

function BeforeAfterRow({
  media,
}: {
  media: { before: BeforeAfterSide; after: BeforeAfterSide }
}) {
  return (
    <div className="flex items-stretch w-full gap-2 mt-4 md:gap-3">
      <BeforeAfterSideView side={media.before} />
      <span
        className="self-center shrink-0 text-muted-foreground text-xl"
        aria-hidden
      >
        →
      </span>
      <BeforeAfterSideView side={media.after} />
    </div>
  )
}

export default function PersonalSection() {
  const t = useTranslations()

  const careers = t('pages.career.careers') as unknown as CareerEntry[]
  const extras = t('pages.career.extras') as unknown as CareerExtra[]

  const timeline = buildTimeline(careers, extras, galleryItems)

  const nowKey = timeline
    .map(entryDate)
    .reduce((max, d) => (d > max ? d : max), AXIS_START)
  const tocItems = buildTocItems(timeline, nowKey)

  const firstProjectIndex = timeline.findIndex((item) => item.kind === 'project')

  return (
    <section
      id="career"
      aria-label="타임라인"
      className="w-full py-16 md:py-20 bg-secondary/10"
    >
      <div className="px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl pl-4 md:pl-0">
          <TimelineToc items={tocItems} nowKey={nowKey} />
          {timeline.map((item, index) => {
            const isLast = index === timeline.length - 1
            const date = entryDate(item)

            if (item.kind === 'milestone') {
              return (
                <div
                  key={item.anchor}
                  id={item.anchor}
                  data-toc-date={date}
                  className="flex gap-4 md:gap-6 scroll-mt-24"
                >
                  <div className="hidden md:flex md:w-40 lg:w-44 shrink-0 justify-end">
                    <span className="flex flex-col items-end text-xs text-muted-foreground text-right leading-snug">
                      <span className="tabular-nums">{item.sort}</span>
                      <span>{item.label}</span>
                    </span>
                  </div>
                  <div className="flex flex-col items-center shrink-0 w-6">
                    <div className="w-3 h-3 rounded-full border-2 border-muted-foreground/40 bg-background shrink-0 mt-1" />
                    {!isLast && <div className="flex-1 w-px bg-border" />}
                  </div>
                  <div className={`flex-1 ${isLast ? '' : 'pb-6'} md:hidden`}>
                    <span className="flex flex-col text-xs text-muted-foreground leading-snug">
                      <span className="tabular-nums">{item.sort}</span>
                      <span>{item.label}</span>
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
                <div
                  key={item.anchor}
                  id={item.anchor}
                  data-toc-date={date}
                  className="flex gap-4 md:gap-6 scroll-mt-24"
                >
                  <div className="hidden md:block md:w-40 lg:w-44 shrink-0" />
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
                <div
                  key={item.anchor}
                  id={item.anchor}
                  data-toc-date={date}
                  className="flex gap-4 md:gap-6 scroll-mt-24"
                >
                  <div className="hidden md:block md:w-40 lg:w-44 shrink-0" />
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
            const isCurrent = career.period.includes('현재')

            return (
              <div
                key={item.anchor}
                id={item.anchor}
                data-toc-date={date}
                className="flex gap-4 md:gap-6 scroll-mt-24"
              >
                <div className="hidden md:block md:w-40 lg:w-44 shrink-0" />
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
                  <div className={isCurrent ? FEATURED_CAREER_CARD_STYLES : ''}>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <span className="px-2.5 py-0.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                        경력
                      </span>
                      {isCurrent && (
                        <span className="flex items-center gap-1.5 px-2.5 py-0.5 border border-primary/25 text-primary text-xs font-semibold rounded-full">
                          <span className="relative flex w-1.5 h-1.5">
                            <span className="absolute inline-flex w-full h-full bg-primary/50 rounded-full animate-ping" />
                            <span className="relative inline-flex w-1.5 h-1.5 bg-primary rounded-full" />
                          </span>
                          재직 중
                        </span>
                      )}
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

                    <div className={isCurrent ? 'space-y-6' : 'space-y-4'}>
                      {career.contributions.map((entry, i) => {
                        const group: ContributionGroup =
                          typeof entry === 'string' ? { items: [entry] } : entry
                        const techMatch = group.title?.match(TITLE_TECH_PATTERN)
                        const groupName = techMatch?.[1] ?? group.title
                        const techStack = techMatch?.[2].split('·') ?? []
                        return (
                          <div
                            key={group.title ?? i}
                            className={
                              group.title
                                ? 'pl-4 border-l-2 border-border'
                                : ''
                            }
                          >
                            {group.title && (
                              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-2">
                                <span className="text-xs font-semibold tracking-widest tabular-nums text-muted-foreground/50">
                                  {String(i + 1).padStart(2, '0')}
                                </span>
                                <h4 className="text-sm font-semibold">
                                  {groupName}
                                </h4>
                                {techStack.map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-1.5 py-0.5 bg-secondary text-muted-foreground text-[11px] font-medium rounded"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}
                            <ul className="space-y-2">
                              {group.items.map((item) => {
                                const splitIndex = item.indexOf(' — ')
                                const label =
                                  splitIndex > 0
                                    ? item.slice(0, splitIndex)
                                    : null
                                const detail =
                                  splitIndex > 0
                                    ? item.slice(splitIndex + 3)
                                    : item
                                return (
                                  <li
                                    key={item}
                                    className="flex items-start gap-2"
                                  >
                                    <span className="shrink-0 w-1 h-1 rounded-full bg-primary/40 mt-2" />
                                    <span className="max-w-[65ch] text-sm leading-relaxed text-muted-foreground">
                                      {label && (
                                        <span className="font-medium text-foreground">
                                          {label}
                                        </span>
                                      )}
                                      {label && ' — '}
                                      {detail}
                                    </span>
                                  </li>
                                )
                              })}
                            </ul>
                            {group.beforeAfter && (
                              <BeforeAfterRow media={group.beforeAfter} />
                            )}
                            {group.imageUrl && (
                              <figure className="relative w-full mt-4 overflow-hidden rounded-md aspect-video">
                                <a
                                  href={group.imageUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`${group.alt ?? groupName} 크게 보기`}
                                  className="absolute inset-0 cursor-zoom-in"
                                >
                                  <Image
                                    src={group.imageUrl}
                                    alt={group.alt ?? groupName ?? ''}
                                    fill
                                    sizes="(min-width: 1280px) 880px, (min-width: 768px) calc(100vw - 360px), 100vw"
                                    priority={index === 0}
                                    className="object-cover"
                                  />
                                </a>
                              </figure>
                            )}
                          </div>
                        )
                      })}
                    </div>
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
