import { convertToModelMessages, streamText, type UIMessage } from "ai"

const systemPrompt = `You are a helpful AI assistant for CrossPay, a fast and secure remittance service that allows users to send money to Ethiopia using cryptocurrency.

Key information about CrossPay:
- Send money to Ethiopia instantly using USDT, USDC, or other supported stablecoins
- Fees are 80% lower than traditional remittance services
- Transfers complete in minutes, not days
- Exchange rates are near-market with minimal fees
- Fully compliant with KYC/AML requirements
- Blockchain-verified transactions for security
- Recipients can receive in Ethiopian Birr to any bank or mobile wallet
- Available 24/7
- Smart contracts are audited by leading security firms
- Powered by KRNL Labs infrastructure

When answering questions:
1. Be friendly and professional
2. Provide accurate information about CrossPay's services
3. If asked about something not related to CrossPay, politely redirect to CrossPay services
4. Explain complex concepts in simple terms
5. Encourage users to sign up or learn more about specific features
6. If you don't know specific details, suggest they contact support at support@crosspay.io

Common questions you should be prepared to answer:
- How to send money to Ethiopia
- Fees and exchange rates
- Security and compliance
- Supported cryptocurrencies
- How long transfers take
- Recipient requirements
- Account setup process`

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { messages } = body as { messages: UIMessage[] }

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Invalid messages format" }, { status: 400 })
    }

    const result = await streamText({
      model: "openai/gpt-4o-mini",
      system: systemPrompt,
      messages: convertToModelMessages(messages),
      temperature: 0.7,
      maxOutputTokens: 500,
      abortSignal: req.signal,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("[v0] Chat API error:", error)

    if (error instanceof Error && error.name === "AbortError") {
      return Response.json({ error: "Request cancelled" }, { status: 499 })
    }

    return Response.json({ error: "Failed to process chat message. Please try again." }, { status: 500 })
  }
}
