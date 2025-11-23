import { MainHeader } from '@/components/MainHeader'
import { SubtleThreeBackgroundWrapper } from '@/components/SubtleThreeBackgroundWrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { LandingFooter } from '@/components/landing/LandingFooter'
import { Roadmap } from '@/components/Roadmap'
import { parseChangelog } from '@/lib/changelog-parser'
import { ChangelogEntry } from '@/components/Changelog'
import { MessageSquare, GraduationCap, Target, Map, Users, Lock } from 'lucide-react'

export const metadata = {
  title: 'Features - Life Command OS',
  description: 'Explore features, roadmap, and changelog for Life Command OS.',
}

const features = [
  {
    title: 'Command',
    description:
      'Chat with Command about VA benefits, disability claims, and transition resources. Get instant answers to questions about your DD-214, C&P exams, and service-connected ratings.',
    icon: MessageSquare,
    gradient: 'from-[#506464] to-[#657832]',
  },
  {
    title: 'Educational Pathways',
    description:
      'Structured learning modules on financial literacy for veterans. Master your benefits, understand your rating, and build the financial foundation you deserve.',
    icon: GraduationCap,
    gradient: 'from-[#657832] to-[#78823c]',
  },
  {
    title: 'Claim Strategy Builder',
    description:
      'Tools to understand the service-connected disability process. Learn how to navigate the VA system and maximize your benefits (premium course reveals the complete strategy).',
    icon: Target,
    gradient: 'from-[#506464] to-[#657832]',
  },
  {
    title: 'Transition Roadmap',
    description:
      'Step-by-step guidance from EAS to financial stability. Navigate the confusing transition period with clear, actionable steps tailored to your situation.',
    icon: Map,
    gradient: 'from-[#785a3c] to-[#b4a078]',
  },
  {
    title: 'Community Access',
    description:
      'Connect with other veterans on the same journey. Share experiences, ask questions, and learn from those who&apos;ve successfully navigated the system.',
    icon: Users,
    gradient: 'from-[#657832] to-[#b4a078]',
  },
  {
    title: 'Secure & Private',
    description:
      'Bank-level encryption protects your data. Veteran-owned and operated. Your information stays private and secure, always under your control.',
    icon: Lock,
    gradient: 'from-[#785a3c] to-[#506464]',
  },
]

export default function FeaturesPage() {
  const { entries } = parseChangelog()

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <SubtleThreeBackgroundWrapper />
      <MainHeader />

      <main className="container mx-auto px-4 sm:px-6 max-w-6xl py-12 sm:py-16 md:py-20">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Features</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Explore all features, future plans, and recent updates for Life Command OS.
          </p>
        </div>

        <Separator className="mb-12" />

        {/* Features Section */}
        <section id="current-features" className="mb-20 scroll-mt-20">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Current Features</h2>
            <p className="text-lg text-muted-foreground">
              From Confusion → Clarity → Freedom. Stop navigating the VA system alone. Our
              AI-powered platform transforms confusion about your benefits into clear action steps
              toward financial freedom.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="h-full border-white/20 dark:border-white/10 glass hover:bg-white/20 dark:hover:bg-white/10 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-150 group cursor-default shadow-lg relative overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-150 -z-10`}
                />
                <CardHeader>
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-150 shadow-lg`}
                  >
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary-gradient transition-colors duration-150">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="mb-12" />

        {/* Roadmap Section */}
        <section id="roadmap" className="mb-20 scroll-mt-20">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 sm:mb-4 bg-gradient-to-r from-red-600 via-orange-600 to-amber-500 bg-clip-text text-transparent">
              Product Roadmap
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Building intelligent systems to help you break out of survival mode and take command
              of your future. Every feature is designed to move you from reactive to proactive, from
              surviving to thriving.
            </p>
          </div>

          <Roadmap />
        </section>

        <Separator className="mb-12" />

        {/* Changelog Section */}
        <section id="changelog" className="mb-20 scroll-mt-20">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Changelog</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              All notable changes to Life Command OS are documented here.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              The format is based on{' '}
              <a
                href="https://keepachangelog.com/en/1.0.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Keep a Changelog
              </a>
              , and this project adheres to{' '}
              <a
                href="https://semver.org/spec/v2.0.0.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Semantic Versioning
              </a>
              .
            </p>
          </div>

          {/* Changelog Entries */}
          {entries.length > 0 ? (
            <div>
              {entries.map((entry, index) => (
                <ChangelogEntry key={`${entry.version}-${index}`} entry={entry} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No changelog entries found.</p>
              </CardContent>
            </Card>
          )}
        </section>
      </main>

      <LandingFooter />
    </div>
  )
}
