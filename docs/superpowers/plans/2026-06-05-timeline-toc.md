# 가로 연표 TOC Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 타임라인 페이지 최상단에 역순(왼쪽=현재) 가로 연표를 추가하고, 스크롤 시 얇은 sticky 눈금으로 축소되어 점프 내비게이션 + 시점 매핑 프로그레스바 역할을 하게 한다.

**Architecture:** 타임라인 조립 로직을 `PersonalSection`에서 순수 모듈(`src/lib/utils/timeline.ts`)로 추출해 본문과 TOC가 같은 데이터를 쓴다. 신규 `TimelineToc` 클라이언트 컴포넌트가 풀 스트립과 sticky 눈금 두 모드를 렌더링하고, IntersectionObserver 두 개로 (1) 풀 스트립 이탈 감지 → 눈금 표시, (2) 본문에서 화면 상단에 걸린 항목 감지 → 커서·채움 갱신을 처리한다.

**Tech Stack:** Next.js App Router(정적 export), TypeScript, Tailwind v4(무채색 토큰), Vitest(신규, 순수 로직 단위 테스트), Playwright MCP(실측 검증)

**스펙:** `docs/superpowers/specs/2026-06-05-timeline-toc-design.md`

**스펙 보정 1건:** '현재' 앵커를 렌더 시점의 연·월 대신 **데이터 최신 월**(타임라인 항목 중 가장 최근 월)로 정한다. `new Date()`는 빌드(SSR HTML)와 클라이언트 hydration 시점이 달라질 수 있어 위치 스타일 불일치 경고를 유발하지만, 데이터 유도 값은 결정적이다.

**프로젝트 제약:** 코드 주석 금지(사용자 지시). className 순서는 `tailwind-classname` 규칙(레이아웃→크기→여백→색→타이포→효과→전환→반응형→조건부).

---

## File Structure

| 파일 | 역할 |
|---|---|
| Create `vitest.config.ts` | Vitest 설정 (node 환경, `@/` alias) |
| Modify `package.json` | `vitest` devDep, `test` 스크립트 |
| Create `src/lib/utils/timeline.ts` | 타입·LLM_MILESTONES·정렬 키·월 환산·축 좌표·타임라인/TOC 아이템 빌더 (순수 함수만) |
| Create `src/lib/utils/timeline.test.ts` | 위 모듈 단위 테스트 |
| Modify `src/components/sections/ProjectEntry.tsx` | `GalleryItem.featured` 필드 + TappyType·bodycodi에 값 부여 |
| Create `src/components/sections/TimelineToc.tsx` | 풀 스트립 + sticky 눈금 + 프로그레스 + 점프 |
| Modify `src/components/sections/PersonalSection.tsx` | 공유 빌더 사용, 항목 anchor id·`data-toc-date` 부여, TimelineToc 장착 |

본문 범례(경력/프로젝트/AI 출시)는 유지한다. `FloatingButtonGroup` 변경 없음.

---

### Task 1: Vitest 셋업

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`

- [ ] **Step 1: vitest 설치**

```bash
cd /Users/seokjiin/dev/landing-page-portfolio && pnpm add -D vitest
```

Expected: `devDependencies`에 `vitest` 추가됨.

- [ ] **Step 2: vitest.config.ts 작성**

```ts
import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
```

- [ ] **Step 3: package.json scripts에 test 추가**

`"scripts"`에 다음 한 줄 추가 (`"lint"` 다음 줄):

```json
"test": "vitest run",
```

- [ ] **Step 4: 빈 실행으로 동작 확인**

Run: `pnpm test`
Expected: `No test files found` 류 메시지와 함께 종료 (설정 오류 없이).

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml vitest.config.ts
git commit -m "chore: Vitest 셋업 (timeline 순수 로직 테스트용)"
```

---

### Task 2: timeline.ts — 데이터 빌더·좌표 계산 (TDD)

**Files:**
- Create: `src/lib/utils/timeline.test.ts`
- Create: `src/lib/utils/timeline.ts`

- [ ] **Step 1: 실패하는 테스트 작성**

`src/lib/utils/timeline.test.ts`:

