# 이력서 SoT 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 사이트와 resume.html이 공유하는 사실(날짜·수치·직함·링크)을 facts.ts 한 곳에 두고, resume.html·resume.pdf를 `pnpm resume` 한 명령으로 재생성하며, Vitest가 드리프트를 막는다.

**Architecture:** facts.ts(데이터) → duration.ts(기간 계산) → values.ts(토큰 맵) → render.ts(치환+prettier) → generate.ts(파일 기록+PDF). 생성물은 커밋하고, sync.test.ts가 ① 재생성 diff ② 사이트 대조 ③ 기간 패턴 스캔으로 강제한다. 스펙: `docs/superpowers/specs/2026-06-05-resume-sot-design.md`

**Tech Stack:** TypeScript, tsx(신규 devDep), prettier 3(기존), Vitest 4(기존), 헤드리스 Chrome(PDF)

**중요 규칙:** 이 프로젝트는 코드 주석 금지. 아래 모든 코드에 주석을 추가하지 말 것. import는 `@/*` 별칭 사용(tsx가 tsconfig paths를 해석함).

---

## 파일 구조

```
src/lib/constants/facts.ts        팩트 데이터(값만, 로직 없음)
scripts/resume/duration.ts        기간 계산 순수 함수
scripts/resume/duration.test.ts
scripts/resume/values.ts          토큰 키 → 문자열 값 맵
scripts/resume/render.ts          치환 엔진 + buildResumeHtml(prettier 포함)
scripts/resume/render.test.ts
scripts/resume/template.html      현 resume.html의 토큰화 사본
scripts/resume/sync.test.ts       재생성 diff·사이트 대조·기간 스캔
scripts/resume/generate.ts        CLI: html 기록 + PDF 생성 + 쪽수 검증
public/resume.html                생성물(커밋, URL 불변)
public/resume.pdf                 생성물(커밋, 신규)
```

---

### Task 1: 도구 설정

**Files:**
- Modify: `package.json` (devDep tsx, scripts.resume)
- Modify: `vitest.config.ts` (include에 scripts 추가)
- Modify: `tsconfig.json` (include에 scripts 추가)

- [ ] **Step 1: tsx 설치**

```bash
pnpm add -D tsx
```

- [ ] **Step 2: package.json scripts에 추가**

`"test": "vitest run",` 줄 아래에:

```json
"resume": "tsx scripts/resume/generate.ts",
```

- [ ] **Step 3: vitest.config.ts include 수정**

```ts
    include: ['src/**/*.test.ts', 'scripts/**/*.test.ts'],
```

- [ ] **Step 4: tsconfig.json include 수정**

기존 배열에 `"scripts/**/*"` 추가:

```json
"include": ["next-env.d.ts", "src/**/*", "scripts/**/*", "postcss.config.js", "next-auth.d.ts", ".next/types/**/*.ts", ".next/dev/types/**/*.ts"],
```

- [ ] **Step 5: 기존 테스트가 여전히 통과하는지 확인**

Run: `npx vitest run`
Expected: 기존 timeline 테스트 10개 PASS

- [ ] **Step 6: Commit**

```bash
git add package.json pnpm-lock.yaml vitest.config.ts tsconfig.json
git commit -m "chore: 이력서 SoT 도구 설정 — tsx·vitest scripts 포함"
```

---

### Task 2: facts.ts — 팩트 데이터

**Files:**
- Create: `src/lib/constants/facts.ts`

- [ ] **Step 1: 파일 작성**

값은 2026-06-05 기준 resume.html·ko.json·canonical-facts 팩트체크와 일치한다. 실행 시점에 두 문서가 이 값과 다르면 **문서가 아니라 이 값이 맞는지 먼저 의심**하고 git log를 확인할 것.

