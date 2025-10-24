"use client"

import { ArrowDownLeft, MoreVertical, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MerchantPayments() {
  const payments = [
    {
      id: 1,
      customer: "John Smith",
      amount: "$250",
      amountEtb: "₿ 46,250",
      date: "Today 2:45 PM",
      status: "completed",
      method: "USDT",
    },
    {
      id: 2,
      customer: "Sarah Johnson",
      amount: "$180",
      amountEtb: "₿ 33,300",
      date: "Today 1:20 PM",
      status: "completed",
      method: "USDC",
    },
    {
      id: 3,
      customer: "Michael Chen",
      amount: "$420",
      amountEtb: "₿ 77,700",
      date: "Today 12:15 PM",
      status: "pending",
      method: "USDT",
    },
    {
      id: 4,
      customer: "Emma Wilson",
      amount: "$95",
      amountEtb: "₿ 17,575",
      date: "Yesterday 6:30 PM",
      status: "completed",
      method: "USDC",
    },
    {
      id: 5,
      customer: "David Brown",
      amount: "$310",
      amountEtb: "₿ 57,350",
      date: "Yesterday 3:45 PM",
      status: "completed",
      method: "USDT",
    },
  ]

  const getStatusIcon = (status: string) => {
    return status === "completed" ? (
      <CheckCircle className="w-4 h-4 text-primary" />
    ) : (
      <Clock className="w-4 h-4 text-accent" />
    )
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Recent Payments</h2>
        <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
          View All
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground/60">Customer</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground/60">Amount</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground/60">Method</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground/60">Date</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground/60">Status</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-foreground/60">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b border-border hover:bg-secondary/30 transition">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <ArrowDownLeft className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{payment.customer}</p>
                      <p className="text-sm text-foreground/60">{payment.amountEtb}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <p className="font-semibold text-foreground">{payment.amount}</p>
                </td>
                <td className="py-4 px-4">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-semibold">
                    {payment.method}
                  </span>
                </td>
                <td className="py-4 px-4 text-foreground/60 text-sm">{payment.date}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(payment.status)}
                    <span className="text-xs font-semibold capitalize">{payment.status}</span>
                  </div>
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
    </div>
  )
}
