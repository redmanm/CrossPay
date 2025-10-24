"use client"

import { Bell, Settings, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MerchantHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Hilton Addis Ababa</h1>
        <p className="text-foreground/60 mt-1">Merchant Dashboard • Account verified</p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="border-border text-foreground hover:bg-secondary bg-card flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export Report
        </Button>
        <Button variant="outline" size="icon" className="border-border bg-card hover:bg-secondary">
          <Bell className="w-5 h-5 text-foreground" />
        </Button>
        <Button variant="outline" size="icon" className="border-border bg-card hover:bg-secondary">
          <Settings className="w-5 h-5 text-foreground" />
        </Button>
      </div>
    </div>
  )
}