```ts
import { describe, expect, it } from 'vitest'

import {
  AXIS_START,
  axisPosition,
  buildTimeline,
  buildTocItems,
  LLM_MILESTONES,
  monthIndex,
  timelineAnchorId,
  timelineSortKey,
  type CareerEntry,
  type CareerExtra,
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
    expect(axisPosition('2022.11', '2026.06')).toBeCloseTo((43 / 58) * 100, 1)
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
    expect(byLabel('TappyType')?.tier).toBe('featured')
    expect(byLabel('TappyType')?.sublabel).toBe('iOS · 진행 중')
    expect(byLabel('albaform')?.tier).toBe('minor')
    expect(byLabel('코드잇')?.tier).toBe('minor')
    expect(byLabel('KBS한국어능력시험')).toBeUndefined()
    expect(byLabel('연세대학교')).toBeUndefined()
  })

  it('AI 마일스톤은 major 2건만 상시 라벨', () => {
    const timeline = buildTimeline(careers, extras, projects)
    const toc = buildTocItems(timeline, '2026.06')
    const majors = toc.filter((i) => i.tier === 'ai' && i.major)
    expect(majors.map((m) => m.date).sort()).toEqual(['2022.11', '2025.05'])
    expect(LLM_MILESTONES.filter((m) => m.major)).toHaveLength(2)
  })
})
```

- [ ] **Step 2: 실패 확인**

Run: `pnpm test`
Expected: FAIL — `Cannot find module '@/lib/utils/timeline'`

- [ ] **Step 3: timeline.ts 구현**

`src/lib/utils/timeline.ts`:

