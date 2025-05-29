import FooterSection from '@/components/sections/FooterSection'
import SiteBuildSection from '@/components/sections/SiteBuildSection'
import Navigation from '@/components/layout/Navigation'

/**
 * SiteBuildPage component
 *
 * This page explains how the website was built, including technologies used,
 * development process, site structure, applied methods, and new learnings.
 */
export default function SiteBuildPage() {
  return (
    <div className="flex flex-col items-center">
      <Navigation />
      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        {/* Title moved to SiteBuildSection component to avoid duplication */}
      </div>
      <SiteBuildSection />
      <FooterSection />
    </div>
  )
}
