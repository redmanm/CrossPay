// KRNL wallet connection component
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle, Wallet, CheckCircle, Copy, Eye, EyeOff, Zap } from "lucide-react"
import { createKrnlWallet, importKrnlWallet } from "@/lib/krnl-wallet"

interface KrnlWalletConnectProps {
  onWalletConnected?: (wallet: any) => void
}

export function KrnlWalletConnect({ onWalletConnected }: KrnlWalletConnectProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [wallet, setWallet] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [privateKey, setPrivateKey] = useState("")
  const [showImport, setShowImport] = useState(false)
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCreateWallet = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const newWallet = await createKrnlWallet()
      setWallet(newWallet)
      onWalletConnected?.(newWallet)
    } catch (err) {
      setError("Failed to create wallet. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImportWallet = async () => {
    if (!privateKey.trim()) {
      setError("Please enter a private key")
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const importedWallet = await importKrnlWallet(privateKey)
      setWallet(importedWallet)
      setPrivateKey("")
      setShowImport(false)
      onWalletConnected?.(importedWallet)
    } catch (err) {
      setError("Failed to import wallet. Please check your private key.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(wallet.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (wallet) {
    return (
      <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-400 rounded-full blur opacity-20 animate-pulse"></div>
            <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 relative" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-semibold text-emerald-900">KRNL Wallet Connected</h3>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full">
                <Zap className="w-3 h-3" />
                Active
              </span>
            </div>
            <div className="space-y-3 text-sm text-emerald-800">
              <div className="bg-white/60 backdrop-blur rounded-lg p-3 space-y-2">
                <p className="text-xs font-medium text-emerald-700">Wallet Address</p>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-xs font-mono break-all">{wallet.address}</code>
                  <button onClick={handleCopyAddress} className="flex-shrink-0 p-1 hover:bg-white rounded transition">
                    <Copy className={`w-4 h-4 ${copied ? "text-emerald-600" : "text-emerald-700"}`} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/40 rounded p-2">
                  <p className="text-xs font-medium">Network</p>
                  <p className="font-semibold">{wallet.network}</p>
                </div>
                <div className="bg-white/40 rounded p-2">
                  <p className="text-xs font-medium">Status</p>
                  <p className="font-semibold">Connected</p>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setWallet(null)}
              variant="outline"
              size="sm"
              className="mt-4 border-emerald-300 text-emerald-700 hover:bg-emerald-100"
            >
              Disconnect Wallet
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 border-2 border-dashed border-teal-200 bg-gradient-to-br from-teal-50/50 to-emerald-50/50">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-teal-100 rounded-lg">
            <Wallet className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Connect KRNL Wallet</h3>
            <p className="text-xs text-foreground/60">Secure Web3 wallet powered by KRNL Labs</p>
          </div>
        </div>

        {error && (
          <div className="flex gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 animate-in fade-in">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {!showImport ? (
          <div className="space-y-3">
            <Button
              onClick={handleCreateWallet}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold h-11 transition-all duration-200 transform hover:scale-105"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⚙️</span>
                  Creating Wallet...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  Create New Wallet
                </span>
              )}
            </Button>
            <Button
              onClick={() => setShowImport(true)}
              variant="outline"
              className="w-full border-2 border-teal-200 text-teal-700 hover:bg-teal-50 font-semibold h-11"
            >
              Import Existing Wallet
            </Button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Private Key</label>
              <div className="relative">
                <input
                  type={showPrivateKey ? "text" : "password"}
                  placeholder="0x..."
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border-2 border-teal-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                />
                <button
                  onClick={() => setShowPrivateKey(!showPrivateKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground"
                >
                  {showPrivateKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-foreground/60 mt-2">Never share your private key with anyone</p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleImportWallet}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold"
              >
                {isLoading ? "Importing..." : "Import Wallet"}
              </Button>
              <Button
                onClick={() => {
                  setShowImport(false)
                  setPrivateKey("")
                  setError(null)
                }}
                variant="outline"
                className="flex-1 border-2 border-teal-200"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-teal-200">
          <p className="text-xs text-foreground/60 text-center">
            🔒 Your wallet is secured with KRNL Labs infrastructure
          </p>
        </div>
      </div>
    </Card>
  )
}
