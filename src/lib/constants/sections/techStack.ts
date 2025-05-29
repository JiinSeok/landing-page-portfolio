/**
 * Tech Stack Constants
 *
 * This file contains constants related to tech stack used throughout the portfolio site.
 * Updated based on the accurate information from usejiinlanding/notion/
 */

// Tech skills with percentages
export const TECH_SKILLS = [
  {
    name: 'tech-stack.skills.typescript',
    percentage: 95,
    colorClass: 'bg-chart-1',
  },
  {
    name: 'tech-stack.skills.react',
    percentage: 90,
    colorClass: 'bg-chart-3',
  },
  {
    name: 'tech-stack.skills.nextjs',
    percentage: 85,
    colorClass: 'bg-chart-4',
  },
  {
    name: 'tech-stack.skills.javascript',
    percentage: 90,
    colorClass: 'bg-chart-2',
  },
  {
    name: 'tech-stack.skills.html-css',
    percentage: 85,
    colorClass: 'bg-chart-1',
  },
  {
    name: 'tech-stack.skills.tailwind',
    percentage: 80,
    colorClass: 'bg-chart-3',
  },
  {
    name: 'tech-stack.skills.styled-components',
    percentage: 85,
    colorClass: 'bg-chart-4',
  },
  {
    name: 'tech-stack.skills.sass',
    percentage: 75,
    colorClass: 'bg-chart-2',
  },
  {
    name: 'tech-stack.skills.css-module',
    percentage: 80,
    colorClass: 'bg-chart-1',
  },
  {
    name: 'tech-stack.skills.react-query',
    percentage: 85,
    colorClass: 'bg-chart-3',
  },
  {
    name: 'tech-stack.skills.context-api',
    percentage: 90,
    colorClass: 'bg-chart-4',
  },
  {
    name: 'tech-stack.skills.zustand',
    percentage: 80,
    colorClass: 'bg-chart-2',
  },
  {
    name: 'tech-stack.skills.react-hook-form',
    percentage: 85,
    colorClass: 'bg-chart-1',
  },
  {
    name: 'tech-stack.skills.axios',
    percentage: 90,
    colorClass: 'bg-chart-3',
  },
  {
    name: 'tech-stack.skills.git',
    percentage: 85,
    colorClass: 'bg-chart-4',
  },
  {
    name: 'tech-stack.skills.github',
    percentage: 85,
    colorClass: 'bg-chart-2',
  },
  {
    name: 'tech-stack.skills.eslint-prettier',
    percentage: 80,
    colorClass: 'bg-chart-1',
  },
  {
    name: 'tech-stack.skills.husky',
    percentage: 75,
    colorClass: 'bg-chart-3',
  },
  {
    name: 'tech-stack.skills.figma',
    percentage: 70,
    colorClass: 'bg-chart-4',
  },
  {
    name: 'tech-stack.skills.vercel',
    percentage: 80,
    colorClass: 'bg-chart-2',
  },
  {
    name: 'tech-stack.skills.netlify',
    percentage: 75,
    colorClass: 'bg-chart-1',
  },
]

// Tech stack categories
export const TECH_STACK_CATEGORIES = [
  '프론트엔드',
  '상태 API',
  '스타일링',
  '도구',
  '협업',
  '인프라',
  '기타',
]

