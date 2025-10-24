"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { WalletProviderSelector } from "./wallet-provider-selector"
import { WalletQrScanner } from "./wallet-qr-scanner"
import { WalletConnectionStatus } from "./wallet-connection-status"
import { X, ChevronLeft } from "lucide-react"

interface WalletConnectModalProps {
  isOpen: boolean
  onClose: () => void
  onConnected?: (wallet: any) => void
}

type Step = "provider" | "connect" | "status"

export function WalletConnectModal({ isOpen, onClose, onConnected }: WalletConnectModalProps) {
  const [step, setStep] = useState<Step>("provider")
  const [selectedProvider, setSelectedProvider] = useState<string>("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "failed">("connecting")

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId)
    setStep("connect")
  }

  const handleConnect = async () => {
    setIsConnecting(true)
    setStep("status")
    setConnectionStatus("connecting")

    // Simulate connection
    setTimeout(() => {
      setConnectionStatus("connected")
      const mockWallet = {
        address: "0x742d35Cc6634C0532925a3b844Bc9e7595f42e1",
        provider: selectedProvider,
        network: "Ethereum",
      }
      onConnected?.(mockWallet)
    }, 2000)
  }

  const handleReset = () => {
    setStep("provider")
    setSelectedProvider("")
    setIsConnecting(false)
    setConnectionStatus("connecting")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            {step !== "provider" && (
              <button
                onClick={() => (step === "connect" ? setStep("provider") : handleReset())}
                className="p-1 hover:bg-gray-100 rounded-lg transition"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
            )}
            <h2 className="text-lg font-bold text-foreground">
              {step === "provider" && "Select Wallet"}
              {step === "connect" && "Connect Wallet"}
              {step === "status" && "Connecting..."}
            </h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition">
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === "provider" && (
            <div className="space-y-4">
              <p className="text-sm text-foreground/70">Choose your preferred wallet to connect to CrossPay</p>
              <WalletProviderSelector onSelect={handleProviderSelect} isLoading={isConnecting} />
            </div>
          )}

          {step === "connect" && (
            <div className="space-y-4">
              {selectedProvider === "walletconnect" ? (
                <WalletQrScanner onScanned={handleConnect} />
              ) : (
                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg border-2 border-dashed border-teal-200 text-center">
                    <p className="text-sm text-foreground/70 mb-4">
                      Click the button below to connect your {selectedProvider} wallet
                    </p>
                    <Button
                      onClick={handleConnect}
                      disabled={isConnecting}
                      className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold"
                    >
                      {isConnecting ? "Connecting..." : "Connect Wallet"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === "status" && (
            <WalletConnectionStatus status={connectionStatus} provider={selectedProvider} onClose={onClose} />
          )}
        </div>
      </Card>
    </div>
  )
}
