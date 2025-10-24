"use client"
import { Card } from "@/components/ui/card"
import { WALLET_PROVIDERS } from "@/lib/wallet-providers"
import { ArrowRight, Check } from "lucide-react"

interface WalletProviderSelectorProps {
  onSelect: (providerId: string) => void
  selectedProvider?: string
  isLoading?: boolean
}

export function WalletProviderSelector({ onSelect, selectedProvider, isLoading }: WalletProviderSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {WALLET_PROVIDERS.map((provider) => (
          <button
            key={provider.id}
            onClick={() => onSelect(provider.id)}
            disabled={isLoading || !provider.supported}
            className={`relative group transition-all duration-300 ${
              !provider.supported ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Card
              className={`p-4 text-left border-2 transition-all duration-300 ${
                selectedProvider === provider.id
                  ? "border-teal-500 bg-teal-50 shadow-lg"
                  : "border-gray-200 hover:border-teal-300 hover:shadow-md"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{provider.icon}</span>
                  <div>
                    <p className="font-semibold text-foreground">{provider.name}</p>
                    <p className="text-xs text-foreground/60">{provider.networks.length} networks</p>
                  </div>
                </div>
                {selectedProvider === provider.id && (
                  <div className="p-1 bg-teal-500 rounded-full">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <p className="text-xs text-foreground/70 mb-3">{provider.description}</p>
              <div className="flex items-center gap-2 text-teal-600 text-sm font-semibold group-hover:gap-3 transition-all">
                {selectedProvider === provider.id ? "Selected" : "Connect"}
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>
          </button>
        ))}
      </div>
    </div>
  )
}
