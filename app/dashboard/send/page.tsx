"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { SendMoneyModal } from "@/components/send-money-modal"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getRecipients } from "@/lib/api-client"

export default function SendPage() {
  const [recipients, setRecipients] = useState<any[]>([])
  const [sendModalOpen, setSendModalOpen] = useState(true)
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

  const handleSendSuccess = () => {
    setSendModalOpen(false)
    loadRecipients()
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Send Money</h1>
          <p className="text-foreground/60 mt-1">Transfer funds to your recipients</p>
        </div>

        {!sendModalOpen && (
          <Card className="p-8 text-center">
            <p className="text-foreground/60 mb-4">Transfer completed successfully!</p>
            <Button
              onClick={() => setSendModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Send Another Transfer
            </Button>
          </Card>
        )}
      </div>

      <SendMoneyModal
        open={sendModalOpen}
        onOpenChange={setSendModalOpen}
        recipients={recipients}
        onSuccess={handleSendSuccess}
        walletConnected={walletConnected}
      />
    </DashboardLayout>
  )
}
