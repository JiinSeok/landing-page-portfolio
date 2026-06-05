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
        <div className="relative w-full bg-background">
          <div
            aria-hidden
            className="hidden md:block absolute inset-y-0 left-0 dark bg-background"
            style={{
              width:
                'calc((100% - min(72rem, 100%)) / 2 + 164px)',
            }}
          />
          <div
            aria-hidden
            className="hidden lg:block absolute inset-y-0 left-0 dark bg-background"
            style={{
              width:
                'calc((100% - min(72rem, 100%)) / 2 + 196px)',
            }}
          />
          <div className="relative">
            <PersonalSection />
            <TechStackSection />
            <PortfolioFAQSection />
          </div>
        </div>
      </main>
    </div>
  )
}