```ts
export interface CareerFact {
  org: string
  start: string
  end: string | null
}

export const RESUME_AS_OF = '2026.06'

export const careers = {
  dost11: { org: '(주)도스트11', start: '2025.09', end: null },
  chainshift: { org: '(주)체인시프트', start: '2025.04', end: '2025.06' },
  fitogether: { org: '주식회사핏투게더', start: '2023.08', end: '2024.02' },
  mulryu: { org: '주식회사물류대장', start: '2022.06', end: '2023.08' },
  yonhap: { org: '(주)연합뉴스', start: '2021.08', end: '2022.03' },
} satisfies Record<string, CareerFact>

export const identity = {
  email: 'seokjiin1073@gmail.com',
  github: 'JiinSeok',
  domain: 'usejiin.link',
}

export const metrics = {
  photoboothDays: '3일',
  errorMsgFiles: '50여 개',
  apiRouteReplace: 'API route 15개를 단일 프록시로 대체',
  landingSpeed: '7일 내 3페이지',
  jiraProjects: '5개',
  responseRate: '30%',
  formReduction: '50% 단축',
  bodycodiUsers: '130만',
  virtualizationThreshold: '50개',
  virtualizationProof: '7,000개',
  albaformTeam: '5인',
  albaformCommitShare: '35%',
  fpp: 'FIFA Preferred Provider(FPP)',
}

export const talks = {
  seo: {
    when: '2026.01',
    url: 'https://www.figma.com/deck/jdocRc3a37rnNsTRm1crbD/SEO-%EC%96%B4%EB%94%94%EA%B9%8C%EC%A7%80-%ED%95%B4%EB%B4%A4%EB%8B%88?node-id=45-555&t=H46fXS3tDDZMhydQ-1',
  },
  cx: {
    when: '2025.11',
    url: 'https://www.figma.com/deck/94YP5c4rzlblr5exuS1ZKR/%EC%84%9C%EB%B9%84%EC%8A%A4%EC%A7%81%EC%9C%BC%EB%A1%9C%EC%84%9C%EC%9D%98-%EA%B0%9C%EB%B0%9C%EC%9E%90--%EB%B3%B5%EC%82%AC-?node-id=1-101&t=oEqxpmYisTFTWX0r-1',
  },
}

export const projects = {
  formkitNpm: '@jiin.seok/formkit-react',
}

export const extraMonths = [
  '2020.09',
  '2021.07',
  '2022.04',
  '2023.10',
  '2024.04',
  '2024.08',
  '2024.10',
  '2025.01',
  '2025.05',
  '2025.08',
  '2026.04',
  '2026.05',
]
```

`extraMonths`는 기간 스캔 화이트리스트 보충분 — 사이트의 교육/프로젝트 시기 중 facts 본문에 구조화되지 않은 월. Task 7에서 스캔이 실패하면 누락 월을 여기 추가하되, **resume.html·careers·talks에서 나온 월은 추가 금지**(그건 진짜 드리프트).

- [ ] **Step 2: 타입체크**

Run: `npx tsc --noEmit`
Expected: 에러 0

- [ ] **Step 3: Commit**

```bash
git add src/lib/constants/facts.ts
git commit -m "feat: 이력서 SoT 팩트 저장소 facts.ts"
```

---

### Task 3: duration.ts — 기간 계산 (TDD)

**Files:**
- Create: `scripts/resume/duration.test.ts`
- Create: `scripts/resume/duration.ts`

- [ ] **Step 1: 실패하는 테스트 작성**

`scripts/resume/duration.test.ts`:

