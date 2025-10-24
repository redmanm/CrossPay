import { Button } from "@/components/ui/button"
import { Send, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
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
          <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-8 sm:mb-12">Terms of Service</h1>

          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">1. Acceptance of Terms</h2>
              <p className="text-sm sm:text-base text-foreground/70">
                By accessing and using CrossPay, you accept and agree to be bound by the terms and provision of this
                agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">2. Use License</h2>
              <p className="text-sm sm:text-base text-foreground/70 mb-3 sm:mb-4">
                Permission is granted to temporarily download one copy of the materials (information or software) on
                CrossPay for personal, non-commercial transitory viewing only. This is the grant of a license, not a
                transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-foreground/70">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on CrossPay</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">3. Disclaimer</h2>
              <p className="text-sm sm:text-base text-foreground/70">
                The materials on CrossPay are provided on an 'as is' basis. CrossPay makes no warranties, expressed or
                implied, and hereby disclaims and negates all other warranties including, without limitation, implied
                warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
                intellectual property or other violation of rights.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">4. Limitations</h2>
              <p className="text-sm sm:text-base text-foreground/70">
                In no event shall CrossPay or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use the materials on CrossPay.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">5. Accuracy of Materials</h2>
              <p className="text-sm sm:text-base text-foreground/70">
                The materials appearing on CrossPay could include technical, typographical, or photographic errors.
                CrossPay does not warrant that any of the materials on its website are accurate, complete, or current.
                CrossPay may make changes to the materials contained on its website at any time without notice.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
