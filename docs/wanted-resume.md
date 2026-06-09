# 석지인 · 원티드 이력서 본문 (개조식)

> 원티드 프로필 base 본문입니다. 헤드라인·경력 요약은 합니다체, 경력 상세는 개조식 명사형(2단 계층)으로 통일했습니다. 본문 어디에도 em dash를 쓰지 않습니다.

---

고객이 기꺼이 값을 지불할, 필요한 가치를 더하는 개발자입니다.

> 💬 "주어진 업무 범위에 머무르지 않고, 팀과 프로젝트에서 비어 있는 부분을 스스로 찾아 메우는 적극성." (홍순상 · 도스트11 CTO, 석지인을 직접 채용 / 추천 전문 usejiin.link/recommendation)

- 총 경력 3년 6개월·개발 2년 차, QA·CX를 거쳐 온 프론트엔드·풀스택 개발자입니다.
- JavaScript·TypeScript 기반으로 Next.js·React를 다뤄 스타트업 MVP와 이커머스를 빠르게 개발하고, 정산 같은 도메인 정책을 직접 설계해 핵심 화면을 구현·운영하며 제품에 깊이 관여합니다.
- 빌드·검증 파이프라인을 개선해 콜드 빌드를 53% 단축하는 등 서비스 품질과 개발 효율을 동시에 높여 왔습니다.
- QA(ISTQB·CSTS) 출신이라 품질을 코드와 절차로 보증하는 것이 강점입니다.

---

# 경력 (총 3년 6개월)

## (주)도스트11 · 2025.09 ~ 재직 중 · 정규직 / 개발

> MBC AI 전략 자회사. 디지털 에셋 이커머스를 풀스택으로 개발하며 프론트엔드 개발 환경·성능·장애 대응 담당.

### 도프켓: 디지털 에셋 이커머스 풀스택 (Ruby on Rails, React, TypeScript, Tailwind CSS, Docker, MySQL)

- 이벤트 협업 기능 제안·구현 주도
  - 회의에서 포토부스 기능 직접 제안, 제안 시나리오·제안 페이지까지 작성
  - 디자이너(프레임 제작 지원)·PM(텍스트 검토)·대표(타깃 수신자 확인) 협업 직접 조율
  - 프로토타입 3일 만에 완성 후 정식 부가기능으로 채택
  - 이후 고객사 사정으로 이벤트 보류, 타 고객사 세일즈 제안 자산으로 전환·활용됨
- 한국 시장 진출 신규 화면 개발
  - 전 페이지 한국어 로컬라이제이션, 브랜딩·폰트 교체
  - 상품 대시보드, 블로그·어드민(AWS S3, slug, Tiptap), 결제 UX, 셀러 페이지 커스터마이징 데모 구현
- 한국형 월간 정산 정책 설계·핵심 화면 직접 구현
  - 외산 결제 엔진 위에 정산 정책(매월 마감·스냅샷·멱등성·민감정보 경계 등) 설계
  - 정책·요구사항을 직접 정의·티켓화 (정산 마일스톤 30건 작성, 설계 본인 · 구현 팀 협업)
  - 정산 페이지·정산 설정 UI·최소 정산금 화면 직접 구현
- B2B 운영·첫 고객사 온보딩 리드
  - 첫 B2B 고객사 1곳 온보딩 리드 및 요구사항 도출 주도
  - CRM 유저 테이블, Grafana 운영 지표·대시보드 관리
- 개발 속도·검증 파이프라인 재구성 주도
  - 타입체크 비동기화 + dev SSR 빌드 분리로 콜드 빌드 18.0초 → 8.3초(53% 단축), dev 서버 기동 14.1초 → 10.0초(29% 단축), watch 상시 메모리 118MB → 60MB(49% 절감)
  - 보완책으로 pre-commit 타입체크 · pre-push SSR 빌드 · CI Playwright SSR 스모크 테스트의 단계별 검증 추가

### 방송용 CG AI 합성 도구: Gradio UI/UX 재설계 (Python, Gradio)

> ML 연구원들과 한 저장소에서 협업, 방송용 CG 합성 도구의 사용성·일관성 개선 단독 수행.

