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
  albaformDuration: '4주',
  fpp: 'FIFA Preferred Provider(FPP)',
  settlementTickets: '30건',
  buildCold: '18.0초 → 8.3초(53% 단축)',
  buildDevStart: '14.1초 → 10.0초(29% 단축)',
  most267Lighthouse: '성능 84→91 · 접근성 83→96 · 모범사례 92→100',
  most267Lcp: 'LCP 2.8초 → 1.5초(약 46% 단축)',
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
  '2015.03',
  '2020.09',
  '2021.03',
  '2021.07',
  '2021.09',
  '2022.04',
  '2023.10',
  '2024.04',
  '2024.08',
  '2024.10',
  '2025.01',
  '2025.02',
  '2025.05',
  '2025.07',
  '2025.08',
  '2026.04',
  '2026.05',
]
