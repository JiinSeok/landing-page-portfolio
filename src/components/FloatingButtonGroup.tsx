/**
 * FloatingButtonGroup Component
 *
 * A component that groups together floating buttons using the Compound Component Pattern.
 * This pattern allows for better separation of concerns and more flexible composition.
 */
'use client'

// Extend Window interface to include Kakao SDK
import { ROUTER } from '@/lib/constants/router'

declare global {
  interface Window {
    Kakao?: {
      Link: {
        sendDefault: (options: any) => void
      }
    }
  }
}

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
  shareOnLinkedIn: () => void
  shareOnKakao: () => void
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
  const [isMounted, setIsMounted] = useState(false)
  const tocRef = useRef<HTMLDivElement>(null)

  // Only show the component after client-side hydration is complete
  useEffect(() => {
    setIsMounted(true)
  }, [])

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
              text: (
                (element as HTMLElement).innerText ||
                element.textContent ||
                ''
              )
                .replace(/\n/g, ' ')
                .trim(),
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

  const shareOnLinkedIn = () => {
    // Only run on the client side
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(document.title)
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`,
      '_blank',
    )
  }

  const shareOnKakao = () => {
    // Only run on the client side
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    // Check if Kakao SDK is loaded
    if (typeof window.Kakao === 'undefined') {
      // If Kakao SDK is not available, open the URL in a new tab
      const url = encodeURIComponent(window.location.href)
      window.open(`https://story.kakao.com/share?url=${url}`, '_blank')
      return
    }

    // If Kakao SDK is available, use it for sharing
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: document.title,
        description: 'Check out this page',
        imageUrl: 'https://jiindev.me/og-image.png', // Default image
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: 'View Website',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    })
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
    shareOnLinkedIn,
    shareOnKakao,
    githubLink,
    linkedinLink,
  }

  return (
    <FloatingButtonContext.Provider value={contextValue}>
      {isMounted && (
        <div
          ref={tocRef}
          className={cn(
            'flex items-end gap-4',
            // Apply fixed positioning only if className doesn't contain 'static'
            !className?.includes('static') &&
              'fixed top-[var(--navbar-height)] right-4 sm:right-6 md:right-8 lg:right-12 z-50 flex-col',
            className,
          )}
        >
          {children}
        </div>
      )}
    </FloatingButtonContext.Provider>
  )
}

// Button Container Component
interface ButtonContainerProps {
  children: ReactNode
}

export function ButtonContainer({ children }: ButtonContainerProps) {
  const { isMobile } = useFloatingButton()

  // Check if we're in a navigation context
  const isInNavigation =
    typeof document !== 'undefined' &&
    document.querySelector('.nav-floating-buttons') !== null

  return (
    <div
      className={cn(
        'flex flex-row animate-in fade-in duration-300',
        // Different styling based on context
        isInNavigation
          ? 'gap-4 sm:gap-5 md:gap-6 lg:gap-8' // Match navigation item spacing
          : 'gap-2 bg-primary rounded-full shadow-lg p-1', // Original floating button styling
        // Add more gap for floating buttons when not in navigation
        !isMobile && !isInNavigation && 'gap-4',
      )}
    >
      {children}
    </div>
  )
}

