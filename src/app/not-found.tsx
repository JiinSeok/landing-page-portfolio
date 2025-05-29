'use client'

import { Button } from '@/components/ui/Button/Button'
import { useTranslations } from '@/lib/providers/TextContext'
import { Link } from '@/navigation'
import FooterSection from '@/components/sections/FooterSection'

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage')
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-chart-2 to-chart-4 rounded-lg opacity-20 blur-xl"></div>
            <div className="relative bg-card p-8 rounded-lg shadow-lg">
              <h1 className="text-6xl font-bold text-primary mb-4">
                {t('code')}
              </h1>
              <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
              <p className="text-xl text-muted-foreground mb-8">
                {t('description')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link href="/">{t('returnHome')}</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  <Link href="/contact">{t('contactSupport')}</Link>
                </Button>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground">{t('contactMessage')}</p>
        </div>
      </div>
      <FooterSection />
    </div>
  )
}
