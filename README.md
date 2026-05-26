# 석지인 · 웹개발자 포트폴리오

믿을 수 있고 이해할 수 있는 프론트엔드를 지향하는 경험 중심 개발자 석지인의 포트폴리오 사이트입니다. 도스트11에서 풀스택(Rails + React) 개발자로 일하며, 의도한 가치를 정확히 전하기 위해 에러 처리와 일관된 인터페이스, 요구사항 분석, 효율적인 개발 환경 구축에 집중하고 있습니다.

경력과 기술 스택, 자주 받는 질문을 한 페이지에 담았습니다. Next.js App Router로 구현했고, 다크/라이트 테마와 부드러운 섹션 이동을 지원합니다.

🔗 [usejiin.link](https://usejiin.link)

## 기술 스택

- **프레임워크** — Next.js 16 (App Router), React 19, TypeScript 6
- **스타일링** — Tailwind CSS 4, `tw-animate-css`, Radix UI (Progress · Select · Slot · Tabs)
- **테마** — `next-themes` 기반 다크/라이트 전환
- **폼 / 검증** — React Hook Form, Zod
- **데이터** — TanStack Query, Axios
- **UI 보조** — Lucide React(아이콘), Sonner(토스트), React Modal, React Markdown
- **이미지 / 분석** — `next/image` + Sharp, Vercel Speed Insights
- **개발 도구** — ESLint · Prettier · Stylelint (`lint/` 폴더), Husky + lint-staged, pnpm

검증된 도구로 코드 스타일을 통일하고, 반복 작업은 공통 컴포넌트와 자동화로 줄여 유지보수가 쉬운 구조를 지향합니다.

## 실행

```bash
pnpm install   # 의존성 설치
pnpm dev       # 개발 서버 (http://localhost:3000)
pnpm build     # 프로덕션 빌드
pnpm start     # 프로덕션 서버 실행
```

자주 쓰는 스크립트:

- `pnpm lint` — ESLint + Stylelint 자동 수정
- `pnpm format` — Prettier 포맷
- `pnpm correct` — 포맷 후 린트 일괄 실행

## 프로젝트 구조

```
src/
├── app/                  # App Router 라우트
│   ├── page.tsx          # 홈 (히어로 · 경력 · 기술 스택 · FAQ)
│   ├── layout.tsx        # 루트 레이아웃 (메타데이터, PWA, Footer)
│   ├── projects/         # 프로젝트 목록
│   ├── til/              # Today I Learned
│   ├── soft-skills/      # 소프트 스킬
│   ├── sitemap.ts        # 사이트맵
│   ├── robots.ts         # robots.txt
│   └── config.ts         # 사이트 메타 / 소셜 링크
├── components/
│   ├── layout/           # Navigation, Footer
│   ├── sections/         # 홈 섹션 컴포넌트
│   └── ui/               # 재사용 UI (Button, Modal, 각종 Kit, 입력/로딩)
└── lib/
    ├── constants/        # 정적 데이터 + locales (텍스트)
    ├── hooks/            # useModal, useHydration 등
    ├── providers/        # 번역 컨텍스트, 클라이언트 프로바이더
    ├── styles/           # 디자인 토큰
    ├── types/            # 공용 타입
    └── utils/            # cn(classnames), styles, errorHandler
```

경로 별칭은 `@/*` → `src/*` 입니다.

## 페이지

| 경로 | 내용 |
| --- | --- |
| `/` | 홈 — 히어로, 경력 타임라인, 기술 스택, FAQ |
| `/projects` | 프로젝트 링크 목록 |
| `/til` | Today I Learned 노트 |
| `/soft-skills` | 소프트 스킬 소개 |

### 홈 섹션

- **히어로** — 각 섹션을 미리볼 수 있는 카드로 페이지 안내
- **경력** — 도스트11 · 체인시프트 · 핏투게더 · 물류대장 · 연합뉴스 이력을 회사 로고와 함께 세로 타임라인으로 구성
- **기술 스택** — 5초마다 자동 전환되는 카테고리 탭, 기술별 숙련도 표시
- **FAQ** — 자주 받는 질문을 펼침/접힘 형태로 정리

## 그 외 디테일

- 상단 네비게이션에서 경력 · 기술 스택 · FAQ로 부드럽게 이동, 연락처 클립보드 복사 지원
- 마우스·터치를 따라오는 포차코 커서 컴패니언, 맨 위로 가기 버튼
- `site.webmanifest`와 iOS 스플래시를 갖춘 PWA, Open Graph · 사이트맵 · robots 포함
- Vercel 배포, AWS Amplify 빌드 설정(`amplify.yml`) 동시 구성

## 연락처

프로젝트 관련 문의는 편하게 연락 주세요.

- 이메일 — seokjiin1073@gmail.com
- GitHub — [github.com/JiinSeok](https://github.com/JiinSeok)
- LinkedIn — [linkedin.com/in/jiin-seok](https://www.linkedin.com/in/jiin-seok)
