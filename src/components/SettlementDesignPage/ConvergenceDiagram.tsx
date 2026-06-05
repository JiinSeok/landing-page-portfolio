const CONVERGENCE_STEPS = [
  {
    phase: '초기 설계',
    detail: '8일 0시에 별도 확정 레코드를 생성하는 스냅샷 모델',
  },
  {
    phase: '구현·리뷰 토론',
    detail: '기존 레코드의 정산 기간 종료일만으로 마감 회차 식별 가능',
  },
  {
    phase: '최종 구현',
    detail: '새 모델 없이 기존 결제 레코드에 컬럼 3개 추가로 단순화',
  },
]

export default function ConvergenceDiagram() {
  return (
    <figure className="my-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-stretch">
        {CONVERGENCE_STEPS.map((step, i) => (
          <div key={step.phase} className="contents">
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
              <p className="text-xs font-semibold text-muted-foreground">
                {step.phase}
              </p>
              <p className="mt-1 text-sm leading-relaxed">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-2 text-xs text-muted-foreground text-center">
        설계가 구현 토론을 거치며 더 단순한 형태로 수렴했습니다
      </figcaption>
    </figure>
  )
}
