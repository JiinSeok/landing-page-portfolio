/**
 * FloatingButtonGroup Component
 *
 * A component that groups together floating buttons using the Compound Component Pattern.
 * This pattern allows for better separation of concerns and more flexible composition.
 */
'use client'

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
  ReactNode,
} from 'react'
import {
  UserIcon,
  Share2Icon,
  CopyIcon,
  CheckIcon,
  XIcon,
  Menu,
} from 'lucide-react'
import { Button } from '@/components/ui/Button/Button'
import { Badge } from '@/components/ui/Badge'
import { ContentCard } from '@/components/ui/ContentCard'
import { cn } from '@/lib/utils/classnames'
import { SOCIAL_LINKS } from '@/lib/constants/sections/navigation'

// Context type definition
type FloatingButtonContextType = {
  activeButton: 'none' | 'contact' | 'share' | 'toc'
  setActiveButton: (button: 'none' | 'contact' | 'share' | 'toc') => void
  copied: 'none' | 'contact' | 'url'
  setCopied: (type: 'none' | 'contact' | 'url') => void
  headings: Array<{
    id: string
    text: string
    level: number
    element: HTMLElement
  }>
  activeId: string
  viewedIds: Set<string>
  isMobile: boolean
  scrollToHeading: (id: string) => void
  copyContactToClipboard: () => Promise<void>
  copyUrlToClipboard: () => Promise<void>
  shareOnTwitter: () => void
  shareOnFacebook: () => void
  githubLink: string
  linkedinLink: string
}

// Create context
const FloatingButtonContext = createContext<
    FloatingButtonContextType | undefined
>(undefined)

// Hook to use the context
export const useFloatingButton = () => {
  const context = useContext(FloatingButtonContext)
  if (!context) {
    throw new Error(
        'useFloatingButton must be used within a FloatingButtonProvider',
    )
  }
  return context
}

// Main component props
interface FloatingButtonGroupProps {
  className?: string
  children: ReactNode
}