- 워크플로우 중심 UI 재구성
  - 도구명 기준 영문 탭을 작업 순서 3단계 탭(1.마스크 → 2.에셋 → 3.합성)으로 재구성
  - '원본 + 마스크 + 에셋 = 합성 결과' 썸네일 타임라인 헤더 신설로 작업 흐름 시각화
- 용어·에러 메시지 표준화
  - 표시 라벨과 내부 키 분리, UI 용어 통일·한국어화
  - 백엔드 파일 50여 개에 흩어진 사용자 노출 에러 메시지를 동일 기준으로 통일
  - 사내 유저 인터뷰 진행, 개발팀-CG팀 용어표 제작
- 워크플로우 차단 버그 해결
  - 대용량(5GB) 영상 업로드·타임아웃 조정
  - 파일 탐색기 체크박스 미표시·폰트 로드 실패 등 차단 버그 해결

### 기업 랜딩 most267.co.kr: Notion 연동 재구축 (Next.js, GitHub Actions)

> 정적 HTML 사이트를 비개발자 담당자를 위해 Next.js로 단독 재구축.

- 사이트 재구축·배포 자동화 (단독)
  - 기존 정적 HTML 사이트를 Next.js로 전면 재구축
  - GitHub Pages 정적 배포 CI/CD, SEO(sitemap·robots) 구축
- Notion 기반 CMS 구축
  - Notion DB 5종(팀·작품·보도·영상·설정) 연동으로 비개발자 콘텐츠 직접 관리 실현
  - Notion 스키마(select 순서·R&R 컬럼)를 카테고리 정렬·본부별 탭 UI에 자동 반영
- 외부 자원 장애 대응
  - 1시간마다 만료되는 Notion 파일 URL을 빌드 시점 다운로드·WebP/WebM 변환 파이프라인으로 해결
  - Notion 장애 시 캐시로 빌드 연속성 보장
- 성능·재구축 효과 (실측)
  - 시맨틱 HTML 구조를 유지하며 img 태그를 next/image로 전환, 이미지 치수 추출·고정으로 레이아웃 시프트(CLS) 방지
  - 개편 전(정적 HTML) 대비 Lighthouse(desktop) 성능 84 → 91 · 접근성 83 → 96 · 모범사례 92 → 100, LCP 2.8초 → 1.5초(약 46% 단축)

## (주)체인시프트 · 2025.04 ~ 2025.06 · 인턴 / 프론트엔드

### AI 검색 최적화 SaaS B2B 데모용 MVP 프론트엔드 (Next.js 15 App Router, TypeScript, Tailwind CSS, TanStack React Query, Zustand, React Hook Form)

- 영업 시연 자료로 활용·첫 계약 기여
  - 직접 개발한 B2B 데모 MVP가 영업 미팅 시연 자료로 활용됨, 회사 첫 계약 체결 과정에 기여
- 데이터 시각화 대시보드 구현
  - D3.js·Recharts로 버블/트리맵 차트 개발, B2B 데모용 대시보드 완성, Claude Code로 대시보드 3페이지를 7일 내 완성
- API·에러 처리 최적화
  - 백엔드 개발자 별도 MVP 코드 인계받아 API route 15개를 단일 프록시로 통합, RHF 유효성 내장 공통 Form 컴포넌트 일괄 적용, TanStack Query onError 범용 에러 핸들러로 DX·UX 향상, middleware·NextAuth 로그인 상태별 접근 제한 통일
- 랜딩페이지 템플릿 개발
  - Next.js·SEO(SSR) 랜딩페이지 템플릿 개발(대상=개발자라 CMS 생략·공통 컴포넌트·사용법 정리), AI 마크업 후 앱 데모 슬라이더·FAQ 토글·이메일 등록 인터랙션 구현

## 주식회사핏투게더 · 2023.08 ~ 2024.02 · 정규직 / SQA

### 축구 데이터 올인원 '오코치' SW QA (Web, Windows/macOS, iPad) · FIFA Preferred Provider(FPP)

- 멀티 플랫폼 QA·인증 대응
  - Web·Windows/macOS·iPad 대상 품질 보증, FPP 인증 관련 업무 수행
  - 자사 HW 모델별 데이터 분석 모듈(가속도/자이로·위경도)·훈련/경기 중 패킷 수신 검증 실시간 대시보드 iPad 앱 테스트, 현장 Operation 테스트·보고서 작성, 10인 이상 개발자와 협업
