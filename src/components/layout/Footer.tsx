'use client'

import { ROUTER } from '@/lib/constants/router'
import { useTranslations } from '@/lib/providers/TextContext'

export default function Footer() {
  const t = useTranslations()
  const currentYear = new Date().getFullYear()

  return (
    <footer id="footer" className="w-full bg-zinc-900 text-zinc-300">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8 lg:px-10 flex items-center gap-6 flex-wrap pb-20 sm:pb-6">
        <span className="text-xs text-zinc-500">&copy; {currentYear}</span>
        <a
          href="https://jiin-seok.notion.site/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          {t('pages.home.sections.hero.cta-projects')}
        </a>
        <a
          href="/files/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          {t('pages.home.sections.hero.cta-resume')}
        </a>
        <a
          href="https://www.figma.com/deck/jdocRc3a37rnNsTRm1crbD/SEO-%EC%96%B4%EB%94%94%EA%B9%8C%EC%A7%80-%ED%95%B4%EB%B4%A4%EB%8B%88?node-id=45-555&t=H46fXS3tDDZMhydQ-1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          SEO 라이트닝 토크
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
