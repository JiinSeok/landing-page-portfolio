'use client'

import { TabComponent, TabItem } from '@/components/ui/TabComponent'
import { TECH_STACK_CATEGORIES, TECH_STACK_WITH_EXPERIENCE } from '@/lib/constants/sections/techStack'
import { useTranslations } from '@/lib/constants/mock-translations'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

/**
 * Tech Stack section component for the homepage
 *
 * This component displays the developer's technical skills and expertise,
 * including detailed experience information organized by categories.
 */
export default function TechStackSection() {
  const t = useTranslations('HomePage')
  const [activeCategory, setActiveCategory] = useState<string>(
    TECH_STACK_CATEGORIES[0],
  )
  const [showMoreIndicator, setShowMoreIndicator] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Check if content overflows to show the indicator
  useEffect(() => {
    const checkOverflow = () => {
      if (cardRef.current) {
        const isOverflowing =
          cardRef.current.scrollHeight > cardRef.current.clientHeight
        setShowMoreIndicator(isOverflowing)
      }
    }

    checkOverflow()
    window.addEventListener('resize', checkOverflow)

    return () => {
      window.removeEventListener('resize', checkOverflow)
    }
  }, [activeCategory])

  // Auto-rotate category tabs every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Find current category index
      const currentIndex = TECH_STACK_CATEGORIES.findIndex(
        (category) => category === activeCategory,
      )
      // Calculate next category index (loop back to 0 if at the end)
      const nextIndex = (currentIndex + 1) % TECH_STACK_CATEGORIES.length
      // Set the next category as active
      setActiveCategory(TECH_STACK_CATEGORIES[nextIndex])
    }, 5000) // Change category every 5 seconds

    // Clean up interval on component unmount
    return () => clearInterval(interval)
  }, [activeCategory])

  // Create tab items from categories
  const categoryTabs: TabItem[] = TECH_STACK_CATEGORIES.map((category) => ({
    id: category,
    label: category,
    content: (
      <div className="bg-card p-6 rounded-lg shadow-lg w-full">
        {/*<div className="flex items-center mb-6">*/}
        {/*  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">*/}
        {/*    <span className="text-2xl">💻</span>*/}
        {/*  </div>*/}
        {/*  <div>*/}
        {/*    <h4 className="font-semibold">{category}</h4>*/}
        {/*    <p className="text-sm text-muted-foreground">*/}
        {/*      {t('tech-stack.skills.subtitle')}*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="space-y-6 grid grid-cols-1 gap-4">
          {(() => {
            const filteredTech = TECH_STACK_WITH_EXPERIENCE.filter(
              (tech) => tech.category === category,
            )

            // If there are no tech items for this category, show a placeholder
            if (filteredTech.length === 0) {
              return (
                <div className="border-b pb-4 last:border-0">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 mr-3 relative bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-lg">📚</span>
                    </div>
                    <h5
                      className="font-medium"
                      id={category.toLowerCase().replace(/\s+/g, '-')}
                    >
                      {category} 기술
                    </h5>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {category} 관련 기술을 사용한 경험이 있습니다. 자세한 내용은
                    추가될 예정입니다.
                  </p>
                </div>
              )
            }

            // Otherwise, show the filtered tech items
            return filteredTech.map((tech, index) => (
              <div key={index} className="border-b pb-4 last:border-0">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 mr-3 relative">
                    <Image
                      src={
                        tech.logo ||
                        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
                      }
                      alt={tech.name}
                      width={32}
                      height={32}
                    />
                  </div>
                  <h5 className="font-medium">{tech.name}</h5>
                  {/*<span className="ml-auto text-xs text-muted-foreground">*/}
                  {/*  {tech.experience}*/}
                  {/*</span>*/}
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {tech.description}
                </p>
                <div className="space-y-1">
                  {tech.projects.map((project, idx) => (
                    <div
                      key={idx}
                      className="text-xs flex items-start text-muted-foreground"
                    >
                      <span className="text-primary mr-2">•</span>
                      <span>{project}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          })()}
        </div>
      </div>
    ),
  }))

  return (
    <section id="tech-stack" className="w-full py-20 bg-secondary/10">
      <div className="max-w-7xl mx-auto px-3">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('tech-stack.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('tech-stack.subtitle')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Tech categories */}
          <div className="w-full lg:w-2/3">
            <TabComponent
              tabs={categoryTabs}
              activeTab={activeCategory}
              setActiveTab={setActiveCategory}
              className="w-full"
              tabClassName="px-4 py-2 rounded-md text-sm font-medium transition-colors"
              activeTabClassName="bg-primary text-white"
              inactiveTabClassName="bg-secondary/50 hover:bg-secondary/80"
            />
          </div>

          {/* Right column - Tech skills */}
          <div className="w-full lg:w-1/3">
            <div className="bg-card p-6 rounded-lg shadow-lg h-full">
              <h3 className="text-xl font-semibold mb-6">
                {t('tech-stack.frontend.title')}
              </h3>
              <div
                ref={cardRef}
                className="space-y-4 overflow-auto max-h-[400px] pr-2"
              >
                {/* Frontend skills */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">TypeScript</span>
                    <span className="text-xs text-muted-foreground">95%</span>
                  </div>
                  <div className="w-full bg-secondary/30 rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2"
                      style={{ width: '95%' }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">React</span>
                    <span className="text-xs text-muted-foreground">90%</span>
                  </div>
                  <div className="w-full bg-secondary/30 rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2"
                      style={{ width: '90%' }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Next.js</span>
                    <span className="text-xs text-muted-foreground">85%</span>
                  </div>
                  <div className="w-full bg-secondary/30 rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2"
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Tailwind CSS</span>
                    <span className="text-xs text-muted-foreground">90%</span>
                  </div>
                  <div className="w-full bg-secondary/30 rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2"
                      style={{ width: '90%' }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Redux</span>
                    <span className="text-xs text-muted-foreground">80%</span>
                  </div>
                  <div className="w-full bg-secondary/30 rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2"
                      style={{ width: '80%' }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">React Query</span>
                    <span className="text-xs text-muted-foreground">85%</span>
                  </div>
                  <div className="w-full bg-secondary/30 rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2"
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Show more indicator if content overflows */}
              {showMoreIndicator && (
                <div className="text-center mt-4">
                  <span className="text-xs text-muted-foreground">
                    Scroll for more
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
