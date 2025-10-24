"use client"

import { Eye, EyeOff, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function BalanceCard() {
  const [showBalance, setShowBalance] = useState(true)

  return (
    <div className="bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-2xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-semibold text-foreground/70">WALLET BALANCE</h3>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="text-foreground/60 hover:text-foreground transition"
        >
          {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
      </div>

      <div className="mb-8">
        <p className="text-foreground/60 text-sm mb-2">Available Balance</p>
        <p className="text-4xl font-bold text-foreground">{showBalance ? "$2,450.50" : "••••••"}</p>
      </div>

      <div className="space-y-3">
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          Add Funds
        </Button>
        <Button
          variant="outline"
          className="w-full border-primary/30 text-foreground hover:bg-primary/5 bg-transparent"
        >
          View Details
        </Button>
      </div>

      <div className="mt-6 pt-6 border-t border-primary/20 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-foreground/60">USDT Balance</span>
          <span className="text-foreground font-semibold">$2,450.50</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground/60">Exchange Rate</span>
          <span className="text-foreground font-semibold">1 USD = 185 ETB</span>
        </div>
      </div>
    </div>
  )
}
