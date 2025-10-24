// KRNL Labs SDK client for Web3 operations
import { ethers } from "krnl-sdk"
import { KRNL_CONFIG } from "./krnl-config"

let provider: ethers.JsonRpcProvider | null = null
let signer: ethers.Signer | null = null

export function getKrnlProvider() {
  if (!provider) {
    provider = new ethers.JsonRpcProvider(KRNL_CONFIG.rpcEndpoint)
  }
  return provider
}

export async function initializeKrnlSigner(privateKey: string) {
  const krnlProvider = getKrnlProvider()
  signer = new ethers.Wallet(privateKey, krnlProvider)
  return signer
}

export function getKrnlSigner() {
  return signer
}

export async function executeKrnlKernels(kernelRequestData: any, functionParams: string) {
  const krnlProvider = getKrnlProvider()

  if (!KRNL_CONFIG.entryId || !KRNL_CONFIG.accessToken) {
    throw new Error("KRNL dApp credentials not configured")
  }

  try {
    const krnlPayload = await krnlProvider.executeKernels(
      KRNL_CONFIG.entryId,
      KRNL_CONFIG.accessToken,
      kernelRequestData,
      functionParams,
    )

    return krnlPayload
  } catch (error) {
    console.error("[v0] KRNL kernel execution error:", error)
    throw error
  }
}

export async function getKernelsCost() {
  const krnlProvider = getKrnlProvider()

  if (!KRNL_CONFIG.entryId) {
    throw new Error("KRNL dApp entry ID not configured")
  }

  try {
    const cost = await krnlProvider.getKernelsCost(KRNL_CONFIG.entryId)
    return cost
  } catch (error) {
    console.error("[v0] Error fetching kernel costs:", error)
    throw error
  }
}

export async function submitTransactionWithKrnl(
  contractAbi: any,
  functionName: string,
  functionArgs: any[],
  kernelRequestData: any,
) {
  if (!signer) {
    throw new Error("Signer not initialized. Call initializeKrnlSigner first.")
  }

  const contract = new ethers.Contract(KRNL_CONFIG.contractAddress, contractAbi, signer)

  const abiCoder = new ethers.AbiCoder()
  const functionParams = abiCoder.encode(
    functionArgs.map((arg) => typeof arg),
    functionArgs,
  )

  const krnlPayload = await executeKrnlKernels(kernelRequestData, functionParams)

  const tx = await contract[functionName](krnlPayload, ...functionArgs)
  return tx.hash
}
