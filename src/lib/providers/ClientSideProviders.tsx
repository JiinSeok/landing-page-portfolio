'use client'

import { Toaster } from 'sonner'
import Navigation from '@/components/layout/Navigation'

/**
 * ClientSideProviders component handles client-side only functionality
 * This component is rendered at the end of the body to ensure it doesn't
 * interfere with server-side rendering of the main content
 */
export default function ClientSideProviders() {
  return (
    <>
      <Navigation />
      <Toaster richColors position="top-center" />
      {/*<nav aria-label="빠른 문의" className="fixed">*/}
      {/*  <HelpFloatingButton />*/}
      {/*</nav>*/}
    </>
  )
}
