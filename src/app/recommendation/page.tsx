import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '추천사 · 석지인',
  description:
    '함께 일한 동료들이 직접 작성한 추천사입니다. 도스트11 개발팀 홍순상, 핏투게더 송찬영.',
  openGraph: {
    title: '추천사 · 석지인',
    description: '함께 일한 동료들이 직접 작성한 추천사입니다.',
    url: 'https://usejiin.link/recommendation',
    siteName: 'Jiin Seok',
    locale: 'ko_KR',
    type: 'article',
  },
}

interface Recommendation {
  name: string
  relation: string
  date: string
  summary: string
  image: string
  width: number
  height: number
  alt: string
}

const recommendations: Recommendation[] = [
  {
    name: '홍순상',
    relation: '도스트11 개발팀 · 전/현 직장동료',
    date: '2026.06',
    summary: '직접 채용해 약 6개월간 함께 일한 개발팀 리드의 추천 — 공감 능력·적극성',
    image: '/images/recommendation/reco-hong-dost11.webp',
    width: 1240,
    height: 1842,
    alt: '홍순상(도스트11 개발팀)이 작성한 석지인 추천사',
  },
  {
    name: '송찬영',
    relation: '핏투게더 · 전/현 직장동료',
    date: '2025.02',
    summary: '함께 품질을 다룬 동료의 추천 — 성실함·책임감·커뮤니케이션',
    image: '/images/recommendation/reco-song-fitogether.webp',
    width: 1238,
    height: 1452,
    alt: '송찬영(핏투게더)이 작성한 석지인 추천사',
  },
]

export default function RecommendationPage() {
  return (
    <main className="w-full">
      <article className="max-w-3xl mx-auto px-6 py-12 md:px-8 md:py-16">
        <header>
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">
              추천사
            </span>
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">
              동료 추천
            </span>
          </div>
          <h1 className="mb-3 text-3xl md:text-4xl font-bold">추천사</h1>
          <p className="mb-10 text-lg text-muted-foreground leading-relaxed">
            함께 일한 동료들이 직접 작성한 추천사입니다.
          </p>
        </header>

        <div className="flex flex-col gap-12">
          {recommendations.map((recommendation) => (
            <section key={recommendation.name}>
              <div className="mb-2.5">
                <p className="text-sm font-semibold">
                  {recommendation.name}
                  <span className="ml-1.5 font-normal text-muted-foreground">
                    {recommendation.relation}
                  </span>
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                  {recommendation.date} 작성 · {recommendation.summary}
                </p>
              </div>
              <Image
                src={recommendation.image}
                width={recommendation.width}
                height={recommendation.height}
                alt={recommendation.alt}
                sizes="(min-width: 768px) 768px, 100vw"
                className="w-full h-auto rounded-lg border border-border"
              />
            </section>
          ))}
        </div>

        <div className="mt-14">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← 홈 타임라인으로 돌아가기
          </Link>
        </div>
      </article>
    </main>
  )
}
