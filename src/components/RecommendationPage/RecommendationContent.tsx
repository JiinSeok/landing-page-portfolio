'use client'

import { useLocale, useTranslations } from '@/lib/providers/TextContext'
import Image from 'next/image'
import Link from 'next/link'

interface RecommendationMeta {
  key: string
  name: string
  date: string
  image: string
  width: number
  height: number
}

const RECOMMENDATIONS: RecommendationMeta[] = [
  {
    key: 'hong',
    name: '홍순상',
    date: '2026.06',
    image: '/images/recommendation/reco-hong-dost11.webp',
    width: 1240,
    height: 1842,
  },
  {
    key: 'song',
    name: '송찬영',
    date: '2025.02',
    image: '/images/recommendation/reco-song-fitogether.webp',
    width: 1238,
    height: 1452,
  },
]

export default function RecommendationContent() {
  const t = useTranslations('pages.recommendation')
  const { locale } = useLocale()

  return (
    <main className="w-full">
      <article className="max-w-3xl mx-auto px-6 py-12 md:px-8 md:py-16">
        <header>
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">
              {t('tag')}
            </span>
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">
              {t('tagColleague')}
            </span>
          </div>
          <h1 className="mb-3 text-3xl md:text-4xl font-bold">{t('title')}</h1>
          <p className="mb-10 text-lg text-muted-foreground leading-relaxed">
            {t('intro')}
          </p>
        </header>

        <div className="flex flex-col gap-12">
          {RECOMMENDATIONS.map((reco) => (
            <section key={reco.key}>
              <div className="mb-2.5">
                <p className="text-sm font-semibold">
                  {reco.name}
                  <span className="ml-1.5 font-normal text-muted-foreground">
                    {t(`items.${reco.key}.relation`)}
                  </span>
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                  {locale === 'en' ? `Written ${reco.date}` : `${reco.date} 작성`}{' '}
                  · {t(`items.${reco.key}.summary`)}
                </p>
              </div>
              <Image
                src={reco.image}
                width={reco.width}
                height={reco.height}
                alt={t(`items.${reco.key}.alt`)}
                sizes="(min-width: 768px) 768px, 100vw"
                className="w-full h-auto rounded-lg border border-border"
              />
              {locale === 'en' ? (
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  <span className="font-medium text-foreground">
                    {t('letterLead')}
                  </span>{' '}
                  {t(`items.${reco.key}.letter`)}
                </p>
              ) : null}
            </section>
          ))}
        </div>

        <div className="mt-14">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {t('back')}
          </Link>
        </div>
      </article>
    </main>
  )
}
