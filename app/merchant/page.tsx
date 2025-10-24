"use client"
import { MerchantLayout } from "@/components/merchant-layout"
import { MerchantHeader } from "@/components/merchant-header"
import { MerchantStats } from "@/components/merchant-stats"
import { MerchantPayments } from "@/components/merchant-payments"
import { SettlementInfo } from "@/components/settlement-info"

export default function MerchantPage() {
  return (
    <MerchantLayout>
      <div className="space-y-8">
        <MerchantHeader />
        <MerchantStats />
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MerchantPayments />
          </div>
          <div>
            <SettlementInfo />
          </div>
        </div>
      </div>
    </MerchantLayout>
  )
}
