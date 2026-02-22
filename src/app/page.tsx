'use client'

import PortfolioCTASection from '@/components/sections/CTASection'
import PortfolioFAQSection from '@/components/sections/FAQSection'
import PortfolioHeroSection from '@/components/sections/HeroSection'
import PersonalSection from '@/components/sections/PersonalSection'
import SectionPreviewNav from '@/components/sections/SectionPreviewNav'
import TechStackSection from '@/components/sections/TechStackSection'
// import UXDesignSection from '@/components/sections/UXDesignSection'
import StepperDialog from '@/components/ui/containers/Modal/StepperDialog'
import AnnouncementModal from '@/components/ui/containers/Modal/AnnouncementModal'
import { useModal } from '@/lib/hooks/useModal'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const { modalName, closeModal } = useModal()
  const [, setShowAnnouncement] = useState(false)

  useEffect(() => {
    // Check if user has closed it today
    const lastClosed = localStorage.getItem('npmAnnouncementClosedDate')
    const today = new Date().toDateString()

    if (lastClosed !== today) {
      setShowAnnouncement(true)
    }
  }, [])

  const handleCloseAnnouncement = (dontShowToday: boolean = false) => {
    setShowAnnouncement(false)
    if (dontShowToday) {
      const today = new Date().toDateString()
      localStorage.setItem('npmAnnouncementClosedDate', today)
    }
  }

  return (
    <div className="flex flex-col items-center">
      {/* NPM Announcement Modal */}
      <AnnouncementModal
        isOpen={false}
        onRequestClose={handleCloseAnnouncement}
      />

      {/* Contact Dialog */}
      <StepperDialog
        isOpen={modalName === 'contactDialog'}
        onRequestClose={closeModal}
      />

      {/* Main Content */}
      <main className="w-full">
        {/* Portfolio Content */}
        <div className="w-full bg-gradient-to-b from-background to-secondary/5">
          <PortfolioHeroSection />
          <SectionPreviewNav />
          {/*<DemoShowcaseSection />*/}
          {/*<ProjectsSection />*/}
          <PersonalSection />
          <TechStackSection />
          {/*<UXDesignSection />*/}
          <PortfolioFAQSection />
          <PortfolioCTASection />
          {/*<NewsletterSection />*/}
        </div>
      </main>
    </div>
  )
}
