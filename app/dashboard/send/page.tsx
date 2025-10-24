"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { SendMoneyModal } from "@/components/send-money-modal"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getRecipients } from "@/lib/api-client"
import { ArrowRight, Zap, Globe, Lock, Clock } from "lucide-react"

export default function SendPage() {
  const [recipients, setRecipients] = useState<any[]>([])
  const [sendModalOpen, setSendModalOpen] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)

  useEffect(() => {
    loadRecipients()
    const storedWallet = localStorage.getItem("connectedWallet")
    if (storedWallet) {
      setWalletConnected(true)
    }
  }, [])

  const loadRecipients = async () => {
    try {
      const data = await getRecipients()
      setRecipients(data)
    } catch (error) {
      console.error("Failed to load recipients:", error)
    }
  }

  const handleSendSuccess = () => {
    setSendModalOpen(false)
    loadRecipients()
  }

  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Send Money Globally</h1>
            <p className="text-lg text-foreground/60 mt-2">Fast, secure, and affordable international transfers</p>
          </div>

          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-3">Ready to send money?</h2>
                <p className="text-foreground/70 mb-6">
                  Send funds to merchants and recipients worldwide with just a few clicks. Powered by KRNL Labs Web3
                  infrastructure for maximum security.
                </p>
                <Button
                  onClick={() => setSendModalOpen(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Send Money Now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              <div className="hidden md:block text-6xl">💸</div>
            </div>
          </Card>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Zap,
              title: "Instant",
              description: "Transfers processed in minutes",
            },
            {
              icon: Globe,
              title: "Global",
              description: "Send to 150+ countries",
            },
            {
              icon: Lock,
              title: "Secure",
              description: "KRNL verified transactions",
            },
            {
              icon: Clock,
              title: "24/7",
              description: "Available anytime, anywhere",
            },
          ].map((feature, idx) => {
            const Icon = feature.icon
            return (
              <Card key={idx} className="p-6 border-border hover:border-primary/50 transition">
                <Icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-foreground/60">{feature.description}</p>
              </Card>
            )
          })}
        </div>

        {/* How It Works Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Select Merchant",
                description: "Choose from our network of merchants or enter a merchant code",
              },
              {
                step: "2",
                title: "Enter Amount",
                description: "Specify the amount and review the exchange rate and fees",
              },
              {
                step: "3",
                title: "Confirm & Pay",
                description: "Connect your wallet and confirm the transaction securely",
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-foreground/60">{item.description}</p>
                  </div>
                </div>
                {idx < 2 && <div className="hidden md:block absolute top-10 left-5 w-0.5 h-12 bg-primary/20 -ml-0.5" />}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-card border-border p-8 text-center">
          <h3 className="text-xl font-bold text-foreground mb-3">Start sending money today</h3>
          <p className="text-foreground/60 mb-6">Join thousands of users sending money securely across the globe</p>
          <Button
            onClick={() => setSendModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Send Money <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Card>
      </div>

      <SendMoneyModal
        open={sendModalOpen}
        onOpenChange={setSendModalOpen}
        recipients={recipients}
        onSuccess={handleSendSuccess}
        walletConnected={walletConnected}
      />
    </DashboardLayout>
  )
}
