'use client'

import { motion } from 'framer-motion'

interface YouTubeEmbedProps {
  videoId: string
  title: string
}

export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full rounded-xl overflow-hidden shadow-2xl border border-border bg-card mb-10"
    >
      <div className="relative pb-[56.25%] h-0">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={`YouTube video player - ${title}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    </motion.div>
  )
}

