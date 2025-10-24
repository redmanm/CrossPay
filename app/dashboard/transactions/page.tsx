"use client"
import { DashboardLayout } from "@/components/dashboard-layout"
import { TransactionHeader } from "@/components/transaction-header"
import { TransactionTable } from "@/components/transaction-table"

export default function TransactionsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <TransactionHeader />
        <TransactionTable />
      </div>
    </DashboardLayout>
  )
}
