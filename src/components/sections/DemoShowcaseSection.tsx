'use client'

import DemoShowcase from '@/components/ui/containers/SliderKit'
import { demoItems } from '@/lib/constants/homepage'
import { useTranslations } from '@/lib/constants/mock-translations'
import styles from '@/lib/utils/styles'
import { JSX, useEffect, useState } from 'react'

/**
 * 데모 쇼케이스 섹션 컴포넌트
 *
 * 앱의 데모 영상이나 애니메이션 이미지를 롤링 배너 형태로 보여주는 섹션입니다.
 * 이미지의 비율을 고정하여 화면 크기에 따라 찌그러지지 않도록 구현했습니다.
 * Compound Component 패턴을 사용하여 UI 요소를 재사용 가능한 컴포넌트로 분리했습니다.
 */
export default function DemoShowcaseSection(): JSX.Element {
  const t = useTranslations('HomePage')
  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(true)

  // 컴포넌트 마운트 시 이미지 프리로딩 및 로딩 상태 변경
  useEffect(() => {
    // 최소 로딩 시간 (UX를 위해)
    const minLoadingTime = 800 // 밀리초
    const startTime = Date.now()

    // 모든 이미지 로드 완료 여부 추적
    let loadedImagesCount = 0
    const totalImages = demoItems.length

    // 로딩 완료 처리 함수
    const handleLoadingComplete = () => {
      const elapsedTime = Date.now() - startTime
      if (elapsedTime < minLoadingTime) {
        // 최소 로딩 시간이 지나지 않았으면 남은 시간만큼 대기
        setTimeout(() => setIsLoading(false), minLoadingTime - elapsedTime)
      } else {
        // 최소 로딩 시간이 지났으면 바로 로딩 완료
        setIsLoading(false)
      }
    }

    // 각 이미지 로드 완료 처리
    const handleImageLoaded = () => {
      loadedImagesCount++
      if (loadedImagesCount === totalImages) {
        handleLoadingComplete()
      }
    }

    // 이미지 프리로딩
    demoItems.forEach((item) => {
      const img = new Image()
      img.onload = handleImageLoaded
      img.onerror = handleImageLoaded // 에러 발생해도 카운트 (UX를 위해)
      img.src = item.src
    })

    // 백업 타이머 (모든 이미지가 로드되지 않아도 일정 시간 후 로딩 완료)
    const backupTimer = setTimeout(() => {
      handleLoadingComplete()
    }, 3000) // 3초 후 강제 로딩 완료

    return () => clearTimeout(backupTimer)
  }, [])

  return (
    <section
      id="demo"
      className={styles.combineStyles([
        'w-full bg-background',
        styles.layout.section('lg'),
      ])}
    >
      <div
        className={styles.layout.container('xl', styles.spacing.paddingX('md'))}
      >
        <div
          className={styles.combineStyles([
            'text-center',
            styles.spacing.marginBottom('lg'),
          ])}
        >
          <h2
            className={styles.combineStyles([
              styles.text.heading(2),
              styles.spacing.marginBottom('sm'),
            ])}
          >
            {t('sections.demo.title')}
          </h2>
          <p
            className={styles.combineStyles([
              styles.text.body('large'),
              'text-muted-foreground max-w-2xl mx-auto',
            ])}
          >
            {t('sections.demo.description')}
          </p>
        </div>

        {/* 데모 슬라이더 */}
        <DemoShowcase autoSlideInterval={2000} className={'pb-1'}>
          <DemoShowcase.Slider aria-labelledby="user-journey-heading">
            {isLoading ? (
              // 로딩 중일 때 스켈레톤 표시 (실제 아이템 개수와 동일하게)
              <>
                {demoItems.map((item) => (
                  <DemoShowcase.SliderItemSkeleton key={item.id} />
                ))}
              </>
            ) : (
              // 로딩 완료 후 실제 콘텐츠 표시
              demoItems.map((item) => (
                <DemoShowcase.SliderItem key={item.id} className={'pb-20'}>
                  <figure className="relative h-full p-0 m-0">
                    <DemoShowcase.Image
                      src={item.src}
                      alt={item.alt}
                      sizes="(max-width: 375px) 90vw, (max-width: 768px) 80vw, (max-width: 1440px) 70vw, 50vw"
                    />

                    {/* 콜아웃 */}
                    <figcaption className="absolute top-1/2 right-2 sm:right-3 md:right-4 lg:right-6 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 p-2 sm:p-3 md:p-4 lg:p-5 rounded-lg shadow-lg max-w-[80%] text-black dark:text-white border border-gray-200 dark:border-gray-700 callout-shape">
                      <ol className="list-decimal pl-5 space-y-1">
                        <li className="text-xs sm:text-xs md:text-sm lg:text-base font-medium">
                          {item.callout}
                        </li>
                      </ol>
                    </figcaption>
                  </figure>
                </DemoShowcase.SliderItem>
              ))
            )}
          </DemoShowcase.Slider>
          {/* 네비게이션 인디케이터 */}
          <DemoShowcase.Indicators
            role="tablist"
            aria-label="슬라이드 인디케이터"
          />
          {/* 좌우 네비게이션 버튼 */}
          {/*<DemoShowcase.NavigationButtons aria-label="슬라이드 네비게이션" />*/}
        </DemoShowcase>
      </div>
    </section>
  )
}
