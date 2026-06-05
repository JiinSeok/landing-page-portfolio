'use client'

import PortfolioFAQSection from '@/components/sections/FAQSection'
import PersonalSection from '@/components/sections/PersonalSection'
import TechStackSection from '@/components/sections/TechStackSection'
import TimelineToc from '@/components/sections/TimelineToc'
import { useTimelineData } from '@/lib/hooks/useTimelineData'

export default function HomePage() {
  const { tocItems, nowKey } = useTimelineData()

  return (
    <div className="flex flex-col items-center overflow-x-clip">
      <main className="w-full">
        <TimelineToc items={tocItems} nowKey={nowKey} />
        <div className="w-full bg-gradient-to-b from-background to-secondary/5">
          <PersonalSection />
          <TechStackSection />
          <PortfolioFAQSection />
        </div>
      </main>
    </div>
  )
}