```ts
export type ContributionGroup = {
  title?: string
  imageUrl?: string
  alt?: string
  items: string[]
}

export type CareerEntry = {
  company: string
  description?: string
  url?: string
  period: string
  role: string
  contributions: (string | ContributionGroup)[]
}

export type CareerExtra = {
  tag: string
  label: string
  period: string
  sort: string
}

export type AiMilestone = {
  sort: string
  label: string
  major?: boolean
}

export type TimelineProject = {
  title: string
  period?: string
  featured?: { sublabel: string }
}

export type TimelineEntry<P extends TimelineProject = TimelineProject> = (
  | { kind: 'career'; sort: string; career: CareerEntry }
  | { kind: 'milestone'; sort: string; label: string; major?: boolean }
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

export const AXIS_START = '2021.08'

export const LLM_MILESTONES: AiMilestone[] = [
  { sort: '2026.05', label: '3사 플래그십 동시 교체' },
  { sort: '2025.11', label: 'Gemini 3·Claude Opus 4.5 출시' },
  { sort: '2025.08', label: 'GPT-5·나노 바나나 출시' },
  { sort: '2025.05', label: 'Claude 4·Claude Code 정식 출시', major: true },
  { sort: '2025.02', label: 'Claude Code 공개·에이전틱 코딩' },
  { sort: '2024.06', label: 'Claude 3.5·AI 코딩 실용화' },
  { sort: '2023.03', label: 'GPT-4 출시·Cursor 등장' },
  { sort: '2022.11', label: 'ChatGPT 출시·LLM 대중화', major: true },
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
      .filter((p) => p.period)
      .map((project) => ({
        kind: 'project' as const,
        sort: timelineSortKey('project', project.period as string),
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
  if (entry.kind === 'project') return startMonth(entry.project.period as string)
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
          label: entry.career.company,
          date,
          ongoing: entry.career.period.includes('현재'),
          anchor: entry.anchor,
        }
      }
      if (entry.kind === 'project') {
        return {
          tier: entry.project.featured ? 'featured' : 'minor',
          label: entry.project.title,
          sublabel: entry.project.featured?.sublabel,
          date,
          ongoing: (entry.project.period as string).includes('현재'),
          anchor: entry.anchor,
        }
      }
      if (entry.kind === 'extra') {
        return {
          tier: 'minor',
          label: entry.extra.label,
          date,
          ongoing: false,
          anchor: entry.anchor,
        }
      }
      return {
        tier: 'ai',
        label: entry.label,
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
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `pnpm test`
Expected: PASS (테스트 7개)

- [ ] **Step 5: Commit**

```bash
git add src/lib/utils/timeline.ts src/lib/utils/timeline.test.ts
git commit -m "feat: 타임라인 데이터 빌더·축 좌표 모듈 추출 (TDD)"
```

---

### Task 3: GalleryItem featured 플래그

**Files:**
- Modify: `src/components/sections/ProjectEntry.tsx`

- [ ] **Step 1: GalleryItem 인터페이스에 featured 추가**

`export interface GalleryItem {` 블록 안 `embedUrl?: string` 아래에 추가:

```ts
  featured?: { sublabel: string }
```

- [ ] **Step 2: TappyType 항목에 부여**

TappyType 객체(`title: 'TappyType'`)에 필드 추가:

```ts
    featured: { sublabel: 'iOS · 진행 중' },
```

- [ ] **Step 3: bodycodi 항목에 부여**

bodycodi 객체(`title: 'bodycodi'`)에 필드 추가:

```ts
    featured: { sublabel: '레거시 공존 설계' },
```

- [ ] **Step 4: 타입체크**

Run: `npx tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/ProjectEntry.tsx
git commit -m "feat: 어필 라벨용 featured 플래그 (TappyType·bodycodi)"
```

---

### Task 4: PersonalSection을 공유 빌더로 전환 + anchor 부여

**Files:**
- Modify: `src/components/sections/PersonalSection.tsx`

- [ ] **Step 1: 로컬 타입·정렬 로직 제거하고 공유 모듈 import**

파일 상단의 로컬 정의 `ContributionGroup`, `CareerEntry`, `CareerExtra`, `TimelineItem`, `ONGOING_RANK`, `timelineSortKey`, `LLM_MILESTONES`를 삭제하고 import로 교체:

```ts
import {
  buildTimeline,
  buildTocItems,
  entryDate,
  type CareerEntry,
  type CareerExtra,
  type ContributionGroup,
  type TimelineEntry,
} from '@/lib/utils/timeline'
```

`TITLE_TECH_PATTERN`, `FEATURED_CAREER_CARD_STYLES`, `COMPANY_LOGOS`는 그대로 둔다.

- [ ] **Step 2: timeline 조립부 교체**

기존 `const timeline: TimelineItem[] = [...].sort(...)` 블록을 다음으로 교체:

```ts
  const timeline = buildTimeline(careers, extras, galleryItems)
  const nowKey = entryDate(timeline[0])
  const tocItems = buildTocItems(timeline, nowKey)
```

`timeline[0]`은 진행 중 경력(도스트11)이라 `entryDate`가 `2025.09`를 반환하는 문제가 있다 — '현재' 앵커는 **데이터 최신 월**이어야 하므로 다음과 같이 계산한다 (위 세 줄 대신 이 블록 사용):

```ts
  const timeline = buildTimeline(careers, extras, galleryItems)
  const nowKey = timeline
    .map(entryDate)
    .reduce((max, d) => (d > max ? d : max), AXIS_START)
  const tocItems = buildTocItems(timeline, nowKey)
```

`AXIS_START`도 import 목록에 추가한다.

- [ ] **Step 3: 각 분기 래퍼에 anchor id와 data-toc-date 부여**

네 분기(milestone/extra/project/career)의 최상위 `<div key=... className="flex gap-4 md:gap-6">`를 모두 다음 형태로 수정한다 (milestone 분기 예시, 나머지 세 분기도 동일하게 `item.anchor` 사용):

```tsx
<div
  key={item.anchor}
  id={item.anchor}
  data-toc-date={entryDate(item)}
  className="flex gap-4 md:gap-6 scroll-mt-24"
>
```

기존 `key={career.company}` 등은 `key={item.anchor}`로 통일한다.

- [ ] **Step 4: 회귀 확인 — 타입·테스트·빌드**

Run: `npx tsc --noEmit && pnpm test && pnpm build`
Expected: 모두 통과. 빌드 출력 라우트 동일.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/PersonalSection.tsx
git commit -m "refactor: 타임라인 조립을 공유 빌더로 전환, 항목 anchor 부여"
```

---

### Task 5: TimelineToc 컴포넌트 — 풀 스트립

**Files:**
- Create: `src/components/sections/TimelineToc.tsx`
- Modify: `src/components/sections/PersonalSection.tsx` (장착)

- [ ] **Step 1: TimelineToc.tsx 작성 (풀 스트립만, sticky는 Task 6)**

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'

import { axisPosition, type TocItem } from '@/lib/utils/timeline'

interface TimelineTocProps {
  items: TocItem[]
  nowKey: string
}

const FULL_STRIP_STYLES = `
  relative
  mb-10 pt-24 pb-20 md:mb-12
`

export default function TimelineToc({ items, nowKey }: TimelineTocProps) {
  const pos = (date: string) => axisPosition(date, nowKey)
  const careerSegs = items.filter((i) => i.tier === 'career' && i.ongoing)

  return (
    <nav aria-label="연표 목차" className={FULL_STRIP_STYLES}>
      <div className="relative h-0.5 bg-border">
        <span className="absolute left-0 top-4 text-[10px] text-muted-foreground/60">
          현재
        </span>
        <span className="absolute right-0 top-4 text-[10px] text-muted-foreground/60">
          2021
        </span>

        {careerSegs.map((seg) => (
          <span
            key={`seg-${seg.anchor}`}
            className="absolute -top-0.5 left-0 h-1.5 bg-primary rounded-full"
            style={{ width: `${pos(seg.date)}%` }}
          />
        ))}

        <span className="absolute top-1/2 left-0 w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 bg-primary rounded-full shadow-[0_0_0_4px_rgba(0,0,0,0.12)]" />

        {items.map((item) => {
          const left = `${pos(item.date)}%`

          if (item.tier === 'ai') {
            return item.major ? (
              <span key={item.anchor} style={{ left }} className="absolute">
                <span className="absolute -top-[78px] -translate-x-1/2 text-[10px] text-muted-foreground text-center leading-tight whitespace-nowrap">
                  {item.label.split('·').map((part) => (
                    <span key={part} className="block">
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
              <a key={item.anchor} href={`#${item.anchor}`} style={{ left }} className="absolute">
                <span className="absolute top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-primary rounded-full" />
                <span className="absolute top-3.5 -translate-x-1/2 text-xs font-semibold whitespace-nowrap hover:text-primary">
                  {item.label}
                </span>
              </a>
            )
          }

          return (
            <a key={item.anchor} href={`#${item.anchor}`} style={{ left }} className="absolute">
              <span className="absolute top-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-background border-2 border-muted-foreground/50 rounded-full" />
              <span className="hidden absolute top-9 -translate-x-1/2 text-[10px] font-medium text-muted-foreground whitespace-nowrap hover:text-foreground md:block">
                <span className="block w-px h-1.5 mx-auto mb-0.5 bg-border" />
                {item.label.length > 12 ? `${item.label.slice(0, 12)}…` : item.label}
              </span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: PersonalSection에 장착**

import 추가:

```ts
import TimelineToc from '@/components/sections/TimelineToc'
```

범례 `<div className="flex gap-4 md:gap-6 mb-8 md:mb-10">` 바로 위에 삽입:

```tsx
<TimelineToc items={tocItems} nowKey={nowKey} />
```

- [ ] **Step 3: 타입·빌드 확인**

Run: `npx tsc --noEmit && pnpm build`
Expected: 통과

- [ ] **Step 4: Playwright 실측 (데스크톱·모바일)**

`pnpm start -p 3458` 후 Playwright로:
- 1440px: 4층 라벨 전부 보임, 라벨 충돌 없음(특히 도스트11 16%·formkit 17.8% 구간), 왼쪽 끝 현재 마커·도스트11 구간 굵은 바
- 390px: minor 라벨 숨김(`md:block`), 경력·어필 라벨만
- 마커 클릭 → 해당 본문 항목으로 점프(scroll-mt-24로 헤더에 안 가림)

Expected: 위 항목 모두 확인. 라벨 겹침 발견 시 minor 라벨 줄의 `top-9`를 조정해 2줄 엇갈림 배치로 보정.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/TimelineToc.tsx src/components/sections/PersonalSection.tsx
git commit -m "feat: 가로 연표 TOC 풀 스트립 (역순 축·4층 라벨·점프)"
```

---

### Task 6: sticky 눈금 + 시점 매핑 프로그레스

**Files:**
- Modify: `src/components/sections/TimelineToc.tsx`

- [ ] **Step 1: compact·activeDate 상태와 옵저버 추가**

`TimelineToc` 컴포넌트 본문 상단에 추가:

```tsx
  const fullRef = useRef<HTMLDivElement>(null)
  const [compact, setCompact] = useState(false)
  const [activeDate, setActiveDate] = useState(nowKey)

  useEffect(() => {
    const el = fullRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setCompact(!entry.isIntersecting),
      { rootMargin: '-64px 0px 0px 0px' },
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
      { rootMargin: '-64px 0px -75% 0px' },
    )
    els.forEach((node) => io.observe(node))
    return () => io.disconnect()
  }, [])
```

풀 스트립 `<div className="relative h-0.5 bg-border">`를 `<div ref={fullRef} className="relative h-0.5 bg-border">`로 변경.

- [ ] **Step 2: sticky 눈금 마크업 추가**

`<nav>` 닫기 직전(풀 스트립 div 다음)에 추가:

```tsx
      <div
        className={`group sticky top-[64px] z-30 -mx-2 px-2 py-2 bg-background/95 backdrop-blur-sm rounded-b-lg transition-opacity duration-200 ${
          compact ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
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
                <span className="absolute top-3 left-1/2 hidden -translate-x-1/2 text-[10px] font-semibold whitespace-nowrap md:group-hover:block">
                  {item.label}
                </span>
              </a>
            ))}
          <span
            className="absolute top-1/2 w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 bg-primary rounded-full shadow-[0_0_0_3px_rgba(0,0,0,0.15)] transition-[left] duration-300"
            style={{ left: `${pos(activeDate)}%` }}
          />
        </div>
        <div className="hidden h-0 md:group-hover:block md:group-hover:h-5" />
      </div>
```

sticky `top-[64px]`은 헤더의 `--navbar-height: 64px`와 맞춘 값이다.

- [ ] **Step 3: 타입·빌드**

Run: `npx tsc --noEmit && pnpm build`
Expected: 통과

- [ ] **Step 4: Playwright 시나리오 검증**

`pnpm start -p 3458` 후:
1. 최상단: sticky 눈금 안 보임(opacity-0)
2. 1500px 스크롤: 눈금 표시, 채움·커서가 화면 상단 항목의 날짜 좌표와 일치 (예: 핏투게더 구간이면 커서 ≈ 60%)
3. 눈금 경력 점 클릭 → 해당 경력으로 점프
4. 호버 시 경력 라벨 펼침(데스크톱)
5. 390px: 눈금·채움 동작, 라벨 펼침 없음

Expected: 5개 시나리오 모두 통과. 커서가 항목 경계에서 튀면 `rootMargin` 하단 비율(-75%)을 -70~-80% 범위에서 조정.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/TimelineToc.tsx
git commit -m "feat: sticky 눈금 진행바 — 시점 매핑 커서·채움·점프·호버 펼침"
```

---

### Task 7: 최종 검증

**Files:** 없음 (검증만)

- [ ] **Step 1: 전체 게이트 실행**

Run: `npx tsc --noEmit && pnpm test && npx eslint src/components/sections/ src/lib/utils/ && pnpm build`
Expected: 전부 통과

- [ ] **Step 2: 본문 회귀 확인**

Playwright로 기존 확정 사항 재확인: dost11 카드 첫 화면, CG 이미지 전체폭, 마일스톤 2줄 라벨, 좌측 정렬 유지.

- [ ] **Step 3: 잔여 변경 커밋**

```bash
git status --short
```

이 기능 외 파일이 섞여 있지 않은지 확인 후, 남은 변경이 있으면 커밋.

---

## Self-Review 결과

- 스펙 커버리지: 배치(T5·T6), 역순 축(T2 axisPosition), 4층 라벨(T5), AI major 2건(T2 LLM_MILESTONES), 어필 라벨·한정어(T3), 프로그레스 시점 매핑(T6), 데스크톱/모바일 분기(T5 `md:` 분기), 점프·anchor(T4·T5), a11y nav·focus(T5 `<nav>`·`group-focus-visible`), 플로팅 버튼 무변경(구조 변경 없음) — 누락 없음
- 플레이스홀더: 없음 (모든 코드 스텝에 실제 코드 포함)
- 타입 일관성: `TocItem`·`entryDate`·`buildTocItems` 시그니처 T2 정의와 T4~T6 사용처 일치 확인
