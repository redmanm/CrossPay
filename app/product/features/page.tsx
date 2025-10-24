import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Lock, TrendingUp, Globe, Send, Shield, Smartphone, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
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
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 sm:mb-6">Powerful Features</h1>
          <p className="text-base sm:text-xl text-foreground/70">
            Everything you need for seamless remittances and crypto payments
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast Transfers",
                description:
                  "Send money in minutes, not days. Real-time blockchain confirmation with instant settlement.",
              },
              {
                icon: Lock,
                title: "Bank-Grade Security",
                description: "Multi-signature wallets, smart contract audits, and KRNL Labs infrastructure protection.",
              },
              {
                icon: TrendingUp,
                title: "Best Exchange Rates",
                description:
                  "Near-market rates with transparent pricing. Save up to 80% compared to traditional services.",
              },
              {
                icon: Globe,
                title: "Global Reach",
                description: "Send from any country. Receive in Ethiopian Birr to any bank or mobile wallet.",
              },
              {
                icon: Smartphone,
                title: "Mobile First",
                description: "Fully responsive design works seamlessly on phones, tablets, and desktops.",
              },
              {
                icon: Shield,
                title: "Compliance Ready",
                description: "Full KYC/AML compliance with licensed partners. Regulatory-friendly operations.",
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-card border border-border rounded-xl sm:rounded-2xl p-6 sm:p-8">
                <feature.icon className="w-10 sm:w-12 h-10 sm:h-12 text-primary mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4">Ready to Experience the Difference?</h2>
          <Link href="/signup">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
              Get Started Now <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
