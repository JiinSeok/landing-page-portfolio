# 석지인 · 웹개발자 포트폴리오

경력과 기술 스택, 자주 묻는 질문을 한 페이지에 담은 개인 포트폴리오 사이트입니다.
Next.js App Router로 만들었고, 다크/라이트 테마와 부드러운 섹션 이동을 지원합니다.

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

- **히어로** — 각 섹션 미리보기 카드로 페이지를 안내
- **경력** — 도스트11 · 체인시프트 · 핏투게더 · 물류대장 · 연합뉴스 이력을 회사 로고와 함께 세로 타임라인으로 표시
- **기술 스택** — 5초마다 자동 회전하는 카테고리 탭과 기술별 숙련도
- **FAQ** — 펼침/접힘 아코디언

## 그 외 디테일

- 상단 네비게이션에서 경력 · 기술 스택 · FAQ로 부드럽게 스크롤 이동하고, 연락처를 클립보드로 복사할 수 있습니다.
- 마우스와 터치를 따라다니는 포차코 커서 컴패니언, 맨 위로 가기 버튼.
- `site.webmanifest`와 iOS 스플래시를 갖춘 PWA, Open Graph · 사이트맵 · robots 포함.
- Vercel로 배포하며, AWS Amplify 빌드 설정(`amplify.yml`)도 함께 두었습니다.

## 연락처

- 이메일 — seokjiin1073@gmail.com
- GitHub — [github.com/JiinSeok](https://github.com/JiinSeok)
- LinkedIn — [linkedin.com/in/jiin-seok](https://www.linkedin.com/in/jiin-seok)
