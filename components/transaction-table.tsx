"use client"

import {
  ArrowUpRight,
  ArrowDownLeft,
  MoreVertical,
  ExternalLink,
  Copy,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function TransactionTable() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const transactions = [
    {
      id: 1,
      recipient: "Abebe Kebede",
      amount: "$500",
      amountEtb: "₿ 92,500",
      date: "Today 2:45 PM",
      status: "completed",
      type: "sent",
      txHash: "0x742d35Cc6634C0532925a3b844Bc9e7595f42e1",
      fee: "$5",
      exchangeRate: "1 USD = 185 ETB",
    },
    {
      id: 2,
      recipient: "Almaz Tekle",
      amount: "$1,200",
      amountEtb: "₿ 222,000",
      date: "Yesterday 10:20 AM",
      status: "completed",
      type: "sent",
      txHash: "0x8a3f2Bb7234D1643826c4d955Ef8a2c6d53e9f2",
      fee: "$12",
      exchangeRate: "1 USD = 185 ETB",
    },
    {
      id: 3,
      recipient: "Yohannes Assefa",
      amount: "$750",
      amountEtb: "₿ 138,750",
      date: "2 days ago",
      status: "pending",
      type: "sent",
      txHash: "0x5c1e9Aa4567B8901234d5e6f7g8h9i0j1k2l3m4",
      fee: "$7.50",
      exchangeRate: "1 USD = 185 ETB",
    },
    {
      id: 4,
      recipient: "Refund from CrossPay",
      amount: "$50",
      amountEtb: "₿ 9,250",
      date: "1 week ago",
      status: "completed",
      type: "received",
      txHash: "0x9d2g3Hh5678C9012345e6f7g8h9i0j1k2l3m4n5",
      fee: "$0",
      exchangeRate: "1 USD = 185 ETB",
    },
    {
      id: 5,
      recipient: "Tekle Mariam",
      amount: "$320",
      amountEtb: "₿ 59,200",
      date: "1 week ago",
      status: "failed",
      type: "sent",
      txHash: "0x1a2b3Cc4567D8901234e5f6g7h8i9j0k1l2m3n",
      fee: "$0",
      exchangeRate: "1 USD = 185 ETB",
    },
  ]

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
            {transactions.map((tx) => (
              <div key={tx.id}>
                <tr className="border-b border-border hover:bg-secondary/20 transition">
                  <td className="py-4 px-6">
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

                {/* Expanded Details */}
                {expandedId === tx.id && (
                  <tr className="border-b border-border bg-secondary/10">
                    <td colSpan={5} className="py-6 px-6">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs text-foreground/60 mb-1">TRANSACTION ID</p>
                            <div className="flex items-center gap-2">
                              <code className="text-sm font-mono text-foreground">{tx.txHash.slice(0, 20)}...</code>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-6 h-6 text-foreground/60 hover:text-foreground"
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-foreground/60 mb-1">EXCHANGE RATE</p>
                            <p className="text-sm font-semibold text-foreground">{tx.exchangeRate}</p>
                          </div>
                          <div>
                            <p className="text-xs text-foreground/60 mb-1">TRANSACTION FEE</p>
                            <p className="text-sm font-semibold text-foreground">{tx.fee}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            className="border-border text-foreground hover:bg-secondary bg-transparent flex items-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View on Blockchain
                          </Button>
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

      {/* Pagination */}
      <div className="border-t border-border px-6 py-4 flex items-center justify-between">
        <p className="text-sm text-foreground/60">Showing 1-5 of 156 transactions</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
            Previous
          </Button>
          <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
