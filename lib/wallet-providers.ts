export interface WalletProvider {
  id: string
  name: string
  icon: string
  description: string
  color: string
  supported: boolean
  networks: string[]
}

export const WALLET_PROVIDERS: WalletProvider[] = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "🦊",
    description: "Connect using MetaMask browser extension",
    color: "from-orange-400 to-orange-600",
    supported: true,
    networks: ["Ethereum", "Polygon", "Arbitrum"],
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "🔗",
    description: "Scan QR code to connect mobile wallet",
    color: "from-blue-400 to-blue-600",
    supported: true,
    networks: ["Ethereum", "Polygon", "Arbitrum", "Optimism"],
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "🪙",
    description: "Connect your Coinbase Wallet",
    color: "from-blue-500 to-blue-700",
    supported: true,
    networks: ["Ethereum", "Polygon", "Arbitrum"],
  },
  {
    id: "ledger",
    name: "Ledger",
    icon: "🔐",
    description: "Connect your Ledger hardware wallet",
    color: "from-black to-gray-800",
    supported: true,
    networks: ["Ethereum", "Polygon", "Arbitrum"],
  },
  {
    id: "trezor",
    name: "Trezor",
    icon: "🛡️",
    description: "Connect your Trezor hardware wallet",
    color: "from-green-500 to-green-700",
    supported: true,
    networks: ["Ethereum", "Polygon"],
  },
  {
    id: "trust",
    name: "Trust Wallet",
    icon: "💙",
    description: "Connect your Trust Wallet",
    color: "from-blue-400 to-cyan-500",
    supported: true,
    networks: ["Ethereum", "Polygon", "Arbitrum"],
  },
]

export const getWalletProvider = (id: string): WalletProvider | undefined => {
  return WALLET_PROVIDERS.find((provider) => provider.id === id)
}

export const getSupportedNetworks = (providerId: string): string[] => {
  const provider = getWalletProvider(providerId)
  return provider?.networks || []
}
