export type ProjectLinks = {
  live?: string
  code?: string
}

export type Project = {
  title: string
  tag: string
  desc: string
  metrics?: string
  links: ProjectLinks
}

export const PROJECTS: Project[] = [
  {
    title: 'Defendre Solutions',
    tag: 'Software Agency',
    desc: 'Veteran-owned software development company specializing in scalable web platforms, AI-powered analytics, and digital transformation for small businesses.',
    metrics: 'Veteran-Owned • Full-Stack Development • AI Solutions',
    links: {
      live: 'https://defendresolutions.com',
    },
  },
  {
    title: 'Braids by Rose',
    tag: 'Business Website',
    desc: 'Professional hair braiding business website with online booking system, gallery showcase, and mobile-optimized design.',
    metrics: '300% increase in bookings • 2-week delivery • 5-star client review',
    links: {
      live: 'https://braidsbyrose.com',
    },
  },
]
