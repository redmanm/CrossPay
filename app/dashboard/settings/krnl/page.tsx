// KRNL Labs settings and configuration page
"use client"

import { KrnlIntegrationInfo } from "@/components/krnl-integration-info"

export default function KrnlSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">KRNL Labs Integration</h1>
        <p className="text-foreground/60">
          Learn how CrossPay uses KRNL Labs Web3 infrastructure for secure transactions
        </p>
      </div>

      <KrnlIntegrationInfo />
    </div>
  )
}
