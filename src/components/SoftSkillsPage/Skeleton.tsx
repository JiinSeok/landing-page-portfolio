import {
  SectionSkeleton,
  Skeleton,
  SkeletonText,
  NavigationSkeleton,
} from '@/components/ui/loading/Skeleton/SkeletonKit'

/**
 * SoftSkills Page Header Skeleton
 */
export const SoftSkillsHeaderSkeleton = () => {
  return (
    <div className="mb-12 text-center">
      <Skeleton height="2.5rem" width="300px" className="mx-auto mb-4" />
      <SkeletonText lines={1} className="max-w-lg mx-auto" />
    </div>
  )
}

/**
 * SoftSkills Entry Skeleton
 */
export const SoftSkillsEntrySkeleton = () => {
  return (
    <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
        <Skeleton height="1.5rem" width="200px" className="mb-2 md:mb-0" />
        <Skeleton height="1rem" width="100px" />
      </div>
      
      <SkeletonText lines={2} className="mb-4" />
      
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton 
            key={index} 
            height="1.5rem" 
            width={`${60 + Math.random() * 40}px`} 
            className="rounded-full" 
          />
        ))}
      </div>
    </div>
  )
}

/**
 * SoftSkills Content Skeleton
 */
export const SoftSkillsContentSkeleton = () => {
  return (
    <div className="space-y-8">
      {Array.from({ length: 5 }).map((_, index) => (
        <SoftSkillsEntrySkeleton key={index} />
      ))}
    </div>
  )
}

/**
 * SoftSkills Page Skeleton - combines all section skeletons
 */
export const SoftSkillsPageSkeleton = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationSkeleton />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <section>
          <SoftSkillsHeaderSkeleton />
          <SoftSkillsContentSkeleton />
        </section>
      </main>
      
      {/* Footer would be included in the layout */}
    </div>
  )
}