```ts
import { describe, expect, it } from 'vitest'

import { careers, RESUME_AS_OF } from '@/lib/constants/facts'
import {
  careerMonths,
  durationLabel,
  totalCareerLabel,
  whenLabel,
} from './duration'

describe('careerMonths', () => {
  it('양끝 달을 포함해 센다', () => {
    expect(careerMonths(careers.yonhap, RESUME_AS_OF)).toBe(8)
    expect(careerMonths(careers.mulryu, RESUME_AS_OF)).toBe(15)
    expect(careerMonths(careers.fitogether, RESUME_AS_OF)).toBe(7)
    expect(careerMonths(careers.chainshift, RESUME_AS_OF)).toBe(3)
  })

  it('재직 중이면 asOf까지 센다', () => {
    expect(careerMonths(careers.dost11, RESUME_AS_OF)).toBe(10)
  })
})

describe('durationLabel', () => {
  it('년·개월로 표기한다', () => {
    expect(durationLabel(8)).toBe('8개월')
    expect(durationLabel(12)).toBe('1년')
    expect(durationLabel(15)).toBe('1년 3개월')
    expect(durationLabel(43)).toBe('3년 7개월')
  })
})

describe('whenLabel', () => {
  it('이력서 when 형식으로 만든다', () => {
    expect(whenLabel(careers.chainshift, RESUME_AS_OF)).toBe(
      '2025.04 ~ 2025.06 · 3개월',
    )
    expect(whenLabel(careers.mulryu, RESUME_AS_OF)).toBe(
      '2022.06 ~ 2023.08 · 1년 3개월',
    )
  })
})

describe('totalCareerLabel', () => {
  it('전 경력 합산은 3년 7개월이다', () => {
    expect(totalCareerLabel(Object.values(careers), RESUME_AS_OF)).toBe(
      '3년 7개월',
    )
  })
})
```

- [ ] **Step 2: 실패 확인**

Run: `npx vitest run scripts/resume/duration.test.ts`
Expected: FAIL — `Cannot find module './duration'`

- [ ] **Step 3: 구현**

`scripts/resume/duration.ts`:

```ts
import { type CareerFact } from '@/lib/constants/facts'

function monthIndex(ym: string): number {
  const [y, m] = ym.split('.').map(Number)
  return y * 12 + (m - 1)
}

export function careerMonths(career: CareerFact, asOf: string): number {
  return monthIndex(career.end ?? asOf) - monthIndex(career.start) + 1
}

export function durationLabel(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  if (years === 0) return `${months}개월`
  if (months === 0) return `${years}년`
  return `${years}년 ${months}개월`
}

export function whenLabel(career: CareerFact, asOf: string): string {
  const end = career.end ?? '재직 중'
  return `${career.start} ~ ${end} · ${durationLabel(careerMonths(career, asOf))}`
}

export function totalCareerLabel(list: CareerFact[], asOf: string): string {
  const total = list.reduce((sum, c) => sum + careerMonths(c, asOf), 0)
  return durationLabel(total)
}
```

- [ ] **Step 4: 통과 확인**

Run: `npx vitest run scripts/resume/duration.test.ts`
Expected: PASS (4 describe, 전부 녹색)

- [ ] **Step 5: Commit**

```bash
git add scripts/resume/duration.ts scripts/resume/duration.test.ts
git commit -m "feat: 이력서 기간 계산 duration.ts — asOf 기준 파생값"
```

---

### Task 4: render.ts + values.ts — 치환 엔진 (TDD)

**Files:**
- Create: `scripts/resume/render.test.ts`
- Create: `scripts/resume/render.ts`
- Create: `scripts/resume/values.ts`

- [ ] **Step 1: 실패하는 테스트 작성**

`scripts/resume/render.test.ts`:

```ts
import { describe, expect, it } from 'vitest'

import { renderTemplate } from './render'
import { resumeValues } from './values'

describe('renderTemplate', () => {
  it('토큰을 값으로 치환한다', () => {
    expect(renderTemplate('a {{x}} b', { x: '1' })).toBe('a 1 b')
  })

  it('정의되지 않은 토큰이면 던진다', () => {
    expect(() => renderTemplate('{{nope}}', {})).toThrow(/nope/)
  })

  it('치환되지 않은 여는 중괄호가 남으면 던진다', () => {
    expect(() => renderTemplate('broken {{', {})).toThrow(/잔존/)
  })
})

describe('resumeValues', () => {
  it('핵심 토큰 키를 모두 제공한다', () => {
    const values = resumeValues()
    expect(values['identity.email']).toBe('seokjiin1073@gmail.com')
    expect(values['when.dost11.months']).toBe('10개월')
    expect(values['when.chainshift']).toBe('2025.04 ~ 2025.06 · 3개월')
    expect(values['computed.totalCareer']).toBe('3년 7개월')
    expect(values['metrics.albaformCommitShare']).toBe('35%')
  })
})
```

