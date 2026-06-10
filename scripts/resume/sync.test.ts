import { readFileSync } from 'node:fs'
import path from 'node:path'

import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'
import { describe, expect, it } from 'vitest'

import {
  careers,
  type CareerFact,
  extraMonths,
  langMilestones,
  metrics,
  milestones,
  projects,
  type ProjectFact,
  RESUME_AS_OF,
  talks,
} from '@/lib/constants/facts'

import { careerMonths, durationLabel, totalCareerLabel } from './duration'
import { buildResumeHtml, ROOT } from './render'

const read = (relative: string) =>
  readFileSync(path.join(ROOT, relative), 'utf8')

describe('재생성 diff', () => {
  it('커밋된 resume.html은 템플릿+facts 재생성 결과와 일치한다', async () => {
    const committed = readFileSync(
      path.join(ROOT, 'public/resume.html'),
      'utf8',
    )
    expect(
      await buildResumeHtml(),
      'public/resume.html이 facts·template과 어긋남 — pnpm resume 실행 후 커밋할 것',
    ).toBe(committed)
  })
})

describe('사이트 대조', () => {
  const koJson = read('src/lib/constants/locales/ko.json')
  const projectEntry = read('src/components/sections/ProjectEntry.tsx')

  it('ko.json의 경력 기간이 facts와 일치한다', () => {
    for (const career of Object.values(careers)) {
      expect(koJson).toContain(`${career.start} ~ ${career.end ?? '현재'}`)
    }
  })

  it('ko.json의 회사 팀·직무·URL이 facts와 일치한다', () => {
    for (const career of Object.values(careers) as CareerFact[]) {
      if (career.team) expect(koJson).toContain(career.team)
      if (career.title) expect(koJson).toContain(career.title)
      if (career.url) expect(koJson).toContain(career.url)
    }
  })

  it('ko.json의 핵심 수치가 facts와 일치한다', () => {
    expect(koJson).toContain(`제공률 ${metrics.responseRate}`)
    expect(koJson).toContain(`(${metrics.formReduction})`)
    expect(koJson).toContain(`${metrics.photoboothDays} 만에`)
    expect(koJson).toContain(metrics.errorMsgFiles)
    expect(koJson).toContain(metrics.apiRouteReplace)
    expect(koJson).toContain(`${metrics.jiraProjects} 프로덕트별`)
    expect(koJson).toContain(metrics.fpp)
  })

  it('ProjectEntry의 발표·패키지 정보가 facts와 일치한다', () => {
    expect(projectEntry).toContain(talks.seo.url)
    expect(projectEntry).toContain(talks.cx.url)
    expect(projectEntry).toContain(`'${talks.seo.when}'`)
    expect(projectEntry).toContain(`'${talks.cx.when}'`)
  })

  it('ProjectEntry의 프로젝트 기간·npm이 facts와 일치한다', () => {
    for (const project of Object.values(projects) as ProjectFact[]) {
      const period =
        project.end === null
          ? `${project.start} ~ 현재`
          : project.end === project.start
            ? project.start
            : `${project.start} ~ ${project.end}`
      expect(projectEntry).toContain(period)
      if (project.npm) expect(projectEntry).toContain(project.npm)
    }
  })
})

describe('원티드 본문 대조', () => {
  const wanted = read('docs/wanted-resume.md')

  it('wanted-resume.md의 핵심 수치가 facts와 일치한다', () => {
    expect(wanted).toContain(metrics.buildCold)
    expect(wanted).toContain(metrics.buildDevStart)
    expect(wanted).toContain(metrics.buildWatchMemory)
    expect(wanted).toContain(metrics.settlementTickets)
    expect(wanted).toContain(metrics.bodycodiUsers)
    expect(wanted).toContain(metrics.virtualizationThreshold)
    expect(wanted).toContain(metrics.virtualizationProof)
    expect(wanted).toContain(metrics.albaformTeam)
    expect(wanted).toContain(metrics.albaformCommitShare)
    expect(wanted).toContain(metrics.albaformDuration)
    expect(wanted).toContain(metrics.responseRate)
    expect(wanted).toContain(metrics.albaformSeo)
    expect(wanted).toContain(metrics.fpp)
  })

  it('wanted-resume.md의 회사 고용형태가 facts와 일치한다', () => {
    for (const career of Object.values(careers) as CareerFact[]) {
      if (career.employmentType) expect(wanted).toContain(career.employmentType)
    }
  })

  it('어학 점수가 PDF·wanted와 일치한다', () => {
    const template = read('scripts/resume/template.html').replace(/\s+/g, ' ')
    for (const lang of langMilestones) {
      expect(template).toContain(lang.label)
      expect(wanted).toContain(lang.label)
    }
  })

  it('식별 토큰이 있는 교육·자격 마일스톤이 wanted에 일관 표기된다', () => {
    for (const milestone of milestones) {
      if (milestone.token) expect(wanted).toContain(milestone.token)
    }
  })
})

describe('PDF 동기화', () => {
  it('커밋된 PDF에 asOf 파생값이 들어 있다', async () => {
    const data = new Uint8Array(
      readFileSync(path.join(ROOT, 'public/resume.pdf')),
    )
    const doc = await getDocument({ data }).promise
    const pages = await Promise.all(
      Array.from({ length: doc.numPages }, (_, i) =>
        doc
          .getPage(i + 1)
          .then((page) => page.getTextContent())
          .then((content) =>
            content.items
              .map((item) => ('str' in item ? item.str : ''))
              .join(''),
          ),
      ),
    )
    const text = pages.join('').replace(/\s+/g, '')
    const derived = [
      totalCareerLabel(Object.values(careers), RESUME_AS_OF),
      durationLabel(careerMonths(careers.dost11, RESUME_AS_OF)),
    ]
    for (const value of derived) {
      expect(
        text,
        `PDF에 '${value}' 없음 — pnpm resume로 PDF 재생성 후 커밋할 것`,
      ).toContain(value.replace(/\s+/g, ''))
    }
  })
})

describe('기간 패턴 스캔', () => {
  const knownMonths = new Set([
    ...Object.values(careers).flatMap((c) =>
      c.end ? [c.start, c.end] : [c.start],
    ),
    talks.seo.when,
    talks.cx.when,
    RESUME_AS_OF,
    ...extraMonths,
    ...milestones.map((m) => m.month),
  ])

  const targets = [
    'public/resume.html',
    'src/lib/constants/locales/ko.json',
    'src/components/sections/ProjectEntry.tsx',
  ]

  it.each(targets)('%s 의 모든 연월이 facts에 등록돼 있다', (target) => {
    const found = read(target).match(/20\d{2}\.\d{2}/g) ?? []
    const unknown = [...new Set(found)].filter((ym) => !knownMonths.has(ym))
    expect(
      unknown,
      `facts에 없는 연월 발견 — 드리프트이거나 extraMonths 누락: ${unknown.join(', ')}`,
    ).toEqual([])
  })
})
