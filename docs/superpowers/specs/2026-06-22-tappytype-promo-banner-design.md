# tappytype.com 홍보 배너 설계

날짜: 2026-06-22

## 목적

포트폴리오 사이트(usejiin.link) 방문자에게 본인이 단독 출시·운영 중인 iOS 앱
TappyType(tappytype.com)을 자연스럽게 홍보한다. 채용·외주 방문자의 탐색을
방해하지 않으면서, 닫아도 다시 열 수 있는 절제된 노출을 목표로 한다.

## 형태

페이지 최상단 전폭 **슬림 배너**. 헤더("석지인") 위, 일반 문서 흐름에 배치한다
(sticky 아님 → 스크롤하면 위로 사라지고, 기존 sticky 네비게이션과 공간 경쟁이 없다).

배너 내용:

- 아이콘 + 카피: `🖋 애플펜슬 손글씨로 나만의 한글 폰트 — TappyType`
- CTA 링크: `둘러보기 →` (tappytype.com, `target="_blank"`, `rel="noopener noreferrer"`)
- 닫기 버튼: `✕`

## 상태

1. **펼침(expanded)**: 슬림 배너 표시 (기본값, 첫 방문)
2. **접힘(collapsed)**: 닫은 뒤 화면 **좌하단**에 작은 칩 `🖋 TappyType` 고정 노출.
   클릭하면 배너를 다시 펼친다. (우하단은 기존 ScrollToTop 버튼이 있어 충돌 회피)

## 닫힘 기억

- `localStorage` 키 `tappytype-banner-dismissed`(값 `"1"`)로 영구 기억.
- 닫기(✕) → 플래그 설정 + 접힘 상태.
- 칩 클릭 → 플래그 제거 + 펼침 상태.

## 품질 가드

- **FOUC·CLS 방지**: 다크모드 패턴처럼 페인트 전 실행되는 인라인 스크립트를
  `layout.tsx` `<head>`에 두어, `localStorage` 값을 읽고 `<html>`에
  `data-promo-dismissed` 속성을 미리 찍는다. CSS가 이 속성으로 배너/칩을 즉시
  토글하므로 깜빡임과 레이아웃 점프(CLS)가 없다.
- React 컴포넌트는 마운트 후 `useState`로 동일 상태를 동기화해 인터랙션을 담당한다.

## 데이터·국제화

- 배너 카피는 `src/lib/constants/locales/ko.json`에 키로 추가한다
  (추후 `en.json` 확장 그대로 가능).
- tappytype.com URL은 `src/lib/constants/facts.ts`에 단일 상수로 추가해 SoT
  일관성을 유지한다(현재 `projects.tappytype`에 url 필드 없음).

## 접근성

- 배너 컨테이너 `role="region"`, `aria-label="홍보"`.
- 닫기 버튼·칩 버튼에 `aria-label`.
- 칩 버튼은 최소 44px 터치 타깃을 충족한다.

## 파일

- 신규: `src/components/PromoBanner.tsx` (client component)
- 수정: `src/app/layout.tsx` (인라인 스크립트 + 컴포넌트 마운트)
- 수정: `src/lib/constants/locales/ko.json` (카피)
- 수정: `src/lib/constants/facts.ts` (URL 상수)
- 수정: `src/app/globals.css` 또는 컴포넌트 내 클래스 (`data-promo-dismissed` 토글 CSS)

## 범위 밖 (YAGNI)

- 기간 만료 재노출, A/B 테스트, 노출 애널리틱스 이벤트.
- 영어판(en.json)은 별도 i18n 작업에서 다룬다.
