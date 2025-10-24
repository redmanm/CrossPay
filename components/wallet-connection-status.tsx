"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Loader } from "lucide-react"

interface WalletConnectionStatusProps {
  status: "connecting" | "connected" | "failed"
  provider: string
  onClose: () => void
}

export function WalletConnectionStatus({ status, provider, onClose }: WalletConnectionStatusProps) {
  const [displayStatus, setDisplayStatus] = useState(status)

  useEffect(() => {
    setDisplayStatus(status)
  }, [status])

  const statusConfig = {
    connecting: {
      icon: Loader,
      title: "Connecting Wallet",
      message: "Please confirm the connection in your wallet...",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    connected: {
      icon: CheckCircle,
      title: "Wallet Connected!",
      message: "Your wallet has been successfully connected to CrossPay",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    failed: {
      icon: AlertCircle,
      title: "Connection Failed",
      message: "Unable to connect wallet. Please try again.",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  }

  const config = statusConfig[displayStatus]
  const Icon = config.icon

  return (
    <div className="space-y-6">
      <div className={`p-8 rounded-lg ${config.bgColor} text-center space-y-4`}>
        <div className="flex justify-center">
          {displayStatus === "connecting" ? (
            <Icon className={`w-12 h-12 ${config.color} animate-spin`} />
          ) : (
            <Icon className={`w-12 h-12 ${config.color}`} />
          )}
        </div>
        <div>
          <h3 className="font-semibold text-foreground mb-2">{config.title}</h3>
          <p className="text-sm text-foreground/70">{config.message}</p>
        </div>
      </div>

      {displayStatus === "connected" && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
          <p className="text-xs font-semibold text-foreground/60">CONNECTED WALLET</p>
          <p className="text-sm font-mono text-foreground">0x742d35Cc6634C0532925a3b844Bc9e7595f42e1</p>
          <p className="text-xs text-foreground/60">Provider: {provider}</p>
        </div>
      )}

      <Button
        onClick={onClose}
        className={`w-full font-semibold ${
          displayStatus === "connected" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-gray-600 hover:bg-gray-700"
        } text-white`}
      >
        {displayStatus === "connected" ? "Continue" : "Try Again"}
      </Button>
    </div>
  )
}
