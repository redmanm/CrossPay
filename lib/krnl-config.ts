// KRNL Labs configuration and initialization
export const KRNL_CONFIG = {
  // KRNL Node RPC endpoint
  rpcEndpoint: process.env.NEXT_PUBLIC_KRNL_RPC || "https://krnl-rpc.example.com",

  // dApp registration credentials (from KRNL portal)
  entryId: process.env.NEXT_PUBLIC_KRNL_ENTRY_ID || "",
  accessToken: process.env.NEXT_PUBLIC_KRNL_ACCESS_TOKEN || "",

  // Smart contract address for CrossPay
  contractAddress: process.env.NEXT_PUBLIC_CROSSPAY_CONTRACT || "",

  // Supported kernels for different operations
  kernels: {
    // Kernel for verifying user identity (KYC)
    kyc: "337",
    // Kernel for exchange rate oracle
    exchangeRate: "338",
    // Kernel for transaction validation
    validation: "339",
  },
}

export const KRNL_NETWORKS = {
  ethereum: {
    chainId: 1,
    name: "Ethereum",
    rpc: "https://eth-mainnet.g.alchemy.com/v2/",
  },
  polygon: {
    chainId: 137,
    name: "Polygon",
    rpc: "https://polygon-rpc.com",
  },
  arbitrum: {
    chainId: 42161,
    name: "Arbitrum",
    rpc: "https://arb1.arbitrum.io/rpc",
  },
}
