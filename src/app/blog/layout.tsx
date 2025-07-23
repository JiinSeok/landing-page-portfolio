import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Blog - Coming Soon',
  description: 'Our blog is under construction. Check back soon for articles and updates.',
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children
}