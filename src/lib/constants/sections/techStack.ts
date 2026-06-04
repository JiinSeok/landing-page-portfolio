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
      '런타임 에러를 줄이고 API 통신을 안정적으로 다루기 위해 사용했습니다. 도스트11에서 Rails와 React를 함께 쓰는 프로젝트의 프론트엔드 타입을 잡는 데 쓰고 있습니다.',
  },
  {
    name: 'JavaScript (ES6+)',
    category: '프론트엔드',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    description:
      'ES6+ 문법을 기본으로 프론트엔드 개발에 사용했습니다. CommonJS와 ESM 방식의 설정 파일을 모두 다룰 수 있습니다.',
  },
  {
    name: 'React.js',
    category: '프론트엔드',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    description:
      '도스트11에서 react-on-rails 기반으로 도프켓의 카테고리 트리, 캐러셀, 블로그 CMS 같은 컴포넌트를 개발하고 있습니다. 하이드레이션, 커스텀 훅, Context API를 실무에서 다루고 있습니다.',
  },
  {
    name: 'Next.js',
    category: '프론트엔드',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    description:
      'Next API를 프록시로, NextAuth 세션을 인증 수단으로 두어 민감 정보가 브라우저에 노출되지 않도록 했습니다. SEO와 성능을 위해 서버사이드 렌더링, 정적 사이트 생성, 앱 라우터 레이아웃을 사용했습니다.',
  },
  {
    name: 'HTML5 / CSS3',
    category: '프론트엔드',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    description:
      '시맨틱 마크업으로 LCP를 줄이고, 스크립트 로드 시점을 조절하거나 무한 스크롤의 기준 요소를 잡는 데 사용했습니다.',
  },
  {
    name: 'Tailwind CSS',
    category: '스타일링',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    description:
      '체인시프트와 도스트11에서 실무로 쓰고 있습니다. 도프켓 랜딩 페이지 리팩토링, 프로필 리디자인, 다크모드 시인성 개선에 사용했습니다.',
  },
  {
    name: 'Styled-Components',
    category: '스타일링',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    description: '동적 스타일링을 위해 학습했습니다.',
  },
  {
    name: 'Sass (SCSS)',
    category: '스타일링',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
    description:
      'CSS 가독성을 높여 반응형 웹뷰와 디자인 시스템을 구현하는 데 사용했습니다.',
  },
  {
    name: 'CSS Module',
    category: '스타일링',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    description:
      '전역 관리 없이 기본 CSS 문법을 그대로 쓸 수 있어 빠른 개발이 필요할 때 선택했습니다.',
  },
  {
    name: 'Tanstack React Query',
    category: '상태 API',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/reactquery.svg',
    description:
      'API 요청의 에러 처리를 공통화하고, isLoading 같은 상태로 로딩을 관리했습니다.',
  },
  {
    name: 'Context API',
    category: '상태 API',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    description:
      '공통 Form 컴포넌트에서 <label>의 id 값을 자동으로 생성하는 데 사용했습니다.',
  },
  {
    name: 'Zustand',
    category: '상태 API',
    logo: 'https://raw.githubusercontent.com/pmndrs/zustand/main/examples/starter/src/assets/zustand-mascot.svg',
    description: '로그인한 사용자 정보 등 전역 상태 관리에 사용했습니다.',
  },
  {
    name: 'React Hook Form',
    category: '상태 API',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/reacthookform.svg',
    description:
      '조립식 Form 컴포넌트의 타입 정의, 상태 관리, 유효성 검사를 위해 도입했습니다.',
  },
  {
    name: 'Axios',
    category: '상태 API',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/axios.svg',
    description:
      'API 호출에 쿠키와 토큰을 붙이기 위해 인터셉터를 사용했고, 응답의 JSON 파싱을 따로 하지 않아도 되는 점도 활용했습니다.',
  },
  {
    name: 'Git',
    category: '협업',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    description:
      '리니어 히스토리 컨벤션을 정하고 Git Hook으로 지키도록 했습니다. 도스트11에서는 Overcommit 기반 Git Hook과 PR 중심 워크플로를 쓰고 있습니다.',
  },
  {
    name: 'GitHub',
    category: '협업',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    description:
      'GitHub Projects, Discussions를 이용해 회의 시간을 단축했습니다.',
  },
  {
    name: 'ESlint / Stylelint / Prettier / EditorConfig',
    category: '도구',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg',
    description:
      '코드 품질과 스타일을 통일하기 위해 설정했습니다. 관리하기 쉽도록 설정 파일은 config 디렉터리에 모으고 ignore 파일은 따로 두지 않았습니다.',
  },
  {
    name: 'Husky',
    category: '도구',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/git.svg',
    description: 'Git Hook으로 린터, 포매터 적용을 자동화했습니다.',
  },
  {
    name: 'Figma',
    category: '스타일링',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    description:
      'Adobe XD와 Figma로 프로토타이핑을 할 수 있습니다. 디자인 시스템을 정리하는 데 사용했습니다.',
  },
  {
    name: 'Vercel',
    category: '인프라',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/vercel.svg',
    description: '자동배포와 PR Checks를 위해 사용했습니다.',
  },
  {
    name: 'Netlify',
    category: '인프라',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg',
    description:
      'Vercel을 사용할 수 없는 상황에서 자동배포와 PR Checks를 위해 사용했습니다.',
  },
  {
    name: 'AWS',
    category: '인프라',
    logo: '/aws-logo.svg',
    description:
      '유지 비용을 낮추기 위해 Amplify로 배포하고 팀에 IAM 계정을 발급했습니다. HTTPS 배포에는 Certificate Manager와 CloudFront를 사용했습니다.',
  },
  {
    name: 'Docker',
    category: '인프라',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    description:
      '도스트11에서 devcontainer로 개발 환경을 구성하고 있습니다. 로컬 DB·서버 구동, CI/CD 스크립트 수정에도 활용했습니다.',
  },
  {
    name: 'MongoDB / Mongoose',
    category: '인프라',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    description: 'Next.js API 기능을 사용하기 위해 연습했습니다.',
  },
  {
    name: 'PostgreSQL',
    category: '인프라',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    description:
      '개발용 DB도 데이터도 없는 상황에서 대시보드를 만들기 위해 DB를 로컬에 띄워 사용했습니다.',
  },
  {
    name: 'mySQL',
    category: '인프라',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    description:
      '마케팅/영업을 위한 Grafana 대시보드를 제작하고, 물류 서비스 입출고 메뉴의 QA에 사용했습니다.',
  },
  {
    name: 'Oracle',
    category: '인프라',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg',
    description:
      '<Do It! 오라클로 배우는 SQL 입문>의 베타 테스터로 참여하며 학습했습니다.',
  },
  {
    name: 'NPM',
    category: '도구',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg',
    description:
      'npm 패키지를 직접 만들어 배포해 봤습니다. 의존성과 패키지 버전을 관리하는 데 쓰고 있습니다.',
  },
  {
    name: 'Jira',
    category: '협업',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg',
    description:
      '실무에서 개발 리소스를 적절히 배분하기 위해 Agile, Sprint, Kanban 개념에 맞춰 5개 서비스의 Jira 프로젝트를 설정하고 운영했습니다.',
  },
  {
    name: 'Asana',
    category: '협업',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/asana.svg',
    description: 'Asana에 Slack 연동을 붙여 담당 개발자 멘션을 자동화했습니다.',
  },
  {
    name: 'Confluence / Notion',
    category: '협업',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/notion.svg',
    description: '공유용 기술 문서 작성 및 자동 알림을 위해 사용했습니다.',
  },
  {
    name: 'Postman',
    category: '협업',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/postman.svg',
    description: 'API 문서 파악 및 API 리퀘스트 디버깅을 위해 사용했습니다.',
  },
  {
    name: 'Swagger',
    category: '협업',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/swagger.svg',
    description:
      'API 명세를 주고받으며 협업하는 데 사용했습니다. 인증이 필요한 요청으로 응답을 직접 받아 보고, DTO에 맞는 타입을 만들거나 에러 처리 UI를 설계했습니다.',
  },
  {
    name: 'Ruby on Rails',
    category: '기타',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-plain.svg',
    description:
      '프론트엔드만 배운 상태에서 도스트11에 입사해 Rails를 처음 접했습니다. Presenter, Worker, 메일러 수정 등 필요한 부분을 하나씩 익히며 적응 중입니다. 아직 배우는 단계지만, Taxonomy 트리 빌드나 캐시 만료 설정 같은 백엔드 로직도 직접 구현해 봤습니다.',
  },
  {
    name: 'Python',
    category: '기타',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    description:
      'AWS S3의 프로덕션 데이터를 가져와 버그를 재현하고 파악할 때 사용했습니다. 반복적인 UI 테스트를 자동화하기 위해 Selenium과 Pyautogui를 학습했습니다.',
  },
  {
    name: 'Google Analytics',
    category: '기타',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/googleanalytics.svg',
    description: '페이지 통폐합을 위한 프로덕션 조회수 수집에 사용했습니다.',
  },
  {
    name: 'Kakao Developers',
    category: '기타',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/kakao.svg',
    description:
      'OAuth 2.0 로그인과 공유하기 기능에 사용했습니다. 따로 만들어져 있던 카카오 앱 3개를 하나로 통합했습니다.',
  },
]
