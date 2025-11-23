'use client'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="glass-card rounded-2xl p-8 max-w-lg text-center">
        <h1 className="text-3xl font-serif mb-3">Something went wrong</h1>
        <p className="text-muted-foreground mb-6">Please try again or return to the homepage.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="glass-button px-6 py-2 rounded-full">
            Try again
          </button>
          <Link href="/" className="glass-button-primary px-6 py-2 rounded-full">
            Go home
          </Link>
        </div>
      </div>
    </main>
  )
}
