"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Plus, Trash2, Check, Wallet, Shield } from "lucide-react"
import { KrnlWalletConnect } from "./krnl-wallet-connect"

export function WalletSettings() {
  const [wallets, setWallets] = useState([
    {
      id: 1,
      name: "KRNL Primary",
      address: "0x742d35Cc6634C0532925a3b844Bc9e7595f42e1",
      network: "Ethereum",
      balance: "2.5 ETH",
      isDefault: true,
      isKrnl: true,
    },
    {
      id: 2,
      name: "MetaMask",
      address: "0x8a3f2Bb7234D1643826c4d955Ef8a2c6d53e9f2",
      network: "Polygon",
      balance: "1,250 USDT",
      isDefault: false,
      isKrnl: false,
    },
  ])

  const [showAddWallet, setShowAddWallet] = useState(false)
  const [newWallet, setNewWallet] = useState({ name: "", address: "" })
  const [copied, setCopied] = useState<number | null>(null)
  const [krnlWallet, setKrnlWallet] = useState<any>(null)

  const handleCopy = (address: string, id: number) => {
    navigator.clipboard.writeText(address)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleAddWallet = () => {
    if (newWallet.name && newWallet.address) {
      setWallets([
        ...wallets,
        {
          id: wallets.length + 1,
          name: newWallet.name,
          address: newWallet.address,
          network: "Ethereum",
          balance: "0",
          isDefault: false,
          isKrnl: false,
        },
      ])
      setNewWallet({ name: "", address: "" })
      setShowAddWallet(false)
    }
  }

  const handleKrnlWalletConnected = (wallet: any) => {
    setKrnlWallet(wallet)
    // Add KRNL wallet to the list
    setWallets([
      {
        id: Math.max(...wallets.map((w) => w.id), 0) + 1,
        name: "KRNL Wallet",
        address: wallet.address,
        network: wallet.network,
        balance: "0",
        isDefault: false,
        isKrnl: true,
      },
      ...wallets,
    ])
  }

  return (
    <div className="space-y-8">
      {/* KRNL Wallet Connection */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">KRNL Labs Wallet</h2>
        <KrnlWalletConnect onWalletConnected={handleKrnlWalletConnected} />
      </div>

      {/* Connected Wallets */}
      <div className="bg-card border border-border rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Connected Wallets</h2>
          <Button
            onClick={() => setShowAddWallet(!showAddWallet)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Wallet
          </Button>
        </div>

        {showAddWallet && (
          <div className="mb-6 p-6 bg-secondary/50 border border-border rounded-xl space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Wallet Name</label>
              <Input
                placeholder="e.g., My MetaMask"
                value={newWallet.name}
                onChange={(e) => setNewWallet({ ...newWallet, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Wallet Address</label>
              <Input
                placeholder="0x..."
                value={newWallet.address}
                onChange={(e) => setNewWallet({ ...newWallet, address: e.target.value })}
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleAddWallet}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Add Wallet
              </Button>
              <Button
                onClick={() => setShowAddWallet(false)}
                variant="outline"
                className="flex-1 border-border text-foreground hover:bg-secondary bg-transparent"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {wallets.map((wallet) => (
            <div key={wallet.id} className="p-4 border border-border rounded-xl hover:bg-secondary/30 transition">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      wallet.isKrnl ? "bg-emerald-100" : "bg-primary/10"
                    }`}
                  >
                    {wallet.isKrnl ? (
                      <Shield className={`w-5 h-5 ${wallet.isKrnl ? "text-emerald-600" : "text-primary"}`} />
                    ) : (
                      <Wallet className={`w-5 h-5 ${wallet.isKrnl ? "text-emerald-600" : "text-primary"}`} />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">{wallet.name}</p>
                      {wallet.isKrnl && (
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-semibold">
                          KRNL Secured
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-foreground/60">{wallet.network}</p>
                  </div>
                </div>
                {wallet.isDefault && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-semibold">Default</span>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <code className="text-xs font-mono text-foreground/60">{wallet.address.slice(0, 20)}...</code>
                  <button
                    onClick={() => handleCopy(wallet.address, wallet.id)}
                    className="text-foreground/60 hover:text-foreground transition"
                  >
                    {copied === wallet.id ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-sm text-foreground/70">Balance: {wallet.balance}</p>
              </div>

              <div className="flex gap-2">
                {!wallet.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-border text-foreground hover:bg-secondary bg-transparent"
                  >
                    Set as Default
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-destructive/30 text-destructive hover:bg-destructive/5 bg-transparent"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Supported Networks */}
      <div className="bg-card border border-border rounded-2xl p-8">
        <h2 className="text-xl font-bold text-foreground mb-6">Supported Networks</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { name: "Ethereum", icon: "⟠", status: "Connected", krnlSupport: true },
            { name: "Polygon", icon: "◆", status: "Connected", krnlSupport: true },
            { name: "Arbitrum", icon: "⬜", status: "Available", krnlSupport: true },
            { name: "Optimism", icon: "🔴", status: "Available", krnlSupport: false },
          ].map((network) => (
            <div key={network.name} className="p-4 border border-border rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{network.icon}</span>
                <div>
                  <p className="font-semibold text-foreground">{network.name}</p>
                  {network.krnlSupport && <p className="text-xs text-emerald-600 font-medium">KRNL Enabled</p>}
                </div>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  network.status === "Connected" ? "bg-primary/10 text-primary" : "bg-foreground/10 text-foreground/60"
                }`}
              >
                {network.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
