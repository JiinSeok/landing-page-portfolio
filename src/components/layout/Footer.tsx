'use client'

import { ROUTER } from '@/lib/constants/router'
import { useTranslations } from '@/lib/providers/TextContext'

export default function Footer() {
  const t = useTranslations()
  const currentYear = new Date().getFullYear()

  return (
    <footer id="footer" className="w-full sticky bottom-0 bg-zinc-900/90 backdrop-blur-md text-zinc-300 z-40 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8 lg:px-10 flex items-center gap-6 flex-wrap pb-20 sm:pb-6">
        <span className="text-xs text-zinc-500">&copy; {currentYear}</span>
        <a
          href={ROUTER.Resume.path}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          {t('pages.home.sections.hero.cta-resume')}
        </a>
        <a
          href={ROUTER.GitHub.path}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          GitHub
        </a>
        <a
          href={ROUTER.LinkedIn.path}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          LinkedIn
        </a>
        <a
          href={ROUTER.Email.path}
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          Email
        </a>
      </div>
    </footer>
  )
}