// Tech stack with experience
export const TECH_STACK_WITH_EXPERIENCE = [
  {
    name: 'TypeScript',
    category: '도구',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    experience: '런타임 에러 방지와 API 통신의 안정성을 위해 사용했습니다.',
    description: '런타임 에러 방지와 API 통신의 안정성을 위해 사용했습니다.',
    projects: [],
  },
  {
    name: 'JavaScript (ES6+)',
    category: '프론트엔드',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    experience:
      '동적인 프론트엔드 개발을 위해 ES6+ 이상의 최신 EcmaScript를 사용했습니다. CommonJS와 ESM을 사용하는 설정 파일을 다룰 수 있습니다.',
    description:
      '동적인 프론트엔드 개발을 위해 ES6+ 이상의 최신 EcmaScript를 사용했습니다. CommonJS와 ESM을 사용하는 설정 파일을 다룰 수 있습니다.',
    projects: [],
  },
  {
    name: 'React.js',
    category: '프론트엔드',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    experience:
      '리액트 동작 원리의 하이드레이션을 조절하기 위해 여러 훅을 사용했습니다. 라이브러리 코드로 TypeScript와의 조합 원리를 파악했습니다.',
    description:
      '리액트 동작 원리의 하이드레이션을 조절하기 위해 여러 훅을 사용했습니다. 라이브러리 코드로 TypeScript와의 조합 원리를 파악했습니다.',
    projects: [],
  },
  {
    name: 'Next.js',
    category: '프론트엔드',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    experience:
      '서버를 공격으로부터 보호하기 위해 next api를 프록시로, next auth 세션을 인증방법으로 사용해 민감정보의 브라우저 노출을 피했습니다. SEO 등 최적화를 위해 서버사이드 렌더링과 정적 사이트 생성, 앱 라우터의 레이아웃을 활용했습니다.',
    description:
      '서버를 공격으로부터 보호하기 위해 next api를 프록시로, next auth 세션을 인증방법으로 사용해 민감정보의 브라우저 노출을 피했습니다. SEO 등 최적화를 위해 서버사이드 렌더링과 정적 사이트 생성, 앱 라우터의 레이아웃을 활용했습니다.',
    projects: [],
  },
  {
    name: 'HTML5 / CSS3',
    category: '프론트엔드',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    experience:
      '마크업 태그를 이용한 LCP 단축, 스크립트 로드 조절, 무한 스크롤 요소 선택 등으로 활용했습니다.',
    description:
      '마크업 태그를 이용한 LCP 단축, 스크립트 로드 조절, 무한 스크롤 요소 선택 등으로 활용했습니다.',
    projects: [],
  },
  {
    name: 'Tailwind CSS',
    category: '스타일링',
    logo: 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
    experience:
      '별도 스타일 파일을 두지 않기 위해, 반응형 뷰를 빠르게 구현하기 위해 사용했습니다.',
    description:
      '별도 스타일 파일을 두지 않기 위해, 반응형 뷰를 빠르게 구현하기 위해 사용했습니다.',
    projects: [],
  },
  {
    name: 'Styled-Components',
    category: '스타일링',
    logo: 'https://cdn.simpleicons.org/styledcomponents/DB7093',
    experience: '동적 스타일링을 위해 학습했습니다.',
    description: '동적 스타일링을 위해 학습했습니다.',
    projects: [],
  },
  {
    name: 'Sass (SCSS)',
    category: '스타일링',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
    experience:
      'CSS 가독성을 높여 반응형 웹뷰와 디자인 시스템을 효율적으로 구현하는 데 사용했습니다.',
    description:
      'CSS 가독성을 높여 반응형 웹뷰와 디자인 시스템을 효율적으로 구현하는 데 사용했습니다.',
    projects: [],
  },
  {
    name: 'CSS Module',
    category: '스타일링',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    experience:
      '기본 CSS 문법을 전역 관리 없이 사용할 수 있어 속도를 위해 선택했습니다.',
    description:
      '기본 CSS 문법을 전역 관리 없이 사용할 수 있어 속도를 위해 선택했습니다.',
    projects: [],
  },
  {
    name: 'Tanstack React Query',
    category: '상태 API',
    logo: 'https://cdn.simpleicons.org/reactquery/FF4154',
    experience:
      'API 리퀘스트의 에러 처리를 공통화하고, isLoading 등으로 상태를 관리했습니다.',
    description:
      'API 리퀘스트의 에러 처리를 공통화하고, isLoading 등으로 상태를 관리했습니다.',
    projects: [],
  },
  {
    name: 'Context API',
    category: '상태 API',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    experience:
      '<label>의 id 값을 자동 생성하기 위해 공통 Form 컴포넌트에 포함되었습니다.',
    description:
      '<label>의 id 값을 자동 생성하기 위해 공통 Form 컴포넌트에 포함되었습니다.',
    projects: [],
  },
  {
    name: 'Zustand',
    category: '상태 API',
    logo: 'https://cdn.simpleicons.org/zustand/764ABC',
    experience: '로그인한 사용자 정보 등 전역 상태 관리에 사용했습니다.',
    description: '로그인한 사용자 정보 등 전역 상태 관리에 사용했습니다.',
    projects: [],
  },
  {
    name: 'React Hook Form',
    category: '상태 API',
    logo: 'https://cdn.simpleicons.org/reacthookform/EC5990',
    experience:
      '조립식 Form 컴포넌트의 타입 정의, 상태관리, 유효성 검사를 위해 도입했습니다.',
    description:
      '조립식 Form 컴포넌트의 타입 정의, 상태관리, 유효성 검사를 위해 도입했습니다.',
    projects: [],
  },
  {
    name: 'Axios',
    category: '상태 API',
    logo: 'https://cdn.simpleicons.org/axios/5A29E4',
    experience:
      'API 호출에 cookie, token을 추가하기 위해 intercepter를 사용했습니다. 리스폰스의 JSON parsing을 생략하기 위해 사용했습니다.',
    description:
      'API 호출에 cookie, token을 추가하기 위해 intercepter를 사용했습니다. 리스폰스의 JSON parsing을 생략하기 위해 사용했습니다.',
    projects: [],
  },
  {
    name: 'Git',
    category: '협업',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    experience:
      '협업에 차질이 생기지 않도록 리니어 히스토리 컨벤션을 만들고, Git Hook과 GitHub 설정으로 강제했습니다.',
    description:
      '협업에 차질이 생기지 않도록 리니어 히스토리 컨벤션을 만들고, Git Hook과 GitHub 설정으로 강제했습니다.',
    projects: [],
  },
  {
    name: 'GitHub',
    category: '협업',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    experience:
      'GitHub Projects, Discussions를 이용해 회의 시간을 단축했습니다.',
    description:
      'GitHub Projects, Discussions를 이용해 회의 시간을 단축했습니다.',
    projects: [],
  },
  {
    name: 'ESlint / Stylelint / Prettier / EditorConfig',
    category: '도구',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg',
    experience:
      '코드 품질 관리와 코드 스타일 통일을 위해 설정했습니다. 관리 용이성을 위해 설정 파일을 config 디렉토리에 보관하고 ignore 파일을 따로 만들지 않았습니다.',
    description:
      '코드 품질 관리와 코드 스타일 통일을 위해 설정했습니다. 관리 용이성을 위해 설정 파일을 config 디렉토리에 보관하고 ignore 파일을 따로 만들지 않았습니다.',
    projects: [],
  },
  {
    name: 'Husky',
    category: '도구',
    logo: 'https://cdn.simpleicons.org/git/F05032',
    experience: 'Git Hook으로 린터, 포매터 적용을 자동화했습니다.',
    description: 'Git Hook으로 린터, 포매터 적용을 자동화했습니다.',
    projects: [],
  },
  {
    name: 'Figma',
    category: '스타일링',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    experience:
      'Adobe XD와 Figma로 디지털 프로토타이핑을 할 수 있습니다. 디자인 시스템을 정리하기 위해 사용했습니다.',
    description:
      'Adobe XD와 Figma로 디지털 프로토타이핑을 할 수 있습니다. 디자인 시스템을 정리하기 위해 사용했습니다.',
    projects: [],
  },
  {
    name: 'Vercel',
    category: '인프라',
    logo: 'https://cdn.simpleicons.org/vercel/000000',
    experience: '자동배포와 PR Checks를 위해 사용했습니다.',
    description: '자동배포와 PR Checks를 위해 사용했습니다.',
    projects: [],
  },
  {
    name: 'Netlify',
    category: '인프라',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg',
    experience:
      'Vercel을 사용할 수 없는 상황에서 자동배포와 PR Checks를 위해 사용했습니다.',
    description:
      'Vercel을 사용할 수 없는 상황에서 자동배포와 PR Checks를 위해 사용했습니다.',
    projects: [],
  },
  {
    name: 'AWS',
    category: '인프라',
    logo: 'https://cdn.simpleicons.org/aws/232F3E',
    experience:
      '저렴한 유지비용을 위해 Amplify로 배포하고 팀에 IAM 계정을 발급했습니다. HTTPS 배포에 Certificate Manager, CloudFront를 사용했습니다.',
    description:
      '저렴한 유지비용을 위해 Amplify로 배포하고 팀에 IAM 계정을 발급했습니다. HTTPS 배포에 Certificate Manager, CloudFront를 사용했습니다.',
    projects: [],
  },
  {
    name: 'Docker',
    category: '인프라',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    experience:
      '개발용으로 로컬 DB와 서버를 구동하기 위해 사용했습니다. 패키지 관리자 마이그레이션에서 CI/CD 스크립트 수정과 확인을 위해 사용했습니다.',
    description:
      '개발용으로 로컬 DB와 서버를 구동하기 위해 사용했습니다. 패키지 관리자 마이그레이션에서 CI/CD 스크립트 수정과 확인을 위해 사용했습니다.',
    projects: [],
  },
  {
    name: 'MongoDB / Mongoose',
    category: '인프라',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    experience: 'Next.js API 기능을 사용하기 위해 연습했습니다.',
    description: 'Next.js API 기능을 사용하기 위해 연습했습니다.',
    projects: [],
  },
  {
    name: 'PostgreSQL',
    category: '인프라',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    experience:
      '개발용 DB와 데이터가 없는 상황에서 대시보드를 만들기 위해 DB를 로컬 구동했습니다.',
    description:
      '개발용 DB와 데이터가 없는 상황에서 대시보드를 만들기 위해 DB를 로컬 구동했습니다.',
    projects: [],
  },
  {
    name: 'mySQL',
    category: '인프라',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    experience: '물류 서비스 입출고 메뉴의 QA에 사용했습니다.',
    description: '물류 서비스 입출고 메뉴의 QA에 사용했습니다.',
    projects: [],
  },
  {
    name: 'Oracle',
    category: '인프라',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg',
    experience:
      '<Do It! 오라클로 배우는 SQL 입문>의 베타 테스터로 참여하며 학습했습니다.',
    description:
      '<Do It! 오라클로 배우는 SQL 입문>의 베타 테스터로 참여하며 학습했습니다.',
    projects: [],
  },
  {
    name: 'NPM',
    category: '도구',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg',
    experience: '',
    description: '',
    projects: [],
  },
  {
    name: 'Yarn Berry Zero Install',
    category: '도구',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yarn/yarn-original.svg',
    experience:
      '개발 환경과의 차이로 인한 문제를 피하려 설치했지만, Docker에서 빌드를 run 하는 데 실패해 스크립트를 수정하고 있습니다.',
    description:
      '개발 환경과의 차이로 인한 문제를 피하려 설치했지만, Docker에서 빌드를 run 하는 데 실패해 스크립트를 수정하고 있습니다.',
    projects: [],
  },
  {
    name: 'Jira',
    category: '협업',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg',
    experience:
      '실무에서 개발 리소스의 효율적인 배치를 위해 Agile, Sprint, Kanban 개념에 따라 5개 서비스의 Jira 프로젝트를 설정하고 사용했습니다. Asana에 Slack 인터그레이션을 적용해 담당 개발자 멘션을 자동화했습니다.',
    description:
      '실무에서 개발 리소스의 효율적인 배치를 위해 Agile, Sprint, Kanban 개념에 따라 5개 서비스의 Jira 프로젝트를 설정하고 사용했습니다. Asana에 Slack 인터그레이션을 적용해 담당 개발자 멘션을 자동화했습니다.',
    projects: [],
  },
  {
    name: 'Asana',
    category: '협업',
    logo: 'https://cdn.simpleicons.org/asana/FC636B',
    experience:
      'Asana에 Slack 인터그레이션을 적용해 담당 개발자 멘션을 자동화했습니다.',
    description:
      'Asana에 Slack 인터그레이션을 적용해 담당 개발자 멘션을 자동화했습니다.',
    projects: [],
  },
  {
    name: 'Confluence / Notion',
    category: '협업',
    logo: 'https://cdn.simpleicons.org/notion/000000',
    experience: '공유용 기술 문서 작성 및 자동 알림을 위해 사용했습니다.',
    description: '공유용 기술 문서 작성 및 자동 알림을 위해 사용했습니다.',
    projects: [],
  },
  {
    name: 'Postman',
    category: '협업',
    logo: 'https://cdn.simpleicons.org/postman/FF6C37',
    experience: 'API 문서 파악 및 API 리퀘스트 디버깅을 위해 사용했습니다.',
    description: 'API 문서 파악 및 API 리퀘스트 디버깅을 위해 사용했습니다.',
    projects: [],
  },
  {
    name: 'Swagger',
    category: '협업',
    logo: 'https://cdn.simpleicons.org/swagger/85EA2D',
    experience:
      'API를 전달 받고 협업하는 데에 사용했습니다. 인증이 필요한 요청을 통해 리스폰스를 실제로 받아 보고, DTO에 맞는 타입을 만들거나 에러 처리 UI를 고민하였습니다.',
    description:
      'API를 전달 받고 협업하는 데에 사용했습니다. 인증이 필요한 요청을 통해 리스폰스를 실제로 받아 보고, DTO에 맞는 타입을 만들거나 에러 처리 UI를 고민하였습니다.',
    projects: [],
  },
  {
    name: 'Python',
    category: '기타',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    experience:
      'AWS S3에서 Production 데이터를 복사 붙여넣기 하여 버그를 파악할 때 사용했습니다. 반복 UI 테스트 자동화를 위해 Selenium, Pyautogui를 학습했습니다.',
    description:
      'AWS S3에서 Production 데이터를 복사 붙여넣기 하여 버그를 파악할 때 사용했습니다. 반복 UI 테스트 자동화를 위해 Selenium, Pyautogui를 학습했습니다.',
    projects: [],
  },
  {
    name: 'Google Analytics',
    category: '기타',
    logo: 'https://cdn.simpleicons.org/googleanalytics/E37400',
    experience: '페이지 통폐합을 위한 프로덕션 조회수 수집에 사용했습니다.',
    description: '페이지 통폐합을 위한 프로덕션 조회수 수집에 사용했습니다.',
    projects: [],
  },
  {
    name: 'Kakao Developers',
    category: '기타',
    logo: 'https://cdn.simpleicons.org/kakao/FFCD00',
    experience:
      'OAuth 2.0, 공유하기에 사용했습니다. 따로 생성된 카카오 앱 3개를 단일화했습니다.',
    description:
      'OAuth 2.0, 공유하기에 사용했습니다. 따로 생성된 카카오 앱 3개를 단일화했습니다.',
    projects: [],
  },
]
