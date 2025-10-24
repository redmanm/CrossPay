import { Button } from "@/components/ui/button"
import { Shield, CheckCircle, Send, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SecurityPage() {
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
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 sm:mb-6">Security First</h1>
          <p className="text-base sm:text-xl text-foreground/70">
            Your funds are protected by enterprise-grade security measures
          </p>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4 sm:space-y-6">
              {[
                {
                  title: "Smart Contract Audited",
                  description:
                    "All smart contracts audited by leading security firms. Full transparency and verification.",
                },
                {
                  title: "KRNL Labs Infrastructure",
                  description: "Powered by KRNL's battle-tested Web3 infrastructure with kernel-level security.",
                },
                {
                  title: "Multi-Signature Wallets",
                  description:
                    "Partner funds secured with multi-signature wallet technology requiring multiple approvals.",
                },
                {
                  title: "KYC/AML Compliant",
                  description:
                    "Full compliance with international financial regulations and anti-money laundering standards.",
                },
                {
                  title: "Blockchain Transparency",
                  description: "Every transaction recorded on-chain for complete auditability and transparency.",
                },
                {
                  title: "Cold Storage",
                  description: "Majority of funds held in cold storage wallets for maximum security.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 sm:gap-4">
                  <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-foreground/70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Certifications</h3>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { name: "ISO 27001", status: "Certified" },
                    { name: "SOC 2 Type II", status: "Certified" },
                    { name: "Smart Contract Audit", status: "Passed" },
                    { name: "Penetration Testing", status: "Passed" },
                  ].map((cert, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 sm:p-4 bg-secondary/50 rounded-lg">
                      <span className="font-semibold text-sm sm:text-base text-foreground">{cert.name}</span>
                      <span className="text-xs bg-green-500/20 text-green-600 px-2 sm:px-3 py-1 rounded-full">
                        {cert.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-6 sm:p-8">
                <h3 className="text-lg sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
                  <Shield className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                  Security Practices
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-foreground/70">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    Regular security audits and penetration testing
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    Bug bounty program for responsible disclosure
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    24/7 security monitoring and incident response
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    Encrypted data transmission and storage
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
