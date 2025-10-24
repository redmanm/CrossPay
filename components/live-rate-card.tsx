"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Zap } from "lucide-react"

export function LiveRateCard() {
  const [rate, setRate] = useState<number>(165.5)
  const [isLoading, setIsLoading] = useState(true)
  const [sendAmount, setSendAmount] = useState<number>(1000)

  useEffect(() => {
    // Simulate fetching live rate from API
    // In production, this would call your backend API
    setIsLoading(false)

    // Simulate rate updates every 5 seconds
    const interval = setInterval(() => {
      // Add slight variation to simulate live rate changes
      setRate((prev) => prev + (Math.random() - 0.5) * 2)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const receiveAmount = (sendAmount * rate).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })

  const traditionalRate = rate * 0.85 // Simulate traditional service rate (15% worse)
  const savings = (((rate - traditionalRate) / traditionalRate) * 100).toFixed(1)

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
      <div className="relative bg-card border border-border rounded-3xl p-8 shadow-xl animated-border">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground/60">SEND AMOUNT</span>
            <div className="flex items-center gap-2 bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
              <Zap className="w-3 h-3" />
              Live Rate: 1 USD = {rate.toFixed(2)} ETB
            </div>
          </div>

          {/* Send amount input */}
          <div className="space-y-2">
            <input
              type="number"
              value={sendAmount}
              onChange={(e) => setSendAmount(Number(e.target.value) || 0)}
              placeholder="1,000"
              className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-2xl font-bold text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-sm text-foreground/60">USD • USDT • USDC</p>
          </div>

          <div className="border-t border-border pt-4 space-y-3">
            <p className="text-sm text-foreground/60">YOU RECEIVE</p>
            <p className="text-3xl font-bold text-primary">{receiveAmount} ETB</p>
            <p className="text-xs text-foreground/60">Ethiopian Birr</p>

            <div className="mt-4 p-3 bg-accent/5 border border-accent/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-xs font-semibold text-accent">Better Rate Than Traditional Services</span>
              </div>
              <p className="text-xs text-foreground/70">
                Save <span className="font-bold text-accent">{savings}%</span> vs traditional remittance services
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
