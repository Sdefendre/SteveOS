import type { Variants, Transition } from 'framer-motion'

export const baseTransition: Transition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] }

export const createFadeInUp = (reduced: boolean, distance = 20): Variants => ({
  initial: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0, transition: baseTransition },
})

export const createFadeIn = (reduced: boolean): Variants => ({
  initial: reduced ? { opacity: 1 } : { opacity: 0 },
  animate: { opacity: 1, transition: baseTransition },
})

export const createStaggerContainer = (stagger = 0.06): Variants => ({
  initial: {},
  animate: {
    transition: { staggerChildren: stagger },
  },
})

export const viewportOnce = { once: true as const, amount: 0.2 }

export const hoverScaleProps = (reduced: boolean, scale = 1.02) =>
  reduced
    ? {}
    : {
        whileHover: { scale },
        whileTap: { scale: Math.max(0.96, scale - 0.04) },
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }
