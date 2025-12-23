'use client'

import { useReducedMotion } from 'framer-motion'

/**
 * Military-inspired topographic contour line background
 * Creates a subtle, professional map-like pattern
 * Fully responsive with viewBox-based SVG scaling
 */
export function TopographicBackground() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 50% 0%, oklch(0.45 0.12 95 / 0.08), transparent 60%),
            radial-gradient(ellipse 80% 60% at 100% 100%, oklch(0.5 0.08 50 / 0.06), transparent 50%)
          `,
        }}
      />

      {/* Topographic SVG pattern - uses viewBox for proper scaling */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{
          opacity: 0.12,
        }}
      >
        <defs>
          {/* Gradient for contour lines */}
          <linearGradient id="topoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.45 0.12 95)" />
            <stop offset="50%" stopColor="oklch(0.5 0.08 50)" />
            <stop offset="100%" stopColor="oklch(0.55 0.14 95)" />
          </linearGradient>

          {/* Animated gradient for subtle movement */}
          <linearGradient id="topoGradientAnimated" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.55 0.14 95)">
              {!shouldReduceMotion && (
                <animate
                  attributeName="stop-color"
                  values="oklch(0.55 0.14 95); oklch(0.45 0.12 95); oklch(0.55 0.14 95)"
                  dur="12s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
            <stop offset="100%" stopColor="oklch(0.45 0.12 95)">
              {!shouldReduceMotion && (
                <animate
                  attributeName="stop-color"
                  values="oklch(0.45 0.12 95); oklch(0.55 0.14 95); oklch(0.45 0.12 95)"
                  dur="12s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
          </linearGradient>
        </defs>

        {/* Topographic contour lines - using percentage-based viewBox coordinates */}
        <g fill="none" stroke="url(#topoGradient)" strokeWidth="0.15">
          {/* Layer 1 - Upper contours */}
          <path d="M-5,15 Q15,8 30,14 T60,12 T90,16 T120,13" />
          <path d="M-5,22 Q12,16 28,20 T58,18 T88,23 T118,20" />
          <path d="M-5,29 Q10,24 26,27 T56,25 T86,30 T116,27" />

          {/* Layer 2 - Mid contours */}
          <path d="M-3,38 Q18,32 35,37 T65,34 T95,39 T125,36" />
          <path d="M-3,45 Q15,40 32,44 T62,41 T92,46 T122,43" />
          <path d="M-3,52 Q12,48 29,51 T59,48 T89,53 T119,50" />

          {/* Layer 3 - Inner contours with animation */}
          <g stroke="url(#topoGradientAnimated)" strokeWidth="0.2">
            <path d="M0,60 Q20,55 38,59 T68,56 T98,61 T128,58">
              {!shouldReduceMotion && (
                <animate
                  attributeName="d"
                  values="M0,60 Q20,55 38,59 T68,56 T98,61 T128,58;
                          M0,62 Q20,57 38,61 T68,58 T98,63 T128,60;
                          M0,60 Q20,55 38,59 T68,56 T98,61 T128,58"
                  dur="20s"
                  repeatCount="indefinite"
                />
              )}
            </path>
            <path d="M2,67 Q18,63 35,66 T65,63 T95,68 T125,65">
              {!shouldReduceMotion && (
                <animate
                  attributeName="d"
                  values="M2,67 Q18,63 35,66 T65,63 T95,68 T125,65;
                          M2,69 Q18,65 35,68 T65,65 T95,70 T125,67;
                          M2,67 Q18,63 35,66 T65,63 T95,68 T125,65"
                  dur="18s"
                  repeatCount="indefinite"
                />
              )}
            </path>
          </g>

          {/* Layer 4 - Lower section */}
          <path d="M-5,76 Q15,72 32,75 T62,72 T92,77 T122,74" />
          <path d="M-5,83 Q12,80 29,82 T59,79 T89,84 T119,81" />
          <path d="M-5,90 Q10,87 27,89 T57,86 T87,91 T117,88" />
        </g>

        {/* Circular contours - like elevation markers */}
        <g fill="none" stroke="url(#topoGradient)" strokeWidth="0.1" opacity="0.7">
          {/* Top right cluster */}
          <ellipse cx="85" cy="15" rx="12" ry="8" />
          <ellipse cx="85" cy="15" rx="9" ry="6" />
          <ellipse cx="85" cy="15" rx="6" ry="4" />
          <ellipse cx="85" cy="15" rx="3" ry="2" />

          {/* Bottom left cluster */}
          <ellipse cx="12" cy="82" rx="15" ry="10" />
          <ellipse cx="12" cy="82" rx="11" ry="7.5" />
          <ellipse cx="12" cy="82" rx="7" ry="5" />
          <ellipse cx="12" cy="82" rx="3.5" ry="2.5" />

          {/* Center cluster - subtle */}
          <ellipse cx="48" cy="50" rx="18" ry="12" opacity="0.5" />
          <ellipse cx="48" cy="50" rx="13" ry="9" opacity="0.5" />
          <ellipse cx="48" cy="50" rx="8" ry="5.5" opacity="0.5" />
        </g>

        {/* Grid lines - very subtle coordinate marks */}
        <g stroke="url(#topoGradient)" strokeWidth="0.08" opacity="0.3">
          <line x1="25" y1="0" x2="25" y2="100" strokeDasharray="1,2" />
          <line x1="50" y1="0" x2="50" y2="100" strokeDasharray="1,2" />
          <line x1="75" y1="0" x2="75" y2="100" strokeDasharray="1,2" />
          <line x1="0" y1="33" x2="100" y2="33" strokeDasharray="1,2" />
          <line x1="0" y1="66" x2="100" y2="66" strokeDasharray="1,2" />
        </g>
      </svg>

      {/* Soft vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, transparent 40%, oklch(0.12 0.015 90 / 0.3) 100%)`,
        }}
      />
    </div>
  )
}
