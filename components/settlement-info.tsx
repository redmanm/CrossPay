"use client"

import { Calendar, Ban as Bank, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SettlementInfo() {
  return (
    <div className="space-y-6">
      {/* Settlement Schedule */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Settlement Schedule
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-sm text-foreground/60">Next Settlement</span>
            <span className="font-semibold text-foreground">Today 6:00 PM</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-sm text-foreground/60">Settlement Amount</span>
            <span className="font-bold text-primary">₿ 157,425</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-foreground/60">Bank Account</span>
            <span className="text-sm text-foreground">CBE • ••••2891</span>
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Bank className="w-5 h-5 text-primary" />
          Bank Details
        </h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-foreground/60 mb-1">Bank Name</p>
            <p className="font-semibold text-foreground">Commercial Bank of Ethiopia</p>
          </div>
          <div>
            <p className="text-foreground/60 mb-1">Account Number</p>
            <p className="font-mono text-foreground">1000234567890</p>
          </div>
          <div>
            <p className="text-foreground/60 mb-1">Account Holder</p>
            <p className="font-semibold text-foreground">Hilton Addis Ababa</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full mt-4 border-border text-foreground hover:bg-secondary bg-transparent"
        >
          Update Bank Details
        </Button>
      </div>

      {/* Important Notice */}
      <div className="bg-accent/10 border border-accent/30 rounded-2xl p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-foreground mb-1">Settlement Processing</p>
          <p className="text-xs text-foreground/70">
            Settlements are processed automatically every 6 hours. Ensure your bank details are up to date.
          </p>
        </div>
      </div>
    </div>
  )
}
