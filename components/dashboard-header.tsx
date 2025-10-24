"use client"

import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { WalletConnectModal } from "./wallet-connect-modal"

export function DashboardHeader() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState<any>(null)

  const handleWalletConnected = (wallet: any) => {
    setConnectedWallet(wallet)
    localStorage.setItem("connectedWallet", JSON.stringify(wallet))
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {connectedWallet ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-semibold text-primary">
                {connectedWallet.address.slice(0, 6)}...{connectedWallet.address.slice(-4)}
              </span>
            </div>
          ) : (
            <Button
              onClick={() => setIsWalletModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </Button>
          )}
        </div>
      </div>

      <WalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnected={handleWalletConnected}
      />
    </>
  )
}
