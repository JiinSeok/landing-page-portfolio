import {
  Skeleton,
  SkeletonText,
  NavigationSkeleton,
} from '@/components/ui/loading/Skeleton/SkeletonKit'

/**
 * Projects Header Skeleton
 */
export const ProjectsHeaderSkeleton = () => {
  return (
    <Skeleton height="2rem" width="150px" className="mb-8" />
  )
}

/**
 * Project Item Skeleton
 */
export const ProjectItemSkeleton = () => {
  return (
    <div className="block group">
      <div className="flex flex-col">
        <div className="w-full flex justify-between items-baseline">
          <Skeleton height="1.5rem" width="200px" />
          <Skeleton height="1rem" width="60px" />
        </div>
        <SkeletonText lines={2} className="pt-3" />
      </div>
    </div>
  )
}

/**
 * Projects Content Skeleton
 */
export const ProjectsContentSkeleton = () => {
  return (
    <div className="space-y-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <ProjectItemSkeleton key={index} />
      ))}
    </div>
  )
}

/**
 * Projects Page Skeleton - combines all section skeletons
 */
export const ProjectsPageSkeleton = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationSkeleton />
      
      <section className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <ProjectsHeaderSkeleton />
        <ProjectsContentSkeleton />
      </section>
      
      {/* Footer would be included in the layout */}
    </div>
  )
}