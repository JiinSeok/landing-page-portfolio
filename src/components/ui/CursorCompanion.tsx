'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

export default function CursorCompanion() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [visible, setVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const fadeOut = useCallback(() => {
    const timer = setTimeout(() => setVisible(false), 1200)
    return timer
  }, [])

  useEffect(() => {
    const mobile = 'ontouchstart' in window
    setIsMobile(mobile)

    if (mobile) {
      let timer: ReturnType<typeof setTimeout>
      const onTouch = (e: TouchEvent) => {
        const touch = e.touches[0]
        setPos({ x: touch.clientX, y: touch.clientY - 60 })
        setVisible(true)
        clearTimeout(timer)
        timer = fadeOut()
      }
      window.addEventListener('touchstart', onTouch, { passive: true })
      return () => {
        window.removeEventListener('touchstart', onTouch)
        clearTimeout(timer)
      }
    } else {
      const onMove = (e: MouseEvent) => {
        setPos({ x: e.clientX, y: e.clientY })
        setVisible(true)
      }
      const onLeave = () => setVisible(false)
      const onEnter = () => setVisible(true)

      window.addEventListener('mousemove', onMove, { passive: true })
      document.addEventListener('mouseleave', onLeave)
      document.addEventListener('mouseenter', onEnter)
      return () => {
        window.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseleave', onLeave)
        document.removeEventListener('mouseenter', onEnter)
      }
    }
  }, [fadeOut])

  if (!visible) return null

  return (
    <div
      className={`pointer-events-none fixed z-[9999] ${isMobile ? 'transition-opacity duration-500' : 'transition-transform duration-75'}`}
      style={{
        left: isMobile ? pos.x - 24 : pos.x + 12,
        top: isMobile ? pos.y - 24 : pos.y + 12,
      }}
    >
      <Image
        src="/images/pochacco.png"
        alt=""
        width={48}
        height={48}
        className="select-none"
        draggable={false}
        style={{ width: 'auto', height: 'auto' }}
      />
    </div>
  )
}
