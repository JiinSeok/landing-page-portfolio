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
      <div
        aria-hidden
        className="hidden md:block lg:hidden fixed inset-y-0 left-0 -z-10 dark bg-background"
        style={{
          width: 'calc((100% - min(72rem, 100%)) / 2 + 132px)',
        }}
      />
      <div
        aria-hidden
        className="hidden lg:block fixed inset-y-0 left-0 -z-10 dark bg-background"
        style={{
          width: 'calc((100% - min(72rem, 100%)) / 2 + 148px)',
        }}
      />
      <main className="w-full">
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
