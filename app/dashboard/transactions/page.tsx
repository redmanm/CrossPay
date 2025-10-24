"use client"
import { DashboardLayout } from "@/components/dashboard-layout"
import { TransactionHeader } from "@/components/transaction-header"
import { TransactionFilters } from "@/components/transaction-filters"
import { TransactionTable } from "@/components/transaction-table"
import { TransactionStats } from "@/components/transaction-stats"

export default function TransactionsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <TransactionHeader />
        <TransactionStats />
        <div className="space-y-6">
          <TransactionFilters />
          <TransactionTable />
        </div>
      </div>
    </DashboardLayout>
  )
}
