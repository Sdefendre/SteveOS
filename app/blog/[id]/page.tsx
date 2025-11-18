import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react'
import { BLOG_POSTS } from '@/constants/blog'
import { CodeBlockEnhancer } from '@/components/CodeBlockEnhancer'
import { YouTubeEmbed } from '@/components/YouTubeEmbed'

type Params = Promise<{ id: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params
  const post = BLOG_POSTS.find((p) => p.id === id)
  if (!post) return { title: 'Post not found' }
  const title = post.title
  const description = post.excerpt
  const ogImage = '/defendre-logo.png'
  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: ogImage }] },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  }
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { id } = await params
  const post = BLOG_POSTS.find((p) => p.id === id)
  if (!post) {
    return (
      <main className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-3xl mx-auto">
          <p>Post not found.</p>
          <Link href="/blog" className="text-primary underline">
            Back to blog
          </Link>
        </div>
      </main>
    )
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Person', name: post.author },
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="relative z-10">
        <header className="fixed top-0 left-0 right-0 backdrop-blur-md bg-background/80 border-b border-border z-40">
          <nav className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
            <Link
              href="/blog"
              className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-full flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform"
            >
              <ArrowLeft size={20} /> Back to Blog
            </Link>
          </nav>
        </header>

        <main id="main-content" className="pt-24 px-6 pb-20">
          <article className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm flex items-center gap-1"
                >
                  <Tag size={12} /> {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-serif">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-12 pb-6 border-b border-border">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* YouTube Embed */}
            {/* @ts-ignore - YouTubeId is optional */}
            {post.youtubeId && (
              <YouTubeEmbed 
                // @ts-ignore
                videoId={post.youtubeId} 
                title={post.title} 
              />
            )}

            <div
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            {/* Enhance code blocks after hydration */}
            <CodeBlockEnhancer />
          </article>
        </main>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}
