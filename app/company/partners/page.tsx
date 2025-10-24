"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, Users, TrendingUp, Shield, Zap, Globe, FileText } from "lucide-react"
import Link from "next/link"

export default function PartnersPage() {
  const [activeTab, setActiveTab] = useState("how-it-works")

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">Back</span>
          </Link>
          <h1 className="text-xl font-bold text-foreground">CrossPay Partners</h1>
          <div className="w-20"></div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Become a CrossPay <span className="text-primary">Partner</span>
          </h1>
          <p className="text-lg sm:text-xl text-foreground/70 mb-8 leading-relaxed">
            Join our network of licensed financial service providers and earn revenue while enabling fast, affordable
            remittances to Ethiopia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
              Apply Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-secondary w-full sm:w-auto bg-transparent"
            >
              Download Info
            </Button>
          </div>
        </div>
      </section>

      {/* Partner Opportunity */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Partner With CrossPay?
            </h2>
            <p className="text-lg text-foreground/70">Unlock new revenue streams and expand your business</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Revenue Growth",
                description:
                  "Earn competitive margins on every transaction. Scale your business with minimal overhead.",
              },
              {
                icon: Users,
                title: "New Customer Base",
                description: "Access diaspora and international users sending money to Ethiopia instantly.",
              },
              {
                icon: Zap,
                title: "Instant Settlement",
                description: "Automated settlement process. Get paid quickly for every transaction processed.",
              },
              {
                icon: Shield,
                title: "Regulatory Support",
                description: "We handle compliance and regulatory requirements. You focus on operations.",
              },
              {
                icon: Globe,
                title: "Global Network",
                description: "Connect with international remittance corridors and expand beyond Ethiopia.",
              },
              {
                icon: FileText,
                title: "Full Documentation",
                description: "Complete audit trail and reporting. All transactions recorded on-chain.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition">
                <item.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              How the Partner System Works
            </h2>
            <p className="text-lg text-foreground/70">A seamless flow from crypto to local currency</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "User Initiates Transfer",
                  description: "Diaspora user sends crypto (USDT/USDC) through CrossPay platform.",
                },
                {
                  step: "2",
                  title: "Smart Contract Locks Funds",
                  description: "Funds are secured in KRNL-powered smart contract with full transparency.",
                },
                {
                  step: "3",
                  title: "Partner Receives Notification",
                  description: "You receive real-time notification with transfer details and recipient info.",
                },
                {
                  step: "4",
                  title: "Convert & Settle",
                  description: "Convert crypto to ETB at market rates and deposit to recipient's account.",
                },
                {
                  step: "5",
                  title: "Confirm & Earn",
                  description: "Confirm settlement on-chain. Earn your margin automatically.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-foreground/70 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Partner Dashboard</h3>
              <div className="space-y-4">
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm text-foreground/60 mb-1">Pending Transfers</p>
                  <p className="text-3xl font-bold text-primary">12</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm text-foreground/60 mb-1">Today's Volume</p>
                  <p className="text-3xl font-bold text-primary">₿ 450,000</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm text-foreground/60 mb-1">This Month Earnings</p>
                  <p className="text-3xl font-bold text-primary">₿ 8,500</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm text-foreground/60 mb-1">Settlement Status</p>
                  <p className="text-sm font-semibold text-green-600">Settled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">Who Can Be a Partner?</h2>
            <p className="text-lg text-foreground/70">We work with licensed financial service providers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Payment Service Providers",
                requirements: [
                  "Licensed by National Bank of Ethiopia",
                  "Active business operations in Ethiopia",
                  "ETB liquidity and bank accounts",
                  "KYC/AML compliance systems",
                  "Transaction processing capability",
                ],
              },
              {
                title: "Fintech Companies",
                requirements: [
                  "Registered fintech company",
                  "Mobile money or digital wallet platform",
                  "Existing user base in Ethiopia",
                  "API integration capability",
                  "Compliance with CBE regulations",
                ],
              },
              {
                title: "Forex Bureaus",
                requirements: [
                  "Licensed forex bureau in Ethiopia",
                  "Foreign exchange trading capability",
                  "Bank account for settlements",
                  "Established customer relationships",
                  "Compliance certifications",
                ],
              },
            ].map((type, idx) => (
              <div key={idx} className="bg-card border border-border rounded-2xl p-8">
                <h3 className="text-xl font-bold text-foreground mb-6">{type.title}</h3>
                <ul className="space-y-3">
                  {type.requirements.map((req, ridx) => (
                    <li key={ridx} className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/70 text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">Partner Requirements</h2>
            <p className="text-lg text-foreground/70">What we need from our partners</p>
          </div>
          <div className="space-y-6">
            {[
              {
                title: "Legal & Compliance",
                items: [
                  "Valid business license and registration",
                  "KYC/AML compliance documentation",
                  "Financial statements (last 2 years)",
                  "Compliance certifications",
                  "Insurance coverage",
                ],
              },
              {
                title: "Operational Capability",
                items: [
                  "Minimum ETB 500,000 liquidity",
                  "Active bank accounts (CBE, Dashen, Awash, etc.)",
                  "24/7 operational capability",
                  "Customer support team",
                  "Transaction processing systems",
                ],
              },
              {
                title: "Technical Requirements",
                items: [
                  "API integration capability",
                  "Webhook support for notifications",
                  "Real-time settlement capability",
                  "Transaction logging and reporting",
                  "Security compliance (SSL, encryption)",
                ],
              },
            ].map((section, idx) => (
              <div key={idx} className="bg-card border border-border rounded-2xl p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">{section.title}</h3>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {section.items.map((item, iidx) => (
                    <li key={iidx} className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">Application Process</h2>
            <p className="text-lg text-foreground/70">Simple steps to become a CrossPay partner</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Submit Application",
                description: "Fill out our partner application form with your company details.",
              },
              {
                step: "2",
                title: "Initial Review",
                description: "Our team reviews your application and verifies your credentials.",
              },
              {
                step: "3",
                title: "Due Diligence",
                description: "We conduct compliance checks and verify your operational capability.",
              },
              {
                step: "4",
                title: "Onboarding",
                description: "API integration, testing, and go-live with CrossPay platform.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "What are the minimum liquidity requirements?",
                a: "Partners need a minimum of ETB 500,000 in liquidity to handle daily transactions. This can be increased based on transaction volume.",
              },
              {
                q: "How long does the onboarding process take?",
                a: "Typically 2-4 weeks from application to go-live, depending on documentation completeness and compliance verification.",
              },
              {
                q: "What commission do partners earn?",
                a: "Commission rates vary based on transaction volume and partner tier. Typically 0.5-2% per transaction. Contact our partnerships team for details.",
              },
              {
                q: "Can we set our own exchange rates?",
                a: "No, we use real-time market rates to ensure fairness. Your margin is built into the commission structure.",
              },
              {
                q: "What happens if there's a settlement issue?",
                a: "Our support team works with you to resolve issues within 24 hours. All transactions are recorded on-chain for transparency.",
              },
              {
                q: "Do we need to handle KYC for recipients?",
                a: "No, CrossPay handles all KYC/AML compliance. You only need to verify recipient bank account details.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-bold text-foreground mb-2">{item.q}</h3>
                <p className="text-foreground/70">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Ready to Join CrossPay?</h2>
          <p className="text-lg text-foreground/70 mb-8">
            Start earning revenue and help us revolutionize remittances to Ethiopia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
              Apply as Partner
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/30 text-foreground hover:bg-primary/5 bg-transparent w-full sm:w-auto"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-foreground/60 mb-4">
            Questions? Contact our partnerships team at{" "}
            <a href="mailto:partners@crosspay.io" className="text-primary hover:underline">
              partners@crosspay.io
            </a>
          </p>
          <p className="text-xs text-foreground/50">© 2025 CrossPay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
