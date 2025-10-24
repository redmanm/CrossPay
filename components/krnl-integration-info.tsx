// KRNL Labs integration information and documentation
"use client"

import { Card } from "@/components/ui/card"
import { Shield, Zap, Lock, CheckCircle } from "lucide-react"

export function KrnlIntegrationInfo() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-8">
        <div className="flex items-start gap-4">
          <Shield className="w-8 h-8 text-emerald-600 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold text-emerald-900 mb-2">KRNL Labs Integration</h2>
            <p className="text-emerald-800">
              CrossPay uses KRNL Labs Web3 infrastructure for secure, transparent, and auditable transactions.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6 border-emerald-200 bg-emerald-50/50">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-emerald-600" />
            <h3 className="font-semibold text-emerald-900">Instant Verification</h3>
          </div>
          <p className="text-sm text-emerald-800">
            KRNL kernels verify transactions instantly using decentralized oracle networks
          </p>
        </Card>

        <Card className="p-6 border-emerald-200 bg-emerald-50/50">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-6 h-6 text-emerald-600" />
            <h3 className="font-semibold text-emerald-900">Secure Wallets</h3>
          </div>
          <p className="text-sm text-emerald-800">
            Wallet management powered by KRNL Labs with cross-chain support and key management
          </p>
        </Card>

        <Card className="p-6 border-emerald-200 bg-emerald-50/50">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-emerald-600" />
            <h3 className="font-semibold text-emerald-900">Auditable Records</h3>
          </div>
          <p className="text-sm text-emerald-800">
            All transactions are recorded on-chain for complete transparency and auditability
          </p>
        </Card>
      </div>

      <Card className="p-8 border-emerald-200">
        <h3 className="text-lg font-bold text-foreground mb-6">How KRNL Secures CrossPay</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 font-semibold text-emerald-700">
              1
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">KYC Verification Kernel</p>
              <p className="text-sm text-foreground/70">
                Verifies user identity through KRNL's KYC kernel (337) for compliance
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 font-semibold text-emerald-700">
              2
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Exchange Rate Oracle</p>
              <p className="text-sm text-foreground/70">
                Real-time exchange rates from KRNL's oracle kernel (338) for accurate conversions
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 font-semibold text-emerald-700">
              3
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Transaction Validation</p>
              <p className="text-sm text-foreground/70">
                KRNL validation kernel (339) ensures all transactions meet security requirements
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 font-semibold text-emerald-700">
              4
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Smart Contract Execution</p>
              <p className="text-sm text-foreground/70">
                Verified data is sent to CrossPay smart contract for final settlement
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-8 border-blue-200 bg-blue-50/50">
        <h3 className="text-lg font-bold text-blue-900 mb-4">Supported Networks</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { name: "Ethereum", status: "Fully Supported" },
            { name: "Polygon", status: "Fully Supported" },
            { name: "Arbitrum", status: "Fully Supported" },
            { name: "Optimism", status: "Coming Soon" },
          ].map((network) => (
            <div
              key={network.name}
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-100"
            >
              <span className="font-semibold text-foreground">{network.name}</span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  network.status === "Fully Supported" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                }`}
              >
                {network.status}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-8 border-amber-200 bg-amber-50/50">
        <h3 className="text-lg font-bold text-amber-900 mb-4">Environment Configuration</h3>
        <div className="space-y-3 text-sm font-mono text-amber-900">
          <p>Add these environment variables to your .env.local:</p>
          <div className="bg-white p-4 rounded border border-amber-200 space-y-2">
            <p>NEXT_PUBLIC_KRNL_RPC=https://krnl-rpc.example.com</p>
            <p>NEXT_PUBLIC_KRNL_ENTRY_ID=your_entry_id</p>
            <p>NEXT_PUBLIC_KRNL_ACCESS_TOKEN=your_access_token</p>
            <p>NEXT_PUBLIC_CROSSPAY_CONTRACT=0x...</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
