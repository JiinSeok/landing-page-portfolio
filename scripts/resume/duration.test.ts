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
