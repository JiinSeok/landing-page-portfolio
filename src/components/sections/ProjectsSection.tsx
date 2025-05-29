import { Button } from '@/components/ui/Button/Button'
import { ContentCard } from '@/components/ui/ContentCard'
import { Link } from '@/navigation'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LayoutGridIcon,
  LayoutIcon,
} from 'lucide-react'
import { useTranslations } from '@/lib/constants/mock-translations'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

// Extended Project interface with image/gif URL and alt text
export interface ProjectWithMedia {
  title: string
  year: number
  description: string
  url: string
  imageUrl: string
  alt: string
  codeSnippet?: string
}

// Sample project data with images and code snippets
const projectsData: ProjectWithMedia[] = [
  {
    title: '넥스카 - 자동차 관리 플랫폼',
    year: 2023,
    description:
      '차량 관리, 정비 예약, 부품 구매를 위한 원스톱 솔루션. 사용자 친화적인 인터페이스와 실시간 알림 기능을 갖추고 있습니다. React, TypeScript, Redux, Styled Components, Firebase를 활용하여 개발했습니다.',
    url: '/blog/nexca-project',
    imageUrl: '/images/demo/examples/home-screen.svg',
    alt: '넥스카 자동차 관리 플랫폼 대시보드 화면',
    codeSnippet: `// 넥스카 차량 정보 컴포넌트
import React, { useState, useEffect } from 'react';
import { fetchVehicleInfo, VehicleType } from '../api/vehicles';
import { useAuth } from '../contexts/AuthContext';

export const VehicleInfoCard: React.FC = () => {
  const { user } = useAuth();
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVehicleInfo = async () => {
      if (user?.id) {
        const data = await fetchVehicleInfo(user.id);
        setVehicle(data);
        setLoading(false);
      }
    };

    loadVehicleInfo();
  }, [user]);

  return (
    <div className="vehicle-info-card">
      {loading ? (
        <p>차량 정보를 불러오는 중...</p>
      ) : vehicle ? (
        <div>
          <h3>{vehicle.manufacturer} {vehicle.model}</h3>
          <p>연식: {vehicle.year}</p>
          <p>주행거리: {vehicle.mileage}km</p>
          <p>다음 정비: {vehicle.nextService}</p>
        </div>
      ) : (
        <p>등록된 차량이 없습니다.</p>
      )}
    </div>
  );
};`,
  },
  {
    title: '포트폴리오 웹사이트',
    year: 2023,
    description:
      '개인 포트폴리오 웹사이트로, 프로젝트 쇼케이스, 기술 스택, 경력 정보를 담고 있습니다. Next.js, TypeScript, Tailwind CSS를 활용하여 반응형 디자인과 모던 UI/UX를 구현했습니다. 다크 모드 지원과 성능 최적화에 중점을 두었습니다.',
    url: '/site-build',
    imageUrl: '/images/demo/examples/home-screen-quick-actions.svg',
    alt: '포트폴리오 웹사이트 홈페이지',
    codeSnippet: `// 다크 모드 토글 컴포넌트
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors"
      aria-label="다크 모드 전환"
    >
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  );
};`,
  },
  {
    title: '스마트 홈 대시보드',
    year: 2022,
    description:
      'IoT 기기를 모니터링하고 제어하기 위한 웹 애플리케이션입니다. 실시간 데이터 시각화와 자동화 기능을 제공합니다. React, D3.js, Socket.io, Material UI, Node.js를 활용하여 개발했으며, 에너지 사용량 모니터링과 기기 제어 기능을 구현했습니다.',
    url: '/projects/smart-home',
    imageUrl: '/images/demo/examples/notifications.svg',
    alt: '스마트 홈 대시보드 인터페이스',
    codeSnippet: `// 실시간 에너지 사용량 차트 컴포넌트
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useSocket } from '../hooks/useSocket';

export const EnergyUsageChart: React.FC = () => {
  const chartRef = useRef<SVGSVGElement>(null);
  const { socket } = useSocket();

  useEffect(() => {
    if (!chartRef.current) return;

    // D3.js를 사용한 차트 초기화
    const svg = d3.select(chartRef.current);
    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    // 실시간 데이터 수신 및 차트 업데이트
    socket.on('energy-update', (data) => {
      // 차트 업데이트 로직
      updateChart(data);
    });

    return () => {
      socket.off('energy-update');
    };
  }, [socket]);

  return (
    <div className="energy-chart">
      <h3>실시간 에너지 사용량</h3>
      <svg ref={chartRef} width="100%" height="300"></svg>
    </div>
  );
};`,
  },
]

export default function ProjectsSection() {
  const t = useTranslations('HomePage')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isGridView, setIsGridView] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Function to navigate to the next project
  const nextProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === projectsData.length - 1 ? 0 : prevIndex + 1,
    )
  }

  // Function to navigate to the previous project
  const prevProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1,
    )
  }

  // Scroll to the current project when index changes
  useEffect(() => {
    if (carouselRef.current && !isGridView) {
      const scrollPosition = currentIndex * carouselRef.current.offsetWidth
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      })
    }
  }, [currentIndex, isGridView])

  return (
    <section id="projects" className="w-full py-20 bg-background">
      <div className="max-w-7xl mx-auto px-3">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('projects.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* View toggle and navigation controls */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsGridView(false)}
              className={!isGridView ? 'bg-primary text-primary-foreground' : ''}
            >
              <LayoutIcon className="w-4 h-4 mr-1" />
              {t('projects.view-carousel')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsGridView(true)}
              className={isGridView ? 'bg-primary text-primary-foreground' : ''}
            >
              <LayoutGridIcon className="w-4 h-4 mr-1" />
              {t('projects.view-gallery')}
            </Button>
          </div>

          {!isGridView && (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevProject}
                aria-label={t('projects.previous-project')}
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextProject}
                aria-label={t('projects.next-project')}
              >
                <ChevronRightIcon className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Project display - either carousel or grid */}
        {isGridView ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        ) : (
          <div
            ref={carouselRef}
            className="flex overflow-x-hidden snap-x snap-mandatory"
          >
            {projectsData.map((project, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 snap-center px-4"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}

        {/* Carousel indicators */}
        {!isGridView && (
          <div className="flex justify-center mt-8 space-x-2">
            {projectsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index
                    ? 'bg-primary'
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
                aria-label={`${t('projects.go-to-project')} ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// Project Card Component
function ProjectCard({ project }: { project: ProjectWithMedia }) {
  const t = useTranslations('HomePage')
  const [showCode, setShowCode] = useState(false)

  return (
    <ContentCard
      title={project.title}
      className="h-full flex flex-col"
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold">{project.title}</h3>
          <span className="text-sm text-muted-foreground">{project.year}</span>
        </div>

        {/* Project image or code snippet */}
        <div className="relative mb-4 overflow-hidden rounded-md aspect-video bg-muted">
          {showCode && project.codeSnippet ? (
            <pre className="p-4 text-xs overflow-auto h-full bg-gray-900 text-gray-100 rounded-md">
              <code>{project.codeSnippet}</code>
            </pre>
          ) : (
            <Image
              src={project.imageUrl}
              alt={project.alt}
              fill
              className="object-cover"
            />
          )}
        </div>

        <p className="text-muted-foreground mb-4 flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.codeSnippet && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCode(!showCode)}
            >
              {showCode ? t('projects.view-image') : t('projects.view-code')}
            </Button>
          )}
          <Link href={project.url}>
            <Button variant="default" size="sm">
              {t('projects.view-project')}
            </Button>
          </Link>
        </div>
      </div>
    </ContentCard>
  )
}
