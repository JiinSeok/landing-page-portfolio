import {
  SectionSkeleton,
  Skeleton,
  SkeletonText,
  NavigationSkeleton,
} from '@/components/ui/loading/Skeleton/SkeletonKit'

/**
 * TIL Page Header Skeleton
 */
export const TILHeaderSkeleton = () => {
  return (
    <div className="mb-12 text-center">
      <Skeleton height="2.5rem" width="300px" className="mx-auto mb-4" />
      <SkeletonText lines={1} className="max-w-lg mx-auto" />
    </div>
  )
}

/**
 * TIL Banner Preview Section Skeleton
 */
export const TILBannerSkeleton = () => {
  return (
    <div className="mb-16">
      <div className="relative w-full max-w-2xl mx-auto h-auto min-h-[340px] md:min-h-[420px] rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/30 to-secondary/10 rounded-xl opacity-20 blur-xl"></div>
        <div className="relative h-full flex flex-col items-center justify-center p-6 md:p-8">
          {/* Tab Navigation Skeleton */}
          <div className="w-full mb-6">
            <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} height="2rem" width="100px" className="mb-2" />
              ))}
            </div>
          </div>
          
          {/* Content Card Skeleton */}
          <div className="w-full">
            <div className="p-6 bg-card rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Skeleton height="2rem" width="2rem" circle className="mr-3" />
                <Skeleton height="1.5rem" width="200px" />
              </div>
              
              {/* Image Placeholder */}
              <Skeleton height="200px" className="w-full rounded-lg mb-4" />
              
              <SkeletonText lines={3} className="mb-4" />
              
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton 
                    key={index} 
                    height="1.5rem" 
                    width={`${60 + Math.random() * 40}px`} 
                    className="rounded-full" 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * TIL Entry Skeleton
 */
export const TILEntrySkeleton = () => {
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
 * TIL Entries List Skeleton
 */
export const TILEntriesListSkeleton = () => {
  return (
    <div className="space-y-8">
      <Skeleton height="2rem" width="200px" className="mb-6" />
      
      {Array.from({ length: 5 }).map((_, index) => (
        <TILEntrySkeleton key={index} />
      ))}
    </div>
  )
}

/**
 * TIL Page Skeleton - combines all section skeletons
 */
export const TILPageSkeleton = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationSkeleton />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <section>
          <TILHeaderSkeleton />
          <TILBannerSkeleton />
          <TILEntriesListSkeleton />
        </section>
      </main>
      
      {/* Footer would be included in the layout */}
    </div>
  )
}