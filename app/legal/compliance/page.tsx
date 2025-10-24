import { Button } from "@/components/ui/button"
import { Send, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CompliancePage() {
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

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 sm:mb-6">Compliance</h1>
          <p className="text-base sm:text-xl text-foreground/70">Regulatory compliance and standards adherence</p>
        </div>
      </section>

      {/* Compliance Info */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Regulatory Framework</h2>
              <div className="space-y-3 sm:space-y-4">
                {[
                  "KYC/AML Compliance - Full Know Your Customer and Anti-Money Laundering procedures",
                  "FATCA Compliance - Foreign Account Tax Compliance Act adherence",
                  "GDPR Compliance - General Data Protection Regulation for EU users",
                  "Local Regulations - Compliance with Ethiopian financial regulations",
                  "Transaction Monitoring - Real-time monitoring for suspicious activities",
                  "Sanctions Screening - OFAC and international sanctions list screening",
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-foreground/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Partner Requirements</h2>
              <p className="text-sm sm:text-base text-foreground/70 mb-3 sm:mb-4">
                All CrossPay partners must meet strict compliance requirements:
              </p>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-foreground/70">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  Licensed financial service providers in Ethiopia
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  Full regulatory approval from National Bank of Ethiopia
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  Regular compliance audits and reporting
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  Segregated customer funds in trust accounts
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">Data Protection</h2>
              <p className="text-sm sm:text-base text-foreground/70">
                We implement industry-leading data protection measures including encryption, secure storage, and regular
                security audits. All personal data is processed in accordance with applicable privacy laws and
                regulations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
