'use client'

import { TabComponent, TabItem } from '@/components/ui/TabComponent'
import { ContentCard } from '@/components/ui/ContentCard'
import {
  TECH_STACK_CATEGORIES,
  TECH_STACK_WITH_EXPERIENCE,
} from '@/lib/constants/sections/techStack'
import { useTranslations } from '@/lib/providers/TextContext'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '@/lib/utils/styles'

export default function TechStackSection() {
  const t = useTranslations()
  const [activeCategory, setActiveCategory] = useState<string>(
    TECH_STACK_CATEGORIES[0],
  )
  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = TECH_STACK_CATEGORIES.findIndex(
        (category) => category === activeCategory,
      )
      const nextIndex = (currentIndex + 1) % TECH_STACK_CATEGORIES.length
      setActiveCategory(TECH_STACK_CATEGORIES[nextIndex])
    }, 5000)

    return () => clearInterval(interval)
  }, [activeCategory])

  const categoryTabs: TabItem[] = TECH_STACK_CATEGORIES.map((category) => ({
    id: category,
    label: category,
    content: (
      <ContentCard className="w-full">
        <div className="space-y-6 grid grid-cols-1 gap-4">
          {(() => {
            const filteredTech = TECH_STACK_WITH_EXPERIENCE.filter(
              (tech) => tech.category === category,
            )

            if (filteredTech.length === 0) {
              return (
                <div className="border-b pb-4 last:border-0">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 mr-3 relative bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-lg">📚</span>
                    </div>
                    <h5
                      className="font-medium text-base"
                      id={category.toLowerCase().replace(/\s+/g, '-')}
                    >
                      {category} 기술
                    </h5>
                  </div>
                  <p className={styles.combineStyles([styles.text.body('small'), 'text-muted-foreground'])}>
                    {category} 관련 기술을 사용한 경험이 있습니다. 자세한 내용은
                    추가될 예정입니다.
                  </p>
                </div>
              )
            }

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
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </div>
                  <h5 className="font-semibold text-base">{tech.name}</h5>
                </div>
                <p className={styles.combineStyles([styles.text.body('small'), 'text-muted-foreground mb-3'])}>
                  {tech.description}
                </p>
                <div className="space-y-1.5">
                  {tech.projects.map((project, idx) => (
                    <div
                      key={idx}
                      className="text-xs flex items-start gap-2 text-muted-foreground"
                    >
                      <span className="shrink-0 w-1 h-1 rounded-full bg-primary/40 mt-1.5" />
                      <span>{project}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          })()}
        </div>
      </ContentCard>
    ),
  }))

  return (
    <section id="tech-stack" className="w-full py-16 md:py-20 bg-secondary/10">
      <div className="px-6 md:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className={styles.combineStyles(styles.text.heading(2), 'mb-6')}>
            {t('pages.techStack.meta.title')}
          </h2>
          <p className={styles.combineStyles([styles.text.body('large'), 'text-muted-foreground max-w-2xl mx-auto'])}>
            {t('pages.techStack.meta.subtitle')}
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24">
          <TabComponent
            tabs={categoryTabs}
            activeTab={activeCategory}
            setActiveTab={setActiveCategory}
            className="w-full"
            tabContainerClassName="justify-center flex-wrap"
            tabClassName="px-4 py-2 rounded-md text-sm font-medium transition-colors"
            activeTabClassName="bg-primary text-white"
            inactiveTabClassName="bg-secondary/50 hover:bg-secondary/80"
          />
        </div>
      </div>
    </section>
  )
}