- QA 프로세스 체계화
  - QA TF로 스펙·지원 사양(OS·해상도) 정의로 디버깅 범위 규정, 전용 장비로 테스트 벤치 마련해 디버깅 리소스 절감
- 이슈 트래킹·문서화
  - 5개 프로덕트별 맞춤형 Jira 프로젝트 제작·운영
  - 방치된 기술 문서를 위키로 정리해 개발자 온보딩 지원

## 주식회사물류대장 · 2022.06 ~ 2023.08 · 정규직 / SQA·CX

### 중대형 제품 배송·설치 매칭 물류 SaaS(OMS/WMS) '물류대장' QA·CX

- 입력 컴포넌트 통합 디자인 시스템 구축 (CSS·상태 설계)
  - 상태별 디자인 시스템·UI 통일로 입력 오류·문의 감소
- 전사 커뮤니케이션 개선
  - 전 직군 용어 사전(유비쿼터스) 제작으로 커뮤니케이션 비용 절감·온보딩 개선
- 이슈 트래커 도입·B2B 온보딩 지원
  - 이슈/버그 트래커 도입으로 개발 진행 상태 시각화
  - B2B 고객사(CJ대한통운 등 3사) 온보딩 지원·개발 협의(지도 커스텀용 외부 API 교체·DB 연동), End-User 베타 테스트·현장 인터뷰로 이슈 발굴
  - Web·Android/iOS를 TestFlight·Expo로 테스터 교육·베타 배포, mySQL 물류 데이터 QA·Google Analytics 사용량 기능축소 활용, FAQ·매뉴얼 사이트 제작

## (주)연합뉴스 · 2021.08 ~ 2022.03 · 계약직 / 출판국 DB센터

### B2B 구독 서비스 '연합 프리미엄 뉴스' 인물 정보·이용자 관리

- 동의 절차 간편화·제공률 개선
  - 카카오톡·문자·팩스 등 친숙한 채널 확대·레이아웃 개선으로 응답 양식 1페이지 축소(수발신 중 페이지 누락 해결, 50% 단축)
  - 본인 동의 프로필 제공률 30% 향상

---

# 프로젝트

## formkit-react: npm 배포 (React Hook Form, Zod, Radix UI, Tailwind CSS, TypeScript, Vite) · 단독

- 공통 모듈·디자인 토큰·일관성을 라이브러리로 정리해 npm 배포
  - Compound Component 패턴으로 조합 가능한 API 설계, 타입 안전성(Zod)·접근성(ARIA)·스타일(Tailwind)을 한 패키지로 통합
  - Vite로 ESM/CJS/타입선언 출력, GitHub Actions CI 검증 후 배포(현재 v0.2.0)

## bodycodi: JSP 레거시 공존 설계 (React 18, TypeScript, Vite, TanStack Query, Tailwind, react-window) · 채용 과제·단독

- 레거시 제약을 스스로 조사·정의
  - 2016년부터의 JSP 레거시(130만 사용자·결제)를 직접 조사해 공존 제약 추정, 점진적 통합 전제로 설계, tw- prefix·컨벤션 문서로 클래스 충돌 예방
- 운영 안정성·성능
  - 예측 가능 에러(400·422 로깅)와 불가능 에러(5xx·네트워크 모니터링)를 구분하는 정책, 50개 임계 조건부 가상화(7,000개 데이터 검증)
  - AI 생성 코드를 직접 작성 코드로 교체해 에러 처리 통일, 데이터 크기·네트워크 지연 시뮬레이션 테스트 패널 제공

## albaform: 알바 구인구직 플랫폼 (Next.js, TanStack Query, Zustand, TypeScript) · 팀 (5인·4주, 프로젝트 리딩·초기 세팅, 커밋 35%)

- 렌더링·권한 경계 설계
  - 사용자 상태 6종(로그인 여부·사장님/지원자·작성/지원)에 따라 UI·권한 분기, 비인가 영역 ProtectedContent·withAuth HOC 분리·페이지 서버 컴포넌트 전환으로 속도 개선
