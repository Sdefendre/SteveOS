'use client'

import { motion } from 'framer-motion'
import { Youtube, ArrowRight, Play } from 'lucide-react'
import { SITE } from '@/constants/site'

export function YouTubeSection() {
  return (
    <section className="py-20 relative overflow-hidden border-y border-border bg-accent/20">
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-sm font-medium">
              <Youtube size={16} />
              <span>YouTube Channel</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Watch Me Build & Explore
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Join me on YouTube where I document my coding journey, share tutorials, and explore
              new technologies.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={SITE.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
              >
                <Youtube size={20} />
                Visit Channel
              </a>
              <a
                href={`${SITE.youtube}/videos`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium border border-border bg-background hover:bg-accent transition-colors"
              >
                Latest Videos <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md">
            <a
              href={SITE.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="block group relative aspect-video bg-black rounded-xl overflow-hidden border border-border shadow-2xl"
            >
              {/* Abstract Thumbnail Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-90" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent" />

              {/* Grid Pattern Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-red-600/30">
                  <Play size={32} className="text-white fill-white ml-1" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-medium text-lg group-hover:text-red-400 transition-colors">
                  @Stevedefendre
                </p>
                <p className="text-white/60 text-sm">Subscribe for more content</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
