'use client'

import PortfolioFAQSection from '@/components/sections/FAQSection'
import PersonalSection from '@/components/sections/PersonalSection'
import TechStackSection from '@/components/sections/TechStackSection'
import TimelineToc from '@/components/sections/TimelineToc'
import { RAIL_OFFSET_LG, RAIL_OFFSET_MD } from '@/lib/constants/layout'
import { useTimelineData } from '@/lib/hooks/useTimelineData'

export default function HomePage() {
  const { tocItems, nowKey } = useTimelineData()

  return (
    <div className="flex flex-col items-center overflow-x-clip">
      <div
        aria-hidden
        className="hidden md:block lg:hidden fixed inset-y-0 left-0 -z-10 dark bg-background"
        style={{
          width: `calc((100% - min(72rem, 100%)) / 2 + ${RAIL_OFFSET_MD}px)`,
        }}
      />
      <div
        aria-hidden
        className="hidden lg:block fixed inset-y-0 left-0 -z-10 dark bg-background"
        style={{
          width: `calc((100% - min(72rem, 100%)) / 2 + ${RAIL_OFFSET_LG}px)`,
        }}
      />
      <main className="w-full">
        <h1 className="sr-only">석지인 — 개발자 포트폴리오</h1>
        <TimelineToc items={tocItems} nowKey={nowKey} />
        <div className="w-full">
          <PersonalSection />
          <TechStackSection />
          <PortfolioFAQSection />
        </div>
      </main>
    </div>
  )
}
