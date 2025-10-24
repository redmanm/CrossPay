"use client"

import { Download, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TransactionHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Transaction History</h1>
        <p className="text-foreground/60 mt-1">Track all your remittances and payments</p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="border-border text-foreground hover:bg-secondary bg-card flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
        <Button
          variant="outline"
          className="border-border text-foreground hover:bg-secondary bg-card flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>
    </div>
  )
}
