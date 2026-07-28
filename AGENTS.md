# AGENTS.md

> 공통 규칙은 `~/AGENT-RULES.md`를 먼저 읽고 따른다.
> 이 파일은 `/Users/seokjiin/dev/JiinSeok/landing-page-portfolio` 저장소에만 적용되는 추가 메모다.
> 공통 규칙과 충돌하면 `~/AGENT-RULES.md`가 우선이다.

## 저장소 개요

- 개인 포트폴리오용 Next.js 16 App Router 프로젝트다.
- 패키지 매니저는 `pnpm`이다.
- 개발 서버 기본 포트는 `3000`이다.
- 경로 별칭은 `@/*` → `src/*`이다. 새 TS·TSX 코드에서도 상대경로 대신 이 별칭을 우선 사용한다.

## 작업 전 확인

- 사용자 요청을 처리하기 전 관련 파일을 다시 읽어 최신 상태를 확인한다.
- 이 저장소는 정적 페이지 외에도 이력서 생성 스크립트와 별도 상세 페이지를 포함한다. 홈 화면만 보고 변경 범위를 단정하지 않는다.
- 이미 생성된 산출물(`public/resume.pdf`, `public/resume.html`)은 입력 데이터나 스크립트를 바꾼 경우에만 갱신 여부를 판단한다.

## 주요 경로

- `src/app`: App Router 페이지, 메타데이터, 에러 페이지
- `src/components`: 섹션·레이아웃·공용 UI 컴포넌트
- `src/lib`: 상수, 훅, 타입, 유틸리티, 프로바이더
- `scripts/resume`: 이력서 HTML/PDF 생성 스크립트와 테스트
- `docs`: 설계 메모와 문서
- `public`: 정적 이미지·비디오·PWA 자산

## 실행·검증

- 의존성 설치: `pnpm install`
- 개발 서버: `pnpm dev`
- 포맷: `pnpm format`
- 린트: `pnpm lint`
- 테스트: `pnpm test`
- 전체 정리: `pnpm correct`
- 프로덕션 빌드: `pnpm build`

작업 영향도에 따라 아래 순서로 필요한 범위만 검증한다.

1. 코드 포맷 변경이 있으면 `pnpm format`
2. 프론트엔드·스타일 변경이 있으면 `pnpm lint`
3. 로직 변경이 있으면 `pnpm test`
4. 라우트·메타데이터·빌드 영향이 있으면 `pnpm build`

`package.json`의 `pre-push` 스크립트는 `pnpm correct && pnpm build`다. 푸시 전에는 이 기준을 만족하는지 확인한다.

### dependabot PR은 머지하지 말고 로컬에서 재생성한다

pnpm 11에는 `minimumReleaseAge` 24시간 격리가 기본으로 켜져 있다. 게시 후 24시간이 안 된 패키지가 lockfile에 있으면 설치가 `ERR_PNPM_MINIMUM_RELEASE_AGE_VIOLATION`으로 실패한다.

dependabot은 PR을 만들 때 lockfile을 **전체 재해석**하므로, 바꾸려던 패키지와 무관한 전이 의존성까지 갓 나온 버전으로 떠오른다. 그 lockfile은 Vercel 빌드에서 반드시 실패한다. pnpm의 격리는 verify-after-resolve라서 리졸버가 조건을 만족하는 구버전으로 폴백하지 않는다(pnpm #11203, 미해결).

`.github/dependabot.yml`로는 막을 수 없다. `cooldown` 옵션은 직접 의존 PR의 생성 시점만 늦추고 전이 의존성 재해석에는 관여하지 않으며, 보안 업데이트에서는 아예 무시된다.

따라서 dependabot PR은 이렇게 처리한다.

1. PR 본문에서 올리려는 패키지와 목표 버전을 확인한다
2. 목표 버전의 게시 시각이 24시간을 넘겼는지 확인한다 (`npm view <pkg> time --json`)
3. `package.json`의 해당 specifier만 손으로 올리고 `pnpm install`을 돌린다 — pnpm이 기존 lockfile을 기준선으로 삼아 영향받는 노드만 다시 해석하므로 무관한 전이 의존성이 떠오르지 않는다
4. `git diff pnpm-lock.yaml`으로 변경이 의도한 패키지에 한정됐는지 확인한다
5. `pnpm test`·`pnpm build` 통과 후 커밋하고, dependabot PR은 사유를 코멘트로 남기고 닫는다

반복해서 걸리는 데이터 패키지는 `pnpm-workspace.yaml`의 `overrides`에 버전을 고정한다. 격리 정책을 끄거나 `minimumReleaseAgeExclude`로 빼는 것보다 안전하다.

## 구현 메모

- UI는 Tailwind CSS 4 기반이다. 기존 토큰과 컴포넌트 패턴을 먼저 재사용한다.
- 아이콘은 기존과 동일하게 `lucide-react`를 우선 사용한다.
- 다국어 텍스트를 건드릴 때는 `src/lib/constants/locales`의 한국어·영어 데이터를 함께 확인한다.
- 프로젝트 소개 자산은 `public/images/projects`, `public/videos/projects`에 나뉘어 있다. 카드나 섹션 변경 시 정적 이미지와 동영상 미리보기를 함께 점검한다.
- 추천서 페이지, 정산 설계 페이지처럼 홈 외 라우트가 있으므로 전역 컴포넌트 변경 시 해당 페이지 영향도 함께 확인한다.

## 테스트 파일 메모

- Vitest 테스트는 `src/lib/utils/*.test.ts`, `scripts/resume/*.test.ts`에 있다.
- 테스트를 추가할 때는 기존처럼 구현 파일 가까이 두거나 `scripts/resume` 아래에 함께 둔다.

## 문서 갱신

- 실행 방법이나 구조가 바뀌면 `README.md`도 함께 갱신한다.