// Root component
export function FloatingButtonGroup({
                                      className,
                                      children,
                                    }: FloatingButtonGroupProps) {
  const [activeButton, setActiveButton] = useState<
      'none' | 'contact' | 'share' | 'toc'
  >('none')
  const [copied, setCopied] = useState<'none' | 'contact' | 'url'>('none')
  const [headings, setHeadings] = useState<
      Array<{ id: string; text: string; level: number; element: HTMLElement }>
  >([])
  const [activeId, setActiveId] = useState<string>('')
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set())
  const [isMobile, setIsMobile] = useState(false)
  const tocRef = useRef<HTMLDivElement>(null)

  // Find all headings in the document
  useEffect(() => {
    // Only run on the client side
    if (typeof window === 'undefined') return

    const findHeadings = () => {
      const elements = Array.from(
          document.querySelectorAll('h1, h2, h3, h4, h5, h6'),
      )

      const headingElements = elements
          .map((element) => {
            // Only collect headings that already have IDs to avoid hydration mismatches
            if (element.id) {
              return {
                id: element.id,
                text: element.textContent || '',
                level: parseInt(element.tagName.substring(1), 10),
                element: element as HTMLElement,
              }
            }
            return null
          })
          .filter(Boolean) as Array<{
        id: string
        text: string
        level: number
        element: HTMLElement
      }>

      setHeadings(headingElements)
    }

    // Check device type based on screen width (for styling purposes only)
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth < 768) // Below md breakpoint is considered mobile
    }

    findHeadings()
    checkDeviceType()

    // Re-run when content might change or window resizes
    window.addEventListener('DOMContentLoaded', findHeadings)
    window.addEventListener('load', findHeadings)
    window.addEventListener('resize', checkDeviceType)

    return () => {
      window.removeEventListener('DOMContentLoaded', findHeadings)
      window.removeEventListener('load', findHeadings)
      window.removeEventListener('resize', checkDeviceType)
    }
  }, [])

  // Update active heading based on scroll position
  useEffect(() => {
    // Only run on the client side
    if (typeof window === 'undefined' || headings.length === 0) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150 // Offset for better UX

      // Find the heading that's currently in view
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i]
        const element = heading.element

        if (element.offsetTop <= scrollPosition) {
          // Mark this heading as viewed
          setViewedIds((prev) => {
            const newSet = new Set(prev)
            newSet.add(heading.id)
            return newSet
          })

          setActiveId(heading.id)
          break
        }
      }

      // If we're at the top of the page and no heading is active
      if (window.scrollY < 100 && headings.length > 0) {
        setActiveId(headings[0].id)

        // Mark the first heading as viewed
        setViewedIds((prev) => {
          const newSet = new Set(prev)
          if (headings[0]) newSet.add(headings[0].id)
          return newSet
        })
      }
    }

    handleScroll() // Run once on mount
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [headings])

  // Close expanded menu when clicking outside
  useEffect(() => {
    // Only run on the client side
    if (typeof window === 'undefined') return

    const handleClickOutside = (event: MouseEvent) => {
      if (
          tocRef.current &&
          !tocRef.current.contains(event.target as Node) &&
          activeButton === 'toc'
      ) {
        setActiveButton('none')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activeButton])

  // Scroll to heading when clicked
  const scrollToHeading = useCallback(
      (id: string) => {
        // Only run on the client side
        if (typeof window === 'undefined' || typeof document === 'undefined')
          return

        const element = document.getElementById(id)
        if (element) {
          // Get the element's position relative to the viewport
          const rect = element.getBoundingClientRect()

          // Calculate the absolute position and apply offset
          const absoluteTop = window.pageYOffset + rect.top - 120 // Offset for better UX

          window.scrollTo({
            top: absoluteTop,
            behavior: 'smooth',
          })

          // Mark this heading as viewed
          setViewedIds((prev) => {
            const newSet = new Set(prev)
            newSet.add(id)
            return newSet
          })

          setActiveId(id)

          // Close mobile menu after clicking
          if (isMobile) {
            setActiveButton('none')
          }
        }
      },
      [isMobile, setActiveButton],
  )

  const copyContactToClipboard = async () => {
    // Only run on the client side
    if (typeof window === 'undefined' || typeof navigator === 'undefined')
      return

    try {
      const text = `Jiin Seok\nEmail: seokjiin1073@gmail.com\nGitHub: github.com/jiindev\nLinkedIn: linkedin.com/in/jiindev`
      await navigator.clipboard.writeText(text)
      setCopied('contact')
      setTimeout(() => setCopied('none'), 2000)
    } catch (err) {
      console.error('Failed to copy contact info: ', err)
    }
  }

  const copyUrlToClipboard = async () => {
    // Only run on the client side
    if (typeof window === 'undefined' || typeof navigator === 'undefined')
      return

    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied('url')
      setTimeout(() => setCopied('none'), 2000)
    } catch (err) {
      console.error('Failed to copy URL: ', err)
    }
  }

  const shareOnTwitter = () => {
    // Only run on the client side
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(document.title)
    window.open(
        `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
        '_blank',
    )
  }

  const shareOnFacebook = () => {
    // Only run on the client side
    if (typeof window === 'undefined') return

    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
  }

  // Define type for social link
  type SocialLink = {
    id: string
    path: string
    label: string
  }

  // Find GitHub and LinkedIn links
  const githubLink =
      SOCIAL_LINKS.find((link: SocialLink) => link.id === 'github')?.path || '#'
  const linkedinLink =
      SOCIAL_LINKS.find((link: SocialLink) => link.id === 'linkedin')?.path || '#'

  // Context value
  const contextValue = {
    activeButton,
    setActiveButton,
    copied,
    setCopied,
    headings,
    activeId,
    viewedIds,
    isMobile,
    scrollToHeading,
    copyContactToClipboard,
    copyUrlToClipboard,
    shareOnTwitter,
    shareOnFacebook,
    githubLink,
    linkedinLink,
  }

  return (
    <FloatingButtonContext.Provider value={contextValue}>
      <div
          ref={tocRef}
          className={cn(
              'fixed top-[var(--navbar-height)] right-4 sm:right-6 md:right-8 lg:right-12 z-50 flex flex-col items-end gap-4',
              className,
          )}
      >
        {children}
      </div>
    </FloatingButtonContext.Provider>
  )
}

// Button Container Component
interface ButtonContainerProps {
  children: ReactNode
}

export function ButtonContainer({ children }: ButtonContainerProps) {
  return (
    <div className="flex flex-row gap-4 animate-in fade-in duration-300 bg-primary rounded-full shadow-lg p-1">
      {children}
    </div>
  )
}

// TOC Button Component
export function TocButton() {
  const { activeButton, setActiveButton } = useFloatingButton()

  const toggleTocMenu = () => {
    setActiveButton(activeButton === 'toc' ? 'none' : 'toc')
    if (activeButton !== 'none' && activeButton !== 'toc')
      setActiveButton('toc')
  }

  return (
    <Button
      variant="default"
      size="icon"
      onClick={toggleTocMenu}
      className="rounded-full h-12 w-12 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 bg-primary"
      aria-label={
        activeButton === 'toc'
            ? 'Close table of contents'
            : 'Open table of contents'
      }
    >
      {activeButton === 'toc' ? (
          <XIcon className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7"/>
      ) : (
          <Menu className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7"/>
      )}
    </Button>
  )
}

// Contact Button Component
export function ContactButton() {
  const { activeButton, setActiveButton } = useFloatingButton()

  const toggleContactMenu = () => {
    setActiveButton(activeButton === 'contact' ? 'none' : 'contact')
    if (activeButton !== 'none' && activeButton !== 'contact')
      setActiveButton('contact')
  }

  return (
    <Button
      variant="default"
      size="icon"
      onClick={toggleContactMenu}
      className="rounded-full h-12 w-12 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 bg-primary"
      aria-label={
        activeButton === 'contact' ? 'Close contact menu' : 'Open contact menu'
      }
    >
      {activeButton === 'contact' ? (
          <XIcon className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7"/>
      ) : (
          <UserIcon className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7"/>
      )}
    </Button>
  )
}

// Share Button Component
export function ShareButton() {
  const { activeButton, setActiveButton } = useFloatingButton()

  const toggleShareMenu = () => {
    setActiveButton(activeButton === 'share' ? 'none' : 'share')
    if (activeButton !== 'none' && activeButton !== 'share')
      setActiveButton('share')
  }

  return (
    <Button
      variant="default"
      size="icon"
      onClick={toggleShareMenu}
      className="rounded-full h-12 w-12 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 bg-primary"
      aria-label={
        activeButton === 'share' ? 'Close share menu' : 'Open share menu'
      }
    >
      {activeButton === 'share' ? (
          <XIcon className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7"/>
      ) : (
          <Share2Icon className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7"/>
      )}
    </Button>
  )
}

// Contact Menu Component
export function ContactMenu() {
  const {
    activeButton,
    copied,
    copyContactToClipboard,
    githubLink,
    linkedinLink,
  } = useFloatingButton()

  if (activeButton !== 'contact') return null

  return (
    <div className="flex flex-col gap-4 mt-4 animate-in slide-in-from-top duration-200">
      <ContentCard
          title="Jiin Seok"
          icon={
            <div
                className="bg-primary rounded-full h-5 w-5"
                aria-hidden="true"
            ></div>
          }
        className="w-64 sm:w-64 md:w-72 lg:w-80 shadow-lg border border-border/50 backdrop-blur-sm bg-background/90 p-1"
      >
        <address className="space-y-2 text-sm text-muted-foreground not-italic">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-2 py-1">
              Email
            </Badge>
            <a href="mailto:seokjiin1073@gmail.com" className="hover:underline">
              seokjiin1073@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-2 py-1">
              GitHub
            </Badge>
            <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
            >
              github.com/jiindev
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-2 py-1">
              LinkedIn
            </Badge>
            <a
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
            >
              linkedin.com/in/jiindev
            </a>
          </div>
        </address>

        <div className="mt-4 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={copyContactToClipboard}
            className="rounded-full shadow-sm border-primary/30 hover:bg-primary/10 hover:text-primary"
            aria-label="Copy contact information"
          >
            {copied === 'contact' ? (
              <span className="flex items-center gap-1">
                <CheckIcon className="h-4 w-4" aria-hidden="true" /> Copied!
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <CopyIcon className="h-4 w-4" aria-hidden="true" /> Copy Info
              </span>
            )}
          </Button>
        </div>
      </ContentCard>
    </div>
  )
}

// Share Menu Component
export function ShareMenu() {
  const {
    activeButton,
    copied,
    copyUrlToClipboard,
    shareOnTwitter,
    shareOnFacebook,
  } = useFloatingButton()

  if (activeButton !== 'share') return null

  return (
    <div className="flex flex-col gap-4 mt-4 animate-in slide-in-from-top duration-200">
      <ContentCard
          title="Share This Page"
          icon={
            <div
                className="bg-primary rounded-full h-5 w-5"
                aria-hidden="true"
            ></div>
          }
        className="w-64 sm:w-64 md:w-72 lg:w-80 shadow-lg border border-border/50 backdrop-blur-sm bg-background/90 p-1"
      >
        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={copyUrlToClipboard}
            className="rounded-full shadow-sm border-primary/30 hover:bg-primary/10 hover:text-primary justify-start"
            aria-label="Copy URL to clipboard"
          >
            {copied === 'url' ? (
              <span className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4" aria-hidden="true" /> URL Copied!
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CopyIcon className="h-4 w-4" aria-hidden="true" /> Copy URL
              </span>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={shareOnTwitter}
            className="rounded-full shadow-sm border-primary/30 hover:bg-primary/10 hover:text-primary justify-start"
            aria-label="Share on Twitter"
          >
            <span className="flex items-center gap-2">
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
                aria-hidden="true"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              Share on Twitter
            </span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={shareOnFacebook}
            className="rounded-full shadow-sm border-primary/30 hover:bg-primary/10 hover:text-primary justify-start"
            aria-label="Share on Facebook"
          >
            <span className="flex items-center gap-2">
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
                aria-hidden="true"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              Share on Facebook
            </span>
          </Button>
        </div>
      </ContentCard>
    </div>
  )
}

// TOC Menu Component
export function TocMenu() {
  const {activeButton, headings, activeId, scrollToHeading} =
      useFloatingButton()

  if (activeButton !== 'toc') return null

  return (
    <div className="flex flex-col gap-4 mt-4 animate-in slide-in-from-top duration-200">
      <ContentCard
          title="Table of Contents"
          icon={
            <div
                className="bg-primary rounded-full h-5 w-5"
                aria-hidden="true"
            ></div>
          }
        className="w-64 sm:w-64 md:w-72 lg:w-80 shadow-lg border border-border/50 backdrop-blur-sm bg-background/90 p-1"
      >
        <nav
            className="pr-3 -mr-2 flex flex-col"
            aria-label="Table of Contents"
        >
          <ul className="space-y-2">
            {headings.map((heading) => (
                <li
                key={heading.id}
                className={cn('transition-colors', {
                  'text-primary font-medium': activeId === heading.id,
                  'text-muted-foreground': activeId !== heading.id,
                })}
                style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToHeading(heading.id)
                  }}
                  className={cn(
                      'text-left text-sm py-1.5 hover:text-primary flex items-center w-full',
                      activeId === heading.id && 'font-medium',
                  )}
                  aria-current={
                    activeId === heading.id ? 'location' : undefined
                  }
                >
                  {activeId === heading.id && (
                      <span
                          className="w-1 h-4 bg-primary rounded-full mr-2"
                          aria-hidden="true"
                      />
                  )}
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </ContentCard>
    </div>
  )
}
