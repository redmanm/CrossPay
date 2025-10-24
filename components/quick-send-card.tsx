"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Users } from "lucide-react"

interface QuickSendCardProps {
  onSendClick?: () => void
  onAddRecipientClick?: () => void
  recipients?: any[]
}

export function QuickSendCard({ onSendClick, onAddRecipientClick, recipients = [] }: QuickSendCardProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    recipient: "",
    amount: "",
    currency: "USD",
  })

  const defaultRecipients = [
    { id: 1, name: "Abebe Kebede", account: "CBE • ••••5432" },
    { id: 2, name: "Almaz Tekle", account: "Dashen • ••••8901" },
    { id: 3, name: "Yohannes Assefa", account: "Awash • ••••2345" },
  ]

  const displayRecipients = recipients.length > 0 ? recipients : defaultRecipients

  return (
    <div className="bg-card border border-border rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">Send Money</h2>

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Select Recipient</label>
            <div className="space-y-2">
              {displayRecipients.slice(0, 3).map((recipient) => (
                <button
                  key={recipient.id}
                  onClick={() => {
                    setFormData({ ...formData, recipient: recipient.name })
                    setStep(2)
                  }}
                  className="w-full flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary transition text-left"
                >
                  <div>
                    <p className="font-semibold text-foreground">{recipient.name}</p>
                    <p className="text-sm text-foreground/60">{recipient.account}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-foreground/40" />
                </button>
              ))}
            </div>
            <Button
              onClick={onAddRecipientClick}
              variant="outline"
              className="w-full mt-4 border-border text-foreground hover:bg-secondary bg-transparent flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4" />
              Add New Recipient
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Recipient</label>
            <div className="p-4 bg-secondary rounded-lg border border-border">
              <p className="font-semibold text-foreground">{formData.recipient}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Amount</label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/60 font-semibold">
                  {formData.currency}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">You Receive</label>
              <div className="p-3 bg-secondary rounded-lg border border-border">
                <p className="text-2xl font-bold text-primary">
                  {formData.amount ? `₿ ${(Number.parseFloat(formData.amount) * 185).toLocaleString()}` : "₿ 0"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-secondary/50 border border-border rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Exchange Rate</span>
              <span className="text-foreground font-semibold">1 USD = 185 ETB</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Fee (1%)</span>
              <span className="text-foreground font-semibold">
                ${(Number.parseFloat(formData.amount || "0") * 0.01).toFixed(2)}
              </span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="text-foreground font-semibold">Total Cost</span>
              <span className="text-foreground font-bold">
                ${(Number.parseFloat(formData.amount || "0") * 1.01).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-border text-foreground hover:bg-secondary bg-transparent"
              onClick={() => setStep(1)}
            >
              Back
            </Button>
            <Button onClick={onSendClick} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              Continue <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
