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
