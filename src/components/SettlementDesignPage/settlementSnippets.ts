export const SETTLEMENT_SNIPPETS = {
  derivedLock: `def can_update_payout_account?
  payouts.where(state: :in_progress).none?
end

before_action :ensure_unlocked, only: [:update]

def ensure_unlocked
  return if current_seller.can_update_payout_account?

  redirect_to settings_path,
    alert: '정산이 진행 중이라 계좌를 변경할 수 없습니다.'
end`,
  idempotency: `def create_monthly_snapshot(seller, month:)
  return if Payout.exists?(seller:, month:)

  balances = seller.unpaid_balances_up_to(month.end_of_month)
  net = balances.sum(&:amount_cents)
  return if net < seller.payout_threshold_cents

  Payout.create!(
    seller:, month:, amount_cents: net,
    state: :pending, snapshot: build_snapshot(balances),
  )
end

add_index :payouts, [:seller_id, :month], unique: true`,
  fallbackChain: `def displaying_sale_price_cents
  snapshot_sale_price_cents ||
    entered_sale_price_cents ||
    computed_from_supply_price ||
    legacy_price_cents
end

def computed_from_supply_price
  return if entered_supply_price_cents.nil?

  entered_supply_price_cents +
    vat_amount_cents(entered_supply_price_cents, vat_policy)
end`,
  payoutCard: `type CardKind = 'current' | 'past' | 'carryover'

const CARD_TITLES: Record<CardKind, string> = {
  current: '이번 정산',
  past: '완료된 정산',
  carryover: '미정산 잔액',
}

function PayoutCard({ kind, payout }: PayoutCardProps) {
  const detailId = useId()
  const [open, setOpen] = useState(false)

  return (
    <section aria-label={CARD_TITLES[kind]}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={detailId}
        onClick={() => setOpen(!open)}
      >
        {CARD_TITLES[kind]} · {formatKrw(payout.netCents)}
      </button>
      <dl id={detailId} hidden={!open}>
        <dt>매출</dt>
        <dd>{formatKrw(payout.salesCents)}</dd>
        <dt>판매 수수료</dt>
        <dd>-{formatKrw(payout.feesCents)}</dd>
      </dl>
    </section>
  )
}`,
  holidayAdjust: `PAYOUT_DAY = 10

def payout_date_for(reference)
  target = adjust_for_holiday(reference.change(day: PAYOUT_DAY))
  return target if target >= reference

  adjust_for_holiday(reference.next_month.change(day: PAYOUT_DAY))
end

def adjust_for_holiday(date)
  date += 1.day while holiday?(date)
  date
end

def holiday?(date)
  date.on_weekend? || public_holidays(date.year).key?(date)
end`,
}
