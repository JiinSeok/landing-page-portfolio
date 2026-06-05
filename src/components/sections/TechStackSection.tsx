'use client'

import { TabComponent, TabItem } from '@/components/ui/TabComponent'
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
      <div className="grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
        {TECH_STACK_WITH_EXPERIENCE.filter(
          (tech) => tech.category === category,
        ).map((tech) => (
          <div key={tech.name} className="flex items-start gap-3">
            <Image
              src={tech.logo}
              alt={tech.name}
              width={24}
              height={24}
              className="w-6 h-6 mt-0.5 object-contain shrink-0"
            />
            <div>
              <h5 className="mb-0.5 text-sm font-semibold">{tech.name}</h5>
              <p
                className={styles.combineStyles([
                  styles.text.body('small'),
                  'text-muted-foreground leading-snug',
                ])}
              >
                {tech.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    ),
  }))

  return (
    <section id="tech-stack" className="w-full py-10 md:py-12 bg-secondary/10">
      <div className="px-6 md:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className={styles.combineStyles(styles.text.heading(2), 'mb-3')}>
            {t('pages.techStack.meta.title')}
          </h2>
          <p
            className={styles.combineStyles([
              styles.text.body('large'),
              'text-muted-foreground max-w-2xl mx-auto',
            ])}
          >
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
