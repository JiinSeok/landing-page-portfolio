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

export function useTimelineData() {
  const t = useTranslations()
  const { locale } = useLocale()
  const careers = t('pages.career.careers') as unknown as CareerEntry[]
  const extras = t('pages.career.extras') as unknown as CareerExtra[]
  const timeline = buildTimeline(careers, extras, galleryItems, locale)
  const nowKey = timeline
    .map(entryDate)
    .reduce((max, d) => (d > max ? d : max), AXIS_START)
  const tocItems = buildTocItems(timeline, nowKey)
  return { careers, extras, timeline, nowKey, tocItems }
}
