"use client"

import { TrendingUp, DollarSign, Users, Clock } from "lucide-react"

export function MerchantStats() {
  const stats = [
    {
      label: "Today's Revenue",
      value: "₿ 45,600",
      change: "+15.3%",
      icon: DollarSign,
      color: "text-primary",
    },
    {
      label: "This Month",
      value: "₿ 892,400",
      change: "+22.1%",
      icon: TrendingUp,
      color: "text-accent",
    },
    {
      label: "Transactions",
      value: "24",
      change: "Today",
      icon: Users,
      color: "text-primary",
    },
    {
      label: "Pending Settlement",
      value: "₿ 12,500",
      change: "Next 2 hours",
      icon: Clock,
      color: "text-accent",
    },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <div key={idx} className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2 bg-primary/10 rounded-lg ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs text-foreground/60">{stat.change}</span>
            </div>
            <p className="text-foreground/70 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        )
      })}
    </div>
  )
}
