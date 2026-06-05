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
