import { Button } from "@/components/ui/button"
import { Send, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Send className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-foreground">CrossPay</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 sm:hidden" />
            <Button variant="ghost" className="hidden sm:flex text-foreground">
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-8 sm:mb-12">Privacy Policy</h1>

          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">1. Introduction</h2>
              <p className="text-sm sm:text-base text-foreground/70">
                CrossPay ("we", "us", "our") operates the CrossPay platform. This page informs you of our policies
                regarding the collection, use, and disclosure of personal data when you use our service.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
                2. Information Collection and Use
              </h2>
              <p className="text-sm sm:text-base text-foreground/70 mb-3 sm:mb-4">
                We collect several different types of information for various purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-foreground/70">
                <li>Personal identification information (name, email, phone number)</li>
                <li>Wallet addresses and transaction history</li>
                <li>KYC/AML verification documents</li>
                <li>Usage data and analytics</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">3. Security of Data</h2>
              <p className="text-sm sm:text-base text-foreground/70">
                The security of your data is important to us but remember that no method of transmission over the
                Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable
                means to protect your personal data, we cannot guarantee its absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
                4. Changes to This Privacy Policy
              </h2>
              <p className="text-sm sm:text-base text-foreground/70">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">5. Contact Us</h2>
              <p className="text-sm sm:text-base text-foreground/70">
                If you have any questions about this Privacy Policy, please contact us at privacy@crosspay.io
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
