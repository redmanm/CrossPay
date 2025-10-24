// API route for executing KRNL-protected transfers
import { type NextRequest, NextResponse } from "next/server"
import { ethers } from "krnl-sdk"
import { KRNL_CONFIG } from "@/lib/krnl-config"
import { executeKrnlKernels } from "@/lib/krnl-client"

export async function POST(request: NextRequest) {
  try {
    const { amount, recipientAddress, senderAddress, kernelData } = await request.json()

    if (!amount || !recipientAddress || !senderAddress) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Prepare kernel request data for KYC verification
    const abiCoder = new ethers.AbiCoder()
    const kernelRequestData = {
      senderAddress,
      kernelPayload: {
        [KRNL_CONFIG.kernels.kyc]: {
          functionParams: abiCoder.encode(["address"], [senderAddress]),
        },
        [KRNL_CONFIG.kernels.validation]: {
          functionParams: abiCoder.encode(
            ["address", "address", "uint256"],
            [senderAddress, recipientAddress, ethers.parseEther(amount.toString())],
          ),
        },
      },
    }

    // Execute kernels
    const functionParams = abiCoder.encode(
      ["address", "uint256"],
      [recipientAddress, ethers.parseEther(amount.toString())],
    )

    const krnlPayload = await executeKrnlKernels(kernelRequestData, functionParams)

    return NextResponse.json({
      success: true,
      transactionHash: krnlPayload.auth,
      kernelResponses: krnlPayload.kernel_responses,
      message: "Transfer initiated with KRNL verification",
    })
  } catch (error) {
    console.error("[v0] KRNL transfer error:", error)
    return NextResponse.json({ error: "Failed to execute KRNL transfer" }, { status: 500 })
  }
}
