"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight, ArrowDownLeft, MoreVertical, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTransfers } from "@/lib/api-client"

export function RecentTransactions() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTransactions()
    const interval = setInterval(loadTransactions, 15000)
    return () => clearInterval(interval)
  }, [])

  const loadTransactions = async () => {
    try {
      const data = await getTransfers()
      setTransactions(data.slice(0, 5))
    } catch (error) {
      console.error("Failed to load transactions:", error)
    } finally {
      setLoading(false)
    }
  }

  const defaultTransactions = [
    {
      id: 1,
      recipient: "Abebe Kebede",
      amount: "$500",
      amountEtb: "₿ 92,500",
      date: "Today",
      status: "completed",
      type: "sent",
    },
    {
      id: 2,
      recipient: "Almaz Tekle",
      amount: "$1,200",
      amountEtb: "₿ 222,000",
      date: "Yesterday",
      status: "completed",
      type: "sent",
    },
    {
      id: 3,
      recipient: "Yohannes Assefa",
      amount: "$750",
      amountEtb: "₿ 138,750",
      date: "2 days ago",
      status: "pending",
      type: "sent",
    },
    {
      id: 4,
      recipient: "Refund from CrossPay",
      amount: "$50",
      amountEtb: "₿ 9,250",
      date: "1 week ago",
      status: "completed",
      type: "received",
    },
  ]

  const displayTransactions = transactions.length > 0 ? transactions : defaultTransactions

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-primary/10 text-primary"
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "pending":
        return "bg-accent/10 text-accent"
      default:
        return "bg-foreground/10 text-foreground"
    }
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Recent Transactions</h2>
        <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
          View All
        </Button>
      </div>

      {loading && transactions.length === 0 ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground/60">Recipient</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground/60">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground/60">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground/60">Status</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-foreground/60">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-border hover:bg-secondary/30 transition">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === "sent" ? "bg-primary/10" : "bg-accent/10"}`}
                      >
                        {tx.type === "sent" ? (
                          <ArrowUpRight className={`w-5 h-5 ${tx.type === "sent" ? "text-primary" : "text-accent"}`} />
                        ) : (
                          <ArrowDownLeft className="w-5 h-5 text-accent" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{tx.recipient}</p>
                        <p className="text-sm text-foreground/60">{tx.amountEtb}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-foreground">{tx.amount}</p>
                  </td>
                  <td className="py-4 px-4 text-foreground/60">{tx.date}</td>
                  <td className="py-4 px-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(tx.status)}`}>
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Button variant="ghost" size="icon" className="text-foreground/60 hover:text-foreground">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
