'use client'

import { useEffect, useState } from 'react'
import { axisPosition, type TocItem } from '@/lib/utils/timeline'

interface TimelineTocProps {
  items: TocItem[]
  nowKey: string
}

export default function TimelineToc({ items, nowKey }: TimelineTocProps) {
  const pos = (date: string) => axisPosition(date, nowKey)
  const careerSegs = items.filter((i) => i.tier === 'career' && i.ongoing)

  const [activeDate, setActiveDate] = useState(nowKey)

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

  return (
    <>
      <nav
        aria-label="연표 목차"
        className="dark relative -mt-16 mx-[calc(50%-50vw)] bg-background md:-mt-20"
      >
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-12 md:px-8">
          <div className="relative h-0.5 bg-border">
            <span className="absolute left-0 top-4 text-[10px] text-muted-foreground/60">
              현재
            </span>

            {careerSegs.map((seg) => (
              <span
                key={`seg-${seg.anchor}`}
                className="absolute -top-0.5 left-0 h-1.5 bg-primary rounded-full"
                style={{ width: `${pos(seg.date)}%` }}
              />
            ))}

            <span className="absolute top-1/2 left-0 w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 bg-primary rounded-full ring-4 ring-foreground/20" />

            {items.map((item) => {
              const left = `${pos(item.date)}%`

              if (item.tier === 'ai') {
                return item.major ? (
                  <span key={item.anchor} style={{ left }} className="absolute">
                    <span className="absolute -top-[78px] -translate-x-1/2 text-[10px] text-muted-foreground text-center leading-tight whitespace-nowrap">
                      {item.label.split('·').map((part, i) => (
                        <span key={i} className="block">
                          {part}
                        </span>
                      ))}
                    </span>
                    <span className="absolute -top-[50px] w-px h-3.5 bg-muted-foreground" />
                  </span>
                ) : (
                  <a
                    key={item.anchor}
                    href={`#${item.anchor}`}
                    aria-label={`${item.date} ${item.label}`}
                    style={{ left }}
                    className="group absolute -top-11 w-px h-2 bg-border"
                  >
                    <span className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 px-1.5 py-0.5 bg-background border border-border text-[10px] text-muted-foreground whitespace-nowrap rounded group-hover:block group-focus-visible:block">
                      {item.date} {item.label}
                    </span>
                  </a>
                )
              }

              if (item.tier === 'featured') {
                return (
                  <a
                    key={item.anchor}
                    href={`#${item.anchor}`}
                    style={{ left }}
                    className="absolute bottom-3 -translate-x-1/2 text-center"
                  >
                    <span className="block text-[11px] font-semibold text-foreground/80 whitespace-nowrap">
                      {item.label}
                    </span>
                    <span className="block text-[9px] text-muted-foreground whitespace-nowrap">
                      {item.sublabel}
                    </span>
                    <span className="block w-px h-2.5 mx-auto mt-0.5 bg-muted-foreground/50" />
                  </a>
                )
              }

              if (item.tier === 'career') {
                return (
                  <a
                    key={item.anchor}
                    href={`#${item.anchor}`}
                    style={{ left }}
                    className="group absolute"
                  >
                    <span className="absolute top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-primary rounded-full" />
                    <span className="absolute top-3.5 -translate-x-1/2 text-xs font-semibold text-foreground whitespace-nowrap group-hover:text-primary group-focus-visible:text-primary">
                      {item.label}
                    </span>
                  </a>
                )
              }

              return (
                <a
                  key={item.anchor}
                  href={`#${item.anchor}`}
                  aria-label={item.label}
                  style={{ left }}
                  className="group absolute top-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-background border-2 border-muted-foreground/50 rounded-full"
                >
                  <span className="absolute top-3 left-1/2 hidden -translate-x-1/2 px-1.5 py-0.5 bg-background border border-border text-[10px] text-muted-foreground whitespace-nowrap rounded group-hover:block group-focus-visible:block">
                    {item.label}
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </nav>

      <div className="dark group sticky top-[56px] z-30 mx-[calc(50%-50vw)] mb-16 py-2 bg-background/95 backdrop-blur-sm md:mb-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="relative h-1 bg-border rounded-full">
            <span
              className="absolute inset-y-0 left-0 bg-primary rounded-full transition-[width] duration-300"
              style={{ width: `${pos(activeDate)}%` }}
            />
            {items
              .filter((i) => i.tier === 'career')
              .map((item) => (
                <a
                  key={`r-${item.anchor}`}
                  href={`#${item.anchor}`}
                  aria-label={item.label}
                  style={{ left: `${pos(item.date)}%` }}
                  className="absolute top-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-background border-2 border-primary rounded-full"
                >
                  <span className="absolute top-3 left-1/2 hidden -translate-x-1/2 text-[10px] font-semibold text-foreground whitespace-nowrap md:group-hover:block md:group-focus-visible:block">
                    {item.label}
                  </span>
                </a>
              ))}
            <span
              className="absolute top-1/2 w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 bg-primary rounded-full ring-[3px] ring-foreground/25 transition-[left] duration-300"
              style={{ left: `${pos(activeDate)}%` }}
            />
          </div>
          <div className="hidden h-0 md:group-hover:block md:group-hover:h-5" />
        </div>
      </div>
    </>
  )
}
