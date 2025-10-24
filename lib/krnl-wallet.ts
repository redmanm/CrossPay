// KRNL wallet management utilities
import { ethers } from "krnl-sdk"
import { getKrnlProvider, initializeKrnlSigner } from "./krnl-client"

export interface KrnlWallet {
  address: string
  publicKey: string
  network: string
  isConnected: boolean
}

export async function createKrnlWallet(): Promise<KrnlWallet> {
  try {
    // Generate a new wallet using ethers from KRNL SDK
    const wallet = ethers.Wallet.createRandom()

    return {
      address: wallet.address,
      publicKey: wallet.publicKey,
      network: "ethereum",
      isConnected: true,
    }
  } catch (error) {
    console.error("[v0] Error creating KRNL wallet:", error)
    throw error
  }
}

export async function importKrnlWallet(privateKey: string): Promise<KrnlWallet> {
  try {
    const wallet = new ethers.Wallet(privateKey)
    await initializeKrnlSigner(privateKey)

    return {
      address: wallet.address,
      publicKey: wallet.publicKey,
      network: "ethereum",
      isConnected: true,
    }
  } catch (error) {
    console.error("[v0] Error importing KRNL wallet:", error)
    throw error
  }
}

export async function getWalletBalance(address: string): Promise<string> {
  try {
    const provider = getKrnlProvider()
    const balance = await provider.getBalance(address)
    return ethers.formatEther(balance)
  } catch (error) {
    console.error("[v0] Error fetching wallet balance:", error)
    throw error
  }
}

export async function signMessage(message: string, privateKey: string): Promise<string> {
  try {
    const wallet = new ethers.Wallet(privateKey)
    const signature = await wallet.signMessage(message)
    return signature
  } catch (error) {
    console.error("[v0] Error signing message:", error)
    throw error
  }
}

export async function verifySignature(message: string, signature: string, address: string): Promise<boolean> {
  try {
    const recoveredAddress = ethers.verifyMessage(message, signature)
    return recoveredAddress.toLowerCase() === address.toLowerCase()
  } catch (error) {
    console.error("[v0] Error verifying signature:", error)
    return false
  }
}
