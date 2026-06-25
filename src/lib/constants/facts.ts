export interface CareerFact {
  org: string
  start: string
  end: string | null
  team?: string
  title?: string
  employmentType?: string
  url?: string
}

export const RESUME_AS_OF = '2026.06'

export const careers = {
  dost11: {
    org: '(주)도스트11',
    start: '2025.09',
    end: null,
    team: 'AI개발팀',
    title: '풀스택 개발자 · 도프켓 서비스 총괄',
    employmentType: '계약직 → 정규직(2026.01 전환)',
    url: 'https://www.dost11.com',
  },
  chainshift: {
    org: '(주)체인시프트',
    start: '2025.04',
    end: '2025.06',
    title: '프론트엔드',
    employmentType: '인턴',
    url: 'https://www.chainshift.co',
  },
  fitogether: {
    org: '주식회사핏투게더',
    start: '2023.08',
    end: '2024.02',
    team: '소프트웨어개발팀',
    title: 'SQA',
    employmentType: '정규직',
    url: 'https://www.fitogether.com',
  },
  mulryu: {
    org: '주식회사물류대장',
    start: '2022.06',
    end: '2023.08',
    team: '플랫폼기획팀',
    title: 'SQA 매니저 · CX 매니저',
    employmentType: '정규직',
    url: 'https://www.ftf.co.kr',
  },
  yonhap: {
    org: '(주)연합뉴스',
    start: '2021.08',
    end: '2022.03',
    team: '출판국 DB센터',
    title: '인물자료 담당',
    employmentType: '계약직',
    url: 'https://www.yna.co.kr',
  },
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
  buildWatchMemory: '118MB → 60MB(49% 절감)',
  albaformSeo: 'Google Lighthouse SEO 100',
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

export interface ProjectFact {
  name: string
  start: string
  end: string | null
  collaboration: string
  npm?: string
  url?: string
}

export const projects = {
  formkit: {
    name: 'formkit-react',
    start: '2025.08',
    end: '2025.08',
    collaboration: '단독',
    npm: '@jiin.seok/formkit-react',
  },
  bodycodi: {
    name: 'bodycodi',
    start: '2025.09',
    end: '2025.09',
    collaboration: '채용 과제',
  },
  albaform: {
    name: 'albaform',
    start: '2024.08',
    end: '2025.01',
    collaboration: '팀',
  },
  openmind: {
    name: '오픈마인드',
    start: '2024.06',
    end: '2024.06',
    collaboration: '팀',
  },
  tappytype: {
    name: 'TappyType',
    start: '2026.05',
    end: null,
    collaboration: '단독',
    url: 'https://tappytype.com',
  },
  portfolio: {
    name: '포트폴리오 사이트',
    start: '2025.05',
    end: null,
    collaboration: '단독',
  },
} satisfies Record<string, ProjectFact>

export interface Milestone {
  month: string
  label: string
  kind: 'education' | 'cert' | 'lang'
  token?: string
}

export const milestones: Milestone[] = [
  { month: '2015.03', label: '연세대학교 신학·문헌정보학 학사', kind: 'education' },
  { month: '2020.09', label: 'TOEIC 765', kind: 'lang' },
  { month: '2021.03', label: 'KBS한국어능력시험 1급', kind: 'lang' },
  { month: '2021.09', label: '2급 정사서', kind: 'cert' },
  {
    month: '2022.04',
    label: '그로우앤베터 CX 101 수료',
    kind: 'education',
    token: '그로우앤베터 CX',
  },
  { month: '2023.08', label: 'ISTQB CTFL · CSTS Foundation', kind: 'cert' },
  {
    month: '2023.10',
    label: '코멘토 QA 테스트 자동화 수료',
    kind: 'education',
    token: '코멘토 테스트 자동화',
  },
  {
    month: '2024.04',
    label: '코드잇 스프린트 프론트엔드 트랙 7기',
    kind: 'education',
    token: '코드잇 스프린트',
  },
  { month: '2024.10', label: '코드잇 스프린트 수료', kind: 'education' },
  {
    month: '2025.02',
    label: '이지스퍼블리싱 Do It! Oracle 교재 베타테스터',
    kind: 'education',
    token: 'Do It! Oracle',
  },
  { month: '2025.07', label: 'TOEIC Speaking IM1', kind: 'lang' },
]

export const langMilestones = milestones.filter((m) => m.kind === 'lang')

export const extraMonths = [
  '2024.06',
  '2024.08',
  '2025.01',
  '2025.05',
  '2025.08',
  '2025.12',
  '2026.04',
  '2026.05',
]
