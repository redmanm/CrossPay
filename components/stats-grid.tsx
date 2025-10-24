"use client"

import { TrendingUp, Send, Clock, DollarSign } from "lucide-react"

export function StatsGrid() {
  const stats = [
    {
      label: "Total Sent",
      value: "$12,450",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-primary",
    },
    {
      label: "This Month",
      value: "$3,200",
      change: "+8.2%",
      icon: TrendingUp,
      color: "text-accent",
    },
    {
      label: "Pending",
      value: "$500",
      change: "1 transfer",
      icon: Clock,
      color: "text-primary",
    },
    {
      label: "Recipients",
      value: "8",
      change: "+2 this month",
      icon: Send,
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
