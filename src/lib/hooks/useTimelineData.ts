'use client'

import { useLocale, useTranslations } from '@/lib/providers/TextContext'
import { galleryItems } from '@/components/sections/ProjectEntry'
import {
  AXIS_START,
  buildTimeline,
  buildTocItems,
  entryDate,
  type CareerEntry,
  type CareerExtra,
} from '@/lib/utils/timeline'

// galleryItems(구조)와 1:1로 매칭되는 i18n 키. 순서를 맞춰 유지할 것.
const PROJECT_IDS = [
  'formkit',
  'albaform',
  'openmind',
  'tappytype',
  'portfolio',
  'bodycodi',
  'nexca',
  'dotfiles',
  'seo-talk',
  'cx-talk',
  'settlement',
]

export function useTimelineData() {
  const t = useTranslations()
  const { locale } = useLocale()
  const careers = t('pages.career.careers') as unknown as CareerEntry[]
  const extras = t('pages.career.extras') as unknown as CareerExtra[]

  // 프로젝트 표시 텍스트를 로케일로 치환(구조·이미지·URL은 galleryItems 유지).
  // anchor는 id 기반이라 로케일이 바뀌어도 스크롤·TOC 링크가 안정적이다.
  const showInternal = process.env.NEXT_PUBLIC_SHOW_INTERNAL === 'true'
  const projects = galleryItems.map((item, index) => {
    const id = PROJECT_IDS[index] ?? item.title
    const get = (key: string) => t(`pages.projects.items.${id}.${key}`)
    const periodRaw = item.private && !showInternal ? undefined : item.period
    return {
      ...item,
      id,
      title: get('title'),
      description: get('description'),
      tags: item.tags.map((tag) => t(`pages.projects.tags.${tag}`)),
      lead: item.lead ? get('lead') : undefined,
      alt: item.alt ? get('alt') : undefined,
      linkLabel: item.linkLabel ? get('linkLabel') : undefined,
      linkLabel2: item.linkLabel2 ? get('linkLabel2') : undefined,
      featured: item.featured ? { sublabel: get('sublabel') } : undefined,
      period:
        locale === 'en' ? periodRaw?.replace('현재', 'Present') : periodRaw,
      screens: item.screens?.map((screen, si) => ({
        ...screen,
        caption: screen.caption ? get(`screens.${si}.caption`) : undefined,
        alt: screen.alt ? get(`screens.${si}.alt`) : undefined,
      })),
      beforeAfter: item.beforeAfter
        ? {
            before: {
              ...item.beforeAfter.before,
              caption: get('beforeAfter.before.caption'),
              alt: get('beforeAfter.before.alt'),
            },
            after: {
              ...item.beforeAfter.after,
              caption: get('beforeAfter.after.caption'),
              alt: get('beforeAfter.after.alt'),
            },
          }
        : undefined,
    }
  })

  const timeline = buildTimeline(careers, extras, projects, locale)
  const nowKey = timeline
    .map(entryDate)
    .reduce((max, d) => (d > max ? d : max), AXIS_START)
  const tocItems = buildTocItems(timeline, nowKey)
  return { careers, extras, timeline, nowKey, tocItems }
}
