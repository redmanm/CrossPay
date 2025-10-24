"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownLeft, Loader2 } from "lucide-react"

interface Transaction {
  id: string
  type: "sent" | "received"
  amount: number
  currency: string
  recipient: string
  status: string
  timestamp: string
}

export function LiveTransactionFeed() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTransactions()
    const interval = setInterval(loadTransactions, 10000)
    return () => clearInterval(interval)
  }, [])

  const loadTransactions = async () => {
    try {
      const response = await fetch("/api/transfers")
      const data = await response.json()
      setTransactions(data.slice(0, 5))
    } catch (error) {
      console.error("Failed to load transactions:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Live Transaction Feed</h3>

      {transactions.length === 0 ? (
        <p className="text-center text-foreground/60 py-8">No transactions yet</p>
      ) : (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition"
            >
              <div className="flex items-center gap-3 flex-1">
                <div
                  className={`p-2 rounded-full ${tx.type === "sent" ? "bg-red-100 dark:bg-red-900" : "bg-green-100 dark:bg-green-900"}`}
                >
                  {tx.type === "sent" ? (
                    <ArrowUpRight className="w-4 h-4 text-red-600 dark:text-red-400" />
                  ) : (
                    <ArrowDownLeft className="w-4 h-4 text-green-600 dark:text-green-400" />
                  )}
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-foreground capitalize">
                    {tx.type} to {tx.recipient}
                  </p>
                  <p className="text-xs text-foreground/60">{new Date(tx.timestamp).toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-semibold text-foreground">
                    {tx.type === "sent" ? "-" : "+"}
                    {tx.amount} {tx.currency}
                  </p>
                </div>
                <Badge className={getStatusColor(tx.status)}>{tx.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
