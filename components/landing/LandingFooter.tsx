import Link from 'next/link'
import { Logo } from '@/components/Logo'

export function LandingFooter() {
  return (
    <footer className="py-8 sm:py-12 border-t border-border bg-background">
      <div className="container mx-auto px-3 sm:px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
        <div className="text-center md:text-left">
          <Link href="/" className="inline-block mb-2 no-underline">
            <Logo size="md" />
          </Link>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            © {new Date().getFullYear()} Life Command OS. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Built by{' '}
            <a
              href="https://defendresolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              DefendreSolutions.com
            </a>
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
          <Link href="/features#roadmap" className="hover:text-primary transition-colors">
            Roadmap
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
