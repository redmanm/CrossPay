"use client"

import { BarChart3, TrendingUp, Clock, AlertCircle } from "lucide-react"

export function TransactionStats() {
  const stats = [
    {
      label: "Total Transactions",
      value: "156",
      change: "+12 this month",
      icon: BarChart3,
      color: "text-primary",
    },
    {
      label: "Total Amount Sent",
      value: "$45,230",
      change: "+18.5%",
      icon: TrendingUp,
      color: "text-accent",
    },
    {
      label: "Average Transfer Time",
      value: "2.3 min",
      change: "Faster than industry",
      icon: Clock,
      color: "text-primary",
    },
    {
      label: "Failed Transactions",
      value: "2",
      change: "0.5% failure rate",
      icon: AlertCircle,
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
