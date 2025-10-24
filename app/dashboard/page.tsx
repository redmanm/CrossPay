"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardHeader } from "@/components/dashboard-header"
import { CurrencyRates } from "@/components/currency-rates"
import { SendMoneyModal } from "@/components/send-money-modal"
import { AddRecipientModal } from "@/components/add-recipient-modal"
import { getRecipients } from "@/lib/api-client"

export default function DashboardPage() {
  const [recipients, setRecipients] = useState<any[]>([])
  const [sendModalOpen, setSendModalOpen] = useState(false)
  const [addRecipientModalOpen, setAddRecipientModalOpen] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)

  useEffect(() => {
    loadRecipients()
    const storedWallet = localStorage.getItem("connectedWallet")
    if (storedWallet) {
      setWalletConnected(true)
    }
  }, [])

  const loadRecipients = async () => {
    try {
      const data = await getRecipients()
      setRecipients(data)
    } catch (error) {
      console.error("Failed to load recipients:", error)
    }
  }

  const handleAddRecipientSuccess = (newRecipient: any) => {
    setRecipients([...recipients, newRecipient])
    setAddRecipientModalOpen(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DashboardHeader />
        <CurrencyRates />
      </div>

      <SendMoneyModal
        open={sendModalOpen}
        onOpenChange={setSendModalOpen}
        recipients={recipients}
        onSuccess={() => {
          setSendModalOpen(false)
          loadRecipients()
        }}
        walletConnected={walletConnected}
        onAddRecipientClick={() => setAddRecipientModalOpen(true)}
      />
      <AddRecipientModal
        open={addRecipientModalOpen}
        onOpenChange={setAddRecipientModalOpen}
        onSuccess={handleAddRecipientSuccess}
      />
    </DashboardLayout>
  )
}
