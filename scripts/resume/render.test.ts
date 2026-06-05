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
