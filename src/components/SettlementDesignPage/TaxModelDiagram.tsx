const MODELS = [
  {
    name: '미국형 엔진 (tax-exclusive)',
    steps: ['상품가 $10 표시', '체크아웃에서 세금 추가', '결제 직전에야 총액 확정'],
  },
  {
    name: '한국 총액표시제',
    steps: [
      'VAT 포함 11,000원 표시',
      '체크아웃 금액 그대로',
      '공급가·VAT 분해는 시스템 책임',
    ],
  },
]

export default function TaxModelDiagram() {
  return (
    <figure className="my-6">
      <div className="grid gap-3 md:grid-cols-2 md:gap-4">
        {MODELS.map((model) => (
          <div
            key={model.name}
            className="p-4 bg-secondary/20 border border-border rounded-md"
          >
            <p className="mb-3 text-sm font-semibold">{model.name}</p>
            <ol className="space-y-1.5">
              {model.steps.map((step, i) => (
                <li
                  key={step}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="shrink-0 w-4 font-mono text-xs leading-5 text-muted-foreground/70">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <figcaption className="mt-2 text-xs text-muted-foreground text-center">
        세금을 언제 계산하느냐의 간극이 가격 데이터 모델 전체 개편으로 번졌습니다
      </figcaption>
    </figure>
  )
}