- [ ] **Step 2: 실패 확인**

Run: `npx vitest run scripts/resume/render.test.ts`
Expected: FAIL — 모듈 없음

- [ ] **Step 3: render.ts 구현**

```ts
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import prettier from 'prettier'

import { resumeValues } from './values'

const TOKEN_PATTERN = /\{\{\s*([\w.]+)\s*\}\}/g

export const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
)

export function renderTemplate(
  template: string,
  values: Record<string, string>,
): string {
  const out = template.replace(TOKEN_PATTERN, (_, key: string) => {
    const value = values[key]
    if (value === undefined) throw new Error(`정의되지 않은 토큰: ${key}`)
    return value
  })
  if (out.includes('{{')) throw new Error('치환되지 않은 토큰 잔존')
  return out
}

export async function buildResumeHtml(): Promise<string> {
  const template = readFileSync(
    path.join(ROOT, 'scripts/resume/template.html'),
    'utf8',
  )
  const html = renderTemplate(template, resumeValues())
  const config = await prettier.resolveConfig(
    path.join(ROOT, 'public/resume.html'),
  )
  return prettier.format(html, { ...config, parser: 'html' })
}
```

- [ ] **Step 4: values.ts 구현**

```ts
import {
  careers,
  identity,
  metrics,
  projects,
  RESUME_AS_OF,
  talks,
} from '@/lib/constants/facts'

import {
  careerMonths,
  durationLabel,
  totalCareerLabel,
  whenLabel,
} from './duration'

export function resumeValues(): Record<string, string> {
  return {
    'identity.email': identity.email,
    'identity.github': identity.github,
    'identity.domain': identity.domain,
    'careers.dost11.start': careers.dost11.start,
    'when.dost11.months': durationLabel(
      careerMonths(careers.dost11, RESUME_AS_OF),
    ),
    'when.chainshift': whenLabel(careers.chainshift, RESUME_AS_OF),
    'when.fitogether': whenLabel(careers.fitogether, RESUME_AS_OF),
    'when.mulryu': whenLabel(careers.mulryu, RESUME_AS_OF),
    'when.yonhap': whenLabel(careers.yonhap, RESUME_AS_OF),
    'computed.totalCareer': totalCareerLabel(
      Object.values(careers),
      RESUME_AS_OF,
    ),
    'metrics.photoboothDays': metrics.photoboothDays,
    'metrics.errorMsgFiles': metrics.errorMsgFiles,
    'metrics.apiRouteReplace': metrics.apiRouteReplace,
    'metrics.landingSpeed': metrics.landingSpeed,
    'metrics.jiraProjects': metrics.jiraProjects,
    'metrics.responseRate': metrics.responseRate,
    'metrics.formReduction': metrics.formReduction,
    'metrics.bodycodiUsers': metrics.bodycodiUsers,
    'metrics.virtualizationThreshold': metrics.virtualizationThreshold,
    'metrics.virtualizationProof': metrics.virtualizationProof,
    'metrics.albaformTeam': metrics.albaformTeam,
    'metrics.albaformCommitShare': metrics.albaformCommitShare,
    'metrics.fpp': metrics.fpp,
    'talks.seo.when': talks.seo.when,
    'talks.seo.url': talks.seo.url,
    'talks.cx.when': talks.cx.when,
    'talks.cx.url': talks.cx.url,
    'projects.formkit.npm': projects.formkitNpm,
  }
}
```

- [ ] **Step 5: 통과 확인**

