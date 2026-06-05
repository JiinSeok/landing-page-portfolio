const CYCLE_STEPS = [
  {
    day: '1일 ~ 말일',
    title: '거래 누적',
    detail: '주문과 환불이 셀러 잔액에 반영됩니다',
  },
  {
    day: '~ 익월 7일',
    title: '변동 반영',
    detail: '전월 거래의 환불·이의제기를 마감 전까지 수용합니다',
  },
  {
    day: '8일 0시',
    title: '스냅샷 마감',
    detail: '그 시점 잔액을 고정해 정산 금액을 확정합니다',
  },
  {
    day: '10일',
    title: '입금',
    detail: '담당자가 CSV를 받아 은행에서 송금합니다',
  },
]

export default function MonthlyCycleDiagram() {
  return (
    <figure className="my-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-stretch">
        {CYCLE_STEPS.map((step, i) => (
          <div key={step.day} className="contents">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="self-center text-muted-foreground/60"
              >
                <span className="hidden md:inline">→</span>
                <span className="md:hidden">↓</span>
              </span>
            )}
            <div className="flex-1 p-3 bg-secondary/20 border border-border rounded-md">
              <p className="font-mono text-xs text-muted-foreground">
                {step.day}
              </p>
              <p className="mt-0.5 text-sm font-semibold">{step.title}</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {step.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-2 text-xs text-muted-foreground text-center">
        임계치 미달 잔액은 레코드를 만들지 않고 다음 달 8일에 다시 판정합니다
      </figcaption>
    </figure>
  )
}
