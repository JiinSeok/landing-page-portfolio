import { describe, expect, it } from 'vitest'

import {
  AXIS_START,
  axisPosition,
  buildTimeline,
  buildTocItems,
  entryDate,
  LLM_MILESTONES,
  monthIndex,
  timelineAnchorId,
  timelineSortKey,
  type CareerEntry,
  type CareerExtra,
  type TimelineEntry,
  type TimelineProject,
} from '@/lib/utils/timeline'

const careers: CareerEntry[] = [
  {
    company: '도스트11',
    period: '2025.09 ~ 현재',
    role: '풀스택',
    contributions: [],
  },
  {
    company: '연합뉴스',
    period: '2021.08 ~ 2022.03',
    role: '인물자료',
    contributions: [],
  },
]

const extras: CareerExtra[] = [
  { tag: '교육', label: '코드잇 스프린트', period: '2024.04 ~ 2024.10', sort: '2024.04' },
  { tag: '자격', label: 'KBS한국어능력시험 1급', period: '2021', sort: '2021.07' },
  { tag: '교육', label: '연세대학교', period: '2015 ~ 2021', sort: '2015.03' },
]

const projects: (TimelineProject & { title: string })[] = [
  { title: 'TappyType', period: '2026.05 ~ 현재', featured: { sublabel: 'iOS · 진행 중' } },
  { title: 'bodycodi', period: '2025.09', featured: { sublabel: '레거시 공존 설계' } },
  { title: 'albaform', period: '2024.08 ~ 2025.01' },
]

describe('monthIndex', () => {
  it('YYYY.MM을 월 단위 정수로 환산한다', () => {
    expect(monthIndex('2021.08')).toBe(2021 * 12 + 7)
    expect(monthIndex('2026.06')).toBe(2026 * 12 + 5)
  })
})

describe('axisPosition', () => {
  it('현재=0%, 축 시작=100%', () => {
    expect(axisPosition('2026.06', '2026.06')).toBe(0)
    expect(axisPosition(AXIS_START, '2026.06')).toBe(100)
  })

  it('중간 값은 월 비율, 범위 밖은 클램프', () => {
    expect(axisPosition('2022.11', '2026.06')).toBeCloseTo((43 / 69) * 100, 1)
    expect(axisPosition('2015.03', '2026.06')).toBe(100)
    expect(axisPosition('2027.01', '2026.06')).toBe(0)
  })
})

describe('timelineSortKey', () => {
  it('진행 중 경력 > 진행 중 프로젝트 > 날짜 역순', () => {
    const ongoingCareer = timelineSortKey('career', '2025.09 ~ 현재')
    const ongoingProject = timelineSortKey('project', '2026.05 ~ 현재')
    const past = timelineSortKey('project', '2026.04')
    expect(ongoingCareer > ongoingProject).toBe(true)
    expect(ongoingProject > past).toBe(true)
    expect(timelineSortKey('career', '2021.08 ~ 2022.03')).toBe('2021.08')
  })
})

describe('entryDate', () => {
  it('period가 없는 프로젝트는 빈 문자열을 반환한다', () => {
    const entry: TimelineEntry = {
      kind: 'project',
      sort: '2024.01',
      anchor: timelineAnchorId('project', 'NoPeriod'),
      project: { title: 'NoPeriod' },
    }
    expect(entryDate(entry)).toBe('')
  })
})

describe('buildTimeline', () => {
  it('첫 항목은 진행 중 경력(도스트11)이고 anchor가 부여된다', () => {
    const timeline = buildTimeline(careers, extras, projects)
    expect(timeline[0].kind).toBe('career')
    expect(timeline[0].anchor).toBe(timelineAnchorId('career', '도스트11'))
    const anchors = timeline.map((e) => e.anchor)
    expect(new Set(anchors).size).toBe(anchors.length)
  })
})

describe('buildTocItems', () => {
  it('티어를 매핑하고 축 시작 이전 extras를 거른다', () => {
    const timeline = buildTimeline(careers, extras, projects)
    const toc = buildTocItems(timeline, '2026.06')
    const byLabel = (l: string) => toc.find((i) => i.label.includes(l))

    expect(byLabel('도스트11')?.tier).toBe('career')
    expect(byLabel('도스트11')?.ongoing).toBe(true)
    expect(byLabel('TappyType')?.tier).toBe('minor')
    expect(byLabel('albaform')?.tier).toBe('minor')
    expect(byLabel('코드잇')?.tier).toBe('minor')
    expect(byLabel('KBS한국어능력시험')?.tier).toBe('minor')
    expect(byLabel('연세대학교')).toBeUndefined()
  })

  it('AI 마일스톤은 major 3건만 상시 라벨', () => {
    const timeline = buildTimeline(careers, extras, projects)
    const toc = buildTocItems(timeline, '2026.06')
    const majors = toc.filter((i) => i.tier === 'ai' && i.major)
    expect(majors.map((m) => m.date).sort()).toEqual(['2022.11', '2023.03', '2025.05'])
    expect(LLM_MILESTONES.filter((m) => m.major)).toHaveLength(3)
  })

  it('nowKey 이후(미래) 항목은 제외한다', () => {
    const timeline = buildTimeline(careers, extras, projects)
    const toc = buildTocItems(timeline, '2025.12')
    const byLabel = (l: string) => toc.find((i) => i.label.includes(l))

    expect(byLabel('TappyType')).toBeUndefined()
    expect(byLabel('도스트11')).toBeDefined()
    expect(toc.every((i) => monthIndex(i.date) <= monthIndex('2025.12'))).toBe(true)
  })

  it('tocLabel 오버라이드: career·extra·milestone', () => {
    const labeledCareers: CareerEntry[] = [
      {
        company: '도스트11 주식회사',
        tocLabel: '도스트11',
        period: '2025.09 ~ 현재',
        role: '풀스택',
        contributions: [],
      },
    ]
    const labeledExtras: CareerExtra[] = [
      {
        tag: '교육',
        label: '코드잇 스프린트 부트캠프',
        tocLabel: '코드잇',
        period: '2024.04 ~ 2024.10',
        sort: '2024.04',
      },
    ]
    const timeline = buildTimeline(labeledCareers, labeledExtras, [])
    const toc = buildTocItems(timeline, '2026.06')

    const career = toc.find((i) => i.label === '도스트11')
    expect(career?.tier).toBe('career')
    expect(career?.sublabel).toBe('도스트11 주식회사')

    const extra = toc.find((i) => i.label === '코드잇')
    expect(extra?.tier).toBe('career')
    expect(extra?.sublabel).toBe('코드잇 스프린트 부트캠프')

    const milestone = toc.find((i) => i.label === 'Claude Code 출시')
    expect(milestone?.tier).toBe('ai')
    expect(milestone?.major).toBe(true)
  })
})
