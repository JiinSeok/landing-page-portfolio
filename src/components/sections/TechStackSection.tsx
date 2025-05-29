'use client'

import { TabComponent, TabItem } from '@/components/ui/TabComponent'
import {
  TECH_STACK_CATEGORIES,
  TECH_STACK_WITH_EXPERIENCE,
} from '@/lib/constants/sections/techStack'
import {useTranslations} from '@/lib/providers/TextContext'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

/**
 * 홈페이지의 기술 스택 섹션 컴포넌트
 *
 * 개발자의 기술 역량과 전문성을 카테고리별로 표시
 */
export default function TechStackSection() {
  const t = useTranslations()
  const [activeCategory, setActiveCategory] = useState<string>(
    TECH_STACK_CATEGORIES[0],
  )
  const [showMoreIndicator, setShowMoreIndicator] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // 콘텐츠 오버플로우 확인하여 인디케이터 표시
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

  // 5초마다 카테고리 탭 자동 전환
  useEffect(() => {
    const interval = setInterval(() => {
      // 현재 카테고리 인덱스 찾기
      const currentIndex = TECH_STACK_CATEGORIES.findIndex(
        (category) => category === activeCategory,
      )
      // 다음 카테고리 인덱스 계산 (끝에서 처음으로 순환)
      const nextIndex = (currentIndex + 1) % TECH_STACK_CATEGORIES.length
      // 다음 카테고리를 활성화
      setActiveCategory(TECH_STACK_CATEGORIES[nextIndex])
    }, 5000) // 5초마다 카테고리 변경

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => clearInterval(interval)
  }, [activeCategory])

  // 카테고리에서 탭 아이템 생성
  const categoryTabs: TabItem[] = TECH_STACK_CATEGORIES.map((category) => ({
    id: category,
    label: category,
    content: (
      <div className="bg-card p-6 rounded-lg shadow-lg w-full">
        <div className="space-y-6 grid grid-cols-1 gap-4">
          {(() => {
            const filteredTech = TECH_STACK_WITH_EXPERIENCE.filter(
              (tech) => tech.category === category,
            )

            // 해당 카테고리에 기술 항목이 없으면 플레이스홀더 표시
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

            // 그렇지 않으면 필터링된 기술 항목 표시
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
          <h2 className="text-3xl font-bold mb-4">{t('pages.techStack.meta.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('pages.techStack.meta.subtitle')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* 왼쪽 열 - 기술 카테고리 */}
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

          {/* 오른쪽 열 - 기술 역량 */}
          <div className="w-full lg:w-1/3">
            <div className="bg-card p-6 rounded-lg shadow-lg h-full">
              <h3 className="text-xl font-semibold mb-6">
                {t('pages.techStack.frontend.title')}
              </h3>
              <div
                ref={cardRef}
                className="space-y-4 overflow-auto max-h-[400px] pr-2"
              >
                {/* 프론트엔드 기술 */}
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

              {/* 콘텐츠가 넘칠 경우 더보기 인디케이터 표시 */}
              {showMoreIndicator && (
                <div className="text-center mt-4">
                  <span className="text-xs text-muted-foreground">
                    더 보려면 스크롤하세요
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
