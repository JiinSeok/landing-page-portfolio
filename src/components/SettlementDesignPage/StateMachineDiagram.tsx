const STATES = [
  { name: 'pending', label: '8일 0시 스냅샷 생성' },
  { name: 'in_progress', label: 'CSV 다운로드, 계좌 잠금' },
  { name: 'settled', label: '송금 완료 기록, 잠금 해제' },
]

export default function StateMachineDiagram() {
  return (
    <figure className="my-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-stretch">
        {STATES.map((state, i) => (
          <div key={state.name} className="contents">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="self-center text-muted-foreground/60"
              >
                <span className="hidden md:inline">→</span>
                <span className="md:hidden">↓</span>
              </span>
            )}
            <div className="flex-1 p-3 text-center bg-secondary/20 border border-border rounded-md">
              <p className="font-mono text-sm font-semibold">{state.name}</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {state.label}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 p-3 border border-dashed border-border rounded-md">
        <p className="text-xs text-muted-foreground leading-relaxed">
          잠금은 별도 플래그 컬럼이 아니라 in_progress 레코드의 존재로
          파생합니다. 플래그와 실제 상태가 어긋나는 동기화 버그가 구조적으로
          생길 수 없습니다.
        </p>
      </div>
    </figure>
  )
}
