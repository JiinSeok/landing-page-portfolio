'use client'

import { Button } from '@/components/ui/Button/Button'
import { useTranslations } from '@/lib/providers/TextContext'
import Link from 'next/link'
import { useEffect } from 'react'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const t = useTranslations('layout.error')

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          {t('title')}
        </h1>
        <p className="mt-2 text-muted-foreground break-keep">
          {t('description')}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Button size="lg" onClick={reset}>
            {t('tryAgain')}
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/">{t('returnHome')}</Link>
          </Button>
        </div>
        {error.digest && (
          <p className="mt-6 font-mono text-xs text-muted-foreground">
            {t('errorId')}: {error.digest}
          </p>
        )}
      </div>
    </main>
  )
}