// TOC Button Component
export function TocButton() {
  const { activeButton, setActiveButton } = useFloatingButton()
  const [isMounted, setIsMounted] = useState(false)

  // Only show the button after client-side hydration is complete
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const toggleTocMenu = () => {
    setActiveButton(activeButton === 'toc' ? 'none' : 'toc')
    if (activeButton !== 'none' && activeButton !== 'toc')
      setActiveButton('toc')
  }

  // Don't render anything during server-side rendering
  if (typeof window === 'undefined' || !isMounted) return null

  // Check if we're in a navigation context by looking for the nav-floating-buttons class
  const isInNavigation =
    typeof document !== 'undefined' &&
    document.querySelector('.nav-floating-buttons') !== null

  return (
    <Button
      variant={isInNavigation ? 'ghost' : 'default'}
      size={isInNavigation ? 'sm' : 'icon'}
      onClick={toggleTocMenu}
      className={cn(
        // Different styling based on context
        isInNavigation
          ? 'text-sm md:text-base text-foreground hover:text-primary transition-colors p-0 h-auto'
          : 'rounded-full bg-primary h-12 w-12 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16',
      )}
      aria-label={
        activeButton === 'toc'
          ? 'Close table of contents'
          : 'Open table of contents'
      }
    >
      {isInNavigation ? (
        // Text version for navigation
        <span hidden className="flex items-center gap-1">
          {activeButton === 'toc' ? (
            <>
              <XIcon className="h-4 w-4" />
              <span>Close</span>
            </>
          ) : (
            <>
              <Menu className="h-4 w-4" />
              <span>Contents</span>
            </>
          )}
        </span>
      ) : // Icon-only version for floating buttons
      activeButton === 'toc' ? (
        <XIcon className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
      ) : (
        <Menu className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
      )}
    </Button>
  )
}

// Contact Button Component
export function ContactButton() {
  const { activeButton, setActiveButton } = useFloatingButton()
  const [isMounted, setIsMounted] = useState(false)

  // Only show the button after client-side hydration is complete
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const toggleContactMenu = () => {
    setActiveButton(activeButton === 'contact' ? 'none' : 'contact')
    if (activeButton !== 'none' && activeButton !== 'contact')
      setActiveButton('contact')
  }

  // Don't render anything during server-side rendering
  if (typeof window === 'undefined' || !isMounted) return null

  // Check if we're in a navigation context by looking for the nav-floating-buttons class
  const isInNavigation =
    typeof document !== 'undefined' &&
    document.querySelector('.nav-floating-buttons') !== null

  return (
    <Button
      variant={isInNavigation ? 'ghost' : 'default'}
      size={isInNavigation ? 'sm' : 'icon'}
      onClick={toggleContactMenu}
      className={cn(
        // Different styling based on context
        isInNavigation
          ? 'text-sm md:text-base text-foreground hover:text-primary transition-colors p-0 h-auto'
          : 'rounded-full bg-primary h-12 w-12 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16',
      )}
      aria-label={
        activeButton === 'contact' ? 'Close contact menu' : 'Open contact menu'
      }
    >
      {isInNavigation ? (
        // Text version for navigation
        <span className="flex items-center gap-1">
          {activeButton === 'contact' ? (
            <>
              <XIcon className="h-4 w-4" />
              <span>Close</span>
            </>
          ) : (
            <>
              <UserIcon className="h-4 w-4" />
              <span>Contact</span>
            </>
          )}
        </span>
      ) : // Icon-only version for floating buttons
      activeButton === 'contact' ? (
        <XIcon className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
      ) : (
        <UserIcon className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
      )}
    </Button>
  )
}

// Share Button Component
export function ShareButton() {
  const { activeButton, setActiveButton } = useFloatingButton()
  const [isMounted, setIsMounted] = useState(false)

  // Only show the button after client-side hydration is complete
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const toggleShareMenu = () => {
    setActiveButton(activeButton === 'share' ? 'none' : 'share')
    if (activeButton !== 'none' && activeButton !== 'share')
      setActiveButton('share')
  }

  // Don't render anything during server-side rendering
  if (typeof window === 'undefined' || !isMounted) return null

  // Check if we're in a navigation context by looking for the nav-floating-buttons class
  const isInNavigation =
    typeof document !== 'undefined' &&
    document.querySelector('.nav-floating-buttons') !== null

  return (
    <Button
      variant={isInNavigation ? 'ghost' : 'default'}
      size={isInNavigation ? 'sm' : 'icon'}
      onClick={toggleShareMenu}
      className={cn(
        // Different styling based on context
        isInNavigation
          ? 'text-sm md:text-base text-foreground hover:text-primary transition-colors p-0 h-auto'
          : 'rounded-full bg-primary h-12 w-12 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16',
      )}
      aria-label={
        activeButton === 'share' ? 'Close share menu' : 'Open share menu'
      }
    >
      {isInNavigation ? (
        // Text version for navigation
        <span className="flex items-center gap-1">
          {activeButton === 'share' ? (
            <>
              <XIcon className="h-4 w-4" />
              <span>Close</span>
            </>
          ) : (
            <>
              <Share2Icon className="h-4 w-4" />
              <span>Share</span>
            </>
          )}
        </span>
      ) : // Icon-only version for floating buttons
      activeButton === 'share' ? (
        <XIcon className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
      ) : (
        <Share2Icon className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
      )}
    </Button>
  )
}

