import { motion } from 'framer-motion'
import { Github, Star, GitFork, Calendar } from 'lucide-react'
import { GithubRepo } from '@/lib/github'

interface GithubWidgetProps {
  repos: GithubRepo[]
}

export function GithubWidget({ repos }: GithubWidgetProps) {
  if (!repos || repos.length === 0) return null

  return (
    <section className="py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-accent rounded-lg">
          <Github size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Recent Activity</h2>
          <p className="text-muted-foreground text-sm">Latest repositories I've been working on.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo, i) => (
          <motion.a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className="h-full border border-border bg-card/50 hover:bg-card/80 p-5 rounded-xl transition-all duration-300 hover:shadow-md hover:border-primary/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                    {repo.name}
                  </h3>
                  <span className="text-xs font-mono bg-secondary/50 px-2 py-0.5 rounded text-secondary-foreground">
                    {repo.language || 'Code'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                  {repo.description || 'No description provided.'}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/50 pt-3 mt-auto">
                <div className="flex gap-3">
                  <span className="flex items-center gap-1">
                    <Star size={12} /> {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={12} /> {repo.fork ? 'Fork' : 'Source'}
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(repo.updated_at).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
