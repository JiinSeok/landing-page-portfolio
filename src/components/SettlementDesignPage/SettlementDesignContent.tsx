import Link from 'next/link'

import ConvergenceDiagram from '@/components/SettlementDesignPage/ConvergenceDiagram'
import MonthlyCycleDiagram from '@/components/SettlementDesignPage/MonthlyCycleDiagram'
import SecurityBoundaryDiagram from '@/components/SettlementDesignPage/SecurityBoundaryDiagram'
import StateMachineDiagram from '@/components/SettlementDesignPage/StateMachineDiagram'
import TaxModelDiagram from '@/components/SettlementDesignPage/TaxModelDiagram'
import { SETTLEMENT_SNIPPETS } from '@/components/SettlementDesignPage/settlementSnippets'

const TOC_ITEMS = [
  { href: '#problem', label: '01 왜 어려웠나' },
  { href: '#design', label: '02 설계 결정' },
  { href: '#implementation', label: '03 직접 구현한 것' },
  { href: '#handoff', label: '04 핸드오프와 수렴' },
  { href: '#learnings', label: '05 배움' },
]

function SectionHeading({
  no,
  id,
  title,
}: {
  no: string
  id: string
  title: string
}) {
  return (
    <h2
      id={id}
      className="flex items-baseline gap-3 mt-14 mb-5 text-2xl font-bold scroll-mt-24"
    >
      <span className="font-mono text-sm font-semibold text-muted-foreground">
        {no}
      </span>
      {title}
    </h2>
  )
}

