'use client'

import { useEffect, useRef, useState } from 'react'
import { axisPosition, type TocItem } from '@/lib/utils/timeline'

interface TimelineTocProps {
  items: TocItem[]
  nowKey: string
}

function edgeAlign(p: number): string {
  if (p < 4) return 'translate-x-0 text-left'
  if (p > 96) return '-translate-x-full text-right'
  return '-translate-x-1/2 text-center'
}

export default function TimelineToc({ items, nowKey }: TimelineTocProps) {
  const pos = (date: string) => axisPosition(date, nowKey)

  const careerSegs = items.filter((i) => i.tier === 'career' && i.ongoing)
  const majorAi = items.filter((i) => i.tier === 'ai' && i.major)
  const minorAi = items.filter((i) => i.tier === 'ai' && !i.major)
  const careerItems = items.filter((i) => i.tier === 'career')

  const [activeDate, setActiveDate] = useState(nowKey)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [pinned, setPinned] = useState(false)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setPinned(!entry.isIntersecting),
      { rootMargin: '-57px 0px 0px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('toc-pinned', pinned)
    return () => document.documentElement.classList.remove('toc-pinned')
  }, [pinned])

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('[data-toc-date]'),
    )
    if (els.length === 0) return
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting)
        if (hit?.target instanceof HTMLElement && hit.target.dataset.tocDate) {
          setActiveDate(hit.target.dataset.tocDate)
        }
      },
      { rootMargin: '-56px 0px -75% 0px' },
    )
    els.forEach((node) => io.observe(node))
    return () => io.disconnect()
  }, [])

  const activeMobileMajor = (() => {
    const passed = majorAi.filter((m) => m.date <= activeDate)
    if (passed.length > 0) {
      return passed.reduce((min, m) => (m.date < min.date ? m : min), passed[0])
    }
    return majorAi.reduce((latest, m) => (m.date > latest.date ? m : latest), majorAi[0])
  })()

  return (
    <>
      <div ref={sentinelRef} className="h-px" />

      <nav
        aria-label="연표 목차"
        className={`sticky z-30 mx-[calc(50%-50vw)] bg-background border-b border-border mb-10 transition-[top] duration-300 md:mb-12 ${
          pinned ? 'top-[56px] md:top-0' : 'top-[56px]'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-5 md:px-8">
          <div
            className={
              pinned
                ? 'relative h-9 max-h-0 opacity-0 overflow-hidden transition-[max-height,opacity] duration-300 md:max-h-9 md:opacity-100 md:overflow-x-visible md:overflow-y-clip'
                : 'relative h-9 max-h-9 opacity-100 overflow-x-visible overflow-y-clip transition-[max-height,opacity] duration-300'
            }
          >
            {careerItems.map((item) => {
              const p = pos(item.date)
              return (
                <a
                  key={item.anchor}
                  href={`#${item.anchor}`}
                  aria-label={
                    item.sublabel
                      ? `${item.label} — ${item.sublabel}`
                      : item.label
                  }
                  style={{ left: `${p}%` }}
                  className={`group absolute bottom-0 ${edgeAlign(p)}`}
                >
                  <span className="block text-xs font-semibold text-foreground whitespace-nowrap group-hover:text-primary group-focus-visible:text-primary">
                    {item.label}
                  </span>
                  <span
                    className={`block w-px h-2 mt-0.5 bg-border ${
                      p < 4 ? 'ml-0' : p > 96 ? 'ml-auto mr-0' : 'mx-auto'
                    }`}
                  />
                </a>
              )
            })}

            <span className="absolute bottom-0 left-0 text-[10px] text-muted-foreground">
              현재
            </span>
          </div>

          <div className="relative h-0.5 bg-border">
            {pinned && (
              <span
                className="absolute inset-y-0 left-0 bg-primary rounded-full transition-[width] duration-300"
                style={{ width: `${pos(activeDate)}%` }}
              />
            )}

            {careerSegs.map((seg) => (
              <span
                key={`seg-${seg.anchor}`}
                className="absolute inset-y-0 left-0 bg-primary/40 rounded-full"
                style={{ width: `${pos(seg.date)}%` }}
              />
            ))}
          </div>

          <div className="relative h-10">
            {minorAi.map((item) => (
              <a
                key={item.anchor}
                href={`#${item.anchor}`}
                aria-label={`${item.date} ${item.label}`}
                style={{ left: `${pos(item.date)}%` }}
                className="group absolute top-0 w-px h-2 bg-border"
              >
                <span className="absolute top-3 left-1/2 hidden -translate-x-1/2 px-1.5 py-0.5 bg-background border border-border text-[10px] text-muted-foreground whitespace-nowrap rounded group-hover:block group-focus-visible:block">
                  {item.date} {item.label}
                </span>
              </a>
            ))}

            {majorAi.map((item) => {
              const p = pos(item.date)
              return (
                <span
                  key={item.anchor}
                  style={{ left: `${p}%` }}
                  className={[
                    'absolute top-0',
                    edgeAlign(p),
                    item === activeMobileMajor ? 'block' : 'hidden md:block',
                  ].join(' ')}
                >
                  <span
                    className={`block w-px h-3 bg-muted-foreground ${
                      p < 4 ? 'ml-0' : p > 96 ? 'ml-auto mr-0' : 'mx-auto'
                    }`}
                  />
                  <span className="block text-[10px] text-muted-foreground leading-tight whitespace-nowrap">
                    {item.label.split('·').map((part, i) => (
                      <span key={i} className="block">
                        {part}
                      </span>
                    ))}
                  </span>
                </span>
              )
            })}
          </div>
        </div>
      </nav>
    </>
  )
}
