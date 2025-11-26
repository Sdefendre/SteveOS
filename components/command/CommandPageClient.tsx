'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Chat } from './Chat'

// Load Three.js background after initial render
const CommandThreeBackground = dynamic(
  () => import('@/components/CommandThreeBackground').then((mod) => mod.CommandThreeBackground),
  { ssr: false }
)

// Simple CSS starfield as immediate fallback
function CSSStarfield() {
  return (
    <div className="fixed inset-0 z-0 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20px 30px, white, transparent),
            radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 50px 160px, rgba(255,255,255,0.9), transparent),
            radial-gradient(1px 1px at 90px 40px, white, transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 160px 120px, white, transparent),
            radial-gradient(1.5px 1.5px at 200px 50px, rgba(255,255,255,0.9), transparent),
            radial-gradient(1px 1px at 250px 180px, white, transparent),
            radial-gradient(1px 1px at 300px 90px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1.5px 1.5px at 350px 140px, white, transparent)
          `,
          backgroundSize: '500px 400px',
        }}
      />
    </div>
  )
}

export function CommandPageClient() {
  const [showThreeBackground, setShowThreeBackground] = useState(false)

  useEffect(() => {
    // Delay loading Three.js background to prioritize chat UI
    const timer = setTimeout(() => setShowThreeBackground(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black supports-[height:100dvh]:min-h-dvh dark text-foreground">
      {/* Background */}
      {showThreeBackground ? <CommandThreeBackground /> : <CSSStarfield />}

      {/* Chat Interface */}
      <div className="relative z-10">
        <Chat />
      </div>
    </div>
  )
}
