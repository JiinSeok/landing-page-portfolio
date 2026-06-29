'use client'

import { Button } from '@/components/ui/Button/Button'
import { useTranslations } from '@/lib/providers/TextContext'
import { Link } from '@/navigation'

export default function NotFoundPage() {
  const t = useTranslations('layout.notFound')
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <p className="text-7xl md:text-8xl font-semibold tracking-tight text-foreground">
          {t('code')}
        </p>
        <h1 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
          {t('title')}
        </h1>
        <p className="mt-2 text-muted-foreground break-keep">
          {t('description')}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">{t('returnHome')}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="mailto:seokjiin1073@gmail.com">{t('contactSupport')}</a>
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          {t('contactMessage')}
        </p>
      </div>
    </main>
  )
}
