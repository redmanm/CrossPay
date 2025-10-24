"use client"
import { PaymentFlow } from "@/components/payment-flow"
import { Send } from "lucide-react"
import Link from "next/link"

export default function PayPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Send className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">CrossPay</span>
          </Link>
          <p className="text-sm text-foreground/60">Pay with Crypto</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PaymentFlow />
      </div>
    </div>
  )
}
