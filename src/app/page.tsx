'use client'

import PortfolioFAQSection from '@/components/sections/FAQSection'
import PersonalSection from '@/components/sections/PersonalSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import TechStackSection from '@/components/sections/TechStackSection'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <main className="w-full">
        <div className="w-full bg-gradient-to-b from-background to-secondary/5">
          <PersonalSection />
          <ProjectsSection />
          <TechStackSection />
          <PortfolioFAQSection />
        </div>
      </main>
    </div>
  )
}
