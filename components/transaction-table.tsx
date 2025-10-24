"use client"

import { ArrowUpRight, MoreVertical, CheckCircle, Clock, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useUser } from "@/components/user-context"
import { useTransactions } from "@/components/transaction-context"

export function TransactionTable() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const { user } = useUser()
  const { transactions } = useTransactions()

  const userTransactions = transactions.filter((tx) => tx.userId === "redwan-mudasir" && tx.type === "sent")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-primary" />
      case "pending":
        return <Clock className="w-4 h-4 text-accent" />
      case "failed":
        return <XCircle className="w-4 h-4 text-destructive" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-primary/10 text-primary"
      case "pending":
        return "bg-accent/10 text-accent"
      case "failed":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-foreground/10 text-foreground"
    }
  }

  if (userTransactions.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-12 text-center">
        <p className="text-foreground/60 text-lg">the transaction is not recorded yet</p>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="text-left py-4 px-6 text-sm font-semibold text-foreground/60">Recipient</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-foreground/60">Amount</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-foreground/60">Date</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-foreground/60">Status</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-foreground/60">Action</th>
            </tr>
          </thead>
          <tbody>
            {userTransactions.map((tx) => (
              <div key={tx.id}>
                <tr className="border-b border-border hover:bg-secondary/20 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10">
                        <ArrowUpRight className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{tx.recipient}</p>
                        <p className="text-xs text-foreground/60">{tx.amountEtb}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-semibold text-foreground">{tx.amount}</p>
                  </td>
                  <td className="py-4 px-6 text-foreground/60 text-sm">{tx.date}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(tx.status)}
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(tx.status)}`}>
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-foreground/60 hover:text-foreground"
                      onClick={() => setExpandedId(expandedId === tx.id ? null : tx.id)}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>

                {expandedId === tx.id && (
                  <tr className="border-b border-border bg-secondary/10">
                    <td colSpan={5} className="py-6 px-6">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs text-foreground/60 mb-1">TRANSACTION ID</p>
                            <div className="flex items-center gap-2">
                              <code className="text-sm font-mono text-foreground">{tx.txHash.slice(0, 20)}...</code>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </div>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
