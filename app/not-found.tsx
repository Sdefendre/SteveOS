import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="glass-card rounded-2xl p-8 max-w-lg text-center">
        <h1 className="text-3xl font-serif mb-3">Page not found</h1>
        <p className="text-muted-foreground mb-6">The page you’re looking for doesn’t exist.</p>
        <Link href="/" className="glass-button-primary px-6 py-2 rounded-full">
          Go home
        </Link>
      </div>
    </main>
  )
}