- 검색 노출과 인터랙션 분리
  - 루트 서버 컴포넌트 유지·클라이언트 전역 설정(ClientSideSetup) 분리로 SSR 지켜 Google Lighthouse SEO 100 달성, Compound Form에 useFormContext로 react-hook-form 사전 적용해 폼 설계·상태 통일
  - 공통 컴포넌트로 화면 통일, 낙관적 업데이트 적용
- 팀 협업 컨벤션
  - GitHub Discussions 선기록으로 회의 시간 단축, Linear History·커밋-이슈 링크로 히스토리 충돌 감소·추적성 향상

## 오픈마인드: 익명 질문 서비스 (유사 ask.fm) (JavaScript, React, CSS Module, Axios, Storybook) · 팀

- 무한 스크롤·렌더링 안정화
  - IntersectionObserver와 isHydrated 가드로 무한 스크롤을 구현해 렌더링 시점 의존으로 생기던 중복·누락 API 요청 제거

## TappyType: 네이티브 iOS 앱 (출시 준비 중) (Swift, SwiftUI, PencilKit / FastAPI, 생성형 AI) · 단독

- 애플펜슬 손글씨를 한글 폰트로 만들어 주는 앱, 기획·개발·디자인·마케팅 단독 진행
  - 생성 모델 교체에도 앱 코드 불변하도록 앱·서버를 REST 계약·프로토콜로 분리
  - 순수 Swift로 TrueType 폰트 writer 직접 구현, few-shot 손글씨 폰트 생성 파이프라인 구성

## 포트폴리오 사이트 (Next.js App Router, React, TypeScript, Tailwind) · 단독

- 검증 도구로 코드 스타일 통일·공통 컴포넌트·자동화로 유지보수 용이화
- 이력서 단일 소스(SoT): HTML·PDF를 같은 저장소에서 관리, 날짜·수치 단일 팩트화·명령 한 번 재생성, 사이트와 어긋나면 테스트 실패

---

# 학력 · 스킬 · 자격

- 학력: 연세대학교 학사 · 신학(주전공)·문헌정보학(복수전공) (2015 ~ 2021) · 문헌정보학에서 정보기술론(Python)·SW프로그래밍·메타데이터·디지털도서관구축론·정보검색론 등 정보기술 교과 이수
- 프론트엔드: React, Next.js(App Router), TypeScript, JavaScript, HTML/CSS, TanStack Query, Zustand, React Hook Form, Tailwind CSS, Compound Component, 접근성(ARIA), Storybook
- 도구·인프라: Git, Vite, Docker, CI/CD(GitHub Actions), npm 패키지 배포, ESLint/Prettier, Figma, Grafana, MySQL, Ruby on Rails, Python, REST/FastAPI, Notion, SEO, 인증(OAuth·JWT), Postman, Swagger, AWS S3
- 도메인·기타: 생성형 AI 활용 개발, 디자인 시스템·용어 통일, QA 기반 품질·테스트
- 교육: 코드잇 스프린트 프론트엔드 트랙 7기(2024.04~2024.10, 1,248시간·팀 프로젝트 3개 중 1개 리딩) · 코멘토 QA 테스트 자동화(Selenium with Python) 수료(2023.10) · 그로우앤베터 CX 101 수료(2022.04) · 이지스퍼블리싱 Do It! Oracle 교재 베타테스터(2025.02)
- 자격증: ISTQB Certified Tester Foundation(2023.08) · 소프트웨어테스트전문가(CSTS) Foundation(2023.08) · 2급 정사서(한국도서관협회, 2021.09)
- 발표: SEO 라이트닝 토크(2026.01) · 서비스직으로서의 개발자(2025.11, 도스트11 데브 미팅)
- 외국어: 영어 일상 회화 · TOEIC 765(2020.09) · TOEIC Speaking IM1(2025.07) · 한국어 유창함 · KBS한국어능력시험 1급(2021.03)

# 링크

- 포트폴리오: https://usejiin.link (경력·프로젝트·교육 타임라인, 프로젝트별 실행 화면·발표 슬라이드)
- GitHub: https://github.com/JiinSeok
- 추천서: https://usejiin.link/recommendation (동료 2인: 홍순상·송찬영)
