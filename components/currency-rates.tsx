"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface CurrencyRate {
  code: string
  name: string
  rate: number
  change: number
}

export function CurrencyRates() {
  const [rates, setRates] = useState<CurrencyRate[]>([
    { code: "USD", name: "US Dollar", rate: 132.5, change: 0.5 },
    { code: "EUR", name: "Euro", rate: 145.75, change: -0.3 },
    { code: "GBP", name: "British Pound", rate: 168.25, change: 0.8 },
    { code: "KES", name: "Kenyan Shilling", rate: 1.02, change: 0.2 },
    { code: "UGX", name: "Ugandan Shilling", rate: 0.035, change: -0.1 },
    { code: "SAR", name: "Saudi Arabian Riyal", rate: 35.3, change: 0.3 },
    { code: "AED", name: "UAE Dinar", rate: 36.1, change: 0.4 },
  ])

  useEffect(() => {
    // Simulate live rate updates every 5 seconds
    const interval = setInterval(() => {
      setRates((prevRates) =>
        prevRates.map((rate) => ({
          ...rate,
          rate: rate.rate + (Math.random() - 0.5) * 0.5,
          change: (Math.random() - 0.5) * 2,
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Live Exchange Rates</h2>
        <p className="text-foreground/60 mt-1">Current rates to Ethiopian Birr (ETB)</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rates.map((rate) => (
          <Card key={rate.code} className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground/60">{rate.code}</p>
                    <p className="text-xs text-foreground/40">{rate.name}</p>
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                      rate.change >= 0 ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                    }`}
                  >
                    {rate.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span className="text-xs font-semibold">{rate.change.toFixed(2)}%</span>
                  </div>
                </div>

                <div className="border-t border-border pt-3">
                  <p className="text-2xl font-bold text-primary">{rate.rate.toFixed(2)}</p>
                  <p className="text-xs text-foreground/40 mt-1">1 {rate.code} = ETB</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-foreground/70">
          💡 <span className="font-semibold">Tip:</span> Exchange rates update every 5 seconds. CrossPay offers
          competitive rates for sending money to Ethiopia.
        </p>
      </div>
    </div>
  )
}