// Contact Menu Component
export function ContactMenu() {
  const { activeButton, copied, copyContactToClipboard } = useFloatingButton()

  // Don't render anything during server-side rendering
  if (typeof window === 'undefined') return null

  if (activeButton !== 'contact') return null

  // Check if we're in a navigation context by looking for the nav-floating-buttons class
  const isInNavigation =
    typeof document !== 'undefined' &&
    document.querySelector('.nav-floating-buttons') !== null

  return (
    <div
      className={cn(
        'flex flex-col gap-4 animate-in slide-in-from-top duration-200',
        // Position differently based on context
        isInNavigation ? 'absolute top-full right-0 mt-2' : 'mt-4',
      )}
    >
      <ContentCard
        title="Jiin Seok"
        className="w-64 sm:w-64 md:w-72 lg:w-80 shadow-lg border border-border/50 bg-background p-1"
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
              href={ROUTER.GitHub.path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              github.com/JiinSeok
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-2 py-1">
              LinkedIn
            </Badge>
            <a
              href={ROUTER.LinkedIn.path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              linkedin.com/in/jiin-seok
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
    shareOnLinkedIn,
    shareOnKakao,
  } = useFloatingButton()

  // Don't render anything during server-side rendering
  if (typeof window === 'undefined') return null

  if (activeButton !== 'share') return null

  // Check if we're in a navigation context by looking for the nav-floating-buttons class
  const isInNavigation =
    typeof document !== 'undefined' &&
    document.querySelector('.nav-floating-buttons') !== null

  return (
    <div
      className={cn(
        'flex flex-col gap-4 animate-in slide-in-from-top duration-200',
        // Position differently based on context
        isInNavigation ? 'absolute top-full right-0 mt-2' : 'mt-4',
      )}
    >
      <ContentCard
        title="Share This Page"
        className="w-64 sm:w-64 md:w-72 lg:w-80 shadow-lg border border-border/50 bg-background p-1"
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
            onClick={shareOnLinkedIn}
            className="rounded-full shadow-sm border-primary/30 hover:bg-primary/10 hover:text-primary justify-start"
            aria-label="Share on LinkedIn"
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
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              Share on LinkedIn
            </span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={shareOnKakao}
            className="rounded-full shadow-sm border-primary/30 hover:bg-primary/10 hover:text-primary justify-start"
            aria-label="Share on Kakao"
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
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
              Share on Kakao
            </span>
          </Button>
        </div>
      </ContentCard>
    </div>
  )
}

// TOC Menu Component
export function TocMenu() {
  const { activeButton, headings, activeId, scrollToHeading } =
    useFloatingButton()

  // Don't render anything during server-side rendering
  if (typeof window === 'undefined') return null

  if (activeButton !== 'toc') return null

  // Check if we're in a navigation context by looking for the nav-floating-buttons class
  const isInNavigation =
    typeof document !== 'undefined' &&
    document.querySelector('.nav-floating-buttons') !== null

  return (
    <div
      className={cn(
        'flex flex-col gap-4 animate-in slide-in-from-top duration-200',
        // Position differently based on context
        isInNavigation ? 'absolute top-full right-0 mt-2' : 'mt-4',
      )}
    >
      <ContentCard
        title="Table of Contents"
        className="w-64 sm:w-64 md:w-72 lg:w-80 shadow-lg border border-border/50 bg-background p-1"
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
