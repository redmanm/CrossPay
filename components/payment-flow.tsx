"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, QrCode, Copy, Check, Shield } from "lucide-react"

type PaymentStep = "merchant" | "amount" | "wallet" | "confirm" | "success"

export function PaymentFlow() {
  const [step, setStep] = useState<PaymentStep>("merchant")
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    merchant: "",
    amount: "",
    walletAddress: "",
    currency: "USDT",
  })
  const [copied, setCopied] = useState(false)

  const merchants = [
    { id: 1, name: "Hilton Addis Ababa", category: "Hotel", logo: "🏨" },
    { id: 2, name: "Addis Ababa Marriott", category: "Hotel", logo: "🏨" },
    { id: 3, name: "Dine Restaurant", category: "Restaurant", logo: "🍽️" },
    { id: 4, name: "Addis Fashion Store", category: "Retail", logo: "👕" },
    { id: 5, name: "Ethio Tours", category: "Travel", logo: "✈️" },
    { id: 6, name: "Addis Pharmacy", category: "Healthcare", logo: "💊" },
  ]

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("0x742d35Cc6634C0532925a3b844Bc9e7595f42e1")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleKrnlPayment = async () => {
    setIsProcessing(true)
    try {
      const response = await fetch("/api/krnl/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: formData.amount,
          recipientAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f42e1",
          senderAddress: formData.walletAddress,
          kernelData: {
            merchant: formData.merchant,
            currency: formData.currency,
          },
        }),
      })

      if (response.ok) {
        setStep("success")
      }
    } catch (error) {
      console.error("[v0] Payment error:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between">
        {["merchant", "amount", "wallet", "confirm", "success"].map((s, idx) => (
          <div key={s} className="flex items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition ${
                ["merchant", "amount", "wallet", "confirm", "success"].indexOf(step) >= idx
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground/60"
              }`}
            >
              {idx + 1}
            </div>
            {idx < 4 && (
              <div
                className={`flex-1 h-1 mx-2 transition ${
                  ["merchant", "amount", "wallet", "confirm", "success"].indexOf(step) > idx
                    ? "bg-primary"
                    : "bg-secondary"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Select Merchant */}
      {step === "merchant" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Select Merchant</h2>
            <p className="text-foreground/60">Choose where you want to pay</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {merchants.map((merchant) => (
              <button
                key={merchant.id}
                onClick={() => {
                  setFormData({ ...formData, merchant: merchant.name })
                  setStep("amount")
                }}
                className="p-4 border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{merchant.logo}</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{merchant.category}</span>
                </div>
                <p className="font-semibold text-foreground">{merchant.name}</p>
              </button>
            ))}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-2 text-foreground/60 text-sm">Or enter merchant code</span>
            </div>
          </div>

          <Input placeholder="Enter merchant code" className="text-center" />
        </div>
      )}

      {/* Step 2: Enter Amount */}
      {step === "amount" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Payment Amount</h2>
            <p className="text-foreground/60">Paying to {formData.merchant}</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Amount in USD</label>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="text-2xl font-bold pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/60 font-semibold">
                    USD
                  </span>
                </div>
              </div>

              <div className="bg-secondary/50 border border-border rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Exchange Rate</span>
                  <span className="text-foreground font-semibold">1 USD = 185 ETB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">You Pay (USDT)</span>
                  <span className="text-foreground font-semibold">{formData.amount || "0"} USDT</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Merchant Receives</span>
                  <span className="text-primary font-bold">
                    ₿ {formData.amount ? (Number.parseFloat(formData.amount) * 185).toLocaleString() : "0"}
                  </span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="text-foreground font-semibold">Fee (0.5%)</span>
                  <span className="text-foreground font-semibold">
                    ${(Number.parseFloat(formData.amount || "0") * 0.005).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-border text-foreground hover:bg-secondary bg-transparent"
              onClick={() => setStep("merchant")}
            >
              Back
            </Button>
            <Button
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => setStep("wallet")}
            >
              Continue <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Connect Wallet */}
      {step === "wallet" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Connect Wallet</h2>
            <p className="text-foreground/60">Choose how to pay</p>
          </div>

          <div className="space-y-3">
            {[
              { name: "MetaMask", icon: "🦊" },
              { name: "WalletConnect", icon: "📱" },
              { name: "Coinbase Wallet", icon: "💰" },
              { name: "Manual Transfer", icon: "📤" },
            ].map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => {
                  if (wallet.name === "Manual Transfer") {
                    setStep("confirm")
                  }
                }}
                className="w-full p-4 border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition flex items-center gap-3"
              >
                <span className="text-2xl">{wallet.icon}</span>
                <div className="text-left flex-1">
                  <p className="font-semibold text-foreground">{wallet.name}</p>
                  <p className="text-sm text-foreground/60">
                    {wallet.name === "Manual Transfer" ? "Send crypto manually" : "Connect automatically"}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-foreground/40" />
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            className="w-full border-border text-foreground hover:bg-secondary bg-transparent"
            onClick={() => setStep("amount")}
          >
            Back
          </Button>
        </div>
      )}

      {/* Step 4: Confirm Payment */}
      {step === "confirm" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Confirm Payment</h2>
            <p className="text-foreground/60">Review and send your payment</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <Shield className="w-5 h-5 text-emerald-600" />
              <p className="text-sm text-emerald-700 font-medium">
                This transaction is secured by KRNL Labs Web3 infrastructure
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-foreground/60">Merchant</span>
                <span className="font-semibold text-foreground">{formData.merchant}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-foreground/60">Amount</span>
                <span className="font-semibold text-foreground">{formData.amount} USDT</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-foreground/60">Merchant Receives</span>
                <span className="font-bold text-primary">
                  ₿ {(Number.parseFloat(formData.amount) * 185).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground/60">Fee</span>
                <span className="font-semibold text-foreground">
                  ${(Number.parseFloat(formData.amount) * 0.005).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-foreground/70">
                <strong>Send to this address:</strong>
              </p>
              <div className="mt-3 flex items-center justify-between bg-card border border-border rounded-lg p-3">
                <code className="text-sm font-mono text-foreground">0x742d35Cc6634C0532925a3b844Bc9e7595f42e1</code>
                <button onClick={handleCopyAddress} className="text-foreground/60 hover:text-foreground transition">
                  {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="bg-secondary/50 border border-border rounded-lg p-6 flex items-center justify-center">
              <div className="text-center">
                <QrCode className="w-32 h-32 text-foreground/20 mx-auto mb-2" />
                <p className="text-sm text-foreground/60">Scan QR code to pay</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-border text-foreground hover:bg-secondary bg-transparent"
              onClick={() => setStep("wallet")}
            >
              Back
            </Button>
            <Button
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleKrnlPayment}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Confirm & Pay"}
            </Button>
          </div>
        </div>
      )}

      {/* Step 5: Success */}
      {step === "success" && (
        <div className="space-y-6 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-primary" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Payment Sent!</h2>
            <p className="text-foreground/60">Your payment is being processed</p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-sm font-semibold text-emerald-900">KRNL Verified Transaction</p>
                <p className="text-xs text-emerald-700 mt-1">
                  This transaction has been verified through KRNL Labs kernels for maximum security
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 space-y-4 text-left">
            <div className="flex justify-between">
              <span className="text-foreground/60">Transaction ID</span>
              <span className="font-mono text-foreground">0x742d35...f42e1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/60">Amount Sent</span>
              <span className="font-semibold text-foreground">{formData.amount} USDT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/60">Merchant Receives</span>
              <span className="font-bold text-primary">
                ₿ {(Number.parseFloat(formData.amount) * 185).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/60">Status</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                Processing
              </span>
            </div>
          </div>

          <div className="bg-secondary/50 border border-border rounded-lg p-4">
            <p className="text-sm text-foreground/70">
              The merchant will receive the funds in Ethiopian Birr within 2-5 minutes. You can track the status in your
              transaction history.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-border text-foreground hover:bg-secondary bg-transparent"
              onClick={() => window.print()}
            >
              Print Receipt
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">View Transaction</Button>
          </div>
        </div>
      )}
    </div>
  )
}
