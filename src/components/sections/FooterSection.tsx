'use client'

import { SectionContainer } from '@/components/ui/containers/SectionContainer'
import { GridLayout } from '@/components/ui/containers/ContentLayout'
import { ROUTER } from '@/lib/constants/router'
import { useTranslations } from '@/lib/providers/TextContext'
import { Link } from '@/navigation'

/**
 * Footer section component for the homepage
 *
 * This component displays the footer with copyright information, social links,
 * and navigation links.
 */
export default function FooterSection() {
  const t = useTranslations('pages.home.footer')
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-secondary/20">
      <SectionContainer padding="py-12 px-6 md:px-8 lg:px-12">
        <GridLayout cols={{ default: 1, md: 4 }} gap="gap-8">
          {/* Logo and copyright */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold text-primary">Jiin Seok</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('copyright').replace('2023', currentYear.toString())}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {t('designed-by')}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={ROUTER.Home.path}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('links.home')}
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('links.projects')}
                </Link>
              </li>
              <li>
                <Link
                  href="#personal"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('links.about')}
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('links.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">
              Connect
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={ROUTER.GitHub.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  {t('social.github')}
                </a>
              </li>
              <li>
                <a
                  href={ROUTER.LinkedIn.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  {t('social.linkedin')}
                </a>
              </li>
              <li>
                <a
                  href={ROUTER.Email.path}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  Email
                </a>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('links.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('links.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </GridLayout>
      </SectionContainer>
    </footer>
  )
}
