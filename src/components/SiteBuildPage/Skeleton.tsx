import {
  SectionSkeleton,
  Skeleton,
  SkeletonText,
  NavigationSkeleton,
} from '@/components/ui/loading/Skeleton/SkeletonKit'

/**
 * SiteBuild Header Skeleton
 */
export const SiteBuildHeaderSkeleton = () => {
  return (
    <div className="text-center mb-16">
      <Skeleton height="2.5rem" width="300px" className="mx-auto mb-4" />
      <SkeletonText lines={2} className="max-w-2xl mx-auto" />
    </div>
  )
}

/**
 * SiteBuild Features Grid Skeleton
 */
export const SiteBuildFeaturesGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-card p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center mb-4">
            <Skeleton height="3rem" width="3rem" circle className="mr-4" />
            <Skeleton height="1.5rem" width="150px" />
          </div>
          <SkeletonText lines={2} />
        </div>
      ))}
    </div>
  )
}

/**
 * Development Process Diagram Skeleton
 */
export const DevelopmentProcessSkeleton = () => {
  return (
    <div className="mt-16 bg-card p-8 rounded-lg shadow-md">
      <Skeleton height="2rem" width="250px" className="mx-auto mb-6" />
      <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center text-center max-w-xs">
            <Skeleton height="4rem" width="4rem" circle className="mb-4" />
            <Skeleton height="1.5rem" width="100px" className="mb-2" />
            <SkeletonText lines={2} className="text-sm" />
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Site Structure Diagram Skeleton
 */
export const SiteStructureSkeleton = () => {
  return (
    <div className="mt-16 bg-card p-8 rounded-lg shadow-md">
      <Skeleton height="2rem" width="250px" className="mx-auto mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-background p-6 rounded-lg border border-border">
            <div className="flex items-center mb-3">
              <Skeleton height="1.5rem" width="1.5rem" circle className="mr-2" />
              <Skeleton height="1.5rem" width="100px" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, itemIndex) => (
                <div key={itemIndex} className="flex items-start">
                  <Skeleton height="0.5rem" width="0.5rem" circle className="mr-2 mt-1" />
                  <Skeleton height="1rem" width="150px" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Applied Methods Skeleton
 */
export const AppliedMethodsSkeleton = () => {
  return (
    <div className="mt-16 bg-card p-8 rounded-lg shadow-md">
      <Skeleton height="2rem" width="250px" className="mx-auto mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="bg-background p-6 rounded-lg border border-border">
            <div className="flex items-center mb-3">
              <Skeleton height="1.5rem" width="1.5rem" circle className="mr-2" />
              <Skeleton height="1.5rem" width="180px" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, itemIndex) => (
                <div key={itemIndex} className="flex items-start">
                  <Skeleton height="0.5rem" width="0.5rem" circle className="mr-2 mt-1" />
                  <Skeleton height="1rem" width="180px" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Learnings Skeleton
 */
export const LearningsSkeleton = () => {
  return (
    <div className="mt-16 bg-card p-8 rounded-lg shadow-md">
      <Skeleton height="2rem" width="250px" className="mx-auto mb-6" />
      <div className="space-y-4">
        <SkeletonText lines={3} />
        <div className="space-y-2 pl-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-start">
              <Skeleton height="0.5rem" width="0.5rem" circle className="mr-2 mt-1" />
              <Skeleton height="1rem" width="90%" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * SiteBuild Section Skeleton - combines all section skeletons
 */
export const SiteBuildSectionSkeleton = () => {
  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-3">
        <SiteBuildHeaderSkeleton />
        <SiteBuildFeaturesGridSkeleton />
        <DevelopmentProcessSkeleton />
        <SiteStructureSkeleton />
        <AppliedMethodsSkeleton />
        <LearningsSkeleton />
      </div>
    </section>
  )
}

/**
 * SiteBuild Page Skeleton - combines all section skeletons
 */
export const SiteBuildPageSkeleton = () => {
  return (
    <div className="flex flex-col items-center">
      <NavigationSkeleton />
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        {/* Title moved to SiteBuildSection component to avoid duplication */}
      </div>
      <SiteBuildSectionSkeleton />
      {/* Footer would be included in the layout */}
    </div>
  )
}