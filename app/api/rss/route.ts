import { NextResponse } from 'next/server'
import { BLOG_POSTS } from '@/constants/blog'
import { SITE } from '@/constants/site'

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://steve-os.vercel.app'

  // Sort posts by date (newest first)
  const sortedPosts = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  // Generate RSS XML
  const rssItems = sortedPosts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.id}`
      const pubDate = new Date(post.date).toUTCString()

      // Strip HTML tags for description and get plain text
      const content = post.excerpt || post.content || ''
      const description =
        typeof content === 'string'
          ? content
              .replace(/<[^>]*>/g, '')
              .trim()
              .substring(0, 300) + '...'
          : 'No description available.'

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${description}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${SITE.email} (${post.author})</author>
      <category><![CDATA[${post.tags.join(', ')}]]></category>
    </item>`
    })
    .join('')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${SITE.name} Blog]]></title>
    <description><![CDATA[${SITE.mission} - Insights on technology, development, and the intersection of military discipline with modern software engineering.]]></description>
    <link>${siteUrl}/blog</link>
    <language>en-US</language>
    <managingEditor>${SITE.email} (Steve Defendre)</managingEditor>
    <webMaster>${SITE.email} (Steve Defendre)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/api/rss" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteUrl}/logo.png</url>
      <title>${SITE.name} Blog</title>
      <link>${siteUrl}/blog</link>
      <width>144</width>
      <height>144</height>
    </image>
    ${rssItems}
  </channel>
</rss>`

  return new NextResponse(rssFeed, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
    },
  })
}
