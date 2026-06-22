export const TECH_STACK_CATEGORIES = [
  '프론트엔드',
  '상태 API',
  '스타일링',
  '도구',
  '협업',
  '인프라',
  '기타',
]

export const TECH_STACK_WITH_EXPERIENCE = [
  {
    name: 'TypeScript',
    category: '도구',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    description:
      '런타임 에러를 줄이고 API 통신을 안정적으로 다루는 데 씁니다. 도스트11에서 Rails·React 프로젝트의 프론트엔드 타입을 잡고 있습니다.',
    descriptionEn:
      'I use it to cut runtime errors and handle API calls safely. At Dost11 I type the frontend of Rails + React projects.',
  },
  {
    name: 'JavaScript (ES6+)',
    category: '프론트엔드',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    description:
      'ES6+ 문법을 기본으로 프론트엔드 개발에 사용했습니다. CommonJS와 ESM 방식의 설정 파일을 모두 다룰 수 있습니다.',
    descriptionEn:
      'I use ES6+ as my baseline for frontend work, and can handle both CommonJS and ESM config files.',
  },
  {
    name: 'React.js',
    category: '프론트엔드',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    description:
      '도스트11에서 react-on-rails로 카테고리 에디터, 배너 캐러셀, 블로그 CMS, 정산 UI를 개발했습니다. 하이드레이션과 커스텀 훅을 다룹니다.',
    descriptionEn:
      'At Dost11 I built the category editor, banner carousel, blog CMS, and settlement UI with react-on-rails. I work with hydration and custom hooks.',
  },
  {
    name: 'Next.js',
    category: '프론트엔드',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    description:
      'Next API 프록시와 NextAuth 세션으로 민감 정보 노출을 막았습니다. 비개발자가 Notion으로 관리하는 랜딩 페이지를 만들었습니다.',
    descriptionEn:
      'I prevented sensitive-data exposure with a Next API proxy and NextAuth sessions, and built a landing page that non-developers manage through Notion.',
  },
  {
    name: 'HTML5 / CSS3',
    category: '프론트엔드',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    description:
      '시맨틱 마크업으로 LCP를 줄이고, 스크립트 로드 시점을 조절하거나 무한 스크롤의 기준 요소를 잡는 데 사용했습니다.',
    descriptionEn:
      'I use semantic markup to reduce LCP, and to control script load timing or anchor the trigger element for infinite scroll.',
  },
  {
    name: 'Tailwind CSS',
    category: '스타일링',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    description:
      '체인시프트와 도스트11에서 실무로 쓰고 있습니다. 도프켓 랜딩 페이지 리팩토링, 프로필 리디자인, 다크모드 시인성 개선에 사용했습니다.',
    descriptionEn:
      'I use it in production at Chainshift and Dost11 — for the Doppket landing refactor, profile redesign, and dark-mode legibility.',
  },
  {
    name: 'Styled-Components',
    category: '스타일링',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    description: '동적 스타일링을 위해 학습했습니다.',
    descriptionEn: 'I learned it for dynamic styling.',
  },
  {
    name: 'Sass (SCSS)',
    category: '스타일링',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
    description:
      'CSS 가독성을 높여 반응형 웹뷰와 디자인 시스템을 구현하는 데 사용했습니다.',
    descriptionEn:
      'I used it to improve CSS readability when building responsive webviews and design systems.',
  },
  {
    name: 'CSS Module',
    category: '스타일링',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    description:
      '전역 관리 없이 기본 CSS 문법을 그대로 쓸 수 있어 빠른 개발이 필요할 때 선택했습니다.',
    descriptionEn:
      'I chose it when I needed to move fast, since you can use plain CSS syntax without global management.',
  },
  {
    name: 'Tanstack React Query',
    category: '상태 API',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/reactquery.svg',
    description:
      'API 요청의 에러 처리를 공통화하고, isLoading 같은 상태로 로딩을 관리했습니다.',
    descriptionEn:
      'I unified API-request error handling and managed loading with states like isLoading.',
  },
  {
    name: 'Context API',
    category: '상태 API',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    description:
      '공통 Form 컴포넌트에서 <label>의 id 값을 자동으로 생성하는 데 사용했습니다.',
    descriptionEn:
      'I used it to auto-generate <label> id values in a shared Form component.',
  },
  {
    name: 'Zustand',
    category: '상태 API',
    logo: 'https://raw.githubusercontent.com/pmndrs/zustand/main/examples/starter/src/assets/zustand-mascot.svg',
    description: '로그인한 사용자 정보 등 전역 상태 관리에 사용했습니다.',
    descriptionEn: "I used it for global state like the signed-in user's info.",
  },
  {
    name: 'React Hook Form',
    category: '상태 API',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/reacthookform.svg',
    description:
      '조립식 Form 컴포넌트의 타입 정의, 상태 관리, 유효성 검사를 위해 도입했습니다.',
    descriptionEn:
      'I adopted it for the type definitions, state management, and validation of composable Form components.',
  },
  {
    name: 'Axios',
    category: '상태 API',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/axios.svg',
    description:
      'API 호출에 쿠키와 토큰을 붙이기 위해 인터셉터를 사용했고, 응답의 JSON 파싱을 따로 하지 않아도 되는 점도 활용했습니다.',
    descriptionEn:
      'I used interceptors to attach cookies and tokens to API calls, and leaned on its automatic JSON parsing of responses.',
  },
  {
    name: 'Git',
    category: '협업',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    description:
      '리니어 히스토리 컨벤션을 Git Hook으로 지키게 했습니다. 도스트11에서 Overcommit pre-push 훅을 고치며 PR 중심으로 일합니다.',
    descriptionEn:
      'I enforce a linear-history convention with Git hooks. At Dost11 I fixed the Overcommit pre-push hook and work PR-first.',
  },
  {
    name: 'GitHub',
    category: '협업',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    description:
      'GitHub Projects, Discussions를 이용해 회의 시간을 단축했습니다.',
    descriptionEn: 'I cut meeting time using GitHub Projects and Discussions.',
  },
  {
    name: 'ESLint / Stylelint / Prettier / EditorConfig',
    category: '도구',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg',
    description:
      '코드 품질과 스타일을 통일하기 위해 설정했습니다. 설정 파일은 config 디렉터리에 모아 관리합니다.',
    descriptionEn:
      'I set these up to unify code quality and style, with the config files collected in a config directory.',
  },
  {
    name: 'Husky',
    category: '도구',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/git.svg',
    description: 'Git Hook으로 린터, 포매터 적용을 자동화했습니다.',
    descriptionEn: 'I automated linting and formatting via Git hooks.',
  },
  {
    name: 'Figma',
    category: '스타일링',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    description:
      'Adobe XD와 Figma로 프로토타이핑을 할 수 있습니다. 디자인 시스템을 정리하는 데 사용했습니다.',
    descriptionEn:
      'I can prototype with Adobe XD and Figma, and used them to organize design systems.',
  },
  {
    name: 'Vercel',
    category: '인프라',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/vercel.svg',
    description: '자동배포와 PR Checks를 위해 사용했습니다.',
    descriptionEn: 'I use it for automatic deploys and PR Checks.',
  },
  {
    name: 'Netlify',
    category: '인프라',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg',
    description:
      'Vercel을 사용할 수 없는 상황에서 자동배포와 PR Checks를 위해 사용했습니다.',
    descriptionEn:
      "I use it for automatic deploys and PR Checks when Vercel isn't an option.",
  },
  {
    name: 'AWS',
    category: '인프라',
    logo: '/aws-logo.svg',
    description:
      '유지 비용을 낮추려 Amplify로 배포하고 팀에 IAM 계정을 발급했습니다. HTTPS 배포에 Certificate Manager·CloudFront를 썼습니다.',
    descriptionEn:
      'To lower running costs I deployed with Amplify and issued IAM accounts to the team. I used Certificate Manager and CloudFront for HTTPS deploys.',
  },
  {
    name: 'Docker',
    category: '인프라',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    description:
      '도스트11 devcontainer 캐시를 named volume으로 분리해 빌드 오류를 없앴습니다. 로컬 DB·서버 구동과 CI/CD 수정에 활용합니다.',
    descriptionEn:
      'I split the Dost11 devcontainer cache into a named volume to eliminate build errors. I use it to run a local DB/server and to edit CI/CD.',
  },
  {
    name: 'MongoDB / Mongoose',
    category: '인프라',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    description: 'Next.js API 기능을 사용하기 위해 연습했습니다.',
    descriptionEn: 'I practiced with it to learn Next.js API routes.',
  },
  {
    name: 'PostgreSQL',
    category: '인프라',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    description:
      '개발용 DB도 데이터도 없는 상황에서 대시보드를 만들기 위해 DB를 로컬에 띄워 사용했습니다.',
    descriptionEn:
      'I ran a local DB to build a dashboard when there was no dev DB or data.',
  },
  {
    name: 'MySQL',
    category: '인프라',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    description:
      '마케팅/영업을 위한 Grafana 대시보드를 제작하고, 물류 서비스 입출고 메뉴의 QA에 사용했습니다.',
    descriptionEn:
      "I built Grafana dashboards for marketing/sales and used it to QA the logistics service's inbound/outbound menus.",
  },
  {
    name: 'Oracle',
    category: '인프라',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg',
    description:
      '<Do It! 오라클로 배우는 SQL 입문>의 베타 테스터로 참여하며 학습했습니다.',
    descriptionEn:
      'I learned it while beta-testing <Do It! Intro to SQL with Oracle>.',
  },
  {
    name: 'NPM',
    category: '도구',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg',
    description:
      'npm 패키지를 직접 만들어 배포해 봤습니다. 의존성과 패키지 버전을 관리하는 데 쓰고 있습니다.',
    descriptionEn:
      "I've built and published my own npm package, and use it to manage dependencies and package versions.",
  },
  {
    name: 'Jira',
    category: '협업',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg',
    description:
      '실무에서 개발 리소스를 적절히 배분하기 위해 Agile, Sprint, Kanban 개념에 맞춰 5개 서비스의 Jira 프로젝트를 설정하고 운영했습니다.',
    descriptionEn:
      'To allocate dev resources well in practice, I set up and ran Jira projects for five services along Agile, Sprint, and Kanban concepts.',
  },
  {
    name: 'Asana',
    category: '협업',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/asana.svg',
    description: 'Asana에 Slack 연동을 붙여 담당 개발자 멘션을 자동화했습니다.',
    descriptionEn:
      'I wired Slack into Asana to automate mentioning the responsible developer.',
  },
  {
    name: 'Confluence / Notion',
    category: '협업',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/notion.svg',
    description: '공유용 기술 문서 작성 및 자동 알림을 위해 사용했습니다.',
    descriptionEn:
      'I use it to write shared technical docs and send automatic notifications.',
  },
  {
    name: 'Postman',
    category: '협업',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/postman.svg',
    description: 'API 문서 파악 및 API 리퀘스트 디버깅을 위해 사용했습니다.',
    descriptionEn: 'I use it to read API docs and debug requests.',
  },
  {
    name: 'Swagger',
    category: '협업',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/swagger.svg',
    description:
      'API 명세로 협업하며, 인증 요청의 응답을 직접 확인해 DTO 타입과 에러 처리 UI를 설계했습니다.',
    descriptionEn:
      'I collaborate via API specs, and designed DTO types and error-handling UI by checking auth-request responses directly.',
  },
  {
    name: 'Ruby on Rails',
    category: '기타',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-plain.svg',
    description:
      '도스트11에서 풀스택으로 일하며 영수증·거래명세서 Presenter, 카테고리 캐싱, 가격 스냅샷 백필을 RSpec 테스트와 함께 구현했습니다.',
    descriptionEn:
      'Working full-stack at Dost11, I implemented receipt/transaction-statement presenters, category caching, and price-snapshot backfills, with RSpec tests.',
  },
  {
    name: 'Python',
    category: '기타',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    description:
      'AWS S3 프로덕션 데이터로 버그를 재현했습니다. CI Selenium 테스트의 profile 공유 문제를 분리해 해결했습니다.',
    descriptionEn:
      'I reproduced bugs with AWS S3 production data, and isolated and fixed a profile-sharing issue in CI Selenium tests.',
  },
  {
    name: 'Google Analytics',
    category: '기타',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/googleanalytics.svg',
    description: '페이지 통폐합을 위한 프로덕션 조회수 수집에 사용했습니다.',
    descriptionEn:
      'I used it to collect production page views when consolidating pages.',
  },
  {
    name: 'Kakao Developers',
    category: '기타',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/kakao.svg',
    description:
      'OAuth 2.0 로그인과 공유하기 기능에 사용했습니다. 따로 만들어져 있던 카카오 앱 3개를 하나로 통합했습니다.',
    descriptionEn:
      'Used for OAuth 2.0 login and sharing. I merged three separately built Kakao apps into one.',
  },
]
