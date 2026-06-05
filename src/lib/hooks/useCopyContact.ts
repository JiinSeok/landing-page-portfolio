'use client'

import { useEffect, useRef, useState } from 'react'

import { CONTACT_COPY_TEXT } from '@/lib/constants/contact'

export function useCopyContact() {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  )

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_COPY_TEXT)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = CONTACT_COPY_TEXT
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setOpen(true)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setOpen(false)
      setCopied(false)
    }, 3000)
  }

  return { copied, open, copy, containerRef }
}

export type CopyContact = ReturnType<typeof useCopyContact>