Run: `npx vitest run scripts/resume/render.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add scripts/resume/render.ts scripts/resume/values.ts scripts/resume/render.test.ts
git commit -m "feat: 이력서 템플릿 치환 엔진 render·values"
```

---

### Task 5: template.html 토큰화 + 재생성 diff 테스트 (TDD)

**Files:**
- Create: `scripts/resume/sync.test.ts` (테스트 1만)
- Create: `scripts/resume/template.html`

- [ ] **Step 1: 실패하는 테스트 작성**

`scripts/resume/sync.test.ts`:

```ts
import { readFileSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import { buildResumeHtml, ROOT } from './render'

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
```

- [ ] **Step 2: 실패 확인**

Run: `npx vitest run scripts/resume/sync.test.ts`
Expected: FAIL — template.html 없음

- [ ] **Step 3: 템플릿 생성**

```bash
cp public/resume.html scripts/resume/template.html
```

- [ ] **Step 4: 토큰화 — 아래 표를 위에서부터 순서대로 적용**

전부 `scripts/resume/template.html` 대상. Edit 도구의 replace_all로 적용하되, ⚠️ 표시 행은 순서가 중요하다(긴 문자열을 먼저 치환해야 부분 문자열 오염이 없음). 줄바꿈이 끼어 한 번에 못 잡는 행은 prettier가 어차피 재포맷하므로 해당 부분을 한 줄로 합친 뒤 치환해도 된다.

| # | 찾기 (replace_all) | 바꾸기 |
|---|---|---|
| 1 | `seokjiin1073@gmail.com` | `{{identity.email}}` |
| 2 | `github.com/JiinSeok` | `github.com/{{identity.github}}` |
| 3 | `usejiin.link` | `{{identity.domain}}` |
| 4 | `@jiin.seok/formkit-react` | `{{projects.formkit.npm}}` |
| 5 ⚠️ | `2025.09 ~ <span class="live-dot"></span>재직 중 ·` 와 다음 줄 `10개월` (한 덩어리로) | `{{careers.dost11.start}} ~ <span class="live-dot"></span>재직 중 · {{when.dost11.months}}` |
| 6 | `2025.04 ~ 2025.06 · 3개월` | `{{when.chainshift}}` |
| 7 | `2023.08 ~ 2024.02 · 7개월` | `{{when.fitogether}}` |
| 8 | `2022.06 ~ 2023.08 · 1년 3개월` | `{{when.mulryu}}` |
| 9 | `2021.08 ~ 2022.03 · 8개월` | `{{when.yonhap}}` |
| 10 | `총 3년 7개월` | `총 {{computed.totalCareer}}` |
| 11 | `3일 만에` | `{{metrics.photoboothDays}} 만에` |
| 12 | `백엔드 파일 50여 개에` | `백엔드 파일 {{metrics.errorMsgFiles}}에` |
| 13 ⚠️ | `API route 15개를` + 줄바꿈 + `단일 프록시로 대체` (한 덩어리로) | `{{metrics.apiRouteReplace}}` |
| 14 | `7일 내 3페이지` | `{{metrics.landingSpeed}}` |
| 15 | `5개 프로덕트별` | `{{metrics.jiraProjects}} 프로덕트별` |
| 16 | `(50% 단축)` | `({{metrics.formReduction}})` |
| 17 | `응답률을 30% 높였습니다` | `응답률을 {{metrics.responseRate}} 높였습니다` |
| 18 | `130만` | `{{metrics.bodycodiUsers}}` |
| 19 | `50개 임계` | `{{metrics.virtualizationThreshold}} 임계` |
| 20 | `7,000개` | `{{metrics.virtualizationProof}}` |
| 21 ⚠️ | `5인 팀 내 최다 수준 기여(GitHub Insights 기준 커밋 35%)` | `{{metrics.albaformTeam}} 팀 내 최다 수준 기여(GitHub Insights 기준 커밋 {{metrics.albaformCommitShare}})` |
| 22 | `FIFA Preferred Provider(FPP)` | `{{metrics.fpp}}` |
| 23 | `(2026.01)` | `({{talks.seo.when}})` |
| 24 | `(2025.11, 도스트11 데브 미팅)` | `({{talks.cx.when}}, 도스트11 데브 미팅)` |
| 25 | Task 2 facts.ts의 `talks.seo.url` 값과 글자 단위로 동일한 href 문자열 (`https://www.figma.com/deck/jdocRc3a37rnNsTRm1crbD/...`) | `{{talks.seo.url}}` |
| 26 | Task 2 facts.ts의 `talks.cx.url` 값과 글자 단위로 동일한 href 문자열 (`https://www.figma.com/deck/94YP5c4rzlblr5exuS1ZKR/...`) | `{{talks.cx.url}}` |

