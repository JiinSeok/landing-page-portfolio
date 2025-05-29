'use client'

import PortfolioCTASection from '@/components/sections/CTASection'
import DemoShowcaseSection from '@/components/sections/DemoShowcaseSection'
import PortfolioFAQSection from '@/components/sections/FAQSection'
import Footer from '@/components/layout/Footer'
import PortfolioHeroSection from '@/components/sections/HeroSection'
import NewsletterSection from '@/components/sections/NewsletterSection'
import PersonalSection from '@/components/sections/PersonalSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import TechStackSection from '@/components/sections/TechStackSection'
import UXDesignSection from '@/components/sections/UXDesignSection'
import StepperDialog from '@/components/ui/containers/Modal/StepperDialog'
import Navigation from '@/components/layout/Navigation'
import { useModal } from '@/lib/hooks/useModal'
import { useTranslations } from '@/lib/providers/TextContext'
import { JSX, useState } from 'react'

export default function HomePage(): JSX.Element {
  const { modalName, openModal, closeModal } = useModal()
  const t = useTranslations('pages.home')
  const [email, setEmail] = useState('')

  const handleSubmit = (data: any) => {
    console.log('Subscribed with email:', data.email)
    // 여기에 이메일 구독 로직 추가
    setEmail('')
  }

  return (
    <div className="flex flex-col items-center">
      {/* Contact Dialog */}
      <StepperDialog
        isOpen={modalName === 'contactDialog'}
        onRequestClose={closeModal}
      />



      {/* Main Content */}
      <main className="w-full">
        {/* Portfolio Content */}
        <div className="w-full bg-gradient-to-b from-background to-secondary/5 py-12 md:py-16 lg:py-20">
          <PortfolioHeroSection />
          <DemoShowcaseSection />
          <PersonalSection />
          <ProjectsSection />
          <TechStackSection />
          <UXDesignSection />
          <PortfolioFAQSection />
          <PortfolioCTASection />
          <NewsletterSection />
        </div>
      </main>
    </div>
  )
}
