import {
  SectionSkeleton,
  Skeleton,
  SkeletonText,
} from '@/components/ui/loading/Skeleton/SkeletonKit'

/**
 * Hero Section Skeleton
 * Mimics the structure of the HeroSection component
 */
export const HeroSectionSkeleton = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex flex-col md:flex-row items-center">
        {/* Text Area Skeleton */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <Skeleton height="3rem" className="mb-6 max-w-md" />
          <SkeletonText lines={3} className="mb-8 max-w-lg" />
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton height="3rem" width="150px" />
            <Skeleton height="3rem" width="150px" />
            <Skeleton height="3rem" width="150px" />
          </div>
        </div>

        {/* Visual Area Skeleton */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md h-80 md:h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/30 to-secondary/10 rounded-lg opacity-20 blur-xl"></div>
            <div className="relative h-full flex items-center justify-center">
              <div className="bg-card p-6 rounded-lg shadow-lg w-full max-w-sm">
                <div className="flex justify-between items-center mb-4">
                  <Skeleton height="1.5rem" width="120px" />
                  <Skeleton height="12px" width="12px" circle />
                </div>
                <div className="space-y-3">
                  <Skeleton height="4rem" className="rounded-lg" />
                  <Skeleton height="4rem" className="rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
/**
 * Features Section Skeleton
 */
export const FeaturesSectionSkeleton = () => {
  return (
    <SectionSkeleton background="bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-6 bg-card rounded-lg">
            <Skeleton height="3rem" width="3rem" circle className="mb-4" />
            <Skeleton height="1.5rem" width="150px" className="mb-3" />
            <SkeletonText lines={3} />
          </div>
        ))}
      </div>
    </SectionSkeleton>
  )
}
/**
 * Benefits Section Skeleton
 */
export const BenefitsSectionSkeleton = () => {
  return (
    <SectionSkeleton background="bg-secondary/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton height="2.5rem" width="2.5rem" circle />
            <div className="flex-1">
              <Skeleton height="1.5rem" width="150px" className="mb-3" />
              <SkeletonText lines={2} />
            </div>
          </div>
        ))}
      </div>
    </SectionSkeleton>
  )
}
/**
 * Demo Showcase Section Skeleton
 */
export const DemoShowcaseSectionSkeleton = () => {
  return (
    <SectionSkeleton background="bg-background">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2">
          <div className="phone-mockup bg-card aspect-[9/16] w-full max-w-xs mx-auto">
            <Skeleton height="100%" />
          </div>
        </div>
        <div className="md:w-1/2">
          <SkeletonText lines={4} className="mb-6" />
          <div className="flex gap-4">
            <Skeleton height="2.5rem" width="120px" />
            <Skeleton height="2.5rem" width="120px" />
          </div>
        </div>
      </div>
    </SectionSkeleton>
  )
}
/**
 * FAQ Section Skeleton
 */
export const FAQSectionSkeleton = () => {
  return (
    <SectionSkeleton background="bg-secondary/10">
      <div className="space-y-4 max-w-3xl mx-auto">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-6 bg-card rounded-lg">
            <Skeleton height="1.5rem" className="mb-4" />
            <SkeletonText lines={3} />
          </div>
        ))}
      </div>
    </SectionSkeleton>
  )
}
/**
 * CTA Section Skeleton
 */
export const CTASectionSkeleton = () => {
  return (
    <SectionSkeleton background="bg-primary/5">
      <div className="text-center">
        <SkeletonText lines={2} className="max-w-2xl mx-auto mb-8" />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Skeleton height="3rem" width="150px" />
          <Skeleton height="3rem" width="150px" />
        </div>
      </div>
    </SectionSkeleton>
  )
}
/**
 * Page Skeleton - combines all section skeletons
 */
export const HomePageSkeleton = () => {
  return (
    <>
      <HeroSectionSkeleton />
      <FeaturesSectionSkeleton />
      <BenefitsSectionSkeleton />
      <DemoShowcaseSectionSkeleton />
      <FAQSectionSkeleton />
      <CTASectionSkeleton />
    </>
  )
}