치환 후 점검: `grep -c '{{' scripts/resume/template.html` 이 0보다 크고, `grep -n '2025\.09\|3년 7개월\|seokjiin1073' scripts/resume/template.html` 이 아무것도 안 나와야 한다(전부 토큰으로 대체됨).

주의: #3(domain)은 Figma URL 안에는 없고, `albaform.usejiin.link` → `albaform.{{identity.domain}}` 으로 바뀌는 것이 정상. #23·#24는 발표 줄 외 다른 위치에 같은 패턴이 없는지 `grep -n '(2026\.01)\|(2025\.11' ` 로 먼저 확인.

- [ ] **Step 5: 통과할 때까지 반복**

Run: `npx vitest run scripts/resume/sync.test.ts`
Expected: PASS. 실패하면 vitest의 문자열 diff가 어긋난 지점을 보여줌 — 토큰 값 또는 치환 누락을 수정. **public/resume.html은 이 Task에서 절대 건드리지 않는다** (기존 파일과의 동일성이 토큰화 정확성의 증명).

- [ ] **Step 6: Commit**

```bash
git add scripts/resume/template.html scripts/resume/sync.test.ts
git commit -m "feat: 이력서 템플릿 토큰화 + 재생성 diff 테스트"
```

---

### Task 6: generate.ts — 생성 CLI + PDF

**Files:**
- Create: `scripts/resume/generate.ts`

- [ ] **Step 1: 구현**

