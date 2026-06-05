# 이력서 SoT 설계 — facts 보간 + 생성물 커밋

2026-06-05 브레인스토밍 합의안. 사이트(ko.json·galleryItems)와 public/resume.html이 같은 사실을 따로 들고 있어 생기는 드리프트를 구조적으로 막는다. 2026-06-05 수동 감사에서 확정 불일치 18건이 나온 것이 동기.

## 결정 사항

| 축 | 결정 | 기각된 대안 |
|---|---|---|
| SoT 범위 | 사실(날짜·수치·직함·링크)만 공유, 문장은 문서별 소유 | 문장 공유, 하이브리드 오버라이드(오버라이드 문장에 팩트 사본이 생겨 드리프트 재생산) |
| resume.html 형태 | 템플릿 + facts 보간으로 생성 | 손글 유지+검사만(예방 불가), React 라우트 전환(A4 CSS 재이식 리스크) |
| PDF | 로컬 스크립트로 생성·커밋 | CI 생성(인프라 과다), 인쇄 버튼만(채용 플랫폼 제출용 수동 작업 잔존) |
| 운영 모델 | 생성물(HTML+PDF) 커밋형, 테스트가 재생성 diff 강제 | prebuild 주입형(빌드 결합 증가, HTML/PDF 모델 분리) |

## 아키텍처

```
src/lib/constants/facts.ts          ← 단일 팩트 저장소 (typed)
scripts/resume/template.html        ← 현 resume.html + {{토큰}} 약 30곳
scripts/resume/generate.ts          ← pnpm resume: 치환 → prettier → resume.html → PDF(쪽수 검증)
public/resume.html, resume.pdf      ← 생성물, 커밋 대상 (URL 불변)
scripts/resume/sync.test.ts         ← Vitest 동기화 테스트
```

데이터 흐름: facts.ts → (generate.ts) → public/resume.html·resume.pdf. 사이트는 v1에서 ko.json을 그대로 렌더하고, 테스트가 ko.json·ProjectEntry.tsx 속 팩트를 facts와 대조한다.

## 컴포넌트

### facts.ts
- `identity` — 이메일, GitHub 핸들, 도메인(usejiin.link)
- `careers` — 회사별 법인명·팀·직함·기간(start/end)·URL·핵심 수치(응답률 30%, 백엔드 파일 50여 개, 포토부스 3일, API route 15개→단일 프록시 등)
- `projects` — 기간·링크·npm 패키지명·albaform 기여(5인 팀, GitHub Insights 커밋 35%)
- `education` / `certs` / `talks` — 라벨·연월·링크
- `asOf` — 기간 계산 기준일. "총 3년 7개월", "재직 10개월" 같은 파생값은 저장하지 않고 asOf로 계산. 달이 바뀌며 생기는 침묵 드리프트를 명시적 갱신으로 치환
- 값의 출처는 메모리 canonical-facts(2026-06 팩트체크)와 현행 두 문서. 전수 추출은 구현 단계에서 토큰화와 함께 수행하고, 누락은 동기화 테스트가 잡는다

### template.html
- 현 resume.html 복사본에서 팩트 자리만 `{{careers.dost11.period}}` 식 토큰으로 치환
- HTML은 HTML로 유지 — 문장 수정·A4 CSS 튜닝은 지금과 동일하게 손으로
- 치환기는 정규식 기반 자체 구현(의존성 0)

### generate.ts (pnpm resume)
1. 템플릿 읽기 → 토큰 치환. 미정의 토큰 참조 또는 출력에 `{{` 잔존 시 즉시 실패
2. prettier로 포맷(diff 안정화) → public/resume.html 기록
3. 헤드리스 Chrome으로 public/resume.pdf 생성. Chrome 경로는 macOS 기본값 + `CHROME_PATH` 오버라이드, 부재 시 명확한 에러
4. PDF 쪽수 == 4 검증. 초과 시 PDF를 남기지 않고 실패 — 콘텐츠 축소 또는 의도된 변경이면 기대 쪽수 상수 갱신
- 실행기: tsx (devDependency 추가)

### sync.test.ts
1. **재생성 diff** — render(template, facts) === 커밋된 resume.html. 불일치 시 "pnpm resume 실행" 안내와 함께 실패
2. **사이트 대조** — facts 각 항목에 선언된 사이트 참조 위치(ko.json 경로, ProjectEntry.tsx)에서 동일 값 등장 확인
3. **기간 패턴 스캔(v1 한정)** — 생성된 resume.html과 사이트 소스(ko.json·ProjectEntry.tsx)에서 `YYYY.MM` 패턴을 추출해 facts에 없는 기간이면 실패. 수치류 전수 스캔은 노이즈 우려로 v1 제외
- 테스트 파일은 scripts/resume/sync.test.ts에 두고 vitest include에 scripts/를 추가
- PDF는 바이너리라 diff 강제 대상에서 제외. HTML과 같은 명령에서 항상 함께 생성되는 것으로 묶음을 보장

## 마이그레이션 순서

1. facts.ts 작성 (두 문서 + canonical-facts에서 값 추출)
2. resume.html → template.html 복사 후 토큰화 (~30곳)
3. generate.ts + pnpm 스크립트(`resume`) 작성
4. `pnpm resume` 실행 → 생성된 resume.html이 기존과 의미 동일한지 diff 검수 → resume.pdf 첫 커밋
5. sync.test.ts 작성, 기존 Vitest에 편입
6. 사이트 대조에서 드러나는 잔여 불일치 정리

## 범위 밖 (YAGNI)

- 사이트에 /resume.pdf 다운로드 링크 노출 (별도 건)
- ko.json 구조 변경·사이트 측 보간
- i18n, CI에서 PDF 생성, React /resume 라우트

## 위험·완화

- 토큰화 누락(팩트가 템플릿에 하드코딩 잔존) → 기간 패턴 스캔이 1차 방어, 코드리뷰가 2차
- prettier 버전 변경으로 재생성 diff 흔들림 → 저장소 고정 버전 사용, 테스트도 같은 경로로 렌더
- Chrome 의존 → 로컬 전용 스크립트로 한정, CI에서는 PDF 생성을 요구하지 않음
