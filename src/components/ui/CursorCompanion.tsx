'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function CursorCompanion() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!visible) setVisible(true)
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
  }, [visible])

  if (!visible) return null

  return (
    <div
      className="pointer-events-none fixed z-[9999] transition-transform duration-75"
      style={{ left: pos.x + 12, top: pos.y + 12 }}
    >
      <Image
        src="/images/pochacco.png"
        alt=""
        width={28}
        height={28}
        className="select-none"
        draggable={false}
      />
    </div>
  )
}
