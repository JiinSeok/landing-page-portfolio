const FLOW_STEPS = [
  { title: '암호화 저장', detail: '계좌 원문은 DB에 암호화 상태로만 존재' },
  { title: 'CSV 생성 순간에만 복호화', detail: '담당자 권한으로 요청한 때만' },
  { title: '다운로드 응답 본문에만 노출', detail: '평문이 머무는 유일한 경로' },
]

const BLOCKED_PATHS = [
  '로그에 원문 기록 차단',
  '스냅샷에는 뒷 4자리만 저장',
  '외부 시스템 전송 없음',
]

export default function SecurityBoundaryDiagram() {
  return (
    <figure className="my-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-stretch">
        {FLOW_STEPS.map((step, i) => (
          <div key={step.title} className="contents">
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
              <p className="text-sm font-semibold">{step.title}</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {step.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
      <ul className="flex flex-wrap gap-2 mt-3">
        {BLOCKED_PATHS.map((path) => (
          <li
            key={path}
            className="px-2.5 py-1 border border-dashed border-border text-xs text-muted-foreground rounded-full"
          >
            {path}
          </li>
        ))}
      </ul>
    </figure>
  )
}
