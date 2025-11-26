import { MainHeader } from '@/components/MainHeader'
import { LandingFooter } from '@/components/landing/LandingFooter'

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MainHeader />
      <main className="flex-1 container mx-auto px-4 py-12 mt-20 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <div className="prose dark:prose-invert max-w-none space-y-4">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>
            Please read these Terms of Service (&ldquo;Terms&rdquo;, &ldquo;Terms of Service&rdquo;)
            carefully before using the Life Command OS website operated by us.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">1. Conditions of Use</h2>
          <p>
            By using this website, you certify that you have read and reviewed this Agreement and
            that you agree to comply with its terms. If you do not want to be bound by the terms of
            this Agreement, you are advised to leave the website accordingly.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">2. Intellectual Property</h2>
          <p>
            You agree that all materials, products, and services provided on this website are the
            property of Life Command OS, its affiliates, directors, officers, employees, agents,
            suppliers, or licensors including all copyrights, trade secrets, trademarks, patents,
            and other intellectual property.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">3. User Accounts</h2>
          <p>
            As a user of this website, you may be asked to register with us and provide private
            information. You are responsible for ensuring the accuracy of this information, and you
            are responsible for maintaining the safety and security of your identifying information.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">4. Indemnification</h2>
          <p>
            You agree to indemnify Life Command OS and its affiliates and hold Life Command OS
            harmless against legal claims and demands that may arise from your use or misuse of our
            services.
          </p>
        </div>
      </main>
      <LandingFooter />
    </div>
  )
}
