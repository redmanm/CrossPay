"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Send, TrendingUp, Lock, Zap, Globe, Twitter, Linkedin, Github, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { LiveRateCard } from "@/components/live-rate-card"
import { ChatWidget } from "@/components/chat-widget"

export default function LandingPage() {
  const [email, setEmail] = useState("")

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Send className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">CrossPay</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground/70 hover:text-foreground transition">
              Features
            </a>
            <a href="#how-it-works" className="text-foreground/70 hover:text-foreground transition">
              How It Works
            </a>
            <Link href="/company/partners" className="text-foreground/70 hover:text-foreground transition">
              Partners
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-foreground">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                  Send Money Home, <span className="text-primary">Instantly</span>
                </h1>
                <p className="text-xl text-foreground/70 leading-relaxed">
                  The fastest, cheapest way to send remittances to Ethiopia. Convert crypto to Birr in seconds. No
                  middlemen, no delays.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
                    Get Started <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-border text-foreground hover:bg-secondary w-full sm:w-auto bg-transparent"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <p className="text-2xl font-bold text-primary">80%</p>
                  <p className="text-sm text-foreground/60">Lower Fees</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">2 min</p>
                  <p className="text-sm text-foreground/60">Instant Transfer</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">24/7</p>
                  <p className="text-sm text-foreground/60">Always Available</p>
                </div>
              </div>
            </div>
            <LiveRateCard />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why Choose CrossPay?</h2>
            <p className="text-xl text-foreground/70">Everything you need for seamless remittances</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Transfers complete in minutes, not days. Real-time tracking from start to finish.",
              },
              {
                icon: Lock,
                title: "Secure & Transparent",
                description: "Blockchain-verified transactions. Every transfer is auditable and immutable.",
              },
              {
                icon: TrendingUp,
                title: "Best Rates",
                description: "Near-market exchange rates with minimal fees. Save up to 80% vs traditional services.",
              },
              {
                icon: Globe,
                title: "Global Access",
                description: "Send from anywhere. Receive in Ethiopian Birr to any bank or mobile wallet.",
              },
              {
                icon: Send,
                title: "Crypto Ready",
                description: "Use USDT, USDC, or any supported stablecoin. No crypto experience needed.",
              },
              {
                icon: Lock,
                title: "Fully Compliant",
                description: "Licensed partners handle all KYC/AML requirements. Regulatory-friendly.",
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition">
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Security First</h2>
            <p className="text-xl text-foreground/70">Your funds are protected by enterprise-grade security</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                {
                  title: "Smart Contract Audited",
                  description: "All smart contracts have been audited by leading security firms.",
                },
                {
                  title: "KRNL Labs Infrastructure",
                  description: "Powered by KRNL's battle-tested Web3 infrastructure and kernel security.",
                },
                {
                  title: "Multi-Signature Wallets",
                  description: "Partner funds secured with multi-signature wallet technology.",
                },
                {
                  title: "KYC/AML Compliant",
                  description: "Full compliance with international financial regulations and standards.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Lock className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-foreground/70 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Security Certifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                  <span className="font-semibold text-foreground">ISO 27001</span>
                  <span className="text-xs bg-green-500/20 text-green-600 px-3 py-1 rounded-full">Certified</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                  <span className="font-semibold text-foreground">SOC 2 Type II</span>
                  <span className="text-xs bg-green-500/20 text-green-600 px-3 py-1 rounded-full">Certified</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                  <span className="font-semibold text-foreground">Smart Contract Audit</span>
                  <span className="text-xs bg-green-500/20 text-green-600 px-3 py-1 rounded-full">Passed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-xl text-foreground/70">Three simple steps to send money home</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Connect Wallet",
                description: "Link your crypto wallet or enter recipient details. Takes less than a minute.",
              },
              {
                step: "2",
                title: "Send Funds",
                description: "Choose amount and currency. Our smart contract locks your funds securely.",
              },
              {
                step: "3",
                title: "Receive in Birr",
                description: "Partner converts to ETB and deposits to recipient's account instantly.",
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-card border border-border rounded-2xl p-8">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-foreground/70">{item.description}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">Ready to Send Money Home?</h2>
          <p className="text-xl text-foreground/70 mb-8">
            Join thousands of users sending remittances faster and cheaper.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Get Started Now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/30 text-foreground hover:bg-primary/5 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Send className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-foreground">CrossPay</span>
              </div>
              <p className="text-sm text-foreground/60">Fast, secure remittances to Ethiopia powered by Web3.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>
                  <Link href="/product/features" className="hover:text-foreground transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/product/security" className="hover:text-foreground transition">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>
                  <Link href="/company/about" className="hover:text-foreground transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/company/blog" className="hover:text-foreground transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/company/careers" className="hover:text-foreground transition">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/company/partners" className="hover:text-foreground transition">
                    Partners
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>
                  <Link href="/legal/privacy" className="hover:text-foreground transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/terms" className="hover:text-foreground transition">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/legal/compliance" className="hover:text-foreground transition">
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>
                  <a href="mailto:support@crosspay.io" className="hover:text-foreground transition">
                    Email Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-foreground/60">© 2025 CrossPay. All rights reserved.</p>
            <div className="flex gap-4 items-center">
              <a
                href="https://twitter.com/crosspay"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center text-foreground/70 hover:text-primary transition"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/crosspay"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center text-foreground/70 hover:text-primary transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/crosspay"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center text-foreground/70 hover:text-primary transition"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@crosspay.io"
                className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center text-foreground/70 hover:text-primary transition"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="tel:+251940930471"
                className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center text-foreground/70 hover:text-primary transition"
                aria-label="Phone"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  )
}
