'use client'

import { useEffect, useRef, useState } from 'react'
import { axisPosition, type TocItem } from '@/lib/utils/timeline'

interface TimelineTocProps {
  items: TocItem[]
  nowKey: string
}

export default function TimelineToc({ items, nowKey }: TimelineTocProps) {
  const pos = (date: string) => axisPosition(date, nowKey)

  const careerSegs = items.filter((i) => i.tier === 'career' && i.ongoing)
  const majorAi = items.filter((i) => i.tier === 'ai' && i.major)
  const minorAi = items.filter((i) => i.tier === 'ai' && !i.major)
  const featuredItems = items.filter((i) => i.tier === 'featured')
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
      <div ref={sentinelRef} className="-mt-16 h-px -mb-px md:-mt-20" />

      <nav
        aria-label="연표 목차"
        className="dark sticky top-[56px] z-30 mx-[calc(50%-50vw)] bg-background/95 backdrop-blur-sm mb-10 md:mb-12"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div
            className={
              pinned
                ? 'max-h-0 opacity-0 overflow-hidden transition-[max-height,opacity] duration-300'
                : 'max-h-40 opacity-100 overflow-hidden transition-[max-height,opacity] duration-300'
            }
          >
            <div className="pt-4 relative">
              <div className="relative h-6">
                {featuredItems.map((item) => (
                  <a
                    key={item.anchor}
                    href={`#${item.anchor}`}
                    aria-label={`${item.label} — ${item.sublabel}`}
                    style={{ left: `${pos(item.date)}%` }}
                    className="absolute bottom-0 -translate-x-1/2 text-center"
                  >
                    <span className="block text-[11px] font-semibold text-foreground/80 whitespace-nowrap">
                      {item.sublabel}
                    </span>
                    <span className="block w-px h-2 mx-auto mt-0.5 bg-muted-foreground/50" />
                  </a>
                ))}
              </div>

              <div className="relative h-5">
                {careerItems.map((item) => (
                  <a
                    key={item.anchor}
                    href={`#${item.anchor}`}
                    style={{ left: `${pos(item.date)}%` }}
                    className="group absolute bottom-0 -translate-x-1/2 text-center"
                  >
                    <span className="block text-xs font-semibold text-foreground whitespace-nowrap group-hover:text-primary group-focus-visible:text-primary">
                      {item.label}
                    </span>
                    <span className="block w-px h-2 mx-auto mt-0.5 bg-muted-foreground/50" />
                  </a>
                ))}

                <span className="absolute bottom-0 left-0 text-[10px] text-muted-foreground/60 translate-y-full pt-0.5">
                  현재
                </span>
              </div>
            </div>
          </div>

          <div className="relative h-0.5 bg-border my-0">
            {pinned && (
              <span
                className="absolute inset-y-0 left-0 bg-primary rounded-full transition-[width] duration-300"
                style={{ width: `${pos(activeDate)}%` }}
              />
            )}

            {careerSegs.map((seg) => (
              <span
                key={`seg-${seg.anchor}`}
                className="absolute -top-px left-0 h-[3px] bg-primary/40 rounded-full"
                style={{ width: `${pos(seg.date)}%` }}
              />
            ))}

            <span className="absolute top-1/2 left-0 w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 bg-primary rounded-full ring-4 ring-foreground/20" />

            {pinned && (
              <span
                className="absolute top-1/2 w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 bg-primary rounded-full ring-[3px] ring-foreground/25 transition-[left] duration-300"
                style={{ left: `${pos(activeDate)}%` }}
              />
            )}

            {careerItems.map((item) => (
              <a
                key={`dot-${item.anchor}`}
                href={`#${item.anchor}`}
                aria-label={item.label}
                style={{ left: `${pos(item.date)}%` }}
                className="absolute top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-background border-2 border-primary rounded-full"
              />
            ))}

            {items
              .filter((i) => i.tier === 'minor')
              .map((item) => (
                <a
                  key={`minor-${item.anchor}`}
                  href={`#${item.anchor}`}
                  aria-label={item.label}
                  style={{ left: `${pos(item.date)}%` }}
                  className="group absolute top-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-background border-2 border-muted-foreground/50 rounded-full"
                >
                  <span className="absolute top-3 left-1/2 hidden -translate-x-1/2 px-1.5 py-0.5 bg-background border border-border text-[10px] text-muted-foreground whitespace-nowrap rounded group-hover:block group-focus-visible:block">
                    {item.label}
                  </span>
                </a>
              ))}

            {minorAi.map((item) => (
              <a
                key={item.anchor}
                href={`#${item.anchor}`}
                aria-label={`${item.date} ${item.label}`}
                style={{ left: `${pos(item.date)}%` }}
                className="group absolute -top-[5px] w-px h-2 bg-border"
              >
                <span className="absolute top-3 left-1/2 hidden -translate-x-1/2 px-1.5 py-0.5 bg-background border border-border text-[10px] text-muted-foreground whitespace-nowrap rounded group-hover:block group-focus-visible:block">
                  {item.date} {item.label}
                </span>
              </a>
            ))}
          </div>

          <div className="relative pb-3">
            {majorAi.map((item) => (
              <span
                key={item.anchor}
                style={{ left: `${pos(item.date)}%` }}
                className={[
                  'absolute top-0',
                  item === activeMobileMajor ? 'block' : 'hidden md:block',
                ].join(' ')}
              >
                <span className="block w-px h-3 bg-muted-foreground mx-auto" />
                <span className="-translate-x-1/2 text-[10px] text-muted-foreground text-center leading-tight whitespace-nowrap block">
                  {item.label.split('·').map((part, i) => (
                    <span key={i} className="block">
                      {part}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}
