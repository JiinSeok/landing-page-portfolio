export type BeforeAfterSide = {
  imageUrl?: string
  videoUrl?: string
  width?: number
  height?: number
  caption: string
  alt: string
}

export type ContributionGroup = {
  title?: string
  imageUrl?: string
  alt?: string
  items: string[]
}

export type CareerEntry = {
  company: string
  tocLabel?: string
  description?: string
  url?: string
  period: string
  role: string
  contributions: (string | ContributionGroup)[]
}

export type CareerExtra = {
  tag: string
  label: string
  tocLabel?: string
  period: string
  sort: string
}

export type AiMilestone = {
  sort: string
  label: string
  tocLabel?: string
  major?: boolean
}

export type TimelineProject = {
  title: string
  period?: string
  featured?: { sublabel: string }
}

export type TimelineEntry<P extends TimelineProject = TimelineProject> = (
  | { kind: 'career'; sort: string; career: CareerEntry }
  | { kind: 'milestone'; sort: string; label: string; tocLabel?: string; major?: boolean }
  | { kind: 'extra'; sort: string; extra: CareerExtra }
  | { kind: 'project'; sort: string; project: P }
) & { anchor: string }

export type TocTier = 'ai' | 'featured' | 'career' | 'minor'

export type TocItem = {
  tier: TocTier
  label: string
  sublabel?: string
  date: string
  ongoing: boolean
  anchor: string
  major?: boolean
}

export const AXIS_START = '2020.09'

export const LLM_MILESTONES: AiMilestone[] = [
  { sort: '2026.05', label: '3사 플래그십 동시 교체' },
  { sort: '2025.11', label: 'Gemini 3·Claude Opus 4.5 출시' },
  { sort: '2025.08', label: 'GPT-5·나노 바나나 출시' },
  { sort: '2025.05', label: 'Claude 4·Claude Code 정식 출시', tocLabel: 'Claude Code 정식 출시', major: true },
  { sort: '2025.02', label: 'Claude Code 공개·에이전틱 코딩' },
  { sort: '2024.06', label: 'Claude 3.5·AI 코딩 실용화' },
  { sort: '2023.03', label: 'GPT-4 출시·Cursor 등장', tocLabel: 'Cursor 출시', major: true },
  { sort: '2022.11', label: 'ChatGPT 출시·LLM 대중화', tocLabel: 'GPT 출시', major: true },
  { sort: '2022.06', label: 'GitHub Copilot 정식 출시' },
]

const ONGOING_RANK: Record<'career' | 'project', string> = {
  career: '9999.9',
  project: '9999.0',
}

export function timelineSortKey(
  kind: 'career' | 'project',
  period: string,
): string {
  const start = period.slice(0, 7)
  return period.includes('현재') ? `${ONGOING_RANK[kind]} ${start}` : start
}

export function monthIndex(key: string): number {
  const [year, month] = key.split('.')
  return Number(year) * 12 + (Number(month) - 1)
}

export function axisPosition(dateKey: string, nowKey: string): number {
  const total = monthIndex(nowKey) - monthIndex(AXIS_START)
  if (total === 0) return 0
  const offset = monthIndex(nowKey) - monthIndex(dateKey)
  return Math.min(100, Math.max(0, (offset / total) * 100))
}

export function timelineAnchorId(kind: string, key: string): string {
  return `tl-${kind}-${key.replace(/[^\p{L}\p{N}]+/gu, '-')}`
}

function startMonth(period: string): string {
  return period.slice(0, 7)
}

export function buildTimeline<P extends TimelineProject>(
  careers: CareerEntry[],
  extras: CareerExtra[],
  projects: P[],
): TimelineEntry<P>[] {
  return [
    ...careers.map((career) => ({
      kind: 'career' as const,
      sort: timelineSortKey('career', career.period),
      anchor: timelineAnchorId('career', career.company),
      career,
    })),
    ...extras.map((extra) => ({
      kind: 'extra' as const,
      sort: extra.sort,
      anchor: timelineAnchorId('extra', extra.label),
      extra,
    })),
    ...projects
      .filter((p): p is P & { period: string } => Boolean(p.period))
      .map((project) => ({
        kind: 'project' as const,
        sort: timelineSortKey('project', project.period),
        anchor: timelineAnchorId('project', project.title),
        project,
      })),
    ...LLM_MILESTONES.map((m) => ({
      kind: 'milestone' as const,
      anchor: timelineAnchorId('milestone', m.sort),
      ...m,
    })),
  ].sort((a, b) => b.sort.localeCompare(a.sort))
}

export function entryDate(entry: TimelineEntry): string {
  if (entry.kind === 'career') return startMonth(entry.career.period)
  if (entry.kind === 'project') return startMonth(entry.project.period ?? '')
  if (entry.kind === 'extra') return entry.extra.sort
  return entry.sort
}

export function buildTocItems(
  timeline: TimelineEntry[],
  nowKey: string,
): TocItem[] {
  return timeline
    .map((entry): TocItem => {
      const date = entryDate(entry)
      if (entry.kind === 'career') {
        return {
          tier: 'career',
          label: entry.career.tocLabel ?? entry.career.company,
          sublabel: entry.career.company,
          date,
          ongoing: entry.career.period.includes('현재'),
          anchor: entry.anchor,
        }
      }
      if (entry.kind === 'project') {
        return {
          tier: 'minor',
          label: entry.project.title,
          date,
          ongoing: (entry.project.period ?? '').includes('현재'),
          anchor: entry.anchor,
        }
      }
      if (entry.kind === 'extra') {
        return {
          tier: entry.extra.tocLabel ? 'career' : 'minor',
          label: entry.extra.tocLabel ?? entry.extra.label,
          sublabel: entry.extra.tocLabel ? entry.extra.label : undefined,
          date,
          ongoing: false,
          anchor: entry.anchor,
        }
      }
      return {
        tier: 'ai',
        label: entry.tocLabel ?? entry.label,
        date,
        ongoing: false,
        anchor: entry.anchor,
        major: entry.major,
      }
    })
    .filter(
      (item) =>
        monthIndex(item.date) >= monthIndex(AXIS_START) &&
        monthIndex(item.date) <= monthIndex(nowKey),
    )
}
