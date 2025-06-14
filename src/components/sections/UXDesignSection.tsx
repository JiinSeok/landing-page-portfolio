'use client'

import { Button } from '@/components/ui/Button/Button'
import { ContentCard } from '@/components/ui/ContentCard'
import { UX_DESIGN_FEATURES } from '@/lib/constants/sections/uxDesign'
import { useTranslations } from '@/lib/providers/TextContext'

/**
 * 홈페이지의 UX 디자인 섹션 컴포넌트
 */
export default function UXDesignSection() {
  const t = useTranslations()

  return (
    <section id="ux-design" className="w-full py-20">
      <div className="max-w-7xl mx-auto px-3">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            id="ux-designtitle"
          >
            {t('pages.uxDesign.meta.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('pages.uxDesign.meta.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {UX_DESIGN_FEATURES.map((feature, index) => (
            <ContentCard
              key={index}
              title={t(feature.title)}
              icon={feature.icon}
              hoverEffect={true}
              footer={
                <Button variant="link" asChild className="p-0 h-auto">
                  <a href="#" className="flex items-center text-sm">
                    <span>View example</span>
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </Button>
              }
            >
              <p className="text-muted-foreground">{t(feature.description)}</p>
            </ContentCard>
          ))}
        </div>
      </div>
    </section>
  )
}