```ts
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import { buildResumeHtml, ROOT } from './render'

const EXPECTED_PDF_PAGES = 4
const CHROME_PATH =
  process.env.CHROME_PATH ??
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

function pdfPageCount(filePath: string): number {
  const raw = readFileSync(filePath).toString('latin1')
  const match = /\/Count (\d+)/.exec(raw)
  if (!match) throw new Error('PDF 쪽수를 읽지 못함')
  return Number(match[1])
}

async function main() {
  const htmlPath = path.join(ROOT, 'public/resume.html')
  const pdfPath = path.join(ROOT, 'public/resume.pdf')

  writeFileSync(htmlPath, await buildResumeHtml())
  console.log(`기록: ${htmlPath}`)

  if (!existsSync(CHROME_PATH)) {
    throw new Error(
      `Chrome을 찾지 못함: ${CHROME_PATH} — CHROME_PATH 환경변수로 지정할 것`,
    )
  }
  execFileSync(CHROME_PATH, [
    '--headless',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--print-to-pdf=${pdfPath}`,
    `file://${htmlPath}`,
  ])

  const pages = pdfPageCount(pdfPath)
  if (pages !== EXPECTED_PDF_PAGES) {
    unlinkSync(pdfPath)
    throw new Error(
      `PDF가 ${pages}쪽 — 기대 ${EXPECTED_PDF_PAGES}쪽. 콘텐츠를 줄이거나 의도된 변경이면 EXPECTED_PDF_PAGES를 갱신할 것`,
    )
  }
  console.log(`기록: ${pdfPath} (${pages}쪽)`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
```

- [ ] **Step 2: 실행 — resume.html 무변경 확인**

Run: `pnpm resume`
Expected: 두 줄 출력(`기록: .../resume.html`, `기록: .../resume.pdf (4쪽)`), 그리고

Run: `git diff --stat public/resume.html`
Expected: 변경 없음(빈 출력). 변경이 있다면 Task 5의 토큰화가 불완전한 것 — 테스트가 통과하는데 diff가 생기면 prettier 설정 경로 문제이니 `prettier.resolveConfig` 인자를 확인.

- [ ] **Step 3: 전체 테스트**

Run: `npx vitest run`
Expected: 전부 PASS

- [ ] **Step 4: Commit (PDF 포함)**

```bash
git add scripts/resume/generate.ts public/resume.pdf
git commit -m "feat: pnpm resume — resume.html·PDF 생성 CLI (쪽수 4 검증)"
```

---

### Task 7: 사이트 대조 + 기간 스캔 테스트 (TDD)

**Files:**
- Modify: `scripts/resume/sync.test.ts` (테스트 2·3 추가)

- [ ] **Step 1: 테스트 추가**

`sync.test.ts`의 기존 import 아래·describe 위에 헬퍼, 그리고 describe 2개 추가:

```ts
import {
  careers,
  extraMonths,
  metrics,
  RESUME_AS_OF,
  talks,
} from '@/lib/constants/facts'

const read = (relative: string) =>
  readFileSync(path.join(ROOT, relative), 'utf8')

describe('사이트 대조', () => {
  const koJson = read('src/lib/constants/locales/ko.json')
  const projectEntry = read('src/components/sections/ProjectEntry.tsx')

  it('ko.json의 경력 기간이 facts와 일치한다', () => {
    for (const career of Object.values(careers)) {
      expect(koJson).toContain(`${career.start} ~ ${career.end ?? '현재'}`)
    }
  })

  it('ko.json의 핵심 수치가 facts와 일치한다', () => {
    expect(koJson).toContain(`응답률 ${metrics.responseRate}`)
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
```

- [ ] **Step 2: 실행 — 실패 내역 검토**

Run: `npx vitest run scripts/resume/sync.test.ts`

실패가 나오면 종류별 대응:
- **사이트 대조 실패**: ko.json·ProjectEntry가 facts와 다른 표현을 쓰는 경우. 어느 쪽이 사실인지 canonical-facts 메모리·git log로 판정 후, 틀린 쪽을 고친다. 사이트 문구를 고치면 사이트 화면이 바뀌므로 변경 내용을 커밋 메시지에 명시.
- **기간 스캔 실패**: unknown 목록의 연월이 ① 사이트 교육/프로젝트 시기면 facts.extraMonths에 추가 ② 경력·발표 시기면 진짜 드리프트이므로 문서를 고침.

- [ ] **Step 3: 전체 통과 확인**

Run: `npx vitest run`
Expected: 전부 PASS

- [ ] **Step 4: Commit**

```bash
git add scripts/resume/sync.test.ts src/lib/constants/facts.ts
git commit -m "test: 이력서-사이트 동기화 테스트 — 대조·기간 스캔"
```

(Step 2에서 사이트 파일을 고쳤다면 해당 파일도 같은 커밋에 명시적으로 add — 단 병렬 세션 변경분이 섞이지 않게 `git add -p` 또는 파일 단위로.)

---

### Task 8: 최종 검증

- [ ] **Step 1: 전체 게이트**

```bash
npx tsc --noEmit && npx vitest run && npx prettier --check public/resume.html scripts/resume/template.html
```

Expected: 모두 통과

- [ ] **Step 2: 생성물 사실 검수**

`public/resume.html`을 브라우저로 열어 헤더 연락처·경력 기간·총 경력·발표 줄이 기존과 동일하게 보이는지 확인. `git log --oneline -8`로 커밋 단위가 Task별로 쪼개져 있는지 확인.

- [ ] **Step 3: 보고**

푸시는 하지 않고 사용자에게 결과 보고 (병렬 세션 협업 규칙 — main 푸시는 사용자 지시 시).