function CodeFigure({ caption, code }: { caption: string; code: string }) {
  return (
    <figure className="my-5">
      <figcaption className="mb-1.5 text-xs font-semibold text-muted-foreground">
        {caption}
      </figcaption>
      <pre className="p-4 bg-gray-900 text-gray-100 text-xs leading-relaxed rounded-md overflow-x-auto">
        <code>{code}</code>
      </pre>
    </figure>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 my-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span className="shrink-0 w-1 h-1 mt-2.5 bg-primary/40 rounded-full" />
          <span className="text-sm text-muted-foreground leading-relaxed">
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}

function DecisionHeading({ children }: { children: string }) {
  return <h3 className="mt-8 mb-2 font-semibold">{children}</h3>
}

export default function SettlementDesignContent() {
  return (
    <main className="w-full">
      <article className="max-w-3xl mx-auto px-6 py-12 md:px-8 md:py-16">
        <header>
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">
              설계
            </span>
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">
              케이스 스터디
            </span>
          </div>
          <h1 className="mb-3 text-3xl md:text-4xl font-bold">
            정산 기능 설계
          </h1>
          <p className="mb-4 text-lg text-muted-foreground leading-relaxed">
            외산 결제 엔진 위에 한국형 월간 정산을 설계하고 팀에 핸드오프한
            기록입니다.
          </p>
          <p className="mb-6 text-sm text-muted-foreground">
            도스트11 · 도프켓 / 2026.02 ~ 2026.04 / 설계 문서 작성 · 정산 UI
            구현 · 가격 데이터 선행 작업
          </p>
          <div className="p-4 bg-secondary/20 border border-border rounded-md">
            <p className="text-xs text-muted-foreground leading-relaxed">
              회사 내부 정보를 보호하기 위해 데이터 모델과 코드는 구조만
              유지하고 모델명, 컬럼명, 메서드명을 일반화했습니다. 수치는 공개
              가능한 범위(PR 단위 통계)만 사용했습니다.
            </p>
          </div>
          <nav aria-label="목차" className="mt-8">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {TOC_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <section aria-labelledby="problem">
          <SectionHeading no="01" id="problem" title="왜 어려웠나" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            서비스는 미국형 마켓플레이스 엔진을 기반으로 합니다. 미국형 엔진은
            체크아웃 시점에 세금을 더하는 tax-exclusive 모델이지만, 한국
            총액표시제는 세금이 포함된 총액을 구매 전에 보여줘야 합니다. 문구
            수정으로 끝나는 일이 아니라 가격 데이터 모델 전체를 다시 설계해야
            하는 일이었습니다.
          </p>
          <TaxModelDiagram />
          <p className="text-sm text-muted-foreground leading-relaxed">
            여기에 두 가지 제약이 겹쳤습니다.
          </p>
          <BulletList
            items={[
              '금액 기능의 1원 오차는 신뢰 문제입니다. 총액에서 공급가를 매번 역산하면 반올림 때문에 셀러가 입력할 때 본 숫자와 정산 숫자가 어긋날 수 있습니다. 그래서 계산은 한 번, 저장은 영구, 표시는 조회를 원칙으로 세웠습니다.',
              '테스트가 최소한인 레거시 코드베이스입니다. 기존 코드를 고치는 리팩토링은 위험해서, 새 코드를 병행 추가하고 안정화 후에 구 코드를 걷어내는 전략을 기본으로 했습니다.',
            ]}
          />
        </section>

        <section aria-labelledby="design">
          <SectionHeading no="02" id="design" title="설계 결정" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            매월 반복되는 정산 사이클을 설계 문서로 작성해 팀에 공유했습니다.
            전체 흐름, 타임라인, 데이터 모델, 상태와 잠금, 스냅샷 잡, CSV와
            송금, 화면, 머지 순서까지 10개 섹션으로 구성했고, 핵심 결정은 다섯
            가지입니다.
          </p>

          <DecisionHeading>1. 시점을 고정해 금액을 확정합니다</DecisionHeading>
          <p className="text-sm text-muted-foreground leading-relaxed">
            매월 1일부터 말일까지의 거래를 정산 대상으로 두고, 다음 달 7일까지
            환불 등 변동을 반영한 뒤 8일 0시에 그 시점 잔액을 스냅샷으로
            고정합니다. 이후의 변동은 확정 금액에 영향을 주지 않습니다.
          </p>
          <MonthlyCycleDiagram />

          <DecisionHeading>2. 상태는 3개, 잠금은 파생합니다</DecisionHeading>
          <p className="text-sm text-muted-foreground leading-relaxed">
            상태 머신은 pending, in_progress, settled 3개로 단순하게
            유지합니다. 정산 진행 중 계좌 변경을 막는 잠금이 필요한데, 잠금
            플래그 컬럼을 추가하는 대신 진행 중 레코드의 존재에서 파생하도록
            설계했습니다.
          </p>
          <StateMachineDiagram />
          <CodeFigure
            caption="잠금을 플래그가 아닌 쿼리로 파생하고, 컨트롤러 가드에서 재사용합니다"
            code={SETTLEMENT_SNIPPETS.derivedLock}
          />

          <DecisionHeading>3. 멱등성을 두 층에 겁니다</DecisionHeading>
          <p className="text-sm text-muted-foreground leading-relaxed">
            크론은 중복 발화할 수 있고 워커는 재시도합니다. 셀러와 정산월의
            유니크 인덱스를 DB에, 존재 가드를 서비스 진입부에 함께 두어 한쪽이
            누락돼도 다른 쪽이 막습니다. 잡은 디스패처와 워커 2단으로 분리해 한
            셀러의 실패가 전체 잡을 막지 않고 실패분만 재큐잉되게 했습니다.
          </p>
          <CodeFigure
            caption="존재 가드(앱)와 유니크 인덱스(DB)의 이중 방어, 임계치 미달은 조기 반환"
            code={SETTLEMENT_SNIPPETS.idempotency}
          />

          <DecisionHeading>
            4. 민감정보의 노출 표면을 시점과 경로로 좁힙니다
          </DecisionHeading>
          <p className="text-sm text-muted-foreground leading-relaxed">
            계좌 원문은 암호화해 저장하고, 복호화는 CSV 생성 순간에만, 노출은
            다운로드 응답 본문에만 허용합니다. 스냅샷에는 뒷 4자리만 남깁니다.
          </p>
          <SecurityBoundaryDiagram />

          <DecisionHeading>5. 자동화하지 않는 것도 결정입니다</DecisionHeading>
          <p className="text-sm text-muted-foreground leading-relaxed">
            은행 송금은 지급대행 API를 붙이지 않고 담당자가 CSV를 받아 은행
            앱에서 수동 송금합니다. 현재 거래 규모에서는 구현, 운영, 규제 모든
            측면에서 수동이 더 단순하다는 트레이드오프를 명시적으로
            선택했습니다. 배포도 같은 원칙으로, 암호화 키 인프라처럼 위험한
            의존성을 본 기능과 분리해 4단계 머지 순서로 나눴습니다.
          </p>
        </section>

        <section aria-labelledby="implementation">
          <SectionHeading
            no="03"
            id="implementation"
            title="직접 구현한 것"
          />
          <p className="text-sm text-muted-foreground leading-relaxed">
            설계와 별개로, 정산이 가능하려면 선행되어야 하는 데이터 작업과
            셀러가 만나는 화면을 직접 구현했습니다.
          </p>

          <DecisionHeading>주문 시점 가격·VAT 스냅샷 (Rails)</DecisionHeading>
          <BulletList
            items={[
              '정산은 과거 주문이 일어난 그 순간의 가격으로 계산해야 합니다. 상품 가격과 세율은 미래에 바뀔 수 있으므로, 주문 시점의 입력가, 계산가, 세율, VAT 금액을 거래 레코드에 고정했습니다.',
              '과거 데이터에는 입력 기준 정보가 없었습니다. 셀러들이 최종 소비자가로 입력해 왔다는 운영 확인을 근거로, 모두 판매가 입력으로 가정한다는 정책을 합의한 뒤 백필했습니다. 데이터 마이그레이션은 기술 결정이 아니라 도메인 사실에 대한 합의가 먼저였습니다.',
              '전환 기간에는 신규, 레거시, 부분 전환 데이터가 공존합니다. 상품 상세, 장바구니, 영수증, 셀러 대시보드 4개 노출 지점이 같은 우선순위로 가격을 결정하도록 fallback 체인을 단일 진실 공급원으로 강제했습니다.',
            ]}
          />
          <CodeFigure
            caption="표시 가격 fallback 체인. 스냅샷이 최우선이고 역산은 마지막까지 피합니다"
            code={SETTLEMENT_SNIPPETS.fallbackChain}
          />

          <DecisionHeading>정산 페이지 UI (React)</DecisionHeading>
          <BulletList
            items={[
              '셀러 UX의 핵심 질문은 지금 얼마가, 언제, 왜 그만큼 들어오는가입니다. 단순 금액 대신 매출, 판매 수수료, 순정산액으로 분해한 펼침 카드를 만들고 정산 기준일을 함께 표기했습니다.',
              '예정, 완료, 미정산 세 종류 카드를 별도 컴포넌트로 쪼개는 대신 kind 식별자 하나로 분기해 중복을 줄였습니다.',
              '같은 작업을 PR 5개에 걸쳐 다시 열었습니다. 기존 화면을 직접 재작성하던 첫 PR을 닫고, 신규 컴포넌트를 병행 추가하는 방식으로 전환한 뒤 프리뷰 배포까지 안정화해 머지했습니다. 머지된 PR은 15개 파일, 신규 컴포넌트 356줄, 한국어 날짜·기간 문구를 케이스별로 고정한 테스트 78줄입니다.',
            ]}
          />
          <CodeFigure
            caption="카드 종류를 kind로 분기하고, 펼침 상세는 aria-expanded로 연결합니다"
            code={SETTLEMENT_SNIPPETS.payoutCard}
          />

          <DecisionHeading>계좌 등록 폼 (React)</DecisionHeading>
          <BulletList
            items={[
              '처음에는 기존 파일을 직접 수정하는 약 8,100줄, 30여 개 파일 PR로 진행했다가 닫고, 새 파일 추가와 진입점 import 교체만으로 재구성해 7개 파일, 약 470줄로 줄여 머지했습니다. diff 표면적을 줄이는 것이 리뷰 가능성을 만든다는 것을 체감한 작업입니다.',
              '계좌번호는 암호화된 원본과 마스킹된 표시용 메타데이터(은행 코드, 뒷 4자리, 예금주)를 분리해 저장합니다. 화면 표시는 복호화 없이 메타데이터만 사용합니다.',
              '은행 셀렉트 28개 기관의 저장 키를 사람이 읽는 은행명이 아니라 외부 표준 기관 코드로 잡아, 나중에 지급대행 API를 붙일 때 매핑 비용이 생기지 않게 했습니다.',
            ]}
          />

          <DecisionHeading>정책의 코드화 (Rails)</DecisionHeading>
          <BulletList
            items={[
              'KRW 또는 한국 사업자 계정의 최소 정산금 1만원 적용은 글로벌 로직을 보존한 채 조기 반환 분기 하나로 끼워 넣어 3개 파일, 약 25줄로 머지했습니다.',
              '한국 공휴일을 반영한 정산 기준일 계산은 gem 호출로 끝나지 않았습니다. 음력 연휴 전후일 묶기, 대체공휴일 법정 시행일, 같은 날 공휴일 중복까지 도메인 규칙으로 직접 구현했습니다.',
              '이 공휴일 PR은 자동 정산 전까지 정산일은 예상치라는 우선순위 판단으로 보류되었습니다. 구현 완성도와 출시 필요성은 다른 문제였습니다.',
            ]}
          />
          <CodeFigure
            caption="정산일을 주말과 공휴일을 피해 영업일로 보정합니다"
            code={SETTLEMENT_SNIPPETS.holidayAdjust}
          />
        </section>

        <section aria-labelledby="handoff">
          <SectionHeading no="04" id="handoff" title="핸드오프와 수렴" />
          <BulletList
            items={[
              '설계 문서는 제가 쓰고 백엔드 구현과 머지는 동료가 맡았습니다. 문서에 완료 기준과 머지 순서까지 담아 구현자가 바로 착수할 수 있게 했고, 저는 화면과 계산 규칙 선행 작업을 드래프트 PR로 만들어 설계 의도를 코드로 검증했습니다.',
              '설계는 그대로 구현되지 않았습니다. 8일 0시에 별도 확정 레코드를 만드는 초기 설계는 기존 결제 레코드의 정산 기간 종료일만으로 마감 회차를 식별할 수 있다는 구현 토론을 거쳐 컬럼 3개 추가로 단순해졌습니다.',
            ]}
          />
          <ConvergenceDiagram />
          <p className="text-sm text-muted-foreground leading-relaxed">
            설계가 구현 과정에서 깎이는 것은 실패가 아니라 정상적인 진화입니다.
            문서의 역할은 정답을 고정하는 것이 아니라 토론의 출발점을 만드는
            것이었습니다.
          </p>
        </section>

        <section aria-labelledby="learnings">
          <SectionHeading no="05" id="learnings" title="배움" />
          <BulletList
            items={[
              '테스트 커버리지가 리팩토링 전략을 결정합니다. 테스트가 충분하면 기존 코드를 고쳐 영향 범위를 드러내는 편이 낫고, 부족하면 새로 만들어 병행하고 테스트를 붙이는 편이 안전합니다.',
              'diff 표면적이 리뷰 가능성을 결정합니다. 같은 기능도 어떻게 쪼개 보여주느냐에 따라 머지까지의 거리가 달라집니다.',
              '금액은 추측하지 않습니다. 정산 규칙이 모호하면 코드로 추측하는 대신 기획에 확인하고 시작했습니다.',
              '기능의 필요성이 구현 완성도보다 먼저 검증됩니다. 잘 만든 코드라도 지금 필요하지 않으면 보류하는 판단이 옳았습니다.',
            ]}
          />
        </section>

        <footer className="mt-14 pt-6 border-t border-border">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← 홈 타임라인으로 돌아가기
          </Link>
        </footer>
      </article>
    </main>
  )
}
